import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'; // Import necessary components from react-native

function Comments(props) {
  const { comments } = props;

  return (
    <View style={styles.commentsContainer}>
      {comments.map((comment, index) => (
        <View style={styles.commentItem} key={index}>
          <Image source={{ uri: comment[2] }} style={styles.userAvatar} />
          <View style={styles.commentContent}>
            <Text style={styles.userName}>{comment[1]}</Text>
            <Text style={styles.commentText}>{comment[3]}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  commentsContainer: {
    // Style for the container of all comments
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  commentContent: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
  commentText: {
    marginTop: 5,
  },
});

export default Comments;
