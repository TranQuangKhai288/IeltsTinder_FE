import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions, Image } from "react-native";
import { ProfileBody, ProfileButtons } from "../components/ProfileBody";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import * as UserServices from "../apis/UserService";
import BottomTabView from "../components/BottomTabView";
import { useSelector } from "react-redux";

const ProfileScreen = ({ route }) => {
  const [circuls, setCirculs] = useState([]);
  const [anotherUser, setAnotherUser] = useState();
  const user = useSelector((state) => state.user.userData);
  const access_token = useSelector((state) => state.user.access_token);

  const fetchFriendDetails = async (friendId) => {
    const response = await UserServices.getDetailsUser(friendId, access_token);
    if (response.status === "OK") {
      return response.data;
    }
  };

  const userId = route?.params?.id || user?._id;
  const fetchAnotherUser = async () => {
    const response = await UserServices.getDetailsUser(userId, access_token);
    if (response.status === "OK") {
      setAnotherUser(response.data);
    }
  };
  useEffect(() => {
    if (userId !== user?._id) fetchAnotherUser();
  }, []);

  // console.log(
  //   JSON.stringify(anotherUser, (key, value) => {
  //     if (key === "avatar") {
  //       return "avatar uri";
  //     }
  //     return value;
  //   })
  // );
  useEffect(() => {
    const fetchFriendsData = async () => {
      // Map over each friend ID and fetch their details concurrently
      const friendDetailsPromises =
        userId !== user?._id
          ? anotherUser.friends.map((friendId) => fetchFriendDetails(friendId))
          : user.friends.map((friendId) => fetchFriendDetails(friendId));
      // Wait for all friend details to be fetched
      const friendDetails = await Promise.all(friendDetailsPromises);
      // Push friend details into circuls array
      const newCirculs = friendDetails.map((friendDetail, index) => (
        <View
          key={index}
          style={{
            width: 70,
            height: 70,
            borderRadius: 100,
            backgroundColor: "#00FF00",
            marginHorizontal: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: friendDetail.avatar }}
            style={{
              width: "95%",
              height: "95%",
              borderRadius: 100,
              borderWidth: 2,
              borderColor: "white",
            }}
          />
        </View>
      ));
      setCirculs(newCirculs);
    };

    fetchFriendsData();
  }, []);

  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View style={{ width: "100%", padding: 10 }}>
        <ProfileBody
          name={userId !== user?._id ? anotherUser?.name : user?.name}
          accountName={userId !== user?._id ? anotherUser?.name : user?.name}
          profileImage={
            userId !== user?._id ? anotherUser?.avatar : user?.avatar
          }
          friends={
            userId !== user?._id
              ? anotherUser?.friends?.length
              : user?.friends?.length
          }
          Level={userId !== user?._id ? anotherUser?.level : user?.level}
          post={userId !== user?._id ? anotherUser?.posts : user?.posts}
        />
        <ProfileButtons
          id={userId}
          name={user?.name}
          accountName={user?.name}
          profileImage={user?.level}
        />
      </View>
      <View>
        <Text
          style={{
            padding: 10,
            letterSpacing: 1,
            fontSize: 14,
          }}
        >
          Friends
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}
        >
          {circuls}
        </ScrollView>
      </View>
      <BottomTabView userId={userId} />
    </View>
  );
};

export default ProfileScreen;
