import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

const TextButton = ({ text, color, wide, onPress }) => {
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

TextButton.defaultProps = {
    text: "BUTTON",
    color: "#000000",
    wide: false,
};

const styles = StyleSheet.create({
    button: {
        marginStart: 10,
        marginEnd: 10,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    },
    wideStyle: {
        height: 60,
        width: 300,
    },
    notWideStyle: {
        height: 50,
        width: 120,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 25,
    },
});

export default TextButton;