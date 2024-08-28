import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Image, TouchableWithoutFeedback, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles } from './CommonStyles';

const GuestScreen = () => {
    const navigation = useNavigation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const fadeAnim = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const openMenu = () => setIsMenuOpen(true);
    const closeMenu = () => setIsMenuOpen(false);
    const navigateToPage = (pageName) => {
        navigation.navigate(pageName);
        closeMenu();
    };

    const renderCard = (icon, title, navigateTo, image) => (
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
            <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
                <Image source={image} style={styles.cardImage} />
                <LinearGradient
                    colors={['#ff7f9e', '#F43169']}
                    style={styles.cardContent}
                >
                    <MaterialIcons name={icon} size={24} color="#fff" />
                    <Text style={styles.cardTitle}>{title}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#ff7f9e', '#F43169']}
                style={styles.header }
            >
                 <TouchableOpacity  onPress={() => navigation.navigate('מאמרים')}>
                    <MaterialIcons name="article" size={24} color="#fff" />
                    <Text style={commonStyles.buttonText}>מאמרים</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigation.navigate('מידע')}>
                    <MaterialIcons name="info" size={24} color="#fff" />
                    <Text style={commonStyles.buttonText}>מידע </Text>
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.topButton} onPress={() => navigation.navigate('שאלון זיהוי')}>
                    <MaterialIcons name="quiz" size={24} color="#fff" />
                    <Text style={commonStyles.buttonText}>שאלון</Text>
                </TouchableOpacity>
            </LinearGradient>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.cardContainer}>
                    {renderCard("warning", "אזהרה בזוגיות", "תמרורי אזהרה", require('../Images/8.png'))}
                    {renderCard("psychology", "סוגי אלימות", "סוגי אלימות", require('../Images/15.png'))}
                    {renderCard("people", "אזהרה לסביבה", "תמרורי אזהרה לסביבה", require('../Images/9.png'))}
                    {renderCard("gavel", "זכויות משפטיות", "זכויות משפטיות", require('../Images/2.png'))}
                    {renderCard("policy", "מידע ממשלתי", "מידע ממשלתי", require('../Images/14.png'))}
                    {renderCard("security", "התגוננות", "הגנה עצמית", require('../Images/16.png'))}
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('משחקים')}>
                    <LinearGradient
                        colors={['#ff7f9e', '#F43169']}
                        style={styles.buttonGradient}
                    >
                        <MaterialIcons name="videogame-asset" size={24} color="#fff" />
                        <Text style={styles.buttonText}>משחקים</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
            <Modal
                visible={isMenuOpen}
                animationType="slide"
                transparent={true}
                onRequestClose={closeMenu}
            >
                <TouchableWithoutFeedback onPress={closeMenu}>
                    <View style={styles.menuModal}>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigateToPage('זכויות משפטיות')}>
                            <MaterialIcons name="gavel" size={20} color="#fff" />
                            <Text style={styles.menuItemText}>זכויות משפטיות</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    scrollViewContent: {
        padding: 20,
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3,
        backgroundColor: '#fff',
    },
    cardImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 10,
        alignItems: 'center',
    },
    cardTitle: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    menuModal: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C8A2C8',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
    },
    menuItemText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#fff',
    },
});

export default GuestScreen;