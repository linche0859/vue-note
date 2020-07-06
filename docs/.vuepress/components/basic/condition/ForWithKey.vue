<template>
  <div class="forWithKey d-flex">
    <div class="flex-grow-1">
      <h3>Todo List</h3>
      <ul class="mb-0">
        <li v-for="item in todoList" :key="item.id">
          <input type="checkbox" :id="item.id" v-model="item.isDone" />
          <label :for="item.id">{{ item.title }}</label>
        </li>
      </ul>
    </div>
    <div class="flex-grow-1">
      <h3>Done List</h3>
      <ul class="mb-0">
        <li v-for="item in doneList" :key="item.id">
          <input type="checkbox" :id="item.id" v-model="item.isDone" />
          <label :for="item.id">{{ item.title }}</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  // v-for 沒有 key 屬性的範例
  name: 'ForWithKey',
  components: {},
  props: {},
  data() {
    return {
      list: [
        {
          id: 'task001',
          title: '選項 1',
          isDone: false,
        },
        {
          id: 'task002',
          title: '選項 2',
          isDone: false,
        },
        {
          id: 'task003',
          title: '選項 3',
          isDone: false,
        },
      ],
    };
  },
  computed: {
    todoList() {
      return this.list.filter((item) => !item.isDone);
    },
    doneList() {
      return this.list.filter((item) => item.isDone);
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scope>
.forWithKey {
}
</style>
