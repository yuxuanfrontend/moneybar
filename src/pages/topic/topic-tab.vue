<style lang="scss" scoped>
@import "../../styles/px2rem.scss";
@import "../../styles/colors.scss";

.topic-tab{
  font-family: "微软雅黑";

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
    font-size: 16px;
  }
  &__subject{
    font-size: 18px;
  }
  &__more{
    font-size: 16px;
  }
  &__describe{
    font-size: 14px;
    color: $color-gray;
  }
  &__comment{
    margin-top: px2rem(10);
    background: $background-white;
  }
  &__text{
    padding: px2rem(10) 0;
    font-size: 16px;
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
    font-size: 14px;
    color: $color-gray;
  }
  &__img{
    width: px2rem(20);
  }
}
</style>

<template lang="html">
  <div class="page page--navbar">
    <mt-loadmore :top-method="loadTop" ref="loadmore">
      <div class="topic-tab">
        <div class="topic-tab__hd">
          <div class="topic-tab__subject">
            新鲜话题
          </div>
          <div class="topic-tab__more" v-on:click="topicmore">
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
    </mt-loadmore>
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

    getInitData() {
      this.$request.post(this.$getUrl('topics'))
        .send({
          basePageResults: {
            pageNo: 1,
            pageSize: 1
          }
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
              }
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
