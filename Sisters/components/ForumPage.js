// Import necessary components and dependencies
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreatePost from './CreatePost';
import Post from './Post';
import LogoutButton from './LogoutButton';
import { styles } from './styles';
import { db, onGetPosts } from './FireBase';

const Stack = createStackNavigator();
//

onGetPosts((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const postData = doc.data();
    //console.log('Post:content', postData.content);

  });
});

const Forum = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          headerRight: () => <LogoutButton />, // Add the logout button to the header
          title: 'ייצרי פוסט',
        }}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={{
          headerRight: () => <LogoutButton />, // Add the logout button to the header
          title: 'פוסטים',
        }}
      />
    </Stack.Navigator>
  );
};

export default Forum;
