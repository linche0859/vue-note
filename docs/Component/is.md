# 動態組件管理

## is

- `:is` 後面接受一個 **Vue 元件實體**，或者是一個非同步傳輸的 Vue 元件實體，也可以為 **字串**
- `$refs` 如果使用 `:is` 的時候，對於 `mounted` 有些為差異：

  - 如果是先 `import` 再指定，在 `mounted` 可以馬上取得該元件。
  - 如果是使用**非同步載入**，在 `mounted` 必須等待 `200ms` 之後才能拿到。

- 使用 `:is` 的元件，整個元件會被銷毀再重建。
- 父元件 `不保證` 其使用 `:is` 的子元件是不是一定會在 DOM 結構樹當中。

::: danger 注意
當使用 `:is` 來操作元件時，無論是否用了非同步載入，請務必確認綁定的動作 (如：偵聽事件) 有確實被移除。
:::

### 分頁標籤範例

```html {10}
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
```

```js
import Tab1 from '@/components/tab1.vue';
import Tab2 from '@/components/tab2.vue';

export default {
  name: 'App',
  data() {
    return {
      activiteTab: Tab1,
      tabs: [
        {
          id: 1,
          name: 'Tab 1',
          context: Tab1,
        },
        {
          id: 2,
          name: 'Tab 2',
          context: Tab2,
        },
      ],
    };
  },
  methods: {
    switchTab(id) {
      let index = this.tabs.findIndex((t) => t.id === id);
      if (index > -1) {
        this.activiteTab = this.tabs[index].context;
      }
    },
  },
};
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

```html {4,5,6,7,8,9}
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

## keep-alive

`<keep-alive>` 這個特殊的「組件」來做快取 (cache) 保留組件當下的狀態。使用方式很簡單，只要在需要保留的組件外用 `<keep-alive>` 標籤包住即可：

```html
<keep-alive>
  <component :is="currentTab"></component>
</keep-alive>
```

<TryBox>
  <component-is-KeepAliveWithIs />
</TryBox>

另外， `<keep-alive>` 除了可以搭配 `:is` 來使用外，也可以在 `v-if` 指令上搭配使用：

```html
<keep-alive>
  <component1 v-if="a > 1"></component1>
  <component2 v-else></component2>
</keep-alive>
```

不過要注意的是，由於 `<keep-alive>` 同時間 **只會有一個直屬的子組件被渲染**，所以若是與 `v-for` 指令搭配使用時需要特別注意這點。

### include 、 exclude 與 max 屬性

要是切換的子組件數量太多，而我們只想針對某些子組件進行快取 (或排除某些子組件)，
則可以透過 `<keep-alive>` 提供的 `include` 與 `exclude` 屬性來處理：

```html {1}
<keep-alive :include="home, about">
  <component :is="currentTab"></component>
</keep-alive>
```

<TryBox>
  <component-is-KeepAliveWithInclude />
</TryBox>

除了逗點分隔外，也可以利用 Regular Expression 或陣列的形式：

```html
<!-- 以 RegExp 作為 include 的條件 -->
<keep-alive :include="/(home|about)/">
  <component :is="currentTab"></component>
</keep-alive>
<!-- 以陣列作為 include 的條件 -->
<keep-alive :include="['home', 'about']">
  <component :is="currentTab"></component>
</keep-alive>
```

:::tip 提醒

`include` 與 `exclude` 對應的條件為子組件的 `name` 屬性，而不是子組件的標籤名。

```js
Vue.component('my-component', {
  name: 'Home-Component',
});
```

那麼在 `include` 的情況就寫成 `:include="'Home-Component'"` 。

:::

為了避免組件數量過多造成的性能浪費， `<keep-alive>` 也提供了 `max` 屬性來提供開發者指定快取的組件數量：

<TryBox>
  <component-is-KeepAliveWithMax />
</TryBox>

像這樣，我們就可以透過 `:max` 來指定快取的子組件數量， `<keep-alive>` 只會保留 **最後引入** 的兩個子組件狀態。
而 `:max` 也可與前面的 `:include` 或 `:exclude` 搭配使用，提供了開發上的靈活性。

## 特殊的生命週期: activated 與 deactivated

一般切換組件時的執行順序是：

「建立新的組件」(`created`) → 「銷毀目前組件」(`destroyed`) → 「掛載新的組件」(`mounted`)。

如果加上 `<keep-alive>` 標籤，在組件首次建立時，就會先進行 `created` → `mounted` → `activated` 三個階段，
而當我們切換至新的組件時，則會依序執行：

「建立新的組件」(`created`) → 「暫停目前組件」(`deactivated`) → 「掛載新的組件」(`mounted`) → 「啟用新的組件」(`activated`) 這幾個階段。

倘若前面已經執行過 `created` 階段而未被銷毀的組件，當它再次被啟用 (`activated`) 的時候，也只會執行 `activated` hook 而不是從 `created` 階段重新建立它的生命週期了。

## 參考

[Component 魔術方法](https://ithelp.ithome.com.tw/articles/10213949)

[動態組件管理](https://book.vue.tw/CH2/2-3.html)
