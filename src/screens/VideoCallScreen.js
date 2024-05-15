import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getSocket } from "../socketIO/SocketService";
import { useSelector } from "react-redux";
import {
  RTCPeerConnection,
  RTCView,
  mediaDevices,
  RTCSessionDescription,
  RTCIceCandidate,
} from "react-native-webrtc";

const VideoCallScreen = ({ route }) => {
  const { callRoomId, chatRoomId, isCaller, callerId } = route.params;
  const socket = getSocket();
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const user = useSelector((state) => state.user.userData);
  const peerConnection = useRef(null);

  const getLocalStream = async () => {
    const stream = await mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(stream);
  };

  useEffect(() => {
    getLocalStream();
  }, []);

  useEffect(() => {
    if (socket) {
      if (isCaller) {
        socket.emit("new-call", { chatRoomId, callerId });
      }

      socket.on("accepted", () => {
        console.log("accepted");
        createPeerConnection();
      });

      socket.on("rtc-message", (rtcMessage) => {
        console.log("Received RTC message:", rtcMessage);
        handleRtcMessage(rtcMessage);
      });
    }

    return () => {
      if (socket) {
        socket.off("accepted");
        socket.off("rtc-message");
      }
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, [socket, isCaller, callRoomId, callerId]);

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
      setRemoteStreams((prevStreams) => {
        const newStreams = [...prevStreams];
        event.streams.forEach((stream) => {
          if (!newStreams.some((s) => s.id === stream.id)) {
            newStreams.push(stream);
          }
        });
        return newStreams;
      });
    };

    if (localStream) {
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });
    }

    if (isCaller) {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socket.emit("rtc-message", {
        type: "offer",
        sdp: pc.localDescription,
        callRoomId: callRoomId,
      });
    }
  };

  const handleRtcMessage = async (rtcMessage) => {
    const pc = peerConnection.current;
    if (!pc) {
      await createPeerConnection();
    }

    if (rtcMessage.type === "offer") {
      await pc.setRemoteDescription(new RTCSessionDescription(rtcMessage.sdp));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket.emit("rtc-message", {
        type: "answer",
        sdp: pc.localDescription,
        callRoomId: callRoomId,
      });
    } else if (rtcMessage.type === "answer") {
      await pc.setRemoteDescription(new RTCSessionDescription(rtcMessage.sdp));
    } else if (rtcMessage.type === "candidate") {
      await pc.addIceCandidate(new RTCIceCandidate(rtcMessage.candidate));
    }
  };

  console.log("remoteStream", remoteStreams);
  return (
    <View style={styles.container}>
      <Text>Video Call Screen</Text>
      {localStream && (
        <RTCView streamURL={localStream.toURL()} style={styles.localVideo} />
      )}
      {remoteStreams.length > 0 ? (
        remoteStreams.map((stream) => (
          <RTCView
            key={stream.id}
            streamURL={stream.toURL()}
            style={styles.remoteVideo}
          />
        ))
      ) : (
        <Text>No remote streams</Text>
      )}
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
    width: 200,
    height: 200,
    position: "absolute",
    top: 10,
    left: 10,
  },
  remoteVideo: {
    width: 200,
    height: 200,
    margin: 10,
  },
});

export default VideoCallScreen;
