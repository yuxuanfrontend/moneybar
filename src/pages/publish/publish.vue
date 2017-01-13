<style lang="scss" scoped>
.weui-uploader__files img {
  width: 100%;
}

.publish-uploader {
  padding: 10px;
}

.vl-right {
  float: right;
}
</style>

<template lang="html">
  <div class="page">
    <mt-field placeholder="请输入标题" v-model="title" :attr="{maxlength:255}"></mt-field>
    <mt-field placeholder="请输入内容" type="textarea" rows="10" v-model="content" :attr="{maxlength:4000}"></mt-field>
    <!-- <div class="publish-uploader">
      <div class="weui-uploader">
        <div class="weui-uploader__hd">
          <p class="weui-uploader__title">图片上传</p>
          <div class="weui-uploader__info">0/2</div>
        </div>
        <div class="weui-uploader__bd">
          <ul class="weui-uploader__files" id="uploaderFiles">
            <li class="weui-uploader__file"><img src="../../assets/logo.png" alt=""></li>
            <li class="weui-uploader__file"><img src="../../assets/logo.png" alt=""></li>
          </ul>
          <div class="weui-uploader__input-box">
            <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple />
          </div>
        </div>
      </div>
    </div> -->
    <div style="padding:10px;">
      <mt-button type="primary" class="vl-right" :disabled="isPublishDisabled" @click.native="publish">发表</mt-button>
    </div>
  </div>
</template>

<script>

import testImg from '../../assets/logo.png'

export default {
  data() {
    return {
      title: '',
      content: '',
      openId: 111
    }
  },

  computed: {
    isPublishDisabled() {
      return this.title.trim() === '' || this.content.trim() === ''
    }
  },

  methods: {
    publish() {
      if (this.title.trim() === '' || this.content.trim() === '') {
        this.$toast('标题和内容不能为空')
        return false
      }

      this.$request.post(this.$getUrl('dynamic/' + this.openId))
        .send({
          topic: {
            id: this.$route.query.id,
          },
          type: this.$route.query.type,
          title: this.title,
          content: this.content
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
