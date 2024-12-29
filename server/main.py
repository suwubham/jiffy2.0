from fastapi import FastAPI
import random
from openai import OpenAI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

client = OpenAI()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins. Replace "*" with a specific domain for security.
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

rewards = [
    {"reward": "10% Off Coupon", "probability": 0.3},
    {"reward": "20% Off Coupon", "probability": 0.2},
    {"reward": "Free Delivery", "probability": 0.15},
    {"reward": "Buy 1 Get 1 Free", "probability": 0.1},
    {"reward": "50% Off Coupon", "probability": 0.05},
    {"reward": "Free Dessert", "probability": 0.1},
    {"reward": "Try Again", "probability": 0.05},
    {"reward": "Nothing", "probability": 0.05},
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
        friendly and helpful in providing food recommendations to the person.
        Sweet options:
        Mango Lassi
        Gulab Jamun
        Fruit Salad with Honey
        Chocolate Lava Cake
        Savory Options:
        Chicken Biryani
        Paneer Butter Masala
        Hummus with Pita Bread
        Chicken Tikka Masala
        Spicy Options:
        Chili Paneer
        Spicy Veg Pakora
        Spicy Chicken Burger
        Spicy Tofu Stir-fry
        Indulgent Options:
        Cheese Pizza 
        Chicken Alfredo Pasta 
        Falafel with Tahini 
        Chocolate Mousse
        Using the above information, provide 3–5 specific food 
        recommendations that match the criteria. Act like you are talking to the person. Be friendly and helpful."""

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
                "content": f'How are you feeling right now? {answers[0]}, How kind of food are you in the mood for? {answers[1]},  Do you have any dietary restrictions or preferences? {answers[2]}, Do you have preference for cusine? {answers[3]}, Anything further you wish to add? {answers[4]}', 
            }
        ]
    )
    output = completion.choices[0].message.content
    return {"suggestion": output}

