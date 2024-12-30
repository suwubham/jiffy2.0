import { Animated, StyleSheet, View, SafeAreaView, useAnimatedValue, Pressable, Easing } from 'react-native';
import Svg, { Polygon, Text } from 'react-native-svg';
import { Text as RNText } from 'react-native';
import { useState, useRef } from 'react';

export function WheelSpin() {
  const rotation = useAnimatedValue(0);
  const animating = useRef(false);
  const superRotation = useRef(0);
  const [landed, setLanded] = useState(0);

  const rewards =  [
    "10% Off Coupon",
    "Nothing",
    "20% Off Coupon",
    "Free Delivery",
    "Buy 1 Get 1 Free",
    "Try Again",
    "50% Off Coupon",
    "Free Dessert",
  ];

  function createRotationAnimation(targetValue, pullBack = true) {
    let newRotation = targetValue * delta - Math.PI * 1/2;

    // Random offset within the sector
    newRotation -= Math.min(0.05 + Math.random(), 0.93) * delta;

    // Ensure it spins a lot
    superRotation.current += (Math.PI * 2 * Math.floor(15 + Math.random() * 10));
    newRotation += superRotation.current;

    const animation = Animated.timing(rotation, {
      toValue: newRotation,
      easing: pullBack ? Easing.bezier(.17,-0.27,.06,1.07) : Easing.bezier(.15,.41,.32,1.03),
      duration: 7000,
      useNativeDriver: true,
    });

    return animation;
  }

  const rotate = async () => {
    if (animating.current) return;
    animating.current = true;

    // Begin animation while we fetch from server
    const tempAnim = createRotationAnimation(0);
    tempAnim.start();

    const response = await fetch("http://jiffyv2.centralindia.cloudapp.azure.com/spin-the-wheel");
    const result = await response.json();
    let newLanded = rewards.findIndex((e) => e === result.reward);

    // Wait an additional second
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });

    setLanded(newLanded);

    // Begin the actual animation
    const animation = createRotationAnimation(newLanded, false);

    animation.start((res) => {
      animating.current = false;
    });
  };

  // map rotation in radians
  const rotateZ = rotation.interpolate({
    inputRange: [0, 2 * Math.PI],
    outputRange: ['0rad', '6.28319rad'], // 0 to 2π radians
  });

  // Points generation
  const numSectors = rewards.length;
  const cx = 150, cy = 150;
  const r = 400;

  const triangles = [];
  const delta = (Math.PI * 2) / numSectors;

  let angle = 0;

  for (let i = 0; i < numSectors; i++) {
    let p1 = {
      x: cx - (r * Math.cos(angle)),
      y: cy + (r * Math.sin(angle))
    };

    let p2 = {
      x: cx - (r * Math.cos(angle + delta)),
      y: cy + (r * Math.sin(angle + delta))
    };

    triangles.push({
      points: `${cx},${cy} ${p1.x},${p1.y} ${p2.x},${p2.y}`,
      rotation:`${(angle + delta / 2) * 180 / Math.PI}`,
    });

    angle -= delta;
  }

  // console.log(triangles);

  return (
    <SafeAreaView style={styles.container}>
      <RNText style={styles.text}>Wheel of Fortune</RNText>
      <Pressable style={styles.circleContainer} onPress={rotate}>
        <View style={styles.pointer} />
        <Animated.View style={[styles.circle, {transform: [{rotateZ}]}]}>
        <Svg style={styles.pizza}>
          {triangles.map((e, i) => <Polygon key={i} points={e.points} fill={/* rewards[i].color */ `hsl(${e.rotation}, 70%, 50%)`} stroke="hsl(194, 19.50%, 82.90%)" strokeWidth={2}/>)}
          {triangles.map((e, i) => <Text key={i} fontSize={Math.min(200 / rewards[i].length, 20)} x={40} y={7} fill="white" transform={`translate(${cx}, ${cy}) rotate(${e.rotation})`}>{`${rewards[i]}`}</Text>)}
        </Svg>
        </Animated.View>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150,
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: '#ced4da',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  circleContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointer: {
    width: 10,
    height: 30,
    backgroundColor: 'black',
    position: 'absolute',
    top: -15,
    borderWidth: 2,
    borderColor: 'white',
    zIndex: 6000,
  },
  pizza: {width: '100%', height: '100%'},
  text: {
    padding: 10,
    fontSize: 20,
    // color: "white",
  }
});
