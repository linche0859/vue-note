<template>
  <div class="propsObject">
    <div class="mb-3 border-bottom">
      <ul v-for="comic in comics">
        <li>{{ comic.name }}</li>
        <li>{{ comic.time }}</li>
      </ul>
    </div>
    <edit-component v-for="comic in comics" :key="comic.id" :comic="comic" ref="editComponent"></edit-component>
  </div>
</template>

<script>
const editComponent = {
  template: `
  <div class="card p-3">
    <form>
      <div class="form-group row align-items-center">
        <label :for="'name' + comic.id" class="col-3">漫畫名</label>
        <div class="col-9">
          <input type="text" class="form-control" :id="'name' + comic.id" v-model="comic.name">
        </div>
      </div>
      <div class="form-group row align-items-center mb-0">
        <label :for="'time' + comic.id" class="col-3">觀看時間</label>
        <div class="col-9">
          <input type="text" class="form-control" :id="'time' + comic.id" v-model="comic.time">
        </div>
      </div>
    </form>
  </div>`,
  props: {
    comic: {
      type: Object
    }
  }
};
export default {
  // 以物件做為 props 傳遞範例
  name: "PropsObject",
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
.propsObject {
  .card {
    background-color: #ddd;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
}
</style>
