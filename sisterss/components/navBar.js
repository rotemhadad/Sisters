import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';

const withNavBar = (WrappedComponent) => {
  const handleContactEmail = () => {
    Linking.openURL('mailto:sisters@gmail.com');
  };

  const handleCallPolice = () => {
    Linking.openURL('tel:100'); 
  };

  return ({ navigation, ...props }) => (
    <View style={{ flex: 1 }}>
      <View style={styles.navBar}>
        {/* Replace 'logo.png' with your actual logo file name */}
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AboutUs')}>
          <Text style={styles.navButtonText}>אודות</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Common')}>
          <Text style={styles.navButtonText}>שאלות</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleContactEmail}>
          <Text style={styles.navButtonText}>צור קשר</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleCallPolice}>
          <Text style={[styles.navButtonText, { color: '#F43169' }]}>התקשרי</Text>
        </TouchableOpacity>
      </View>
      <WrappedComponent {...props} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#ff7f9e',
  },
  navButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  navButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logo: {
    width: 50, // Adjust width as per your logo size
    height: 50, // Adjust height as per your logo size
    resizeMode: 'contain',
  },
});

export default withNavBar;
