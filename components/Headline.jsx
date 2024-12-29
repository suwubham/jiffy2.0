import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default Headline = () => {
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
                fontFamily: "Montserrat_900Black_Italic",
                fontSize: 15,
              }}
            >
              13
            </Text>
            <Ionicons name="flash" size={25} color="#FE8A01" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>
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
    paddingTop: 50,
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
});
