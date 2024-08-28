import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsAuthenticated(!!user);
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, [auth]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            Alert.alert('Signed Out', 'You have been signed out.');
        } catch (error) {
            Alert.alert('Sign Out Error', error.message);
        }
    };

    return (
        <ImageBackground
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREUOhO7rEVWbkSvRgPHusR65I3P63ViEE8yAC0foe3pNOdzfjc9pkR1KEpioDWZ53Vor0&usqp=CAU' }}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
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
                                    <Ionicons name="log-out-outline" size={24} color="#fff" style={styles.icon} />
                                    <Text style={styles.buttonText}>התנתקות</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('פרופיל')}>
                                    <Ionicons name="person-outline" size={24} color="#fff" style={styles.icon} />
                                    <Text style={styles.buttonText}>פרופיל</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('פורום')}>
                                    <Ionicons name="chatbubbles-outline" size={24} color="#fff" style={styles.icon} />
                                    <Text style={styles.buttonText}>פורום סיוע</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('בחירה')}>
                                <Ionicons name="log-in-outline" size={24} color="#fff" style={styles.icon} />
                                <Text style={styles.buttonText}>התחברות והרשמה</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('אורח')}>
                            <Ionicons name="information-circle-outline" size={24} color="#fff" style={styles.icon} />
                            <Text style={styles.buttonText}>מידע לכלל</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('למדי עוד')}>
                            <Ionicons name="book-outline" size={24} color="#fff" style={styles.icon} />
                            <Text style={styles.buttonText}>למדי עוד</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    header: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#F43169',
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
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 30,
        color: '#F43169',
        fontWeight: '500',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ff7f9e',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    icon: {
        marginRight: 15,
    },
});

export default HomeScreen;
