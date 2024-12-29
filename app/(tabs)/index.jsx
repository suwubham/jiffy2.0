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
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const categories = [
  { icon: "pizza", name: "Pizza" },
  { icon: "fast-food", name: "Burgers" },
  { icon: "cafe", name: "Coffee" },
  { icon: "restaurant", name: "Sushi" },
  { icon: "ice-cream", name: "Dessert" },
];

const restaurants = [
  {
    name: "The Gardens",
    image:
      "https://res.cloudinary.com/dckl9mhbs/image/upload/v1735458917/thegardens_phepsj.jpg",
    location: "Panipokhari, Kathmandu",
    rating: "4.5",
    deliveryTime: "25-35",
  },
  {
    name: "Pizza Hut",
    image: "https://example.com/pizza-hut.jpg",
    location: "Panipokhari, Kathmandu",
    rating: "4.2",
    deliveryTime: "30-40",
  },
  {
    name: "Subway",
    image: "https://example.com/subway.jpg",
    location: "Panipokhari, Kathmandu",
    rating: "4.0",
    deliveryTime: "20-30",
  },
];

const CategoryItem = ({ icon, name }) => (
  <TouchableOpacity style={styles.categoryItem}>
    <View style={styles.categoryIcon}>
      <Ionicons name={icon} size={24} color="#000" />
    </View>
    <Text style={styles.categoryName}>{name}</Text>
  </TouchableOpacity>
);

const RestaurantItem = ({ restaurant }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.restaurantItem}
      onPress={() =>
        router.push({
          pathname: "/restaurant",
          params: {
            name: restaurant.name,
            image: restaurant.image,
            location: restaurant.location,
            rating: restaurant.rating,
            deliveryTime: restaurant.deliveryTime
          }, 
        })
      }
    >
      <Image
        source={{ uri: restaurant.image }}
        style={styles.restaurantImage}
      />
      <Text style={styles.restaurantName}>{restaurant.name}</Text>
      <Text style={styles.resaddress}>{restaurant.location}</Text>
      <View style={styles.restaurantInfo}>
        <Ionicons name="star" size={16} color="#FFC107" />
        <Text style={styles.restaurantRating}>{restaurant.rating}</Text>
        <Text style={styles.restaurantDeliveryTime}>
          {restaurant.deliveryTime} min
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
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
          {categories.map((category, index) => (
            <CategoryItem
              key={index}
              icon={category.icon}
              name={category.name}
            />
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Featured Restaurants</Text>
        <View style={styles.restaurantsContainer}>
          {restaurants.map((restaurant, index) => (
            <RestaurantItem key={index} restaurant={restaurant} />
          ))}
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

export default HomeScreen;
