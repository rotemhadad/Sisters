import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import firebase from 'firebase';

const SignInScreen = () => {
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
