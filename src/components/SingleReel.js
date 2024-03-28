import React, { useRef, useState } from "react";
import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import { Video } from "expo-av";
import Ionic from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

const SingleReel = ({ item, index, currentIndex }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const videoRef = useRef(null);
  const [mute, setMute] = useState(false);

  const [like, setLike] = useState(item.isLike);

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Video
        ref={videoRef}
        shouldPlay
        resizeMode="contain"
        // //paused={currentIndex == index ? false : true}
        source={{ uri: item.uri }}
        isLooping
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      />

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
                  source={item.postProfile}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "cover",
                    borderRadius: 100,
                  }}
                />
              </View>
              <Text style={{ color: "white", fontSize: 16 }}>{item.title}</Text>
            </View>
          </TouchableOpacity>
          <Text style={{ color: "white", fontSize: 14, marginHorizontal: 10 }}>
            {item.description}
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
      <View
        style={{
          position: "absolute",
          bottom: 0, //edited
          right: 0,
        }}
      >
        <TouchableOpacity
          onPress={() => setLike(!like)}
          style={{ padding: 10 }}
        >
          <AntDesign
            name={like ? "heart" : "hearto"}
            style={{ color: like ? "red" : "white", fontSize: 25 }}
          />
          <Text style={{ color: "white" }}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Ionic
            name="ios-chatbubble-outline"
            style={{ color: "white", fontSize: 25 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Ionic
            name="paper-plane-outline"
            style={{ color: "white", fontSize: 25 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <Feather
            name="more-vertical"
            style={{ color: "white", fontSize: 25 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleReel;
