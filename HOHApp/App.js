import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TextDisplay from './components/TextDisplay.js';

export default function App() {
  return (
    <View style={styles.container}>
      <TextDisplay />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3F2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
