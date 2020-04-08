<template>
  <div>
    <mdb-container>
      <mdb-row>
        <mdb-card-group deck v-if="$slots.sub">
          <slot name="sub"></slot>
        </mdb-card-group>
      </mdb-row>
    </mdb-container>
  </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCardGroup } from "mdbvue";
export default {
  name: "AppActivityEach",
  data() {
    return {};
  },
  components: {
    mdbContainer,
    mdbRow,
    mdbCardGroup
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
};
</script>