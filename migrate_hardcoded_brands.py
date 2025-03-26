import os
import uuid
from dotenv import load_dotenv
from supabase.client import create_client
from datetime import datetime

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

# Current timestamp for created_at and updated_at
timestamp = datetime.now().isoformat()

# Map to store original ID to UUID mapping for reference
id_mapping = {}

# Hardcoded sample brands to migrate
sample_brands = [
  {
    "name": "Botanas Provi",
    "category": "food",
    "address": "Centro Histórico, San Luis Potosí",
    "city": "San Luis Potosí",
    "description": "Traditional Mexican snacks and treats made with authentic recipes passed down through generations.",
    "notable_products": "Chicharrones, cacahuates, dulces típicos",
    "where_to_buy": "Tiendas de abarrotes en SLP, mercado República",
    "image_url": "/images/placeholder.jpg",
    "featured": True,
    "created_at": timestamp,
    "updated_at": timestamp
  },
  {
    "name": "Panaderías La Superior",
    "category": "food",
    "address": "Av. Carranza 150, Centro",
    "city": "San Luis Potosí",
    "description": "Artisanal bakery offering fresh bread, pastries, and traditional Mexican baked goods since 1950.",
    "notable_products": "Pan dulce, conchas, birotes",
    "where_to_buy": "Sucursales en toda la ciudad",
    "image_url": "/images/placeholder.jpg",
    "featured": True,
    "created_at": timestamp,
    "updated_at": timestamp
  },
  {
    "name": "Aguas de Lourdes",
    "category": "beverages",
    "address": "Calle Universidad 205",
    "city": "San Luis Potosí",
    "description": "Refreshing traditional Mexican aguas frescas and beverages made with natural ingredients.",
    "notable_products": "Agua de jamaica, horchata, limón con chía",
    "where_to_buy": "Puestos en el centro, mercados locales",
    "image_url": "/images/placeholder.jpg",
    "featured": True,
    "created_at": timestamp,
    "updated_at": timestamp
  },
  {
    "name": "Chocolates Costanzo",
    "category": "food",
    "address": "San Luis Potosí",
    "city": "San Luis Potosí",
    "description": "Artisanal chocolate factory producing fine Mexican chocolates and traditional sweets with authentic Potosino recipes.",
    "notable_products": "Chocolates, dulces tradicionales, bombones",
    "where_to_buy": "Tiendas de dulces, mercados",
    "image_url": "/images/placeholder.jpg",
    "featured": True,
    "created_at": timestamp,
    "updated_at": timestamp
  },
  {
    "name": "Quesos Carranco",
    "category": "food",
    "address": "San Luis Potosí",
    "city": "San Luis Potosí",
    "description": "Premium cheese producer creating artisanal and aged cheeses using traditional methods and local milk.",
    "notable_products": "Queso fresco, queso añejo, queso asadero",
    "where_to_buy": "Mercado República, supermercados locales",
    "image_url": "/images/placeholder.jpg",
    "featured": True,
    "created_at": timestamp,
    "updated_at": timestamp
  },
  {
    "name": "Cajeta Coronado",
    "category": "food",
    "address": "San Luis Potosí",
    "city": "San Luis Potosí",
    "description": "Makers of the famous Potosino caramel spread made from goat's milk, following century-old recipes.",
    "notable_products": "Cajeta envinada, cajeta quemada, cajeta de vainilla",
    "where_to_buy": "Supermercados, tiendas de abarrotes",
    "image_url": "/images/placeholder.jpg",
    "featured": True,
    "created_at": timestamp,
    "updated_at": timestamp
  },
  {
    "name": "Bicicletas Mercurio",
    "category": "automotive",
    "address": "San Luis Potosí",
    "city": "San Luis Potosí",
    "description": "Historic bicycle manufacturer producing quality bicycles for Mexican families since 1949.",
    "notable_products": "Bicicletas urbanas, bicicletas de montaña, bicicletas para niños",
    "where_to_buy": "Tiendas deportivas, distribuidores autorizados",
    "image_url": "/images/placeholder.jpg",
    "featured": True,
    "created_at": timestamp,
    "updated_at": timestamp
  },
  {
    "name": "Canel's",
    "category": "food",
    "address": "San Luis Potosí",
    "city": "San Luis Potosí",
    "description": "Famous candy and chewing gum brand known for their colorful packaging and traditional Mexican flavors.",
    "notable_products": "Chicles, caramelos, dulces tradicionales",
    "where_to_buy": "Tiendas de conveniencia, supermercados",
    "image_url": "/images/placeholder.jpg",
    "featured": True,
    "created_at": timestamp,
    "updated_at": timestamp
  },
  {
    "name": "Ron Potosí",
    "category": "beverages",
    "address": "San Luis Potosí",
    "city": "San Luis Potosí",
    "description": "Distillery producing fine rum with a distinctive Potosino character and smooth finish.",
    "notable_products": "Ron añejo, ron blanco, ron con sabores",
    "where_to_buy": "Licorerías, supermercados",
    "image_url": "/images/placeholder.jpg",
    "featured": True,
    "created_at": timestamp,
    "updated_at": timestamp
  },
  {
    "name": "Las Sevillanas",
    "category": "food",
    "address": "San Luis Potosí",
    "city": "San Luis Potosí",
    "description": "Traditional bakery specializing in regional pastries and cookies that reflect Potosino culinary heritage.",
    "notable_products": "Empanadas, turrón, rosquillas",
    "where_to_buy": "Tiendas de la marca, mercados locales",
    "image_url": "/images/placeholder.jpg",
    "featured": True,
    "created_at": timestamp,
    "updated_at": timestamp
  },
  {
    "name": "Productos Don Tacho",
    "category": "food",
    "address": "San Luis Potosí",
    "city": "San Luis Potosí",
    "description": "Producer of authentic regional foods including traditional mole, salsas, and dried chiles.",
    "notable_products": "Mole potosino, salsas, chiles secos",
    "where_to_buy": "Mercados locales, tiendas de abarrotes",
    "image_url": "/images/placeholder.jpg",
    "featured": True,
    "created_at": timestamp,
    "updated_at": timestamp
  }
]

# Original ID mapping for reference
original_ids = [
    "brand-provi",
    "brand-superior",
    "brand-lourdes",
    "chocolates-costanzo",
    "quesos-carranco",
    "cajeta-coronado",
    "bicicletas-mercurio",
    "canels",
    "ron-potosi",
    "las-sevillanas",
    "productos-don-tacho"
]

def migrate_brands():
    """Migrate hardcoded brands to Supabase brands table"""
    print(f"Starting migration of {len(sample_brands)} brands to Supabase...")
    
    # Store id mappings for reference
    with open("brand_id_mapping.txt", "w") as f:
        f.write("Original ID -> Supabase UUID\n")
        f.write("---------------------------\n")
    
    # Migrate each brand with a proper UUID
    for i, brand in enumerate(sample_brands):
        try:
            print(f"Adding brand: {brand['name']}...")
            # Let Supabase generate the UUID by not providing one
            result = supabase.table('brands').insert(brand).execute()
            
            if result.data:
                new_id = result.data[0]['id']
                print(f"Successfully added {brand['name']} with ID: {new_id}")
                
                # Save the mapping for reference
                with open("brand_id_mapping.txt", "a") as f:
                    f.write(f"{original_ids[i]} -> {new_id}\n")
            else:
                print(f"Failed to add {brand['name']}")
        except Exception as e:
            print(f"Error adding {brand['name']}: {str(e)}")
    
    print("Migration completed. Check brand_id_mapping.txt for ID mappings.")

if __name__ == "__main__":
    migrate_brands() 