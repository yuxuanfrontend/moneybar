<style lang="css">
</style>

<template lang="html">
  <div class="page">
    <mt-navbar v-model="selected" :fixed="true">
      <mt-tab-item id="1">动态</mt-tab-item>
      <mt-tab-item id="2">话题</mt-tab-item>
      <mt-tab-item id="3">小组</mt-tab-item>
    </mt-navbar>

    <router-view></router-view>
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
    }
  }
}
</script>
