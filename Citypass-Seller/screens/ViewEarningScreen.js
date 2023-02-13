import React,{useState} from "react";
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ScrollView,
  RefreshControl,
  StatusBar
} from "react-native";
import BalanceCard from "../components/BalanceCard";
import Chart from "../components/Chart";
import Profile from "../components/Profile";

const { height, width } = Dimensions.get("window");

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function ViewEarningScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle={"auto"} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Profile navigation={navigation}  />
        <Chart refresh={refreshing}/>
        <BalanceCard refresh={refreshing} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default ViewEarningScreen;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
