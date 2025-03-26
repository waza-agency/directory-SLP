import os
import requests
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

def create_brand_images_bucket():
    """Create a storage bucket for brand images"""
    try:
        # List existing buckets
        buckets_response = supabase.storage.list_buckets().execute()
        print("Checking existing buckets...")
        
        # Check if bucket already exists
        bucket_exists = False
        if hasattr(buckets_response, 'data'):
            for bucket in buckets_response.data:
                if isinstance(bucket, dict) and bucket.get('name') == 'brand-images':
                    bucket_exists = True
                    break
                elif hasattr(bucket, 'name') and bucket.name == 'brand-images':
                    bucket_exists = True
                    break
        
        if bucket_exists:
            print("Bucket 'brand-images' already exists")
        else:
            # Create a new public bucket for brand images
            create_response = supabase.storage.create_bucket(
                "brand-images", 
                {"public": True}  # Make the bucket publicly accessible
            ).execute()
            print("Created new 'brand-images' bucket")
            print(f"Response: {create_response}")
            
            # Update bucket to be public
            update_response = supabase.storage.update_bucket(
                "brand-images", 
                {"public": True}
            ).execute()
            print("Updated bucket to be public")
        
        return True
    except Exception as e:
        print(f"Error creating storage bucket: {str(e)}")
        return False

def create_placeholder_image():
    """Create a simple placeholder image if it doesn't exist"""
    try:
        # Check if placeholder already exists
        try:
            # Try to get the file's metadata to check if it exists
            supabase.storage.from_("brand-images").get_public_url("placeholder.jpg")
            print("Placeholder image already exists")
            return True
        except Exception as e:
            print(f"Placeholder doesn't exist, creating one: {str(e)}")
            # Generate a simple placeholder image using a service
            placeholder_url = "https://via.placeholder.com/400x300/cccccc/333333?text=Brand"
            response = requests.get(placeholder_url)
            
            if response.status_code == 200:
                # Upload the placeholder image to Supabase storage
                upload_response = supabase.storage.from_("brand-images").upload(
                    file="placeholder.jpg",
                    data=response.content,
                    file_options={"content-type": "image/jpeg"}
                ).execute()
                
                print("Created and uploaded placeholder image")
                print(f"Upload response: {upload_response}")
                return True
            else:
                print(f"Failed to fetch placeholder image. Status: {response.status_code}")
                return False
    except Exception as e:
        print(f"Error creating placeholder image: {str(e)}")
        return False

def update_brands_with_storage_urls():
    """Update all brand records to use the Supabase storage URLs"""
    try:
        # Get the public URL for the placeholder image
        bucket_url = supabase.storage.from_("brand-images").get_public_url("placeholder.jpg")
        print(f"Placeholder URL: {bucket_url}")
        
        # Get all brands
        response = supabase.table("brands").select("*").execute()
        brands = response.data
        
        updated_count = 0
        for brand in brands:
            # Update image_url to use Supabase storage URL
            update_response = supabase.table("brands").update(
                {"image_url": bucket_url}
            ).eq("id", brand["id"]).execute()
            
            updated_count += 1
        
        print(f"Updated {updated_count} brands with the new storage URL")
        return True
    except Exception as e:
        print(f"Error updating brands: {str(e)}")
        return False

def main():
    """Main function to set up storage and update brand images"""
    print("Setting up Supabase storage for brand images...")
    
    # Step 1: Create the storage bucket
    if not create_brand_images_bucket():
        print("Failed to create storage bucket. Aborting.")
        return
    
    # Step 2: Create placeholder image
    if not create_placeholder_image():
        print("Failed to create placeholder image. Aborting.")
        return
    
    # Step 3: Update brand records
    if not update_brands_with_storage_urls():
        print("Failed to update brand records. Please check the error and try again.")
        return
    
    print("\nStorage setup complete!")
    print("You can now upload brand images to the 'brand-images' bucket in Supabase.")
    print("Use the following format for image URLs: <storage-url>/brand-images/<filename>")

if __name__ == "__main__":
    main() 