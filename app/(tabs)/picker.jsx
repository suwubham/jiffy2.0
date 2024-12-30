import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function TwoComponentsPage() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headlineContainer}>
        <Headline
          isPopupVisible={isPopupVisible}
          setIsPopupVisible={setIsPopupVisible}
        />
      </View>
      <ScrollView style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/game",
            })
          }
        >
          <Text style={styles.cardText}>Momo Udaan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/kangaroo-game",
            })
          }
        >
          <Text style={styles.cardText}>Kangaroo Catch</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "space-between",
  },
  cardContainer: {
    marginTop: 20,
    padding: 20,
    flex: 1,
    // justifyContent: "space-evenly",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
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
});
