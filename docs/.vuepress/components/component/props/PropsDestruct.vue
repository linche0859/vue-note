<template>
  <div class="propsDestruct">
    <div class="mb-3 border-bottom">
      <ul v-for="comic in comics">
        <li>{{ comic.name }}</li>
        <li>{{ comic.time }}</li>
      </ul>
    </div>
    <edit-component v-for="comic in comics" :key="comic.id" v-bind="comic"></edit-component>
  </div>
</template>

<script>
const editComponent = {
  template: `
  <div class="card p-3">
    <form>
      <div class="form-group row align-items-center">
        <label :for="'destructName' + id" class="col-3">漫畫名</label>
        <div class="col-9">
          <input type="text" class="form-control" :id="'destructName' + id" v-model="comicName">
        </div>
      </div>
      <div class="form-group row align-items-center mb-0">
        <label :for="'destructTime' + id" class="col-3">觀看時間</label>
        <div class="col-9">
          <input type="text" class="form-control" :id="'destructTime' + id" v-model="comicTime">
        </div>
      </div>
    </form>
  </div>`,
  props: ["id", "name", "time"],
  data() {
    return {
      comicName: this.name,
      comicTime: this.time
    };
  }
};
export default {
  // 傳遞解構後的物件範例
  name: "PropsDestruct",
  components: {
    editComponent
  },
  props: {},
  data() {
    return {
      comics: [
        {
          id: "c001",
          name: "鬼滅之刃",
          time: "2020/07/09"
        },
        {
          id: "c002",
          name: "我的英雄學院",
          time: "2020/07/10"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scope>
.propsDestruct {
  .card {
    background-color: #eee;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
}
</style>
