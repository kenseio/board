<template>
  <v-app>
    <v-content>
      <h2>掲示板</h2>
      <h3>掲示板に投稿する</h3>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field label="ニックネーム" single-line v-model="name"></v-text-field>
        </v-col>
      </v-row>
      <!-- <label for="name">ニックネーム</label>
    <v-text-field type="text" id="name" v-model="name"></v-text-field>
    <br />
      <br />-->
      <label for="commennt">コメント</label>
      <textarea id="comment" v-model="comment"></textarea>
      <br />
      <br />
      <button @click="createComment">コメントを投稿する</button>
      <br />
    </v-content>
  </v-app>
</template>

<script>
import db from "../firebase";
import moment from "moment";

function datetimeFormatter(time) {
  return moment(time).format("YYYY/MM/DD H:mm:ss");
}

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
      this.newPost.time = datetimeFormatter(Date.now());
      this.$store.commit("addNewPost", this.newPost);

      //表示を空にする
      this.name = "";
      this.comment = "";
      this.newPost = {};
    }
  }
};
</script>