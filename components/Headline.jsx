import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const CustomPopup = ({ visible, onClose }) => {
  const [progress] = useState(new Animated.Value(0)); 
  const maxStreak = 30; 
  const currentStreak = 13; 
  React.useEffect(() => {
    if (visible) {
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: currentStreak / maxStreak, 
        duration: 800, 
        useNativeDriver: false, 
      }).start();
    }
  }, [visible]); 

  if (!visible) return null;

  const progressBarWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"], 
  });

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.popup}>
              <View style={styles.popupContent}>
                <View style={styles.popupHeader}>
                  <Ionicons name="flash" size={30} color="#FE8A01" />
                  <Text style={styles.popupTitle}>Streak Status</Text>
                </View>
                <Text style={styles.popupMessage}>
                  You're on a {currentStreak}-week streak! Keep ordering to
                  maintain your streak.
                </Text>
                <View style={styles.progressBarContainer}>
                  <Animated.View
                    style={[styles.progressBar, { width: progressBarWidth }]}
                  />
                </View>
                <Text style={styles.streakNumbers}>
                  {currentStreak} / {maxStreak} weeks
                </Text>
                <Text style={styles.streakInfo}>
                  Order today to keep your streak going!
                </Text>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Headline = ({ isPopupVisible, setIsPopupVisible }) => {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>
        Jiffy <Text style={styles.headerTitleBold}>2.0</Text>
      </Text>
      <View style={styles.toprightview}>
        <TouchableOpacity>
          <View style={styles.streakmain}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Montserrat_700Bold_Italic",
              }}
            >
              6940
            </Text>
            <Ionicons name="wallet" size={25} color="#FE8A01" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsPopupVisible(true)}>
          <View style={styles.streakmain}>
            <Text
              style={{
                fontFamily: "Montserrat_700Bold_Italic",
                fontSize: 15,
              }}
            >
              13
            </Text>
            <Ionicons name="flash" size={25} color="#FE8A01" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/cart")}>
          <Ionicons name="cart-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <CustomPopup
        visible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  toprightview: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  streakmain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 0,
    paddingTop: 10,
  },
  resaddress: {
    color: "#666",
    fontSize: 12,
    fontFamily: "Montserrat_400Regular_Italic",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "400",
    color: "#FE8A01",
    fontFamily: "Montserrat_900Black_Italic",
  },
  headerTitleBold: {
    fontWeight: "bold",
    fontWeight: "400",
    fontFamily: "Montserrat_900Black_Italic",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    margin: 16,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
  },
  categoriesContainer: {
    paddingLeft: 16,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 20,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    backgroundColor: "#f0f0f0",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryName: {
    marginTop: 8,
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    fontWeight: "400",
    color: "#FE8A01",
    margin: 16,
  },
  restaurantsContainer: {
    paddingHorizontal: 16,
  },
  restaurantItem: {
    marginBottom: 20,
  },
  restaurantImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
    fontWeight: "400",
    marginTop: 8,
  },
  restaurantInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  restaurantRating: {
    marginLeft: 4,
    marginRight: 8,
  },
  restaurantDeliveryTime: {
    color: "#666",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  popupContent: {
    width: "100%",
    alignItems: "center",
  },
  popupHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    fontFamily: "Montserrat_700Bold",
  },
  popupMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Montserrat_400Regular",
  },
  streakInfo: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Montserrat_400Regular_Italic",
  },
  closeButton: {
    backgroundColor: "#FE8A01",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Montserrat_500Medium",
  },
  progressBarContainer: {
    width: "100%",
    height: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FE8A01",
    borderRadius: 5,
  },
  streakNumbers: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontFamily: "Montserrat_400Regular_Italic",
    marginTop: 5,
  },
});
