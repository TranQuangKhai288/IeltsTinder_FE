import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Matches from "../components/matches";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { datesData, matchesData } from "../dataTestUI";
import FeatureComponent from "../components/FeatureComponent";
import { ScrollView } from "react-native-gesture-handler";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
const { width, height } = Dimensions.get("window");
const android = Platform.OS === "android";
import {
  camera,
  education,
  friends,
  game,
  history,
  match,
} from "../assets/icon-feature";

const featureArray = [
  {
    id: 1,
    name: "Ielts Practice",
    imgUrl: education,
  },
  {
    id: 2,
    name: "Find your destiny",
    imgUrl: match,
  },
  {
    id: 3,
    name: "Friends",
    imgUrl: friends,
  },
  {
    id: 4,
    name: "Play games",
    imgUrl: game,
  },
  {
    id: 5,
    name: "Video",
    imgUrl: camera,
  },
  {
    id: 6,
    name: "History",
    imgUrl: history,
  },
];

const MenuScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const insets = useSafeAreaInsets();
  const bottomTabBarHeight = useBottomTabBarHeight();
  return (
    <View
      style={{
        backgroundColor: "black",
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View style={{ height: 40 }}>
        <Text className="font-semibold text-white tracking-wider text-2xl mb-2">
          Menu
        </Text>
      </View>
      <ScrollView
        style={{
          height: android
            ? height - bottomTabBarHeight - 40
            : height - bottomTabBarHeight - 80,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 10,
            backgroundColor: "#333333",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              source={datesData[0].imgUrl}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
            <Text className="font-semibold text-white tracking-wider text-xl mb-2">
              {datesData[0].name}
            </Text>
          </View>
          {/* Information */}
          <View
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              marginBottom: 32,
              marginLeft: 64,
            }}
          >
            {/* Information */}
            <View
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text className="font-semibold text-white tracking-wider text-x">
                0
              </Text>
              <Text className="font-semibold text-white tracking-wider text-x">
                Post
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text className="font-semibold text-white tracking-wider text-x">
                0
              </Text>
              <Text className="font-semibold text-white tracking-wider text-x">
                Follower
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text className="font-semibold text-white tracking-wider text-x">
                0
              </Text>
              <Text className="font-semibold text-white tracking-wider text-x">
                Follow
              </Text>
            </View>
          </View>
        </View>

        {/* header */}
        <Text className=" px-4 font-semibold text-white tracking-wider text-xl">
          Feature
        </Text>

        {/* end of header */}

        {/* Features */}

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {featureArray?.map((item, index) => {
            return (
              <FeatureComponent
                key={index}
                name={item.name}
                imgUrl={item.imgUrl}
              />
            );
          })}
        </View>
        {/* end of Features */}

        {/* Support */}
        <TouchableOpacity
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            marginHorizontal: 10,
            backgroundColor: "#333333",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text className=" px-4 font-semibold text-white tracking-wider text-xl">
            Log out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MenuScreen;
