import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const EnvWarningSigns = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>לא כמו פעם</Text>
            <View style={styles.questionContainer}>
                <Text style={styles.question}>1. היא לא מחייכת כמו פעם. היא הפכה לאדם פחות שמח ומתלהב. האור בעיניה כבוי.</Text>
                <Text style={styles.question}>2. היא בלי אנרגיה כשהיא איתך וגם בעבודה. היא מותשת. היא לא מרוכזת "הראש במקום אחר". היא לא הייתה ככה לפני כן.</Text>
                <Text style={styles.question}>3. שינוי במראה החיצוני: היא לובשת בגד שפחות מתאים לסגנון שלה, היא מסדרת אחרת את השיער בצורה אחרת מהטעם הרגיל שלה.</Text>
                <Text style={styles.question}>4. הידרדרות בריאותית: היא חולה לעיתים קרובות מהרגיל. היא יורדת במשקל. עייפות, שקיות שחורות מתחת לעיניים.</Text>
                <Text style={styles.question}>5. מצבי רוח קיצוניים עולים ויורדים. בוכה ללא הסבר (כאשר שואלים אותה, היא משיבה "הכל בסדר. הכל בסדר").</Text>
                <Text style={styles.question}>6. ההודעות שהיא כותבת לך בווטסאפ כתובות באופן שונה מהרגיל. יכול להיות שלא היא ניסחה/כתבה אותן?</Text>
            </View>

            <Text style={styles.heading}>התקדמות מהירה</Text>
            <View style={styles.questionContainer}>
                <Text style={styles.question}>1. היא מפתיעה אותך בדברים שקורים מהר - בהתקדמות ביניהם. בקשרים קודמים שלה זה לא היה מהר עד כדי כך.</Text>
                <Text style={styles.question}>2. היא מוצאת את עצמה במערכת יחסים סוחפת, מרגשת ואינטנסיבית כבר מתחילת הקשר. זמן קצר אחרי תחילת הקשר הוא אומר שהיא האשה של חייו. מעריץ את האדמה שהיא דורכת עליה. הוא נוקט בחיזור מתלהב, אינטנסיבי צפוף, מעריץ ומרגש.</Text>
                <Text style={styles.question}>3. הוא דוחף שהקשר יתקדם מהר מאד ויהיה רציני ומחייב: לעבור לגור ביחד, לקיים יחסי מין לא מוגנים (יתכן שהיא נכנסה להריון לא מתוכנן), להתחתן.</Text>
            </View>

            <Text style={styles.heading}>תירוצים</Text>
            <View style={styles.questionContainer}>
                <Text style={styles.question}>1. היא מדברת בשמו, מגינה עליו, מצדיקה אותו, מסבירה את ההתנהגות שלו: "הוא לא הגיע כי הוא עסוק"; אם הוא לא משתתף בשיחות אז היא אומרת שהוא ביישן. את ה'מעקב' אחריה בדאגה לשלומה היא מנמקת בכך ש ״הוא כל כך אוהב אותי ולכן הוא כל הזמן מתעניין איפה אני נמצאת״, "אני מבינה אותו. הוא דואג לי".</Text>
                <Text style={styles.question}>2. חשוב לה לשמור על שמו הטוב מולך, גם כשקרה משהו חריג.</Text>
                <Text style={styles.question}>3. היא מסנגרת עליו בצורה קיצונית ומוגזמת, בעיקר כאשר משמיעים באוזניה ביקורת עליו. זה יכול להגיע לאיום בניתוק קשר איתך.</Text>
            </View>

            <Text style={styles.heading}>עומד בינינו</Text>
            <View style={styles.questionContainer}>
                <Text style={styles.question}>1. הוא מגיע איתה למפגשים שלכן, יותר מהרגיל. יש ליווי שלו לכל מקום והגעה למפגשים עם משפחה /חברות.</Text>
                <Text style={styles.question}>2. הוא הרבה נמצא שם במפגשים שלכן, מסיע מחזיר.</Text>
                <Text style={styles.question}>3. הגעה למקום העבודה וחזרה, רק עם בן הזוג, או ברכבו.</Text>
                <Text style={styles.question}>4. את מוצאת עצמך מעמידה פנים ומתחנפת אליו; כדי שהוא לא ירחיק את חברתך ממך. כאשר את פוגשת את שניהם יחד, את מעמידה פנים שאת מחבבת אותו, מחשש שהוא ירחיק בינכן.</Text>
                <Text style={styles.question}>5. הוא יוצר קשר עם הסביבה הקרובה ללא ידיעתה, שופך את ליבו לגבי הקשיים שלו איתה, ומבקש מהם לשמור סוד וכך יכול לגרום לסכסוך בינם ולבינה.</Text>
                <Text style={styles.question}>6. אין לך שיחות נפש איתה כמו בעבר. היא לא משתפת אותך במה שקורה ביניהם.</Text>
            </View>

            <Text style={styles.heading}>ריחוק</Text>
            <View style={styles.questionContainer}>
                <Text style={styles.question}>1. השיחות ביניכן קצרות יותר.</Text>
                <Text style={styles.question}>2. הקשר ביניכן נחלש כי היא מתרחקת. יש קושי לקבוע איתה מפגש. ביטולים חוזרים ונשנים של הגעה למפגשים חברתיים ומשפחתיים. היא כבר לא ספונטנית כמו פעם.</Text>
                <Text style={styles.question}>3. באופן לא אופייני לה, שוב ושוב היא מבטלת לכן פגישות שקבעתן בלעדיו, ברגע האחרון. לפעמים היא מסבירה שזה כי הוא לא מרגיש טוב או סיבה אחרת.</Text>
                <Text style={styles.question}>4. יציאה שלה מקבוצות ווטסאפ ו/או מחיקת חברים מהרשתות החברתיות ו/או מחיקת אנשי קשר מהנייד (מחיקה של חברים מהעבר).</Text>
                <Text style={styles.question}>5. מעבר דירה למקום מרוחק יותר (כמו מעבר עיר או מעבר לחו"ל).</Text>
            </View>

            <Text style={styles.heading}>בולש אחריה</Text>
            <View style={styles.questionContainer}>
                <Text style={styles.question}>1. הבעת חשש מאיחור בשיבה הביתה או מהתעכבות ללא הודעה.</Text>
                <Text style={styles.question}>2. הוא מפתיע אותה במקום העבודה שלה ובמקומות אחרים.</Text>
                <Text style={styles.question}>3. הוא מתקשר אליה כל הזמן בזמן שאתן נפגשות וגם בזמן שאתן משוחחות בטלפון (הוא על ממתינות). את מדברת איתה בטלפון, והוא מתקשר אליה מהקו השני באובססיביות.</Text>
                <Text style={styles.question}>4. טלפונים/סמסים בתדירות גבוהה מאד מצד בן הזוג. את משוחחת איתה בטלפון והוא כל הזמן בממתינה. את מרגישה שהיא מתוחה בזמן השיחה.</Text>
                <Text style={styles.question}>5. דריכות של האישה בעת השיחות שלכן: "אני לא יכולה לדבר, הוא לידי" "אל תשלחי לי הודעות מתי שאת רוצה. תודיעי שאת שולחת" "אני מוחקת את ההודעות אחרי שאני קוראת".</Text>
                <Text style={styles.question}>6. דיווח מתמיד לבן הזוג על סדר יומה: מקומה, מעשיה, עם מי היא נמצאת ומתי תחזור.</Text>
                <Text style={styles.question}>7. היא שולחת לו תיעוד של מקומות שהייתה בהם (וידאו, תמונה, קבלה ממקום שעשתה בו קנייה- כדי שיראה תאריך שעה מקום). הוכחות מצולמות למיקום שלה, כאשר הם לא יחד.</Text>
            </View>
            <Text style={styles.importantText}>
                חייגי 118 למוקד משרד הרווחה או למוקד עמותת ל.א. *6724. חשוב מאד לשתף גורם מקצועי וקרוב/ת משפחה. כלל ברזל: רגע הפרידה מבן זוג אובססיבי עשוי להיות סכנת חיים! פני לשם קבלת ייעוץ וליווי מקצועי אך ורק מגורם המומחה בתחום האלימות במשפחה. עלייך לוודא האם הגורם הטיפולי הוא אכן מומחה בתחום.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFC0CB',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#800080',
        marginBottom: 8,
    },
    questionContainer: {
        marginBottom: 16,
    },
    question: {
        fontSize: 16,
        color: '#800080',
        marginBottom: 8,
    },
    importantText: {
        fontSize: 16,
        color: 'red',
        marginTop: 16,
    },
});

export default EnvWarningSigns;
