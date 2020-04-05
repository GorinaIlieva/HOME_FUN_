<template>
  <div>
    <h2 v-if="success">You have logged in successfully</h2>
    <!-- Material form login -->
    <form v-else @submit.prevent="loginHandler">
      <p class="h4 text-center mb-4">Sign in</p>
      <div class="grey-text">
        <mdb-input
          label="Your email"
          icon="envelope"
          type="email"
          v-model="email"
          @blur="$v.email.$touch"
        />
        <template v-if="$v.email.$erorr">
          <p class="error" v-if="!$v.email.required">Email is required!</p>
          <p class="error" v-else-if="!$v.email.email">Email is invalid!</p>
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
          <p class="error" v-else-if="!$v.password.alphanumeric">Password is invalid!</p>
          <p
            class="error"
            v-else-if="!$v.password.minLength"
          >Password has to be more than 8 symbols!</p>
        </template>
      </div>
    
      <div class="text-center">
        <mdb-btn :disabled="$v.$invalid" color="primary">Login</mdb-btn>
      </div>
    </form>
  </div>

  <!-- Material form login -->
</template>

<script>
import { validationMixin } from "vuelidate";
import { mdbInput, mdbBtn } from "mdbvue";
import { required, email, helpers, minLength } from "vuelidate/lib/validators";

const alphanumeric = helpers.regex("alphanumeric", /^[a-zA-Z0-9]*$/);

export default {
  mixins: [validationMixin],
  name: "AppLogin",
  data() {
    return {
      success: false,
      email: "",
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
      if (this.$v.error) {
        return;
      }
      console.log("Login has worked");
      this.success = true;
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      alphanumeric,
      minLength: minLength(8)
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