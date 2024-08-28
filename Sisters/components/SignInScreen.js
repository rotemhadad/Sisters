import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { firebaseConfig, db, app } from './FireBase';
import { collection, addDoc } from 'firebase/firestore';
import { styles } from './styles';

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
        app
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                //console.log('sign-in ok');
                navigation.navigate('ForumPage');
                //navigation.navigate('Guest');
                Alert.alert('התחברת בהצלחה');
            })
            .catch((error) => {
                //console.log(error.message);
                Alert.alert('ההתחברות נכשלה', error.message);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="אימייל"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="סיסמה"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>התחברי</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignInScreen;
