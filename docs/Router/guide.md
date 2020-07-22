# 路由守衛

## 登入檢查範例

放在 `routes` 的 `beforeEnter`。

```js{6,7,8,9,10,11,12}
const router = new Router({
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
      },
    },
  ],
});
```

::: tip 提醒
如果 `need-to-login` 底下還有 `children` 的話，每一次的路由進入點，一定會執行上層的 `beforeEnter`。

即便是直接進入其下的路由設定，他的上游的動作還是會被執行的。
:::

另外一個方式，可以放在最外層的 `beforeEach` 的地方，但為了識別 Route，所以可以使用 `meta` 來儲存一些識別用資料。

```js {6,7,8,13,14,15,16,17,18,19,20,21,22}
const router = new Router({
  routes: [
    {
      path: '/need-to-login',
      component: HelloWorld,
      meta: {
        needLogin: true,
      },
    },
  ],
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
由於 `beforeEach` 並不會幫做上游的動作，他是每一個路由進入之前會做一些事情，所以當你的 `need-to-login` 其下有子路由，那麼也 **一定要加上相同的 `meta`** 來儲存識別資料，否則，就會跑出一個漏洞。
:::

## 動態載入 `routes component`

> 邪門做法

```js
import Router from 'vue-router';
import HelloKitty from '@/components/HelloKitty.vue';

const router = new Router({
  routes: [
    {
      path: '/helloworld',
      component: null,
      beforeEnter(to, from, next) {
        to.matched[0].components.default = HelloKitty;
        next();
      },
    },
  ],
});
```

## 參考

[Router 進階應用](https://ithelp.ithome.com.tw/articles/10214740)
