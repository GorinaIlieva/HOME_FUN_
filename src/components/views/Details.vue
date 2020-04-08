<template>
  <mdb-container>
    <mdb-row>
      <mdb-card-group deck>
        <mdb-card>
          <mdb-view hover v-if='subject.imgUrl'>
            <mdb-card-image :src="subject.imgUrl" alt="Card image cap"></mdb-card-image>
            <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
          </mdb-view>
          <mdb-card-body>
            <mdb-card-title>{{subject.name}}</mdb-card-title>
            <mdb-card-text>{{subject.description}}</mdb-card-text>
            <template v-if="creator===userId">
              <mdb-btn color="primary" @click="delSubject">Delete</mdb-btn>
              <template v-if="subject">
                <mdb-btn>
                  <router-link
                    :to="{ name: 'AppEdit', params: {id: subject._id}}"
                    color="primary"
                  >Edit</router-link>
                </mdb-btn>
              </template>
            </template>
            <mdb-btn color="primary">Back</mdb-btn>
          </mdb-card-body>
        </mdb-card>
      </mdb-card-group>
    </mdb-row>
  </mdb-container>
</template>

<script>
import {
  mdbContainer,
  mdbRow,
  mdbCardGroup,
  mdbCard,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbCardImage,
  mdbBtn,
  mdbView,
  mdbMask
} from "mdbvue";
import { get, del } from "../service/requester";
import { toastSuccess } from "../../utils/toasted";

export default {
  name: "AppDetails",
  data: function() {
    return {
      id: this.$route.params.id,
      subject: {
        default: () => Object
      },
      creator: localStorage.getItem("creator"),
      userId: localStorage.getItem("userId")
    };
  },
  components: {
    mdbContainer,
    mdbRow,
    mdbCardGroup,
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbCardImage,
    mdbBtn,
    mdbView,
    mdbMask
  },
  created() {
    get("appdata", `activities/${this.id}`, "GET", "Kinvey").then(data => {
      this.subject = data;
    });
  },
  methods: {
    delSubject() {
      del("appdata", `activities/${this.id}`, "DELETE", "Kinvey")
        .then(() => {
          toastSuccess("You have successfully deleted this activity!");
          this.$router.push("/activities");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>