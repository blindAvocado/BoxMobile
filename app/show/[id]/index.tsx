import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { useLocalSearchParams } from "expo-router/src/hooks";
import StarRating from "react-native-star-rating";
import { declination, normalizeAirDate, removeHtml, translateCountry, translateGenres } from "@/utils/helpers";
import { IShow } from "@/constants/types";
import Accordion from "@/components/Accordion";
import UserSlider from "@/components/UserSlider";

import showsData from "@/assets/data/shows.json";
import friendsRatings from "@/assets/data/showFriendsRatings.json";
import EpisodesList from "@/components/EpisodesList";

export default function ShowPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const show: IShow = (showsData as any[]).find((item) => item._id === id);

  const [rating, setRating] = useState(0);

  const getShowStatus = () => {
    let status = "DEAD",
      bgColor = "#000";

    if (show.status === "Running") {
      status = "ON AIR";
      bgColor = "#5B9715";
    }

    return (
      <View style={{ ...styles.statusBlock, backgroundColor: bgColor }}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    );
  };

  const getAirYears = () => {
    let years = "";

    if (show.status == "Running") {
      years = `${new Date(show.dateStarted).getFullYear()} - `;
    } else if (show.status == "Ended" && show.dateEnded) {
      years = `${new Date(show.dateStarted).getFullYear()} - ${new Date(show.dateEnded).getFullYear()}`;
    }

    return <Text style={styles.airYears}>{years}</Text>;
  };

  const getSeasonsEpisodes = () => {
    let seasons = 3;
    let res = `${declination(seasons, ["сезон", "сезона", "сезонов"])} • ${declination(show.episodes.length, [
      "серия",
      "серии",
      "серий",
    ])}`;

    return <Text style={{ fontFamily: "InterRegular", fontSize: 16, color: "#D9D9D9", marginTop: 5 }}>{res}</Text>;
  };

  const getAirDate = () => {
    let dateStr = "";
    if (show.dateStarted) dateStr += `${normalizeAirDate(show.dateStarted)}`;
    if (show.dateEnded) dateStr += ` - ${normalizeAirDate(show.dateEnded)}`;
    return dateStr;
  };

  const getDescription = () => {
    return <Text style={styles.accordionTextContent}>{removeHtml(show.description)}</Text>;
  };

  const getInfo = () => {
    return (
      <View style={styles.accordionList}>
        {show.dateStarted ? (
          <View style={styles.accordionItem}>
            <Text style={styles.accordionLabel}>Дата показа</Text>
            <Text style={styles.accordionValue}>{getAirDate()}</Text>
          </View>
        ) : null}
        {show.country ? (
          <View style={styles.accordionItem}>
            <Text style={styles.accordionLabel}>Страна</Text>
            <Text style={styles.accordionValue}>{translateCountry(show.country)}</Text>
          </View>
        ) : null}
        {show.network ? (
          <View style={styles.accordionItem}>
            <Text style={styles.accordionLabel}>Канал</Text>
            <Text style={styles.accordionValue}>{show.network}</Text>
          </View>
        ) : null}
        {show.genres.length > 0 ? (
          <View style={styles.accordionItem}>
            <Text style={styles.accordionLabel}>Жанр</Text>
            <Text style={styles.accordionValue}>{translateGenres(show.genres).join(", ")}</Text>
          </View>
        ) : null}
        {show.averageRuntime > 0 ? (
          <View style={styles.accordionItem}>
            <Text style={styles.accordionLabel}>Продолжительность</Text>
            <Text style={styles.accordionValue}>{`${show.averageRuntime} мин`}</Text>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView>
        <Animated.Image source={{ uri: show.image.original }} style={styles.headerBackdrop} />
        <View>
          <View style={styles.head}>
            <View style={styles.headInfo}>
              <Text style={styles.headTitle}>{show.title}</Text>
              <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                {getShowStatus()}
                {getAirYears()}
              </View>
              {getSeasonsEpisodes()}
              <View
                style={{
                  width: 100,
                  height: "auto",
                  display: "flex",
                  flexDirection: "row",
                  flexShrink: 1,
                  flexGrow: 0,
                  marginTop: 7,
                  borderRadius: 40,
                  overflow: "hidden",
                }}
              >
                <Pressable
                  style={styles.watchStatusBtn}
                  android_ripple={{
                    color: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <Text style={styles.watchStatusText}>Смотрю</Text>
                </Pressable>
              </View>
            </View>
            <View>
              <Image source={{ uri: show.image.original }} style={styles.poster} />
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <View style={styles.userRatingContainer}>
              <Text style={styles.userRatingTitle}>Моя оценка</Text>
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
            <View style={styles.externalRatingContainer}>
              <View style={styles.externalRatingItem}>
                <Text style={styles.externalRatingValue}>8.6</Text>
                <Text style={styles.externalRatingName}>Box</Text>
                <Text style={styles.externalRatingCount}>6.2K</Text>
              </View>
              <View style={styles.externalRatingItem}>
                <Text style={styles.externalRatingValue}>8.4</Text>
                <Text style={styles.externalRatingName}>IMDb</Text>
                <Text style={styles.externalRatingCount}>90K</Text>
              </View>
              <View style={styles.externalRatingItem}>
                <Text style={styles.externalRatingValue}>8.3</Text>
                <Text style={styles.externalRatingName}>КП</Text>
                <Text style={styles.externalRatingCount}>12K</Text>
              </View>
            </View>
          </View>

          <Accordion title="Информация" content={getInfo()} style={{ marginTop: 20 }} />
          <Accordion title="Описание" content={getDescription()} style={{ marginTop: -1 }} />
          {friendsRatings ? (
            <UserSlider title="Оценки друзей" users={friendsRatings} style={{ marginTop: -1 }} />
          ) : null}
          <EpisodesList episodes={show.episodes}/>
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
  headerBackdrop: {
    height: 250,
    width: "100%",
  },
  statusBlock: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 40,
  },
  statusText: {
    fontFamily: "NetflixSansMedium",
    fontSize: 12,
    lineHeight: 15,
    textAlign: "center",
    color: "white",
    width: 45,
  },
  airYears: {
    fontFamily: "NetflixSansThin",
    fontSize: 16,
    color: "#D9D9D9",
  },
  head: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  headInfo: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
  },
  headTitle: {
    fontFamily: "NetflixSansMedium",
    fontSize: 28,
    color: "white",
  },
  watchStatusBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 40,
    width: 100,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  watchStatusText: {
    fontFamily: "InterRegular",
    fontSize: 16,
    color: "white",
  },
  poster: {
    width: "100%",
    maxHeight: 180,
    aspectRatio: "2/3",
    objectFit: "cover",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#676767",
  },
  ratingContainer: {
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  userRatingContainer: {
    display: "flex",
    flexBasis: "40%",
  },
  userRatingTitle: {
    fontFamily: "NetflixSansMedium",
    fontSize: 18,
    color: "white",
  },
  externalRatingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexBasis: "50%",
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
