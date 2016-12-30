import { MessageBox } from 'mint-ui'

let mintMessage = {}

mintMessage.install = function(Vue, options) {
  Vue.prototype.$mintMessage = MessageBox
}

export default mintMessage
