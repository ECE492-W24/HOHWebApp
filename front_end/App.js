import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import TextDisplay from "./components/TextDisplay.js";
import StatusButton from "./components/StatusButton.js";
import {BleManager} from 'react-native-ble-plx';

export default function App() {
  const [textSize, setTextSize] = useState(25);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState();
  const bleManager = new BleManager();

  const decreaseTextSize = () => {
    setTextSize((prevSize) => Math.max(20, prevSize - 5));
  };

  const increaseTextSize = () => {
    setTextSize((prevSize) => Math.min(50, prevSize + 5));
  };

  const reconnect = () => {
    console.log("call the reconnect function.");
  };

  useEffect(() => {
    // Function to handle Bluetooth connection
    const connectToBluetoothServer = async () => {
      try {
        // Scan for nearby Bluetooth devices
        const devices = await bleManager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            console.log('Error scanning:', error);
            return;
          }
          // Check if the device is your Raspberry Pi (you may need to adjust the condition)
          if (device.name === 'Your Raspberry Pi Name') {
            // Connect to the device
            bleManager.stopDeviceScan();
            device.connect().then((device) => {
              console.log('Connected to device:', device.name);

              // Discover services and characteristics
              device.discoverAllServicesAndCharacteristics().then((device) => {
                // Subscribe to notifications for the characteristic (you may need to adjust the UUID)
                device.monitorCharacteristicForService('Your Service UUID', 'Your Characteristic UUID', (error, characteristic) => {
                  if (error) {
                    console.log('Error monitoring characteristic:', error);
                    return;
                  }
                  const value = characteristic.value;
                  console.log('Received message:', value);
                  setMessage(value);
                });
              }).catch((error) => {
                console.log('Error discovering services and characteristics:', error);
              });
            }).catch((error) => {
              console.log('Error connecting to device:', error);
            });
          }
        });
      } catch (error) {
        console.log('Error:', error);
      }
    };

    // Call the function to connect to the Bluetooth server
    connectToBluetoothServer();

    // Clean up function to disconnect from the device
    return () => {
      bleManager.destroy();
    };
  }, []);

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
