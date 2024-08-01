import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    // signupin screen
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        textAlign: 'right',
    },
    input: {
        height: 40,
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        textAlign: 'right',
    },
    note: {
        fontStyle: 'italic',
        textAlign: 'right',
    },
    button: {
        backgroundColor: '#ff7f9e',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '100%',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    // forum screen
    postFormContainer: {
        width: 1000,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 40,
        padding: 16,
        margin: 0,
        fontFamily: 'Montserrat, sans-serif',
    },
    postFormContent: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    profilePicture: {
        marginRight: 50,
        width: 75,
        height: 75,
        borderRadius: 50,
        overflow: 'hidden',
        textAlign: 'right',
    },
    postThemes: {
        marginTop: 10,
    },
    postThemesLabel: {
        marginBottom: 5,
        marginTop: 5,
    },
    postThemesInput: {
        marginRight: 5,
    },
    postThemesSpan: {
        marginLeft: 5,
    },
    anonymousButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 8,
    },
    anonymousButtonContainerLabel: {
        position: 'relative',
        display: 'inline-block',
        width: 44,
        height: 24,
        marginLeft: 8,
    },
    anonymousButtonContainerLabelInput: {
        display: 'none',
    },
    anonymousButtonContainerLabelSpan: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        cursor: 'pointer',
        borderRadius: 12,
        backgroundColor: '#e5e5e5',
        transitionProperty: 'background-color',
        transitionDuration: '0.3s',
        transitionTimingFunction: 'ease-in-out',
    },
    anonymousButtonContainerLabelSpanBefore: {
        content: '',
        position: 'absolute',
        left: 2,
        top: 2,
        width: 20,
        height: 20,
        borderRadius: '50%',
        backgroundColor: 'white',
        transitionProperty: 'transform',
        transitionDuration: '0.3s',
        transitionTimingFunction: 'ease-in-out',
    },
    anonymousButtonContainerLabelInputCheckedSpan: {
        backgroundColor: '#0073b1',
    },
    anonymousButtonContainerLabelInputCheckedSpanBefore: {
        transform: 'translateX(20px)',
    },
    anonymousButtonContainerLabelSpanAfter: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#999999',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    anonymousButtonContainerLabelInputCheckedSpanAfter: {
        color: 'white',
    },
    buttonSubmit: {
        backgroundColor: '#0073b1',
        color: 'white',
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderWidth: 0,
        borderRadius: 5,
        cursor: 'pointer',
        marginLeft: 'auto',
    },
    buttonSubmitHover: {
        backgroundColor: '#006097',
    },
    textArea: {
        textAlign: 'right',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    imageContainer: {
        width: 150,
        height: 150,
        borderRadius: 10, // Adjust border radius to make it rounded
        backgroundColor: 'lilac', // Set the background color to lilac
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        objectFit:'contain',
    },
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    imageButtonContainer: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonBelow: {
        marginTop: 10,
    },
    menuModal: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
