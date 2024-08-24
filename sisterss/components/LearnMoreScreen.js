import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import { commonStyles } from './CommonStyles';

const LearnMoreScreen = ({ navigation }) => {
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("Video has finished playing!");
        }
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.teamTitle}>מידע נוסף שאת יכולה ללמוד</Text>
                <Text style={styles.warningText}>
                    חשוב לציין כי צפייה בסרטוני הדרכה על הגנה עצמית עשויה להיות קשה לצפייה. מומלץ לשלב אימון מקצועי בנוסף ללמידה מקוונת.
                </Text>
                <Text style={styles.description}>
                    לימוד הגנה עצמית הוא חיוני להעצמה אישית ובטיחות בעולם של היום. זה מצייד אנשים עם מיומנויות חיוניות כדי להגן על עצמם במצבים בלתי צפויים, מטפח ביטחון ותחושת שליטה על רווחתם. מעבר לטכניקות פיזיות, אימון הגנה עצמית מטפח מודעות, חשיבה אסטרטגית ויכולת להעריך ולהגיב לאיומים פוטנציאליים ביעילות. על ידי שליטה במיומנויות אלו, אנשים לא רק משפרים את יכולתם להתגונן מפני פגיעה פיזית אלא גם מפתחים חשיבה של חוסן ומוכנות, התורמים לסביבה בטוחה ובטוחה יותר עבור עצמם ועבור הסובבים אותם.
                </Text>
                <Text style={[styles.introductionText, { fontWeight: 'bold' ,writingDirection: 'rtl'}]}>
                    לפנייך מספר סרטוני הדרכה על הגנה עצמית:
                </Text>
                
                <YoutubeIframe
                    height={180}
                    play={playing}
                    videoId={"sunA76pLXJA"}
                    onChangeState={onStateChange}
                />
                <Text style={styles.description}>
                    הגנה נגד איום אקדח לראש בכניעה
                </Text>
                
                <YoutubeIframe
                    height={180}
                    play={playing}
                    videoId={"N9nqtz1Adec"}
                    onChangeState={onStateChange}
                />
                <Text style={styles.description}>
                    שלוש יציאות מחניקה אחורית בעמידה
                </Text>
               
                <YoutubeIframe
                    height={180}
                    play={playing}
                    videoId={"k7ioHeQcMNM"}
                    onChangeState={onStateChange}
                />
                 <Text style={styles.description}>
                    שחרור מחניקה קדמית
                </Text>
                
                <YoutubeIframe
                    height={180}
                    play={playing}
                    videoId={"WomWAvOXoE0"}
                    onChangeState={onStateChange}
                />
                <Text style={styles.description}>
                    הגנה עצמית מתקיפה מינית
                </Text>
                <Text style={[styles.introductionText, { fontWeight: 'bold' ,writingDirection: 'rtl'}]}>
                    נושאים נוספים ללימוד:
                </Text>
                <Text style={styles.additionalDescription}>
                    - זיהוי סימנים של אלימות ואיומים
                </Text>
                <Text style={styles.additionalDescription}>
                    - אפשרויות לדיווח ולקבלת עזרה
                </Text>
                <Text style={styles.additionalDescription}>
                    - פעולות להגנה במצבי חירום נוספים
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>חזרה אחורה</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        ...commonStyles.container,
        padding: 20,
    },
    title: {
        ...commonStyles.title,
        marginBottom: 10,
        color: '#ff7f9e', // Purple color
    },
    description: {
        ...commonStyles.contentText,
        marginBottom: 20,
        color: '#333', // Dark grey color
    },
    warningText: {
        ...commonStyles.contentText,
        marginBottom: 20,
        color: 'red', // Red color for warning
        fontStyle: 'italic',
    },
    teamTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff7f9e', // Green color
        writingDirection: 'rtl',
    },
    memberRole: {
        fontSize: 16,
        color: '#333', // Dark grey color
        writingDirection: 'rtl',
    },
    button: {
        backgroundColor: '#ff7f9e',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        margin: 15,
        borderRadius: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    additionalDescription: {
        ...commonStyles.contentText,
        marginBottom: 10,
        color: '#333', // Dark grey color
        fontStyle: 'italic',
    },
});

export default LearnMoreScreen;
