<style lang="scss" scoped>
@import "../styles/px2rem.scss";

.horizon-photos {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  &__item {
    width: 32%;
    height: px2rem(100);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    &--one {
      width: 100%;
      height: px2rem(150);
    }

    &--two {
      width: 48%;
      height: px2rem(130);
    }
  }
}
</style>

<template lang="html">
  <div class="horizon-photos">
    <div v-for="image in images" class="horizon-photos__item" :class="classByLength" :style="setBgImgStyle(image)"></div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      required: true,
      type: Array,
    }
  },

  computed: {
    classByLength() {
      const length = this.images.length

      if (length === 1) {
        return ['horizon-photos__item--one']
      }

      if (length === 2) {
        return ['horizon-photos__item--two']
      }

      return []
    }
  },

  methods: {
    setBgImgStyle(path) {
      return {
        backgroundImage: `url(${path})`,
      }
    }
  }
}
</script>
