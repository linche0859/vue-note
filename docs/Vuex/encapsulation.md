# 封裝

## `Module`

:::tip 說明
`modules` 資料夾的 `index.js`，即自動引入各 `module` 狀態
:::

**modules/index.js**

```js
// 將每個文件註冊為相應的 Vuex 模塊。
// 模塊嵌套將反映[子]目錄層次結構，
// 模塊的命名空間與它們文件名的camelCase等效。

import camelCase from 'lodash/camelCase';

const modulesCache = {};
const storeData = { modules: {} };

(function updateModules() {
  // 讓我們動態地需要所有 Vuex 模塊文件。
  // https://webpack.js.org/guides/dependency-management/#require-context
  const requireModule = require.context(
    // 在當前目錄中搜索文件。
    '.',
    // 在子目錄中搜索文件。
    true,
    // 包括不是該文件或單元測試的任何 .js 文件。
    /^((?!index|\.unit\.).)*\.js$/
  );

  // 對於每個 Vuex 模塊...
  requireModule.keys().forEach(fileName => {
    const moduleDefinition =
      requireModule(fileName).default || requireModule(fileName);

    // 如果熱加載過程中，引用的模塊定義與我們緩存的模塊定義相同，則跳過該模塊。
    if (modulesCache[fileName] === moduleDefinition) return;

    // 更新模塊緩存，以進行有效的熱重裝。
    modulesCache[fileName] = moduleDefinition;

    // Get the module path as an array.
    const modulePath = fileName
      // Remove the "./" from the beginning.
      .replace(/^\.\//, '')
      // Remove the file extension from the end.
      .replace(/\.\w+$/, '')
      // Split nested modules into an array path.
      .split(/\//)
      // camelCase all module namespaces and names.
      .map(camelCase);

    // 獲取當前路徑的 modules 對象
    const { modules } = getNamespace(storeData, modulePath);

    // 將模塊添加到我們的模塊對象
    modules[modulePath.pop()] = {
      // 默認情況下，模塊使用命名空間。
      namespaced: true,
      ...moduleDefinition
    };
  });

  // If the environment supports hot reloading...
  if (module.hot) {
    // Whenever any Vuex module is updated...
    module.hot.accept(requireModule.id, () => {
      // Update `storeData.modules` with the latest definitions.
      updateModules();
      // Trigger a hot update in the store.
      require('../index').default.hotUpdate({ modules: storeData.modules });
    });
  }
})();

// 遞歸獲取 Vuex 模塊的名稱空間，即使嵌套也是如此。
function getNamespace(subtree, path) {
  if (path.length === 1) return subtree;

  const namespace = path.shift();
  subtree.modules[namespace] = {
    modules: {},
    namespaced: true,
    ...subtree.modules[namespace]
  };
  return getNamespace(subtree.modules[namespace], path);
}

export default storeData.modules;
```

**modules/auth.js**

```js
import axios from 'axios';

export const state = {
  currentUser: getSavedState('auth.currentUser')
};

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue;
    saveState('auth.currentUser', newValue);
    setDefaultAuthHeaders(state);
  }
};

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser;
  }
};

export const actions = {
  // This is automatically run in `src/store/index.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init({ state, dispatch }) {
    setDefaultAuthHeaders(state);
    dispatch('validate');
  },

  // Logs in the current user.
  logIn({ commit, dispatch, getters }, { username, password } = {}) {
    if (getters.loggedIn) return dispatch('validate');

    return axios.post('/api/session', { username, password }).then(response => {
      const user = response.data;
      commit('SET_CURRENT_USER', user);
      return user;
    });
  },

  // Logs out the current user.
  logOut({ commit }) {
    commit('SET_CURRENT_USER', null);
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  validate({ commit, state }) {
    if (!state.currentUser) return Promise.resolve(null);

    return axios
      .get('/api/session')
      .then(response => {
        const user = response.data;
        commit('SET_CURRENT_USER', user);
        return user;
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          commit('SET_CURRENT_USER', null);
        } else {
          console.warn(error);
        }
        return null;
      });
  }
};

// ===
// Private helpers
// ===

function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state));
}

function setDefaultAuthHeaders(state) {
  axios.defaults.headers.common.Authorization = state.currentUser
    ? state.currentUser.token
    : '';
}
```

**store/index.js**

```js
import Vue from 'vue';
import Vuex from 'vuex';
import dispatchActionForAllModules from '@/utils/DispatchActionForAllModules';

import modules from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== 'production'
});

export default store;

// Automatically run the `init` action for every module,
// if one exists.
dispatchActionForAllModules('init');
```

## 實用程序

### utils/DispatchActionForAllModules.js

自動觸發每個 `module` 中指定 `action`

```js
import allModules from '@/store/modules';
import store from '@/store';

export default function dispatchActionForAllModules(
  actionName,
  { modules = allModules, modulePrefix = '', flags = {} } = {}
) {
  // For every module...
  for (const moduleName in modules) {
    const moduleDefinition = modules[moduleName];
    // If the action is defined on the module...
    if (moduleDefinition.actions && moduleDefinition.actions[actionName]) {
      // Dispatch the action if the module is namespaced. Otherwise,
      // set a flag to dispatch the action globally at the end.
      if (moduleDefinition.namespaced) {
        store.dispatch(`${modulePrefix}${moduleName}/${actionName}`);
      } else {
        flags.dispatchGlobal = true;
      }
    }

    // If there are any nested sub-modules...
    if (moduleDefinition.modules) {
      // Also dispatch the action for these sub-modules.
      dispatchActionForAllModules(actionName, {
        modules: moduleDefinition.modules,
        modulePrefix: modulePrefix + moduleName + '/',
        flags
      });
    }
  }

  // If this is the root and at least one non-namespaced module
  // was found with the action...
  if (!modulePrefix && flags.dispatchGlobal) {
    // Dispatch the action globally.
    store.dispatch(actionName);
  }
}
```

---

### store/help.js

將 `state`、`getters`、`actions` 統一管理於此介面

```js
import { mapState, mapGetters, mapActions } from 'vuex';

export const authComputed = {
  ...mapState('auth', {
    currentUser: state => state.currentUser
  }),
  ...mapState('user', {
    cached: state => state.cached
  }),
  ...mapGetters('auth', ['loggedIn'])
};

export const authMethods = mapActions('auth', ['logIn', 'logOut']);
export const userMethods = mapActions('user', ['fetchUser']);
```

元件中

```js
import { authComputed, authMethods, userMethods } from '@/store/help.js';

export default {
  computed: {
    // mapAction 會將 actions 包成物件，需用 spread
    ...authComputed
  },
  methods: {
    ...authMethods,
    ...userMethods
  }
};
```

---
