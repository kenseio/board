<template>
  <v-app>
    <hr />
    <NewComments :color="color" />
    <OldComments :color="color" />
  </v-app>
</template>

<script>
import NewComments from "./NewComments.vue";
import OldComments from "./OldComments.vue";

export default {
  props: ["color"],
  components: {
    NewComments,
    OldComments
  }
};
</script>
