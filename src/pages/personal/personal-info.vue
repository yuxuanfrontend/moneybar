<template lang="html">
  <div class="personal-box">
    <div class="personal-box__personalimg">
      <label for="avator">
        <img :src='previewImg' style="width:64px;">
      </label>
      <input style="display:none;" id="avator" type="file" accept="image/png, image/jpeg, image/jpg" ref="avator">
    </div>
    <div class="personal-box__personalname">
      <p contenteditable="true">
        {{ personalname }}
      </p>
    </div>

  </div>
</template>

<script>

import exif from '../../utils/exif.js'
import compressImg from '../../utils/processImg.js'

import personalImg from '../../assets/iconfont-yonghu.png'

export default {
  data () {
    return {
      personalname:'某某+用户编号',
      previewImg: personalImg,
    }
  },

  mounted() {
    let _this = this

    compressImg('avator', 320, function(images) {
      _this.previewImg = images[0]
      let blobFile = _this.convertBase64ToBlob(images[0])
      _this.chooseAvator(blobFile)
    })
  },

  methods: {
    chooseAvator(file) {
      // let choosedFile = this.$refs.avator.files[0]
      let sendData = new FormData()

      sendData.append('file', file, 'avator.' + file.type.split('/')[1])

      this.$request.post('http://192.168.228.236:8081/api/upload/files')
        .send(sendData)
        .then((res) => {
          // this.previewImg = res.body.t
          console.log(res);
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
  }
}
</script>

<style lang="scss">
@import "../../styles/px2rem.scss";
@import "../../styles/colors.scss";
.personal-box{
  padding-top:40px;
  &__personalimg{
    margin-bottom: px2rem(15);
  }
  &__personalname p{
    width: 40%;
    color: $color-666;
    text-align: center;
    border-bottom: 1px solid #dbdbdb;
    padding-bottom: px2rem(10);
  }
  &__personalimg,
  &__personalname{
    display: flex;
    justify-content: center;
  }
}
</style>
