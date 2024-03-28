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
import { SafeAreaView } from "react-native-safe-area-context";
import Carousal from "react-native-snap-carousel";
import DatesCard from "../components/DatesCard";
import { datesData } from "../dataTestUI";
import { BellIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
const android = Platform.OS === "android";
const { width, height } = Dimensions.get("window");
import { data } from "../data/Data";
import Reels from "../components/Reels";
import VideoItem from "../components/VideoItem";

const HomeScreen = ({ navigation }) => {
  const user = useSelector((state) => state.user);
  const video = useRef(null);
  return (
    <View style={styles.container}>
      <VideoItem data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: "relative",
    backgroundColor: "red",
  },
});

export default HomeScreen;
