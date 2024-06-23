import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from './CommonStyles';

const SelectionScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.title}>Welcome!</Text>
            <TouchableOpacity
                style={commonStyles.button}
                onPress={() => navigation.navigate('SignIn')}
            >
                <Text style={commonStyles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={commonStyles.button}
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={commonStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SelectionScreen;
