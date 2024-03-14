import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import TextDisplay from "./components/TextDisplay.js";
import StatusButton from "./components/StatusButton.js";

export default function App() {
  const [textSize, setTextSize] = useState(25);
  const [isConnected, setIsConnected] = useState(false);
  const [text, setText] = useState('Welcome to our capstone');
  const ws = new WebSocket('ws://192.168.0.196:2222');

  const decreaseTextSize = () => {
    setTextSize((prevSize) => Math.max(20, prevSize - 5));
  };

  const increaseTextSize = () => {
    setTextSize((prevSize) => Math.min(40, prevSize + 5));
  };

  const reconnect = () => {
    console.log("call the reconnect function.");
  };

  useEffect(() => {
    try {
      ws.onopen = () => {
        console.log('connected');
        setIsConnected(true);
      };
  
      ws.onclose = () => {
        console.log('disconnected');
        setIsConnected(false);
      };
  
      ws.onerror = (e) => {
        console.log('error:', e.message);
      };
  
      ws.onmessage = (e) => {
        console.log('message:', e.data);
        setText((prevText) => prevText + ' ' + e.data);
      };
  
      return () => {
        ws.close();
      };

    } catch (error) {
      console.log("error:", error);
    }

  }
  , []);

  return (
    <View style={styles.container}>
      <StatusButton onPress={reconnect} isConnected={isConnected} />
      <TextDisplay textSize={textSize} text={text}/>
      <View style={styles.buttonTextView}>
        <TouchableOpacity style={styles.textButton} onPress={decreaseTextSize}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textButton} onPress={increaseTextSize}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
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
    gap: 50,
  },
  textButton: {
    backgroundColor: "#D9D9D9",
    height: 80,
    width: 80,
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
