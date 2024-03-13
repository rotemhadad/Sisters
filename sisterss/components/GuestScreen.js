import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
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
            <View style={styles.topButtons}>
                <TouchableOpacity style={styles.topButton} onPress={() => navigation.navigate('Articles')}>
                    <Text style={styles.buttonText}>מאמרים</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topButton}>
                    <Text style={styles.buttonText}>תמרורי אזהרה</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topButton}>
                    <Text style={styles.buttonText}>שאלון עצמי</Text>
                </TouchableOpacity>
            </View>
            <View style={commonStyles.content}>
                <Text style={commonStyles.contentText}>Explore our articles and more.</Text>
                <TouchableOpacity style={commonStyles.button}>
                    <Text style={commonStyles.buttonText}>תמרורי אזהרה בזוגיות</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={() => navigation.navigate('Articles')}
                >
                    <Text style={commonStyles.buttonText}>מאמרים בנושא אלימות במשפחה</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.button}>
                    <Text style={commonStyles.buttonText}>שאלון עצמי- האם אני חווה אלימות במשפחה?</Text>
                </TouchableOpacity>
                {/* Add more buttons if needed */}
            </View>
            {/* Menu Modal */}
            <Modal
                visible={isMenuOpen}
                animationType="slide"
                transparent={true}
                onRequestClose={closeMenu}
            >
                <View style={styles.menuModal}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigateToPage('Page1')}>
                        <Text style={styles.menuItemText}>Page 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigateToPage('Page2')}>
                        <Text style={styles.menuItemText}>Page 2</Text>
                    </TouchableOpacity>
                    {/* Add more menu items as needed */}
                </View>
            </Modal>
            {/* Menu Button */}
            <View style={styles.bottomToolbar}>
                <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
                    <Text style={styles.menuButtonText}>Menu</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    topButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#800080', // Purple background color
        paddingVertical: 10,
    },
    topButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#8A2BE2', // Blue Violet color
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bottomToolbar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#800080', // Purple background color
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#8A2BE2', // Blue Violet color
    },
    menuButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    menuModal: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        width: '100%',
    },
    menuItemText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default GuestScreen;
