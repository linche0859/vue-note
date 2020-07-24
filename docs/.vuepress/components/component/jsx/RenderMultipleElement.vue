<template>
  <div class="renderMultipleElement">
    <div class="form-group row">
      <label for="renderCount" class="col-5 col-form-label">Input count of renderings</label>
      <div class="col-7">
        <input
          type="number"
          class="form-control"
          id="renderCount"
          min="0"
          max="5"
          v-model.number="count"
        />
      </div>
    </div>
    <multiple-element :count="count"></multiple-element>
  </div>
</template>

<script>
const multipleElement = {
  render(createElement) {
    return createElement(
      "ul",
      Array.apply(null, { length: this.count }).map((item, index) =>
        createElement("li", `Count ${index + 1}`)
      )
    );
  },
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
};

export default {
  // 渲染多個元素範例
  name: "RenderMultipleElement",
  components: {
    multipleElement,
  },
  props: {},
  data() {
    return {
      count: 3,
    };
  },
  computed: {},
  watch: {
    count(value) {
      this.count = value ? (value > 5 ? 5 : parseInt(value) || 0) : 0;
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scope>
.renderMultipleElement {
}
</style>
