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
import { useFocusEffect } from "@react-navigation/native";

const RestaurantScreen = ({ route, navigation }) => {
  const { name, image, location, rating, deliveryTime } =
    useLocalSearchParams();
  const [cart, setCart] = useState({});
  

  const [menuItems, setMenuItems] = useState([]);

  const fetchMenuItems = async () => {
    const { data, error } = await supabase.from("menuItems").select();
    if (error) {
      console.error("Error fetching menu items:", error);
    } else {
      setMenuItems(data);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchMenuItems();
      return () => {};
    }, [])
  );

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
