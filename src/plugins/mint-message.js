import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'

let mintMessage = {}

mintMessage.install = function(Vue, options) {
  Vue.prototype.$mintMessage = MessageBox
  Vue.prototype.$toast = Toast
}

export default mintMessage
