// App.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import GuestScreen from './components/GuestScreen';
import Articles from './components/Articles';
import WarningSigns from './components/WarningSigns';
import SelfQuestionnaire from './components/SelfQuestionnaire';
import EnvWarningSigns from './components/EnvWarningSigns';
import InformationScreen from './components/InformationScreen';
import AboutUs from './components/AboutUs';
import SignInScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';
import SelectionScreen from './components/SelectionScreen';
import ViolenceTypes from './components/ViolenceTypes';
import DefenceGuide from './components/DefenceGuide';
import ForumScreen from './components/ForumScreen';
// import { I18nManager } from 'react-native';
// I18nManager.allowRTL(false);
//const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* <View style={styles.container}> */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Guest" component={GuestScreen} />
        <Stack.Screen name="Articles" component={Articles} />
        <Stack.Screen name="WarningSigns" component={WarningSigns} />
        <Stack.Screen name="SelfQuestionnaire" component={SelfQuestionnaire} />
        <Stack.Screen name="EnvWarningSigns" component={EnvWarningSigns} />
        <Stack.Screen name="Information" component={InformationScreen} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Selection" component={SelectionScreen} />
        <Stack.Screen name="ViolenceTypes" component={ViolenceTypes} />
        <Stack.Screen name="DefenceGuide" component={DefenceGuide} />
        <Stack.Screen name="Forum" component={ForumScreen} />
      </Stack.Navigator>
      {/* </View> */}
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    allowFontScaling: false, // Disable font scaling
    writingDirection: 'ltr', // Set writing direction to right-to-left
  },
});

export default App;




// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
