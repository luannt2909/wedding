from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import json
from pathlib import Path

# Initialize FastAPI app
app = FastAPI()
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, or specify a list like ["https://example.com"]
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)
# Define the data file path
DATA_FILE = Path("data/wishes.json")

# Define the model for a wedding wish
class WeddingWish(BaseModel):
    name: str
    title: str
    message: str
    created_at: str = None

# Utility to read wishes from the JSON file
def read_wishes():
    try:
        if DATA_FILE.exists():
            with open(DATA_FILE, "r") as f:
                return json.load(f)
        return []  # Return empty list if the file doesn't exist
    except Exception:
        return []  # Return empty list on error

# Utility to write wishes to the JSON file
def write_wishes(wishes):
    with open(DATA_FILE, "w") as f:
        json.dump(wishes, f, indent=4)

# Endpoint to get all wedding wishes
@app.get("/wishes")
def get_wishes():
    wishes = read_wishes()
    return {"wishes": wishes}

# Endpoint to add a new wedding wish
@app.post("/wishes")
def add_wish(wish: WeddingWish):
    wishes = read_wishes()
    # Add the current timestamp
    wish.created_at = datetime.utcnow().isoformat()
    wishes.append(wish.dict())
    write_wishes(wishes)
    return {"message": "Wish added successfully", "wish": wish}