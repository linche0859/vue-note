# 全域封裝

將帶有 base 開頭的組件，加入自 Vue 實體的全域組件中。

1. 新增 `_globals.js` 於 `components` 資料夾下

```js
// 為方便起見，全局註冊所有基本元件，因為它們因為它們將被非常頻繁地使用。
// 使用其文件名的 PascalCased 版本註冊元件

import Vue from 'vue';

// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context(
  // Look for files in the current directory
  '.',
  // Do not look in subdirectories
  false,
  // Only include "_base-" prefixed .vue files
  /_base-[\w-]+\.vue$/
);

// For each matching file name...
requireComponent.keys().forEach((fileName) => {
  // Get the component config
  const componentConfig = requireComponent(fileName);
  // Get the PascalCase version of the component name
  const componentName = fileName
    // Remove the "./_" from the beginning
    .replace(/^\.\/_/, '')
    // Remove the file extension from the end
    .replace(/\.\w+$/, '')
    // Split up kebabs
    .split('-')
    // Upper case
    .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
    // Concatenated
    .join('');

  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig);
});
```

2. 註冊全域元件於 `main.js`

```js
// Globally register all `_base`-prefixed components
import '@components/_globals';
```
