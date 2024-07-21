import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet ,TouchableOpacity,Text,ScrollView} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth ,db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCzZqsx2h0l-It6ybtkOjdZ-nghv656x3c",
//     authDomain: "sisterss-392a7.firebaseapp.com",
//     projectId: "sisterss-392a7",
//     storageBucket: "sisterss-392a7.appspot.com",
//     messagingSenderId: "1004651879058",
//     appId: "1:1004651879058:web:f968a047c2ac1642bc644b",
//     measurementId: "G-YER0W2Q9X8"
// };


// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [emergencyContact, setEmergencyContact] = useState('');
    const [fullNamePhoneNumber, setFullNamePhoneNumber] = useState('');
    const [nickname, setNickname] = useState('');

    // const handleSignUp = () => {
    //     if (password !== confirmPassword) {
    //         Alert.alert('Password Error', 'Passwords do not match.');
    //         return;
    //     }

    //     createUserWithEmailAndPassword(auth,email, password)
    //         .then(() => {
    //             Alert.alert('Sign Up Successful');
    //             navigation.navigate('SignIn');
    //         })
    //         .catch(error => {
    //             Alert.alert('Sign Up Failed', error.message);
    //         });
    // };

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert('שגיאת סיסמא', 'הסיסמאות אינן תואמות');
            return;
        }

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store additional user details in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                birthdate: birthdate,
                profilePicture: profilePicture || '',  // Assuming you have some default value or handle null
            });

            Alert.alert('נרשמת בהצלחה :)');
            navigation.navigate('הרשמה');
        } catch (error) {
            Alert.alert('ההרשמה נכשלה מהסיבה הזו:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
            <Text style={styles.note}>שימי ♥ שהשדות המסומנים ב(*) הינם חובה</Text>
            <TextInput
                style={styles.input}
                placeholder="אימייל"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="סיסמא"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="אימות סיסמא"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="(*)שם פרטי"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="(*)שם משפחה"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={styles.input}
                placeholder="כינוי"
                value={nickname}
                onChangeText={setNickname}
            />
            <TextInput
                style={styles.input}
                placeholder="תאריך לידה (שששש-חח-יי)"
                value={birthdate}
                onChangeText={setBirthdate}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="מספר טלפון לחירום"
                value={emergencyContact}
                onChangeText={setEmergencyContact}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="שם מלא של איש קשר לחירום"
                value={fullNamePhoneNumber}
                onChangeText={setFullNamePhoneNumber}
            />
            {/* Add more TextInput fields for other data */}

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>הרשמה</Text>
          </TouchableOpacity>
          </ScrollView>
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
    note: {
        fontStyle: 'italic',
        textAlign: 'right',
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
    button: {
        backgroundColor: '#ff7f9e',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      content: {
        flex: 1,
    },
});

export default SignUpScreen;
