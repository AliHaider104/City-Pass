import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/logo_h.png";
import UserContainer from "../components/UserContainer";
import Vault from "../components/Vault/Vault";
import NavOptions from "../components/NavOptions/";
import { signOut } from "@firebase/auth";
import { auth, db } from "../Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { GOOGLE_MAPS_APIKEY } from "@env";
import ActiveOfferListItem from "../components/ActiveOfferListItem/ActiveOfferListItem";

const GOOGLE_MAPS_APIKEY = "AIzaSyCHbH7aclcDDWZ6rYwI1IaI_6Cu3Mb3vVg"
const NavList = [
  {
    id: "1",
    title: "Nearby Offer",
    image:
      "https://firebasestorage.googleapis.com/v0/b/citypass-86ead.appspot.com/o/findoffers_optimized.png?alt=media&token=16ffb6bc-487b-4ad2-a7b0-6b4cb2f1930a",
    screen: "nearbyoffer",
  },
  {
    id: "2",
    title: "Buy Credit",
    image:
      "https://firebasestorage.googleapis.com/v0/b/citypass-86ead.appspot.com/o/citypass-visa-card-copy_optimized.png?alt=media&token=d5fdf7de-30a4-4551-a1fb-ca1379e6ff18",
    screen: "buycredit",
  },
];

const HomeScreen = ({ route }) => {
  const { amount } = route.params;
  const [user, setUser] = useState("");
  const navigation = useNavigation();
  const [toggle, setToggle] = useState(false);
  const [currentAmount, setCurrentAmount] = useState("");
  const [data, setData] = useState(null);

  const getActiveOffer = async () => {
    const q = query(
      collection(db, "transaction"),
      where("uid", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    let dummyData = [];
    querySnapshot.forEach((doc) => {
      dummyData.push(doc.data());
    });
    const sorted = dummyData.sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date)
    );

    setData(sorted);
  };

  const getdata = async () => {
    const q = query(
      collection(db, "wallet"),
      where("uid", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      ca = doc.data();
    });
    setCurrentAmount(ca.amount);
  };

  useEffect(() => {
    setUser(auth.currentUser);
    getdata();
    getActiveOffer();
    if (amount == null) {
      getdata();
    }
  }, [toggle]);

  const signout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("login");
      })
      .catch((e) => console.log(e.message));
  };

  const onPressesVault = () => {
    navigation.navigate("vault", {
      username: user,
      amount: currentAmount,
    });
  };

  return (
    <SafeAreaView style={styles.Background}>
      <Image source={logo} style={styles.logo} />

      <UserContainer
        username={user ? user.displayName : "loading..."}
        action={signout}
      />
      <View>
        <Vault
          amount={currentAmount >= 0 ? currentAmount : "..."}
          onPress={onPressesVault}
        />
      </View>

      <View style={styles.SearchContainer}>
        <GooglePlacesAutocomplete
          onPress={(data, details = null) => {
            console.log("Description: ", data.description);
            console.log(details.geometry.location.lat);
            console.log(details.geometry.location.lng);

            navigation.navigate("nearbyoffer", {
              targetLatitude: details.geometry.location.lat,
              targetLongitude: details.geometry.location.lng,
            });
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          enablePoweredByContainer={false}
          fetchDetails={true}
          returnKeyType={"search"}
          minLength={2}
          placeholder={"Search offers .."}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          styles={{
            container: { flex: 0 },
            textInput: { fontSize: 20 },
          }}
        />
      </View>
      <ScrollView>
        <View>
          <NavOptions data={NavList} />
        </View>
        <View style={styles.ActiveOffer}>
          <Text style={styles.ActiveOfferTitle}>My Offers</Text>
        </View>
        {data ? (
          data.map((item) =>
            item.type == "buy" ? (
              item.status >= 0 ? (
                <ActiveOfferListItem
                  key={item.transactionID}
                  title={item.title}
                  cardid={item.transactionID}
                  status={item.status}
                  onPress={() =>
                    navigation.navigate("viewrecepit", {
                      username: auth.currentUser,
                      amount: item.amount,
                      creditAmount: item.creditAmount,
                      cardid: item.cardid,
                      type: item.type,
                      transactionID: item.transactionID,
                      date: item.date,
                    })
                  }
                />
              ) : (
                <></>
              )
            ) : (
              <></>
            )
          )
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  Background: {
    padding: 10,
    backgroundColor: "#FFF",
    height: "100%",
  },
  logo: {
    resizeMode: "contain",
    height: 50,
    width: 100,
  },
  SearchContainer: {
    marginBottom: 5,
    padding: 5,
    borderLeftWidth: 2,
    borderColor: "lightgray",
  },
  ActiveOffer: {
    flex: 1,
    marginTop: 5,
    padding: 5,
    borderLeftWidth: 3,
    borderColor: "lightgray",
  },
  ActiveOfferTitle: {
    padding: 7,
    fontSize: 18,
    fontWeight: "bold",
    color: "gray",
  },
});
