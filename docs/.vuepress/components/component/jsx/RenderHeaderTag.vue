<template>
  <div class="renderHeaderTag">
    <div class="form-group row">
      <label for="headerTag" class="col-3 col-form-label">Select HTML tag</label>
      <div class="col-9">
        <select id="headerTag" class="form-control" v-model="level">
          <option v-for="item in levelList" :key="'id' + item" :value="item">{{ 'h' + item }}</option>
        </select>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <anchored-heading class="p-0 border-bottom-0" :level="level">Hello world!</anchored-heading>
      </div>
    </div>
  </div>
</template>

<script>
const anchoredHeading = {
  render(createElement) {
    return createElement(
      "h" + this.level, // 標籤名稱
      this.$slots.default // 相當於 <slot></slot>
    );
  },
  props: {
    level: {
      type: Number,
      default: 1,
      required: true,
    },
  },
};

export default {
  // 渲染標題標籤範例(h1 ~ h6)
  name: "RenderHeaderTag",
  components: {
    anchoredHeading,
  },
  props: {},
  data() {
    return {
      level: 1,
      levelList: [1, 2, 3, 4, 5, 6],
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
.renderHeaderTag {
}
</style>
