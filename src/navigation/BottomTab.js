import React, { useEffect, useState } from "react";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FriendsScreen from "../screens/FriendsScreen";
import MenuScreen from "../screens/MenuScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

const TabArr = [
  {
    route: "Home",
    label: "Home",
    icon: "home",
    component: HomeScreen,
  },
  {
    route: "Friends",
    label: "Friends",
    icon: "people",
    component: FriendsScreen,
  },
  // {
  //   route: "Chatd",
  //   label: "none",
  //   icon: "pluscircle",
  //   component: ChatScreen,
  // },

  {
    route: "Chat",
    label: "Chat",
    icon: "chatbubble",
    component: ChatScreen,
  },

  {
    route: "Profile",
    label: "Profile",
    icon: "person",
    component: ProfileScreen,
  },

  {
    route: "Menu",
    label: "Menu",
    icon: "menu",
    component: MenuScreen,
  },
];

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
        },
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarLabel: item.label,
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicons
                    name={focused ? item.icon : item.icon + "-outline"}
                    size={24}
                    color={"white"}
                  />
                );
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomTab;
