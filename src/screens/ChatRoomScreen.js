import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import {
  ChevronLeftIcon,
  FaceSmileIcon,
  PaperAirplaneIcon,
  PhotoIcon,
} from "react-native-heroicons/outline";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import { EllipsisHorizontalIcon } from "react-native-heroicons/solid";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import * as MessageService from "../apis/MessageService";
import { getSocket, joinRoom } from "../socketIO/SocketService";
import { mediaDevices } from "react-native-webrtc";
const android = Platform.OS === "android";
const ios = Platform.OS === "ios";

const ChatRoomScreen = ({ route }) => {
  const user = useSelector((state) => state.user);
  const { avatar, name, chatRoomId } = route.params;
  const [message, setMessage] = useState("");
  const [messagesData, setMessagesData] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typing, setTyping] = useState(false);
  const callerId = user.userData._id;
  const navigation = useNavigation();
  const socket = getSocket();
  const flatListRef = useRef(null);
  const checkIsSender = (item) => {
    if (item.sender.name === user.userData.name) {
      return true;
    } else {
      return false;
    }
  };

  let virtualMessage = {
    __v: 0,
    _id: "-1",
    chat: {
      __v: 0,
      _id: "0",
      chatName: "sender",
      createdAt: "0000",
      isGroupChat: false,
      latestMessage: "0000",
      updatedAt: "0000",
      users: ["1", "2"],
    },
    content: "Typing...",
    createdAt: "0",
    readBy: [],
    sender: {
      _id: "-2",
      name: "virtualUser",
    },
    timestamp: "0",
    updatedAt: "0",
  };

  const fetchMessages = async () => {
    const response = await MessageService.getAllMessageForaChat(
      chatRoomId,
      user.access_token
    );
    setMessagesData(response.data);
    joinRoom(chatRoomId);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("addUser", user.userData._id);
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      const messageListener = (newMessageReceived) => {
        setMessagesData((prev) => [...prev, newMessageReceived]);
      };

      socket.on("receive-message", messageListener);

      return () => {
        socket.off("receive-message", messageListener);
      };
    }
  }, [socket]);

  const handleSentMessage = async () => {
    if (message !== "") {
      const response = await MessageService.sendMessage(
        message,
        chatRoomId,
        user.access_token
      );
      if (response.status === "OK") {
        console.log(response.data, "response");
        setMessagesData((prev) => [...prev, response.data]);
        setMessage("");
        socket.emit("new-message", response.data);
      }
    }
  };

  useEffect(() => {
    if (socket) {
      socket.emit("addUser", user.userData._id);
    }
  }, [isTyping]);

  useEffect(() => {
    if (socket) {
      socket.on("typing", () => {
        setIsTyping(true);
      });

      socket.on("stop-typing", () => {
        setIsTyping(false);
      });
    }

    return () => {
      if (socket) {
        socket.emit("stop-typing", chatRoomId);
      }
    };
  }, []);

  useEffect(() => {
    if (isTyping) {
      setMessagesData((prev) => [...prev, virtualMessage]);
    } else {
      setMessagesData((prev) => prev.filter((message) => message._id !== "-1"));
    }
  }, [isTyping]);

  const handleTyping = (text) => {
    setMessage(text);
  };

  useEffect(() => {
    if (message !== "" && !typing) {
      socket.emit("typing", chatRoomId);
      setTyping(true);
    }
    if (message === "" && typing) {
      socket.emit("stop-typing", chatRoomId);
      setTyping(false);
    }
  }, [message]);

  const handleVideoCall = () => {
    navigation.navigate("VideoCallScreen", {
      chatRoomId: chatRoomId,
      callerId: callerId,
      callRoomId: `${callerId}-${chatRoomId}`,
      isCaller: true,
    });
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      setTimeout(() => flatListRef.current.scrollToEnd({ animated: false }), 0);
    }
  };

  return (
    <SafeAreaView
      className="justify-center items-center relative bg-white"
      style={{ paddingTop: hp(3) }}
    >
      {/* Header */}
      <View className="absolute top-0 justify-between items-center flex-row w-full px-4 pb-2 border-b border-neutral-400 h-16">
        <TouchableOpacity
          className="w-2/3 flex-row items-center"
          onPress={() => navigation.navigate("Chat")}
        >
          <ChevronLeftIcon size={hp(2.5)} color={"black"} strokeWidth={2} />
          <View className="border-2 rounded-full border-red-400 mr-2 ml-4">
            <Image
              source={{ uri: avatar }}
              style={{ width: hp(4.5), height: hp(4.5) }}
              className="rounded-full"
            />
          </View>
          <View className="justify-center items-start">
            <Text className="font-bold text-base">{name}</Text>
            <Text className="text-xs text-neutral-400">You matched today</Text>
          </View>
        </TouchableOpacity>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity className="bg-black/5 rounded-full p-1">
            <Ionicons name="call" size={hp(3)} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-black/5 rounded-full p-1 ml-4"
            onPress={handleVideoCall}
          >
            <Ionicons name="videocam" size={hp(3)} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Details */}
      <View
        className="w-full h-full pt-10
      pb-20"
      >
        <FlatList
          ref={flatListRef}
          data={messagesData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: checkIsSender(item) ? "row-reverse" : "row",
                padding: 10,
                paddingVertical: checkIsSender(item) ? 13 : 3,
              }}
            >
              <View
                style={{
                  flexDirection: checkIsSender(item) ? "row-reverse" : "row",
                  width: "auto",
                  maxWidth: checkIsSender(item) ? "70%" : "70%",
                }}
                className="align-bottom justify-end items-end"
              >
                {!checkIsSender(item) ? (
                  <Image
                    source={{ uri: avatar }}
                    style={{ width: hp(3), height: hp(3), marginRight: 12 }}
                    className="rounded-full"
                  />
                ) : null}

                {item._id === "-1" ? (
                  <View>
                    <Text className="text-white text-base leading-5">
                      {item.content}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      borderBottomRightRadius: checkIsSender(item) ? 0 : 10,
                      borderBottomLeftRadius: checkIsSender(item) ? 10 : 0,
                      backgroundColor: checkIsSender(item)
                        ? "#3B82F6"
                        : "#171717",
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    <Text className="text-white text-base leading-5">
                      {item.content}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
          onContentSizeChange={scrollToBottom}
        />
      </View>

      {/* Text Input */}

      <View className="absolute flex-row justify-between items-center w-full px-4 pb-3 bg-white bottom-0">
        <KeyboardAvoidingView
          className="flex-row items-center rounded-2xl bg-neutral-200 px-3 py-3 w-[85%]"
          behavior={"padding"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 300 : 330}
        >
          <TextInput
            placeholder="Write your message here"
            placeholderTextColor={"gray"}
            style={{
              fontSize: hp(1.7),
              fontWeight: "medium",
              height: "100%",
            }}
            className="flex-1 text-base pl-1 pb-2 mb-1 tracking-wider"
            value={message}
            onChangeText={handleTyping}
          />
          <View className="flex-row justify-center items-center space-x-1">
            <PhotoIcon color={"gray"} strokeWidth={2} />
            <FaceSmileIcon size={hp(2.5)} color={"gray"} strokeWidth={2} />
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={handleSentMessage}
          className="bg-blue-500 rounded-2xl py-3 w-[13%] justify-center items-center"
        >
          <PaperAirplaneIcon color={"white"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatRoomScreen;
