
  <template>
     <mdb-navbar expand="large" dark color="indigo">
      <mdb-navbar-brand rauter-link to="/">HomeFUN</mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav right>
          <template v-if="isAuth">
            <mdb-nav-item router-link to="/activities" active>Activities</mdb-nav-item>

            <!-- <mdb-dropdown tag="li" class="nav-item">
              <mdb-dropdown-toggle
                tag="a"
                navLink
                color="indigo"
                slot="toggle"
                waves-fixed
              >Activities</mdb-dropdown-toggle>
              <mdb-dropdown-menu>
                <mdb-dropdown-item
                  v-for="item in navItems"
                  :key="item._id"
                  router-link
                  :to="{ name: 'AppActivity', params: { id: item._id }}">
                  <a @click="viewContentActivityTypeHandler(item._id)">{{item.name}} </a> 
                  </mdb-dropdown-item>
              </mdb-dropdown-menu>
            </mdb-dropdown> -->
            <mdb-nav-item router-link to="/profile" active>Profile</mdb-nav-item>
            <mdb-nav-item router-link to="/create" active>Create Activity</mdb-nav-item>
            <mdb-nav-item @click="logout" active>Logout</mdb-nav-item>
          </template>
          <template v-if="!isAuth">
            <mdb-nav-item router-link to="/login">Login</mdb-nav-item>
            <mdb-nav-item router-link to="/register">Register</mdb-nav-item>
          </template>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
  
</template>

<script>
import {
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavbarToggler,
  mdbNavbarNav,
  mdbNavItem,
  // mdbDropdown,
  // mdbDropdownToggle,
  // mdbDropdownItem,
  // mdbDropdownMenu
} from "mdbvue";

// import EventBus from "../../utils/eventbus";

import { post } from "../service/requester";

export default {
  name: "AppNav",
  data: function() {
    return {
     resp:Array
    };
  },
  
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    // mdbDropdown,
    // mdbDropdownToggle,
    // mdbDropdownItem,
    // mdbDropdownMenu
  },
 
  props: {
    navItems: {
      required: true,
      default: ()=>[]
    },
    isAuth: Boolean
  },
  
  methods: {
    // viewContentActivityTypeHandler(_id) {
    //   console.log('dam')
    //   console.log(`id from NAv:${_id}`);
    //   EventBus.$emit("viewContentActivityTypeReceiver", _id);
    // },
    logout() {
      post("user", "_logout", "POST", {}, "Kinvey")
        .then(() => {
          
          localStorage.clear();
          this.$emit("onAuth", false);
          this.$router.push({ name: "AppHome" });
        })
        .catch(error => {
          console.log(error);
        });
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