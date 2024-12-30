import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import FloatingButton from "../../components/FloatingAction";
import DealsAndOffers from "../../components/DealsAndOffer";

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
    name: "Hyderabadi Dum Biryani",
    image:
      "https://res.cloudinary.com/dckl9mhbs/image/upload/v1735464582/bpdstnrpummetqvgogdz.jpg",
    location: "Thamel, Kathmandu",
    rating: "4.2",
    deliveryTime: "30-40",
  },
  {
    name: "Chiya Maya",
    image:
      "https://res.cloudinary.com/dckl9mhbs/image/upload/v1735464892/ja5clpy6yb4uq6x3xpcm.webp",
    location: "Panipokhari, Kathmandu",
    rating: "4.0",
    deliveryTime: "20-30",
  },
  {
    name: "KFC",
    image:
      "https://res.cloudinary.com/dckl9mhbs/image/upload/v1735465083/iyqc8vgvr5o4aiy0kaep.jpg",
    location: "Pulchowk, Lalitpur",
    rating: "4.0",
    deliveryTime: "20-30",
  },
  {
    name: "Trisara",
    image:
      "https://res.cloudinary.com/dckl9mhbs/image/upload/v1735465522/our-ambiance_nj4uf3.jpg",
    location: "Durbarmarg, Kathmandu",
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
            deliveryTime: restaurant.deliveryTime,
          },
          pathname: "restaurant",
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
        <Ionicons name="time" size={16} color="#666" />
        <Text style={styles.restaurantDeliveryTime}>
          {restaurant.deliveryTime} min
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
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
        <View style={styles.containerRestaurant}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContentRestaurant}
          >
            {restaurants.map((restaurant, index) => (
              <View key={index} style={styles.restaurantItemContainer}>
                <RestaurantItem key={index} restaurant={restaurant} />
              </View>
            ))}
          </ScrollView>
        </View>

        <Text style={styles.sectionTitle}>Deals and Offers</Text>
        <DealsAndOffers />
      </ScrollView>
      <FloatingButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  toprightview: {
    flexDirection: "row",
    gap: 5,
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
    gap: 5,
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
    fontFamily: "Montserrat_400Regular_Italic",
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
    fontFamily: "Montserrat_500Medium",
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold_Italic",
    fontWeight: "400",
    color: "#FE8A01",
    margin: 16,
  },
  restaurantsContainer: {
    paddingHorizontal: 16,
  },
  restaurantItem: {
    marginBottom: 4,
  },
  restaurantImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  containerRestaurant: {
    width: "200%",
  },
  scrollViewContentRestaurant: {
    paddingHorizontal: 10,
  },
  restaurantItemContainer: {
    marginRight: 25,
    width: 300,
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
    fontFamily: "Montserrat_500Medium",
  },
  restaurantDeliveryTime: {
    color: "#666",
    fontFamily: "Montserrat_500Medium",
    marginLeft: 4,
  },
  dealsAndOffersContainer: {
    marginTop: 16,
  },
});

export default HomeScreen;
