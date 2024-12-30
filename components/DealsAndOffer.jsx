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
    title: '50% Off Feast', 
    description: 'Dive into a world of flavors at half the price!', 
    image: 'https://www.foodpleasureandhealth.com/wp-content/uploads/2017/11/IMG_1847-1536x1024.jpg', 
    size: 'large',
    restaurant: 'The Gardens'
  },
  { 
    id: 2, 
    title: 'Free Delivery', 
    description: 'Dine in without stepping out! ', 
    image: 'https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/458498651_374898515664221_6842182959488944759_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=qqZ3PzzoitYQ7kNvgHxAjRv&_nc_oc=AdhL4m4UQlc6EBWPqOp8Q8pvDPYl4OVY-6dapw77YypmETcVmeJ6QZzvikOulbzl9Pk&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=AQ7N5PqpMkJ_7-oIZhAb0Eo&oh=00_AYA-yEEYYGOO8x1Vby2VOo1PcCN04gM91B1iX7Dv-eyc-g&oe=67780F57', 
    size: 'small',
    restaurant: 'Selected restaurants'
  },
  { 
    id: 3, 
    title: 'Buy 1 Get 1', 
    description: 'Double the delight at no extra cost!', 
    image: 'https://assets.winni.in/product/primary/2022/11/77690.jpeg?dpr=1&w=500', 
    size: 'small',
    restaurant: 'Nanglo Restaurant'
  },
  { 
    id: 4, 
    title: 'Happy Hour', 
    description: '20% off from 2-5 PM', 
    image: 'https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
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

