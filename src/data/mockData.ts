import { Recipe, PantryItem, BasketItem, PassportStamp, BattleEntry, LiveStream, ScreenArtifact } from '../types';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'rec-1',
    title: 'Saffron Citrus Seabass with Charred Fennel',
    titleAr: 'قاروص البحر بالزعفران والحمضيات مع الشمر المشوي',
    cuisine: 'Mediterranean Fusion',
    countryCode: 'IT',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80',
    prepTime: '15 mins',
    cookTime: '20 mins',
    difficulty: 'Medium',
    calories: 410,
    servings: 2,
    rating: 4.9,
    reviewsCount: 142,
    author: {
      name: 'Chef Tariq Al-Mansoor',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80',
      badge: 'Master of Mediterranean'
    },
    tags: ['Zero Waste', 'High Protein', 'Gluten-Free', 'Chef Pick'],
    dietary: ['Gluten-Free', 'Pescatarian'],
    matchScore: 98,
    ingredients: [
      { name: 'Fresh Seabass Fillets', nameAr: 'شرائح قاروص طازجة', amount: '2', unit: 'fillets', inPantry: true },
      { name: 'Saffron Threads', nameAr: 'خيوط الزعفران', amount: '1', unit: 'pinch', inPantry: true },
      { name: 'Fennel Bulb (sliced)', nameAr: 'حبة شمر مقطعة', amount: '1', unit: 'medium', inPantry: false },
      { name: 'Blood Orange (Juice & Zest)', nameAr: 'برتقال دموي', amount: '1', unit: 'whole', inPantry: true },
      { name: 'Cold-Pressed Olive Oil', nameAr: 'زيت زيتون بكر', amount: '2', unit: 'tbsp', inPantry: true },
      { name: 'Maldon Sea Salt & Thyme', nameAr: 'ملح بحري وزعتر', amount: '1', unit: 'tsp', inPantry: true }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Bloom Saffron & Prep Citrus Glaze',
        instruction: 'Steep saffron threads in 2 tbsp warm blood orange juice for 5 minutes until vivid golden crimson.',
        durationMinutes: 5,
        chefTip: 'Never use boiling water with saffron as delicate volatile terpenes evaporate.'
      },
      {
        stepNumber: 2,
        title: 'Char the Fennel Ribbons',
        instruction: 'Heat a heavy cast iron skillet over high heat. Sear fennel slices dry for 2 minutes each side until caramelized edges form.',
        durationMinutes: 4,
        chefTip: 'Keep the delicate feathery fennel fronds for plating garnish!'
      },
      {
        stepNumber: 3,
        title: 'Pan-Sear Seabass Skin-Down',
        instruction: 'Score the skin lightly. Press firmly skin-down into hot olive oil for 4 minutes until crispy golden glass.',
        durationMinutes: 5,
        chefTip: 'A fish spatula held down gently for the first 30 seconds prevents curling.'
      },
      {
        stepNumber: 4,
        title: 'Glaze & Herb Basting',
        instruction: 'Flip the fish, pour the saffron citrus reduction around the skillet, and baste continuously for 90 seconds.',
        durationMinutes: 3,
        chefTip: 'Remove from heat immediately to let residual skillet heat gently finish the center.'
      }
    ],
    tasteProfile: { sweet: 4, savory: 9, spicy: 2, sour: 7, umami: 8 },
    zeroWasteTip: 'Use fennel stems and orange peels to steep a fragrant court-bouillon for future stocks.'
  },
  {
    id: 'rec-2',
    title: 'Smoked Harissa Braised Short Ribs & Creamy Polenta',
    titleAr: 'أضلاع اللحم البقري المطهوة بالهريسة المدخنة والبولينتا',
    cuisine: 'North African Modern',
    countryCode: 'MA',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    prepTime: '20 mins',
    cookTime: '45 mins',
    difficulty: 'Hard',
    calories: 680,
    servings: 4,
    rating: 4.95,
    reviewsCount: 230,
    author: {
      name: 'Chef Leila Benali',
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80',
      badge: 'Yum World Finalist'
    },
    tags: ['Comfort Food', 'Rich Umami', 'Slow Cook'],
    dietary: ['Halal', 'High Protein'],
    matchScore: 94,
    ingredients: [
      { name: 'Beef Short Ribs', nameAr: 'أضلاع لحم بقري', amount: '800', unit: 'g', inPantry: false },
      { name: 'Smoked Artisanal Harissa', nameAr: 'هريسة مدخنة', amount: '2', unit: 'tbsp', inPantry: true },
      { name: 'Coarse Yellow Polenta', nameAr: 'بولينتا ذرة صفراء', amount: '200', unit: 'g', inPantry: true },
      { name: 'Caramelized Onion Paste', nameAr: 'معجون بصل مكرمل', amount: '3', unit: 'tbsp', inPantry: true },
      { name: 'Aged Sheep Cheese', nameAr: 'جبن غنم معتق', amount: '60', unit: 'g', inPantry: true }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'High-Heat Maillard Sear',
        instruction: 'Season short ribs generously with sea salt. Sear in heavy cocotte on all sides until deeply mahogany.',
        durationMinutes: 8,
        chefTip: 'High heat creates glutamate crystals which form the foundational gravy flavor.'
      },
      {
        stepNumber: 2,
        title: 'Harissa Deglaze & Simmer',
        instruction: 'Stir in smoked harissa and roasted alliums. Add dark stock, cover tight, and slow braise until fork-tender.',
        durationMinutes: 30,
        chefTip: 'A piece of parchment paper under the lid creates an aroma vapor lock.'
      },
      {
        stepNumber: 3,
        title: 'Velvet Polenta Whisk',
        instruction: 'Stream polenta into simmering milk-water, whisking continuously with butter and aged cheese.',
        durationMinutes: 7,
        chefTip: 'Finish with a grate of fresh nutmeg for subtle warmth.'
      }
    ],
    tasteProfile: { sweet: 3, savory: 10, spicy: 8, sour: 4, umami: 10 },
    zeroWasteTip: 'Save the bone broth collagen for rich morning egg poaches or noodle broth.'
  },
  {
    id: 'rec-3',
    title: 'Kyoto Golden Miso Ramen with Crispy Enoki',
    titleAr: 'رامن الميسو الذهبي من كيوتو مع فطر الإنوجي المقرمش',
    cuisine: 'Japanese Artisan',
    countryCode: 'JP',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80',
    prepTime: '15 mins',
    cookTime: '18 mins',
    difficulty: 'Easy',
    calories: 490,
    servings: 2,
    rating: 4.88,
    reviewsCount: 310,
    author: {
      name: 'Chef Kenzo Tanaka',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      badge: 'Ramen Grandmaster'
    },
    tags: ['Plant-Forward', 'Quick Dinner', 'Umami Bomb'],
    dietary: ['Vegetarian Option'],
    matchScore: 91,
    ingredients: [
      { name: 'Fresh Craft Ramen Noodles', nameAr: 'نودلز رامن طازجة', amount: '250', unit: 'g', inPantry: true },
      { name: 'Organic Shiro White Miso', nameAr: 'ميسو أبيض عضوي', amount: '3', unit: 'tbsp', inPantry: true },
      { name: 'Crispy Golden Enoki Mushrooms', nameAr: 'فطر إنوجي مقرمش', amount: '100', unit: 'g', inPantry: false },
      { name: 'Ajitsuke Tamago (Marinated Egg)', nameAr: 'بيض متبل', amount: '2', unit: 'whole', inPantry: true },
      { name: 'Toasted Sesame Oil & Chili Rayu', nameAr: 'زيت سمسم وزيت فلفل', amount: '1', unit: 'tbsp', inPantry: true }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Miso Tare Emulsion',
        instruction: 'Whisk white miso, mirin, grated ginger, and garlic paste in bowl base.',
        durationMinutes: 3,
        chefTip: 'Never boil miso broth furiously; gentle heat preserves live active ferment cultures.'
      },
      {
        stepNumber: 2,
        title: 'Noodle Spring Boil',
        instruction: 'Drop fresh noodles into roaring rolling boil for exactly 75 seconds. Shock-drain thoroughly.',
        durationMinutes: 2,
        chefTip: 'Aggressive shaking removes excess starch water for cleaner broth absorption.'
      },
      {
        stepNumber: 3,
        title: 'Plating Architecture',
        instruction: 'Ladle piping hot broth over tare, fold noodles into concentric nest, and arrange toppings clockwise.',
        durationMinutes: 3,
        chefTip: 'Eat within 5 minutes of serving to enjoy optimal tensile noodle snap.'
      }
    ],
    tasteProfile: { sweet: 2, savory: 9, spicy: 5, sour: 3, umami: 10 },
    zeroWasteTip: 'Mushroom trim stems can be dehydrated and ground into home umami seasoning powder.'
  },
  {
    id: 'rec-4',
    title: 'Pistachio Herb Crusted Lamb Chops with Pomegranate Molasses',
    titleAr: 'ريش غنم مغطاة بالفستق والأعشاب مع دبس الرمان',
    cuisine: 'Levantine Signature',
    countryCode: 'LB',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    prepTime: '15 mins',
    cookTime: '12 mins',
    difficulty: 'Medium',
    calories: 520,
    servings: 2,
    rating: 4.96,
    reviewsCount: 185,
    author: {
      name: 'Chef Nour El-Sayed',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      badge: 'Heritage Master'
    },
    tags: ['Gourmet', 'Keto Friendly', 'Signature'],
    dietary: ['Keto', 'Halal'],
    matchScore: 96,
    ingredients: [
      { name: 'French-Trimmed Lamb Chops', nameAr: 'ريش غنم', amount: '6', unit: 'pieces', inPantry: true },
      { name: 'Aleppo Crushed Pistachios', nameAr: 'فستق حلبي مجروش', amount: '60', unit: 'g', inPantry: true },
      { name: 'Pure Pomegranate Molasses', nameAr: 'دبس رمان طبيعي', amount: '2', unit: 'tbsp', inPantry: true },
      { name: 'Rosemary & Fresh Mint', nameAr: 'إكليل الجبل ونعناع طازج', amount: '2', unit: 'sprigs', inPantry: false },
      { name: 'Dijon Mustard & Ghee', nameAr: 'خردل وسمن نباتي', amount: '1', unit: 'tbsp', inPantry: true }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Herb Crust Press',
        instruction: 'Pulse pistachios with rosemary, sea salt, and lemon zest. Brush chops with Dijon and press crust firmly.',
        durationMinutes: 4,
        chefTip: 'Dijon acts as culinary glue keeping the fragrant nutty crust intact during high sear.'
      },
      {
        stepNumber: 2,
        title: 'Golden Sear & Oven Finish',
        instruction: 'Sear fat cap first in skillet, then cook 3 mins per side to rosy medium-rare (54°C internal).',
        durationMinutes: 6,
        chefTip: 'Resting on a warm board allows juices to redistribute into every muscle fiber.'
      },
      {
        stepNumber: 3,
        title: 'Pomegranate Glaze Drizzle',
        instruction: 'Warm molasses with a touch of butter and drizzle around the plate alongside fresh mint.',
        durationMinutes: 2,
        chefTip: 'The tart acidity balances the rich pasture lamb fat brilliantly.'
      }
    ],
    tasteProfile: { sweet: 5, savory: 9, spicy: 3, sour: 7, umami: 9 },
    zeroWasteTip: 'Rendered lamb fat makes the most phenomenal roasted crispy smashed potatoes.'
  }
];

