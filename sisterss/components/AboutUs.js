import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { commonStyles } from './CommonStyles';

const AboutUs = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.teamTitle}>אודותינו</Text>
            <Text style={styles.description}>
                אתר זה נוצר על ידי שתי סטודנטיות ממכללת SCE, כחלק מפרויקט הגמר במחלקת הנדסת תוכנה.
                אנו מתמקדות ביצירת משאבים ידידותיים ומועילים למשתמש ולקהילה. האתר הזה הוא תוצאה של המחויבות
                שלנו לספק מידע ותמיכה ערכית לאלה שזקוקים.
            </Text>
            <Text style={styles.additionalDescription}>
                אנו משתדלים להביא לך את המידע החשוב והמעודכן ביותר.
                האתר שלנו מהווה מרכז מידע מהימן לקהל הרחב, ואנו
                מחויבים להפוך אותו למקום נגיש ושימושי לכולם.
            </Text>
            <Text style={styles.teamTitle}>תכירו את הצוות שלנו:</Text>
            <View style={styles.teamMember}>
                <Text style={styles.teamTitle}>רותם חדד</Text>
                <Text style={styles.memberRole}>מפתחת תוכנה</Text>
            </View>
            <View style={styles.teamMember}>
                <Text style={styles.teamTitle}>אורטל נוסיק</Text>
                <Text style={styles.memberRole}>מפתחת תוכנה</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...commonStyles.container,
        padding: 20,
        backgroundColor: '#FFC0CB', // Pink background color
    },
    title: {
        ...commonStyles.title,
        marginBottom: 10,
        color: '#800080', // Purple color
    },
    description: {
        ...commonStyles.contentText,
        marginBottom: 20,
        color: '#333', // Dark grey color
    },
    additionalDescription: {
        ...commonStyles.contentText,
        marginBottom: 20,
        color: '#333', // Dark grey color
        fontStyle: 'italic',
    },
    teamMember: {
        marginBottom: 10,
    },
    teamTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#800080', // Green color
        writingDirection: 'rtl',

    },
    memberRole: {
        fontSize: 16,
        color: '#333', // Dark grey color
        writingDirection: 'rtl',

    },
});

export default AboutUs;
