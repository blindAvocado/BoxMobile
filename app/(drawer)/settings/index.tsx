import { View, Text } from "react-native";
import React from "react";
import Drawer from "expo-router/drawer";
import Header from "../../../components/Header";

export default function SettingsPage() {
  return (
    <View>
      <Drawer.Screen
        options={{
          title: "Настройки",
          headerShown: true,
          header: (props) => <Header {...props} isDrawer={false} />,
        }}
      />
      <Text>Settings Page</Text>
    </View>
  );
}