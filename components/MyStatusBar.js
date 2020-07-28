import React from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Platform,
} from 'react-native';

const MyStatusBar = () => (
    <View style={styles.statusBar}>
        <StatusBar translucent backgroundColor="#000000" barStyle="light-content" />
    </View>
);

const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: "#000000",
        height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    },
});

export default MyStatusBar;