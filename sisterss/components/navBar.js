import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const withNavBar = (WrappedComponent) => {
  const handleContactEmail = () => {
    Linking.openURL('mailto:sisters@gmail.com');
  };

  const handleCallPolice = () => {
    Linking.openURL('tel:100');
  };

  return ({ navigation, route, ...props }) => {
    const currentRouteName = route.name;

    const NavButton = ({ onPress, icon, text, routeName }) => (
      <TouchableOpacity 
        style={[
          styles.navButton, 
          currentRouteName === routeName && styles.activeNavButton
        ]} 
        onPress={onPress}
      >
        <MaterialIcons 
          name={icon} 
          size={24} 
          color={currentRouteName === routeName ? '#000' : '#F43169'} 
        />
        <Text style={[
          styles.navButtonText,
          currentRouteName === routeName && styles.activeNavButtonText
        ]}>
          {text}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.navBar}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <NavButton 
            onPress={() => navigation.navigate('עלינו')} 
            icon="info" 
            text="אודות" 
            routeName="עלינו"
          />
          <NavButton 
            onPress={() => navigation.navigate('שאלות נפוצות')} 
            icon="help" 
            text="שאלות" 
            routeName="שאלות נפוצות"
          />
          <NavButton 
            onPress={handleContactEmail} 
            icon="email" 
            text="צור קשר" 
            routeName="צור קשר"
          />
          <NavButton 
            onPress={handleCallPolice} 
            icon="phone" 
            text="התקשרי" 
            routeName="התקשרי"
          />
        </View>
        <WrappedComponent {...props} navigation={navigation} />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  navBar: {
 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ff7f9e',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 5,
    zIndex: 111,
    marginBottom: -20,
  },
  navButton: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 5,
    elevation: 2,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  activeNavButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    padding: 5,
  },
  navButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  activeNavButtonText: {
    color: '#000',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default withNavBar;