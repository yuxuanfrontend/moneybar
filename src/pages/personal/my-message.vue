<style lang="scss">
@import "../../styles/colors.scss";
@import "../../styles/px2rem.scss";

.my-heard{
  &__bd,
  &__comment{
    border-bottom: 1px solid #eeeeee;
  }
  &__hd,
  &__comment,
  &__bd,
  &__foot{
    background: $background-white;
    padding:px2rem(5) px2rem(15);
    font-size: 16px;
    line-height: px2rem(20);
    color: $color-333;
  }
  &__hd,
  &__user{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    img{
      width: px2rem(30);
      margin-right: px2rem(5);
    }
  }
  &__comment{
    text-indent: px2rem(15);
  }
  &__foot{
    div{
      padding: px2rem(5) 0;
    }
  }
}
.sign{
  width: px2rem(6);
  height: px2rem(6);
  background: red;
  margin-left: px2rem(5);
  border-radius: px2rem(6);
}

</style>
<template lang="html">
  <div class="page">
    <div class="my-heard" v-for="message in messages">
        <div class="my-heard__hd">
          <div class="my-heard__user">
            <div><img :src="message.avator" alt=""></div>
            <div>{{ message.nickname }} </div>
            <div class="sign"></div>
          </div>
          <div>{{ message.date }} </div>
        </div>
        <div class="my-heard__comment"> {{ message.content }} </div>
        <div class="my-heard__bd">
          <div> {{ message.dynamicContent }}</div>
        </div>
        <div class="my-heard__foot" v-for="reply in message.replies">
          <div>
            {{reply.nickname}}<span v-if="reply.targetName">{{' 回复 ' + reply.targetName}}</span>:
            <span>{{reply.content}}</span>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

import _ from 'lodash'
import moment from 'moment'

import userImg from '../../assets/iconfont-yonghu.png'

export default {
  name: 'my-message',

  data () {
    return {
      messages: [],
    }
  },

  mounted() {
    this.$request.post(this.$getUrl('messages'))
      .send({
        member: {
          openId: this.$store.state.identity.openId
        }
      })
      .then((res) => {
        if (res.body.responseCode === '000') {
          _.each(res.body.dto.results, (item) => {
            let comment = item.comment

            this.messages.push({
              avator: comment.logo,
              nickname: comment.nickname ,
              date: moment(comment.createTime).format("MM-DD"),
              content: comment.content,
              dynamicContent: item.dynamicContent,
              replies: _.map(comment.comments, (comment2) => {
                return {
                  nickname: comment2.nickname,
                  targetName: comment2.sid !== item.id && comment2.sname,
                  content: comment2.content
                }
              })
            })
          })
        } else {
          this.$toast(res.body.responseMsg)
        }
      })
  }

}
</script>
