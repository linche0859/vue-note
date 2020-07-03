<template>
  <div class="self">
    <div class="modal-mask" v-show="show">
      <div class="modal-container h-100" @click.self="show = false">
        <div class="modal-body">
          Hello
        </div>
      </div>
    </div>
    <base-button @click.native="show = true"></base-button>
  </div>
</template>

<script>
import BaseButton from '../../BaseButton';

export default {
  name: 'Self',
  components: {
    BaseButton,
  },
  props: {},
  data() {
    return {
      show: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scope>
.self {
  position: relative;
  height: 150px;
  .modal-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
  .modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 100px;
    background-color: #fff;
  }
  .h-100 {
    height: 100%;
  }
}
</style>
