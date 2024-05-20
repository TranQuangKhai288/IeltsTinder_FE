import React, { useEffect, useRef } from "react";
import { Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "./BottomTab";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import VideoCallScreen from "../screens/VideoCallScreen";
import ListExercise from "../screens/ListExercises";
import ReviewPractice from "../screens/ReviewPractice";
import PracticeScreen from "../screens/PracticeScreen";
import EditProfile from "../screens/EditProfile";
import CreatePostScreen from "../screens/CreateAPostScreen";
import ProfileScreen from "../screens/ProfileScreen";

const stack = createStackNavigator();
import {
  connectSocket,
  disconnectSocket,
  setupSocket,
} from "../socketIO/SocketService";
import { useSelector } from "react-redux";
import { getSocket } from "../socketIO/SocketService";

const Stack = () => {
  const user = useSelector((state) => state.user);
  console.log("user", user?.userData?._id);
  const prevUserIdRef = useRef();

  useEffect(() => {
    if (user?.userData?._id && user?.userData?._id !== prevUserIdRef.current) {
      console.log("connect socket");
      connectSocket();
      setupSocket(user.userData);
      prevUserIdRef.current = user?.userData?._id;
    }
  }, [user]);

  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      //initialRouteName="BottomTab"
      initialRouteName={user?.userData?._id ? "BottomTab" : "WelcomeScreen"}
    >
      <stack.Screen name="BottomTab" component={BottomTab} />
      <stack.Screen name="LoginScreen" component={LoginScreen} />
      <stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <stack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
      <stack.Screen name="VideoCallScreen" component={VideoCallScreen} />
      <stack.Screen name="ListExercise" component={ListExercise} />
      <stack.Screen name="ReviewPractice" component={ReviewPractice} />
      <stack.Screen name="PracticeScreen" component={PracticeScreen} />
      <stack.Screen name="EditProfile" component={EditProfile} />
      <stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
      <stack.Screen name="OtherProfileScreen" component={ProfileScreen} />
    </stack.Navigator>
  );
};

export default Stack;
