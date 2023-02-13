import React, { useState, useCallback } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Button,
} from "react-native";
import DocumentPicker, { types } from 'react-native-document-picker';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";

import { auth, db } from "../firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import ProgressDialog from "react-native-progress-dialog";

const { height, width } = Dimensions.get("window");

function RegisterComponent({ navigation }) {
  const [isloading, setIsloading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [checked, setChecked] = React.useState("second");
  const [show, setShow] = useState(true);

  const [fileResponse, setFileResponse] = useState([]);

  const [singleFile, setSingleFile] = useState(null);
 
  const uploadImage = async () => {
    // Check if any file is selected or not
    if (singleFile != null) {
      // If file selected then create FormData
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append('name', 'Image Upload');
      data.append('file_attachment', fileToUpload);
      // Please change file upload URL
      let res = await fetch(
        'http://www.africau.edu/images/default/sample.pdf',
        {
          method: 'post',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        }
      );
      let responseJson = await res.json();
      if (responseJson.status == 1) {
        alert('Upload Successful');
      }
    } else {
      // If no file selected the show alert
      alert('Please Select File first');
    }
  };
 
  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);


  

  const setUser = async (uid) => {
    console.log("setUser", uid);
    try {
      await setDoc(doc(db, "Admin", uid), {
        uid: uid,
        organization,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: false,
        type: checked,
        status: "0",
      });
    } catch (err) {
      alert(err);
    }
  };

  const Signup = async () => {
    setIsloading(true);
    try {
      const Result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(Result.user);

      await setDoc(doc(db, "Admin", Result.user.uid), {
        uid: Result.user.uid,
        organization,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: false,
        type: checked,
        document: "http://www.africau.edu/images/default/sample.pdf",
        status: "0",
      });
      setIsloading(false);
      navigation.goBack();
    } catch (err) {
      setIsloading(false);
      alert(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"auto"} />
      <ProgressDialog visible={isloading} label={"Signing Up ..."} />
      <Text style={styles.customText}>Welcome</Text>
      <Text>Already have an account? Go Back</Text>
      <View style={styles.inputContainer}>
        <Ionicons
          style={styles.logo}
          name="mail-sharp"
          size={20}
          color="black"
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
      <View style={styles.inputContainer}>
        <MaterialIcons
          style={styles.logo}
          name="groups"
          size={20}
          color="black"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Organization Name"
          value={organization}
          onChangeText={(text) => {
            setOrganization(text);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons
          style={styles.logo}
          name="lock-closed-sharp"
          size={20}
          color="#000"
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
      </View>
      

    

      
      <TouchableOpacity style={styles.buttonContainer} onPress={Signup}>
        <Text style={styles.btnText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RegisterComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E9EAEC",
    height: height / 2,
    width: width - 20,
    justifyContent: "center",
    alignItems: "center",
  },

  docPickerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    color: "#000",
    backgroundColor: "#FFF",
    width: "90%",
    marginLeft: 5,
  },

  customText: {
    fontSize: 25,
    color: "black",
    fontWeight: "600",
  },

  primaryText: {
    fontSize: 25,
    color: "#FFF",
    fontWeight: "600",
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

  logo: {
    marginLeft: 4,
  },
  radioContainer: {
    marginTop: 3,
    width: "95%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  radioBtnText: {
    fontWeight: "bold",
  },
  innerRadioContainer: {
    margin: 1,
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
