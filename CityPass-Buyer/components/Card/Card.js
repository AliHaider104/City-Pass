import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Card = ({
  onPress,
  type = "1",
  title,
  cardnumber,
  date,
  price = "0",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.Body, styles[`Body_${type}`]]}
    >
      <View style={[styles.HeadStrip, styles[`HeadStrip_${type}`]]}>
        <View style={styles.HeaderIcon}>
          <MaterialCommunityIcons name="apps" size={35} color="white" />
        </View>
        <View style={styles.TitleContainer}>
          <Text style={styles.Title}>{title}</Text>
        </View>
      </View>
      <View style={styles.Footer}>
        <View style={styles.FooterLeft}>
          <View
            style={[styles.NumberContainer, styles[`NumberContainer_${type}`]]}
          >
            <Text style={styles.Title}>{cardnumber}</Text>
          </View>
          <Text style={styles.Date}>{date}</Text>
        </View>

        <View style={styles.FooterRight}>
          <View style={styles.PriceContainer}>
            <Text style={styles.Price}>{price}</Text>
          </View>
          <View style={styles.FooterIcon}>
            {type == "1" ? (
              <Ionicons name="ios-fast-food" size={40} color="white" />
            ) : (
              <></>
            )}
            {type == "2" ? (
              <Fontisto name="hotel" size={40} color="white" />
            ) : (
              <></>
            )}
            {type == "3" ? (
              <FontAwesome5 name="car" size={40} color="white" />
            ) : (
              <></>
            )}
            {type == "4" ? (
              <MaterialIcons name="park" size={40} color="white" />
            ) : (
              <></>
            )}
            {type == "5" ? (
              <Fontisto name="earth" size={40} color="white" />
            ) : (
              <></>
            )}
            {type == "6" ? (
              <FontAwesome name="shopping-bag" size={40} color="white" />
            ) : (
              <></>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  Body: {
    paddingTop: "7%",
    width: "100%",
    height: "100%",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: -1, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
    elevation: 5,
  },
  HeadStrip: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: "center",
    width: "100%",
    height: "20%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  HeaderIcon: {
    alignSelf: "flex-end",
  },
  TitleContainer: {
    paddingLeft: "5%",
  },
  Title: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#fff",
  },
  Footer: {
    flex: 1,
    flexDirection: "row",
    padding: "2%",
  },
  FooterLeft: {
    flex: 2,
    justifyContent: "flex-end",
    flexDirection: "column",
    padding: "2%",
  },
  NumberContainer: {
    padding: "5%",
    marginBottom: "5%",
  },
  FooterRight: {
    flex: 1,
    justifyContent: "flex-end",
  },
  FooterIcon: {
    padding: "10%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  Date: {
    color: "#fff",
    fontSize: 15,
  },
  PriceContainer: {
    borderRadius: 10,
    backgroundColor: "red",
    padding: 5,
  },
  Price: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  Body_1: {
    backgroundColor: "#FFC56D",
  },
  Body_2: {
    backgroundColor: "#8a81f7",
  },
  Body_3: {
    backgroundColor: "#ed7fb0",
  },
  Body_4: {
    backgroundColor: "#596174",
  },
  Body_5: {
    backgroundColor: "#F3a683",
  },
  Body_6: {
    backgroundColor: "#eb8686",
  },
  HeadStrip_1: {
    backgroundColor: "#ffa721",
  },
  HeadStrip_2: {
    backgroundColor: "#766bf4",
  },
  HeadStrip_3: {
    backgroundColor: "#f35b9f",
  },
  HeadStrip_4: {
    backgroundColor: "#303A52",
  },
  HeadStrip_5: {
    backgroundColor: "rgb(228, 149, 109)",
  },
  HeadStrip_6: {
    backgroundColor: "#e66868",
  },
  NumberContainer_1: {
    backgroundColor: "#ffa721",
  },
  NumberContainer_2: {
    backgroundColor: "#766bf4",
  },
  NumberContainer_3: {
    backgroundColor: "#f35b9f",
  },
  NumberContainer_4: {
    backgroundColor: "#303A52",
  },
  NumberContainer_5: {
    backgroundColor: "rgb(228, 149, 109)",
  },
  NumberContainer_6: {
    backgroundColor: "#e66868",
  },
});
