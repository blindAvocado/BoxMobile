import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { IEpisode } from "@/constants/types";
import { Link } from "expo-router";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import CheckBtn from "./CheckBtn";

export default function EpisodesList({ episodes }: { episodes: IEpisode[] }) {
  const scrollRef = useRef<ScrollView>(null);
  const seasonsRef = useRef<Array<View | null>>([]);
  const [season, setSeason] = useState<Number>(0);
  const [episodesList, setEpisodesList] = useState<IEpisode[]>(episodes);
  const [loading, setLoading] = useState<Boolean>(false);

  const getSeasonTabs = () => {
    const seasonsArr = new Array(episodes[episodes.length - 1].season).fill(0);
    for (let i = 0; i < seasonsArr.length; i++) {
      seasonsArr[i] = i + 1;
    }
    return seasonsArr;
  };

  const getEpisodeDate = (date: string) => {
    const dateObj = new Date(date);
    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const year = dateObj.getUTCFullYear();

    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  };

  const onSeasonChanged = () => {
    let list = [...episodes];
    const seasonNum = Number(season) + 1;

    list = list.filter((ep) => {
      return ep.season === seasonNum;
    });

    setEpisodesList(() => [...list]);
  };

  const selectSeason = (index: number) => {
    setSeason(() => index);
  };

  useEffect(() => {
    onSeasonChanged();
  }, [season]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Сезон</Text>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.seasonTabsContainer}
        >
          {getSeasonTabs().map((el, i) => (
            <View
              key={i}
              ref={(item) => (seasonsRef.current[i] = item)}
              style={{ overflow: "hidden", borderRadius: 40 }}
            >
              <Pressable
                android_ripple={{
                  color: "rgba(0, 0, 0, 0.5)",
                  foreground: true,
                }}
                onPress={() => selectSeason(i)}
              >
                <View style={season === i ? styles.seasonTabActive : styles.seasonTab}>
                  <Text style={season === i ? styles.seasonTabTextActive : styles.seasonTabText}>{el}</Text>
                </View>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.episodesContainer}>
        {/* <FlatList renderItem={renderEpisodeRow} ref={episodesListRef} data={loading ? [] : episodesList} /> */}
        {episodesList.map((item, i) => (
          <Animated.View key={item._id} entering={FadeInRight} exiting={FadeOutLeft} style={styles.episodeWrapper}>
            <Link href={`/episode/${item._id}`} key={item._id} asChild>
              <Pressable
                style={styles.episodeItem}
                android_ripple={{
                  color: "rgba(255, 255, 255, 0.2)",
                }}
              >
                <Text style={styles.episodeNumber}>{item.number}</Text>
                <View style={styles.episodeMain}>
                  <Text style={styles.episodeTitle}>{item.name}</Text>
                  <View style={styles.episodeInfo}>
                    <Text style={styles.episodeInfoDate}>{getEpisodeDate(item.airdate)}</Text>
                  </View>
                </View>
                <View style={styles.episodeCheck}>
                  <CheckBtn size={50} />
                </View>
              </Pressable>
            </Link>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
    paddingVertical: 15,
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: "NetflixSansRegular",
    fontSize: 18,
    color: "white",
    width: 100,
    paddingLeft: 15,
  },
  seasonTabsContainer: {
    gap: 10,
    paddingRight: 15,
  },
  seasonTabActive: {
    backgroundColor: "white",
    paddingHorizontal: 18,
    borderRadius: 40,
    overflow: "hidden",
  },
  seasonTab: {
    // backgroundColor: "white",
    paddingHorizontal: 18,
    borderRadius: 40,
    overflow: "hidden",
  },
  seasonTabText: {
    fontFamily: "NetflixSansMedium",
    fontSize: 20,
    color: "#A5A5A5",
  },
  seasonTabTextActive: {
    fontFamily: "NetflixSansMedium",
    fontSize: 20,
    color: "#151515",
  },
  episodesContainer: {
    gap: 10,
  },
  episodeWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  episodeItem: {
    flexDirection: "row",
    alignItems: "stretch",
    flexGrow: 1,
    flexShrink: 0,
    gap: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    // maxWidth: "84%"
  },
  episodeNumber: {
    fontFamily: "NetflixSansRegular",
    fontSize: 16,
    color: "#CDCDCD",
    width: 40,
    lineHeight: 40,
    textAlign: "center",
  },
  episodeMain: {
    display: "flex",
    flexShrink: 1,
    flexDirection: "column",
  },
  episodeTitle: {
    fontFamily: "NetflixSansRegular",
    fontSize: 18,
    color: "#CDCDCD",
  },
  episodeInfo: {
    flexDirection: "row",
    gap: 10,
  },
  episodeInfoDate: {
    fontFamily: "NetflixSansRegular",
    fontSize: 13,
    color: "#CDCDCD",
  },
  episodeCheck: {
    marginLeft: "auto"
  }
});
