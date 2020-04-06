<template>
  <div>
    <mdb-container>
      <mdb-row>
        <mdb-card-group deck>
          <mdb-card v-for="sub in subjects" :key="sub._id">
            <mdb-view hover>
              <a href="#!">
                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
              </a>
            </mdb-view>
            <mdb-card-body>
              <mdb-card-title>{{sub.name}}</mdb-card-title>
              <mdb-card-text>{{sub.description.substring(0,15)}}</mdb-card-text>
              <mdb-btn color="primary">Read more</mdb-btn>
            </mdb-card-body>
          </mdb-card>
        </mdb-card-group>
      </mdb-row>
    </mdb-container>
  </div>
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
  mdbBtn,
  mdbView,
  mdbMask
} from "mdbvue";
// import { AppActl } from "../shared/ActivityList";
import { get } from "../service/requester";
import EventBus from "../../utils/eventbus";

const contentReceiver = function(e) {
  this.currentActivityId = e;
  console.log(e);
};

export default {
  name: "AppActivity",
  data: function() {
    return {
      currentActivityId: 0,
      resp: Array,
      subjects:Array
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
    mdbBtn,
    mdbView,
    mdbMask
  },
  created() {
    get("appdata", "activities", "GET", "Kinvey").then(data => {
      this.resp = data;
      this.subjects= this.resp[this.currentActivityId].list
      console.log(this.resp);
    });
  },
  mounted() {
    console.log('mounted')
    EventBus.$on("viewContentActivityTypeReceiver", contentReceiver);
  },

  
};
</script>