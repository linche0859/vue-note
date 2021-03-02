# serverMiddleware

借助 nuxt 啟動時的 node server，可以透過它新增其他路由。

```js
// nuxt.config.js

export default {
  serverMiddleware: [{ path: '/api', handler: '~/server/api.js' }],
};
```

![server middleware](./images/server-middleware.PNG)

## 實做 google 登入機制
