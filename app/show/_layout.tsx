import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Header from "@/components/Header";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]/index"
        options={{
          title: "",
          headerShown: true,
          headerTransparent: true,
          header: (props) => <Header {...props} isDrawer={false} isTransparent />,
        }}
      />
    </Stack>
  );
}
