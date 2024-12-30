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
  Montserrat_600SemiBold
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
    Montserrat_600SemiBold
  });

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].icon,
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
            <Ionicons size={28} name="home-sharp" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="achievement"
        options={{
          title: "Achievement",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="trophy-sharp" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="picker"
        options={{
          title: "Mini Game",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="game-controller-sharp" color={color} />
          ),
        }}
      />
      {/* </View> */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="person-sharp" color={color} />
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
