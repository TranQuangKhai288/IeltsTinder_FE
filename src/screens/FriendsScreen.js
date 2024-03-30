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
import FriendRequest from "../components/FriendRequest";
import { ScrollView } from "react-native-gesture-handler";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
const { width, height } = Dimensions.get("window");
const android = Platform.OS === "android";

const FriendsScreen = () => {
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
          Friends
        </Text>
      </View>
      <ScrollView
        style={{
          height: android
            ? height - bottomTabBarHeight - 40
            : height - bottomTabBarHeight - 80,
        }}
      >
        {/* header */}

        <Text className=" px-4 font-semibold text-white tracking-wider text-xl">
          Friend requests
        </Text>

        {/* end of header */}

        {/* Friend Request */}
        {datesData?.map((friend, index) => {
          return (
            <FriendRequest
              key={index}
              name={friend.name}
              age={friend.age}
              imgUrl={friend.imgUrl}
            />
          );
        })}
        {/* end of Friend Request */}
      </ScrollView>
    </View>
  );
};

export default FriendsScreen;
