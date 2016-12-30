<style lang="scss">
@import "../../styles/colors.scss";
@import "../../styles/px2rem.scss";
.team-intro{

  &__hd{
    display: flex;
    justify-content: space-between;
    padding: px2rem(10) px2rem(15);
    background: $background-white;
  }
  &__logo{
    display: flex;
    width: 18%;
    justify-content:center;
    align-items: center;
  }
  &__logo img{
    width: 80%;
  }
  &__title{
    line-height: px2rem(28);
  }
  &__info{
    width: 82%;
    padding:0 px2rem(5);
  }
  &__bar{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: $color-gray;
    font-size: 14px;
  }
  &__bar img{
    width: px2rem(24);
    height: px2rem(24);
    margin: 0 px2rem(5);
  }
  &__manager,&__profile{
    display: flex;
    justify-content: space-between;
    margin-top:px2rem(10);
    padding:px2rem(10) px2rem(15);
    background: $background-white;
  }
  &__subtitle{
    width: px2rem(120);
  }
}

</style>
<template lang="html">
  <div class="page">
    <div class="team-intro">
      <div class="team-intro__hd">
        <div class="team-intro__logo">
          <img src="../../assets/logo.png" alt="">
        </div>
        <div class="team-intro__info">
          <div class="team-intro__title">
            {{ teamname }}
          </div>
          <div class="team-intro__bar">
            <img src="../../assets/iconfont-yonghu.png" alt="">
            <span>{{ number }}</span>
            <img src="../../assets/comment.png" alt="">
            <span>{{ commentnum }}</span>
          </div>
        </div>
      </div>
      <div class="team-intro__manager">
        <div class="team-intro__subtitle">
          管理员
        </div>
        <div class="team-intro__person">
          <img src="" alt="">
          <p>{{username}}</p>
        </div>
      </div>
      <div class="team-intro__profile">
        <div class="team-intro__subtitle">
          简介
        </div>
        <div class="team-intro__txt">
          {{teamcontainer}}
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      teamname:'油一分小组',
      username:'李学轩',
      number:100,
      commentnum:100,
      teamcontainer:'这是一个段落示例。这是一个段落示例。这是一个段落示例。这是一个段落示例例。这是一个段落示例。这是一个段落示'
    }
  }
}
</script>
