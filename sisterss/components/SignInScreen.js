import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
//import firebase from 'firebase';
import firebase from 'firebase/app';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1p4-WfYk04_XM07uNBwIcUNub8rod4CA",
    authDomain: "sisters-123123.firebaseapp.com",
    projectId: "sisters-123123",
    storageBucket: "sisters-123123.appspot.com",
    messagingSenderId: "14771022368",
    appId: "1:14771022368:web:df2fed25871ca6123fea45",
    measurementId: "G-39V2V1E12R"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                Alert.alert('Sign In Successful');
            })
            .catch(error => {
                Alert.alert('Sign In Failed', error.message);
            });
    };

    return (
        <View>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Sign In" onPress={handleSignIn} />
        </View>
    );
};

export default SignInScreen;
