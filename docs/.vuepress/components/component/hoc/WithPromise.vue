<template>
  <hoc :msg="msg">
    <template>
      <div>default slot</div>
    </template>
    <template #named>
      <div>named slot</div>
    </template>
  </hoc>
</template>

<script>
import { withPromise } from '../../../js/hoc';

const request = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
};

const childComponent = {
  props: ["result", 'msg'],
  data() {
    return {
      times: 0,
      requestParams: {
        name: "Child Component",
      },
    };
  },
  methods: {
    reload() {
      this.requestParams = {
        name: `changed ${++this.times} times`
      };
    },
  },
  render() {
    return (
      <div>
        <h2>{this.result?.name}</h2>
        {this.$scopedSlots.default()}
        {this.$scopedSlots.named()}
        <button class="btn btn-success mt-3" onClick={this.reload}>重新發送請求</button>
      </div>
    )
  }
}

const hoc = withPromise(childComponent, request);

export default {
  name: 'WithPromise',
  components: {
    hoc
  },
  props: {},
  data() {
    return {
      msg: 'The message from parent component'
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
.withPromise{

}
</style>
