import { Animated, StyleSheet, View, SafeAreaView, useAnimatedValue, Pressable, Easing } from 'react-native';
import Svg, { Polygon, Text } from 'react-native-svg';
import { Text as RNText } from 'react-native';
import { useState } from 'react';

export function WheelSpin() {
  const rotation = useAnimatedValue(0);
  let animating = false;
  const [superRotation, setSR] = useState(0);
  const [landed, setLanded] = useState(0);

  const rotate = () => {
    if (animating) return;
    /*
    let newRotation = Number(JSON.stringify(rotation)) + 40 + Math.random() * 20;
    // newRotation = 2.5 * delta;
    // newRotation = 0;
    setAngle(newRotation * 180 / Math.PI);
    
    setLanded(Math.ceil((newRotation + Math.PI * 1/2) / delta) % numSectors);
    */

    // Alternative: randomly pick sector and try landing there
    let newLanded = Math.floor(Math.random() * numSectors);
    setLanded(newLanded);
    let newRotation = newLanded * delta - Math.PI * 1/2;

    // Random offset within the sector
    newRotation -= Math.min(0.05 + Math.random(), 0.93) * delta;

    // Ensure it spins a lot
    setSR(superRotation + (Math.PI * 2 * Math.floor(15 + Math.random() * 10)));
    newRotation += superRotation;

    const animation = Animated.timing(rotation, {
      toValue: newRotation,
      easing: Easing.bezier(.17,-0.27,.06,1.07),
      duration: 7000,
      useNativeDriver: true,
    });

    animating = true;
    animation.start((res) => {
      animating = false;
    });
  };

  // map rotation in radians
  const rotateZ = rotation.interpolate({
    inputRange: [0, 2 * Math.PI],
    outputRange: ['0rad', '6.28319rad'], // 0 to 2π radians
  });

  // Points generation
  const numSectors = 12;
  const cx = 150, cy = 150;
  const r = 400;

  const triangles = [];
  const delta = (Math.PI * 2) / numSectors;

  let angle = 0;

  for (let i = 0; i < numSectors; i++) {
    let p1 = {
      x: cx + (r * Math.cos(angle)),
      y: cy - (r * Math.sin(angle))
    };

    let p2 = {
      x: cx + (r * Math.cos(angle + delta)),
      y: cy - (r * Math.sin(angle + delta))
    };

    triangles.push({
      points: `${cx},${cy} ${p1.x},${p1.y} ${p2.x},${p2.y}`,
      color:`${(angle + delta / 2) * 180 / Math.PI}`,
    });

    angle -= delta;
  }

  console.log(triangles);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.circleContainer} onPress={rotate}>
        <View style={styles.pointer} />
        <Animated.View style={[styles.circle, {transform: [{rotateZ}]}]}>
        <Svg style={styles.pizza}>
          {triangles.map((e, i) => <Polygon key={i} points={e.points} fill={`hsl(${e.color}, 80.00%, 50.00%)`} stroke="white" strokeWidth={2}/>)}
          {triangles.map((e, i) => <Text key={i} fontSize={20} x={40} y={7} fill="white" transform={`translate(${cx}, ${cy}) rotate(${e.color})`}>{`Bro ${i}`}</Text>)}
        </Svg>
        </Animated.View>
      </Pressable>
      <RNText style={styles.text}>Resulting spot: {landed}</RNText>
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
    backgroundColor: '#343a40',
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
    color: "white",
  }
});
