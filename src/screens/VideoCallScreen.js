import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getSocket } from "../socketIO/SocketService";
import { RTCPeerConnection, RTCView, mediaDevices } from "react-native-webrtc";

const VideoCallScreen = ({ route }) => {
  const { callRoomId } = route.params;
  const socket = getSocket();
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);

  const getLocalStream = async () => {
    const stream = await mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocalStream(stream);
  };

  useEffect(() => {
    getLocalStream();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("accepted", () => {
        console.log("accepted call");
        startCall();
      });
    }

    return () => {
      if (socket) {
        socket.off("accepted");
      }
    };
  }, [socket]);

  const startCall = async () => {
    try {
      // Yêu cầu quyền truy cập camer

      // Khởi tạo RTCPeerConnection để gửi và nhận dữ liệu media
      const peerConnection = new RTCPeerConnection();

      // Thêm luồng media vào RTCPeerConnection
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      // Xử lý khi có luồng media từ người khác
      peerConnection.ontrack = (event) => {
        setRemoteStreams((prevStreams) => [...prevStreams, event.streams[0]]);
      };

      // Các xử lý khác cho RTCPeerConnection, như trao đổi ICE Candidate, tạo offer/answer...
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  console.log("localStream:", localStream);
  console.log("remoteStreams:", remoteStreams);

  return (
    <View>
      <Text>Video Call Screen</Text>
      {/* Hiển thị camera cục bộ */}
      {localStream && (
        <RTCView
          streamURL={localStream.toURL()}
          style={{ width: 200, height: 200 }}
        />
      )}

      {/* Hiển thị camera từ người khác */}
      {remoteStreams.map((stream, index) => (
        <RTCView
          key={index}
          streamURL={stream.toURL()}
          style={{ width: 200, height: 200 }}
        />
      ))}
    </View>
  );
};

export default VideoCallScreen;
