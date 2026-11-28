// Central property data and dynamic retrieval for Seven Mirror Stays

const DEFAULT_IMAGES = [
  { url: "/images/property/main-living.jpg", title: "Living Room with Red Arched Door" },
  { url: "/images/property/bedroom.png", title: "Master Bedroom Suite" },
  { url: "/images/property/dining-detail.png", title: "Dining Table & Tableware" },
  { url: "/images/property/dining-hall.png", title: "Dining Hall & Lotus Wall Mural" },
  { url: "/images/property/lounge.png", title: "Living Lounge with Striped Armchairs" },
];

export const PROPERTIES = {
  rossiero: {
    _id: "rossiero",
    slug: "rossiero",
    name: "Rossiero",
    title: "Rossiero | 4 BHK Private Villa",
    price: 6000,
    pricing: {
      basePrice: 6000,
      currencySymbol: "₹",
    },
    rating: "4.92",
    reviewsCount: 28,
    propertyType: "Entire Villa",
    location: {
      type: "ENTIRE VILLA",
      area: "Ashok Nagar, Jaipur",
      city: "Jaipur",
      state: "Rajasthan",
      country: "India",
      address: "S-22, Durgadas Colony, Ashok Marg, Ashok Nagar, Jaipur, Rajasthan, India",
      neighborhoodDescription:
        "Located in the prestigious Ashok Nagar neighbourhood, Rossiero offers peaceful tree-lined lanes just minutes away from Jaipur's finest dining, cafes, and historic landmarks.",
      lat: 26.9075,
      lng: 75.8055,
    },
    host: {
      name: "Seven Mirror Stays",
      summary: "Hosted by Seven Mirror Stays | Premier Host",
    },
    specs: {
      guests: 10,
      bedrooms: 4,
      beds: 4,
      bathrooms: 4,
    },
    tagline: "A Charming 4-Bedroom Private Villa In The Heart Of The Pink City.",
    desc: "Surrounded by lush greenery and bursts of vibrant bougainvillea blooms, Rossiero is a serene retreat that blends traditional Rajasthani elegance with modern comfort.",
    tags: ["4 Bedrooms", "Private Garden", "Central Location"],
    images: [
      { url: "/images/property/main-living.jpg", title: "Living Room with Red Arched Door" },
      { url: "/images/property/bedroom.png", title: "Master Bedroom Suite" },
      { url: "/images/property/dining-detail.png", title: "Dining Table & Tableware" },
      { url: "/images/property/dining-hall.png", title: "Dining Hall & Lotus Wall Mural" },
      { url: "/images/property/lounge.png", title: "Living Lounge with Striped Armchairs" },
    ],
    highlights: [
      {
        icon: "location",
        title: "In Ashok Nagar, central Jaipur",
        desc: "A prestigious, serene neighborhood with boutique cafes, gardens, and heritage spots within a short drive",
      },
      {
        icon: "kitchen",
        title: "Private Bougainvillea Garden",
        desc: "A manicured garden and peaceful outdoor sit-out bathed in Pink City charm",
      },
      {
        icon: "host",
        title: "Dedicated Resident Concierge",
        desc: "Personalized housekeeping, chef upon request, and 24/7 on-site support from Seven Mirror Stays",
      },
    ],
    theSpace: [
      {
        id: "bedroom-1",
        title: "MASTER BEDROOM 1",
        image: "/images/property/space/bedroom-1.png",
        points: [
          "• King-size teak wood bed with plush orthopaedic mattress.",
          "• Attached ensuite bathroom and private veranda view.",
          "• Air conditioning, high-speed Wi-Fi, and spacious wardrobe.",
        ],
      },
      {
        id: "bedroom-2",
        title: "BEDROOM 2",
        image: "/images/property/space/bedroom-2.png",
        points: [
          "• Elegant Rajasthani block-print furnishings with king bed.",
          "• Ensuite bathroom equipped with geyser and luxury bath essentials.",
          "• Dedicated work desk and warm reading lamp.",
        ],
      },
      {
        id: "bathrooms",
        title: "4 ATTACHED BATHROOMS",
        image: "/images/property/space/bathroom.png",
        points: [
          "• All 4 bedrooms have private ensuite bathrooms.",
          "• 24/7 hot water geysers, premium towels, and organic toiletries.",
          "• Additional guest powder room located off the main lounge.",
        ],
      },
      {
        id: "living-dining",
        title: "LIVING HALL & DINING AREA",
        image: "/images/property/space/living-dining.png",
        points: [
          "• Spacious traditional lounge with high ceilings and arched doorway.",
          "• Dining table seating up to 8 guests comfortably.",
          "• Smart 55-inch TV with Netflix, Prime, and soundbar.",
        ],
      },
    ],
    nearbyAttractions: [
      { name: "City Palace & Jantar Mantar", distance: "3.2 km" },
      { name: "Hawa Mahal (Wind Palace)", distance: "3.8 km" },
      { name: "Albert Hall Museum", distance: "2.4 km" },
      { name: "Central Park Jaipur", distance: "1.2 km" },
    ],
    nearbyDining: [
      { name: "Bar Palladio Jaipur", distance: "1.8 km" },
      { name: "Caffé Palladio", distance: "1.8 km" },
      { name: "Tapri Central", distance: "1.4 km" },
      { name: "The Johri Restaurant", distance: "3.5 km" },
    ],
    relatedProperties: [
      {
        _id: "lumen-royale",
        locationLabel: "DLF PHASE 2, GURUGRAM",
        title: "Lumen Royale",
        subtitle: "Ralph Lauren Inspired Luxury Residence",
        specsLine: "3 Bedrooms · Private Balcony · City Views",
        price: 9500,
        href: "/properties/lumen-royale",
        images: ["/images/rooms/4.png", "/images/rooms/5.png", "/images/rooms/1.png"],
      },
      {
        _id: "cozy-loft-floor-1",
        locationLabel: "MALVIYA NAGAR, JAIPUR",
        title: "Cozy Loft - Floor 1",
        subtitle: "Private 4-Bedroom Floor with Garden",
        specsLine: "4 Bedrooms · Private Garden · Central Location",
        price: 6000,
        href: "/properties/cozy-loft-floor-1",
        images: ["/images/property/main-living.jpg", "/images/property/bedroom.png", "/images/property/dining-detail.png"],
      },
      {
        _id: "haveli-suite",
        locationLabel: "C-SCHEME, JAIPUR",
        title: "Haveli Suite",
        subtitle: "Heritage Residence with Private Courtyard",
        specsLine: "3 Bedrooms · Courtyard · Chef on Request",
        price: 8500,
        href: "/properties/haveli-suite",
        images: ["/images/stay-1.png", "/images/rooms/1.png", "/images/rooms/2.png"],
      },
    ],
  },

  "lumen-royale": {
    _id: "lumen-royale",
    slug: "lumen-royale",
    name: "Lumen Royale",
    title: "Lumen Royale | Designer Luxury Residence",
    price: 9500,
    pricing: {
      basePrice: 9500,
      currencySymbol: "₹",
    },
    rating: "4.95",
    reviewsCount: 34,
    propertyType: "Entire Residence",
    location: {
      type: "ENTIRE DESIGNER RESIDENCE",
      area: "DLF Phase 2, Gurugram",
      city: "Gurugram",
      state: "Haryana",
      country: "India",
      address: "DLF Phase 2, Sector 25, Gurugram, Haryana, India",
      neighborhoodDescription:
        "Situated in prime DLF Phase 2, Gurugram, with rapid metro access, CyberHub's world-class restaurants, and serene residential avenues.",
      lat: 28.4899,
      lng: 77.089,
    },
    host: {
      name: "Seven Mirror Stays",
      summary: "Hosted by Seven Mirror Stays | Luxury Host",
    },
    specs: {
      guests: 8,
      bedrooms: 3,
      beds: 3,
      bathrooms: 3,
    },
    tagline: "Timeless Luxury In The Heart Of Gurugram.",
    desc: "A Ralph Lauren-inspired designer residence where classic elegance meets contemporary comfort, with generous living spaces and private balconies.",
    tags: ["3 Bedrooms", "Private Balcony", "Elevator Access"],
    images: [
      { url: "/images/rooms/4.png", title: "Ralph Lauren Inspired Living Salon" },
      { url: "/images/rooms/5.png", title: "Executive Master Bedroom" },
      { url: "/images/rooms/1.png", title: "Private Balcony & City Skyline" },
      { url: "/images/rooms/2.png", title: "Chef's Kitchen & Island" },
      { url: "/images/rooms/3.png", title: "Ensuite Bathroom & Dressing Area" },
    ],
    highlights: [
      {
        icon: "location",
        title: "Prime DLF Phase 2, Gurugram",
        desc: "Moments from DLF CyberHub, Horizon Centre, and executive business parks",
      },
      {
        icon: "kitchen",
        title: "Private Balconies & Direct Elevator",
        desc: "Private elevator access opening into an expansive designer apartment with wrap-around balconies",
      },
      {
        icon: "host",
        title: "Bespoke Concierge & Caretaker",
        desc: "Dedicated resident butler, daily housekeeping, and seamless check-in support",
      },
    ],
    theSpace: [
      {
        id: "bedroom-1",
        title: "EXECUTIVE MASTER SUITE",
        image: "/images/rooms/5.png",
        points: [
          "• King bed with Italian leather headboard and posturepedic mattress.",
          "• Walk-in wardrobe and ensuite marble bathroom.",
          "• Private sunset balcony overlooking the greenery.",
        ],
      },
      {
        id: "bedroom-2",
        title: "GUEST SUITE",
        image: "/images/rooms/1.png",
        points: [
          "• Bespoke oak furnishings, king bed, and acoustic double-glazed windows.",
          "• Ensuite bathroom with rainfall shower and geyser.",
          "• Workstation with high-speed 300 Mbps Wi-Fi.",
        ],
      },
      {
        id: "bathrooms",
        title: "3 MARBLE BATHROOMS",
        image: "/images/rooms/3.png",
        points: [
          "• Premium Kohler and Grohe fittings with hot water geysers.",
          "• Luxury hotel-grade bathrobes, plush towels, and Forest Essentials bath amenities.",
        ],
      },
      {
        id: "living-dining",
        title: "DESIGNER SALON & DINING",
        image: "/images/rooms/4.png",
        points: [
          "• Expansive Ralph Lauren aesthetic living space with hardwood flooring.",
          "• 8-seater smoked glass dining table.",
          "• Fully equipped kitchen with microwave, induction, dishwasher, and espresso maker.",
        ],
      },
    ],
    nearbyAttractions: [
      { name: "DLF CyberHub & Cyber City", distance: "1.5 km" },
      { name: "Ambience Mall Gurugram", distance: "2.8 km" },
      { name: "Aravalli Biodiversity Park", distance: "3.4 km" },
      { name: "Horizon Centre Golf Course Rd", distance: "4.1 km" },
    ],
    nearbyDining: [
      { name: "Farzi Cafe CyberHub", distance: "1.5 km" },
      { name: "Burma Burma Gurugram", distance: "1.5 km" },
      { name: "Comorin Horizon Centre", distance: "4.1 km" },
      { name: "Paul French Bakery", distance: "2.8 km" },
    ],
    relatedProperties: [
      {
        _id: "rossiero",
        locationLabel: "ASHOK NAGAR, JAIPUR",
        title: "Rossiero",
        subtitle: "Private 4-Bedroom Villa in Pink City",
        specsLine: "4 Bedrooms · Private garden · Central location",
        price: 6000,
        href: "/properties/rossiero",
        images: ["/images/property/main-living.jpg", "/images/property/bedroom.png", "/images/property/dining-hall.png"],
      },
      {
        _id: "skyline-residence",
        locationLabel: "GOLF COURSE ROAD, GURUGRAM",
        title: "Skyline Residence",
        subtitle: "Full-Floor Apartment with Panoramic Views",
        specsLine: "3 Bedrooms · City Views · Private Lift",
        price: 11000,
        href: "/properties/skyline-residence",
        images: ["/images/stay-3.png", "/images/rooms/4.png", "/images/rooms/5.png"],
      },
      {
        _id: "cozy-loft-floor-1",
        locationLabel: "MALVIYA NAGAR, JAIPUR",
        title: "Cozy Loft - Floor 1",
        subtitle: "Private 4-Bedroom Floor with Garden",
        specsLine: "4 Bedrooms · Private Garden · Central Location",
        price: 6000,
        href: "/properties/cozy-loft-floor-1",
        images: ["/images/property/main-living.jpg", "/images/property/bedroom.png", "/images/property/dining-detail.png"],
      },
    ],
  },

  "cozy-loft-floor-1": {
    _id: "cozy-loft-floor-1",
    slug: "cozy-loft-floor-1",
    name: "Cozy Loft - Floor 1",
    title: "Cozy Loft 201 | 4 BHK Private Floor",
    price: 6000,
    pricing: {
      basePrice: 6000,
      currencySymbol: "₹",
    },
    rating: "4.82",
    reviewsCount: 19,
    propertyType: "Private Floor",
    location: {
      type: "PRIVATE FLOOR",
      area: "Malviya Nagar, Jaipur",
      city: "Jaipur",
      state: "Rajasthan",
      country: "India",
      address: "B-14, Malviya Nagar, Jaipur, Rajasthan, India",
      neighborhoodDescription:
        "Located in quiet Malviya Nagar, just a minute's walk from fresh grocery markets, local sweet shops, and World Trade Park.",
      lat: 26.8549,
      lng: 75.8243,
    },
    host: {
      name: "Seven Mirror Stays",
      summary: "Hosted by Seven Mirror Stays | Superhost",
    },
    specs: {
      guests: 8,
      bedrooms: 4,
      beds: 4,
      bathrooms: 3,
    },
    tagline: "A Bright, Welcoming Floor With Its Own Private Garden.",
    desc: "Private 4-bedroom floor in a quiet residential lane, with a private garden and a central location close to Jaipur's best cafes and markets.",
    tags: ["4 Bedrooms", "Private Garden", "Central Location"],
    images: [
      { url: "/images/property/main-living.jpg", title: "Living Room with Red Arched Door" },
      { url: "/images/property/bedroom.png", title: "Master Bedroom Suite" },
      { url: "/images/property/dining-detail.png", title: "Dining Table & Tableware" },
      { url: "/images/property/dining-hall.png", title: "Dining Hall & Lotus Wall Mural" },
      { url: "/images/property/lounge.png", title: "Living Lounge with Striped Armchairs" },
    ],
    highlights: [
      {
        icon: "location",
        title: "In Malviya Nagar, central Jaipur",
        desc: "A peaceful residential area with local markets, World Trade Park, and cafes just a stroll away",
      },
      {
        icon: "kitchen",
        title: "Full kitchen and private garden",
        desc: "Fully equipped kitchen with gas stove, microwave, and cookware, plus direct garden sit-out",
      },
      {
        icon: "host",
        title: "Warm and attentive team",
        desc: "Dedicated caretaker on-site to assist with luggage, local guidance, and daily upkeep",
      },
    ],
    theSpace: [
      {
        id: "bedroom-1",
        title: "BEDROOM 1",
        image: "/images/property/space/bedroom-1.png",
        points: ["• King bed with premium linens.", "• Attached balcony and ensuite bathroom.", "• Split AC and Wi-Fi."],
      },
      {
        id: "bedroom-2",
        title: "BEDROOM 2",
        image: "/images/property/space/bedroom-2.png",
        points: ["• Cozy queen bed with spacious wardrobe.", "• Window overlooking the garden.", "• Workstation desk."],
      },
      {
        id: "bathrooms",
        title: "BATHROOMS",
        image: "/images/property/space/bathroom.png",
        points: [
          "• Equipped with geysers, fresh towels, and hand washes.",
          "• Clean, modern tiles and 24/7 pressurized water supply.",
        ],
      },
      {
        id: "living-dining",
        title: "LIVING ROOM & DINING AREA",
        image: "/images/property/space/living-dining.png",
        points: [
          "• Comfortable seating with sofa set and ambient lighting.",
          "• Dining table with crockery and glasses.",
          "• Smart LED TV with streaming apps.",
        ],
      },
    ],
    nearbyAttractions: [
      { name: "World Trade Park (WTP)", distance: "1.2 km" },
      { name: "Patrika Gate & Jawahar Circle", distance: "2.1 km" },
      { name: "Birla Mandir Temple", distance: "4.5 km" },
      { name: "Albert Hall Museum", distance: "6.0 km" },
    ],
    nearbyDining: [
      { name: "Town Coffee Malviya Nagar", distance: "600 m" },
      { name: "Kanha Sweets & Restaurant", distance: "800 m" },
      { name: "Sultanat Cafe & Lounge", distance: "1.4 km" },
    ],
    relatedProperties: [
      {
        _id: "rossiero",
        locationLabel: "ASHOK NAGAR, JAIPUR",
        title: "Rossiero",
        subtitle: "Private 4-Bedroom Villa in Pink City",
        specsLine: "4 Bedrooms · Private garden · Central location",
        price: 6000,
        href: "/properties/rossiero",
        images: ["/images/property/main-living.jpg", "/images/property/bedroom.png", "/images/property/dining-hall.png"],
      },
      {
        _id: "lumen-royale",
        locationLabel: "DLF PHASE 2, GURUGRAM",
        title: "Lumen Royale",
        subtitle: "Ralph Lauren Inspired Luxury Residence",
        specsLine: "3 Bedrooms · Private Balcony · City Views",
        price: 9500,
        href: "/properties/lumen-royale",
        images: ["/images/rooms/4.png", "/images/rooms/5.png", "/images/rooms/1.png"],
      },
      {
        _id: "royal-bagh",
        locationLabel: "CIVIL LINES, JAIPUR",
        title: "Royal Bagh",
        subtitle: "Grand Villa with Private Pool & Lawns",
        specsLine: "6 Bedrooms · Private Pool · Lawns",
        price: 24000,
        href: "/properties/royal-bagh",
        images: ["/images/stay-2.png", "/images/rooms/3.png", "/images/property/bedroom.png"],
      },
    ],
  },

  "haveli-suite": {
    _id: "haveli-suite",
    slug: "haveli-suite",
    name: "Haveli Suite",
    title: "Haveli Suite | Heritage Courtyard Residence",
    price: 8500,
    pricing: {
      basePrice: 8500,
      currencySymbol: "₹",
    },
    rating: "4.89",
    reviewsCount: 22,
    propertyType: "Entire Residence",
    location: {
      type: "ENTIRE HERITAGE RESIDENCE",
      area: "C-Scheme, Jaipur",
      city: "Jaipur",
      state: "Rajasthan",
      country: "India",
      address: "C-Scheme, Ashok Nagar, Jaipur, Rajasthan, India",
      neighborhoodDescription:
        "Situated in trendy C-Scheme, home to Jaipur's most popular cafes, artisan boutiques, and wide tree-lined boulevards.",
      lat: 26.9124,
      lng: 75.8016,
    },
    host: {
      name: "Seven Mirror Stays",
      summary: "Hosted by Seven Mirror Stays | Heritage Host",
    },
    specs: {
      guests: 6,
      bedrooms: 3,
      beds: 3,
      bathrooms: 3,
    },
    tagline: "Heritage Charm With A Private Courtyard.",
    desc: "A heritage-style 3-bedroom residence centred around a quiet courtyard, with a chef on request and easy access to the old city.",
    tags: ["3 Bedrooms", "Courtyard", "Chef on Request"],
    images: [
      { url: "/images/stay-1.png", title: "Heritage Courtyard & Archways" },
      { url: "/images/rooms/1.png", title: "Royal Bedchamber with Jharokha" },
      { url: "/images/rooms/2.png", title: "Living Room with Antique Brass Fixtures" },
      { url: "/images/property/main-living.jpg", title: "Formal Dining Room" },
      { url: "/images/rooms/3.png", title: "Courtyard Verandah" },
    ],
    highlights: [
      {
        icon: "location",
        title: "Heart of C-Scheme, Jaipur",
        desc: "Jaipur's trendiest cultural enclave with celebrated cafes and designer stores at your doorstep",
      },
      {
        icon: "kitchen",
        title: "Central Open-Air Courtyard",
        desc: "A traditional private courtyard where mornings begin with birdsong and evening candlelit dinners",
      },
      {
        icon: "host",
        title: "Private Chef on Request",
        desc: "Indulge in authentic Rajasthani curries and breakfast made fresh by our in-house chef",
      },
    ],
    theSpace: [
      {
        id: "bedroom-1",
        title: "HERITAGE SUITE 1",
        image: "/images/rooms/1.png",
        points: ["• Handcrafted four-poster bed.", "• Jharokha window with stained glass.", "• Ensuite marble bath."],
      },
      {
        id: "bedroom-2",
        title: "COURTYARD SUITE 2",
        image: "/images/rooms/2.png",
        points: ["• Direct access to inner courtyard.", "• King bed, vintage brass accents.", "• Modern AC and Wi-Fi."],
      },
      {
        id: "bathrooms",
        title: "3 ATTACHED BATHROOMS",
        image: "/images/property/space/bathroom.png",
        points: ["• Heritage brass fittings, rain showers, hot water geysers, and luxury toiletries."],
      },
      {
        id: "living-dining",
        title: "COURTYARD & LIVING LOUNGE",
        image: "/images/stay-1.png",
        points: [
          "• Open-air central courtyard surrounded by hand-carved pillars.",
          "• Indoor salon with plush couches and library.",
        ],
      },
    ],
    nearbyAttractions: [
      { name: "Central Park & Golf Club", distance: "1.0 km" },
      { name: "City Palace", distance: "3.5 km" },
      { name: "Albert Hall Museum", distance: "2.8 km" },
    ],
    nearbyDining: [
      { name: "Anokhi Cafe", distance: "400 m" },
      { name: "Dzurt Patisserie", distance: "500 m" },
      { name: "Baradari Restaurant", distance: "3.5 km" },
    ],
    relatedProperties: [
      {
        _id: "rossiero",
        locationLabel: "ASHOK NAGAR, JAIPUR",
        title: "Rossiero",
        subtitle: "Private 4-Bedroom Villa in Pink City",
        specsLine: "4 Bedrooms · Private garden · Central location",
        price: 6000,
        href: "/properties/rossiero",
        images: ["/images/property/main-living.jpg", "/images/property/bedroom.png", "/images/property/dining-hall.png"],
      },
      {
        _id: "lumen-royale",
        locationLabel: "DLF PHASE 2, GURUGRAM",
        title: "Lumen Royale",
        subtitle: "Ralph Lauren Inspired Luxury Residence",
        specsLine: "3 Bedrooms · Private Balcony · City Views",
        price: 9500,
        href: "/properties/lumen-royale",
        images: ["/images/rooms/4.png", "/images/rooms/5.png", "/images/rooms/1.png"],
      },
      {
        _id: "skyline-residence",
        locationLabel: "GOLF COURSE ROAD, GURUGRAM",
        title: "Skyline Residence",
        subtitle: "Full-Floor Apartment with Panoramic Views",
        specsLine: "3 Bedrooms · City Views · Private Lift",
        price: 11000,
        href: "/properties/skyline-residence",
        images: ["/images/stay-3.png", "/images/rooms/4.png", "/images/rooms/5.png"],
      },
    ],
  },

  "skyline-residence": {
    _id: "skyline-residence",
    slug: "skyline-residence",
    name: "Skyline Residence",
    title: "Skyline Residence | Penthouse with Panoramic Views",
    price: 11000,
    pricing: {
      basePrice: 11000,
      currencySymbol: "₹",
    },
    rating: "4.96",
    reviewsCount: 17,
    propertyType: "Entire Apartment",
    location: {
      type: "ENTIRE LUXURY APARTMENT",
      area: "Golf Course Road, Gurugram",
      city: "Gurugram",
      state: "Haryana",
      country: "India",
      address: "Golf Course Road, Sector 54, Gurugram, Haryana, India",
      neighborhoodDescription:
        "Overlooking the prestigious Aravalli hills and Golf Course, with rapid metro and ultra-luxury shopping at your doorstep.",
      lat: 28.4422,
      lng: 77.0988,
    },
    host: {
      name: "Seven Mirror Stays",
      summary: "Hosted by Seven Mirror Stays | Elite Host",
    },
    specs: {
      guests: 6,
      bedrooms: 3,
      beds: 3,
      bathrooms: 3,
    },
    tagline: "A Full-Floor Apartment With Open City Views.",
    desc: "A full-floor 3-bedroom apartment with a private lift, floor-to-ceiling windows and concierge service for effortless long stays.",
    tags: ["3 Bedrooms", "City Views", "Private Lift"],
    images: [
      { url: "/images/stay-3.png", title: "Full-Floor Living Lounge" },
      { url: "/images/rooms/4.png", title: "Floor-to-Ceiling Glass Views" },
      { url: "/images/rooms/5.png", title: "Designer Master Suite" },
      { url: "/images/stay-4.png", title: "Panoramic Balcony" },
      { url: "/images/rooms/2.png", title: "Modern Open Kitchen" },
    ],
    highlights: [
      {
        icon: "location",
        title: "On Golf Course Road, Gurugram",
        desc: "Gurugram's most sought-after luxury corridor with immediate connectivity to Cyber City and airport",
      },
      {
        icon: "kitchen",
        title: "Floor-to-Ceiling Views & Private Lift",
        desc: "Direct-to-home elevator opening to panoramic skylines and sunset vistas across the city",
      },
      {
        icon: "host",
        title: "Full-Service Stays",
        desc: "Daily maid service, gourmet grocery stocking on request, and round-the-clock security",
      },
    ],
    theSpace: [
      {
        id: "bedroom-1",
        title: "SKYLINE MASTER BEDROOM",
        image: "/images/rooms/5.png",
        points: ["• King bed facing the skyline.", "• Ensuite jacuzzi bathroom.", "• Automated blackout blinds."],
      },
      {
        id: "bedroom-2",
        title: "GUEST SUITE",
        image: "/images/rooms/4.png",
        points: ["• Queen bed with ergonomic workspace.", "• Ensuite bath with rain shower.", "• High-speed Wi-Fi."],
      },
      {
        id: "bathrooms",
        title: "3 LUXURY BATHROOMS",
        image: "/images/property/space/bathroom.png",
        points: ["• Rain showers, glass partitions, hot water geysers, and branded bath care."],
      },
      {
        id: "living-dining",
        title: "PANORAMIC SALON",
        image: "/images/stay-3.png",
        points: [
          "• Expansive glass lounge with designer Italian furniture.",
          "• 6-person dining area and open breakfast bar.",
        ],
      },
    ],
    nearbyAttractions: [
      { name: "DLF Golf and Country Club", distance: "1.2 km" },
      { name: "Horizon One & Two", distance: "2.0 km" },
      { name: "One Horizon Centre Dining", distance: "2.0 km" },
    ],
    nearbyDining: [
      { name: "Comorin Gurugram", distance: "2.0 km" },
      { name: "Town Hall Golf Course Road", distance: "2.0 km" },
      { name: "Artusi Ristorante", distance: "2.2 km" },
    ],
    relatedProperties: [
      {
        _id: "lumen-royale",
        locationLabel: "DLF PHASE 2, GURUGRAM",
        title: "Lumen Royale",
        subtitle: "Ralph Lauren Inspired Luxury Residence",
        specsLine: "3 Bedrooms · Private Balcony · City Views",
        price: 9500,
        href: "/properties/lumen-royale",
        images: ["/images/rooms/4.png", "/images/rooms/5.png", "/images/rooms/1.png"],
      },
      {
        _id: "rossiero",
        locationLabel: "ASHOK NAGAR, JAIPUR",
        title: "Rossiero",
        subtitle: "Private 4-Bedroom Villa in Pink City",
        specsLine: "4 Bedrooms · Private garden · Central location",
        price: 6000,
        href: "/properties/rossiero",
        images: ["/images/property/main-living.jpg", "/images/property/bedroom.png", "/images/property/dining-hall.png"],
      },
      {
        _id: "royal-bagh",
        locationLabel: "CIVIL LINES, JAIPUR",
        title: "Royal Bagh",
        subtitle: "Grand Villa with Private Pool & Lawns",
        specsLine: "6 Bedrooms · Private Pool · Lawns",
        price: 24000,
        href: "/properties/royal-bagh",
        images: ["/images/stay-2.png", "/images/rooms/3.png", "/images/property/bedroom.png"],
      },
    ],
  },

  "royal-bagh": {
    _id: "royal-bagh",
    slug: "royal-bagh",
    name: "Royal Bagh",
    title: "Royal Bagh | Grand Heritage Estate & Private Pool",
    price: 24000,
    pricing: {
      basePrice: 24000,
      currencySymbol: "₹",
    },
    rating: "5.0",
    reviewsCount: 12,
    propertyType: "Entire Villa",
    location: {
      type: "ENTIRE PRIVATE ESTATE",
      area: "Civil Lines, Jaipur",
      city: "Jaipur",
      state: "Rajasthan",
      country: "India",
      address: "Civil Lines, Jaipur, Rajasthan, India",
      neighborhoodDescription:
        "In the prestigious green enclave of Civil Lines, featuring sprawling manicured lawns, absolute privacy, and royal Jaipur hospitality.",
      lat: 26.9064,
      lng: 75.7873,
    },
    host: {
      name: "Seven Mirror Stays",
      summary: "Hosted by Seven Mirror Stays | Estate Host",
    },
    specs: {
      guests: 14,
      bedrooms: 6,
      beds: 8,
      bathrooms: 6,
    },
    tagline: "A Grand Villa Set In Its Own Gardens.",
    desc: "A large 6-bedroom villa with sweeping lawns, a private pool and staff quarters, ideal for weddings, reunions and family celebrations.",
    tags: ["6 Bedrooms", "Private Pool", "Expansive Lawns"],
    images: [
      { url: "/images/stay-2.png", title: "Grand Facade & Private Lawn" },
      { url: "/images/rooms/3.png", title: "Royal Living Pavilion" },
      { url: "/images/property/bedroom.png", title: "Maharaja Suite" },
      { url: "/images/property/main-living.jpg", title: "Banquet Dining Hall" },
      { url: "/images/property/lounge.png", title: "Private Poolside Cabana" },
    ],
    highlights: [
      {
        icon: "location",
        title: "Exclusive Civil Lines, Jaipur",
        desc: "Jaipur's prime residential district, guarded by century-old banyan trees and serene roads",
      },
      {
        icon: "kitchen",
        title: "Private Swimming Pool & Lawns",
        desc: "Deep blue private pool surrounded by cabanas and lush green lawns capable of hosting intimate events",
      },
      {
        icon: "host",
        title: "Full Staff & Private Butler",
        desc: "Dedicated on-site chef, housekeepers, and villa manager to ensure seamless comfort",
      },
    ],
    theSpace: [
      {
        id: "bedroom-1",
        title: "MAHARAJA MASTER SUITE",
        image: "/images/property/bedroom.png",
        points: ["• King bed with royal silk canopies.", "• Jacuzzi ensuite bath.", "• Pool-facing veranda."],
      },
      {
        id: "bedroom-2",
        title: "GARDEN SUITE",
        image: "/images/rooms/3.png",
        points: ["• Spacious king bed, antique mirrors, and lawn views.", "• Marble ensuite bathroom."],
      },
      {
        id: "bathrooms",
        title: "6 ATTACHED BATHROOMS",
        image: "/images/property/space/bathroom.png",
        points: ["• Complete ensuite facilities in all 6 bedrooms with premium toiletries and hot water geysers."],
      },
      {
        id: "living-dining",
        title: "BANQUET HALL & POOLSIDE",
        image: "/images/stay-2.png",
        points: [
          "• Massive double-height living hall with crystal chandeliers.",
          "• 12-seater royal dining table and outdoor gazebo seating.",
        ],
      },
    ],
    nearbyAttractions: [
      { name: "Jaipur City Centre & MI Road", distance: "2.5 km" },
      { name: "Albert Hall Museum", distance: "3.8 km" },
      { name: "Amber Palace", distance: "11.0 km" },
    ],
    nearbyDining: [
      { name: "Peshawri at ITC Rajputana", distance: "1.5 km" },
      { name: "Suvarna Mahal at Rambagh", distance: "3.2 km" },
      { name: "Steam Lounge", distance: "3.2 km" },
    ],
    relatedProperties: [
      {
        _id: "rossiero",
        locationLabel: "ASHOK NAGAR, JAIPUR",
        title: "Rossiero",
        subtitle: "Private 4-Bedroom Villa in Pink City",
        specsLine: "4 Bedrooms · Private garden · Central location",
        price: 6000,
        href: "/properties/rossiero",
        images: ["/images/property/main-living.jpg", "/images/property/bedroom.png", "/images/property/dining-hall.png"],
      },
      {
        _id: "lumen-royale",
        locationLabel: "DLF PHASE 2, GURUGRAM",
        title: "Lumen Royale",
        subtitle: "Ralph Lauren Inspired Luxury Residence",
        specsLine: "3 Bedrooms · Private Balcony · City Views",
        price: 9500,
        href: "/properties/lumen-royale",
        images: ["/images/rooms/4.png", "/images/rooms/5.png", "/images/rooms/1.png"],
      },
      {
        _id: "haveli-suite",
        locationLabel: "C-SCHEME, JAIPUR",
        title: "Haveli Suite",
        subtitle: "Heritage Residence with Private Courtyard",
        specsLine: "3 Bedrooms · Courtyard · Chef on Request",
        price: 8500,
        href: "/properties/haveli-suite",
        images: ["/images/stay-1.png", "/images/rooms/1.png", "/images/rooms/2.png"],
      },
    ],
  },
};

