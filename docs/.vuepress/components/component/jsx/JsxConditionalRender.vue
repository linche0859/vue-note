<script>
const PermissionComponent = {
  functional: true,
  render(h, { props, slots }) {
    const { permission } = props;
    if (!permission) return <p>permission denied</p>;
    return slots().default;
  },
};

export default {
  // 使用 jsx 的條件式渲染範例
  name: "JsxConditionalRender",
  components: {},
  props: {},
  data() {
    return {
      permission: false,
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
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input"
            id="permission"
            v-model={this.permission}
          />
          <label class="custom-control-label" for="permission">
            permission {this.permission ? "granted" : "denied"}
          </label>
        </div>
        <PermissionComponent permission={this.permission}>
          <p>
            <code>slots().default</code>：permission granted
          </p>
        </PermissionComponent>
      </div>
    );
  },
};
</script>

<style lang="scss" scope>
.jsxConditionalRender {
}
</style>
