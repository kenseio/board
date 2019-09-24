<template>
  <v-container>
    <h2 style="margin-top: 20px; text-align: center;">掲示板</h2>
    <br />
    <v-row justify="center" class="mx-auto">
      <v-col cols="12" md="4" sm="6" class="mx-auto">
        <v-text-field
          clearable
          label="ニックネーム"
          v-model="name"
          single-line
          solo
          :rules="[rules.required]"
        ></v-text-field>
        <v-textarea clearable label="コメント" v-model="comment" solo :rules="[rules.required]"></v-textarea>

        <v-btn :disabled="isDisabled" @click="createComment">コメントを投稿する</v-btn>
        <v-btn class="right" icon @click="reload()">
          <v-icon>mdi-reload</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <br />
  </v-container>
</template>

<script>
import db from "../firebase";
import moment from "moment";

function datetimeFormatter(time) {
  return moment(time).format("YYYY/MM/DD HH:mm:ss");
}

export default {
  data() {
    return {
      name: "",
      comment: "",
      newPost: {},
      rules: {
        required: value => !!value || "Required."
      }
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

<style scoped>
.right {
  float: right;
  margin-right: 5px;
}
</style>