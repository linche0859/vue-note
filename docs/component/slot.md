# Slot 插槽

## 具名插槽

以 lightbox 為例，
將 `lightBox` 組件分為 `header` 、 `body` 與 `footer` 三個部分，
並在 `header` 與 `footer` 加入 `name` 屬性來做區隔：</p>

```html {3,6,9}
<div class="modal-container">
  <header class="modal-header">
    <slot name="header"></slot>
  </header>
  <div class="modal-body">
    <slot>Default Body</slot>
  </div>
  <footer class="modal-footer">
    <slot name="footer"></slot>
  </footer>
</div>
```

```html
<!-- 當父層沒有引用插槽時，則會帶入預設值 -->
<light-box>
  <h2 slot="header">This's from parent header</h2>
  <h6 slot="footer">This's from parent footer</h6>
</light-box>
```

當要在具名的插槽帶入對應內容時，需在 HTML 標籤裡加入 `slot` 屬性，指定該節點要出現在哪個對應的 `slot` 位置。而未指定 `name` 的部分，則會全部歸到未命名的 `slot`，也就是 `modal-body` 的區塊中。</p>

<TryBox>
  <component-slot-NamedSlot />
</TryBox>

---

另外，除了使用 `slot` 屬性，我們也可以利用 `v-slot` 搭配 `<template>` 標籤做到同樣的效果：</p>

```html {3,8}
<light-box>
  <!-- 效果等同於 slot="header" -->
  <template v-slot:header>
    <h2>This's from parent header</h2>
  </template>

  <!-- 效果等同於 v-slot:header -->
  <template #header>
    <h2>This's from parent header</h2>
  </template>
</light-box>
```

:::tip 提醒

`v-slot` 只能與 `<template>` 標籤搭配使用。</p>

如果沒有提供 `name` 屬性的 `slot`， Vue 會預設給它一個 `default` 的名稱，
也就是說，我們可以利用 `slot="default"` 或 `<template v-slot:default>` 來指定無提供 `name` 的 `slot`。</p>

:::

### 動態切換具名插槽

`slot` 也能像動態組件一樣即時切換， 只需要改寫 `v-slot`：</p>

```html {2}
<light-box>
  <template v-slot:[dynamicSlotName]>
    <h2>DynamicNamedSlot</h2>
  </template>
</light-box>
```

<TryBox>
  <component-slot-DynamicNamedSlot />
</TryBox>

## Scoped Slots

將子組件內的狀態透過 `slot` 提供給外層存取。

### 多國語系的應用

在子組件中定義中文、日文和英文版本的「哈囉 世界」，並且由 `props` 傳入要顯示的語系：

```js
props: {
  lang: {
    type: String,
    default: "tw",
    required: true
  }
},
data() {
  return {
    helloString: {
      tw: "哈囉！世界",
      jp: "こんにちは！世界",
      en: "Hello world"
    }
  };
}
```

如果希望在 **子層組件的 `slot` 中也能使用子組件的狀態**，就需透過 Scoped Slots 特性來處理。

外層組件的 `data`：

```js
langOptions: [
  { name: "繁體中文", val: "tw" },
  { name: "日本語", val: "jp" },
  { name: "English", val: "en" }
],
lang: "tw"
```

接著改寫 多語言組件內的 `slot` 標籤，讓它可以透過 `hello` 屬性將狀態往外拋給外層：

```html {2}
<div class="multipleLanguage">
  <slot :hello="helloString[lang]"></slot>
</div>
```

外層的模板需要加上 **`template` 標籤**，以及 `v-slot:default="props"`：

```html {2,3,4}
<light-box :show="show">
  <multiple-language :lang="lang" v-slot:default="props">
    {{ `${langOptions.find(x => x.val === lang)['name']}：${props.hello}` }}
  </multiple-language>
</light-box>
```

或是透過物件解構的語法：

```html {2,3,4}
<light-box :show="show">
  <multiple-language :lang="lang" v-slot:default="{hello}">
    {{ `${langOptions.find(x => x.val === lang)['name']}：${hello}` }}
  </multiple-language>
</light-box>
```

<TryBox>
  <component-slot-ScopedSlot />
</TryBox>
