import React, { useEffect, useState } from "react";
import { View, ScrollView, Dimensions, Image, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionic from "react-native-vector-icons/Ionicons";
import * as PostServices from "../apis/PostService";
import { Video } from "expo-av";

const BottomTabView = ({ userId }) => {
  const Tab = createMaterialTopTabNavigator();

  const Height = Dimensions.get("window").height / 3;
  const Width = Dimensions.get("window").width / 3.3;

  const [posts, setPosts] = useState([]);

  const fetchPostsOfUser = async () => {
    const response = await PostServices.getPostOfAUser(userId);
    if (response.status === "OK") {
      console.log(response.data);
      setPosts(response.data);
    }
  };

  useEffect(() => {
    fetchPostsOfUser();
  }, [userId]);

  const Posts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            minHeight: Height,
            backgroundColor: "white",
            flexWrap: "wrap",
            flexDirection: "row",
            paddingVertical: 4,
            justifyContent: "flex-start",
            paddingRight: 5,
            paddingLeft: 5,
          }}
        >
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <View key={index}>
                <View
                  style={{
                    width: Width,
                    height: 160,
                    marginVertical: 0.5,
                    margin: 4,
                  }}
                >
                  {post.media[0].type === "image" ? (
                    <Image
                      source={{ uri: post.media[0].URL }} // Sử dụng thumbnailURL để hiển thị hình ảnh
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Video
                      source={{ uri: post.media[0].URL }} // Sử dụng thumbnailURL để hiển thị hình ảnh
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  )}
                </View>
              </View>
            ))
          ) : (
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                There is no post here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  };

  const VideoTab = () => {
    // Similar implementation as Posts if needed
    return <Posts />;
  };

  const Tags = () => {
    // Similar implementation as Posts if needed
    return <Posts />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          backgroundColor: "black",
          height: 1.5,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Posts") {
            iconName = focused ? "ios-apps-sharp" : "ios-apps-sharp";
            color = focused ? "black" : "gray";
          } else if (route.name === "Video") {
            iconName = focused ? "ios-play-circle" : "ios-play-circle-outline";
            color = focused ? "black" : "gray";
          } else if (route.name === "Tags") {
            iconName = focused ? "ios-person" : "ios-person-outline";
            color = focused ? "black" : "gray";
          }

          return <Ionic name={iconName} color={color} size={22} />;
        },
      })}
    >
      <Tab.Screen name="Posts" component={Posts} />
      <Tab.Screen name="Video" component={VideoTab} />
      <Tab.Screen name="Tags" component={Tags} />
    </Tab.Navigator>
  );
};

export default BottomTabView;
