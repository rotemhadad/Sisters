import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet, Alert, Switch, SafeAreaView, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

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

  useEffect(() => {
    fetchPosts();
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
      Alert.alert('Error', 'Failed to fetch posts. Please try again later.');
    }
  };

  const addPost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      Alert.alert('Error', 'Title and content cannot be empty.');
      return;
    }
    try {
      const user = auth.currentUser;
      if (user) {
        const authorName = newPost.isAnonymous ? 'Anonymous' : user.displayName;
        const authorPhotoURL = newPost.isAnonymous ? null : user.photoURL;

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
        };

        if (newPost.image) {
          post.image = newPost.image;
        }

        await addDoc(collection(db, 'posts'), post);
        setNewPost({ title: '', subject: '', content: '', isAnonymous: false, image: null });
        setSelectedSubjects([]); // Reset selected subjects
        setImage(null);
        fetchPosts();
      } else {
        Alert.alert('Authentication Required', 'Please sign in to add a post.');
      }
    } catch (error) {
      console.error('Error adding post:', error);
      Alert.alert('Error', 'Failed to add post. Please try again.');
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
        Alert.alert('Authentication Required', 'Please sign in to add a comment.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      Alert.alert('Error', 'Failed to add comment. Please try again.');
    }
  };

  const applyFilters = () => {
    // Filter posts based on selected subjects
    if (selectedSubjects.length > 0) {
      const filteredPosts = posts.filter(post => selectedSubjects.includes(post.subject));
      setPosts(filteredPosts); // Update filtered posts in state
    } else {
      fetchPosts(); // Reset to all posts if no subjects selected
    }
  };

  const handleCheckboxChange = (subject) => {
    // Toggle selection of subjects
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
        Alert.alert('Authentication Required', 'Please sign in to like/unlike a post.');
      }
    } catch (error) {
      console.error('Error liking post:', error);
      Alert.alert('Error', 'Failed to like/unlike post. Please try again.');
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
        Alert.alert('Unauthorized', 'You are not authorized to delete this post.');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      Alert.alert('Error', 'Failed to delete post. Please try again.');
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
      setImage(result.uri);
      setNewPost({ ...newPost, image: result.uri });
    }
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      {item.authorPhotoURL && <Image source={{ uri: item.authorPhotoURL }} style={styles.authorPhoto} />}
      <Text style={styles.authorName}>{item.authorName}</Text>
      {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postSubject}>{item.subject}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      {item.authorId === auth.currentUser?.uid && (
        <TouchableOpacity onPress={() => deletePost(item.id)} style={styles.deleteButton}>
          <Text style={{ color: '#FFF' }}>מחק פוסט</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => toggleLikePost(item.id)} style={styles.likeButton}>
        <Text>{likedPosts.includes(item.id) ? 'להוריד אהבתי' : 'אהבתי'} ({item.likes.length})</Text>
      </TouchableOpacity>
      <View>
        {item.comments.map((comment, index) => (
          <View key={index} style={styles.commentContainer}>
            <Text>{comment.authorName}: {comment.content}</Text>
          </View>
        ))}
      </View>
      <TextInput
        value={comments[item.id] || ''}
        onChangeText={text => setComments({ ...comments, [item.id]: text })}
        placeholder="הוסיפי תגובה"
        style={styles.commentInput}
      />
      <TouchableOpacity onPress={() => addComment(item.id)} style={styles.addCommentButton}>
        <Text>הוסיפי תגובה</Text>
      </TouchableOpacity>
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
    <TouchableOpacity style={styles.title} onPress={() => navigation.navigate('TermsAndConditions')}>
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
          selectedValue={newPost.subject} // Changed to newPost.subject
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
            <TouchableOpacity
              style={[styles.checkbox, selectedSubjects.includes('בית') && styles.checkboxSelected]}
              onPress={() => handleCheckboxChange('בית')}
            >
              <Text>בית</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.checkbox, selectedSubjects.includes('ילדים') && styles.checkboxSelected]}
              onPress={() => handleCheckboxChange('ילדים')}
            >
              <Text>ילדים</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.checkbox, selectedSubjects.includes('זכויות') && styles.checkboxSelected]}
              onPress={() => handleCheckboxChange('זכויות')}
            >
              <Text>זכויות</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.checkbox, selectedSubjects.includes('נישואים') && styles.checkboxSelected]}
              onPress={() => handleCheckboxChange('נישואים')}
            >
              <Text>נישואים</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.checkbox, selectedSubjects.includes('קריירה') && styles.checkboxSelected]}
              onPress={() => handleCheckboxChange('קריירה')}
            >
              <Text>קריירה</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.checkbox, selectedSubjects.includes('אחר') && styles.checkboxSelected]}
              onPress={() => handleCheckboxChange('אחר')}
            >
              <Text>אחר</Text>
            </TouchableOpacity>
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
      
      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <>
            <Text style={{ textAlign: 'center', marginBottom: 10, fontWeight: 'bold' }}>פוסטים של אחיות</Text>
          </>
        }
      />
</ScrollView>
</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    padding: 5,
    backgroundColor: '#ff7f9e',
    borderWidth: 0.7,
    borderColor: '#FFFFFF',
    borderRadius: 5,
    marginBottom: 10,
  },
  titleText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    writingDirection: 'rtl', // Align text to the right
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
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
  uploadContainer: {
    borderColor: '#ff7f9e',
    borderRadius: 5,
    borderWidth: 2,
    padding: 10,
    marginBottom: 20,
  },
  postContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ff7f9e',
    padding: 10,
  },
  authorPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  authorName: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postSubject: {
    fontStyle: 'italic',
    marginBottom: 5,
  },
  postContent: {
    marginBottom: 10,
  },
  likeButton: {
    backgroundColor: '#89CFF0',
    padding: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: 120,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    padding: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: 120,
    borderRadius: 5,
  },
  commentContainer: {
    borderRadius: 5,
    marginLeft: 10,
    marginBottom: 5,
  },
  commentInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    padding: 5,
    marginBottom: 5,
  },
  addCommentButton: {
    borderRadius: 5,
    backgroundColor: '#7393B3',
    padding: 5,
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  imagePickerButton: {
    backgroundColor: '#89CFF0',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    writingDirection: 'rtl', // Align text to the right
    marginRight: 10,
  },
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end', // Align items from right to left
  },
  checkbox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
    marginBottom: 5,
  },
  checkboxSelected: {
    backgroundColor: '#89CFF0',
  },
  applyFiltersButton: {
    backgroundColor: '#ff7f9e',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ForumScreen;
