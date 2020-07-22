# 生命週期

::: warning 注意
`App.vue` 本身是所有程序的進入點，而且並沒有符合整個根目錄的任何組件或是執行方法。

所以，`App.vue` 自身是沒有辦法使用 Router 的 Hooks 方法的。
:::

## 路由流程

**父組件** :arrow_right: **父組件** (`Hello` :arrow_right: `Kitty`)

```sh{8,9}
Hello beforeRouteLeave
Kitty beforeEnter
Kitty beforeRouteEnter
App beforeUpdate
Kitty beforeCreate
Kitty created
Kitty beforeMount
Hello beforeDestroy
Hello destroyed
Kitty mounted
App updated
```

`Hello.vue` 的 `beforeDestory` 與 `destroyed` 是會發生於 `Kitty.vue` 的 `created`，`beforeMount` 之後 ，且在 `mounted` 之前。

**父組件** :arrow_right: **子組件** (`Hello` :arrow_right: `HelloKitty`)

```sh{1}
Hello beforeRouteUpdate   # 因為組件重複而觸發
HelloKitty beforeEnter
HelloKitty beforeRouteEnter
App beforeUpdate
Hello beforeUpdate
HelloKitty beforeCreate
HelloKitty created
HelloKitty beforeMount
HelloKitty mounted
Hello updated
App updated
```

**父組件** :arrow_right: **其他父組件的子組件** (`Kitty` :arrow_right: `HelloKitty`)

```sh
Kitty beforeRouteLeave
Hello beforeEnter
HelloKitty beforeEnter
Hello beforeRouteEnter
HelloKitty beforeRouteEnter
App beforeUpdate
Hello beforeCreate
Hello created
Hello beforeMount
HelloKitty beforeCreate
HelloKitty created
HelloKitty beforeMount
Kitty beforeDestroy
Kitty destroyed
HelloKitty mounted    # 注意：子組件會先 mounted，再來是父組件
Hello mounted
App updated
```

**相同父組件的子組件** :arrow_right: **同層子組件** (`HelloKitty` :arrow_right: `HelloWorld`)

```sh{1,2}
HelloKitty beforeRouteLeave
Hello beforeRouteUpdate
HelloWorld beforeEnter
HelloWorld beforeRouteEnter
App beforeUpdate
Hello beforeUpdate
HelloWorld beforeCreate
HelloWorld created
HelloWorld beforeMount
HelloKitty beforeDestroy
HelloKitty destroyed
HelloWorld mounted
Hello updated
App updated
```

比起從其他路徑進來的過程，如果都是在 **同一個** 父層級路由當中變換，那麼 `Hello.vue` 的 `mounted` 就不會再被觸發，且 `Hello.vue` 的 `beforeRouteUpdate` 會在每個子路由離開 (`beforeRouteLeave`) 後，銷毀之前執行。

## 路由順序

1.  `beforeCreate`, `created`, `beforeMount` 順序 **父組件 > 子組件**。

    舉例：一父組件進入另一父組件的子組件，會先執行另一父組件的`beforeCreate`, `created`, `beforeMount`才是子組件的。

1.  `mounted` 順序 **子組件 > 父組件**。

1.  同父組件，以下事件只會做 **1 次**：

    1.  `beforeEnter`
    1.  `beforeRouteEnter`
    1.  `beforeCreate`
    1.  `created`
    1.  `beforeMount`
    1.  `mounted`

1.  子組件在完全離開時才會執行 `beforeRouteLeave`。
1.  在路由當中「重新整理頁面」的順序不太一樣，以 `/hello/kitty` 列舉如下：

    1.  先執行父組件 `Hello.vue` 的 `beforeEnter`。
    1.  接著子組件 `HelloKitty.vue` 的 `beforeEnter`。
    1.  然後才是 `App.vue` 的系列動作：

        1.  `beforeCreate`
        1.  `created`
        1.  `beforeMount`
        1.  `mounted`

    1.  接著是 `Hello.vue` 的 `beforeRouteEnter`
    1.  接著子組件 `HelloKitty.vue` 的 `beforeRouteEnter`
    1.  全局的 `beforeResolve`
    1.  再來是 `App.vue` 的 `beforeUpdate`
    1.  後續是 `Hello.vue` 、 `HelloKitty.vue` 與其他組件系列動作 (**父組件 > 子組件**)

        1.  `beforeCreated`
        1.  `created`
        1.  `beforeMount`

    1.  最後在依照路由順序 `mounted`，內部組件理論上會優先 (**子組件 > 父組件**)
    1.  最後的最後 `App.vue` 的 `updated`

## 參考

[Router 進階應用](https://ithelp.ithome.com.tw/articles/10214921)
