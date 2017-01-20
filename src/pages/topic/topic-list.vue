<style lang="css">
</style>
<template lang="html">
  <div class="topic-list">
    <mt-cell v-for="topic in topics" :title="topic.title" :label="topic.labelTxt" is-link @click.native="$router.push('/topicdetails/' + topic.id)"></mt-cell>
  </div>
</template>

<script>

import _ from 'lodash'

export default {
  data () {
    return {
      post:3,
      partIn:10,
      topics: [],
      queryPage: 1,
      querySize: 10
    }
  },

  computed:{
    labeltxt(){
      return this.post+"篇帖子 · "+this.partIn+"人参与讨论"
    }
  },

  mounted() {
    this.$requestWithLoading('post', 'topics')
      .send({
        basePageResults: {
          pageNo: this.queryPage,
          pageSize: this.querySize
        },
        statusVal: '0'
      })
      .then((res) => {
        if (res.body.responseCode === '000') {
          this.topics = []
          _.each(res.body.dto.results, (item) => {
            this.topics.push({
              id: item.id,
              title: item.title,
              labelTxt: item.dynamicCount + "篇帖子"
            })
          })
        } else {
          this.$toast(res.body.responseMsg)
        }
      })
  }
}
</script>
