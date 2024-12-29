from fastapi import FastAPI
import random

app = FastAPI()

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

print(weighted_rewards)

@app.get("/spin-the-wheel")
def spin_the_wheel():
    selected_reward = random.choice(weighted_rewards)
    return {"reward": selected_reward}

