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

.home-header {
  background-color: #f6f6f6;
  color: #666;
}

</style>

<template lang="html">
  <div class="page">
    <div>
      <mt-header class="home-header">
        <div slot="left">热门小组</div>
        <div slot="right" @click="$router.push('/main-tab/team')">更多</div>
      </mt-header>
      <div class="team-group">
        <div class="team-group__wrap" v-for="(team, teamIndex) in teams" @click="$router.push('/teamdetails/' + teamIndex)">
          <img src="../assets/logo.png" style="width:30px;">
          <span class="vl-font-smaller">{{team.name}}</span>
        </div>
      </div>
    </div>
    <div>
      <mt-header class="home-header">
        <div slot="left">热门话题</div>
        <div slot="right" @click="$router.push('/topiclist')">更多</div>
      </mt-header>
      <div>
        <div v-if="topics.length === 0">暂无话题</div>
        <mt-cell v-for="topic in topics" :title="topic.title" @click.native="$router.push('/topicdetails')">
          <span class="vl-font-smaller">{{topic.peopleNum}}人参与讨论</span>
          <img slot="icon" :src="topic.hot" width="24" height="24">
        </mt-cell>
      </div>
    </div>
    <div>
      <mt-header class="home-header">
        <div slot="left">热门动态</div>
        <div slot="right" @click="$router.push('/main-tab/dynamic')">更多</div>
      </mt-header>
      <div>
        <dynamic-item v-for="(dynamic, dynamicIndex) in dynamics" @click.native="$router.push('/dynamicdetails/' + dynamicIndex)"></dynamic-item>
      </div>
    </div>
  </div>
</template>

<script>

import hotterImg from '../assets/hotter.png'
import hotImg from '../assets/hot.png'

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
          peopleNum: 1000,
          hot: hotterImg
        },
        {
          title: '一分极具增长力，抓紧买入',
          peopleNum: 500,
          hot: hotImg
        },
        {
          title: '一轮牛，抓紧买入',
          peopleNum: 100,
          hot: hotImg
        }
      ],

      dynamics: [{},{},{},{},{}]
    }
  },

  mounted() {
    this.$request.get('http://192.168.234.19:8083/wechat-inrpc/wechat/queryMoney')
      .then((res) => {
        console.log(res);
      })
  },

  components: {
    dynamicItem
  }
}
</script>
