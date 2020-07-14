<template>
  <div class="transitionMode">
    <div class="demoSize mb-4">
      <transition name="fade" :mode="mode">
        <div class="card p-4 text-center bg-danger text-white" v-if="show" key="card1">
          <h3 class="card-tile">Card 1</h3>
        </div>
        <div class="card p-4 text-center bg-danger text-white" v-else key="card2">
          <h3 class="card-tile">Card 2</h3>
        </div>
      </transition>
    </div>
    <div class="d-flex mb-4">
      <div class="form-check mr-4">
        <input class="form-check-input" type="radio" id="radioInOut" value="in-out" v-model="mode" />
        <label class="form-check-label" for="radioInOut">in-out</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" id="radioOutIn" value="out-in" v-model="mode" />
        <label class="form-check-label" for="radioInOut">out-in</label>
      </div>
    </div>
    <button class="btn btn-success" @click="show = !show">Click</button>
  </div>
</template>

<script>
export default {
  // 漸變效果有順序的範例
  name: "TransitionMode",
  components: {},
  props: {},
  data() {
    return {
      show: true,
      mode: "in-out"
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
.transitionMode {
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
