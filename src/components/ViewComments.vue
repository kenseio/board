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
import db from "../firebase";

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
        console.log(querySnapshot);
        for (let document of querySnapshot.docs) {
          let tmp = {};
          tmp.key = document._document.proto.name;
          tmp.name = document._document.proto.fields.name.stringValue;
          tmp.comment = document._document.proto.fields.comment.stringValue;
          tmp.time = document._document.proto.updateTime; //TODO:日時表示をいい感じにする
          tmp.docmentId = document.id;
          this.posts.push(tmp);
        }
        this.posts = _.orderBy(this.posts, "time", "desc");
        console.log(this.posts);
      });
  },
  methods: {
    deleteComment(index) {
      //indexからidを特定
      let targetId = this.posts[index].docmentId;
      console.log(targetId);
      //idをしていして更新リクエスト
      db.collection("comments")
        .doc(targetId)
        .delete()
        .then(response => {
          console.log(response);
        });
      //posts配列から削除
      this.posts.splice(index, 1);
    }
  }
};
</script>