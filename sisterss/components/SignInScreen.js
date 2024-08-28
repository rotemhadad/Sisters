import React, { useState } from 'react';
import { View, TextInput, Button, Alert ,StyleSheet,TouchableOpacity,Text} from 'react-native';
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
                Alert.alert('התחברת בהצלחה :)');
                navigation.navigate('בית');
            })
            .catch((error) => {
                Alert.alert('ההתחברות נכשלה מהסיבה הזו:', error.message);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="אימייל" value={email} onChangeText={setEmail} />
            <TextInput
                style={styles.input}
                placeholder="סיסמא"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>התחברות</Text>
          </TouchableOpacity>
        
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        backgroundColor: '#C8A2C8', // Light purple background
    },
    input: {
        height: 50,
        width: '80%', // Adjust width as needed
        marginBottom: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 25,
        backgroundColor: 'white',
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#ff7f9e', // Hot pink
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginVertical: 20,
        width: '80%',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


export default SignInScreen;
