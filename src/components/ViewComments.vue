<template>
  <div>
    <br />
    <hr />
    <div v-if="show">
      <div v-for="newPost in newPosts" :key="newPost.time">
        <div>名前 ：{{newPost.name}}</div>
        <div>コメント：{{newPost.comment}}</div>
        <div>投稿日時：{{newPost.time}}</div>
        <div>new!</div>
        <br />
      </div>
    </div>
    <div v-for="(post, index) in posts" :key="post.id">
      <div>名前 ：{{post.name}}</div>
      <div>コメント：{{post.comment}}</div>
      <div>投稿日時：{{post.time}}</div>
      <button @click="deleteComment(index)">削除</button>
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import moment from "moment";
import db from "../firebase";

function datetimeFormatter(time) {
  return moment(time).format("YYYY/MM/DD H:mm:ss");
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