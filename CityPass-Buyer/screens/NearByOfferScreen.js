import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Circle,
  Marker,
  Callout,
} from "react-native-maps";
import { auth, db } from "../Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import geolib, { getDistance } from "geolib";
import * as Progress from "react-native-progress";
import Card from "../components/Card";
import { AntDesign } from "@expo/vector-icons";
import useLocation from "../hooks/useLocation";
import marker1 from "../assets/Markers/offer_marker_2.png";
import marker2 from "../assets/Markers/offer_marker_1.png";
import marker3 from "../assets/Markers/offer_marker_3.png";
import currentUser from "../assets/Markers/current_user_marker.png";
import { Slider } from "react-native-range-slider-expo";

let counts = 1;

const CardScreen = ({ navigation, route }) => {
  const { targetLatitude, targetLongitude } = route.params;
  const [targetRadius, setTargetRadius] = useState(2);
  const [user, setUser] = useState("");
  const [offerCard, setOfferCard] = useState([]);
  const location = useLocation();
  const [value, setValue] = useState(0);
  const [cameralatitudeDelta, setCameraLatitudeDelta] = useState(0.25);
  const [cameralongitudeDelta, setCameralongitudeDelta] = useState(0.25);

  const getdata = async () => {
    const q = query(collection(db, "Voucher"));

    const querySnapshot = await getDocs(q);
    let dummyData = [];
    querySnapshot.forEach((doc) => {
      dummyData.push(doc.data());
    });

    setOfferCard(dummyData);
    console.log(dummyData);
  };

  const updateMap = (value) => {
    setTargetRadius(value);
    if (value > 0 && value <= 1) {
      setCameraLatitudeDelta(0.03);
      setCameralongitudeDelta(0.03);
    } else if (value > 1 && value <= 2) {
      setCameraLatitudeDelta(0.05);
      setCameralongitudeDelta(0.05);
    } else if (value > 2 && value <= 3) {
      setCameraLatitudeDelta(0.08);
      setCameralongitudeDelta(0.08);
    } else if (value > 3 && value <= 4) {
      setCameraLatitudeDelta(0.1);
      setCameralongitudeDelta(0.1);
    } else if (value > 4 && value <= 5) {
      setCameraLatitudeDelta(0.12);
      setCameralongitudeDelta(0.12);
    } else if (value > 5 && value <= 6) {
      setCameraLatitudeDelta(0.15);
      setCameralongitudeDelta(0.15);
    } else if (value > 6 && value <= 7) {
      setCameraLatitudeDelta(0.16);
      setCameralongitudeDelta(0.16);
    } else if (value > 7 && value <= 8) {
      setCameraLatitudeDelta(0.17);
      setCameralongitudeDelta(0.17);
    } else if (value > 9 && value <= 10) {
      setCameraLatitudeDelta(0.18);
      setCameralongitudeDelta(0.18);
    } else if (value > 10 && value <= 11) {
      setCameraLatitudeDelta(0.19);
      setCameralongitudeDelta(0.19);
    } else {
      setCameraLatitudeDelta(0.25);
      setCameralongitudeDelta(0.25);
    }
  };

  const getMarkerImage = (type) => {
    if (type === "1") {
      return marker1;
    }
    if (type === "2") {
      return marker2;
    }
    if (type === "3") {
      return marker3;
    }
  };

  useEffect(() => {
    setUser(auth.currentUser);
    console.log(offerCard);
    getdata();
  }, []);
  let latitude, longitude;
  if ((targetLatitude && targetLatitude) != null) {
    latitude = targetLatitude;
    longitude = targetLongitude;
  } else {
    if (location != null) {
      latitude = location.latitude;
      longitude = location.longitude;
    } else {
      latitude = 37.33150351;
      longitude = 69.3451;
    }
  }
  return (
    <View style={styles.safeArea}>
      <View style={styles.MapContainer}>
        {location ? (
          <MapView
            style={{ flex: 1 }}
            mapType="mutedStandard"
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: cameralatitudeDelta,
              longitudeDelta: cameralongitudeDelta,
            }}
          >
            <Marker
              title={user.displayName}
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
              image={currentUser}
            ></Marker>

            {offerCard.map((data, index) =>
              getDistance(
                { latitude: latitude, longitude: longitude },
                { latitude: data.latitude, longitude: data.longitude }
              ) <
              targetRadius * 1000 ? (
                <Marker
                  key={index}
                  title={data.packageName}
                  description={data.description}
                  coordinate={{
                    latitude: parseFloat(data.latitude),
                    longitude: parseFloat(data.longitude),
                  }}
                  image={getMarkerImage(data.category)}
                ></Marker>
              ) : (
                <></>
              )
            )}
            <Circle
              center={{
                latitude: latitude,
                longitude: longitude,
              }}
              fillColor={"rgba(159, 90, 253, 0.1)"}
              strokeColor={"rgba(159, 90, 253,0.5)"}
              radius={targetRadius * 1000}
            />
          </MapView>
        ) : (
          <View style={styles.loading}>
            <Progress.Bar indeterminate={true} color={"#6c47a6"} width={300} />
            {/* <Progress.Circle size={30} color={'#6c47a6'} indeterminate={true} /> */}
          </View>
        )}

        <TouchableOpacity
          style={styles.backButton_container}
          onPress={() => {
            navigation.replace("home", { amount: null });
          }}
        >
          <AntDesign name="back" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.radiusSelector}>
          <Text>Radius: {targetRadius} Km</Text>
          <View style={{ width: "40%", height: 50 }}>
            <Slider
              min={0}
              max={15}
              step={2}
              valueOnChange={(value) => updateMap(value)}
              initialValue={targetRadius}
              knobColor="purple"
              showRangeLabels={false}
              inRangeBarColor="black"
              outOfRangeBarColor="purple"
              styleSize={20}
            />
          </View>
        </View>
      </View>
      <View style={styles.OfferSection}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginLeft: 10,
              color: "#fff",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Avaiable offers
          </Text>
          <Text
            style={{
              marginRight: 20,
              color: "#fff",
              fontSize: 15,
              fontWeight: "bold",
            }}
          ></Text>
        </View>
        <View style={{ flexDirection: "row", flex: 1, width: "100%" }}>
          {targetRadius ? (
            <></>
          ) : (
            <View style={styles.noOfferAvaiable_container}>
              <Text style={styles.noOfferAvaiable_text}>No Offer Avaiable</Text>
            </View>
          )}
          {location ? (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              style={styles.CardContianer}
            >
              {offerCard.map((data) =>
                getDistance(
                  { latitude: latitude, longitude: longitude },
                  { latitude: data.latitude, longitude: data.longitude }
                ) <
                targetRadius * 1000 ? (
                  <View style={styles.Card} key={data.cardNumber}>
                    <Card
                      onPress={() => {
                        navigation.navigate("offercardview", {
                          data: data,
                          targetLatitude,
                          targetLongitude,
                        });
                      }}
                      key={data.cardNumber}
                      type={data.category}
                      title={data.packageName}
                      date={data.createdAt}
                      cardnumber={data.key}
                      price={data.price}
                    />
                  </View>
                ) : (
                  <></>
                )
              )}
              <View style={styles.empty}></View>
            </ScrollView>
          ) : (
            <View style={styles.loading}>
              <Progress.Circle
                size={30}
                color={"#6c47a6"}
                indeterminate={true}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton_container: {
    marginLeft: 10,
    padding: 3,
    backgroundColor: "#6c47a6",
    top: 40,
    height: 30,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  MapContainer: {
    width: "100%",
    height: "100%",
    flex: 2,
  },
  loading: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  CardContianer: {
    padding: 5,
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
  },
  Card: {
    height: 155,
    width: 260,
    marginLeft: 10,
  },
  OfferSection: {
    paddingTop: 10,
    flex: 1,
    width: "100%",
    flexDirection: "column",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "black",
    flexDirection: "column",
  },
  empty: {
    width: 20,
  },
  radiusSelector: {
    position: "absolute",
    width: "100%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
  },
  noOfferAvaiable_container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  noOfferAvaiable_text: {
    color: "lightgray",
    fontStyle: "italic",
    fontSize: 20,
  },
});
