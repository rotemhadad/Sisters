import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
import CommonScreen from './components/CommonScreen';
import PizzaCall from './components/PizzaCall';
import GovInfoScreen from './components/GovInfoScreen';
import LearnMoreScreen from './components/LearnMoreScreen';
import ProfileScreen from './components/Profile/Profile';
import TermsAndConditionsScreen from './components/TermsAndConditionsScreen';
import LegalRightsScreen from './components/LegalRightsScreen';
import withNavBar from './components/navBar'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={withNavBar(HomeScreen)} />
      <Stack.Screen name="Guest" component={withNavBar(GuestScreen)} />
      <Stack.Screen name="Articles" component={withNavBar(Articles)} />
      <Stack.Screen name="WarningSigns" component={withNavBar(WarningSigns)} />
      <Stack.Screen name="SelfQuestionnaire" component={withNavBar(SelfQuestionnaire)} />
      <Stack.Screen name="EnvWarningSigns" component={withNavBar(EnvWarningSigns)} />
      <Stack.Screen name="Information" component={withNavBar(InformationScreen)} />
      <Stack.Screen name="AboutUs" component={withNavBar(AboutUs)} />
      <Stack.Screen name="SignIn" component={withNavBar(SignInScreen)} />
      <Stack.Screen name="SignUp" component={withNavBar(SignUpScreen)} />
      <Stack.Screen name="Selection" component={withNavBar(SelectionScreen)} />
      <Stack.Screen name="ViolenceTypes" component={withNavBar(ViolenceTypes)} />
      <Stack.Screen name="DefenceGuide" component={withNavBar(DefenceGuide)} />
      <Stack.Screen name="Forum" component={withNavBar(ForumScreen)} />
      <Stack.Screen name="Common" component={withNavBar(CommonScreen)} />
      <Stack.Screen name="PizzaCall" component={withNavBar(PizzaCall)} />
      <Stack.Screen name="GovInfoScreen" component={withNavBar(GovInfoScreen)} />
      <Stack.Screen name="LearnMore" component={withNavBar(LearnMoreScreen)} />
      <Stack.Screen name="Profile" component={withNavBar(ProfileScreen)} />
      <Stack.Screen name="TermsAndConditions" component={withNavBar(TermsAndConditionsScreen)} options={{ title: 'Terms and Conditions' }} />
      <Stack.Screen name="LegalRights" component={withNavBar(LegalRightsScreen)} />
    </Stack.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator  screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color="#ff7f9e" size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={withNavBar(ProfileScreen)}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color="#ff7f9e" size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="PizzaCall"
          component={withNavBar(PizzaCall)}
          options={{
            tabBarTitle:() => {return null},
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="phone" color="#ff7f9e" size={size} />
            ),
          }}
        />
        {/* Add more Tab.Screen components as needed */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    allowFontScaling: false, // Disable font scaling
    writingDirection: 'rtl', // Set writing direction to left-to-right
  },
});

export default App;
