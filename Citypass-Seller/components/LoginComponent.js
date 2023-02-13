import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../firebase/firebase-config";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import ProgressDialog from "react-native-progress-dialog";

const { height, width } = Dimensions.get("window");

function LoginComponent({ navigation }) {
  const [isloading, setIsloading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);

  const LoginHandler = async (e) => {
    e.preventDefault();
    setIsloading(true)
    try {
      const Result = await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(doc(db, "Admin", Result.user.uid), {
        isOnline: true,
      });

      isOnline();
    } catch {
      setIsloading(false)

      alert("Email or Password is Not Correct!");
    }
  };

  const RegisterHanlder = (e) => {
    e.preventDefault();
    navigation.navigate("Register");
  };

  const isOnline = async () => {
    const q = query(
      collection(db, "Admin"),
      where("uid", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().isOnline) {
        if (doc.data().status !== "0") {
          navigation.replace("Home");
          setEmail("");
          setPassword("");
          setIsloading(false)
        } else {
          setIsloading(false)
          alert("Account is Not Aproved. Please Contact with Admin");
        }
      }
    });
  };

  const onforgotpasswordPressed = (e) => {
    e.preventDefault();
    setShow(false);
  };

  const onResetBAckPressed = (e) => {
    setPassword("");
    e.preventDefault();
    setShow(true);
  };

  const onResetPasswordPressed = async (e) => {
    e.preventDefault();
    // try {
    //   const Result = await sendPasswordResetEmail(auth, email);
    //   alert("Email Sent!");
    // } catch {
    //   alert("Email is Not Correct!");
    // }

    await sendPasswordResetEmail(auth, email)
      .then((userCredential) => {
        alert("Email Sent!");
        setShow(true);
        // const user = userCredential.user;
        // Navigation.replace("home", { amount: null });
      })
      .catch((error) => {
        alert("Email is Not Correct!");
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged(isOnline);
  }, []);

  return (
    <View style={styles.container}>
    <ProgressDialog visible={isloading} label={"login..."} />
      <Text style={styles.customText}>Welcome</Text>
      {show ? (
        <Text>Login and connect to world!</Text>
      ) : (
        <Text>Reset Your Password!</Text>
      )}
      <View style={styles.inputContainer}>
        <Ionicons
          style={styles.logo}
          name="mail-sharp"
          size={20}
          color="#5e51c4"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
      </View>
      {show ? <View style={styles.inputContainer}>
        <Ionicons
          style={styles.logo}
          name="lock-closed-sharp"
          size={20}
          color="#5e51c4"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>: null}
      {show ? <TouchableOpacity onPress={onforgotpasswordPressed} style={styles.forgotbuttonContainer}>
        <Text style={styles.forgotbuttonText} >Forgot Password?</Text>
      </TouchableOpacity>: null}
      {show ? <TouchableOpacity onPress={LoginHandler} style={styles.buttonContainer}>
        <Text style={styles.btnText}>Sign In</Text>
      </TouchableOpacity>: null}
      {show ? <TouchableOpacity
        onPress={RegisterHanlder}
        style={styles.buttonContainerRegister}
      >
        <Text style={styles.btnTextRegister}>Register</Text>
      </TouchableOpacity>: null}

      {show ?null: <TouchableOpacity onPress={onResetPasswordPressed} style={styles.buttonContainer}>
        <Text style={styles.btnText} >Reset Password</Text>
      </TouchableOpacity>}
      {show ? null : <TouchableOpacity onPress={onResetBAckPressed} style={styles.buttonContainer}>
        <Text style={styles.btnText}>Back</Text>
      </TouchableOpacity>}
    </View>
  );
}

export default LoginComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E9EAEC",
    height: height / 2,
    width: width - 20,
    justifyContent: "center",
    alignItems: "center",
  },

  primaryText: {
    fontSize: 25,
    color: "#FFF",
    fontWeight: "600",
  },

  customText: {
    fontSize: 25,
    color: "black",
    fontWeight: "600",
  },

  input: {
    color: "#000",
    backgroundColor: "#FFF",
    width: "90%",
    marginLeft: 5,
  },

  inputContainer: {
    flexDirection: "row",
    borderRadius: 5,
    marginTop: 10,
    width: width - 40,
    height: height / 18,
    backgroundColor: "#FFF",
    alignItems: "center",
    // borderColor: "#000",
    borderBottomColor: "#000",
    borderColor: "#E9EAEC",
    borderWidth: 1,
  },

  buttonContainer: {
    backgroundColor: "#5e51c4",
    justifyContent: "center",
    alignItems: "center",
    width: width - 40,
    height: height / 18,
    borderRadius: 5,
    marginTop: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  forgotbuttonContainer: {
    marginTop: 8,
    marginBottom: 20,
    marginRight: -200,
  },

  buttonContainerRegister: {
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    width: width - 40,
    height: height / 18,
    borderRadius: 5,
    borderColor: "#5e51c4",
    marginTop: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  btnTextRegister: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
  },
  btnText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },

  forgotbuttonText: {
    color: "red",
  },

  logo: {
    marginLeft: 4,
  },
});
