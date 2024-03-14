import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";

export default function TextDisplay(props) {
  const { textSize } = props;
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{ fontSize: textSize }}>
          Welcome to our capstone project!!!
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: "80%",
    width: "90%",
    padding: 30,
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
});
