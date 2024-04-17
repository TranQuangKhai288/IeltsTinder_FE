import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionic from "react-native-vector-icons/Ionicons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const BottomTabView = () => {
  const Tab = createMaterialTopTabNavigator();

  const bottomHeight = useBottomTabBarHeight();
  const Height = Dimensions.get("window").height / 3 - bottomHeight;
  const Width = Dimensions.get("window").width / 3.3;
  let squares = [];
  let numberOfSquare = 4;

  for (let index = 0; index < numberOfSquare; index++) {
    squares.push(
      <View key={index}>
        <View
          style={{
            width: Width,
            height: 150,
            marginVertical: 0.5,
            backgroundColor: "black",
            margin: 4,
            opacity: 0.1,
          }}
        ></View>
      </View>
    );
  }

  const Posts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            minHeight: Height,
            backgroundColor: "white",
            flexWrap: "wrap",
            flexDirection: "row",
            paddingVertical: 4,
            justifyContent: "flex-start",
            paddingRight: 5,
            paddingLeft: 5,
          }}
        >
          {squares}
        </View>
      </ScrollView>
    );
  };
  const Video = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            minHeight: Height,
            backgroundColor: "white",
            flexWrap: "wrap",
            flexDirection: "row",
            paddingVertical: 4,
            justifyContent: "flex-start",
            paddingRight: 5,
            paddingLeft: 5,
          }}
        >
          {squares}
        </View>
      </ScrollView>
    );
  };
  const Tags = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            minHeight: Height,
            backgroundColor: "white",
            flexWrap: "wrap",
            flexDirection: "row",
            paddingVertical: 4,
            justifyContent: "flex-start",
            paddingRight: 5,
            paddingLeft: 5,
          }}
        >
          {squares}
        </View>
      </ScrollView>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: "black",
          height: 1.5,
        },
        tabBarIcon: ({ focused, colour }) => {
          let iconName;
          if (route.name === "Posts") {
            iconName = focused ? "ios-apps-sharp" : "ios-apps-sharp";
            colour = focused ? "black" : "gray";
          } else if (route.name === "Video") {
            iconName = focused ? "ios-play-circle" : "ios-play-circle-outline";
            colour = focused ? "black" : "gray";
          } else if (route.name === "Tags") {
            iconName = focused ? "ios-person" : "ios-person-outline";
            colour = focused ? "black" : "gray";
          }

          return <Ionic name={iconName} color={colour} size={22} />;
        },
      })}
    >
      <Tab.Screen name="Posts" component={Posts} />
      <Tab.Screen name="Video" component={Video} />
      <Tab.Screen name="Tags" component={Tags} />
    </Tab.Navigator>
  );
};

export default BottomTabView;
