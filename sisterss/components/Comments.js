import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function Comments(props) {
  const { comments } = props;

  return (
    <View style={styles.commentsContainer}>
      {comments.map((comment, index) => (
        <View style={styles.commentItem} key={index}>
          <Text style={styles.authorName}>{comment.authorName}</Text>
          {comment.characters.map((character, charIndex) => (
            <View style={styles.characterItem} key={charIndex}>
              <Image source={{ uri: character.avatar }} style={styles.userAvatar} />
              <View style={styles.commentContent}>
                <Text style={styles.userName}>{character.name}</Text>
                <Text style={styles.commentText}>{character.text}</Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  commentsContainer: {
    padding: 10,
  },
  commentItem: {
    marginBottom: 20,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  characterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
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
