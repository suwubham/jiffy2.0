import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';

const AvatarSelection = () => {
  const [avatar, setAvatar] = useState('https://via.placeholder.com/150'); // Replace with initial avatar URL

  const regenerateAvatar = () => {
    // Logic to regenerate avatar (placeholder for now)
    const randomAvatar = `https://api.dicebear.com/6.x/adventurer/svg?seed=${Math.random()}`;
    setAvatar(randomAvatar);
  };

  const saveAvatar = () => {
    // Logic to save the selected avatar
    alert('Avatar saved!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Avatar</Text>
      <Text style={styles.subtitle}>Choose your avatar or click "Regenerate" for a new one.</Text>

      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <TouchableOpacity onPress={regenerateAvatar} style={styles.regenerateButton}>
          <Text style={styles.regenerateText}>⟳</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveAvatar}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  regenerateButton: {
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
  },
  regenerateText: {
    fontSize: 18,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 25,
    elevation: 3,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AvatarSelection;
