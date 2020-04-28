importScripts('https://www.gstatic.com/firebasejs/6.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.9.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyDlWNjH4XsEHVkWceFtavf8e7Qq9fKgQwU",
    authDomain: "fir-7e3e0.firebaseapp.com",
    databaseURL: "https://fir-7e3e0.firebaseio.com",
    projectId: "fir-7e3e0",
    storageBucket: "fir-7e3e0.appspot.com",
    messagingSenderId: "941729484801",
    appId: "1:941729484801:web:aabacc4af4907bc1203000",
    measurementId: "G-TFXWLDL6QG"
});

const messaging = firebase.messaging();