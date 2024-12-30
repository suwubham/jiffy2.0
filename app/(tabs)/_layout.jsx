import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFonts } from "expo-font";
import {
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_900Black_Italic,
} from "@expo-google-fonts/montserrat";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_500Medium,
    Montserrat_900Black_Italic,
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
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="achievement"
        options={{
          title: "Achievement",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="medal.fill" color={color} />
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
              <IconSymbol size={28} name="wheel.fill" color={color} />
            ),
          }}
        />
      {/* </View> */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="profile.fill" color={color} />
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
    height: 60, // Set a consistent height
    justifyContent: "center", // Align content vertically
    alignItems:"center"
  },
  tabBarItem: {
    justifyContent: "center", // Align items vertically
    alignItems: "center", // Align items horizontally
  },
  label: {
    fontSize: 13,
    textAlign: "center", // Center-align the label
  },
  icon: {
    alignSelf: "center", // Ensure the icon aligns to the center
  },
});
