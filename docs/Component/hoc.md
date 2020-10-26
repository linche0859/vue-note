# High Order Component

## HOC 為組件的包裝

以 `input` 為例的組件包裝。

### 子組件

- functional 組件

  ```js
  const InputComponent = ({ data }) => {
    return <input {...data} />;
  };
  ```

- 一般組件

  ```html
  <template>
    <input v-bind="$attrs" v-on="$listeners" />
  </template>
  ```

### 父組件

```js{5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28}
export default {
  render() {
    return (
      <div>
        <InputComponent
          class="form-control"
          type="text"
          value={this.text}
          on-input={this.inputHandler}
        />
        <p class="pb-3 border-bottom">Input text result：{this.text}</p>
        {this.radios.map((o) => (
          <div class="form-check">
            <InputComponent
              class="form-check-input"
              type="radio"
              name="radio"
              key={o}
              id={o}
              value={o}
              checked={this.radio === o}
              on-change={this.changeHandler}
            />
            <label class="form-check-label" for={o}>
              {o}
            </label>
          </div>
        ))}
        <p class="mb-0">Radio result：{this.radio}</p>
      </div>
    );
  },
};
```

<try-box>
  <component-hoc-Common />
</try-box>

## HOC 為函式的包裝

定義：一個函式接受一個組件為參數，返回一個包裝後的組件。也就是 `f(object) -> 新的 object`。

### 實現

1. HOC 接受 **子組件** 和 **請求方法** 做為參數
1. 在 `mounted` 生命週期中請求資料
1. 把請求的結果通過 `props` 傳遞給子組件

因為要實做上方的步驟，所以 HOC 是個函式，並透過它處理 loading、error 等對應顯示，最後返回一個新的組件。

### 實做 HOC 函式

1. 拿到子組件上定義的參數，作為初始化發送請求的參數
1. 監聽子組件中請求參數的變化，並且重新發送請求
1. 外部組件傳遞給 HOC 組件的屬性、事件和 slot 透過 `$attrs`、`$listeners`和 `$scopedSlots` 傳給子組件

```js
/**
 * 帶有非同步的 High Order Component
 * @param {object} wrapped - component
 * @param {function} promiseFn - 非同步函式
 * @returns {object} component
 */
export const withPromise = (wrapped, promiseFn) => {
  return {
    data() {
      return {
        loading: false,
        error: false,
        result: null,
      };
    },
    components: {
      wrapped,
    },
    mounted() {
      // 立即發送請求，並且監聽請求參數的變化達到重新請求
      this.$refs.wrapped.$watch('requestParams', this.request.bind(this), {
        immediate: true,
      });
    },
    methods: {
      async request() {
        this.loading = true;
        // // 從子組件中拿取請求的參數
        const { requestParams } = this.$refs.wrapped;
        // // 傳遞給請求的函式
        const result = await promiseFn(requestParams).finally(() => {
          this.loading = false;
        });
        this.result = result;
      },
    },
    render(h) {
      const args = {
        props: {
          ...this.$attrs,
          result: this.result,
          loading: this.loading,
        },
        on: this.$listeners,
        scopedSlots: this.$scopedSlots,
        ref: 'wrapped',
      };
      return (
        <div>
          <div
            class={[
              'justify-content-center',
              { 'd-flex': this.loading },
              { 'd-none': !this.loading },
            ]}
          >
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <p class={{ 'd-none': !this.error }}>載入錯誤</p>
          <wrapped
            class={{ 'd-none': this.loading || this.error }}
            {...args}
          ></wrapped>
        </div>
      );
    },
  };
};
```

### 子組件內容

1. 設定 `requestParams` 狀態為請求參數
1. 將結果透過 `render` 函式渲染

```js
const childComponent = {
  props: ['result', 'msg'],
  data() {
    return {
      times: 0,
      requestParams: {
        name: 'Child Component',
      },
    };
  },
  methods: {
    reload() {
      this.requestParams = {
        name: `changed ${++this.times} times`,
      };
    },
  },
  render() {
    return (
      <div>
        <h2>{this.result?.name}</h2>
        {this.$scopedSlots.default()}
        {this.$scopedSlots.named()}
        <button class="btn btn-success mt-3" onClick={this.reload}>
          重新發送請求
        </button>
      </div>
    );
  },
};
```

### 模擬請求函式

1. 假設將請求參數做為結果傳出

```js
const request = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
};
```

### 父組件的渲染

```html
<template>
  <hoc :msg="msg">
    <template>
      <div>default slot</div>
    </template>
    <template #named>
      <div>named slot</div>
    </template>
  </hoc>
</template>

<script>
  const hoc = withPromise(childComponent, request);

  export default {
    components: {
      hoc,
    },
    data() {
      return {
        msg: 'The message from parent component',
      };
    },
  };
</script>
```

<try-box>
  <component-hoc-WithPromise />
</try-box>

## 參考

[高階組件 HOC](https://zhuanlan.zhihu.com/p/126552443)
