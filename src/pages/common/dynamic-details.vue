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
  padding: px2rem(6) 0;
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
        <div class="dynamic-details__foot"><div>阅读 {{ readAmount }} 评论 {{ commentAmount }}</div><div @click="report">举报 </div> </div>
      </div>
      <div class="dynamic-details__no" v-show="comments.length === 0">暂时还没有评论，发表第一条评论吧 </div>

      <div class="dynamic-details__commentbox" v-for="comment in comments" v-on:click="clickcomment(comment)">
        <div class="dynamic-details__commentbd">
          <div class="dynamic-details__commentname">
            <div>{{comment.commentname}} </div>
            <div> {{ comment.commentdate }} </div>
          </div>
          <div class="dynamic-details__commentxt" @click="replySheetVisible = true">{{comment.commentxt}}</div>
          <div class="dynamic-details__commentimg"><img src="../../assets/comment.png" alt="">3</div>
          <div class="dynamic-details-reply vl-font-smaller" v-if="comment.replies" v-for="reply in comment.replies" @click="replySheetVisible = true">
            <span class="dynamic-details-reply__head">{{reply.name}}{{reply.targetName && (' 回复 ' + reply.targetName)}}:</span>
            <span class="dynamic-details-reply__body">{{reply.content}}</span>
          </div>
        </div>
      </div>

    </div>
    <div class="dynamic-details__input">
      <input type="text" name="" value="" :placeholder="inputPlaceholder" v-model="comment" ref="sendInput">
      <div @click="sendout" >发送</div>
    </div>

    <mt-actionsheet
      :actions="replyActions"
      v-model="replySheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>

import moment from 'moment'

export default {
  data () {
    return {
      type: 1,
      replyActions: [
        {name: '回复', method() {}},
        {name: '举报', method() {}},
      ],
      replySheetVisible: false,
      topictitle:'#话题# 说说你收藏了哪些壹分',
      teamtitle:' 有油壹分小组',
      title:'一位散户高手的炒股心得',
      container:'炒股心得（1）为什么散户不会赚钱？1、炒股是资源的再分配，并不是创造财富。2、开办股市就是为了圈钱，不给你一点甜头你怎么会拿钱去投资呢？2、开办股市就是为了圈钱，不给你一点甜头你怎么会拿钱去投资呢？不给你一',
      username:'林二',
      date:'12.12',
      // inputPlaceholder:'回复 林二',
      readAmount: 1000,
      commentAmount: 20,
      comments:[
        {
          commentname:'赵四',newcommentname:'潘青青',commentdate:'13.12',commentxt:'散户是什么意思？求教！！！帮帮帮散户是什么意思？求教！！！帮帮帮',
          replies: [
            {
              name: '王三',
              targetName: '赵四',
              content: '回复你回复你回复你回复你回复你回复你回复你回复你回复你回复你回复你回复你回复你'
            }
          ]
        }
      ]
    }
  },

  computed: {
    inputPlaceholder() {
      return '回复' + this.username
    }
  },

  mounted() {
    console.log(222);
    this.$request.get(this.$getUrl('dynamic/readCount/' + this.$route.params.id))
      .then((res) => {})

    this.$request.get(this.$getUrl('dynamics/' + this.$route.params.id))
      .then((res) => {
        if (res.body.responseCode === '000') {
          let data = res.body.dto[0]

          this.username = data.nickname
          this.type = data.type
          this.date = moment(data.createTime).format('HH:mm')
          this.title = data.title
          this.container = data.content
          this.readAmount = data.readCount
          this.commentAmount = data.commentCount
          this.topictitle = data.topicName
          this.teamtitle = data.groupName
        } else {
          this.$toast(res.body.responseMsg)
        }
      })
  },

  methods:{
    report(){
      this.$router.push('/report')
    },
    sendout(){
      if(this.comment === '' || this.comment === undefined){
        return false
      }else{
        this.comments.push({commentname:'李福振',newcommentname:'潘青青',commentdate:'13.12',commentxt:this.comment})
        this.comment = ''
      }
    },
    entrylist(){
      if(Number(this.$route.params.id) === 2){
        this.$router.push('/topicdetails/'+2)
      }else if(Number(this.$route.params.id) === 3){
        this.$router.push('/teamdetails/'+3)
      }
    },
    clickcomment(comment){
      // let event = window.document.createEvent('HTMLEvents')
      // event.initEvent('focus', true, false)
      //
      // console.log()
      // this.$refs.sendInput.dispatchEvent(event)
      this.$refs.sendInput.focus()
      this.inputPlaceholder = ''
      this.inputPlaceholder = '回复 '+comment.newcommentname
    }
  }
}
</script>
