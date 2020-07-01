# 封裝

**router/index.js**

```js
import Vue from 'vue';
import VueRouter from 'vue-router';
// https://github.com/declandewet/vue-meta
import VueMeta from 'vue-meta';
// Adds a loading bar at the top during page loads.
import NProgress from 'nprogress/nprogress';
import store from '@/store';
import routes from './routes';

Vue.use(VueRouter);
Vue.use(VueMeta, {
  // The component option name that vue-meta looks for meta info on.
  keyName: 'page'
});

const router = new VueRouter({
  routes,
  // Use the HTML5 history API (i.e. normal-looking routes)
  // instead of routes with hashes (e.g. example.com/#/about).
  // This may require some server configuration in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  mode: 'history',
  // 導航到新路線並使用後退/前進按鈕時，模擬類似本機的滾動行為。
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

// 在評估每條路線之前...
router.beforeEach((routeTo, routeFrom, next) => {
  // 如果這不是初始頁面加載...
  if (routeFrom.name !== null) {
    // 啟動路線進度欄。
    NProgress.start();
  }

  // 檢查此路由上是否需要身份驗證（包括嵌套路線）。
  // 檢查路由的 meta 是否有 authRequired 屬性
  const authRequired = routeTo.matched.some(route => route.meta.authRequired);

  // 如果路由不需要身份驗證，請繼續。
  if (!authRequired) return next();

  // 如果需要驗證並且用戶已登錄...
  if (store.getters['auth/loggedIn']) {
    // 驗證本地用戶令牌...
    return store.dispatch('auth/validate').then(validUser => {
      // 如果令牌仍然代表有效用戶，請繼續，否則重定向到登錄
      validUser ? next() : redirectToLogin();
    });
  }

  // 如果需要 auth 且用戶當前未登錄，重定向到登錄名。
  redirectToLogin();

  function redirectToLogin() {
    // 將原始路由傳遞到登錄元件
    next({ name: 'login', query: { redirectFrom: routeTo.fullPath } });
  }
});

router.beforeResolve(async (routeTo, routeFrom, next) => {
  // 創建一個 beforeResolve 鉤子，並在 beforeRouteEnter 和 beforeRouteUpdate 後會觸發。
  // 這使我們能夠確保參數的更改也能獲取數據，但解析的路由不會。
  // 我們將其放在「路由的 meta」中以表明它是我們創建的鉤子，而不是 Vue Router 的共用部分
  try {
    // 對於每個匹配的路線...
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        // 如果有定義了一個 beforeResolve 鉤子，請使用與 beforeEnter 鉤子相同的參數調用它。
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            // 如果用戶選擇重定向...
            if (args.length) {
              // 如果重定向到同一條路線，我們來自...
              if (routeFrom.name === args[0].name) {
                // 完成路線進度欄的動畫。
                NProgress.done();
              }
              // 完成重定向。
              next(...args);
              reject(new Error('Redirected'));
            } else {
              resolve();
            }
          });
        } else {
          // 否則，繼續解析路由。
          resolve();
        }
      });
    }
    // 如果 beforeResolve 鉤子選擇重定向，則返回。
  } catch (error) {
    return;
  }

  // 如果到達這一點，請繼續解決該路線
  next();
});

// 完成每條路線的評估後...
router.afterEach((routeTo, routeFrom) => {
  // 完成路線進度欄的動畫。
  NProgress.done();
});

export default router;
```

---

**router/router.js**

```js
import store from '@/store';

export default [
  {
    path: '/',
    name: 'home',
    component: () => lazyLoadView(import('@/views/home.vue'))
  },
  {
    path: '/login',
    name: 'login',
    component: () => lazyLoadView(import('@/views/login.vue')),
    meta: {
      beforeResolve(routeTo, routeFrom, next) {
        // If the user is already logged in
        if (store.getters['auth/loggedIn']) {
          // Redirect to the home page instead
          next({ name: 'home' });
        } else {
          // Continue to the login page
          next();
        }
      }
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => lazyLoadView(import('@views/profile.vue')),
    meta: {
      authRequired: true
    },
    // 可以將 user 作為 props 傳入
    // 官方建議，盡量保持 props 為無狀態，因它只會在路由發生變化時起作用
    // 如果需要狀態來定義 props，需將其包裝
    // 參考： t.ly/0EEgl
    props: route => ({ user: store.state.auth.currentUser || {} })
  },
  {
    path: '/profile/:username',
    name: 'username-profile',
    component: () => lazyLoadView(import('@views/profile.vue')),
    meta: {
      authRequired: true,
      // 為了在 beforeResolve 鉤子和 props 函數之間共享數據
      // 我們必須為僅在路由解析期間使用的臨時數據創建一個對象。
      tmp: {},
      beforeResolve(routeTo, routeFrom, next) {
        store
          // Try to fetch the user's information by their username
          .dispatch('users/fetchUser', { username: routeTo.params.username })
          .then(user => {
            // Add the user to `meta.tmp`, so that it can
            // be provided as a prop.
            routeTo.meta.tmp.user = user;
            // Continue to the route.
            next();
          })
          .catch(() => {
            // If a user with the provided username could not be
            // found, redirect to the 404 page.
            next({ name: '404', params: { resource: 'User' } });
          });
      }
    },
    // 一旦在 beforeResolve 路由防護中設置了用戶，就可以從路由參數中設置 user。
    props: route => ({ user: route.meta.tmp.user })
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
      beforeResolve(routeTo, routeFrom, next) {
        store.dispatch('auth/logOut');
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          route => route.meta.authRequired
        );
        // Navigate back to previous page, or home as a fallback
        next(authRequiredOnPreviousRoute ? { name: 'home' } : { ...routeFrom });
      }
    }
  },
  {
    path: '/404',
    name: '404',
    component: require('@/views/_404.vue').default,
    // Allows props to be passed to the 404 page through route
    // params, such as `resource` to define what wasn't found.
    props: true
  },
  // 將所有不匹配的路由重定向到404頁面， 這可能需要一些服務器配置才能在生產中工作
  // t.ly/9LLEZ
  {
    path: '*',
    redirect: '404'
  }
];

// Lazy-loads view components, but with better UX. A loading view
// will be used if the component takes a while to load, falling
// back to a timeout view in case the page fails to load. You can
// use this component to lazy-load a route with:
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// NOTE: Components loaded with this strategy. DO NOT have access
// to in-component guards, such as beforeRouteEnter,
// beforeRouteUpdate, and beforeRouteLeave. You must either use
// route-level guards instead or lazy-load the component directly:
//
// component: () => import('@views/my-view')
//
function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // 加載元件時要使用的元件。
    loading: require('@/views/_loading.vue').default,
    // 在顯示加載元件之前延遲。
    // Default: 200 (milliseconds).
    delay: 400,
    // 一個後備元件，以防在加載元件時超出超時。
    error: require('@/views/_timeout.vue').default,
    // 放棄嘗試加載元件之前的時間。
    // Default: Infinity (milliseconds).
    timeout: 10000
  });

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // 透明地將所有道具或子級傳遞到視圖元件。
      return h(AsyncHandler, data, children);
    }
  });
}
```

---
