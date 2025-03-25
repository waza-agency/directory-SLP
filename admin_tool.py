import tkinter as tk
from tkinter import ttk, messagebox
from supabase.client import create_client, Client
import os
from dotenv import load_dotenv
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
try:
    supabase: Client = create_client(supabase_url, supabase_key)
    print("Supabase client initialized successfully")
except Exception as e:
    print(f"Error initializing Supabase client: {str(e)}")
    raise

class AdminTool:
    def __init__(self, root):
        self.root = root
        self.root.title("SLP Directory Admin Tool")
        self.root.geometry("800x600")

        # Create notebook for tabs
        self.notebook = ttk.Notebook(root)
        self.notebook.pack(expand=True, fill='both', padx=10, pady=5)

        # Create tabs
        self.places_tab = ttk.Frame(self.notebook)
        self.events_tab = ttk.Frame(self.notebook)
        self.notebook.add(self.places_tab, text='Places')
        self.notebook.add(self.events_tab, text='Events')

        # Initialize place form
        self.init_place_form()
        # Initialize event form
        self.init_event_form()

    def init_place_form(self):
        # Place categories
        self.place_categories = [
            'service', 'other', 'food', 'beverages', 'sports-fitness',
            'outdoor-activities', 'private-dining-rooms', 'language-exchange-cafes',
            'family-activities', 'terraces', 'live-music'
        ]

        # Create form frame
        form_frame = ttk.LabelFrame(self.places_tab, text="Add New Place", padding="10")
        form_frame.pack(fill='x', padx=10, pady=5)

        # Name
        ttk.Label(form_frame, text="Name:").grid(row=0, column=0, sticky='w', pady=5)
        self.place_name = ttk.Entry(form_frame, width=50)
        self.place_name.grid(row=0, column=1, columnspan=2, sticky='w', pady=5)

        # Category
        ttk.Label(form_frame, text="Category:").grid(row=1, column=0, sticky='w', pady=5)
        self.place_category = ttk.Combobox(form_frame, values=self.place_categories, width=47)
        self.place_category.grid(row=1, column=1, columnspan=2, sticky='w', pady=5)

        # Address
        ttk.Label(form_frame, text="Address:").grid(row=2, column=0, sticky='w', pady=5)
        self.place_address = ttk.Entry(form_frame, width=50)
        self.place_address.grid(row=2, column=1, columnspan=2, sticky='w', pady=5)

        # City
        ttk.Label(form_frame, text="City:").grid(row=3, column=0, sticky='w', pady=5)
        self.place_city = ttk.Entry(form_frame, width=50)
        self.place_city.grid(row=3, column=1, columnspan=2, sticky='w', pady=5)

        # Phone
        ttk.Label(form_frame, text="Phone:").grid(row=4, column=0, sticky='w', pady=5)
        self.place_phone = ttk.Entry(form_frame, width=50)
        self.place_phone.grid(row=4, column=1, columnspan=2, sticky='w', pady=5)

        # Website
        ttk.Label(form_frame, text="Website:").grid(row=5, column=0, sticky='w', pady=5)
        self.place_website = ttk.Entry(form_frame, width=50)
        self.place_website.grid(row=5, column=1, columnspan=2, sticky='w', pady=5)

        # Instagram
        ttk.Label(form_frame, text="Instagram:").grid(row=6, column=0, sticky='w', pady=5)
        self.place_instagram = ttk.Entry(form_frame, width=50)
        self.place_instagram.grid(row=6, column=1, columnspan=2, sticky='w', pady=5)

        # Description
        ttk.Label(form_frame, text="Description:").grid(row=7, column=0, sticky='w', pady=5)
        self.place_description = tk.Text(form_frame, width=50, height=4)
        self.place_description.grid(row=7, column=1, columnspan=2, sticky='w', pady=5)

        # Image URL
        ttk.Label(form_frame, text="Image URL:").grid(row=8, column=0, sticky='w', pady=5)
        self.place_image_url = ttk.Entry(form_frame, width=50)
        self.place_image_url.grid(row=8, column=1, columnspan=2, sticky='w', pady=5)

        # Hours
        ttk.Label(form_frame, text="Hours:").grid(row=9, column=0, sticky='w', pady=5)
        self.place_hours = ttk.Entry(form_frame, width=50)
        self.place_hours.grid(row=9, column=1, columnspan=2, sticky='w', pady=5)

        # Featured checkbox
        self.place_featured = tk.BooleanVar()
        ttk.Checkbutton(form_frame, text="Featured", variable=self.place_featured).grid(row=10, column=1, sticky='w', pady=5)

        # Submit button
        ttk.Button(form_frame, text="Add Place", command=self.add_place).grid(row=11, column=0, columnspan=3, pady=20)

    def init_event_form(self):
        # Event categories
        self.event_categories = [
            'arts-culture', 'culinary', 'music', 'sports', 'traditional',
            'wellness', 'community-social'
        ]

        # Create form frame
        form_frame = ttk.LabelFrame(self.events_tab, text="Add New Event", padding="10")
        form_frame.pack(fill='x', padx=10, pady=5)

        # Title
        ttk.Label(form_frame, text="Title:").grid(row=0, column=0, sticky='w', pady=5)
        self.event_title = ttk.Entry(form_frame, width=50)
        self.event_title.grid(row=0, column=1, columnspan=2, sticky='w', pady=5)

        # Category
        ttk.Label(form_frame, text="Category:").grid(row=1, column=0, sticky='w', pady=5)
        self.event_category = ttk.Combobox(form_frame, values=self.event_categories, width=47)
        self.event_category.grid(row=1, column=1, columnspan=2, sticky='w', pady=5)

        # Description
        ttk.Label(form_frame, text="Description:").grid(row=2, column=0, sticky='w', pady=5)
        self.event_description = tk.Text(form_frame, width=50, height=4)
        self.event_description.grid(row=2, column=1, columnspan=2, sticky='w', pady=5)

        # Start Date
        ttk.Label(form_frame, text="Start Date (YYYY-MM-DD):").grid(row=3, column=0, sticky='w', pady=5)
        self.event_start_date = ttk.Entry(form_frame, width=50)
        self.event_start_date.grid(row=3, column=1, columnspan=2, sticky='w', pady=5)

        # End Date
        ttk.Label(form_frame, text="End Date (YYYY-MM-DD):").grid(row=4, column=0, sticky='w', pady=5)
        self.event_end_date = ttk.Entry(form_frame, width=50)
        self.event_end_date.grid(row=4, column=1, columnspan=2, sticky='w', pady=5)

        # Location
        ttk.Label(form_frame, text="Location:").grid(row=5, column=0, sticky='w', pady=5)
        self.event_location = ttk.Entry(form_frame, width=50)
        self.event_location.grid(row=5, column=1, columnspan=2, sticky='w', pady=5)

        # Image URL
        ttk.Label(form_frame, text="Image URL:").grid(row=6, column=0, sticky='w', pady=5)
        self.event_image_url = ttk.Entry(form_frame, width=50)
        self.event_image_url.grid(row=6, column=1, columnspan=2, sticky='w', pady=5)

        # Featured checkbox
        self.event_featured = tk.BooleanVar()
        ttk.Checkbutton(form_frame, text="Featured", variable=self.event_featured).grid(row=7, column=1, sticky='w', pady=5)

        # Submit button
        ttk.Button(form_frame, text="Add Event", command=self.add_event).grid(row=8, column=0, columnspan=3, pady=20)

    def add_place(self):
        try:
            data = {
                'name': self.place_name.get(),
                'category': self.place_category.get(),
                'address': self.place_address.get(),
                'city': self.place_city.get(),
                'phone': self.place_phone.get(),
                'website': self.place_website.get(),
                'instagram': self.place_instagram.get(),
                'description': self.place_description.get('1.0', 'end-1c'),
                'image_url': self.place_image_url.get(),
                'hours': self.place_hours.get(),
                'featured': self.place_featured.get()
            }

            # Validate required fields
            if not data['name'] or not data['category'] or not data['address']:
                messagebox.showerror("Error", "Name, category, and address are required fields!")
                return

            # Insert into database
            result = supabase.table('places').insert(data).execute()
            
            if result.data:
                messagebox.showinfo("Success", "Place added successfully!")
                self.clear_place_form()
            else:
                messagebox.showerror("Error", "Failed to add place")

        except Exception as e:
            messagebox.showerror("Error", f"An error occurred: {str(e)}")

    def add_event(self):
        try:
            # Validate dates
            try:
                start_date = datetime.strptime(self.event_start_date.get(), '%Y-%m-%d')
                end_date = datetime.strptime(self.event_end_date.get(), '%Y-%m-%d')
            except ValueError:
                messagebox.showerror("Error", "Invalid date format. Please use YYYY-MM-DD")
                return

            data = {
                'title': self.event_title.get(),
                'category': self.event_category.get(),
                'description': self.event_description.get('1.0', 'end-1c'),
                'start_date': start_date.isoformat(),
                'end_date': end_date.isoformat(),
                'location': self.event_location.get(),
                'image_url': self.event_image_url.get(),
                'featured': self.event_featured.get()
            }

            # Validate required fields
            if not data['title'] or not data['category'] or not data['start_date'] or not data['end_date'] or not data['location']:
                messagebox.showerror("Error", "Title, category, dates, and location are required fields!")
                return

            # Insert into database
            result = supabase.table('events').insert(data).execute()
            
            if result.data:
                messagebox.showinfo("Success", "Event added successfully!")
                self.clear_event_form()
            else:
                messagebox.showerror("Error", "Failed to add event")

        except Exception as e:
            messagebox.showerror("Error", f"An error occurred: {str(e)}")

    def clear_place_form(self):
        self.place_name.delete(0, 'end')
        self.place_category.set('')
        self.place_address.delete(0, 'end')
        self.place_city.delete(0, 'end')
        self.place_phone.delete(0, 'end')
        self.place_website.delete(0, 'end')
        self.place_instagram.delete(0, 'end')
        self.place_description.delete('1.0', 'end')
        self.place_image_url.delete(0, 'end')
        self.place_hours.delete(0, 'end')
        self.place_featured.set(False)

    def clear_event_form(self):
        self.event_title.delete(0, 'end')
        self.event_category.set('')
        self.event_description.delete('1.0', 'end')
        self.event_start_date.delete(0, 'end')
        self.event_end_date.delete(0, 'end')
        self.event_location.delete(0, 'end')
        self.event_image_url.delete(0, 'end')
        self.event_featured.set(False)

if __name__ == "__main__":
    root = tk.Tk()
    app = AdminTool(root)
    root.mainloop() 