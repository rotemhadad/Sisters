import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const GovInfoScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [selectedApi, setSelectedApi] = useState('api1');
    const navigation = useNavigation();

    const apis = {
        api1: 'https://data.gov.il/api/3/action/datastore_search?resource_id=be5b7935-3922-45d4-9638-08871b17ec95',
        api2: 'https://data.gov.il/api/3/action/datastore_search?resource_id=ebe7b0fa-42c8-4195-8b40-b0b0e73cc494'
    };

    useEffect(() => {
        fetchData();
    }, [selectedApi]);

    const fetchData = async (searchQuery = '') => {
        setLoading(true);
        try {
            const url = searchQuery 
                ? `${apis[selectedApi]}&q=${searchQuery}`
                : `${apis[selectedApi]}&limit=100`;
            const response = await axios.get(url);
            let filteredData;
            if (selectedApi === 'api1') {
                filteredData = response.data.result.records.filter(record => record['סטטוס עמותה'] === 'רשומה');
            } else {
                filteredData = response.data.result.records.filter(record => record['phone'] !== null && record['phone'] !== '');;
            }
            setData(filteredData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchData(query);
    };

    const renderTableHeader = () => {
        if (selectedApi === 'api1') {
            return (
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>מספר עמותה</Text>
                    <Text style={styles.tableHeaderText}>שם עמותה בעברית</Text>
                    <Text style={styles.tableHeaderText}>סיווג פעילות ענפי</Text>
                    <Text style={styles.tableHeaderText}>תחום פעילות משני</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>מחוז</Text>
                    
                    <Text style={styles.tableHeaderText}>מומחה</Text>
                    
                    <Text style={styles.tableHeaderText}>סמכות</Text>
                    <Text style={styles.tableHeaderText}>מספר טלפון</Text>
                </View>
            );
        }
    };

    const renderTableRow = (item, index) => {
        if (selectedApi === 'api1') {
            return (
                <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{item['מספר עמותה']}</Text>
                    <Text style={styles.tableCell}>{item['שם עמותה בעברית']}</Text>
                    <Text style={styles.tableCell}>{item['סיווג פעילות ענפי']}</Text>
                    <Text style={styles.tableCell}>{item['תחום פעילות משני']}</Text>
                </View>
            );
        } else {
            return (
                <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{item['district']}</Text>
                    
                    <Text style={styles.tableCell}>{item['expert']}</Text>
                    
                    <Text style={styles.tableCell}>{item['authority']}</Text>
                    <Text style={styles.tableCell}>{item['phone']}</Text>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>מידע ממשלתי לשירותך</Text>
            </View>
            <View style={styles.navbar}>
                <TouchableOpacity 
                    style={[styles.navItem, selectedApi === 'api1' && styles.navItemSelected]}
                    onPress={() => setSelectedApi('api1')}
                >
                    <Text style={styles.navText}>עמותות רשומות לסיוע</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.navItem, selectedApi === 'api2' && styles.navItemSelected]}
                    onPress={() => setSelectedApi('api2')}
                >
                    <Text style={styles.navText}>מומחים לבתי משפט</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.searchContainer}>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="הזיני מילת חיפוש..."
                    value={query}
                    onChangeText={setQuery}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>חיפוש</Text>
                </TouchableOpacity>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#ff7f9e" />
            ) : (
                <ScrollView>
                    <View style={styles.table}>
                        {renderTableHeader()}
                        {data.map((item, index) => renderTableRow(item, index))}
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
    },
    header: {
        backgroundColor: '#ff7f9e',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    navItem: {
        padding: 10,
        backgroundColor: '#eee',
        marginHorizontal: 5,
        borderRadius: 5,
    },
    navItemSelected: {
        backgroundColor: '#ff7f9e',
    },
    navText: {
        color: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    searchButton: {
        backgroundColor: '#ff7f9e',
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginLeft: 10,
        borderRadius: 5,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    table: {
        borderWidth: 1,
        borderColor: '#ccc',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
    },
    tableHeaderText: {
        flex: 1,
        fontWeight: 'bold',
        padding: 10,
        borderRightWidth: 1,
        borderRightColor: '#ccc',
        textAlign: 'right',
        writingDirection: 'rtl',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCell: {
        flex: 1,
        padding: 10,
        borderRightWidth: 1,
        borderRightColor: '#ccc',
        textAlign: 'right',
        writingDirection: 'rtl',
    },
});

export default GovInfoScreen;
