import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const TermsAndConditionsScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, { color: '#ff7f9e' }]}>
  פורום Sisters{'\n'}תנאים והגבלות
</Text>
      <Text style={styles.content}>
        פורום זה הוקם במטרה למנוע אלימות נגד נשים ולהגיע למצב של 0 נרצחות בשנה בישראל, תוך שימוש בטכנולוגיה חדשנית, חשיבה יצירתית, שימת דגש על נורות אדומים, יצירת מודעות סביבתית ואישית וערבות חברתית.

        {'\n\n'}המטרה למנוע אלימות נגד נשים ולעצור את הרצח הבא.

        {'\n\n'}פורום מיכל סלע השראתנו הפך למהפכה החברתית את הגורמים החזקים והמשפיעים במשק ויחד כולם משתפים פעולה כדי להגשים את מטרת פורום Sisters , בין השותפים לעשיה נמנים אישים בכירים, אמנים, יוצרים, חברות הייטק, חברות תעשייה, משרדי ממשלה ועוד.

        {'\n\n'}אם את חווה אלימות ואו מכירה אישה אשר חווה אלימות אנא צרי קשר דרך מרכזי הסיוע של הפורום ושל העמותות השותפות.

        {'\n\n'}רוצים להתנדב ולעזור למנוע את הרצח הבא? צרו קשר!

        {'\n\n'}בהשתתפותך בפורום, את מסכימה לכבד את כל המשתתפים, לא לפרסם תוכן פוגעני, ולפעול בהתאם להנחיות הקהילה.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>חזרה אחורה</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'right', // Align text to the right
  },
  button: {
    backgroundColor: '#ff7f9e',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default TermsAndConditionsScreen;
