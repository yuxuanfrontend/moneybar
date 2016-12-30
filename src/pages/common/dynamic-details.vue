<style lang="scss">
@import "../../styles/colors.scss";
@import "../../styles/px2rem.scss";

.dynamic-details{

  &__username{
    padding:px2rem(10) px2rem(15);
    background: $background-white;
    display: flex;
    justify-content: space-between;
    color: $color-333;
    border-bottom: 1px solid #eeeeee;

    div{
      display: flex;
      align-items: center;

      img{
        width: px2rem(24);
        margin-right: px2rem(5);
      }
    }
  }

  &__date{
    font-size: 14px;
    color: $color-666;
  }

  &__bd{
    padding:px2rem(10) px2rem(15);
    background: $background-white;
  }

  &__title{
    line-height: px2rem(30);
    font-size: 16px;
  }

  &__txt{
    color: $color-666;
    line-height: px2rem(20);
    font-size: 14px;
  }
  &__foot{
    display: flex;
    justify-content: space-between;
    padding: px2rem(10) 0;
    font-size: 14px;
    color: $color-gray;
  }
  &__no{
    text-align: center;
    background: $background-white;
    color: $color-gray;
    font-size: 14px;
    padding: px2rem(15);
    margin-top: px2rem(10);
  }
  &__input{
    display: flex;
    justify-content: space-between;
    background: $background-white;
    padding: px2rem(15);
    margin-top: px2rem(10);

    input{
      width: 80%;
      line-height: px2rem(32);
      height: px2rem(32);
      box-sizing: border-box;
      border: 1px solid #eeeeee;
      font-size: 14px;
      text-indent: px2rem(5);
      outline: none;
      border-radius: 0;
    }
    button{
      border: none;
      background: #26a2ff;
      color: $color-white;
      height: px2rem(32);
      width: 20%;
      font-size: 14px;
      outline: none;
    }
  }
  &__commentbox{
    padding:px2rem(10) px2rem(15);
    background: $background-white;
    display: flex;
    justify-content: space-between;
    margin-top: px2rem(10);
  }
  &__commentbd{
  }
  &__commentname{
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    color: $color-666
  }
  &__commentxt{
    margin-top: px2rem(5);
    font-size: 14px;
    color: $color-666;
    line-height: px2rem(20);
  }
  &__commenting{
    display: flex;
    justify-content: flex-end;
    height: px2rem(24);
    img{
      width: px2rem(24)
    }
  }
  &__class{
    display: flex;
    justify-content: space-between;
    background: $background-gray;
    font-size: 16px;
    color: $color-333;
    padding: px2rem(10) px2rem(15);
    position: relative;
  }

}

</style>

<template lang="html">
  <div class="page">
    <div class="dynamic-details">
      <div class="dynamic-details__class">
        <div>  {{ (1 === 2) ? topictitle : ('来自小组 '+ teamtitle) }} </div>
        <div class="mint-cell-allow-right"> </div>
      </div>
      <div class="dynamic-details__username">
        <div> <img src="../../assets/iconfont-yonghu.png" alt="">{{ username }} </div>
        <div class="dynamic-details__date"> {{ date }} </div>
      </div>
      <div class="dynamic-details__bd">
        <div class="dynamic-details__title"> {{ title }} </div>
        <div class="dynamic-details__txt"> {{ container }} </div>
        <div class="dynamic-details__foot"><div>阅读{{ }}评论{{ }}</div><div @click="report">举报 </div> </div>
      </div>
      <div class="dynamic-details__no">暂时还没有评论，发表第一条评论吧 </div>
      <div class="dynamic-details__commentbox">
        <div class="dynamic-details__commentbd">
          <div class="dynamic-details__commentname">
            <div>{{ newcommentname }} {{ commentname && (' 回复 ' + commentname) }} </div>
            <div> {{ commentdate }} </div>
          </div>
          <div class="dynamic-details__commentxt">{{commentxt}}</div>
          <div class="dynamic-details__commenting"><img src="../../assets/comment.png" alt=""></div>
        </div>
      </div>
      <div class="dynamic-details__input">
        <input type="text" name="" value="" placeholder="点评一下吧...">
        <button>发送</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      topictitle:'#话题# 说说你收藏了哪些壹分',
      teamtitle:' 有油壹分小组',
      username:'李学轩',
      commentname:'李福振',
      date:'12.12',
      newcommentname:'潘青青',
      commentdate:'13.12',
      commentxt:'散户是什么意思？求教！！！帮帮帮散户是什么意思？求教！！！帮帮帮',
      title:'一位散户高手的炒股心得',
      container:'炒股心得（1）为什么散户不会赚钱？1、炒股是资源的再分配，并不是创造财富。2、开办股市就是为了圈钱，不给你一点甜头你怎么会拿钱去投资呢？2、开办股市就是为了圈钱，不给你一点甜头你怎么会拿钱去投资呢？不给你一'
    }
  },
  methods:{
    report(){
      this.$router.push('report')
    }
  }
}
</script>
