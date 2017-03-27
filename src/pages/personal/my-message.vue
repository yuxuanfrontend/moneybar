<style lang="scss" scoped>
@import "../../styles/colors.scss";
@import "../../styles/px2rem.scss";

.my-heard{
  padding: px2rem(10) 0;
  margin-bottom: px2rem(10);
  background-color: $background-white;

  &__hd {
    display: flex;
    justify-content: space-between;
    padding: 0 px2rem(10);
  }

  &__user {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &__comment {
    padding: px2rem(4) px2rem(10);
  }

  &__bd {
    padding: px2rem(4) px2rem(10);
    background-color: $background-gray;
  }

  &__foot {
    padding: px2rem(4) px2rem(10);
    padding-bottom: 0;
  }
}

.ml10 {
  margin-left: px2rem(10);
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
            <div><img :src="message.avator" style="width:24px;"></div>
            <div class="ml10">{{ message.nickname }} </div>
            <div class="sign ml10"></div>
          </div>
          <div>{{ message.date }} </div>
        </div>
        <div class="my-heard__comment"> {{ message.content }} </div>
        <div class="my-heard__bd vl-font-small">
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
              avator: comment.head,
              nickname: comment.nickname ,
              date: moment(comment.createTime).format("MM-DD"),
              content: comment.content,
              dynamicContent: item.dynamicContent || '',
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
