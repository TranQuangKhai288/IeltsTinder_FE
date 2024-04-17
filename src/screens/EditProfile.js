import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  TextInput,
} from "react-native";
import {
  SafeAreaView,
  SafeAreaInsetsContext,
} from "react-native-safe-area-context";
import Ionic from "react-native-vector-icons/Ionicons";
import * as UserServices from "../apis/UserService";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useSelector, useDispatch } from "react-redux";
import { getDetailsUser } from "../redux/slice/userSlice";

const EditProfile = ({ route, navigation }) => {
  const { name, accountName, profileImage } = route.params;
  const [newName, setNewName] = useState(name);
  const [newProfileImage, setNewProfileImage] = useState(profileImage);

  const access_token = useSelector((state) => state.user.access_token);

  const dispatch = useDispatch();

  const imageToBase64 = async (imageUri) => {
    try {
      // Read the image file
      const image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const base64 = `data:image/jpg;base64,${image}`;
      return base64;
    } catch (error) {
      console.error("Error converting image to Base64:", error);
      return null;
    }
  };

  const selectImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const base64 = await imageToBase64(result.uri);
      setNewProfileImage(base64);
    }
  };

  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionic name="close-outline" style={{ fontSize: 35 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Edit Profile</Text>
        <TouchableOpacity
          onPress={async () => {
            const data = {
              name: newName,
              avatar: newProfileImage,
            };
            const res = await UserServices.updateUser(data, access_token);
            if (res.status === "OK") {
              const userData = {
                status: "OK",
                message: "SUCCESS",
                access_token: access_token,
                data: res.data,
              };
              dispatch(getDetailsUser(userData));
              navigation.goBack();
            }
          }}
        >
          <Ionic name="checkmark" style={{ fontSize: 35, color: "#3493D9" }} />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 20, alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "#00FF00",
            width: 100,
            height: 100,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: newProfileImage }}
            style={{ width: "92%", height: "92%", borderRadius: 100 }}
          />
        </View>
        <Text
          style={{
            color: "#3493D9",
          }}
          onPress={selectImage}
        >
          Change profile photo
        </Text>
      </View>
      <View style={{ padding: 10 }}>
        <View>
          <Text
            style={{
              opacity: 0.5,
            }}
          >
            Name
          </Text>
          <TextInput
            placeholder="name"
            value={newName}
            onChangeText={setNewName}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: "#CDCDCD",
            }}
          />
        </View>
        <View style={{ paddingVertical: 10 }}>
          <Text
            style={{
              opacity: 0.5,
            }}
          >
            Username
          </Text>
          <TextInput
            placeholder="accountname"
            defaultValue={accountName}
            style={{
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: "#CDCDCD",
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
