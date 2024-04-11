import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const QuestionComponent = ({ questions, onOptionSelect, answer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionSelect = (option, index) => {
    setSelectedOption(option);
    onOptionSelect(index);
  };

  const Answer = answer?.correctIndex;
  const isCorrect = answer?.isCorrect;
  const optionStyle = (index) => {
    if (Answer === undefined) {
      return selectedOption === questions.options[index]
        ? styles.selectedOption
        : null;
    } else {
      if (isCorrect) {
        return Answer === index ? styles.correctOption : null;
      } else {
        return selectedOption === questions.options[index]
          ? styles.wrongOption
          : Answer === index
          ? styles.correctOption
          : null;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: "black",
          marginBottom: 5,
        }}
      >
        {questions.question}
      </Text>
      {questions.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.option, optionStyle(index)]}
          onPress={() => handleOptionSelect(option, index)}
          disabled={Answer !== undefined}
        >
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: "lightblue",
  },
  correctOption: {
    backgroundColor: "lightgreen",
  },
  wrongOption: {
    backgroundColor: "lightcoral",
  },
});

export default QuestionComponent;
