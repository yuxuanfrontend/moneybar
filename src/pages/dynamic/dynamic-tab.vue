<style lang="scss">
</style>

<template lang="html">
  <div class="page">
    <div class="page page--navbar">
      <mt-loadmore :top-method="loadTop" ref="loadmore">
        <div v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <dynamic-item v-for="dynamic in dynamicDatas" v-on:click.native="dynamicdetails(dynamic)"></dynamic-item>
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

import dynamicItem from '../../components/dynamic-item'

export default {
  name: 'dynamic-tab',

  data() {
    return {
      allLoaded: false,
      dynamicDatas: [{id:1},{id:2},{id:3}]
    }
  },

  components: {
    dynamicItem,
  },

  mounted() {
    this.$request.post('http://192.168.226.183:8083/wechat-inrpc/wechat/queryDynamic')
      .send({
        orderByCreateTimeDesc: 'true'
      })
      .then((res) => {
        console.log(res);
      })
  },

  methods:{
    dynamicdetails(dynamic){
      this.$router.push('/dynamicdetails/'+dynamic.id)
    },

    loadTop() {
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded();
      }, 2000)
    },

    loadMore() {
      this.loading = true;
      setTimeout(() => {
        this.dynamicDatas.push({})
        this.loading = false;
      }, 1000);
    },

    goPublish() {
      this.$router.push('/publish')
    }
  }
}
</script>
