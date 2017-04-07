import Vue from 'vue'
import moment from 'moment'

Vue.filter('time-HHmm', (val) => {
  if (moment().isAfter(moment(val), 'year')) {
    return moment(val).format('YYYY-MM-DD')
  }

  if (moment().isAfter(moment(val), 'day')) {
    return moment(val).format('MM-DD')
  }

  return moment(val).format('HH:mm')
})
