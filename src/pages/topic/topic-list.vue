<style lang="css">
</style>
<template lang="html">
  <div class="topic-list">
    <mt-cell v-for="topic in topics" :title="topic.title" :label="labeltxt" is-link @click.native="$router.push('/topicdetails/2')"></mt-cell>
  </div>
</template>

<script>
export default {
  data () {
    return {
      post:3,
      partIn:10,
      topics: [
        {
          title: '说说你收藏了哪些壹分'
        },
        {
          title: '壹分极具增长潜力'
        },
        {
          title: '一轮牛，抓紧买入'
        }
      ]
    }
  },
  computed:{
    labeltxt(){
      return this.post+"篇帖子 · "+this.partIn+"人参与讨论"
    }
  }
}
</script>
