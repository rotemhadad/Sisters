import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth , db };