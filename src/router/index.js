import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import index from '@/views/index'
// import test from '@/views/test'

import 'element-ui/lib/theme-chalk/index.css'
// import { resolve } from 'path'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: resolve => require(['@/components/HelloWorld'], resolve)
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/views/index'], resolve)
    },
    {
      path: '/test',
      name: 'test',
      component: resolve => require(['@/views/test'], resolve)
    }
  ]
})
