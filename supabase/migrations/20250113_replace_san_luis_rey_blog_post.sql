-- Migration: Replace San Luis Rey Tranvia blog post with correct image
-- Created: 2025-01-13

-- First, delete the existing blog post
DELETE FROM public.blog_posts WHERE slug = 'san-luis-rey-tranvia';

-- Then insert the new one with the correct image
INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  category,
  status,
  published_at,
  image_url
) VALUES (
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
  NOW(),
  'https://static.wixstatic.com/media/11131f_e3a952f5434a40a195aa9b60aee03ed5~mv2.jpg/v1/fill/w_1095,h_504,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/11131f_e3a952f5434a40a195aa9b60aee03ed5~mv2.jpg'
);