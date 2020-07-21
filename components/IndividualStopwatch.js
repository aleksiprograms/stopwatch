import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

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
                <TouchableOpacity
                    style={[styles.button, styles.buttonRed]}
                    onPress={stop}
                >
                    <Text style={styles.buttonText}>STOP</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    style={[styles.button, styles.buttonGreen]}
                    onPress={start}
                >
                    <Text style={styles.buttonText}>START</Text>
                </TouchableOpacity>
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
    button: {
        width: 150,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonGreen: {
        backgroundColor: "#33cc33",
    },
    buttonRed: {
        backgroundColor: "#cc3333",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 25,
    },
});

export default IndividualStopWatch;