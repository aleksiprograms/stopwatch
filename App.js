import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    Text,
} from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './components/Header';
import IndividualStopWatch from './components/IndividualStopwatch';
import CreateStopwatchModal from './components/CreateStopwatchModal';
import RenameStopwatchModal from './components/RenameStopwatchModal';

const App = () => {
    const [stopwatches, setStopwatches] = useState([]);

    const [nextStopwatchId, setNextStopwatchId] = useState(2);

    const [stopwatchToEdit, setStopwatchToEdit] = useState({});

    const [showCreateStopwatchModal, setShowCreateStopwatchModal] = useState(false);

    const [showRenameStopwatchModal, setShowRenameStopwatchModal] = useState(false);

    useEffect(() => {
        setStopwatches([]);
        loadStopwatches();
        loadNextStopwatchId();
    }, []);

    const loadStopwatches = async () => {
        try {
            let keys = await AsyncStorage.getAllKeys();

            // Remove nexStopwatchId key from keys
            const index = keys.indexOf("nextStopwatchId");
            if (index > -1) {
                keys.splice(index, 1);
            }

            if (keys.length == 0) {
                createFirstStopwatch();
            } else {
                for (let i = 0; i < keys.length; i++) {
                    let stopwatch = await AsyncStorage.getItem(keys[i]);
                    stopwatch = JSON.parse(stopwatch);
                    setStopwatches(prevItems => {
                        return [...prevItems, stopwatch];
                    });
                }
            }
        } catch (exception) { }
    }

    const createFirstStopwatch = () => {
        const stopwatch = {
            id: 1,
            name: "Stopwatch1",
            running: false,
            savedElapsedTime: 0,
            lastRunStartTime: 0
        };
        setStopwatches(prevItems => {
            return [...prevItems, stopwatch];
        });
        saveStopwatch(stopwatch);
    }

    const loadNextStopwatchId = async () => {
        try {
            let nextId = await AsyncStorage.getItem("nextStopwatchId");
            if (nextId != null) {
                nextId = parseInt(nextId);
                setNextStopwatchId(nextId);
            } else {
                setNextStopwatchId(2);
            }
        } catch (exception) {
            setNextStopwatchId(2);
        }
    }

    const saveNextStopwatchId = async (nextId) => {
        try {
            await AsyncStorage.setItem("nextStopwatchId", nextId + "");
            setNextStopwatchId(nextId);
        } catch (exception) { }
    }

    const createStopwatch = async (name) => {
        const stopwatch = {
            id: nextStopwatchId,
            name: name,
            running: false,
            savedElapsedTime: 0,
            lastRunStartTime: 0
        };
        try {
            const jsonValue = JSON.stringify(stopwatch);
            await AsyncStorage.setItem("id" + stopwatch.id, jsonValue);
            setStopwatches(prevItems => {
                return [...prevItems, stopwatch];
            });
            saveNextStopwatchId(nextStopwatchId + 1);
            setShowCreateStopwatchModal(false);
        } catch (exception) { }
    };

    const deleteStopwatch = async (id) => {
        try {
            await AsyncStorage.removeItem("id" + id);
            setStopwatches(prevItems => {
                return prevItems.filter(item => item.id != id);
            });
        }
        catch(exception) { }
    };

    const renameStopwatch = async (id, newName) => {
        let index = stopwatches.findIndex(item => item.id == id);
        const stopwatch = {
            id: stopwatches[index].id,
            name: newName,
            running: stopwatches[index].running,
            savedElapsedTime: stopwatches[index].savedElapsedTime,
            lastRunStartTime: stopwatches[index].lastRunStartTime
        };
        try {
            const jsonValue = JSON.stringify(stopwatch);
            await AsyncStorage.setItem("id" + stopwatch.id, jsonValue);
            setStopwatches(prevItems => {
                prevItems[index] = stopwatch;
                return prevItems;
            });
            setShowRenameStopwatchModal(false);
        } catch (exception) { }
    };

    const openRenameStopwatchModal = (oldStopwatch) => {
        setStopwatchToEdit(oldStopwatch);
        setShowRenameStopwatchModal(true);
    }

    return (
        <MenuProvider>
            <View style={styles.container}>
                <CreateStopwatchModal
                    visible={showCreateStopwatchModal}
                    nextStopwatchId={nextStopwatchId}
                    onPressCreate={createStopwatch}
                    onPressCancel={() => setShowCreateStopwatchModal(false)}
                />
                <RenameStopwatchModal
                    visible={showRenameStopwatchModal}
                    stopwatchToEdit={stopwatchToEdit}
                    onPressRename={renameStopwatch}
                    onPressCancel={() => setShowRenameStopwatchModal(false)}
                />
                <Header title="Stopwatch" />
                <FlatList
                    data={stopwatches}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <IndividualStopWatch
                            stopwatch={item}
                            onPressRename={openRenameStopwatchModal}
                            onPressDelete={deleteStopwatch}
                        />
                    }
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setShowCreateStopwatchModal(true)}
                >
                    <Text style={styles.buttonText}>CREATE STOPWATCH</Text>
                </TouchableOpacity>
            </View>
        </MenuProvider>
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