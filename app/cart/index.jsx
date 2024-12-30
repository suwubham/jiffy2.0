import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { supabase } from "../../utils/supabase"; 
const menuItems = [
    {
      id: 1,
      name: "Chicken Biryani",
      price: 300,
      description: "Spiced rice with mixed vegetables",
      image:
        "https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg", // Added image URL
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
      name: "Cheese Pizza",
      price: 550,
      description: "Cheesy, crispy crust pizza delight",
      image:
        "https://www.recipetineats.com/tachyon/2023/05/Garlic-cheese-pizza_9.jpg?resize=900%2C1125&zoom=1", // Added image URL
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

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const { data, error } = await supabase
        .from('cart')
        .select('cart')
        .single();

      if (error) throw error;

      if (data && data.cart) {
        const parsedCart = JSON.parse(data.cart);
        setCartItems(parsedCart);
        calculateTotal(parsedCart);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const calculateTotal = (cart) => {
    let total = 0;
    Object.entries(cart).forEach(([itemId, quantity]) => {
      const item = menuItems.find(item => item.id === parseInt(itemId));
      if (item) {
        total += item.price * quantity;
      }
    });
    setTotalAmount(total);
  };

  const renderCartItems = () => {
    return Object.entries(cartItems).map(([itemId, quantity]) => {
      const item = menuItems.find(item => item.id === parseInt(itemId));
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
    // Implement your checkout logic here
    console.log('Proceeding to payment...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <ScrollView style={styles.cartList}>
        {renderCartItems()}
      </ScrollView>
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartList: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  itemName: {
    flex: 2,
    fontSize: 16,
  },
  itemQuantity: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
  itemPrice: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

