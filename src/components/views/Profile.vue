<template>
  <div class="profile col-md-6 text-center col-lg">
    <img class="profile-img" src="../../../public/images/user.png" />
    <div class="profile-info">
      <p>
        Username:
        <big>{{username}}</big>
      </p>
      <p class="infoType">You created {{mySubjects.length}} activitie/s =)</p>
      <template v-if="mySubjects.length>0">
        <div>
          <app-activity-each>
            <template v-slot:sub>
              <mdb-card v-for="sub in mySubjects" :key="sub._id">
                <mdb-view hover>
                  <router-link :to="{ name: 'AppDetails', params: { id: sub._id }}">
                    <a>
                      <mdb-card-image :src="sub.imgUrl" alt="Card image cap"></mdb-card-image>

                      <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
                    </a>
                  </router-link>
                </mdb-view>
                <mdb-card-body>
                  <mdb-card-title>/{{sub.category}}/</mdb-card-title>
                  <mdb-card-title>{{sub.name}}</mdb-card-title>
                  <mdb-card-text>{{sub.description.substring(0,15)}}</mdb-card-text>
                  <mdb-btn color="white">
                    <router-link :to="{ name: 'AppDetails', params: { id: sub._id }}">Read more</router-link>
                  </mdb-btn>
                </mdb-card-body>
              </mdb-card>
            </template>
          </app-activity-each>
        </div>
      </template>
      <template v-else>
        <p>
          <strong>No activities created yet!</strong>
        </p>
      </template>
    </div>
  </div>
</template>

<script>
import { get } from "../service/requester";
import AppActivityEach from "../shared/ActivityEach";

import {
  // mdbContainer,
  // mdbRow,
  // mdbCardGroup,
  mdbCard,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbCardImage,
  // mdbBtn,
  mdbView,
  mdbMask
} from "mdbvue";

export default {
  name: "AppProfile",
  data() {
    return {
      username: localStorage.getItem("username"),
      creator: localStorage.getItem("creator"),
      userId: localStorage.getItem("userId"),
      mySubjects: Array
    };
  },
  components: {
    AppActivityEach,
    //   mdbContainer,
    // mdbRow,
    // mdbCardGroup,
    mdbCardImage,
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    // mdbBtn,
    mdbView,
    mdbMask
  },
  created() {
    get(
      "appdata",
      `activities?query={"_acl.creator":"${localStorage.getItem("creator")}"}`,
      "GET",
      "Kinvey"
    ).then(data => {
      this.mySubjects = data;
    });
  }
};
</script>