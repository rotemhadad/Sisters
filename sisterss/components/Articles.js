import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Linking } from 'react-native';
import { commonStyles } from './CommonStyles'; // Import common styles

const articlesData = [
    { id: '1', title: 'לגדול בצל אלימות במשפחה', url: 'https://itu.cet.ac.il/%D7%9C%D7%92%D7%93%D7%95%D7%9C-%D7%91%D7%A6%D7%9C-%D7%90%D7%9C%D7%99%D7%9E%D7%95%D7%AA-%D7%91%D7%9E%D7%A9%D7%A4%D7%97%D7%94/' },
    { id: '2', title: 'אלימות פסיכולוגית', url: 'https://macom.org.il/definitions/topic_emotional_abuse/emotional_abuse/' },
    { id: '3', title: 'נתונים על אלימות כלפי נשים', url: 'https://fs.knesset.gov.il/globaldocs/MMM/d4173c55-1064-ed11-814f-005056aac6c3/2_d4173c55-1064-ed11-814f-005056aac6c3_11_19771.pdf' },
    { id: '4', title: 'הגדרה ומאפייני התעללות רגשית סמויה והשלכותיה לנפגעים', url: 'https://www.regashot-info.co.il/covert-emotional-abuse' },
    { id: '5', title: 'מי מתעלל בבן/בת זוג?', url: 'https://hadas-haramati.co.il/2016/07/%D7%9E%D7%99-%D7%9E%D7%AA%D7%A2%D7%9C%D7%9C-%D7%91%D7%91%D7%A0%D7%99-%D7%96%D7%95%D7%92/' },
    { id: '6', title: 'האם אתם סובלים מאלימות רגשית בתוך קשר?', url: 'https://www.betipulnet.co.il/articles/are_you_suffering_from_emotional_violence_within_a_relationship/' },



    // Add more articles as needed
];

const Articles = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.articleButton} onPress={() => openArticle(item.url)}>
            <Text style={styles.articleButtonText}>{item.title}</Text>
        </TouchableOpacity>
    );

    const openArticle = (url) => {
        // Open the article URL using the Linking module
        Linking.openURL(url).catch((error) => console.error('Error opening URL: ', error));
    };

    return (

        <View style={commonStyles.container}>
            <View style={commonStyles.header}>
                <Text style={commonStyles.headerText}>מאמרים</Text>
            </View>
            <View style={commonStyles.content}>
                <FlatList
                    data={articlesData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.buttonText}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    articleList: {
        alignItems: 'center',
    },
    articleButton: {
        ...commonStyles.button,
        width: '100%', // Set a fixed width for all buttons
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    articleButtonText: {
        ...commonStyles.buttonText,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        writingDirection: 'rtl',
    },
});

export default Articles;
