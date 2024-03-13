import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from './CommonStyles'; // Import common styles

const HomeScreen = (navigation) => {
    //const navigation = useNavigation();

    return (
        <View style={commonStyles.container}>
            <View style={commonStyles.header}>
                <Text style={commonStyles.headerText}>Sisters</Text>
            </View>
            <View style={commonStyles.content}>
                <Text style={commonStyles.contentText}>
                    את לא לבד. אנחנו כאן כדי לתמוך בך.
                </Text>
                <TouchableOpacity style={commonStyles.button}>
                    <Text style={commonStyles.buttonText}>התחברות והרשמה</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={() => navigation.navigate('Guest')}
                >
                    <Text style={commonStyles.buttonText}>כניסה בתור משתמש אורח</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        title="Go to Details"
                        onPress={() => navigation.navigate('Guest')}
                    />
                </View>

                <TouchableOpacity style={commonStyles.button}>
                    <Text style={commonStyles.buttonText}>למדי עוד</Text>
                </TouchableOpacity>
            </View>
            <View style={commonStyles.navBar}>
                <TouchableOpacity style={commonStyles.navButton}>
                    <Text style={commonStyles.navButtonText}>דף הבית</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.navButton}>
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
