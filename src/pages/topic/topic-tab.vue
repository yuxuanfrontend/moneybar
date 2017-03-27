<style lang="scss" scoped>
@import "../../styles/px2rem.scss";
@import "../../styles/colors.scss";

.topic-tab{

  &__hd,&__bd,&__list{
    padding: px2rem(10) px2rem(15);
    background: #fff;
  }
  &__hd{
    height: px2rem(32);
    align-items: center;
    border-bottom:1px solid #eeeeee;
    justify-content: space-between;
    display: flex;
    color: $color-333;
  }
  &__bd{
    line-height: 28px;
    margin-bottom: px2rem(10);
  }
  &__title{
    color: $color-333;
  }
  &__describe{
    color: $color-gray;
  }
  &__comment{
    margin-top: px2rem(10);
    background: $background-white;
  }
  &__text{
    padding: px2rem(10) 0;
    line-height: px2rem(28);
    color:  $color-666;
  }
  &__list{
    border-bottom:1px solid #eeeeee;
  }
  &__foot{
    display: flex;
    justify-content: space-between;
    height: px2rem(40)
  }
  &__username{
    width: 40%;
  }
  &__review{
    width: 30%;
  }
  &__username,&__review{
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $color-gray;
  }
  &__img{
    width: px2rem(20);
  }
}
</style>

<template lang="html">
  <div class="page">
    <div class="page page--navbar">
      <div class="topic-tab">
        <div class="topic-tab__hd">
          <div class="topic-tab__subject">
            新鲜话题
          </div>
          <div class="topic-tab__more vl-font-small" v-on:click="topicmore">
            更多
          </div>
        </div>
        <div class="topic-tab__bd">
          <div class="topic-tab__title">
            {{newTopic.title}}
          </div>
          <div class="topic-tab__describe">
            {{ newTopic.post }}篇帖子
          </div>
        </div>
        <dynamic-item v-for="dynamic in dynamicDatas" :data="dynamic" v-on:click.native="dynamicdetails(dynamic)"></dynamic-item>
      </div>
      <div class="vl-nodata" v-show="dynamicDatas.length === 0">暂无动态</div>
      <!-- <mt-loadmore :top-method="loadTop" ref="loadmore">
      </mt-loadmore> -->
    </div>
    <div class="vl-float-button" v-show="newTopic.id" @click="goPublish"><img src="../../assets/edit.png" alt=""></div>
  </div>
</template>

<script>

import {appendDynamics} from '../../utils/dealDynamic'

import dynamicItem from '../../components/dynamic-item'

export default {
  name: 'topic-tab',

  data () {
    return {
      newTopic: {
        id: '',
        title: '',
        post: 0,
      },
      dynamicDatas: [],

      queryPage: 1,
      querySize: 10
    }
  },

  mounted() {
    this.getInitData()
  },

  methods:{
    topicmore(){
      this.$router.push('/topiclist')
    },
    dynamicdetails(dynamic){
      this.$router.push('/dynamicdetails/'+dynamic.id)
    },

    goPublish() {
      this.$router.push({
        path: '/publish',
        query: {
          id: this.newTopic.id,
          type: 2
        }
      })
    },

    getInitData() {
      this.$request.post(this.$getUrl('topics'))
        .send({
          basePageResults: {
            pageNo: 1,
            pageSize: 1
          },
          statusVal: '0'
        })
        .then((res) => {
          if (res.body.responseCode === '000') {
            let data = res.body.dto.results[0]
            this.newTopic.id = data.id
            this.newTopic.title = data.title
            this.newTopic.post = data.dynamicCount
          } else {
            this.$toast(res.body.responseMsg)
          }

          return this.$request.post(this.$getUrl('dynamics'))
            .send({
              topic: {
                id: this.newTopic.id
              },
              statusVal: '1'
            })
        }).then((res) => {
          if (res.body.responseCode === '000') {
            this.dynamicDatas = []
            appendDynamics(this.dynamicDatas, res.body.dto.results)
          } else {
            this.$toast(res.body.responseMsg)
          }
        })
    },

    loadTop() {
      setTimeout(() => {
        this.getInitData()
        this.$refs.loadmore.onTopLoaded();
      }, 1000)
    }
  },

  components: {
    dynamicItem,
  },

}
</script>
