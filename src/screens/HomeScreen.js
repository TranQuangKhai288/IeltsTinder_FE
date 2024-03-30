import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const android = Platform.OS === "android";
const { width, height } = Dimensions.get("window");
import { data } from "../data/Data";
import VideoItem from "../components/VideoItem";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Octicons from "react-native-vector-icons/Octicons";
import { SafeAreaView } from "react-native-safe-area-context";
const HomeScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const video = useRef(null);

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <View>
      <SafeAreaView
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          zIndex: 1,
          paddingHorizontal: 30,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Ielst Tikbook
        </Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Octicons name="search" style={{ fontSize: 25, color: "white" }} />
          <Octicons
            name="bell-fill"
            style={{ fontSize: 25, color: "white", marginLeft: 16 }}
          />
        </View>
      </SafeAreaView>
      <FlatList
        data={data}
        pagingEnabled
        renderItem={({ item, index }) => (
          <VideoItem data={item} isActive={activeVideoIndex === index} />
        )}
        onScroll={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.y / (height - bottomTabBarHeight)
          );

          setActiveVideoIndex(index);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: "red",
  },
});

export default HomeScreen;
