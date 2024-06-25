import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const ForumScreen = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', subject: '', content: '' });
  const [comment, setComment] = useState('');

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const fetchedPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(fetchedPosts);
  };

  const addPost = async () => {
    const user = auth.currentUser;
    if (user) {
      await addDoc(collection(db, 'posts'), {
        ...newPost,
        authorId: user.uid,
        authorName: user.displayName,
        authorPhotoURL: user.photoURL,
        likes: 0,
        comments: [],
        createdAt: new Date(),
      });
      setNewPost({ title: '', subject: '', content: '' });
      fetchPosts();
    }
  };

  const addComment = async (postId, comment) => {
    const user = auth.currentUser;
    if (user) {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        comments: arrayUnion({
          authorId: user.uid,
          authorName: user.displayName,
          content: comment,
          createdAt: new Date(),
        })
      });
      setComment('');
      fetchPosts();
    }
  };

  const likePost = async (postId) => {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      likes: posts.find(post => post.id === postId).likes + 1
    });
    fetchPosts();
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.authorPhotoURL }} style={styles.authorPhoto} />
      <Text style={styles.authorName}>{item.authorName}</Text>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postSubject}>{item.subject}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <TouchableOpacity onPress={() => likePost(item.id)} style={styles.likeButton}>
        <Text>Like ({item.likes})</Text>
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
        value={comment}
        onChangeText={setComment}
        placeholder="Add a comment"
        style={styles.commentInput}
      />
      <TouchableOpacity onPress={() => addComment(item.id, comment)} style={styles.addCommentButton}>
        <Text>Add Comment</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        value={newPost.title}
        onChangeText={(text) => setNewPost({ ...newPost, title: text })}
        placeholder="Post Title"
        style={styles.input}
      />
      <TextInput
        value={newPost.subject}
        onChangeText={(text) => setNewPost({ ...newPost, subject: text })}
        placeholder="Subject (בית, ילדים, זכויות)"
        style={styles.input}
      />
      <TextInput
        value={newPost.content}
        onChangeText={(text) => setNewPost({ ...newPost, content: text })}
        placeholder="Post Content"
        style={styles.input}
        multiline
      />
      <TouchableOpacity onPress={addPost} style={styles.addPostButton}>
        <Text>Add Post</Text>
      </TouchableOpacity>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  addPostButton: {
    backgroundColor: '#ff7f9e',
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  postContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
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
    backgroundColor: '#e0e0e0',
    padding: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  commentContainer: {
    marginLeft: 10,
    marginBottom: 5,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginBottom: 5,
  },
  addCommentButton: {
    backgroundColor: '#e0e0e0',
    padding: 5,
    alignItems: 'center',
  },
});

export default ForumScreen;