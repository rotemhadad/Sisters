import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const SubjectPicker = ({ selectedSubject, onSubjectChange }) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(selectedSubject);
    const [items, setItems] = React.useState([
        { label: 'בחרי נושא', value: '' },
        { label: 'בית', value: 'בית' },
        { label: 'ילדים', value: 'ילדים' },
        { label: 'זכויות', value: 'זכויות' },
        { label: 'נישואים', value: 'נישואים' },
        { label: 'קריירה', value: 'קריירה' },
        { label: 'אחר', value: 'אחר' }
    ]);

    return (
        <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>בחרי נושא:</Text>
            <TouchableOpacity onPress={() => setOpen(true)} style={styles.touchable}>
                <Text style={styles.selectedValue}>{value || 'בחרי נושא'}</Text>
            </TouchableOpacity>
            {open && (
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={open}
                    onRequestClose={() => setOpen(false)}
                >
                    <View style={styles.modalBackground}>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            containerStyle={styles.dropdownContainer}
                            style={styles.dropdown}
                            dropDownStyle={styles.dropdownStyle}
                            onChangeValue={(value) => {
                                onSubjectChange(value);
                                setOpen(false); // Close dropdown on selection
                            }}
                            placeholder="בחרי נושא"
                            placeholderStyle={styles.placeholder}
                        />
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    pickerContainer: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 8,
        marginBottom: 12,
    },
    pickerLabel: {
        fontSize: 16,
        marginBottom: 8,
    },
    touchable: {
        height: 50,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: '#FFF',
    },
    selectedValue: {
        fontSize: 16,
        color: '#000',
    },
    dropdownContainer: {
        height: 50,
    },
    dropdown: {
        borderWidth: 0,
        backgroundColor: '#FFF',
    },
    dropdownStyle: {
        backgroundColor: '#FFF',
    },
    placeholder: {
        color: '#A9A9A9',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});

export default SubjectPicker;
