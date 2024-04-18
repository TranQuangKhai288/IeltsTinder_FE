import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  Dimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import BottomSheet from "@gorhom/bottom-sheet";
const { width, height } = Dimensions.get("window");

const CreatePostScreen = () => {
  const featureIcons = [
    {
      id: 1,
      name: "images",
      title: "Image/ Video",
      color: "#40bc64",
    },
    {
      id: 2,
      name: "musical-notes",
      title: "Music",
      color: "#e96609",
    },
    {
      id: 3,
      name: "location",
      title: "Check-in",
      color: "#f5543a",
    },
    {
      id: 4,
      name: "camera",
      title: "Camera",
      color: "#4f97f9",
    },
    {
      id: 5,
      name: "text",
      title: "Background color",
      color: "#53d2bc",
    },
    {
      id: 6,
      name: "pricetag",
      title: "Tag Friends",
      color: "#1678ed",
    },
  ];

  const sheetRef = useRef(null);
  const snapPoints = ["10%", "40%"];
  const [iconLayout, setIconLayout] = useState("horizontal");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const flatListRef = useRef(null);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
      }
    })();
  }, []);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages(result.assets);
    }
  };

  useEffect(() => {
    console.log(selectedImages, "selectedImages");
  }, [selectedImages]);

  const OptionComponent = ({ title }) => {
    return (
      <LinearGradient
        colors={
          title === "Text" ? ["#6600FF", "#FF0088"] : ["#00FF7D", "#00D7FF"]
        }
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 120,
          height: 180,
          marginHorizontal: 4,
          backgroundColor: "pink",
          borderRadius: 12,
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 60,
            height: 60,
            backgroundColor: "white",
            borderRadius: 100,
          }}
        >
          <Ionicons
            name={title === "Text" ? "text" : "musical-notes"}
            style={{ fontSize: 32, color: "black" }}
          />
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 14,
            fontWeight: "bold",
            marginTop: 4,
          }}
        >
          {title}
        </Text>
      </LinearGradient>
    );
  };

  const IconComponent = ({ name, title, color, style }) => {
    return style === "horizontal" ? (
      <Ionicons
        name={name}
        style={{ fontSize: 32, color: color }}
        onPress={() => {
          handleIcon(name);
        }}
      />
    ) : (
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingVertical: 8,
          paddingHorizontal: 16,
          width: "100%",
        }}
      >
        <Ionicons name={name} style={{ fontSize: 32, color: color }} />
        <Text style={{ color: "black", fontSize: 16, marginLeft: 16 }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleIcon = (name) => {
    switch (name) {
      case "images":
        console.log("Selecet image");
        pickImages();
        break;
      case "musical-notes":
        console.log("Music");
        break;
      case "location":
        console.log("Check-in");
        break;
      case "camera":
        console.log("Camera");
        break;
      case "text":
        console.log("Background color");
        break;
      case "pricetag":
        console.log("Tag Friends");
        break;
      default:
        break;
    }
  };

  const renderContent = () => {
    switch (iconLayout) {
      case "horizontal":
        return (
          <View style={styles.horizontalIconContainer}>
            {featureIcons.map((icon) => (
              <IconComponent
                key={icon.id}
                name={icon.name}
                title={icon.title}
                color={icon.color}
                style={"horizontal"}
              />
            ))}
          </View>
        );
      case "vertical":
        return (
          <View style={styles.verticalIconContainer}>
            {featureIcons.map((icon) => (
              <IconComponent
                key={icon.id}
                name={icon.name}
                title={icon.title}
                color={icon.color}
                style={"vertical"}
              />
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  const handleSheetChanges = (index) => {
    switch (index) {
      case 0:
        setIconLayout("horizontal");
        break;
      case 1:
        setIconLayout("vertical");
        break;
      default:
        setIconLayout("horizontal");
        break;
    }
  };

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.x / layoutMeasurement.width);
    setCurrentIndex(currentIndex);
  };

  const scrollToImage = (index) => {
    flatListRef.current.scrollToIndex({ index, animated: true });
  };

  return (
    <>
      <ScrollView
        style={{
          height: "100%",
          paddingTop: insets.top,
          backgroundColor: "white",
        }}
      >
        {/* header */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            zIndex: 1,
            paddingHorizontal: 12,
          }}
        >
          <TouchableOpacity style={{ flex: 1 }}>
            <Ionicons name="close" style={{ fontSize: 24, color: "black" }} />
          </TouchableOpacity>

          <View
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "black" }}>
              Create post
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <Feather name="settings" style={{ fontSize: 24, color: "black" }} />
          </View>
        </View>
        {/* end header */}

        {/* Option */}
        <View>
          <ScrollView
            horizontal
            style={{
              marginTop: 24,
              marginHorizontal: 12,
            }}
          >
            <OptionComponent title={"Text"} />
            <OptionComponent title={"Music"} />
          </ScrollView>
        </View>
        {/* end of Option */}

        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="What's on your mind?"
              multiline={true}
              style={styles.input}
            />
          </View>
          <FlatList
            ref={flatListRef}
            style={styles.flatList}
            data={selectedImages}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.imageContainer,
                  index === currentIndex && styles.activeContainer,
                ]}
              >
                <Image source={{ uri: item.uri }} style={styles.image} />
              </View>
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />
          <View style={styles.indicatorContainer}>
            {selectedImages.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => scrollToImage(index)}
                style={[
                  styles.indicator,
                  index === currentIndex && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </View>

        {/* view */}
      </ScrollView>
      {/* Bottom sheet */}
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={{
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
        }}
      >
        {renderContent}
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  input: {
    width: "100%",
    minHeight: 20,
    fontSize: 16,
  },
  flatList: {
    width: "100%",
    height: 300,
    backgroundColor: "black",
  },
  imageContainer: {
    width: width,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
  },
  activeContainer: {
    opacity: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  indicatorContainer: {
    flexDirection: "row",
    marginVertical: 16,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "grey",
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "black",
  },
  horizontalIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  verticalIconContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
});

export default CreatePostScreen;
