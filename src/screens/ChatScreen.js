import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Matches from "../components/matches";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessages } from "../redux/slice/messageSlice";

const android = Platform.OS === "android";

const ChatScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);

  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const checkNameofChat = (item) => {
    if (item.users[0].name === user.userData.name) {
      return item.users[1].name;
    } else {
      return item.users[0].name;
    }
  };

  const checkAvatarofChat = (item) => {
    if (item.users[0].name === user.userData.name) {
      return item.users[1].avatar;
    } else {
      return item.users[0].avatar;
    }
  };

  useEffect(() => {
    if (messages.messages.length > 0) {
      navigation.navigate("ChatRoomScreen", {
        avatar: checkAvatarofChat(messages.inChat),
        name: checkNameofChat(messages.inChat),
        messagesData: messages.messages,
      });
    }
  }, [messages]);

  const handleChatRoom = (item) => {
    dispatch(fetchMessages(item._id));
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: android ? hp(3) : 0,
      }}
    >
      <View className="px-4">
        <Text className="uppercase font-semibold text-neutral-500 tracking-wider">
          Matches
        </Text>
      </View>
      <Matches />

      {/* Search Bar */}
      <View className="mx-4 mt-6 flex-row items-center rounded-2xl bg-neutral-200 px-3 py-4">
        <TextInput
          placeholder="Search"
          placeholderTextColor={"gray"}
          style={{
            fontSize: hp(1.7),
          }}
          className="flex-1 text-base mb-1 pl-1 tracking-widest"
        />

        <View className="">
          <MagnifyingGlassIcon size={hp(2.5)} color={"gray"} strokeWidth={3} />
        </View>
      </View>

      {/* Chat List */}

      <View className="px-4">
        <View className="border-b border-neutral-300 py-4">
          <Text className="uppercase font-semibold text-neutral-500 tracking-wider ">
            CHAT
          </Text>
        </View>

        <FlatList
          data={user.userData.chatList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="w-full py-3 items-center flex-row border-b  border-neutral-300"
              onPress={() => handleChatRoom(item)}
            >
              {/* Avatar */}
              <View
                className="w-[17%] justify-center"
                style={{
                  width: hp(7),
                  height: hp(7),
                }}
              >
                <Image
                  source={{ uri: checkAvatarofChat(item) }}
                  style={{
                    width: "90%",
                    height: "90%",
                  }}
                  className="rounded-full"
                />
              </View>

              {/* Information */}
              <View
                className="w-[82%]"
                style={{
                  height: hp(6),
                }}
              >
                <View className="flex-row justify-between items-center">
                  <View className="flex-row justify-center">
                    <View className="flex-row">
                      <Text className="font-bold text-base  ">
                        {!item.isGroupChat
                          ? checkNameofChat(item)
                          : item.chatName}
                      </Text>
                    </View>
                    {item.isOnline && (
                      <View className=" justify-center items-center">
                        <View className="w-2 h-2 bg-[#F26322] rounded-full ml-1 justify-center items-center"></View>
                      </View>
                    )}
                  </View>
                  <Text className="text-sm tracking-tight">
                    {item.timeSent}
                  </Text>
                </View>
                <View>
                  <Text className="font-semibold text-xs text-neutral-500">
                    {item.latestMessage
                      ? item.latestMessage.content.length > 45
                        ? item.latestMessagecontent.slice(0, 45) + "..."
                        : item.latestMessage.content
                      : "Giờ đây các bạn đã được kết nối với nhau"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
