<template>
  <div id="app">
    <transition :name="animationType">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

import _ from 'lodash'

import router from './router'

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
    let transitionHistory = [this.$route]

    let mainTabReg = /main-tab/

    router.beforeEach((to, from, next) => {
      // 判断是否返回 返回的话启用返回动画
      if (_.isEqual(transitionHistory[transitionHistory.length - 2], to)) {
        this.animationType = 'slide-back'
        transitionHistory = _.dropRight(transitionHistory)
      } else {
        if (mainTabReg.test(to.fullPath) && mainTabReg.test(from.fullPath)) {
          transitionHistory[transitionHistory.length - 1] = to
        } else {
          transitionHistory.push(to)
        }
        this.animationType = 'slide'
      }

      next()
    })

    let testOpenIds = [
      '123456789',
      '223456789',
      '323456789',
    ]

    this.$store.commit('initOpenId', testOpenIds[Math.floor(Math.random()*3)])
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
