<style lang="scss">
@import "../../styles/colors.scss";
@import "../../styles/px2rem.scss";

.dynamic-details{
  padding-bottom:px2rem(80);

  &__username{
    padding:px2rem(10) px2rem(15);
    background: $background-white;
    display: flex;
    justify-content: space-between;
    color: $color-333;
    border-bottom: 1px solid #eeeeee;

    div{
      display: flex;
      align-items: center;

      img{
        width: px2rem(24);
        margin-right: px2rem(5);
      }
    }
  }

  &__date{
    font-size: 14px;
    color: $color-666;
  }

  &__bd{
    padding:px2rem(10) px2rem(15);
    background: $background-white;
  }

  &__title{
    line-height: px2rem(30);
    font-size: 16px;
  }

  &__txt{
    color: $color-666;
    line-height: px2rem(20);
    font-size: 14px;
  }
  &__foot{
    display: flex;
    justify-content: space-between;
    padding: px2rem(10) 0;
    font-size: 14px;
    color: $color-gray;
  }
  &__no{
    text-align: center;
    background: $background-white;
    color: $color-gray;
    font-size: 14px;
    padding: px2rem(15);
    margin-top: px2rem(10);
  }
  &__input{
    display: flex;
    justify-content: space-between;
    width:90%;
    background: $background-white;
    padding:px2rem(15) 5%;
    position:absolute;
    bottom: 0;
    z-index: 1000;

    input{
      width: 80%;
      line-height: px2rem(18);
      height: px2rem(32);
      box-sizing: border-box;
      border: 1px solid #eeeeee;
      font-size: 14px;
      text-indent: px2rem(5);
      outline: none;
      border-radius: 0;
      color:$color-333;
      font-family: "微软雅黑";
    }
    div{
      background: #26a2ff;
      color: $color-white;
      height: px2rem(32);
      line-height:  px2rem(32);
      width:20%;
      font-size: 14px;
      text-align: center;
    }
  }
  &__commentbox{
    padding:px2rem(10) px2rem(15);
    background: $background-white;
    display: flex;
    justify-content: space-between;
    margin-top: px2rem(10);
  }
  &__commentbd{
    width:100%;
  }
  &__commentname{
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    color: $color-666
  }
  &__commentxt{
    margin-top: px2rem(5);
    font-size: 14px;
    color: $color-666;
    line-height: px2rem(20);
  }
  &__commentimg{
    display: flex;
    justify-content: flex-end;
    height: px2rem(24);
    img{
      width: px2rem(24)
    }
  }
  &__class{
    display: flex;
    justify-content: space-between;
    background: $background-gray;
    font-size: 16px;
    color: $color-333;
    padding: px2rem(10) px2rem(15);
    position: relative;
  }

}

.dynamic-details-reply {
  color: $color-666;
  padding: px2rem(6) px2rem(4);
  background-color: $background-gray;
}

</style>

<template lang="html">
  <div class="page">
    <div class="dynamic-details page">
      <div class="dynamic-details__class" v-if="type === 2" v-on:click="entrylist">
        <div> {{'来自话题 '+ topictitle}} </div>
        <div class="mint-cell-allow-right"> </div>
      </div>
      <div class="dynamic-details__class" v-if="type === 3" v-on:click="entrylist">
        <div> {{'来自小组 '+ teamtitle}} </div>
        <div class="mint-cell-allow-right"> </div>
      </div>
      <div class="dynamic-details__username">
        <div> <img src="../../assets/iconfont-yonghu.png" alt="">{{ username }} </div>
        <div class="dynamic-details__date"> {{ date }} </div>
      </div>
      <div class="dynamic-details__bd">
        <div class="dynamic-details__title"> {{ title }} </div>
        <div class="dynamic-details__txt"> {{ container }} </div>
        <div class="dynamic-details__foot"><div>阅读 {{ readAmount }} 评论 {{ commentAmount }}</div><div @click="report($route.params.id)">举报 </div> </div>
      </div>
      <div class="dynamic-details__no" v-show="comments.length === 0">暂时还没有评论，发表第一条评论吧 </div>

      <div class="dynamic-details__commentbox" v-for="comment in comments">
        <div class="dynamic-details__commentbd">
          <div @click="replyComment(comment)">
            <div class="dynamic-details__commentname">
              <div>{{comment.name}}</div>
              <div> {{ comment.commentdate }}</div>
            </div>
            <div class="dynamic-details__commentxt">{{comment.commentxt}}</div>
            <div class="dynamic-details__commentimg"><img src="../../assets/comment.png" alt="">{{comment.replies.length}}</div>
          </div>

          <div class="dynamic-details-reply vl-font-smaller" v-if="comment.replies" v-for="reply in comment.replies" @click="replyComment(reply, comment)">
            <span class="dynamic-details-reply__head">{{reply.name}}<span v-if="reply.targetName">{{(' 回复 ' + reply.targetName)}}</span>:</span>
            <span class="dynamic-details-reply__body">{{reply.content}}</span>
          </div>
        </div>
      </div>

    </div>
    <div class="dynamic-details__input">
      <input type="text" name="" value="" :placeholder="inputPlaceholder" v-model="myComment" ref="sendInput">
      <div @click="sendout">发送</div>
    </div>

    <mt-actionsheet
      :actions="replyActions"
      v-model="replySheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>

import _ from 'lodash'
import moment from 'moment'

