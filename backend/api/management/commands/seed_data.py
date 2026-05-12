"""
Populate the database with all initial FurnoTech mock data.
Run with:  python manage.py seed_data
"""
from django.core.management.base import BaseCommand
from api.models import (
    HeroSlide, Offering, InspirationTab, InspirationImage,
    WhyChooseUsStat, Calculator, Review, DeliveredHome,
    ProcessStep, MagazineArticle, Design, Project,
    Award, FAQ, Store, TrendingProduct,
)


class Command(BaseCommand):
    help = 'Seed the database with initial FurnoTech data'

    def handle(self, *args, **options):
        self._seed_hero()
        self._seed_offerings()
        self._seed_inspiration()
        self._seed_stats()
        self._seed_calculators()
        self._seed_reviews()
        self._seed_delivered_homes()
        self._seed_process_steps()
        self._seed_articles()
        self._seed_designs()
        self._seed_projects()
        self._seed_awards()
        self._seed_faqs()
        self._seed_stores()
        self._seed_trending_products()
        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))

    # ── Hero ─────────────────────────────────────────────────────────
    def _seed_hero(self):
        HeroSlide.objects.all().delete()
        slides = [
            {'title': 'Home to beautiful interiors', 'subtitle': 'Get your dream home designed by experts. End-to-end interior solutions with a lifetime warranty.', 'cta': 'Book Free Consultation', 'image': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80', 'tag': None, 'order': 1},
            {'title': 'Want to know how much your kitchen interiors will cost?', 'subtitle': 'Use our smart calculator to get an instant estimate for your modular kitchen.', 'cta': 'Calculate Now', 'image': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80', 'tag': 'Price Calculator', 'order': 2},
            {'title': "Introducing India's first lifetime warranty*", 'subtitle': 'We stand behind the quality of our work. Enjoy peace of mind with our industry-first lifetime warranty on modular products.', 'cta': 'Book Free Consultation', 'image': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80', 'tag': 'New', 'order': 3},
        ]
        for s in slides:
            HeroSlide.objects.create(**s)
        self.stdout.write('  ✓ Hero slides')

    # ── Offerings ────────────────────────────────────────────────────
    def _seed_offerings(self):
        Offering.objects.all().delete()
        items = [
            {'title': 'Modular Interiors', 'description': 'Functional kitchen, wardrobe and storage', 'image': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', 'link': '#', 'order': 1},
            {'title': 'Full Home Interiors', 'description': 'Turnkey interior solutions for your home', 'image': 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80', 'link': '#', 'order': 2},
            {'title': 'Luxury Interiors', 'description': 'Tailored interiors that redefine elegance', 'image': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', 'link': '#', 'order': 3},
            {'title': 'Renovations', 'description': 'Expert solutions to upgrade your home', 'image': 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80', 'link': '#', 'order': 4},
        ]
        for item in items:
            Offering.objects.create(**item)
        self.stdout.write('  ✓ Offerings')

    # ── Inspiration ──────────────────────────────────────────────────
    def _seed_inspiration(self):
        InspirationTab.objects.all().delete()
        data = {
            'Living Room':   ['https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=500&q=80', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80', 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&q=80', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80'],
            'Kitchen':       ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80', 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=500&q=80', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&q=80', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80', 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=500&q=80', 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=500&q=80'],
            'Master Bedroom': ['https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=500&q=80', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&q=80', 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=500&q=80', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80', 'https://images.unsplash.com/photo-1522771739-7f97a74f689f?w=500&q=80', 'https://images.unsplash.com/photo-1560185127-6a93b2dde8da?w=500&q=80'],
            'Kids Bedroom':  ['https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=500&q=80', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80', 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&q=80', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80'],
            'Guest Bedroom': ['https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=500&q=80', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80', 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&q=80', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80'],
            'Dining Room':   ['https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=500&q=80', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80', 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&q=80', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80'],
            'False Ceiling': ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80', 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&q=80', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80'],
        }
        for order, (label, images) in enumerate(data.items(), start=1):
            tab = InspirationTab.objects.create(label=label, order=order)
            for img_order, url in enumerate(images, start=1):
                InspirationImage.objects.create(tab=tab, image=url, order=img_order)
        self.stdout.write('  ✓ Inspiration tabs + images')

    # ── Stats (Why Choose Us) ─────────────────────────────────────────
    def _seed_stats(self):
        WhyChooseUsStat.objects.all().delete()
        items = [
            {'icon': '🛡️', 'value': '1 year warranty¹', 'description': "India's first lifetime warranty on modular products", 'order': 1},
            {'icon': '📅', 'value': '45-day move-in guarantee²', 'description': 'Move into your new home in just 45 days', 'order': 2},
            {'icon': '✅', 'value': 'multi-stage quality checks', 'description': 'Rigorous quality control at every stage', 'order': 3},
            {'icon': '📦', 'value': '750+ products', 'description': 'Massive selection of furniture & decor', 'order': 4},
            {'icon': '👨‍🎨', 'value': '50+ designers', 'description': 'Expert designers to bring your vision to life', 'order': 5},
        ]
        for item in items:
            WhyChooseUsStat.objects.create(**item)
        self.stdout.write('  ✓ Why Choose Us stats')

    # ── Calculators ──────────────────────────────────────────────────
    def _seed_calculators(self):
        Calculator.objects.all().delete()
        items = [
            {'title': 'Full Home Interior', 'description': 'Know the estimate price for your full home interiors', 'cta': 'Calculate', 'image': 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80', 'icon': '🏠', 'order': 1},
            {'title': 'Kitchen', 'description': 'Get an approximate costing for your kitchen interior', 'cta': 'Calculate', 'image': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', 'icon': '🍳', 'order': 2},
            {'title': 'Wardrobe', 'description': 'Our estimate for your dream wardrobe', 'cta': 'Calculate', 'image': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80', 'icon': '🗄️', 'order': 3},
        ]
        for item in items:
            Calculator.objects.create(**item)
        self.stdout.write('  ✓ Calculators')

    # ── Reviews ──────────────────────────────────────────────────────
    def _seed_reviews(self):
        Review.objects.all().delete()
        items = [
            {'name': 'Rohit Paul & Shveta', 'location': 'Gurugram', 'text': 'Hats off to the entire team at Livspace. They finished the project ahead of time and the quality exceeded our expectations. Every room was designed with such precision.', 'rating': 5, 'avatar': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', 'project_image': 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=400&q=80'},
            {'name': 'Swati & Gaurav', 'location': 'Bangalore', 'text': 'Our experience was delightful thanks to the project managers. The modular kitchen turned out exactly as we imagined. The 3D visualization really helped us decide.', 'rating': 5, 'avatar': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', 'project_image': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80'},
            {'name': 'Puja Bhatia', 'location': 'Gurugram', 'text': 'We reached out and they designed the house that we really wanted. The attention to detail was incredible — from the false ceiling to the wardrobe fittings, everything was perfect.', 'rating': 5, 'avatar': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', 'project_image': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=80'},
            {'name': 'Arjun & Meera', 'location': 'Hyderabad', 'text': 'The modular wardrobe and kitchen installations were done flawlessly. The team kept us updated at every step. Absolutely worth the investment for our 3BHK apartment.', 'rating': 4, 'avatar': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80', 'project_image': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80'},
            {'name': 'Sneha Kapoor', 'location': 'Mumbai', 'text': 'From the first consultation to the final walkthrough, the experience was seamless. The designer understood our taste perfectly and our flat looks like a magazine cover now.', 'rating': 5, 'avatar': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80', 'project_image': 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80'},
        ]
        for item in items:
            Review.objects.create(**item)
        self.stdout.write('  ✓ Reviews')

    # ── Delivered Homes ──────────────────────────────────────────────
    def _seed_delivered_homes(self):
        DeliveredHome.objects.all().delete()
        items = [
            {'title': 'Modern 4 BHK Penthouse', 'location': 'Bangalore', 'city': 'Bangalore', 'image': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', 'cover_image': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', 'style': 'Contemporary', 'bhk_type': '4 BHK', 'area_sqft': 2800, 'budget_min': 32, 'budget_max': 40, 'completed_date': '2025-11-15'},
            {'title': 'Contemporary 4 BHK Penthouse', 'location': 'Noida', 'city': 'Noida', 'image': 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80', 'cover_image': 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80', 'style': 'Modern', 'bhk_type': '4 BHK', 'area_sqft': 3100, 'budget_min': 38, 'budget_max': 48, 'completed_date': '2025-10-02'},
            {'title': 'Elegant 2 BHK Flat', 'location': 'Mumbai', 'city': 'Mumbai', 'image': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80', 'cover_image': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80', 'style': 'Elegant', 'bhk_type': '2 BHK', 'area_sqft': 950, 'budget_min': 12, 'budget_max': 16, 'completed_date': '2025-12-20'},
            {'title': 'Contemporary 3 BHK House', 'location': 'Gurgaon', 'city': 'Gurgaon', 'image': 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80', 'cover_image': 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80', 'style': 'Contemporary', 'bhk_type': '3 BHK', 'area_sqft': 1650, 'budget_min': 18, 'budget_max': 24, 'completed_date': '2026-01-10'},
            {'title': 'Minimalist 3 BHK Flat', 'location': 'Ahmedabad', 'city': 'Ahmedabad', 'image': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80', 'cover_image': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80', 'style': 'Minimalist', 'bhk_type': '3 BHK', 'area_sqft': 1420, 'budget_min': 14, 'budget_max': 18, 'completed_date': '2025-09-05'},
            {'title': 'Rustic 3 BHK Home', 'location': 'Bangalore', 'city': 'Bangalore', 'image': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', 'cover_image': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', 'style': 'Rustic', 'bhk_type': '3 BHK', 'area_sqft': 1800, 'budget_min': 20, 'budget_max': 26, 'completed_date': '2026-02-28'},
        ]
        for item in items:
            DeliveredHome.objects.create(**item)
        self.stdout.write('  ✓ Delivered homes')

    # ── Process Steps ────────────────────────────────────────────────
    def _seed_process_steps(self):
        ProcessStep.objects.all().delete()
        items = [
            {'step': 1, 'title': 'Explore and Plan', 'description': 'Visit a FurnoTech Experience Centre or schedule a free consultation on our website. Our designers will provide detailed costing for your project.'},
            {'step': 2, 'title': 'Secure Your Spot', 'description': 'Confirm by paying a booking amount of 10% of the final quote or ₹25,000 (whichever is higher). This secures your spot.'},
            {'step': 3, 'title': 'Design and Customize', 'description': 'Choose from a wide array of designs, materials, and finishes to personalize your home. Make interim payments based on project scope.'},
            {'step': 4, 'title': 'Bring Your Vision to Life', 'description': 'Kickstart with a 60% cumulative payment. Our experts meticulously execute your planned design with precision.'},
            {'step': 5, 'title': 'Enjoy Your New Home', 'description': 'Complete the final payment and watch your vision come to life. Enjoy your transformed home, crafted to reflect your style.'},
        ]
        for item in items:
            ProcessStep.objects.create(**item)
        self.stdout.write('  ✓ Process steps')

    # ── Magazine Articles ────────────────────────────────────────────
    def _seed_articles(self):
        MagazineArticle.objects.all().delete()
        items = [
            {'title': '50+ Bedroom Colours: Single Shades and Colour Combinations for Every Style', 'author': 'Harsha Shankar', 'author_avatar': 'https://i.pravatar.cc/48?img=12', 'date': 'April 14, 2026', 'read_time': 8, 'category': 'Bedroom', 'image': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80', 'excerpt': 'Discover the perfect palette for your bedroom with our curated guide to colour psychology and trending combinations for Indian homes.', 'featured': True},
            {'title': '15+ Marble Pooja Room Designs That Add a WOW Factor to Your Home', 'author': 'Editorial Team', 'author_avatar': 'https://i.pravatar.cc/48?img=5', 'date': 'April 10, 2026', 'read_time': 5, 'category': 'Room Ideas', 'image': 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80', 'excerpt': 'Sacred spaces deserve special attention. Explore stunning marble pooja room designs that blend spirituality with modern aesthetics.', 'featured': False},
            {'title': 'PVC Kitchen Cabinets 2026: Moisture-Resistant, Termite-Proof & Modular', 'author': 'Editorial Team', 'author_avatar': 'https://i.pravatar.cc/48?img=5', 'date': 'Mar 06, 2026', 'read_time': 6, 'category': 'Kitchen', 'image': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80', 'excerpt': 'PVC is the smart choice for Indian kitchens. Learn why moisture resistance and zero maintenance make it the top pick this year.', 'featured': False},
            {'title': 'Vastu for Home: Room-by-Room Guide for Positive Energy Flow', 'author': 'Priya Sharma', 'author_avatar': 'https://i.pravatar.cc/48?img=47', 'date': 'Mar 01, 2026', 'read_time': 12, 'category': 'Vastu', 'image': 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80', 'excerpt': 'A practical Vastu guide for modern Indian homes — balancing ancient wisdom with contemporary interior design principles.', 'featured': False},
            {'title': '25+ Stunning False Ceiling Designs with Recessed Lighting', 'author': 'Design Team', 'author_avatar': 'https://i.pravatar.cc/48?img=33', 'date': 'Feb 22, 2026', 'read_time': 7, 'category': 'Room Ideas', 'image': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', 'excerpt': 'Transform your ceilings into architectural statements. Browse the most popular false ceiling trends for Indian homes in 2026.', 'featured': False},
            {'title': 'How to Choose the Right Colour Palette for Your Interior Design', 'author': 'Ritu Kapoor', 'author_avatar': 'https://i.pravatar.cc/48?img=25', 'date': 'Feb 15, 2026', 'read_time': 9, 'category': 'Expert Tips', 'image': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', 'excerpt': 'Our lead designers share the colour rules they swear by — from undertones to accent walls — for cohesive, beautiful interiors.', 'featured': False},
            {'title': 'Top 10 Modular Kitchen Layouts for Indian Homes in 2026', 'author': 'Harsha Shankar', 'author_avatar': 'https://i.pravatar.cc/48?img=12', 'date': 'Feb 08, 2026', 'read_time': 10, 'category': 'Kitchen', 'image': 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80', 'excerpt': 'From L-shaped to parallel kitchens, find the ideal layout that maximises your space and suits the way you cook.', 'featured': False},
            {'title': 'Small Bedroom Big Style: 30+ Space-Saving Design Ideas', 'author': 'Editorial Team', 'author_avatar': 'https://i.pravatar.cc/48?img=5', 'date': 'Jan 30, 2026', 'read_time': 6, 'category': 'Bedroom', 'image': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80', 'excerpt': 'Small spaces, big dreams. Discover clever storage solutions and design tricks that make compact bedrooms feel luxurious.', 'featured': False},
            {'title': 'Balcony Garden Ideas: Transform Your Outdoor Space', 'author': 'Priya Sharma', 'author_avatar': 'https://i.pravatar.cc/48?img=47', 'date': 'Jan 20, 2026', 'read_time': 5, 'category': 'Decor', 'image': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', 'excerpt': 'Turn your balcony into a green sanctuary with these low-maintenance plant ideas and clever space-saving furniture picks.', 'featured': False},
        ]
        for item in items:
            MagazineArticle.objects.create(**item)
        self.stdout.write('  ✓ Magazine articles')

    # ── Designs ──────────────────────────────────────────────────────
    def _seed_designs(self):
        Design.objects.all().delete()
        items = [
            {'title': 'Elegant L-shaped Modular Kitchen in Walnut Finish', 'category': 'Modular Kitchen', 'style': 'Contemporary', 'image': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80', 'order': 1},
            {'title': 'Minimalist Living Room with Accent Wall', 'category': 'Living Room', 'style': 'Minimalist', 'image': 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=500&q=80', 'order': 2},
            {'title': 'Cozy Master Bedroom with Upholstered Headboard', 'category': 'Master Bedroom', 'style': 'Modern', 'image': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=500&q=80', 'order': 3},
            {'title': 'Walk-in Wardrobe with Glass Shutters', 'category': 'Wardrobe', 'style': 'Luxury', 'image': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&q=80', 'order': 4},
            {'title': 'Contemporary False Ceiling with Cove Lighting', 'category': 'False Ceiling', 'style': 'Contemporary', 'image': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80', 'order': 5},
            {'title': 'Compact Home Office with Storage Solutions', 'category': 'Home Office', 'style': 'Modern', 'image': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80', 'order': 6},
            {'title': 'Scandinavian Living Room with Neutral Palette', 'category': 'Living Room', 'style': 'Scandinavian', 'image': 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&q=80', 'order': 7},
            {'title': 'Vibrant Kids Room with Study Corner', 'category': 'Kids Room', 'style': 'Playful', 'image': 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&q=80', 'order': 8},
            {'title': 'Classic Island Kitchen with Breakfast Bar', 'category': 'Modular Kitchen', 'style': 'Classic', 'image': 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&q=80', 'order': 9},
            {'title': 'Luxurious Bathroom with Rain Shower', 'category': 'Bathroom', 'style': 'Luxury', 'image': 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&q=80', 'order': 10},
            {'title': 'Modern TV Unit with Floating Shelves', 'category': 'TV Unit', 'style': 'Modern', 'image': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80', 'order': 11},
            {'title': 'Rustic Dining Room with Wooden Table', 'category': 'Dining Room', 'style': 'Rustic', 'image': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80', 'order': 12},
        ]
        for item in items:
            Design.objects.create(**item)
        self.stdout.write('  ✓ Designs')

    # ── Projects ─────────────────────────────────────────────────────
    def _seed_projects(self):
        Project.objects.all().delete()
        items = [
            {'title': 'Modern 4 BHK with Custom Cabinetry', 'city': 'Bangalore', 'bhk': '4 BHK', 'area': '2400 sq.ft', 'budget': '₹35L', 'style': 'Contemporary', 'image': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80'},
            {'title': 'Compact 2 BHK Flat with Smart Storage', 'city': 'Mumbai', 'bhk': '2 BHK', 'area': '850 sq.ft', 'budget': '₹12L', 'style': 'Modern', 'image': 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80'},
            {'title': 'Elegant 3 BHK with Walk-in Wardrobes', 'city': 'Delhi', 'bhk': '3 BHK', 'area': '1800 sq.ft', 'budget': '₹22L', 'style': 'Classic', 'image': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80'},
            {'title': 'Scandinavian 3 BHK Apartment', 'city': 'Hyderabad', 'bhk': '3 BHK', 'area': '1600 sq.ft', 'budget': '₹18L', 'style': 'Scandinavian', 'image': 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80'},
            {'title': 'Luxury Villa with Custom Interiors', 'city': 'Gurgaon', 'bhk': '5 BHK', 'area': '4500 sq.ft', 'budget': '₹75L', 'style': 'Luxury', 'image': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'},
            {'title': 'Minimalist 2 BHK with Open Kitchen', 'city': 'Pune', 'bhk': '2 BHK', 'area': '950 sq.ft', 'budget': '₹10L', 'style': 'Minimalist', 'image': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80'},
            {'title': 'Traditional 3 BHK with Pooja Room', 'city': 'Chennai', 'bhk': '3 BHK', 'area': '1500 sq.ft', 'budget': '₹16L', 'style': 'Indian Traditional', 'image': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80'},
            {'title': 'Industrial Loft-Style Studio Apartment', 'city': 'Bangalore', 'bhk': '1 BHK', 'area': '650 sq.ft', 'budget': '₹8L', 'style': 'Industrial', 'image': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80'},
            {'title': 'Art Deco 4 BHK with Statement Lighting', 'city': 'Mumbai', 'bhk': '4 BHK', 'area': '2200 sq.ft', 'budget': '₹45L', 'style': 'Art Deco', 'image': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80'},
        ]
        for item in items:
            Project.objects.create(**item)
        self.stdout.write('  ✓ Projects')

    # ── Awards ───────────────────────────────────────────────────────
    def _seed_awards(self):
        Award.objects.all().delete()
        items = [
            {'title': "India's Most Trusted Brand", 'icon': '🏆', 'order': 1},
            {'title': 'Best Interior Design Solutions Brand', 'icon': '🥇', 'order': 2},
            {'title': 'Innovative Start-up', 'icon': '💡', 'order': 3},
            {'title': "World's Most Innovative Company", 'icon': '🌍', 'order': 4},
            {'title': 'Top 100 Global Companies', 'icon': '⭐', 'order': 5},
        ]
        for item in items:
            Award.objects.create(**item)
        self.stdout.write('  ✓ Awards')

    # ── FAQs ─────────────────────────────────────────────────────────
    def _seed_faqs(self):
        FAQ.objects.all().delete()
        items = [
            {'question': 'Why do I need an interior designer?', 'answer': 'An interior designer is like a film director for your home. They gauge your needs and tastes to deliver your dream home. They assist you in getting custom-designed pieces that fit perfectly into your beautiful vision. From raw materials to finished products, they take care of everything! You can visit a FurnoTech Experience Centre or fill out the consultation form.', 'order': 1},
            {'question': 'Why is FurnoTech perfect for your home interior design?', 'answer': 'FurnoTech is the perfect partner who can build your home interiors just the way you want! Our design experts customize designs as per your needs. We incorporate advanced technology into our modular solutions to create flawless interiors and expedite the process of making your dream home a reality.', 'order': 2},
            {'question': 'What services are included under home interior design?', 'answer': "We are a one-stop destination for interior design. We take care of design, delivery and installation. Our end-to-end services include modular interiors, false ceilings, civil work, painting, electrical work, plumbing services, flooring and tiling. Whether you want to design your new space or renovate, we've got you covered.", 'order': 3},
            {'question': 'How much does home interiors cost?', 'answer': 'The cost varies as per home size, materials and scope of work. Basic costs: 1 BHK — Starting at ₹3.62L*, 2 BHK — Starting at ₹4.52L*, 3 BHK — Starting at ₹5.57L*, 4 BHK — Starting at ₹6.33L*, Modular Kitchens — Starting at ₹1.7L*. These include only modular interiors for new homes.', 'order': 4},
            {'question': 'What will be the timelines for my project completion?', 'answer': 'We deliver our 45-day Move-in Guarantee for modular solutions. For full home interiors, we take 90 days. However, timelines may vary based on material availability, customer feedback, design approvals, and site readiness.', 'order': 5},
            {'question': 'What are the trending interior design styles?', 'answer': '1. Bohemian Style 2. Modern Style 3. Colonial Style 4. Indian Traditional 5. Art Deco Style 6. Industrial Interior Design 7. Minimalist Interior Design 8. Scandinavian Interior Design', 'order': 6},
        ]
        for item in items:
            FAQ.objects.create(**item)
        self.stdout.write('  ✓ FAQs')

    # ── Stores ───────────────────────────────────────────────────────
    def _seed_stores(self):
        Store.objects.all().delete()
        items = [
            {'name': 'FurnoTech Experience Centre — Indiranagar', 'city': 'Bangalore', 'address': '100 Feet Road, Indiranagar, Bangalore - 560038', 'phone': '+91 80 4567 8901', 'hours': 'Mon-Sun: 10 AM - 8 PM', 'image_url': 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=500&q=80', 'latitude': 12.9784, 'longitude': 77.6408},
            {'name': 'FurnoTech Experience Centre — Andheri', 'city': 'Mumbai', 'address': 'Infinity IT Park, Andheri East, Mumbai - 400059', 'phone': '+91 22 4567 8901', 'hours': 'Mon-Sun: 10 AM - 8 PM', 'image_url': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80', 'latitude': 19.1136, 'longitude': 72.8697},
            {'name': 'FurnoTech Experience Centre — Janakpuri', 'city': 'Delhi', 'address': 'A-3, District Centre, Janakpuri, New Delhi - 110058', 'phone': '+91 11 4567 8901', 'hours': 'Mon-Sun: 10 AM - 8 PM', 'image_url': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80', 'latitude': 28.6289, 'longitude': 77.0864},
            {'name': 'FurnoTech Experience Centre — Gachibowli', 'city': 'Hyderabad', 'address': 'Biodiversity Junction, Gachibowli, Hyderabad - 500032', 'phone': '+91 40 4567 8901', 'hours': 'Mon-Sun: 10 AM - 8 PM', 'image_url': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80', 'latitude': 17.4400, 'longitude': 78.3489},
            {'name': 'FurnoTech Experience Centre — Hinjewadi', 'city': 'Pune', 'address': 'Blue Ridge SEZ, Hinjewadi Phase 1, Pune - 411057', 'phone': '+91 20 4567 8901', 'hours': 'Mon-Sun: 10 AM - 8 PM', 'image_url': 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&q=80', 'latitude': 18.5912, 'longitude': 73.7381},
            {'name': 'FurnoTech Experience Centre — DLF Phase 5', 'city': 'Gurgaon', 'address': 'DLF Cyber City, Phase 5, Gurgaon - 122011', 'phone': '+91 124 4567 8901', 'hours': 'Mon-Sun: 10 AM - 8 PM', 'image_url': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80', 'latitude': 28.4745, 'longitude': 77.0940},
        ]
        for item in items:
            Store.objects.create(**item)
        self.stdout.write('  ✓ Stores')

    # ── Trending Products ────────────────────────────────────────────
    def _seed_trending_products(self):
        TrendingProduct.objects.all().delete()
        items = [
            {'category': 'BED', 'name': 'Serena Platform Bed', 'image': 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80', 'rating': 4.3, 'reviews': 107, 'price': 74999, 'original_price': 91999, 'discount': 18, 'badge': 'FEATURED', 'badge_variant': 'gold', 'order': 1},
            {'category': 'TABLE', 'name': 'Harmony Dining Table', 'image': 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=600&q=80', 'rating': 4.7, 'reviews': 42, 'price': 54999, 'original_price': 67999, 'discount': 19, 'badge': None, 'badge_variant': None, 'order': 2},
            {'category': 'STORAGE', 'name': 'Zen Open Bookshelf', 'image': 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80', 'rating': 4.5, 'reviews': 38, 'price': 28999, 'original_price': 38000, 'discount': 24, 'badge': 'ECO-CERTIFIED', 'badge_variant': 'green', 'order': 3},
            {'category': 'SOFA', 'name': 'Oslo Sectional Sofa', 'image': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', 'rating': 4.8, 'reviews': 74, 'price': 89999, 'original_price': 112999, 'discount': 20, 'badge': 'BESTSELLER', 'badge_variant': 'navy', 'order': 4},
            {'category': 'CHAIR', 'name': 'Arc Lounge Chair', 'image': 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80', 'rating': 4.6, 'reviews': 29, 'price': 32999, 'original_price': 42999, 'discount': 23, 'badge': None, 'badge_variant': None, 'order': 5},
            {'category': 'TABLE', 'name': 'Marble Coffee Table', 'image': 'https://images.unsplash.com/photo-1526057565006-20beab8dd2ed?w=600&q=80', 'rating': 4.4, 'reviews': 53, 'price': 18999, 'original_price': 24999, 'discount': 24, 'badge': None, 'badge_variant': None, 'order': 6},
            {'category': 'WARDROBE', 'name': 'Nordic Sliding Wardrobe', 'image': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', 'rating': 4.9, 'reviews': 91, 'price': 124999, 'original_price': 149999, 'discount': 17, 'badge': 'TOP RATED', 'badge_variant': 'purple', 'order': 7},
        ]
        for item in items:
            TrendingProduct.objects.create(**item)
        self.stdout.write('  ✓ Trending products')
