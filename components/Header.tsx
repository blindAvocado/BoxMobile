import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerNavigationOptions, DrawerNavigationProp } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { Layout } from "@react-navigation/drawer/lib/typescript/src/types";

export default function Header({
  layout,
  route,
  navigation,
  options,
  isDrawer,
  isTransparent,
}: {
  layout?: Layout;
  route?: RouteProp<{}>;
  navigation: DrawerNavigationProp<{}>;
  options: DrawerNavigationOptions;
  isDrawer: boolean;
  isTransparent?: boolean;
}) {
  const insets = useSafeAreaInsets();

  const leftBtn = () => {
    if (isDrawer) {
      return (
        <Pressable onPress={() => navigation.openDrawer()} style={styles.leftButton}>
          <FontAwesome name="bars" size={24} color="#fff" />
        </Pressable>
      );
    } else if (!isDrawer && navigation.canGoBack()) {
      return (
        <Pressable onPress={() => navigation.goBack()} style={styles.leftChevron}>
          <FontAwesome name="chevron-left" size={20} color="#fff" />
        </Pressable>
      );
    }
  };

  const bgColor = () => {
    if (isTransparent) {
      return "transparent";
    } else {
      return "#484848";
    }
  };

  return (
    <View style={{ paddingTop: insets.top, backgroundColor: bgColor() }}>
      <View style={{...styles.container, backgroundColor: bgColor() }}>
        {leftBtn()}
        <Text style={styles.title}>{options.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 75,
    backgroundColor: "#484848",
    paddingHorizontal: 15,
  },
  leftChevron: {
    marginLeft: 0,
    marginRight: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 40,
    height: 24,
  },
  leftButton: {
    marginRight: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 40,
    height: 24,
  },

  title: {
    fontFamily: "NetflixSansBold",
    fontSize: 20,
    color: "#fff",
  },
});
