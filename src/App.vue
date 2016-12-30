<template>
  <div id="app">
    <transition :name="animationType">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      animationType: 'slide'
    }
  },

  mounted() {
  }
}
</script>

<style>
#app {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
