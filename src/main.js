// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/css/bootstrap.min.css'
import "./assets/css/bootstrap-datetimepicker.min.css"; //？？？
import './assets/iconfont/iconfont.css'
import './assets/css/reset.css'
import './assets/css/mindex.css'

import $ from 'jquery'
import './assets/js/bootstrap.min'
import './assets/js/Global'

import axios from 'axios'
import Qs from 'qs'


Vue.prototype.qs = Qs;

axios.defaults.withCredentials=true;
Vue.prototype.axios = axios

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  if (toDepth < fromDepth) {
    console.log('后退。。。')
    from.meta.keepAlive = false
    to.meta.keepAlive = true
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
