import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get('window');
const padding = 16;
const gridWidth = width - padding * 2;
const itemMargin = 8;
const smallItemSize = (gridWidth - itemMargin) / 2;
const largeItemSize = gridWidth;

const deals = [
  { 
    id: 1, 
    title: '50% Off', 
    description: 'On your first order', 
    image: 'https://res.cloudinary.com/dckl9mhbs/image/upload/v1735465522/50-percent-off_nj4uf3.jpg', 
    size: 'large',
    restaurant: 'The Gardens'
  },
  { 
    id: 2, 
    title: 'Free Delivery', 
    description: 'On orders above $20', 
    image: 'https://res.cloudinary.com/dckl9mhbs/image/upload/v1735465522/free-delivery_nj4uf3.jpg', 
    size: 'small',
    restaurant: 'KFC'
  },
  { 
    id: 3, 
    title: 'Buy 1 Get 1', 
    description: 'On selected items', 
    image: 'https://res.cloudinary.com/dckl9mhbs/image/upload/v1735465522/buy-1-get-1_nj4uf3.jpg', 
    size: 'small',
    restaurant: 'Chiya Maya'
  },
  { 
    id: 4, 
    title: 'Happy Hour', 
    description: '20% off from 2-5 PM', 
    image: 'https://res.cloudinary.com/dckl9mhbs/image/upload/v1735465522/happy-hour_nj4uf3.jpg', 
    size: 'large',
    restaurant: 'Trisara'
  },
];

const DealsAndOffers = () => {
  return (
    <View style={styles.container}>
      {deals.map((deal) => (
        <TouchableOpacity 
          key={deal.id} 
          style={[
            styles.dealItem,
            deal.size === 'large' ? styles.largeItem : styles.smallItem
          ]}
        >
          <Image source={{ uri: deal.image }} style={styles.dealImage} />
          <View style={styles.dealInfo}>
            <Text style={styles.dealTitle}>{deal.title}</Text>
            <Text style={styles.dealDescription}>{deal.description}</Text>
            <View style={styles.restaurantInfo}>
              <Ionicons name="restaurant-outline" size={14} color="#666" />
              <Text style={styles.restaurantName}>{deal.restaurant}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: padding,
  },
  dealItem: {
    marginBottom: itemMargin,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  smallItem: {
    width: smallItemSize,
    height: smallItemSize * 1.2,
  },
  largeItem: {
    width: largeItemSize,
    height: smallItemSize,
  },
  dealImage: {
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
  },
  dealInfo: {
    padding: 12,
    height: '50%',
    justifyContent: 'space-between',
  },
  dealTitle: {
    fontSize: 16,
    marginBottom: 2,
    fontFamily: 'Montserrat_700Bold',
  },
  dealDescription: {
    fontSize: 12,
    fontFamily: 'Montserrat_600SemiBold_Italic',
    color: '#666',
    marginBottom: 4,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantName: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Montserrat_500Medium',
    marginLeft: 4,
  },
});

export default DealsAndOffers;

