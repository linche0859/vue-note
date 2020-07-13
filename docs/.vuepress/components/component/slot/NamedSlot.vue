<template>
  <div class="namedSlot">
    <button class="btn btn-success" @click="show = true">Click</button>
    <light-box :show="show" @clickLightBoxContent="show = false">
      <template #header>
        <h2 class="pb-0 border-0">This's from parent header</h2>
      </template>
      <template #footer>
        <h6>This's from parent footer</h6>
      </template>
    </light-box>
  </div>
</template>

<script>
import LightBox from "../../LightBox";

export default {
  // 具名插槽範例
  name: "NamedSlot",
  components: {
    LightBox
  },
  props: {},
  data() {
    return {
      show: false
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
.namedSlot {
  position: relative;
  height: 300px;
  .modal-header,
  .modal-footer {
    padding: 1.5rem;
  }
  .modal-header {
    border-bottom: 1px solid #ddd;
  }
  .modal-footer {
    border-top: 1px solid #ddd;
  }
}
</style>
