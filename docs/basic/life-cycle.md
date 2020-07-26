# 組件的生命週期

## Vue 實體的建立

Vue 的實體從建立、掛載到渲染至瀏覽器畫面上，會經歷這幾個階段： `beforeCreate` 、 `created` 、 `beforeMount` 、 `mounted` 。

在 **`beforeCreate`** 期間，Vue 實體剛被建立，狀態與事件都尚未初始化，此時還無法取得 `data` 、 `prop` 、 `computed` 等屬性。

直到 Vue 實體內的各種屬性、狀態的偵測 (`getter` 與 `setter` ) 都已經初始化完成後，這才進入了 **`created`** 階段。

也就是說，若是我們需要透過遠端 API 來取得資料，至少得在 `created` 階段以後才能存取實體的 `data` 屬性。

當 `created` 階段完成後，Vue 的實體尚未與模板結合綁定，這個時候 Vue 實體會去尋找 `el` (2.x) 指定的節點 或 `template` 屬性來作為組件的模板。

而到了 Vue 3.0 則是需要在執行 `vm.mount(...)` 之後才會開始 `beforeCreate` 的階段。

## @hook 的那些事

一般在處理組件內的 **計時器** 時，都是這樣操作的：

```js{3,6}
export default {
  mounted() {
    this.timer = setInterval(() => { ... }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
```

但更好的做法是像這樣：

```js{4}
export default {
  mounted() {
    const timer = setInterval(() => { ... }, 1000);
    this.$once('hook:beforeDestroy', () => clearInterval(timer);)
  }
};
```

### `@hook` 指令

如果我們需要在資料渲染至畫面前，讓畫面的 `loading(載入狀態)` 顯示，`mounted` 後停止 `loading`。`beforeUpdate` 時顯示，`updated` 後停止。

最簡單的方法就是在子組件的生命週期函式(`mounted`、`beforeUpdate`、`updated`)時，通知父組件顯示或隱藏 `loading`。

但這樣做並不好，因為增加的邏輯和子組件本身的功能沒有關係。

較好的辦法是使用 `v-on="hook:xxx"`的方式：

```html{2,3,4}
<v-chart
  @hook:mounted="loading = false"
  @hook:beforeUpdated="loading = true"
  @hook:updated="loading = false"
  :data="data"
/>
```

這樣就實現了對子組件的生命週期監聽，且對任意的組件都有效果，包括引入的第三方組件。

### 參考連結

[@hook 那些事](https://juejin.im/post/5f18f3346fb9a07eb417d2d2?fbclid=IwAR2XjKTczA95c3hvh2cXmZMaKexP45aA9dY4CVUCOjHwr7C2oK-gFkzQ-SQ#heading-3)
