<template>
  <mdb-navbar color="indigo" dark>
     <mdb-btn color="primary"><mdb-icon icon="magic" class="mr-1" router-link to="/home"/>*FUN*HOME</mdb-btn>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <!-- <mdb-nav-item href="#" active>Home</mdb-nav-item> -->
        <!-- isNOTAuth -->
        <mdb-nav-item router-link to="/login">LogIn</mdb-nav-item>
        <mdb-nav-item router-link to="/register">Register</mdb-nav-item>
        <!-- isAuth -->
        <mdb-nav-item
          v-for="item in navItems"
          :key="item.id"
          @click="viewContentActivityTypeHandler(item.id)"
        >{{item.name}}</mdb-nav-item>

       
       <mdb-btn color="primary"><mdb-icon icon="magic" class="mr-1" router-link to="/create"/>ADD an ACTIVITY [+]</mdb-btn>
        <!-- <mdb-dropdown tag="li" class="nav-item">
          <mdb-dropdown-toggle
            tag="a"
            navLink
            color="indigo"
            slot="toggle"
            waves-fixed
          >Dropdown link</mdb-dropdown-toggle>
          <mdb-dropdown-menu>
            <mdb-dropdown-item>Action</mdb-dropdown-item>
            <mdb-dropdown-item>Another action</mdb-dropdown-item>
            <mdb-dropdown-item>Something else here</mdb-dropdown-item>
          </mdb-dropdown-menu>
        </mdb-dropdown>-->
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import {
  mdbNavbar,
  // mdbNavbarBrand,
  mdbNavbarToggler,
  mdbNavbarNav,
  mdbNavItem,
  mdbBtn,
  mdbIcon
  //   mdbDropdown,
  //   mdbDropdownToggle,
  //   mdbDropdownItem,
  //   mdbDropdownMenu
} from "mdbvue";

export default {
  name: "AppNav",
  data: function() {
    return {
      
    };
  },
  props: {
    navItems: {
      type: Array,
      required: true
    }
  },
  components: {
    mdbNavbar,
    // mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    mdbBtn,
    mdbIcon
    // mdbDropdown,
    // mdbDropdownToggle,
    // mdbDropdownItem,
    // mdbDropdownMenu
  },
  methods: {
    viewContentActivityTypeHandler(id) {
      this.$emit('viewContentActivityTypeReceiver', id)
    }
  }
};
</script>
<style scoped>


.btn:hover {
    /* color: #44a9f8;
    background: white; */
    border: 1px solid #44a9f8;
    /* text-decoration: underline; */
}

</style>