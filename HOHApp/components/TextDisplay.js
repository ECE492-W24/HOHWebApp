import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

export default function TextDisplay() {
  return (
    <View style={styles.container}>
        <ScrollView>
            <Text style={styles.text} >Welcome to our Capstone Project</Text>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '80%',
        width: '90%',
        padding: 30,
        borderRadius: 30,
    },
    text: {
        fontSize: 25,
    }
});
