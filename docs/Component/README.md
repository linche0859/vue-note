# 基本使用

## 資料流

### 使用向下傳遞資料

因為把資料寫固定在子元件，無法達到重複利用，因此要把資料提到上層，從父元件傳下來給子元件

**父元件**

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
          {
            title: 'Heading2',
            info:
              'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. ',
            btntext: 'View details »',
          },
          {
            title: 'Heading3',
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

**子元件**

```html
<script>
  export default {
    name: 'container',
    props: {
      list: Array,
    },
  };
</script>
<div class="container">
  <div class="row">
    <div :class="'col-md-4'+' border' + index" v-for="(item,index) in list">
      <h2>{{ item.title }}</h2>
      <p>{{ item.info }}</p>
      <p>
        <a class="btn btn-default" href="#" role="button">{{ item.btntext }}</a>
      </p>
    </div>
  </div>
</div>
<style lang="scss" scoped>
  $borderOrange: coral;
  $borderGreen: green;
  $borderBlue: blue;

  .container {
    @for $i from 0 through 2 {
      // class使用變數 : #{變數}
      .border#{$i} {
        border-style: solid;
        @if $i == 0 {
          border-color: $borderOrange;
        } @else if $i == 1 {
          border-color: $borderGreen;
        } @else {
          border-color: $borderBlue;
        }
      }
    }
  }
</style>
```

## 命名規則

如果在 Vue Instance 中的 `$data` 變數為 `camelCase` ，則在 template 中需改為 `kebab-case`

**父元件**

```html
<child style="border:1px solid #CCC;" :msg-text.sync="msgText" />
```

**子元件**

```javascript
Vue.component('child', {
  template: '#child-template',
  props: {
    msgText: {
      type: String,
      required: true,
    },
  },
  computed: {
    newVal: {
      get() {
        return this.msgText;
      },
      set(newVal) {
        this.$emit('update:msgText', newVal);
      },
    },
  },
});

new Vue({
  el: '#app',
  data() {
    return {
      msgText: 'test',
    };
  },
});
```

## 事件名規則

`component` 中觸發一個 `camelCase` 名字的事件

```javascript
this.$emit('myEvent');
```

```html
<!-- 没有效果 -->
<my-component @my-event="doSomething"></my-component>
<my-component @myEvent="doSomething"></my-component>
```

::: tip 官方建議
子元件 `$emit` 的事件名稱使用 `kabab-case`。

父元件上綁定的事件名稱也使用 `kabab-case`。
:::

## `.sync` 修飾詞

欲修改父元件的資料，推薦使用 `update:myPropName`，如

```javascript
this.$emit('update:title', newTitle);
```

一般父元件的寫法

```html
<text-document
  :title="doc.title"
  @update:title="doc.title = $event"
></text-document>
```

使用 `.sync` 修飾詞

```html
<text-document :title.sync="doc.title"></text-document>
```

如要傳遞多個 `prop` 的時候，可以將 `.sync` 和 `v-bind` 配合使用

```html
<text-document v-bind.sync="doc"></text-document>
```

這樣會把 `doc` 物件中的每一個屬性 (如 `title`) 都作為一個獨立的 `prop` 傳進去

## `$emit`

![emit](https://i.imgur.com/UBaAAoQ.png)

### 自定義事件

1.  子元件發出 `$emit` 夾帶 value
1.  父元件接收事件，而觸發綁定的函式

> :pencil: **子元件使用父元件的事件**

**父元件**

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

**子元件**

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
