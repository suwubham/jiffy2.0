import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const questions = [
  {
    text: "How would you describe your energy level today?",
    options: ["Energized", "Tired", "Somewhere in between"],
  },
  {
    text: "What’s the first thing that comes to mind when you think about how your day has been so far?",
    options: ["Productive", "Challenging", "Relaxing", "Stressful"],
  },
  {
    text: "Are you feeling more optimistic or stressed about the tasks ahead of you?",
    options: ["Optimistic", "Stressed", "Neutral"],
  },
  {
    text: "On a scale from 1 to 10, how content are you with your current situation?",
    options: [
      " 1-3 (Not content)",
      " 4-6 (Somewhat content)",
      "7-9 (Content)",
      "10 (Very content)",
    ],
  },
  {
    text: "Have you experienced any moments of joy or frustration today? If so, what triggered them?",
    options: [
      " Joy (e.g., accomplishment, surprise)",
      " Frustration (e.g., setbacks, delays)",
      "Neither",
    ],
  },
  {
    text: "Do you have any dietary restrictions or preferences?",
    options: [
      "Vegetarian  🥦",
      "Vegan  🥑",
      "Gluten-free 🍞🚫",
      "No restrictions  🍽️",
    ],
  },
  {
    text: "Anything further you wish to add?",
    isTextBox: true,
  },
];

const getFoodRecommendation = async (answers) => {
  const response = await fetch(
    "http://192.168.16.49:8000/get-food-suggestion",
    {
      method: "POST",
      body: JSON.stringify({ answers }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  function cleanAndParseJSON(apiResponse) {
    let cleanedResponse = apiResponse.replace(/\`\`\`json|\`\`\`/g, "");
    cleanedResponse = cleanedResponse.trim().replace(/\n/g, "");
    try {
      const parsedData = JSON.parse(cleanedResponse);
      return parsedData;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }

  const data = await response.json();
  const parsedData = cleanAndParseJSON(data.suggestion);
  return parsedData;
};

const FoodRecommendationScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [recommendation, setRecommendation] = useState(null);
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
    setTextInput("");
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4a90e2" />
          <Text style={styles.loadingText}>
            Getting your food recommendation...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (recommendation) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Your Food Recommendations</Text>
          <Text style={styles.greetingText}>{recommendation.greeting}</Text>
          {recommendation.recommendations.map((item, index) => (
            <View key={index} style={styles.recommendationItem}>
              <Image source={{ uri: item.image }} style={styles.foodImage} />
              <Text style={styles.dishName}>{item.dish_name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>Rs{item.price}</Text>
              <TouchableOpacity
                style={[styles.button, { marginTop: 10 }]}
                onPress={console.log("Add to Cart")}
              >
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ))}
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
        <Text style={styles.title}>Mood Anusar Ko Food</Text>
        <Text style={styles.subtitle}>An AI powered Food Recommender</Text>
        <Text style={styles.questionText}>
          {questions[currentQuestion].text}
        </Text>
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
        <Text style={styles.progressText}>
          Question {currentQuestion + 1} of {questions.length}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  scrollContent: {
    // flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    color: "#FE8A01",
    fontFamily: "Montserrat_900Black_Italic",
  },
  subtitle: {
    color: "#666",
    marginBottom: 20,
    fontSize: 12,
    fontFamily: "Montserrat_400Regular_Italic",
  },
  questionText: {
    marginTop: 150,
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#444",
    fontFamily: "Montserrat_500Medium",
  },
  button: {
    backgroundColor: "#FE8A01",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Montserrat_500Medium",
  },
  progressText: {
    marginTop: 20,
    textAlign: "center",
    color: "#666",
    fontFamily: "Montserrat_500Medium",
  },
  recommendationText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#4a90e2",
    fontFamily: "Montserrat_500Medium",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  greetingText: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
    color: "#444",
    fontFamily: "Montserrat_500Medium",
  },
  recommendationItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  foodImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  dishName: {
    fontSize: 20,
    marginBottom: 5,
    color: "#FE8A01",
    fontFamily: "Montserrat_700Bold",
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
    color: "#444",
    fontFamily: "Montserrat_500Medium",
  },
  price: {
    fontSize: 18,
    color: "#4a90e2",
    fontFamily: "Montserrat_600SemiBold",
  },
});

export default FoodRecommendationScreen;
