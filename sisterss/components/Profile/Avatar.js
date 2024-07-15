import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { updateDoc, doc } from 'firebase/firestore';
import { auth, db, storage } from '../../firebaseConfig';

const Avatar = ({ uri, aviOnly = false, imgStyle = {}, onButtonPress }) => {
  const [selectedImage, setSelectedImage] = useState(uri);

  const handleChoosePhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "Permission for gallery access is required to select an image.\nPlease go to settings and enable the permission."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    const selectedAsset = result.assets[0];
    if (selectedAsset.uri) {
      setSelectedImage(selectedAsset.uri);
      if (onButtonPress) onButtonPress(selectedAsset.uri);
      // Upload the selected image to Firebase Cloud Storage
      uploadImage(selectedAsset.uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const imageRef = ref(storage, `profile-pictures/${auth.currentUser.uid}`);
  
      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);
  
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        profilePicture: downloadURL
      });
  
      console.log('Profile picture uploaded and updated successfully:', downloadURL);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handleChoosePhoto} style={styles.container}>
      <Image
        source={{ uri: selectedImage }}
        style={[styles.image, aviOnly && { height: 35, width: 35, borderWidth: 0 }, imgStyle]}
      />
      {!aviOnly && (
        <TouchableOpacity onPress={handleChoosePhoto} style={styles.cameraButton}>
          <MaterialCommunityIcons name="camera-outline" size={30} color="#ff7f9e" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 75,
    width: 150,
    height: 150,
    borderWidth: 5,
    borderColor: '#ff7f9e',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ff7f9e',
  },
});

export default Avatar;
