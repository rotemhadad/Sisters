import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { commonStyles } from './CommonStyles';

const WarningSigns = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>אובססיביות</Text>
            <View style={styles.questionContainer}>
                <Text style={styles.question}>1. הוא מחטט לך בנייד ובולש אחריך?</Text>
                <Text style={styles.question}>2. האם מחקת בגללו תיעוד שיחות, אנשי קשר או התבטאויות שלך ברשתות החברתיות?</Text>
                <Text style={styles.question}>3. האם הוא העיר לך על מבטי גברים ברחוב? לבושך? המציא רומנים שיש לך?</Text>
                <Text style={styles.question}>4. האם נמנעת ממפגשים חברתיים שרצית ללכת אליהם כיוון שצפית התנגדות מצדו (משפחה או חברות/ים)?</Text>
            </View>

            <Text style={styles.heading}>זוגיות דו פרצופית</Text>
            <View style={styles.questionContainer}>
                <Text style={styles.question}>1. גן עדן וגיהינום. בפומבי הוא מציג עצמו באופן שונה.</Text>
                <Text style={styles.question}>2. האם בפומבי הצגת מצג שווא חיובי על הזוגיות שלכם על מנת לרצות אותו?</Text>
                <Text style={styles.question}>3. האם הוא ביקש ממך להיות חברותית ולהראות בפומבי שאת במצב רוח טוב, גם כשלא חשת טוב?</Text>
                <Text style={styles.question}>4. האם הוא "מסכן ומסוכן": פעם מסכן, עדין, רעב לאהבה וזקוק למישהי שתטפל בו ופעם תוקפן ומפחיד?</Text>
                <Text style={styles.question}>5. האם הוא מבקש סליחה, קונה לך מתנות / פרחים, ומבטיח שלא יתנהג שוב בצורה פוגענית?</Text>
            </View>

            <Text style={styles.heading}>הקטנה</Text>
            <View style={styles.questionContainer}>
                <Text style={styles.question}>1. את תמיד אשמה בהכל. "גזלייטינג"</Text>
                <Text style={styles.question}>2. האם מצאת עצמך מפקפקת בכושר השיפוט שלך? בזיכרון שלך? ביכולותייך?</Text>
                <Text style={styles.question}>3. את "האשמה הבלעדית" גם בדברים שלא קשורים אלייך?</Text>
                <Text style={styles.question}>4. הוא אף פעם לא מרוצה ממך?</Text>
            </View>

            <Text style={styles.heading}>רגישות קיצונית</Text>
            <View style={styles.questionContainer}>
                <Text style={styles.question}>1. תחושה שאת צריכה ללכת "על ביצים" לידו. האם את חשה, משום מא, שזה לא מתאים שתשתפי אחרים לגבי הזוגיות שלכם?</Text>
                <Text style={styles.question}>2. האם את דרוכה לפני מפגש אתו? האם את נזהרת איך ומתי להגיד משהו?</Text>
                <Text style={styles.question}>3. האם את חוששת שהוא יגיב בצורה חריפה במידה ותציעי להיפרד?</Text>
                <Text style={styles.question}>4. האם מצבי רוחו משתנים מטוב לרע, ללא סיבה נראית לעין?</Text>
                <Text style={styles.question}>5. האם יש לו נטייה להתפרצויות זעם מדברים שוליים?</Text>
                <Text style={styles.question}>6. האם הוא איים בהתאבדות או בנקמה ביקרים לך אם תעזבי אותו?</Text>
            </View>

            <Text style={styles.heading}>הקדוש המעונה</Text>
            <View style={styles.questionContainer}>
                <Text style={styles.question}>1. הוא גם קורבן וגם תוקפן.</Text>
                <Text style={styles.question}>2. לדבריו האקסית שלו בגדה בו ואת מנסה להחזיר לו את אמונו בנשים ובעולם.</Text>
                <Text style={styles.question}>3. הוא חווה אובדן, את מוצאת עצמך מטפלת בו ומנחמת אותו.</Text>
                <Text style={styles.question}>4. האם יש לו רקע של התמכרויות? פגיעה בבעלי חיים או בחפצים? האם יש לו גישה לכלי נשק?</Text>
            </View>

            <Text style={styles.heading}>זה מוכר לך?</Text>
            <Text style={styles.importantText}>
                חייגי 118 למוקד משרד הרווחה או למוקד עמותת ל.א. *6724. חשוב מאד לשתף גורם מקצועי וקרוב/ת משפחה. כלל ברזל: רגע הפרידה מבן זוג אובססיבי עשוי להיות סכנת חיים! פני לשם קבלת ייעוץ וליווי מקצועי אך ורק מגורם המומחה בתחום האלימות במשפחה. עלייך לוודא האם הגורם הטיפולי הוא אכן מומחה בתחום.
            </Text>
            <Text style={commonStyles.contentText}>
                המידע נלקח מאתר https://www.michalsela.org.il/
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

export default WarningSigns;