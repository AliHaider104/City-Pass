import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
} from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import DisplayVoucher from "./DisplayVoucher";
import Map from "./Map";

const { height, width } = Dimensions.get("window");

import { auth, db } from "../firebase/firebase-config";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

function ModalComponent(props) {
  const [packageName, setpackageName] = useState(props.packageName);
  const [category, setcategory] = useState(props.category);
  const [price, setprice] = useState(props.price);
  const [Description, setDescription] = useState(props.description);
  const [key, setKey] = useState(props.Key);
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "Voucher", props.Key), {
        packageName: packageName,
        category: category,
        price: price,
        description: Description,
        latitude: latitude,
        longitude: longitude,
      });
      alert("Updated");
    } catch {
      alert("Not Updated");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "Voucher", props.Key));
      alert("Deleted");
    } catch {
      alert("Not Deleted");
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => {
          props.setModalVisible(!props.modalVisible);
        }}
      >
        <Ionicons name="close-circle-outline" size={32} />
      </TouchableOpacity>
      <DisplayVoucher
        packageName={packageName}
        category={category}
        price={price}
        description={Description}
        Key={key}
      />

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.input}>
            <Ionicons name={"card"} size={32}></Ionicons>
            <TextInput
              style={styles.inputField}
              placeholder="Package Name"
              value={packageName}
              onChangeText={(text) => {
                setpackageName(text);
              }}
            />
          </View>
          <View style={styles.input}>
            <Feather name={"type"} size={32}></Feather>
            <TextInput
              style={styles.inputField}
              placeholder="Category"
              value={category}
              onChangeText={(text) => {
                setcategory(text);
              }}
            />
          </View>

          <View style={styles.input}>
            <Entypo name={"info"} size={32}></Entypo>
            <TextInput
              style={styles.inputField}
              placeholder="Description"
              value={Description}
              onChangeText={(text) => {
                setDescription(text);
              }}
            />
          </View>

          <View style={styles.input}>
            <Entypo name={"price-tag"} size={32}></Entypo>
            <TextInput
              style={styles.inputField}
              placeholder="Price"
              value={price}
              onChangeText={(text) => {
                setprice(text);
              }}
            />
          </View>

          <Map setLatitude={setLatitude} setLongitude={setLongitude} />
          <View style={styles.insideContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Text style={styles.Text}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleUpdate}
            >
              <Text style={styles.Text}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ModalComponent;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
    marginTop: 10,
    display: "flex",
  },

  input: {
    paddingLeft: 5,
    borderRadius: 10,
    width: width - 20,
    height: height / 13,
    borderWidth: 1,
    borderColor: "#FFF",
    marginTop: 10,
    backgroundColor: "#d9d9d9",
    flexDirection: "row",
    paddingRight: 100,
    alignItems: "center",
  },

  inputField: {
    width: "70%",
    marginLeft: 20,
  },

  insideContainer: {
    flexDirection: "row",
    width: width,
    marginTop: 10,
    justifyContent: "center",
    marginBottom: 20,
  },

  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    marginRight: 5,
  },

  updateButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3579f6",
    padding: 10,
    borderRadius: 10,
  },

  Text: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFF",
  },
});
