<style lang="scss" scoped>
@import "../../styles/colors.scss";
@import "../../styles/px2rem.scss";

.team-detail{

  &__hd{
    display: flex;
    justify-content: space-between;
    position: relative;
    padding:px2rem(10) px2rem(15);
    background: $background-white;
    border-bottom: 1px solid #eeeeee;
  }
  &__logo{
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__logo img{
    width:80%;
  }
  &__title{
    width: 85%;
    line-height: px2rem(28);
    font-size: 16px;
  }
  &__info{
    width: 85%;
    padding: 0 px2rem(5);
  }
  &__bar{
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $color-gray;
    font-size: 14px;
  }
  &__bar img{
    width:px2rem(20);
    height: px2rem(20);
  }

}
</style>
<template lang="html">
  <div class="team-detail">
    <div class="team-detail__hd" @click="teamIntro">
      <div class="team-detail__logo">
        <img src="../../assets/logo.png" alt="">
      </div>
      <div class="team-detail__info">
        <div class="team-detail__title">
          {{ teamname }}
        </div>
        <div class="team-detail__bar">
          <label>管理员:</label>
          <span>{{username}}</span>
          <img src="../../assets/iconfont-yonghu.png" alt="">
          <span>{{ number }}</span>
          <img src="../../assets/comment.png" alt="">
          <span>{{ commentnum }}</span>
        </div>
      </div>
      <div class="mint-cell-allow-right">
      </div>
    </div>
    <div class="team-detai__bd">
      <div class="">
        <dynamic-item v-for="(dynamic, dynamicIndex) in dynamics"  @click.native="$router.push('/dynamicdetails/' + (dynamicIndex + 1))"></dynamic-item>
      </div>
    </div>
  </div>
</template>

<script>

import dynamicItem from '../../components/dynamic-item'

export default {
  data () {
    return {
      teamname:'油一分小组',
      username:'李学轩',
      number:100,
      commentnum:100,
      dynamics: [{},{},{}]
    }
  },
  methods:{
    teamIntro(){
      this.$router.push('/teamIntro')
    }
  },
  components: {
    dynamicItem
  }
}
</script>
