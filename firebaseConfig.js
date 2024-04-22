import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBq9ZIwN8EblJrGGRG4fEuXhfixqI9rIog",
  authDomain: "ieltstinder.firebaseapp.com",
  projectId: "ieltstinder",
  storageBucket: "ieltstinder.appspot.com",
  messagingSenderId: "343828063765",
  appId: "1:343828063765:web:6011380d51807cf604501c",
  measurementId: "G-KG74K404TJ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
