import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import { ViewStyle } from "react-native";
import { ICardUser } from "@/constants/types";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import StarRating from "react-native-star-rating";

export default function UserSlider({
  title,
  users,
  style,
}: {
  title: string;
  users: ICardUser[];
  style?: ViewStyle | undefined;
}) {
  return (
    <View style={{ ...styles.container, ...style }}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 15, marginTop: 10, paddingHorizontal: 15 }}
      >
        {users.map((user: ICardUser) => (
          <Link href={`/user/${user.id}`} key={user.id} asChild>
            <Pressable style={styles.userBlock}>
              <Image style={styles.avatar} source={{ uri: user.avatar }} />
              <View>
                <Text style={styles.username}>{user.name}</Text>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={user.rating}
                  fullStarColor={"#FFC107"}
                  halfStarEnabled={true}
                  starSize={14}
                  containerStyle={{ gap: 2, width: "auto" }}
                />
              </View>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#484848",
    paddingVertical: 15,
  },
  title: {
    fontFamily: "NetflixSansRegular",
    fontSize: 18,
    color: "white",
    paddingHorizontal: 15,
  },
  userBlock: {
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  username: {
    fontFamily: "InterBold",
    fontSize: 12,
    color: "white",
  },
  avatar: {
    width: 30,
    height: 30,
    objectFit: "cover",
    borderRadius: 999,
  },
});
