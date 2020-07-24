<script>
const ChildComponent = {
  // 不使用生命週期
  functional: true,
  props: {
    name: String,
    age: Number,
  },
  render(createElement, { props }) {
    return (
      <li>
        Name：{props.name}，Age：{props.age}
      </li>
    );
  },
};

export default {
  // 利用 JSX 和 Array.map 渲染元素範例
  name: 'JsxMap',
  components: {},
  props: {},
  data() {
    return {
      list: [
        { name: 'Alex', age: 18 },
        { name: 'John', age: 16 },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
  render() {
    return (
      <section class="jsxMap">
        <ul>
          {this.list.map((o) => (
            <ChildComponent key={o.name} {...{ props: o }} />
          ))}
        </ul>
      </section>
    );
  },
};
</script>

<style lang="scss" scope>
.renderJsx {
}
</style>
