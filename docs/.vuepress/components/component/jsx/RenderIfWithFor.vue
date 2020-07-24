<template>
  <div class="renderIfWifthFor">
    <h2 class="border-bottom-0">Select</h2>
    <div class="form-group d-flex flex-wrap">
      <div class="form-check mr-3" v-for="item in list" :key="item">
        <input
          class="form-check-input"
          type="checkbox"
          :value="item"
          :id="'chk' + item"
          v-model="selctedList"
        />
        <label class="form-check-label" :for="'chk' + item">{{item}}</label>
      </div>
    </div>
    <div class="card">
      <div class="card-header">Fruit basket</div>
      <div class="card-body">
        <render-component :list="selctedList"></render-component>
      </div>
    </div>
  </div>
</template>

<script>
const renderComponent = {
  render(createElement) {
    if (this.list.length) {
      return createElement(
        "ul",
        this.list.map((item) => {
          return createElement("li", item);
        })
      );
    } else return createElement("p", "No fruit was selected.");
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
};

export default {
  // 將 v-if 和 v-for 混合使用的範例
  name: "RenderIfWithFor",
  components: {
    renderComponent,
  },
  props: {},
  data() {
    return {
      list: ["Apple", "Banana", "Cherry", "Grape"],
      selctedList: ["Apple", "Banana"],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scope>
.renderIfWifthFor {
}
</style>
