// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;










// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// const Stack = createStackNavigator();




// const App = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Sisters</Text>
//       </View>
//       <View style={styles.content}>
//         <Text style={styles.contentText}>
//           את לא לבד. אנחנו כאן כדי לתמוך בך.
//         </Text>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>התחברות והרשמה</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>כניסה בתור משתמש אורח</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>למדי עוד</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.navBar}>
//         <TouchableOpacity style={styles.navButton}>
//           <Text style={styles.navButtonText}>דף הבית</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navButton}>
//           <Text style={styles.navButtonText}>אודות</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navButton}>
//           <Text style={styles.navButtonText}>צור קשר</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFC0CB', // Pink background color
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   headerText: {
//     fontSize: 50,
//     fontWeight: 'bold',
//     color: '#800080', // Purple color
//   },
//   content: {
//     flex: 4,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   contentText: {
//     fontSize: 18,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#800080', // Purple button color
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   navBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     width: '100%',
//     backgroundColor: '#800080', // Purple nav bar background color
//     paddingVertical: 10,
//     position: 'absolute',
//     bottom: 0,
//   },
//   navButton: {
//     paddingHorizontal: 20,
//   },
//   navButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default App;

// // /**
// //  * Sample React Native App
// //  * https://github.com/facebook/react-native
// //  *
// //  * @format
// //  */

// // import React from 'react';
// // import type { PropsWithChildren } from 'react';
// // import {
// //     SafeAreaView,
// //     ScrollView,
// //     StatusBar,
// //     StyleSheet,
// //     Text,
// //     useColorScheme,
// //     View,
// // } from 'react-native';

// // import {
// //     Colors,
// //     DebugInstructions,
// //     Header,
// //     LearnMoreLinks,
// //     ReloadInstructions,
// // } from 'react-native/Libraries/NewAppScreen';

// // type SectionProps = PropsWithChildren<{
// //     title: string;
// // }>;

// // function Section({ children, title }: SectionProps): React.JSX.Element {
// //     const isDarkMode = useColorScheme() === 'dark';
// //     return (
// //         <View style={styles.sectionContainer}>
// //             <Text
// //                 style={[
// //                     styles.sectionTitle,
// //                     {
// //                         color: isDarkMode ? Colors.white : Colors.black,
// //                     },
// //                 ]}>
// //                 {title}
// //             </Text>
// //             <Text
// //                 style={[
// //                     styles.sectionDescription,
// //                     {
// //                         color: isDarkMode ? Colors.light : Colors.dark,
// //                     },
// //                 ]}>
// //                 {children}
// //             </Text>
// //         </View>
// //     );
// // }

// // function App(): React.JSX.Element {
// //     const isDarkMode = useColorScheme() === 'dark';

// //     const backgroundStyle = {
// //         backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
// //     };

// //     return (
// //         <SafeAreaView style={backgroundStyle}>
// //             <StatusBar
// //                 barStyle={isDarkMode ? 'light-content' : 'dark-content'}
// //                 backgroundColor={backgroundStyle.backgroundColor}
// //             />
// //             <ScrollView
// //                 contentInsetAdjustmentBehavior="automatic"
// //                 style={backgroundStyle}>
// //                 <Header />
// //                 <View
// //                     style={{
// //                         backgroundColor: isDarkMode ? Colors.black : Colors.white,
// //                     }}>
// //                     <Section title="Step One">
// //                         Edit <Text style={styles.highlight}>App.tsx</Text> to change this
// //                         screen and then come back to see your edits.
// //                     </Section>
// //                     <Section title="See Your Changes">
// //                         <ReloadInstructions />
// //                     </Section>
// //                     <Section title="Debug">
// //                         <DebugInstructions />
// //                     </Section>
// //                     <Section title="Learn More">
// //                         Read the docs to discover what to do next:
// //                     </Section>
// //                     <LearnMoreLinks />
// //                 </View>
// //             </ScrollView>
// //         </SafeAreaView>
// //     );
// // }

// // const styles = StyleSheet.create({
// //     sectionContainer: {
// //         marginTop: 32,
// //         paddingHorizontal: 24,
// //     },
// //     sectionTitle: {
// //         fontSize: 24,
// //         fontWeight: '600',
// //     },
// //     sectionDescription: {
// //         marginTop: 8,
// //         fontSize: 18,
// //         fontWeight: '400',
// //     },
// //     highlight: {
// //         fontWeight: '700',
// //     },
// // });

// // export default App;
