import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';


const LeaderboardItem = ({ item, index }) => {
  const getBackgroundColor = () => {
    if (index === 0) return "#FFCA28"; 
    if (index === 1) return "#C0C0C0"; // Silver for 2nd place
    if (index === 2) return "#CD7F32"; // Bronze for 3rd place
    return "white"; // Default color for others
  };
  return (
    <View style={[styles.item, { backgroundColor: getBackgroundColor() }]}>
      <View style={{padding:15}}><Ionicons name="arrow-up-outline" color="green"/></View>
      <Text style={styles.rank}>{index + 1}</Text>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.username}>@{item.username}</Text>
      </View>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );
};

const LeaderboardDashboard = () => {
  const leaderboardData = [
    {
      id: "1",
      name: "JSa",
      username: "jsa",
      score: 1000,
      avatar: "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?semt=ais_hybrid",
    },
    {
      id: "2",
      name: "Janith",
      username: "janith",
      score: 950,
      avatar: "https://media.istockphoto.com/id/1389348844/photo/studio-shot-of-a-beautiful-young-woman-smiling-while-standing-against-a-grey-background.jpg?s=612x612&w=0&k=20&c=anRTfD_CkOxRdyFtvsiPopOluzKbhBNEQdh4okZImQc=",
    },
    {
      id: "3",
      name: "Bob John",
      username: "bobj",
      score: 900,
      avatar: "https://i.pinimg.com/originals/13/08/a2/1308a28875d5f2f9fb9fe33a411b9298.jpg",
    },
    {
      id: "4",
      name: "Ali Brown",
      username: "alib",
      score: 850,
      avatar: "https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg",
    },
    {
      id: "5",
      name: "Ch Davi",
      username: "charls",
      score: 800,
      avatar: "https://static.vecteezy.com/system/resources/thumbnails/034/332/611/small_2x/ai-generated-studio-portrait-of-handsome-elderly-old-african-man-on-different-colours-background-photo.jpg",
    },
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
    padding: 25,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
    paddingVertical:30,
    color:"#fe8a01"
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
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