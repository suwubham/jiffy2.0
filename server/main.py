from fastapi import FastAPI
import random
from openai import OpenAI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=openai_api_key)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

rewards = [
    {"reward": "10% Off Coupon", "probability": 0.3},
    {"reward": "20% Off Coupon", "probability": 0.2},
    {"reward": "Free Delivery", "probability": 0.15},
    {"reward": "Buy 1 Get 1 Free", "probability": 0.1},
    {"reward": "50% Off Coupon", "probability": 0.01},
    {"reward": "Free Dessert", "probability": 0.1},
    {"reward": "Try Again", "probability": 0.05},
    {"reward": "Nothing", "probability": 0.09},
]

weighted_rewards = [
    reward["reward"] for reward in rewards for _ in range(int(reward["probability"] * 100))
]

@app.get("/spin-the-wheel")
def spin_the_wheel():
    selected_reward = random.choice(weighted_rewards)
    return {"reward": selected_reward}

prompt = """You are a food recommendation assistant.
        Carefully review each of the questions and answers and based on the menu below, I want you to be 
        friendly and helpful in providing food recommendations to the person. Heavily use the context provided.
{
    id: 1,
    name: "Pepperoni Pizza",
    price: 550,
    description: "Cheesy, crispy, Meaty crust pizza delight",
    image:
      "https://riotfest.org/wp-content/uploads/2016/10/IMG_0545-768x574.jpg",
    arurl: "https://jiffy-ar.glitch.me/#pepperoni-small",
  }
  {
    id: 2,
    name: "Paneer Butter Masala",
    price: 250,
    description: "Creamy curry with soft paneer",
    image:
      "https://platetopalateblog.com/wp-content/uploads/2020/07/20200506_131905-1152x1536.jpg", // Added image URL
  },
  {
    id: 3,
    name: "Hummus with Pita Bread",
    price: 450,
    description: "Creamy dip with warm pita",
    image:
      "https://thefoodiediaries.co/wp-content/uploads/2021/03/img_8477_jpg-1.jpg", // Added image URL
  },
  {
    id: 4,
    name: "Chicken Tikka Masala",
    price: 400,
    description: "Grilled chicken in creamy sauce",
    image:
      "https://www.seriouseats.com/thmb/AKv7r-Xt2anoVvsn0WpLqUehNzU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/chicken-tikka-masala-for-the-grill-recipe-hero-2_1-cb493f49e30140efbffec162d5f2d1d7.JPG", // Added image URL
  },
  {
    id: 5,
    name: "Chili Paneer",
    price: 300,
    description: "Spicy stir-fried paneer cubes",
    image:
      "https://www.cookwithmanali.com/wp-content/uploads/2016/01/Chilli-Paneer-Restaurant-Style-768x1164.jpg", // Added image URL
  },
  {
    id: 6,
    name: "Spicy Veg Pakora",
    price: 150,
    description: "Fried vegetable fritters with spice",
    image:
      "https://www.recipetineats.com/tachyon/2021/05/Pakora_1.jpg?resize=900%2C1260&zoom=1", // Added image URL
  },
  {
    id: 7,
    name: "Spicy Chicken Burger",
    price: 550,
    description: "Crispy chicken with fiery flavors",
    image:
      "https://mccormick.widen.net/content/rjkpycitj4/jpeg/caramelised_nashville_cauliflower_burger_800x800.jpg?crop=true&anchor=0,0&q=80&color=ffffff00&u=eelhgb&w=800&h=800", // Added image URL
  },
  {
    id: 8,
    name: "Spicy Tofu Stir-fry",
    price: 250,
    description: "Tofu with bold spicy flavors",
    image:
      "https://thewoksoflife.com/wp-content/uploads/2021/03/spicy-garlic-tofu-12.jpg", // Added image URL
  },
  {
    id: 9,
    name: "Caesar Salad",
    price: 230,
    description: "Fresh salad with Caesar dressing",
    image:
      "https://itsavegworldafterall.com/wp-content/uploads/2023/04/Avocado-Caesar-Salad-1.jpg", // Added image URL
  },
  {
    id: 10,
    name: "Chicken Biryani",
    price: 300,
    description: "Spiced rice with mixed vegetables",
    image:
      "https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg", // Added image URL
  },
  {
    id: 11,
    name: "Chicken Alfredo Pasta",
    price: 420,
    description: "Creamy pasta with grilled chicken",
    image:
      "https://assets.epicurious.com/photos/5988e3458e3ab375fe3c0caf/1:1/w_2240,c_limit/How-to-Make-Chicken-Alfredo-Pasta-hero-02082017.jpg", // Added image URL
  },
  {
    id: 12,
    name: "Falafel with Tahini",
    price: 330,
    description: "Crispy chickpea balls with sauce",
    image:
      "https://simmerandsauce.com/wp-content/uploads/2020/04/fullsizeoutput_1ffe0-768x533.jpeg", // Added image URL
  },
        Using the above information, provide 3–5 specific food 
        recommendations that match the criteria. Act like you are talking to the person. Analyze the mood and talk about it. Be friendly and helpful. Generate the entire response in JSON. Include greeting, dish_name, price, description and image as keys."""

class FoodSuggestionRequest(BaseModel):
    answers: list[str]
    
@app.post("/get-food-suggestion")
def get_food_suggestion(request : dict):
    answers = request["answers"]
    print(answers)
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "developer", "content": prompt},
            {
                "role": "user",
                "content": f'How would you describe your energy level today?? {answers[0]}, What’s the first thing that comes to mind when you think about how your day has been so far? {answers[1]}, Are you feeling more optimistic or stressed about the tasks ahead of you? {answers[2]}, On a scale from 1 to 10, how content are you with your current situation? {answers[3]}, Have you experienced any moments of joy or frustration today? If so, what triggered them?{answers[4]}, Do you have any dietary restrictions or preferences? {answers[5]}, Anything else you would like to share? {answers[6]}', 
            }
        ]
    )
    output = completion.choices[0].message.content
    return {"suggestion": output}
