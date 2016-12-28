import Vue from 'vue'
import VueRouter from 'vue-router'
import Mint from 'mint-ui'

import fastclick from 'fastclick'

import normalize from '../node_modules/normalize.css/normalize.css'
// import weui from 'weui'
import 'mint-ui/lib/style.css'
// import mainCss from './styles/main.scss'

import routes from './router/router'

import App from './App'

// 开启fastclick
fastclick.attach(document.body);

Vue.use(VueRouter)
Vue.use(Mint)

const router = new VueRouter({
  routes
})

const app = new Vue({
  el: '#app',
  router,
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
