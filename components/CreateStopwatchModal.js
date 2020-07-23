import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    TextInput,
} from 'react-native';
import Button from './Button';

const CreateStopwatchModal = ({ visible, nextStopwatchId, onPressCreate, onPressCancel }) => {

    const [name, setName] = useState("");

    useEffect(() => {
        setName("Stopwatch" + nextStopwatchId);
    }, [nextStopwatchId]);

    const onNameChange = (textValue) => setName(textValue);

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={visible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>Create Stopwatch</Text>
                    <TextInput
                        style={styles.textinput}
                        maxLength={15}
                        defaultValue={"Stopwatch" + nextStopwatchId}
                        onChangeText={onNameChange}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            text="CANCEL"
                            color="#cc3333"
                            onPress={() => onPressCancel()}
                        />
                        <Button
                            text="CREATE"
                            color="#33cc33"
                            onPress={() => onPressCreate(name)}
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

export default CreateStopwatchModal;