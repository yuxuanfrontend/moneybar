import Vue from 'vue'
import Mint from 'mint-ui'
import RegisterVariable from './plugins/mint-message'
import Superagent from './plugins/vue-superagent'

import fastclick from 'fastclick'

import normalize from '../node_modules/normalize.css/normalize.css'
import weui from 'weui'
import 'mint-ui/lib/style.css'
import mainCss from './styles/main.scss'

import router from './router'
import store from './vuex/store'

import superagent from 'superagent'
import config from './config'
import './filter'

import App from './App'

// 开启fastclick
fastclick.attach(document.body);

Vue.use(Mint)
Vue.use(RegisterVariable)
Vue.use(Superagent)

// let testOpenIds = [
//   '123456789',
//   '223456789',
//   '323456789',
// ]
//
// store.commit('initOpenId', testOpenIds[Math.floor(Math.random()*3)])

router.afterEach((route) => {
  document.title = route.name
})

let getUrlParams = function() {
  if (!window.location.search) {
    return {}
  }
  var paramStr = window.location.search.split('?')[1]
  var obj = {}
  paramStr.split('&').forEach(function(item) {
    var name = item.split('=')[0]
    var value = item.split('=')[1]
    obj[name] = value
  })
  return obj
}

superagent.post(`${config.mbDomain}${getUrlParams().openId}`)
  .then(res => {
    if (res.body.responseCode === '000') {
      let data = res.body.dto

      return superagent.post(`${config.domain}member/create`)
        .send({
          openId: data.openid,
          memberId: data.memberId,
          nickname: data.nickname,
          attachment: {
            path: data.attachment && data.attachment.path
          }
        })
    } else {
      alert('用户信息错误')
    }
  }).then(res => {
    if (res.body.responseCode === '000') {
      const userInfo = res.body.dto
      store.commit('initUserInfo', {
        openId: userInfo.openId,
        nickname: userInfo.nickname,
        head: userInfo.attachment.path,
      })
      const app = new Vue({
        el: '#app',
        router,
        store,
        render: c => c(App)
      })
    } else {
      alert('用户信息错误')
    }
  })


// 安卓手机输入框被软键盘遮住问题
if (/Android/gi.test(navigator.userAgent)) {
  window.addEventListener('resize', function () {
    if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
      window.setTimeout(function () {
        document.activeElement.scrollIntoViewIfNeeded();
      }, 0);
    }
  })
}
