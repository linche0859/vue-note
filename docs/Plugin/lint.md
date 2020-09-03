# ESLint 和 StyleLint

1.  使用 `vue-cli` 新增專案後，於 `.eslintrc.js` 中，修改 `extends` 屬性的設定

    ```js{2}
     extends: [
      'plugin:vue/recommended',
      '@vue/standard'
    ],
    ```

    > 使用的設定值可以參考 [eslint-plugin-vue](https://eslint.vuejs.org/rules/)。

1.  安裝 `stylelint` 和 `stylelint-config-sass-guidelines` 的 package，並新增 `.stylelintrc.json`

    ```json
    {
      "extends": "stylelint-config-sass-guidelines"
    }
    ```

1.  VSCode 的 Workspace Settings 中新增下方設定

    ```json
    {
      "eslint.validate": ["javascript", "vue"],
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
        "source.fixAll.stylelint": true
      },
      "vetur.validation.template": false
    }
    ```

## 參考

[eslint-plugin-vue](https://pjchender.blogspot.com/2019/07/vue-vue-style-guide-eslint-plugin-vue.html)
