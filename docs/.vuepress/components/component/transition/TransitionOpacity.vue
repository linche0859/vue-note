<template>
  <div class="transitionOpacity">
    <div class="demoSize mb-4">
      <transition>
        <div class="card p-4 text-center bg-danger text-white" v-show="show">
          <h3 class="card-tile">Card</h3>
        </div>
      </transition>
    </div>
    <button class="btn btn-success" @click="show = !show">Click</button>
  </div>
</template>

<script>
export default {
  // opacity 的 transition 範例
  name: "TransitionOpacity",
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
.transitionOpacity {
  .demoSize {
    height: 76px;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 1s;
  }
  .v-enter,
  .v-leave-to {
    opacity: 0;
  }
}
</style>
