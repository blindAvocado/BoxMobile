import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { ReactNode } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Animated, {
  measure,
  runOnUI,
  SharedValue,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ViewStyle } from "react-native";

const Chevron = ({ progress }: { progress: Readonly<SharedValue<0 | 1>> }) => {
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * -180}deg` }],
  }));
  return (
    <Animated.View style={iconStyle}>
      <FontAwesome name="chevron-down" size={16} color="white" />
    </Animated.View>
  );
};

export default function Accordion({
  title,
  style,
  content,
}: {
  title: string;
  style?: ViewStyle | undefined;
  content: ReactNode;
}) {
  const listRef = useAnimatedRef<Animated.View>();
  const heightValue = useSharedValue(0);
  const open = useSharedValue(false);
  const progress = useDerivedValue(() => (open.value ? withTiming(1) : withTiming(0)));

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  return (
    <View style={{ ...styles.container, ...style }}>
      <Pressable
        onPress={() => {
          if (heightValue.value === 0) {
            runOnUI(() => {
              "worklet";
              heightValue.value = withTiming(measure(listRef)!.height);
            })();
          } else {
            heightValue.value = withTiming(0);
          }
          open.value = !open.value;
        }}
        style={styles.titleContainer}
      >
        <Text style={styles.title}>{title}</Text>
        <Chevron progress={progress} />
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View style={styles.contentContainer} ref={listRef}>
          <View style={styles.content}>{content}</View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#484848",
    paddingHorizontal: 15,
    // paddingBottom: 15,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  title: {
    fontFamily: "NetflixSansRegular",
    fontSize: 18,
    color: "white",
  },
  contentContainer: {
    position: "absolute",
    width: "100%",
    top: 0,
  },
  content: {
    paddingBottom: 15,
  },
  textContent: {
    fontSize: 15,
    fontFamily: "NetflixSansLight",
    color: "#A5A5A5",
  },
});
