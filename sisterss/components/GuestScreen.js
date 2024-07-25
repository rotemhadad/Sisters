import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { commonStyles } from './CommonStyles';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const GuestScreen = ({ navigation }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openMenu = () => {
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const navigateToPage = (pageName) => {
        navigation.navigate(pageName);
        closeMenu();
    };

    return (
        <View style={commonStyles.container}>
            <View style={commonStyles.topButtons}>
                <TouchableOpacity style={commonStyles.topButton} onPress={() => navigation.navigate('מאמרים')}>
                    <MaterialIcons name="article" size={24} color="#fff" />
                    <Text style={commonStyles.buttonText}>מאמרים</Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.topButton} onPress={() => navigation.navigate('מידע')}>
                    <MaterialIcons name="info" size={24} color="#fff" />
                    <Text style={commonStyles.buttonText}>מידע </Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.topButton} onPress={() => navigation.navigate('שאלון זיהוי')}>
                    <MaterialIcons name="quiz" size={24} color="#fff" />
                    <Text style={commonStyles.buttonText}>שאלון</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={commonStyles.content}>
                    <View style={styles.imageRow}>
                        <View style={styles.imageButtonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('תמרורי אזהרה')}>
                                <Image source={require('../Images/8.png')} style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyles.button, styles.buttonBelow]} onPress={() => navigation.navigate('תמרורי אזהרה')}>
                                <MaterialIcons name="warning" size={24} color="#fff" />
                                <Text style={commonStyles.buttonTextnext}> אזהרה בזוגיות</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.imageButtonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('סוגי אלימות')}>
                                <Image source={require('../Images/15.png')} style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyles.button, styles.buttonBelow]} onPress={() => navigation.navigate('סוגי אלימות')}>
                                <MaterialIcons name="pan-tool" size={24} color="#fff" />
                                <Text style={commonStyles.buttonTextnext}>סוגי אלימות </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.imageRow}>
                        <View style={styles.imageButtonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('תמרורי אזהרה לסביבה')}>
                                <Image source={require('../Images/9.png')} style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyles.button, styles.buttonBelow]} onPress={() => navigation.navigate('תמרורי אזהרה לסביבה')}>
                                <MaterialIcons name="people" size={24} color="#fff" />
                                <Text style={commonStyles.buttonTextnext}> אזהרה לסביבה</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.imageButtonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('זכויות משפטיות')}>
                                <Image source={require('../Images/2.png')} style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyles.button, styles.buttonBelow]} onPress={() => navigation.navigate('זכויות משפטיות')}>
                                <MaterialIcons name="gavel" size={24} color="#fff" />
                                <Text style={commonStyles.buttonTextnext}>זכויות משפטיות</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.imageRow}>
                        <View style={styles.imageButtonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('מידע ממשלתי')}>
                                <Image source={require('../Images/14.png')} style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyles.button, styles.buttonBelow]} onPress={() => navigation.navigate('מידע ממשלתי')}>
                                <MaterialIcons name="account-balance" size={24} color="#fff" />
                                <Text style={commonStyles.buttonTextnext}>מידע ממשלתי</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.imageButtonContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('הגנה עצמית')}>
                                <Image source={require('../Images/16.png')} style={styles.image} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[commonStyles.button, styles.buttonBelow]} onPress={() => navigation.navigate('הגנה עצמית')}>
                                <MaterialIcons name="security" size={24} color="#fff" />
                                <Text style={commonStyles.buttonTextnext}>הנחיות להתגוננות</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
        
                    <TouchableOpacity style={commonStyles.button} onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={24} color="#fff" />
                        <Text style={commonStyles.buttonText}>חזרה אחורה</Text>
                    </TouchableOpacity>
                    <View style={{ marginBottom: 100 }}></View>
                </View>
            </ScrollView>
            <Modal
                visible={isMenuOpen}
                animationType="slide"
                transparent={true}
                onRequestClose={closeMenu}
            >
                <TouchableWithoutFeedback onPress={closeMenu}>
                    <View style={styles.menuModal}>
                        <TouchableOpacity style={commonStyles.menuItem} onPress={() => navigateToPage('זכויות משפטיות')}>
                            <MaterialIcons name="gavel" size={24} color="#fff" />
                            <Text style={commonStyles.menuItemText}>זכויות משפטיות</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            {/* <View style={commonStyles.bottomToolbar}>
                <TouchableOpacity style={commonStyles.menuButton} onPress={openMenu}>
                    <MaterialIcons name="menu" size={24} color="#fff" />
                    <Text style={commonStyles.menuButtonText}>תפריט</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    image: {
        width: 130,
        height: 130,
        borderRadius:10,
    },
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 1,
    },
    imageButtonContainer: {
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 2,
    },
    buttonBelow: {
        marginTop: 2,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ff7f9e',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 15,
        width: '100%',
        justifyContent: 'center',
    },
    menuModal: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GuestScreen;