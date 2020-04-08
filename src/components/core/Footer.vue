<template>
  <mdb-footer color="blue">
    <div class="footer-copyright text-center py-3">
      <mdb-container fluid>
        &copy; 2020 HOMEfun
       
      </mdb-container>
    </div>
  </mdb-footer>
</template>

<script>
import { mdbFooter, mdbContainer } from "mdbvue";
export default {
    name:'AppFooter',
    data(){
        return{
        }
    },

    components:{
        mdbFooter,
      mdbContainer,
    }
};
</script>
