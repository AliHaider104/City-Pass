import { createStackNavigator } from "react-navigation-stack";
import { TabsNavigation } from "../navigation/tabsNavigation";
import { createAppContainer } from "react-navigation";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const screens = {
  Login: {
    screen: LoginScreen,
    navigationOptions: { headerShown:false }
    
  },

  Register: {
    screen: RegisterScreen,
    navigationOptions: { headerShown:false }
  },

  Home: {
    screen: TabsNavigation,
    navigationOptions: { headerShown:false }
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
