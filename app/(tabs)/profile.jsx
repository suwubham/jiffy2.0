import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const user = {
    name: "Jane Doe",
    username: "@janedoe",
    bio: "Software developer | React Native enthusiast | Coffee lover",
    followers: 1234,
    following: 567,
    posts: 89,
    avatar: "https://placekitten.com/200/200",
  };

  const userPosts = [
    { id: "1", content: "Just launched my new app!", likes: 42, comments: 7 },
    {
      id: "2",
      content: "Learning new React Native techniques",
      likes: 38,
      comments: 5,
    },
    {
      id: "3",
      content: "Beautiful sunset at the beach",
      likes: 56,
      comments: 12,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.postsContainer}>
        <Text style={styles.postsTitle}>Recent Posts</Text>
        {userPosts.map((post) => (
          <View key={post.id} style={styles.post}>
            <Text style={styles.postContent}>{post.content}</Text>
            <View style={styles.postStats}>
              <View style={styles.postStat}>
                <Ionicons name="heart-outline" size={16} color="#666" />
                <Text style={styles.postStatText}>{post.likes}</Text>
              </View>
              <View style={styles.postStat}>
                <Ionicons name="chatbubble-outline" size={16} color="#666" />
                <Text style={styles.postStatText}>{post.comments}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  username: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  editButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  postsContainer: {
    padding: 20,
  },
  postsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  post: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  postContent: {
    fontSize: 14,
    marginBottom: 10,
  },
  postStats: {
    flexDirection: "row",
  },
  postStat: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  postStatText: {
    marginLeft: 5,
    color: "#666",
  },
});

export default Profile;
