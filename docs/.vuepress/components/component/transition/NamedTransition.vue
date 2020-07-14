<template>
  <div class="namedTransition">
    <div class="demoSize mb-4">
      <div class="row">
        <div class="col-6 overflow-hidden">
          <transition name="slide">
            <div class="card p-4 text-center bg-danger text-white" v-show="show">
              <h3 class="card-tile">Card</h3>
            </div>
          </transition>
        </div>
        <div class="col-6">
          <transition name="fade">
            <div class="card p-4 text-center bg-danger text-white" v-show="show">
              <h3 class="card-tile">Card</h3>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <button class="btn btn-success" @click="show = !show">Click</button>
  </div>
</template>

<script>
export default {
  // 自訂漸變樣式名稱的範例
  name: "NamedTransition",
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
.namedTransition {
  .demoSize {
    height: 76px;
  }
  .slide-enter-active,
  .slide-leave-active,
  .fade-enter-active,
  .fade-leave-active {
    transition: all 1s ease;
  }
  .slide-enter {
    transform: translateX(-100%);
  }
  .slide-leave-to {
    transform: translateX(100%);
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
