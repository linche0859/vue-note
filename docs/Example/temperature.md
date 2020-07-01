# 溫度轉換

1.  **安裝 webpack 在 command line 介面中執行**

    ```bash
    vue init webpack project-name
    ```

1.  **因為會執行`scss`檔案，需執行**

    ```bash
    npm i -D node-sass sass-loader

    # -D : --save -dev
    ```

    - 補充

    `dependencies`和`devDependencies`的區別

    `npm install`安裝的時候，有兩種命令把他們寫入到`package.json`文件裡面去

    | Command    | Target          | Description                                                                                                                                        |
    | ---------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
    | --save-dev | devDependencies | 插件只用於**開發環境**（構建工具比如 glup、webpack 這些只是在開發中使用的）                                                                        |
    | --save     | dependencies    | 需要發佈到生產環境。比如我們寫一個項目要依賴 jQuery，沒有這個包的依賴運行就會報錯，這時候就把這個依賴寫入 dependencies，會被打包進最終的 js 文件裡 |

1.  **`eslint`的設定**

    新增 :

    ```javascript
    'space-before-function-paren': 0
    ```

1.  **`package.json`的設定**

    新增 :

    ```json
    "start": "npm run api | npm run dev",
    "api": "json-server api/data.json --port 3000"
    ```

1.  **利用`blueprint-templates`新增下列檔案**

    | Name  | Location  |
    | ----- | --------- |
    | Hello | src/pages |
    | C2F   | src/pages |

1.  **設定`router/index.js`**

    ```javascript
    import Vue from 'vue';
    import Router from 'vue-router';
    // import Hello from '@/components/Hello'
    // import C2F from '@/components/C2F'

    Vue.use(Router);

    export default new Router({
      routes: [
        {
          path: '/hello',
          name: 'hello',
          // component: Hello
          // 會壓成webpack，適合大型專案
          component: () => import('@/pages/Hello'),
        },
        {
          path: '/c2f',
          name: 'c2f',
          // component: C2F
          component: () => import('@/pages/C2F'),
        },
        {
          path: '*',
          redirect: '/hello',
        },
      ],
    });
    ```

1.  **設定`App.vue`**

    ```html
    <template>
      <div id="app">
        <PageHeader />
        <img src="./assets/logo.png" />
        <!--切換頁面-->
        <router-link :to="{path: '/hello'}">Hello</router-link>
        <router-link :to="{name: 'c2f'}">CtoF</router-link>
        <router-view />
        <PageFooter />
      </div>
    </template>

    <script>
      import PageHeader from '@/components/PageHeader';
      import PageFooter from '@/components/PageFooter';
      export default {
        name: 'App',
        components: {
          PageHeader,
          PageFooter,
        },
      };
    </script>

    <style>
      #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /* margin-top: 60px; */
      }
    </style>
    ```

1.  **實做`pages/C2F/index.vue`**

    ```html
    <script>
      export default {
        name: 'c2F',
        data() {
          return {
            userInput: 0,
            isCelsius: false,
          };
        },
        computed: {
          // 轉華氏
          fahrenheit() {
            // computed 計算後才會顯示到 template 上面。
            return (this.celsius * 9) / 5 + 32;
          },
          // 轉攝氏
          celsius() {
            return ((this.userInput - 32) * 5) / 9;
          },
          toggleTemperature() {
            return this.isCelsius ? '華氏 轉換 攝氏' : '攝氏 轉換 華氏';
          },
        },
        methods: {
          temperatureConvert(val) {
            // val 是從 click 傳進來的 userInput
            // 如果不傳值，直接使用 this.userInput 也可以
            // alert 的內容直接使用 computed 已經幫我計算好的結果
            if (this.isCelsius) alert('攝氏: ' + this.celsius);
            else alert('華氏: ' + this.fahrenheit);
          },
        },
      };
    </script>

    <template src="./template.html"></template>
    <style lang="scss" src="./style.scss" scoped></style>
    ```

1.  **實做`pages/C2F/template.html`**

    ```html
    <div class="c2F">
      <div class="container">
        <h1>Temperature Conversion</h1>
        <!-- 切換模式按鈕 -->
        <input id="toggleTemperature" type="checkbox" v-model="isCelsius" />
        <label for="toggleTemperature">切換：{{ toggleTemperature }}</label>
        <!-- 轉換顯示區域 -->
        <!-- v-if 條件不成立的區域，不會存在瀏覽器上 -->
        <h2 v-if="isCelsius">攝氏：{{ celsius }} °C</h2>
        <h2 v-if="!isCelsius">華氏：{{ fahrenheit }} °F</h2>
        <div class="celsius">
          <!-- 使用者輸入區域 -->
          <!-- v-show 條件不成立的區域會使用 style 隱藏，會存在瀏覽器上 -->
          <span v-show="!isCelsius">攝氏：</span>
          <span v-show="isCelsius">華氏：</span>
          <input type="number" v-model="userInput" /> °C
        </div>
        <!-- alert 顯示計算結果 -->
        <button @click="temperatureConvert(userInput);">
          Temperature Convert
        </button>
      </div>
    </div>
    ```

    - 補充

    v-if 與 v-show 有什麼不同

    | vue directive | 條件不成立時    | 使用時機                                   |
    | ------------- | --------------- | ------------------------------------------ |
    | v-if          | 不繪製此 DOM    | 大區塊的判斷式                             |
    | v-show        | 依然存在 DMO 中 | 小型區、頻繁切換的條件或只是文字/ 顏色切換 |
