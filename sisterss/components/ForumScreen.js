import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet, Alert, Switch, SafeAreaView, ScrollView, I18nManager } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Ionicons } from '@expo/vector-icons';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';



const ForumScreen = () => {
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
      if (!newPost.title.trim()) {
        newPost.title = "";
      }
      if (!newPost.content.trim()) {
        newPost.content = "";
      }
      return;
    }
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        const authorName = newPost.isAnonymous ? 'Anonymous' : userData.nickname;
        const authorPhotoURL = newPost.isAnonymous ? null : userData.profilePicture;

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
      }
    } catch (error) {
      console.error('שגיאה :', error);
      Alert.alert('שגיאה', 'נכשל להוסיף תגובה אנא נסי שנית.');
    }
  };

  // const applyFilters = () => {
  //   if (selectedSubjects.length > 0) {
  //     const filteredPosts = posts.filter(post => selectedSubjects.includes(post.subject));
  //     setPosts(filteredPosts);
  //   } else {
  //     fetchPosts();
  //   }
  // };

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
      <View style={styles.postHeader}>
        {item.authorPhotoURL ? (
          <Image source={{ uri: item.authorPhotoURL }} style={styles.authorPhoto} />
        ) : (
          <Image source={require('../Images/./17.png')} style={styles.authorPhoto} />
        )}
        <Text style={styles.authorName}>{item.authorName}</Text>
      </View>
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
            <Text style={styles.commentAuthor}>{comment.authorName}</Text>
            <Text style={styles.commentContent}>{comment.content}</Text>
          </View>
        ))}
      </View>
      {/* <TextInput
        placeholder="הוסיפי תגובה..."
        value={comments[item.id] || ''}
        onChangeText={(text) => setComments({ ...comments, [item.id]: text })}
        style={styles.commentInput}
      /> */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.commentInputWrapper}>
          <TextInput
            placeholder="הוסיפי תגובה..."
            value={comments[item.id] || ''}
            onChangeText={(text) => setComments({ ...comments, [item.id]: text })}
            style={styles.commentInput}
            onStartShouldSetResponder={() => true}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
  {/* <TextInput
        placeholder="הוסיפי תגובה"
        value={comments[item.id] || ''}
        onChangeText={(text) => setComments({ ...comments, [item.id]: text })}
        style={styles.commentInput}
      /> */}
  {/* <TextInput
          placeholder="הוסיפי תגובה"
          value={comments[item.id] || ''}
          onChangeText={(text) => setComments({ ...comments, [item.id]: text })}
          style={{
            ...styles.commentInput,
            padding: 10, // בדוק שה-padding לא מפריע
            lineHeight: 20, // כיוון שורת הטקסט
            height: 40, // גובה מינימלי, אם יש צורך
            textAlignVertical: 'top', // מוודא שהטקסט מתחיל מהחלק העליון
          }}
        /> */}



  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.title} onPress={() => navigation.navigate('תנאים')}>
          <Ionicons name="document-text-outline" size={24} color="#FFF" />
          <Text style={styles.buttonText}>אנא קראי את התנאים ותקנון</Text>
        </TouchableOpacity>
        <View style={styles.newPostContainer}>
          <TextInput
            placeholder="כותרת המחשבות שלך"
            value={newPost.title}
            onChangeText={(text) => setNewPost({ ...newPost, title: text })}
            style={styles.input}
          />

          <Picker
            selectedValue={newPost.subject}
            onValueChange={(itemValue) => setNewPost({ ...newPost, subject: itemValue })}
            style={styles.picker}
          >
            <Picker.Item label="בית" value="בית" />
            <Picker.Item label="ילדים" value="ילדים" />
            <Picker.Item label="זכויות" value="זכויות" />
            <Picker.Item label="נישואים" value="נישואים" />
            <Picker.Item label="קריירה" value="קריירה" />
            <Picker.Item label="אחר" value="אחר" />
          </Picker>



          <TextInput
            placeholder="תוכן הפוסט"
            value={newPost.content}
            onChangeText={(text) => setNewPost({ ...newPost, content: text })}
            multiline
            style={[styles.input, styles.multilineInput]}
          />
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>אנונימי</Text>
            <Switch
              value={newPost.isAnonymous}
              onValueChange={(value) => setNewPost({ ...newPost, isAnonymous: value })}
            />
          </View>
          <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
            <Text style={styles.buttonText}>בחרי תמונה</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
          <TouchableOpacity onPress={addPost} style={styles.addPostButton}>
            <Text style={styles.buttonText}>העלי פוסט</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.postsTitle}>פוסטים של אחיות</Text>
        <Text style={styles.checkboxLabel}>סנני לפי נושא:</Text>
        <View style={styles.checkboxContainer}>
          {['בית', 'ילדים', 'זכויות', 'נישואים', 'קריירה', 'אחר'].map((subject) => (
            <TouchableOpacity
              key={subject}
              style={[styles.checkbox, selectedSubjects.includes(subject) && styles.checkboxSelected]}
              onPress={() => handleCheckboxChange(subject)}
            >
              <Text style={selectedSubjects.includes(subject) ? styles.checkboxTextSelected : styles.checkboxText}>{subject}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.checkboxLabel}>סנני לפי מלל:</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="חיפוש פוסטים"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {/* <TouchableOpacity onPress={applyFilters} style={styles.applyFiltersButton}>
          <Text style={styles.buttonText}>החל סינון</Text>
        </TouchableOpacity> */}

        {/* <View>
          {filteredPosts.map(item => (
            <RenderPostItem key={item.id} item={item} />
          ))}
        </View> */}
        <FlatList
          data={filteredPosts}
          renderItem={RenderPostItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }} // להוסיף קצת ריווח בתחתית
          keyboardShouldPersistTaps="handled"
        />


        {/* <View style={styles.postsContainer}>
          <FlatList
            data={posts}
            renderItem={RenderPostItem}
            keyExtractor={(item) => item.id}
          />
        </View> */}
        {/* <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>חזרה אחורה</Text>
      </TouchableOpacity> */}
      </ScrollView>

    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  newPostContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    marginBottom: 10,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  // imagePickerButton: {
  //   padding: 10,
  //   backgroundColor: '#ddd',
  //   borderRadius: 8,
  //   alignItems: 'center',
  //   marginBottom: 10,
  // },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  // button: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   padding: 10,
  //   borderRadius: 8,
  //   marginBottom: 10,
  // },
  // addPostButton: {
  //   backgroundColor: '#5cb85c',
  // },
  deleteButton: {
    backgroundColor: '#d9534f',
  },
  likeButton: {
    backgroundColor: '#5bc0de',
  },
  // addCommentButton: {
  //   backgroundColor: '#f0ad4e',
  // },
  postsContainer: {
    marginBottom: 20,
  },
  postContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  authorPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorName: {
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  postSubject: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
  postContent: {
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentContainer: {
    marginTop: 10,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#ddd',
  },
  commentAuthor: {
    fontWeight: 'bold',
  },
  commentContent: {
    marginBottom: 5,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  safeArea: {
    flex: 1,
    // marginTop: 20,
    // backgroundColor: '#f1f1f1',
    // direction: 'rtl',
  },

  // multilineInput: {
  //   minHeight: 80,
  //   textAlignVertical: 'top',
  // },
  // scrollViewContent: {
  //   flexGrow: 1,
  //   padding: 16,
  // },
  // newPostContainer: {
  //   marginBottom: 20,
  // },
  title: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7F50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  titleText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    //marginRight: 10,
  },
  uploadContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // input: {
  //   borderColor: '#ccc',
  //   borderWidth: 1,
  //   padding: 10,
  //   marginVertical: 10,
  //   borderRadius: 5,
  //   textAlign: 'right', // מיישר את הטקסט לימין עבור שפות RTL
  // },
  // input: {
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 8,
  //   padding: 10,
  //   marginBottom: 10,
  // },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10, // מוסיף מרווח בין הכותרת ל-Picker
    padding: 5,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 12,
    borderRadius: 8,
    //textAlign: 'right',
    fontSize: 16,
  },
  // picker: {
  //   borderWidth: 1,
  //   borderColor: '#E0E0E0',
  //   marginBottom: 12,
  //   borderRadius: 8,
  //   height: 50,
  //   justifyContent: 'center',
  // },
  // picker: {
  //   height: 50,
  //   width: '100%',
  // },
  // switchContainer: {
  //   flexDirection: 'row-reverse',
  //   alignItems: 'center',
  //   justifyContent: 'flex-start',
  //   marginBottom: 12,
  // },
  switchText: {
    marginLeft: 10,
    fontSize: 16,
  },
  imagePickerButton: {
    backgroundColor: '#89CFF0',
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // selectedImage: {
  //   width: '100%',
  //   height: 200,
  //   marginBottom: 12,
  //   borderRadius: 8,
  // },
  addPostButton: {
    backgroundColor: '#ff7f9e',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // postContainer: {
  //   backgroundColor: '#FFFFFF',
  //   marginBottom: 20,
  //   borderRadius: 10,
  //   padding: 16,
  //   elevation: 2,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   // direction: 'rtl',
  // },
  // postHeader: {
  //   flexDirection: 'row-reverse',
  //   alignItems: 'center',
  //   marginBottom: 10,
  // },
  // authorPhoto: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25,
  //   marginLeft: 10,
  // },
  // authorName: {
  //   fontWeight: 'bold',
  //   fontSize: 16,
  // },
  // postImage: {
  //   width: '100%',
  //   height: 200,
  //   marginBottom: 12,
  //   borderRadius: 8,
  // },
  // postTitle: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   marginBottom: 8,
  //   color: '#333',
  //   textAlign: 'right',
  // },
  // postSubject: {
  //   fontStyle: 'italic',
  //   marginBottom: 8,
  //   color: '#666',
  //   textAlign: 'right',
  // },
  // postContent: {
  //   marginBottom: 12,
  //   fontSize: 16,
  //   lineHeight: 24,
  //   textAlign: 'right',
  // },
  button: {
    flex: 1,
    marginHorizontal: 4,
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  },
  likeButton: {
    backgroundColor: '#89CFF0',
  },
  // deleteButton: {
  //   backgroundColor: '#C8A2C8',
  // },
  addCommentButton: {
    backgroundColor: '#f0ad4e',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 6,
  },
  // commentContainer: {
  //   backgroundColor: '#F5F5F5',
  //   borderRadius: 8,
  //   padding: 12,
  //   marginBottom: 8,
  // },
  // commentText: {
  //   fontSize: 14,
  //   textAlign: 'right',
  // },
  // commentInput: {
  //   borderWidth: 1,
  //   borderColor: '#E0E0E0',
  //   borderRadius: 8,
  //   padding: 12,
  //   marginBottom: 8,
  //   textAlign: 'right',
  // },



  searchInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    textAlign: 'right',
    fontSize: 16,
  },
  checkboxLabel: {
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right'
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
    backgroundColor: '#89CFF0',
  },
  applyFiltersButton: {
    backgroundColor: '#ff7f9e',
    padding: 12,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 8,
  },
  backButton: {
    backgroundColor: '#ff7f9e',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    margin: 16,
  },
  postsTitle: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ForumScreen;

