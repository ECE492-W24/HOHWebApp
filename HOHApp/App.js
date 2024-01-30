import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import TextDisplay from "./components/TextDisplay.js";
import StatusButton from "./components/StatusButton.js";
export default function App() {
  const [textSize, setTextSize] = useState(25);

  const decreaseTextSize = () => {
    setTextSize((prevSize) => Math.max(20, prevSize - 5));
  };

  const increaseTextSize = () => {
    setTextSize((prevSize) => Math.min(50, prevSize + 5));
  };

  const reconnect = () => {
    console.log("call the reconnect function.");
  };
  return (
    <View style={styles.container}>
      <StatusButton onPress={reconnect} />
      <TextDisplay textSize={textSize} />
      <View style={styles.buttonTextView}>
        <TouchableOpacity style={styles.textButton} onPress={decreaseTextSize}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textButton} onPress={increaseTextSize}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "5%",
    paddingBottom: "27%",
    backgroundColor: "#D3F2FF",
    gap: 7,
  },
  buttonTextView: {
    flexDirection: "row",
    alignSelf: "center",
    position: "absolute",
    bottom: "5%",
    gap: 100,
  },
  textButton: {
    backgroundColor: "#D9D9D9",
    height: 60,
    width: 60,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    opacity: "10%",
  },
  buttonText: {
    fontSize: 50,
    fontWeight: "bold",
  },
});
