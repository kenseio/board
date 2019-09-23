<template>
  <div id="app">
    <PostComment></PostComment>
    <ViewComments></ViewComments>
  </div>
</template>

//TODO: ポストしたあとに表示し直す
//TODO: 削除機能を追加
//TODO: ページネーションを追加
//TODO: bootstrapできれいにする。
//TODO: 入力チェックする

<script>
import PostComment from "./components/PostComment.vue";
import ViewComments from "./components/ViewComments.vue";

export default {
  components: {
    PostComment,
    ViewComments
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
