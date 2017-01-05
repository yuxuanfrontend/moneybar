import Vue from 'vue'
import Mint from 'mint-ui'
import MintMessage from './plugins/mint-message'

import fastclick from 'fastclick'

import normalize from '../node_modules/normalize.css/normalize.css'
import weui from 'weui'
import 'mint-ui/lib/style.css'
import mainCss from './styles/main.scss'

import router from './router'
import store from './vuex/store'

import App from './App'

// 开启fastclick
fastclick.attach(document.body);

Vue.use(Mint)
Vue.use(MintMessage)

router.afterEach((route) => {
  document.title = route.name
})

const app = new Vue({
  el: '#app',
  router,
  store,
  render: c => c(App)
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
