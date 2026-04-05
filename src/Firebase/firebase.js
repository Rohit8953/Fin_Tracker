import {initializeApp} from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyD5BYY3TovcKyLQHXUz-puaXGvg9zhRXWM",
    authDomain: "authentication-ef9aa.firebaseapp.com",
    projectId: "authentication-ef9aa",
    storageBucket: "authentication-ef9aa.appspot.com",
    messagingSenderId: "431675839233",
    appId: "1:431675839233:web:8a6aab4657dba33b4a8100",
    measurementId: "G-SK8DBWP9F7",
    databaseURL:'https://authentication-ef9aa-default-rtdb.firebaseio.com'
  };

export const app = initializeApp(firebaseConfig);
