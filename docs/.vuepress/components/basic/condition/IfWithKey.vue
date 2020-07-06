<template>
  <div class="ifWithKey">
    <form action="javascript:;" class="form">
      <div class="form-group d-flex mb-4 pb-4 border-bottom">
        <h3>Choose One：</h3>
        <div class="d-flex align-items-center mr-3">
          <input
            type="radio"
            id="radioUserName"
            value="userName"
            v-model="type"
          />
          <label for="radioUserName">User Name</label>
        </div>
        <div class="d-flex align-items-center">
          <input type="radio" id="radioEmail" value="email" v-model="type" />
          <label for="radioEmail">Email</label>
        </div>
      </div>
      <div class="form-group d-flex align-items-center">
        <template v-if="type === 'userName'">
          <label class="mr-3" for="userName">User Name</label>
          <input
            type="text"
            id="userName"
            class="form-control"
            placeholder="Enter your user name"
            key="userName"
          />
        </template>
        <template v-else>
          <label class="mr-3" for="email">Email</label>
          <input
            type="email"
            id="email"
            class="form-control"
            placeholder="Enter your email address"
            key="email"
          />
        </template>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  // v-if 有 key 屬性的範例
  name: 'IfWithKey',
  components: {},
  props: {},
  data() {
    return {
      type: 'userName',
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scope>
.ifWithKey {
  .form-group {
    margin-bottom: 0;
  }
  .form-control {
    width: auto;
  }
}
</style>
