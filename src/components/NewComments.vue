<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="4"
        xl="3"
        v-for="(newPost, index) in newPosts"
        :key="newPost.documentId"
      >
        <v-card class="ma-2 pa-2">
          <v-card-title class="subtitle-1">{{newPost.comment}}</v-card-title>
          <v-card-text class="body-2">{{newPost.name}}</v-card-text>
          <v-card-text class="caption">
            {{newPost.time}}
            <span>
              <v-icon>mdi-new-box</v-icon>
            </span>
          </v-card-text>
          <v-btn text small class="grey--text" @click="onClickBtn(index)">
            <span>DELETE</span>
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="220">
      <v-card>
        <v-card-text class="subtitle-1 pa-5">コメントを削除します。よろしいですか？</v-card-text>
        <v-card-actions>
          <v-btn text class="grey--text" @click="dialog=false">NO</v-btn>
          <v-btn text class="grey--text" @click="deleteNewComment(currentIndex)">YES</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" bottom right :timeout="timeout" :color="color">
      コメントを削除しました。
      <v-btn dark text @click="snackbar = false">CLOSE</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import db from "../firebase";
import _ from "lodash";

function deleteComment(targetId) {
  // コメント削除する共通部品
  db.collection("comments")
    .doc(targetId)
    .delete();
}

export default {
  props: ["color", "timeout"],
  data() {
    return {
      dialog: false,
      snackbar: false,
      currentIndex: 0
    };
  },

  computed: {
    newPosts() {
      //並び替え。vuexでも並び替えてるので、本当はvuexから持ってきたいけど、同じソートでindexをあわせる。
      return _.orderBy(this.$store.getters.newPosts, "time", "desc");
    },
    show() {
      if (this.$store.getters.newPosts.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  },

  methods: {
    // 削除ボタンをクリックしたときに、インデックスをダイアログにわたさないと、削除がうまく機能しない
    onClickBtn(index) {
      this.currentIndex = index;
      this.dialog = true;
    },
    // 新規コメントを削除するメソッド
    deleteNewComment(index) {
      let targetId = this.$store.getters.newPosts[index].documentId;
      deleteComment(targetId);
      // vuexのデータを消す
      this.$store.dispatch("deleteNewPost", targetId);
      this.dialog = false;
      this.currentIndex = 0;
      // snackbarを表示
      this.snackbar = true;
    }
  }
};
</script>