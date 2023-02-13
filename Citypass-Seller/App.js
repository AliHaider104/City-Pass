import { StyleSheet } from "react-native";
import Navigator from "./routes/homeStack";
import "react-native-gesture-handler";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  return <Navigator screenOptions={{ headerShown: false }} />;
}

const styles = StyleSheet.create({});
