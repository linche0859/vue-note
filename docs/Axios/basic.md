# 基礎使用和 Config

:::tip 提醒

`axios` 回傳並非直接是資料。

> console.log(res) 類似 request Object
>
> 內容包含: data / status / statusText / headers / config

:::

## Get

```js
// 網址帶參數 或 傳入 params 物件
axios.get('url/users?ID=123');
axios
  .get('url/users', { params: { ID: 123 } })
  .then((res) => {
    console.table(res.data);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    /* 不論失敗成功皆會執行 */
  });
```

## POST

```js
// 資料由後方物件帶入
axios
  .post('url/users', { name: 'Mark' })
  .then((res) => {
    console.table(res.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Config 設定

```js
axios({
  method: 'get',
  baseURL: 'http://localhost:3000',
  url: '/users',
  'Content-Type': 'application/json',
})
  .then((result) => {
    console.log(result.data);
  })
  // err 可以在封裝中定義
  .catch((err) => {
    console.error(err);
  });
```

## axios API 運用

使用下列方式，可以不需將 `url`、`method`、`data` 寫在 `config` 裏面。

```js
axios(config);
axios.request(config); // 與上相同功能

axios.get(url, config);
axios.delete(url, config);
// 功能與 GET 相同，但無 response body
axios.head(url, config);

axios.post(url, data, config);
axios.put(url, data, config);
axios.patch(url, data, config);

// 用來發送探測請求，確認該地址採用的協定、要求的表頭
// 預先檢查發送的請求是否安全
axios.options(url, config);
```

## 同時發送多個請求(`all` 和 `spread`)

1.  類似 `Promise All` 用法
2.  注意 `then` 後接 `axios.spread`

```js
axios
  .all([funcA(), funcB()])
  .then(
    axios.spread((acct, perms) => {
      // axios 回傳的資料在 data 屬性
      console.table('FuncA 回傳結果', acct.data);
      // fetch 資料可以先在 function 內作 json()
      console.table('FuncB 回傳結果', perms);
    })
  )
  .catch((err) => {
    console.error(err);
  });

function funcA() {
  return axios.get('http://localhost:3000/users/1');
}

function funcB() {
  return fetch('http://localhost:3000/users/2', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
}
```

## 搭配 `async`

可以利用 `try / catch` 作錯誤偵測，`try` 包裹所有 `await` 有錯誤則進入 `catch`

```js
async function getUsers() {
  try {
    const post = await postUsers();
    const get = await axios.get('http://localhost:3000/users');
    const { data } = get; // 資料在 data 屬性
    console.dir(get); // 回傳類似 RequestObject
    console.table(data);
  } catch (error) {
    throw new Error(error);
  }
}
```

## config 請求配置

- 可加入自訂表頭

```js
const config = {

    url: '/users',  // 只有此為必需
    method: 'post', // 大小寫皆可
    headers: { 'Content-Type': 'application/json' },

    // 添加在 url 前面，除非 url 為絕對路徑
    baseURL: 'http://localhost:3000'

    // 主要傳送的資料 (只用於 PUT、POST、PATCH )
    // 在沒有 transformRequest 情況下資料型別有限制 (下有補充)
    data: { name: 'test', title: 777 },

    // params 注意此不等同於 data
    // 此為 URL 上要代的參數   ~url?ID=123
    params: { ID: 123 }

    // 序列化參數 ???
    paramsSerializer: function(params) {
      return Qs.stringify(params, {arrayFormat: 'brackets'})
    },

    maxContentLength: 2000, // 限制傳送大小

    // 請求時間超過 1000毫秒(1秒)，請求會被中止
    timeout: 1000,

    // 選項: 'arraybuffer', 'document', 'json', 'text', 'stream'
    // 瀏覽器才有 'blob' ， 預設為 'json'
    responseType: 'json', // 伺服器回應的數據類型

    // 伺服器回應的編碼模式 預設 'utf8'
    responseEncoding: 'utf8',

    // 在上傳、下載途中可執行的事情 (progressBar、Loading)
    onUploadProgress(progressEvt) { /* 原生 ProgressEvent */  },
    onDownloadProgress(progressEvt) { /* 原生 ProgressEvent */ },

    // 允許自定義處理請求，可讓測試更容易 (有看沒懂..)
    // return promise 並提供有效的回應 (valid response)
    adapter (config) { /* 下方章節 補充詳細用法 */ },

  }
```

## config 驗證和 Token

```js
const config = {
    // 用來判斷是否為 跨域存取 (cross-site Access-Control requests)
    // 等同 Access-Control-Allow-Credentials 表頭
    // 用來解決 CORS
    withCredentials: false, // default

    // 必須提供 credentials (Cookie)
    // 等同 Authorization 表頭
    // 如果使用 token 應去 header 設置 Authorization 而非使用此
    auth: { username: 'Mark', password: 123 }

    // 用來判斷是否解析 Promise 的 狀態碼範圍
    validateStatus: function (status) {
      return status >= 200 && status < 300; // default
    },

    // xsrf token 的 Cookie名 / Header名
    xsrfCookieName: 'XSRF-TOKEN', // default
    xsrfHeaderName: 'X-XSRF-TOKEN', // default

    // 用來取消請求的 token (下詳)
    cancelToken: new CancelToken(function (cancel) {
    })
}
```

## data 的資料型別

- 在沒有 `transformRequest` 情況下資料型別有限制
- 可在 `transformRequest` 中作資料轉換

```
Normal：string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
Browser only：FormData, File, Blob
Node only：Stream
```

## config 資料處理

- **發送** 前 `transformRequest`
- **使用** 前 `transformResponse`
- **只用於 `POST`、`PUT`、`PATCH`**

```js
const config = {
  // 資料發送至伺服器前，可作資料處理
  // 陣列中最後的函式必須返回字串、ArrayBuffer、Stream
  transformRequest: [
    function (data) {
      // 作資料轉換
      return data;
    },
  ],

  // 在進入 then / catch 前可作資料處理
  transformResponse: [
    function (data) {
      // 作資料轉換
      return data;
    },
  ],
};
```

## 參考

[axios 基本使用 & Config](https://ithelp.ithome.com.tw/articles/10212120)
