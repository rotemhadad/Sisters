import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Image } from 'react-native';

import { commonStyles } from './CommonStyles'; // Import common styles
import { useNavigation } from '@react-navigation/native';

const GuestScreen = () => {
    const navigation = useNavigation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openMenu = () => {
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const navigateToPage = (pageName) => {
        navigation.navigate(pageName);
        closeMenu(); // Close the menu after navigation
    };

    return (
        <View style={commonStyles.container}>
            <View style={commonStyles.topButtons}>
                <TouchableOpacity style={commonStyles.topButton} onPress={() => navigation.navigate('Articles')}>
                    <Text style={commonStyles.buttonText}>מאמרים</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.topButton} onPress={() => navigation.navigate('WarningSigns')}>
                    <Text style={commonStyles.buttonText}>תמרורי אזהרה</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.topButton} onPress={() => navigation.navigate('SelfQuestionnaire')}>
                    <Text style={commonStyles.buttonText}>שאלון עצמי</Text>
                </TouchableOpacity>
            </View>
            <View style={commonStyles.content}>
                <Text style={commonStyles.contentText}>גלי מידע חדש ועוד.</Text>
                <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('WarningSigns')}>
                    <Text style={commonStyles.buttonText}>תמרורי אזהרה בזוגיות</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('EnvWarningSigns')}>
                    <Text style={commonStyles.buttonText}>תמרורי אזהרה לסביבה</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('SelfQuestionnaire')}>
                    <Text style={commonStyles.buttonText}>שאלון אוטומטי לזיהוי מצבי סיכון</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('Information')}>
                    <Text style={commonStyles.buttonText}>מידע חשוב</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('Articles')}>
                    <Text style={commonStyles.buttonText}>מאמרים בנושא אלימות במשפחה</Text>
                </TouchableOpacity>
            </View>
            {/* Menu Modal */}
            <Modal visible={isMenuOpen} animationType="slide" transparent={true} onRequestClose={closeMenu}>
                <View style={commonStyles.menuModal}>
                    <TouchableOpacity style={commonStyles.menuItem} onPress={() => navigateToPage('Page1')}>
                        <Text style={commonStyles.menuItemText}>Page 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={commonStyles.menuItem} onPress={() => navigateToPage('Page2')}>
                        <Text style={commonStyles.menuItemText}>Page 2</Text>
                    </TouchableOpacity>
                    {/* Add more menu items as needed */}
                </View>
            </Modal>
            {/* Menu Button */}
            <View style={commonStyles.bottomToolbar}>
                <TouchableOpacity style={commonStyles.menuButton} onPress={openMenu}>
                    <Text style={commonStyles.menuButtonText}>תפריט</Text>
                </TouchableOpacity>
            </View>
        </View>

    );

};
const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
});
export default GuestScreen;
