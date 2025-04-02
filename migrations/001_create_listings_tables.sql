-- Create enum types
CREATE TYPE listing_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE price_range AS ENUM ('$', '$$', '$$$', '$$$$');

-- Create businesses table
CREATE TABLE businesses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    facebook VARCHAR(255),
    instagram VARCHAR(255),
    opening_hours JSONB NOT NULL,
    amenities TEXT[] NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    price_range price_range,
    images TEXT[],
    status listing_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create service_providers table
CREATE TABLE service_providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    services TEXT[] NOT NULL,
    service_areas TEXT[] NOT NULL,
    languages TEXT[] NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    linkedin VARCHAR(255),
    qualifications TEXT NOT NULL,
    experience TEXT NOT NULL,
    availability JSONB NOT NULL,
    pricing TEXT NOT NULL,
    payment_methods TEXT[] NOT NULL,
    insurance TEXT,
    certifications TEXT[],
    profile_image TEXT,
    documents TEXT[],
    status listing_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX businesses_category_idx ON businesses(category);
CREATE INDEX businesses_city_idx ON businesses(city);
CREATE INDEX businesses_status_idx ON businesses(status);

CREATE INDEX service_providers_category_idx ON service_providers(category);
CREATE INDEX service_providers_city_idx ON service_providers(city);
CREATE INDEX service_providers_status_idx ON service_providers(status);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_businesses_updated_at
    BEFORE UPDATE ON businesses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_providers_updated_at
    BEFORE UPDATE ON service_providers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 