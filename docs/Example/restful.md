# RESTful

## 對應

| RESTful method | SQL DML |
| -------------- | ------- |
| Get            | Select  |
| Post           | Create  |
| Patch/Put      | Update  |
| Delete         | Delete  |

## 設定

1.  install json server

```bash
npm i -g json-server
```

2.  make file `.vscode/settings.json`

```json
{
  "liveServer.settings.ignoreFiles": [
    ".vscode/**",
    "**/*.scss",
    "**/*.sass",
    "**/*.ts",
    "data.json"
  ]
}
```

3.  create example json file `data.json`

```json
{
  "contents": [
    {
      "id": 1,
      "name": "john"
    }
  ]
}
```

4.  run json server

```bash
json-server data.json
```

## 實作

**template**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <router-view></router-view>
    </div>
  </body>
</html>
```

**引用**

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.0.7/vue-router.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vuex/3.1.1/vuex.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js"></script>
```

### 步驟

1.  根元件
1.  Router
1.  Router component
1.  Vuex Store

```javascript
    <script>
      // 根元件
      new Vue({
        el: '#app',
        // 綁定DOM的model
        // data: {
        //   input: '',
        //   contents: []
        // },
        router,
        store,
        mounted() {
          // call actions
          this.$store.dispatch('CONTENTS_READ')
        }
      })

      let router = new VueRouter({
        // url
        routes: [
          {
            path: '/',
            name: 'list',
            component: List
          },
          {
            path: '/update/:id',
            name: 'update',
            component: Edit
          },
          {
            path: '*',
            redirect: '/'
          }
        ]
      })

      // 子元件
      let List = {
        // 確保彼此資料不會汙染
        data: function() {
          return {
            input: ''
            // contents: {}
          }
        },
        template: `
        <div>
          <p>
            <input type="text" name="" id="" v-model.trim="input" />
            <a href="javascript:;" v-on:click="createHandler">Create</a>
          </p>
          <ol>
            <li v-for="(content,index) in contents" :key="content.id">
              {{ content.name }}
              <a href="javascript:;" v-on:click="updateHandler(index)">Update</a>
              <a href="javascript:;" v-on:click="deleteHandler(index)">Delete</a>
            </li>
          </ol>
        </div>
        `,
        // handler methods
        methods: {
          createHandler() {
            if (!this.input) return false
            // axios is promise object
            axios
              .post('http://localhost:3000/contents', {
                name: this.input
              })
              .then(res => {
                this.input = ''
                // 更新contents，即更新畫面，稱為資料驅動畫面
                // this.contents.push(res.data)

                // 直接走$store的mutation
                this.$store.commit('addContent', res.data)
              })
          },
          updateHandler(index) {
            // this為let List
            let target = this.contents[index]
            // 跟window.pushState()一樣，會有上一頁可以選，SPA模式建議使用push
            // this.$router.push({ path: `/update/${target.id}` })

            // 使用router name
            this.$router.push({ name: 'update', params: { id: target.id } })
            // 跟window.replaceState()一樣，無上一頁可以選
            // this.$router.replace({ path: `/update/${target.id}` })
          },
          deleteHandler(index) {
            let target = this.contents[index]
            this.$store.dispatch('CONTENTS_DELETE', target)
            // axios
            //   .delete(`http://localhost:3000/contents/${target.id}`)
            //   .then(res => {
            //     this.contents.splice(index, 1)
            //   })
          }
        },
        // 處理過的data
        computed: {
          // set a data property
          contents() {
            return this.$store.state.contents
          }
        },
        // 在el 的綁定後，會觸發事件
        mounted() {
          // axios.get('http://localhost:3000/contents').then(res => {
          //   this.contents = res.data
          // })
        }
      }

      let Edit = {
        data: function() {
          return {
            input: ''
          }
        },
        template: `
        <div>
          <input type="text" name="" id="" v-model.trim="input">
          <a href="javascript:;" v-on:click="updateHandler()">Update</a>
        </div>
        `,
        computed: {
          contents() {
            // Array.find()
            return this.$store.state.contents.find(item => {
              // $route is current route
              return item.id == this.$route.params.id
            })
          }
        },
        methods: {
          updateHandler() {
            this.$store
              .dispatch('CONTENT_UPDATE', {
                id: this.contents.id,
                input: this.input
              })
              .then(() => {
                this.$router.push({ path: '/' })
              })
          }
        },
        mounted() {
          if (!this.contents) return this.$router.replace({ name: 'list' })
          // this為let Edit
          this.input = this.contents.name
        }
      }

      // 共用的資料
      let store = new Vuex.Store({
        // 嚴格模式(建議在dev下開啟，productions時關閉，因為耗效能)
        strict: true,
        // 共用的data
        state: {
          contents: []
        },
        // 同步 method
        mutations: {
          setContents(state, data) {
            state.contents = data
          },
          addContent(state, data) {
            state.contents.push(data)
          },
          deleteContent(state, index) {
            state.contents.splice(index, 1)
          },
          updateContent(state, { item, input }) {
            item.name = input
          }
        },
        // async method
        // action 後會回傳promise
        // context為$store
        actions: {
          CONTENTS_READ: context => {
            return axios.get('http://localhost:3000/contents').then(res => {
              // execute mutations
              context.commit('setContents', res.data)
            })
          },
          CONTENTS_DELETE: (context, target) => {
            // search index
            let index = context.state.contents.indexOf(target)
            if (index == -1) return false
            return axios
              .delete(`http://localhost:3000/contents/${target.id}`)
              .then(res => {
                context.commit('deleteContent', index)
              })
          },
          CONTENT_UPDATE: (context, { id, input }) => {
            // Array.find()，回傳第一個滿足所提供之測試函式的元素值
            // value為陣列中正被處理的元素
            // 因為item is object，item等於context.state.contents[index]
            let item = context.state.contents.find(value => {
              return value.id == id
            })
            if (!item) return false
            return axios
              .patch(`http://localhost:3000/contents/${item.id}`, {
                name: input
              })
              .then(res => {
                context.commit('updateContent', { item, input })
              })
          }
        }
      })
    </script>
```
