<style lang="scss">
</style>

<template lang="html">
  <div class="page">
    <div class="page page--navbar" @scroll="dynamicScroll" ref="scrollWrap">
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="isLoading" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
        <dynamic-item class="needsclick" v-for="dynamic in dynamicDatas" :data="dynamic" v-on:click.native.stop="goDetails(dynamic)"></dynamic-item>
      </div>
      <div class="scroll-loading" v-show="isLoading&&dynamicDatas.length !== 0">
        <mt-spinner class="scroll-loading__spinner" type="fading-circle" :size="20"></mt-spinner>
        <div> 加载更多中</div>
      </div>
      <div class="vl-nodata" v-show="dynamicDatas.length === 0">暂无动态</div>
      <!-- <mt-loadmore :top-method="loadTop" ref="loadmore">
      </mt-loadmore> -->
    </div>
    <div class="vl-float-button" @click="goPublish"><img src="../../assets/edit.png" alt=""></div>
  </div>
</template>

<script>

import _ from 'lodash'
import moment from 'moment'

import {appendDynamics} from '../../utils/dealDynamic'

import dynamicItem from '../../components/dynamic-item'

export default {
  name: 'dynamic-tab',

  data() {
    return {
      allLoaded: false,
      // dynamicDatas: [],
      // queryPage: 1,
      // querySize: 5,
      isLoading: false,
    }
  },

  computed: {
    dynamicDatas() {
      return this.$store.state.dynamicTab.dynamics
    },
  },

  components: {
    dynamicItem,
  },

  mounted() {
    // this.queryData((res) => {
    //   this.queryPage++
    //
    //   this.dynamicDatas = []
    //   appendDynamics(this.dynamicDatas, res.body.dto.results)
    // })
    if (this.dynamicDatas.length <= 0) {
      this.$store.dispatch('ajaxAppendDynamics')
    }

    this.$refs.scrollWrap.scrollTop = this.$store.state.dynamicTab.scrollTop
  },

  methods:{
    // 弹性处理scroll事件
    dynamicScroll: _.debounce(function(event) {
        this.$store.commit('setScrollTop', event.target.scrollTop)
      }, 100),

    goDetails(dynamic){
      this.$router.push('/dynamicdetails/'+dynamic.id)
    },

    // queryData(callback) {
    //   this.$request.post(this.$getUrl('dynamics'))
    //   .send({
    //     basePageResults: {
    //       pageNo: this.queryPage,
    //       pageSize: this.querySize
    //     },
    //     orderByCreateTimeDesc: true,
    //     statusVal: '1'
    //   })
    //   .then((res) => {
    //     if (res.body.responseCode === '000') {
    //       callback(res)
    //     } else {
    //       this.$toast(res.body.responseMsg)
    //     }
    //   })
    // },
    //
    // loadTop() {
    //   setTimeout(() => {
    //     this.queryPage = 1
    //
    //     this.queryData((res) => {
    //       this.queryPage++
    //
    //       this.dynamicDatas = []
    //       appendDynamics(this.dynamicDatas, res.body.dto.results)
    //
    //     })
    //     this.$refs.loadmore.onTopLoaded();
    //   }, 1000)
    // },
    //
    loadMore() {
      this.isLoading = true;
      setTimeout(() => {
        this.$store.dispatch('ajaxAppendDynamics')
        // this.queryData((res) => {
        //   this.queryPage++
        //
        //   appendDynamics(this.dynamicDatas, res.body.dto.results)
        //
        //   if (res.body.dto.results.length === 0) {
        //     this.$toast('没有更多动态了')
        //   }
        // })
        this.isLoading = false;
      }, 1000);
    },

    goPublish() {
      this.$router.push({
        path: '/publish',
        query: {
          type: 1
        }
      })
    }
  }
}
</script>