export const INITIAL_PANTRY_ITEMS: PantryItem[] = [
  { id: 'p-1', name: 'Fresh Organic Spinach', category: 'Vegetables', quantity: '200 g', daysRemaining: 1, freshnessScore: 35, image: '🥬', isExpiringSoon: true },
  { id: 'p-2', name: 'Ripe Cherry Tomatoes', category: 'Vegetables', quantity: '350 g', daysRemaining: 2, freshnessScore: 50, image: '🍅', isExpiringSoon: true },
  { id: 'p-3', name: 'Fresh Seabass Fillets', category: 'Proteins', quantity: '2 fillets', daysRemaining: 2, freshnessScore: 65, image: '🐟', isExpiringSoon: true },
  { id: 'p-4', name: 'Greek Feta Cheese', category: 'Dairy', quantity: '150 g', daysRemaining: 4, freshnessScore: 80, image: '🧀' },
  { id: 'p-5', name: 'Eggs (Free Range)', category: 'Dairy', quantity: '6 pcs', daysRemaining: 6, freshnessScore: 90, image: '🥚' },
  { id: 'p-6', name: 'Saffron & Smoked Paprika', category: 'Pantry & Spices', quantity: '1 tin', daysRemaining: 60, freshnessScore: 98, image: '🌶️' },
  { id: 'p-7', name: 'Extra Virgin Olive Oil', category: 'Pantry & Spices', quantity: '750 ml', daysRemaining: 120, freshnessScore: 100, image: '🫒' },
  { id: 'p-8', name: 'Basmati Pearl Rice', category: 'Grains', quantity: '1 kg', daysRemaining: 180, freshnessScore: 100, image: '🍚' },
  { id: 'p-9', name: 'Artisan Sourdough Loaf', category: 'Bakery', quantity: '1/2 loaf', daysRemaining: 2, freshnessScore: 45, image: '🥖', isExpiringSoon: true }
];

