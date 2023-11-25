import { View, Text } from "react-native";
import React from "react";
import Drawer from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";

export default function SettingsPage() {
  return (
    <View>
      <Drawer.Screen
        options={{
          title: "Настройки",
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
      <Text>Settings Page</Text>
    </View>
  );
}
