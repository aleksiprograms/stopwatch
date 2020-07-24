import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    TextInput,
} from 'react-native';
import Button from './Button';

const RenameStopwatchModal = ({ visible, stopwatchToEdit, onPressRename, onPressCancel }) => {

    const [newName, setNewName] = useState("");

    useEffect(() => {
        setNewName(stopwatchToEdit.name);
    }, [stopwatchToEdit]);

    const onNameChange = (textValue) => setNewName(textValue);

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={visible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>Rename Stopwatch</Text>
                    <TextInput
                        style={styles.textinput}
                        maxLength={15}
                        defaultValue={stopwatchToEdit.name}
                        onChangeText={onNameChange}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            text="CANCEL"
                            color="#cc3333"
                            onPress={() => onPressCancel()}
                        />
                        <Button
                            text="RENAME"
                            color="#33cc33"
                            onPress={() => onPressRename(stopwatchToEdit.id, newName)}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "#555555",
        padding: 15,
        alignItems: "center",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        alignItems: "center"
    },
    title: {
        alignSelf: "flex-start",
        fontSize: 25,
        color: "#ffffff"
    },
    textinput: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 25,
        width: 330,
        color: "#000000",
        backgroundColor: "#eeeeee",
        borderBottomColor: "#ff0000",
        borderBottomWidth: 3,
    },
    buttonContainer: {
        flexDirection: "row",
    },
});

export default RenameStopwatchModal;