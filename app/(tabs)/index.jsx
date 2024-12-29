import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const CategoryItem = ({ icon, name }) => (
  <TouchableOpacity style={styles.categoryItem}>
    <View style={styles.categoryIcon}>
      <Ionicons name={icon} size={24} color="#000" />
    </View>
    <Text style={styles.categoryName}>{name}</Text>
  </TouchableOpacity>
);

const RestaurantItem = ({ name, image, rating, deliveryTime }) => (
  <TouchableOpacity style={styles.restaurantItem}>
    <Image source={{ uri: image }} style={styles.restaurantImage} />
    <Text style={styles.restaurantName}>{name}</Text>
    <View style={styles.restaurantInfo}>
      <Ionicons name="star" size={16} color="#FFC107" />
      <Text style={styles.restaurantRating}>{rating}</Text>
      <Text style={styles.restaurantDeliveryTime}>{deliveryTime} min</Text>
    </View>
  </TouchableOpacity>
);

const UberEatsHomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Jiffy <Text style={styles.headerTitleBold}>2.0</Text>
          </Text>
          <View style={styles.toprightview}>
            <TouchableOpacity>
              <View style={styles.streakmain}>
              <Text>
                  12
                </Text>
                <Ionicons name="flash-outline" size={30} color="#000" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="cart-outline" size={30} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search for restaurant or dish"
            style={styles.searchInput}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          <CategoryItem icon="pizza" name="Pizza" />
          <CategoryItem icon="fast-food" name="Burgers" />
          <CategoryItem icon="cafe" name="Coffee" />
          <CategoryItem icon="restaurant" name="Sushi" />
          <CategoryItem icon="ice-cream" name="Dessert" />
        </ScrollView>

        <Text style={styles.sectionTitle}>Featured Restaurants</Text>
        <View style={styles.restaurantsContainer}>
          <RestaurantItem
            name="Burger King"
            image="https://example.com/burger-king.jpg"
            rating="4.5"
            deliveryTime="25-35"
          />
          <RestaurantItem
            name="Pizza Hut"
            image="https://example.com/pizza-hut.jpg"
            rating="4.2"
            deliveryTime="30-40"
          />
          <RestaurantItem
            name="Subway"
            image="https://example.com/subway.jpg"
            rating="4.0"
            deliveryTime="20-30"
          />
        </View>
      </ScrollView>
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
    padding: 16,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "400",
    color: "#FB8E13",
    fontFamily: "Montserrat_700Bold",
  },
  headerTitleBold: {
    fontWeight: "bold",
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
    fontWeight: "bold",
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
    fontWeight: "bold",
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
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
  },
});

export default UberEatsHomeScreen;
