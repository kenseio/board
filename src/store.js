import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newPosts: []
  },
  getters: {
    newPosts: state => state.newPosts
  },

  mutations: {
    addNewPost(state, newPost) {
      state.newPosts.push(newPost);
    },
    sortNewPosts(state) {
      state.newPosts = _.orderBy(state.newPosts, "time", "desc");
    },
    deleteNewPost(state, documentId) {
      // 引数のdocumentIdから、newPosts配列内の該当の要素Indexを取得して、配列から削除
      let targetIndex = state.newPosts.findIndex(
        v => v.documentId === documentId
      );
      state.newPosts.splice(targetIndex, 1);
    }
  },
  actions: {
    addNewPost(context, newPost) {
      context.commit("addNewPost", newPost);
    },
    sortNewPosts(context) {
      context.commit("sortNewPosts");
    },
    deleteNewPost(context, documentId) {
      context.commit("deleteNewPost", documentId);
    }
  }
});
