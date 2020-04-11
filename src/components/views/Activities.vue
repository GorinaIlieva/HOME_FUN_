<template>

  <div>
   <app-activity-each>
     <template v-slot:sub>
          <mdb-card v-for="sub in subjects" :key="sub._id">
            <mdb-view hover><router-link :to="{ name: 'AppDetails', params: { id: sub._id }}">
              <a>
                <mdb-card-image
                  :src='sub.imgUrl'
                  alt="Card image cap"
                > </mdb-card-image>
                
                <mdb-mask flex-center waves overlay="white-slight"></mdb-mask>
              </a></router-link>
            </mdb-view>
            <mdb-card-body>
              <mdb-card-title>/{{sub.category}}/</mdb-card-title>
              <mdb-card-title> {{sub.name}}</mdb-card-title>
              <mdb-card-text>{{sub.description.substring(0,15)}}</mdb-card-text>
              <mdb-btn color="white"><router-link :to="{ name: 'AppDetails', params: { id: sub._id }}">Read more</router-link></mdb-btn>
             
            </mdb-card-body>
          </mdb-card>
     </template> 
     </app-activity-each>
  </div>
</template>

<script>
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
// import { AppActl } from "../shared/ActivityList";

// import EventBus from "../../utils/eventbus";
import { get } from "../service/requester";
import AppActivityEach from '../shared/ActivityEach'

export default {
  name: "AppActivity",
  data: function() {
    return {
      currentActivityId: 0,
      subjects:Array
      // currentId: 0
    };
  },

  components: {
    AppActivityEach,
    // mdbContainer,
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
    get("appdata", "activities", "GET", "Kinvey").then(data => {
      this.subjects = data.sort((a,b)=>{return a.category.localeCompare(b.category)
      });
      

    });
  },
  // mounted() {
  //   console.log("mounted");
  //   EventBus.$on("viewContentActivityTypeReceiver", function(e) {
  //     console.log("mountedIN");
  //     console.log(`id= ${e}`);
  //     this.currentActivityId = e;
  //   });
  // },
  // watch: {
  //   currentActivityId(newValue) {
  //     if (newValue === null) {
  //       return;
  //     }
  //     console.log(newValue);
  //     this.currentId = newValue;
  //   }
  // },
  // computed: {
  //   subjects() {
  //     console.log(this.resp[this.currentId].list);
  //     return this.resp[this.currentId].list;
      
  //   }
  // }
};
</script>