import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

const MyAppBar = ({ title }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#303030",
        padding: 15,
    },
    text: {
        color: "#ffffff",
        fontSize: 25,
    },
});

export default MyAppBar;