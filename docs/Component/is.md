# `is`

- `:is` 後面接受一個 Vue 元件實體，或者是一個非同步傳輸的 Vue 元件實體，也可以為字串
- `$refs` 如果使用 `:is` 的時候，對於 `mounted` 有些為差異：

  - 如果是先 `import` 再指定，在 `mounted` 可以馬上取得該元件。
  - 如果是使用**非同步載入**，在 `mounted` 必須等待 `200ms` 之後才能拿到。

- 使用 `:is` 的元件，整個元件會被銷毀再重建。
- 父元件 `不保證` 其使用 `:is` 的子元件是不是一定會在 DOM 結構樹當中。

::: danger 注意
當使用 `:is` 來操作元件時，無論是否用了非同步載入，請務必確認綁定的動作有確實被移除。
:::

## 範例

分頁標籤

```html
<template>
  <section>
    <ul>
      <li
        v-for="tab in tabs"
        :key="tab.id"
        v-text="tab.name"
        @click.prevent="switchTab(tab.id)"
      ></li>
    </ul>

    <div :is="activiteTab">
  </section>
</template>

<script>
import Tab1 from '@/components/tab1.vue'
import Tab2 from '@/components/tab2.vue'

export default {
  name: 'App',
  data () {
    return {
      activiteTab: Tab1,
      tabs: [
        {
          id: 1,
          name: 'Tab 1',
          context: Tab1
        },
        {
          id: 2,
          name: 'Tab 2',
          context: Tab2
        }
      ]
    }
  },
  methods: {
    switchTab(id) {
      let index = this.tabs.findIndex(t => t.id === id)
      if (index > -1) {
        this.activiteTab = this.tabs[index].context
      }
    }
  }
}
</script>
```

## 非同步載入的 200ms

```html
<script>
  const HelloWorld = () => ({
    component: import('@/components/HelloWorld.vue'),
  });

  export default {
    name: 'App',
    data() {
      return {
        myComponent: HelloWorld,
      };
    },
    created() {
      console.log('created, $refs count:', Object.keys(this.$refs).length);
    },
    mounted() {
      console.log('mounted, $refs count:', Object.keys(this.$refs).length);
      setTimeout(() => {
        console.log(
          'mounted after 200ms, $refs count:',
          Object.keys(this.$refs).length
        );
      }, 200);
    },
  };
</script>
```

結果

![async load](./async.png)

## 非同步載入

利用 `computed` 和 `Promise`

```html
<template>
  <section>
    <div :is="loadedComponent"></div>
  </section>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        activedComponent: 'Tab1'
      }
    },
    computed: {
      loadedComponent () {
        return ((component => {
          return () => ({
            component: import('@/components/' + component + '.vue')
          })
        })(this.activedComponent)
      }
    }
  }
</script>
```

## 解析 DOM 模板時的注意事項

在 `<ul>`、`<ol>`、`<table>` 和 `<select>`中，盡量 **勿使用** 如：

```html
<table>
  <tr-component></tr-component>
</table>
```

應使用，如：

```html
<div id="app">
  <table class="table">
    <tbody>
      <tr
        v-for="(item,key) in timeData"
        :is="price-component"
        :item="item"
        :key="key"
      ></tr>
    </tbody>
  </table>
</div>
<script type="text/x-template" id="filter-component">
  <tr>
    <td>{{item.name}}</td>
    <!-- 過濾順序：currency => dollarSign -->
    <td>{{item.price|currency|dollarSign}}</td>
  </tr>
</script>
```

```js
const priceChild = {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  template: '#filter-component',
  filters: {
    dollarSign(val) {
      return `$ ${val}`;
    },
    currency(val) {
      // replace 方法會將值切分如 5500 => ['5','5','0','0']
      // current: 每一個元件
      // newVal: 這裡為 toFixed後的結果，5500.00
      return val.toFixed(2).replace(/./g, (current, index, newVal) => {
        return index && current !== '.' && (newVal.length - index) % 3 === 0
          ? ',' + current
          : current;
      });
    },
  },
};

new Vue({
  el: '#app',
  data() {
    return {
      timeData: [
        {
          name: '薯條',
          price: 20.555,
        },
        {
          name: '甜不辣',
          price: 25,
        },
        {
          name: '黃金雞排',
          price: 55000.65,
        },
      ],
    };
  },
  components: {
    'price-component': priceChild,
  },
});
```

## 參考

[Component 魔術方法](https://ithelp.ithome.com.tw/articles/10213949)
