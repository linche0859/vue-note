# 組件之間的溝通傳遞

:::tip 提醒

注意 `prop` 在初始化時的順序會優於 `data` 、 `computed` 等屬性，所以像 `props` 中的 `default` 、 `validator` 是無法取得實體內的這些狀態。

:::

## props

主要的核心概念：

- 多數用於 **一次性** 的設定值，沒有一定要雙向綁定的需求
- 這些組件都已經是末端組件，換句話說，子組件下不太會有其他子組件存在
- 會搭配 Slot 來做到組件變化，而不是再寫一個子組件
- 當你必須要使用其他子組件時，請改用事件傳遞所需要的資料
- `props` 所承接的資料，絕大多數不會過於複雜

  以分頁為範例，應該將各分頁的資料分開來寫，不要全部傳入子組件。

  子組件

  ```js
  // bad - 傳入整個物件
  export default {
    name: 'Pagination',
    props: {
      pager: {
        type: Object,
        required: true
      }
    }
  };
  // good - 屬性分開傳入
  export default {
    name: 'Pagination',
    props: {
      totlaItems: {
        type: Number,
        required: true
      },
      limit: {
        type: Number,
        required: true
      },
      first: {
        type: Number,
        required: true
      },
      current: {
        type: Number,
        required: true
      }
    }
  };
  ```

  父組件

  ```html
  <!-- bad -->
  <pagination :pager="pager"></pagination>

  <!-- good -->
  <ul>
    <li v-for="page in pager">
      <pagination v-bind="page"></pagination>
    </li>
  </ul>
  ```

## 傳入 props 時沒有加上 v-bind

一律以「純文字」的形式在子組件被接收，而不是外層組件的狀態。

實務上，除了忘記加上 `v-bind` 指令的情況外，通常會使用在希望後端直接輸出網頁內容時，
預先將傳入子組件的內容印在 HTML 的標籤上，這樣可以節省掉一次 request。

## 以物件作為 props 傳遞

由於 JavaScript 的物件是以「**參考**」的方式來傳遞的 (pass by reference) ，所以若是要由外層組件傳遞物件至內層子組件時，則需要特別小心。

```html
<edit-component
  v-for="comic in comics"
  :key="comic.id"
  :comic="comic"
></edit-component>
```

<TryBox>
  <component-props-PropsObject />
</TryBox>

乍看之下感覺沒什麼問題，但是此時若我們嘗試在子組件對 `input` 進行修改，
就會發現外層的資料也被變動了！

這時就可能由於某個子組件的修改，卻造成另一個子組件的 `props` 狀態污染，產生難以追蹤且不可預期的錯誤了。

所以，想要傳遞物件類型的 `props` 屬性時，先將物件屬性解構後再傳遞出去：

```html {4,5,6}
<edit-component
  v-for="comic in comics"
  :key="comic.id"
  :id="comic.id"
  :name="comic.name"
  :time="comic.time"
></edit-component>
```

如果覺得把所有的屬性打散，可以透過 `v-bind` 指令，達到自動將物件解構效果：

```html {4}
<edit-component
  v-for="comic in comics"
  :key="comic.id"
  v-bind="comic"
></edit-component>
```

<TryBox>
  <component-props-PropsDestruct />
</TryBox>

## 父組件存取子組件的 DOM 元素

如需要在子組件取得父層組件的內容，可以透過 `this.$parent` 來存取他的父層組件，反過來則是可以在外層透過 `this.$children` 來取得子組件的內容。

另外，由於 `this.$children` 是以「陣列」的形式產生，
而這個陣列有可能因為 `v-if` 或其他操作造成 `this.$children` 索引值的更動，
此時我們可以在子組件上加上 `ref` 屬性作為別名：

```html
<div class="parent">
  <child-component ref="child"></child-component>
</div>
```

這樣就可以在父層透過 `this.$refs.child` 就可以來存取指定的子組件了。

## 不是 `Props` 的 DOM 屬性

如果在組件上設定屬性並沒有在組件中的 `props` 被定義，這個屬性會直接套用在組件的 **根元素** 上。

範例如下方。

## 合併父組件及子組件屬性

`class` 及 `style` 在合併父組件及子組件時會將父子組件所有的屬性合併。

**子組件**

加上 `class="thick"`：

```js
Vue.component('kebab-case-converter', {
  ...
  template: '<div class="thick">kabeb-case : {{kababCase}}</div>'
})
```

**父組件**

加上 `class="italic"`：

