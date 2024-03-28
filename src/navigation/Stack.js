import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "./BottomTab";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
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
    </stack.Navigator>
  );
};

export default Stack;
