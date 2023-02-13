import React, { useEffect, useState } from "react";

import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Fontisto } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");

import { auth, db } from "../firebase/firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

function BalanceCard({refresh}) {
  const [balance, setBalance] = useState(0);
  const [numbersOfVoucher, setNumberOfVoucher] = useState(0);

  const getBalance = async () => {
    const q = query(
      collection(db, "transaction"),
      where("buyfrom", "==", auth.currentUser.uid)
    );

    let earning = 0;
    let sales = 0;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      sales = sales + 1;
      earning = earning + parseInt(doc.data().amount);
    });

    setBalance(earning);
    setNumberOfVoucher(sales);
  };

  useEffect(() => {
    getBalance();
  }, [balance]);

  useEffect(()=>{
    getBalance();},[refresh])

  return (
    <View style={styles.container}>
      <Text style={styles.primaryText}> PRIMARY ACCOUNT</Text>
      <View style={styles.balance}>
        <View style={styles.balanceContainer}>
          <Text style={styles.moneyText}>
            {" "}
            {balance}
            {".00Rs"}
          </Text>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.companyName}>Total Vouchers Sold</Text>
          <Text style={styles.companyName}> {numbersOfVoucher}</Text>
        </View>
      </View>
      <Text style={styles.creditCard}>{auth.currentUser.uid}</Text>
      <View style={styles.companyNameWrapper}>
        <Fontisto name="credit-card" size={24} color="#FFF" />
      </View>
    </View>
  );
}

export default BalanceCard;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    marginTop: 0,
    backgroundColor: "#5e51c4",
    borderRadius: 20,
    width: width - 10,
    height: height / 4,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
  },

  primaryText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "700",
    marginTop: 5,
    marginLeft: 5,
  },

  creditCard: {
    position: "absolute",
    bottom: 5,
    fontSize: 16,
    color: "#FFF",
    fontWeight: "700",
    marginLeft: 5,
    paddingBottom: 10,
    paddingLeft: 10
  },

  balance: {
    marginTop: 20,
  },

  balanceContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#5e51c4",
    paddingRight: 100,
    marginLeft: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  moneyText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
  },

  companyName: {
    fontSize: 16,
    color: "#FFF",
    marginLeft: 3,
  },

  companyNameWrapper: {
    position: "absolute",
    bottom: 5,
    right: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    paddingRight: 10
  },
});
