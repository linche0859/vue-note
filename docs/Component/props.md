# `vm.$props`

## 不是 `Props` 的 DOM 屬性

如果在元件上設定屬性並沒有在元件中的 `props` 被定義，這個屬性會直接套用在元件的 **根元素** 上

範例如下方

## 合併父元件及子元件屬性

`class` 及 `style` 在合併父元件及子元件時會將父子元件所有的屬性合併

**子元件**

加上 `class="thick"`：

```js
Vue.component('kebab-case-converter', {
  ...
  template: '<div class="thick">kabeb-case : {{kababCase}}</div>'
})
```

**父元件**

加上 `class="italic"`：

```html
<kebab-case-converter
  class="italic"
  data-test="test data"
  :camel-case="camelCase"
></kebab-case-converter>
```

**結果**

父元件的 `class` 屬性會跟子元件的 `class` 做合併

```html
<div class="thick italic" data-test="test data">kabeb-case : hello</div>
```

## 由父元件替代子元件的屬性

除了 `class` 及 `style` 之外的其他屬性都會是由父元件蓋掉子元件屬性值

**子元件 template**

```html
<div class="thick" data-test="child">kabeb-case : {{kababCase}}</div>
```

**父元件**

```html
<kebab-case-converter
  class="italic"
  data-test="parent"
  :camel-case="camelCase"
></kebab-case-converter>
```

**結果**

```html
<div data-test="parent" class="thick italic">kabeb-case :</div>
```

## 避免替代屬性

父元件的屬性蓋掉子元件的值有時會產生非預期的結果，為了避免這樣的問題， Vue 提供了 `inheritAttrs` 這個參數，它可以將元件設為不要帶入父元件的屬性值(只有那些沒有設定於子元件 `porps` 中的屬性值不會被帶入)。

`inheritAttrs` 常常搭配 `$attrs` 這個物件設定， `$attrs` 是 _父元件_ 的屬性集合(沒有包含 `props` 中的屬性值)，有時我們不想將屬性值設於根元素中，可以使用 `inheritAttrs` 取消綁定屬性到根元素的行為，並且使用 `$attrs` 將屬性值綁定要我們期望的元素上。

:::warning 注意
`class` 跟 `style` 不會受 `inheritAttrs` 效果影響，也不會包在 `$attrs` 物件上。
:::

**子元件**

```js
Vue.component('base-checkbox', {
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: Boolean,
  },
  template: `
          <div>
            <input
              type="checkbox"
              v-bind="$attrs"
              v-bind:checked="checked"
              v-on:change="$emit('change', $event.target.checked)"
            >
          </div>
        `,
});
```

**父元件**

```html
<base-checkbox
  v-model="lovingVue"
  class="thick"
  data-test="parent"
></base-checkbox>
```

**結果**

```html
<div class="thick">
  <input type="checkbox" data-test="parent" />
</div>
```

- `class` 因 `inheritAttrs` 及 `$attrs` 對 `class` 無效，所以還是在 **根元素** 上。
- `data-test` 因 `inheritAttrs` 的影響，所以 _不會_ 出現在根元素上，但因 `$attrs` 綁定，所以會在 `input` 上。

## 客製元件的 `v-model`

`v-model` 是 `v-bind:value` 及 `v-on:input` 的語法糖，它的作用是做 **雙向綁定**，但有些像是 `radio` 及 `checkbox` 需要 `value` 去綁定各別選項的值，而真正勾選的值是由像是 `checked` 之類的屬性綁定，為了避免 `v-model` 產生衝突，可以將 `model` 改為 `v-bind:checked` 及 `v-on:change` 來讓 `v-model` 運作正常。

**`checkbox` 的 `v-model`**

```js
Vue.component('base-checkbox', {
  model: {
    // 預設為 value
    prop: 'checked',
    // 預設為 input
    event: 'change',
  },
  // 跟 value 一樣， v-model 的 prop : checked 要設定在 props 中
  props: ['checked', 'label'],
  template: `
    <label>
      <input
        type="checkbox"
        :checked="checked"
        @change="$emit('change', $event.target.checked)"
      >
      {{label}}
    </label>
  `,
});
```

`model` 物件，這個物件有兩個屬性 `prop` 及 `event` :

- `prop` : 目標屬性。
- `event` : 監聽的事件。

## 綁定原生事件

替整個 `component` 加上事件(`click`，`focus`)，需使用 `.native` 修飾詞

```html
<base-input @focus.native="onFocus"></base-input>
```

但如果當 `base-input` 為

```html
<label>
  {{ label }}
  <input
    v-bind="$attrs"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  />
</label>
```

因為根元素是 `<label>` 而非 `<input>` ，所以 `@focus.native` 會綁定到 `<label>` 導致 `focus` 事件不會被觸發，為了解決這個問題， Vue 提供了 `$listeners` ，這個物件包含 **所有** 的父元件事件(排除有 `native` 修飾符的事件)，如此一來我們就可以使用 `$listeners` 綁定想要的元素。

**修改子元件**

```html
<label>
  {{label}}
  <input v-bind="$attrs" v-bind:value="value" v-on="$listeners" />
</label>
```

將父元件中的 `focus` 事件 **拿掉** `native` 修飾符

```html
<base-input-with-label @focus="onFocus"></base-input-with-label>
```

## 切分 `$listeners` 的多個事件

**子元件**

```js
Vue.component('base-input-with-label', {
  props: ['value'],
  computed: {
    // 透過 DevTool 可以看到，只有 input 事件是可以觸發的，其它的因為未定義，而是 invoke
    inputListeners() {
      const vm = this;
      // 使用 Object.assign 合併物件
      return Object.assign(
        {},
        // 將 $listeners 的事件當作預設值
        this.$listeners,
        {
          // 覆蓋 $listeners 中的 input 事件
          input(event) {
            // 這時候的 this 為原生 window 原生事件
            vm.$emit('input', event.target.value);
          },
        }
      );
    },
    focusListeners() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        // 覆蓋 $listeners 中的 focus 事件
        focus(event) {
          console.log('this is from child focus event');
        },
      });
    },
  },
  template: `
          <label>
            {{value}}
            <!--只會觸發 focus 事件-->
            <input v-on="focusListeners">
          </label>
        `,
});
```

**父元件**

```html
<base-input-with-label @focus="onFocus" v-model="label"></base-input-with-label>
```

## 參考

[屬性注意事項](https://ithelp.ithome.com.tw/articles/10208723?sc=rss.iron)

[客製事件](https://ithelp.ithome.com.tw/articles/10209183)
