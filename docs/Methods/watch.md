# `vm.$watch`

## 生命週期的 Hook 中

:::tip 優點

1.  彈性大
1.  如要取消 `watch`，只能使用此方法

:::

```js
new Vue({
  el: '#app',
  data: {
    name: 'test',
    age: 18,
  },
  beforeCreate() {
    console.log('beforeCreate');
  },
  created() {
    console.log('created');
    // vm.$watch 接受三個參數
    // 第一個：監控變數
    // 第二個：callback
    // 第三個：options
    this.ageWatcher = this.$watch(
      () => {
        return this.age;
      },
      (newAge, oldAge) => {
        console.log('age updated');
      }
    );
    this.nameWatcher = this.$watch(
      () => {
        return this.name;
      },
      (newName, oldName) => {
        console.log('name updated');
      },
      {
        immediate: true,

        // 深度觀察
        // deep: true,

        // 執行優先於 handler
        // 可以在這邊做一些相對應的邏輯操作
        before() {
          console.log(this);
          console.log('name watcher before');
        },
      }
    );
    this.name = 'test2';
  },
  mounted() {
    console.log('mounted');
    this.age = 20;
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    console.log('updated');
  },
  beforeDestroy() {
    // 解除監看（ unwatch ）的方式，就是呼叫 $watch 所回傳的函式即可
    this.ageWatcher();
  },
});
```

## 生命週期

於 `created` 中修改值，而 `watch` 只會在 `mounted` 才會有反應。

但是，如加上 `immediate` 參數，會發現 `handler` 被執行兩次，第一次在 `created`，第二次在 `mounted`。

![immediate](./immediate.jpg)

:::warning 注意
在 `watch` 還有一件事情，無論你的第三參數為何，倘若你所監看的變數，並 **不會** 影響到渲染結果，那麼，在生命週期當中，關於元件的更新方法 `beforeUpdate` 與 `updated` 就不會被呼叫。

亦即，只有 `watch` 本身的 `handler` 會被執行而已。
:::

## 參考

[原始碼之藏在 \$watch 當中的神奇設定](https://ithelp.ithome.com.tw/articles/10216461)
