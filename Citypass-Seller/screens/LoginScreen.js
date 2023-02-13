import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Dimensions,
  Image,
  StatusBar
} from "react-native";
import LoginComponent from "../components/LoginComponent";
const { height, width } = Dimensions.get("window");

function LoginScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle={"auto"} />
      <View style={styles.logo}>
        <Image style={styles.img} source={require("../assets/icon.png")} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.details}
      >
        <ScrollView>
          <LoginComponent navigation={props.navigation} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#FFF",
  },

  details: {
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    height: "100%",
    backgroundColor: "#E9EAEC",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#000",
  },

  logo: {
    alignItems: "center",
    top: 6,
    height: height / 8,
    width: width / 6,
  },

  img: {
    height: "100%",
    width: "100%",
  },
});
