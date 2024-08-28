import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Comments from './Comments';
import { styles } from './styles';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './FireBase';

function Post(props) {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [hasLiked, setHasLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Posts'));
        const postData = querySnapshot.docs.find(doc => doc.id === props.postId).data();
        setPost(postData);
        setComments(postData.comments);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [props.postId]);

  const handleComment = async () => {
    if (commentInput.trim() === '') {
      alert('Enter content to comment');
      return;
    }
    setComments([...comments, commentInput]);
    // Your fetch logic for updating comments
  };

  const handleShowComment = () => {
    setShowComment(!showComment);
  };

  const handleInputChange = (text) => {
    setCommentInput(text);
  };

  return (
    <View style={styles.post}>
      {post && (
        <>
          <View style={styles.postHeader}>
            <Image source={{ uri: post.authorImg }} style={styles.profilePicture} />
            <View style={styles.postHeaderText}>
              <Text>{post.author}</Text>
              <Text>בנושא: {post.theme}</Text>
              <Text>{post.date}</Text>
            </View>
          </View>
          <View style={styles.postContent}>
            <Text>{post.content}</Text>
          </View>

          <View style={styles.postActions}>
            <TouchableOpacity onPress={handleLike}>
              {hasLiked ? <AiFillLike style={styles.com} /> : <AiOutlineLike style={styles.com} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShowComment}>
              <FaRegComment style={styles.com} />
            </TouchableOpacity>
            <Text>{comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}</Text>
          </View>

          {showComment && (
            <View style={styles.commentsContainer}>
              <Comments comments={comments} />
              <View style={styles.postComments}>
                <TextInput
                  style={styles.textArea}
                  placeholder="Add a comment..."
                  value={commentInput}
                  onChangeText={handleInputChange}
                  multiline={true}
                />
                <TouchableOpacity style={styles.buttonA} onPress={handleComment}>
                  <Text>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
}

export default Post;
