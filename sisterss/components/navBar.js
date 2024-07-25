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

  return ({ navigation, ...props }) => (
    <View style={{ flex: 1 }}>
      <View style={styles.navBar}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('עלינו')}>
          <MaterialIcons name="info" size={24} color="#F43169" />
          <Text style={styles.navButtonText}>אודות</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('שאלות נפוצות')}>
          <MaterialIcons name="help" size={24} color="#F43169" />
          <Text style={styles.navButtonText}>שאלות</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleContactEmail}>
          <MaterialIcons name="email" size={24} color="#F43169" />
          <Text style={styles.navButtonText}>צור קשר</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleCallPolice}>
          <MaterialIcons name="phone" size={24} color="#F43169" />
          <Text style={styles.navButtonText}>התקשרי</Text>
        </TouchableOpacity>
      </View>
      <WrappedComponent {...props} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ff7f9e',
  },
  navButton: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  navButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default withNavBar;