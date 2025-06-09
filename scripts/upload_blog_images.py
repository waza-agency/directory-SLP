#!/usr/bin/env python3
"""
Upload images to Supabase Storage bucket for blog posts.
Usage: python3 upload_blog_images.py <image_path> [image_name]
"""

import os
import sys
import requests
from pathlib import Path

# Supabase configuration
SUPABASE_URL = "https://omxporaecrqsqhzjzvnx.supabase.co"
BUCKET_NAME = "blog-images"

def get_supabase_key():
    """Get Supabase service role key from environment or prompt user."""
    key = os.getenv('SUPABASE_SERVICE_ROLE_KEY')
    if not key:
        print("Please set SUPABASE_SERVICE_ROLE_KEY environment variable")
        print("You can find this in your Supabase Dashboard > Settings > API")
        sys.exit(1)
    return key

def upload_image(image_path, image_name=None):
    """Upload an image to Supabase Storage."""
    if not image_name:
        image_name = Path(image_path).name

    # Ensure we have a clean filename
    image_name = image_name.replace(' ', '-').lower()

    try:
        with open(image_path, 'rb') as f:
            files = {'file': (image_name, f, 'image/jpeg')}

            headers = {
                'Authorization': f'Bearer {get_supabase_key()}',
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
        print(f"❌ File not found: {image_path}")
        return None
    except Exception as e:
        print(f"❌ Error uploading image: {str(e)}")
        return None

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 upload_blog_images.py <image_path> [image_name]")
        sys.exit(1)

    image_path = sys.argv[1]
    image_name = sys.argv[2] if len(sys.argv) > 2 else None

    print(f"🚀 Uploading {image_path} to Supabase Storage...")
    upload_image(image_path, image_name)

if __name__ == "__main__":
    main()