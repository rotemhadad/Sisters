import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo vector icons

const BottomToolbar = ({ navigation }) => {
    const { present } = useBottomSheetModal();

    const openMenu = () => {
        present(<YourMenuComponent />);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={openMenu}>
                <Ionicons name="menu" size={24} color="black" />
                <Text style={styles.buttonText}>Menu</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default BottomToolbar;
