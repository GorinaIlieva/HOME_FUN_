<template>
  <form @submit.prevent="editActivityType">
    <template v-if="subject">
      <mdb-input
        type="text"
        label="Category"
        v-model="category"
        outline
        @blur="$v.category.$touch"
      />
      <template v-if="$v.category.$error">
        <p class="error" v-if="!$v.category.required">Title is required!</p>
        <p class="error" v-if="!$v.category.name">Title has to start with a capital letter!</p>
      </template>

      <mdb-input type="text" label="Title" v-model="name" outline @blur="$v.name.$touch" />

      <template v-if="$v.name.$error">
        <p class="error" v-if="!$v.name.required">Title is required!</p>
        <p class="error" v-if="!$v.name.name">Title has to start with a capital letter!</p>
      </template>

      <mdb-input type="text" label="ImageUrl" v-model="imgUrl" outline @blur="$v.imgUrl.$touch" />

      <template v-if="$v.imgUrl.$error">
        <p class="error" v-if="!$v.imgUrl.required">Title is required!</p>
        <p
          class="error"
          v-if="!$v.imgUrl.imgUrl"
        >Title has to start with https and end up with png or jpg!</p>
      </template>

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

      <mdb-btn color="primary" type="submit">
        <mdb-icon icon="magic" class="mr-1" />EDIT
      </mdb-btn>
    </template>
  </form>
</template>

    <script>
import { validationMixin } from "vuelidate";
import { required, minLength, helpers } from "vuelidate/lib/validators";
import { put } from "../service/requester";
import { toastSuccess } from "../../utils/toasted";
import { mdbInput, mdbBtn, mdbIcon } from "mdbvue";

const name = helpers.regex("name", /^[A-Z].*$/);
const imgUrl = helpers.regex("imgUrl", /^https?:\/\/.*\.(?:png|jpg)$/);

export default {
  mixins: [validationMixin],

  name: "AppEdit",
  data() {
    return {
      category: "",
      name: "",
      imgUrl: "",
      description: "",
      id: this.$route.params.id,
      subject: Array
    };
  },
  components: {
    mdbInput,
    mdbBtn,
    mdbIcon
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
    }},

 methods: {
    changeCategory(e) {
      this.category = e;
    },

    editActivityType() {
      const { category, name, imgUrl, description } = this.$data;
      console.log(this.$data);
      put(
        "appdata",
        `activities/${this.id}`,
        "PUT",
        { category, name, imgUrl, description },
        "Kinvey"
      ).then(() => {
        toastSuccess("You have successfully edited this activity!");
        this.$router.push("/activities");
      })
      .catch(error=>{console.log(error)});
    }
  }
   }

</script>

