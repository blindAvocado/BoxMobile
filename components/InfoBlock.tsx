import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import CardSmall from "@/components/cards/CardSmall";
import { ICardSmall } from "@/constants/types";

export default function InfoBlock({ title, items }: { title: string; items: ICardSmall[] }) {
  return (
    <View style={styles.container}>
      <Link href={"/list/"} asChild>
        <Pressable style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <FontAwesome name="chevron-right" size={18} color="white" />
        </Pressable>
      </Link>
      <ScrollView contentContainerStyle={styles.list} horizontal showsHorizontalScrollIndicator={false}>
        {items.map((el, i) => {
          return (
            <CardSmall
              key={el.id}
              image={el.image.medium}
              link={`show/${el.id}/`}
              user={el.user ? el.user : null}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingLeft: 15,
  },
  header: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 15,
    paddingLeft: 15,
    paddingVertical: 10,
  },
  title: {
    fontFamily: "InterBold",
    fontSize: 18,
    color: "white",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 15,
  },
});
