// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import axios from 'axios'
import store from './store'
import './assets/css/reset.css'
Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.use(Element)
var root = process.env.prodHost
console.log(process.env, root)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  methods: {
    afterLeave () {
      this.$root.$emit('triggerScroll')
    }
  },
  store,
  components: { App },
  template: '<App/>'
})
