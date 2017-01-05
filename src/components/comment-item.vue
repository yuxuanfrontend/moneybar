<style lang="scss">
@import "../styles/colors.scss";
@import '../styles/px2rem.scss';
.comment-item{
  margin-bottom:px2rem(15);

  &__hd{
    display: flex;
    justify-content: space-between;
    height: px2rem(20);
    border-bottom: 1px solid #eeeeee;
  }
  &__bd{
    border-bottom: 1px solid #eeeeee;
  }
  &__hd,
  &__bd,
  &__foot{
    background: $background-white;
    padding:px2rem(10) px2rem(15);
    font-size: 16px;
    line-height: px2rem(20);
    color: $color-333;
  }
  &__delete{
    display: flex;
    div{
      margin: 0 px2rem(5);
    }
  }
}
</style>
<template lang="html">
  <div class="comment-item">
      <div class="comment-item__hd">
        <div class="comment-item__reply">
          {{ '回复 : ' + commentxt }}
        </div>
        <div class="comment-item__delete">
          <div v-on:click="deletecom"> 删除 </div>
          <div> {{ commentdate }} </div>
        </div>
      </div>
      <div class="comment-item__bd"> {{ newCommenttxt }} </div>
      <div class="comment-item__foot">
        {{ commentname + ' : ' }} {{ commenttxt }}
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commentxt:'吗妈妈买',
      commentdate:12.13,
      newCommenttxt:'这是一个段落示例。这是一个段落示例。这是一个段落示例。这是一个段落示例。这是一个段落示例。这是一个…',
      commentname:'李福振',
      commenttxt:'这是一个段落示例。这是一个段落示'
    }
  },
  methods:{
    deletecom(){
      this.$emit('deletecomment')
    }
  }
}
</script>
