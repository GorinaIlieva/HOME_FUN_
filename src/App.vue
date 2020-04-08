<template>
  <div id="app">
    <app-nav :navItems="navItems" @onAuth="isAuth = $event" :isAuth="isAuth" />
    <!-- <app-activities :subjects='subjects' /> -->
    
    <router-view @onAuth="isAuth = $event" :isAuth="isAuth"></router-view>
    <app-footer />
    <!-- <app-create
    :adoptedCategoryList="adoptedCategory.list"
    :currentItemList="currentItem.list"
    :navItems="tutorials"
    @selectCategoryReceiver="adoptingCategory($event)"
    > </app-create>-->
    <!-- <app-home 
    :currentItemList="currentItem.list"
    ></app-home>-->
  </div>
</template>

<script>
import AppNav from "./components/core/Navigation";
import AppFooter from "./components/core/Footer";

import { get } from "../src/components/service/requester";
// import AppActivities from '../src/components/views/Activities'

// import AppCreate from "./components/views/Create"
export default {
  name: "App",
  data: function() {
    return {
      isAuth: localStorage.getItem("authtoken") !== null,
      navItems: Array,
      currentActivity: Array,
      adoptedCategory: Object
    };
  },
  created() {
    get("appdata", "activities", "GET", "Kinvey").then(data => {
      this.navItems = data;
    });
  },
  components: {
    AppNav,
    AppFooter
    // AppActivities
    // AppHome,
    // AppLogin,
    // AppCreate,
    // AppRegister
  },
  methods: {
    //   adoptingCategory(e){
    //     this.adoptedCategory=tutorials.find(t=>t.id===e)
    //   }
  },
  computed: {
    // subjects() {
    //     return this.navItems.find(a => a._id === this.currentActivityId).list;
    // }
  }
};
</script>


<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  margin-top: 150px;
  text-align: center;
  color: #2c3e50;
}
</style>
