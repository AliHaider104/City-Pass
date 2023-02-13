import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
} from "react-native";
import Card from "../components/Card";
import CustomButton from "../components/CustomButton";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import CustomListItem from "../components/CustomListItem";
import { Foundation } from "@expo/vector-icons";
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

var randomToken = require("random-token");
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();
currentDate = mm + "/" + dd + "/" + yyyy;

const OfferCardView = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const { targetLatitude, targetLongitude, data } = route.params;
  console.log(targetLatitude, targetLongitude);
  const confirmBox = () => {
    Alert.alert("Confirmation Box", "Press confirm to buy the offer", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: () => onPressBuyOffer(),
      },
    ]);
  };

  const [currentAmount, setCurrentAmount] = useState(0);
  const days = 7;
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

  const onPressBuyOffer = async () => {
    setLoading(true);
    getdata();
    var transactionID = randomToken(8);
    try {
      await setDoc(doc(db, "transaction", transactionID), {
        uid: auth.currentUser.uid,
        transactionID: transactionID,
        date: currentDate,
        type: "buy",
        creditAmount: 0,
        amount: data.price,
        buyfrom: data.createdBy,
        cardid: data.key,
        offertype: data.category,
        status: 0,
      });
      try {
        await updateDoc(doc(db, "wallet", auth.currentUser.uid), {
          amount: currentAmount - data.price,
        }),
          setLoading(false);
        navigation.navigate("vault", {
          username: auth.currentUser,
          amount: currentAmount - data.price,
        });
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  useEffect(() => {
    getdata();
  }, [currentAmount]);

  return (
    <View style={[styles.safeArea, styles[`card_section_${data.category}`]]}>
      {loading ? (
        <View style={styles.container}>
          <Progress.Circle size={50} color={"#6c47a6"} indeterminate={true} />
        </View>
      ) : (
        <View style={styles.container}>
          <View
            style={[
              styles.Header_container,
              styles[`card_section_${data.category}`],
            ]}
          >
            <TouchableOpacity
              style={styles.backButton_container}
              onPress={() => {
                navigation.navigate("nearbyoffer", {
                  targetLatitude: targetLatitude,
                  targetLongitude: targetLongitude,
                });
              }}
            >
              <AntDesign name="back" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.card_section,
              styles[`card_section_${data.category}`],
            ]}
          >
            <Text style={styles.info_title}>BUY CARD</Text>
            <View
              style={[
                styles.card_container,
                styles[`card_container_${data.category}`],
              ]}
            >
              <Card
                type={data.category}
                title={data.packageName}
                date={data.createdAt}
                cardnumber={data.key}
                price={data.price}
              />
            </View>
          </View>
          <View
            style={[
              styles.info_section,
              styles[`card_section_${data.category}`],
            ]}
          >
            <View style={styles.info_container}>
              <ScrollView style={styles.infoList}>
                <CustomListItem
                  IconType={AntDesign}
                  Icon={"calendar"}
                  primarytext={"VALAIDITY"}
                  secondarytext={"7 Days"}
                />
                <CustomListItem
                  IconType={Foundation}
                  Icon={"dollar-bill"}
                  primarytext={"PRICE"}
                  secondarytext={data.price}
                />
                <CustomListItem
                  IconType={Entypo}
                  Icon={"info"}
                  primarytext={"DESCIPTION"}
                  secondarytext={data.description}
                />
              </ScrollView>
              {currentAmount - data.price >= 0 ? (
                <CustomButton
                  text="BUY"
                  width="50"
                  onPress={() => {
                    confirmBox();
                  }}
                />
              ) : (
                <>
                  <View style={styles.warningTextContainer}>
                    <Text>Don't have enough CPC to buy this orffer</Text>
                  </View>
                  <CustomButton
                    width="50"
                    text={"Buy"}
                    type={"DISABLE"}
                    disabled={true}
                  />
                </>
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default OfferCardView;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 30,
  },
  Header_container: {
    paddingLeft: 10,
    alignSelf: "flex-start",
    height: 30,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card_section: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  info_section: {
    flex: 2,
    backgroundColor: "#FFF",
    width: "100%",
  },
  card_container: {
    width: 280,
    height: 160,
  },
  card_section_1: {
    backgroundColor: "#FFC56D",
  },
  card_section_2: {
    backgroundColor: "#8a81f7",
  },
  card_section_3: {
    backgroundColor: "#ed7fb0",
  },
  card_section_4: {
    backgroundColor: "#596174",
  },
  card_section_5: {
    backgroundColor: "#F3a683",
  },
  card_section_6: {
    backgroundColor: "#eb8686",
  },
  info_container: {
    paddingTop: 30,
    backgroundColor: "#FFF",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  info_title: {
    marginLeft: 20,
    marginBottom: 20,
    alignSelf: "flex-start",
    color: "#111",
    fontSize: 20,
    fontWeight: "bold",
  },
  infoList: {
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    width: "90%",
    padding: 5,
    backgroundColor: "#F9F9F9",
    marginBottom: 20,
  },
  warningTextContainer: {
    marginBottom: 5,
  },
  backButton_container: {
    marginLeft: 10,
    marginTop: 1,
    padding: 3,
    backgroundColor: "white",

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});
