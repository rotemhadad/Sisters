import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert, ScrollView } from 'react-native';
import { onAuthStateChanged, updateEmail, updatePassword } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Avatar from './Avatar'; 
import { auth, db } from '../../firebaseConfig';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickname, setNickname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [fullNamePhoneNumber, setFullNamePhoneNumber] = useState('');
  const [profilePicture, setProfilePicture] = useState('https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setEmail(userData.email);
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setNickname(userData.nickname);
          setBirthdate(userData.birthdate);
          setEmergencyContact(userData.emergencyContact);
          setFullNamePhoneNumber(userData.fullNamePhoneNumber);
          setProfilePicture(userData.profilePicture || 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateProfilePicture = async (newUri) => {
    setProfilePicture(newUri);
    if (userId) {
      try {
        await updateDoc(doc(db, 'users', userId), { profilePicture: newUri });
        console.log('Profile picture updated successfully.');
      } catch (error) {
        console.error('Error updating profile picture:', error);
      }
    }
  };

  const handleUpdateProfile = async () => {
    if (password !== confirmPassword) {
      Alert.alert('שגיאת סיסמא', 'הסיסמאות אינן תואמות');
      return;
    }

    if (userId) {
      try {
        const user = auth.currentUser;

        // Update email in Firebase Auth
        if (email !== user.email) {
          await updateEmail(user, email);
        }

        // Update password in Firebase Auth
        if (password) {
          await updatePassword(user, password);
        }

        // Update user details in Firestore
        await updateDoc(doc(db, 'users', userId), {
          email,
          firstName,
          lastName,
          nickname,
          birthdate,
          emergencyContact,
          fullNamePhoneNumber,
          profilePicture,
        });

        Alert.alert('הפרופיל עודכן', 'הפרופיל שלך עודכן בהצלחה.');
      } catch (error) {
        console.error('שגיאה בעדכון הפרופיל:', error);
        Alert.alert('שגיאה בעדכון הפרופיל', error.message);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar
          uri={profilePicture}
          aviOnly={false}
          onButtonPress={handleUpdateProfilePicture}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>אימייל</Text>
        <TextInput
          style={styles.input}
          placeholder="עדכני מייל"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={styles.label}>סיסמא חדשה</Text>
        <TextInput
          style={styles.input}
          placeholder="הכניסי סיסמא חדשה"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.label}>אישור סיסמא</Text>
        <TextInput
          style={styles.input}
          placeholder="אימות הסיסמא החדשה"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Text style={styles.label}>שם פרטי</Text>
        <TextInput
          style={styles.input}
          placeholder="שם פרטי"
          value={firstName}
          onChangeText={setFirstName}
        />
        <Text style={styles.label}>שם משפחה</Text>
        <TextInput
          style={styles.input}
          placeholder="שם משפחה"
          value={lastName}
          onChangeText={setLastName}
        />
        <Text style={styles.label}>כינוי</Text>
        <TextInput
          style={styles.input}
          placeholder="כינוי"
          value={nickname}
          onChangeText={setNickname}
        />
        <Text style={styles.label}>תאריך לידה</Text>
        <TextInput
          style={styles.input}
          placeholder="תאריך לידה (שששש-חח-יי)"
          value={birthdate}
          onChangeText={setBirthdate}
          keyboardType="numeric"
        />
        <Text style={styles.label}>מספר טלפון לחירום</Text>
        <TextInput
          style={styles.input}
          placeholder="מספר טלפון לחירום"
          value={emergencyContact}
          onChangeText={setEmergencyContact}
          keyboardType="phone-pad"
        />
        <Text style={styles.label}>שם מלא של איש קשר לחירום</Text>
        <TextInput
          style={styles.input}
          placeholder="שם מלא של איש קשר לחירום"
          value={fullNamePhoneNumber}
          onChangeText={setFullNamePhoneNumber}
        />
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
          <Text style={styles.updateButtonText}>עדכון הפרופיל</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ff7f9e',
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
  },
  updateButton: {
    backgroundColor: '#ff7f9e',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
