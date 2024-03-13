import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from './CommonStyles'; // Import common styles

const InformationScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>מידע חשוב</Text>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>אל תגידי לי זה לא יקרה!</Text>
                </View>

                {/* קבלת ייעוץ וליווי מקצועי */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>קבלת ייעוץ וליווי מקצועי</Text>
                    <Text style={styles.sectionText}>עלייך לוודא שהגורם אכן מומחה בתחום. חשוב מאוד לשתף גם קרוב/ת משפחה.</Text>
                </View>


                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>מרכזי הסיוע לנפגעי/ות תקיפה מינית</Text>
                    <Text style={styles.sectionText}>צ’אט סיוע www.kolmila.co.il</Text>
                    <Text style={styles.sectionText}>052-8361202 וואטסאפ</Text>
                    <Text style={styles.sectionText}>1202 נשים</Text>
                    <Text style={styles.sectionText}>1203 גברים</Text>
                    <Text style={styles.sectionText}>02-6730002 דתיות</Text>
                    <Text style={styles.sectionText}>04-6566813 דתיים</Text>
                    <Text style={styles.sectionText}>04-6566813 ערביות</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>סיוע משפטי</Text>
                    <Text style={styles.sectionText}>03-6923791 ויצו: ייעוץ משפטי</Text>
                    <Text style={styles.sectionText}>073-3927747/48/49/50  משרד המשפטים (יש מבחן זכאות כלכלית)</Text>
                    <Text style={styles.sectionText}>1-800-200-380 יד לאישה: למסורבות גט ועגונות</Text>
                    <Text style={styles.sectionText}>02-6712282  מבוי סתום: למסורבות גט ועגונות (ייעוץ משפטי חינמי, ייצוג משפטי בתשלום סמלי)</Text>
                </View>


                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>מידע נוסף:</Text>
                    <Text style={styles.sectionText}>118 מוקד משרד הרווחה</Text>
                    <Text style={styles.sectionText}>055-7000128 מוקד משרד הרווחה סיוע בסמס</Text>
                    <Text style={styles.sectionText}>1-800-220-000 מוקד משרד הרווחה אלימות במשפחה</Text>
                    <Text style={styles.sectionText}>*6724 ל.א "לא לאלימות נגד נשים"</Text>
                    <Text style={styles.sectionText}>*9201 נעמת - קו סיוע לנשים במצבי משבר. אפשרות לייעוץ משפטי.</Text>
                    <Text style={styles.sectionText}>1800-292333 בת מלך: קו סיוע לנשים מהציבור הדתי והחרדי</Text>
                    <Text style={styles.sectionText}>08-9965008 נעם: קו סיוע לנשים ערביות במרכז</Text>
                    <Text style={styles.sectionText}>3980* עמותת ויצו: קו ייעוץ ותמיכה לנשים </Text>
                    <Text style={styles.sectionText}>1-800-393-904 עמותת ויצו: קו סיוע לגברים </Text>
                </View>
            </ScrollView >

            < TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity >
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#ff7f9e',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#ff7f9e',
    },
    sectionText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
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

export default InformationScreen;
