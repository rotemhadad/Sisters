import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
//import firebase from 'firebase';
import firebase from 'firebase/app';

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                Alert.alert('Sign Up Successful');
            })
            .catch(error => {
                Alert.alert('Sign Up Failed', error.message);
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
            <Button title="Sign Up" onPress={handleSignUp} />
        </View>
    );
};

export default SignUpScreen;
