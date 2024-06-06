import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import * as ChatService from "../apis/ChatService";
import * as UserService from "../apis/UserService";
export const ProfileBody = ({
  name,
  accountName,
  profileImage,
  post,
  friends,
  Level,
}) => {
  return (
    <View>
      {accountName ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {accountName}
            </Text>
            <Feather
              name="chevron-down"
              style={{
                fontSize: 20,
                color: "black",
                paddingHorizontal: 5,
                opacity: 0.5,
              }}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather
              name="plus-square"
              style={{
                fontSize: 25,
                color: "black",
                paddingHorizontal: 15,
              }}
            />
            <Feather
              name="menu"
              style={{
                fontSize: 25,
              }}
            />
          </View>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: profileImage }}
            style={{
              resizeMode: "cover",
              width: 80,
              height: 80,
              borderRadius: 100,
            }}
          />
          <Text
            style={{
              paddingVertical: 5,
              fontWeight: "bold",
            }}
          >
            {name}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{post}</Text>
          <Text>Posts</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{friends}</Text>
          <Text>Friends</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{Level}</Text>
          <Text>Level</Text>
        </View>
      </View>
    </View>
  );
};

export const ProfileButtons = ({
  id,
  name,
  accountName,
  profileImage,
  isFriend,
}) => {
  const access_token = useSelector((state) => state.user.access_token);
  const navigation = useNavigation();
  const [follow, setFollow] = useState(false);
  const [sending, setSending] = useState(false);
  const user = useSelector((state) => state.user.userData);
  const check = id === user._id ? 0 : 1;
  console.log(isFriend, "isFriend here");
  const handleChatRoom = async () => {
    const response = await ChatService.accessChat(id, access_token);

    if (response?.status === "OK") {
      const checkNameofChat = (item) => {
        if (item.users[0].name === user.name) {
          return item.users[1].name;
        } else {
          return item.users[0].name;
        }
      };

      const checkAvatarofChat = (item) => {
        if (item.users[0].name === user.name) {
          return item.users[1].avatar;
        } else {
          return item.users[0].avatar;
        }
      };
      navigation.navigate("ChatRoomScreen", {
        chatRoomId: response.data._id,
        name: checkNameofChat(response.data),
        avatar: checkAvatarofChat(response.data),
      });
    }
  };

  useEffect(() => {
    if (isFriend) {
      setFollow(true);
    }
  }, [isFriend]);

  //check here is your friend or not
  const handleFriendRequest = async () => {
    //check list friend of user
    if (!follow) {
      //setFollow(true);

      const response = await UserService.sendFriendRequest(id, access_token);
      console.log("response", response);
      if (response.status === "OK") {
        setSending(true);
        //setFollow(true);
      }
      //setCheckFriend(true);
    }
  };

  return (
    <>
      {check === 0 ? (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            paddingVertical: 5,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.push("EditProfile", {
                name: name,
                accountName: accountName,
                profileImage: profileImage,
              })
            }
            style={{
              width: "100%",
            }}
          >
            <View
              style={{
                width: "100%",
                height: 35,
                borderRadius: 5,
                borderColor: "#DEDEDE",
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  letterSpacing: 1,
                  opacity: 0.8,
                }}
              >
                Edit Profile
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        //if profile is not of the this user
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              handleFriendRequest();
            }}
            style={{ width: "42%" }}
          >
            <View
              style={{
                width: "100%",
                height: 35,
                borderRadius: 5,
                backgroundColor: follow ? null : "#3493D9",
                borderWidth: follow ? 1 : 0,
                borderColor: "#DEDEDE",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: follow ? "black" : "white" }}>
                {follow ? "Friend" : sending ? "Sending" : "Add Friend"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleChatRoom()}
            style={{
              width: "42%",
              height: 35,
              borderWidth: 1,
              borderColor: "#DEDEDE",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text>Message</Text>
          </TouchableOpacity>
          <View
            style={{
              width: "10%",
              height: 35,
              borderWidth: 1,
              borderColor: "#DEDEDE",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Feather
              name="chevron-down"
              style={{ fontSize: 20, color: "black" }}
            />
          </View>
        </View>
      )}
    </>
  );
};
