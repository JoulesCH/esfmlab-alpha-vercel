
// import firebase from "firebase/compat/app";

import {initializeApp, getApps, getApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getAnalytics} from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCZ-4PekqB9YMH66EeZ0b1fBSOsy8e5b1M",
  authDomain: "esfmlab-7a344.firebaseapp.com",
  projectId: "esfmlab-7a344",
  storageBucket: "esfmlab-7a344.appspot.com",
  messagingSenderId: "603385876322",
  appId: "1:603385876322:web:aab0acf06ad9a825dd263b",
  measurementId: "G-6L862V1NFD",

};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

export {app, auth, provider}

// if(!firebase.apps.length){
//   firebase.initializeApp(firebaseConfig);
// }

// export default firebase;