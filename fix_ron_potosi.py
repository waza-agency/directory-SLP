import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get Supabase credentials
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")

if not supabase_url or not supabase_key:
    raise ValueError("Missing Supabase credentials. Please check your .env file.")

# Setup headers for API requests
headers = {
    "apikey": supabase_key,
    "Authorization": f"Bearer {supabase_key}"
}

def fix_ron_potosi_image():
    """Fix the Ron Potosí image URL in the database"""
    try:
        # First, get the Ron Potosí brand
        response = requests.get(
            f"{supabase_url}/rest/v1/brands?name=eq.Ron%20Potos%C3%AD&select=*",
            headers=headers
        )
        
        if response.status_code != 200:
            print(f"Failed to fetch Ron Potosí brand: {response.text}")
            return False
            
        brands = response.json()
        
        if not brands:
            print("Ron Potosí brand not found!")
            return False
        
        brand = brands[0]
        brand_id = brand.get("id", "")
        
        if not brand_id:
            print("Could not get brand ID!")
            return False
            
        # Use the correct image URL
        image_url = f"{supabase_url}/storage/v1/object/public/brand-images/ron-potosi.jpg"
        print(f"Updating Ron Potosí (ID: {brand_id}) with URL: {image_url}")
        
        # Update the brand record
        update_response = requests.patch(
            f"{supabase_url}/rest/v1/brands?id=eq.{brand_id}",
            headers={
                **headers,
                "Content-Type": "application/json",
                "Prefer": "return=minimal"
            },
            json={"image_url": image_url}
        )
        
        if update_response.status_code == 204:  # No content means success
            print("Successfully updated Ron Potosí brand with new image URL.")
            return True
        else:
            print(f"Failed to update Ron Potosí: {update_response.text}")
            return False
            
    except Exception as e:
        print(f"Error fixing Ron Potosí image: {str(e)}")
        return False

if __name__ == "__main__":
    fix_ron_potosi_image() 