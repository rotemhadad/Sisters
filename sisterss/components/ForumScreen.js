import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet, Alert } from 'react-native';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const ForumScreen = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', subject: '', content: '' });
  const [comments, setComments] = useState({});
  const [likedPosts, setLikedPosts] = useState([]);

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

      // Check if current user has liked any posts
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
    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, 'posts'), {
          ...newPost,
          authorId: user.uid,
          authorName: user.displayName,
          authorPhotoURL: user.photoURL,
          likes: [],
          comments: [],
          createdAt: new Date(),
        });
        setNewPost({ title: '', subject: '', content: '' });
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

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.authorPhotoURL }} style={styles.authorPhoto} />
      <Text style={styles.authorName}>{item.authorName}</Text>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postSubject}>{item.subject}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <TouchableOpacity onPress={() => toggleLikePost(item.id)} style={styles.likeButton}>
        <Text>{likedPosts.includes(item.id) ? 'Unlike' : 'Like'} ({item.likes.length})</Text>
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
        placeholder="Add a comment"
        style={styles.commentInput}
      />
      <TouchableOpacity onPress={() => addComment(item.id)} style={styles.addCommentButton}>
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