export const INITIAL_BASKET_ITEMS: BasketItem[] = [
  { id: 'b-1', name: 'Fennel Bulb (sliced)', category: 'Produce', quantity: 2, unit: 'pcs', estimatedPrice: 3.50, checked: false, store: 'Green Market Organics', sourceRecipe: 'Saffron Citrus Seabass' },
  { id: 'b-2', name: 'Fresh Rosemary & Mint Sprigs', category: 'Herbs & Spices', quantity: 1, unit: 'bundle', estimatedPrice: 2.20, checked: false, store: 'Green Market Organics', sourceRecipe: 'Pistachio Crusted Lamb' },
  { id: 'b-3', name: 'Crispy Golden Enoki Mushrooms', category: 'Produce', quantity: 200, unit: 'g', estimatedPrice: 4.80, checked: false, store: 'Kyoto Imports Co.', sourceRecipe: 'Kyoto Golden Miso Ramen' },
  { id: 'b-4', name: 'Grass-Fed Beef Short Ribs', category: 'Meat & Seafood', quantity: 800, unit: 'g', estimatedPrice: 18.50, checked: true, store: 'Al-Madina Halal Meats', sourceRecipe: 'Smoked Harissa Braised Short Ribs' },
  { id: 'b-5', name: 'French Dijon Mustard', category: 'Condiments', quantity: 1, unit: 'jar', estimatedPrice: 3.20, checked: true, store: 'Green Market Organics' }
];

