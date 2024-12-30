import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFonts } from "expo-font";
import {
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_900Black_Italic,
} from "@expo-google-fonts/montserrat";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_500Medium,
    Montserrat_900Black_Italic,
    Montserrat_400Regular_Italic,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold_Italic,
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: [
          styles.tabBar,
          Platform.select({
            ios: {
              position: "absolute",
            },
            default: {},
          }),
        ],
        tabBarLabelStyle: styles.label,
        tabBarIconStyle: styles.icon,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            // <IconSymbol size={28} name="house.fill" color={color} />
            <Ionicons size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="achievement"
        options={{
          title: "Achievement",
          tabBarIcon: ({ color }) => (
            // <IconSymbol size={28} name="medal.fill" color={color} />
            <Ionicons size={28} name="trophy" color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Leaderboard",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="leaderboard.fill" color={color} />
          ),
        }}
      /> */}
      {/* <View style={{ flex: 1, justifyContent: "center" }}> */}
      <Tabs.Screen
        name="wheel"
        options={{
          title: "Spin the Wheel",
          tabBarIcon: ({ color }) => (
            // <IconSymbol size={28} name="wheel.fill" color={color} />
            <Ionicons size={28} name="aperture" color={color} />
          ),
        }}
      />
      {/* </View> */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            // <IconSymbol size={28} name="profile.fill" color={color} />
            <Ionicons size={28} name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
    borderRadius: 15,
    margin: 10,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 13,
    textAlign: "center",
  },
  icon: {
    alignSelf: "center",
  },
});
