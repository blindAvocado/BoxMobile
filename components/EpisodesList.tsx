import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { IEpisode } from "@/constants/types";
import { Link } from "expo-router";

export default function EpisodesList({ episodes }: { episodes: IEpisode[] }) {

  const [season, setSeason] = useState<Number>(1);

  const getSeasonTabs = () => {
    const seasonsArr = new Array(episodes[episodes.length - 1].season).fill(0);
    for (let i = 0; i < seasonsArr.length; i++) {
      seasonsArr[i] = i + 1;
    }
    return seasonsArr;
  };

  const getEpisodeDate = (date: string) => {
    const dateObj = new Date(date);
    const day = String(dateObj.getUTCDate()).padStart(2, '0');
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const year = dateObj.getUTCFullYear();
    
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Сезон</Text>
        <ScrollView horizontal contentContainerStyle={styles.seasonTabsContainer}>
          {getSeasonTabs().map((el, i) => (
            <View key={i} style={{ overflow: "hidden", borderRadius: 40 }}>
              <Pressable
                android_ripple={{
                  color: "rgba(0, 0, 0, 0.5)",
                  foreground: true,
                }}
              >
                <View style={styles.seasonTab}>
                  <Text style={styles.seasonTabText}>{el}</Text>
                </View>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.episodesContainer}>
        {episodes.map((episode, i) => (
          <Link href={`/show/${episode.show}/episode/${episode._id}`} key={episode._id} asChild>
            <Pressable style={styles.episodeItem} android_ripple={{
              color: "rgba(255, 255, 255, 0.2)"
            }}>
              <Text style={styles.episodeNumber}>{episode.number}</Text>
              <View style={styles.episodeMain}>
                <Text style={styles.episodeTitle}>{episode.name}</Text>
                <View style={styles.episodeInfo}>
                  <Text style={styles.episodeInfoDate}>{getEpisodeDate(episode.airdate)}</Text>
                </View>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
    paddingVertical: 15,
    flex: 1
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
  },
  seasonTab: {
    backgroundColor: "white",
    paddingHorizontal: 18,
    borderRadius: 40,
    overflow: "hidden",
  },
  seasonTabActive: {
    // backgroundColor: "white",
    paddingHorizontal: 18,
    borderRadius: 40,
    overflow: "hidden",
    color: "#A5A5A5",
  },
  seasonTabText: {
    fontFamily: "NetflixSansMedium",
    fontSize: 20,
    color: "#151515",
  },
  episodesContainer: {
    gap: 10,
  },
  episodeItem: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 5,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  episodeNumber: {
    fontFamily: "NetflixSansRegular",
    fontSize: 16,
    color: "#CDCDCD",
    width: 40,
    lineHeight: 40,
    textAlign: "center"
  },
  episodeMain: {
    display: "flex",
    flexDirection: "column"
  },
  episodeTitle: {
    fontFamily: "NetflixSansRegular",
    fontSize: 18,
    color: "#CDCDCD",
  },
  episodeInfo: {
    flexDirection: "row",
    gap: 10
  },
  episodeInfoDate: {
    fontFamily: "NetflixSansRegular",
    fontSize: 13,
    color: "#CDCDCD",
  }
});
