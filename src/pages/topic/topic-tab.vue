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
          话题标题
        </div>
        <div class="topic-tab__describe">
          {{ post }}篇帖子 · {{ partIn }}人参与讨论
        </div>
      </div>
      <div class="topic-tab__comment">
        <div class="topic-tab__list" v-for="comment in commentList">
          <div class="topic-tab__text">
            {{ comment.container }}
          </div>
          <div class="topic-tab__foot">
            <div class="topic-tab__username">
              <img class="topic-tab__img" src="../../assets/iconfont-yonghu.png" alt="">
              <label>{{ comment.username }}</label>
              <span>{{ comment.date }}</span>
            </div>
            <div class="topic-tab__review">
              <img class="topic-tab__img" src="../../assets/pageview.png" alt="">
              <span>{{ comment.pageview }}</span>
              <img class="topic-tab__img" src="../../assets/comment.png" alt="">
              <span>{{ comment.commentnum }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      post:3,
      partIn:10,
      commentList:[
        {container:'这是一个段落示例。这是一个段落示例。这是一个段落示例。这是一个段落示例。这是一个段落示例。这是一个段落示例。这是',
         username:'用户昵称',date:'12.10',pageview:'1000',commentnum:'8'}
      ]
    }
  },
  methods:{
    topicmore(){
      this.$router.push('/topiclist')
    }
  }
}
</script>
