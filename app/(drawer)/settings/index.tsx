import { View, Text } from "react-native";
import React from "react";
import Drawer from "expo-router/drawer";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "expo-router";
import Header from "../../../components/Header";

export default function SettingsPage() {
  const nav = useNavigation<DrawerNavigationProp<{}>>();

  console.log(nav.getState());

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