import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { Icon } from "react-native-elements";

const NavOptions = ({ data }) => {
  const navigation = useNavigation();
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            if (item.screen === "buycredit") {
              navigation.navigate(item.screen);
            } else {
              navigation.navigate(item.screen, {
                targetLatitude: null,
                targetLongitude: null,
              });
            }
          }}
          style={styles.NavOptions}
        >
          <View>
            <Image
              style={{ resizeMode: "contain" }}
              source={{
                uri: item.image,
                width: 120,
                height: 120,
              }}
            />
            <Text style={styles.NavTitle}>{item.title}</Text>
            <Icon
              style={styles.Icon}
              type="antdesign"
              name="arrowright"
              color="lightgray"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
const styles = StyleSheet.create({
  NavOptions: {
    backgroundColor: "lightgray",
    padding: 15,
    margin: 2,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "lightgray",
    alignItems: "center",
  },
  NavTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "white",
  },
  Icon: {
    margin: 2,
    borderRadius: 20,
    padding: 1,
    backgroundColor: "white",
    fontWeight: "bold",
  },
});
