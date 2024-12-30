import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Headline from "../../components/Headline";

const Profile = () => {
  const user = {
    name: "Jane Doe",
    username: "@janedoe",
    bio: "Software developer | React Native enthusiast | Coffee lover",
    followers: 100,
    // following: 567,
    posts: 15,
    avatar:
      "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
  };

  const userorders = [
    {
      order_id: "1",
      order_name: "Afternoon Food",
      items: ["Pizza", "Beer"],
      quantity: 2,
      amount: 350,
      total: 700,
    },
    {
      order_id: "2",
      order_name: "Breakfast",
      items: ["Cafe Latte", "Butter Taost", "Omelette"],
      quantity: 2,
      amount: 350,
      total: 940,
    },
    {
      order_id: "3",
      order_name: "Dinner",
      items: ["Chicken Biryani", "Diet Coke"],
      quantity: 2,
      amount: 350,
      total: 560,
    },
  ];
  const router = useRouter();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headlineContainer}>
        <Headline
          isPopupVisible={isPopupVisible}
          setIsPopupVisible={setIsPopupVisible}
        />
      </View>
      <ScrollView>
        <View style={styles.header}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <TouchableOpacity
            // style={styles.restaurantItem}
            onPress={() =>
              router.push({
                pathname: "/leaderboard",
              })
            }
            style={styles.leaderboardIcon}
          >
            <Ionicons
              name="bar-chart-outline"
              size={25}
              color="#fe8a01"
            ></Ionicons>
          </TouchableOpacity>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.bio}>{user.bio}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.posts}</Text>
              <Text style={styles.statLabel}>Foods Ordered</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            {/* <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View> */}
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ordersContainer}>
          <Text style={styles.ordersTitle}>Recent Orders</Text>
          {userorders.map((order) => (
            <View key={order.id} style={styles.order}>
              <Text style={styles.orderContent}>{order.order_name}</Text>
              <View style={styles.orderStats}>
                <View style={styles.orderItems}>
                  {/* <Ionicons name="heart-outline" size={16} color="#666" /> */}
                  {order.items.map((item, id) => (
                    <Text style={styles.orderStatText} key={id}>
                      {id + 1}. {item}
                    </Text>
                  ))}
                </View>
                <View style={styles.orderStat}>
                  <Ionicons name="fast-food-outline" size={16} color="#666" />
                  <Text style={styles.orderStatText}>{order.quantity}</Text>
                </View>
                <View style={styles.orderStat}>
                  <Ionicons name="cash-outline" size={16} color="#666" />
                  <Text style={styles.orderStatText}>{order.total}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headlineContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: "#E0E0E0",
  },
  leaderboardIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 10,
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
    backgroundColor: "#fe8a01",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Montserrat_400Regular_Italic",
  },
  ordersContainer: {
    padding: 20,
  },
  ordersTitle: {
    fontSize: 24,
    marginBottom: 10,
    color: "#fe8a01",
    fontFamily: "Montserrat_900Black_Italic",
  },
  order: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderContent: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderStats: {
    flexDirection: "row",
  },
  orderStat: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  orderItems: {
    flexDirection: "column",
    // alignItems: "center",
    marginRight: 15,
  },
  orderStatText: {
    marginLeft: 5,
    color: "#666",
  },
});

export default Profile;
