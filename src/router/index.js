import Vue from 'vue'
import Router from 'vue-router'

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
