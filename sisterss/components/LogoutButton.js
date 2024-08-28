import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Perform logout actions here (e.g., clear user session, etc.)
    //clearUserSession();
    navigation.navigate('Home');
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.button}>
      <Text>התנתקות</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;
