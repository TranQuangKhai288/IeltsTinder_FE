import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";

import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const FeatureComponent = ({ name, age, imgUrl }) => {
  const navigation = useNavigation();
  const handleFeature = () => {
    if (name === "Ielts Practice") {
      navigation.navigate("ListExercise");
    } else if (name === "Random Match") {
      navigation.navigate("FindYourDestinyScreen");
    } else if (name === "Friends") {
      navigation.navigate("FriendsScreen");
    } else if (name === "Play games") {
      navigation.navigate("PlayGamesScreen");
    } else if (name === "Video") {
      navigation.navigate("VideoScreen");
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleFeature}>
      <View>
        <View
          style={{
            display: "flex",
            width: hp(4),
            height: hp(4),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={imgUrl}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
        <Text
          style={{
            color: "#BEBEBE",
            fontSize: 18,
            fontWeight: "500",
            textAlign: "left",
            marginTop: 2,
          }}
        >
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    width: "45%",
    backgroundColor: "#333333",
    borderRadius: 10,
    margin: 4,
  },
});

export default FeatureComponent;
