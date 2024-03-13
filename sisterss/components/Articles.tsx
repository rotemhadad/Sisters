import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Linking } from 'react-native';
import { commonStyles } from './CommonStyles'; // Import common styles

const articlesData = [
    { id: '1', title: 'לגדול בצל אלימות במשפחה', url: 'https://itu.cet.ac.il/%D7%9C%D7%92%D7%93%D7%95%D7%9C-%D7%91%D7%A6%D7%9C-%D7%90%D7%9C%D7%99%D7%9E%D7%95%D7%AA-%D7%91%D7%9E%D7%A9%D7%A4%D7%97%D7%94/' },
    { id: '2', title: 'Article 2', url: 'https://example.com/article2' },
    // Add more articles as needed
];

const Articles = () => {
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
                <Text style={commonStyles.headerText}>Articles</Text>
            </View>
            <View style={commonStyles.content}>
                <FlatList
                    data={articlesData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.articleList}
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
        width: '120%', // Adjust the width as needed
        marginBottom: 10,
    },
    articleButtonText: {
        ...commonStyles.buttonText,
    },
});

export default Articles;
