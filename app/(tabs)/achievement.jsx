import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const achievements = [
  {
    id: 1,
    title: 'Grill Guru',
    date: 'May 1, 2022',
    icon: require('../../assets/images/grill-icon.png'),
    medal: require('../../assets/images/gold-medal.png'),
  },
  {
    id: 2,
    title: 'Taste Explorer',
    date: 'May 1, 2022',
    icon: require('../../assets/images/taste-icon.png'),
    medal: require('../../assets/images/silver-medal.png'),
  },
  {
    id: 3,
    title: 'Sushi Samurai',
    date: 'May 1, 2022',
    icon: require('../../assets/images/sushi-icon.png'),
    medal: require('../../assets/images/bronze-medal.png'),
  },
  {
    id: 4,
    title: 'Pizza Prodigy',
    date: 'May 1, 2022',
    icon: require('../../assets/images/pizza-icon.png'),
    medal: require('../../assets/images/bronze-medal.png'),
  },
  {
    id: 5,
    title: 'Burger Beast',
    date: 'May 1, 2022',
    icon: require('../../assets/images/burger-icon.png'),
    medal: require('../../assets/images/bronze-medal.png'),
  },
  {
    id: 6,
    title: 'Momo Maniac',
    date: 'May 1, 2022',
    icon: require('../../assets/images/momo-icon.png'),
    medal: require('../../assets/images/bronze-medal.png'),
  },
  {
    id: 7,
    title: 'Pasta Perfectionist',
    date: 'May 1, 2022',
    icon: require('../../assets/images/pasta-icon.png'),
    medal: require('../../assets/images/bronze-medal.png'),
  },
];

export default function UserProfile() {
  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={require('../../assets/images/profile-image.png')}
          style={styles.profilePic}
        />
        <Text style={styles.userName}>New User</Text>
      </View>

      {/* Level Progress */}
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
            <View style={[styles.progressBar, { width: '86.6%' }]} />
          </View>
          <View style={styles.progressNumbers}>
            <Text style={styles.progressNumber}>2</Text>
            <Text style={styles.progressNumber}>5200/6000</Text>
            <Text style={styles.progressNumber}>3</Text>
          </View>
        </View>
      </View>

      {/* Achievements List */}
      <ScrollView style={styles.achievementsList}>
        {achievements.map((achievement) => (
          <View key={achievement.id} style={styles.achievementItem}>
            <Image source={achievement.icon} style={styles.achievementIcon} />
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDate}>{achievement.date}</Text>
            </View>
            <Image source={achievement.medal} style={styles.medalIcon} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  levelContainer: {
    padding: 15,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  levelBadge: {
    width: 24,
    height: 24,
    backgroundColor: '#000',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  levelNumber: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  levelText: {
    fontSize: 16,
    fontWeight: '600',
  },
  pointsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFA726',
    borderRadius: 4,
  },
  progressNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  progressNumber: {
    fontSize: 12,
    color: '#666',
  },
  achievementsList: {
    flex: 1,
    marginTop: 16,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  achievementIcon: {
    width: 30,
    height: 30,
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  achievementDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  medalIcon: {
    width: 30,
    height: 30,
  },
});