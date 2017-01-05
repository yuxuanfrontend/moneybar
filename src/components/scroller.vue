<style lang="scss">
.vm-scroll {
  // position: relative;
  // width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  // height: 400px;

  &__wrap {

  }
}
</style>

<template lang="html">
  <div class="vm-scroll page page--navbar" ref="myscroll">
    <div class="vm-scroll__wrap">
      <slot></slot>
    </div>
  </div>
</template>

<script>

import iscroll from 'iscroll'

export default {
  data() {
    return {
      scroller: null
    }
  },
  mounted() {
    this.scroller = new iscroll(this.$refs.myscroll, {
      tap: true,
      // scrollX: true,
      // scrollY: false,
      disablePointer: true,
      disableTouch: false,
      disableMouse: false,
      // eventPassthrough: true
    })
  }
}
</script>
