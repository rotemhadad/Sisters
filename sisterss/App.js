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
import ChatScreen from './components/ChatScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="בית" component={withNavBar(HomeScreen)} />
      <Stack.Screen name="אורח" component={withNavBar(GuestScreen)} />
      <Stack.Screen name="מאמרים" component={withNavBar(Articles)} />
      <Stack.Screen name="תמרורי אזהרה" component={withNavBar(WarningSigns)} />
      <Stack.Screen name="שאלון זיהוי" component={withNavBar(SelfQuestionnaire)} />
      <Stack.Screen name="תמרורי אזהרה לסביבה" component={withNavBar(EnvWarningSigns)} />
      <Stack.Screen name="מידע" component={withNavBar(InformationScreen)} />
      <Stack.Screen name="עלינו" component={withNavBar(AboutUs)} />
      <Stack.Screen name="התחברות" component={withNavBar(SignInScreen)} />
      <Stack.Screen name="הרשמה" component={withNavBar(SignUpScreen)} />
      <Stack.Screen name="בחירה" component={withNavBar(SelectionScreen)} />
      <Stack.Screen name="סוגי אלימות" component={withNavBar(ViolenceTypes)} />
      <Stack.Screen name="הגנה עצמית" component={withNavBar(DefenceGuide)} />
      <Stack.Screen name="פורום" component={withNavBar(ForumScreen)} />
      <Stack.Screen name="שאלות נפוצות" component={withNavBar(CommonScreen)} />
      <Stack.Screen name="שיחת הפיצה" component={withNavBar(PizzaCall)} />
      <Stack.Screen name="מידע ממשלתי" component={withNavBar(GovInfoScreen)} />
      <Stack.Screen name="למדי עוד" component={withNavBar(LearnMoreScreen)} />
      <Stack.Screen name="פרופיל" component={withNavBar(ProfileScreen)} />
      <Stack.Screen name="תנאים" component={withNavBar(TermsAndConditionsScreen)} options={{ title: 'Terms and Conditions' }} />
      <Stack.Screen name="זכויות משפטיות" component={withNavBar(LegalRightsScreen)} />
      <Stack.Screen name="צאט" component={withNavBar(ChatScreen)} />
    </Stack.Navigator>
  );
};
const App = () => {
  return (    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen
          name="Chat"
          component={withNavBar(ChatScreen)}
          options={{
            title: "צאט",
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chat" color="#ff7f9e" size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="PizzaCall"
          component={withNavBar(PizzaCall)}
          options={{
            title: "שיחת פיצה",
            headerShown: true,
            tabBarTitle: () => { return null },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="phone" color="#ff7f9e" size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={withNavBar(ProfileScreen)}
          options={{
            title: "פרופיל",
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color="#ff7f9e" size={size} />
            ),
          }}
        />
      <Tab.Screen
        name="בית ראשי"
        component={HomeStack}
        options={{
          title: "בית ראשי",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color="#ff7f9e" size={size} />
          ),
        }}
      />
      
      

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
