// =============================================
// FURNO — Complete Livspace Clone Data
// Production-level content mirroring Livspace
// =============================================

// ---------- NAVIGATION ----------
export const navLinks = [
  {
    name: 'Design Ideas',
    href: '/design-ideas',
    megaMenu: {
      featured: [
        { name: 'Modular Kitchen Designs', href: '#', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=80' },
        { name: 'Living Room Designs', href: '#', image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=300&q=80' },
      ],
      columns: [
        {
          title: 'Popular Rooms',
          links: [
            'Modular Kitchen Designs', 'Wardrobe Designs','Master Bedroom Designs', 'Living Room Designs', 'Pooja Room Designs',
            'TV Unit Designs',
          ],
        },
        {
          title: 'More Spaces',
          links: [
            'Kids Bedroom Designs', 'Dining Room Designs',
            'Home Office Designs', 'Guest Bedroom Designs',
            'Study Room Designs', 'Home Bar Designs',
          ],
        },
        {
          title: 'Elements',
          links: [
            'Wall Decor Designs','Space Saving Designs',
          ],
        },
      ],
    },
  },
  { name: 'Projects', href: '/projects' },
  { name: 'Store Locator', href: '/stores' },
  {
    name: 'Shop',
    href: '#',
  },
];

export const offeringsNav = [
  { name: 'How it Works', href: '#how-it-works' },
];

// ---------- HERO SLIDES ----------
export const heroSlides = [
  {
    id: 1,
    title: 'Home to beautiful interiors',
    subtitle: 'Get your dream home designed by experts. End-to-end interior solutions with a lifetime warranty.',
    cta: 'Book Free Consultation',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80',
    tag: null,
  },
  {
    id: 2,
    title: 'Want to know how much your kitchen interiors will cost?',
    subtitle: 'Use our smart calculator to get an instant estimate for your modular kitchen.',
    cta: 'Calculate Now',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80',
    tag: 'Price Calculator',
  },
  {
    id: 3,
    title: "Introducing India's first lifetime warranty*",
    subtitle: 'We stand behind the quality of our work. Enjoy peace of mind with our industry-first lifetime warranty on modular products.',
    cta: 'Book Free Consultation',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80',
    tag: 'New',
  },
];

// ---------- OFFERINGS ----------
export const offerings = [
  {
    id: 1,
    title: 'Modular Interiors',
    description: 'Functional kitchen, wardrobe and storage',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    link: '#',
  },
  {
    id: 2,
    title: 'Full Home Interiors',
    description: 'Turnkey interior solutions for your home',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80',
    link: '#',
  },
  {
    id: 3,
    title: 'Luxury Interiors',
    description: 'Tailored interiors that redefine elegance',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    link: '#',
  },
  {
    id: 4,
    title: 'Renovations',
    description: 'Expert solutions to upgrade your home',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80',
    link: '#',
  },
];

// ---------- INSPIRATION CATEGORIES ----------
export const inspirationTabs = [
  'Living Room', 'Kitchen', 'Master Bedroom', 'Kids Bedroom', 'Guest Bedroom', 'Dining Room', 'False Ceiling'
];

export const inspirationImages = {
  'Living Room': [
    'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=500&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80',
  ],
  'Master Bedroom': [
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=500&q=80',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&q=80',
    'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=500&q=80',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&q=80',
    'https://images.unsplash.com/photo-1522771739-7f97a74f689f?w=500&q=80',
    'https://images.unsplash.com/photo-1560185127-6a93b2dde8da?w=500&q=80',
  ],
  'False Ceiling': [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80',
  ],
  'Kitchen': [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80',
    'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=500&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80',
    'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=500&q=80',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=500&q=80',
  ],
};

// Fill remaining tabs with default images
inspirationTabs.forEach((tab) => {
  if (!inspirationImages[tab]) {
    inspirationImages[tab] = [
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=500&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=500&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80',
    ];
  }
});

// ---------- WHY CHOOSE US ----------
export const whyChooseUs = [
  { icon: '🛡️', value: '1 year warranty¹', description: "India's first lifetime warranty on modular products" },
  { icon: '📅', value: '45-day move-in guarantee²', description: 'Move into your new home in just 45 days' },
  { icon: '✅', value: 'multi-stage quality checks', description: 'Rigorous quality control at every stage' },
  { icon: '📦', value: '750+ products', description: 'Massive selection of furniture & decor' },
  { icon: '👨‍🎨', value: '50+ designers', description: 'Expert designers to bring your vision to life' },
];

// ---------- PRICE CALCULATORS ----------
export const calculators = [
  {
    id: 1,
    title: 'Full Home Interior',
    description: 'Know the estimate price for your full home interiors',
    cta: 'Calculate',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80',
    icon: '🏠',
  },
  {
    id: 2,
    title: 'Kitchen',
    description: 'Get an approximate costing for your kitchen interior',
    cta: 'Calculate',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    icon: '🍳',
  },
  {
    id: 3,
    title: 'Wardrobe',
    description: 'Our estimate for your dream wardrobe',
    cta: 'Calculate',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80',
    icon: '🗄️',
  },
];

// ---------- CUSTOMER REVIEWS ----------
export const reviews = [
  {
    id: 1,
    name: 'Rohit Paul & Shveta',
    location: 'Gurugram',
    text: 'Hats off to the entire team at Livspace. They finished the project ahead of time and the quality exceeded our expectations. Every room was designed with such precision.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    projectImage: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=400&q=80',
  },
  {
    id: 2,
    name: 'Swati & Gaurav',
    location: 'Bangalore',
    text: 'Our experience was delightful thanks to the project managers. The modular kitchen turned out exactly as we imagined. The 3D visualization really helped us decide.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    projectImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
  },
  {
    id: 3,
    name: 'Puja Bhatia',
    location: 'Gurugram',
    text: 'We reached out and they designed the house that we really wanted. The attention to detail was incredible — from the false ceiling to the wardrobe fittings, everything was perfect.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    projectImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=80',
  },
  {
    id: 4,
    name: 'Arjun & Meera',
    location: 'Hyderabad',
    text: 'The modular wardrobe and kitchen installations were done flawlessly. The team kept us updated at every step. Absolutely worth the investment for our 3BHK apartment.',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    projectImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80',
  },
  {
    id: 5,
    name: 'Sneha Kapoor',
    location: 'Mumbai',
    text: 'From the first consultation to the final walkthrough, the experience was seamless. The designer understood our taste perfectly and our flat looks like a magazine cover now.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    projectImage: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&q=80',
  },
];

// ---------- DELIVERED HOMES ----------
export const deliveredHomes = [
  {
    id: 1,
    title: 'Modern 4 BHK Penthouse',
    location: 'Bangalore',
    city: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    style: 'Contemporary',
    bhkType: '4 BHK',
    areaSqft: 2800,
    budgetMin: 32,
    budgetMax: 40,
    completedDate: '2025-11-15',
  },
  {
    id: 2,
    title: 'Contemporary 4 BHK Penthouse',
    location: 'Noida',
    city: 'Noida',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80',
    style: 'Modern',
    bhkType: '4 BHK',
    areaSqft: 3100,
    budgetMin: 38,
    budgetMax: 48,
    completedDate: '2025-10-02',
  },
  {
    id: 3,
    title: 'Elegant 2 BHK Flat',
    location: 'Mumbai',
    city: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
    style: 'Elegant',
    bhkType: '2 BHK',
    areaSqft: 950,
    budgetMin: 12,
    budgetMax: 16,
    completedDate: '2025-12-20',
  },
  {
    id: 4,
    title: 'Contemporary 3 BHK House',
    location: 'Gurgaon',
    city: 'Gurgaon',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80',
    style: 'Contemporary',
    bhkType: '3 BHK',
    areaSqft: 1650,
    budgetMin: 18,
    budgetMax: 24,
    completedDate: '2026-01-10',
  },
  {
    id: 5,
    title: 'Minimalist 3 BHK Flat',
    location: 'Ahmedabad',
    city: 'Ahmedabad',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    style: 'Minimalist',
    bhkType: '3 BHK',
    areaSqft: 1420,
    budgetMin: 14,
    budgetMax: 18,
    completedDate: '2025-09-05',
  },
  {
    id: 6,
    title: 'Rustic 3 BHK Home',
    location: 'Bangalore',
    city: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    style: 'Rustic',
    bhkType: '3 BHK',
    areaSqft: 1800,
    budgetMin: 20,
    budgetMax: 26,
    completedDate: '2026-02-28',
  },
];

// ---------- MAGAZINE ARTICLES ----------
export const magazineArticles = [
  {
    id: 1, featured: true,
    title: '50+ Bedroom Colours: Single Shades and Colour Combinations for Every Style',
    author: 'Harsha Shankar', authorAvatar: 'https://i.pravatar.cc/48?img=12',
    date: 'April 14, 2026', readTime: 8, category: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
    excerpt: 'Discover the perfect palette for your bedroom with our curated guide to colour psychology and trending combinations for Indian homes.',
  },
  {
    id: 2, featured: false,
    title: '15+ Marble Pooja Room Designs That Add a WOW Factor to Your Home',
    author: 'Editorial Team', authorAvatar: 'https://i.pravatar.cc/48?img=5',
    date: 'April 10, 2026', readTime: 5, category: 'Room Ideas',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80',
    excerpt: 'Sacred spaces deserve special attention. Explore stunning marble pooja room designs that blend spirituality with modern aesthetics.',
  },
  {
    id: 3, featured: false,
    title: 'PVC Kitchen Cabinets 2026: Moisture-Resistant, Termite-Proof & Modular',
    author: 'Editorial Team', authorAvatar: 'https://i.pravatar.cc/48?img=5',
    date: 'Mar 06, 2026', readTime: 6, category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    excerpt: 'PVC is the smart choice for Indian kitchens. Learn why moisture resistance and zero maintenance make it the top pick this year.',
  },
  {
    id: 4, featured: false,
    title: 'Vastu for Home: Room-by-Room Guide for Positive Energy Flow',
    author: 'Priya Sharma', authorAvatar: 'https://i.pravatar.cc/48?img=47',
    date: 'Mar 01, 2026', readTime: 12, category: 'Vastu',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80',
    excerpt: 'A practical Vastu guide for modern Indian homes — balancing ancient wisdom with contemporary interior design principles.',
  },
  {
    id: 5, featured: false,
    title: '25+ Stunning False Ceiling Designs with Recessed Lighting',
    author: 'Design Team', authorAvatar: 'https://i.pravatar.cc/48?img=33',
    date: 'Feb 22, 2026', readTime: 7, category: 'Room Ideas',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    excerpt: 'Transform your ceilings into architectural statements. Browse the most popular false ceiling trends for Indian homes in 2026.',
  },
  {
    id: 6, featured: false,
    title: 'How to Choose the Right Colour Palette for Your Interior Design',
    author: 'Ritu Kapoor', authorAvatar: 'https://i.pravatar.cc/48?img=25',
    date: 'Feb 15, 2026', readTime: 9, category: 'Expert Tips',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    excerpt: 'Our lead designers share the colour rules they swear by — from undertones to accent walls — for cohesive, beautiful interiors.',
  },
  {
    id: 7, featured: false,
    title: 'Top 10 Modular Kitchen Layouts for Indian Homes in 2026',
    author: 'Harsha Shankar', authorAvatar: 'https://i.pravatar.cc/48?img=12',
    date: 'Feb 08, 2026', readTime: 10, category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80',
    excerpt: 'From L-shaped to parallel kitchens, find the ideal layout that maximises your space and suits the way you cook.',
  },
  {
    id: 8, featured: false,
    title: 'Small Bedroom Big Style: 30+ Space-Saving Design Ideas',
    author: 'Editorial Team', authorAvatar: 'https://i.pravatar.cc/48?img=5',
    date: 'Jan 30, 2026', readTime: 6, category: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
    excerpt: 'Small spaces, big dreams. Discover clever storage solutions and design tricks that make compact bedrooms feel luxurious.',
  },
  {
    id: 9, featured: false,
    title: 'Balcony Garden Ideas: Transform Your Outdoor Space',
    author: 'Priya Sharma', authorAvatar: 'https://i.pravatar.cc/48?img=47',
    date: 'Jan 20, 2026', readTime: 5, category: 'Decor',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    excerpt: 'Turn your balcony into a green sanctuary with these low-maintenance plant ideas and clever space-saving furniture picks.',
  },
];

// ---------- AWARDS ----------
export const awards = [
  { title: "India's Most Trusted Brand", icon: '🏆' },
  { title: 'Best Interior Design Solutions Brand', icon: '🥇' },
  { title: 'Innovative Start-up', icon: '💡' },
  { title: "World's Most Innovative Company", icon: '🌍' },
  { title: 'Top 100 Global Companies', icon: '⭐' },
];

// ---------- FAQ ----------
export const faqs = [
  {
    q: 'Why do I need an interior designer?',
    a: 'An interior designer is like a film director for your home. They gauge your needs and tastes to deliver your dream home. They assist you in getting custom-designed pieces that fit perfectly into your beautiful vision. From raw materials to finished products, they take care of everything! You can visit a FurnoTech Experience Centre or fill out the consultation form.',
  },
  {
    q: 'Why is FurnoTech perfect for your home interior design?',
    a: 'FurnoTech is the perfect partner who can build your home interiors just the way you want! Our design experts customize designs as per your needs. We incorporate advanced technology into our modular solutions to create flawless interiors and expedite the process of making your dream home a reality.',
  },
  {
    q: 'What services are included under home interior design?',
    a: 'We are a one-stop destination for interior design. We take care of design, delivery and installation. Our end-to-end services include modular interiors, false ceilings, civil work, painting, electrical work, plumbing services, flooring and tiling. Whether you want to design your new space or renovate, we\'ve got you covered.',
  },
  {
    q: 'How much does home interiors cost?',
    a: 'The cost varies as per home size, materials and scope of work. Basic costs: 1 BHK — Starting at ₹3.62L*, 2 BHK — Starting at ₹4.52L*, 3 BHK — Starting at ₹5.57L*, 4 BHK — Starting at ₹6.33L*, Modular Kitchens — Starting at ₹1.7L*. These include only modular interiors for new homes.',
  },
  {
    q: 'What will be the timelines for my project completion?',
    a: 'We deliver our 45-day Move-in Guarantee for modular solutions. For full home interiors, we take 90 days. However, timelines may vary based on material availability, customer feedback, design approvals, and site readiness.',
  },
  {
    q: 'What are the trending interior design styles?',
    a: '1. Bohemian Style 2. Modern Style 3. Colonial Style 4. Indian Traditional 5. Art Deco Style 6. Industrial Interior Design 7. Minimalist Interior Design 8. Scandinavian Interior Design',
  },
];

// ---------- HOW IT WORKS ----------
export const howItWorks = [
  {
    step: 1,
    title: 'Explore and Plan',
    description: 'Visit a FurnoTech Experience Centre or schedule a free consultation on our website. Our designers will provide detailed costing for your project.',
  },
  {
    step: 2,
    title: 'Secure Your Spot',
    description: 'Confirm by paying a booking amount of 10% of the final quote or ₹25,000 (whichever is higher). This secures your spot.',
  },
  {
    step: 3,
    title: 'Design and Customize',
    description: 'Choose from a wide array of designs, materials, and finishes to personalize your home. Make interim payments based on project scope.',
  },
  {
    step: 4,
    title: 'Bring Your Vision to Life',
    description: 'Kickstart with a 60% cumulative payment. Our experts meticulously execute your planned design with precision.',
  },
  {
    step: 5,
    title: 'Enjoy Your New Home',
    description: 'Complete the final payment and watch your vision come to life. Enjoy your transformed home, crafted to reflect your style.',
  },
];

// ---------- TRENDING PRODUCTS ----------
export const trendingProducts = [
  {
    id: 1,
    category: 'BED',
    name: 'Serena Platform Bed',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80',
    rating: 4.3,
    reviews: 107,
    price: 74999,
    originalPrice: 91999,
    discount: 18,
    badge: 'FEATURED',
    badgeVariant: 'gold',
  },
  {
    id: 2,
    category: 'TABLE',
    name: 'Harmony Dining Table',
    image: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=600&q=80',
    rating: 4.7,
    reviews: 42,
    price: 54999,
    originalPrice: 67999,
    discount: 19,
    badge: null,
    badgeVariant: null,
  },
  {
    id: 3,
    category: 'STORAGE',
    name: 'Zen Open Bookshelf',
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600&q=80',
    rating: 4.5,
    reviews: 38,
    price: 28999,
    originalPrice: 38000,
    discount: 24,
    badge: 'ECO-CERTIFIED',
    badgeVariant: 'green',
  },
  {
    id: 4,
    category: 'SOFA',
    name: 'Oslo Sectional Sofa',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    rating: 4.8,
    reviews: 74,
    price: 89999,
    originalPrice: 112999,
    discount: 20,
    badge: 'BESTSELLER',
    badgeVariant: 'navy',
  },
  {
    id: 5,
    category: 'CHAIR',
    name: 'Arc Lounge Chair',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80',
    rating: 4.6,
    reviews: 29,
    price: 32999,
    originalPrice: 42999,
    discount: 23,
    badge: null,
    badgeVariant: null,
  },
  {
    id: 6,
    category: 'TABLE',
    name: 'Marble Coffee Table',
    image: 'https://images.unsplash.com/photo-1526057565006-20beab8dd2ed?w=600&q=80',
    rating: 4.4,
    reviews: 53,
    price: 18999,
    originalPrice: 24999,
    discount: 24,
    badge: null,
    badgeVariant: null,
  },
  {
    id: 7,
    category: 'WARDROBE',
    name: 'Nordic Sliding Wardrobe',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    rating: 4.9,
    reviews: 91,
    price: 124999,
    originalPrice: 149999,
    discount: 17,
    badge: 'TOP RATED',
    badgeVariant: 'purple',
  },
];

// ---------- FOOTER ----------
export const footerData = {
  offerings: [
    'Modular Interiors', 'Full Home Interiors', 'Luxury Interiors',
    'FurnoTech Kitchen', 'FurnoTech Wardrobe', 'Home Interior Price Calculator',
    'Modular Kitchen Price', 'Wardrobe Price Calculator',
    'Finishes', 'Handles', 'Kitchen Cabinets', 'Wardrobe Cabinets',
  ],
  getInspired: [
    'Kitchen Designs', 'Living Room Designs', 'Bedroom Designs',
    'Kids Room Designs', 'Wardrobe Designs', 'Pooja Room Designs',
    'Dining Room Designs', 'Foyer Room Designs', 'Bathroom Designs',
    'Guest Bedroom Designs', 'Home Office Designs', 'Balcony Designs',
    'TV Unit Designs', 'False Ceiling Designs', 'Homes by FurnoTech',
  ],
  magazine: [
    'Room Ideas', 'Decor & Inspiration', 'Ceiling Design',
    'Furniture Ideas', 'Home Decor', 'Lighting Ideas',
    'Wall Design Ideas', 'Expert Advice', 'Interior Advice',
    'Vastu Tips', 'Home Organisation', 'Materials Guide',
  ],
  company: [
    'Refer a Friend', 'How it Works', 'Careers', 'Policies',
    'Terms and Conditions', 'About Us', 'Store Locator',
    'Contact Us', 'Privacy', 'Own a Franchise', 'Reviews',
  ],
  cities: [
    'Delhi', 'Bengaluru', 'Mumbai', 'Chennai', 'Hyderabad',
    'Pune', 'Kolkata', 'Noida', 'Gurugram', 'Ahmedabad',
    'Kochi', 'Jaipur', 'Chandigarh', 'Coimbatore', 'Lucknow',
    'Surat', 'Vadodara', 'Indore', 'Thane', 'Goa',
  ],
};

// ---------- PROJECTS ----------
export const projects = [
  {
    id: 1, title: 'Modern 4 BHK with Custom Cabinetry', city: 'Bangalore', bhk: '4 BHK', area: '2400 sq.ft', budget: '₹35L', style: 'Contemporary',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
    ],
  },
  {
    id: 2, title: 'Compact 2 BHK Flat with Smart Storage', city: 'Mumbai', bhk: '2 BHK', area: '850 sq.ft', budget: '₹12L', style: 'Modern',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
    ],
  },
  {
    id: 3, title: 'Elegant 3 BHK with Walk-in Wardrobes', city: 'Delhi', bhk: '3 BHK', area: '1800 sq.ft', budget: '₹22L', style: 'Classic',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
    ],
  },
  {
    id: 4, title: 'Scandinavian 3 BHK Apartment', city: 'Hyderabad', bhk: '3 BHK', area: '1600 sq.ft', budget: '₹18L', style: 'Scandinavian',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    ],
  },
  {
    id: 5, title: 'Luxury Villa with Custom Interiors', city: 'Gurgaon', bhk: '5 BHK', area: '4500 sq.ft', budget: '₹75L', style: 'Luxury',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
    ],
  },
  {
    id: 6, title: 'Minimalist 2 BHK with Open Kitchen', city: 'Pune', bhk: '2 BHK', area: '950 sq.ft', budget: '₹10L', style: 'Minimalist',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=80',
    ],
  },
  {
    id: 7, title: 'Traditional 3 BHK with Pooja Room', city: 'Chennai', bhk: '3 BHK', area: '1500 sq.ft', budget: '₹16L', style: 'Indian Traditional',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
    ],
  },
  {
    id: 8, title: 'Industrial Loft-Style Studio Apartment', city: 'Bangalore', bhk: '1 BHK', area: '650 sq.ft', budget: '₹8L', style: 'Industrial',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    ],
  },
  {
    id: 9, title: 'Art Deco 4 BHK with Statement Lighting', city: 'Mumbai', bhk: '4 BHK', area: '2200 sq.ft', budget: '₹45L', style: 'Art Deco',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    ],
  },
];

