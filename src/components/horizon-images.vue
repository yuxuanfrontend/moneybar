<style lang="scss">
.iscroll-images {
  position: relative;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

.images-wrap {
  display: inline-block;
  height: 100%;
  white-space: nowrap;

  &__item {
    display: inline-block;
    width: 70px;
    height: 70px;
    margin: 0 20px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    img {
      width: 70px;
    }
  }
}
</style>

<template lang="html">
  <div class="iscroll-images" ref="iscroll">
    <div class="images-wrap">
      <div class="images-wrap__item" v-for="image in images"><img :src="image"></div>
    </div>
  </div>
</template>

<script>

import iscroll from 'iscroll'

export default {
  data() {
    return {
      myScroll: null
    }
  },

  props: {
    images: {
      type: Array,
      required: true
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.myScroll = new iscroll(this.$refs.iscroll, {
        tap: true,
        scrollX: true,
        scrollY: false,
        disablePointer: true,
        disableTouch: false,
        disableMouse: false,
        eventPassthrough: true
      })
    })
  }
}
</script>
