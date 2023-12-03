import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import StarRating from "react-native-star-rating";
import { IWatchedShow } from "@/constants/types";

import watchedShowEpisodes from "@/assets/data/watchedShowEpisodes.json";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";

export default function ShowWatchCard({ data }: { data: IWatchedShow }) {
  const [rating, setRating] = useState(0);

  const getShowStatus = () => {
    let status = "DEAD",
      bgColor = "#000";

    if (data?.show?.status === "Running") {
      status = "ON AIR";
      bgColor = "#5B9715";
    }

    return (
      <View style={{ ...styles.statusBlock, backgroundColor: bgColor }}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    );
  };

  useEffect(() => {
    setRating(() => data.rating);
  }, []);

  return (
    <Link href={`/show/${data.show._id}`} asChild>
      <Pressable style={styles.container} android_ripple={{ color: "rgba(255, 255, 255, 0.2)", foreground: true }}>
        <View style={styles.left}>
          <View style={styles.posterWrapper}>
            <Image source={{ uri: data.show.image.medium }} style={styles.posterImage} />
            <View style={styles.statusBlock}>{getShowStatus()}</View>
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.info}>
            <Text style={styles.title}>{data.show.title}</Text>
            <View style={styles.ratingContainer}>
              <StarRating
                disabled={false}
                maxStars={5}
                fullStarColor={"#FFC107"}
                halfStarEnabled={true}
                starSize={22}
                rating={rating}
                selectedStar={(rating) => setRating(rating)}
                containerStyle={{ gap: 2, width: "auto" }}
              />
            </View>
            <View style={styles.progressWrapper}>
              <View style={styles.progressValue}></View>
              <View style={styles.progressBg}></View>
              <View style={styles.progressText}>
                <Text style={[styles.totalEpisodesText, { color: Colors.accent.base }]}>
                  {watchedShowEpisodes.length}
                </Text>
                <Text style={styles.totalEpisodesText}>/{data.show.episodes.length}</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    // marginBottom: 15,
    paddingVertical: 10,
  },
  left: {},
  posterWrapper: {
    position: "relative",
  },
  posterImage: {
    aspectRatio: "2 / 1",
    width: 120,
    borderRadius: 5,
  },
  statusBlock: {
    position: "absolute",
    right: 2,
    top: 2,
    paddingHorizontal: 0,
    paddingVertical: 2,
    borderRadius: 40,
  },
  statusText: {
    fontFamily: "NetflixSansMedium",
    fontSize: 10,
    lineHeight: 12,
    textAlign: "center",
    color: "white",
    width: 45,
  },
  right: {
    flexGrow: 1,
  },
  info: {
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "NetflixSansRegular",
    fontSize: 18,
    lineHeight: 18,
    color: Colors.text,
    marginBottom: 3,
  },
  ratingContainer: {
    marginBottom: 5,
  },
  progressWrapper: {
    width: "100%",
    position: "relative",
  },
  progressValue: {
    position: "absolute",
    left: 0,
    top: 0,
    height: 3,
    width: "50%",
    backgroundColor: Colors.accent.base,
    zIndex: 1,
  },
  progressBg: {
    width: "100%",
    height: 5,
    backgroundColor: "#363636",
  },
  progressText: {
    position: "absolute",
    right: 0,
    top: -20,
    zIndex: 2,
    flexDirection: "row",
  },
  totalEpisodesText: {
    fontFamily: "NetflixSansRegular",
    color: "#A5A5A5",
  },
});
