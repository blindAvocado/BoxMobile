import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function ShowPage() {
  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Text>ShowPage</Text>
    </View>
  );
}
