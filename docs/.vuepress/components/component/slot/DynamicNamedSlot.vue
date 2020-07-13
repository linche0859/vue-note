<template>
  <div class="dynamicNamedSlot">
    <form action="javascript:;">
      <div class="form-row align-items-center">
        <div class="col-auto">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              id="headerRadio"
              value="header"
              v-model="dynamicSlotName"
            />
            <label class="form-check-label" for="headerRadio">Header radio</label>
          </div>
        </div>
        <div class="col-auto">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              id="footerRadio"
              value="footer"
              v-model="dynamicSlotName"
            />
            <label class="form-check-label" for="footerRadio">Footer radio</label>
          </div>
        </div>
        <div class="col-auto">
          <button class="btn btn-success" @click="show = true">Click</button>
        </div>
      </div>
    </form>
    <div class="position-relative demoSize">
      <light-box :show="show" @clickLightBoxContent="show = false">
        <template v-slot:[dynamicSlotName]>
          <h2 class="pb-0 border-0">DynamicNamedSlot</h2>
        </template>
      </light-box>
    </div>
  </div>
</template>

<script>
import LightBox from "../../LightBox";

export default {
  // 動態的具名插槽範例
  name: "DynamicNamedSlot",
  components: {
    LightBox
  },
  props: {},
  data() {
    return {
      show: false,
      dynamicSlotName: "header"
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
.dynamicNamedSlot {
  .demoSize {
    height: 300px;
  }
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
