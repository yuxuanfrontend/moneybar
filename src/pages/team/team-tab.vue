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
    width: 50px;
    height: 50px;
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
    line-height: px2rem(20);
    color: $color-666;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>

<template lang="html">
  <div class="page page--navbar">
    <div class="team-list" v-for="(team,index) in teams" @click="teamdetails(team)">
      <div class="team-list__logo">
        <img :src="team.logo" alt="">
      </div>
      <div class="team-list__bd">
        <div class="team-list__info">
          <div class="team-list__name">
            {{team.teamName}}
          </div>
          <div class="team-list__bar">
            <!-- <img src="../../assets/iconfont-yonghu.png" alt="">
            <span>{{ team.poepleNum }}</span> -->
            <img src="../../assets/comment.png" alt="">
            <span>{{ team.dynamicNum }}</span>
          </div>
        </div>
        <div class="team-list__txt vl-font-small">
          {{team.teamTxt}}
        </div>
      </div>
    </div>
    <div class="vl-nodata" v-if="teams.length === 0">暂无小组</div>
    <!-- <mt-loadmore :top-method="loadTop" ref="loadmore">
    </mt-loadmore> -->
  </div>

</template>

<script>

import _ from 'lodash'

export default {
  name: 'team-tab',

  data () {
    return {
      teams:[],

      queryPage: 1,
      querySize: 10
    }
  },

  mounted() {
    this.getTeamList()
  },

  methods:{
    teamdetails(team){
      this.$router.push('/teamdetails/' + team.id)
    },

    getTeamList() {
      this.$request.post(this.$getUrl('groups'))
        .send({
          basePageResults: {
            pageNo: this.queryPage,
            pageSize: this.querySize
          }
        })
        .then((res) => {
          if (res.body.responseCode === '000') {
            this.teams = []

            _.each(res.body.dto.results, (item) => {
              this.teams.push({
                id: item.id,
                dynamicNum: item.dynamicCount,
                teamName: item.name,
                teamTxt: item.brief,
                logo: item.logo
              })
            })
          } else {
            this.$toast(res.body.responseMsg)
          }
        })
    },

    loadTop() {
      setTimeout(() => {
        this.getTeamList()
        this.$refs.loadmore.onTopLoaded();
      }, 1000)
    }
  }
}
</script>
