<template>
  <v-app>
    <hr />
    <NewComments />
    <OldComments />
  </v-app>
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
