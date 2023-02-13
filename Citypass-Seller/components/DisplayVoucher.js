import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");

function DisplayVoucher(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [primaryColor, setprimaryColor] = useState("#807aff");
  const [secondaryColor, setsecondaryColor] = useState("#605ace");
  const [packageName, setpackageName] = useState(props.packageName);
  const [category, setcategory] = useState(props.category);
  const [price, setprice] = useState(props.price);
  const [key, setKey] = useState(props.Key);
  const [Description, setDescription] = useState(props.description);
  const [logo, setlogo] = useState("home");

  useEffect(() => {
    if (props.category === "1") {
      setprimaryColor("#fec77a");
      setsecondaryColor("#f2ab45");
      setlogo("fast-food");
    } else if (props.category === "2") {
      setprimaryColor("#807aff");
      setsecondaryColor("#605ace");
      setlogo("home");
    } else if (props.category == "3") {
      setprimaryColor("#df85ae");
      setsecondaryColor("#e0659c");
      setlogo("car");
    } else if (props.category == "4") {
      setprimaryColor("#596174");
      setsecondaryColor("#303A52");
      setlogo("leaf");
    } else if (props.category == "5") {
      setprimaryColor("#F3a683");
      setsecondaryColor("rgb(228, 149, 109)");
      setlogo("earth");
    } else {
      setprimaryColor("#eb8686");
      setsecondaryColor("#e66868");
      setlogo("shirt");
    }

    setpackageName(props.packageName);
    setcategory(props.category);
    setDescription(props.description);
    setprice(props.price);
  }, [props.packageName, props.category, props.description, props.price]);

  return (
    <View>
      <View style={styles(primaryColor, secondaryColor).container}>
        <View style={styles(primaryColor, secondaryColor).logo}>
          <Ionicons name="apps-sharp" size={24} color="#FFF" />
        </View>
        <View style={styles(primaryColor, secondaryColor).packageName}>
          <Text style={styles(primaryColor, secondaryColor).packageNameText}>
            {packageName}
          </Text>
        </View>
        <View style={styles(primaryColor, secondaryColor).insideContainer}>
          <Text style={styles(primaryColor, secondaryColor).categoryText}>
            {key}
          </Text>
          <View style={styles(primaryColor, secondaryColor).priceTextWrapper}>
            <Text style={styles(primaryColor, secondaryColor).priceText}>
              {price} Rs
            </Text>
          </View>
        </View>
        <View style={styles(primaryColor, secondaryColor).infoContainer}>
          <Text style={styles(primaryColor, secondaryColor).detailsText}>
            {Description}
          </Text>
        </View>
        <View style={styles(primaryColor, secondaryColor).logo}>
          <Ionicons name={logo} color="#FFF" size={24} />
        </View>
      </View>
    </View>
  );
}

export default DisplayVoucher;
const styles = (primaryColor, secondaryColor) =>
  StyleSheet.create({
    container: {
      width: width - 10,
      backgroundColor: primaryColor,
      marginTop: 20,
      borderRadius: 20,
      flexDirection: "column",
      shadowColor: "#171717",
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
      paddingBottom: 10,
      overflow: "hidden",
    },

    packageName: {
      width: "100%",
      backgroundColor: secondaryColor,
      marginTop: 10,
      padding: 5,
      flexDirection: "row",
    },

    packageNameText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#FFF",
    },

    logo: {
      alignItems: "flex-end",
      marginTop: 5,
      marginRight: 5,
    },

    insideContainer: {
      flexDirection: "row",
      marginTop: 10,
    },

    categoryText: {
      fontSize: 20,
      color: "#FFF",
      backgroundColor: secondaryColor,
      fontWeight: "bold",
      paddingLeft: 5,
      marginLeft: 5,
      width: width / 2,
    },

    priceText: {
      fontSize: 24,
      color: "#FFF",
      padding: 5,
      fontWeight: "bold",
    },

    priceTextWrapper: {
      backgroundColor: "red",
      borderRadius: 10,
      marginRight: 5,
      marginLeft: 80,
    },

    infoContainer: {
      marginTop: 10,
      paddingLeft: 5,
    },

    detailsText: {
      color: "#FFF",
      fontWeight: "600",
    },
  });
