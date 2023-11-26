import React, { useMemo, useRef, useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import InfoBlock from "@/components/InfoBlock";
import popularWeek from "@/assets/data/popularShows.json";
import popularShowsUser from "@/assets/data/popularShowsUsers.json";

const PopularShows = () => {
  const thisWeek = useMemo(() => popularWeek as any, []);
  const newRatings = useMemo(() => popularShowsUser as any, []);

  return (
    <View style={{ backgroundColor: "#484848", flex: 1, paddingVertical: 10 }}>
      <ScrollView contentContainerStyle={styles.blocksWrapper}>
        <InfoBlock title="Популярное на этой неделе" items={thisWeek} />
        <InfoBlock title="Новые оценки друзей" items={newRatings} />
      </ScrollView>
    </View>
  );
};

const PopularLists = () => <View style={{ flex: 1, backgroundColor: "#673ab7" }} />;

export default function PopularPage() {
  const layout = useWindowDimensions();

  const itemsRef = useRef<Array<RectButton>>([]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "shows", title: "Сериалы" },
    { key: "lists", title: "Списки" },
    { key: "comments", title: "Комментарии" },
    { key: "news", title: "Новости" },
  ]);

  const renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        activeColor="#FFF"
        pressColor="rgba(255,255,255,0.3)"
        indicatorStyle={{ backgroundColor: "#FFC107", height: 3 }}
        style={styles.tabContainer}
        tabStyle={{ paddingVertical: 0, paddingHorizontal: 5, width: "auto" }}
        labelStyle={styles.tabItemText}
        scrollEnabled={true}
      />
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={({ route }) => {
        switch (route.key) {
          case "shows":
            return PopularShows();
          case "lists":
            return PopularLists();
          case "comments":
            return PopularLists();
          case "news":
            return PopularLists();
          default:
            return null;
        }
      }}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  tabWrapper: {
    backgroundColor: "#484848",
  },
  tabContainer: {
    backgroundColor: "#484848",
  },
  tabBtn: {
    paddingHorizontal: 12,
    paddingVertical: 13,
  },
  tabItemText: {
    paddingHorizontal: 8,
    fontFamily: "InterRegular",
    fontSize: 15,
    color: "#fff",
    textTransform: "uppercase",
  },
  blocksWrapper: {
    gap: 20
  }
});
