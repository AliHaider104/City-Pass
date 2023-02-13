import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateVoucherScreen from "../screens/CreateVoucherScreen";
import ViewVoucherScreen from "../screens/ViewVoucherScreen";
import ViewEarningScreen from "../screens/ViewEarningScreen";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import CodeScanner from "../components/CodeScanner";

import { db, auth } from "../firebase/firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const { height, width } = Dimensions.get("window");

const Tab = createBottomTabNavigator();

export const Tabs = ({ navigation }) => {
  const [Admin, setAdmin] = useState({});

  const getAdminData = async () => {
    const q = query(
      collection(db, "Admin"),
      where("uid", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setAdmin(doc.data());
      console.log(doc.data().type);
    });
  };

  useEffect(() => {
    getAdminData();
  }, []);

  return (
    <Tab.Navigator
    headerShown={false}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
        headerShown: false,
        tabBarShowLabel: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "relative",
          width: width,
          elevation: 0,
          backgroundColor: "#FFF",
          borderWidth: 2,
          borderColor: "#FFF",
          padding: 5,
        },
      }}
    >
      {Admin.type == "first" ? (
        <></>
      ) : (
        <>
          <Tab.Screen
            name="Earnings"
            children={() => <ViewEarningScreen navigation={navigation} />}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => {
                let iconName;
                let color;
                iconName = "line-chart";
                color = focused ? "#5e51c4" : "black";
                return (
                  <SafeAreaView style={styles.tabContainer}>
                    <FontAwesome name={iconName} size={30} color={color} />
                  </SafeAreaView>
                );
              },
            }}
          />

          <Tab.Screen
            name="Add Voucher"
            component={CreateVoucherScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => {
                let iconName;
                let color;
                iconName = focused ? "add-circle" : "add-circle-outline";
                color = focused ? "#5e51c4" : "black";
                return (
                  <View style={styles.tabContainer}>
                    <Ionicons name={iconName} size={30} color={color} />
                  </View>
                );
              },
            }}
          />

          <Tab.Screen
            name="View Voucher"
            component={ViewVoucherScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => {
                let iconName;
                let color;
                iconName = focused ? "document-text" : "document-text-outline";
                color = focused ? "#5e51c4" : "black";
                return (
                  <View style={styles.tabContainer}>
                    <Ionicons name={iconName} size={30} color={color} />
                  </View>
                );
              },
            }}
          />
        </>
      )}

      <Tab.Screen
        name="Scanner"
        children={() => <CodeScanner navigation={navigation} />}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let iconName;
            let color;
            iconName = "barcode-scan";
            color = focused ? "#5e51c4" : "black";
            return (
              <View style={styles.tabContainer}>
                <MaterialCommunityIcons
                  name={iconName}
                  size={30}
                  color={color}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: "center",
  },
});
