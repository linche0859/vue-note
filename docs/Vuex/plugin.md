# Plugins

## 說明

:::danger 注意
如果取資料的方式是 `AJAX`，樣板會先渲染，後來才是資料。
:::

傳統作法會在 `created` 作取值 (非同步傳輸)，但其子組件也都要做 (原因：父組件可能還在 `created` 中取值，子組件已經走過 `created`)。

### 順序

執行順序優先於 `beforeEach`。

### Vuex 取值無效處

雖然在 Plugin 中先賦予值（即便不是非同步拿的資料），在組件當中，還是得在 `created()` 之後才拿得到資料。

```js
export default {
  computed: mapGetters(['getUserData']),
  data() {
    console.log(this.getUserData.name);
    return {};
  },
  beforeCreate() {
    console.log(this.getUserData.name);
  },
  created() {
    console.log(this.getUserData.name);
  },
  mounted() {
    console.log(this.getUserData.name);
  },
};
```

```
TypeError: Cannot read property 'name' of undefined
TypeError: Cannot read property 'name' of undefined
"hinablue"
"hinablue"
```

## 範例

**Vuex.store**

```js
function fetchUserData() {
  return store => {
    store.subscribe((mutation, state) => {
      if (mutation.type === 'router/ROUTE_CHANGED') {
        // 由於 Vue-Router 會觸發 ROUTE_CHANGED
        // 所以我們只在這個時候作一次，避免重複被觸發
        store.dispatch('fetchUserData');
      }
    });
  };
}

const store = new Vuex.Store({
  modules: {
    ...
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [fetchUserData()]
})
```

如果 Plugin 拿不到資料的時候，一樣會出現錯誤。

::: tip 解法

1.  只能在 Plugin 中先給 **預設值**
1.  在取資料失敗的時候給 **預設值**
1.  `dispatch` 或 `commit` 執行失敗的時候，給予資料 **預設值**
1.  不管怎樣就是要給 **預設值**

:::

## 參考

[關於 plugins 的事情](https://blog.hinablue.me/vuejs-vuex-2-0-guan-yu-plugins-de-shi-qing/)
