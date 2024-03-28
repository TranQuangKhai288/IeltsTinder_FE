import React, { useState } from "react";
import { View, Text } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { data } from "../data/Data";
import SingleReel from "./SingleReel";

const ReelsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };

  return (
    <SwiperFlatList
      vertical={true}
      onChangeIndex={handleChangeIndexValue}
      data={data}
      renderItem={({ item, index }) => (
        <SingleReel item={item} index={index} currentIndex={currentIndex} />
      )}
      keyExtractor={(item, index) => index}
    />
  );
};

export default ReelsComponent;
