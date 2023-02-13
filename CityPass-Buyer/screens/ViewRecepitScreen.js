import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";

import Recepit from "../components/Recepit/Recepit";

const ViewRecepitScreen = ({ navigation, route }) => {
  const {
    username,
    amount,
    creditAmount,
    cardid,
    type,
    transactionID,
    date,
    buyfrom,
  } = route.params;
  return (
    <SafeAreaView style={{ flex: 1, top: 30 }}>
      <View style={styles.Header_container}>
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          onPress={() => {
            navigation.navigate("home", { amount: null });
          }}
        >
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <ScrollView style={styles.Recepit_Container}>
          <Recepit
            transactionID={transactionID}
            date={date}
            type={type}
            amount={amount}
            creditAmount={creditAmount}
            cardid={cardid}
            buyfrom={buyfrom}
          />
          {type == "credit" ? (
            <></>
          ) : (
            <View style={styles.QR_container}>
              {/* <QRCode value={transactionID} size={200} /> */}
            </View>
          )}
          <View style={styles.emptyView}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ViewRecepitScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  Recepit_Container: {
    width: "100%",
  },
  QR_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyView: {
    height: 30,
  },
});
