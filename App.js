import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import createDataContext from "./src/context/createDataContext";

// screens
import AccountScreen from "./src/screens/AccountScreen";
import CameraScreen from "./src/screens/CameraScreen";
import EventsScreen from "./src/screens/EventsScreen";
import SigninScreen from "./src/screens/SigninScreen";
import EventDetailsScreen from "./src/screens/EventDetailScreen";
import CalenderScreen from "./src/screens/CalenderScreen";

// Icons
import EventIcon from "react-native-vector-icons/MaterialIcons";
import ScannerIcon from "react-native-vector-icons/Ionicons";
import CalenderIcon from "react-native-vector-icons/FontAwesome";
import AccountIcon from "react-native-vector-icons/FontAwesome5";

const SwitchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator(
    {
      Signin: SigninScreen
    },
    {
      headerMode: "none",
      navigationOptions: {
        headerVisible: false
      }
    }
  ),
  mainFlow: createBottomTabNavigator({
    Events: createStackNavigator(
      {
        EventsList: EventsScreen,
        EventDetails: EventDetailsScreen
      },
      {
        headerMode: "none",
        navigationOptions: {
          headerVisible: false,
          tabBarIcon: () => (
            <EventIcon name="event" color={"#A9A9A9"} size={20} />
          )
        }
      }
    ),
    Scanner: {
      screen: CameraScreen,
      navigationOptions: {
        tabBarIcon: () => (
          <ScannerIcon name="md-qr-scanner" color={"#A9A9A9"} size={20} />
        )
      }
    },
    Calendar: {
      screen: CalenderScreen,
      navigationOptions: {
        tabBarIcon: () => (
          <CalenderIcon name="calendar" color={"#A9A9A9"} size={20} />
        )
      }
    },
    Account: {
      screen: AccountScreen,
      navigationOptions: {
        tabBarIcon: () => (
          <AccountIcon name="user-graduate" color={"#A9A9A9"} size={20} />
        )
      }
    }
  })
});

const App = createAppContainer(SwitchNavigator);

const { Provider } = createDataContext();

export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
};
