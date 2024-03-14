// HomeScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from './CommonStyles'; // Import common styles

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={commonStyles.container}>
            <View style={commonStyles.header}>
                <Text style={commonStyles.headerText}>Sisters</Text>
            </View>
            <View style={commonStyles.content}>
                <Text style={commonStyles.contentText}>
                    את לא לבד. אנחנו כאן כדי לתמוך בך.
                </Text>
                <Text style={commonStyles.contentText}>
                    הנגשת מידע מציל חיים!
                </Text>
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={() => navigation.navigate('Selection')}
                >
                    <Text style={commonStyles.buttonText}>התחברות והרשמה</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={() => navigation.navigate('Guest')}
                >
                    <Text style={commonStyles.buttonText}>כניסה בתור משתמש אורח</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.button}>
                    <Text style={commonStyles.buttonText}>למדי עוד</Text>
                </TouchableOpacity>
            </View>
            <View style={commonStyles.navBar}>
                <TouchableOpacity style={commonStyles.navButton}>
                    <Text style={commonStyles.navButtonText}>שאלות נפוצות</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={commonStyles.navButton}
                    onPress={() => navigation.navigate('AboutUs')}
                >
                    <Text style={commonStyles.navButtonText}>אודות</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.navButton}>
                    <Text style={commonStyles.navButtonText}>צור קשר</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeScreen;