// ---------- DESIGNS ----------
export const designs = [
  {
    id: 1, slug: 'elegant-l-shaped-modular-kitchen', categorySlug: 'modular-kitchen',
    title: 'Elegant L-shaped Modular Kitchen in Walnut Finish',
    category: 'Modular Kitchen', style: 'Contemporary', size: 'tall',
    description: 'Floor-to-ceiling walnut veneer cabinets with soft-close drawers and integrated appliances for a seamless, clutter-free cooking experience.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80',
      'https://images.unsplash.com/photo-1565538810643-b5bdb0dc6e40?w=1200&q=80',
    ],
    trending: true, priceStartingFrom: 175000,
    tags: ['L-Shaped', 'Walnut Finish', 'Contemporary'],
    specs: { layout: 'L-Shaped Kitchen', dimensions: '12×10 feet', style: 'Contemporary', color: 'Walnut Brown', shutterFinish: 'Veneer in Matte Finish', countertopMaterial: 'Engineered Quartz', material: 'Veneer', finish: 'Matte' },
  },
  {
    id: 2, slug: 'minimalist-living-room-accent-wall', categorySlug: 'living-room',
    title: 'Minimalist Living Room with Accent Wall',
    category: 'Living Room', style: 'Minimalist', size: 'md',
    description: 'A serene sanctuary featuring a textured lime-wash accent wall, low-profile seating, and curated art for understated everyday elegance.',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
    ],
    trending: true, priceStartingFrom: 145000,
    tags: ['Minimalist', 'Accent Wall', 'Neutral Tones'],
    specs: { layout: 'Open Plan Living', dimensions: '16×14 feet', style: 'Minimalist', color: 'Warm White + Sage', material: 'MDF + Lime Plaster', finish: 'Matte' },
  },
  {
    id: 3, slug: 'cozy-master-bedroom-upholstered-headboard', categorySlug: 'master-bedroom',
    title: 'Cozy Master Bedroom with Upholstered Headboard',
    category: 'Master Bedroom', style: 'Modern', size: 'wide',
    description: 'Channel-tufted velvet headboard paired with ambient bedside lighting creates a warm, indulgent hotel-inspired retreat.',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80',
    ],
    trending: true, priceStartingFrom: 120000,
    tags: ['Upholstered Headboard', 'Modern', 'King Bed'],
    specs: { layout: 'Master Bedroom', dimensions: '14×12 feet', style: 'Modern', color: 'Deep Teal + Gold', material: 'Velvet + Lacquered MDF', finish: 'Semi-Gloss' },
  },
  {
    id: 4, slug: 'walk-in-wardrobe-glass-shutters', categorySlug: 'wardrobe',
    title: 'Walk-in Wardrobe with Glass Shutters',
    category: 'Wardrobe', style: 'Luxury', size: 'tall',
    description: 'Custom-built walk-in with glass-front cabinets, pull-out shoe racks, and full-length mirror panels for effortless daily organisation.',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=80',
      'https://images.unsplash.com/photo-1605512358450-33c09e9f8b8b?w=1200&q=80',
    ],
    trending: false, priceStartingFrom: 95000,
    tags: ['Walk-in', 'Glass Shutters', 'Luxury'],
    specs: { layout: 'Walk-in Wardrobe', dimensions: '10×8 feet', style: 'Luxury', color: 'Pearl White', shutterFinish: 'Frosted Glass Panels', material: 'HDHMR Board', finish: 'High Gloss' },
  },
  {
    id: 5, slug: 'contemporary-false-ceiling-cove-lighting', categorySlug: 'false-ceiling',
    title: 'Contemporary False Ceiling with Cove Lighting',
    category: 'False Ceiling', style: 'Contemporary', size: 'md',
    description: 'Layered gypsum false ceiling with hidden cove lighting adds architectural depth and dramatic ambiance to the living room.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',
    ],
    trending: false, priceStartingFrom: 65000,
    tags: ['Cove Lighting', 'Gypsum', 'Contemporary'],
    specs: { layout: 'Living Room Ceiling', dimensions: '18×14 feet', style: 'Contemporary', color: 'Arctic White', material: 'Gypsum Board + POP', finish: 'Smooth Matte' },
  },
  {
    id: 6, slug: 'compact-home-office-storage-solutions', categorySlug: 'home-office',
    title: 'Compact Home Office with Storage Solutions',
    category: 'Home Office', style: 'Modern', size: 'wide',
    description: 'Smart vertical storage, a floating desk, and warm task lighting transform a compact nook into a highly productive workspace.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80',
    ],
    trending: false, priceStartingFrom: 85000,
    tags: ['Floating Desk', 'Modern', 'Storage'],
    specs: { layout: 'Home Office Nook', dimensions: '10×9 feet', style: 'Modern', color: 'Charcoal + Warm Oak', material: 'Plywood + Laminate', finish: 'Matte' },
  },
  {
    id: 7, slug: 'scandinavian-living-room-neutral-palette', categorySlug: 'living-room',
    title: 'Scandinavian Living Room with Neutral Palette',
    category: 'Living Room', style: 'Scandinavian', size: 'md',
    description: 'Light oak accents, linen upholstery, and sculptural décor elements define this calm, airy Scandinavian-inspired living retreat.',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    ],
    trending: true, priceStartingFrom: 160000,
    tags: ['Scandinavian', 'Oak Accents', 'Neutral Palette'],
    specs: { layout: 'Living + Dining', dimensions: '20×16 feet', style: 'Scandinavian', color: 'Off-White + Light Oak', material: 'Solid Oak + Linen', finish: 'Natural Oil' },
  },
  {
    id: 8, slug: 'vibrant-kids-room-study-corner', categorySlug: 'kids-room',
    title: 'Vibrant Kids Room with Study Corner',
    category: 'Kids Room', style: 'Playful', size: 'tall',
    description: 'Bold primary colours, playful wall murals, and an ergonomic study corner spark creativity, imagination, and focused learning.',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=80',
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=1200&q=80',
      'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80',
    ],
    trending: false, priceStartingFrom: 95000,
    tags: ['Study Corner', 'Playful', 'Colourful'],
    specs: { layout: 'Kids Bedroom', dimensions: '12×10 feet', style: 'Playful', color: 'Primary Colours', material: 'Anti-scratch Laminate', finish: 'Matte' },
  },
  {
    id: 9, slug: 'classic-island-kitchen-breakfast-bar', categorySlug: 'modular-kitchen',
    title: 'Classic Island Kitchen with Breakfast Bar',
    category: 'Modular Kitchen', style: 'Classic', size: 'md',
    description: 'Shaker-style cabinetry, quartz countertops, and a waterfall island make this kitchen as functional as it is effortlessly beautiful.',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80',
      'https://images.unsplash.com/photo-1556909190-8f8c10c2a9a5?w=1200&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
      'https://images.unsplash.com/photo-1565538810643-b5bdb0dc6e40?w=1200&q=80',
    ],
    trending: true, priceStartingFrom: 210000,
    tags: ['Island Kitchen', 'Classic', 'Shaker Style'],
    specs: { layout: 'Island Kitchen', dimensions: '14×12 feet', style: 'Classic', color: 'Ivory White', shutterFinish: 'Shaker Style Laminate', countertopMaterial: 'Quartz Waterfall Edge', material: 'HDHMR Board', finish: 'Matte' },
  },
  {
    id: 10, slug: 'luxurious-bathroom-rain-shower', categorySlug: 'bathroom',
    title: 'Luxurious Bathroom with Rain Shower',
    category: 'Bathroom', style: 'Luxury', size: 'tall',
    description: 'Italian marble cladding, a freestanding soaking tub, and a rainfall shower head redefine what bathroom luxury truly looks like.',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80',
      'https://images.unsplash.com/photo-1552320788-b71fbb44f3e7?w=1200&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317702782?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
    ],
    trending: true, priceStartingFrom: 185000,
    tags: ['Rain Shower', 'Italian Marble', 'Luxury'],
    specs: { layout: 'Master Bathroom', dimensions: '10×8 feet', style: 'Luxury', color: 'Carrara White + Gold', material: 'Italian Marble', finish: 'Polished' },
  },
  {
    id: 11, slug: 'modern-tv-unit-floating-shelves', categorySlug: 'tv-unit',
    title: 'Modern TV Unit with Floating Shelves',
    category: 'TV Unit', style: 'Modern', size: 'wide',
    description: 'Book-matched fluted wood panels, integrated LED strips, and asymmetric floating shelves create a striking entertainment focal wall.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
      'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
    ],
    trending: false, priceStartingFrom: 55000,
    tags: ['Floating Unit', 'LED Strips', 'Fluted Wood'],
    specs: { layout: 'Living Room Feature Wall', dimensions: '12×9 feet', style: 'Modern', color: 'Charcoal + Natural Oak', material: 'Plywood + Veneer', finish: 'Matte' },
  },
  {
    id: 12, slug: 'rustic-dining-room-wooden-table', categorySlug: 'dining-room',
    title: 'Rustic Dining Room with Wooden Table',
    category: 'Dining Room', style: 'Rustic', size: 'md',
    description: 'Live-edge teak dining table, rattan pendant lights, and terracotta tones bring warm, earthy character to every shared mealtime.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',
      'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80',
    ],
    trending: false, priceStartingFrom: 135000,
    tags: ['Live Edge', 'Rustic', 'Teak Wood'],
    specs: { layout: 'Dining Area', dimensions: '14×12 feet', style: 'Rustic', color: 'Warm Teak + Terracotta', material: 'Solid Teak Wood', finish: 'Oil Rubbed' },
  },
];

