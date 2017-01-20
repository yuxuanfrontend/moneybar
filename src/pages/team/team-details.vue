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
    width:50px;
    height: 50px;
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
  <div class="page team-detail">
    <div class="team-detail__hd" @click="teamIntro">
      <div class="team-detail__logo">
        <img :src="logo" alt="">
      </div>
      <div class="team-detail__info">
        <div class="team-detail__title">
          {{ teamname }}
        </div>
        <div class="team-detail__bar">
          <span style="margin-right:25px;">管理员:{{username}}</span>
          <!-- <img src="../../assets/iconfont-yonghu.png" alt="">
          <span>{{ number }}</span> -->
          <img src="../../assets/comment.png" alt="">
          <span>{{ dynamicNum }}</span>
        </div>
      </div>
      <div class="mint-cell-allow-right">
      </div>
    </div>
    <div class="team-detai__bd">
      <div class="">
        <dynamic-item v-for="(dynamic, dynamicIndex) in dynamics" :data="dynamic"  @click.native="$router.push('/dynamicdetails/' + (dynamicIndex + 1))"></dynamic-item>
      </div>
    </div>
    <div class="vl-float-button" @click="goPublish"><img src="../../assets/edit.png" alt=""></div>
  </div>
</template>

<script>

import moment from 'moment'

import dynamicItem from '../../components/dynamic-item'

export default {
  data () {
    return {
      teamname:'油一分小组',
      logo: '',
      username:'fda',
      dynamicNum:0,
      dynamics: []
    }
  },

  mounted() {
    this.$request.post(this.$getUrl('groups'))
      .send({
        id: this.$route.params.id
      })
      .then((res) => {
        if (res.body.responseCode === '000') {
          let teamData = res.body.dto.results[0]
          this.logo = teamData.logo
          this.teamname = teamData.name
          this.username = teamData.memberName
          this.dynamicNum = teamData.dynamicCount
        } else {
          this.$toast(res.body.responseMsg)
        }
      })

      this.$request.post(this.$getUrl('dynamics'))
        .send({
          group: {
            id: this.$route.params.id
          }
        })
        .then((res) => {
          if (res.body.responseCode === '000') {
            this.dynamics = []
            _.each(res.body.dto.results, (item) => {
              this.dynamics.push({
                id: item.id,
                type: item.type,
                topic: item.topicName,
                teamName: item.groupName,
                title: item.title,
                content: item.content,
                avator: item.memberPath,
                nickname: item.nickname,
                time: moment(item.createTime).format('HH:mm'),
                readAmount: item.readCount,
                commentAmount: item.commentCount
              })
            })
          } else {
            this.$toast(res.body.responseMsg)
          }
        })
  },

  methods:{
    teamIntro(){
      this.$router.push('/teamIntro/' + this.$route.params.id)
    },
    goPublish() {
      this.$router.push({
        path: '/publish',
        query: {
          id: this.$route.params.id,
          type: 3
        }
      })
    }
  },
  components: {
    dynamicItem
  }
}
</script>
