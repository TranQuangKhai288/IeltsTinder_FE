import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";

const CommentComponent = ({ name, content, avatar, createdAt }) => {
  const createdAtDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - createdAtDate.getTime();
  let time = 0;
  let timeString = "";

  switch (true) {
    case timeDifference < 60000:
      time = Math.floor(timeDifference / 1000);
      timeString = `${time} seconds ago`;
      break;
    case timeDifference < 3600000:
      time = Math.floor(timeDifference / 60000);
      timeString = `${time} minutes ago`;
      break;
    case timeDifference < 86400000:
      time = Math.floor(timeDifference / 3600000);
      timeString = `${time} hours ago`;
      break;
    case timeDifference < 604800000:
      time = Math.floor(timeDifference / 86400000);
      timeString = `${time} days ago`;
      break;
    case timeDifference < 2592000000:
      time = Math.floor(timeDifference / 604800000);
      timeString = `${time} weeks ago`;
      break;
    default:
      console.log("here");
      break;
  }
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Image
          source={{ uri: avatar }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover",
            borderRadius: 100,
          }}
        />
      </View>

      <View style={styles.comment}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.content}>{content}</Text>
        <Text style={styles.time}>{timeString}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 100,
  },
  comment: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "85%",
    marginHorizontal: 8,
  },
  name: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    color: "black",
    marginVertical: 4,
    fontSize: 14,
    fontWeight: "400",
  },
  time: {
    color: "gray",
    fontSize: 12,
  },
});

export default CommentComponent;
