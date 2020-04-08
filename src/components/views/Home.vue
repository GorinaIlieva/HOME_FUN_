
  <template>
  <mdb-card
    class="card-image"
    style="background-image: url(https://i.pinimg.com/originals/01/10/f0/0110f03e84a7e2057b1f79ba395f47a2.png)"
  >
    <div class="text-blue text-center py-5 px-4 my-5">
      <div>
        <h2 class="card-title h1-responsive pt-3 mb-5 font-bold">
          <strong>MAKE SOME FUN!</strong>
        </h2>
        <p class="mx-5 mb-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem,
          optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos. Odit sed qui, dolorum!
        </p>
        <template v-if="isAuth">
          <mdb-btn outline="blue" size="bg" icon="clone" > <router-link to="/activities">Activities</router-link></mdb-btn>
          <mdb-btn outline="blue" size="bg" icon="clone" > <router-link to="/create">Create Activity</router-link></mdb-btn>
        </template>
        <template v-if="!isAuth">
          <mdb-btn outline="white" size="bg" icon="clone"><router-link to="/register">Register</router-link></mdb-btn>
          <mdb-btn outline="white" size="bg" icon="clone"><router-link to="/login">Login</router-link></mdb-btn>
        </template>
      </div>
    </div>
  </mdb-card>
</template>


<script>
import { mdbCard, mdbBtn } from "mdbvue";
export default {
  name: "AppHome",
  components: {
    mdbCard,
    mdbBtn
  },
  data() {
    return {
      selectedIndex: 0,
    };
  },
  props: {
    currentItemList: Array,
    isAuth:Boolean
  },
  beforeCreate() {
    this.$emit("onAuth", localStorage.getItem("authtoken") !== null);
  },
  methods: {
    selectIndex(i) {
      this.selectedIndex = i;
    }
  },
  computed: {
    viewDesc() {
      return this.currentItemList[this.selectedIndex].description;
    }
  }
};
</script>

