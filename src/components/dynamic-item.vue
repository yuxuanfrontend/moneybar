<style lang="scss">
@import "../styles/px2rem.scss";
@import "../styles/colors.scss";

.dynamic-box {
  background-color: $background-white;
  padding: px2rem(10);
  margin-bottom: px2rem(10);

  &__head, &__body {
    margin-bottom: px2rem(10);
  }

  &__foot {
    display: flex;
    font-size: 14px;
    // justify-content: space-between;
  }

  &__info, &__statistic {
    display: flex;
  }

  &__info {
    flex: 1;

    div {
      margin-right: px2rem(6);
    }
  }

  &__statistic {

    div {
      margin-left: px2rem(6);
    }
  }

  &__title {
    margin: px2rem(4) 0;
  }
}
</style>

<template lang="html">
  <div class="dynamic-box">
    <div class="dynamic-box__head">6006003 这个怎么样</div>
    <div class="dynamic-box__body">
      <div class="dynamic-box__title">这是标题</div>
      <div class="dynamic-box__title">这是内容。。。内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
    </div>
    <div class="dynamic-box__foot">
      <div class="dynamic-box__info">
        <div><img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS-_Katfl2l44SiXqHT-0PAhpZndKi8G6pnjwoJLYwJYrgKO_2C" style="height:14px;border-radius: 50%;"></div>
        <div>王先生</div>
        <div>10:23</div>
      </div>
      <div class="dynamic-box__statistic">
        <div>1000</div>
        <div>评论</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>
