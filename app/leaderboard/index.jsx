import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

const LeaderboardUI = () => {
  const { leaderboard } = useLocalSearchParams();
  const parsedLeaderboard = JSON.parse(leaderboard);

  const topUser = parsedLeaderboard[0];
  const remainingUsers = parsedLeaderboard.slice(1);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TopUserCard user={topUser} />
      <FlatList
        data={remainingUsers}
        renderItem={({ item, index }) => (
          <LeaderboardItem item={item} index={index} key={index} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const LeaderboardItem = ({ item, index }) => {
  const getRankColor = () => {
    if (index === 0) return "#C0C0C0";
    if (index === 1) return "#CD7F32";
    return "#000";
  };
  return (
    <View
      style={[
        styles.itemContainer,
        {
          borderBottomColor: index < 3 ? getRankColor() : "#E0E0E0",
        },
      ]}
    >
      {+index % 2 === 0 ? (
        <Ionicons name="arrow-up" color="green" size={20} />
      ) : (
        <Ionicons name="arrow-down" color="#c4291d" size={20} />
      )}

      <View style={styles.rankContainer}>
        <Text style={[styles.rankText, { color: getRankColor() }]}>
          {+index + 2}
        </Text>
      </View>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={[styles.name, { color: getRankColor() }]}>
          {item.name}
        </Text>
        <Text style={styles.username}>@{item.username}</Text>
      </View>
      <Text style={[styles.score, { color: getRankColor() }]}>
        {item.score}
      </Text>
    </View>
  );
};

const TopUserCard = ({ user }) => (
  <View style={styles.topUserCard}>
    <Image source={{ uri: user.avatar }} style={styles.topUserAvatar} />
    <View style={styles.topUserInfo}>
      <Text style={styles.topUserName}>{user.name}</Text>
      <Text style={styles.topUserUsername}>@{user.username}</Text>
      <Text style={styles.topUserScore}>{user.score} points</Text>
    </View>
    <View style={styles.topUserRank}>
      <Text style={styles.topUserRankText}>1</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  rankContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rankText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fe8a01",
  },
  username: {
    fontSize: 14,
    color: "#000",
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  topUserCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFCA28",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.23,
    shadowRadius: 5.62,
  },
  topUserAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  topUserInfo: {
    flex: 1,
  },
  topUserName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  topUserUsername: {
    fontSize: 16,
    color: "#666666",
  },
  topUserScore: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 4,
  },
  topUserRank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  topUserRankText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFCA28",
  },
});

export default LeaderboardUI;
