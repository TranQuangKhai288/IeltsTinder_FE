import React from "react";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabArr = [
  {
    route: "Home",
    label: "Home",
    component: HomeScreen,
  },
  {
    route: "Chat",
    label: "Chat",
    component: ChatScreen,
  },
  {
    route: "Profile",
    label: "Profile",
    component: ProfileScreen,
  },
];

const BottomTab = ({ navigation }) => {
  const { colorScheme } = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarLabel: item.label,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomTab;
