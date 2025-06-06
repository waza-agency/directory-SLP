-- First, clear the sample posts we inserted earlier
DELETE FROM public.blog_posts WHERE slug IN ('welcome-to-san-luis-way', 'exploring-cultural-heritage', 'best-local-food-experiences');

-- Insert your actual blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, category, status, published_at, image_url) VALUES

-- San Luis Rey Tranvia Blog Post
(
    'San Luis Rey: The Perfect Way to Discover Our Historic City',
    'san-luis-rey-tranvia',
    'Discover San Luis Potosí''s historic center aboard San Luis Rey''s traditional trolley tours. Daily departures, expert guides, and unforgettable experiences through our UNESCO World Heritage city.',
    '<div class="bg-yellow-50 p-6 rounded-lg mb-8">
        <h2 class="text-xl font-semibold mb-4">Tour Information</h2>
        <ul class="list-disc pl-6">
            <li><a href="#about">About San Luis Rey</a></li>
            <li><a href="#experience">Tour Experience</a></li>
            <li><a href="#schedule">Schedule & Pricing</a></li>
            <li><a href="#route">Tour Route</a></li>
            <li><a href="#booking">How to Book</a></li>
        </ul>
    </div>

    <section id="about">
        <h2>About San Luis Rey Tourist Trolley</h2>
        <p>San Luis Rey offers the most comprehensive and enjoyable way to explore San Luis Potosí''s historic center. Our traditional trolley tours combine comfort, convenience, and expert guidance to help you discover the rich history and cultural heritage of our UNESCO World Heritage city.</p>

        <div class="bg-gray-50 p-6 rounded-lg my-6">
            <h3 class="font-semibold mb-4">Why Choose San Luis Rey?</h3>
            <ul class="list-disc pl-6">
                <li>Expert guides with deep knowledge of local history and culture</li>
                <li>Comfortable, traditional-style trolley cars</li>
                <li>Convenient daily schedule with frequent departures</li>
                <li>Comprehensive tour of the historic center''s main attractions</li>
            </ul>
        </div>
    </section>

    <section id="experience">
        <h2>Tour Experience</h2>
        <div class="mb-8 border-l-4 border-blue-500 pl-4">
            <h3 class="font-semibold mb-2">Convenient Schedule</h3>
            <ul class="list-disc pl-6">
                <li>Daily tours from Monday to Sunday</li>
                <li>Operating hours: 10:00 AM to 7:30 PM</li>
                <li>Departures every 25 minutes</li>
                <li>Starting point: Jardín de San Juan de Dios</li>
            </ul>
        </div>

        <div class="mb-8 border-l-4 border-blue-500 pl-4">
            <h3 class="font-semibold mb-2">Accessible Pricing</h3>
            <ul class="list-disc pl-6">
                <li>Adults: $120 MXN</li>
                <li>Children and INAPAM: $100 MXN</li>
                <li>Tickets available directly at the trolleys</li>
                <li>No advance booking required</li>
            </ul>
        </div>

        <div class="mb-8 border-l-4 border-blue-500 pl-4">
            <h3 class="font-semibold mb-2">Tour Experience</h3>
            <ul class="list-disc pl-6">
                <li>Professional tour guides</li>
                <li>Historical and cultural commentary</li>
                <li>Comfortable trolley cars</li>
                <li>UNESCO World Heritage site exploration</li>
            </ul>
        </div>
    </section>

    <section id="schedule">
        <h2>Schedule & Pricing</h2>
        <div class="bg-blue-50 p-6 rounded-lg my-6">
            <h3 class="font-semibold mb-4">Operating Hours</h3>
            <p>We operate daily from Monday to Sunday, with tours running from 10:00 AM to 7:30 PM. Trolleys depart every 25 minutes from our main station at Jardín de San Juan de Dios, ensuring you can start your tour at a time that suits your schedule.</p>
            <div class="mt-4">
                <h4 class="font-medium mb-2">Ticket Prices:</h4>
                <ul class="list-disc pl-6">
                    <li>Adults: $120 MXN per person</li>
                    <li>Children and INAPAM cardholders: $100 MXN per person</li>
                </ul>
            </div>
        </div>
    </section>

    <section id="route">
        <h2>Tour Route & Attractions</h2>
        <p>Our carefully planned route takes you through the most significant landmarks and historic sites of San Luis Potosí''s UNESCO World Heritage center. The tour includes major plazas, historic buildings, churches, and cultural institutions that tell the story of our city''s rich heritage.</p>
    </section>

    <section id="certifications" class="my-8">
        <h2>Quality & Recognition</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="border rounded-lg p-4">
                <h3 class="font-semibold mb-2">Secretaría de Turismo</h3>
                <p class="text-sm text-gray-600">Official recognition from Mexico''s Tourism Ministry</p>
            </div>
            <div class="border rounded-lg p-4">
                <h3 class="font-semibold mb-2">Distintivo M</h3>
                <p class="text-sm text-gray-600">Quality and service excellence certification</p>
            </div>
            <div class="border rounded-lg p-4">
                <h3 class="font-semibold mb-2">Ciudad Patrimonio</h3>
                <p class="text-sm text-gray-600">UNESCO World Heritage Site approved service provider</p>
            </div>
        </div>
    </section>

    <section id="booking" class="bg-gray-50 p-6 rounded-lg mt-8">
        <h2>Start Your Journey</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 class="font-semibold mb-2">How to Book</h3>
                <p>No advance booking is required! Simply visit our main station at Jardín de San Juan de Dios and purchase your tickets directly at the trolley. Our friendly staff will be happy to assist you and answer any questions.</p>
            </div>
            <div>
                <h3 class="font-semibold mb-2">Contact Information</h3>
                <p>For more information about our tours or special group rates, please contact us through our website or visit us at Jardín de San Juan de Dios.</p>
            </div>
        </div>
    </section>',
    'Tours',
    'published',
    '2024-03-20T00:00:00Z',
    '/images/tours/tranvia-san-luis-rey.jpg'
),

