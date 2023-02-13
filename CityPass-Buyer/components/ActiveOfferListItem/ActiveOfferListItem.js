import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const ActiveOfferListItem = ({ cardid, title, status, onPress }) => (
  <View style={styles.container}>
    {status === 0 ? (
      <View style={styles.status_container_purchased}>
        <Text></Text>
      </View>
    ) : (
      <View style={styles.status_container_active}>
        <Text>.</Text>
      </View>
    )}
    <View style={styles.container_text}>
      <Text style={styles.title}>{cardid}</Text>
      <Text style={styles.description}>{title}</Text>
    </View>
    {/* <View style={styles.status}></View> */}

    <TouchableOpacity
      style={styles.backButton_container}
      onPress={() => {
        onPress();
      }}
    >
      <Icon type="antdesign" name="arrowright" size={18} color="white" />
    </TouchableOpacity>
  </View>
);

export default ActiveOfferListItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: "#FFF",
    elevation: 2,
  },
  title: {
    fontSize: 15,
    color: "#000",
  },
  container_text: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 12,
    justifyContent: "center",
  },
  description: {
    fontSize: 11,
    fontStyle: "italic",
  },
  status: {
    height: 20,
    width: 20,
    backgroundColor: "green",
    borderRadius: 10,

    elevation: 2,
  },
  backButton_container: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: "#6c47a6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  status_container_purchased: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: "#ff9966",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  status_container_active: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: "#339900",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
});
