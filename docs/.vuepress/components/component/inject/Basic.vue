<template>
  <div class="basic card">
    <div class="card-body text-center">
      <p class="mt-0">root</p>
      <node>
        <node></node>
      </node>
    </div>
  </div>
</template>

<script>
const node = {
  inject: ["rootName"],
  render() {
    return (
      <div class="card">
        <div class="card-body">
          <p class="my-0">node</p>
          <button
            class={["btn", "btn-success", { "mb-3": this.$slots.default }]}
            onClick={this.clickHandler}
          >
            Show root
          </button>
          {this.$slots.default}
        </div>
      </div>
    );
  },
  methods: {
    clickHandler(e) {
      e.stopPropagation();
      alert("Root Name: " + this.rootName);
    },
  },
};

export default {
  // 依賴注入的基本範例
  name: "Basic",
  components: {
    node,
  },
  props: {},
  data() {
    return {
      nodeName: "root",
    };
  },
  computed: {},
  provide() {
    return {
      rootName: this.nodeName,
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scope>
.basic {
}
</style>
