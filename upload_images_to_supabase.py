import os
import glob
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
    """Create a storage bucket for brand images if it doesn't exist"""
    try:
        # List existing buckets
        buckets_response = supabase.storage.list_buckets().execute()
        
        bucket_exists = False
        for bucket in buckets_response.data:
            if bucket.get('name') == 'brand-images':
                bucket_exists = True
                break
        
        if bucket_exists:
            print("Bucket 'brand-images' already exists")
        else:
            # Create a new public bucket for brand images
            supabase.storage.create_bucket(
                "brand-images", 
                {"public": True}  # Make the bucket publicly accessible
            ).execute()
            print("Created new 'brand-images' bucket")
            
            # Update bucket to be public
            supabase.storage.update_bucket(
                "brand-images", 
                {"public": True}
            ).execute()
            print("Updated bucket to be public")
        
        return True
    except Exception as e:
        print(f"Error creating storage bucket: {str(e)}")
        return False

def upload_images_from_directory():
    """Upload images from public/images/brands to Supabase storage"""
    local_dir = "public/images/brands/"
    image_paths = glob.glob(f"{local_dir}*.jpg") + glob.glob(f"{local_dir}*.jpeg") + glob.glob(f"{local_dir}*.png")
    
    if not image_paths:
        print(f"No image files found in {local_dir}")
        return False
    
    print(f"Found {len(image_paths)} images to upload:")
    for path in image_paths:
        print(f"  - {path}")
    
    print("\nUploading images to Supabase storage...")
    uploaded_count = 0
    uploaded_images = {}
    
    try:
        for image_path in image_paths:
            filename = os.path.basename(image_path)
            print(f"Uploading {filename}...")
            
            with open(image_path, 'rb') as f:
                file_content = f.read()
                
                # Determine content type based on file extension
                content_type = "image/jpeg"  # Default
                if filename.lower().endswith('.png'):
                    content_type = "image/png"
                
                # Upload the file to Supabase
                upload_response = supabase.storage.from_("brand-images").upload(
                    file=filename,
                    data=file_content,
                    file_options={"content-type": content_type}
                ).execute()
                
                if hasattr(upload_response, 'data'):
                    # Get the public URL
                    file_url = supabase.storage.from_("brand-images").get_public_url(filename)
                    uploaded_images[filename] = file_url
                    uploaded_count += 1
                    print(f"  ✓ Uploaded: {filename}")
                    print(f"    URL: {file_url}")
                else:
                    print(f"  ✗ Failed to upload: {filename}")
        
        print(f"\nSuccessfully uploaded {uploaded_count} out of {len(image_paths)} images.")
        return uploaded_images
    except Exception as e:
        print(f"Error uploading images: {str(e)}")
        return False

def update_brand_records_with_storage_urls(uploaded_images):
    """Update brand records to use the Supabase storage URLs"""
    if not uploaded_images:
        print("No uploaded images to update brand records with.")
        return False
    
    try:
        # Map filenames to their corresponding database field names
        filename_to_brand_map = {
            "botanas-provi.jpg": "Botanas Provi",
            "panaderia-la-superior.jpg": "Panaderías La Superior",
            "aguas-de-lourdes.jpg": "Aguas de Lourdes",
            "chocolates-costanzo.jpg": "Chocolates Costanzo",
            "quesos-carranco.jpg": "Quesos Carranco",
            "cajeta-coronado.jpg": "Cajeta Coronado",
            "bicicletas-mercurio.jpg": "Bicicletas Mercurio",
            "canels.jpg": "Canel's",
            "ron-potosino.jpg": "Ron Potosí",
            "las-sevillanas.jpg": "Las Sevillanas",
            "productos-don-tacho.jpg": "Productos Don Tacho"
        }
        
        # Get all brands
        response = supabase.table("brands").select("*").execute()
        brands = response.data
        
        if not brands:
            print("No brands found in the database!")
            return False
        
        print(f"\nUpdating {len(brands)} brand records with new image URLs...")
        
        # Update each brand with its corresponding image URL
        updated_count = 0
        for brand in brands:
            brand_name = brand["name"]
            brand_id = brand["id"]
            
            # Find matching filename for this brand
            matching_filename = None
            for filename, mapped_name in filename_to_brand_map.items():
                if mapped_name == brand_name:
                    matching_filename = filename
                    break
            
            if matching_filename and matching_filename in uploaded_images:
                # Use the Supabase storage URL
                image_url = uploaded_images[matching_filename]
                print(f"Updating {brand_name} with URL: {image_url}")
                
                # Update the brand record
                update_response = supabase.table("brands").update(
                    {"image_url": image_url}
                ).eq("id", brand_id).execute()
                
                if update_response.data:
                    updated_count += 1
            else:
                print(f"No matching image found for {brand_name}")
        
        print(f"\nSuccessfully updated {updated_count} brand records with Supabase storage URLs.")
        return True
    except Exception as e:
        print(f"Error updating brand records: {str(e)}")
        return False

def main():
    """Main function to upload images and update brand records"""
    print("Starting brand image upload to Supabase storage...")
    
    # Step 1: Create storage bucket if it doesn't exist
    if not create_brand_images_bucket():
        print("Failed to create storage bucket. Aborting.")
        return
    
    # Step 2: Upload images from local directory
    uploaded_images = upload_images_from_directory()
    if not uploaded_images:
        print("Failed to upload images. Aborting.")
        return
    
    # Step 3: Update brand records with storage URLs
    if not update_brand_records_with_storage_urls(uploaded_images):
        print("Failed to update brand records. Please check errors and try again.")
        return
    
    print("\nImage upload and database update completed successfully!")
    print("Your brand images are now stored in Supabase and linked to the brand records.")

if __name__ == "__main__":
    main() 