# 路由守衛

## 登入檢查範例

放在 `routes` 的 `beforeEnter`

```js
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/need-to-login',
      component: HelloWorld,
      beforeEnter(to, from, next) {
        checkLoginStatus()
          .then(next)
          .catch(() => {
            next({ name: 'signin' });
          });
      }
    }
  ]
});
```

::: tip 注意
倘若 `need-to-login` 底下還有 `children` 的話，也不用擔心，因為他一定會執行。即便是直接進入其下的路由設定，他的上游的動作還是會被執行的
:::

另外一個方式，是可以放在最外層的 `beforeEach` 的地方，但為了識別 Route，所以可以使用 `meta` 來儲存一些識別用資料

```js
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/need-to-login',
      component: HelloWorld,
      meta: {
        needLogin: true
      }
    }
  ]
});

router.beforeEach(function(to, from, next) {
  if (to.meta.needLogin === true) {
    return checkLoginStatus()
      .then(next)
      .catch(() => {
        next({ name: 'signin' });
      });
  }
  next();
});
```

::: danger 注意
由於 `beforeEach` 並不會幫做上游的動作，他是 **每一個** 路由進入之前會做一些事情，所以當你的 `need-to-login` 其下有子路由，那麼也一定要加上相同的 `meta` 來儲存識別資料，否則，就會跑出一個漏洞
:::

## 動態載入 `routes component`

> 邪門做法

```js
import Router from 'vue-router';
import HelloKitty from '@/components/HelloKitty.vue';

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/helloworld',
      component: null,
      beforeEnter(to, from, next) {
        to.matched[0].components.default = HelloKitty;
        next();
      }
    }
  ]
});
```

## 參考

[Router 進階應用](https://ithelp.ithome.com.tw/articles/10214740)