export const INITIAL_PASSPORT_STAMPS: PassportStamp[] = [
  {
    id: 'pass-it',
    country: 'Italy',
    countryAr: 'إيطاليا',
    flag: '🇮🇹',
    cuisineName: 'Mediterranean & Tuscan Heritage',
    unlocked: true,
    unlockDate: 'August 2026',
    dishesTried: 7,
    dishesTotal: 10,
    badgeLevel: 'Master',
    signatureDish: 'Saffron Seabass & Truffle Tagliolini',
    description: 'Home of delicate sea salts, aged balsamic, and time-honored pasta artistry.'
  },
  {
    id: 'pass-ma',
    country: 'Morocco',
    countryAr: 'المغرب',
    flag: '🇲🇦',
    cuisineName: 'Maghrebi Spiced Alchemy',
    unlocked: true,
    unlockDate: 'August 2026',
    dishesTried: 6,
    dishesTotal: 8,
    badgeLevel: 'Explorer',
    signatureDish: 'Tagine Royal & Smoked Harissa Ribs',
    description: 'Complex layers of ras el hanout, slow clay tagine heat, and sweet-savory harmony.'
  },
  {
    id: 'pass-jp',
    country: 'Japan',
    countryAr: 'اليابان',
    flag: '🇯🇵',
    cuisineName: 'Washoku & Kaiseki Precision',
    unlocked: true,
    unlockDate: 'July 2026',
    dishesTried: 8,
    dishesTotal: 12,
    badgeLevel: 'Grand Chef',
    signatureDish: 'Kyoto Golden Miso & A5 Wagyu Sear',
    description: 'Precision dashi reductions, umami perfection, and deep seasonal reverence.'
  },
  {
    id: 'pass-lb',
    country: 'Lebanon',
    countryAr: 'لبنان',
    flag: '🇱🇧',
    cuisineName: 'Levantine Mezze & Grill',
    unlocked: true,
    unlockDate: 'August 2026',
    dishesTried: 9,
    dishesTotal: 10,
    badgeLevel: 'Master',
    signatureDish: 'Pistachio Crusted Lamb & Fattoush',
    description: 'Vibrant sumac, cold-pressed olive oils, zaatar hills, and generous hospitality.'
  },
  {
    id: 'pass-mx',
    country: 'Mexico',
    countryAr: 'المكسيك',
    flag: '🇲🇽',
    cuisineName: 'Oaxacan Mole & Ancestral Maize',
    unlocked: false,
    dishesTried: 2,
    dishesTotal: 8,
    badgeLevel: 'Novice',
    signatureDish: 'Black Mole Negro & Blue Corn Tacos',
    description: '30-ingredient complex moles, smoky chipotle embers, and ancestral nixtamalization.'
  },
  {
    id: 'pass-in',
    country: 'India',
    countryAr: 'الهند',
    flag: '🇮🇳',
    cuisineName: 'Subcontinent Spice Symphony',
    unlocked: false,
    dishesTried: 3,
    dishesTotal: 10,
    badgeLevel: 'Novice',
    signatureDish: 'Dum Pukht Biryani & Black Lentil Dal',
    description: 'Mastery of whole-spice tempering (tadka), clay tandoor roasts, and layered aromatics.'
  }
];

