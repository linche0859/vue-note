<template>
  <div class="transitionNoKey">
    <div class="demoSize mb-4">
      <transition name="fade">
        <div class="card p-4 text-center bg-danger text-white" v-if="show">
          <h3 class="card-tile">Card 1</h3>
        </div>
        <div class="card p-4 text-center bg-danger text-white" v-else>
          <h3 class="card-tile">Card 2</h3>
        </div>
      </transition>
    </div>
    <button class="btn btn-success" @click="show = !show">Click</button>
  </div>
</template>

<script>
export default {
  // 漸變為同一元素，且沒有 key 屬性的範例
  name: "TransitionNoKey",
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
.transitionNoKey {
  .demoSize {
    height: 76px;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
