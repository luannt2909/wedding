from fastapi import FastAPI, HTTPException, Request
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

class GalleryImage(BaseModel):
    url: str
    caption: str

@app.get("/gallery/{type}")
def read_gallery_images(type: str, page: int = 1, pageSize: int = 12):
    # image_dir = Path(f"/var/www/images/{type}")
    # # image_dir = Path("/var/www/images/quang-ngai") / type
    # image_dir = Path(f"/Users/nguyentanluan/Downloads/pre-wedding")
    # image_path = type
    # if type == "tan-hon":
    #     image_dir = Path(f"/Users/nguyentanluan/Downloads/quang-ngai-v15")
    #     image_path = "tan-hon"
    # elif type == "pre-wedding":
    #     image_dir = Path(f"/Users/nguyentanluan/Downloads/pre-wedding")
    #     image_path = "pre-wedding"
    # elif type == "vu-quy":
    #     image_dir = Path(f"/Users/nguyentanluan/Downloads/vu-quy")
    #     image_path = "vu-quy"
    # elif type == "bao-hy":
    #     image_dir = Path(f"/Users/nguyentanluan/Downloads/album-Mau-Tuoi")
    #     image_path = "bao-hy"
    # else:
    #     raise HTTPException(status_code=404, detail=f"Gallery type {type} not found")
    
    image_dir = Path(f"/app/images/{type}")

    if not image_dir.exists():
        raise HTTPException(status_code=404, detail=f"Gallery type {type} not found")
        
    # Get all image files from directory
    image_files = []
    for ext in ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG']:
        image_files.extend(list(image_dir.glob(f'*{ext}')))
    
    # Sort by filename
    image_files.sort()
    
    # Calculate pagination
    start_idx = (page - 1) * pageSize
    end_idx = start_idx + pageSize
    page_images = image_files[start_idx:end_idx]
    
    # Convert to list of image objects
    images = []
    for img_path in page_images:
        images.append({
            "url": f"https://api.luananh-wedding.com/images/{type}/{img_path.name}",
            "caption": img_path.stem
        })
        
    return {"images": images}