import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Modal,
    TextInput,
} from 'react-native';
import MyButton from './MyButton';

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
                        selectionColor={"#4fc3f7"}
                    />
                    <View style={styles.buttonContainer}>
                        <MyButton
                            text={buttonTextNegative}
                            color="#e57373"
                            onPress={() => onPressNegative()}
                        />
                        <MyButton
                            text={buttonTextPositive}
                            color="#81c784"
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
        backgroundColor: "#00000099",
    },
    modalView: {
        alignItems: "center",
        backgroundColor: "#202020",
        borderColor: "#4fc3f7",
        borderWidth: 3,
        borderRadius: 12,
        padding: 20,
    },
    title: {
        alignSelf: "flex-start",
        color: "#ffffff",
        fontSize: 25,
    },
    textinput: {
        backgroundColor: "#353535",
        borderBottomColor: "#4fc3f7",
        borderBottomWidth: 3,
        color: "#ffffff",
        fontSize: 25,
        marginTop: 40,
        marginBottom: 40,
        width: 320,
    },
    buttonContainer: {
        flexDirection: "row",
    },
});

export default NamingModal;