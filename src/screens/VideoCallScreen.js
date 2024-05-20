import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getSocket } from "../socketIO/SocketService";
import { useSelector } from "react-redux";
import {
  RTCPeerConnection,
  RTCView,
  mediaDevices,
  RTCSessionDescription,
  RTCIceCandidate,
} from "react-native-webrtc";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const VideoCallScreen = ({ route }) => {
  const { callRoomId, chatRoomId, isCaller, callerId } = route.params;
  const socket = getSocket();
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const user = useSelector((state) => state.user.userData);
  const navigation = useNavigation();
  const peerConnection = useRef(null);

  const getLocalStream = async () => {
    try {
      const stream = await mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
    } catch (error) {
      console.log("Error getting local stream:", error);
    }
  };

  useEffect(() => {
    getLocalStream();
  }, []);

  useEffect(() => {
    if (socket) {
      if (isCaller) {
        socket.emit("new-call", { chatRoomId, callerId });
      }

      socket.on("accepted", async () => {
        console.log("Call accepted");
        setIsConnected(true);
        if (localStream) {
          await createPeerConnection();
        } else {
          console.log("Local stream not ready yet");
        }
      });

      socket.on("rejected", async () => {
        console.log("Call rejected");
        setIsConnected(false);
        navigation.navigate("BottomTab");
      });

      socket.on("rtc-message", async (rtcMessage) => {
        console.log("Received RTC message:", rtcMessage);
        await handleRtcMessage(rtcMessage);
      });
    }

    return () => {
      if (socket) {
        socket.off("accepted");
        socket.off("rtc-message");
      }
    };
  }, [socket, isCaller, callRoomId, callerId, localStream]);

  const createPeerConnection = async () => {
    const pc = new RTCPeerConnection();
    peerConnection.current = pc;

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("ICE Candidate:", event.candidate);
        socket.emit("rtc-message", {
          type: "candidate",
          candidate: event.candidate,
          callRoomId: callRoomId,
        });
      }
    };

    pc.ontrack = (event) => {
      console.log("Remote stream added:", event.streams);
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
      }
    };

    if (localStream) {
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });
    } else {
      console.log(
        "Local stream is not available when creating peer connection"
      );
    }

    if (isCaller) {
      try {
        if (pc.signalingState === "stable") {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          console.log("Offer created and set as local description");

          socket.emit("rtc-message", {
            type: "offer",
            sdp: pc.localDescription,
            callRoomId: callRoomId,
          });
        } else {
          console.log(
            "Peer connection is not in a stable state to create offer"
          );
        }
      } catch (error) {
        console.log("Error creating offer:", error);
      }
    }
  };

  const handleRtcMessage = async (rtcMessage) => {
    let pc = peerConnection.current;
    if (!pc) {
      pc = new RTCPeerConnection();
      peerConnection.current = pc;

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("ICE Candidate:", event.candidate);
          socket.emit("rtc-message", {
            type: "candidate",
            candidate: event.candidate,
            callRoomId: callRoomId,
          });
        }
      };

      pc.ontrack = (event) => {
        console.log("Remote stream added:", event.streams);
        if (event.streams && event.streams[0]) {
          setRemoteStream(event.streams[0]);
        }
      };

      if (localStream) {
        localStream.getTracks().forEach((track) => {
          pc.addTrack(track, localStream);
        });
      } else {
        console.log(
          "Local stream is not available when creating peer connection"
        );
      }
    }

    try {
      if (rtcMessage.type === "offer" || rtcMessage.type === "answer") {
        if (rtcMessage.sdp) {
          if (
            (rtcMessage.type === "offer" && pc.signalingState === "stable") ||
            (rtcMessage.type === "answer" &&
              pc.signalingState === "have-local-offer")
          ) {
            try {
              await pc.setRemoteDescription(
                new RTCSessionDescription(rtcMessage.sdp)
              );
              console.log(`Remote ${rtcMessage.type} set`);
            } catch (error) {
              console.log(`Error setting remote ${rtcMessage.type}:`, error);
            }
          } else {
            console.log(
              `Peer connection is not in the correct state to set remote ${rtcMessage.type}`
            );
          }
        } else {
          console.log(`Received ${rtcMessage.type} without SDP data`);
        }

        if (rtcMessage.type === "offer") {
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          console.log("Answer created and set as local description");

          socket.emit("rtc-message", {
            type: "answer",
            sdp: pc.localDescription,
            callRoomId: callRoomId,
          });
        }
      } else if (rtcMessage.type === "candidate") {
        if (pc.remoteDescription) {
          if (rtcMessage.candidate) {
            console.log("rtcMessage candidate:", rtcMessage.candidate);
            try {
              await pc.addIceCandidate(
                new RTCIceCandidate(rtcMessage.candidate)
              );
              console.log("ICE Candidate added");
            } catch (error) {
              console.log("Error adding ICE candidate:", error);
            }
          } else {
            console.log("Received candidate message without candidate data");
          }
        } else {
          console.log("Remote description not set before adding ICE candidate");
        }
      }
    } catch (error) {
      console.log("Error handling RTC message:", error);
    }
  };

  const handleEndCall = () => {
    if (socket) {
      socket.emit("end-call", { callRoomId });
      setIsConnected(false);
      navigation.navigate("BottomTab");
    }
  };

  return (
    <View style={styles.container}>
      {localStream && (
        <RTCView streamURL={localStream.toURL()} style={styles.localVideo} />
      )}
      {isConnected || remoteStream ? (
        <RTCView streamURL={localStream.toURL()} style={styles.remoteVideo} />
      ) : (
        <Text>No remote streams</Text>
      )}

      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          handleEndCall();
        }}
      >
        <Ionicons name="call" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  localVideo: {
    position: "relative",
    width: "100%",
    flex: 1,
  },
  remoteVideo: {
    position: "relative",
    width: "100%",
    flex: 1,
  },
  Button: {
    position: "absolute",
    bottom: 10,

    backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,

    borderRadius: 50,
  },
});

export default VideoCallScreen;
