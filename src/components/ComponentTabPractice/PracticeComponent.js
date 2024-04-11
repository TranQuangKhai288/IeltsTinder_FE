import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const PracticeComponent = ({ practice }) => {
  const navigation = useNavigation();
  const handleReviewPractice = (practice) => {
    navigation.navigate("ReviewPractice", { practice });
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleReviewPractice(practice)}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          color: "black",
          marginBottom: 5,
        }}
      >
        {practice?.title}
      </Text>
      <Text style={{ fontSize: 16, fontWeight: "medium", color: "black" }}>
        Số điểm đã đạt được: 0/{practice?.questions?.length}
      </Text>
      <Text style={{ fontSize: 14, fontWeight: "medium", color: "black" }}>
        Thời gian: 60 phút
      </Text>
      <Text style={{ fontSize: 14, fontWeight: "medium", color: "black" }}>
        {practice?.questions?.length} câu hỏi
      </Text>
      <Text style={{ fontSize: 14, fontWeight: "medium", color: "black" }}>
        #TOEIC #Practice
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#BEBEBE",
    backgroundColor: "white",
  },
});

export default PracticeComponent;