// Aliases for alternate slug names
PROPERTIES["cozy-loft-201"] = PROPERTIES["cozy-loft-floor-1"];
PROPERTIES["cozy-loft-1"] = PROPERTIES["cozy-loft-floor-1"];

// Dynamic fallback creator for any custom or new slug
export function createDynamicPropertyFallback(slug = "") {
  const cleanSlug = String(slug || "stay").toLowerCase();

  // Format title from slug: e.g. "cozy-loft-floor-2" -> "Cozy Loft Floor 2"
  const formattedName = cleanSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const isGurugram =
    cleanSlug.includes("gurugram") ||
    cleanSlug.includes("gurgaon") ||
    cleanSlug.includes("dlf") ||
    cleanSlug.includes("skyline") ||
    cleanSlug.includes("royale");

  const city = isGurugram ? "Gurugram" : "Jaipur";
  const state = isGurugram ? "Haryana" : "Rajasthan";
  const area = isGurugram ? "DLF Phase 2, Gurugram" : "Malviya Nagar, Jaipur";

  return {
    _id: cleanSlug,
    slug: cleanSlug,
    name: formattedName,
    title: `${formattedName} | Luxury Stay`,
    price: 7000,
    pricing: {
      basePrice: 7000,
      currencySymbol: "₹",
    },
    rating: "4.85",
    reviewsCount: 16,
    propertyType: "Entire Residence",
    location: {
      type: "ENTIRE RESIDENCE",
      area,
      city,
      state,
      country: "India",
      address: `${formattedName}, ${area}, ${city}, ${state}, India`,
      neighborhoodDescription: `Located in the prime residential neighborhood of ${area}, offering seamless access to top cafes, shopping, and landmarks.`,
      lat: isGurugram ? 28.4899 : 26.8549,
      lng: isGurugram ? 77.089 : 75.8243,
    },
    host: {
      name: "Seven Mirror Stays",
      summary: "Hosted by Seven Mirror Stays | Verified Host",
    },
    specs: {
      guests: 6,
      bedrooms: 3,
      beds: 3,
      bathrooms: 3,
    },
    tagline: `Experience premium living at ${formattedName}.`,
    desc: `Handcrafted for comfort and style by Seven Mirror Stays, featuring spacious interiors, modern amenities, and attentive resident staff.`,
    tags: ["3 Bedrooms", "Private Sitout", "Central Location"],
    images: DEFAULT_IMAGES,
    highlights: [
      {
        icon: "location",
        title: `Prime location in ${city}`,
        desc: `Situated in ${area}, close to premier dining, markets, and transport hubs.`,
      },
      {
        icon: "kitchen",
        title: "Full kitchen & modern amenities",
        desc: "Equipped with split air conditioning, fast Wi-Fi, microwave, and hot water geysers.",
      },
      {
        icon: "host",
        title: "Dedicated resident host",
        desc: "Personalized housekeeping, prompt concierge support, and seamless check-in.",
      },
    ],
    theSpace: [
      {
        id: "bedroom-1",
        title: "MASTER BEDROOM",
        image: "/images/property/space/bedroom-1.png",
        points: ["• King bed with plush linens.", "• Ensuite bathroom with hot geyser.", "• Split AC and Wi-Fi."],
      },
      {
        id: "bedroom-2",
        title: "GUEST BEDROOM",
        image: "/images/property/space/bedroom-2.png",
        points: ["• Queen bed, bedside lamps, wardrobe.", "• Ensuite bath and balcony access."],
      },
      {
        id: "bathrooms",
        title: "3 BATHROOMS",
        image: "/images/property/space/bathroom.png",
        points: ["• Geysers in all bathrooms, towels, and fresh toiletries provided."],
      },
      {
        id: "living-dining",
        title: "LIVING & DINING SALON",
        image: "/images/property/space/living-dining.png",
        points: ["• Air conditioned lounge with smart TV.", "• Comfortable dining table for the whole group."],
      },
    ],
    nearbyAttractions: [
      { name: isGurugram ? "DLF CyberHub" : "City Palace", distance: "2.5 km" },
      { name: isGurugram ? "Ambience Mall" : "Hawa Mahal", distance: "3.2 km" },
    ],
    nearbyDining: [
      { name: isGurugram ? "Farzi Cafe" : "Bar Palladio", distance: "1.8 km" },
      { name: isGurugram ? "Burma Burma" : "Tapri Central", distance: "2.0 km" },
    ],
    relatedProperties: [
      {
        _id: "rossiero",
        locationLabel: "ASHOK NAGAR, JAIPUR",
        title: "Rossiero",
        subtitle: "Private 4-Bedroom Villa in Pink City",
        specsLine: "4 Bedrooms · Private garden · Central location",
        price: 6000,
        href: "/properties/rossiero",
        images: ["/images/property/main-living.jpg", "/images/property/bedroom.png", "/images/property/dining-hall.png"],
      },
      {
        _id: "lumen-royale",
        locationLabel: "DLF PHASE 2, GURUGRAM",
        title: "Lumen Royale",
        subtitle: "Ralph Lauren Inspired Luxury Residence",
        specsLine: "3 Bedrooms · Private Balcony · City Views",
        price: 9500,
        href: "/properties/lumen-royale",
        images: ["/images/rooms/4.png", "/images/rooms/5.png", "/images/rooms/1.png"],
      },
      {
        _id: "cozy-loft-floor-1",
        locationLabel: "MALVIYA NAGAR, JAIPUR",
        title: "Cozy Loft - Floor 1",
        subtitle: "Private 4-Bedroom Floor with Garden",
        specsLine: "4 Bedrooms · Private Garden · Central Location",
        price: 6000,
        href: "/properties/cozy-loft-floor-1",
        images: ["/images/property/main-living.jpg", "/images/property/bedroom.png", "/images/property/dining-detail.png"],
      },
    ],
  };
}

// Fetch property by slug from API or local catalog fallback
export async function getPropertyBySlug(slug) {
  if (!slug) return PROPERTIES.rossiero;

  const normalizedSlug = String(slug).toLowerCase().trim();

  // 1. Try to fetch from backend API if configured/available
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const res = await fetch(`${backendUrl}/api/properties/${normalizedSlug}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      const apiProp = data.property || data.data || data;
      if (apiProp && (apiProp.title || apiProp.name)) {
        return apiProp;
      }
    }
  } catch (err) {
    // API not connected yet, proceed to catalog
  }

  // 2. Check local catalog
  if (PROPERTIES[normalizedSlug]) {
    return PROPERTIES[normalizedSlug];
  }

  // 3. Fallback for custom or unknown slugs
  return createDynamicPropertyFallback(normalizedSlug);
}
