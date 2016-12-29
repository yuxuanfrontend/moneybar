<style lang="css">
</style>

<template lang="html">
  <div>
    <dynamic-item v-for="n in 3"></dynamic-item>
  </div>
</template>

<script>

import dynamicItem from '../../components/dynamic-item'
export default {
  components: {
    dynamicItem
  }
}
</script>
