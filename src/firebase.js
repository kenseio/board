const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyCfE3a4CGEr18FspQ7urq4cZeloGy0fpjU",
  authDomain: "vuejs-http-kenseio.firebaseapp.com",
  projectId: "vuejs-http-kenseio"
});

const db = firebase.firestore();
export default db;
