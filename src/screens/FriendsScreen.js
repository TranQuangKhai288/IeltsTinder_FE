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
import * as UserService from "../apis/UserService";

const FriendsScreen = () => {
  const navigation = useNavigation();
  const access_token = useSelector((state) => state.user.access_token);
  const insets = useSafeAreaInsets();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const [friendRequests, setFriendRequests] = useState([]);

  const getFriendRequests = async () => {
    const response = await UserService.getFriendRequests(access_token);
    if (response.status === "OK") {
      setFriendRequests(response.data);
    }
  };

  useEffect(() => {
    getFriendRequests();
  }, []);

  // useEffect(() => {
  //   console.log(
  //     JSON.stringify(friendRequests, (key, value) => {
  //       if (key === "avatar") {
  //         return "avatar uri";
  //       }
  //       return value;
  //     }),
  //     "friendRequests"
  //   );
  // }, [friendRequests]);

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
        <Text className="font-semibold text-white tracking-wider text-2xl mb-2 ml-4">
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
        {friendRequests?.map((request, index) => {
          return (
            <FriendRequest
              key={index}
              id={request.senderId._id}
              name={request.senderId.name}
              level={request.senderId.level}
              avatar={request.senderId.avatar}
            />
          );
        })}
        {/* end of Friend Request */}
      </ScrollView>
    </View>
  );
};

export default FriendsScreen;
