import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";

export default function CodeScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");

  const handleSubmit = async () => {
    try {
      await updateDoc(doc(db, "transaction", text), {
        status: 1,
      });
      alert("Voucher Started!");
    } catch {
      alert("Unable to Start Voucher!");
    }
  };

  const SignOutUser = async () => {
    const Result = await signOut(auth);
    navigation.navigate("Login");
  };

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  // Return the View
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={SignOutUser} style={styles.logoutBtn}>
        <Text style={styles.logoutBtnText}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {scanned && (
        <Button
          title={"Scan again?"}
          onPress={() => setScanned(false)}
          color="tomato"
        />
      )}

      <Button onPress={handleSubmit} title="Start Voucher"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
  logoutBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: 100,
    height: 40,
    marginBottom: 50,
    borderRadius: 5,
  },
  logoutBtnText: {
    fontWeight: "bold",
    color: "white"
  },
});
