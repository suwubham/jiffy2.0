import React, {  useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import Headline from "../../components/Headline";
import { supabase } from "../../utils/supabase";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({ progress, size = 48, strokeWidth = 4 }) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const startAnimation = () => {
    animatedProgress.setValue(0);
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  useFocusEffect(
    React.useCallback(() => {
      startAnimation();
      return () => {
      };
    }, [progress])
  );

  const progressOffset = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={[styles.circularContainer, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#E0E0E0"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <AnimatedCircle
          stroke="#4CAF50"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
    </View>
  );
};

export default function UserProfile() {
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const [achievements, setAchievements] = useState([]);

  const fetchAchievements = async () => {
    const { data, error } = await supabase.from("achievements").select();
    if (error) {
      console.error("Error fetching achievements:", error);
    } else {
      setAchievements(data);
    }
  };

  const startProgressAnimation = () => {
    progressAnimation.setValue(0);
    Animated.timing(progressAnimation, {
      toValue: 86.6,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  };

  useFocusEffect(
    React.useCallback(() => {
      startProgressAnimation();
      fetchAchievements();
      return () => {};
    }, [])
  );

  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.headlineContainer}>
        <Headline
          isPopupVisible={isPopupVisible}
          setIsPopupVisible={setIsPopupVisible}
        />
      </View>
      <ScrollView style={{ marginTop: 20 }}>
        <View style={styles.levelContainer}>
          <View style={styles.levelHeader}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelNumber}>2</Text>
            </View>
            <Text style={styles.levelText}>Level 2</Text>
          </View>
          <Text style={styles.pointsText}>500 Points to next level</Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    width: progressAnimation.interpolate({
                      inputRange: [0, 100],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
            <View style={styles.progressNumbers}>
              <Text style={styles.progressNumber}>2</Text>
              <Text style={styles.progressNumber}>5500/6000</Text>
              <Text style={styles.progressNumber}>3</Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.achievementsList}>
          {achievements.map((achievement) => (
            <TouchableOpacity key={achievement.id}>
              <View style={styles.achievementItem}>
                <View style={styles.achievementIconContainer}>
                  <CircularProgress progress={achievement.progress} />
                  <Image
                    source={{ uri: achievement.icon }}
                    style={styles.achievementIcon}
                  />
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>
                    {achievement.title}
                  </Text>
                  <Text style={styles.achievementDescription}>
                    {achievement.description}
                  </Text>
                </View>
                <Image
                  source={{ uri: achievement.medal }}
                  style={styles.medalIcon}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headlineContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: "#E0E0E0",
  },

  profileHeader: {
    alignItems: "center",
    paddingVertical: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
  },
  levelContainer: {
    padding: 16,
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  levelHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  levelBadge: {
    width: 24,
    height: 24,
    backgroundColor: "#000",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  levelNumber: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Montserrat_700Bold",
  },
  levelText: {
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
  },
  pointsText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontFamily: "Montserrat_500Medium",
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FFA726",
    borderRadius: 4,
  },
  progressNumbers: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  progressNumber: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Montserrat_500Medium",
  },
  achievementsList: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 10,
  },
  achievementItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  achievementIconContainer: {
    position: "relative",
    width: 48,
    height: 48,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  achievementIcon: {
    width: 30,
    height: 30,
    position: "absolute",
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
  },

  achievementDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
    fontFamily: "Montserrat_400Regular_Italic",
  },
  medalIcon: {
    width: 35,
    height: 35,
  },
  circularContainer: {
    position: "absolute",
  },
});