export const INITIAL_BATTLES: BattleEntry[] = [
  {
    id: 'bat-1',
    title: 'The Ultimate Mediterranean Seafood Showdown',
    category: 'Coastal Masterclass',
    chefA: {
      name: 'Chef Marco Rossi (Rome)',
      avatar: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=200&q=80',
      dishName: 'Crispy Seabass with Saffron Emulsion',
      dishImage: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
      votes: 1420,
      bio: 'Michelin-starred coastal master with 15 years in Amalfi Coast kitchens.'
    },
    chefB: {
      name: 'Chef Samira Mansour (Beirut)',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80',
      dishName: 'Spiced Red Snapper with Tahini Tarator',
      dishImage: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
      votes: 1680,
      bio: 'Levantine innovator celebrating hyper-local spices and wood-fired grilling.'
    },
    status: 'Live Now',
    timeLeft: '04:18:22',
    totalVotes: 3100,
    theme: 'Zero-Waste Whole Fish Mastery'
  },
  {
    id: 'bat-2',
    title: 'AI vs Human: The 5-Ingredient Pantry Sprint',
    category: 'AI Fusion Challenge',
    chefA: {
      name: 'Yum AI Chef Engine',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      dishName: 'Smoked Harissa & Caramelized Tomato Polenta',
      dishImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      votes: 2150,
      bio: 'Algorithmic culinary intelligence analyzing 50,000+ molecular flavor pairings.'
    },
    chefB: {
      name: 'Chef Antoine Laurent (Paris)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      dishName: 'Brown Butter Tomato Tart Tatin with Feta Cream',
      dishImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
      votes: 2310,
      bio: 'French classical pastry chef pioneering savory vegetable reductions.'
    },
    status: 'Live Now',
    timeLeft: '01:45:10',
    totalVotes: 4460,
    theme: 'Tomato & Herb Surplus Rescue'
  }
];

