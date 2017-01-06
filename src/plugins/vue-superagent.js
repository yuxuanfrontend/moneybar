import superagent from 'superagent'

import config from '../config'

import { Toast } from 'mint-ui'

let VueSuperagent = {}

VueSuperagent.install = function(Vue, options) {

  Vue.prototype.$request = superagent

  Vue.prototype.$myRequest = function(method, url) {
    return superagent[method](config.domain + url)
      .timeout({
        response: 8000,
      }).
      on('error', (err) => {
        if (err.timeout) {
          Toast('请求超时')
        }
      })
  }

}

export default VueSuperagent
