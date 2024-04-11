import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionic from "react-native-vector-icons/Ionicons";
import TabToeicPracticeLibrary from "./TabToeicPracticeLibrary";
import TabIeltsPracticeLibrary from "./TabIeltsPracticeLibrary";
import TabPractice from "./TabPractice";
const TabExercise = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: "black",
          height: 1.5,
        },
        tabBarStyle: {
          backgroundColor: "white",
          height: 50,
        },
        tabBarIcon: ({ focused, colour }) => {
          let iconName;
          if (route.name === "TabToeicPracticeLibrary") {
            iconName = focused ? "library" : "library-outline";
            colour = focused ? "black" : "gray";
          } else if (route.name === "TabIeltsPracticeLibrary") {
            iconName = focused ? "globe" : "globe-outline";
            colour = focused ? "black" : "gray";
          } else if (route.name === "TabPractice") {
            iconName = focused ? "ios-person" : "ios-person-outline";
            colour = focused ? "black" : "gray";
          }

          return <Ionic name={iconName} color={colour} size={22} />;
        },
      })}
    >
      <Tab.Screen
        name="TabToeicPracticeLibrary"
        component={TabToeicPracticeLibrary}
      />
      <Tab.Screen
        name="TabIeltsPracticeLibrary"
        component={TabIeltsPracticeLibrary}
      />
      <Tab.Screen name="TabPractice" component={TabPractice} />
    </Tab.Navigator>
  );
};

export default TabExercise;
