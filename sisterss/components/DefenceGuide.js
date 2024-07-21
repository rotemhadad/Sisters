import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { commonStyles } from './CommonStyles'; // Import common styles


const DefenceGuide = ({ navigation }) => {
    // const navigation = useNavigation();
    const [selectedChoice, setSelectedChoice] = useState(null);

    const choices = [
        {
            title: 'הנחיות לאישה נפגעת אלימות הגרה עם התוקף',
            information: 'אם את חיה עם בן זוג אלים, ישנן מספר פעולות שמומלץ לפעול על פיהן כדי לשמור על ביטחונך ובטחון ילדייך:\n\n- נסי לזהות התנהגות מקדימה להתפרצות אלימה ובדקי את האפשרויות שלך להתרחק לפני האירוע;\n- נסי לשחזר ולזהות התנהגויות אשר סייעו בעבר להפחתת הפגיעות ובדקי האם ניתן להמשיך בהן;\n- הכירי את שכנייך ושמרי קשר עם חברים;\n- סכמי עם אדם קרוב על קוד מסוים אשר יאותת להם שאת נמצאת בסכנה ויאפשר להם לפעול לעזרתך;\n- זכרי מספרי טלפון חשובים: משטרה, מגן דוד אדום, מוקד הרווחה, שכנים, בני משפחה וכדומה;'
        },
        {
            title: 'הנחיות לאישה הגרה בנפרד או שבן זוגה הורחק',
            information: 'אם את חיה בנפרד מבן זוג אלים או שבן זוגך הורחק, ישנן מספר פעולות שמומלץ לפעול על פיהן כדי לשמור על ביטחונך ובטחון ילדייך:\n\n- החליפי מנעולים;\n- הוסיפי אמצעי בטיחות ככל יכולתך: סורגים, שער ברזל, אזעקה, מצלמות, אורות חיצוניים וכדומה;\n- שתפי את השכנים הקרובים במצב ובקשי שיודיעו לך כשרואים את בן זוגך באזור או שיתקשרו למשטרה;\n- הבטיחי שהמטפלות, הגננות והמורות של הילדים יודעות למי יש סמכות לקחת את הילדים והזהירי מפני חטיפה;\n- שמרי את צו ההרחקה קרוב והשאירי העתק לשכנים, לחברים ולקרובים;'
        }
    ];
    const handleChoicePress = (index) => {
        setSelectedChoice(selectedChoice === index ? null : index);
    };
    return (
        <View style={styles.container}>
            <ScrollView style={commonStyles.container}>
                <View style={commonStyles.content}>
                    <View style={commonStyles.header}>
                        <Text style={commonStyles.headerText}>הנחיות להתגוננות במצבי סיכון מיידיים</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>התרחקות מיידית מהמקום:</Text>
                        <Text style={styles.sectionText}>
                            בעת סכנה מיידית, הדבר הטוב ביותר שכדאי לעשות, אם ניתן הוא להתרחק מן המקום במהירות האפשרית.
                            מומלץ לתכנן מסלול בריחה מהירות ולתרגל אותו.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>הכנת תיק מראש:</Text>
                        <Text style={styles.sectionText}>
                            למקרה שבו יעלה צורך לברוח מהבית באופן מיידי כדאי להכין מראש תיק עם חפצים אישיים.
                            {'\n'}
                            הכנה לתיק כוללת ציוד אישי למספר ימים, פרטי חשבון בנק, רשימת כתובות וטלפונים, כסף מזומן, תעודת זהות כרטיס קופת חולים ומסמכים אישיים.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>קריאה לעזרה:</Text>
                        <Text style={styles.sectionText}>
                            אם אין ביכולתך לעזוב את המקום, יש להזמין מייד את המשטרה או אנשים אחרים אשר יכולים להתערב ולפעול להפסקת האלימות.
                            באפשרותך להתקשר גם למוקד החירום של משרד הרווחה לטלפון 118 או לשלוח הודעה כתובה למוקד החירום למספר 050-2270118.
                            {'\n'}
                            אם לא ניתן לעשות זאת, יש לצעוק לעזרה ולנסות להסתתר בחדר נעול.
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>שיתוף אדם קרוב:</Text>
                        <Text style={styles.sectionText}>
                            אם הופעלה נגדך אלימות כלשהי, מומלץ לשתף אדם קרוב ולתאר בפניו את שארע.
                            חשוב שיהיה לך שכן או שכנה, חבר או חברה שיהיו מודעים למצב ויעזרו בשעת הצורך.
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>פנייה למקום מוגן:</Text>
                        <Text style={styles.sectionText}>
                            לאחר שעזבת את מקום הסכנה המיידית, יש לפנות למקום המאפשר לך שהות בטוחה.
                            כדאי להיעזר במשפחה וחברים, ובכל שלב ניתן ומומלץ לפנות לקווי החירום (118) הפועלים 24 שעות ביממה, אשר יעזרו לך באיתור מקום בטוח.
                        </Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>פנייה לגורמים מקצועיים:</Text>
                        <Text style={styles.sectionText}>
                            חשוב לפנות לגורמים המקצועיים המטפלים באלימות במשפחה, אשר יוכלו להעניק לך שירותי הגנה, ליווי, טיפול, ייעוץ כללי וייעוץ משפטי.                    </Text>
                    </View>
                    <View style={[styles.section, styles.importantSection]}>
                        <Text style={styles.sectionWarning}>שימו לב:</Text>
                        <Text style={[styles.sectionText, styles.importantText]}>
                            עזיבה ובריחה מאדם אלים עלולה להגביר את האלימות מצדו ובחלק מהמקרים, לעלות בחיי אדם.
                            אם ברצונך לעזוב, יש לעשות זאת ללא הכנה מראש של התוקף, מבלי ניסיון לדבר ולהסביר והכי חשוב - לעולם לא לעשות זאת לבד.
                            {'\n'}
                            פנייה אל גורמי מקצוע ואנשים קרובים אשר יסייעו לך יכולה להציל את חייך.
                        </Text>
                    </View>

                </View>
                <View style={commonStyles.content}>
                    {choices.map((choice, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleChoicePress(index)}
                            style={[
                                commonStyles.choiceContainer,

                                { backgroundColor: selectedChoice === index ? '#ff7f9e' : 'transparent' } // Set background color
                            ]}  >
                            <Text
                                style={[
                                    styles.sectionTitle, {
                                        color: selectedChoice === index ? 'black' : '#ff7f9e',
                                        marginTop: 10,
                                        fontSize: selectedChoice === index ? 20 : 16
                                    }]} >
                                {choice.title}
                            </Text>
                            {selectedChoice === index && (
                                <Text
                                    style={[styles.sectionText, { fontSize: 16 }]}>
                                    {choice.information}
                                </Text>
                            )}
                        </TouchableOpacity>
                    ))}
                    <Text style={commonStyles.contentText}>
                        המידע נלקח מאתר https://www.gov.il/
                    </Text>

                </View>
            </ScrollView>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>חזרה אחורה</Text>
            </TouchableOpacity>
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

        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#ff7f9e',
        writingDirection: 'rtl',
    },
    // sectionWarning: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     marginBottom: 10,
    //     color: 'red',
    // },
    // sectionText: {
    //     fontSize: 16,
    //     marginBottom: 5,
    //     color: '#333',
    // },
    button: {
        backgroundColor: '#ff7f9e',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        margin: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    section: {
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    importantSection: {
        backgroundColor: '#D3D3D3', // Gray

    },
    sectionWarning: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
        color: 'black', // White color
        writingDirection: 'rtl',
    },
    sectionText: {
        fontSize: 16,
        color: '#333',
        writingDirection: 'rtl',
    },
    importantText: {
        color: 'black',
        fontSize: 18,
        marginTop: 10,
        writingDirection: 'rtl',
    },
});

export default DefenceGuide;
