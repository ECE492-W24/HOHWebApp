import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import TextDisplay from './components/TextDisplay.js';

export default function App() {
  const [textSize, setTextSize] = useState(25);

  const decreaseTextSize = () => {
    setTextSize((prevSize) => Math.max(20, prevSize - 5));
  };

  const increaseTextSize = () => {
    setTextSize((prevSize) => Math.min(50, prevSize + 5));
  };
  return (
    <View style={styles.container}>
      <View style={styles.status}/> 
      <TextDisplay textSize={textSize}/>
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
    paddingTop: '15%',
    paddingBottom: '15%',
    backgroundColor: '#D3F2FF',
    gap: 7,
  },
  status: {
    backgroundColor: '#FF4C41',
    height: 30,
    width: 30,
    borderRadius: 100,
    marginLeft: '85%',
  },
  buttonTextView: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    bottom: '5%',
    gap: 40,
  },
  textButton: {
    backgroundColor: '#D9D9D9',
    height: 90,
    width: 90,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 50,
    fontWeight: 'bold',
  }
});
