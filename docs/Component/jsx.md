# 渲染函式和 JSX

## 渲染函式

如果需要在 JavaScript 中建立 template 的內容時，可以使用 **渲染函式**，並結合 `render` 函式。

以渲染 `h1 ~ h6` 的範例，我們只能透過 `props` 把 `level` 傳入，並動態生成各個標題時，一般會以這樣實現：

```html
<script type="text/x-template" id="anchored-heading-template">
  <h1 v-if="level === 1">
    <slot></slot>
  </h1>
  <h2 v-else-if="level === 2">
    <slot></slot>
  </h2>
  <h3 v-else-if="level === 3">
    <slot></slot>
  </h3>
  <h4 v-else-if="level === 4">
    <slot></slot>
  </h4>
  <h5 v-else-if="level === 5">
    <slot></slot>
  </h5>
  <h6 v-else-if="level === 6">
    <slot></slot>
  </h6>
</script>
```

```js
Vue.component('anchored-heading', {
  template: '#anchored-heading-template',
  props: {
    level: {
      type: Number,
      required: true,
    },
  },
});
```

但這不是一個好方法，除了程式碼冗長外，也在需要有插槽的位置，重複寫了 `<slot></slot>`。

如果使用 `render` 函式來撰寫上面的範例，會像這樣：

```js{2,3,4,5,6}
Vue.component('anchored-heading', {
  render: function(createElement) {
    return createElement(
      'h' + this.level, // 標籤名稱
      this.$slots.default // 相當於 <slot></slot>
    );
  },
  props: {
    level: {
      type: Number,
      required: true,
    },
  },
});
```

<TryBox>
  <component-jsx-RenderHeaderTag />
</TryBox>

## 虛擬 DOM

Vue 透過建立一個虛擬的 DOM 來追蹤自己要如何改變真實的 DOM。

```js
return createElement('h1', this.blogTitle);
```

`createElement` 其實不是一個 **實際的** DOM 元素。更準確的名字可能是 `createNodeDescription`，因為它所包含的內容可以告訴 Vue 的畫面上需要渲染什麼樣的節點，包括再下一層的子節點。而這樣的節點描述也可以稱為 **虛擬節點(virtual node)**，也簡稱為 `VNode`。由 `VNode` 建立起的節點樹可以稱為 **虛擬 DOM**。

## createElement 參數

可以參考官網 `createElement` 中可以允許的 [參數](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0)。

### 重複多個元素或組件

可以使用下方的方式達成：

```js
render(createElement) {
  return createElement(
    "ul",
    Array.apply(null, { length: this.count }).map((item, index) =>
      createElement("li", `Count ${index + 1}`)
    )
  );
}
```

<TryBox>
  <component-jsx-RenderMultipleElement />
</TryBox>

## 使用 JavaScript 代替 `<template>` 功能

### v-if 和 v-for

我們要判斷是否資料有內容，如果沒有則顯示額外的文字，一般會這樣寫：

```html
<ul v-if="items.length">
  <li v-for="item in items">{{ item.name }}</li>
</ul>
<p v-else>No items found.</p>
```

而使用渲染函式，可以透過 JavaScript 的 `if`、`else`、`map` 來達成：

```js
render(createElement) {
  if (this.list.length) {
    return createElement(
      "ul",
      this.list.map((item) => {
        return createElement("li", item);
      })
    );
  } else return createElement("p", "No fruit was selected.");
}
```

<TryBox>
  <component-jsx-RenderIfWithFor />
</TryBox>

## JSX

安裝方式請看 [官方說明](https://github.com/vuejs/jsx)。

### 多元素渲染

使用 Javascript 的 `Array.map` 來達成。

子組件：

```js
const ChildComponent = {
  // 不使用生命週期
  functional: true,
  props: {
    name: String,
    age: Number,
  },
  render(createElement, { props }) {
    return (
      <li>
        Name：{props.name}，Age：{props.age}
      </li>
    );
  },
};
```

父組件：

`<template>` 改由 `render function` 產生。

```js{6,7,8}
export default {
  render() {
    return (
      <section class="jsxMap">
        <ul>
          {this.list.map((o) => (
            <ChildComponent key={o.name} {...{ props: o }} />
          ))}
        </ul>
      </section>
    );
  },
};
```

<TryBox>
  <component-jsx-JsxMap />
</TryBox>
