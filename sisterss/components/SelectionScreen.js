import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from './CommonStyles';

const SelectionScreen = ({ navigation }) => {
    const [showGInfo, setGShowInfo] = useState(false);
    const [showUInfo, setUShowInfo] = useState(false);

    const renderInfoModal = () => {
        if (showGInfo) {
            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showGInfo}
                    onRequestClose={() => setGShowInfo(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>מידע על הרשמה כשומרת</Text>
                            <Text style={styles.modalText}>
                                כמשתמשת שומרת באפליקציה שלנו, יש לך אחריות. כשומרת, תהיה לך גישה מיוחדת לתוכן ולפעילויות באפליקציה. את יכולה לנהל תוכן, לנהל פעילויות ולדווח למנהלי האתר. כשומרת, אנו מצפים ממך להשתמש בכוחותיך באופן אחראי ולתרום לחווית המשתמש שלנו באופן חיובי. כדי להבטיח שהשימוש שלך באפליקציה תהיה הכי טובה, זכרי לקרוא את ההנחיות ולפעול בהתאם למדיניות השימוש והפרטיות שלנו.
                            </Text>
                            <TouchableOpacity onPress={() => setGShowInfo(false)}>
                                <Text style={styles.closeButton}>סגור</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            );
        } else if (showUInfo) {
            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showUInfo}
                    onRequestClose={() => setUShowInfo(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>מידע על הרשמה כמשתמשת</Text>
                            <Text style={styles.modalText}>
                                כמשתמשת באפליקציה שלנו, אנו רואים בך אדם חשוב. האפליקציה שלנו מספקת כלים ומשאבים שיכולים לסייע לך בתהליכים שונים. זהו מקום בו תוכלי לשתף אחרים, לקבל תמיכה, ולהתנהל בצורה שתעזור לך להתמודד עם האתגרים שבהם את נתקלת. באפליקציה שלנו, תוכלי לפרסם פוסטים, להשתתף בצ'אטים, ולהשתמש במגוון של כלים לתמיכה והתמודדות עם המציאות היומיומית. באפליקציה שלנו תמצאי סביבה תומכת ונעימה, שבה תוכלי להרגיש בנוח ובטוח לחלוק את החוויות, הרגשות והדעות שלך ולהיות חלק מקהילת המשתמשים של Sisters.
                            </Text>
                            <TouchableOpacity onPress={() => setUShowInfo(false)}>
                                <Text style={styles.closeButton}>סגור</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            );
        }
        return null;
    };

    return (
        <View style={commonStyles.container}>
            <Text style={styles.contentText}>
                ברוכה הבאה!{'\n'} בחרי את האופציה המתאימה לך
            </Text>
            <TouchableOpacity
                style={commonStyles.button}
                onPress={() => navigation.navigate('התחברות')}
            >
                <View style={styles.buttonContent}>
                    <Text style={commonStyles.buttonText}>הירשמי בתור שומרת</Text>
                    <TouchableOpacity onPress={() => setGShowInfo(true)}>
                        <Text style={styles.questionMark}>?</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={commonStyles.button}
                onPress={() => navigation.navigate('הרשמה')}
            >
                <View style={styles.buttonContent}>
                    <Text style={commonStyles.buttonText}>הירשמי בתור משתמשת</Text>
                    <TouchableOpacity onPress={() => setUShowInfo(true)}>
                        <Text style={styles.questionMark}>?</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={commonStyles.button}
                onPress={() => navigation.navigate('התחברות')}
            >
                <Text style={commonStyles.buttonText}>התחברי</Text>
            </TouchableOpacity>
            {renderInfoModal()}
        </View>
    );
};


const styles = StyleSheet.create({
    contentText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
        writingDirection: 'rtl',

    },
    buttonContent: {
        flexDirection: 'row', // Align children horizontally
        alignItems: 'center', // Align children vertically
         writingDirection: 'rtl',

    },
    questionMark: {
        fontSize: 24, // Increase font size here
        color: '#F43169',
        marginLeft: 5, // Add space between the text and the question mark
    },
    closeButton: {
        color: 'blue',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default SelectionScreen;