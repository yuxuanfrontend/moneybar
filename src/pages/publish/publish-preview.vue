<style lang="scss" scoped>
.publish-btn {
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  line-height: 44px;
  text-align: center;
  color: #fff;
  background-color: #26a2ff;
  z-index: 1000;
}
</style>

<template lang="html">
  <div class="page">
    <div class="dynamic-details page">
      <!-- <div class="dynamic-details__class" v-if="type === 2" v-on:click="entrylist">
      <div> {{'来自话题 '+ topictitle}} </div>
      <div class="mint-cell-allow-right"> </div>
      </div> -->
      <!-- <div class="dynamic-details__class" v-if="type === 3">
      <div> {{'来自小组 '+ teamtitle}} </div>
      <div class="mint-cell-allow-right"> </div>
      </div> -->
      <div class="dynamic-details__username">
        <div> <img :src="head" alt="">{{ username }} </div>
        <div class="dynamic-details__date"> {{ date | time-HHmm }} </div>
      </div>

      <div class="dynamic-details__bd">
        <div class="dynamic-details__title"> {{ title }} </div>
        <div class="dynamic-details__txt" v-html="container.replace(/ /g,'&nbsp;').replace(/\n/g,'<br/>')"></div>
        <div class="dynamic-details_gallary">
          <img :src="image" v-for="image in images" style="width: 100%;">
        </div>
      </div>
    </div>
    <div class="publish-btn" @click="publish">确认发布</div>
  </div>
</template>

<script>
export default {
  name: 'publish-preview',

  data() {
    return {
    }
  },

  computed: {
    head() {
      return this.$store.state.publishPreview.head
    },
    username() {
      return this.$store.state.publishPreview.username
    },
    date() {
      return this.$store.state.publishPreview.date
    },
    title() {
      return this.$store.state.publishPreview.title
    },
    container() {
      return this.$store.state.publishPreview.container
    },

    images() {
      return this.$store.state.publishPreview.images
    }
  },

  methods: {
    publish() {
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
          content: this.container,
          attachments: _.map(this.images, item => {
            return {
              path: item
            }
          })
        })
        .then((res) => {
          if (res.body.responseCode === '000') {
            this.$store.commit('clearPreview')
            this.$toast('发布成功,等待审核')
            this.$router.go(-2)
          } else {
            this.$toast(res.body.responseMsg)
          }
        })
    }
  }
}
</script>
