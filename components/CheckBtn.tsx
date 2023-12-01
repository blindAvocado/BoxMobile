import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

export default function CheckBtn({ size }: { size: number }) {
  const [checked, setChecked] = useState<Boolean>(false);

  const handleCheck = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Pressable onPress={() => handleCheck()} style={[styles.wrapper, {width: size, height: size}]}>
      <Ionicons name="checkmark-circle-outline" color={checked ? "white" : "#CDCDCD"} size={size} style={styles.icon} />
      <View style={checked ? [{ ...styles.bg }, { width: size * 0.7, height: size * 0.7, top: size * 0.15, left: size * 0.12 }] : {}}></View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  icon: {
    position: "absolute",
    zIndex: 10,
    borderRadius: 999,
  },
  bg: {
    position: "absolute",
    left: 5,
    width: 35,
    height: 35,
    backgroundColor: "#FFC107",
    borderRadius: 999,
    zIndex: 1,
  },
});
