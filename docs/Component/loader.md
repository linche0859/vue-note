# 沒有 webpack 打造 vue loader 環境

1. 引入 `vue` 和 `axios` 的 cdn

   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
   ```

1. 在 `index.html` 實作 vue 的入口點

   ```html
   <div id="app">
     <h1>{{ msg }}</h1>
     <my-component></my-component>
   </div>
   ```

   ```js
   new Vue({
     data() {
       return {
         msg: 'Hello World',
       };
     },
   }).$mount('#app');
   ```

1. 新增 `component.js`，用於註冊全局的組件

   ```js
   // 使用 axios 將 template 引入
   axios({
     method: 'get',
     url: '/src/templates/component.html',
     responseType: 'text',
   }).then((res) => {
     Vue.component('MyComponent', {
       template: res.data,
       data() {
         return {
           msg: 'Hello My Component',
         };
       },
     });
   });
   ```

1. 新增 `component.html` 為 `MyComponent` 組件的 `template`

   ```html
   <div class="component">
     <p>{{ msg }}</p>
   </div>
   ```

1. 透過 XHR 將 `component.js` 引入 `index.html` 中

   ```html
   <script src="./scripts/component.js"></script>
   ```

這時會發現畫面只有 `Hello World` 的字串，但 `<my-component>` 沒有顯示。

原因在於 `component.js` 當中，因為是使用 XHR 的方式來讀取樣版檔案。所以，當 App 在啟動的時候，XHR 可能還在讀取，所以這個時候，`my-component` 其實並沒有在 Vue 的全域組件當中。

我們必須要先確保樣版檔案已經讀取進來了，才能將 App 啟動。這個時候，我們可以利用 Vue 自身，製作一個 EventBus 來當作監聽工具。

1. 打開一個監聽接口，叫做 `componentLoaded`，代表組件被讀取進來了

   ```js{2}
   window.EventBus = new Vue();
   window.EventBus.$on('componentLoaded', () => {
     new Vue({
       data() {
         return {
           msg: 'Hello World',
         };
       },
     }).$mount('#app');
   });
   ```

1. 在 `component.js` 中，等組件都載入成功後，才觸發監聽接口，這個時候才將 Vue App 做初始化啟動

   ```js{5}
   axios({
     ...
   }).then(function (res) {
     // 註冊組件
     window.EventBus.$emit('componentLoaded');
   });
   ```

:::tip 提醒

如果有很多組件或巢狀組件的時候該怎麼辦？

`Promise.all` 是你的好伙伴。

:::
