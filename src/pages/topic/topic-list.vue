<style lang="css">
</style>
<template lang="html">
  <div class="topic-list">
    <mt-cell title="标题" :label="labeltxt" is-link to="topicdetails"></mt-cell>
  </div>
</template>

<script>
export default {
  data () {
    return {
      post:3,
      partIn:10,
    }
  },
  computed:{
    labeltxt(){
      return this.post+"篇帖子 · "+this.partIn+"人参与讨论"
    }
  }
}
</script>
