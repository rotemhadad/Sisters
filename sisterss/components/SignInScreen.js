import React, { useState } from 'react';
import { View, TextInput, Button, Alert ,StyleSheet} from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
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
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                Alert.alert('Sign In Successful');
                navigation.navigate('Home');
            })
            .catch((error) => {
                //console.log(error.message);
                Alert.alert('ההתחברות נכשלה', error.message);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput
                style={styles.input}
                placeholder="Password"
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        height: 40,
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default SignInScreen;
