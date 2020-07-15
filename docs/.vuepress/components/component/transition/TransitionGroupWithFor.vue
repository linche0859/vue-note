<template>
  <div class="transitionGroupWithFor">
    <transition-group class="transitionGroupWithFor__list row" name="slide" tag="ul">
      <li class="col-2 mb-3" v-for="(item,index) in list" :key="index + '_' + item">
        <div class="card p-2 bg-danger text-white text-center">{{ item }}</div>
      </li>
    </transition-group>
    <button class="btn btn-success" @click="addRandomNumber">Click</button>
  </div>
</template>

<script>
export default {
  // transition-group 和 v-for 的範例
  name: "TransitionGroupWithFor",
  components: {},
  props: {},
  data() {
    return {
      list: [1, 2, 3, 4, 5]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    addRandomNumber() {
      const random = Math.floor(Math.random() * 100);
      this.list.push(random);
    }
  }
};
</script>

<style lang="scss" scope>
.transitionGroupWithFor {
  &__list {
    margin-bottom: 0;
    list-style: none;
  }
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.8s;
  }
  .slide-enter {
    transform: translateY(-100%);
  }
  .slide-leave-to {
    transform: translateY(100%);
  }
}
</style>
