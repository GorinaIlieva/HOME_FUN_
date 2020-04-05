import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/views/Home'
import Login from './components/views/Login'
import Register from './components/views/Register'
import Create from './components/views/Create'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'AppHome',
      component: Home
    },
    {
      path: '/login',
      name: 'AppLogin',
      component: Login
    },
    {
      path: '/register',
      name: 'AppRegister',
      component: Register
    },
    {
      path: '/create',
      name: 'AppCreate',
      component: Create
    }
  ]
})
