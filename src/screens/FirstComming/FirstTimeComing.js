import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import data from "./data";
import RenderItem from "./RenderItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const FirstTimeComing = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate("EntranceTestScreen");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {data.map((item, index) => {
          return (
            currentIndex === index && <RenderItem key={item.id} item={item} />
          );
        })}
      </View>
      {/* circle button */}
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 80,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity style={styles.button} onPress={() => handleNext()}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FirstTimeComing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Optional: Set a background color for better visibility
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff6347",
    borderRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
