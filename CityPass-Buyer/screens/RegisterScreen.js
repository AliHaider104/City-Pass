import React, { useState } from "react";
import { StyleSheet, ImageBackground, Image, View, Text } from "react-native";
import CustomInput from "../components/CustomInput/";
import backgroundImage from "../assets/login_bg.png";
import logo from "../assets/adaptive-icon.png";
import header_logo from "../assets/logo_h.png";
import CustomButton from "../components/CustomButton/";
import { useNavigation } from "@react-navigation/core";
import { createUserWithEmailAndPassword, updateProfile, signOut, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../Firebase";
import { setDoc, doc } from "firebase/firestore";
import { KeyboardAvoidingView } from "react-native";
import ErrorAlert from "../components/ErrorAlert";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigation = useNavigation();
  const [error, setError] = useState("");

  const onSignInPressed = () => {
    Navigation.navigate("login");
  };

  const onRegisterPressed = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // sendEmailVerification(userCredential.user);
        updateProfile(userCredential.user, {
          displayName: name,
          photoURL: null,
        })
          .then(
            setDoc(doc(db, "wallet", userCredential.user.uid), {
              uid: userCredential.user.uid,
              amount: "0",
            })
              .then(
                setDoc(doc(db, "user", userCredential.user.uid), {
                  uid: userCredential.user.uid,
                  name: name,
                  status: 0,
                  type: 0,
                }),
                // signOut(auth),
                Navigation.replace("login")
              )
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorCode);
                console.log(error.code);
              })
          )
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorCode);
            console.log(error.code);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (error.code === "auth/invalid-email") {
          setError("Incorret Email");
          setEmail("");
        }
        if (error.code === "auth/internal-error") {
          setError("Please Enter Email/Password");
        }
        if (error.code === "auth/wrong-password") {
          setError("Invalid Password Try Agian");
          setPassword("");
        }
        if (error.code === "auth/user-not-found") {
          setError("Account Not Found with email of " + email);
          setPassword("");
        }
        console.log(error.code);
      });
      
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground source={backgroundImage} style={styles.container}>
        <View style={styles.outerbody}>
          <View style={styles.Header}>
            <Image style={styles.Header_logo} source={logo} />
          </View>
          <View style={styles.body}>
            <Image style={styles.logo} source={header_logo} />
            <Text>Register and connect to world!</Text>
            {error ? <ErrorAlert message={error} type={"error"} /> : null}
            <CustomInput
              placeholder={"Name"}
              value={name}
              setValue={setName}
              borderWidth={"1"}
              placeholderTextColor={"gray"}
            />
            <CustomInput
              placeholder={"Email"}
              value={email}
              setValue={setEmail}
              borderWidth={"1"}
              placeholderTextColor={"gray"}
            />
            <CustomInput
              placeholder={"Password"}
              secureTextEntry={true}
              value={password}
              setValue={setPassword}
              borderWidth={"1"}
              placeholderTextColor={"gray"}
            />
            <CustomButton text={"Register"} onPress={onRegisterPressed} />
            <CustomButton
              text={"Login"}
              onPress={onSignInPressed}
              type={"TERTIARY"}
            />
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "#E9EAEC",
    resizeMode: "contain",
    margin: 0,
  },
  outerbody: {
    display: "flex",
    width: "100%",
    height: "100%",
    padding: "6%",
  },
  logo: {
    marginTop: 10,
    resizeMode: "contain",
    width: 100,
    height: 50,
  },
  Header: {
    flex: 1,
  },
  Header_logo: {
    resizeMode: "contain",
    width: 50,
    height: 50,
  },
  body: {
    padding: "5%",
    flex: 8,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
