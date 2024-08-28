import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { commonStyles } from './CommonStyles'; // Import common styles

const InformationScreen = () => {
    const navigation = useNavigation();

    const handlePhonePress = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };
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
                    <Text style={styles.sectionText}>צ'אט סיוע www.kolmila.co.il</Text>
                    <TouchableOpacity onPress={() => handlePhonePress('0528361202')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>052-8361202 וואטסאפ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('1202')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>1202 נשים</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('1203')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>1203 גברים</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('026730002')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>02-6730002 דתיות</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('046566813')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>04-6566813 דתיים</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('046566813')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>04-6566813 ערביות</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>סיוע משפטי</Text>
                    <TouchableOpacity onPress={() => handlePhonePress('036923791')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>03-6923791 ויצו: ייעוץ משפטי</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('0733927747')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>073-3927747/48/49/50  משרד המשפטים (יש מבחן זכאות כלכלית)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('18002003800')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>1-800-200-380 יד לאישה: למסורבות גט ועגונות</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('026712282')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>02-6712282  מבוי סתום: למסורבות גט ועגונות (ייעוץ משפטי חינמי, ייצוג משפטי בתשלום סמלי)</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>מידע נוסף:</Text>
                    <TouchableOpacity onPress={() => handlePhonePress('118')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>118 מוקד משרד הרווחה</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('0557000128')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>055-7000128 מוקד משרד הרווחה סיוע בסמס</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('18002200000')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>1-800-220-000 מוקד משרד הרווחה אלימות במשפחה</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('*6724')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>*6724 ל.א "לא לאלימות נגד נשים"</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('*9201')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>*9201 נעמת - קו סיוע לנשים במצבי משבר. אפשרות לייעוץ משפטי.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('18002923333')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>1800-292333 בת מלך: קו סיוע לנשים מהציבור הדתי והחרדי</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('089965008')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>08-9965008 נעם: קו סיוע לנשים ערביות במרכז</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('*3980')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>3980* עמותת ויצו: קו ייעוץ ותמיכה לנשים </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('18003939044')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>1-800-393-904 עמותת ויצו: קו סיוע לגברים </Text>
                    </TouchableOpacity>
                </View>

                {/* New Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>קווי חירום לנשים מוכות</Text>
                    <TouchableOpacity onPress={() => handlePhonePress('*6724')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>קו לתמיכה, סיוע והכוונה, פעיל 24/7, *6724</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('118')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>קו חירום ארצי לאלימות במשפחה, פועל 24/7 בשפות: עברית, ערבית, רוסית ואמהרית, חלק ממוקד משרד הרווחה- 118</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>קווי סיוע לגברים אלימים</Text>
                    <TouchableOpacity onPress={() => handlePhonePress('18003939044')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>קו סיוע לגברים אלימים –ויצו- 1-800-393904</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('036996843')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>העמותה למניעת אלימות במשפחה- "בית נועם"- 03-6996843</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>מרכזי סיוע לנפגעי תקיפה מינית</Text>
                    <TouchableOpacity onPress={() => handlePhonePress('1202')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>מרכז הסיוע לנפגעות ונפגעי תקיפה מינית, פועל 24/7- 1202</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('035176176')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>מרכז סיוע- תל אביב- 03-5176176</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('026255558')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>מרכז סיוע- ירושלים- 02-6255558</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('086421313')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>מרכז סיוע- באר-שבע- 08-6421313</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('088318425')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>מרכז סיוע השפלה "תאיר"- 08-8318425 , 08-8318426 , חירום: 08-9318470</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('0507557331')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>מרכז סיוע- אילת- 050-7557331</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('046566813')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>מרכז סיוע- נצרת- 04-6566813</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('026730002')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>מרכז סיוע לנשים דתיות– "תהל"- 02-673002</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('025328000')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>גברים ונערים דתיים נפגעי  תקיפה מינית- 02-5328000</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>מרכזי סיוע לילדים ונוער</Text>
                    <TouchableOpacity onPress={() => handlePhonePress('*6935')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>אל"י- האגודה להגנת הילד- *6935</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('026780606')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>המועצה לשלום הילד- 02-6780606</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('025907007')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>פגיעות מיניות בילדים-"מיטל"- 02-5907007</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('035449092')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>סיוע ומחסה לנוער- "מקום אחר", בזל 16 תל-אביב- 03-5449092</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('036477898')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>נוער במצבי סיכון ומצוקה- "על"ם"- 03-6477898</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>מרכזי סיוע לנשים עגונות ומסורבות גט</Text>
                    <TouchableOpacity onPress={() => handlePhonePress('026712282')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>תמיכה ליווי משפטי וסוציאלי למסורבות גט ולעגונות- "מבוי סתום"- 02-6712282</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('18002003800')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>סיוע לנשים עגונות ומסורבות גט- "יד לאשה"- 1-800-200-380</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>אחרים</Text>
                    <TouchableOpacity onPress={() => handlePhonePress('036123990')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>אפליית נשים בעבודה- שדולת הנשים- 03-6123990</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePhonePress('039299533')}>
                        <Text style={[styles.sectionText, styles.phoneNumber]}>ייצוג נפגעי עבירה- מרכז "נגה"- 03-9299533</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Go Back</Text>
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