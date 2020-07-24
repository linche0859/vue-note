# 路由守衛

## 路由守衛方法

- `beforeEach` 當路由開始進入之前，會執行此函式。函式會回傳三個參數，
  - `to` 將要前往的 Route 物件實例。
  - `from` 來源的 Route 物件實例。
  - `next` 這形同於回呼函式，你必須要呼叫他 `next()` 他才會繼續往下做。
- `beforeResolve` 當路由內部的所有路由防護規則都被解析之後執行，跟 `beforeEach` 一樣有三個參數。
- `beforeEnter` 用於 Route 設定的地方，傳入參數跟 `beforeEach` 一樣。
- `afterEach` 當路由結束操作後，會呼叫此函數。跟 `beforeEach` 一樣，但是沒有 next() 的回呼函式。

### next()

基本上無論在哪一個路由守衛階段，只要 `next()` 沒有被呼叫到，那麼路由基本上就會被中斷。而這個 `next()` 可以接受的呼叫方法有：

- `next(false)` 代表中斷這個路由執行，畫面就會停住了。
- `next({ name: 'HelloKitty' })` 代表前往路由名稱為 HelloKitty 的地方。這種呼叫方式可以套用 `<router-link>` 的 `to` 的屬性。可以參考 [router-link 的使用方式](./basic.html#router-link)。
- `next(Error)` 傳入一個 Error 的實例，該路由會被中斷，然後發一個事件給 `router.onError()`。

## 使用 Vue Router 後的組件生命週期

當有使用 Vue Router 的時候，整個組件的生命週期中，也提供了三組方法可以使用：

- `beforeRouteEnter` 路由尚未進入該組件時會執行，一樣會三個傳入三個參數：
  - `to` 要去的路由位置。
  - `from` 從哪一個路由位置進來，如果沒有，預設是 `null`。
  - `next()` 繼續往下執行的回呼函式，必須要呼叫他才能繼續執行。
- `beforeRouteUpdate` 當此組件被重複使用時，路由有更新，會呼叫這個方法，參數跟 `beforeRouteEnter` 相同。
- `beforeRouteLeave` 當路由要離開該組件時，會呼叫這個方法，參數跟 `beforeRouteEnter` 相同。

### beforeRouteEnter

由於他是在路由進入點之前，也就是說在路由尚未進入，所以他 **沒有 `this` 可以用**，而其他兩個，在方法中的 `this` 均指向組件實體。

而 `beforeRouteEnter` 若要拿到組件實體，必須使用 `next()` 來實作：

```js
export default {
  name: 'HelloWorld',
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 這裡的 vm 就是 HelloWorld 這個組件的實體。
    });
  },
};
```

## 路由守衛解析流程

可以參考 [官方說明](https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards)

1. Navigation triggered.
1. Call `beforeRouteLeave` guards in deactivated components.
1. Call global `beforeEach` guards.
1. Call `beforeRouteUpdate` guards in reused components.
1. Call `beforeEnter` in route configs.
1. Resolve async route components.
1. Call `beforeRouteEnter` in activated components.
1. Call global `beforeResolve` guards.
1. Navigation confirmed.
1. Call global `afterEach` hooks.
1. DOM updates triggered.
1. Call callbacks passed to `next` in `beforeRouteEnter` guards with instantiated instances.

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

不過，請注意一點，由於路由執行的順序，會先走過一次 `beforeRouteLeave`，所以，如果在這邊有做 **登出** 的動作，那麼你可能每次登入，換頁後就會一直被彈到登入頁面。
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

```js{9,10,11,12}
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
