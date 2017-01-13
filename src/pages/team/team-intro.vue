<style lang="scss">
@import "../../styles/colors.scss";
@import "../../styles/px2rem.scss";
.team-intro{

  &__hd{
    display: flex;
    justify-content: space-between;
    padding: px2rem(10) px2rem(15);
    background: $background-white;
    border-bottom: 1px solid #eeeeee;
  }

  &__logo{
    display: flex;
    width: 15%;
    justify-content:center;
    align-items: center;
  }

  &__userimg img,
  &__logo img{
    width: 80%;
  }

  &__title{
    line-height: px2rem(28);
    font-size: 16px;
  }

  &__info{
    width: 85%;
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
    width: px2rem(20);
    height: px2rem(20);
    margin: 0 px2rem(5);
  }

  &__manager,&__profile{
    display: flex;
    justify-content: space-between;
    margin-top:px2rem(10);
    padding:px2rem(10) px2rem(15);
    background: $background-white;
    color:$color-666;
  }

  &__subtitle{
    width:15%;
    display: flex;
    font-size: 14px;
    line-height: px2rem(22);
  }

  &__person,
  &__txt{
    width:85%;
    font-size: 14px;
    line-height: px2rem(22);
  }

  &__userimg,
  &__username{
    display:block;
    width:18%;
    text-align:center;
  }

  &__userimg{
    height: px2rem(40);
  }
  &__userimg img{
    width: px3rem(30);
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
            <!-- <img src="../../assets/iconfont-yonghu.png" alt="">
            <span>{{ number }}</span> -->
            <img src="../../assets/comment.png" alt="">
            <span>{{ dynamicNum }}</span>
          </div>
        </div>
      </div>
      <div class="team-intro__manager">
        <div class="team-intro__subtitle">
          管理员
        </div>
        <div class="team-intro__person">
          <div class="team-intro__userimg">
            <img src="../../assets/iconfont-yonghu.png" alt="">
          </div>
          <div class="team-intro__username">
            {{username}}
          </div>
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
      // number:100,
      dynamicNum:100,
      teamcontainer:'这是一个段落示例。这是一个段落示例。这是一个段落示例。这是一个段落示例例。这是一个段落示例。这是一个段落示'
    }
  },

  mounted() {
    this.$request.post(this.$getUrl('groups'))
      .send({
        id: this.$route.params.id
      })
      .then((res) => {
        if (res.body.responseCode === '000') {
          let teamData = res.body.dto[0]
          this.teamname = teamData.name
          this.username = teamData.memberName
          this.dynamicNum = teamData.dynamicCount
          this.teamcontainer = teamData.brief
        } else {
          this.$toast(res.body.responseMsg)
        }
      })
  }
}
</script>
