import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Button from './Button';

const IndividualStopWatch = ({ stopwatch }) => {

    const [elapsedTime, setElapsedTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [savedInterval, setSavedInterval] = useState();

    const start = () => {
        setRunning(true);
        let startTime = Date.now();
        let interval = setInterval(() => {
            setElapsedTime(elapsedTime + Date.now() - startTime);
        }, 50);
        setSavedInterval(interval);
    };

    const stop = () => {
        setRunning(false);
        clearInterval(savedInterval);
    };

    const pad = (number, size) => {
        let string = number + "";
        while (string.length < size) {
            string = "0" + string;
        }
        return string;
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
                        {pad(formatedTime.days, 2)}
                    </Text>
                }
                {formatedTime.days != 0 &&
                    <Text style={styles.elapsedTimeUnit}> d  </Text>
                }
                {formatedTime.hours != 0 &&
                    <Text style={styles.elapsedTimeValue}>
                        {pad(formatedTime.hours, 2)}
                    </Text>
                }
                {formatedTime.hours != 0 &&
                    <Text style={styles.elapsedTimeUnit}> h  </Text>
                }
                {formatedTime.minutes != 0 &&
                    <Text style={styles.elapsedTimeValue}>
                        {pad(formatedTime.minutes, 1)}
                    </Text>
                }
                {formatedTime.minutes != 0 &&
                    <Text style={styles.elapsedTimeUnit}> m  </Text>
                }
                <Text style={styles.elapsedTimeValue}>
                    {pad(formatedTime.seconds, 2)}
                </Text>
                <Text style={styles.elapsedTimeValue}>.</Text>
                <Text style={styles.elapsedTimeValue}>
                    {pad(formatedTime.milliSeconds, 3)}
                </Text>
                <Text style={styles.elapsedTimeUnit}> s</Text>
            </View>
        );
    }

    const renderButton = () => {
        if (running) {
            return (
                <Button text="STOP" color="#cc3333" onPress={stop}/>
            );
        } else {
            return (
                <Button text="START" color="#33cc33" onPress={start}/>
            );
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.stopwatchTitle}>{stopwatch.name}</Text>
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
        alignItems: "center",
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