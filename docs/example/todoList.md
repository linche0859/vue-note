# 代辦事項清單

## 安裝

- 不使用 `router-view`，利用 `router-link` 達到換頁
- 在 `state` 中，會自動帶入 `router` 相關屬性

```bash
npm install vuex-router-sync
```

## 實作

**main.js**

```javascript
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 記得要引入
import { sync } from 'vuex-router-sync';

Vue.config.productionTip = false;

// 使用 vuex-router-sync 需加上
sync(store, router);

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中時
  inserted: function(el) {
    // 聚焦元素
    el.focus();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
```

**router.js**

```javascript
routes: [
  {
    path: '/all',
    name: 'all'
  },
  {
    path: '/active',
    name: 'active'
  },
  {
    path: '/complete',
    name: 'complete'
  },
  {
    path: '*',
    redirect: '/all'
  }
];
```

**store.js**

將資料儲存於 `localStorage`

```javascript
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//  localStorage 的相關操作
const LS = {
  load() {
    return JSON.parse(localStorage.getItem('vue-todos') || '[]');
  },
  save(data) {
    localStorage.setItem('vue-todos', JSON.stringify(data));
  }
};

// 依照 router.name 過濾相對資料
const filter = {
  all(todos) {
    return todos;
  },
  active(todos) {
    return todos.filter(({ complete }) => !complete);
  },
  complete(todos) {
    return todos.filter(({ complete }) => complete);
  }
};

const getters = {
  // 取得「單個」代辦事項，在「全部」代辦事項中的位置
  todoIndex(state) {
    return filter[state.route.name](state.todos).map(todo =>
      state.todos.indexOf(todo)
    );
  }
};

export default new Vuex.Store({
  strict: true,
  state: {
    todos: []
  },
  getters,
  mutations: {
    // 網頁初始化，會將 localStorage 資料寫入 state.todos
    setTodos(state, data) {
      state.todos = data;
      LS.save(state.todos);
    },
    // 新增事項
    addTodo(state, data) {
      state.todos.push(data);
      LS.save(state.todos);
    },
    // 修改事項內容
    updateTodo(state, { index, content }) {
      state.todos[index].content = content;
      LS.save(state.todos);
    },
    // 修改事項狀態
    doneTodo(state, index) {
      state.todos[index].complete = !state.todos[index].complete;
      LS.save(state.todos);
    },
    // 移除事項
    removeTodo(state, index) {
      state.todos.splice(index, 1);
      LS.save(state.todos);
    }
  },
  actions: {
    // 因假設跟後端拿資料，故寫在 actions
    INIT_TODOS({ commit }) {
      // 讀取 localStorage
      commit('setTodos', LS.load());
    }
  }
});
```

**App.vue**

```html
<div class="app" id="app">
  <div class="container">
    <section>
      <div class="title">
        <router-link to="/all" class="content">全部</router-link> |
        <router-link to="/active" class="content">未完成</router-link> |
        <router-link to="/complete" class="content">完成</router-link>
      </div>
      <TodoInput />
      <!--依各事項的狀態數量顯示-->
      <TodoList v-for="index in todoIndex" :key="index" :index="index" />
    </section>
  </div>
</div>
```

```javascript
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
export default {
  components: {
    TodoInput,
    TodoList
  },
  computed: {
    todoIndex() {
      return this.$store.getters.todoIndex;
    }
  },
  mounted() {
    this.$store.dispatch('INIT_TODOS');
  }
};
```

**components/TodoList**

```html
<div class="list">
  <input
    type="text"
    v-model.trim="edit"
    v-if="edit !== null"
    v-focus
    @keyup.enter="submitHandler"
    @keyup.esc="cancelHandler"
    @blur="cancelHandler"
  />
  <template v-else>
    <span
      :class="{'dot-checked':todo.complete,'dot':!todo.complete}"
      @click="doneHandler"
    ></span>
    <p :class="{'finished':todo.complete}" @dblclick="editHandler">
      {{ todo.content }}
    </p>
    <span class="cross" @click="removeHandler"></span>
  </template>
</div>
```

```javascript
export default {
  name: 'todoList',
  data() {
    return {
      // 新增或編輯內容
      edit: null
    };
  },
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    todo() {
      return this.$store.state.todos[this.index];
    }
  },
  methods: {
    doneHandler() {
      this.$store.commit('doneTodo', this.index);
    },
    removeHandler() {
      if (confirm(`是否確認刪除${this.todo.content}?`)) {
        this.$store.commit('removeTodo', this.index);
      }
    },
    editHandler() {
      if (this.todo.complete) return;
      this.edit = this.todo.content;
    },
    submitHandler() {
      if (!this.edit) return false;
      this.$store.commit('updateTodo', {
        index: this.index,
        content: this.edit
      });
      this.cancelHandler();
    },
    cancelHandler() {
      this.edit = null;
    }
  }
};
```

**components/TodoInput**

```html
<div class="input-txt">
  <input
    type="text"
    placeholder="請輸入代辦事項"
    v-model.trim="todo"
    @keyup.enter="submitHandler"
    v-focus
  />
</div>
```

```javascript
export default {
  name: 'todoInput',
  data() {
    return {
      todo: null
    };
  },
  methods: {
    submitHandler() {
      if (!this.todo) return;
      this.$store.commit('addTodo', { content: this.todo, complete: false });
      this.todo = null;
    }
  }
};
```
