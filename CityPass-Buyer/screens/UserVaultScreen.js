import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Vault from "../components/Vault";
import { Icon } from "react-native-elements";
import HistoryListItem from "../components/HistoryListItem";
import { auth, db } from "../Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import * as Progress from "react-native-progress";

const UserVaultScreen = ({ navigation, route }) => {
  const { username, amount } = route.params;

  var today = new Date(),
    currentHour = today.getHours();
  const [data, setData] = useState(null);

  const getAmount = async () => {
    const q = query(
      collection(db, "wallet"),
      where("uid", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      ca = doc.data();
    });
    amount = ca.amount;
  };

  const getdata = async () => {
    const q = query(
      collection(db, "transaction"),
      where("uid", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    let dummyData = [];
    querySnapshot.forEach((doc) => {
      dummyData.push(doc.data());
    });
    const sorted = dummyData.sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date)
    );
    setData(sorted);
  };

  useEffect(() => {
    if (amount == null) {
      getAmount();
    }
    getAmount();
    getdata();
  }, []);

  const onPressAddCredit = () => {
    navigation.navigate("buycredit");
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.Header_container}>
          <TouchableOpacity
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.replace("home", { amount: null });
            }}
          >
            <AntDesign name="back" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.Body_container}>
          <View style={styles.Profile_container}>
            <View style={styles.User_Profile_container}>
              <View style={styles.Greeting_container}>
                <Text style={styles.Greeting_Text}>
                  {currentHour >= 5 && currentHour < 12
                    ? "Good Moring,"
                    : currentHour >= 16 && currentHour < 20
                    ? "Good Evening,"
                    : currentHour >= 0 && currentHour <= 5
                    ? "Good Night,"
                    : "Have a Good Day,"}
                </Text>
                <Text style={styles.Greeting_username}>
                  {username.displayName}
                </Text>
              </View>
              <View style={{ marginRight: 20 }}>
                <Icon
                  style={styles.Icon}
                  type="antdesign"
                  name="user"
                  size={50}
                  color="white"
                />
              </View>
            </View>
            <Vault
              amount={amount >= 0 ? amount : "..."}
              addcredit={true}
              onPress={onPressAddCredit}
            />
          </View>
          {data == null ? (
            <View style={styles.body}>
              <View style={styles.loading}>
                <Progress.Bar
                  indeterminate={true}
                  color={"#6c47a6"}
                  width={300}
                />
              </View>
            </View>
          ) : (
            <View style={styles.body}>
              <ScrollView style={styles.body_item_container}>
                {data.map(
                  (data, index) => (
                    console.log(data),
                    (
                      <HistoryListItem
                        key={index}
                        type={data.type}
                        user={username}
                        date={data.date}
                        cpcamount={data.amount}
                        cardid={data.cardid}
                        creditamount={data.creditAmount}
                        transactionID={data.transactionID}
                        buyfrom={data.buyfrom}
                      />
                    )
                  )
                )}
                <View style={styles.emptyView}></View>
              </ScrollView>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default UserVaultScreen;

const styles = StyleSheet.create({
  Header_container: {
    paddingTop: 30,
    height: 60,
    paddingLeft: 10,
    alignSelf: "flex-start",
    width: "100%",
    backgroundColor: "#502396",
  },
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
  },
  Body_container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F8F8F8",
  },
  Profile_container: {
    backgroundColor: "#502396",
    height: 300,
    padding: 10,
    borderBottomLeftRadius: 15,
  },
  User_Profile_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Greeting_container: {
    padding: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  Greeting_Text: {
    fontSize: 25,
    color: "#F9F9F9",
    fontWeight: "bold",
  },
  Greeting_username: {
    fontSize: 22,
    color: "#F6f6f6",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  body: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  body_item_container: {
    paddingTop: 30,
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  emptyView: {
    height: 50,
  },
  loading: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
