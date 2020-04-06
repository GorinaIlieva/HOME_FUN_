
  <template>
  <mdb-navbar expand="large" dark color="indigo">
    <mdb-navbar-brand rauter-link to="/">Navbar</mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav right>
        <template v-if="isLogged">
          <mdb-dropdown tag="li" class="nav-item">
            <mdb-dropdown-toggle tag="a" navLink color="indigo" slot="toggle" waves-fixed>Activities</mdb-dropdown-toggle>
            <mdb-dropdown-menu>
              <mdb-dropdown-item v-for="item in navItems" :key="item._id"
                router-link :to="{ name: 'AppActivity', params: { id: item._id }}"
                  @click="viewContentActivityTypeHandler(item._id)">{{item.name}}
              </mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown>
          <mdb-nav-item router-link to="/profile" active>Profile</mdb-nav-item>
          <mdb-nav-item router-link to="/create" active>Create an Activity</mdb-nav-item>
          <mdb-nav-item router-link to="/logout" active>Logout</mdb-nav-item>
        </template>
        <template v-else>
          <mdb-nav-item router-link to="/login">Login</mdb-nav-item>
          <mdb-nav-item router-link to="/Register">Register</mdb-nav-item>
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
  mdbDropdown,
  mdbDropdownToggle,
  mdbDropdownItem,
  mdbDropdownMenu
} from "mdbvue";

import EventBus from "../../utils/eventbus";



export default {
  name: "AppNav",
  data: function() {
    return {
      isLogged: Boolean
    };
  },

  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,

    mdbDropdown,
    mdbDropdownToggle,
    mdbDropdownItem,
    mdbDropdownMenu
  },
  beforeCreate() {
    this.$emit("isLogged", localStorage.getItem("authtoken") !== null);
  },
  props: {
    navItems: {
      required: true,
      type: Array
    }
  },
  methods: {
    viewContentActivityTypeHandler(_id) {
      console.log(_id);
      EventBus.$emit("viewContentActivityTypeReceiver", _id);
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