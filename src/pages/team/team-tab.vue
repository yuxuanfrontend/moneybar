<style lang="scss">
@import "../../styles/colors.scss";
@import "../../styles/px2rem.scss";

.team-list{
  background: $background-white;
  padding: px2rem(15);
  display: flex;
  border-bottom: 1px solid #eeeeee;

  &__logo{
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__bd{
    width: 80%;
    padding: 0 px2rem(5);
  }
  &__logo img{
    width: 80%;
  }
  &__num img{
    width: px2rem(20);
  }
  &__info{
    display: flex;
    justify-content: space-between;
  }
  &__name{
    color: $color-333;
    font-size: 16px;
  }
  &__name,&__bar{
    display: flex;
    align-items: center;
  }
  &__bar{
    color: $color-gray;
  }
  &__bar img{
    width: px2rem(20);
  }
  &__txt{
    margin-top: px2rem(5);
    font-size: 14px;
    line-height: px2rem(20);
    color: $color-666;
  }
}
</style>

<template lang="html">
  <div class="page page--navbar">
    <div class="team-list" v-for="(team,index) in teams" @click="teamdetails(team)">
      <div class="team-list__logo">
        <img src="../../assets/logo.png" alt="">
      </div>
      <div class="team-list__bd">
        <div class="team-list__info">
          <div class="team-list__name">
            {{team.teamname}}
          </div>
          <div class="team-list__bar">
            <img src="../../assets/iconfont-yonghu.png" alt="">
            <span>{{ team.number }}</span>
            <img src="../../assets/comment.png" alt="">
            <span>{{ team.commentnum }}</span>
          </div>
        </div>
        <div class="team-list__txt">
          {{team.teamtxt}}
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      teams:[
        {id: 1,number:100, teamname:'纪念币小组', teamtxt:'这是一个段落示例。段落示例。例。这是一个段落示例。这是一个段落示', commentnum:100},
        {id: 2,number:100, teamname:'纪念币小组', teamtxt:'这是一个段落示例。段落示例。例。这是一个段落示例。这是一个段落示', commentnum:100},
        {id: 3,number:100, teamname:'纪念币小组', teamtxt:'这是一个段落示例。段落示例。例。这是一个段落示例。这是一个段落示', commentnum:100}
      ]
    }
  },
  methods:{
    teamdetails(team){
      this.$router.push('/teamdetails/' + team.id)
    }
  }
}
</script>
