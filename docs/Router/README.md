## 基本用法

```javascript
import Vue from 'vue';
import Router from 'vue-router';
import App from '@/App.vue';
import HelloWorld from '@/components/HelloWorld.vue';

Vue.use(Router);

const router = new Router({
  // 加入 HTML5 History API
  // 去除 # 號，較為美觀
  // 服務器就不再返回 404 錯誤頁面，因為對於所有路徑都會返回 index.html 文件
  // 為了避免這種情況，應該拋轉至 404 頁面
  mode: 'history',
  routes: [
    {
      path: '/helloworld',
      component: HelloWorld,
      meta: {},
      children: []
    }
  ]
});

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');
```

## 路由屬性

- `mode`路由模式，可用數值有：

  - `hash` 瀏覽器預設，就是 URL hash 的方式
  - `history` 使用 HTML5 History API 的方式
  - `abstract` 所有 JavaScript 環境皆可用。如果取不到瀏覽器 API，會強制進入這模式。

- `base` 路由的根路徑，預設是使用 `/` 這個根路徑。
- `routes` 是個陣列，裡面包含了你的路由設定。
- `linkActiveClass` 設定 全域 的 `<router-link>` 若路由相符，會加入的 class 名稱。
- `linkExactActiveClass` 跟上一個很類似，但你的路由必須要「完全相同」才會加入 class 名稱。
- `scrollBehavior` 設定捲軸的屬性，例如你想要「上一頁」回到某個特定位置的時候。
- `parseQuery` 解析查詢字串的自定義函式，會覆蓋預設函式。
- `stringifyQuery` 反解析查詢字串的自定義函式，會覆蓋預設函式。
- `fallback` 僅接受布林值，當你的路由模式不支援 History API 時，會退回去使用 URL hash 的方式，預設為 true

## 常用路由方法

- `beforeEach` 當路由開始進入之前，會執行此函式。函式會回傳三個參數，
  - `to` 將要前往的 Route 物件實例。
  - `from` 來源的 Route 物件實例。
  - `next` 這形同於回呼函式，你必須要呼叫他 `next()` 他才會繼續往下做。
- `beforeResolve` 當路由內部的所有路由防護規則都被解析之後執行，跟 `beforeEach` 一樣有三個參數。
- `afterEach` 當路由結束操作後，會呼叫此函數。跟 `beforeEach` 一樣，但是沒有 next() 的回呼函式。

## `routes`的屬性和方法

- `path` 路徑，從 `base` 開始算。
- `name` 這一個路由的名稱，他會在一些路由方法中可以使用。
- `component` 這個路由配置的 Vue 元件。
- `components` 設置有命名規則的 Vue 元件。
- `redirect` 重新導向路徑，可以是字串﹑Location 物件或是函式。
- `props` 將路由上面的正規配置當作屬性傳入元件當中，可以是布林值、物件或函式。
- `alias` 路由別名，可以是字串或是字串組成的陣列。
- `children` 嵌套路由，就是這個路由的兒子（你可以這麼理解沒問題）。
- `meta` 可傳入任何值，用於路由本身的資料集。
- `beforeEnter` 進入此路由前，會先執行的防禦路由方法函式，自身會帶入 `to`, `from` 與 `next()` 參數。
- `caseSensitive` 路由本身是否區身大小寫，僅接受布林值，預設為 `false`。

## 範例

**router/index.js**

```javascript
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
});

// 每一 router 拋轉頁面就會執行
router.beforeEach((to, from, next) => {
  console.log('call from beforeEach', to.meta);
  next();
});

export default router;
```

**router/routers.js**

::: tip 注意
最上層的 Route 的開頭就一定要有 `/` 的設定，不然會被警告，且會失效
:::

```javascript
import Home from '../views/Home.vue';
import HelloKittyWithId from '@/views/HelloKittyWithId';
import HelloKittyWithName from '@/views/HelloKittyWithName';
import HelloWithDefault from '@/views/HelloWithDefault';

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/tree',
    name: 'tree',
    // 進入此路由前，會先執行的防禦路由方法函式，自身會帶入 to, from 與 next() 參數
    beforeEnter(to, from, next) {
      console.log('call from beforeEnter', to.fullPath);
      next();
    },
    // meta 值會帶入公用路由，公用路由可藉由 beforeEach 方法，做防禦判斷
    meta: {
      needLogin: true
    },
    component: () => import(/* webpackChunkName: "tree" */ '../views/Tree'),
    // children 的路徑就會接續他老爸再繼續往後，記得不要在 path 加 /，不然他會回到根目錄去
    children: [
      {
        path: 'kitty',
        name: 'kitty',
        component: () =>
          import(/* webpackChunkName: "kitty" */ '../views/Kitty')
      }
    ]
  },
  {
    path: '/helloworld',
    name: 'HelloWorld',
    component: () =>
      import(/* webpackChunkName: "helloworld" */ '../views/HelloWorld'),
    beforeEnter(to, from, next) {
      if (from.name === 'kitty') {
        next({ name: 'NotFound' });
      }
      next();
    },
    meta: {
      pageNeedLogin: true,
      showFooter: false
    }
  },
  {
    path: '/hellokitty',
    name: 'HelloKitty',
    component: () =>
      import(/* webpackChunkName: "hellokitty" */ '../views/Kitty'),
    children: [
      {
        path: 'id/:id',
        name: 'HelloKittyWithId',
        // 至少要加入 default 物件，不然元件無法渲染
        components: {
          default: HelloWithDefault,
          a: HelloKittyWithId,
          b: HelloKittyWithName
        },
        // 當有設定時，可以將 id 值傳入元件中
        props: true
      }
    ]
  },
  {
    path: '/hellokitty2',
    redirect: '/hellokitty'
  },
  {
    path: '/hellokitty3',
    redirect: { name: 'HelloKitty' }
  },
  {
    // 可以使用 * 來做萬用匹配
    path: '*',
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "NotFound" */ '../views/NotFound')
  }
];
```

