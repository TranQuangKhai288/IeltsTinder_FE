import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { mediaDevices, RTCView } from "react-native-webrtc";
import { getSocket, joinRoom } from "../socketIO/SocketService";

const VideoCallScreen = () => {
  const [callerStream, setCallerStream] = useState(null); // State để lưu trữ luồng media từ camera của caller
  const [isCallAccepted, setIsCallAccepted] = useState(false); // State để theo dõi xem cuộc gọi đã được chấp nhận chưa
  const socket = getSocket();

  // Hàm xử lý khi người kia accept cuộc gọi
  const handleAcceptedCall = (data) => {
    console.log("Accepted call:", data);
  };

  // Effect hook để tạo luồng media từ camera của caller khi component được render
  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const stream = await mediaDevices.getUserMedia({ video: true });
        setCallerStream(stream);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };
    initializeCamera();
  }, []);

  // Effect hook để lắng nghe sự kiện "accepted-call" từ server
  useEffect(() => {
    socket.on("accepted-call", handleAcceptedCall);

    return () => {
      socket.off("accepted-call", handleAcceptedCall);
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Phần hiển thị camera của caller */}
      <View style={{ flex: 1 }}>
        {/* RTCView để hiển thị video từ cuộc gọi */}
        {callerStream && (
          <RTCView streamURL={callerStream.toURL()} style={{ flex: 1 }} />
        )}
      </View>

      {/* Phần hiển thị biểu tượng loading hoặc camera của người kia */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* Nếu cuộc gọi đã được chấp nhận, hiển thị camera của người kia */}
        {isCallAccepted ? (
          <RTCView style={{ flex: 1 }} />
        ) : (
          <View>
            <Text>Đang chờ người kia chấp nhận cuộc gọi...</Text>
          </View>
        )}
      </View>

      {/* Phần tiêu đề */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: 16,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Cuộc gọi video</Text>
      </View>
    </View>
  );
};

export default VideoCallScreen;
