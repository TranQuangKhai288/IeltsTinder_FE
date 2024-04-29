import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";

const FriendRequest = ({ id, name, level, avatar }) => {
  const access_token = useSelector((state) => state.user.access_token);

  const [status, setStatus] = useState("pending");

  const handleComfirmFriendRequest = async () => {
    // Confirm friend request
    // const response = await UserService.acceptFriendRequest(id, access_token);
    // if (response.status === "OK") {
    //   console.log("Friend request accepted");
    // }
    console.log("Confirm friend request", id);
    setStatus("confirmed");
  };

  const handleRejectFriendRequest = async () => {
    // Reject friend request
    console.log("Reject friend request", id);
    setStatus("rejected");
  };

  const Button = () => {
    return (
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#0055FF" }]}
          onPress={handleComfirmFriendRequest}
        >
          <Text style={{ fontSize: 16, fontWeight: "400", color: "white" }}>
            Confirm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#808080" }]}
          onPress={handleRejectFriendRequest}
        >
          <Text style={{ fontSize: 16, fontWeight: "400", color: "white" }}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const AfterConfirm = () => {
    return (
      <View style={styles.afterConfirm}>
        {status === "confirmed" ? (
          <Text style={{ fontSize: 16, fontWeight: "400", color: "white" }}>
            You guys are friends now
          </Text>
        ) : (
          <Text style={{ fontSize: 16, fontWeight: "400", color: "white" }}>
            Friend request removed
          </Text>
        )}
      </View>
    );
  };

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
          source={{ uri: avatar }}
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
          <Text style={{ fontSize: 20, fontWeight: "400", color: "white" }}>
            {name}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "400", color: "white" }}>
            {"Level:"} {level}
          </Text>
        </View>
        {status === "pending" ? <Button /> : <AfterConfirm />}
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
  afterConfirm: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: 35,
    borderRadius: 8,
    marginTop: 10,
  },
});

export default FriendRequest;
