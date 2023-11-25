import { View, Text } from "react-native";
import React from "react";
import Drawer from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Link } from "expo-router";

export default function PopularPage() {
  return (
    <View>
      <Drawer.Screen
        options={{
          title: "Популярное",
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
      <Text>PopularPage</Text>
      <Link href={"/show/"}>Ссылка на Сериал</Link>
    </View>
  );
}
