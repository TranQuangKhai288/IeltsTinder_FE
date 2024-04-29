import React, { useEffect } from "react";
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
const stack = createStackNavigator();
import {
  connectSocket,
  disconnectSocket,
  setupSocket,
} from "../socketIO/SocketService";
import { useSelector } from "react-redux";

const Stack = () => {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.userData?._id) {
      console.log("connect socket");
      connectSocket();
      setupSocket(user.userData);
    }
  }, [user]);
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="BottomTab"
      //initialRouteName={user?.userData?._id ? "BottomTab" : "WelcomeScreen"}
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
    </stack.Navigator>
  );
};

export default Stack;
