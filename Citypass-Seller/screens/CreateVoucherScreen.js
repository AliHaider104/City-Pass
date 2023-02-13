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
} from "react-native";
import CreateVoucher from "../components/CreateVoucher";
import { FontAwesome5 } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");

function CreateVoucherScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logo}>
        <Image style={styles.img} source={require("../assets/logo_h.png")} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.details}
      >
        <ScrollView>
          <CreateVoucher />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default CreateVoucherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#FFF",
    width: width,
    height: height,
  },

  details: {
    backgroundColor: "#5e51c4",
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    width: width,
    height: height,
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#000",
  },

  logo: {
    alignItems: "center",
    top: -20,
    height: height / 10,
    width: "100%",
  },

  img: {
    width: 150,
    height: 120,
    resizeMode: "contain",
  },
});
