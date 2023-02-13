import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Tabs } from "./tabs";

export const TabsNavigation = (props) => {
  return (
    <NavigationContainer>
      <Tabs navigation={props.navigation} />
    </NavigationContainer>
  );
};

export default TabsNavigation;
