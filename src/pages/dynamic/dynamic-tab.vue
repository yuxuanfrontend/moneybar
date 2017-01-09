<style lang="scss">
</style>

<template lang="html">
  <div class="page">
    <div class="page page--navbar">
      <mt-loadmore :top-method="loadTop" ref="loadmore">
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
        <dynamic-item v-for="dynamic in dynamicDatas" :data="dynamic" v-on:click.native="goDetails(dynamic)"></dynamic-item>
      </div>
      <div class="scroll-loading">
        <mt-spinner class="scroll-loading__spinner" type="fading-circle" :size="20"></mt-spinner>
        <div> 加载更多中</div>
      </div>
    </mt-loadmore>
    </div>
    <div class="vl-float-button" @click="goPublish"><img src="../../assets/edit.png" alt=""></div>
  </div>
</template>

<script>

import moment from 'moment'

import dynamicItem from '../../components/dynamic-item'

export default {
  name: 'dynamic-tab',

  data() {
    return {
      allLoaded: false,
      dynamicDatas: [{id:1},{id:2},{id:3}],
      queryPage: 1,
      querySize: 5,
      loading: false
    }
  },

  components: {
    dynamicItem,
  },

  mounted() {
    this.queryData((res) => {
      this.queryPage++

      this.dynamicDatas = []
      this.appendDynamics(res.body.dto)
    })
  },

  methods:{
    goDetails(dynamic){
      this.$router.push('/dynamicdetails/'+dynamic.id)
    },

    queryData(callback) {
      this.$request.post(this.$getUrl('dynamics'))
        .send({
          basePageResults: {
            pageNo: this.queryPage,
            pageSize: this.querySize
          }
        })
        .then((res) => {
          if (res.body.responseCode === '000') {
            callback(res)
          } else {
            this.$toast(res.body.responseMsg)
          }
        })
    },

    loadTop() {

      setTimeout(() => {
        this.queryPage = 1

        this.queryData((res) => {
          this.queryPage++

          this.dynamicDatas = []
          this.appendDynamics(res.body.dto)
        })
        this.$refs.loadmore.onTopLoaded();
      }, 1000)
    },

    appendDynamics(data) {
      _.each(data, (item) => {
        this.dynamicDatas.push({
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
    },

    loadMore() {
      this.loading = true;
      setTimeout(() => {
        this.queryData((res) => {
          this.queryPage++

          this.appendDynamics(res.body.dto)
        })
        this.loading = false;
      }, 1000);
    },

    goPublish() {
      this.$router.push('/publish')
    }
  }
}
</script>
