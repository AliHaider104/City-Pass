import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import logo from "../../assets/recepit_logo.png";
import header_logo from "../../assets/logo_h.png";
import { Icon } from "react-native-elements";
import QRCode from "react-native-qrcode-svg";
import { format } from "date-fns";
import CustomButton from "../CustomButton";

const onPressSave = () => {
  alert("saving...");
};

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const Recepit = ({
  transactionID,
  date,
  type,
  creditAmount,
  amount,
  cardid,
  buyfrom,
}) => {
  var headerDate = new Date(date);
  var headerDate = format(headerDate, "MMM d, yyyy ");
  var expiryDate = format(addDays(date, 7), "MMM d, yyyy ");
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={logo} style={styles.Image}>
        <View style={styles.Recepit_header_container}>
          <Icon type="antdesign" name="checkcircle" size={50} color="green" />
          <Image style={styles.logo} source={header_logo} />
          <Text style={styles.Recepit_header_Text}>Transaction Successful</Text>
        </View>
        <View style={styles.Recepit_body_container}>
          <View style={{ marginBottom: 20, width: "100%" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <View>
                <Text>{headerDate}</Text>
                <Text>ID# {transactionID}</Text>
              </View>
              {type == "credit" ? (
                <></>
              ) : (
                <TouchableOpacity onPress={toggleModalVisibility}>
                  <QRCode value={transactionID} size={35} />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.lineStyle} />
          </View>
          {type == "credit" ? (
            <View style={styles.Recepit_body_Credit_Text_container}>
              <Text style={styles.Recepit_body_Credit_Title_Text}>
                Credit Amount
              </Text>
              <Text style={styles.Recepit_body_Credit_Title_Text}>
                {creditAmount} $
              </Text>
            </View>
          ) : (
            <View>
              <Modal
                animationType="slide"
                visible={isModalVisible}
                presentationStyle="overFullScreen"
                onDismiss={toggleModalVisibility}
              >
                <View style={styles.QRmodal}>
                  <QRCode value={transactionID} size={350} />
                  <CustomButton
                    text={"Close"}
                    width={50}
                    onPress={toggleModalVisibility}
                  />
                </View>
              </Modal>
              <View style={styles.Recepit_body_Title_Text_container}>
                <Text style={styles.Recepit_body_Title_Text}>Company ID</Text>
                <Text style={styles.Recepit_body_Text}>{buyfrom}</Text>
              </View>
              <View style={styles.Recepit_body_Title_Text_container}>
                <Text style={styles.Recepit_body_Title_Text}>Card ID</Text>
                <Text style={styles.Recepit_body_Text}>{cardid}</Text>
              </View>
              <View style={styles.Recepit_body_Title_Text_container}>
                <Text style={styles.Recepit_body_Title_Text}>Expiry Date</Text>
                <Text style={styles.Recepit_body_Text}>{expiryDate}</Text>
              </View>
              <View style={styles.Recepit_body_Title_Text_container}>
                <Text style={styles.Recepit_body_Title_Text}>Amount</Text>
                <Text style={styles.Recepit_body_Text}>
                  {amount}$ / Rs. {amount * 170}
                </Text>
              </View>
              <View style={styles.Recepit_body_Title_Text_container}>
                <Text
                  style={[styles.Recepit_body_Title_Text, { color: "green" }]}
                >
                  Total Amount
                </Text>
                <Text style={styles.Recepit_body_Text}>
                  {amount}$ / Rs. {amount * 182}
                </Text>
              </View>
              <View style={styles.Recepit_body_Footer_container}>
                {/* <TouchableOpacity onPress={onPressSave}>
                <Icon type="antdesign" name="save" size={25} color="green" />
                <Text style={styles.Recepit_body_Text}>Save/Share</Text>
              </TouchableOpacity> */}
              </View>
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default Recepit;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 630,
    backgroundColor: "#fff",
  },
  Image: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  Recepit_header_container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
    width: "100%",
  },
  logo: {
    marginTop: 10,
    resizeMode: "contain",
    width: 100,
    height: 50,
  },
  Recepit_header_Text: {
    fontSize: 20,
    color: "green",
  },
  Recepit_body_container: {
    flex: 1,
    width: "100%",
    padding: 10,
    paddingLeft: 20,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "gray",
    marginTop: 10,
  },
  Recepit_body_Title_Text_container: {
    marginBottom: 10,
  },
  Recepit_body_Credit_Text_container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  Recepit_body_Credit_Title_Text: {
    top: -50,
    fontSize: 18,
    color: "green",
    fontWeight: "bold",
  },
  Recepit_body_Title_Text: {
    fontSize: 18,
    color: "gray",
    fontWeight: "bold",
  },
  Recepit_body_Text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  Recepit_body_Footer_container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  QRmodal: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
