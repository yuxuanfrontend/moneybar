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

.weui-uploader__file,
.weui-uploader__input-box {
  width: 60px;
  height: 60px;
  overflow: hidden;
}
</style>

<template lang="html">
  <div class="page">
    <mt-field placeholder="请输入标题" v-model="title" :attr="{maxlength:255}"></mt-field>
    <mt-field placeholder="请输入内容" type="textarea" rows="10" v-model="content" :attr="{maxlength:4000}"></mt-field>
    <div class="publish-uploader">
      <div class="weui-uploader">
        <div class="weui-uploader__hd">
          <p class="weui-uploader__title">图片上传</p>
          <div class="weui-uploader__info">0/2</div>
        </div>
        <div class="weui-uploader__bd">
          <ul class="weui-uploader__files" id="uploaderFiles">
            <li class="weui-uploader__file" :style="{'background-image':'url(' + image + ')'}" v-for="image in uploadImages">
              <!-- <img :src="image"> -->
            </li>
          </ul>
          <div class="weui-uploader__input-box">
            <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple>
          </div>
        </div>
      </div>
    </div>
    <div style="padding:10px;">
      <mt-button type="primary" class="vl-right" :disabled="isPublishDisabled" @click.native="publish">发表</mt-button>
    </div>
  </div>
</template>

<script>

import _ from "lodash"

import exif from '../../utils/exif.js'
import compressImg from '../../utils/processImg.js'

import testImg from '../../assets/logo.png'

export default {
  data() {
    return {
      title: '',
      content: '',
      uploadImages: []
    }
  },

  computed: {
    isPublishDisabled() {
      return this.title.trim() === '' || this.content.trim() === ''
    }
  },

  mounted() {
    let _this = this

    compressImg('uploaderInput', 320, function(images) {
      console.log(images.length);
      // _this.uploadImages = _this.uploadImages.concat(images)
      console.log(_this.uploadImages.length);
      _.each(images, item => {
        let blobFile = _this.convertBase64ToBlob(item)
        _this.uploadImage(blobFile)
      })
    })
  },

  methods: {
    uploadImage(file) {
      // let choosedFile = this.$refs.avator.files[0]
      let sendData = new FormData()

      sendData.append('file', file, 'avator.' + file.type.split('/')[1])

      this.$request.post('http://192.168.228.236:8081/api/upload/files')
        .send(sendData)
        .then((res) => {
          if (res.body.code === '000') {
            this.uploadImages.push(res.body.t)
          } else {
            this.$toast(res.body.msg)
          }
        })
    },

    convertBase64ToBlob(base64) {
      var data = base64.split(',')
      var bytes = window.atob(data[1]);        //去掉url的头，并转换为byte
      var type = data[0].slice(data[0].indexOf(':') + 1, data[0].indexOf(';'))

      //处理异常,将ascii码小于0的转换为大于0
      // var ab = new ArrayBuffer(bytes.length);
      // var ia = new Uint8Array(ab);
      var ia = new Uint8Array(bytes.length);
      for (var i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
      }

      let blob1 = new Blob( [ia] , {type : type})
      // blob1.fileType = type
      // blob1.name = blob1.fileName = 'pic.' + blob1.fileType.split('/')[1]

      return blob1
    },

    publish() {
      if (this.title.trim() === '' || this.content.trim() === '') {
        this.$toast('标题和内容不能为空')
        return false
      }

      this.$request.post(this.$getUrl('dynamic/' + this.$store.state.identity.openId))
        .send({
          topic: {
            id: this.$route.query.type === 2 ? this.$route.query.id : null,
          },
          group: {
            id: this.$route.query.type === 3 ? this.$route.query.id : null
          },
          type: this.$route.query.type,
          title: this.title,
          content: this.content,
          attachments: _.map(this.uploadImages, item => {
            return {
              path: item
            }
          })
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
