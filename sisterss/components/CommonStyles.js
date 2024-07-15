import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        writingDirection: 'rtl',
    },
    header: {
        backgroundColor: '#ff7f9e',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        writingDirection: 'rtl',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        writingDirection: 'rtl', 
    },
    content: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        writingDirection: 'rtl', 
    },
    contentText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
        writingDirection: 'rtl', 
    },
    button: {
        backgroundColor: '#ff7f9e',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        margin: 8,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        writingDirection: 'rtl', 
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#ff7f9e',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
    },
    navButton: {
        paddingHorizontal: 20,
    },
    navButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    // New styles for the GuestScreen component
    topButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ff7f9e',
        paddingVertical: 10,
    },
    topButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#ff7f9e', // Pink color
    },
    bottomToolbar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#ff7f9e',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#ff7f9e', // Pink color
    },
    menuButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    menuModal: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        width: '100%',
    },
    menuItemText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    importantText: {
        fontSize: 16,
        color: 'red',
        marginTop: 16,
        writingDirection: 'rtl', 
    },
    helpText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'red',
        marginTop: 16,
        writingDirection: 'rtl',

    },
    choiceContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ff7f9e',
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        writingDirection: 'rtl',
    },
    selectedChoice: {
        backgroundColor: '#ff7f9e',
    },


});
