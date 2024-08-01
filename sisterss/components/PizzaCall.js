import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from './CommonStyles'; // Import common styles
import YoutubeIframe from 'react-native-youtube-iframe';

const PizzaCall = () => {
    const navigation = useNavigation();
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    const choices = [
        {
            title: 'למי אחייג כדי לנהל את שיחת הפיצה?',
            information: 'בהיותך בארץ יש לחייג למוקד 100\nבאפשרותך גם לקבוע עם איש/ת קשר שהינו/ה קרוב/ת משפחה או חבר/ה טוב/ה אשר תהווה עבורך כתווך בינך לגורמי המשטרה\nהשיחה הראשונה שנוהלה הייתה מארצות הברית בשנת 2019\nבה היא התקשרה למוקד 911 שהינו מוקד המשטרה של ארצות הברית\nהאירוע התפרסם וגם בארץ ישראל במוקד 100 קיבלו שיחה זהה בה המוקדנית הייתה עם אינטואיציה שהאישה בסכנה והזעיקה כוחות לאזור משלוח ה"הזמנה"'
        },
        {
            title: 'אם בזמן השיחה אני לא לבד?',
            information: 'אם יש מישהו לידך כדאי להוסיף תוספת.\n אופציית מענה: "אקח תוספת פטריות"\n התעקשי עם המוקד כי את צריכה להזמין וחזרי על הבקשה'
        },
        {
            title: 'המקרה מסכן חיים?',
            information: 'אם התוקף חמוש כדאי להוסיף שתייה.\n התעקשי עם המוקד כי את צריכה להזמין וחזרי על הבקשה'
        },
        {
            title: 'שאלות נוספות שהופיעו בשיחה ',
            information: 'לשאלה אם הגבר שמאיים עליה נמצא במקום, ענתה האישה: "כן, כן אנחנו רוצים עם זיתים ותירס". היא נשאלה אם יש לו נשק, וענתה: "לא, אנחנו לא רוצים קולה".'
        },        
        {
            title: 'הבאת הכתובת לפתיחת ההזמנה',
            information: 'כעת אחרי שהמוקד קיבל הנחיות על מצבך בצורה לא גלויה צייני להם את הכתובת ל"משלוח", מקומך בפועל.\nכדי שיקפיצו כוחות לאזור'
        },
    ];

    const handleChoicePress = (index) => {
        setSelectedChoice(selectedChoice === index ? null : index);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.title}>שיחת הפיצה</Text>
                </View>

                <View style={styles.introductionContainer}>
                    <Text style={styles.introductionText}>
                         בכותרת לרשותך לחצן מצוקה ברחבי האתר הלחצן  "התקשרי" .{"\n"}
                        בעת סכנה בזמן אמת ביכולתך ללחוץ עליו והוא יחייג ישירות למשטרה.
                    </Text>
                </View>
                
                <Text style={[styles.introductionText, { fontWeight: 'bold' }]}>
                    אבל מה זה שיחת הפיצה ולמה היא משומשת?
                </Text>

                

                <Text style={styles.introductionText}>
                    "הזמנת פיצה" מהמשטרה, והמוקדן הבין שהיא מאוימת: האזינו לשיחה
                    תושבת השרון התקשרה למוקד 100 והזמינה "פיצה". המוקדן הבין שהיא בסכנה,
                    שאל אותה אם היא מאוימת ואם יש נשק במקום - ואמר לה: "אם יש מישהו לידך,
                    הוסיפי אקסטרא." היא ענתה: "אקח אקסטרא פטריות."
                </Text>

                <YoutubeIframe
                    height={180}
                    play={playing}
                    videoId={"dT_nKx6n-o8"}
                    onChangeState={onStateChange}
                />

                <View style={commonStyles.content}>
                    {choices.map((choice, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleChoicePress(index)}
                            style={[
                                commonStyles.choiceContainer,
                                { backgroundColor: selectedChoice === index ? '#ff7f9e' : 'transparent' }
                            ]}
                        >
                            <Text
                                style={[
                                    styles.sectionTitle,
                                    {
                                        color: selectedChoice === index ? 'black' : '#ff7f9e',
                                        marginTop: 10,
                                        fontSize: selectedChoice === index ? 20 : 16,
                                        writingDirection: 'rtl'
                                    }
                                ]}
                            >
                                {choice.title}
                            </Text>
                            {selectedChoice === index && (
                                <Text style={[styles.sectionText, { fontSize: 16 }]}>
                                    {choice.information}
                                </Text>
                            )}
                        </TouchableOpacity>
                    ))}
                    <View style={styles.introductionContainer}>
                    <Text style={[styles.introductionText, { fontWeight: 'bold' }]}>
                            זכרי! הכנה מוקדמת הינה מתכון להצלת חיים
                        </Text>
                    </View>
                    <Text style={commonStyles.contentText}>
                        המידע נלקח מאתר https://www.ynet.co.il/
                    </Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>חזרה אחורה</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#ff7f9e',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    introductionContainer: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 15,
    },
    introductionText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'right',
        writingDirection: 'rtl',
    },
    videoContainer: {
        marginBottom: 20,
    },
    videoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 10,
    },
    video: {
        width: '100%',
        height: 200,
        borderRadius: 8,
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
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        writingDirection: 'rtl',
    },
    sectionText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'right',
        writingDirection: 'rtl',
    },
});

export default PizzaCall;
