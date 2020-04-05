<template>
  <div>
    <h2 v-if="success">Registration was successful!</h2>
    <form v-else @submit.prevent="submitHandler">
      
      <p class="h4 text-center mb-4">Sign up</p>
      <div class="grey-text">
        <mdb-input
          label="Your first and last name"
          icon="user"
          type="text"
          v-model="name"
          @blur="$v.name.$touch"
        />
        <template v-if="$v.name.$error">
          <p class="error" v-if="!$v.name.required">First and Last name are required!</p>
          <p class="error" v-else-if="!$v.name.name">Both of your names are required!</p>
        </template>

        <mdb-input
          label="Your email"
          icon="envelope"
          type="email"
          v-model="email"
          @blur="$v.email.$touch"
        />
        <template v-if="$v.email.$error">
          <p class="error" v-if="!$v.email.required">Email is required!</p>
          <p class="error" v-else-if="!$v.email.email">Email is invalid!</p>
        </template>

        <mdb-input
          label="Confirm your email"
          icon="exclamation-triangle"
          type="text"
          v-model="confirmEmail"
          @blur="$v.confirmEmail.$touch"
        />
        <template v-if="$v.confirmEmail.$error">
          <p class="error" v-if="!$v.confirmEmail.sameAs">Emails do not match</p>
        </template>

        <mdb-input
          label="Your password"
          icon="lock"
          type="password"
          v-model="password"
          @blur="$v.password.$touch"
        />
        <template v-if="$v.password.$error">
          <p class="error" v-if="!$v.password.required">Password is required!</p>
          <p class="error" v-else-if="!$v.password.alphanumeric">Password is invalid!</p>
           <p class="error" v-else-if="!$v.password.minLength">Password has to be more than 8 symbols!</p>
        </template>

        <mdb-input
          label="Confirm your password"
          icon="exclamation-triangle"
          type="text"
          v-model="confirmPassword"
          @blur="$v.confirmPassword.$touch"
        />
        <template v-if="$v.confirmPassword.$error">
          <p class="error" v-if="!$v.confirmPassword.sameAs">Passwords do not match</p>
        </template>
      </div>
      <div class="text-center">
        <mdb-btn :disabled="$v.$invalid" type='submit' color="primary">Register</mdb-btn>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { mdbInput, mdbBtn } from "mdbvue";
import {
  required,
  email,
  minLength,
  sameAs,
  helpers
} from "vuelidate/lib/validators";
import {setUserData} from '../auth/authentication';
import {post} from '../service/requester'

function name(value) {
  const valueArray = value.trim().split(" ");

  if (valueArray.length > 2) {
    return false;
  }

  return (
    !!valueArray[0] &&
    /[A-Z]/g.test(valueArray[0][0]) &&
    !!valueArray[1] &&
    /[A-Z]/g.test(valueArray[1][0])
  );
}

const alphanumeric = helpers.regex("alphanumeric", /^[a-zA-Z0-9]*$/);

export default {
  mixins: [validationMixin],

  name: "AppRegister",
  data() {
    return {
      success: false,
      name: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: ""
    };
  },
  validations: {
    name: {
      required,
      name
    },
    email: {
      required,
      email
    },
    confirmEmail: {
      sameAs: sameAs("email")
    },
    password: {
      required,
      alphanumeric,
      minLength: minLength(8)
    },
    confirmPassword: {
      sameAs: sameAs("password")
    }
  },
  components: {
    
    mdbInput,
    mdbBtn
  },
  methods: {
    setUserData,
    submitHandler() {
    this.$v.$touch();
     post('user', '', 'POST', {username: this.name, password: this.password}, 'Basic')
     .then(data=>{
       setUserData(data)
       this.$router.push({name:'AppLogin'})
       console.log(localStorage.getItem('username'))
     })
     .catch(($error)=>{console.log($error)})
      
      if (this.$v.$error) {
        return;
      }
      console.log("You submitted the form successfully!");
      this.success = true;
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


