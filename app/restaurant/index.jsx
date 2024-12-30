import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "../../utils/supabase";

const menuItems = [
  {
    id: 1,
    name: "Pepperoni Pizza - Small",
    price: 550,
    description: "Cheesy, crispy, Meaty crust pizza delight",
    image:
      "https://riotfest.org/wp-content/uploads/2016/10/IMG_0545-768x574.jpg",
    arurl: "https://jiffy-ar.glitch.me/#pepperoni-small",
  },
  {
    id: 13,
    name: "Pepperoni Pizza - Large",
    price: 550,
    description: "Cheesy, crispy, Meaty crust pizza delight",
    image:
      "https://riotfest.org/wp-content/uploads/2016/10/IMG_0545-768x574.jpg",
    arurl: "https://jiffy-ar.glitch.me/#pepperoni-large",
  },
  {
    id: 2,
    name: "Paneer Butter Masala",
    price: 250,
    description: "Creamy curry with soft paneer",
    image:
      "https://platetopalateblog.com/wp-content/uploads/2020/07/20200506_131905-1152x1536.jpg", // Added image URL
  },
  {
    id: 3,
    name: "Hummus with Pita Bread",
    price: 450,
    description: "Creamy dip with warm pita",
    image:
      "https://thefoodiediaries.co/wp-content/uploads/2021/03/img_8477_jpg-1.jpg", // Added image URL
  },
  {
    id: 4,
    name: "Chicken Tikka Masala",
    price: 400,
    description: "Grilled chicken in creamy sauce",
    image:
      "https://www.seriouseats.com/thmb/AKv7r-Xt2anoVvsn0WpLqUehNzU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/chicken-tikka-masala-for-the-grill-recipe-hero-2_1-cb493f49e30140efbffec162d5f2d1d7.JPG", // Added image URL
  },
  {
    id: 5,
    name: "Chili Paneer",
    price: 300,
    description: "Spicy stir-fried paneer cubes",
    image:
      "https://www.cookwithmanali.com/wp-content/uploads/2016/01/Chilli-Paneer-Restaurant-Style-768x1164.jpg", // Added image URL
  },
  {
    id: 6,
    name: "Spicy Veg Pakora",
    price: 150,
    description: "Fried vegetable fritters with spice",
    image:
      "https://www.recipetineats.com/tachyon/2021/05/Pakora_1.jpg?resize=900%2C1260&zoom=1", // Added image URL
  },
  {
    id: 7,
    name: "Spicy Chicken Burger",
    price: 550,
    description: "Crispy chicken with fiery flavors",
    image:
      "https://mccormick.widen.net/content/rjkpycitj4/jpeg/caramelised_nashville_cauliflower_burger_800x800.jpg?crop=true&anchor=0,0&q=80&color=ffffff00&u=eelhgb&w=800&h=800", // Added image URL
  },
  {
    id: 8,
    name: "Spicy Tofu Stir-fry",
    price: 250,
    description: "Tofu with bold spicy flavors",
    image:
      "https://thewoksoflife.com/wp-content/uploads/2021/03/spicy-garlic-tofu-12.jpg", // Added image URL
  },
  {
    id: 9,
    name: "Caesar Salad",
    price: 230,
    description: "Fresh salad with Caesar dressing",
    image:
      "https://itsavegworldafterall.com/wp-content/uploads/2023/04/Avocado-Caesar-Salad-1.jpg", // Added image URL
  },
  {
    id: 10,
    name: "Chicken Biryani",
    price: 300,
    description: "Spiced rice with mixed vegetables",
    image:
      "https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg", // Added image URL
  },
  {
    id: 11,
    name: "Chicken Alfredo Pasta",
    price: 420,
    description: "Creamy pasta with grilled chicken",
    image:
      "https://assets.epicurious.com/photos/5988e3458e3ab375fe3c0caf/1:1/w_2240,c_limit/How-to-Make-Chicken-Alfredo-Pasta-hero-02082017.jpg", // Added image URL
  },
  {
    id: 12,
    name: "Falafel with Tahini",
    price: 330,
    description: "Crispy chickpea balls with sauce",
    image:
      "https://simmerandsauce.com/wp-content/uploads/2020/04/fullsizeoutput_1ffe0-768x533.jpeg", // Added image URL
  },
  // {
  //   id: 13,
  //   name: "Chocolate Mousse",
  //   price: 250,
  //   description: "Rich, velvety chocolate dessert",
  //   image: "https://www.recipetineats.com/tachyon/2018/09/Chocolate-Mousse_9.jpg?resize=900%2C1125&zoom=1", // Added image URL
  // },{
  //   id: 14,
  //   name: "Mango Lassi",
  //   price: 180,
  //   description: "Refreshing mango yogurt drink",
  //   image: "https://i0.wp.com/annikaeats.com/wp-content/uploads/2024/03/DSC_1071.jpg?resize=1365%2C2048&ssl=1", // Added image URL
  // },{
  //   id: 15,
  //   name: "Gulab Jamun",
  //   price: 80,
  //   description: "Soft, syrup-soaked fried dumplings",
  //   image: "https://www.foodie-trail.com/wp-content/uploads/2020/04/PHOTO-2022-02-12-20-04-41_1.jpg", // Added image URL
  // },{
  //   id: 16,
  //   name: "Fruit Salad with Honey",
  //   price: 265,
  //   description: "Fresh fruits with sweet honey",
  //   image: "https://www.yourhomebasedmom.com/wp-content/uploads/2021/03/fruit-salad-8-of-8.jpg", // Added image URL
  // },{
  //   id: 17,
  //   name: "Chocolate Lava Cake",
  //   price: 210,
  //   description: "Warm, gooey, rich chocolate dessert",
  //   image: "https://www.melskitchencafe.com/wp-content/uploads/2023/01/updated-lava-cakes8.webp", // Added image URL
  // },
];

