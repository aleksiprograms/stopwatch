import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    Text,
} from 'react-native';
import Header from './components/Header';
import IndividualStopWatch from './components/IndividualStopwatch';
import CreateStopwatchModal from './components/CreateStopwatchModal';

const App = () => {
    const [stopwatches, setStopwatches] = useState([
        { id: 1, name: "Stopwatch 1" },
    ]);

    const [nextStopwatchId, setNextStopwatchId] = useState(2);

    const [showCreateStopwatchModal, setShowCreateStopwatchModal] = useState(false);

    const createStopwatch = (name) => {
        setStopwatches(prevItems => {
            return [...prevItems, {id: nextStopwatchId, name: name}];
        });
        setNextStopwatchId(nextStopwatchId => nextStopwatchId + 1);
        setShowCreateStopwatchModal(false);
    }
    
    return (
        <View style={styles.container}>
            <CreateStopwatchModal
                visible={showCreateStopwatchModal}
                nextStopwatchId={nextStopwatchId}
                onPressCreate={createStopwatch}
                onPressCancel={() => setShowCreateStopwatchModal(false)}
            />
            <Header title="Stopwatch" />
            <FlatList
                data={stopwatches}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <IndividualStopWatch stopwatch={item} />}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => setShowCreateStopwatchModal(true)}
            >
                <Text style={styles.buttonText}>CREATE STOPWATCH</Text>
            </TouchableOpacity>
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
    button: {
        width: "auto",
        height: 60,
        marginTop: 6,
        backgroundColor: "#ff8800",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 25,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      modalView: {
        margin: 20,
        backgroundColor: "#555555",
        padding: 20,
        alignItems: "center",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
});

export default App;