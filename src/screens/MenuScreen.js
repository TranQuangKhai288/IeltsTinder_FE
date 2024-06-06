import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import FeatureComponent from "../components/FeatureComponent";
import { ScrollView } from "react-native-gesture-handler";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
const { width, height } = Dimensions.get("window");
import * as UserServices from "../apis/UserService";

const android = Platform.OS === "android";
import {
  camera,
  education,
  friends,
  game,
  history,
  match,
} from "../assets/icon-feature";
import { logout } from "../redux/slice/userSlice";

const featureArray = [
  {
    id: 1,
    name: "Ielts Practice",
    imgUrl: education,
  },
  {
    id: 2,
    name: "Random Match",
    imgUrl: match,
  },
  {
    id: 3,
    name: "Friends",
    imgUrl: friends,
  },
  {
    id: 4,
    name: "Play games",
    imgUrl: game,
  },
  {
    id: 5,
    name: "Video",
    imgUrl: camera,
  },
  {
    id: 6,
    name: "History",
    imgUrl: history,
  },
];

const MenuScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.userData);
  const insets = useSafeAreaInsets();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const dispatch = useDispatch();
  return (
    <View
      style={{
        backgroundColor: "black",
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View style={{ height: 40 }}>
        <Text className="font-semibold text-white tracking-wider text-2xl mb-2 ml-2">
          Menu
        </Text>
      </View>
      <ScrollView
        style={{
          height: android
            ? height - bottomTabBarHeight - 40
            : height - bottomTabBarHeight - 80,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              paddingVertical: 20,
            }}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: user.avatar }}
                style={{
                  resizeMode: "cover",
                  width: 80,
                  height: 80,
                  borderRadius: 100,
                }}
              />
              <Text
                style={{
                  paddingVertical: 5,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {user.name}
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", color: "white" }}>
                {user.posts}
              </Text>
              <Text style={{ fontWeight: "bold", color: "white" }}>Posts</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", color: "white" }}>
                {user.friends?.length}
              </Text>
              <Text style={{ fontWeight: "bold", color: "white" }}>
                Friends
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", color: "white" }}>
                {user.level}
              </Text>
              <Text style={{ fontWeight: "bold", color: "white" }}>Level</Text>
            </View>
          </View>
        </View>

        {/* header */}
        <Text className=" px-4 font-semibold text-white tracking-wider text-xl">
          Feature
        </Text>

        {/* end of header */}

        {/* Features */}

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {featureArray?.map((item, index) => {
            return (
              <FeatureComponent
                key={index}
                name={item.name}
                imgUrl={item.imgUrl}
              />
            );
          })}
        </View>
        {/* end of Features */}

        <TouchableOpacity
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            marginHorizontal: 10,
            backgroundColor: "#333333",
            padding: 10,
            borderRadius: 10,
          }}
          onPress={async () => {
            const res = await UserServices.logoutUser();
            if (res.status === "OK") {
              dispatch(logout());
              navigation.navigate("LoginScreen");
            }
          }}
        >
          <Text className=" px-4 font-semibold text-white tracking-wider text-xl">
            Log out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MenuScreen;
