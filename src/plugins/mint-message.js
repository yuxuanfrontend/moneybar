import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'

import config from '../config'

let registerVariable = {}

registerVariable.install = function(Vue, options) {
  Vue.prototype.$mintMessage = MessageBox
  Vue.prototype.$toast = Toast

  Vue.prototype.$getUrl = function(partial) {
    return config.domain + partial
  }
}

export default registerVariable
