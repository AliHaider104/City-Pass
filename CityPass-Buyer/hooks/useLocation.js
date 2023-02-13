import * as Location from "expo-location";
import { useEffect, useState } from "react";
// import * as Permissions from 'expo-permissions';


export default useLocation = () => {
  const [location, setLocation] = useState();

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (!status) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setLocation({ latitude, longitude });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocation();
  });

  return location;
};