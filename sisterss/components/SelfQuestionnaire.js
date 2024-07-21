import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';
import { commonStyles } from './CommonStyles';
import { I18nManager } from 'react-native';
I18nManager.allowRTL(false);
const SelfQuestionnaire = ({ navigation }) => {
    const [showIntro, setShowIntro] = useState(true);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState('');

    const handleAnswerChange = (questionId, answer) => {
        setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));
    };
    const handleClick = () => {
        setShowIntro(false);
    };

    const renderQuestion = (questionId, question, options) => (
        <View style={styles.questionContainer}>
            <Text style={[styles.questionText, { textAlign: 'right' }]}>{question}</Text>

            {options.map((option) => (
                <TouchableOpacity
                    key={option}
                    style={[
                        styles.optionButton,
                        answers[questionId] === option ? styles.selectedOption : null,
                    ]}
                    onPress={() => handleAnswerChange(questionId, option)}
                >
                    <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    const calculateResult = () => {
        const positiveAnswers = Object.values(answers).filter((answer) => answer === 'כן').length;
        let resultText = '';

        if (positiveAnswers === 0) {
            resultText = 'לא נראה שאת חווה אלימות במשפחה על פי התשובות שלך.';
        } else if (positiveAnswers <= 3) {
            resultText = 'ייתכן שאת חווה מידה מסוימת של אלימות במשפחה. מומלץ לפנות לייעוץ מקצועי.';
            resultText += '\n\nחייגי 118 למוקד משרד הרווחה או למוקד עמותת ל.א. *6724. חשוב מאד לשתף גורם מקצועי וקרוב/ת משפחה. \nכלל ברזל: רגע הפרידה מבן זוג אובססיבי עשוי להיות סכנת חיים! פני לשם קבלת ייעוץ וליווי מקצועי אך ורק מגורם המומחה בתחום האלימות במשפחה. עלייך לוודא האם הגורם הטיפולי הוא אכן מומחה בתחום.';

        } else {
            resultText = 'על פי התשובות שלך, נראה שאת חווה אלימות במשפחה. מומלץ לפנות לעזרה מקצועית בהקדם האפשרי.';
            resultText += '\n\nחייגי 118 למוקד משרד הרווחה או למוקד עמותת ל.א. *6724. חשוב מאד לשתף גורם מקצועי וקרוב/ת משפחה. \nכלל ברזל: רגע הפרידה מבן זוג אובססיבי עשוי להיות סכנת חיים! פני לשם קבלת ייעוץ וליווי מקצועי אך ורק מגורם המומחה בתחום האלימות במשפחה. עלייך לוודא האם הגורם הטיפולי הוא אכן מומחה בתחום.';

        }

        setResult(resultText);
        setShowResult(true);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {showIntro ? ( // Conditional rendering based on showIntro state
                // Intro page content
                <View style={commonStyles.content}>
                    <Text style={commonStyles.importantText}>
                        שאלון זה הוא אנונימי ואינו מצריך מסירה של פרטים מזהים.
                        {'\n'}
                        מטרת השאלון היא לסייע לך לבחון את מצב הסיכון במערכת היחסים הזוגית שלך או של בת משפחה.
                        {'\n'}
                        שאלון זה לא מחליף הערכה של איש מקצוע.
                        {'\n'}
                        אינך חייבת לענות על כל השאלות.
                    </Text>
                    <TouchableOpacity style={commonStyles.button} onPress={handleClick}>
                        <Text style={commonStyles.buttonText}>לחצי כאן כדי לענות על השאלון</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.heading}>האם אני חווה אלימות במשפחה?</Text>
                        <View style={{ writingDirection: 'rtl' }}>
                            {renderQuestion('question1', 'הוא מחטט לך בנייד ובולש אחריך?', ['כן', 'לא'])}
                            {renderQuestion('question2', 'האם מחקת בגללו תיעוד שיחות, אנשי קשר או התבטאויות שלך ברשתות החברתיות?', ['כן', 'לא'])}
                            {renderQuestion('question3', 'האם הוא העיר לך על מבטי גברים ברחוב? לבושך? המציא רומנים שיש לך?', ['כן', 'לא'])}
                            {renderQuestion('question4', 'האם נמנעת ממפגשים חברתיים שרצית ללכת אליהם כיוון שצפית התנגדות מצדו (משפחה או חברות/ים)?', ['כן', 'לא'])}
                            {renderQuestion('question5', 'בפומבי הוא מציג עצמו באופן שונה מאשר בפרטיות?', ['כן', 'לא'])}
                            {renderQuestion('question6', 'האם בפומבי הצגת מצג שווא חיובי על הזוגיות שלכם על מנת לרצות אותו?', ['כן', 'לא'])}
                            {renderQuestion('question7', 'האם הוא ביקש ממך להיות חברותית ולהראות בפומבי שאת במצב רוח טוב, גם כשלא חשת טוב?', ['כן', 'לא'])}
                            {renderQuestion('question8', 'האם הוא "מסכן ומסוכן": פעם מסכן, עדין, רעב לאהבה וזקוק למישהי שתטפל בו ופעם תוקפן ומפחיד?', ['כן', 'לא'])}
                            {renderQuestion('question9', 'האם הוא מבקש סליחה, קונה לך מתנות / פרחים, ומבטיח שלא יתנהג שוב בצורה פוגענית?', ['כן', 'לא'])}
                            {renderQuestion('question10', 'את תמיד אשמה בהכל ("גזלייטינג")?', ['כן', 'לא'])}
                            {renderQuestion('question11', 'האם מצאת עצמך מפקפקת בכושר השיפוט שלך? בזיכרון שלך? ביכולותייך?', ['כן', 'לא'])}
                            {renderQuestion('question12', 'את "האשמה הבלעדית" גם בדברים שלא קשורים אלייך?', ['כן', 'לא'])}
                            {renderQuestion('question13', 'הוא אף פעם לא מרוצה ממך?', ['כן', 'לא'])}
                            {renderQuestion('question14', 'תחושה שאת צריכה ללכת "על ביצים" לידו? שזה לא מתאים שתשתפי אחרים לגבי הזוגיות שלכם?', ['כן', 'לא'])}
                            {renderQuestion('question15', 'האם את דרוכה לפני מפגש אתו? האם את נזהרת איך ומתי להגיד משהו?', ['כן', 'לא'])}
                            {renderQuestion('question16', 'האם את חוששת שהוא יגיב בצורה חריפה במידה ותציעי להיפרד?', ['כן', 'לא'])}
                            {renderQuestion('question17', 'האם מצבי רוחו משתנים מטוב לרע, ללא סיבה נראית לעין?', ['כן', 'לא'])}
                            {renderQuestion('question18', 'האם יש לו נטייה להתפרצויות זעם מדברים שוליים?', ['כן', 'לא'])}
                            {renderQuestion('question19', 'האם הוא איים בהתאבדות או בנקמה ביקרים לך אם תעזבי אותו?', ['כן', 'לא'])}
                            {renderQuestion('question20', 'הוא גם קורבן וגם תוקפן?', ['כן', 'לא'])}
                            {renderQuestion('question21', 'לדבריו האקסית שלו בגדה בו ואת מנסה להחזיר לו את אמונו בנשים ובעולם?', ['כן', 'לא'])}
                            {renderQuestion('question22', 'הוא חווה אובדן, את מוצאת עצמך מטפלת בו ומנחמת אותו?', ['כן', 'לא'])}
                            {renderQuestion('question23', 'האם יש לו רקע של התמכרויות? פגיעה בבעלי חיים או בחפצים? האם יש לו גישה לכלי נשק?', ['כן', 'לא'])}
                        </View>

                        <TouchableOpacity style={styles.calculateButton} onPress={calculateResult}>
                            <Text style={styles.calculateButtonText}>קבל תוצאה</Text>
                        </TouchableOpacity>

                        <Modal visible={showResult} animationType="slide">
                            <View style={styles.resultContainer}>
                                <ScrollView>
                                    <Text style={styles.resultText}>{result}</Text>
                                </ScrollView>
                                <TouchableOpacity style={styles.closeButton} onPress={() => setShowResult(false)}>
                                    <Text style={styles.closeButtonText}>סגור</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff7f9e',
        padding: 16,
        writingDirection: 'rtl',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 16,
        textAlign: 'center',

    },
    questionContainer: {
        marginBottom: 16,

    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    optionButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
    },
    selectedOption: {
        backgroundColor: '#F43169',
    },
    optionText: {
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
    },
    calculateButton: {
        backgroundColor: '#F43169',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 16,
        alignSelf: 'center',
    },
    calculateButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultContainer: {
        flex: 1,
        backgroundColor: '#FFC0CB',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#800080',
        textAlign: 'center',
        marginBottom: 16,
    },
    closeButton: {
        backgroundColor: '#800080',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    closeButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SelfQuestionnaire;