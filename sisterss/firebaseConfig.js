import { initializeApp } from 'firebase/app';
import {getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzZqsx2h0l-It6ybtkOjdZ-nghv656x3c",
    authDomain: "sisterss-392a7.firebaseapp.com",
    projectId: "sisterss-392a7",
    storageBucket: "sisterss-392a7.appspot.com",
    messagingSenderId: "1004651879058",
    appId: "1:1004651879058:web:f968a047c2ac1642bc644b",
    measurementId: "G-YER0W2Q9X8"
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with React Native persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }



// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);


// export { auth , db };