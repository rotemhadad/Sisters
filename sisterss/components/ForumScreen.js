import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet, Alert, Switch, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';

const ForumScreen = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', subject: '', content: '', isAnonymous: false, image: null });
  const [comments, setComments] = useState({});
  const [likedPosts, setLikedPosts] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [image, setImage] = useState(null);

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
          subject: selectedSubject,
          content: newPost.content,
          authorId: user.uid,
          authorName,
          authorPhotoURL,
          likes: [],
          comments: [],
          createdAt: new Date(),
        };
  
        // Only add the image field if an image has been selected
        if (newPost.image) {
          post.image = newPost.image;
        }
  
        await addDoc(collection(db, 'posts'), post);
        setNewPost({ title: '', subject: '', content: '', isAnonymous: false, image: null });
        setSelectedSubject('');
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
      <TouchableOpacity onPress={() => toggleLikePost(item.id)} style={styles.likeButton}>
        <Text>{likedPosts.includes(item.id) ? 'להוריד אהבתי' : 'אהבתי'} ({item.likes.length})</Text>
      </TouchableOpacity>
      <FlatList
        data={item.comments}
        renderItem={({ item: comment }) => (
          <View style={styles.commentContainer}>
            <Text>{comment.authorName}: {comment.content}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.uploadContainer}>
        <TextInput
          value={newPost.title}
          onChangeText={(text) => setNewPost({ ...newPost, title: text })}
          placeholder="כותרת המחשבות שלך"
          style={styles.input}
        />
        <Picker
          selectedValue={selectedSubject}
          onValueChange={(itemValue) => setSelectedSubject(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="בחרי נושא" value="" />
          <Picker.Item label="בית" value="בית" />
          <Picker.Item label="ילדים" value="ילדים" />
          <Picker.Item label="זכויות" value="זכויות" />
          <Picker.Item label="נישואים" value="נישואים" />
          <Picker.Item label="אחר" value="אחר" />
        </Picker>
        <TextInput
          value={newPost.content}
          onChangeText={(text) => setNewPost({ ...newPost, content: text })}
          placeholder="שתפי מחשבותייך"
          style={styles.input}
          multiline
        />
        <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
          <Text>בחרי תמונה</Text>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
        <View style={styles.switchContainer}>
          <Text>אנונימי</Text>
          <Switch
            value={newPost.isAnonymous}
            onValueChange={(value) => setNewPost({ ...newPost, isAnonymous: value })}
          />
        </View>
        <TouchableOpacity onPress={addPost} style={styles.addPostButton}>
          <Text>העלי פוסט</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ textAlign: 'center', marginBottom: 10 }}>פוסטים של אחיות:</Text>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
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
});

export default ForumScreen;
