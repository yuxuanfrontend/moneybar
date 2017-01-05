<style lang="scss">
@import "../../styles/colors.scss";
@import "../../styles/px2rem.scss";

.my-heard{
  &__bd,
  &__comment{
    border-bottom: 1px solid #eeeeee;
  }
  &__hd,
  &__comment,
  &__bd,
  &__foot{
    background: $background-white;
    padding:px2rem(5) px2rem(15);
    font-size: 16px;
    line-height: px2rem(20);
    color: $color-333;
  }
  &__hd,
  &__user{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    img{
      width: px2rem(30);
      margin-right: px2rem(5);
    }
  }
  &__comment{
    text-indent: px2rem(15);
  }
  &__foot{
    div{
      padding: px2rem(5) 0;
    }
  }
}
.sign{
  width: px2rem(6);
  height: px2rem(6);
  background: red;
  margin-left: px2rem(5);
  border-radius: px2rem(6);
}

</style>
<template lang="html">
  <div class="page">
    <div class="my-heard">
        <div class="my-heard__hd">
          <div class="my-heard__user">
            <div><img :src="userimg" alt=""></div>
            <div>{{ username }} </div>
            <div class="sign"></div>
          </div>
          <div>{{ commentdate }} </div>
        </div>
        <div class="my-heard__comment"> {{ commentxt }} </div>
        <div class="my-heard__bd">
          <div> {{ dynamictxt }}</div>
        </div>
        <div class="my-heard__foot">
          <div> {{ commentname +' : '+ commentxt }} </div>
          <div> {{ '我 '+ ' 回复 ' +  commentname +' : '+ commentxt }}</div>
        </div>
    </div>
  </div>
</template>

<script>
import userImg from '../../assets/iconfont-yonghu.png'
export default {
  data () {
    return {
      userimg:userImg,
      username:'福镇',
      commentname:'学选',
      commentdate:12.13,
      commentxt:'我是评论我是评论我是评论我是我是评论我我是评 阿喵仔 头像 我是评论我是评论我是评论',
      dynamictxt:'这是一个段落示例。这是一个段落示例。这是一个段落示例。这是一个段落示例。这是一个段落示例。这是一个…'
    }
  }

}
</script>
