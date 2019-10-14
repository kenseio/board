<template>
  <v-app>
    <div id="app">
      <PostComment :color="color" :timeout="timeout" />
      <ViewComments :color="color" :timeout="timeout" />
    </div>
  </v-app>
</template>

//TODO: ページネーションを追加
//TODO: CSSアニメーションで動きをつける 追加したときにぬるっと下に動く、削除したときにぬるっと上に動く

<script>
import PostComment from "./components/PostComment.vue";
import ViewComments from "./components/ViewComments.vue";

export default {
  name: "App",
  components: {
    PostComment,
    ViewComments
  },
  data() {
    return {
      color: "blue-grey darken-2",
      timeout: 6000
    };
  }
};
</script>

