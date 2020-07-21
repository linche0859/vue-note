# 請求和響應封裝

## 安裝和準備

```bash
npm i axios
## vue提示
npm i vant
```

### 靜態資料

`public` 資料夾下新增 `data.json`

```json
{
  "token": "requestToken",
  "todolist": [
    {
      "id": 1,
      "title": "Html",
      "content": "This is html",
      "status": true
    },
    {
      "id": 2,
      "title": "CSS",
      "content": "This is css",
      "status": false
    }
  ]
}
```

## 新增檔案說明

`src` 下新增 `api` 資料夾和 `index.js`、`base.js`和 `login-api.js`。

| 檔案         | 功能                                                  |
| ------------ | ----------------------------------------------------- |
| index.js     | 1.封裝 axios <br> 2.斷網情況處理<br> 3.請求和響應攔截 |
| base.js      | 接口域名有多個情況                                    |
| login-api.js | 處理與後端介接的登入請求                              |

**Base.js**

```js
/**
 * 接口域名的管理
 */
const base = {
  dev: 'data.json',
  prod: 'data1.json',
};

export default base;
```

## 建立實體

### CancelToken

需要設定的原因：

- 快速的頁面切換，使得上個頁面的請求在新頁面完成。
- Pending 時間較久的 API 若短時間內重複請求，會有舊蓋新的情況。
- 重復的 post 請求，有可能導致多次的資料操作，例如表單發送兩次。

每次發送請求要判斷是否已經存在相同的請求，若存在就取消前一次請求，只保留最新的。

設定位置：

1. 於 **請求攔截** 中，判斷重複的請求，把每次請求記錄在暫存中。
1. 於 **響應攔截** 中，在請求完成或被取消時從暫存中移除。

:::tip 補充

1. 為什麼 `CancelToken` 知道要取消哪一個請求？

   1. `CancelToken` 原碼中的 `this`，會指向當初發送請求的那個 request config。
      ```js
      axios.get('/user/12345', {
        cancelToken: new axios.CancelToken((c) => {
          cancel = c;
        }),
      });
      ```
      此時的 `this` 會指向 `axios.get('/user/12345')` 的這個請求。
   1. 因為 `CancelToken` 會賦予 request config 一個 `reason` 屬性，只要 `throwIfRequested` 方法有讀到 `reason` 屬性，就會 throw error

      ```js {8}
      // 執行 executor，並以函式「cancel」作為參數帶入
      var token = this;
      executor(function cancel(message) {
        // 確認 reason 是否存在，若存在代表 cancel 已被執行過
        if (token.reason) return;

        // 將 reason 賦值為一個 Cancel 類別
        token.reason = new Cancel(message);

        // resolve Promise
        resolvePromise(token.reason);
      });
      ```

      ```js {4}
      // 確認 reason 是否存在，
      // 若存在代表此 CancelToken 的 cancel 已被執行過，便拋出錯誤
      CancelToken.prototype.throwIfRequested = function throwIfRequested() {
        if (this.reason) throw this.reason;
      };
      ```

2. 在 `dispatchRequest`(請求發送前)`、xhrAdapter`(請求發送中) 和 `dispatchRequest.then`(請求發送後) 中，都有檢查是否有 `cancelToken` 屬性，如果有則取消請求，不是代表在 `request interceptors` 添加的暫存執行紀錄方法 (`addPending`)，就會去觸發檢查機制，讓每一次的請求都失敗呢？

   因為在 `addPending` 中，並沒有執行 `cancel` 方法，而是等到 `removePending` 才會執行，所以不會去觸發 `this.reason = new Cancel(message);` 的指令。

:::

**index.js**

