import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/views/Home'
import Login from './components/views/Login'
import Register from './components/views/Register'



Vue.use(Router)

const router = new Router({
  mode: 'history',
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
      component: ()=> import (/*webpackChunkName: "Create*/ "./components/views/Create"),
      meta: {requiresAuth:true}
    },
    {
      path: '/activities',
      name: 'AppActivities',
      component: ()=> import (/*webpackChunkName: "Activities*/ "./components/views/Activities"),
      meta: {requiresAuth:true}
    },
    {
      path: '/activities/:id',
      name: 'AppDetails',
      component: ()=> import (/*webpackChunkName: "Details*/ "./components/views/Details"),
      meta: {requiresAuth:true}

    },
    {
      path: '/edit/:id',
      name: 'AppEdit',
      component: ()=>import (/*webpackChunkName: "Edit"*/ "./components/views/Edit"),
      meta: {requiresAuth: true}

    },
    {
      path: '/profile',
      name: ' AppProfile',
      component: ()=> import(/*webpackChunkName: "Profile" */ "./components/views/Profile"),
      meta: { requiresAuth: true }
    }

  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!localStorage.getItem('authtoken')) {
      next({ name: 'AppLogin' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router;


