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

def update_brand_image_paths():
    """Update all brand records to use local image paths"""
    try:
        # Get all brands
        response = supabase.table("brands").select("*").execute()
        brands = response.data
        
        if not brands:
            print("No brands found in the database!")
            return
        
        print(f"Found {len(brands)} brands to update.")
        
        # Create a mapping of possible brand identifiers to image paths
        brand_image_map = {
            # Original string IDs
            "chocolates-costanzo": "/images/brands/chocolates-costanzo.jpg",
            "quesos-carranco": "/images/brands/quesos-carranco.jpg",
            "cajeta-coronado": "/images/brands/cajeta-coronado.jpg",
            "bicicletas-mercurio": "/images/brands/bicicletas-mercurio.jpg",
            "canels": "/images/brands/canels.jpg",
            "ron-potosi": "/images/brands/ron-potosino.jpg",
            "las-sevillanas": "/images/brands/las-sevillanas.jpg",
            "productos-don-tacho": "/images/brands/productos-don-tacho.jpg",
            "brand-provi": "/images/brands/botanas-provi.jpg",
            "brand-superior": "/images/brands/panaderia-la-superior.jpg",
            "brand-lourdes": "/images/brands/aguas-de-lourdes.jpg",
            
            # Brand names
            "Chocolates Costanzo": "/images/brands/chocolates-costanzo.jpg",
            "Quesos Carranco": "/images/brands/quesos-carranco.jpg",
            "Cajeta Coronado": "/images/brands/cajeta-coronado.jpg",
            "Bicicletas Mercurio": "/images/brands/bicicletas-mercurio.jpg",
            "Canel's": "/images/brands/canels.jpg",
            "Ron Potosí": "/images/brands/ron-potosino.jpg",
            "Las Sevillanas": "/images/brands/las-sevillanas.jpg",
            "Productos Don Tacho": "/images/brands/productos-don-tacho.jpg",
            "Botanas Provi": "/images/brands/botanas-provi.jpg",
            "Panaderías La Superior": "/images/brands/panaderia-la-superior.jpg",
            "Aguas de Lourdes": "/images/brands/aguas-de-lourdes.jpg",
        }
        
        # Default path if no specific path is found
        default_path = "/images/placeholder.jpg"
        
        # Update brands with matching image paths
        updated_count = 0
        for brand in brands:
            brand_id = brand["id"]
            brand_name = brand["name"]
            
            # Try to find a matching image path
            image_path = None
            if brand_id in brand_image_map:
                image_path = brand_image_map[brand_id]
            elif brand_name in brand_image_map:
                image_path = brand_image_map[brand_name]
            else:
                # Create a slug from the brand name
                slug = brand_name.lower().replace(' ', '-').replace("'", '')
                if slug in brand_image_map:
                    image_path = brand_image_map[slug]
                else:
                    image_path = default_path
            
            print(f"Updating {brand_name} with image path: {image_path}")
            
            # Update the brand record
            update_response = supabase.table("brands").update(
                {"image_url": image_path}
            ).eq("id", brand_id).execute()
            
            if update_response.data:
                updated_count += 1
            
        print(f"\nSuccessfully updated {updated_count} brands with local image paths.")
        print("Place your images in the public/images/brands directory to match these paths.")
        
    except Exception as e:
        print(f"Error updating brands: {str(e)}")

if __name__ == "__main__":
    update_brand_image_paths() 