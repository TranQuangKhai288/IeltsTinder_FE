import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousal from "react-native-snap-carousel";
import DatesCard from "../components/DatesCard";
import { datesData } from "../dataTestUI";
import { BellIcon } from "react-native-heroicons/outline";
import { user1 } from "../../assets/images";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
const android = Platform.OS === "android";
const { width, height } = Dimensions.get("window");
import { useSelector } from "react-redux";
import io from "socket.io-client";

const HomeScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const socket = io("http://192.168.1.10:5000"); // Thay đổi 'http://your-backend-server-url' thành URL của máy chủ của bạn

    if (user) {
      socket.on("connect", () => {
        console.log("Connected to server");
      });
    } else {
      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    }

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <SafeAreaView
      className="bg-white flex-1 justify-between"
      style={{
        paddingTop: android ? hp(2) : 0,
      }}
    >
      {/* Header */}
      <View className="w-full flex-row justify-between items-center px-4 mb-8">
        <View className="rounded-full items-center justify-center">
          <Image
            source={{ uri: user.userData.avatar }}
            style={{
              width: hp(4.5),
              height: hp(4.5),
              resizeMode: "cover",
            }}
            className="rounded-full"
          />
        </View>

        <View>
          <Text className="text-xl font-semibold text-center uppercase">
            STACKS Dates
          </Text>
        </View>

        {/* Heart Icon */}
        <View className="bg-black/10 p-2 rounded-full items-center justify-center">
          <TouchableOpacity>
            <BellIcon size={25} strokeWidth={2} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Carousal */}
      <View className=" pb-4">
        <View className="mx-4 mb-4">
          <Text className="capitalize text-2xl font-semibold">
            Find your love
          </Text>
        </View>

        <View className="">
          <Carousal
            data={datesData}
            renderItem={({ item }) => <DatesCard item={item} />}
            firstItem={1}
            inactiveSlideScale={0.86}
            inactiveSlideOpacity={0.6}
            sliderWidth={width}
            itemWidth={width * 0.8}
            slideStyle={{ display: "flex", alignItems: "center" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
