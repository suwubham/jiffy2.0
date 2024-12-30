import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications (mock data for now)
  const fetchNotifications = async () => {
    // Replace this with API call or database fetch
    const mockData = [
      {
        id: 1,
        title: "🥟✨ Craving deliciousness? ",
        description:
          " Enjoy 50% OFF on our steaming hot momos! 🥰🔥 Treat yourself to happiness in every bite—order now! 🛵💨",
        timestamp: "2024-12-30 05:15 PM",
      },
      {
        id: 2,
        title: "Promotion Alert",
        description: "Get 20% off on your next purchase!",
        timestamp: "2024-12-29 8:30 PM",
      },
      {
        id: 3,
        title: "Payment Received",
        description: "We have received your payment for order #12345.",
        timestamp: "2024-12-28 2:45 PM",
      },
    ];
    setNotifications(mockData);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const renderNotification = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{item.title}</Text>~
      <Text style={styles.notificationDescription}>{item.description}</Text>
      <Text style={styles.notificationTimestamp}>{item.timestamp}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNotification}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fe8a01",
    marginVertical: 20,
    marginHorizontal: 30,
  },
  listContent: {
    paddingBottom: 20,
  },
  notificationItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  notificationTitle: {
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily: "Montserrat_900Black_Italic",
    color: "#fe8a01",
  },
  notificationDescription: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Montserrat_400Regular_Italic",
    marginVertical: 5,
  },
  notificationTimestamp: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
    fontFamily: "Montserrat_400Regular_Italic",
  },
});
