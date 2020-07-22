# 基礎使用

## API

```js
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
```

相對應關係

- `mapState` 可以取得 `state` 裡面的資料。
- `mapMutations` 可以取得 `mutations` 裡面的方法。
- `mapActions` 可以取得 `actions` 裡面的方法。
- `mapGetters` 可以取得 `getters` 裡面的方法。

```js{5,6,7,8}
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'MyComponent',
  computed: {
    ...mapGetters(['getAge']),
    ...mapState(['age']),
  },
};
```

在 `template` 中即可直接使用 `getAge`，或是組件裡面，可以使用 `this.getAge` 來取得資料。

而如果是 `mapActions` 或是 `mapMutations` 則是放在 `methods` 裡面。

```js{5,6,7,8}
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'MyComponent',
  methods: {
    ...mapActions(['ohMyAge']),
    ...mapMutations(['incrementAge']),
  },
};
```

## 嚴謹模式

`strict: true` 啟用嚴謹模式。

::: tip 提醒

1.  只能透過 `Mutations` 來改 `state` 的數值，如果直接更改 `state` 數值，會被警告
1.  只能透過 `Actions` 來處理關於非同步的事情

:::
