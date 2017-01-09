<style lang="scss" scroped>
@import "../styles/px2rem.scss";
@import "../styles/colors.scss";

.dynamic-box {
  background-color: $background-white;
  padding: px2rem(15);
  margin-bottom: px2rem(10);

  &__head, &__body {
    margin-bottom: px2rem(10);
    color: $color-333;
  }

  &__content{
    color: $color-666;
    font-size: 16px;
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
    flex: 1;

    div {
      margin-right: px2rem(6);
    }

    img {
      vertical-align: middle;
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
    color: $color-333;
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
    height:14px;
    border-radius: 50%;
    // border: 1px solid #222;
  }

  &__icon{
    width: px2rem(20);
  }
}
</style>

<template lang="html">
  <div class="dynamic-box">
    <div class="dynamic-box__head">
      <div class="dynamic-box__topic" v-if="data.type===2">#话题#{{data.topic}}</div>
      <div v-if="data.type===3">来自<span class="dynamic-box__team" @click.stop="goTeam">{{data.teamName}}</span></div>
    </div>
    <div class="dynamic-box__body">
      <div class="dynamic-box__title">{{data.title}}</div>
      <!-- <div class="dynamic-box__img" v-if="data.images && data.images.length > 0"><horizon-images :images="data.images"></horizon-images></div> -->
      <div class="dynamic-box__content">{{data.content}}</div>
    </div>
    <div class="dynamic-box__foot">
      <div class="dynamic-box__info">
        <div><img class="dynamic-box__avator" :src="data.avator"></div>
        <div>{{data.nickname}}</div>
        <div>{{data.time}}</div>
      </div>
      <div class="dynamic-box__statistic">
        <div><img class="dynamic-box__icon" src="../assets/pageview.png" alt="">{{data.readAmount}}</div>
        <div><img class="dynamic-box__icon" src="../assets/comment.png" alt="">{{data.commentAmount}}</div>
      </div>
    </div>
  </div>
</template>

<script>

import horizonImages from './horizon-images'
import avator from '../assets/iconfont-yonghu.png'
import logo from '../assets/logo.png'

export default {
  data() {
    return {

    }
  },

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
      this.$router.push('/teamdetails/2')
    }
  },

  components: {
    horizonImages
  }
}
</script>
