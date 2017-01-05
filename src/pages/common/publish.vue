<style lang="scss">
@import "../../styles/px2rem.scss";
@import "../../styles/colors.scss";
.publish{
  font-family: "微软雅黑";

  &__input{
    width: 96%;
    border: none;
    height: px2rem(36);
    line-height:  px2rem(26);
    background: none;
    border-bottom:2px solid $background-white;
    padding: px2rem(5) 2%;
  }
  &__textarea{
    width: 96%;
    border: none;
    background: none;
    height: px2rem(320);
    outline: none;
    padding: px2rem(8) 2%;
  }
  &__btn{
    width: 90%;
    background: $background-white;
    padding: px2rem(15) 5%;
    position: absolute;
    bottom: 0;
  }
}

</style>


<template lang="html">
<div class="page">
  <div class="publish">
    <input class="publish__input" type="text" name="" value="" placeholder="请输入标题">
    <textarea class="publish__textarea" name="name" rows="8" cols="80" placeholder="请输入内容"></textarea>
    <div class="publish__btn">
      <mt-button type="primary" size="large">发布</mt-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
}
</script>
