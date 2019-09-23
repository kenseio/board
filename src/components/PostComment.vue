<template>
  <div>
    <h2>掲示板</h2>
    <h3>掲示板に投稿する</h3>
    <label for="name">ニックネーム</label>
    <input type="text" id="name" v-model="name" />
    <br />
    <br />
    <label for="commennt">コメント</label>
    <textarea id="comment" v-model="comment"></textarea>
    <br />
    <br />
    <button @click="createComment">コメントを投稿する</button>
    <br />
  </div>
</template>

<script>
import db from "../firebase";
// import axios from "../axios-common";
export default {
  data() {
    return {
      name: "",
      comment: "",
      newPost: {}
    };
  },
  methods: {
    createComment() {
      db.collection("comments").add({
        name: this.name,
        comment: this.comment
      });

      //VuexのStateに追加する
      this.newPost.name = this.name;
      this.newPost.comment = this.comment;
      this.newPost.time = Date.now();
      console.log(this.newPost);
      this.$store.commit("addNewPost", this.newPost);

      //表示を空にする
      this.name = "";
      this.comment = "";
      this.newPost = {};
    }
  }
};
</script>