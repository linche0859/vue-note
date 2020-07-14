<template>
  <div class="transitionWithKey">
    <div class="demoSize mb-4">
      <transition name="fade">
        <div class="card p-4 text-center bg-danger text-white" v-if="show" key="card1">
          <h3 class="card-tile">Card 1</h3>
        </div>
        <div class="card p-4 text-center bg-danger text-white" v-else key="card2">
          <h3 class="card-tile">Card 2</h3>
        </div>
      </transition>
    </div>
    <button class="btn btn-success" @click="show = !show">Click</button>
  </div>
</template>

<script>
export default {
  // 漸變為同一元素，且有 key 屬性的範例
  name: "TransitionWithKey",
  components: {},
  props: {},
  data() {
    return {
      show: true
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
.transitionWithKey {
  .demoSize {
    height: 76px;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
