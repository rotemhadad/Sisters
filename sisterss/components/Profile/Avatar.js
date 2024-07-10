import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateDoc, doc } from 'firebase/firestore';
import { auth, db, storage } from '../../firebaseConfig';

const Avatar = ({ uri, aviOnly = false, imgStyle = {}, onButtonPress }) => {
  const [selectedImage, setSelectedImage] = useState(uri);
  const [uploading, setUploading] = useState(false);

  const handleChoosePhoto = async () => {
    try {
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

      if (result.canceled) {
        return;
      }

      const selectedAsset = result.assets ? result.assets[0] : null;
      if (selectedAsset && selectedAsset.uri) {
        setSelectedImage(selectedAsset.uri);
        if (onButtonPress) onButtonPress(selectedAsset.uri);
        await uploadImage(selectedAsset.uri);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while selecting the photo. Please try again.");
    }
  };

  const uploadImage = async (uri) => {
    setUploading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const imageRef = ref(storage, `profile-pictures/${auth.currentUser.uid}`);

      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);

      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        profilePicture: downloadURL,
      });
    } catch (error) {
      Alert.alert("Upload Error", "An error occurred while uploading the image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <TouchableOpacity onPress={handleChoosePhoto} style={styles.container} disabled={uploading}>
      {uploading ? (
        <ActivityIndicator size="large" color="#ff7f9e" />
      ) : (
        <Image
          source={{ uri: selectedImage }}
          style={[styles.image, aviOnly && { height: 35, width: 35, borderWidth: 0 }, imgStyle]}
        />
      )}
      {!aviOnly && !uploading && (
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
