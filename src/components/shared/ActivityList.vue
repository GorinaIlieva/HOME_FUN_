<template>
  <div>
    
        <slot name="sub"> </slot>
     
  </div>
</template>

<script>
import {mdbContainer, mdbRow, mdbCardGroup,} from 'mdbvue'
export default {
    name:'AppActl',
    data(){
        return {
        }
    },
    components:{
        mdbContainer,
       mdbRow,
        mdbCardGroup,
			// mdbCol,
			// mdbCard,
			// mdbCardImage,
			// mdbCardHeader,
			// mdbCardBody,
			// mdbCardTitle,
			// mdbCardText,
			// mdbCardFooter,
			// mdbCardUp,
			// mdbCardAvatar,
		
			// mdbBtn,
			// mdbView,
			// mdbMask,
			// mdbIcon
    }
}
</script>