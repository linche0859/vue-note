<template>
  <div class="lightBox" v-show="show">
    <div class="modal-mask">
      <div class="modal-container" @click.self="$emit('clickLightBoxContent')">
        <header class="modal-header">
          <slot name="header"></slot>
        </header>
        <div class="modal-body">
          <slot>Default Body</slot>
        </div>
        <footer class="modal-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 類似於 modal 的顯示範例
  name: "LightBox",
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false,
      require: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scope>
.lightBox {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .modal-mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  .modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }
  .modal-header,
  .modal-body,
  .modal-footer {
    width: 50%;
    background-color: #fff;
  }
  .modal-body {
    padding: 1.5rem;
  }
}
</style>
