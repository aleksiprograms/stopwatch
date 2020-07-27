import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    TextInput,
} from 'react-native';
import TextButton from './TextButton';

const NamingModal = ({
    visible,
    title,
    stopwatchToEdit,
    buttonTextPositive,
    buttonTextNegative,
    onPressPositive,
    onPressNegative }) => {

    const [stopwatch, setStopwatch] = useState({});

    useEffect(() => {
        setStopwatch(stopwatchToEdit);
    }, [stopwatchToEdit]);

    const onNameChange = (textValue) => {
        let tmpStopwatch = stopwatch;
        tmpStopwatch.name = textValue;
        setStopwatch(tmpStopwatch);
    };

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={visible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>{title}</Text>
                    <TextInput
                        style={styles.textinput}
                        maxLength={15}
                        defaultValue={stopwatchToEdit.name}
                        onChangeText={onNameChange}
                    />
                    <View style={styles.buttonContainer}>
                        <TextButton
                            text={buttonTextNegative}
                            color="#cc3333"
                            onPress={() => onPressNegative()}
                        />
                        <TextButton
                            text={buttonTextPositive}
                            color="#33cc33"
                            onPress={() => onPressPositive(stopwatch)}
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
        alignItems: "center",
    },
    title: {
        alignSelf: "flex-start",
        fontSize: 25,
        color: "#ffffff",
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

export default NamingModal;