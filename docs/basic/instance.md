# 實體

## 掛載至 DOM

:::danger 注意

不可將 `html` 或 `body` 標籤指定為 Vue 實體的 `el` 目標屬性。

:::

除了透過 options 物件內的 `el` 屬性指定目標 DOM 節點外，我們還能夠過 Vue 實體提供的 `$mount` 方法來指定：

```js
const vm = new Vue({
  // options
});

// 新增節點，在加入至 body
const el = document.createElement('div');
document.body.appendChild(el);

// 將 vue 實體掛載至新生成的節點
vm.$mount(el);
```

像這樣，我們可以先將 Vue 實體物件 `new` 出來而不透過 `el` 屬性掛載，而是在適當的時機透過 `$mount` 方法才指定掛載。
假如我們要掛載的目標節點是透過動態的方式生成，等待節點生成後再透過 `$mount` 方法指定掛載，就可以排除 Vue.js 一開始找不到節點的問題。

:::tip 提醒

`el` 屬性與 `$mount()` 的目標節點可以是 CSS 選擇器，也可以是 DOM 物件 (如 document.querySelector 取得的 DOM 物件)。
在 CSS 選擇器的狀況下，並沒有硬性規定只能用 `id` 作為選擇器的條件，也可以用 `class` 甚至是 `tagName` 作為選擇條件。

但需要注意的是，若同時有多個符合條件的元素，只有被選出的「第一個」元素會被 Vue 實體掛載。
:::

## data 宣告

:::danger 注意

在 Vue.js 的實體當中，以底線 `_` 或錢字號 `$` 作為開頭的屬性，不會被加上 `getter` 與 `setter` 的特性，如:

```html
<div id="app">
  {{ $hello }}
</div>
```

```js
const vm = new Vue({
  el: '#app',
  data: {
    $hello: 'Hello World',
  },
});
```

此時畫面不會出現任何結果，而且還會在 console 主控台看到這樣的錯誤訊息： `[Vue warn]: Property or method "$hello" is not defined on the instance but referenced during render. Make sure to declare reactive data properties in the data option.`

這是由於以底線 `_` 或錢字號 `$` 作為開頭的屬性，可能會與 Vue.js 內建的屬性與 API 名稱產生衝突，所以應該盡量避免。

:::

## 參考

[Vue.js 的核心: 實體](https://book.vue.tw/CH1/1-2.html)
