import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    InterRegular: require("../assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("../assets/fonts/Inter-Medium.ttf"),
    InterBold: require("../assets/fonts/Inter-Bold.ttf"),
    NetflixSansThin: require("../assets/fonts/NetflixSansThin.ttf"),
    NetflixSansLight: require("../assets/fonts/NetflixSansLight.ttf"),
    NetflixSansRegular: require("../assets/fonts/NetflixSansRegular.ttf"),
    NetflixSansMedium: require("../assets/fonts/NetflixSansMedium.ttf"),
    NetflixSansBold: require("../assets/fonts/NetflixSansBold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        animation: "fade_from_bottom",
        animationTypeForReplace: "push",
      }}
    >
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="user" options={{ headerShown: false }} />
      <Stack.Screen name="show" options={{ headerShown: false }} />
      <Stack.Screen name="episode" options={{ headerShown: false }} />
      <Stack.Screen name="list" options={{ headerShown: false }} />
    </Stack>
  );
}
