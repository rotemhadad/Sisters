import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { commonStyles } from './CommonStyles'; // Import common styles
import { useNavigation } from '@react-navigation/native';

const GuestScreen = ({ navigation }) => {
    //const navigation = useNavigation();
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
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={commonStyles.content}>
                    <View style={styles.imageRow}>
                        <View style={styles.imageButtonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('Information')}>
                                <Image source={require('../Images/Information.png')} style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyles.button, styles.buttonBelow]} onPress={() => navigation.navigate('Information')}>
                                <Text style={commonStyles.buttonText}>מידע חשוב</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.imageButtonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('SelfQuestionnaire')}>
                                <Image source={require('../Images/SelfQuestionnaire.png')} style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyles.button, styles.buttonBelow]} onPress={() => navigation.navigate('SelfQuestionnaire')}>
                                <Text style={commonStyles.buttonText}>שאלון לזיהוי מצבי סיכון</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.imageRow}>
                        <View style={styles.imageButtonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('WarningSigns')}>
                                <Image source={require('../Images/Warnings.png')} style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyles.button, styles.buttonBelow]} onPress={() => navigation.navigate('WarningSigns')}>
                                <Text style={commonStyles.buttonText}>תמרורי אזהרה בזוגיות</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.imageButtonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('EnvWarningSigns')}>
                                <Image source={require('../Images/WarningsQ.jpeg')} style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyles.button, styles.buttonBelow]} onPress={() => navigation.navigate('EnvWarningSigns')}>
                                <Text style={commonStyles.buttonText}>תמרורי אזהרה לסביבה</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('ViolenceTypes')}>
                        <Text style={commonStyles.buttonText}>סוגי אלימויות</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('DefenceGuide')}>
                        <Text style={commonStyles.buttonText}>הנחיות להתגוננות במצבי סיכון מיידיים</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={commonStyles.button} onPress={() => navigation.navigate('Articles')}>
                        <Text style={commonStyles.buttonText}>מאמרים בנושא אלימות במשפחה</Text>
                    </TouchableOpacity>

                    <View style={{ marginBottom: 100 }}></View>

                </View>
            </ScrollView>
            {/* Menu Modal */}
            <Modal
                visible={isMenuOpen}
                animationType="slide"
                transparent={true}
                onRequestClose={closeMenu}
            >
                <TouchableWithoutFeedback onPress={closeMenu}>
                    <View style={styles.menuModal}>
                        <TouchableOpacity style={commonStyles.menuItem} onPress={() => navigateToPage('Page1')}>
                            <Text style={commonStyles.menuItemText}>Page 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={commonStyles.menuItem} onPress={() => navigateToPage('Page2')}>
                            <Text style={commonStyles.menuItemText}>Page 2</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
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
    scrollViewContent: {
        flexGrow: 1,
    },
    image: {
        width: 150,
        height: 150,
    },
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    imageButtonContainer: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonBelow: {
        marginTop: 10,
    },
    menuModal: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GuestScreen;