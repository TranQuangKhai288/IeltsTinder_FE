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

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const dispatch = useDispatch();
  const handleRegister = async () => {
    const data = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      phoneNumber: phoneNumber,
    };
    if (
      password === "" ||
      confirmPassword === "" ||
      name === "" ||
      email === "" ||
      phoneNumber === ""
    ) {
      alert("Please check your input");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password and confirm password must be the same");
      return;
    }

    try {
      const response = await UserServices.registerUser(data);
      if (response.status === "OK") {
        alert("Register successfully");
        navigation.navigate("LoginScreen");
      } else {
        alert("Register failed " + response.message);
      }
      dispatch(getDetailsUser(response));
      dispatch(getChatList(response.access_token));
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
        <Text style={styles.helloText}>Register</Text>
      </View>
      <View>
        <Text style={styles.signUpText}>Sign up for more feature</Text>
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
          name="user"
          size={24}
          color="#9A9A9A"
          style={{ marginLeft: 16 }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome
          name="phone"
          size={24}
          color="#9A9A9A"
          style={{ marginLeft: 16 }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Phone number"
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <View style={[styles.inputContainer]}>
        <FontAwesome
          name="lock"
          size={24}
          color="#9A9A9A"
          style={{ marginLeft: 16 }}
        />
        <TextInput
          style={[styles.textInput]}
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

      <View style={styles.inputContainer}>
        <FontAwesome
          name="lock"
          size={24}
          color="#9A9A9A"
          style={{ marginLeft: 16 }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
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

      <View style={styles.signUpButtonContainer}>
        <Text style={styles.signUp}>Register</Text>
        <LinearGradient
          colors={["#F97794", "#623AA2"]}
          style={styles.linearGradient}
        >
          <TouchableOpacity onPress={handleRegister}>
            <FontAwesome name="arrow-right" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Text
          style={{ color: "#F97794", textDecorationLine: "underline" }}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          Sign in
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
  signUpText: {
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

  signUpButtonContainer: {
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

  signUp: {
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
    bottom: 80,
  },

  bottomImageContainer: {
    position: "absolute",
    zIndex: -1,
    bottom: -16,
    left: -64,
  },

  bottomImage: {
    width: 240,
    height: 350,
  },
});

export default RegisterScreen;
