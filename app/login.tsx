import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Pressable, useWindowDimensions } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import { useNavigation, useRouter } from "expo-router";
import { TabView } from "react-native-tab-view";

export default function LoginPage() {
  const layout = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "login", title: "Войти" },
    { key: "register", title: "Создать аккаунт" },
  ]);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<object>({});

  const LoginForm = (jumpTo: (key: string) => void) => {
    return (
      <Animated.View
        key={"Login"}
        style={styles.formWrapper}
        entering={FadeInRight.duration(1000)}
        exiting={FadeInLeft.duration(1000)}
      >
        <Text style={styles.formTitle}>Войти</Text>
        <View style={styles.form}>
          <View style={{ overflow: "hidden", borderRadius: 15 }}>
            <Pressable style={styles.input} android_ripple={{ color: "rgba(255, 255, 255, 0.2)", foreground: false }}>
              <TextInput
                style={styles.inputField}
                keyboardType="web-search"
                textContentType="username"
                placeholder="Логин"
                placeholderTextColor={"gray"}
                value={username}
                onChangeText={setUsername}
              />
            </Pressable>
          </View>
          <View style={{ overflow: "hidden", borderRadius: 15 }}>
            <Pressable style={styles.input} android_ripple={{ color: "rgba(255, 255, 255, 0.2)", foreground: false }}>
              <TextInput
                placeholder="Пароль"
                placeholderTextColor={"gray"}
                secureTextEntry
                style={styles.inputField}
                value={password}
                onChangeText={setPassword}
              />
            </Pressable>
          </View>
          <LinearGradient
            colors={[Colors.accent.base, Colors.accent.light]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ overflow: "hidden", borderRadius: 15 }}
          >
            <Pressable
              style={styles.btn}
              android_ripple={{ color: "rgba(255, 255, 255, 0.5)", foreground: false }}
              onPress={handleSubmit}
            >
              <Text style={styles.btnText}>Войти</Text>
            </Pressable>
          </LinearGradient>
        </View>
        <View style={styles.optionWrapper}>
          <Text style={styles.optionText}>Еще нет аккаунта?</Text>
          <Pressable onPress={() => jumpTo("register")}>
            <Text style={styles.optionBtn}>Создать</Text>
          </Pressable>
        </View>
      </Animated.View>
    );
  };

  const RegisterForm = (jumpTo: (key: string) => void) => {
    return (
      <Animated.View
        key={"Register"}
        style={styles.formWrapper}
        entering={FadeInRight.duration(1000)}
        exiting={FadeInLeft.duration(1000)}
      >
        <Text style={styles.formTitle}>Создать аккаунт</Text>
        <View style={styles.form}>
          <View style={{ overflow: "hidden", borderRadius: 15 }}>
            <Pressable style={styles.input} android_ripple={{ color: "rgba(255, 255, 255, 0.2)", foreground: false }}>
              <TextInput
                style={styles.inputField}
                keyboardType="web-search"
                textContentType="username"
                placeholder="Логин"
                placeholderTextColor={"gray"}
                value={username}
                onChangeText={setUsername}
              />
            </Pressable>
          </View>
          <View style={{ overflow: "hidden", borderRadius: 15 }}>
            <Pressable style={styles.input} android_ripple={{ color: "rgba(255, 255, 255, 0.2)", foreground: false }}>
              <TextInput
                style={styles.inputField}
                keyboardType="web-search"
                textContentType="emailAddress"
                placeholder="E-mail"
                placeholderTextColor={"gray"}
                value={email}
                onChangeText={setEmail}
              />
            </Pressable>
          </View>
          <View style={{ overflow: "hidden", borderRadius: 15 }}>
            <Pressable style={styles.input} android_ripple={{ color: "rgba(255, 255, 255, 0.2)", foreground: false }}>
              <TextInput
                placeholder="Пароль"
                placeholderTextColor={"gray"}
                secureTextEntry
                style={styles.inputField}
                value={password}
                onChangeText={setPassword}
              />
            </Pressable>
          </View>
          <LinearGradient
            colors={[Colors.accent.base, Colors.accent.light]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ overflow: "hidden", borderRadius: 15 }}
          >
            <Pressable
              style={styles.btn}
              android_ripple={{ color: "rgba(255, 255, 255, 0.5)", foreground: false }}
              onPress={handleSubmit}
            >
              <Text style={styles.btnText}>Зарегистрироваться</Text>
            </Pressable>
          </LinearGradient>
        </View>
        <View style={styles.optionWrapper}>
          <Text style={styles.optionText}>Уже есть аккаунт?</Text>
          <Pressable onPress={() => jumpTo("login")}>
            <Text style={styles.optionBtn}>Войти</Text>
          </Pressable>
        </View>
      </Animated.View>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    setUsername("");
    setEmail("");
    setPassword("");
    setErrors({});
  }, [index]);

  const validateForm = () => {
    let errors = {};

    if (!username) errors.username = "Требуется логин";
    if (!password) errors.password = "Требуется пароль";

    if (index === 1) {
      if (!email) errors.email = "Требуется email";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Submitted", username, password);
      setUsername("");
      setEmail("");
      setPassword("");
      setErrors({});
      router.replace("/(drawer)/popular")
    }
  };

  return (
    <KeyboardAvoidingView style={[styles.container, { paddingTop: insets.top }]} behavior={"padding"}>
      <View style={[styles.wrapper]}>
        <View style={styles.logoWrapper}>
          <Text style={styles.logo}>BOX</Text>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={({ route, jumpTo }) => {
            switch (route.key) {
              case "login":
                return LoginForm(jumpTo);
              case "register":
                return RegisterForm(jumpTo);
              default:
                return null;
            }
          }}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={() => null}
          swipeEnabled={false}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: Colors.background.dark,
  },
  wrapper: {
    height: "100%",
    justifyContent: "flex-start",
  },
  logoWrapper: {
    flexDirection: "row",
    paddingVertical: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    color: Colors.accent.base,
    fontFamily: "NetflixSansBold",
    fontSize: 60,
  },
  formWrapper: {
    flexGrow: 1,
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  formTitle: {
    fontFamily: "NetflixSansBold",
    fontSize: 25,
    color: Colors.text,
    marginBottom: 15,
  },
  form: {
    flexDirection: "column",
    gap: 10,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.background.light,
    borderRadius: 15,
    backgroundColor: Colors.background.dark,
    overflow: "hidden",
  },
  inputField: {
    fontSize: 18,
    color: Colors.text,
  },
  btn: {
    padding: 15,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 18,
  },
  optionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginTop: 20,
  },
  optionText: {
    fontFamily: "NetflixSansRegular",
    fontSize: 16,
    color: Colors.text,
  },
  optionBtn: {
    fontFamily: "NetflixSansRegular",
    fontSize: 16,
    color: Colors.accent.light,
  },
});
