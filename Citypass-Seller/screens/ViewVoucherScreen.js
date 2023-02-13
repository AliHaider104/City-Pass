import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  RefreshControl,
  View,
  StatusBar
} from "react-native";

import VoucherCard from "../components/VoucherCard";

import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/firebase-config";

import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");

function ViewVoucherScreen(props) {
  const [data, setData] = useState([]);
  const [render, setRender] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getdata = async () => {
    const q = query(
      collection(db, "Voucher"),
      where("createdBy", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    let dummyData = [];
    querySnapshot.forEach((doc) => {
      dummyData.push(doc.data());
    });

    setData(dummyData);
  };

  useEffect(() => {
    getdata();
  }, [refreshing]);


  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle={"auto"} />
    <View style={styles.topBar}>
    </View>
      <View >
        <FlatList
        contentContainerStyle={{padding:0,}}
          data={data}
          renderItem={({ item }) => (
            <VoucherCard
              Key={item.key}
              packageName={item.packageName}
              category={item.category}
              price={item.price}
              description={item.description}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}

export default ViewVoucherScreen;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "#FFF",
    backgroundColor: "#FFF",
  },

  refresh: {
    marginTop: 5,
  },
  topBar:{
    width:"100%",
    height:50,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    elevation:5
  }
});