export const INITIAL_LIVE_STREAMS: LiveStream[] = [
  {
    id: 'live-1',
    title: 'Mastering Hand-Pulled Biang Biang Noodles & Chili Oil',
    chefName: 'Chef Wei Zhang',
    chefAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80',
    viewers: 2840,
    dishName: 'Shaanxi Spicy Biang Biang Ribbon Noodles',
    isLive: true,
    tags: ['Live Cooking', 'Noodle Pulling', 'Q&A Open'],
    activeStep: 'Dough Stretching & Slapping Sound Wave',
    currentIngredients: ['High-Gluten Flour', 'Sichuan Peppercorns', 'Chili Flakes', 'Hot Black Vinegar']
  },
  {
    id: 'live-2',
    title: 'French Patisserie at Home: Choux & Craquelin Masterclass',
    chefName: 'Chef Claire Moreau',
    chefAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
    viewers: 1490,
    dishName: 'Crispy Praline Choux Puffs with Vanilla Diplomat',
    isLive: true,
    tags: ['Pastry School', 'Desserts', 'Precision Baking'],
    activeStep: 'Piping Cream & Craquelin Disk Assembly',
    currentIngredients: ['French Butter 84%', 'Madagascar Vanilla Pods', 'Hazelnut Praline', 'Sea Salt']
  }
];

