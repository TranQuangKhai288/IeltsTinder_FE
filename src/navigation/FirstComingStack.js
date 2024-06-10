import React, { useEffect, useRef } from "react";
import { Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import EntranceTestScreen from "../screens/FirstComming/EntranceTestScreem";
import ProfileScreen from "../screens/ProfileScreen";
import FirstTimeComing from "../screens/FirstComming/FirstTimeComing";
const stack = createStackNavigator();
import { useSelector } from "react-redux";

const FirstComingStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="FirstTimeComing"
    >
      <stack.Screen name="FirstTimeComing" component={FirstTimeComing} />
      <stack.Screen name="EntranceTestScreen" component={EntranceTestScreen} />
    </stack.Navigator>
  );
};

export default FirstComingStack;
