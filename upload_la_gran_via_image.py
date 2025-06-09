#!/usr/bin/env python3
"""
Upload La Gran Vía blog image to Supabase Storage
"""

import os
import sys
import requests
import shutil
from pathlib import Path

# Supabase configuration
SUPABASE_URL = "https://omxporaecrqsqhzjzvnx.supabase.co"
BUCKET_NAME = "blog-images"

def get_supabase_key():
    """Get Supabase service role key from environment."""
    key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
    if not key:
        print("❌ Please set SUPABASE_SERVICE_ROLE_KEY environment variable")
        print("You can find this in your Supabase Dashboard > Settings > API")
        return None
    return key

def upload_la_gran_via_image():
    """Upload restaurant image for La Gran Vía blog post."""

    # Use the traditional restaurants image - perfect for Spanish cuisine
    source_image = "public/images/restaurants-and-bars/traditional-restaurants.jpg"
    image_name = "la-gran-via-restaurant.jpg"

    key = get_supabase_key()
    if not key:
        return None

    try:
        print(f"🚀 Uploading {source_image} as {image_name}...")

        with open(source_image, 'rb') as f:
            files = {'file': (image_name, f, 'image/jpeg')}

            headers = {
                'Authorization': f'Bearer {key}',
            }

            url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET_NAME}/{image_name}"

            response = requests.post(url, files=files, headers=headers)

            if response.status_code == 200:
                public_url = f"{SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}/{image_name}"
                print(f"✅ Image uploaded successfully!")
                print(f"📁 File: {image_name}")
                print(f"🔗 Public URL: {public_url}")
                return public_url
            else:
                print(f"❌ Upload failed: {response.status_code}")
                print(f"Response: {response.text}")
                return None

    except FileNotFoundError:
        print(f"❌ File not found: {source_image}")
        return None
    except Exception as e:
        print(f"❌ Error uploading image: {str(e)}")
        return None

if __name__ == "__main__":
    print("🍽️ Uploading La Gran Vía blog image...")
    public_url = upload_la_gran_via_image()

    if public_url:
        print("\n📝 Next steps:")
        print("1. Update the blog post to use this new image URL")
        print("2. Update the database with the new image URL")
        print("3. Test that the image loads correctly")
        print(f"4. New image URL: {public_url}")
    else:
        print("\n❌ Upload failed. Please check your configuration and try again.")