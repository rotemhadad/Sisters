import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CommonScreen = () => {
    const navigation = useNavigation();

    const choices = [
        {
            title: 'מה זו אלימות בזוגיות?',
            information: 'אלימות בזוגיות היא תופעה נפוצה במערכת יחסים קיימת, במהלך פרידה ו/או אחריה, בכל חלקי החברה. המכנה המשותף לסוגים הרבים של אלימות בזוגיות הוא התנהגויות שתלטניות, מפחידות ומשפילות, שמצמצמות את חופש הפעולה וההחלטה של אחד מבני הזוג, לרוב האישה. אלימות בזוגיות גובה מחיר כבד מהנפגעים והנפגעות, מהמשפחה ומהחברה, ולכן חשוב לזהות ולמנוע אותה.'
        },
        {
            title: 'איך אני יכולה לדעת אם אני נפגעת מאלימות?',
            information: 'תוכלי להתייעץ בקו 106 או לענות על הסקר האנונימי באפליקציה.'
        },
        {
            title: 'איך ניתן לעזור לחברה שנרדפת?',
            information: 'פני לגורם מקצועי, הרחיקי אותה בנכונות מהגורם הפוגע ואל תשאירי אותה לבד.'
        },
        {
            title: 'מתי והאם כדאי להתייעץ?',
            information: 'שנן התנהגויות ותחושות שמאפיינות זוגיות שאיננה בריאה, או מיטיבה, לעיתים הן מעידות על זוגיות שיכולה להתפתח בה אלימות. בכל מצב של חשש כדאי להתייעץ עם אנשי מקצוע אותם תוכל/י למצוא אצלנו באפליקציה.'
        },
        {
            title: 'איך אפשר להגן על עצמי במקרה של תקיפה?',
            information: 'כדאי לקחת פעולות הגנה עצמית.'
        },
        {
            title: 'מה עושים במקרה של ניסיון תקיפה מצד קרוב משפחה?',
            information: 'יש לערב את אפוטרופוס הילד התוקף ולפנות לגורמים מוסמכים בבית הספר.'
        },
        {
            title: 'איך יש לנהוג במקרה של חשד להטרדה מינית בעבודה?',
            information: 'יש לפנות למשטרה לפתיחת תיק לאסוף ראיות ולהגיש תלונה.'
        },
    ];

    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (index) => {
        if (expandedIndex === index) {
            setExpandedIndex(null); // Close the currently opened question
        } else {
            setExpandedIndex(index); // Expand the selected question
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>שאלות נפוצות</Text>
            </View>

            <ScrollView style={styles.content}>
                {choices.map((choice, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => toggleExpand(index)}
                        style={styles.questionContainer}
                    >
                        <Text style={styles.question}>{choice.title}</Text>
                        {expandedIndex === index && (
                            <Text style={styles.answer}>{choice.information}</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>חזרה אחורה</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
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
    content: {
        flex: 1,
    },
    questionContainer: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
    },
    question: {
        fontSize: 16,
        color: '#333',
        textAlign: 'right',
    },
    answer: {
        fontSize: 14,
        color: '#666',
        textAlign: 'right',
        marginTop: 10,
    },
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
});

export default CommonScreen;
