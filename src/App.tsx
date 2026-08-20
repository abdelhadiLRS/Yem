import React, { useState } from 'react';
import { 
  INITIAL_RECIPES, 
  INITIAL_PANTRY_ITEMS, 
  INITIAL_BASKET_ITEMS, 
  INITIAL_PASSPORT_STAMPS, 
  INITIAL_BATTLES, 
  INITIAL_LIVE_STREAMS,
  SCREEN_ARTIFACTS
} from './data/mockData';
import { TabType, Language, Recipe, BasketItem, PantryItem, PassportStamp, BattleEntry } from './types';
import { Header } from './components/Header';
import { DiscoverView } from './components/DiscoverView';
import { AICookingModeView } from './components/AICookingModeView';
import { SmartPantryZeroWasteView } from './components/SmartPantryZeroWasteView';
import { SmartBasketView } from './components/SmartBasketView';
import { PassportWorldMapView } from './components/PassportWorldMapView';
import { CulinaryBattlesView } from './components/CulinaryBattlesView';
import { LiveStudioView } from './components/LiveStudioView';
import { AIRecipeGeneratorModal } from './components/AIRecipeGeneratorModal';
import { ScreenExplorerModal } from './components/ScreenExplorerModal';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('discover');
  const [language, setLanguage] = useState<Language>('en');
  
  // App Domain States
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(INITIAL_PANTRY_ITEMS);
  const [basketItems, setBasketItems] = useState<BasketItem[]>(INITIAL_BASKET_ITEMS);
  const [passportStamps, setPassportStamps] = useState<PassportStamp[]>(INITIAL_PASSPORT_STAMPS);
  const [battles, setBattles] = useState<BattleEntry[]>(INITIAL_BATTLES);
  const [activeCookingRecipe, setActiveCookingRecipe] = useState<Recipe>(INITIAL_RECIPES[0]);

  // Modal States
  const [isAIGeneratorOpen, setIsAIGeneratorOpen] = useState(false);
  const [isScreenExplorerOpen, setIsScreenExplorerOpen] = useState(false);
  const [aiGeneratorInitialIngredients, setAiGeneratorInitialIngredients] = useState<string[]>([]);

  // Count expiring soon pantry items
  const expiringPantryCount = pantryItems.filter((i) => i.daysRemaining <= 2).length;

  const handleStartCooking = (recipe: Recipe) => {
    setActiveCookingRecipe(recipe);
    setActiveTab('ai-cooking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToBasket = (recipe: Recipe) => {
    const newItems: BasketItem[] = recipe.ingredients
      .filter((ing) => !ing.inPantry)
      .map((ing) => ({
        id: `b-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        name: ing.name,
        category: 'Produce',
        quantity: parseFloat(ing.amount) || 1,
        unit: ing.unit,
        estimatedPrice: 3.50,
        checked: false,
        store: 'Green Market Organics',
        sourceRecipe: recipe.title
      }));

    setBasketItems((prev) => [...newItems, ...prev]);
  };

  const handleGenerateZeroWasteRecipe = (ingredients: string[]) => {
    setAiGeneratorInitialIngredients(ingredients);
    setIsAIGeneratorOpen(true);
  };

  const handleRecipeGenerated = (newRecipe: Recipe) => {
    setRecipes((prev) => [newRecipe, ...prev]);
    setActiveCookingRecipe(newRecipe);
    setActiveTab('ai-cooking');
  };

  const isAr = language === 'ar';

  return (
    <div 
      dir={isAr ? 'rtl' : 'ltr'} 
      className={`min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-sans antialiased flex flex-col justify-between ${
        isAr ? 'font-arabic' : ''
      }`}
    >
      <div>
        {/* Navigation Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          language={language}
          setLanguage={setLanguage}
          onOpenAIGenerator={() => {
            setAiGeneratorInitialIngredients([]);
            setIsAIGeneratorOpen(true);
          }}
          onOpenScreenGallery={() => setIsScreenExplorerOpen(true)}
          pantryExpiringCount={expiringPantryCount}
        />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          {activeTab === 'discover' && (
            <DiscoverView
              recipes={recipes}
              language={language}
              onStartCooking={handleStartCooking}
              onAddToBasket={handleAddToBasket}
              onOpenAIGenerator={() => {
                setAiGeneratorInitialIngredients([]);
                setIsAIGeneratorOpen(true);
              }}
            />
          )}

          {activeTab === 'ai-cooking' && (
            <AICookingModeView
              recipe={activeCookingRecipe}
              language={language}
              onExit={() => setActiveTab('discover')}
            />
          )}

          {activeTab === 'smart-pantry' && (
            <SmartPantryZeroWasteView
              pantryItems={pantryItems}
              setPantryItems={setPantryItems}
              language={language}
              onGenerateZeroWasteRecipe={handleGenerateZeroWasteRecipe}
            />
          )}

          {activeTab === 'smart-basket' && (
            <SmartBasketView
              basketItems={basketItems}
              setBasketItems={setBasketItems}
              language={language}
            />
          )}

          {activeTab === 'world-map-passport' && (
            <PassportWorldMapView
              stamps={passportStamps}
              setStamps={setPassportStamps}
              language={language}
            />
          )}

          {activeTab === 'culinary-battles' && (
            <CulinaryBattlesView
              battles={battles}
              setBattles={setBattles}
              language={language}
            />
          )}

          {activeTab === 'live-studio' && (
            <LiveStudioView
              streams={INITIAL_LIVE_STREAMS}
              language={language}
            />
          )}

          {activeTab === 'screen-gallery' && (
            <div className="py-6">
              {/* Trigger the full screen explorer modal directly */}
              <button
                onClick={() => setIsScreenExplorerOpen(true)}
                className="w-full p-8 rounded-3xl bg-white border border-[#eee] shadow-md text-center space-y-3"
              >
                <div className="text-3xl">📱</div>
                <h3 className="font-bold text-lg text-[#1a1c1c]">
                  {isAr ? 'فتح معرض النماذج والشاشات المستوردة' : 'Open Imported Screen Prototypes Explorer'}
                </h3>
                <p className="text-xs text-[#564337]">
                  {isAr ? 'اضغط لاستعراض كافة الـ 38 شاشة الأصلية' : 'Click to launch the interactive viewport simulator for all 38 screens'}
                </p>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Global Footer */}
      <footer className="bg-white border-t border-[#f0ece9] py-8 text-center text-xs text-[#564337] mt-12">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse font-bold text-[#944a00]">
            <span>Yum – Your World of Food</span>
            <span>•</span>
            <span>AI-Native FoodTech Ecosystem</span>
          </div>
          <p className="text-[11px] text-stone-400">
            Smart Food. Smarter Cooking. Zero-Waste Culinary Intelligence.
          </p>
        </div>
      </footer>

      {/* AI Recipe Generator Modal */}
      <AIRecipeGeneratorModal
        isOpen={isAIGeneratorOpen}
        onClose={() => setIsAIGeneratorOpen(false)}
        onRecipeGenerated={handleRecipeGenerated}
        language={language}
        initialIngredients={aiGeneratorInitialIngredients}
      />

      {/* 38+ Screen Prototype Explorer Modal */}
      <ScreenExplorerModal
        isOpen={isScreenExplorerOpen}
        onClose={() => setIsScreenExplorerOpen(false)}
        screens={SCREEN_ARTIFACTS}
        language={language}
      />
    </div>
  );
}
export default App;
