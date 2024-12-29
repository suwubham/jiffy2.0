import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

const LeaderboardItem = ({ item, index }) => (
  <View style={styles.item}>
    <Text style={styles.rank}>{index + 1}</Text>
    <Image source={{ uri: item.avatar }} style={styles.avatar} />
    <View style={styles.userInfo}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.username}>@{item.username}</Text>
    </View>
    <Text style={styles.score}>{item.score}</Text>
  </View>
);

const LeaderboardDashboard = () => {
  const leaderboardData = [
    {
      id: "1",
      name: "JSa",
      username: "jsa",
      score: 1000,
      avatar: "https://placekitten.com/100/100",
    },
    {
      id: "2",
      name: "Janith",
      username: "janith",
      score: 950,
      avatar: "https://placekitten.com/101/101",
    },
    {
      id: "3",
      name: "Bob John",
      username: "bobj",
      score: 900,
      avatar: "https://placekitten.com/102/102",
    },
    {
      id: "4",
      name: "Ali Brown",
      username: "alib",
      score: 850,
      avatar: "https://placekitten.com/103/103",
    },
    {
      id: "5",
      name: "Ch Davi",
      username: "charls",
      score: 800,
      avatar: "https://placekitten.com/104/104",
    },
    // Add more users as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={leaderboardData}
        renderItem={({ item, index }) => (
          <LeaderboardItem item={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 15,
    width: 30,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    fontSize: 14,
    color: "#666",
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LeaderboardDashboard;
