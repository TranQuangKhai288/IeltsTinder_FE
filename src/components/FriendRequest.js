import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";

import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";

const FriendRequest = ({ name, age, imgUrl }) => {
  return (
    <TouchableOpacity style={styles.container}>
      {/* Avatar */}
      <View
        style={{
          display: "flex",
          width: hp(10),
          height: hp(10),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={imgUrl}
          style={{
            width: "100%",
            height: "100%",
          }}
          className="rounded-full"
        />
      </View>

      {/* Information */}
      <View style={styles.content}>
        <View style={styles.name}>
          <Text style={{ fontSize: 20, fontWeight: "550", color: "white" }}>
            {name}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "550", color: "white" }}>
            timeSent
          </Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#0055FF" }]}
          >
            <Text style={{ fontSize: 16, fontWeight: "550", color: "white" }}>
              Confirm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#808080" }]}
          >
            <Text style={{ fontSize: 16, fontWeight: "550", color: "white" }}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "70%",
    marginLeft: 10,
  },
  name: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  buttons: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    height: 35,
    borderRadius: 8,
  },
});

export default FriendRequest;
