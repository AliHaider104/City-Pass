import React, { useState, useEffect } from "react";
import { StyleSheet, ImageBackground, Image, View, Text } from "react-native";
import CustomInput from "../components/CustomInput/";
import backgroundImage from "../assets/login_bg.png";
import logo from "../assets/adaptive-icon.png";
import header_logo from "../assets/logo_h.png";
import CustomButton from "../components/CustomButton/";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../Firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "@firebase/auth";
import ErrorAlert from "../components/ErrorAlert";

const LoginScreen = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(true);

  const Navigation = useNavigation();

  function onAuthStateChanged(user) {
    setUser(user);
    if (user != null) {
      Navigation.replace("home", { amount: null });
    }
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onSignInPressed = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Navigation.replace("home", { amount: null });
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setError("Incorret Email");
          setEmail("");
          setPassword("");
        }
        if (error.code === "auth/internal-error") {
          setError("Please Enter Email/Password");
          setEmail("");
          setPassword("");
        }
        if (error.code === "auth/wrong-password") {
          setError("Invalid Password Try Agian");
          setPassword("");
        }
        if (error.code === "auth/user-not-found") {
          setError("Account Not Found with email of " + email);
          setPassword("");
        }
        console.log(error);
      });
  };

  const onRegisterPressed = (e) => {
    e.preventDefault();
    Navigation.navigate("register");
  };

  const onforgotpasswordPressed = (e) => {
    e.preventDefault();
    setShow(false);
  };

  const onResetBAckPressed = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const onResetPasswordPressed = async (e) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth, email)
      .then((userCredential) => {
        setError("Email Sent");
        setShow(true);
        // const user = userCredential.user;
        // Navigation.replace("home", { amount: null });
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setError("Incorret Email");
          setEmail("");
        }
        if (error.code === "auth/user-not-found") {
          setError("Account Not Found with email of " + email);
          setPassword("");
        }
        console.log(error);
      });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View style={styles.outerbody}>
        <View style={styles.Header}>
          <Image style={styles.Header_logo} source={logo} />
        </View>
        <View style={styles.body}>
          <Image style={styles.logo} source={header_logo} />
          {show ? <Text>Login and connect to world!</Text> : <Text>Reset Your Password!</Text>}
          {error ? <ErrorAlert message={error} type={"error"} /> : null}
          <CustomInput
            placeholder={"Email"}
            value={email}
            setValue={setEmail}
            borderWidth={"1"}
            placeholderTextColor={"gray"}
          />
          {show ? (
            <CustomInput
              placeholder={"Password"}
              secureTextEntry={true}
              value={password}
              setValue={setPassword}
              borderWidth={"1"}
              placeholderTextColor={"gray"}
            />
          ) : null}
          {show ? (
            <CustomButton
              text={"Forgot Password?"}
              onPress={onforgotpasswordPressed}
              type={"FORGOTPASSWORD"}
            />
          ) : null}
          {show ? (
            <CustomButton text={"Login"} onPress={onSignInPressed} />
          ) : null}
          {show ? (
            <CustomButton
              text={"Register"}
              onPress={onRegisterPressed}
              type={"TERTIARY"}
            />
          ) : null}

          {show ? null : (
            <CustomButton
              text={"Reset Password"}
              onPress={onResetPasswordPressed}
              type={"TERTIARY"}
            />
          )}
          {show ? null : (
            <CustomButton
              text={"BAck"}
              onPress={onResetBAckPressed}
              type={"TERTIARY"}
            />
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

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
