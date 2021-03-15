# 生命週期

> 參考官網的附圖

![nuxt-lifecycle](./images/nuxt-lifecycle.svg)

完整的生命週期說明可以參考 [官網說明](https://nuxtjs.org/docs/2.x/concepts/nuxt-lifecycle)。

下面整理個別發現的情境。

## 非同步事件

例如在 `pages` 中使用呼叫非同步事件。

### Server

- asyncData - 暫停下來處理，等 `resolved` 才交給 Vue 的生命週期
- created - 不會暫停處理，**會留給 client side**
- fetch - 暫停下來處理，等 `resolved` 才交給 Vue 的 `beforeMount` 事件

在 `asyncData` 和 `fetch` 中賦予 Vue instance 的狀態，透過檢視原始碼，可以看到被成功印出在 DOM 上，雖然 `created` 事件也會執行 server side，但傳入的狀態只會寫在 `<script>` 中。

### Client

如像路由的更換，不會觸發 server side 的事件。

- asyncData - 暫停處理，等 `resolved` 才交給 Vue 的生命週期
- created - 如 Vue 的 `created` 事件
- fetch - **不會暫停處理**

## 執行順序

假如專案的結構像下面這樣：

```

├── layouts
│   └── default.vue
├── components
│   ├── LoadingBar.vue
│   └── Logo.vue  # 會在 index.vue 中被引用
└── pages
    ├── index.vue
    ├── about.vue
```

- layouts/default.vue：有 `fetch` 事件
- pages/about.vue：有 `asyncData` 事件

### 在 `index.vue` 中重整

```bash
# Nuxt SSR
loading bar created
default layout created
default layout fetch
pages index created
pages index fetch
logo fetch

# Client
loading bar created
default layout created
pages index created
loading bar mounted
logo mounted
pages index mounted
default layout mounted
```

`fetch` 事件只會在 server side 被處理。

### 在 `about.vue` 中重整

```bash
# Nuxt SSR
pages about asyncData
loading bar created
default layout created
default layout fetch
pages about fetch

# Client
loading bar created
default layout created
loading bar mounted
pages about mounted
default layout mounted
```

### `index.vue` 前往 `about.vue`

```bash
# Client
pages about asyncData
pages about fetch
pages about mounted
```
