import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router/src/hooks";
import showsData from "@/assets/data/shows.json";
import { IShow } from "@/constants/types";
import Animated from "react-native-reanimated";

export default function ShowPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const show: IShow = (showsData as any[]).find((item) => item._id === id);

  // console.log(show);
  
  return (
    <View style={styles.container}>
      <Animated.ScrollView>
        <Animated.Image source={{uri: show.image.original}} style={styles.image}/>
        <View/>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 300,
    width: "100%",
  },
  gradientTop: {
    backgroundImage: "linear-gradient(180deg, #151515 0%, rgba(0, 0, 0, 0.00) 100%)",
    width: "100%",
    height: 50,
  }
});