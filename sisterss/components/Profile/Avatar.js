import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

const Avatar = ({ currentAvatarUrl, onButtonPress }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const auth = getAuth();
  const storage = getStorage();
  const db = getFirestore();
  const defaultImage = require('./20.png');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Authentication Required', 'You need to be logged in to upload an image.');
      return;
    }

    if (!image) {
      Alert.alert('No Image Selected', 'Please select an image first.');
      return;
    }

    try {
      setUploading(true);
      const response = await fetch(image);
      const blob = await response.blob();
      const imageName = `profile_pictures/${user.uid}`;
      const imageRef = ref(storage, imageName);
      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { photoURL: imageUrl });

      setUploading(false);
      setImage(null); // Reset image state after successful upload
      onButtonPress(imageUrl); // Pass the new imageUrl to parent component
      Alert.alert('Success', 'Image uploaded successfully.');
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image || currentAvatarUrl || Image.resolveAssetSource(defaultImage).uri }}
        style={styles.avatar}
      />
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Ionicons name="image-outline" size={24} color="#000" />
        <Text style={styles.uploadButtonText}>בחר תמונה</Text>
      </TouchableOpacity>
      {image && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: image }} style={styles.imagePreview} />
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage} disabled={uploading}>
            <Text style={styles.uploadButtonText}>{uploading ? 'מעלה...' : 'העלה תמונה'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#ff7f9e',
    marginBottom: 8,
  },
  uploadButtonText: {
    marginLeft: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
  previewContainer: {
    alignItems: 'center',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default Avatar;
