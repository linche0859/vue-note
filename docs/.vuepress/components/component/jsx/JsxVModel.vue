<script>
export default {
  // 使用 jsx 配合 v-model 的範例
  name: "JsxVModel",
  components: {},
  props: {},
  data() {
    return {
      checkboxs: [{ name: "vue" }, { name: "react" }, { name: "angular" }],
      checkedList: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
  render() {
    return (
      <div>
        <div class="d-flex pb-3 border-bottom">
          {this.checkboxs.map((checkbox) => {
            return (
              <div class="custom-control custom-checkbox mr-3">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id={checkbox.name}
                  value={checkbox.name}
                  v-model={this.checkedList}
                />
                <label class="custom-control-label" for={checkbox.name}>
                  {checkbox.name}
                </label>
              </div>
            );
          })}
        </div>
        <p class="mb-0">Checked items：{JSON.stringify(this.checkedList)}</p>
      </div>
    );
  },
};
</script>

<style lang="scss" scope>
.jsxVModel {
}
</style>
