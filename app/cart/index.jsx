import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../../utils/supabase";
import { useFocusEffect } from "@react-navigation/native";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const [menuItems, setMenuItems] = useState([]);

  const fetchMenuItems = async () => {
    const { data, error } = await supabase.from("menuItems").select();
    if (error) {
      console.error("Error fetching menu items:", error);
    } else {
      setMenuItems(data);
    }
  };

  const fetchCartItems = async () => {
    try {
      const { data, error } = await supabase
        .from("cart")
        .select("cart")
        .single();

      if (error) throw error;
      if (data && data.cart) {
        const parsedCart = JSON.parse(data.cart);
        setCartItems(parsedCart);
      } else {
        setCartItems({});
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const calculateTotal = () => {
    if (!menuItems || menuItems.length === 0) return;
    let total = 0;
    Object.entries(cartItems).forEach(([itemId, quantity]) => {
      const item = menuItems.find((item) => item.id === parseInt(itemId));
      if (item) {
        total += item.price * quantity;
      }
    });
    setTotalAmount(total);
  };

  useEffect(() => {
    calculateTotal();
  }, [menuItems, cartItems]); // Recalculate total when menuItems or cartItems changes

  useFocusEffect(
    React.useCallback(() => {
      fetchMenuItems();
      fetchCartItems();
      return () => {};
    }, [])
  );

  const renderCartItems = () => {
    return Object.entries(cartItems).map(([itemId, quantity]) => {
      const item = menuItems.find((item) => item.id === parseInt(itemId));
      if (item) {
        return (
          <View key={itemId} style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>x{quantity}</Text>
            <Text style={styles.itemPrice}>Rs. {item.price * quantity}</Text>
          </View>
        );
      }
      return null;
    });
  };

  const handleCheckout = () => {
    console.log("Proceeding to payment...");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <ScrollView style={styles.cartList}>{renderCartItems()}</ScrollView>
      <Text style={styles.subtitle}>
        Orders above Rs. 2000 get a chance to try their luck in the wheel of
        fortune.
      </Text>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Amount:</Text>
        <Text style={styles.totalAmount}>Rs. {totalAmount}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontFamily: "Montserrat_900Black_Italic",
    fontWeight: "400",
    color: "#FE8A01",
  },
  subtitle: {
    color: "#666",
    fontSize: 12,
    fontFamily: "Montserrat_400Regular_Italic",
  },
  cartList: {
    marginTop: 20,
    flex: 1,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  itemName: {
    flex: 2,
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
  },
  itemQuantity: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
  },
  itemPrice: {
    flex: 1,
    fontSize: 16,
    textAlign: "right",
    fontFamily: "Montserrat_500Medium",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  totalText: {
    fontSize: 18,
    fontFamily: "Montserrat_500Medium",
  },
  totalAmount: {
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
  },
  checkoutButton: {
    backgroundColor: "#FE8A01",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Montserrat_900Black_Italic",
  },
});
