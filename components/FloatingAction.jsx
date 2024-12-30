import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";

const FloatingButton = () => {
  const router = useRouter();
  const [icon_1] = useState(new Animated.Value(20));
  const [icon_2] = useState(new Animated.Value(20));
  const [icon_3] = useState(new Animated.Value(20));

  const [pop, setPop] = useState(false);

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 110,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 130,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 20,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 20,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 20,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Animated.View style={[styles.circle, { bottom: icon_1 }]}>
        <TouchableOpacity
          onPress={() => {
            router.push({ pathname: "/moodfood" });
          }}
        >
          <Icon name="wpexplorer" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, { bottom: icon_2, right: icon_2 }]}>
        <TouchableOpacity
          onPress={() => {
            router.push({ pathname: "/notification" });
          }}
        >
          <Icon name="wechat" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, { right: icon_3 }]}>
        <TouchableOpacity>
          <Icon name="share-alt" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => {
          pop === false ? popIn() : popOut();
        }}
      >
        <Icon name="plus" size={25} color="#FFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  circle: {
    backgroundColor: "#FE8A01",
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
