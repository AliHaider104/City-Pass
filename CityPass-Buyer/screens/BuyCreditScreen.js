import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import CreditCardDisplay from "react-native-credit-card-display";
import CustomInput from "../components/CustomInput/";
import CustomButton from "../components/CustomButton/";
import { AntDesign } from "@expo/vector-icons";
import { auth, db } from "../Firebase";
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";
import * as Progress from "react-native-progress";

const BuyCreditScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [name, setName] = useState("");
  const [cvc, setCvc] = useState("");
  const [expiration, setExpiration] = useState("");
  const [offerValue, setOfferValue] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);
  var randomToken = require("random-token");
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  currentDate = mm + "/" + dd + "/" + yyyy;
  const [dollarRate, setDollarRate] = useState(0);

  const getDollarRate = () => {
    fetch(
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/pkr.json"
    ).then((response) => {
      if (response.ok) {
        return response.json().then((responseData) => {
          setDollarRate(responseData["pkr"].toFixed(1));
          return responseData;
        });
      }

      return response.json().then((error) => {
        console.log(error);
        return Promise.reject(error);
      });
    });
  };

  const getdata = async () => {
    const q = query(
      collection(db, "wallet"),
      where("uid", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      ca = doc.data();
    });
    setCurrentAmount(ca.amount);
  };

  const incrementValue = () => {
    let value = offerValue;
    setOfferValue(++value);
  };

  const decrementValue = () => {
    let value = offerValue;
    if (value <= 0) {
      value = 1;
    }
    setOfferValue(--value);
  };

  const confirmBox = () => {
    Alert.alert("Confirmation Box", "Press confirm to continue the process", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => handleOnPressedBuy(),
      },
    ]);
  };

  const handleOnPressedBuy = async () => {
    setLoading(true);
    getdata();

    let newAmount = offerValue + parseInt(currentAmount);
    try {
      await updateDoc(doc(db, "wallet", auth.currentUser.uid), {
        amount: newAmount,
      });

      let transaction_ID = randomToken(8);
      await setDoc(doc(db, "transaction", transaction_ID), {
        uid: auth.currentUser.uid,
        transactionID: transaction_ID,
        cardid: null,
        date: currentDate,
        offertype: null,
        type: "credit",
        creditAmount: offerValue,
        amount: newAmount,
        buyfrom: null,
        status: null,
      });
      setLoading(false);
      navigation.navigate("vault", {
        username: auth.currentUser,
        amount: newAmount,
      });
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  useEffect(() => {
    getdata();
    getDollarRate();
  }, [currentAmount]);

  return (
    <SafeAreaView style={{ flex: 1, top: 30 }}>
      <View style={styles.Header_container}>
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          onPress={() => {
            navigation.navigate("vault", {
              username: auth.currentUser,
              amount: currentAmount,
            });
          }}
        >
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.Card_Container}>
        <CreditCardDisplay
          number={accountNumber}
          name={name}
          cvc={cvc}
          expiration={expiration}
        />
      </View>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          paddingTop: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
        behavior="height"
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <Progress.Circle size={50} color={"#6c47a6"} indeterminate={true} />
          </View>
        ) : (
          <ScrollView style={styles.container}>
            <View style={styles.Bill_Container}>
              <View style={styles.Buy_Credit_Offer_Container}>
                <CustomButton
                  bgColor={"#6c47a6"}
                  text={10}
                  width={25}
                  onPress={() => {
                    getDollarRate();
                    setOfferValue(10);
                  }}
                />
                <CustomButton
                  bgColor={"#6c47a6"}
                  text={50}
                  width={25}
                  onPress={() => {
                    getDollarRate();
                    setOfferValue(50);
                  }}
                />
                <CustomButton
                  bgColor={"#6c47a6"}
                  text={100}
                  width={25}
                  onPress={() => {
                    getDollarRate();
                    setOfferValue(100);
                  }}
                />
              </View>
              <View style={styles.Bill_Actions_Container}>
                <CustomButton
                  bgColor={"#6c47a6"}
                  text={"+"}
                  width={20}
                  onPress={incrementValue}
                />
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}
                >
                  {offerValue}
                </Text>
                <CustomButton
                  bgColor={"#6c47a6"}
                  text={"-"}
                  width={20}
                  onPress={decrementValue}
                />
              </View>
              <View style={styles.Bill_Report_Container}>
                <View style={styles.Bill_Actions_Container}>
                  <Text style={styles.PriceValue}>
                    {offerValue ? " Rs. " + offerValue * dollarRate : "RS. 0"}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.Card_Input_Container}>
              <CustomInput
                placeholder={"Holder Name"}
                value={name}
                setValue={setName}
                maxLength={21}
              />
              <CustomInput
                placeholder={"Account Number"}
                keyboardType={"numeric"}
                maxLength={16}
                value={accountNumber}
                setValue={setAccountNumber}
              />
              <View style={styles.Card_Input_Container_bottom}>
                <CustomInput
                  placeholder={"Expiry Date"}
                  width={"45%"}
                  value={expiration}
                  setValue={setExpiration}
                  keyboardType={"numeric"}
                  maxLength={6}
                />
                <CustomInput
                  placeholder={"CVC"}
                  width={"45%"}
                  keyboardType={"numeric"}
                  value={cvc}
                  setValue={setCvc}
                  maxLength={3}
                />
              </View>
              {name && accountNumber && expiration && cvc ? (
                <CustomButton
                  text={"Buy"}
                  bgColor={"#502396"}
                  onPress={confirmBox}
                />
              ) : (
                <CustomButton text={"Buy"} type={"DISABLE"} disabled={true} />
              )}
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BuyCreditScreen;

const styles = StyleSheet.create({
  Header_container: {
    paddingLeft: 10,
    alignSelf: "flex-start",
    height: 30,
  },
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 10,
    padding: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#f8f8f8",
  },
  Card_Container: {
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  Bill_Container: {
    top: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    backgroundColor: "#502396",
    borderRadius: 20,
    bottom: 0,
  },
  Bill_Actions_Container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Bill_Report_Container: {
    width: "100%",
    height: 100,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  Card_Input_Container: {
    top: 10,
    backgroundColor: "#6c47a6",
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,
  },
  Card_Input_Container_bottom: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  Buy_Credit_Offer_Container: {
    display: "flex",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  Buy_Credit_Offer: {
    backgroundColor: "#502396",
    borderColor: "#fff",
    borderRadius: 10,
    margin: 5,
    padding: 30,
    borderWidth: 2,
  },
  PriceValue: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#502396",
  },
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
