import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { firebaseConfig, db, app } from './FireBase';
import { collection, addDoc } from 'firebase/firestore';
import { styles } from './styles';

const GurdianSignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [nickname, setNickname] = useState('');

    const handleSignUp = () => {
        if (!email || !password || !firstName || !lastName || !confirmPassword) {
            Alert.alert('שגיאה', 'אנא מלא את כל השדות הנדרשים');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('שגיאת סיסמא', 'הסיסמאות לא תואמות');
            return;
        }

        app
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                // Add user to database
                addDoc(collection(db, "Gurdian"), {
                    email,
                    firstName,
                    lastName,
                    birthdate,
                    profilePicture,
                    nickname
                });
                Alert.alert('ההרשמה בוצעה בהצלחה');
            })
            .catch(error => {
                Alert.alert('ההרשמה נכשלה', error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.note}>שימי ♥ שהשדות המסומנים ב(*) הינם חובה</Text>
            <TextInput
                style={styles.input}
                placeholder="(*)אימייל"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="(*)סיסמה"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="(*)אימות סיסמה"
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

            <TouchableOpacity
                style={styles.button}
                onPress={handleSignUp}>
                <Text style={styles.buttonText}>הירשמי</Text>
            </TouchableOpacity>
        </View>
    );
};

export default GurdianSignUpScreen;
