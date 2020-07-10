<template>
  <div class="keepAliveWithMax">
    <ul class="nav nav-tabs mt-0 mb-3">
      <li class="nav-item" v-for="tab in tabs" :key="tab.id">
        <a
          :class="['nav-link', {active: tab.id === currentTab}]"
          @click="currentTab = tab.id"
        >{{ tab.name }}</a>
      </li>
    </ul>
    <keep-alive :max="2">
      <component :is="currentTab"></component>
    </keep-alive>
  </div>
</template>

<script>
const home = {
  template: `
    <div>
      <input type="text" class="form-control" placeholder="input something here" value="home"/>
    </div>`
};
const about = {
  template: `
    <div>
      <input type="text" class="form-control" placeholder="input something here" value="about"/>
    </div>`
};
const contact = {
  template: `
    <div>
      <input type="text" class="form-control" placeholder="input something here" value="contact"/>
    </div>`
};

export default {
  // 使用 keep alive 搭配 max 的範例
  name: "KeepAliveWithMax",
  components: {
    home,
    about,
    contact
  },
  props: {},
  data() {
    return {
      tabs: [
        {
          id: "home",
          name: "HOME"
        },
        {
          id: "about",
          name: "ABOUT"
        },
        {
          id: "contact",
          name: "CONTACT"
        }
      ],
      currentTab: "home"
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
.keepAliveWithMax {
  .nav-link {
    text-decoration: none !important;
    cursor: pointer;
  }
}
</style>
