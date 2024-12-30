import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Avatar, { genConfig } from "@zamplyy/react-native-nice-avatar";

const AvatarSelection = () => {
  const config = genConfig({ sex: "male" });
  const [seed, setSeed] = useState("default");

  const regenerateAvatar = () => {
    setSeed(Math.random().toString(36).substring(7));
  };

  console.log(config);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Avatar</Text>

      <Avatar style={styles.avatar} {...config} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={regenerateAvatar}
          style={[styles.button, styles.regenerateButton]}
        >
          <Text style={styles.buttonText}>Regenerate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={regenerateAvatar}
          style={[styles.button, styles.chooseButton]}
        >
          <Text style={styles.buttonText}>Choose Avatar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AvatarSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#fe8a01",
    fontFamily: "Montserrat_900Black_Italic",
    marginBottom: 30,
    textAlign: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  regenerateButton: {
    backgroundColor: "#fe8a01",
  },
  chooseButton: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
