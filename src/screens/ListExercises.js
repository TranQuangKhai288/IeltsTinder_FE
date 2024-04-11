import React from "react";
import { View, Text, ScrollView } from "react-native";
import { ProfileBody, ProfileButtons } from "../components/ProfileBody";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Entypo from "react-native-vector-icons/Entypo";
import TabExercise from "../components/ComponentTabPractice/TabExercise";
import { datesData, matchesData } from "../dataTestUI";
const ListExercise = () => {
  let circuls = [];
  let numberofcircels = 10;

  for (let index = 0; index < numberofcircels; index++) {
    circuls.push(
      <View key={index}>
        {index === 0 ? (
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              borderWidth: 1,
              opacity: 0.7,
              marginHorizontal: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Entypo name="plus" style={{ fontSize: 40, color: "black" }} />
          </View>
        ) : (
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              backgroundColor: "black",
              opacity: 0.1,
              marginHorizontal: 5,
            }}
          ></View>
        )}
      </View>
    );
  }

  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <TabExercise />
    </View>
  );
};

export default ListExercise;
