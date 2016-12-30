<style lang="css">
</style>

<template lang="html">
  <div class="page page--navbar">
    <dynamic-item v-for="n in 3"></dynamic-item>
  </div>
</template>

<script>

import dynamicItem from '../../components/dynamic-item'
export default {
  name: 'dynamic-tab',

  components: {
    dynamicItem
  },

  mounted() {
    
  }
}
</script>
