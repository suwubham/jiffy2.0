import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from 'expo-router';

const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: 12.99,
    description: "Classic cheese and tomato pizza",
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    price: 14.99,
    description: "Pizza with pepperoni slices",
  },
  {
    id: 3,
    name: "Vegetarian Pizza",
    price: 13.99,
    description: "Pizza with assorted vegetables",
  },
  {
    id: 4,
    name: "Garlic Bread",
    price: 4.99,
    description: "Toasted bread with garlic butter",
  },
  {
    id: 5,
    name: "Caesar Salad",
    price: 8.99,
    description: "Fresh salad with Caesar dressing",
  },
];

const MenuItem = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart({ ...item, quantity });
      setQuantity(0);
    }
  };

  return (
    <View style={styles.menuItem}>
      <View style={styles.menuItemInfo}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemDescription}>{item.description}</Text>
        <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity
          onPress={handleDecrement}
          style={styles.quantityButton}
        >
          <Ionicons name="remove" size={24} color="#FE8A01" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity
          onPress={handleIncrement}
          style={styles.quantityButton}
        >
          <Ionicons name="add" size={24} color="#FE8A01" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleAddToCart}
        style={styles.addToCartButton}
      >
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const RestaurantScreen = ({ route, navigation }) => {
    const { name, image, location, rating, deliveryTime } = useLocalSearchParams();
    console.log(image);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: image }}
          style={styles.restaurantImage}
        />
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{name}</Text>
          <Text style={styles.restaurantLocation}>{location}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFC107" />
            <Text style={styles.rating}>{rating}</Text>
            <Text style={styles.deliveryTime}>
              {deliveryTime} min
            </Text>
          </View>
        </View>
        <Text style={styles.menuTitle}>Menu</Text>
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} onAddToCart={handleAddToCart} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.viewCartButton}
        onPress={() => navigation.navigate("Cart", { cart })}
      >
        <Text style={styles.viewCartButtonText}>View Cart ({cart.length})</Text>
      </TouchableOpacity>
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
    fontWeight: "bold",
    marginBottom: 4,
  },
  restaurantLocation: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 4,
    marginRight: 8,
    fontSize: 16,
  },
  deliveryTime: {
    fontSize: 16,
    color: "#666",
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  quantityButton: {
    padding: 8,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 8,
  },
  addToCartButton: {
    backgroundColor: "#FE8A01",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
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
