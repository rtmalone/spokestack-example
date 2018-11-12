/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import GoogleKey from "./google-key.json";

const Spokestack = Platform.select({
  android: require("react-native-spokestack")
});

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spoken: "",
      recording: false,
      message: null
    };
  }

  componentDidMount() {
    if (Spokestack && Platform.OS === "android") {
      Spokestack.initialize({
        input: "com.pylon.spokestack.android.MicrophoneInput",
        stages: [
          "com.pylon.spokestack.libfvad.VADTrigger",
          "com.pylon.spokestack.google.GoogleSpeechRecognizer"
        ],
        properties: {
          "vad-mode": "aggressive",
          "vad-rise-delay": 30,
          "vad-fall-delay": 40,
          "google-credentials": JSON.stringify(GoogleKey),
          locale: "en-US",
          "sample-rate": 16000,
          "frame-width": 20,
          "buffer-width": 20
        }
      });
      const logEvent = e => console.log(e);
      Spokestack.onSpeechStarted = logEvent;
      Spokestack.onSpeechEnded = logEvent;
      Spokestack.onSpeechError = e => {
        Spokestack.stop();
        logEvent(e);
      };
      Spokestack.onSpeechRecognized = this.speechDetected;
    }
  }

  speechDetected = e => {
    if (e.transcript.length > 0) {
      this.setState({ spoken: e.transcript });
    }
  };

  render() {
    const { recording, message, spoken } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button
          title={recording ? "Stop Listening" : "Start Listening"}
          style={styles.button}
          onPress={async () => {
            if (recording) {
              Spokestack.stop();
              this.setState({ recording: false });
            } else if (!recording && Platform.OS === "android") {
              this.setState({ recording: true }, Spokestack.start);
            } else {
              const message =
                Platform.OS !== "android"
                  ? "Spokestack only supported on Android."
                  : "Turn on your microphone.";
              this.setState({ message });
            }
          }}
        />
        {recording && <Text>Heard: "{spoken}"</Text>}
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  button: {
    marginVertical: 10
  },
  message: {
    color: "red"
  }
});
