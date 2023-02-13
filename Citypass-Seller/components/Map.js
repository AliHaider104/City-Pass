import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import * as Location from "expo-location";
export default function Map({ setLatitude, setLongitude }) {
  const [pin, setPin] = React.useState({
    latitude: 31.278069,
    longitude: 72.331673,
  });

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (!status) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setPin({ latitude, longitude });
      setLatitude(latitude);
      setLongitude(longitude);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: pin.latitude,
          longitude: pin.longitude,

          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: pin.latitude,
            longitude: pin.longitude,
          }}
          draggable={true}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });

            setLatitude(e.nativeEvent.coordinate.latitude);
            setLongitude(e.nativeEvent.coordinate.longitude);
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    width: Dimensions.get("window").width - 40,
    height: Dimensions.get("window").height / 8,
    overflow: "hidden",
  },
  map: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 10,
    width: Dimensions.get("window").width - 40,
    height: Dimensions.get("window").height / 8,
  },
});
