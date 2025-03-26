import os
from dotenv import load_dotenv
from supabase.client import create_client

# Load environment variables
load_dotenv()

# Get Supabase credentials
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")

if not supabase_url or not supabase_key:
    raise ValueError("Missing Supabase credentials. Please check your .env file.")

print(f"Initializing Supabase client with URL: {supabase_url}")
print(f"Using key: {supabase_key[:10]}...")  # Only print first 10 chars of key for security

# Initialize Supabase client
supabase = create_client(supabase_url, supabase_key)
print("Supabase client initialized successfully")

def update_brands_with_storage_url():
    """Update all brand records to use the Supabase storage URL"""
    # Get the storage URL from the user
    print("\nAfter creating the brand-images bucket and uploading a placeholder image,")
    print("you should have a URL for the placeholder image from Supabase Storage.")
    print("Example: https://example.supabase.co/storage/v1/object/public/brand-images/placeholder.jpg")
    
    storage_url = input("\nPlease paste the image URL here: ").strip()
    
    if not storage_url:
        print("Error: No URL provided. Exiting...")
        return
    
    if not (storage_url.startswith("http") and "storage" in storage_url):
        print("Warning: The URL doesn't seem to be a valid Supabase storage URL.")
        confirm = input("Do you want to continue anyway? (y/n): ").lower()
        if confirm != 'y':
            print("Operation cancelled. Exiting...")
            return
    
    try:
        # Get all brands
        response = supabase.table("brands").select("*").execute()
        brands = response.data
        
        if not brands:
            print("No brands found in the database!")
            return
        
        print(f"Found {len(brands)} brands to update.")
        confirm = input(f"This will update ALL brands with the image URL: {storage_url}\nContinue? (y/n): ").lower()
        
        if confirm != 'y':
            print("Operation cancelled. Exiting...")
            return
        
        # Update all brands
        updated_count = 0
        for brand in brands:
            print(f"Updating {brand['name']}...")
            update_response = supabase.table("brands").update(
                {"image_url": storage_url}
            ).eq("id", brand["id"]).execute()
            
            if update_response.data:
                updated_count += 1
        
        print(f"\nSuccessfully updated {updated_count} brands with the new image URL.")
        print("Your brand images should now be loading correctly from Supabase storage.")
        
    except Exception as e:
        print(f"Error updating brands: {str(e)}")

if __name__ == "__main__":
    update_brands_with_storage_url() 