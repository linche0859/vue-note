## GET / POST 基礎用法

### 注意!!! `axios` 回傳並非直接是資料

> console.log(res) 類似 request Object
>
> 內容包含: data / status / statusText / headers / config

```js
// 網址帶參數 或 傳入 params 物件
axios.get('url/users?ID=123');
axios
  .get('url/users', { params: { ID: 123 } })
  .then(res => {
    console.table(res.data);
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    /* 不論失敗成功皆會執行 */
  });

// 資料由後方物件帶入
axios
  .post('url/users', { name: 'Mark' })
  .then(res => {
    console.table(res.data);
  })
  .catch(error => {
    console.error(error);
  });
```

## `config`寫法

```js
axios({
  method: 'get',
  baseURL: 'http://localhost:3000',
  url: '/users',
  'Content-Type': 'application/json'
})
  .then(result => {
    console.log(result.data);
  })
  // err 可以在封裝中定義
  .catch(err => {
    console.error(err);
  });
```

## API 寫法

可以不需將 url、method、data 寫在 config 裏面

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

## 同時發送多個請求 all & spread

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
  .catch(err => {
    console.error(err);
  });

function funcA() {
  return axios.get('http://localhost:3000/users/1');
}

function funcB() {
  return fetch('http://localhost:3000/users/2', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json());
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

## 參考

[axios 基本使用 & Config](https://ithelp.ithome.com.tw/articles/10212120)
