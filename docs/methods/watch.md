# `vm.$watch`

## 生命週期的 Hook 中

:::tip 優點

1.  彈性大
1.  `vm.$watch` 的第一個參數，可以回傳任何想要的值，甚至做到 **非同步處理** 也可以
1.  如要取消 `watch`，只能使用此方法

:::

```js
export default {
  data: {
    name: 'test',
    age: 18
  },
  created() {
    // vm.$watch 接受三個參數
    // 第一個：監控變數
    // 第二個：callback
    // 第三個：options
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
        // 函式所回傳的 this 並不會是組件本身，而是 nameWatcher 的 Watcher 物件
        before() {
          console.log('name watcher before');
        }
      }
    );
    this.name = 'test2';
  },
  beforeDestroy() {
    // 解除監看（ unwatch ）的方式，就是呼叫 $watch 所回傳的函式即可
    this.ageWatcher();
  }
};
```

## 生命週期

watch 被初始化的位置是在 `beforeCreate` 和 `created` 之間。如果我們於 `created` 中修改值，而 watch 只會在 `mounted` 時才會有反應。

但是，如加上 `immediate` 屬性，會發現 `handler` 被執行兩次，第一次在 `created`，第二次在 `mounted`。

![immediate](./immediate.jpg)

:::tip 提醒

如果在 `created` 和 watch 監看狀態的 `handler` 中，引用 **相同** 的方法時，可以改為下方方式：

1. 取消在 `created` 裡的引用
1. 在 watch 中加上 `immediate` 屬性

:::

:::warning 注意

在 watch 還有一件事情，無論你的第三參數為何，倘若你所監看的變數，並 **不會** 影響到渲染結果，那麼，在生命週期當中，關於組件的更新方法 `beforeUpdate` 與 `updated` 就不會被呼叫。

亦即，只有 watch 本身的 `handler` 會被執行而已。

:::

## 參考

[原始碼之藏在 \$watch 當中的神奇設定](https://ithelp.ithome.com.tw/articles/10216461)
