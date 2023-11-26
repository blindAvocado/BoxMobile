import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import Drawer from "expo-router/drawer";
import Header from "../../../components/Header";

const FirstRoute = () => <View style={{ flex: 1, backgroundColor: "#ff4081" }} />;

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: "#673ab7" }} />;

export default function PopularPage() {
  const layout = useWindowDimensions();

  const itemsRef = useRef<Array<RectButton>>([]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

  return (
    // <View>
    //   <Drawer.Screen
    //     options={{
    //       title: "Популярное123",
    //       headerShown: true,
    //       header: (props) => <Header {...props} isDrawer={true} />,
    //     }}
    //   />
    //   <View style={styles.tabWrapper}>
    //     <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabContainer}>
    //       <View style={styles.tabItemActive}>
    //         <RectButton style={styles.tabBtn} rippleColor="rgba(255,255,255,0.5)">
    //           <Text style={styles.tabItemText}>Сериалы</Text>
    //         </RectButton>
    //       </View>

    //       <View style={styles.tabItem}>
    //         <RectButton style={styles.tabBtn} rippleColor="rgba(255,255,255,0.5)">
    //           <Text style={styles.tabItemText}>Списки</Text>
    //         </RectButton>
    //       </View>

    //       <View style={styles.tabItem}>
    //         <RectButton style={styles.tabBtn} rippleColor="rgba(255,255,255,0.5)">
    //           <Text style={styles.tabItemText}>Комментарии</Text>
    //         </RectButton>
    //       </View>

    //       <View style={styles.tabItem}>
    //         <RectButton style={styles.tabBtn} rippleColor="rgba(255,255,255,0.5)">
    //           <Text style={styles.tabItemText}>Новости</Text>
    //         </RectButton>
    //       </View>
    //     </ScrollView>
    //   </View>
    //   <View>
    //     <Text>PopularPage</Text>
    //     <Link href={"/show/"}>Ссылка на Сериал</Link>
    //   </View>
    // </View>
    <TabView
      navigationState={{ index, routes }}
      renderScene={({ route }) => {
        switch (route.key) {
          case "first":
            return FirstRoute();
          case "second":
            return SecondRoute();
          default:
            return null;
        }
      }}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
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
  tabItem: {
    borderBottomWidth: 0,
    borderBottomColor: "transparent",
    borderStyle: "solid",
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFC107",
    borderStyle: "solid",
  },
  tabBtn: {
    paddingHorizontal: 12,
    paddingVertical: 13,
  },
  tabItemText: {
    fontFamily: "InterRegular",
    fontSize: 15,
    color: "#fff",
    textTransform: "uppercase",
  },
});
