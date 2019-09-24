<template>
  <v-container>
    <hr />

    <v-row v-if="show">
      <v-col cols="12" sm="4" v-for="newPost in newPosts" :key="newPost.time">
        <v-card max-width="300" class="pa-2 ma-2">
          <v-card-title class="subtitle-1">{{newPost.comment}}</v-card-title>
          <v-card-text class="body-2">{{newPost.name}}</v-card-text>
          <v-card-text class="caption">{{newPost.time}}</v-card-text>
          <span>
            <v-icon>mdi-new-box</v-icon>
          </span>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <!-- <transition-group appear name="fade"> -->
      <!-- <v-slide-x-transition group> -->
      <v-col v-for="(post, index) in posts" :key="post.key" cols="12" sm="=4">
        <v-card max-width="344" class="pa-2 ma-2">
          <v-card-title class="subtitle-1">{{post.comment}}</v-card-title>
          <v-card-text class="body-2">{{post.name}}</v-card-text>
          <v-card-text class="caption">{{post.time}}</v-card-text>
          <v-card-actions>
            <v-btn icon @click="deleteComment(index)">
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
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

export default {
  data() {
    return {
      posts: [],
      exist: true
    };
  },

  computed: {
    newPosts() {
      return _.orderBy(this.$store.getters.newPosts, "time", "desc");
    },
    show() {
      //   if (Object.keys(this.$store.getters.newPost).length > 0) {
      if (this.$store.getters.newPosts.length > 0) {
        return true;
      } else {
        return false;
      }
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
    deleteComment(index) {
      //indexからidを特定
      let targetId = this.posts[index].docmentId;
      //idをしていして更新リクエスト
      db.collection("comments")
        .doc(targetId)
        .delete();
      //posts配列から削除
      this.posts.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>