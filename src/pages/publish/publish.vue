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
    <mt-field placeholder="请输入标题" v-model="title"></mt-field>
    <mt-field placeholder="请输入内容" type="textarea" rows="10" v-model="content"></mt-field>
    <div class="publish-uploader">
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
    </div>
    <div style="padding:10px;">
      <mt-button type="primary" class="vl-right" @click.native="publish">发表</mt-button>
    </div>
    <!-- <div class="vl-float-button"><img src="../../assets/edit.png" alt=""></div> -->
  </div>
</template>

<script>

import testImg from '../../assets/logo.png'

export default {
  data() {
    return {
      title: '',
      content: ''
    }
  },

  methods: {
    publish() {
      if (this.title.trim() === '' || this.content.trim() === '') {
        this.$toast('标题和内容不能为空')
        return false
      }

      this.$toast('发布成功')
      this.$router.push('dynamic')
    }
  }
}
</script>
