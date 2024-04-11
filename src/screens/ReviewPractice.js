import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const ReviewPractice = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { practice } = route.params;
  const handlePractice = () => {
    navigation.navigate("PracticeScreen", { practice });
  };

  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "black",
            marginLeft: 20,
          }}
        >
          Kết quả làm bài của bạn
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            width: "80%",
            height: 50,
            backgroundColor: "#005CFF",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={handlePractice}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Let's Practice
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReviewPractice;