-- La Gran Via Blog Post
(
    'La Gran Vía: A Legacy of Spanish Cuisine in San Luis Potosí',
    'la-gran-via',
    'Experience over 36 years of Spanish culinary tradition at La Gran Vía, one of Mexico''s 100 must-visit restaurants. Discover authentic Spanish cuisine with a local twist in San Luis Potosí.',
    '<div class="bg-yellow-50 p-6 rounded-lg mb-8">
        <h2 class="text-xl font-semibold mb-4">Discover La Gran Vía</h2>
        <ul class="list-disc pl-6">
            <li><a href="#history">Our History</a></li>
            <li><a href="#cuisine">Culinary Excellence</a></li>
            <li><a href="#specialties">Our Specialties</a></li>
            <li><a href="#recognition">Awards & Recognition</a></li>
            <li><a href="#visit">Visit Us</a></li>
        </ul>
    </div>

    <section id="history">
        <h2>Our History</h2>
        <p>Founded in 1979, La Gran Vía has been a cornerstone of Spanish cuisine in San Luis Potosí for over 36 years. Our journey began with a passion for authentic Spanish gastronomy and has evolved into a culinary institution that perfectly balances tradition with innovation.</p>
        <p>Through decades of dedication to culinary excellence, we have earned our place in the hearts and palates of our guests, becoming one of the most respected Spanish restaurants in the region.</p>
    </section>

    <section id="cuisine">
        <h2>Culinary Excellence</h2>
        <p>At La Gran Vía, we maintain an unwavering commitment to quality and authenticity. Our kitchen combines original Spanish recipes with carefully selected local ingredients, creating a unique fusion of Mediterranean flavors and the rich culinary heritage of San Luis Potosí''s highlands.</p>

        <div class="bg-gray-50 p-6 rounded-lg my-6">
            <h3 class="font-semibold mb-4">Our Commitment</h3>
            <ul class="list-disc pl-6">
                <li>Fresh, high-quality ingredients in every dish</li>
                <li>Authentic Spanish recipes with local influences</li>
                <li>Carefully curated wine selection</li>
                <li>Exceptional dining experience</li>
            </ul>
        </div>
    </section>

    <section id="specialties">
        <h2>Our Specialties</h2>
        <div class="mb-8 border-l-4 border-blue-500 pl-4">
            <h3 class="font-semibold mb-2">Spanish Cuisine</h3>
            <p class="mb-4">Authentic Spanish recipes that showcase the best of Mediterranean flavors</p>
            <ul class="list-disc pl-6">
                <li>Traditional paellas</li>
                <li>Regional Spanish specialties</li>
                <li>Mediterranean-inspired dishes</li>
            </ul>
        </div>

        <div class="mb-8 border-l-4 border-blue-500 pl-4">
            <h3 class="font-semibold mb-2">Local Fusion</h3>
            <p class="mb-4">Creative combinations of Spanish cuisine with San Luis Potosí flavors</p>
            <ul class="list-disc pl-6">
                <li>Regional adaptations</li>
                <li>Local ingredient specialties</li>
                <li>Unique fusion dishes</li>
            </ul>
        </div>

        <div class="mb-8 border-l-4 border-blue-500 pl-4">
            <h3 class="font-semibold mb-2">Wine Selection</h3>
            <p class="mb-4">Carefully curated wine list to complement your dining experience</p>
            <ul class="list-disc pl-6">
                <li>Spanish wines</li>
                <li>International varieties</li>
                <li>Perfect pairings</li>
            </ul>
        </div>
    </section>

    <section id="recognition">
        <h2>Awards & Recognition</h2>
        <div class="bg-blue-50 p-6 rounded-lg my-6">
            <h3 class="font-semibold mb-4">100 Must-Visit Places in Mexico</h3>
            <p>In 2017, La Gran Vía received the prestigious recognition of being named one of the 100 must-visit places in Mexico in the gastronomy category, a testament to our commitment to culinary excellence and exceptional dining experiences.</p>
        </div>
    </section>

    <section id="visit" class="bg-gray-50 p-6 rounded-lg mt-8">
        <h2>Visit Us</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 class="font-semibold mb-2">Location & Contact</h3>
                <ul class="mt-4 space-y-2">
                    <li><strong>Address:</strong> Av. Venustiano Carranza #560, 78233 San Luis Potosí</li>
                    <li><strong>Phone:</strong> 444 812 2899</li>
                    <li><strong>Email:</strong> contacto@lagranviaslp.com</li>
                </ul>
            </div>
            <div>
                <h3 class="font-semibold mb-2">Experience La Gran Vía</h3>
                <p>We invite you to experience the finest Spanish cuisine in San Luis Potosí. Each visit promises a unique gastronomic journey that will delight your palate and create lasting memories.</p>
            </div>
        </div>
    </section>',
    'Restaurants',
    'published',
    '2024-03-20T00:00:00Z',
    '/images/restaurants-and-bars/la-gran-via.jpg'
),

