import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const StatusButton = (props) => {
  const { onPress, isConnected } = props;

  const buttonColor = isConnected ? "#00FF00" : "#FF4C41";

  return (
    <TouchableOpacity
      style={[styles.statusButton, { backgroundColor: buttonColor }]}
      onPress={onPress}
    ></TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  statusButton: {
    height: 28,
    width: 28,
    borderRadius: 100,
    alignItems: "center",
    marginLeft: "85%",
    marginTop: "5%",
  },
  buttonText: {
    fontSize: 50,
    fontWeight: "bold",
  },
});

export default StatusButton;
