import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import PracticeComponent from "./PracticeComponent";
import * as ExerciseService from "../../apis/ExerciseService";
const TabToeicPracticeLibrary = () => {
  const [practices, setPractices] = useState([]);

  const fetchAllToeicPractice = async () => {
    const response = await ExerciseService.getAllExercise();

    if (response.status === "OK") {
      setPractices(response.data);
    }
  };
  useEffect(() => {
    fetchAllToeicPractice();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          flexWrap: "wrap",
          flexDirection: "row",
          paddingVertical: 5,
          justifyContent: "space-between",
          paddingRight: 10,
          paddingLeft: 10,
        }}
      >
        {practices &&
          practices.map(
            (practice, index) =>
              // Kiểm tra xem practice có giá trị không trước khi truyền vào PracticeComponent
              practice && <PracticeComponent key={index} practice={practice} />
          )}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({});

export default TabToeicPracticeLibrary;
