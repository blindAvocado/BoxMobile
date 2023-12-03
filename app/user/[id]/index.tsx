import Header from "@/components/Header";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import ShowsWatchList from "@/components/ShowsWatchList";

import watchedShowsData from "@/assets/data/watchedShowsData.json";
import { IWatchedShowStatuses } from "@/constants/types";

export default function ShowPage() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  // const user = (friendsRatings as any[]).find((item) => item._id === id);
  const navigation = useNavigation();

  const watchedShows = useMemo<IWatchedShowStatuses>(() => watchedShowsData as any, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "username",
      header: (props: any) => <Header {...props} isDrawer={false} />,
    });
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 75 }]}>
      <View style={styles.headerWrapper}>
        <View style={styles.avatarWrapper}>
          <Image
            style={styles.avatarImage}
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg",
            }}
          />
        </View>
        <View style={styles.statsWrapper}>
          <View style={styles.statsItem}>
            <View style={styles.statsTextWrapper}>
              <Text style={styles.statsTextValue}>3764</Text>
              <Text style={styles.statsText}>эпизода</Text>
            </View>
            <View style={styles.statsBar}>
              <View style={[styles.statsProgress, { backgroundColor: "#D81E12" }]}></View>
              <View style={styles.statsBg}></View>
            </View>
          </View>
          <View style={styles.statsItem}>
            <View style={styles.statsTextWrapper}>
              <Text style={styles.statsTextValue}>1628</Text>
              <Text style={styles.statsText}>часов</Text>
            </View>
            <View style={styles.statsBar}>
              <View style={[styles.statsProgress, { backgroundColor: "#1ECC6E" }]}></View>
              <View style={styles.statsBg}></View>
            </View>
          </View>
          <View style={styles.statsItem}>
            <View style={styles.statsTextWrapper}>
              <Text style={styles.statsTextValue}>68</Text>
              <Text style={styles.statsText}>дней</Text>
            </View>
            <View style={styles.statsBar}>
              <View style={[styles.statsProgress, { backgroundColor: "#FFC107" }]}></View>
              <View style={styles.statsBg}></View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.showsWrapper}>
        <ShowsWatchList data={watchedShows} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    // backgroundColor: "#262626",
    // height: 100,
  },
  container: {
    flex: 1,
    backgroundColor: "#262626",
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  avatarWrapper: {},
  avatarImage: {
    width: 100,
    aspectRatio: "1 / 1",
    borderRadius: 999,
    overflow: "hidden",
  },
  statsWrapper: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  statsItem: {
    flexDirection: "column",
    position: "relative",
  },
  statsTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  statsTextValue: {
    fontFamily: "NetflixSansRegular",
    fontSize: 18,
    color: Colors.text,
  },
  statsText: {
    fontFamily: "NetflixSansRegular",
    fontSize: 16,
    color: "#A5A5A5",
  },
  statsBar: {
    width: "100%",
    height: 5,
    position: "relative",
  },
  statsProgress: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "50%",
    height: "100%",
    zIndex: 1,
    backgroundColor: "#D81E12",
  },
  statsBg: {
    width: "100%",
    height: "100%",
    backgroundColor: "#484848",
  },
  showsWrapper: {},
});