```js
import axios from 'axios';
import store from '@/store';
import router from '@/router';
import { Toast } from 'vant';

// 暫存：紀錄執行中的請求
const pending = new Map();

// 加入暫存的執行紀錄
const addPending = config => {
  // 利用 method 和 url 來當作這次請求的 key，一樣的請求就會有相同的 key
  const key = [config.method, config.url].join("&");
  // 為 config 添加 cancelToken 屬性
  config.cancelToken = new axios.CancelToken(cancel => {
    // 確認暫存中沒有相同的 key 後，把這次請求的 cancel 函式存起來
    if (!pending.has(key)) pending.set(key, cancel);
  });
};

// 移除暫存的執行紀錄
// 雖然會傳當次的 config 進去，並做 cancel()，但因為 this 的指向不同
// 若存在舊的則會在舊的 token 屬性賦予 Cancel 建構子，並在 dispatchRequest 結束後
// 取消舊的請求
const removePending = config => {
  // 利用 method 和 url 來當作這次請求的 key，一樣的請求就會有相同的 key
  const key = [config.method, config.url].join("&");
  // 如果暫存中有相同的 key，把先前存起來的 cancel 函式拿出來執行，並且從暫存中移除
  if (pending.has(key)) {
    const cancel = pending.get(key);
    cancel(key);
    pending.delete(key);
  }
};

/**
 * 提示函数
 * 禁止點擊蒙層、顯示一秒後關閉
 */
const tip = (msg) => {
  Toast({
    message: msg,
    duration: 1000,
    forbidClick: true,
  });
};

/**
 * 跳轉登錄頁
 * 攜帶當前頁面路由，以期在登錄頁面完成登錄後返回當前頁面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath,
    },
  });
};

/**
 * 請求失敗後的錯誤統一處理
 * @param {Number} status 請求失敗的狀態碼
 */
const errorHandle = (status, other) => {
  // 狀態碼判斷
  switch (status) {
    // 401: 未登錄狀態，跳轉登錄頁
    case 401:
      toLogin();
      break;
    // 403 token過期
    // 清除token並跳轉登錄頁
    case 403:
      tip('登錄過期，請重新登錄');
      localStorage.removeItem('token');
      store.commit('loginSuccess', null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404請求不存在
    case 404:
      tip('請求的資源不存在');
      break;
    default:
      console.log(other);
  }
};

// 創建 axios 實例
// 可以參考官網的屬性設定：https://github.com/axios/axios#request-config
var instance = axios.create({
  baseURL: 'https://your.api.domain.tw/',
  headers: {'Content-Type': 'application/json'}
  timeout: 1000 * 12
});
// 設置 post 請求頭
instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

/**
 * 請求攔截器
 * 會放入兩個函式作為參數
 * Fulfilled Function：第一個函式會在 request 送出前攔截到此次的 config，讓你可以做一些前置處理
 * Rejected Function：第二個函式可以讓你在 request 發生錯誤時做一些額外的處理
 * 每次請求前，如果存在 token 則在請求頭中攜帶 token
 * 透過瀏覽器的 Network中，在 Request Headers可觀察 Authorization
 */
instance.interceptors.request.use(
  (config) => {
    // 先判斷是否有重複的請求要取消
    removePending(config);
    // 把這次請求加入暫存
    addPending(config);
    // 登錄流程控制中，根據本地是否存在 token 判斷用戶的登錄情況
    // 但是即使 token 存在，也有可能 token 是過期的，所以在每次的請求頭中攜帶 token
    // 後台根據攜帶的 token 判斷用戶的登錄情況，並返回給我們對應的狀態碼
    // 而後我們可以在響應攔截器中，根據狀態碼進行一些統一的操作
    const token = store.state.token;
    // 如果 token 有值，才做設定
    token && (config.headers.Authorization = token);
    return config;
  },
  error => Promise.reject(error)
);

// 響應攔截器
instance.interceptors.response.use(
  // 請求成功
  res => {
    // 請求被完成，從暫存中移除
    removePending(response);
    res.status === 200 ? Promise.resolve(res) : Promise.reject(res)
  },
  // 請求失敗
  error => {
    const { response } = error;
    if (response) {
      // 請求已發出，但是不在2xx的範圍
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 處理斷網的情況
      // eg:請求超時或斷網時，更新 state 的 network 狀態
      // network 狀態在 app.vue 中控制著一個全局的斷網提示元件的顯示隱藏
      // 關於斷網元件中的刷新重新獲取數據，會在斷網元件中說明
      if (!window.navigator.onLine) {
        store.commit('CHANGE_NETWORK', false);
      } else {
        return Promise.reject(error);
      }
    }
  }
);

```

## 封裝請求

透過判斷參數來回傳相對應的 `method`：

**index.js**

```js
export default function (method, url, data = null, config) {
  method = method.toLowerCase();
  switch (method) {
    case 'post':
      return instance.post(url, data, config);
    case 'get':
      return instance.get(url, { params: data });
    case 'delete':
      return instance.delete(url, { params: data });
    case 'put':
      return instance.put(url, data);
    case 'patch':
      return instance.patch(url, data);
    default:
      console.log(`未知的 method: ${method}`);
      return false;
  }
}
```

**login-api.js**

```js
import axios from './index';

export const userSignUp = (signUpData) => {
  return axios('post', '/user/sign-in', signUpData);
};

export const userLogIn = (logInData) => {
  return axios('post', '/user/log-in', logInData);
};

export const userLogOut = () => {
  return axios('get', '/user/log-out');
};

export const userDelete = (userNo) => {
  return axios('delete', '/user/delete', userNo);
};

export const getToken = () => {
  return axios('get', '/user/token');
};
```

## 請求應用

**store.js**

```javascript
import Vue from 'vue';
import Vuex from 'vuex';
import { getToken } from '@/api/login-api';
import todolist from '@/store/module/todolist';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    token: null,
    network: true,
  },
  modules: {
    todolist,
  },
  mutations: {
    GET_TOKEN(state, data) {
      state.token = data;
    },
    CHANGE_NETWORK(state, val) {
      state.network = val;
    },
  },
  actions: {
    // 取得 token
    async getToken({ commit }) {
      try {
        const {
          data: { token },
        } = await getToken();
        commit('GET_TOKEN', token);
      } catch (e) {
        // ...
      }
    },
  },
});
```

## 全域掛載

**main.js**

```javascript
import api from '@/api';
// 將 axios 掛載到 vue 的原型上
// 目的讓各 component 也能直接使用
Vue.prototype.$api = api;
```

**about.vue**

使用 `$api` 讀取資料，如；

```js
this.$api('get', `${base.prod}`).then((res) => {
  console.log(res.data.todolist);
});
```

## 參考

[使用 Axios 你的 API 都怎麼管理](https://medium.com/i-am-mike/%E4%BD%BF%E7%94%A8axios%E6%99%82%E4%BD%A0%E7%9A%84api%E9%83%BD%E6%80%8E%E9%BA%BC%E7%AE%A1%E7%90%86-557d88365619)

[用 Axios Instance 管理 API](https://f820602h.github.io/Max-Blog/2020/05/27/axios-instance/)

[透過 CancelToken 解析 Axios 原始碼](https://f820602h.github.io/Max-Blog/2020/07/07/axios-cancelToken/?fbclid=IwAR2oD_AXeC4S9dwXHTrZZ63acXygbBiFxAmWH9zqlrXjmAs7r_HsC9da3QI)
