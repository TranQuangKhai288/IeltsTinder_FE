import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsUser, getChatList } from "../redux/slice/userSlice";
import * as UserServices from "../apis/UserService";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        alert("Đăng nhập thành công");
        navigation.navigate("BottomTab");
      } else {
        alert("Đăng nhập thất bại");
      }
      dispatch(getDetailsUser(response));
      dispatch(getChatList(response.access_token));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Đăng nhập" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default LoginScreen;
