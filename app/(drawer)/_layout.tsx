import { View, Text } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{ headerShown: false, swipeEdgeWidth: 150 }}>
        <Drawer.Screen
          name="popular"
          options={{
            drawerLabel: "Популярное",
            title: "Популярное",
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Настройки",
            title: "Настройки",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
