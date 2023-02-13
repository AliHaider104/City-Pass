import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");

import { auth, db } from "../firebase/firebase-config";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

function Profile({ navigation }) {
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");

  const SignOutUser = async () => {
    await updateDoc(doc(db, "Admin", auth.currentUser.uid), {
      isOnline: false,
    });
    const Result = await signOut(auth);
    navigation.navigate("Login");
  };

  const getAdmin = async () => {
    const q = query(
      collection(db, "Admin"),
      where("uid", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setEmail(doc.data().email);
      setOrganization(doc.data().organization);
    });
  };

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cover}></View>
      <View style={styles.cover}>
        <Ionicons name="person-circle" size={62} color="#FFF" />
        <Text style={styles.userName}>{organization}</Text>
      </View>

      <View style={styles.emailWrapper}>
        <Ionicons name="mail" size={32} color="#FFF" />
        <Text style={styles.userEmail}>{email}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={SignOutUser}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <FontAwesome5 name="city" size={24} color="#FFF" style={styles.logo} />
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5e51c4",
    width: width - 10,
    overflow: "hidden",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 20,
  },

  userName: {
    fontSize: 15,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 10,
  },

  userEmail: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
    padding: 3,
  },

  button: {
    backgroundColor: "#FFF",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 10,
  },

  buttonText: {
    fontWeight: "bold",
  },

  logo: {
    position: "absolute",
    bottom: 5,
    right: 5,
    paddingBottom: 10,
    paddingRight: 10
  },

  cover: {
    width: width,
    alignItems: "center",
    backgroundColor: "#5e51c4",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  emailWrapper: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    
  },
});
