import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, Dimensions } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsAuthenticated(!!user);
        });

        return unsubscribe; // Clean up the subscription on unmount
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            Alert.alert('Signed Out', 'You have been signed out.');
        } catch (error) {
            Alert.alert('Sign Out Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Sisters</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.contentText}>
                    את לא לבד. אנחנו כאן כדי לתמוך בך.
                </Text>
                <View style={styles.content}>
                    <Image source={require('../Images/11.png')} style={styles.image} />
                    <Text style={styles.contentText}>הנגשת מידע מציל חיים!</Text>

                    {isAuthenticated ? (
                        <>
                            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                                <Text style={styles.buttonText}>התנתקות</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('פרופיל')}>
                                <Text style={styles.buttonText}>פרופיל</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('פורום')}>
                                <Text style={styles.buttonText}>פורום סיוע</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('בחירה')}>
                            <Text style={styles.buttonText}>התחברות והרשמה</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('אורח')}>
                        <Text style={styles.buttonText}>מידע לכלל</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('למדי עוד')}>
                        <Text style={styles.buttonText}>למדי עוד</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#ff7f9e',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    image: {
        width: width * 0.6,
        height: height * 0.3,
        borderRadius: 10,
        marginBottom: 20,
    },
    contentText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    button: {
        backgroundColor: '#ff7f9e',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default HomeScreen;
