import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, I18nManager } from 'react-native';

// Force RTL layout
I18nManager.forceRTL(true);

const LegalRightsScreen = () => {
  const openPhoneNumber = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>זכויות משפטיות לנשים</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>זכויות בנושא אלימות</Text>
        <Text style={styles.content}>
          • הזכות להגנה: כל אישה זכאית להגנה מפני אלימות פיזית, מילולית, או נפשית.
          {'\n'}• צו הגנה: ניתן לבקש צו הגנה מבית המשפט למניעת אלימות במשפחה.
          {'\n'}• תלונה במשטרה: יש זכות להגיש תלונה במשטרה ולדרוש חקירה.
          {'\n'}• מקלט לנשים מוכות: זכות לקבלת מחסה במקלט לנשים נפגעות אלימות.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>זכויות בענייני בית</Text>
        <Text style={styles.content}>
          • מדור ספציפי: זכות למגורים בדירת המגורים המשותפת גם לאחר פרידה.
          {'\n'}• חלוקת רכוש: זכות לחלוקה שווה של הרכוש המשותף בעת גירושין.
          {'\n'}• מזונות: זכות לתבוע מזונות מבן הזוג במקרה של פרידה או גירושין.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>זכויות בענייני ילדים</Text>
        <Text style={styles.content}>
          • משמורת: זכות לבקש משמורת על הילדים.
          {'\n'}• הסדרי ראייה: זכות לקביעת הסדרי ראייה עם הילדים.
          {'\n'}• מזונות ילדים: זכות לתבוע מזונות עבור הילדים מהאב.
          {'\n'}• הגנה על ילדים: זכות לדרוש הגנה על הילדים מפני אלימות או הזנחה.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>מספרי טלפון חשובים</Text>
        <Text style={styles.content}>משטרה:</Text>
        <TouchableOpacity onPress={() => openPhoneNumber('100')}>
          <Text style={styles.phoneNumber}> 100</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openPhoneNumber('1202')}>
        <Text style={styles.content}>קו החירום לנפגעות תקיפה מינית:</Text>
          <Text style={styles.phoneNumber}> 1202</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openPhoneNumber('118')}>
        <Text style={styles.content}>מוקד רווחה:</Text>
          <Text style={styles.phoneNumber}> 118</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openPhoneNumber('1-800-220-000')}>
        <Text style={styles.content}>קו חירום ארצי למניעת אלימות במשפחה:</Text>
          <Text style={styles.phoneNumber}> 1-800-220-000</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openPhoneNumber('	03-5254422')}>
        <Text style={styles.content}>נעמ"ת - תנועת נשים עובדות ומתנדבות:</Text>
          <Text style={styles.phoneNumber}> 	03-5254422</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openPhoneNumber('118')}>
        <Text style={styles.content}>מוקד מידע וסיוע:</Text>
          <Text style={styles.phoneNumber}>118</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.disclaimer}>
        הערה: מידע זה הוא כללי בלבד ואינו מהווה ייעוץ משפטי. לקבלת ייעוץ משפטי מקצועי, יש לפנות לעורך דין.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 20,
    color: '#ff7f9e',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ff7f9e',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#ff7f9e',
    textAlign: 'right',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'right',
  },
  phoneNumber: {
    fontSize: 16,
    color: '#ff7f9e',
    marginBottom: 8,
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
  disclaimer: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'right',
    marginTop: 16,
    color: '#666',
  },
});

export default LegalRightsScreen;