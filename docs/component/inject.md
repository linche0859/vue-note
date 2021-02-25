## 依賴注入

使用依賴注入有兩個要設定的地方：

- 提供依賴的組件需設定 `provide` 屬性
- 被注入的組件需設定 `inject` 屬性

---

假設在根組件下兩層的子組件，想去讀取根組件的狀態，架構為下：

```
|-- root
    |-- node
        |-- node
```

`root` 組件中使用 `provide` 屬性來提供 `rootName` 的狀態

```js{7,8,9,10,11}
export default {
  data() {
    return {
      nodeName: 'root'
    }
  }
  provide() {
    return {
      rootName: this.nodeName
    }
  }
}
```

在 `node` 組件中使用 `inject` 屬性設置要注入的 `rootName` 狀態

```js{2}
const node = {
  inject: ['rootName'],
  render() {
    return <button class="btn btn-success">node</button>;
  },
  methods: {
    clickHandler() {
      alert('Root Name: ' + this.rootName);
    }
  }
};
```

<TryBox>
  <component-inject-Basic />
</TryBox>

## 依賴注入不用每層都做 `inject` 設定

實際上 Vue 的依賴注入不管中間的組件有沒有 `inject` 都可以在下層的組件中做注入的動作。

新增一個 `leaf` 組件，並移除 `node` 組件的注入設定：

```
|-- root
    |-- node
        |-- leaf
```

<TryBox>
  <component-inject-InjectNoEveryLayer />
</TryBox>

在上面的結構下， `root` 跟 `leaf` 沒有直接的關係，但是 `inject` 依然有效，說明了 `inject` 不用是直接的上下層關係。

## provide 屬性

將要被注入到其他組件的物件定義在 `provide` 屬性，其它的組件才可以注入這些物件， `provide` 有兩個設定方式 - **物件** 及 **函式**。

```js
// Object
// 當被注入的屬性為 string 或 number 時，可以直接使用物件設定
const root = {
  provide: {
    foo: 'bar'
  }
};

// () => Object
// 如需引用當前組件的狀態時，就要使用函式的設定方式
const root = {
  provide: function() {
    return {
      foo: 'bar'
    };
  }
};
```

## inject 屬性

`inject` 的基本設置就是 **陣列**，陣列中的字串是要注入的物件名稱。

```js
inject: ['rootName'];
```

另一個設定方式為 **物件**，物件的 `Key` 為注入的物件名稱，而 `Value` 是一個物件，這個物件有兩個可選的屬性 - `from` 及 `default`。

- `from`：來源的被注入物件名稱
- `default`：當上層沒有相符的被注入物件時使用此數值當作預設值

```js{3,4,5,6,10}
const leaf = {
  inject: {
    rootAlias: {
      from: 'rootName',
      default: 'Default Root'
    }
  },
  methods: {
    clickHandler(e) {
      alert('Root Name: ' + this.rootAlias);
    }
  }
};
```

## 參考連結

[依賴注入](https://ithelp.ithome.com.tw/articles/10210583)
