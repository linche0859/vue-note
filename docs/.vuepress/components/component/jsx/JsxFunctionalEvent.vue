<script>
const ChildComponent = ({ data, props, listeners }) => (
  <div class="childComponent">
    <p class={data.class} onClick={listeners.pipi}>
      Hi, {props.name}
    </p>
  </div>
);
/*
以上寫法等同於以下寫法
const ChildComponent = {
  functional: true,
  render(h, { props, listeners }) {
    return (
      <div class="childComponent">
        <h2 onClick={listeners.pipi}>hi {props.name}</h2>
      </div>
    );
  },
};
*/

export default {
  // 使用 jsx 配合功能性組件的事件範例
  name: "JsxFunctionalEvent",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    clickHandler() {
      alert("Custom event was clicked");
    },
  },
  render() {
    return (
      <div class="jsxFunctionalEvent">
        <h2>Click the below title.</h2>
        <ChildComponent
          class="text-success"
          name="John Doe"
          onPipi={this.clickHandler}
        />
      </div>
    );
  },
};
</script>

<style lang="scss" scope>
.jsxFunctionalEvent {
  .text-success {
    cursor: pointer;
  }
}
</style>
