<template>
  <v-container>
    <h2 style="margin-top: 20px; text-align: center;">掲示板</h2>
    <v-row justify="center" class="mx-auto">
      <v-col cols="12" md="4" sm="6" class="mx-auto">
        <v-text-field
          clearable
          label="ニックネーム"
          single-line
          solo
          :color="color"
          prepend-inner-icon="mdi-account"
          v-model="name"
        ></v-text-field>
        <v-textarea
          clearable
          label="コメント"
          solo
          :color="color"
          prepend-inner-icon="mdi-comment"
          v-model="comment"
        ></v-textarea>

        <v-btn :loading="loading" :disabled="isDisabled" @click="createComment">コメントを投稿する</v-btn>
        <v-btn text class="right grey--text" @click="reload()">
          <span>RELOAD</span>
          <v-icon right>mdi-reload</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <br />

    <v-snackbar v-model="snackbar" bottom right timeout="6000" :color="color">
      <span>コメントを投稿しました。</span>
      <v-btn dark text @click="snackbar = false">CLOSE</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import db from "../firebase";
import moment from "moment";

function datetimeFormatter(time) {
  return moment(time).format("YYYY/MM/DD HH:mm:ss");
}

export default {
  props: ["color"],
  data() {
    return {
      name: "",
      comment: "",
      newPost: {},
      loading: false,
      snackbar: false
      // rules: {
      //   required: value => !!value || "Required."
      // }
    };
  },
  computed: {
    isDisabled() {
      if (this.name && this.comment) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    reload() {
      location.reload();
    },
    createComment() {
      //ボタン表示を読込中に
      this.loading = true;
      // firestoreに書き込み
      db.collection("comments")
        .add({
          name: this.name,
          comment: this.comment
        })
        .then(DocumentReference => {
          //VuexのStateに追加する
          this.newPost.documentId = DocumentReference.id;
          this.newPost.name = this.name;
          this.newPost.comment = this.comment;
          this.newPost.time = datetimeFormatter(Date.now());
          this.$store.dispatch("addNewPost", this.newPost);
          this.$store.dispatch("sortNewPosts");
          //表示を空にする
          this.name = "";
          this.comment = "";
          this.newPost = {};
          this.loading = false;
          //snackbarを表示する
          this.snackbar = true;
        });
    }
  }
};
</script>

<style scoped>
.right {
  float: right;
  margin-right: 5px;
}
</style>