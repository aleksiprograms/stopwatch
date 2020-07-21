import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
} from 'react-native';
import Header from './components/Header';
import IndividualStopWatch from './components/IndividualStopwatch';

const App = () => {
    const [stopwatches, setStopwatches] = useState([
        {id: 1, name: "Stopwatch 1"},
        {id: 2, name: "Stopwatch 2"},
        {id: 3, name: "Stopwatch 3"},
        {id: 4, name: "Stopwatch 4"},
        {id: 5, name: "Stopwatch 5"},
        {id: 6, name: "Stopwatch 6"},
    ]);
    return (
        <View style={styles.container}>
            <Header title="Stopwatch"/>
            <FlatList
                data={stopwatches}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <IndividualStopWatch stopwatch={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111111",
    },
    appContainer: {
    },
    text: {
        color: "#ffffff",
    },
});

export default App;