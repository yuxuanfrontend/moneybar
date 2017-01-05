<style lang="scss" scoped>
.nav-button {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  width: 40px;
  text-align: center;
  line-height: 44px;
}
</style>

<template lang="html">
  <div class="page">
    <mt-navbar class="pdright" v-model="selected" :fixed="true">
      <mt-tab-item id="1">动态</mt-tab-item>
      <mt-tab-item id="2">话题</mt-tab-item>
      <mt-tab-item id="3">小组</mt-tab-item>
    </mt-navbar>
    <div class="nav-button" @click="goPersonal"><img src="../assets/menu1.png" class="vl-icon"></div>

    <transition name="slide">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: ''
    }
  },

  mounted() {
    this.switchTab()
  },

  methods: {
    switchTab() {
      switch (this.$route.path) {
        case '/dynamic':
          this.selected = '1'
          break;
        case '/topic':
          this.selected = '2'
          break;
        case '/team':
          this.selected = '3'
          break;
      }
    },

    goPersonal() {
      this.$router.push('/personal')
    }
  },

  watch: {
    selected(newVal) {
      switch (newVal) {
        case '1':
          this.$router.push('/dynamic')
          break;
        case '2':
          this.$router.push('/topic')
          break;
        case '3':
          this.$router.push('/team')
          break;
      }
    },

    $route() {
      this.switchTab()
    }
  }
}
</script>
