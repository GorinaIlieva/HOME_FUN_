<template>
  <form @submit.prevent="editActivityType">
    <template v-if="subject">
      <mdb-input
        type="text"
        :label="subject.category"
        v-model="category"
        outline
        @blur="$v.category.$touch"
      />
      <template v-if="$v.category.$error">
        <p class="error" v-if="!$v.category.required">Title is required!</p>
        <p class="error" v-if="!$v.category.name">Title has to start with a capital letter!</p>
      </template>

      <mdb-input type="text" :label="subject.name" v-model="name" outline @blur="$v.name.$touch" />

      <template v-if="$v.name.$error">
        <p class="error" v-if="!$v.name.required">Title is required!</p>
        <p class="error" v-if="!$v.name.name">Title has to start with a capital letter!</p>
      </template>

      <mdb-input
        type="text"
        :label="subject.imgUrl"
        v-model="imgUrl"
        outline
        @blur="$v.imgUrl.$touch"
      />

      <template v-if="$v.imgUrl.$error">
        <p class="error" v-if="!$v.imgUrl.required">Title is required!</p>
        <p
          class="error"
          v-if="!$v.imgUrl.imgUrl"
        >Title has to start with https and end up with png or jpg!</p>
      </template>

      <mdb-input
        type="textarea"
        :label="subject.description"
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
import { put, get } from "../service/requester";
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
      subject: Array,
      
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
    }
  },

  methods: {
    editActivityType() {
      
      if (this.$v.category.$dirty) {
        this.category = this.$data.category;
      } else {
        this.category = this.subject.category;
      }

      if (this.$v.name.$dirty) {
        this.name = this.$data.name;
      } else {
        this.name = this.subject.name;
      }
      if (this.$v.imgUrl.$dirty) {
        this.imgUrl = this.$data.imgUrl;
      } else {
        this.imgUrl = this.subject.imgUrl;
      }
      if (this.$v.description.$dirty) {
        this.description = this.$data.description;
      } else {
        this.description = this.subject.description;
      }

      put(
        "appdata",
        `activities/${this.id}`,
        "PUT",
        {
          category: this.category,
          name: this.name,
          imgUrl: this.imgUrl,
          description: this.description
        },
        "Kinvey"
      )
        .then(() => {
          toastSuccess("You have successfully edited this activity!");
          this.$router.push("/activities");
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    get("appdata", `activities/${this.id}`, "GET", "Kinvey").then(data => {
      this.subject = data;
      console.log(data);
    });
  }
};
</script>

