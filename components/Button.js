import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

const Button = ({ text, color, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: color }]}
            onPress={() => onPress()}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

Button.defaultProps = {
    text: "BUTTON",
    color: "#000000",
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 120,
        marginStart: 10,
        marginEnd: 10,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 25,
    },
});

export default Button;