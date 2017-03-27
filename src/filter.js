import Vue from 'vue'
import moment from 'moment'

Vue.filter('time-HHmm', (val) => {
  return moment(val).format('HH:mm')
})
