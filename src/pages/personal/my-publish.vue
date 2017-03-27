<style lang="scss">
@import "../../styles/colors.scss";
@import "../../styles/px2rem.scss";
.my-publish{
  &__hd{

    div{
      width:50%;
      height: px2rem(40);
      line-height: px2rem(40);
      text-align: center;
    }
  }
}
</style>
<template lang="html">
  <div class="page">
    <mt-navbar v-model="selected" :fixed="true">
      <mt-tab-item id="1">我的动态</mt-tab-item>
      <mt-tab-item id="2">我的评论</mt-tab-item>
    </mt-navbar>
    <div class="page page--navbar">
      <mt-tab-container v-model="selected" >
        <mt-tab-container-item id="1" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
          <dynamic-item v-for="dynamic in dynamics" :data="dynamic" v-on:click.native="goDetails(dynamic)"></dynamic-item>
          <div class="scroll-loading" v-show="loading && dynamics.length !== 0">
            <mt-spinner class="scroll-loading__spinner" type="fading-circle" :size="20"></mt-spinner>
            <div> 加载更多中</div>
          </div>
          <div class="vl-nodata" v-show="dynamics.length === 0">暂无动态</div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <comment-item v-for="(comment, i) in comments" :data="comment" v-on:deletecomment="deletecomment(comment)"></comment-item>
          <div class="vl-nodata" v-show="comments.length === 0">你还没有发表评论</div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>

import moment from 'moment'

import {appendDynamics} from '../../utils/dealDynamic'

import dynamicItem from '../../components/dynamic-item'
import commentItem from '../../components/comment-item'

export default {
  name:'my-publish',
  components:{
    dynamicItem,
    commentItem
  },
  data () {
    return{
      selected:'1',
      comments: [],
      dynamics: [],
      queryPage: 1,
      querySize: 10,
      loading: false
    }
  },

  mounted() {
    // 我的动态
    this.$request.post(this.$getUrl('dynamics'))
    .send({
      member: {
        openId: this.$store.state.identity.openId
      },
      basePageResults: {
        pageNo: this.queryPage,
        pageSize: this.querySize
      },
      orderByCreateTimeDesc: true,
      // statusVal: '1'
    })
    .then((res) => {
      if (res.body.responseCode === '000') {
        this.dynamics = []
        appendDynamics(this.dynamics, res.body.dto.results)
      } else {
        this.$toast(res.body.responseMsg)
      }
    })

    // 我的评论
    this.$request.post(this.$getUrl('comments'))
      .send({
        	commentator: {
            openId: this.$store.state.identity.openId
          }
      })
      .then((res) => {
        if (res.body.responseCode === '000') {
          this.comments = _.map(res.body.dto.results, (item) => {
            return {
              id: item.id,
              commentxt: item.content,
              commentdate: moment(item.createTime).format('MM-DD'),
              dynamicText: item.dynamicContent,
              commentname: item.comments[0] && item.comments[0].nickname,
              replyText: item.comments[0] && item.comments[0].content
            }
          })
        } else {
          this.$toast(res.body.responseMsg)
        }
      })
  },

  methods:{
    deletecomment(comment){
      console.log(comment);
      this.$request.delete(this.$getUrl('comment/' + comment.id))
        .then((res) => {
          if (res.body.responseCode === '000') {
            this.comments.splice(this.comments.indexOf(comment), 1)
          } else {
            this.$toast(res.body.responseMsg)
          }
        })
    },

    loadMore() {

    },

    goDetails(dynamic){
      this.$router.push('/dynamicdetails/'+dynamic.id)
    },

  }
}
</script>
