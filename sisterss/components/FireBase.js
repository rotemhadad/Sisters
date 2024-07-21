import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {getFirestore,collection,getDocs,onSnapshot,addDoc,deleteDoc, doc,getDoc,updateDoc,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzZqsx2h0l-It6ybtkOjdZ-nghv656x3c",
    authDomain: "sisterss-392a7.firebaseapp.com",
    databaseURL: "https://sisterss-392a7-default-rtdb.firebaseio.com",
    projectId: "sisterss-392a7",
    storageBucket: "sisterss-392a7.appspot.com",
    messagingSenderId: "1004651879058",
    appId: "1:1004651879058:web:f968a047c2ac1642bc644b",
    measurementId: "G-YER0W2Q9X8"
  };

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);

//
export const db = getFirestore();


//getting all posts docs
export const onGetPosts = (callback) =>
  onSnapshot(collection(db, "Posts"), callback);

