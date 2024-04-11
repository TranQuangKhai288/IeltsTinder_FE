import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import QuestionComponent from "../components/QuestionComponent";
import { useRoute } from "@react-navigation/native";

import * as ExerciseService from "../apis/ExerciseService";

const PracticeScreen = () => {
  const route = useRoute();
  const { practice } = route.params;
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answer, setAnswer] = useState([]);

  const fetchQuestions = async () => {
    const response = await ExerciseService.getAllQuestionInPractice(
      practice._id
    );
    if (response.status === "OK") {
      const initialSelectedOptions = {};
      response.data.forEach((question) => {
        initialSelectedOptions[question._id] = null;
      });
      setSelectedOptions(initialSelectedOptions);
      setQuestions(response.data);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [practice]);

  const handleOptionSelect = (questionId, option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: option,
    }));
  };

  const handleSubmit = async () => {
    const answerArray = Object.entries(selectedOptions).map(
      ([questionId, answer]) => ({
        _id: questionId,
        answer: answer,
      })
    );

    const response = await ExerciseService.checkAnswer(
      practice._id,
      answerArray
    );
    if (response.status === "OK") {
      setAnswer(response.data);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {questions.length > 0 &&
          questions.map((question, index) => (
            <QuestionComponent
              key={index}
              questions={question}
              onOptionSelect={(option) =>
                handleOptionSelect(question._id, option)
              }
              answer={
                answer.filter((item) => item.questionId === question._id)[0]
              }
            />
          ))}
        <TouchableOpacity
          style={styles.submitButtonContainer}
          onPress={handleSubmit}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "black",
              padding: 10,
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  submitButtonContainer: {
    backgroundColor: "lightblue",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
  },
});

export default PracticeScreen;
