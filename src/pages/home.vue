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

.topic-list {
  display: flex;
  line-height: 35px;
  background-color: #fff;
  padding: 0 10px;

  &__icon {
    margin-right: 6px;

    img {
      vertical-align: baseline;;
    }
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
        <div class="vl-font-smaller" slot="right" @click="$router.push('/main-tab/team')">更多></div>
      </mt-header>
      <div class="team-group">
        <div class="team-group__wrap" v-for="(team, teamIndex) in teams" @click="$router.push('/teamdetails/' + team.id)">
          <img :src="team.logo" style="width:75px;height:75px;">
          <span>{{team.name}}</span>
        </div>
      </div>
    </div>
    <div>
      <mt-header class="home-header">
        <div slot="left">热门话题</div>
        <div class="vl-font-smaller" slot="right" @click="$router.push('/topiclist')">更多></div>
      </mt-header>
      <div>
        <div class="vl-nodata" v-if="topics.length === 0">暂无话题</div>
        <div class="topic-list" v-for="topic in topics" @click="$router.push('/topicdetails/' + topic.id)">
          <div class="topic-list__icon"><img slot="icon" :src="topic.hot" width="16" height="16"></div>
          <div class="topic-list__title">{{topic.title}}</div>
        </div>
        <!-- <mt-cell v-for="(topic, topicIndex) in topics" :title="topic.title" @click.native="$router.push('/topicdetails/' + topic.id)">
          <img slot="icon" :src="topic.hot" width="16" height="16">
        </mt-cell> -->
      </div>
    </div>
    <div>
      <mt-header class="home-header">
        <div slot="left">热门动态</div>
        <div class="vl-font-smaller" slot="right" @click="$router.push('/main-tab/dynamic')">更多></div>
      </mt-header>
      <div>
        <dynamic-item v-for="(dynamic, dynamicIndex) in dynamics" :data="dynamic" @click.native="$router.push('/dynamicdetails/' + dynamic.id)"></dynamic-item>
        <div class="vl-nodata" v-if="dynamics.length === 0">暂无话题</div>
      </div>
    </div>
  </div>
</template>

<script>

import _ from 'lodash'
import {appendDynamics} from '../utils/dealDynamic'

import hotterImg from '../assets/hotter.png'
import hotImg from '../assets/hot.png'

import dynamicItem from '../components/dynamic-item'

export default {
  data() {
    return {
      teams: [],
      topics: [],

      dynamics: []
    }
  },

  mounted() {
    this.$request.get(this.$getUrl('moneies'))
      .then((res) => {
        if (res.body.responseCode === '000') {

          this.teams = []
          _.each(res.body.dto.groupList, (item) => {
            this.teams.push({
              id: item.id,
              name: item.name,
              logo: item.logo
            })
          })

          this.topics = []
          _.each(res.body.dto.topicList, (item) => {
            this.topics.push({
              id: item.id,
              title: item.title,
              hot: item.discussCount > 800 ? hotterImg : hotImg
            })
          })

          this.dynamics = []
          appendDynamics(this.dynamics, res.body.dto.dynamicList)
        } else {
          this.$toast(res.body.responseMsg)
        }
      })
  },

  components: {
    dynamicItem
  }
}
</script>
