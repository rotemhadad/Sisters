import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

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

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert('שגיאת סיסמא', 'הסיסמאות אינן תואמות');
            return;
        }

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Handle profile picture upload
            let profilePictureUrl = '';
            if (profilePicture) {
                const response = await fetch(profilePicture);
                const blob = await response.blob();
                const storageRef = ref(storage, `profile-pictures/${user.uid}`);
                const uploadTask = uploadBytesResumable(storageRef, blob);
                
                await new Promise((resolve, reject) => {
                    uploadTask.on(
                        'state_changed',
                        null,
                        (error) => reject(error),
                        async () => {
                            profilePictureUrl = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve();
                        }
                    );
                });
            } else {
                // Use a default picture URL if no picture is uploaded
                profilePictureUrl = 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg';
            }

            // Store additional user details in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                birthdate: birthdate,
                profilePicture: profilePictureUrl,
                firstName: firstName,
                lastName: lastName,
                nickname: nickname,
                emergencyContact: emergencyContact,
                fullNamePhoneNumber: fullNamePhoneNumber,
            });

            Alert.alert('נרשמת בהצלחה :)');
            navigation.navigate('התחברות');
        } catch (error) {
            Alert.alert('ההרשמה נכשלה מהסיבה הזו:', error.message);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProfilePicture(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
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
                    placeholder="(*)סיסמא"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="(*)אימות סיסמא"
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
                    placeholder="שם משפחה"
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
                {profilePicture && (
                    <Image source={{ uri: profilePicture }} style={styles.image} />
                )}
                <Button title="העלאת תמונה" onPress={pickImage} />
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
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
});

export default SignUpScreen;
