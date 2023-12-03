import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Link } from "expo-router";
import { IWatchedShow, IWatchedShowStatuses } from "@/constants/types";
import ShowWatchCard from "./cards/ShowWatchCard";
import Colors from "@/constants/Colors";

export default function ShowsWatchList({ data }: { data: IWatchedShowStatuses }) {
  const [selectedStatus, setSelectedStatus] = useState<number>(0);
  const [showsList, setShowsList] = useState<IWatchedShow[]>(data.Watching);

  const onStatusChanged = () => {
    switch (selectedStatus) {
      case 0:
        setShowsList(() => [...data.Watching]);
        break;
      case 1:
        setShowsList(() => [...data["Going to"]]);
        break;
      case 2:
        setShowsList(() => [...data.Stopped]);
        break;
      case 3:
        setShowsList(() => [...data["Watched all"]]);
        break;
      default:
        setShowsList(() => []);
        break;
    }
  };

  const selectStatus = (index: number) => {
    setSelectedStatus(() => index);
  };

  const getStatusName = (index: number) => {
    switch (index) {
      case 0:
        return "Смотрю";
      case 1:
        return "Буду";
      case 2:
        return "Перестал";
      case 3:
        return "Посмотрел";
      default:
        return "";
    }
  };

  useEffect(() => {
    onStatusChanged();
  }, [selectedStatus]);

  useEffect(() => {
    setShowsList(() => [...data.Watching]);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {Object.keys(data).map((item, i) => (
          <View key={i} style={{ flexBasis: "25%" }}>
            <Pressable
              android_ripple={{
                color: "rgba(0, 0, 0, 0.5)",
                foreground: true,
              }}
              onPress={() => setSelectedStatus(i)}
            >
              <View style={selectedStatus === i ? styles.statusTabActive : styles.statusTab}>
                <Text style={selectedStatus === i ? styles.statusTabNumActive : styles.statusTabNum}>
                  {data[item].length}
                </Text>
                <Text style={selectedStatus === i ? styles.statusTabTextActive : styles.statusTabText}>
                  {getStatusName(i)}
                </Text>
              </View>
            </Pressable>
          </View>
        ))}
      </View>
      <ScrollView style={styles.episodesContainer}>
        {showsList.map((item, i) => (
          <Animated.View key={item._id} entering={FadeInRight} exiting={FadeOutLeft} style={styles.episodeWrapper}>
            <ShowWatchCard data={item} />
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    // flex: 1,
    // backgroundColor: "green"
  },
  headerContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusTab: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
  },
  statusTabActive: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  statusTabNum: {
    fontFamily: "NetflixSansMedium",
    fontSize: 26,
    lineHeight: 26,
    color: "#A5A5A5",
  },
  statusTabNumActive: {
    fontFamily: "NetflixSansMedium",
    fontSize: 26,
    lineHeight: 26,
    color: Colors.text,
  },
  statusTabText: {
    fontFamily: "NetflixSansRegular",
    fontSize: 14,
    lineHeight: 14,
    color: "#A5A5A5",
  },
  statusTabTextActive: {
    fontFamily: "NetflixSansRegular",
    fontSize: 14,
    lineHeight: 14,
    color: Colors.text,
  },
  episodeWrapper: {},
});
