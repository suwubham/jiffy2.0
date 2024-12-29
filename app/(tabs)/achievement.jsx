import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Achievement = ({ icon, title, description, progress }) => (
  <View style={styles.achievementContainer}>
    <View style={styles.achievementIcon}>
      <MaterialCommunityIcons name={icon} size={24} color="#4CAF50" />
    </View>
    <View style={styles.achievementInfo}>
      <Text style={styles.achievementTitle}>{title}</Text>
      <Text style={styles.achievementDescription}>{description}</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressText}>{`${progress}% Complete`}</Text>
    </View>
  </View>
);

const AchievementsTab = () => {
  const achievements = [
    { icon: 'trophy', title: 'First Order', description: 'Order your first meal', progress: 100 },
    { icon: 'star', title: 'Rising Star', description: 'Reach level 10', progress: 60 },
    { icon: 'medal', title: 'Veteran', description: 'Play 100 games', progress: 45 },
    { icon: 'crown', title: 'Champion', description: 'Win 50 games', progress: 30 },
    { icon: 'fire', title: 'On Fire', description: 'Win 5 games in a row', progress: 0 },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Achievements</Text>
      {achievements.map((achievement, index) => (
        <Achievement key={index} {...achievement} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  achievementContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  achievementIcon: {
    marginRight: 16,
    justifyContent: 'center',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#888',
  },
});

export default AchievementsTab;