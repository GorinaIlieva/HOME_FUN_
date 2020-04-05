<template>
  <app-content>
    <template v-slot:nav>
      <ul>
        <li
          v-for="(curr,i) in adoptedCategoryList"
          :key="i"
          :class="{ active :selectedIndex===i }"
          @click="selectIndex(i)"
        >
          <a>{{curr.name}}</a>
        </li>
      </ul>
    </template>
    <!-- <template v-slot:nav>
      <ul>
        <li
          v-for="(curr,i) in currentItemList"
          :key="i"
          :class="{ active :selectedIndex===i }"
          @click="selectIndex(i)"
        >
          <a>{{curr.name}}</a>
        </li>
      </ul>
    </template>-->

    <template v-slot:info>
      <form @submit.prevent="addHandler"></form>
      <mdb-input type="text" label="Title" outline v-model="name" @blur="$v.name.$touch" />

      <template v-if="$v.name.$error">
        <p class="error" v-if="!$v.name.required">Title is required!</p>
        <p class="error" v-if="!$v.name.name">Title has to start with a capital letter!</p>
      </template>

      <section class="preview">
        <select
          class="browser-default custom-select"
          @change="selectCategory($event)"
          v-model="id"
          @blur="$v.id.$touch"
        >
          <option class="browser-default" selected :value="null">Select a category...</option>
          <option v-for="item in navItems" :key="item.id" :value="item.id">{{item.name}}</option>
        </select>
      </section>
      <template v-if="$v.id.$error">
        <p class="error" v-if="!$v.id.required">You have to select a category!</p>
      </template>
   
    <mdb-input
        type="textarea"
        label="Description - has to be at least 20 symbols"
        outline
        :rows="3"
        v-model="description"
        @blur="$v.description.$touch"
      />

      <template v-if="$v.description.$error">
        <p class="error" v-if="!$v.description.required">Description is required!</p>
        <p class="error" v-if="!$v.description.minLength">Description has to be at least 20 symbols!</p>
      </template>

      <mdb-btn :disabled="$v.$invalid" color="primary">
        <mdb-icon icon="magic" class="mr-1" />ADD
      </mdb-btn>
    </template>
  </app-content>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, helpers } from "vuelidate/lib/validators";

import AppContent from "../shared/Content";
import { mdbInput, mdbBtn, mdbIcon } from "mdbvue";

const name = helpers.regex("name", /^[A-Z].*$/);

export default {
  mixins: [validationMixin],

  name: "AppCreate",
  components: {
    AppContent,
    mdbInput,
    mdbBtn,
    mdbIcon
  },
  data() {
    return {
      selectedIndex: 0,
      name: "",
      id: null,
      description: ""
    };
  },
  props: {
    adoptedCategoryList: Array,
    // currentItemList: Array,
    navItems: Array
  },
  methods: {
    selectIndex(i) {
      this.selectedIndex = i;
    },
    selectCategory(e) {
      this.$emit("selectCategoryReceiver", e.target.value);
    },
    // POSTTing in Kinvey
    addHandler() {
      this.$v.$touch();
      if (this.$v.$error) {
        return;
      }
      console.log("You submitted the form successfully!");

      const { id, name, description } = this.$data;
      this.$emit("addHandlerReceiver", { id, name, description });
    }
  },
  validations: {
    name: {
      required,
      name
    },
    description: {
      required,
      minLength: minLength(20)
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