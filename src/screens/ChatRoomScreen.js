import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
    socket.emit("video-call", { chatRoomId, callerId });
    navigation.navigate("VideoCallScreen", {
      callRoomId: `${callerId}-${chatRoomId}`,
    });
  };

  useEffect(() => {
    if (socket) {
      socket.on("incoming-call", async (data) => {
        const { callerId, callRoomId } = data;

        Alert.alert("Incoming call", "Do you want to accept the call?", [
          {
            text: "Accept",
            onPress: () => {
              socket.emit("accept-call", {
                callRoomId,
                callerId,
              });
              navigation.navigate("VideoCallScreen", { callRoomId });
            },
          },
          {
            text: "Decline",
            onPress: () => {
              console.log("deny call");
            },
          },
        ]);
      });
    }
  }, [socket]);

  return (
    <SafeAreaView
      className=" justify-center items-center relative bg-white"
      style={{
        paddingTop: hp(3),
      }}
    >
      {/* Header */}
      <View className="justify-between items-center flex-row w-full px-4 pb-2 border-b border-neutral-400">
        {/* Arrow */}
        <TouchableOpacity
          className="w-2/3 flex-row items-center"
          onPress={() => navigation.navigate("Chat")}
        >
          <ChevronLeftIcon size={hp(2.5)} color={"black"} strokeWidth={2} />
          <View className="border-2 rounded-full border-red-400 mr-2 ml-4">
            <Image
              source={{ uri: avatar }}
              style={{
                width: hp(4.5),
                height: hp(4.5),
              }}
              className="rounded-full"
            />
          </View>
          <View className="justify-center items-start">
            <Text className="font-bold text-base">{name}</Text>
            <Text className="text-xs text-neutral-400">You matched today</Text>
          </View>
        </TouchableOpacity>

        {/* Name */}

        {/* Image */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
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
      <View className="w-full h-full">
        <Text className="text-center text-neutral-400 pt-4">Today</Text>
        <FlatList
          data={messagesData}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingBottom: hp(15),
          }}
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
                  // width: checkIsSender(item) ? "60%" : "70%",
                  display: "flex",
                  flexDirection: checkIsSender(item) ? "row-reverse" : "row",
                  width: "auto",
                  maxWidth: checkIsSender(item) ? "70%" : "70%",
                }}
                className="align-bottom justify-end items-end"
              >
                {!checkIsSender(item) ? (
                  <Image
                    source={{ uri: avatar }}
                    style={{
                      width: hp(3),
                      height: hp(3),
                      marginRight: 12,
                    }}
                    className="rounded-full"
                  />
                ) : (
                  <></>
                )}

                {item?._id === "-1" ? (
                  <View>
                    <Text className="text-white text-base leading-5 ">
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
                    <Text className="text-white text-base leading-5 ">
                      {item.content}
                    </Text>
                  </View>
                )}

                {/* {checkIsSender(item) && (
                  <Text className="text-xs font-semibold text-neutral-500 text-right">
                    {"Read "}
                    {item.timestamp}
                  </Text>
                )} */}
              </View>
            </View>
          )}
        />
      </View>

      {/* Text Input  */}

      <View className="absolute flex-row justify-between items-center w-full px-4 pb-12 pt-2 bg-white bottom-0">
        <View className="flex-row items-center rounded-2xl bg-neutral-200 px-3 py-3 w-[85%] ">
          <TextInput
            placeholder="Write your message here"
            placeholderTextColor={"gray"}
            style={{
              fontSize: hp(1.7),
              fontWeight: "medium",
            }}
            className="flex-1 text-base mb-1 pl-1 tracking-wider"
            value={message}
            onChangeText={handleTyping}
          />

          <View className="flex-row justify-center items-center space-x-1">
            <PhotoIcon color={"gray"} strokeWidth={2} />
            <FaceSmileIcon size={hp(2.5)} color={"gray"} strokeWidth={2} />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => handleSentMessage()}
          className="bg-blue-500 rounded-2xl py-3 w-[13%] justify-center items-center "
        >
          <PaperAirplaneIcon color={"white"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatRoomScreen;