## Router 元件應用

如使用嵌套路由，那麼你的嵌套路由**父元件**也是需要一組 `<router-view>` 來作為進入點

```html
<template>
  <section>
    <router-view></router-view>
  </section>
</template>
```

然而，`<router-view>` 有一個屬性 `name` 可以用，他的應用範圍，是將 Route 設定當中，有命名的元件來套用。在你的 Route 設定中，要使用 `components` 來設定，舉例來說

```html
<template>
  <section>
    <!-- 這個區段會渲染 `default` 的元件 -->
    <router-view></router-view>
    <!-- 這個區段會渲染命名為 `a` 的元件 -->
    <router-view name="a"></router-view>
  </section>
</template>
```

路由設定：

```javascript
import Router from 'vue-router';

import HelloKitty from '@/components/HelloKitty.vue';
import HelloWorld from '@/components/HelloWorld.vue';

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      components: {
        default: HelloKitty,
        a: HelloWorld
      }
    }
  ]
});
```

## router-link

- `to` 接受命名的路由名稱，或是路由物件。路由物件包含了：
  - `path` 直接填寫路徑，不要與 `name` 混用。
  - `name` 填入命名的路由名稱，不要與 `path` 混用。
  - `params` 路由若有使用正規，則可填入路由正規所指定的變數數值，使用 Object 模式傳入。
  - `query` 設定網址搜尋資料，亦即 `?` 後面的設定值，使用 Object 模式傳入。
- `replace` 原本的 `to` 指令預設是使用 `router.push()` 的方式，若加了這個屬性，則會適用 `router.replace()` 的方式執行。若使用 `replace`，則你的 History 不會留下記錄。
- `append` 意思就是把現在的路徑 加入 這個 `<router-link>` 所設定的路徑。
- `tag` 原本 `<router-link>` 預設使用 `A` 標籤，這個設定可以讓你指定其他標籤。
- `active-class` 當路由正規規則符合時，會套用這個屬性所指定的類別名稱。預設會使用 `router-link-active` 這個名稱。
- `exact` 如果加入這個屬性，則需要正規 **完全符合** 的時候，才會套用 `exact-active-class`(下方屬性) 指定的類別名稱。
- `exact-active-class` 當路由正規規則 **完全符合** 時，會套用這個屬性所指定的類別名稱。預設會使用 `router-link-exact-active` 這個名稱。
- `event` 觸發該路由的事件，預設是使用 `click` 事件

關於上述的 `params`，所謂路由正規其實就是文章上面範例中，所提到的 id/:id 這樣的例子，而這個例子在 `<router-link>` 當中的設定，看起來就會像這個樣子：

```html
<template>
  <section>
    <router-link
      :to="{ name: 'HelloKittyWithId', params: { id: 123 } }"
    ></router-link>
  </section>
</template>
```

---

而在 Vue Router 3.1.0 版本之後，對於 `<router-link>` 則提供了一個插槽（ _Slot_ ）的新功能。這個功能可以讓你替換調原本 `<router-link>` 的結構，這個插槽提供了幾個數值讓你使用：

- `href` 解析過後的網址，提供給 `A` 標籤的 `href` 使用的字串。但使用`A`標籤，網頁會重整，預防方式如下
- `route` 傳回一個 Route 的完整物件。
- `navigate` 觸發路由的事件函式， **必要時會阻止此事件執行** 。
- `isActive` 回傳路由正規是否符合，回傳值為布林值。
- `isExactActive` 回傳路由正規是否 _完全符合_ ，回傳值為布林值。

```html
<router-link
  :to="{name: 'HelloKittyWithId', params: {id: 2}}"
  v-slot="{href, route, navigate, isActive, isExactActive}"
>
  <a @click.prevent="native({href, route, navigate, isActive, isExactActive})"
    >HelloKittyWithId1</a
  >
</router-link>
```

```javascript
export default {
  name: 'kitty',
  methods: {
    native({ ...req }) {
      this.$router.push({ name: req.route.name, params: req.route.params });
    }
  }
};
```

---

另外，由於 `<router-link>` 實際上只是幫你做路由的動作，所以，如果在 `<router-link>` 上面綁定了 `click` 的時候，會發現沒有被觸發：

```html
<template>
  <section>
    <!--沒有觸發-->
    <router-link to="hello" @click="hello">Hello</router-link>
    <!--成功觸發-->
    <router-link to="kitty" @click.native="kitty">Kitty</router-link>
  </section>
</template>
```

有沒有加入 `.native` 的差異在於，一般在 Vue 的事件綁定中，是以 `Vue-Event` 為主，而加上了 `.native` 則代表，你想要觸發的是 DOM 的原生事件。

是的，在 `<router-link>` 這個元件上，需要用到 `.native` 來確保事件發生。不然，`<router-link>` 基本上都會直接忽略你所綁定的事件。
