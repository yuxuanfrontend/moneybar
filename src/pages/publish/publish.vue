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
            <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple capture="camera">
          </div>
        </div>
      </div>
    </div>
    <div style="padding:10px;">
      <mt-button type="primary" class="vl-right" @click.native="preview">预览</mt-button>
    </div>
  </div>
</template>

<script>

import _ from "lodash"
import { Indicator } from 'mint-ui'

import exif from '../../utils/exif.js'
import compressImg from '../../utils/processImg.js'

export default {
  data() {
    return {
      title: '',
      content: '',
      uploadImages: [],
    }
  },

  computed: {
    isPublishDisabled() {
      return this.title.trim() === '' || this.content.trim() === ''
    },

    formatContent() {
      return this.content.replace(/ /g,"&nbsp;").replace(/\n/g,"<br/>")
    }
  },

  mounted() {
    this.title = this.$store.state.publishPreview.title
    this.content = this.$store.state.publishPreview.container
    this.uploadImages = this.$store.state.publishPreview.images

    let _this = this

    compressImg('uploaderInput', 640, function(images) {
      let blobFiles = []
      _.each(images, item => {
        let blobFile = _this.convertBase64ToBlob(item)
        blobFiles.push(blobFile)
      })
      _this.uploadImage(blobFiles)
    })
  },

  methods: {
    getUUID() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      return uuid;
    },
    uploadImage(files) {
      // let choosedFile = this.$refs.avator.files[0]
      let sendData = new FormData()

      Indicator.open()

      // sendData.append('file', file, this.getUUID() + '.' + file.type.split('/')[1])
      files.forEach(item => {
        sendData.append('files', item, 'image.' + item.type.split('/')[1])
      })

      // this.$request.post('http://192.168.228.236:8086/file-inrpc/file/uploads')
      this.$request.post('https://wjs.yinli99.com/file-inrpc/file/uploads')
        .send(sendData)
        .then((res) => {
          Indicator.close()
          if (res.body.responseCode === '000') {
            res.body.dto.forEach(item => {
              this.uploadImages.push(item.downloadPath)
            })
          } else {
            this.$toast(res.body.responseMessage)
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

    preview() {
      if (this.title.trim() === '') {
        this.$toast('文章标题未输入')
        return false
      }

      if (this.content.trim() === '') {
        this.$toast('请输入正文')
        return false
      }

      this.$store.commit('setPreview', {
        head: this.$store.state.identity.head,
        username: this.$store.state.identity.username,
        date: Date.now(),
        title: this.title,
        container: this.content,
        images: this.uploadImages,
      })

      this.$router.push({
        path: '/preview',
        query: {
          type: this.$route.query.type,
          id: this.$route.query.id,
        }
      })

      // this.$request.post(this.$getUrl('dynamic/' + this.$store.state.identity.openId))
      //   .send({
      //     topic: {
      //       id: this.$route.query.type === 2 ? this.$route.query.id : null,
      //     },
      //     group: {
      //       id: this.$route.query.type === 3 ? this.$route.query.id : null
      //     },
      //     type: this.$route.query.type,
      //     title: this.title,
      //     content: this.content,
      //     attachments: _.map(this.uploadImages, item => {
      //       return {
      //         path: item
      //       }
      //     })
      //   })
      //   .then((res) => {
      //     if (res.body.responseCode === '000') {
      //
      //       this.$toast('发布成功,等待审核')
      //       this.$router.back()
      //     } else {
      //       this.$toast(res.body.responseMsg)
      //     }
      //   })
    }
  }
}
</script>
