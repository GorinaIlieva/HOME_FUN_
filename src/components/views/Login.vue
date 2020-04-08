<template>
  <div>
    <!-- Material form login -->
    <form @submit.prevent="loginHandler">
      <p class="h4 text-center mb-4">Sign in</p>
      <div class="grey-text">
        <mdb-input
          label="Your first and last name"
          icon="user"
          type="text"
          v-model="name"
          @blur="$v.name.$touch"
        />
        <template v-if="$v.name.$erorr">
          <p class="error" v-if="!$v.name.required">Email is required!</p>
          
        </template>

        <mdb-input
          label="Your password"
          icon="lock"
          type="password"
          v-model="password"
          @blur="$v.password.$touch"
        />
        <template v-if="$v.password.$error">
          <p class="error" v-if="!$v.password.required">Email is required!</p>
          
        </template>
      </div>

      <div class="text-center">
        <mdb-btn :disabled="$v.$invalid" color="primary" type='submit'>Login</mdb-btn>
      </div>
    </form>
  </div>

  <!-- Material form login -->
</template>

<script>
import { validationMixin } from "vuelidate";
import { mdbInput, mdbBtn } from "mdbvue";
import { required} from "vuelidate/lib/validators";
import { post } from "../service/requester";
import { toastSuccess } from '../../utils/toasted';
import {setUserData} from '../auth/authentication'


export default {
  mixins: [validationMixin],
  name: "AppLogin",
  data() {
    return {
      
      name: "",
      password: ""
    };
  },
  components: {
    mdbInput,
    mdbBtn
  },
  methods: {
    loginHandler() {
      this.$v.$touch();
      console.log("Login has worked");
      post(
        "user",
        "login",
        "POST",
        { username: this.name, password: this.password },
        "Basic"
      ).then(data=>{
        setUserData(data)
       
        toastSuccess('You have successfully login!')
        this.$router.push({name:'AppHome'})
      })
      .catch(error=> console.log(error))

     
    }
  },
  validations: {
    name: {
      required,
      },
    password: {
      required,
     }
  }
};
</script>

<style scoped>
p.error {
  text-align: left;
  background-color: #f8d7da;
  padding: 8px;
  border-radius: 3px;
}
</style>