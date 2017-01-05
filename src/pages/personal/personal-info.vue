<template lang="html">
  <div class="personal-box">
    <div class="personal-box__personalimg">
      <img :src='personalimg' alt="">
    </div>
    <div class="personal-box__personalname">
      <p  contenteditable="true">
        {{ personalname }}
      </p>
    </div>

  </div>
</template>

<script>

import personalImg from '../../assets/iconfont-yonghu.png'
export default {
  data () {
    return {
      personalimg:personalImg,
      personalname:'某某+用户编号'
    }
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
