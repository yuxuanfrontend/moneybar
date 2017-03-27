<style lang="css">
</style>

<template lang="html">
  <div class="dynamic-box">
    <div class="dynamic-box__body">
      <div class="dynamic-box__title">{{data.vote ? '支持正方观点' : '支持反方观点'}}</div>
      <div class="dynamic-box__content vl-font-small">{{data.content}}</div>
    </div>
    <div class="dynamic-box__foot">
      <div class="dynamic-box__info">
        <div class="dynamic-box__avator" :style="{'background-image': 'url(' + data.head + ')'}"></div>
        <div>{{data.nickname}}</div>
        <div>{{data.createTime | time-HHmm}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      required: true,
      type: Object,
    }
  }
}
</script>
