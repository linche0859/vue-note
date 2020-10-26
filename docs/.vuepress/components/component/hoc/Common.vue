<script>
const InputComponent = ({ data }) => {
  return (
    <input {...data} />
  )
};

// 一般的 HOC 範例
export default {
  name: 'Common',
  components: {},
  props: {},
  data() {
    return {
      text: 'Hello World',
      radio: 'one',
      radios: [
        'one', 'second', 'third'
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    inputHandler(e) {
      const {target:{value}} = e
      this.text = value;
    },
    changeHandler(e) {
      const {target:{value}} = e
      this.radio = value;
    }
  },
  render() {
    return(
      <div>
        <InputComponent 
          class="form-control" 
          type="text" 
          value={this.text} 
          on-input={this.inputHandler} />
        <p class="pb-3 border-bottom">Input text result：{this.text}</p>
        {this.radios.map((o) => (
          <div class="form-check">
            <InputComponent 
              class="form-check-input" 
              type="radio" 
              name="radio" 
              key={o} 
              id={o} 
              value={o}
              checked={this.radio === o}
              on-change={this.changeHandler} />
            <label class="form-check-label" for={o}>
              {o}
            </label>
          </div>
        ))}
        <p class="mb-0">Radio result：{this.radio}</p>
      </div>
    )
  }
};
</script>

<style lang="scss" scope>
.common{

}
</style>
