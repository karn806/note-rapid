import firebase from 'firebase';

  // Initialize Firebase
const config = {
  apiKey: "AIzaSyAhYW9TynxUDyT886aBc4G0uMDsUzHVChE",
  authDomain: "simple-note-rapid.firebaseapp.com",
  databaseURL: "https://simple-note-rapid.firebaseio.com",
  projectId: "simple-note-rapid",
  storageBucket: "",
  messagingSenderId: "442450980198"
};

firebase.initializeApp(config);

export default firebase;
export const db = firebase.database();
export const auth = firebase.auth();
