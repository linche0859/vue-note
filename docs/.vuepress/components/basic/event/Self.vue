<template>
  <div class="self">
    <base-button @click.native="show = true"></base-button>
    <light-box :show="show" @clickLightBoxContent="show = false">Hello!</light-box>
  </div>
</template>

<script>
import LightBox from "../../LightBox";
import BaseButton from "../../BaseButton";

export default {
  // 事件修飾子 self 的範例
  name: "Self",
  components: {
    LightBox,
    BaseButton
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
.self {
  position: relative;
  height: 150px;
}
</style>
