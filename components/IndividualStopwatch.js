import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Button from './Button';
import PopupMenu from './PopupMenu';

const IndividualStopWatch = ({ stopwatch, onPressRename, onPressDelete}) => {

    const [elapsedTime, setElapsedTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [savedInterval, setSavedInterval] = useState();

    const start = () => {
        setRunning(true);
        let lastTimeFromIntervalEnd = Date.now();
        let interval = setInterval(() => {
            let timeNow = Date.now();
            let delta = timeNow - lastTimeFromIntervalEnd;
            setElapsedTime(prevItem => prevItem + delta);
            lastTimeFromIntervalEnd = timeNow;
        }, 100);
        setSavedInterval(interval);
    };

    const stop = () => {
        setRunning(false);
        clearInterval(savedInterval);
    };

    const reset = () => {
        setRunning(false);
        setElapsedTime(0);
        clearInterval(savedInterval);
    }
    
    const getHundredthSeconds = (milliSeconds) => {
        let rounded = Math.round(milliSeconds / 100) * 100;
        // Add leading zeroes if needed
        let string = rounded + "";
        while (string.length < 3) {
            string = "0" + string;
        }
        return string[0];
    }

    const renderTime = () => {
        let formatedTime = {
            days: Math.floor(elapsedTime / (1000 * 60 * 60 * 24)),
            hours: Math.floor((elapsedTime / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((elapsedTime / 1000 / 60) % 60),
            seconds: Math.floor((elapsedTime / 1000) % 60),
            milliSeconds: elapsedTime % 1000
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
    }

    const renderButton = () => {
        if (running) {
            return (
                <Button text="STOP" color="#cc3333" onPress={stop} />
            );
        } else {
            return (
                <Button text="START" color="#33cc33" onPress={start} />
            );
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.stopwatchTitle}>{stopwatch.name}</Text>
                <PopupMenu
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
        backgroundColor: "#333333",
        padding: 10,
        marginTop: 6,
    },
    topContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    stopwatchTitle: {
        color: "#ffffff",
        fontSize: 25,
        alignSelf: "flex-start",
    },
    elapsedTimeContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingTop: 15,
        paddingBottom: 15,
    },
    elapsedTimeValue: {
        color: "#ffffff",
        fontSize: 35,
    },
    elapsedTimeUnit: {
        color: "#00ff00",
        fontSize: 25,
    },
});

export default IndividualStopWatch;