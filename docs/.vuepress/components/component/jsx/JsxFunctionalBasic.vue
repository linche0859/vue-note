<template>
  <div class="jsxFunctionalBasic">
    <h2>
      Open the devTool to watch
      <code>context</code>
    </h2>
    <child-component name="parentName" id="parentId" @parent-event="parentEventHandler">
      <template v-slot:header>This's from parent header</template>
      <template>This's from parent default</template>
      <template #footer>This's from parent footer</template>
    </child-component>
  </div>
</template>

<script>
const childComponent = {
  functional: true,
  data() {
    return {
      name: "childName",
      id: "childId",
    };
  },
  render(h, { props, data, children, slots, listeners }) {
    console.log("props", props);
    console.log("data", data);
    console.log("children", children);
    console.log("slots()", slots());
    console.log("listeners", listeners);
    return (
      <div>
        <ul>
          <li>
            <code>props.name</code>：{props.name}
          </li>
          <li>
            <code>props.id</code>：{props.id}
          </li>
        </ul>
        <p>
          <code>slots().header</code>：{slots().header}
        </p>
        <p>
          <code>slots().default</code>：{children}
        </p>
        <p>
          <code>slots().footer</code>：{slots().footer}
        </p>
      </div>
    );
  },
};

export default {
  // 使用 jsx 配合功能性組件的基本範例
  name: "JsxFunctionalBasic",
  components: {
    childComponent,
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    parentEventHandler() {},
  },
};
</script>

<style lang="scss" scope>
.jsxFunctionalBasic {
}
</style>
