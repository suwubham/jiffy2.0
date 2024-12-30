import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SymbolWeight } from "expo-symbols";
import React from "react";
import { OpaqueColorValue, StyleProp, ViewStyle } from "react-native";

const MAPPING = {
  "house.fill": "home",
  // "paperplane.fill": "send",
  "leaderboard.fill": "chart-bar",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "medal.fill": "medal",
  "profile.fill": "account-circle",
  "wheel.fill": "tire",
};

export function IconSymbol({ name, size = 24, color, style }) {
  return (
    <MaterialCommunityIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}
