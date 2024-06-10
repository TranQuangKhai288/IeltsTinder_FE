import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import baseURL from "../../apis/Customize-axios";
import * as ExerciseService from "../../apis/ExerciseService";
import { useSelector } from "react-redux";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

const getQuestion = async () => {
  const res = await baseURL.get(
    `/exercise/get-questions-exercise/6616aac30faca45efa3f9664`
  );
  return res;
};

const QuestionItem = ({
  question,
  options,
  correctOption,
  onAnswer,
  index,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionPress = (index, option) => {
    setSelectedOption(option);
    const correct = index === correctOption;
    setIsCorrect(correct);
    setIsSubmitted(true);
    onAnswer(correct, index); // Notify parent component
  };

  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option &&
                (isCorrect ? styles.correct : styles.incorrect),
            ]}
            onPress={
              !isSubmitted ? () => handleOptionPress(index, option) : null
            }
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedOption !== null && (
        <Text style={styles.resultText}>
          {isCorrect ? "Correct!" : "Incorrect!"}
        </Text>
      )}
    </View>
  );
};

const EntranceTestScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const access_token = useSelector((state) => state.user.access_token);
  const fetchQuestions = async () => {
    const response = await getQuestion();
    if (response.status === "OK") {
      setQuestions(response.data);
    }
  };

  const navigation = useNavigation();

  useEffect(() => {
    if (questions.length === 0) {
      fetchQuestions();
    }
  }, [questions]);

  const handleAnswer = (isCorrect, index) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setAnsweredCount((prevCount) => prevCount + 1);
    if (answeredCount + 1 === questions.length) {
      setIsCompleted(true);
    }
  };

  const levelUp = async () => {
    const response = await ExerciseService.levelUp(access_token);
    if (response.status === "OK") {
      alert("Level up, you are LV" + response.data.level);
    }
  };

  const handleHome = () => {
    navigation.navigate("BottomTab");
  };

  useEffect(() => {
    const checkLevelUp = async () => {
      if (score > 5 && isCompleted) {
        await levelUp();
      }
    };
    checkLevelUp();
  }, [isCompleted, score]);

  return (
    <View style={styles.container}>
      {isCompleted ? (
        <View style={styles.resultContainer}>
          <Text style={styles.scoreText}>
            Your score: {score}/{questions.length}
          </Text>
          {score >= 5 ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.scoreText}>
                You passed this test. Let's move on to connect with other
              </Text>
              <TouchableOpacity style={styles.button} onPress={handleHome}>
                <Entypo name="arrow-bold-right" size={48} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.scoreText}>
                You failed this test. Let's try again
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#4CAF50",
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 20,
                  width: 100,
                  alignItems: "center",
                }}
                onPress={() => {
                  setScore(0);
                  setAnsweredCount(0);
                  setIsCompleted(false);
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Try again
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <FlatList
          data={questions}
          renderItem={({ item, index }) => (
            <QuestionItem
              question={item.question}
              options={item.options}
              correctOption={item.correctOption}
              onAnswer={handleAnswer}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: height / 4,
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
  questionContainer: {
    margin: 20,
    padding: 20,
    width: width - 40,
    height: height / 2,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  optionButton: {
    width: "48%",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
  },
  correct: {
    backgroundColor: "#4CAF50",
  },
  incorrect: {
    backgroundColor: "#F44336",
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default EntranceTestScreen;
