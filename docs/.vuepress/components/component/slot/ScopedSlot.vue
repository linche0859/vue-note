<template>
  <div class="scopedSlot">
    <form action="javascript:;">
      <div class="form-group row">
        <label for="language" class="col-3 col-form-label">請選擇語言：</label>
        <div class="col-9">
          <select class="form-control" v-model="lang">
            <option v-for="item in langOptions" :value="item.val" :key="item.val">{{ item.name }}</option>
          </select>
        </div>
      </div>
    </form>
    <div class="position-relative demoSize">
      <button class="btn btn-success" @click="show = true">Click</button>
      <light-box :show="show" @clickLightBoxContent="show = false">
        <multiple-language
          :lang="lang"
          v-slot="{hello}"
        >{{ `${langOptions.find(x => x.val === lang)['name']}：${hello}` }}</multiple-language>
      </light-box>
    </div>
  </div>
</template>

<script>
import LightBox from "../../LightBox";
import MultipleLanguage from "./MultipleLanguage";

export default {
  // scoped slot 的範例
  name: "ScopedSlot",
  components: {
    LightBox,
    MultipleLanguage
  },
  props: {},
  data() {
    return {
      langOptions: [
        { name: "繁體中文", val: "tw" },
        { name: "日本語", val: "jp" },
        { name: "English", val: "en" }
      ],
      lang: "tw",
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
.scopedSlot {
  .demoSize {
    height: 150px;
  }
}
</style>
