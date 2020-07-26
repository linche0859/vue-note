# 動態指令參數

指令參數可以接受動態 JavaScript 的表達式，而動態參數值要為 **字串**，但允許 `null` 作為一個明確指示應該刪除綁定的特殊值，任何其他非字串值都有可能會出錯。(僅適用於 `v-bind` 和 `v-on`)

```html
<!-- 這會觸發編譯的警告且無效 -->
<a v-bind:['foo' + bar]="value"> ... </a>
```

如果要在動態參數中使用表達式，應使用 **沒有空格或引號的表達式**，或用計算屬性替代這種複雜的表達式。

### 指令的綁定

```html
<div v-bind:[attr]="attributeName"></div>
<!-- 也可以這樣寫 -->
<div :[attr]="attributeName"></div>
```

如果 `attr` 的值為 `id`，綁定結果將會等於：

```html
<div :id="attributeName"></div>
```

### 事件名稱的綁定

同樣的，也可以使用動態參數作為一個動態事件名稱的綁定。

```html
<button v-on:[eventName]="handler"></button>
<!-- 也可以這樣寫 -->
<button @[eventName]="handler"></button>
```

### 插槽的綁定

```html
<my-component>
  <template v-slot:[slotName]>
    Dynamic slot name
  </template>
</my-component>
<!-- 也可以這樣寫 -->
<my-component>
  <template #[slotName]>
    Default slot
  </template>
</my-component>
```

## 參考連結

[動態指令參數](https://juejin.im/post/5f18f3346fb9a07eb417d2d2?fbclid=IwAR2XjKTczA95c3hvh2cXmZMaKexP45aA9dY4CVUCOjHwr7C2oK-gFkzQ-SQ#heading-2)
