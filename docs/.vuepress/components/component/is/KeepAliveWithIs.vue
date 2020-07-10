<template>
  <div class="keepAliveWithIs">
    <ul class="nav nav-tabs mt-0 mb-3">
      <li class="nav-item" v-for="tab in tabs" :key="tab.id">
        <a
          :class="['nav-link', {active: tab.id === currentTab}]"
          @click="currentTab = tab.id"
        >{{ tab.name }}</a>
      </li>
    </ul>
    <keep-alive>
      <component :is="currentTab"></component>
    </keep-alive>
  </div>
</template>

<script>
const component1 = {
  template: `<div class="card p-3">
      <form action="javascript:;">
        <div class="form-group row align-items-center mb-0">
          <label for="input1" class="col-2">Input：</label>
          <div class="col-10">
            <input type="text" id="input1" class="form-control" placeholder="input something here"/>
          </div>
        </div>
      </form>
    </div>`
};
const component2 = {
  template: `<div class="card p-3">
      <form action="javascript:;">
        <div class="form-group row align-items-center mb-0">
          <label for="input2" class="col-2">Input：</label>
          <div class="col-10">
            <input type="text" id="input2" class="form-control" placeholder="input something here"/>
          </div>
        </div>
      </form>
    </div>`
};

export default {
  // 使用 keep alive 搭配 is 的範例
  name: "KeepAliveWithIs",
  components: {
    component1,
    component2
  },
  props: {},
  data() {
    return {
      tabs: [
        {
          id: "component1",
          name: "Component 1"
        },
        {
          id: "component2",
          name: "Component 2"
        }
      ],
      currentTab: "component1"
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
.keepAliveWithIs {
  .nav-link {
    text-decoration: none !important;
    cursor: pointer;
  }
  .card {
    background-color: #eee;
    border: 0;
  }
}
</style>
