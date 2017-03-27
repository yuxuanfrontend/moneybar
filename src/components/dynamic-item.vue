<style lang="scss" scroped>
@import "../styles/px2rem.scss";
@import "../styles/colors.scss";

.dynamic-box {
  background-color: $background-white;
  padding: px2rem(15);
  margin-bottom: px2rem(10);

  &__head, &__body {
    margin-bottom: px2rem(10);
  }

  &__content{
    color: $color-333;
    line-height: px2rem(22);
  }

  &__foot {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: $color-gray;
  }

  &__info, &__statistic {
    display: flex;
  }

  &__info {
    display: flex;
    align-items: center;
    flex: 1;

    div {
      margin-right: px2rem(6);
    }
  }

  &__statistic {


    div {
      display: flex;
      align-items: center;
      margin-left: px2rem(6);
      img{
        margin-right: px2rem(5);
      }
    }
  }

  &__title {
    margin: px2rem(6) 0;
  }

  &__content {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__topic {
    color: $color-orange;
  }

  &__team {
    color: $color-orange;
  }

  &__avator {
    width: 16px;
    height:16px;
    border-radius: 50%;
    background-size: cover;
  }

  &__icon{
    width: px2rem(20);
  }

  &__stick, &__essence {
    color: #fff;
    background-color: #f1313a;
    padding: 1px 4px;
    margin-right: 4px;
    border-radius: 2px;
  }
}
</style>

<template lang="html">
  <div class="dynamic-box">
    <!-- <div class="dynamic-box__head">
      <div class="dynamic-box__topic" v-if="data.type===2" @click.stop="goTopic">#话题#{{data.topicName}}</div>
      <div v-if="data.type===3">来自<span class="dynamic-box__team" @click.stop="goTeam">{{data.groupName}}</span></div>
    </div> -->
    <div class="dynamic-box__body">
      <div class="dynamic-box__title"><span class="dynamic-box__stick" v-if="data.stick">置顶</span><span class="dynamic-box__essence" v-if="data.essence">精华</span>{{data.title}}</div>
      <!-- <div class="dynamic-box__img" v-if="data.images && data.images.length > 0"><horizon-images :images="data.images"></horizon-images></div> -->
      <div class="dynamic-box_img">
        <horizon-photos :images="data.attachmentPaths || []"></horizon-photos>
      </div>
      <div class="dynamic-box__content vl-font-small">{{data.content}}</div>
    </div>
    <div class="dynamic-box__foot">
      <div class="dynamic-box__info">
        <div class="dynamic-box__avator" :style="{'background-image': 'url(' + data.head + ')'}"></div>
        <div>{{data.nickname}}</div>
        <div>{{data.createTime | time-HHmm}}</div>
      </div>
      <div class="dynamic-box__statistic">
        <div><img class="dynamic-box__icon" src="../assets/pageview.png" alt="">{{data.readCount}}</div>
        <div><img class="dynamic-box__icon" src="../assets/comment.png" alt="">{{data.commentCount}}</div>
      </div>
    </div>
  </div>
</template>

<script>

import horizonPhotos from './horizon-photos'
import avator from '../assets/iconfont-yonghu.png'
import logo from '../assets/logo.png'

export default {
  props: {
    data: {
      default() {
        return {
          type: 3,
          topic: '这是一个话题',
          teamName: '小组1',
          title: '这是标题',
          content: '这是内容。。。内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
          // images: [logo, logo, logo, logo, logo],
          avator: avator,
          nickname: '王先生',
          time: '10:23',
          readAmount: 1000,
          commentAmount: 20
        }
      },
      type: Object
    }
  },

  methods: {
    goTeam() {
      this.$router.push('/teamdetails/' + this.data.teamId)
    },

    goTopic() {
      this.$router.push('/teamdetails/' + this.data.topicId)
    }
  },

  components: {
    horizonPhotos
  }
}
</script>
