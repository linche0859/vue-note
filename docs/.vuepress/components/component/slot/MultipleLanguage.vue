<template>
  <div class="multipleLanguage">
    <slot :hello="helloString[lang]"></slot>
  </div>
</template>

<script>
export default {
  // 多種語言的範例
  name: "MultipleLanguage",
  components: {},
  props: {
    lang: {
      type: String,
      default: "tw",
      required: true
    }
  },
  data() {
    return {
      helloString: {
        tw: "哈囉！世界",
        jp: "こんにちは！世界",
        en: "Hello world"
      }
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
.multipleLanguage {
}
</style>
