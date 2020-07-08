<template>
  <div class="resetData">
    <form action="javascript:;">
      <div class="form-group row">
        <label for="name" class="col-2 col-form-label text-right">姓名</label>
        <div class="col-10">
          <input type="text" id="name" class="form-control" v-model="form.name" />
        </div>
      </div>
      <div class="form-group row">
        <label for="city" class="col-2 col-form-label text-right">城市</label>
        <div class="col-10">
          <select class="form-control" id="city" v-model="form.city">
            <option disabled value>請選擇</option>
            <option>台北市</option>
            <option>台中市</option>
            <option>高雄市</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-2 col-form-label text-right">性別</label>
        <div class="col-10">
          <div class="d-flex align-items-center h-100">
            <div class="form-check mr-3">
              <input
                class="form-check-input"
                type="radio"
                id="man"
                value="man"
                v-model="form.gender"
              />
              <label class="form-check-label" for="man">男</label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                id="woman"
                value="woman"
                v-model="form.gender"
              />
              <label class="form-check-label" for="woman">女</label>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 text-right">
          <button type="button" class="btn btn-secondary" @click="resetFormHandler">重置</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  // 恢復 data 屬性為初始狀態範例
  name: "ResetData",
  components: {},
  props: {},
  data() {
    return {
      form: {
        name: "",
        city: "",
        gender: "man"
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    /**
     * 重置表單條件事件
     */
    resetFormHandler() {
      Object.assign(this.form, this.$options.data().form);
    }
  }
};
</script>

<style lang="scss" scope>
.resetData {
}
</style>
