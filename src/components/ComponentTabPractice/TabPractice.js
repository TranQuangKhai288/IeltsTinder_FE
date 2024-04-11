import React from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import PracticeComponent from "./PracticeComponent";
const TabPractice = () => {
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
        <PracticeComponent />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({});

export default TabPractice;
