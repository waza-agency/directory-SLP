# SLP Tundra - Potosino Brands Management System

This document outlines the dedicated Brands management system that has been implemented in the SLP Tundra website.

## Overview

The Potosino Brands feature allows showcasing local brands from San Luis Potosí with rich information about each brand, including:


- Name
- Category
- Year Founded
- Address and City
- Contact Information (Phone, Website, Instagram)
- Description
- Notable Products
- Where to Buy
- Brand Logo/Image

## Technical Implementation

### Database Structure

The system uses a dedicated `brands` table in Supabase with the following structure:

```sql
CREATE TABLE IF NOT EXISTS public.brands (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    category text NOT NULL,
    year_founded text,
    address text,
    city text,
    phone text,
    website text,
    instagram text,
    description text,
    notable_products text,
    where_to_buy text,
    image_url text,
    featured boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);
```

Row-Level Security (RLS) is configured to allow:
- Public read access
- Authenticated users can create, update, and delete records

### Admin Tool

A dedicated "Potosino Brands" tab in the admin tool provides an easy-to-use interface for managing brands:

1. The form includes fields for all brand details
2. Brand images are uploaded to Supabase storage
3. Brands can be marked as "featured" to appear on the homepage

### Frontend Implementation

The system provides several components for brand management:

1. **Brands API (`src/lib/brands.ts`)**
   - `getAllBrands()`: Fetches all brands
   - `getFeaturedBrands(limit)`: Fetches featured brands
   - `getBrandById(id)`: Fetches a single brand
   - `getBrandsByCategory(category)`: Fetches brands by category

2. **Brands Page (`src/pages/brands.tsx`)**
   - Displays all brands with filtering by category and search
   - Shows brand images, names, and descriptions in a grid

3. **Brand Detail Page (`src/pages/brands/[id].tsx`)**
   - Detailed view of a single brand with all information
   - Organized sections for brand details, products, locations, and contact info

4. **Homepage Featured Brands**
   - Displays up to 3 featured brands on the homepage

## Migration

To migrate existing brands from the previous implementation, a utility script `migrate_hardcoded_brands.py` has been created. This script:

1. Connects to the Supabase database
2. Takes the hardcoded sample brands
3. Inserts them into the Supabase brands table
4. Avoids duplicates by checking existing IDs

To run the migration:

```bash
python migrate_hardcoded_brands.py
```

## Advantages of the New System

1. **Better Data Organization**: Dedicated table with brand-specific fields
2. **Improved Admin Experience**: Dedicated form for brand management
3. **Cleaner Code**: Separation of concerns between places and brands
4. **Enhanced Brand Information**: Ability to add more detailed information like "Notable Products" and "Where to Buy"
5. **Consistent Data Source**: All brands are now stored in Supabase, eliminating the mix of hardcoded and database data

## Future Enhancements

Possible future enhancements to consider:

1. Brand categories management in the admin
2. Brand analytics tracking
3. Featured brands rotation system
4. Brand social media integration