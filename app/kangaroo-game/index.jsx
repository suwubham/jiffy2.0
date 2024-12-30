import { Canvas, Fill, Rect, Text, matchFont, Image, useImage } from "@shopify/react-native-skia";
import { Pressable, View } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "expo-router";

function clamp(number, min, max) {
  return Math.max(Math.min(number, max), min);
}

function withinLane(x, lane) {
  return Math.abs((x + 25) - (50 + lane * 133)) < 25;
}

export default function KangarooCatch() {
  const fontStyle = {
    fontFamily: 'serif',
    fontSize: 30,
    fontWeight: 'bold',
  };
  const font = matchFont(fontStyle);

  const kangaroo = useImage(require('../../assets/sprites/kangaroo-katch/kangaroo.png'));
  const kangarooBoom = useImage(require('../../assets/sprites/kangaroo-katch/kangaroo-boom.png'));
  const leaf = useImage(require('../../assets/sprites/kangaroo-katch/falling-leaf.png'));
  const goldenLeaf = useImage(require('../../assets/sprites/kangaroo-katch/golden-leaf.png'));
  const bomb = useImage(require('../../assets/sprites/kangaroo-katch/bomb.png'));

  const [screenDims, setScreenDims] = useState({});

  const gameLoop = useRef(null);
  const previousTime = useRef(0);
  const playerLane = useRef(0);
  const timer = useRef(0);
  const spawnTimer = useRef(2000);
  const touchDisabled = useRef(false);
  const [score, setScore] = useState(0);
  const [state, setState] = useState('playing');

  const initialInteractables = [];
  const [interactables, setInteractables] = useState(initialInteractables);
  const [playerX, setPlayerX] = useState(0);

  useEffect(() => {
    gameLoop.current = requestAnimationFrame(loop);
  }, [interactables]);


  function handlePress(event) {
    if (touchDisabled.current) return;

    if (state === 'over') {
      resetGame();
      return;
    }

    // console.log(event.nativeEvent.locationX);
    if (event.nativeEvent.locationX < 205) {
      // Left side of screen tapped
      playerLane.current--;
    } else {
      playerLane.current++;
    }
    playerLane.current = clamp(playerLane.current, 0, 2);
    // console.log(playerLane.current);
  }

  function loop() {
    if (state === 'over') return;

    const now = performance.now();
    const deltaTime = now - previousTime.current;
    previousTime.current = now;

    timer.current += deltaTime;
    spawnTimer.current -= deltaTime;

    // let new_pos = playerX + deltaTime * playerLane.current;
    let targetPos = (50 + playerLane.current * 133) - 25;
    let newPos = playerX + (targetPos - playerX) * deltaTime / 80;

    setPlayerX(newPos);

    const rate = clamp(timer.current / 45000, 0.25, 1.5);
    let nextInteractables = interactables.map(e => {
      return {
        ...e,
        y: e.y + deltaTime * 1 * rate,
      }
    });
    
    nextInteractables = nextInteractables.filter(e => {
      // Remove if consumed
      if (withinLane(newPos, e.lane) && e.y < screenDims.height - 70 && e.y > screenDims.height - 135) {
        if (e.type === 2) {
          setState('over');
          touchDisabled.current = true;
          setTimeout(() => {touchDisabled.current = false}, 1000);
        } else {
          setScore(score + (e.type === 1 ? 5 : 1));
        }

        return false;
      }

      // Remove if out of screen
      return e.y < screenDims.height + 100;
    });

    if (spawnTimer.current < 0) {
      spawnTimer.current = 200 * 1/rate;
      nextInteractables.push({
        lane: Math.floor(Math.random() * 3),
        y: 0,

        // 0 - leaf, 1 - golden leaf, 2 - bomb
        // 15% of items are bombs, 10% of leaves are golden
        type: (Math.random() < 0.15) ? 2 : (Math.random() < 0.1 ? 1 : 0),
      });
    }

    // console.log(nextInteractables.length);

    setInteractables(nextInteractables);
  };

  function resetGame() {
    previousTime.current = performance.now();
    timer.current = 0;
    spawnTimer.current = 0 ;
    setInteractables(initialInteractables);
    setScore(0);
    setState('playing');
    playerLane.current = 1;
    setPlayerX(0);
    touchDisabled.current = false;
  }

  useFocusEffect(useCallback(() => {
    resetGame();
    return () => {
      if (gameLoop.current) {
        cancelAnimationFrame(gameLoop.current);
        gameLoop.current = null;
      }
    };
  }, []));

  return (
    <Pressable style={{ flex: 1 }} onPressIn={handlePress}>
        <View style={{ flex: 1 }}>
          <Canvas style={{ flex: 1 }} onLayout={(e) => {setScreenDims({width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height})}}>
            <Fill color="lightblue" />
            <Image image={state === 'over' ? kangarooBoom : kangaroo} x={playerX} y={screenDims.height - 125} width={100} height={100} />
            {interactables.map((e, i) => <Image key={i} x={50 + e.lane * 133} y={e.y} width={50} height={50} image={e.type === 2 ? bomb : e.type === 1 ? goldenLeaf : leaf} />)}
            <Text x={10} y={80} text={`Score: ${score}`} font={font} />
            <Text x={120} y={300} text={state === 'over' ? "Game Over" : ""} font={font} />
          </Canvas>
        </View>
    </Pressable>
  );
}
