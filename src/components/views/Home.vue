<template>
  <app-content>
    <template v-slot:nav>
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
    </template>

    <template v-if="currentItemList" v-slot:info>{{viewDesc}}</template>

   </app-content>
</template>

<script>
import AppContent from "../shared/Content";
export default {
  name: "AppHome",
  components: {
    AppContent
  },
  data() {
    return {
      selectedIndex: 0
    };
  },
  props: {
    currentItemList: Array
  },
  methods: {
    selectIndex(i) {
      
      this.selectedIndex = i;
    }
  },
  computed:{
    viewDesc(){
     
       return  this.currentItemList[this.selectedIndex].description
    
     
    }
  }
};
</script>

