# eslint-plugin-vue

## 安裝

透過 Vue CLI 安裝

```bash
vue add @vue/cli-plugin-eslint
```

## 設定

**package.json** 中，新增 `eslint` 設定段落

```json
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:vue/recommended",
      "@vue/standard"
    ],
    "rules": {
      "space-before-function-paren": 0,
      "quotes": [
        1,
        "single",
        {
          "avoidEscape": true
        }
      ],
      "semi": [
        2,
        "never"
      ]
    },
    // 因為專案中會使用到較新的 JavaScript 語法
    // 因此需要定義 parserOptions 以使用比較新的 JavaScript 語法
    "parserOptions": {
      "parser": "babel-eslint",
      "ecmaVersion": 2017,
      "sourceType": "module"
    }
  }
```

**.vscode/settings.json**

```json
{
  "eslint.alwaysShowStatus": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": false,
  "vetur.validation.template": false
}
```

## 參考

[eslint-plugin-vue](https://pjchender.blogspot.com/2019/07/vue-vue-style-guide-eslint-plugin-vue.html)
