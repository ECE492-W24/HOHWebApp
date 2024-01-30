import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const StatusButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.statusButton}
      onPress={onPress}
    ></TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  statusButton: {
    backgroundColor: "#FF4C41",
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