// ---------- CATEGORY META ----------
export const CATEGORY_META = {
  'modular-kitchen': {
    label: 'Modular Kitchen Designs', category: 'Modular Kitchen',
    heroDesc: 'Transform your kitchen with custom modular solutions — smart storage, premium finishes, and expert craftsmanship delivered in 45 days.',
    bannerImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80',
    subCategories: ['All', 'L-Shaped', 'U-Shaped', 'Parallel', 'Island', 'Straight', 'Open Kitchen'],
    faqs: [
      { q: 'How much does a modular kitchen cost in India?', a: 'Modular kitchen costs start from ₹1.5L for a basic laminate setup and go up to ₹5L+ for premium materials like veneer or acrylic. The final price depends on size (running feet), material, accessories, and your city.' },
      { q: 'What materials are best for modular kitchen shutters?', a: 'Laminate is the most popular choice — durable and budget-friendly. Acrylic gives a glossy finish, PU Finish is ultra-smooth, and Veneer offers a natural wood look. For Indian kitchens, we recommend laminate or acrylic for their heat and moisture resistance.' },
      { q: 'How long does modular kitchen installation take?', a: 'With FurnoTech\'s 45-Day Move-in Guarantee, your modular kitchen is designed, manufactured, and installed in 45 days. Complex kitchens with civil work may take up to 60 days.' },
      { q: 'Can I customise my kitchen layout?', a: 'Absolutely. Our designers work with your kitchen\'s exact dimensions to create a custom layout — L-shaped, U-shaped, parallel, island, or straight — maximising every inch of space.' },
      { q: 'What warranty do I get on a modular kitchen?', a: 'FurnoTech offers a 5-year warranty on all modular products, covering manufacturing defects and hardware failures. Our Comfort and Luxury packages include an extended 10-year warranty.' },
    ],
  },
  'living-room': {
    label: 'Living Room Designs', category: 'Living Room',
    heroDesc: 'Create a living room that tells your story — from minimalist sanctuaries to bold statement spaces, our designers bring every vision to life.',
    bannerImage: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1920&q=80',
    subCategories: ['All', 'Minimalist', 'Contemporary', 'Scandinavian', 'Luxury', 'Bohemian'],
    faqs: [
      { q: 'How much does a living room interior design cost?', a: 'A living room interior design typically costs ₹1.5L–₹5L depending on the size, materials, furniture, and scope of work including TV unit, false ceiling, and upholstery.' },
      { q: 'What are trending living room styles in 2026?', a: 'Warm minimalism, earthy Japandi, bold Maximalist, and Biophilic (nature-inspired) designs are dominating 2026. Curved furniture and fluted wood panels are especially popular accent elements.' },
      { q: 'How do I make a small living room look bigger?', a: 'Use light colours, mirrors, multi-functional furniture, and consistent flooring. Vertical storage and floor-to-ceiling curtains create an illusion of height. Our designers specialise in space-optimisation for compact homes.' },
    ],
  },
  'master-bedroom': {
    label: 'Master Bedroom Designs', category: 'Master Bedroom',
    heroDesc: 'Design the bedroom you deserve — luxurious headboards, ambient lighting, and bespoke storage that blend comfort with timeless elegance.',
    bannerImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1920&q=80',
    subCategories: ['All', 'Modern', 'Luxury', 'Minimalist', 'Bohemian', 'Traditional'],
    faqs: [
      { q: 'What is the ideal bedroom interior design cost?', a: 'A master bedroom interior (wardrobe + bed unit + false ceiling) typically starts at ₹1.2L and goes up to ₹4L+ for luxury finishes. Standalone wardrobes start at ₹80K.' },
      { q: 'How do I choose the right headboard for my bedroom?', a: 'Upholstered headboards in velvet or linen add warmth. Wooden headboards suit contemporary and Scandinavian styles. The height should be proportional to your ceiling height — taller ceilings can support dramatic floor-to-ceiling headboard walls.' },
      { q: 'What lighting is best for a master bedroom?', a: 'Layer three types: ambient (false ceiling), task (bedside lamps), and accent (cove or LED strips). Warm white (2700K–3000K) creates a relaxed, hotel-like ambiance.' },
    ],
  },
  'wardrobe': {
    label: 'Wardrobe Designs', category: 'Wardrobe',
    heroDesc: 'From sleek sliding doors to luxurious walk-ins — our custom wardrobes maximise every inch and transform your dressing routine.',
    bannerImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1920&q=80',
    subCategories: ['All', 'Sliding Door', 'Hinged Door', 'Walk-in', 'Open Wardrobe', 'Corner'],
    faqs: [
      { q: 'What is the cost of a modular wardrobe?', a: 'Modular wardrobes start at ₹8,000 per running foot. A standard 6ft wardrobe costs ₹48K–₹1.2L depending on the material (laminate, acrylic, glass) and internal fittings.' },
      { q: 'Sliding vs hinged wardrobe — which is better?', a: 'Sliding doors are ideal for compact bedrooms as they don\'t need swing space. Hinged doors provide full access and suit larger rooms. Both can be customised with mirrors, glass, or solid panels.' },
      { q: 'How do I organise the inside of a wardrobe?', a: 'Divide into zones: long-hang for dresses/suits, short-hang for shirts/tops, shelves for folded clothes, and dedicated drawers for accessories. Pull-out shoe racks and accessory trays maximise usable space.' },
    ],
  },
  'false-ceiling': {
    label: 'False Ceiling Designs', category: 'False Ceiling',
    heroDesc: 'Elevate every room with architectural false ceilings — from elegant cove lighting to dramatic coffered designs that define the space.',
    bannerImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
    subCategories: ['All', 'Cove Lighting', 'Coffered', 'Tray Ceiling', 'Stretch Ceiling', 'POP'],
    faqs: [
      { q: 'How much does a false ceiling cost?', a: 'False ceiling costs range from ₹60–₹200 per sq.ft depending on material and design complexity. A standard living room (200 sq.ft) costs ₹15K–₹40K for gypsum and ₹50K+ for designer coffered ceilings.' },
      { q: 'What materials are used for false ceilings?', a: 'Gypsum board is the most popular for its versatility and smooth finish. POP (Plaster of Paris) allows intricate designs. Stretch ceilings offer a seamless look. Mineral fibre and metal tiles suit commercial and industrial styles.' },
      { q: 'Is a false ceiling structurally safe?', a: 'Yes. When installed by professionals with the correct GI framework and anchor points, false ceilings are completely safe and can withstand normal household activities. We use certified materials and experienced teams for every installation.' },
    ],
  },
  'home-office': {
    label: 'Home Office Designs', category: 'Home Office',
    heroDesc: 'Work smarter from home — ergonomic layouts, smart storage, and focused lighting designed for maximum productivity and style.',
    bannerImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80',
    subCategories: ['All', 'Compact', 'Executive', 'Standing Desk', 'Dual Monitor', 'Library Style'],
    faqs: [
      { q: 'How do I design an efficient home office?', a: 'Start with the right desk height and ergonomic chair. Maximise vertical storage to keep the desk clear. Position the monitor at eye level and ensure proper task lighting to reduce eye strain. A dedicated space — even a nook — improves focus.' },
      { q: 'What is the cost of a home office interior setup?', a: 'A compact home office (desk + shelving + lighting) starts from ₹40K. A full executive office with built-in bookshelves, a custom desk, and ambient lighting ranges from ₹1.5L to ₹3L.' },
      { q: 'What colours work best for a home office?', a: 'Blue tones promote focus and calm. Green boosts creativity. Neutral beige and warm whites reduce visual fatigue. Avoid stark white — it causes glare and feels clinical. An accent wall in a muted colour adds personality without distraction.' },
    ],
  },
  'kids-room': {
    label: 'Kids Room Designs', category: 'Kids Room',
    heroDesc: 'Design spaces where imagination runs wild — safe materials, smart storage, and playful designs that grow with your child.',
    bannerImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1920&q=80',
    subCategories: ['All', 'Boy\'s Room', 'Girl\'s Room', 'Toddler', 'Study Focused', 'Shared Room'],
    faqs: [
      { q: 'What are safe materials for kids room furniture?', a: 'We use CARB-certified low-VOC boards, non-toxic laminates, and child-safe paints in all kids room designs. All hardware has rounded edges and soft-close mechanisms to prevent injuries.' },
      { q: 'How do I plan a kids room that grows with the child?', a: 'Choose modular furniture that can be reconfigured — loft beds with study units underneath, adjustable shelving, and expandable wardrobes. Neutral base tones with swappable accent elements (wallpaper, cushions, lighting) make it easy to update the room as tastes evolve.' },
      { q: 'How much does a kids room interior design cost?', a: 'A kids room design with bed, wardrobe, and study unit starts at ₹80K. Complete rooms with themed wallpaper, custom bunks, and ceiling play elements range from ₹1.5L to ₹3.5L.' },
    ],
  },
  'bathroom': {
    label: 'Bathroom Designs', category: 'Bathroom',
    heroDesc: 'Transform your bathroom into a private spa — premium fittings, elegant tiles, and smart storage for a luxurious daily ritual.',
    bannerImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1920&q=80',
    subCategories: ['All', 'Master Bathroom', 'Compact', 'Wet Room', 'Rain Shower', 'Freestanding Bath'],
    faqs: [
      { q: 'How much does a bathroom interior design cost in India?', a: 'A mid-range bathroom renovation (tiles + fittings + vanity) costs ₹1.5L–₹4L. Luxury bathrooms with premium marble, frameless glass enclosures, and designer fittings start at ₹5L.' },
      { q: 'What tiles work best for Indian bathrooms?', a: 'Porcelain and vitrified tiles are durable, slip-resistant, and easy to clean. Large-format tiles (800×1600mm) make spaces feel bigger. Textured tiles on the floor and polished tiles on walls create an elegant contrast.' },
      { q: 'How do I maximise storage in a small bathroom?', a: 'Use wall-mounted vanities with drawers, recessed niches in the shower wall, and mirrored medicine cabinets above the sink. Floating shelves and towel rings on the back of doors use otherwise wasted space.' },
    ],
  },
  'tv-unit': {
    label: 'TV Unit Designs', category: 'TV Unit',
    heroDesc: 'Make your entertainment wall a design statement — from floating units to full feature walls with integrated LED lighting.',
    bannerImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80',
    subCategories: ['All', 'Floating', 'Floor-to-Ceiling', 'With Storage', 'Minimal', 'With Fireplace'],
    faqs: [
      { q: 'What is the standard TV unit size for a living room?', a: 'A standard TV unit is 1.5–2m wide and 45–50cm tall when seated. For wall-mounted TVs, a floating unit at 40–50cm from the floor is ideal for comfortable viewing. Floor-to-ceiling units work well in rooms with 9ft+ ceilings.' },
      { q: 'How much does a custom TV unit cost?', a: 'Custom TV units start at ₹20,000 for a simple floating unit. Feature walls with integrated shelving, back panels, and LED strips range from ₹60K to ₹2L depending on materials and size.' },
      { q: 'What materials are used for TV units?', a: 'Plywood with veneer or laminate is most common. Acrylic and PU finish give a premium glossy look. Glass panels and LED-lit alcoves are popular accent elements. We always use marine-grade plywood for the base structure to ensure longevity.' },
    ],
  },
  'dining-room': {
    label: 'Dining Room Designs', category: 'Dining Room',
    heroDesc: 'Every meal is better in a beautifully designed dining space — bespoke tables, statement lighting, and curated settings for your family.',
    bannerImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80',
    subCategories: ['All', 'Contemporary', 'Rustic', 'Luxury', 'Compact', 'Open Plan'],
    faqs: [
      { q: 'What size dining table should I choose?', a: 'Allow 60–75cm per person along the table length. A 4-seater needs a 120×75cm table; a 6-seater needs 180×90cm. Leave at least 90cm clearance around all sides for comfortable movement.' },
      { q: 'What are the trending dining room styles in 2026?', a: 'Warm woods and earthy tones dominate 2026. Live-edge tables, rattan pendant lights, fluted sideboards, and japandi-inspired chairs with organic forms are the top trending elements for Indian dining rooms.' },
      { q: 'How do I choose the right dining room lighting?', a: 'A statement pendant or chandelier hung 75–85cm above the table surface is ideal. For long tables, use a series of pendants or a linear suspension. Dimmer switches let you shift from bright family meals to intimate dinner party moods.' },
    ],
  },
};
