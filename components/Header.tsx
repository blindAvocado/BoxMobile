import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerNavigationOptions, DrawerNavigationProp } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { Layout } from "@react-navigation/drawer/lib/typescript/src/types";
import Animated, { interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";

export default function Header({
  layout,
  route,
  navigation,
  options,
  isDrawer,
  isTransparent,
  scroll,
}: {
  layout?: Layout;
  route?: RouteProp<{}>;
  navigation: DrawerNavigationProp<{}>;
  options: DrawerNavigationOptions;
  isDrawer: boolean;
  isTransparent?: boolean;
  scroll?: SharedValue<Number>;
}) {
  const insets = useSafeAreaInsets();

  // useLayoutEffect(() => {
  //   if (isTransparent && scroll) {
  //     navigation.setOptions({
  //       headerStyle: {
  //         opacity: headerAnimatedStyle.opacity
  //       }
  //       // headerBackground: () => <Animated.View style={[{}, styles.bg, styles.shadowBg]} />,
  //     });
  //   }
  // }, []);

  useEffect(() => {
    console.log(scroll?.value);
  }, [scroll?.value])

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scroll?.value, [0, 250 / 2], [0, 1]),
    };
  });

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
    <Animated.View
      style={[{ paddingTop: insets.top, backgroundColor: bgColor() }]}
    >
      <View style={{ ...styles.container, backgroundColor: bgColor() }}>
        {leftBtn()}
        {isTransparent && (<View style={{...styles.containerTransparent, top: -insets.top, height: insets.top + 70, opacity: headerAnimatedStyle.opacity}}/>)}
        <Text style={styles.title}>{options.title}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#262626",
    height: 125,
  },
  shadowBg: {
    shadowColor: '#000000',
    shadowOffset: {width: 100, height: 150},
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 75,
    backgroundColor: "#484848",
    paddingHorizontal: 15,
  },
  containerTransparent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 75,
    // backgroundColor: "#484848",
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
    zIndex: 100
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
