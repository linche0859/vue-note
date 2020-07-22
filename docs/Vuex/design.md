# 設計模式

```sh
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我們組裝模組並導出 store 的地方
    ├── actions.js        # 根級別的 action
    ├── mutations.js      # 根級別的 mutation
    └── modules
        ├── cart.js       # 購物車模組
        └── products.js   # 產品模組
```
