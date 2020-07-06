<template>
  <div class="ifNoKey">
    <form action="javascript:;" class="form">
      <div class="form-group d-flex mb-4 pb-4 border-bottom">
        <h3>Choose One：</h3>
        <div class="d-flex align-items-center mr-3">
          <input
            type="radio"
            id="radioNoKeyUserName"
            value="userName"
            v-model="type"
          />
          <label for="radioNoKeyUserName">User Name</label>
        </div>
        <div class="d-flex align-items-center">
          <input
            type="radio"
            id="radioNoKeyEmail"
            value="email"
            v-model="type"
          />
          <label for="radioNoKeyEmail">Email</label>
        </div>
      </div>
      <div class="form-group d-flex align-items-center">
        <template v-if="type === 'userName'">
          <label class="mr-3" for="noKeyUserName">User Name</label>
          <input
            type="text"
            id="noKeyUserName"
            class="form-control"
            placeholder="Enter your user name"
          />
        </template>
        <template v-else>
          <label class="mr-3" for="noKeyEmail">Email</label>
          <input
            type="email"
            id="noKeyEmail"
            class="form-control"
            placeholder="Enter your email address"
          />
        </template>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  // v-if 沒有 key 屬性的範例
  name: 'IfNoKey',
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
.ifNoKey {
  .form-group {
    margin-bottom: 0;
  }
  .form-control {
    width: auto;
  }
}
</style>
