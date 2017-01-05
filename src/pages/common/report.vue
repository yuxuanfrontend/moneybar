<style lang="scss">
@import "../../styles/px2rem.scss";
@import "../../styles/colors.scss";
.reportbox{
  color:$color-666;

  &__btn{
    padding:px2rem(15);
  }
}
</style>
<template lang="html">
  <div class="page">
    <div class="reportbox">
      <mt-radio title="举报列表" v-model="value" :options="options"> </mt-radio>
      <div class="reportbox__btn">
        <mt-button type="primary" size="large" @click="Toast">提交</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      options : [
        { label: '政治因素', value: '值A'},
        { label: '色情低俗内容', value: '值B' },
        { label: '诱导欺骗，诈骗', value: '值C' },
        { label: '其他', value: '值D' }
      ]
    }
  },
  methods:{
    Toast(){
    }
  }
}
</script>
