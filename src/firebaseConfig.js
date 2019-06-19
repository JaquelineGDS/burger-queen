import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBVouh9SP3G6RKq2XQE67q2MVobnVnoJsU",
  authDomain: "burger-queen-7f44c.firebaseapp.com",
  databaseURL: "https://burger-queen-7f44c.firebaseio.com",
  projectId: "burger-queen-7f44c",
  storageBucket: "burger-queen-7f44c.appspot.com",
  messagingSenderId: "618550040100",
  appId: "1:618550040100:web:9531689febcc199b"
};

firebase.initializeApp(config);

export default firebase;