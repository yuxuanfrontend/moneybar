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
        <mt-button type="primary" size="large" @click="submit">提交</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      value: null,
      options : [
        { label: '政治因素', value: '值A'},
        { label: '色情低俗内容', value: '值B' },
        { label: '诱导欺骗，诈骗', value: '值C' },
        { label: '其他', value: '值D' }
      ]
    }
  },

  mounted() {
    this.$request.get(this.$getUrl('accusations'))
      .then((res) => {
        if (res.body.responseCode === '000') {
          this.options = res.body.dto.map((item) => {
            return {
              label: item.content,
              value: item.id + ''
            }
          })
        } else {
          this.$toast(res.body.responseMsg)
        }
      })
  },

  methods:{
    submit(){
      if (!this.value) {
        this.$toast('请选择一个举报选项')
        return false
      }

      if (this.$route.query.type === '1') {
        this.$request.post(this.$getUrl('dynamic/accusation/' + this.$route.params.id))
        .query({
          openId: '111',
          accusationId: this.value
        })
        .then((res) => {
          if (res.body.responseCode === '000') {
            this.$toast('举报成功')
            this.$router.back()
          } else {
            this.$toast(res.body.responseMsg)
          }
        })
      }

      if (this.$route.query.type === '2') {
        this.$request.post(this.$getUrl('comment/accusation/' + this.$route.params.id))
        .query({
          openId: '111',
          accusationId: this.value
        })
        .then((res) => {
          if (res.body.responseCode === '000') {
            this.$toast('举报成功')
            this.$router.back()
          } else {
            this.$toast(res.body.responseMsg)
          }
        })
      }
    }
  }
}
</script>
