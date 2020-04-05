<template>
  <div id="app">
    <app-nav 
    :navItems="tutorials"
    @viewContentActivityTypeReceiver="contentReceiver($event)"
    >
    </app-nav>
    <router-view></router-view>
    <!-- <app-login/> -->
    <!-- <app-register/> -->
    <!-- <app-create
    :adoptedCategoryList="adoptedCategory.list"
    :currentItemList="currentItem.list"
    :navItems="tutorials"
    @selectCategoryReceiver="adoptingCategory($event)"
    > </app-create> -->
    <!-- <app-home 
    :currentItemList="currentItem.list"
    ></app-home> -->
  </div>
</template>

<script>
import tutorials from "../src/tutorials.json";

import AppNav from "./components/core/Navigation";
// import AppHome from "./components/views/Home";
// import AppRegister from "./components/views/Register"
// import AppLogin from "./components/views/Login"
// import AppCreate from "./components/views/Create"
export default {
  name: "App",
  data: function() {
    return {
      tutorials,
      currentItem: Object,
      adoptedCategory: Object
    };
  },
  components: {
    AppNav,
    // AppHome,
    // AppLogin,
    // AppCreate,
    // AppRegister
  },
  methods:{
    contentReceiver(e){
      this.currentItem= tutorials.find(t=>t.id===e)
    },
    adoptingCategory(e){
      this.adoptedCategory=tutorials.find(t=>t.id===e)
      
    }
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
