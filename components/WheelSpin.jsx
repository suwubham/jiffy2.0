import { Animated, StyleSheet, View, SafeAreaView, useAnimatedValue, Pressable, Easing} from 'react-native';

export function WheelSpin() {
  const rotation = useAnimatedValue(0);
  let animating = false;

  const rotate = () => {
    if (animating) return;
    
    let newRotation = Number(JSON.stringify(rotation)) + 7 + Math.random() * 4;

    const animation = Animated.timing(rotation, {
      toValue: newRotation,
      easing: Easing.bezier(.17,-0.27,.06,1.07),
      duration: 5000,
      useNativeDriver: true,
    });

    animating = true;
    animation.start((res) => {
      animating = false;
    });
  };

  // map rotation in radians
  const rotateZ = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0rad', '6.28319rad'], // 0 to 2π radians
  });

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.circleContainer} onPress={rotate}>
        <View style={styles.pointer} />
        <Animated.View style={[styles.circle, {transform: [{rotateZ}]}]}>
          <View style={styles.circleRow}>
            <View style={[styles.pizza, styles.pizzaRed]} />
            <View style={[styles.pizza, styles.pizzaBlue]} />
          </View>
          <View style={styles.circleRow}>
            <View style={[styles.pizza, styles.pizzaGreen]} />
            <View style={[styles.pizza, styles.pizzaYellow]} />
          </View>
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

  circleRow: {width: '100%', height: '50%', flexDirection: 'row'},
  pizza: {width: '50%', height: '100%'},
  pizzaRed: {backgroundColor: '#ce4257'},
  pizzaBlue: {backgroundColor: '#4361ee'},
  pizzaYellow: {backgroundColor: '#fee440'},
  pizzaGreen: {backgroundColor: '#06d6a0'},
});
