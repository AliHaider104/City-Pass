import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Navigation from "./navigation";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs();
LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
