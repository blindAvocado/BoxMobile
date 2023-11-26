import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
import StarRating from "react-native-star-rating";
import { ICardUser } from "@/constants/types";



export default function CardSmall({ link, image, user }: { link: string; image: string; user: ICardUser | null }) {
  return (
    <View>
      <Link href={`/${link}`} asChild>
        <Pressable
          android_ripple={{
            color: "rgba(255,255,255,0.4)",
            foreground: true,
          }}
        >
          <View>
            <Image source={{ uri: image }} style={user ? styles.imageUser : styles.image} />
          </View>
        </Pressable>
      </Link>
      {user ? (
        <Link href={`/user/${user.id}`} asChild>
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
                starSize={18}
                containerStyle={{ gap: 2, width: "auto" }}
              />
            </View>
          </Pressable>
        </Link>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 180,
    objectFit: "cover",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#676767",
  },
  imageUser: {
    width: 150,
    height: 225,
    objectFit: "cover",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#676767",
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
