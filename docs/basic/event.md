# 事件處理

## 事件修飾子

### `.self`

`.self` 的作用，只會觸發元素自己的事件行為，由子層元素傳遞來的事件則不會觸發。

以 modal 為範例：

```html {2}
<div class="modal-mask">
  <div class="modal-container" @click.self="show = false">
    <div class="modal-body">
      Hello
    </div>
  </div>
</div>
<base-button @click.native="show = true"></base-button>
```

<TryBox>
  <basic-event-Self />
</TryBox>

如果未加上 `.self`，再點選 `modal-body` 區塊，因於 `modal-container` 的內容，所以 modal 會跟著關閉。

若是在 `modal-container` 的 click 事件加上 `.self` 修飾子，即可排除這個問題。

:::tip 提醒

一個指令可以同時加入多個修飾子，而修飾子的 **順序會影響執行的結果**。

如 `v-on:click.prevent.self` 會先執行 `prevent` 的動作，阻擋所有的點擊行為。
而 `v-on:click.self.prevent` 會先執行 `self` ，只會阻擋該元素自己的點擊行為。

:::

### `.passive`

`.passive` 等同於 `addEventListener` 的 `passive` 屬性，
用途是告訴瀏覽器這個事件處理器會不會呼叫 `event.preventDefault` 來停止瀏覽器的原生行為。

```html
<div @scroll.passive="onScroll">...</div>
```

這個屬性較常見在用來改善 `scroll` 事件的效能，因為以前瀏覽器要多判斷 `scroll` 事件會不會被 `preventDefault` ，
加上 `passive` 屬性之後就直接略過這個判斷，當 `passive` 為 `true` 表示此事件不會被 `preventDefault`。

換句話說， `.passive` 修飾子無法與 `.prevent` 一起使用，因為這時 `.prevent` 會直接被無視。

## 鍵盤修飾子

### `.exact` 精確判斷

如果使用 `@keydown.enter` 修飾子，輸入框同時按下 `Ctrl` + `Enter` 鍵的時候也會執行方法，但加上 `.exact` 之後就只有在按下 Enter 鍵的時候才會執行。

```html {1}
<input type="text" v.model.trim="msg" @keydown.enter.exact="addMessages" />
```

`.exact` 通常被用來作為系統按鍵的各種組合判斷使用。

## 參考

[事件處理](https://book.vue.tw/CH1/1-5.html)
