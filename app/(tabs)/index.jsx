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

const categories = [
  { icon: "pizza", name: "Pizza" },
  { icon: "fast-food", name: "Burgers" },
  { icon: "cafe", name: "Coffee" },
  { icon: "restaurant", name: "Sushi" },
  { icon: "ice-cream", name: "Dessert" },
];

// const CustomPopup = ({ visible, onClose }) => {
//   const [progress] = useState(new Animated.Value(0)); // Initialize the animated value
//   const maxStreak = 30; // Maximum streak value
//   const currentStreak = 13; // Current streak

//   React.useEffect(() => {
//     if (visible) {
//       // Reset progress to 0 before starting the animation
//       progress.setValue(0);
//       Animated.timing(progress, {
//         toValue: currentStreak / maxStreak, // Calculate progress percentage
//         duration: 800, // Animation duration
//         useNativeDriver: false, // Use native driver (false for width animation)
//       }).start();
//     }
//   }, [visible]); // Listen to changes in `visible`


//   if (!visible) return null;

//   const progressBarWidth = progress.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0%", "100%"], // Interpolate the progress to width percentage
//   });

//   return (
//     <Modal transparent visible={visible} animationType="fade">
//       <TouchableWithoutFeedback onPress={onClose}>
//         <View style={styles.overlay}>
//           <TouchableWithoutFeedback>
//             <View style={styles.popup}>
//               <View style={styles.popupContent}>
//                 <View style={styles.popupHeader}>
//                   <Ionicons name="flash" size={30} color="#FE8A01" />
//                   <Text style={styles.popupTitle}>Streak Status</Text>
//                 </View>
//                 <Text style={styles.popupMessage}>
//                   You're on a {currentStreak}-week streak! Keep ordering to
//                   maintain your streak.
//                 </Text>
//                 <View style={styles.progressBarContainer}>
//                   <Animated.View
//                     style={[styles.progressBar, { width: progressBarWidth }]}
//                   />
//                 </View>
//                 {/* Display max and current streak */}
//                 <Text style={styles.streakNumbers}>
//                   {currentStreak} / {maxStreak} weeks
//                 </Text>
//                 <Text style={styles.streakInfo}>
//                   Order today to keep your streak going!
//                 </Text>
//                 <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//                   <Text style={styles.closeButtonText}>Close</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </TouchableWithoutFeedback>
//         </View>
//       </TouchableWithoutFeedback>
//     </Modal>
//   );
// };

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
      </View>{" "}
      <ScrollView>
        {/* <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Jiffy <Text style={styles.headerTitleBold}>2.0</Text>
          </Text>
          <View style={styles.toprightview}>
            <TouchableOpacity>
              <View style={styles.streakmain}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Montserrat_900Black_Italic",
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
                    fontFamily: "Montserrat_900Black_Italic",
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
        </View> */}

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

        <Text style={styles.sectionTitle}>Featured Foods</Text>
      </ScrollView>
      {/* <CustomPopup
      <FloatingButton/>
      <CustomPopup 
        visible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
      /> */}
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
  // overlay: {
  //   flex: 1,
  //   backgroundColor: "rgba(0, 0, 0, 0.5)",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // popup: {
  //   width: "80%",
  //   backgroundColor: "white",
  //   borderRadius: 15,
  //   padding: 20,
  //   alignItems: "center",
  //   elevation: 5,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  // },
  // popupContent: {
  //   width: "100%",
  //   alignItems: "center",
  // },
  // popupHeader: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 15,
  // },
  // popupTitle: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   marginLeft: 10,
  //   fontFamily: "Montserrat_700Bold",
  // },
  // popupMessage: {
  //   fontSize: 16,
  //   textAlign: "center",
  //   marginBottom: 10,
  //   fontFamily: "Montserrat_400Regular",
  // },
  // streakInfo: {
  //   fontSize: 14,
  //   color: "#666",
  //   textAlign: "center",
  //   marginBottom: 20,
  //   fontFamily: "Montserrat_400Regular_Italic",
  // },
  // closeButton: {
  //   backgroundColor: "#FE8A01",
  //   paddingVertical: 10,
  //   paddingHorizontal: 30,
  //   borderRadius: 25,
  // },
  // closeButtonText: {
  //   color: "white",
  //   fontSize: 16,
  //   fontWeight: "500",
  //   fontFamily: "Montserrat_500Medium",
  // },
  // progressBarContainer: {
  //   width: "100%",
  //   height: 10,
  //   backgroundColor: "#f0f0f0",
  //   borderRadius: 5,
  //   overflow: "hidden",
  //   marginVertical: 10,
  // },
  // progressBar: {
  //   height: "100%",
  //   backgroundColor: "#FE8A01",
  //   borderRadius: 5,
  // },
  // streakNumbers: {
  //   fontSize: 14,
  //   color: "#666",
  //   textAlign: "center",
  //   fontFamily: "Montserrat_400Regular_Italic",
  //   marginTop: 5,
  // },
});

export default HomeScreen;
