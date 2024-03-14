import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import TextDisplay from "./components/TextDisplay.js";
import StatusButton from "./components/StatusButton.js";
import { BleManager } from 'react-native-ble-plx';

const bleManager = new BleManager();

export default function App() {
  const [textSize, setTextSize] = useState(25);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState();

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
    console.log('in use effect');
    // Function to handle Bluetooth connection
    const connectToBluetoothServer = () => {
      try {
        // Scan for nearby Bluetooth devices
        const devices = bleManager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            console.log('Error scanning:', error);
            return;
          }
          console.log('ugh');
          // Check if the device is your Raspberry Pi (you may need to adjust the condition)
          if (device.name === 'raspberrypi') {
            // Connect to the device
            bleManager.stopDeviceScan();
            device.connect().then((device) => {
              console.log('Connected to device:', device.name);

              // Discover services and characteristics
              device.discoverAllServicesAndCharacteristics().then((device) => {
                // Subscribe to notifications for the characteristic (you may need to adjust the UUID)
                device.monitorCharacteristicForService('A07498CA-AD5B-474E-940D-16F1FBE7E8CD', '51FF12BB-3ED8-46E5-B4F9-D64E2FEC021B', (error, characteristic) => {
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

        console.log('Devices:', devices);
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
