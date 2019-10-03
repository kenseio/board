<template>
  <v-container>
    <v-row>
      <!-- <transition-group appear name="fade"> -->
      <!-- <v-slide-x-transition group> -->
      <v-col cols="12" sm="4" v-for="(post, index) in posts" :key="post.documentId">
        <v-card max-width="344" class="pa-2 ma-2">
          <v-card-title class="subtitle-1">{{post.comment}}</v-card-title>
          <v-card-text class="body-2">{{post.name}}</v-card-text>
          <v-card-text class="caption">{{post.time}}</v-card-text>

          <v-btn text small class="grey--text" @click="onClickBtn(index)">
            <span>DELETE</span>
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </v-card>
      </v-col>
      <v-dialog v-model="dialog" persistent max-width="220">
        <v-card>
          <v-card-text class="subtitle-1 pa-5">コメントを削除します。よろしいですか？</v-card-text>
          <v-card-actions>
            <v-btn text class="grey--text" @click="dialog=false">NO</v-btn>
            <v-btn text class="grey--text" @click="deleteOldComment(currentIndex)">YES</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- </v-slide-x-transition> -->
      <!-- </transition-group> -->
    </v-row>
  </v-container>
</template>


<script>
import _ from "lodash";
import moment from "moment";
import db from "../firebase";

function datetimeFormatter(time) {
  return moment(time).format("YYYY/MM/DD HH:mm:ss");
}

function deleteComment(targetId) {
  // コメント削除する共通部品
  db.collection("comments")
    .doc(targetId)
    .delete();
}

export default {
  data() {
    return {
      posts: [],
      dialog: false,
      currentIndex: null
    };
  },

  computed: {
    newPosts() {
      return _.orderBy(this.$store.getters.newPosts, "time", "desc");
    }
  },

  created() {
    db.collection("comments")
      .get()
      .then(querySnapshot => {
        for (let document of querySnapshot.docs) {
          let tmp = {};
          tmp.key = document._document.proto.name;
          tmp.name = document._document.proto.fields.name.stringValue;
          tmp.comment = document._document.proto.fields.comment.stringValue;
          let time = document._document.proto.updateTime;
          tmp.time = datetimeFormatter(time);
          tmp.docmentId = document.id;
          this.posts.push(tmp);
        }
        this.posts = _.orderBy(this.posts, "time", "desc");
      });
  },
  methods: {
    // 削除ボタンをクリックしたときに、インデックスをダイアログにわたさないと削除がうまく機能しない
    onClickBtn(index) {
      this.currentIndex = index;
      this.dialog = true;
    },

    // 既存コメントを削除するメソッド
    deleteOldComment(index) {
      //indexからidを特定
      let targetId = this.posts[index].docmentId;
      //idをしていして更新リクエスト
      deleteComment(targetId);
      //posts配列から削除
      this.posts.splice(index, 1);
      this.dialog = false;
      this.currentIndex = null;
    }
  }
};
</script>