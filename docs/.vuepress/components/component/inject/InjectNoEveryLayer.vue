<template>
  <div class="injectNoEveryLayer card">
    <div class="card-body text-center">
      <p class="mt-0">root</p>
      <node>
        <leaf></leaf>
      </node>
    </div>
  </div>
</template>

<script>
const node = {
  render() {
    return (
      <div class="card">
        <div class="card-body">
          <p class="mt-0">node without inject</p>
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

const leaf = {
  inject: ["rootName"],
  render() {
    return (
      <div class="card">
        <div class="card-body">
          <p class="my-0">leaf</p>
          <button class="btn btn-success" onClick={this.clickHandler}>
            Show root
          </button>
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
  // 依賴注入不用每層都做注入設定的範例
  name: "InjectNoEveryLayer",
  components: {
    node,
    leaf,
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
.injectNoEveryLayer {
}
</style>
