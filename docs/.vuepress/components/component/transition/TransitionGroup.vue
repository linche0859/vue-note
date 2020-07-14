<template>
  <div class="transitionGroup">
    <transition-group class="row mb-4" tag="ul">
      <li class="col-2" v-for="(item,index) in list" :key="`${index}_${item}`">
        <div class="card p-2 bg-danger text-white text-center">
          <div class="card-title">{{ item }}</div>
        </div>
      </li>
    </transition-group>
    <button class="btn btn-success" @click="addRandomNumber">Click</button>
  </div>
</template>

<script>
export default {
  // transition-group 的範例
  name: "TransitionGroup",
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
    }
  }
};
</script>

<style lang="scss" scope>
.transitionGroup {
}
</style>
