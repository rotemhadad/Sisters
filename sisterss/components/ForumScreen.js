import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet, Alert, Switch, SafeAreaView, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Ionicons } from '@expo/vector-icons';

const ForumScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', subject: '', content: '', isAnonymous: false, image: null });
  const [comments, setComments] = useState({});
  const [likedPosts, setLikedPosts] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [image, setImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    fetchPosts();
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const fetchedPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(fetchedPosts);

      const user = auth.currentUser;
      if (user) {
        const likedPosts = fetchedPosts.filter(post => post.likes.includes(user.uid)).map(post => post.id);
        setLikedPosts(likedPosts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      Alert.alert('שגיאה', 'נכשל להציג פוסטים אנא נסי שוב מאוחר יותר.');
    }
  };

  const addPost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      Alert.alert('שגיאה', 'עלייך למלא כותרת ותוכן.');
      return;
    }
    try {
      const user = auth.currentUser;
      if (user) {
        const authorName = newPost.isAnonymous ? 'Anonymous' : user.displayName;
        const authorPhotoURL = newPost.isAnonymous ? null : user.photoURL;
  
        let imageUrl = null;
        if (newPost.image) {
          const response = await fetch(newPost.image);
          const blob = await response.blob();
          const imageName = `post_images/${Date.now()}_${user.uid}`;
          const imageRef = ref(storage, imageName);
          await uploadBytes(imageRef, blob);
          imageUrl = await getDownloadURL(imageRef);
        }
  
        const post = {
          title: newPost.title,
          subject: newPost.subject,
          content: newPost.content,
          authorId: user.uid,
          authorName,
          authorPhotoURL,
          likes: [],
          comments: [],
          createdAt: new Date(),
          image: imageUrl,
        };
  
        await addDoc(collection(db, 'posts'), post);
        setNewPost({ title: '', subject: '', content: '', isAnonymous: false, image: null });
        setSelectedSubjects([]);
        setImage(null);
        fetchPosts();
      } else {
        Alert.alert('נדרש זיהוי', 'אנא התחברי להוסיך פוסט.');
      }
    } catch (error) {
      console.error('Error adding post:', error);
      Alert.alert('שגיאה', 'נכשל להוסיף פוסט אנא נסי שנית.');
    }
  };

  const addComment = async (postId) => {
    try {
      const user = auth.currentUser;
      if (user && comments[postId]?.trim()) {
        const postRef = doc(db, 'posts', postId);
        await updateDoc(postRef, {
          comments: arrayUnion({
            authorId: user.uid,
            authorName: user.displayName,
            content: comments[postId],
            createdAt: new Date(),
          })
        });
        setComments(prevComments => ({ ...prevComments, [postId]: '' }));
        fetchPosts();
      } else {
        Alert.alert('זיהוי נדרש', 'אנא התחברי להוסיף תגובה.');
      }
    } catch (error) {
      console.error('שגיאה :', error);
      Alert.alert('שגיאה', 'נכשל להוסיף תגובה אנא נסי שנית.');
    }
  };

  const applyFilters = () => {
    if (selectedSubjects.length > 0) {
      const filteredPosts = posts.filter(post => selectedSubjects.includes(post.subject));
      setPosts(filteredPosts);
    } else {
      fetchPosts();
    }
  };

  const handleCheckboxChange = (subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter(item => item !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const toggleLikePost = async (postId) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const postRef = doc(db, 'posts', postId);
        const post = posts.find(post => post.id === postId);
        const hasLiked = post.likes.includes(user.uid);

        if (hasLiked) {
          await updateDoc(postRef, {
            likes: arrayRemove(user.uid)
          });
        } else {
          await updateDoc(postRef, {
            likes: arrayUnion(user.uid)
          });
        }

        fetchPosts();
      } else {
        Alert.alert('זיהוי נדרש', 'אנא התחברתי לסמן אהבתי.');
      }
    } catch (error) {
      console.error('Error liking post:', error);
      Alert.alert('שגיאה', 'נכשל בסימון האהבתי אנא נסי שנית.');
    }
  };

  const deletePost = async (postId) => {
    try {
      const user = auth.currentUser;
      const postRef = doc(db, 'posts', postId);
      const post = posts.find(post => post.id === postId);

      if (user && post.authorId === user.uid) {
        await deleteDoc(postRef);
        fetchPosts();
      } else {
        Alert.alert('לא מאושר', 'אינך מורשת למחוק פוסט זה.');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      Alert.alert('שגיאה', 'נכשל מחיקת הפוסט אנא נסי שנית.');
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
      setImage(result.assets[0].uri);
      setNewPost({ ...newPost, image: result.assets[0].uri });
    }
  };
  const RenderPostItem = ({ item }) => (
    <View style={styles.postContainer}>
      {item.authorPhotoURL ? (
        <Image source={{ uri: item.authorPhotoURL }} style={styles.authorPhoto} />
      ) : (
        <Image source={require('../Images/./17.png')} style={styles.authorPhoto} />
      )}
      <Text style={styles.authorName}>{item.authorName}</Text>
      {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postSubject}>{item.subject}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.buttonRow}>
        {item.authorId === auth.currentUser?.uid && (
          <TouchableOpacity onPress={() => deletePost(item.id)} style={[styles.button, styles.deleteButton]}>
            <Ionicons name="trash-outline" size={24} color="#FFF" />
            <Text style={{ color: '#FFF' }}>מחק</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => toggleLikePost(item.id)} style={[styles.button, styles.likeButton]}>
          <Ionicons name={likedPosts.includes(item.id) ? "heart" : "heart-outline"} size={24} color="#FFF" />
          <Text style={{ color: '#FFF' }}>{likedPosts.includes(item.id) ? 'אנלייק' : 'לייק'} ({item.likes.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addComment(item.id)} style={[styles.button, styles.addCommentButton]}>
          <Ionicons name="chatbubble-outline" size={24} color="#FFF" />
          <Text style={{ color: '#FFF' }}>הגב</Text>
        </TouchableOpacity>
      </View>
      <View>
        {item.comments.map((comment, index) => (
          <View key={index} style={styles.commentContainer}>
            <Text>{comment.authorName}: {comment.content}</Text>
          </View>
        ))}
      </View>
      <TextInput
        value={comments[item.id] || ''}
        onChangeText={(text) => setComments({ ...comments, [item.id]: text })}
        placeholder="הוסיפי תגובה"
        style={styles.input}
      />
    </View>
  );
  
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <TouchableOpacity style={styles.title} onPress={() => navigation.navigate('תנאים')}>
        <Ionicons name="document-text-outline" size={24} color="#FFF" />
      <Text style={styles.titleText}>אנא קראי את התנאים ותקנון</Text>
      </TouchableOpacity>
        <View style={styles.uploadContainer}>
          <TextInput
            value={newPost.title}
            onChangeText={(text) => setNewPost({ ...newPost, title: text })}
            placeholder="כותרת המחשבות שלך"
            style={styles.input}
          />
          <Picker
            selectedValue={newPost.subject}
            onValueChange={(itemValue) => setNewPost({ ...newPost, subject: itemValue })}
            style={styles.input}
          >
            <Picker.Item label="בחרי נושא" value="" />
            <Picker.Item label="בית" value="בית" />
            <Picker.Item label="ילדים" value="ילדים" />
            <Picker.Item label="זכויות" value="זכויות" />
            <Picker.Item label="נישואים" value="נישואים" />
            <Picker.Item label="קריירה" value="קריירה" />
            <Picker.Item label="אחר" value="אחר" />
          </Picker>
          <TextInput
            value={newPost.content}
            onChangeText={(text) => setNewPost({ ...newPost, content: text })}
            placeholder="שתפי מחשבותייך"
            style={styles.input}
            multiline
          />
          <View style={styles.switchContainer}>
            <Text>אנונימי</Text>
            <Switch
              value={newPost.isAnonymous}
              onValueChange={(value) => setNewPost({ ...newPost, isAnonymous: value })}
            />
          </View>
          <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
            <Text>בחרי תמונה</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
          <TouchableOpacity onPress={addPost} style={styles.addPostButton}>
            <Text>העלי פוסט</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: 'center', marginBottom: 10 , fontWeight: 'bold',}}>פוסטים של אחיות</Text>
        <Text style={styles.checkboxLabel}>סנן לפי נושא:</Text>
        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxGroup}>
            {['בית', 'ילדים', 'זכויות', 'נישואים', 'קריירה', 'אחר'].map((subject) => (
              <TouchableOpacity
                key={subject}
                style={[styles.checkbox, selectedSubjects.includes(subject) && styles.checkboxSelected]}
                onPress={() => handleCheckboxChange(subject)}
              >
                <Text>{subject}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Text style={styles.checkboxLabel}>סנן לפי מלל:</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="חיפוש פוסטים"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={applyFilters} style={styles.applyFiltersButton}>
          <Text>החל סינון</Text>
        </TouchableOpacity>
        
        <View>
          {filteredPosts.map(item => (
            <RenderPostItem key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>חזרה אחורה</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 10,
  },
  container: {
    flexGrow: 1,
    padding: 10,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    padding: 10,
    backgroundColor: '#FF7F50',
    borderWidth: 0.7,
    borderColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 10,
  },
  titleText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  uploadContainer: {
    borderColor: '#ff7f9e',
    borderRadius: 5,
    borderWidth: 2,
    padding: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePickerButton: {
    backgroundColor: '#C8A2C8',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 5,
  },
  addPostButton: {
    backgroundColor: '#ff7f9e',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  postContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ff7f9e',
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  authorPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  authorName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postSubject: {
    fontStyle: 'italic',
    marginBottom: 5,
  },
  postContent: {
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  likeButton: {
    flexDirection: 'row',
    backgroundColor: '#89CFF0',
  },
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#C8A2C8',
  },
  addCommentButton: {
    flexDirection: 'row',
    backgroundColor: '#FF7F50',
  },
  commentContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  checkboxLabel: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkbox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#ff7f9e',
  },
  applyFiltersButton: {
    backgroundColor: '#ff7f9e',
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForumScreen;