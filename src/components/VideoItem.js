import React, { useEffect, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  Animated,
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Video } from "expo-av";
import Ionic from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
const android = Platform.OS === "android";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const VideoItem = ({ data, isActive }) => {
  const { uri, caption, channelName, musicName, likes, comments, avatarUri } =
    data;

  const [like, setLike] = useState(false);

  const bottomTabBarHeight = useBottomTabBarHeight();
  return (
    <View
      style={[
        styles.container,
        {
          height: android
            ? windowHeight - 4
            : windowHeight - bottomTabBarHeight,
        },
      ]}
    >
      <Video
        source={{ uri: uri }}
        resizeMode="cover"
        isLooping
        shouldPlay={isActive}
        style={styles.video}
      />

      {/* Bottom Left Section */}
      <View
        style={{
          position: "absolute",
          width: windowWidth,
          zIndex: 1,
          bottom: 0, //edited
          padding: 10,
        }}
      >
        <View>
          <TouchableOpacity style={{ width: 150 }}>
            <View
              style={{ width: 100, flexDirection: "row", alignItems: "center" }}
            >
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
                  source={avatarUri}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    borderRadius: 100,
                  }}
                />
              </View>
              <Text style={{ color: "white", fontSize: 24, fontWeight: 600 }}>
                {channelName}
              </Text>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              marginHorizontal: 10,
              fontWeight: 600,
            }}
          >
            {caption}
          </Text>
          <View style={{ flexDirection: "row", padding: 10 }}>
            <Ionic
              name="ios-musical-note"
              style={{ color: "white", fontSize: 16 }}
            />
            <Text style={{ color: "white" }}>Original Audio</Text>
          </View>
        </View>
      </View>

      {/* Bottom Left Section */}
      <View
        style={{
          position: "absolute",
          bottom: 30, //edited
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
              source={avatarUri}
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

        <TouchableOpacity
          onPress={() => setLike(!like)}
          style={styles.bottomRightSection}
        >
          <AntDesign
            name={like ? "heart" : "hearto"}
            style={{ color: like ? "red" : "white", fontSize: 30 }}
          />
          <Text style={{ color: "white" }}>17</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomRightSection}>
          <Ionic
            name="ios-chatbubble-outline"
            style={{ color: "white", fontSize: 30 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomRightSection}>
          <Ionic
            name="paper-plane-outline"
            style={{ color: "white", fontSize: 30 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomRightSection}>
          <Feather
            name="more-vertical"
            style={{ color: "white", fontSize: 30 }}
          />
        </TouchableOpacity>
      </View>
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
});

export default VideoItem;
