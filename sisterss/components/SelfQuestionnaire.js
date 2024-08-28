import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, ImageBackground } from 'react-native';
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
        console.log('Intro page button clicked'); // Add log for debugging
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
        <ImageBackground
            source={{ uri: 'https://png.pngtree.com/thumb_back/fh260/background/20211231/pngtree-color-watercolor-doodle-line-art-background-image_934755.jpg' }}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {showIntro ? (
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
                            </View>
                            <TouchableOpacity style={styles.submitButton} onPress={calculateResult}>
                                <Text style={styles.submitButtonText}>חשב תוצאות</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                )}
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={showResult}
                    onRequestClose={() => setShowResult(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.resultText}>{result}</Text>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => setShowResult(false)}
                            >
                                <Text style={styles.modalButtonText}>סגור</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'right',
    },
    questionContainer: {
        marginBottom: 15,
    },
    questionText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'right',
    },
    optionButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
    },
    selectedOption: {
        backgroundColor: '#C8A2C8',
    },
    optionText: {
        fontSize: 16,
        textAlign: 'right',
    },
    submitButton: {
        backgroundColor: '#ff7f9e',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 7, 
        elevation: 5, 
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    resultText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#F43169',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default SelfQuestionnaire;
