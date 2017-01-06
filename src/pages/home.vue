<style lang="scss" scoped>
.team-group {
  display: flex;
  padding: 20px 0;
  background-color: #fff;

  &__wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
  }
}

.team-name {
  font-size: 14px;
}

</style>

<template lang="html">
  <div class="page">
    <div>
      <mt-header>
        <div slot="left">热门小组</div>
        <div slot="right" @click="$router.push('/main-tab/team')">更多</div>
      </mt-header>
      <div class="team-group">
        <div class="team-group__wrap" v-for="(team, teamIndex) in teams" @click="$router.push('/teamdetails/' + teamIndex)">
          <img src="../assets/logo.png" style="width:30px;">
          <span class="team-name">{{team.name}}</span>
        </div>
      </div>
    </div>
    <div>
      <mt-header>
        <div slot="left">热门话题</div>
        <div slot="right" @click="$router.push('/topiclist')">更多</div>
      </mt-header>
      <div>
        <mt-cell v-for="topic in topics" :title="topic.title">
          <span>{{topic.peopleNum}}人参与讨论</span>
          <img slot="icon" src="../assets/logo.png" width="24" height="24">
        </mt-cell>
      </div>
    </div>
    <div>
      <mt-header>
        <div slot="left">热门动态</div>
        <div slot="right" @click="$router.push('/main-tab/dynamic')">更多</div>
      </mt-header>
      <div>
        <dynamic-item v-for="dynamic in dynamics"></dynamic-item>
      </div>
    </div>
  </div>
</template>

<script>

import dynamicItem from '../components/dynamic-item'

export default {
  data() {
    return {
      teams: [
        {
          id: 1,
          name: '纪念币小组',
        },
        {
          id: 2,
          name: '外汇券小组',
        },
        {
          id: 3,
          name: '壹分小组',
        },
        {
          id: 4,
          name: '三分小组',
        },
      ],
      topics: [
        {
          title: '说说你收藏了哪些一分',
          peopleNum: 1000
        },
        {
          title: '一分极具增长力，抓紧买入',
          peopleNum: 500
        },
        {
          title: '一轮牛，抓紧买入',
          peopleNum: 100
        }
      ],

      dynamics: [{},{},{},{},{}]
    }
  },

  components: {
    dynamicItem
  }
}
</script>
