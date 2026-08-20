export type TabType = 
  | 'discover'
  | 'ai-cooking'
  | 'smart-pantry'
  | 'smart-basket'
  | 'world-map-passport'
  | 'culinary-battles'
  | 'live-studio'
  | 'screen-gallery';

export type Language = 'en' | 'ar';

export interface Recipe {
  id: string;
  title: string;
  titleAr?: string;
  cuisine: string;
  countryCode: string;
  image: string;
  prepTime: string;
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  calories: number;
  servings: number;
  rating: number;
  reviewsCount: number;
  author: {
    name: string;
    avatar: string;
    badge?: string;
  };
  tags: string[];
  dietary: string[];
  matchScore?: number; // AI Taste Match percentage
  ingredients: {
    name: string;
    nameAr?: string;
    amount: string;
    unit: string;
    inPantry?: boolean;
  }[];
  steps: {
    stepNumber: number;
    title: string;
    instruction: string;
    durationMinutes: number;
    chefTip?: string;
  }[];
  tasteProfile: {
    sweet: number;
    savory: number;
    spicy: number;
    sour: number;
    umami: number;
  };
  zeroWasteTip?: string;
}

export interface PantryItem {
  id: string;
  name: string;
  category: 'Vegetables' | 'Proteins' | 'Dairy' | 'Pantry & Spices' | 'Grains' | 'Bakery';
  quantity: string;
  daysRemaining: number;
  freshnessScore: number; // 0 to 100
  image: string;
  isExpiringSoon?: boolean;
}

export interface BasketItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  estimatedPrice: number;
  checked: boolean;
  store: string;
  sourceRecipe?: string;
}

export interface PassportStamp {
  id: string;
  country: string;
  countryAr: string;
  flag: string;
  cuisineName: string;
  unlocked: boolean;
  unlockDate?: string;
  dishesTried: number;
  dishesTotal: number;
  badgeLevel: 'Novice' | 'Explorer' | 'Master' | 'Grand Chef';
  signatureDish: string;
  description: string;
}

export interface BattleEntry {
  id: string;
  title: string;
  category: string;
  chefA: {
    name: string;
    avatar: string;
    dishName: string;
    dishImage: string;
    votes: number;
    bio: string;
  };
  chefB: {
    name: string;
    avatar: string;
    dishName: string;
    dishImage: string;
    votes: number;
    bio: string;
  };
  status: 'Live Now' | 'Upcoming' | 'Completed';
  timeLeft: string;
  totalVotes: number;
  theme: string;
}

export interface LiveStream {
  id: string;
  title: string;
  chefName: string;
  chefAvatar: string;
  thumbnail: string;
  viewers: number;
  dishName: string;
  isLive: boolean;
  tags: string[];
  activeStep: string;
  currentIngredients: string[];
}

export interface ScreenArtifact {
  id: string;
  name: string;
  category: string;
  hasCode: boolean;
  hasScreen: boolean;
  codeUrl: string | null;
  imageUrl: string | null;
  description: string;
}
