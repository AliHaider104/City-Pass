import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const HistoryListItem = ({
  type = "credit",
  transactionID,
  cpcamount = 0,
  creditamount,
  cardid,
  user,
  date,
  buyfrom = "CardOffer",
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.List_container, styles[`List_container_${type}`]]}>
      <View style={styles.list_header}>
        <View style={styles.list_title_container}>
          {type === "buy" ? (
            <Icon
              style={styles.list_title_icon}
              type="antdesign"
              name="checkcircle"
              color="lightgray"
            />
          ) : (
            <Icon
              style={styles.list_title_icon}
              type="antdesign"
              name="plus"
              color="white"
            />
          )}
          <Text style={styles.list_title}>
            {type === "buy" ? "Buy Card" : "Buy Credit"}
          </Text>
        </View>
        <Text style={styles.list_time}>{date}</Text>
      </View>
      <View style={styles.list_body_container}>
        <View style={styles.list_body_text_container}>
          <Text style={styles.list_body_text}>
            {type === "buy" ? "From : " : "New Amount : "}
          </Text>
          <Text style={styles.list_body_text}>
            {type === "buy" ? buyfrom : cpcamount}
          </Text>
        </View>
        <View style={styles.list_body_text_container}>
          <Text style={styles.list_body_text}>
            {type == "credit" ? "credit" : "Price"} :{" "}
          </Text>
          <Text style={styles.list_body_text}>
            {creditamount ? creditamount : cpcamount} CPC
          </Text>
        </View>
        <View style={styles.lineStyle} />
        <View style={styles.list_body_actions_container}>
          <TouchableOpacity
            style={styles.list_body_actions}
            onPress={() => {
              navigation.navigate("viewrecepit", {
                username: user,
                date: date,
                amount: cpcamount,
                creditAmount: creditamount,
                type: type,
                transactionID: transactionID,
                cardid: cardid,
                buyfrom: buyfrom,
              });
            }}
          >
            <Text style={styles.list_title}>View Recepit</Text>
            <Icon
              style={styles.list_body_action_icon}
              type="antdesign"
              name="right"
              color="lightgray"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HistoryListItem;

const styles = StyleSheet.create({
  List_container: {
    width: 320,
    padding: 10,
    height: 160,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  List_container_buy: {
    backgroundColor: "#8054c7",
  },
  List_container_credit: {
    backgroundColor: "#54c782",
    alignSelf: "flex-end",
  },
  list_title: {
    color: "#f8f8f8",
    fontWeight: "bold",
    fontSize: 15,
  },
  list_time: {
    color: "#f8f8f8",
    fontWeight: "bold",
    fontSize: 15,
  },
  list_header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  list_title_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  list_title_icon: {
    marginRight: 10,
  },
  list_body_container: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
  list_body_text_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5,
  },
  list_body_text: {
    fontSize: 15,
    color: "white",
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "white",
    margin: 10,
  },
  list_body_actions_container: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  list_body_actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  list_body_action_icon: {
    marginLeft: 10,
  },
});
