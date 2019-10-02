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
      // 引数のdocumentIdから、newPosts内の該当の要素Indexを取得
      const targetIndex = state.newPosts.find(v => v.documentId === documentId);
      state.newPosts.splice(targetIndex, 1);
    }
  }
});
