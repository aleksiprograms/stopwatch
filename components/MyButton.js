import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

const MyButton = ({ text, color, wide, onPress }) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: color, },
                wide ? styles.wideStyle : styles.notWideStyle,
            ]}
            onPress={() => onPress()}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

MyButton.defaultProps = {
    text: "BUTTON",
    color: "#ffffff",
    wide: false,
};

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 6,
        marginStart: 10,
        marginEnd: 10,
    },
    wideStyle: {
        width: 300,
        height: 60,
    },
    notWideStyle: {
        width: 120,
        height: 50,
    },
    buttonText: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 25,
    },
});

export default MyButton;