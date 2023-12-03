import Header from "@/components/Header";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export default function ShowPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: (props: any) => <Header {...props} isDrawer={false} isTransparent />,
    });
  }, []);

  return (
    <View style={styles.container}>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#262626",
    height: 100
  },
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#262626",
  },
});
