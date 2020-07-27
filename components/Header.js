import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

const Header = ({ title }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#cc5555",
        padding: 15,
    },
    text: {
        color: "#ffffff",
        fontSize: 26,
    },
});

export default Header;