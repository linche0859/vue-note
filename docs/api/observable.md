# Vue.observable

我們習慣用 Vuex 來解決狀態的共享問題，但在小專案中就會增加程式碼的負擔和將程式碼複雜化的煩惱，所以可以使用 `Vue.observable({...})` 的方式，讓資料也可以響應。

返回的狀態可以直接用於渲染函式和計算屬性內，並且會在發生改變時觸發相對應的更新。也可以做為最小化的跨組件狀態儲存器。

```js
const state = Vue.observable({ count: 0 });

const Demo = {
  render(h) {
    return h(
      'button',
      {
        on: {
          click: () => {
            state.count++;
          },
        },
      },
      `count is: ${state.count}`
    );
  },
};
```

## 參考連結

[響應式資料](https://juejin.im/post/5f18f3346fb9a07eb417d2d2?fbclid=IwAR2XjKTczA95c3hvh2cXmZMaKexP45aA9dY4CVUCOjHwr7C2oK-gFkzQ-SQ#heading-5)
