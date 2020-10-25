/**
 * 帶有非同步的 High Order Component
 * @param {object} wrapped - component
 * @param {function} promiseFn - 非同步函式
 * @returns {object} component
 */
export const withPromise = (wrapped, promiseFn) => {
  return {
    data() {
      return {
        loading: false,
        error: false,
        result: null,
      };
    },
    components: {
      wrapped,
    },
    mounted() {
      // 立即發送請求，並且監聽請求參數的變化達到重新請求
      this.$refs.wrapped.$watch('requestParams', this.request.bind(this), {
        immediate: true,
      });
    },
    methods: {
      async request() {
        this.loading = true;
        // // 從子組件中拿取請求的參數
        const { requestParams } = this.$refs.wrapped;
        // // 傳遞給請求的函式
        const result = await promiseFn(requestParams).finally(() => {
          this.loading = false;
        });
        this.result = result;
      },
    },
    render(h) {
      const args = {
        props: {
          ...this.$attrs,
          result: this.result,
          loading: this.loading,
        },
        on: this.$listeners,
        scopedSlots: this.$scopedSlots,
        ref: 'wrapped',
      };
      return (
        <div>
          <div
            class={[
              'justify-content-center',
              { 'd-flex': this.loading },
              { 'd-none': !this.loading },
            ]}
          >
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <p class={{ 'd-none': !this.error }}>載入錯誤</p>
          <wrapped
            class={{ 'd-none': this.loading || this.error }}
            {...args}
          ></wrapped>
        </div>
      );
    },
  };
};
