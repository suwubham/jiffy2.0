import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const questions = [
  {
    text: "How are you feeling right now?",
    options: ["Happy", "Sad", "Stressed", "Relaxed", "Energetic", "Tired"],
  },
  {
    text: "What kind of food are you in the mood for?",
    options: ["Sweet", "Savory", "Spicy", "Indulgent", "Refreshing"],
  },
  {
    text: "Do you have any dietary restrictions or preferences?",
    options: ["Vegetarian", "Vegan", "Gluten-free", "No restrictions"],
  },
  {
    text: "Do you have a preference for cuisine?",
    options: ["Indian", "Mexican", "Thai", "Chinese", "No preference"],
  },
  {
    text: "Anything further you wish to add?",
    isTextBox: true,
  },
];

const getFoodRecommendation = async (answers) => {
  const response = await fetch("http://192.168.16.49:8000/get-food-suggestion", {
    method: "POST",
    body: JSON.stringify({ answers }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data.suggestion);

  return data.suggestion;
};

const FoodRecommendationScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [recommendation, setRecommendation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswer = async (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsLoading(true);
      try {
        const recommendedFoods = await getFoodRecommendation(newAnswers);
        setRecommendation(recommendedFoods);
      } catch (error) {
        console.error("Error fetching recommendation:", error);
        setRecommendation(["Error fetching recommendation. Please try again."]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTextSubmit = async () => {
    const newAnswers = [...answers, textInput];
    setAnswers(newAnswers);
    setIsLoading(true);

    try {
      const recommendedFoods = await getFoodRecommendation(newAnswers);
      setRecommendation(recommendedFoods);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setRecommendation(["Error fetching recommendation. Please try again."]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setRecommendation([]);
    setTextInput('');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4a90e2" />
          <Text style={styles.loadingText}>Getting your food recommendation...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (recommendation.length > 0) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Your Food Recommendations</Text>
          <Text style={styles.recommendationText}>{recommendation}</Text>
          <TouchableOpacity style={styles.button} onPress={resetQuiz}>
            <Text style={styles.buttonText}>Start Over</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>AI Food Recommender</Text>
        <Text style={styles.questionText}>{questions[currentQuestion].text}</Text>
        {questions[currentQuestion].isTextBox ? (
          <View>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your comments here..."
              value={textInput}
              onChangeText={setTextInput}
              multiline
            />
            <TouchableOpacity style={styles.button} onPress={handleTextSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.buttonText}>{option}</Text>
            </TouchableOpacity>
          ))
        )}
        <Text style={styles.progressText}>Question {currentQuestion + 1} of {questions.length}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 28,
    fontWeight: "400",
    color: "#FE8A01",
    fontFamily: "Montserrat_900Black_Italic",
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#444',
    fontFamily: "Montserrat_500Medium"
  },
  button: {
    backgroundColor: '#FE8A01',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: "Montserrat_500Medium"
  },
  progressText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
        fontFamily: "Montserrat_500Medium"
  },
  recommendationText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#4a90e2',
    fontFamily: "Montserrat_500Medium"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default FoodRecommendationScreen;

