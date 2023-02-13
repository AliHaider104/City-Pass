import { LineChart } from "react-native-chart-kit";

import React, { useState, useEffect } from "react";
import { View, Dimensions, Text, StyleSheet } from "react-native";

import { auth, db } from "../firebase/firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

function Chart({refresh}) {
  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    const q = query(
      collection(db, "transaction"),
      where("buyfrom", "==", auth.currentUser.uid)
    );

    let earning = 0;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      earning = earning + parseInt(doc.data().amount);
    });

    setBalance(earning);
  };

  useEffect(() => {
    getBalance();
  }, [balance]);

  useEffect(()=>{
    getBalance();},[refresh])

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: ["This Month Earning"],
          datasets: [
            {
              data: [0, balance],
            },
          ],
        }}
        width={Dimensions.get("window").width - 20}
        height={220}
        yAxisLabel="Rs"
        yAxisSuffix=""
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#e26a00",
          backgroundGradientTo: "#e26a00",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
        }}
      />
    </View>
  );
}

export default Chart;

const styles = StyleSheet.create({
  container: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    paddingHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#e26a00",
    marginVertical: 10,
  },
});
