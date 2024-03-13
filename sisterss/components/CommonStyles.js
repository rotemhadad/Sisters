// CommonStyles.js
import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFC0CB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#800080',
    },
    content: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#800080',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#800080',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
    },
    navButton: {
        paddingHorizontal: 20,
    },
    navButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
