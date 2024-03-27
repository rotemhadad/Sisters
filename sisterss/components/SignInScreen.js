import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
//import firebase from '@react-native-firebase/app';
//import '@react-native-firebase/auth';
// const firebaseConfig = {
//     apiKey: "AIzaSyCzZqsx2h0l-It6ybtkOjdZ-nghv656x3c",
//     authDomain: "sisterss-392a7.firebaseapp.com",
//     projectId: "sisterss-392a7",
//     storageBucket: "sisterss-392a7.appspot.com",
//     messagingSenderId: "1004651879058",
//     appId: "1:1004651879058:web:f968a047c2ac1642bc644b",
//     measurementId: "G-YER0W2Q9X8"
// };

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                Alert.alert('Sign In Successful');
            })
            .catch((error) => {
                Alert.alert('Sign In Failed', error.message);
            });
    };

    return (
        <View>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
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