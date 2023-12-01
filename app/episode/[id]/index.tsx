import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from "react-native-reanimated";
import { useLocalSearchParams } from "expo-router/src/hooks";
import StarRating from "react-native-star-rating";
import { declination, normalizeAirDate, removeHtml } from "@/utils/helpers";
import { IEpisode } from "@/constants/types";
import Accordion from "@/components/Accordion";
import UserSlider from "@/components/UserSlider";

import showsData from "@/assets/data/shows.json";
import episodesData from "@/assets/data/episodes.json";
import friendsRatings from "@/assets/data/showFriendsRatings.json";
import { Link, useNavigation } from "expo-router";
import Header from "@/components/Header";
import CheckBtn from "@/components/CheckBtn";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const IMG_HEIGHT = 250;

export default function EpisodePage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const episode: IEpisode = (episodesData as any[]).find((item) => item._id === id);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const navigation = useNavigation();

  const [rating, setRating] = useState(0);

  const scrollOffset = useScrollViewOffset(scrollRef);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: (props: any) => <Header {...props} isDrawer={false} isTransparent scroll={scrollOffset} />,
    });
  }, [scrollOffset.value]);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
      ],
    };
  });

  const getAirDate = () => {
    let dateStr = "";
    if (episode.airdate) dateStr += `${normalizeAirDate(episode.airdate)}`;
    return dateStr;
  };

  const getDescription = () => {
    return <Text style={styles.accordionTextContent}>{removeHtml(episode.summary)}</Text>;
  };

  const getEpisodeNum = () => {
    return `S${String(episode.season).padStart(2, "0")}E${String(episode.number).padStart(2, "0")}`;
  };

  const getShowTitle = () => {
    return showsData.find((show) => show._id === episode.show)?.title;
  };

  const getDuration = () => {
    return declination(episode.runtime, ["минута", "минуты", "минут"]);
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.head}>
          <LinearGradient
            colors={["rgba(21,21,21,1.0)", "rgba(255,255,255,0.0)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ position: "absolute", top: 0, left: 0, right: 0, width: "100%", height: 80, zIndex: 10 }}
          />
          <Animated.Image
            source={{ uri: episode.image.original }}
            style={[styles.headerBackdrop, imageAnimatedStyle]}
          />
          <LinearGradient
            colors={["rgba(255,255,255,0.0)", "rgba(38,38,38,1.0)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%", height: 100, zIndex: 10 }}
          />
          <View style={styles.headInfo}>
            <View style={styles.episodeMainInfo}>
              <Text style={styles.episodeNum}>{getEpisodeNum()}</Text>
              <Text style={styles.episodeName}>{episode.name}</Text>
              <Text style={styles.episodeAirdate}>{getAirDate()}</Text>
            </View>
            <View style={styles.episodeDuration}>
              <Ionicons name="time" size={30} color="white" />
              <Text style={styles.episodeDurationText}>{getDuration()}</Text>
            </View>
          </View>
        </View>
        <View style={styles.wrapper}>
          <Link href={`/show/${episode.show}`} asChild>
            <View style={styles.episodeTitleWrapper}>
              <Pressable
                android_ripple={{
                  color: "rgba(255, 255, 255, 0.5)",
                  foreground: true,
                }}
              >
                <Text style={styles.episodeTitle}>{getShowTitle()}</Text>
              </Pressable>
            </View>
          </Link>
          <View style={styles.ratingContainer}>
            <View style={styles.userActions}>
              <View style={styles.episodeCheck}>
                <CheckBtn size={40} />
              </View>
              <View style={styles.userRatingContainer}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  fullStarColor={"#FFC107"}
                  halfStarEnabled={true}
                  starSize={30}
                  rating={rating}
                  selectedStar={(rating) => setRating(rating)}
                  containerStyle={{ gap: 2, width: "auto" }}
                />
              </View>
            </View>
            <View style={styles.externalRatingContainer}>
              <View style={styles.externalRatingItem}>
                <Text style={styles.externalRatingValue}>8.6</Text>
                <Text style={styles.externalRatingName}>Box</Text>
                <Text style={styles.externalRatingCount}>6.2K</Text>
              </View>
            </View>
          </View>

          <Accordion title="Описание" content={getDescription()} style={{ marginTop: -1 }} />
          {friendsRatings ? (
            <UserSlider title="Оценки друзей" users={friendsRatings} style={{ marginTop: -1 }} />
          ) : null}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#262626",
  },
  wrapper: {
    backgroundColor: "#262626",
  },
  headerBackdrop: {
    height: 250,
    width: "auto",
    padding: 0,
    objectFit: "cover",
  },
  airYears: {
    fontFamily: "NetflixSansThin",
    fontSize: 16,
    color: "#D9D9D9",
  },
  head: {
    position: "relative",
  },
  headInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexGrow: 1,
    paddingHorizontal: 15,
    zIndex: 10,
  },
  episodeMainInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    flexBasis: "65%",
  },
  episodeNum: {
    fontFamily: "NetflixSansRegular",
    fontSize: 18,
    lineHeight: 18,
    color: "white",
  },
  episodeName: {
    fontFamily: "NetflixSansBold",
    fontSize: 28,
    lineHeight: 28,
    color: "white",
  },
  episodeAirdate: {
    fontFamily: "NetflixSansThin",
    fontSize: 16,
    lineHeight: 16,
    color: "white",
  },
  episodeDuration: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  episodeDurationText: {
    fontFamily: "NetflixSansLight",
    fontSize: 16,
    lineHeight: 16,
    color: "white",
  },
  episodeTitleWrapper: {
    display: "flex",
    alignSelf: "flex-start",
    flexDirection: "row",
    // flexShrink: 1,
    // flexGrow: 0,
    height: "auto",
    borderRadius: 40,
    overflow: "hidden",
    marginTop: 10,
    marginLeft: 15,
  },
  episodeTitle: {
    justifyContent: "center",
    alignSelf: "flex-start",
    fontFamily: "NetflixSansMedium",
    fontSize: 16,
    color: "white",
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#484848",
  },
  ratingContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  episodeCheck: {
    marginRight: 10,
  },
  userRatingContainer: {
    display: "flex",
    // flexBasis: "40%",
  },
  externalRatingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // flexBasis: "50%",
  },
  externalRatingItem: {
    position: "relative",
    paddingRight: 18,
  },
  externalRatingValue: {
    fontFamily: "NetflixSansBold",
    fontSize: 22,
    color: "white",
  },
  externalRatingName: {
    fontFamily: "NetflixSansLight",
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  externalRatingCount: {
    position: "absolute",
    top: 0,
    right: 1,
    fontFamily: "NetflixSansThin",
    fontSize: 8,
    color: "#A5A5A5",
  },
  accordionTextContent: {
    fontSize: 15,
    fontFamily: "NetflixSansLight",
    color: "#A5A5A5",
  },
  accordionList: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: 10,
  },
  accordionItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  accordionLabel: {
    fontSize: 15,
    fontFamily: "NetflixSansLight",
    color: "#A5A5A5",
  },
  accordionValue: {
    fontSize: 15,
    fontFamily: "NetflixSansLight",
    color: "white",
  },
});
