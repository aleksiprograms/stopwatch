import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
} from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './components/Header';
import Stopwatch from './components/Stopwatch';
import NamingModal from './components/NamingModal';
import TextButton from './components/TextButton';

const App = () => {
    const [stopwatches, setStopwatches] = useState([]);
    const [nextStopwatchId, setNextStopwatchId] = useState(2);
    const [newStopwatch, setNewStopwatch] = useState({});
    const [stopwatchToEdit, setStopwatchToEdit] = useState({});
    const [showCreateStopwatchModal, setShowCreateStopwatchModal] = useState(false);
    const [showRenameStopwatchModal, setShowRenameStopwatchModal] = useState(false);

    useEffect(() => {
        setStopwatches([]);
        loadStopwatches();
        loadNextStopwatchId();
    }, []);

    const flatListRef = React.useRef();

    const flatListToTop = () => {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    };

    const loadStopwatches = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();

            // Remove nexStopwatchId key from keys
            const index = keys.indexOf("nextStopwatchId");
            if (index > -1) {
                keys.splice(index, 1);
            }

            if (keys.length == 0) {
                createFirstStopwatch();
            } else {
                const stopwatchArray = [];
                for (let i = 0; i < keys.length; i++) {
                    let stopwatch = await AsyncStorage.getItem(keys[i]);
                    stopwatch = JSON.parse(stopwatch);
                    stopwatchArray.push(stopwatch);
                }

                // Sort stopwatches by id [oldest...newest]
                // (the newest stopwatch has the highest id)
                stopwatchArray.sort((a, b) => {
                    if (a.id > b.id) {
                        return 1;
                    } else {
                        return -1;
                    }
                });

                // Display stopwatches and put the newest stopwatch to the top
                for (let i = 0; i < stopwatchArray.length; i++) {
                    setStopwatches(prevItems => {
                        return [stopwatchArray[i], ...prevItems];
                    });
                }
            }
        } catch (exception) { }
    };

    const createFirstStopwatch = () => {
        const stopwatch = {
            id: 1,
            name: "Stopwatch1",
            running: false,
            savedElapsedTime: 0,
            lastRunStartTime: 0,
        };
        setStopwatches(prevItems => {
            return [stopwatch, ...prevItems];
        });
        saveStopwatch(stopwatch);
    };

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
    };

    const saveNextStopwatchId = async (nextId) => {
        try {
            await AsyncStorage.setItem("nextStopwatchId", nextId + "");
            setNextStopwatchId(nextId);
        } catch (exception) { }
    };

    const createStopwatch = async (stopwatch) => {
        try {
            const jsonValue = JSON.stringify(stopwatch);
            await AsyncStorage.setItem("id" + stopwatch.id, jsonValue);
            setStopwatches(prevItems => {
                return [stopwatch, ...prevItems];
            });
            saveNextStopwatchId(nextStopwatchId + 1);
            setShowCreateStopwatchModal(false);
            flatListToTop();
        } catch (exception) { }
    };

    const deleteStopwatch = async (id) => {
        try {
            await AsyncStorage.removeItem("id" + id);
            setStopwatches(prevItems => {
                return prevItems.filter(item => item.id != id);
            });
        } catch (exception) { }
    };

    const renameStopwatch = async (stopwatch) => {
        let index = stopwatches.findIndex(item => item.id == stopwatch.id);
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

    const openCreateStopwatchModal = () => {
        const stopwatch = {
            id: nextStopwatchId,
            name: "Stopwatch" + nextStopwatchId,
            running: false,
            savedElapsedTime: 0,
            lastRunStartTime: 0,
        };
        setNewStopwatch(stopwatch);
        setShowCreateStopwatchModal(true);
    };

    const openRenameStopwatchModal = (stopwatch) => {
        setStopwatchToEdit(stopwatch);
        setShowRenameStopwatchModal(true);
    };

    return (
        <MenuProvider>
            <View style={styles.container}>
                <NamingModal
                    visible={showCreateStopwatchModal}
                    title="Create Stopwatch"
                    stopwatchToEdit={newStopwatch}
                    buttonTextPositive="CREATE"
                    buttonTextNegative="CANCEL"
                    onPressPositive={createStopwatch}
                    onPressNegative={() => setShowCreateStopwatchModal(false)}
                />
                <NamingModal
                    visible={showRenameStopwatchModal}
                    title="Rename Stopwatch"
                    stopwatchToEdit={stopwatchToEdit}
                    buttonTextPositive="RENAME"
                    buttonTextNegative="CANCEL"
                    onPressPositive={renameStopwatch}
                    onPressNegative={() => setShowRenameStopwatchModal(false)}
                />
                <Header title="Stopwatch" />
                <FlatList
                    ref={flatListRef}
                    data={stopwatches}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) =>
                        <Stopwatch
                            stopwatch={item}
                            onPressRename={openRenameStopwatchModal}
                            onPressDelete={deleteStopwatch}
                        />
                    }
                />
                <TextButton
                    text="CREATE STOPWATCH"
                    color="#ff8800"
                    wide={true}
                    onPress={openCreateStopwatchModal}
                />
            </View>
        </MenuProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111111",
    },
});

export default App;