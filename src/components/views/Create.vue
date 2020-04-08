<template>
  <form @submit.prevent="addActivityType">
    <mdb-input type="text" label="Category" outline v-model="category" @blur="$v.category.$touch" />

    <template v-if="$v.category.$error">
      <p class="error" v-if="!$v.category.required">Title is required!</p>
      <p class="error" v-if="!$v.category.name">Title has to start with a capital letter!</p>
    </template>

    <mdb-input type="text" label="Title" outline v-model="name" @blur="$v.name.$touch" />

    <template v-if="$v.name.$error">
      <p class="error" v-if="!$v.name.required">Title is required!</p>
      <p class="error" v-if="!$v.name.name">Title has to start with a capital letter!</p>
    </template>

    <mdb-input type="text" label="ImageUrl" outline v-model="imgUrl" @blur="$v.imgUrl.$touch" />

    <template v-if="$v.imgUrl.$error">
      <p class="error" v-if="!$v.imgUrl.required">Title is required!</p>
      <p
        class="error"
        v-if="!$v.imgUrl.imgUrl"
      >Title has to start with https and end up with png or jpg!</p>
    </template>

    <!-- <section class="preview">
      <select
        class="browser-default custom-select"
        @change="selectCategory($event)"
        v-model="id"
        @blur="$v.id.$touch"
      >
        <option class="browser-default" selected :value="null">Select a category...</option>
        <option v-for="item in navItems" :key="item.id" :value="item._id">{{item.name}}{{item._id}}</option>
      </select>
    </section>
    <template v-if="$v.id.$error">
      <p class="error" v-if="!$v.id.required">You have to select a category!</p>
    </template>-->

    <mdb-input
      type="textarea"
      label="Description - has to be at least 50 symbols"
      outline
      :rows="3"
      v-model="description"
      @blur="$v.description.$touch"
    />

    <template v-if="$v.description.$error">
      <p class="error" v-if="!$v.description.required">Description is required!</p>
      <p class="error" v-if="!$v.description.minLength">Description has to be at least 50 symbols!</p>
    </template>
      <mdb-btn :disabled="!$v.$invalid" color="primary" type="submit">
      <mdb-icon icon="magic" class="mr-1" />ADD
    </mdb-btn>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, helpers } from "vuelidate/lib/validators";

import { mdbInput, mdbBtn, mdbIcon } from "mdbvue";
import { toastSuccess } from "../../utils/toasted";
import { post, get } from "../service/requester";

const name = helpers.regex("name", /^[A-Z].*$/);
const imgUrl = helpers.regex("imgUrl", /^https?:\/\/.*\.(?:png|jpg)$/);

export default {
  mixins: [validationMixin],

  name: "AppCreate",
  components: {
    mdbInput,
    mdbBtn,
    mdbIcon
  },
  data() {
    return {
      selectedIndex: 0,
      name: "",
      id: null,
      description: "",
      category: "",
      imgUrl: "",
      navItems: Array
    };
  },
  created() {
    get("appdata", "activities", "GET", "Kinvey").then(data => {
      this.navItems = data;
      
    });
  },

  // adoptedCategoryList: Array,
  // currentItemList: Array,

  methods: {
    selectIndex(i) {
      this.selectedIndex = i;
    },
    selectCategory(e) {
      this.$emit("selectCategoryReceiver", e.target.value);
    },
    addActivityType() {
      this.$v.$touch();
      // const { id, name, description } = this.$data;

      const { category, name, imgUrl, description } = this.$data;
      
    
      post(
        "appdata",
        'activities',
        "POST",
        { category, name, imgUrl, description },
        "Kinvey"
      )
        .then(() => {
          toastSuccess("You have created an activity!");
          // this.$router.push({ name: "AppActivity" });
          this.$router.push('/activities')
        })
        .catch(error => console.log(error));

      // post(
      //   "appdata",
      //   `activities/${id}`,
      //   "POST",
      //   { name, description },
      //   "Kinvey"
      // )
      //   .then(() => {
      //     toastSuccess("You have created an activity");
      //     // this.$router.push({ name: "AppActivity" });
      //   })
      //   .catch(error => console.log(error));

      // this.$emit("addHandlerReceiver", { id, name, description });
    }
  },
  validations: {
    category: {
      required,
      name
    },
    name: {
      required,
      name
    },
    imgUrl: {
      required,
      imgUrl
    },
    description: {
      required,
      minLength: minLength(50)
    },
    id: {
      required
    }
  }
};
</script>

<style>
section.preview {
  border: 1px solid #e0e0e0;
  padding: 15px;
}

p.error {
  text-align: left;
  background-color: #f8d7da;
  padding: 8px;
  border-radius: 3px;
}
</style>