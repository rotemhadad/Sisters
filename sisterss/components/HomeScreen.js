// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert,Platform,Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';

const HomeScreen = ({ navigation }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const auth = getAuth();
 //const navigation = useNavigation();

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>Sisters</Text>
//             </View>
//             <View style={styles.content}>
//                 {/* <Image // add logo here!
//                     source={require('../Images/Warnings.png')}
//                     style={styles.logo}
//                     resizeMode="contain"
//                 /> */}
//                 <Text style={styles.contentText}>
//                     את לא לבד. אנחנו כאן כדי לתמוך בך.
//                 </Text>
//                 <Text style={styles.contentText}>הנגשת מידע מציל חיים!</Text>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => navigation.navigate('Selection')}
//                 >
//                     <Text style={styles.buttonText}>התחברות והרשמה</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => navigation.navigate('Guest')}
//                 >
//                     <Text style={styles.buttonText}>כניסה בתור משתמש אורח</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.button}>
//                     <Text style={styles.buttonText}>למדי עוד</Text>
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.navBar}>
//                 <TouchableOpacity style={styles.navButton}>
//                     <Text style={styles.navButtonText}>שאלות נפוצות</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.navButton}
//                     onPress={() => navigation.navigate('AboutUs')}
//                 >
//                     <Text style={styles.navButtonText}>אודות</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.navButton}>
//                     <Text style={styles.navButtonText}>צור קשר</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

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
            <View style={styles.content}>
                <Text style={styles.contentText}>
                    את לא לבד. אנחנו כאן כדי לתמוך בך.
                </Text>
                <Text style={styles.contentText}>הנגשת מידע מציל חיים!</Text>

                {isAuthenticated ? (
                    <>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSignOut}
                        >
                            <Text style={styles.buttonText}>התנתקות</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Profile')}
                        >
                            <Text style={styles.buttonText}>פרופיל</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Forum')}
                        >
                            <Text style={styles.buttonText}>פורום סיוע</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Selection')}
                    >
                        <Text style={styles.buttonText}>התחברות והרשמה</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Guest')}
                >
                    <Text style={styles.buttonText}>מידע לכלל</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('LearnMore')}
                >
                    <Text style={styles.buttonText}>למדי עוד</Text>
                </TouchableOpacity>
            </View>
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
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 200,
        height: 200,
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
        alignSelf: 'stretch',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ff7f9e',
        paddingVertical: 10,
    },
    navButton: {
        paddingHorizontal: 10,
    },
    navButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