```html
<kebab-case-converter
  class="italic"
  data-test="test data"
  :camel-case="camelCase"
></kebab-case-converter>
```

**結果**

父組件的 class 屬性會跟子組件的 class 做合併。

```html
<div class="thick italic" data-test="test data">kabeb-case : hello</div>
```

## 由父組件替代子組件的屬性

除了 `class` 及 `style` 之外的其他屬性都會是由父組件蓋掉子組件屬性值

**子組件**

```html
<div class="thick" data-test="child">kabeb-case : {{kababCase}}</div>
```

**父組件**

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

父組件的屬性蓋掉子組件的值有時會產生非預期的結果，為了避免這樣的問題， Vue 提供了 `inheritAttrs` 這個參數，它可以將組件設為不要帶入父組件的屬性值(只有那些沒有設定於子組件 `porps` 中的屬性值不會被帶入)。

`inheritAttrs` 常常搭配 `$attrs` 這個物件設定， `$attrs` 是 **父組件的屬性集合(沒有包含 `props` 中的屬性值)**，有時我們不想將屬性值設於根元素中，可以使用 `inheritAttrs` 取消綁定屬性到根元素的行為，並且使用 `$attrs` 將屬性值綁定要我們期望的元素上。

:::warning 注意
`class` 跟 `style` 不會受 `inheritAttrs` 效果影響，也不會包在 `$attrs` 物件上。
:::

**子組件**

```js{2}
Vue.component('base-checkbox', {
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
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
        `
});
```

**父組件**

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
- `data-test` 因 `inheritAttrs` 的影響，所以 **不會** 出現在根元素上，但因 `$attrs` 綁定，所以會在 `input` 上。

## 客製組件的 `v-model`

`v-model` 是 `v-bind:value` 及 `v-on:input` 的語法糖，它的作用是做 **雙向綁定**，但有些像是 `radio` 及 `checkbox` 需要 `value` 去綁定各別選項的值，而真正勾選的值是由像是 `checked` 之類的屬性綁定，為了避免 `v-model` 產生衝突，可以將 `model` 改為 `v-bind:checked` 及 `v-on:change` 來讓 `v-model` 運作正常。

checkbox 的 `v-model`：

```js{14,15}
Vue.component('base-checkbox', {
  model: {
    // 預設為 value
    prop: 'checked',
    // 預設為 input
    event: 'change'
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
  `
});
```

### `model` 物件

這個物件有兩個屬性 `prop` 及 `event` :

- `prop` : 目標屬性。
- `event` : 監聽的事件。

## 綁定原生事件

替整個組件加上事件(`click`，`focus`)，需使用 `.native` 修飾詞。

```html
<base-input @focus.native="onFocus"></base-input>
```

但如果當 `base-input` 為：

```html{1,8}
<label>
  {{ label }}
  <input
    v-bind="$attrs"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  />
</label>
```

因為根元素是 `<label>` 而非 `<input>` ，所以 `@focus.native` 會綁定到 `<label>` 導致 `focus` 事件不會被觸發，為了解決這個問題， Vue 提供了 `$listeners` ，這個物件包含 **所有** 的父組件事件(排除有 `native` 修飾符的事件)，如此一來我們就可以使用 `$listeners` 綁定想要的元素。

**修改子組件**

```html{3}
<label>
  {{label}}
  <input v-bind="$attrs" v-bind:value="value" v-on="$listeners" />
</label>
```

將父組件中的 `focus` 事件 **拿掉** `native` 修飾符。

```html
<base-input-with-label @focus="onFocus"></base-input-with-label>
```

## 切分 `$listeners` 的多個事件

**子組件**

```js
Vue.component('base-input-with-label', {
  props: ['value'],
  computed: {
    // 透過 DevTool 可以看到，只有 input 事件是可以觸發的
    // 其它的因為未定義，而是 invoke
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
          }
        }
      );
    },
    focusListeners() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        // 覆蓋 $listeners 中的 focus 事件
        focus(event) {
          console.log('this is from child focus event');
        }
      });
    }
  },
  template: `
          <label>
            {{value}}
            <!--只會觸發 focus 事件-->
            <input v-on="focusListeners">
          </label>
        `
});
```

**父組件**

```html
<base-input-with-label @focus="onFocus" v-model="label"></base-input-with-label>
```

## 參考

[屬性注意事項](https://ithelp.ithome.com.tw/articles/10208723?sc=rss.iron)

[客製事件](https://ithelp.ithome.com.tw/articles/10209183)

[組件之間的溝通傳遞](https://book.vue.tw/CH2/2-2.html)
