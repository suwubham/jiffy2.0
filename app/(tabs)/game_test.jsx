// import { Platform, useWindowDimensions } from 'react-native';
// import {
//   Canvas,
//   useImage,
//   useAnimatedImageValue,
//   Image,
//   Group,
//   Text,
//   matchFont,
// } from '@shopify/react-native-skia';
// import {
//   useSharedValue,
//   withTiming,
//   Easing,
//   withSequence,
//   useFrameCallback,
//   useDerivedValue,
//   interpolate,
//   Extrapolation,
//   useAnimatedReaction,
//   runOnJS,
//   cancelAnimation,
// } from 'react-native-reanimated';
// import { useEffect, useState } from 'react';
// import {
//   GestureHandlerRootView,
//   GestureDetector,
//   Gesture,
// } from 'react-native-gesture-handler';

// const GRAVITY = 1000;
// const JUMP_FORCE = -500;
// const HOUSE_WIDTH = 300;
// const HOUSE_HEIGHT = 300;
// const BANNER_HEIGHT = 50;
// const PIPE_WIDTH = 104;
// const PIPE_HEIGHT = 400;

// const App = () => {
//   const { width, height } = useWindowDimensions();
//   const [score, setScore] = useState(0);

//   // Load images
//   const bg = useImage(require('../../assets/flappy/background-day.png'));
//   const bird = useAnimatedImageValue(require('../../assets/flappy/dumpyou.gif'));
//   const pipeBottom = useImage(require('../../assets/flappy/pillar-top-final-new.png'));
//   const pipeTop = useImage(require('../../assets/flappy/pillar-bottom-final-new.png'));
//   const base = useImage(require('../../assets/flappy/base.png'));
//   const house = useImage(require('../../assets/flappy/house.png')); // Make sure you have these images
//   const banner = useImage(require('../../assets/flappy/banner.png'));

//   // Game state values
//   const gameOver = useSharedValue(false);
//   const pipeX = useSharedValue(width);
//   const birdY = useSharedValue(height / 3);
//   const birdX = width / 4;
//   const birdYVelocity = useSharedValue(0);
//   const pipeOffset = useSharedValue(0);

//   // House positions
//   const house1X = useSharedValue(width);
//   const house2X = useSharedValue(width + HOUSE_WIDTH + 200);
//   const parallaxOffset = useSharedValue(0);

//   const houseY = useDerivedValue(() => {
//     return height - HOUSE_HEIGHT - 75 + Math.sin(Date.now() / 1000) * 5;
//   });

//   const moveHouses = () => {
//     const duration = 8000;
    
//     const moveHouse = (houseX) => {
//       houseX.value = withSequence(
//         withTiming(-HOUSE_WIDTH, {
//           duration,
//           easing: Easing.linear,
//         }),
//         withTiming(width, { duration: 0 })
//       );
//     };

//     moveHouse(house1X);
//     setTimeout(() => moveHouse(house2X), duration / 2);
//   };

//   useEffect(() => {
//     moveHouses();
//     const interval = setInterval(moveHouses, 8000);
//     return () => clearInterval(interval);
//   }, []);

//   // Rest of your existing game logic (pipes, collision, etc.)
//   // ... (keep all the existing game logic)

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <GestureDetector gesture={gesture}>
//         <Canvas style={{ flex: 1 }}>
//           <Image image={bg} width={width} height={height} fit="cover" />

//           {/* Houses with banners */}
//           <Group>
//             <Image
//               image={house}
//               x={house1X}
//               y={houseY}
//               width={HOUSE_WIDTH}
//               height={HOUSE_HEIGHT}
//             />
//             <Image
//               image={banner}
//               x={house1X}
//               y={houseY - BANNER_HEIGHT}
//               width={HOUSE_WIDTH}
//               height={BANNER_HEIGHT}
//             />
//           </Group>
//           <Group>
//             <Image
//               image={house}
//               x={house2X}
//               y={houseY}
//               width={HOUSE_WIDTH}
//               height={HOUSE_HEIGHT}
//             />
//             <Image
//               image={banner}
//               x={house2X}
//               y={houseY - BANNER_HEIGHT}
//               width={HOUSE_WIDTH}
//               height={BANNER_HEIGHT}
//             />
//           </Group>

//           {/* Rest of your existing Canvas elements */}
//           {/* ... (keep all existing elements) */}
//         </Canvas>
//       </GestureDetector>
//     </GestureHandlerRootView>
//   );
// };

// export default App;