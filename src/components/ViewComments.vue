<template>
  <v-app>
    <hr />
    <NewComments :color="color" :timeout="timeout" />
    <OldComments :color="color" :timeout="timeout" />
  </v-app>
</template>

<script>
import NewComments from "./NewComments.vue";
import OldComments from "./OldComments.vue";

export default {
  props: ["color", "timeout"],
  components: {
    NewComments,
    OldComments
  }
};
</script>
