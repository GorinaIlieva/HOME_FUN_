import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/views/Home'
import Login from './components/views/Login'
import Register from './components/views/Register'
import Create from './components/views/Create'
import Activities from './components/views/Activities'
import Details from './components/views/Details'
import Edit from './components/views/Edit'
import Profile from './components/views/Profile'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
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
    },
    {
      path:'/activities',
      name: 'AppActivities',
      component : Activities,
      
    },
    {
      path: '/activities/:id',
      name:'AppDetails',
      component: Details,
     
    },
    {
      path: '/edit/:id',
      name:'AppEdit',
      component: Edit,
     
    },
    {
      path: '/profile',
      name:' AppProfile',
      component: Profile
    }
    
  ]
});


