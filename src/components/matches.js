import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { datesData, matchesData } from "../dataTestUI";
import * as UserServices from "../apis/UserService";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";

const Matches = () => {
  const user = useSelector((state) => state.user.userData);
  const access_token = useSelector((state) => state.user.access_token);
  const [friends, setFriends] = useState([]);

  const fetchFriendDetails = async (friendId) => {
    const response = await UserServices.getDetailsUser(friendId, access_token);
    if (response.status === "OK") {
      return response.data;
    }
  };

  useEffect(() => {
    const fetchFriendsData = async () => {
      // Map over each friend ID and fetch their details concurrently
      const friendsPromises = user.friends.map((friendId) =>
        fetchFriendDetails(friendId)
      );
      // Wait for all friend details to be fetched
      const friendDetails = await Promise.all(friendsPromises);
      // Push friend details into circuls array
      setFriends(friendDetails);
    };

    fetchFriendsData();
  }, []);

  // useEffect(() => {
  //   console.log(
  //     JSON.stringify(friends, (key, value) => {
  //       if (key === "avatar") {
  //         return "avatar uri";
  //       }
  //       return value;
  //     }),
  //     "friends"
  //   );
  // }, [friends]);

  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{
          paddingLeft: hp(2),
          paddingRight: hp(2),
        }}
      >
        {friends?.map((friend, index) => {
          return (
            <TouchableOpacity
              key={index}
              className="flex items-center space-y-1"
            >
              <View className="rounded-full">
                <Image
                  source={{ uri: friend?.avatar }}
                  style={{
                    width: hp(6),
                    height: hp(6),
                  }}
                  className="rounded-full"
                />
              </View>
              <Text
                className="text-neutral-800 font-bold "
                style={{
                  fontSize: hp(1.6),
                }}
              >
                {friend?.name}
              </Text>
              <Text
                className="text-neutral-800 font-bold"
                style={{
                  fontSize: hp(1.6),
                }}
              >
                {friend?.level}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Matches;
