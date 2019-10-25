import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage'
import ChuzhongPage from '../components/ChuzhongPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/Chuzhong',
      component: ChuzhongPage
    }
  ]
})
