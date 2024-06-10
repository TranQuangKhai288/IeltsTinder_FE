import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsUser, getChatList } from "../redux/slice/userSlice";
import * as UserServices from "../apis/UserService";
import { FontAwesome } from "@expo/vector-icons";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogin = async () => {
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await UserServices.loginUser(data);
      if (response.status === "OK") {
        alert("Login successfully");
        dispatch(getDetailsUser(response));
        dispatch(getChatList(response.access_token));
        if (response.data.level === 0) {
          navigation.navigate("FirstComingStack");
        } else {
          navigation.navigate("BottomTab");
        }
      } else {
        alert("Login failed because " + response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image
          source={require("../../assets/topVector.png")}
          style={styles.topImage}
        />
      </View>
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Hello</Text>
      </View>
      <View>
        <Text style={styles.signInText}>Sign in to your account</Text>
      </View>

      <View style={[styles.inputContainer, { marginTop: 40 }]}>
        <FontAwesome
          name="user"
          size={24}
          color="#9A9A9A"
          style={{ marginLeft: 16 }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome
          name="lock"
          size={24}
          color="#9A9A9A"
          style={{ marginLeft: 16 }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={isShowPassword}
        />
        <TouchableOpacity onPress={() => setIsShowPassword(!isShowPassword)}>
          {isShowPassword ? (
            <FontAwesome
              name="eye"
              size={24}
              color="#9A9A9A"
              style={{
                marginRight: 24,
              }}
            />
          ) : (
            <FontAwesome
              name="eye-slash"
              size={24}
              color="#9A9A9A"
              style={{
                marginRight: 24,
              }}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.signInButtonContainer}>
        <Text style={styles.signIn}>Login</Text>
        <TouchableOpacity onPress={handleLogin}>
          <LinearGradient
            colors={["#F97794", "#623AA2"]}
            style={styles.linearGradient}
          >
            <View>
              <FontAwesome name="arrow-right" size={24} color="#FFFFFF" />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Don't have an account?{" "}
        <Text
          style={{ color: "#F97794", textDecorationLine: "underline" }}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          Sign up
        </Text>
      </Text>

      <View style={styles.bottomImageContainer}>
        <ImageBackground
          source={require("../../assets/BottomVector.png")}
          style={styles.bottomImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    position: "relative",
  },
  topImageContainer: {},
  topImage: {
    width: "100%",
    height: 130,
  },
  helloContainer: {},
  helloText: {
    textAlign: "center",
    fontSize: 70,
    fontWeight: "500",
    color: "#262626",
  },
  signInText: {
    textAlign: "center",
    fontSize: 18,
    color: "#262626",
  },

  inputContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderRadius: 20,
    marginHorizontal: 20,
    elevation: 10,
    marginVertical: 10,
    alignItems: "center",
    height: 50,
  },

  textInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
    color: "#262626",
  },

  signInButtonContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    width: "80%",
    marginTop: 24,
  },

  linearGradient: {
    height: 34,
    width: 56,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },

  signIn: {
    color: "#262626",
    fontSize: 25,
    fontWeight: "bold",
  },

  footerText: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    color: "#262626",
    bottom: 150,
  },

  bottomImageContainer: {
    position: "absolute",
    bottom: -16,
    left: -32,
  },

  bottomImage: {
    width: 240,
    height: 350,
  },
});

export default LoginScreen;
