# `:is`

## 注意

- `:is` 後面接受一個 Vue 元件實體，或者是一個非同步傳輸的 Vue 元件實體，也可以為字串
- `$refs` 如果使用 `:is` 的時候，對於 `mounted` 有些為差異：

  - 如果是先 `import` 再指定，你在 `mounted` 可以馬上取得該元件。
  - 如果是使用**非同步載入**，你在 `mounted` 必須等待 `200ms` 之後才能拿到。

- 使用 `:is` 的元件，整個元件會被銷毀再重建。
- 父元件 `不保證` 其使用 `:is` 的子元件是不是一定會在 DOM 結構樹當中。
- 當你使用 `:is` 來操作元件時，無論你是否用了非同步載入

::: danger 注意
請務必確認綁定的動作有確實被移除
:::

## 範例

### 分頁標籤

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

### 非同步載入的 200ms

```html
<script>
  const HelloWorld = () => ({
    component: import('@/components/HelloWorld.vue')
  });

  export default {
    name: 'App',
    data() {
      return {
        myComponent: HelloWorld
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
    }
  };
</script>
```

結果

![async load](./async.png)

### 非同步載入

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

## 參考

[Component 魔術方法](https://ithelp.ithome.com.tw/articles/10213949)
