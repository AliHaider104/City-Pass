import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");
import Map from "./Map";

import { auth, db } from "../firebase/firebase-config";
import { setDoc, doc, Timestamp } from "firebase/firestore";
var randomToken = require("random-token");

function CreateVoucher(props) {
  const [packageName, setPackageName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [selectedValue, setSelectedValue] = useState("food");

  const handleCreate = async () => {
    try {
      const key = randomToken(16);

      // Get Current Date
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();
      currentDate = mm + "/" + dd + "/" + yyyy;

      let category = "1";

      if (selectedValue === "restaurant") {
        category = "1";
      }

      if (selectedValue === "hotels") {
        category = "2";
      }

      if (selectedValue === "ride") {
        category = "3";
      }

      if (selectedValue === "park") {
        category = "4";
      }

      if (selectedValue === "museum") {
        category = "5";
      }

      if (selectedValue === "shopping") {
        category = "6";
      }

      await setDoc(doc(db, "Voucher", key), {
        createdBy: auth.currentUser.uid,
        packageName,
        selectedValue,
        price,
        description,
        latitude,
        longitude,
        key,
        createdAt: currentDate,
        category,
      });

      alert("Created!");
    } catch {
      alert("Not Created");
    }
  };

  React.useEffect(() => {}, [category]);

  return (
    <View style={styles.container}>
      <Picker
        style={{
          width: "100%",
          height: 100,
          color: "white",
          fontWeight: "bold",
        }}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Restaurant" value="restaurant" />
        <Picker.Item label="Hotels" value="hotels" />
        <Picker.Item label="Ride" value="ride" />
        <Picker.Item label="Park" value="park" />
        <Picker.Item label="Museum" value="museum" />
        <Picker.Item label="Shopping" value="shopping" />
      </Picker>
      <View style={styles.inputContainer}>
        <Ionicons style={styles.logo} name="card" size={20} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Package Name"
          value={packageName}
          onChangeText={(text) => {
            setPackageName(text);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons style={styles.logo} name="pricetag" size={20} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={(text) => {
            setPrice(text);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          style={styles.logo}
          name="ios-document-text-sharp"
          size={20}
          color="black"
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
      </View>
      <Map setLongitude={setLongitude} setLatitude={setLatitude} />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleCreate}>
        <Text style={styles.btnText}>Create Voucher</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CreateVoucher;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5e51c4",
    width: width - 20,
    height: (height / 2) + 50,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },

  input: {
    color: "#000",
    backgroundColor: "#FFF",
    width: "90%",
    marginLeft: 5,
  },

  primaryText: {
    fontSize: 25,
    color: "#3a3a3a",
    fontWeight: "600",
  },

  inputContainer: {
    flexDirection: "row",
    borderRadius: 5,
    marginTop: 5,
    width: width - 40,
    height: height / 18,
    backgroundColor: "#FFF",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
  },

  buttonContainer: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: width - 40,
    height: height / 18,
    borderRadius: 5,
    marginTop: 5,
    paddingBottom: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  btnText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
  },

  logo: {
    marginLeft: 4,
  },
});
