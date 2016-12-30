<style lang="scss">
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
  }

  &__statistic {

    div {
      margin-left: px2rem(6);
    }
  }

  &__title {
    margin: px2rem(6) 0;
    color: $color-333;
  }
}
</style>

<template lang="html">
  <div class="dynamic-box">
    <div class="dynamic-box__head">6006003 这个怎么样</div>
    <div class="dynamic-box__body">
      <div class="dynamic-box__title">{{data.title}}</div>
      <div class="dynamic-box__img"><horizon-images :images="data.images"></horizon-images></div>
      <div class="dynamic-box__content">{{data.content}}</div>
    </div>
    <div class="dynamic-box__foot">
      <div class="dynamic-box__info">
        <div><img :src="data.avator" style="height:14px;border-radius: 50%;"></div>
        <div>{{data.nickname}}</div>
        <div>{{data.time}}</div>
      </div>
      <div class="dynamic-box__statistic">
        <div>{{data.readAmount}}</div>
        <div>{{data.commentAmount}}</div>
      </div>
    </div>
  </div>
</template>

<script>

import horizonImages from './horizon-images'
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
          type: 1,
          title: '这是标题',
          content: '这是内容。。。内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
          images: [logo, logo, logo, logo, logo],
          avator: logo,
          nickname: '王先生',
          time: '10:23',
          readAmount: 1000,
          commentAmount: 20
        }
      },
      type: Object
    }
  },

  components: {
    horizonImages
  }
}
</script>
