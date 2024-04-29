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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as PostService from "../apis/PostService";
const HomeScreen = () => {
  const user = useSelector((state) => state.user.userData);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const bottomTabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await PostService.getAll();
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const navigation = useNavigation();
  return (
    <View>
      <View
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          flexDirection: "row",
          zIndex: 1,
          paddingHorizontal: 20,
          paddingTop: insets.top || 20,
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            navigation.navigate("CreatePostScreen");
          }}
        >
          <Ionicons name="camera" style={{ fontSize: 32, color: "white" }} />
        </TouchableOpacity>

        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
            Ielst Tikbook
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <Ionicons name="search" style={{ fontSize: 32, color: "white" }} />
          <Ionicons
            name="notifications"
            style={{ fontSize: 32, color: "white", marginLeft: 4 }}
          />
        </View>
      </View>
      <FlatList
        data={posts}
        pagingEnabled
        bar
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <VideoItem
            data={item}
            isActive={activeVideoIndex === index}
            key={index}
          />
        )}
        onScroll={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.y / (height - bottomTabBarHeight)
          );
          setActiveVideoIndex(index);
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
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
