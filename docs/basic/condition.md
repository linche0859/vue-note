# 條件判斷與列表渲染

## 條件判斷 v-if / v-show

### v-if 與 key 屬性

Vue.js 為了提高網頁渲染的效率，會選擇 **重複利用** 已經存在的元素而不是重新渲染。
這樣的做法確實能提高效能，不過在某些場景下可能會出現問題，例如：

<TryBox>
  <basic-condition-IfNoKey />
</TryBox>

可以試著在輸入框輸入幾個字，再切換 `radio` 選項，會發現雖然在模板是兩組不同的 `input` 輸入框，單文字卻被保留下來了。

若要排除這個問題，只需要針對不同的表單元素加上 `key` 屬性來表示：

```html {7,16}
<template v-if="type === 'userName'">
  <label class="form-title" for="userName">User Name</label>
  <input
    type="text"
    id="userName"
    placeholder="Enter your user name"
    key="userName"
  />
</template>
<template v-else>
  <label class="form-title" for="email">Email</label>
  <input
    type="email"
    id="email"
    placeholder="Enter your email address"
    key="email"
  />
</template>
```

<TryBox>
  <basic-condition-IfWithKey />
</TryBox>

Vue.js 的 `v-if` 會根據 `key` 屬性的內容是否相同來決定是否重新渲染元素，
若是透過 `v-show` 指令來切換，則無須加上 `key` 屬性，因為兩個元素一直都存在，沒有重新渲染的問題。

### v-if 和 v-show 的比較

若對應的指定的 DOM (或組件) 的 **狀態需要被保留**，且狀態可能 **頻繁更動** 時，用 `v-show` 會比 `v-if` 更適合，
且由於 DOM 不會被動態增加或刪減，執行時的效能更好。

另一方面，當條件判斷式的結果幾乎不變的時候，則建議使用 `v-if`。
像是用來判斷使用者登入與否的區塊，這種情況下，更理想的做法是減少元素的數量來降低瀏覽器渲染成本，無須將不相關的 DOM 節點全部生成。

## 列表渲染 v-for

與 `v-if` 一樣，`v-for` 為了提高網頁渲染的效率，會選擇重複利用已經存在的元素而不是重新渲染。
換句話說，當陣列的順序被改變時， Vue.js 不會移動實際 DOM 的節點，而是更新現有的 DOM 內容。

但是當 `v-for` 內部含有子組件或表單元素的時候，這個時候要是沒有加上 `key` 屬性，就可能會出現一些不可預期的錯誤。如下的 todo list 範例：

<TryBox>
  <basic-condition-ForNoKey />
</TryBox>

如果勾選 Todo list 的選項 2 時，會發現 Todo list 的選項 3 也被勾起來。

因為對 Todo list 來說，長度減一，所以對應的元素少了一個，原本在選項 2 的文字更新，但 `checkbox` 卻拿來重複使用。

若是要解決這個問題，只要加個「<strong>唯一的</strong>」 `key` 屬性作為識別，即可確保畫面的重新渲染：

<TryBox>
  <basic-condition-ForWithKey />
</TryBox>

### v-for 裡的 index 是否可以當作 key 來使用呢？

答案是 **不適合**，由於 `v-for` 裡的 `index` 是隨著陣列而生成的，
換句話說，當 `index` 沒變的時候，對 Vue.js 來說，它就是一個可以重複使用的元素 (或組件)。

這個時候，即使我們為 `v-for` 加上了 `key` 屬性，它的作用也會跟沒加一樣。

## 陣列的內容變更，畫面為何沒更新？

```js {12}
new Vue({
  el: '#app',
  data: {
    book: {
      title: [1, 2, 3, 4, 5],
    },
  },
  methods: {
    clickHandler() {
      // 由於 book.title 並未重新指定 (re-assigned)
      // 所以不會觸發 setter function，但陣列內容被更新了
      this.book.title[0] = '好棒棒';
    },
  },
});
```

此時我們發現，只要 `book.title` 在沒有被重新賦值的情況下， `setter` 是不會被觸發的。

Vue.js 的開發團隊針對了 JavaScript 陣列的幾種方法進行包裝改寫：

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

所以，當開發者呼叫上述提到的陣列中這七種方法，其實是調用被 Vue.js 攔截包裝後的方法，
既增加了自訂的邏輯，同時也調用陣列原始的方法，所以不會對原本功能產生影響。

於是，在 Vue.js (2.x) 當中，透過上面幾種方法改變陣列的狀態，也會 **即時** 反映到畫面上了。

## 參考

[條件判斷與列表渲染](https://book.vue.tw/CH1/1-6.html)
