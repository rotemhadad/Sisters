import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { commonStyles } from './CommonStyles';

const ViolenceTypes = ({ navigation }) => {
    const [selectedType, setSelectedType] = useState(null);

    // Function to handle selection of a violence type
    const handleSelectType = (type) => {
        // If the selected type is already open, close it
        if (selectedType === type) {
            setSelectedType(null);
        } else {
            // Otherwise, toggle to the selected type
            setSelectedType(type);
        }
    };
    // Function to check if a button is selected
    const isSelected = (type) => {
        return selectedType === type;
    };

    // Function to render detailed information based on the selected type
    const renderViolenceInfo = () => {
        switch (selectedType) {
            case 'Financial':
                return (
                    <View>
                        <Text style={commonStyles.contentText}>
                            האם מישהו מבני ביתך מונע ממך גישה לחשבון הבנק המשותף? האם נדרשת ממך הצדקה לכל הוצאה או שנמנעת ממך האפשרות להתפרנס?{'\n'}
                            {'\n'}
                            כל ניסיון להפוך את מי מבני ובנות הבית לתלוי בפוגע לצורך קיומו החומרי והכלכלי הוא אלימות כלכלית. אלימות זו מונעת אפשרות לעצמאות ומעניקה שליטה מוחלטת לפוגע, ועל כן מחייבת התערבות וסיוע.{'\n'}
                            {'\n'}
                            כיצד אלימות כלכלית באה לידי ביטוי?{'\n'}
                            אלימות זו כוללת אמצעי שליטה של הפוגע בתחום הכלכלי כמו מניעת קבלת החלטות כלכליות, דרישת הצדקה לכל הוצאה לגיטימית, האשמות לא מוצדקות בבעיות כספיות, מניעת מידע בנושאים כספיים וגישה למידע כזה, איסור לעבוד מחוץ לבית, מניעת גישה למשאבים כספיים, שליטה על חשבונות הבנק, הקצבת כסף על פי ראות עיניו של הפוגע.{'\n'}
                            חשוב להדגיש:{'\n'}
                            - לא מדובר בבעל "קמצן" ולא מדובר באישה "בזבזנית"{'\n'}
                            - אין קשר למצב הכלכלי של בני הזוג. לעתים גם אנשים אמידים מאד שולטים כך בבנות/בני זוגן{'\n'}
                            - האלימות יכולה להתקיים במהלך מערכת היחסים, לקראת פרידה ואחרי הפרידה{'\n'}
                            {'\n'}
                            אלימות כלכלית אינה לגיטימית בשום מצב ובשום צורה, והיא עלולה להחמיר ולגלוש לאלימות פיזית. אם מופעלת נגדך אלימות כלכלית - אין זו אשמתך!
                        </Text>
                        <Text style={commonStyles.helpText}>
                            יש לפנות לקבלת עזרה לפני שיהיה מאוחר מדי!
                        </Text>
                        <Text style={commonStyles.contentText}>
                            המידע נלקח מאתר https://www.gov.il/
                        </Text>
                    </View >
                );

            case 'Physical':
                return (
                    <View>
                        <Text style={commonStyles.contentText}>
                            האם מישהו מבני ביתך פוגע בך באופן פיזי, מכה אותך או מפעיל נגדך כוח גופני בכל צורה שהיא?{'\n'}
                            כל התנהגות כוחנית המבוצעת כלפי מי מבני ובנות הבית אשר מתבטאת בפגיעה בגוף ובבריאות היא אלימות פיזית. אלימות מסוג זה היא מסוכנת ביותר מכיוון שהיא עלולה לעלות בחיי אדם בטווח המיידי, ועל כן מחייבת טיפול מהיר.{'\n'}
                            כיצד אלימות פיזית באה לידי ביטוי?{'\n'}
                            אלימות פיזית כוללת כל התנהגות המפעילה כוח כנגד מישהו כמו דחיפות, יריקות, חניקות, צביטות, משיכת שיער, בעיטות, שימוש בנשק, גרימת כוויות, הכאה, הגבלת חופש התנועה, פגיעה באמצעות חפצים, הטרדה, פגיעה ברכוש, פגיעה בבעלי חיים, כפיית ביצוע פעולות משפילות.{'\n'}
                            אלימות פיזית אינה לגיטימית בשום מצב ובשום צורה.{'\n'}
                            אם מופעלת נגדך אלימות פיזית - אין זו אשמתך!
                        </Text>
                        <Text style={commonStyles.helpText}>
                            יש לפנות לקבלת עזרה לפני שיהיה מאוחר מדי!
                        </Text>
                        <Text style={commonStyles.contentText}>
                            המידע נלקח מאתר https://www.gov.il/
                        </Text>
                    </View >
                );
            case 'Sexual':
                return (
                    <View>
                        <Text style={commonStyles.contentText}>
                            האם מישהו מבני ביתך פוגע בך באופן מיני, נוגע בחלקי גופך באופן לא רצוי או כופה את עצמו על גופך כנגד רצונך?{'\n'}
                            כל התנהגות מינית אלימה או שנעשית בכפייה מבלי שהצד השני ביקש, הסכים או רצה בכך היא אלימות מינית. לאלימות מינית השלכות בריאותיות ונפשיות והיא מחייבת התערבות מיידית.{'\n'}
                            כיצד אלימות מינית באה לידי ביטוי?{'\n'}
                            אלימות מינית כוללת כל התנהגות בעלת אופי מיני המתבצעת כנגד רצונך כולל נגיעות בלתי רצויות בחלקי הגוף, פעילות מינית המלווה בפגיעות פיזיות, פעילות מינית עם אדם שלישי בניגוד לרצון ותוך שימוש בכוח פיזי או איומים, פגיעה בחזה או באיבר המין, אונס, ניסיון לאונס, מעשה מגונה, מעשה סדום, שימוש בילדים לצורכי פורנוגרפיה או זנות.{'\n'}
                            שימו לב כי עבירות מין מתבצעות גם ללא שימוש בכוח כמו במקרים של גילוי עריות ומעשים מגונים.{'\n'}
                            התנהגויות נוספות המהוות אלימות מינית: {'\n'}
                            שימוש בכינויי גנאי מיניים, הפחדות במהלך קיום יחסי מין, התעקשות על התנהגויות מיניות בלתי רצויות על ידי הקורבן, הסתרה של קיומה של מחלת מין או אי הגנה מפניה, איסור שימוש באמצעי מניעה.{'\n'}
                            אלימות מינית אינה לגיטימית בשום מצב ובשום צורה.{'\n'}
                            אם מופעלת נגדך אלימות מינית - אין זו אשמתך!
                        </Text>
                        <Text style={commonStyles.helpText}>
                            יש לפנות לקבלת עזרה לפני שיהיה מאוחר מדי!
                        </Text>
                        <Text style={commonStyles.contentText}>
                            המידע נלקח מאתר https://www.gov.il/
                        </Text>
                    </View>
                );
            case 'Verbal':
                return (
                    <View>
                        <Text style={commonStyles.contentText}>
                            האם מישהו מבני ביתך משפיל אותך, מרים את קולו או מאיים על חייך?{'\n'}
                            {'\n'}
                            שימוש בביטויים פוגעים ומשפילים כלפי מי מבני ובנות הבית הוא אלימות מילולית. מעבר להשלכות הנפשיות שלה, אלימות מילולית עלולה להפוך בכל שלב גם לאלימות פיזית, ולכן היא מחייבת התערבות וטיפול לפני שתחמיר.{'\n'}
                            {'\n'}
                            כיצד אלימות מילולית באה לידי ביטוי?{'\n'}
                            אלימות מילולית כוללת קללות, צעקות, השפלות, שימוש בכינויי גנאי ועלבונות (במיוחד בפני אנשים), איומים.{'\n'}
                            {'\n'}
                            אלימות מילולית אינה לגיטימית בשום מצב ובשום צורה, והיא עלולה להחמיר ולגלוש לאלימות פיזית.{'\n'}
                            אם מופעלת נגדך אלימות מילולית - אין זו אשמתך!
                        </Text>
                        <Text style={commonStyles.helpText}>
                            יש לפנות לקבלת עזרה לפני שיהיה מאוחר מדי!
                        </Text>
                        <Text style={commonStyles.contentText}>
                            המידע נלקח מאתר https://www.gov.il/
                        </Text>
                    </View>
                );
            case 'Emotional':
                return (
                    <View>
                        <Text style={commonStyles.contentText}>
                            האם מישהו מבני ביתך מבודד אותך מהסביבה ומונע ממך קשרים חברתיים? האם הוא מפגין קנאה ונוטה להתפרצויות זעם?{'\n'}
                            {'\n'}
                            שימוש באמצעים המכוונים לגרום לפגיעה רגשית ונפשית במי מבני ובנות הבית, ללא מגע ישיר עם גופו, הוא אלימות רגשית. מדובר למעשה בהרס שיטתי של תחושת הערך העצמי על ידי הפעלת כוח ושליטה בצורות שונות. אלימות רגשית היא אלימות שקשה לזיהוי ולכן מסוכנת ביותר, מכיוון שהתוצאות שלה עלולות להיות הרסניות.{'\n'}
                            {'\n'}
                            כיצד אלימות רגשית באה לידי ביטוי?{'\n'}
                            אלימות רגשית היא כל התנהגות של שליטה בנפגע כמו סחיטה, הפחדות, דיכוי, איומים, הטרדה, ביזוי והשפלה, מניעת קשרים חברתיים ובידוד חברתי, הפגנת שליטה מוחלטת, זלזול, מניעת חיבה, הפגנת קנאה קיצונית, מעקב אחרי כל פעולה, שימוש במניפולציות, חדירה לפרטיות, התפרצויות כעס והאשמות שווא, שתיקות ממושכות ומכוונות והתעלמות.{'\n'}
                            {'\n'}
                            אלימות רגשית אינה לגיטימית בשום מצב ובשום צורה, והיא עלולה להחמיר ולגלוש לאלימות פיזית. אם מופעלת נגדך אלימות רגשית - אין זו אשמתך!
                        </Text>
                        <Text style={commonStyles.helpText}>
                            יש לפנות לקבלת עזרה לפני שיהיה מאוחר מדי!
                        </Text>
                        <Text style={commonStyles.contentText}>
                            המידע נלקח מאתר https://www.gov.il/
                        </Text>
                    </View >
                );
            default:
                return null;
        }
    };

    return (
        <ScrollView contentContainerStyle={commonStyles.container}>

            <View style={commonStyles.container}>
                <Text style={commonStyles.headerText}>סוגים של אלימות במשפחה:</Text>
                <TouchableOpacity
                    style={[commonStyles.button, isSelected('Financial') && { backgroundColor: 'red' }]}
                    onPress={() => handleSelectType('Financial')}>
                    <Text style={commonStyles.buttonText}>אלימות כלכלית</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[commonStyles.button, isSelected('Physical') && { backgroundColor: 'red' }]}
                    onPress={() => handleSelectType('Physical')}>
                    <Text style={commonStyles.buttonText}>אלימות פיזית</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[commonStyles.button, isSelected('Sexual') && { backgroundColor: 'red' }]}
                    onPress={() => handleSelectType('Sexual')}>
                    <Text style={commonStyles.buttonText}>אלימות מינית</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[commonStyles.button, isSelected('Verbal') && { backgroundColor: 'red' }]}
                    onPress={() => handleSelectType('Verbal')}>
                    <Text style={commonStyles.buttonText}>אלימות מילולית</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[commonStyles.button, isSelected('Emotional') && { backgroundColor: 'red' }]}
                    onPress={() => handleSelectType('Emotional')}>
                    <Text style={commonStyles.buttonText}>אלימות רגשית</Text>
                </TouchableOpacity>



                {/* Render detailed information based on the selected type */}
                <ScrollView style={{ flex: 1 }}>
                    <View style={commonStyles.content}>
                        <Text style={commonStyles.contentText}>מידע מפורט:</Text>
                        {renderViolenceInfo()}
                    </View>
                </ScrollView>
            </View>
        </ScrollView>

    );
};

export default ViolenceTypes;