export default {
  name: 'dynamic-detail',
  data () {
    return {
      type: 1,
      replyActions: [
        {name: '回复', method: this.clickReply},
        {name: '举报', method: this.commentReport},
      ],
      choosedComment: null,
      choosedParentComment: null,
      replySheetVisible: false,

      topicId: null,
      teamId: null,
      topictitle:'#话题# 说说你收藏了哪些壹分',
      teamtitle:' 有油壹分小组',
      title:'一位散户高手的炒股心得',
      container:'炒股心得（1）为什么散户不会赚钱？1、炒股是资源的再分配，并不是创造财富。2、开办股市就是为了圈钱，不给你一点甜头你怎么会拿钱去投资呢？2、开办股市就是为了圈钱，不给你一点甜头你怎么会拿钱去投资呢？不给你一',
      username:'林二',
      date:'12.12',
      inputPlaceholder:'发表评论',
      readAmount: 1000,
      commentAmount: 20,
      comments:[
        {
          name:'赵四',newcommentname:'潘青青',commentdate:'13.12',commentxt:'散户是什么意思？求教！！！帮帮帮散户是什么意思？求教！！！帮帮帮',
          replies: [
            {
              name: '王三',
              targetName: '赵四',
              content: '回复你回复你回复你回复你回复你回复你回复你回复你回复你回复你回复你回复你回复你'
            }
          ]
        }
      ],

      myComment: ''
    }
  },

  computed: {
  },

  mounted() {
    // 增加阅读数
    this.$request.get(this.$getUrl('dynamic/readCount/' + this.$route.params.id))
      .then((res) => {})

    this.$request.post(this.$getUrl('dynamics'))
      .send({
        id: this.$route.params.id
      })
      .then((res) => {
        if (res.body.responseCode === '000') {
          let data = res.body.dto.results[0]
          let commentsData = data.comments

          this.username = data.nickname
          // this.inputPlaceholder = '回复' + this.username
          this.type = data.type
          this.date = moment(data.createTime).format('HH:mm')
          this.title = data.title
          this.container = data.content
          this.readAmount = data.readCount
          this.commentAmount = data.commentCount
          this.topictitle = data.topicName
          this.teamtitle = data.groupName
          this.topicId = data.topicId
          this.teamId = data.groupId

          // 读取评论
          this.comments = []
          _.each(commentsData, (comment1) => {
            this.comments.push({
              id: comment1.id,
              name: comment1.nickname,
              commentdate: moment(comment1.createTime).format('HH:mm'),
              commentxt: comment1.content,
              replies: _.map(comment1.comments, (comment2) => {
                return {
                  id: comment2.id,
                  name: comment2.nickname,
                  targetName: comment2.sid !== comment1.id && comment2.sname,
                  content: comment2.content
                }
              })
            })
          })
        } else {
          this.$toast(res.body.responseMsg)
        }
      })

  },

  methods:{
    report(id){
      this.$router.push({
        path: '/report/' + id,
        query: {
          type: '1'
        }
      })
    },

    commentReport() {
      this.$router.push({
        path: '/report/' + this.choosedComment.id,
        query: {
          type: '2'
        }
      })
    },

    replyComment(comment, parentComment) {
      if (parentComment) {
        this.choosedParentComment = parentComment
      }
      this.choosedComment = comment
      this.replySheetVisible = true
    },

    sendout(){

      if(this.myComment.trim() === ''){
        this.$toast('评论不能为空')
        return false
      }

      if (!this.choosedComment) {
        this.publishComment()
        return false
      }

      this.publishChildComment()
    },

    entrylist(){
      if(this.type === 2){
        this.$router.push('/topicdetails/' + this.topicId)
      }else if(this.type === 3){
        this.$router.push('/teamdetails/' + this.teamId)
      }
    },

    clickReply(){
      this.$refs.sendInput.focus()
      this.inputPlaceholder = '回复' + this.choosedComment.name
    },

    // 发表一级评论
    publishComment() {
      this.$request.post(this.$getUrl('comment/publish/' + this.$route.params.id))
        .send({
          commentator: {
            openId: '111'
          },
          content: this.myComment,
        })
        .then((res) => {
          if (res.body.responseCode === '000') {
            let data = res.body.dto
            this.comments.splice(0, 0, {
              id: data.id,
              name: data.nickname,
              newcommentname: data.sname,
              commentdate: moment(data.createTime).format("HH:mm"),
              commentxt: data.content,
              replies: []
            })

            this.$toast('发布成功')
            this.myComment = ''
          } else {
            this.$toast(res.body.responseMsg)
          }
        })
    },

    // 发表子评论
    publishChildComment(callback) {
      this.$request.post(this.$getUrl('comment/publish/child/' + this.choosedComment.id))
        .send({
          commentator: {
            openId: '111'
          },
          content: this.myComment
        })
        .then((res) => {
          if (res.body.responseCode === '000') {
            let data = res.body.dto

            if (!this.choosedParentComment) {
              this.choosedComment.replies.push({
                id: data.id,
                name: data.nickname,
                // targetName: data.sname,
                content: data.content
              })
            } else {
              this.choosedParentComment.replies.push({
                id: data.id,
                name: data.nickname,
                targetName: data.sid !== this.choosedParentComment.id && data.sname,
                content: data.content
              })
            }

            this.choosedComment = null
            this.$toast('发布成功')
            this.myComment = ''
          } else {
            this.$toast(res.body.responseMsg)
          }
        })
    }
  }
}
</script>