// Catalog of the 38+ imported design screens
export const SCREEN_ARTIFACTS: ScreenArtifact[] = [
  { id: 'ai_cooking_mode', name: 'AI Voice Cooking Mode', category: 'AI & Voice', hasCode: true, hasScreen: true, codeUrl: '/raw/ai_cooking_mode/code.html', imageUrl: '/raw/ai_cooking_mode/screen.png', description: 'Hands-free voice guided cooking interface with interactive steps and timers' },
  { id: 'smart_pantry_zero_waste', name: 'Smart Pantry & Zero Waste', category: 'Sustainability', hasCode: true, hasScreen: true, codeUrl: '/raw/smart_pantry_zero_waste/code.html', imageUrl: '/raw/smart_pantry_zero_waste/screen.png', description: 'Inventory management and expiring-food recipe suggestion engine' },
  { id: 'smart_basket_engine', name: 'Smart Basket Engine', category: 'Shopping', hasCode: true, hasScreen: true, codeUrl: '/raw/smart_basket_engine/code.html', imageUrl: '/raw/smart_basket_engine/screen.png', description: 'AI optimized grocery grouping, aisle mapping, and budget management' },
  { id: 'yum_discover_explore_the_world_of_flavors', name: 'Discover Flavors', category: 'Discovery', hasCode: true, hasScreen: true, codeUrl: '/raw/yum_discover_explore_the_world_of_flavors/code.html', imageUrl: '/raw/yum_discover_explore_the_world_of_flavors/screen.png', description: 'Global culinary feed with personalized taste matching' },
  { id: 'yum_passport_global_culinary_journey', name: 'Yum Passport Journey', category: 'Gamification', hasCode: true, hasScreen: true, codeUrl: '/raw/yum_passport_global_culinary_journey/code.html', imageUrl: '/raw/yum_passport_global_culinary_journey/screen.png', description: 'Digital stamp collection and culinary achievements per country' },
  { id: 'yum_world_map_discover_global_flavors', name: 'Yum World Map Explorer', category: 'Discovery', hasCode: true, hasScreen: true, codeUrl: '/raw/yum_world_map_discover_global_flavors/code.html', imageUrl: '/raw/yum_world_map_discover_global_flavors/screen.png', description: 'Interactive geographic exploration of world cuisines and recipes' },
  { id: 'culinary_battles', name: 'Culinary Battles Arena', category: 'Community', hasCode: true, hasScreen: true, codeUrl: '/raw/culinary_battles/code.html', imageUrl: '/raw/culinary_battles/screen.png', description: 'Live chef showdowns and human vs AI cooking face-offs' },
  { id: 'culinary_live_studio', name: 'Live Cooking Studio', category: 'Live Streaming', hasCode: true, hasScreen: true, codeUrl: '/raw/culinary_live_studio/code.html', imageUrl: '/raw/culinary_live_studio/screen.png', description: 'Interactive broadcast suite with live ingredient overlays' },
  { id: 'culinary_world_championship', name: 'World Culinary Championship', category: 'Gamification', hasCode: true, hasScreen: true, codeUrl: '/raw/culinary_world_championship/code.html', imageUrl: '/raw/culinary_world_championship/screen.png', description: 'Global leaderboard and seasonal competitive challenges' },
  { id: 'ai_recipe_serendipity', name: 'AI Recipe Serendipity', category: 'AI & Voice', hasCode: true, hasScreen: true, codeUrl: '/raw/ai_recipe_serendipity/code.html', imageUrl: '/raw/ai_recipe_serendipity/screen.png', description: 'Algorithmic fusion and spontaneous bespoke recipe generator' },
  { id: 'ai_event_planner', name: 'AI Dinner Event Planner', category: 'Planning', hasCode: true, hasScreen: true, codeUrl: '/raw/ai_event_planner/code.html', imageUrl: '/raw/ai_event_planner/screen.png', description: 'Multi-course menu scheduling and ingredient volume scaling' },
  { id: 'family_kitchen_space', name: 'Family Kitchen Space', category: 'Collaboration', hasCode: true, hasScreen: true, codeUrl: '/raw/family_kitchen_space/code.html', imageUrl: '/raw/family_kitchen_space/screen.png', description: 'Shared family recipes, grocery lists, and kitchen chore assignments' },
  { id: 'smart_notifications', name: 'Smart Culinary Notifications', category: 'Utility', hasCode: true, hasScreen: true, codeUrl: '/raw/smart_notifications/code.html', imageUrl: '/raw/smart_notifications/screen.png', description: 'Expiry warnings, live battle alerts, and personalized recommendations' },
  { id: 'yum_login_experience', name: 'Yum Taste Onboarding', category: 'Authentication', hasCode: true, hasScreen: true, codeUrl: '/raw/yum_login_experience/code.html', imageUrl: '/raw/yum_login_experience/screen.png', description: 'Interactive culinary DNA taste profile calibration and login' },
  { id: 'yum_splash_screen', name: 'Yum Brand Splash', category: 'Brand', hasCode: true, hasScreen: true, codeUrl: '/raw/yum_splash_screen/code.html', imageUrl: '/raw/yum_splash_screen/screen.png', description: 'Yum visual identity and welcoming animation' },
  ...Array.from({ length: 38 }, (_, i) => {
    const num = i + 1;
    return {
      id: `_${num}`,
      name: `Prototype Screen ${num}`,
      category: num <= 10 ? 'Core Features' : num <= 20 ? 'Discovery & Social' : num <= 30 ? 'Kitchen & Tools' : 'Gamification & Profile',
      hasCode: true,
      hasScreen: true,
      codeUrl: `/raw/_${num}/code.html`,
      imageUrl: `/raw/_${num}/screen.png`,
      description: `High-fidelity responsive UI screen prototype #${num} for Yum FoodTech ecosystem`
    };
  })
];
