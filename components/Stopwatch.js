import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MyButton from './MyButton';
import EditPopupMenu from './EditPopupMenu';

const Stopwatch = ({ stopwatch, onPressRename, onPressDelete }) => {

    const [elapsedTime, setElapsedTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [savedInterval, setSavedInterval] = useState();

    useEffect(() => {
        if (stopwatch.running) {
            let alreadyElapsedTime = stopwatch.savedElapsedTime
                + (Date.now() - stopwatch.lastRunStartTime)
            setElapsedTime(alreadyElapsedTime);
            start(alreadyElapsedTime);
        } else {
            setElapsedTime(stopwatch.savedElapsedTime);
        }
    }, []);

    const start = (alreadyElapsedTime) => {
        setRunning(true);
        let timeNow = Date.now();
        let dataToSave = {
            id: stopwatch.id,
            name: stopwatch.name,
            running: true,
            savedElapsedTime: alreadyElapsedTime,
            lastRunStartTime: timeNow,
        };
        saveData(dataToSave);
        let lastTimeFromIntervalEnd = timeNow;
        let interval = setInterval(() => {
            timeNow = Date.now();
            let delta = timeNow - lastTimeFromIntervalEnd;
            setElapsedTime(prevItem => prevItem + delta);
            lastTimeFromIntervalEnd = timeNow;
        }, 100);
        setSavedInterval(interval);
    };

    const stop = () => {
        setRunning(false);
        clearInterval(savedInterval);
        let dataToSave = {
            id: stopwatch.id,
            name: stopwatch.name,
            running: false,
            savedElapsedTime: elapsedTime,
            lastRunStartTime: 0,
        };
        saveData(dataToSave);
    };

    const reset = () => {
        setRunning(false);
        setElapsedTime(0);
        clearInterval(savedInterval);
        let dataToSave = {
            id: stopwatch.id,
            name: stopwatch.name,
            running: false,
            savedElapsedTime: 0,
            lastRunStartTime: 0,
        };
        saveData(dataToSave);
    };

    const saveData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem("id" + stopwatch.id, jsonValue);
        } catch (exception) { }
    };

    const getHundredthSeconds = (milliSeconds) => {
        let rounded = Math.round(milliSeconds / 100) * 100;
        // Add leading zeroes if needed
        let string = rounded + "";
        while (string.length < 3) {
            string = "0" + string;
        }
        return string[0];
    };

    const renderTime = () => {
        let formatedTime = {
            days: Math.floor(elapsedTime / (1000 * 60 * 60 * 24)),
            hours: Math.floor((elapsedTime / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((elapsedTime / 1000 / 60) % 60),
            seconds: Math.floor((elapsedTime / 1000) % 60),
            milliSeconds: elapsedTime % 1000,
        };
        return (
            <View style={styles.elapsedTimeContainer}>
                {formatedTime.days != 0 &&
                    <Text style={styles.elapsedTimeValue}>
                        {formatedTime.days}
                    </Text>
                }
                {formatedTime.days != 0 &&
                    <Text style={styles.elapsedTimeUnit}> d  </Text>
                }
                {formatedTime.hours != 0 &&
                    <Text style={styles.elapsedTimeValue}>
                        {formatedTime.hours}
                    </Text>
                }
                {formatedTime.hours != 0 &&
                    <Text style={styles.elapsedTimeUnit}> h  </Text>
                }
                {formatedTime.minutes != 0 &&
                    <Text style={styles.elapsedTimeValue}>
                        {formatedTime.minutes}
                    </Text>
                }
                {formatedTime.minutes != 0 &&
                    <Text style={styles.elapsedTimeUnit}> m  </Text>
                }
                <Text style={styles.elapsedTimeValue}>
                    {formatedTime.seconds}
                </Text>
                <Text style={styles.elapsedTimeValue}>.</Text>
                <Text style={styles.elapsedTimeValue}>
                    {getHundredthSeconds(formatedTime.milliSeconds)}
                </Text>
                <Text style={styles.elapsedTimeUnit}> s</Text>
            </View>
        );
    };

    const renderButton = () => {
        if (running) {
            return (
                <MyButton text="STOP" color="#e57373" onPress={stop} />
            );
        } else {
            return (
                <MyButton
                    text={elapsedTime === 0 ? "START" : "RESUME"}
                    color="#81c784"
                    onPress={() => start(elapsedTime)} />
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.stopwatchTitle}>{stopwatch.name}</Text>
                <EditPopupMenu
                    stopwatch={stopwatch}
                    onPressReset={reset}
                    onPressRename={onPressRename}
                    onPressDelete={onPressDelete}
                />
            </View>
            {renderTime()}
            {renderButton()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#202020",
        padding: 8,
    },
    topContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    stopwatchTitle: {
        color: "#ffffff",
        fontSize: 25,
    },
    elapsedTimeContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 15,
        paddingBottom: 15,
    },
    elapsedTimeValue: {
        color: "#ffffff",
        fontSize: 35,
    },
    elapsedTimeUnit: {
        color: "#4fc3f7",
        fontSize: 35,
    },
});

export default Stopwatch;