var { initializeApp } = require("firebase/app");
var { getFirestore, onSnapshot, collection } = require('firebase/firestore');

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBiJdO1hdhPwYOpAaLVBdWwArF3gPAIYHk",
  authDomain: "store-app-19e4d.firebaseapp.com",
  projectId: "store-app-19e4d",
  storageBucket: "store-app-19e4d.appspot.com",
  messagingSenderId: "924664615145",
  appId: "1:924664615145:web:29347577530f380369e078"
};

// Initialize Firebase
var app = initializeApp(firebaseConfig);
var db = getFirestore();
module.exports = db;
// console.log(db);