-- Corazon de Xoconostle Blog Post
(
    'Corazón de Xoconostle: Your Gateway to Adventure in San Luis Potosí',
    'corazon-de-xoconostle',
    'Discover San Luis Potosí''s premier adventure travel company offering guided tours, outdoor experiences, and unforgettable journeys through Mexico''s most stunning landscapes.',
    '<div class="bg-yellow-50 p-6 rounded-lg mb-8">
        <h2 class="text-xl font-semibold mb-4">In This Guide</h2>
        <ul class="list-disc pl-6">
            <li><a href="#about">About Corazón de Xoconostle</a></li>
            <li><a href="#destinations">Featured Destinations</a></li>
            <li><a href="#experiences">Upcoming Experiences</a></li>
            <li><a href="#expertise">Our Expertise</a></li>
            <li><a href="#booking">How to Book</a></li>
        </ul>
    </div>

    <section id="about">
        <h2>About Corazón de Xoconostle</h2>
        <p>Founded in 2014, Corazón de Xoconostle has grown from a local hospitality project into San Luis Potosí''s premier adventure travel company. With a decade of experience, our certified guides and travel experts specialize in creating unforgettable outdoor experiences that combine adventure, culture, and natural beauty.</p>
        <p>Our passion for nature, outdoor activities like climbing and hiking, and our deep connection to local culture drives us to showcase the incredible richness of our region''s natural and cultural heritage.</p>
    </section>

    <section id="destinations">
        <h2>Featured Destinations</h2>
        <div class="mb-8 bg-gray-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">Real de Catorce</h3>
            <p class="mb-4">A magical town in the Sierra del Altiplano Potosino, famous for its cobblestone streets and rich mining history.</p>
            <div>
                <h4 class="font-medium mb-2">Popular Activities:</h4>
                <ul class="list-disc pl-6">
                    <li>4x4 Willy Tours</li>
                    <li>Cultural Walks</li>
                    <li>Historical Sites</li>
                </ul>
            </div>
        </div>

        <div class="mb-8 bg-gray-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">Huasteca Potosina</h3>
            <p class="mb-4">A natural paradise with stunning waterfalls, rivers, and lush landscapes.</p>
            <div>
                <h4 class="font-medium mb-2">Popular Activities:</h4>
                <ul class="list-disc pl-6">
                    <li>Tamul Waterfall</li>
                    <li>Rappelling</li>
                    <li>River Activities</li>
                </ul>
            </div>
        </div>

        <div class="mb-8 bg-gray-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold mb-4">Sierra de San Miguelito</h3>
            <p class="mb-4">Beautiful mountain range perfect for hiking and outdoor adventures.</p>
            <div>
                <h4 class="font-medium mb-2">Popular Activities:</h4>
                <ul class="list-disc pl-6">
                    <li>Hiking</li>
                    <li>Rock Climbing</li>
                    <li>Mountain Biking</li>
                </ul>
            </div>
        </div>
    </section>

    <section id="experiences">
        <h2>Upcoming Experiences for 2025</h2>
        <p class="mb-6">Join us for carefully curated adventures that combine outdoor activities with unique cultural experiences. Our 2025 calendar features exciting destinations both within Mexico and internationally.</p>

        <div class="mb-6 border-l-4 border-blue-500 pl-4">
            <h3 class="font-semibold">Picacho de Bernalejo + Casa Fronda</h3>
            <p class="text-gray-600">February 15, 2025 | Day Trip</p>
            <p>Hiking adventure combined with wine tasting experience</p>
        </div>

        <div class="mb-6 border-l-4 border-blue-500 pl-4">
            <h3 class="font-semibold">Trek Nevado de Toluca to Valle de Bravo</h3>
            <p class="text-gray-600">March 7-9, 2025 | Multi-day Adventure</p>
            <p>40km trek through stunning landscapes</p>
        </div>

        <div class="mb-6 border-l-4 border-blue-500 pl-4">
            <h3 class="font-semibold">Sótano del Cepillo Rappelling</h3>
            <p class="text-gray-600">March 21-23, 2025 | Technical Adventure</p>
            <p>Descend into a 160-meter deep natural pit</p>
        </div>

        <div class="bg-blue-50 p-6 rounded-lg my-6">
            <h3 class="font-semibold mb-4">More Adventures Await</h3>
            <p>Our full 2025 calendar includes treks in Guatemala, Peru, and various locations throughout Mexico. Visit our website or contact us to learn about all available experiences.</p>
        </div>
    </section>

    <section id="expertise">
        <h2>Our Expertise</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div class="border rounded-lg p-4">
                <h3 class="font-semibold mb-2">Certified Guides</h3>
                <p>All our guides are certified under NOM-09-TUR-2002 standards</p>
            </div>
            <div class="border rounded-lg p-4">
                <h3 class="font-semibold mb-2">Traveler Insurance</h3>
                <p>Comprehensive coverage for peace of mind during your adventures</p>
            </div>
            <div class="border rounded-lg p-4">
                <h3 class="font-semibold mb-2">Custom Experiences</h3>
                <p>Tailored adventures designed to match your interests and skill level</p>
            </div>
            <div class="border rounded-lg p-4">
                <h3 class="font-semibold mb-2">Transportation</h3>
                <p>Comfortable and safe transportation throughout your journey</p>
            </div>
        </div>
    </section>

    <section id="booking" class="bg-gray-50 p-6 rounded-lg mt-8">
        <h2>Start Your Adventure</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 class="font-semibold mb-2">Contact Information</h3>
                <p>Visit us at our office in San Luis Potosí''s historic center or reach out through our various channels:</p>
                <ul class="mt-4 space-y-2">
                    <li><strong>Address:</strong> Independencia 1585, Barrio de San Miguelito</li>
                    <li><strong>WhatsApp:</strong> +52 1 444 657 1872</li>
                    <li><strong>Email:</strong> info@corazondexoconostle.com</li>
                </ul>
            </div>
            <div>
                <h3 class="font-semibold mb-2">Book Your Experience</h3>
                <p>Ready to explore? Visit our website or contact us directly to book your next adventure. Whether you''re looking for a day trip or an extended journey, we''re here to make your experience unforgettable.</p>
            </div>
        </div>
    </section>',
    'Adventure Travel',
    'published',
    '2024-03-20T00:00:00Z',
    '/images/outdoors/adventure-tours.jpg'
);