<template>
  <v-container>
    <hr />
    <NewComments />
    <OldComments />
  </v-container>
</template>

<script>
import NewComments from "./NewComments.vue";
import OldComments from "./OldComments.vue";

export default {
  components: {
    NewComments,
    OldComments
  }
};
</script>