const RestaurantScreen = ({ route, navigation }) => {
  const { name, image, location, rating, deliveryTime } =
    useLocalSearchParams();
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data, error } = await supabase
          .from("cart")
          .select("cart")
          .eq("id", 1)
          .single();

        if (error) throw error;

        if (data && data.cart) {
          setCart(JSON.parse(data.cart));
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: image }} style={styles.restaurantImage} />
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{name}</Text>
          <Text style={styles.restaurantLocation}>{location}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFC107" />
            <Text style={styles.rating}>{rating}</Text>
            <Ionicons name="time" size={16} color="#FE8A01" />
            <Text style={styles.deliveryTime}>{deliveryTime} min</Text>
          </View>
        </View>
        <Text style={styles.menuTitle}>Menu</Text>
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} cart={cart} setCart={setCart} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.viewCartButton}
        onPress={async () => {
          console.log("Updating cart in Supabase:", cart);
          try {
            const { data, error } = await supabase.from("cart").upsert([
              {
                id: 1,
                cart: JSON.stringify(cart),
              },
            ]);

            if (error) throw error;
            console.log("Cart updated successfully", data);
          } catch (error) {
            console.error("Error updating cart", error);
          }
        }}
      >
        <Text style={styles.viewCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const MenuItem = ({ item, cart, setCart }) => {
  return (
    <View style={styles.menuItem}>
      <Image source={{ uri: item.image }} style={styles.menuItemImage} />
      <View style={styles.menuItemContent}>
        <View style={styles.menuItemInfo}>
          <Text style={styles.menuItemName}>{item.name}</Text>
          <Text style={styles.menuItemDescription}>{item.description}</Text>
          <Text style={styles.menuItemPrice}>Rs. {item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.bottomrestro}>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              onPress={() => {
                setCart((prevCart) => {
                  const newCart = { ...prevCart };
                  if (newCart[item.id]) {
                    newCart[item.id] -= 1;
                    if (newCart[item.id] === 0) {
                      delete newCart[item.id];
                    }
                  }
                  return newCart;
                });
              }}
              style={styles.quantityButton}
            >
              <Ionicons name="remove" size={24} color="#FE8A01" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{cart[item.id] || 0}</Text>
            <TouchableOpacity
              onPress={() => {
                setCart((prevCart) => {
                  const newCart = { ...prevCart };
                  newCart[item.id] = (newCart[item.id] || 0) + 1;
                  return newCart;
                });
              }}
              style={styles.quantityButton}
            >
              <Ionicons name="add" size={24} color="#FE8A01" />
            </TouchableOpacity>
          </View>
          {item.arurl && (
            <TouchableOpacity onPress={() => Linking.openURL(item.arurl)}>
              <MaterialIcons name="view-in-ar" size={24} color="#FE8A01" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  restaurantImage: {
    width: "100%",
    height: 200,
  },
  restaurantInfo: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: "400",
    fontFamily: "Montserrat_700Bold",
    marginBottom: 4,
  },
  restaurantLocation: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Montserrat_400Regular_Italic",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 4,
    marginRight: 8,
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
  },
  deliveryTime: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Montserrat_500Medium",
    marginRight: 16,
  },
  menuTitle: {
    fontSize: 30,
    fontFamily: "Montserrat_900Black_Italic",
    fontWeight: "400",
    color: "#FE8A01",
    marginLeft: 16,
  },
  menuItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  bottomrestro: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemInfo: {
    marginBottom: 8,
  },
  menuItemName: {
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Montserrat_400Regular_Italic",
    marginBottom: 4,
  },
  menuItemPrice: {
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  //   quantityButton: {
  //     padding: 8,
  //   },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 8,
    fontFamily: "Montserrat_500Medium",
  },
  addToCartButton: {
    backgroundColor: "#FE8A01",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  addToCartButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  viewCartButton: {
    backgroundColor: "#FE8A01",
    padding: 16,
    alignItems: "center",
  },
  viewCartButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RestaurantScreen;
