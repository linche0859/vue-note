# Vue.filter

在 Vue.js 3.0 這個特性即將被移除。

Vue `filters` 的用法與其他 options API 一樣，以物件的形式在實體內定義一個 `filters` 屬性，如：

```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'hello',
  },
  filters: {
    capitalize: (value) => {
      if (!value) return '';
      value = value.toString();
      return value.chart(0).toUpperCase() + value.slice(1);
    },
  },
});
```

這個 `capitalize` 的 `filters` 會將傳入字串的首字轉為大寫字母後回傳。

在 HTML 模板中，我們用一個 `|` (pipe) 符號來表示它，`filters` 會將 `|` (pipe) 符號前面的值當作參數引入，並且回傳對應的內容。

```html
{{ msg | capitalize }}
```

:::danger 注意

`filters` 的 `function` 裡面是 "無法" 透過 `this` 來取得 Vue 實體的，當然也沒辦法對 `data` 內的狀態做任何額外處理。

:::

可以將 `filters` 視為 「Pure Function」，將相同的輸入丟入，永遠都會回傳相同的輸出，並且不對任何該函數以外的任何作用域產生影響。

所以一直以來，`filters` 都只被用來處理文字或屬性的格式化。

## 參考

[補充 - Vue Filters](https://book.vue.tw/CH1/1-3.html)
