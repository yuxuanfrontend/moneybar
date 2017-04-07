<style lang="scss" scoped>
@import "../../styles/px2rem.scss";

.publish-viewpoint__title {
  padding: px2rem(10);
}
</style>

<template lang="html">
  <div>
    <mt-field placeholder="请陈述你的原因" type="textarea" rows="10" v-model="content" :attr="{maxlength:4000}"></mt-field>
    <div class="publish-viewpoint__title">{{title}}</div>
    <div style="padding: 20px 10px;">
      <mt-button type="primary" size="large" @click.native="publish">提交</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '',
    }
  },

  computed: {
    title() {
      return this.$route.query.vote ? '支持正方观点' : '支持反方观点'
    }
  },

  methods: {
    publish() {
      if (this.content.trim() === '') {
        // this.
      }
      this.$request.post(this.$getUrl('dynamic/' + this.$store.state.identity.openId))
      // this.$request.post(`http://192.168.226.183:8083/qb-inrpc/wechat/dynamic/${this.$store.state.identity.openId}`)
        .send({
          topic: {
            id: this.$route.query.type === 4 ? this.$route.query.id : null,
          },
          type: this.$route.query.type,
          title: this.title,
          content: this.content,
          vote: this.$route.query.vote,
        })
        .then((res) => {
          if (res.body.responseCode === '000') {
            this.$toast('发布成功')
            this.$router.back()
          } else {
            this.$toast(res.body.responseMsg)
          }
        })
    }
  }
}
</script>
