# 組件系統的特性

## 組件的分類與切分

常見的組件類型，大致可以分作這幾種類型：

- 展示型組件 (Presentation)
  - 以負責呈現 UI 為主的類型，我們很單純地把資料傳遞進去，然後 DOM 就根據我們丟進去的資料生成出來。這種組件的好處是可以提升 UI 的重複使用性。
- 容器型組件 (Container)
  - 這類型的組件主要負責與資料層的 service 溝通，包含了與 server 端、資料來源做溝通的邏輯，然後再將資料傳遞給前面所說的展示型組件。
- 互動型組件 (Interactive)
  - 像是大家所熟知的 elementUI、bootstrap 的 UI library 都屬於此種類型。這種類型的組件通常會包含許多的互動邏輯在裡面，但也與展示型組件同樣強調重複使用。像是表單、燈箱等各種互動元素都算在這類型。
- 功能型組件 (Functions)
  - 這類型的組件本身不渲染任何内容，主要負責將組件內容作為某種應用的延伸，或是某種機制的封裝。像是我們未來會提及的 `<transition>`、`<router-view>` 等都屬於此類型。

## 資料流

### 使用向下傳遞資料

因為把資料寫固定在子組件，無法達到重複利用，因此要把資料提到上層，從父組件傳下來給子組件

**父組件**

```html
<script>
  import Navbar from '@/components/Navbar';
  import Container from '@/components/Container';
  export default {
    name: 'learnComponent',
    components: {
      Navbar,
      Container,
    },
    data() {
      return {
        list: [
          {
            title: 'Heading1',
            info:
              'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. ',
            btntext: 'View details »',
          },
        ],
      };
    },
  };
</script>

<template>
  <div class="learnComponent">
    <Navbar />
    <Container :list="list" />
  </div>
</template>
```

## 命名規則

註冊組件的時候，可以使用首字大寫駝峰式的命名(pascal-case)：

```js
Vue.component('ChildItem', {
  template: '#child-template',
});
```

或是連字號(kebab-case)命名：

```js
Vue.component('child-item', {
  template: '#child-template',
});
```

但由於瀏覽器在解析 HTML 標籤的時候，並無大小寫之分，使用上必須改寫為連字號(kebab-case)標籤：

> 在 **HTML 檔案** 中，必須遵守 **kebab-case** 的使用方式。

```html
<child-item></child-item>
```

若是使用在 `.vue` 單一組件檔的 `<template>` 模板中，則無此限制。實務上仍建議一致使用 **連字號命名法** 最保險。

```html
<template>
  <!-- 在 .vue 檔案的模板中，最後都會被編譯為 JavaScript，所以兩種方式皆可 -->
  <child-item />
  <ChildItem />
</template>
```

## 事件名規則

`component` 中觸發一個 `camelCase` 名字的事件

```javascript
this.$emit('myEvent');
```

```html
<!-- 没有效果 -->
<my-component @my-event="doSomething"></my-component>
<!-- 有效果 -->
<my-component @myEvent="doSomething"></my-component>
```

::: tip 建議
子組件 `$emit` 的事件名稱使用 `kabab-case`。

父組件上綁定的事件名稱也使用 `kabab-case`。
:::

## 將網頁片段封裝為組件模板

1. 透過 template 屬性封裝
   ```js
   Vue.component('MediaBlock', {
     template: `
      <div class="media">
        <img src="" alt="">
        <div class="media-body">
          <h5></h5>
          <div>Lorem, ipsum dolor.</div>
        </div>
      </div>`,
   });
   ```
1. 透過 x-template 封裝模板

   然而，隨著專案規模的擴增，我們的 HTML 模板結構可能會變得越來越大，光是用 `template` 屬性直接掛上 HTML 字串時，可能你的程式架構就會變得不是那麼好閱讀、管理。

   這時候，我們可以把整個 HTML 模板區塊透過 `<script id="xxx" type="text/x-template"> ... </script>` 這樣的方式來封裝我們的 HTML 模板，這種方式通常被稱為「`X-Templates`」：

   ```html {1}
   <script type="text/x-template" id="mediaBlock">
     <div class="media">
       <img src="" alt="">
       <div class="media-body">
         <h5></h5>
         <div>Lorem, ipsum dolor.</div>
       </div>
     </div>
   </script>
   ```

   而子組件註冊的時候，我們就在原本的 template 屬性加上對應的 selector：

   ```js {2}
   Vue.component('MediaBlock', {
     template: '#mediaBlock',
   });
   ```

## 子組件的 data 必須是函式

若是想保留 `data` 屬性的初始狀態，又不希望引用全域變數造成 `data` 共用的污染，
則可以透過 `Object.assign` 與 `this.$options.data()` 重新指定組件內 `data` 的內容，
讓它回復到初始狀態：

```js
methods: {
  /**
   * 重置表單條件事件
   */
  resetFormHandler() {
    Object.assign(this.form, this.$options.data().form);
  }
}
```

<TryBox>
  <component-feature-ResetData />
</TryBox>

## `.sync` 修飾詞

欲修改父組件的資料，推薦使用 `update:myPropName`，如：

```javascript
this.$emit('update:title', newTitle);
```

一般父組件的寫法：

```html
<text-document
  :title="doc.title"
  @update:title="doc.title = $event"
></text-document>
```

使用 `.sync` 修飾詞：

```html
<text-document :title.sync="doc.title"></text-document>
```

如要傳遞多個 `prop` 的時候，可以將 `.sync` 和 `v-bind` 配合使用。

```html
<text-document v-bind.sync="doc"></text-document>
```

這樣會把 `doc` 物件中的每一個屬性 (如 `title`) 都作為一個獨立的 `prop` 傳進去。

## `vm.$emit`

![emit](https://i.imgur.com/UBaAAoQ.png)

### 自定義事件

1.  子組件發出 `$emit` 夾帶 value
1.  父組件接收事件，而觸發綁定的函式

**父組件**

```html
<custom-checkbox :item="item" @changeHandler="toggleTodo" />

<script>
  import customCheckbox from './customCheckbox.vue';
  export default {
    components: {
      customCheckbox
    },
    methods:{
      toggleTodo(){
        ...
      }
    }
  }
</script>
```

**子組件**

```html
<template>
  <div class="squaredFour">
    <input
      type="checkbox"
      :id="getID"
      :checked="item.done"
      @change="handleChange"
    />
    <label :for="getID" class="checkbox-icon"></label>
    <label :for="getID">{{ item.content }}</label>
  </div>
</template>

<script>
  export default {
    props: {
      item: Object,
    },
    computed: {
      getID() {
        // 為了解決 input 與 label 對應的 id
        return `custom_${Math.floor(Math.random() * 9999)}`;
      },
    },
    methods: {
      handleChange($event) {
        // $emit 向上傳遞的 value 包成 object
        this.$emit('changeHandler', {
          key: this.item.key,
          // checked(done) 直接使用 chackbox 狀態
          checked: $event.target.checked,
        });
      },
    },
  };
</script>
```
