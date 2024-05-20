import React, { useEffect, useState, useRef } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { Video } from "expo-av";
import Ionic from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import CommentComponent from "./CommentComponent";
import BottomSheet from "@gorhom/bottom-sheet";
import * as PostService from "../apis/PostService";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const android = Platform.OS === "android";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const VideoItem = ({ data, isActive }) => {
  const [like, setLike] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [comments, setComments] = useState([]);
  const sheetRef = useRef(null);
  const flatListRef = useRef(null);
  const bottomTabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.x / layoutMeasurement.width);
    setCurrentIndex(currentIndex);
  };

  const scrollToImage = (index) => {
    flatListRef.current.scrollToIndex({ index, animated: true });
  };

  const handleComment = async () => {
    sheetRef.current?.expand();

    const res = await PostService.getAllCommentsofAPost(data._id);
    if (res.status === "OK") {
      setComments(res.data);
    }
  };

  const navigation = useNavigation();

  const handleOtherProfile = (data) => {
    const id = data.user._id;
    navigation.navigate("OtherProfileScreen", { id });
  };

  const renderComment = () => {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {/* title */}
        <Text
          style={{
            textAlign: "center",
            width: "100%",
            fontSize: 14,
            fontWeight: "600",
          }}
        >
          {data.countComment} Comments
        </Text>
        {/* comments */}

        <ScrollView style={{ marginBottom: 50 }}>
          {comments.map((comment, index) => {
            return (
              <CommentComponent
                key={index}
                name={comment.user.name}
                content={comment.content}
                avatar={comment.user.avatar}
                createdAt={comment.createdAt}
              />
            );
          })}
        </ScrollView>

        {/* input */}
        <KeyboardAvoidingView
          style={styles.inputWrapper}
          behavior={"padding"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 300 : 300}
        >
          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 100,
              margin: 6,
            }}
          >
            <Image
              source={{ uri: data.user.avatar }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                borderRadius: 100,
              }}
            />
          </View>
          <TextInput placeholder="Add a comment..." style={styles.input} />
          <TouchableOpacity style={styles.sendButton}>
            <Ionic name="send" style={{ fontSize: 20 }} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  };
  return (
    <View
      style={[
        styles.container,
        {
          height: android
            ? windowHeight - bottomTabBarHeight + insets.top
            : windowHeight - bottomTabBarHeight,
        },
      ]}
    >
      <View style={styles.video}>
        {data.media[0].type === "video" ? (
          <TouchableOpacity
            style={styles.video}
            activeOpacity={1}
            onPress={() => {
              setIsPaused(!isPaused);
            }}
          >
            <Video
              source={{ uri: data.media[0].URL }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay={isActive && !isPaused}
              isLooping
              style={styles.video}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.container}>
            <FlatList
              ref={flatListRef}
              style={styles.flatList}
              data={data.media}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View
                  style={[
                    styles.imageContainer,
                    index === currentIndex && styles.activeContainer,
                  ]}
                  key={index}
                >
                  {item.type === "image" ? (
                    <Image source={{ uri: item.URL }} style={styles.image} />
                  ) : (
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        console.log("clicked");
                        setIsPaused(!isPaused);
                      }}
                    >
                      <Video
                        source={{ uri: item.uri }}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                        resizeMode="contain"
                        isLooping
                        shouldPlay={!isPaused}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              )}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            />
            <View style={styles.indicatorContainer}>
              {data.media.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => scrollToImage(index)}
                  style={[
                    styles.indicator,
                    index === currentIndex && styles.activeIndicator,
                  ]}
                />
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Bottom Left Section */}

      <View
        style={{
          position: "absolute",
          width: windowWidth,
          bottom: 0, //edited
          padding: 10,
        }}
      >
        <View>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              handleOtherProfile(data);
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 100,
                  backgroundColor: "white",
                  margin: 10,
                }}
              >
                <Image
                  source={{ uri: data.user.avatar }}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    borderRadius: 100,
                  }}
                />
              </View>
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: 600,
                  width: "70%",
                }}
              >
                {data.user.name}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              width: "85%",

              marginHorizontal: 8,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: 400,
              }}
              numberOfLines={showFullText ? undefined : 2} // Chỉ hiển thị tối đa 2 dòng
              ellipsizeMode="tail" // Hiển thị dấu ... khi văn bản bị cắt
            >
              Tran quang khai Tran quang khai Tran quang khai Tran quang khai
              Tran quang khai Tran quang khai
              {/* {data.content} */}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 10,
              marginHorizontal: 4,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Ionic
                name="ios-musical-note"
                style={{ color: "white", fontSize: 16 }}
              />
              <Text style={{ color: "white" }}>Original Audio</Text>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                marginRight: 40,
              }}
            >
              {!showFullText ? (
                <TouchableOpacity
                  onPress={() => setShowFullText(true)}
                  activeOpacity={1}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      marginHorizontal: 10,
                      fontWeight: 400,
                    }}
                  >
                    ...Xem thêm
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setShowFullText(false)}
                  activeOpacity={1}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      marginHorizontal: 10,
                      fontWeight: 400,
                    }}
                  >
                    Ẩn bớt
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Bottom Right Section */}
      <View
        style={{
          position: "absolute",
          bottom: 10, //edited
          right: 0,
        }}
      >
        <TouchableOpacity
          style={[
            styles.bottomRightSection,
            {
              marginBottom: 12,
            },
          ]}
        >
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 100,
              backgroundColor: "white",
            }}
          >
            <Image
              source={{ uri: data.user.avatar }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
                borderRadius: 100,
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 0,
            }}
          >
            <Image
              source={require("../assets/images/plus-button.png")}
              style={styles.followIcon}
            />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* like */}
        <TouchableOpacity
          onPress={() => setLike(!like)}
          style={styles.bottomRightSection}
        >
          <AntDesign
            name={like ? "heart" : "hearto"}
            style={{ color: like ? "red" : "white", fontSize: 30 }}
          />
          <Text style={{ color: "white" }}>{data.countLike}</Text>
        </TouchableOpacity>

        {/* comment */}
        <TouchableOpacity
          style={styles.bottomRightSection}
          onPress={handleComment}
        >
          <Ionic
            name="ios-chatbubble-outline"
            style={{ color: "white", fontSize: 30 }}
          />
          <Text style={{ color: "white" }}>{data.countComment}</Text>
        </TouchableOpacity>

        {/* share */}
        <TouchableOpacity style={styles.bottomRightSection}>
          <Ionic
            name="paper-plane-outline"
            style={{ color: "white", fontSize: 30 }}
          />
        </TouchableOpacity>

        {/* more */}
        <TouchableOpacity style={styles.bottomRightSection}>
          <Feather
            name="more-vertical"
            style={{ color: "white", fontSize: 30 }}
          />
        </TouchableOpacity>
      </View>

      <BottomSheet ref={sheetRef} index={-1} snapPoints={[0.05, "70%"]}>
        {renderComment}
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
  },
  video: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  bottomRightSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },

  followIcon: {
    width: 21,
    height: 21,
  },
  floatingMusicNote: {
    position: "absolute",
    right: 40,
    bottom: 16,
    width: 16,
    height: 16,
    tintColor: "white",
  },
  flatList: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  imageContainer: {
    width: windowWidth,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
  },
  activeContainer: {
    opacity: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  indicatorContainer: {
    flexDirection: "row",
    marginVertical: 16,
  },

  inputWrapper: {
    width: "100%",
    height: 60,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    height: 38,
    width: "75%",
    backgroundColor: "#f0f0f0",
    borderRadius: 100,
    paddingLeft: 10,
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 100,
    margin: 6,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default VideoItem;
