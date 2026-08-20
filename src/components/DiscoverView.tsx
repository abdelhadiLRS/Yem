import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Clock, 
  Users, 
  Flame, 
  Bookmark, 
  Play, 
  Plus, 
  Check, 
  Heart,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Recipe, Language } from '../types';

interface DiscoverViewProps {
  recipes: Recipe[];
  language: Language;
  onStartCooking: (recipe: Recipe) => void;
  onAddToBasket: (recipe: Recipe) => void;
  onOpenAIGenerator: () => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  recipes,
  language,
  onStartCooking,
  onAddToBasket,
  onOpenAIGenerator
}) => {
  const isAr = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [savedRecipeIds, setSavedRecipeIds] = useState<string[]>(['rec-1']);
  const [addedToBasketRecipeId, setAddedToBasketRecipeId] = useState<string | null>(null);

  const tags = isAr 
    ? ['الكل', 'المؤونة صفر هدر', 'بروتين عالي', 'نباتي', 'خالي من الجلوتين', 'أطباق شيف مميزة']
    : ['All', 'Zero Waste', 'High Protein', 'Vegetarian', 'Gluten-Free', 'Chef Pick'];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (recipe.titleAr && recipe.titleAr.includes(searchQuery)) ||
      recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedTag === 'All' || selectedTag === 'الكل') return matchesSearch;
    return matchesSearch && recipe.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase());
  });

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedRecipeIds(prev => 
      prev.includes(id) ? prev.filter(rId => rId !== id) : [...prev, id]
    );
  };

  const handleAddBasketClick = (recipe: Recipe, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToBasket(recipe);
    setAddedToBasketRecipeId(recipe.id);
    setTimeout(() => setAddedToBasketRecipeId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Dynamic Culinary DNA Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#502600] via-[#944a00] to-[#e67e22] text-white p-6 sm:p-10 shadow-xl shadow-[#944a00]/15">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-[#ffdcc5]" />
            <span>{isAr ? 'توصية الذكاء الاصطناعي اليومية' : 'Personalized Yum AI Daily Feature'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight">
            {isAr ? 'اكتشف عالم النكهات والطهي الذكي المستدام' : 'Discover the World of Flavors & Intelligent Cooking'}
          </h1>

          <p className="text-sm sm:text-base text-[#ffdcc5]/90 max-w-xl">
            {isAr 
              ? 'توليد وصفات فورية من محتويات ثلاجتك، إرشادات صوتية دقيقة خطوة بخطوة، واستكشاف ثراء المطابخ العالمية.'
              : 'Zero-waste culinary generation from your pantry items, hands-free voice guidance, and global gourmet masterclasses.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              id="hero-ai-gen-btn"
              onClick={onOpenAIGenerator}
              className="flex items-center space-x-2 rtl:space-x-reverse bg-white text-[#944a00] hover:bg-[#ffdcc5] px-5 py-2.5 rounded-full font-bold text-sm shadow-md transition-transform active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#e67e22]" />
              <span>{isAr ? 'ابتكر وصفة مخصصة الآن' : 'Create AI Custom Recipe'}</span>
            </button>
            <button
              id="hero-cook-mode-btn"
              onClick={() => onStartCooking(recipes[0])}
              className="flex items-center space-x-2 rtl:space-x-reverse bg-black/25 hover:bg-black/40 text-white px-5 py-2.5 rounded-full font-semibold text-sm border border-white/20 transition-colors"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isAr ? 'جرب وضع الطبخ الصوتي' : 'Test AI Voice Mode'}</span>
            </button>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block opacity-90">
          <div className="w-56 h-56 rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl rotate-3 hover:rotate-0 transition-transform">
            <img 
              src={recipes[0].image} 
              alt={recipes[0].title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Search & Filtering Bar */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#897365]" />
            <input
              type="text"
              id="recipe-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث عن طبق، مكون، أو مطبخ عالمي...' : 'Search recipes, ingredients, or world cuisines...'}
              className="w-full pl-11 rtl:pl-4 rtl:pr-11 pr-4 py-3 rounded-2xl bg-white border border-[#e2e2e2] text-sm focus:outline-hidden focus:border-[#e67e22] focus:ring-2 focus:ring-[#e67e22]/20 shadow-xs"
            />
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-[#564337] px-2">
            <span className="font-semibold">{filteredRecipes.length}</span>
            <span>{isAr ? 'وصفة متوفرة' : 'gourmet recipes'}</span>
          </div>
        </div>

        {/* Tag Pills */}
        <div className="flex space-x-2 rtl:space-x-reverse overflow-x-auto hide-scrollbar py-1">
          {tags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#944a00] text-white shadow-xs'
                    : 'bg-white text-[#564337] border border-[#e2e2e2] hover:bg-[#f3f3f3]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => {
          const isSaved = savedRecipeIds.includes(recipe.id);
          const isBasketAdded = addedToBasketRecipeId === recipe.id;

          return (
            <div
              key={recipe.id}
              id={`recipe-card-${recipe.id}`}
              onClick={() => setSelectedRecipe(recipe)}
              className="yum-card overflow-hidden group cursor-pointer flex flex-col justify-between"
            >
              {/* Image & Badges */}
              <div className="relative h-52 w-full overflow-hidden bg-stone-100">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Country Flag & Match Badge */}
                <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-[#1a1c1c] shadow-xs">
                    {recipe.cuisine}
                  </span>
                  {recipe.matchScore && (
                    <span className="bg-[#006d37] text-white px-2 py-0.5 rounded-full text-[11px] font-bold shadow-xs">
                      {recipe.matchScore}% {isAr ? 'تطابق' : 'Match'}
                    </span>
                  )}
                </div>

                {/* Save Bookmark Button */}
                <button
                  onClick={(e) => toggleSave(recipe.id, e)}
                  className="absolute top-3 right-3 rtl:right-auto rtl:left-3 w-9 h-9 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center text-[#944a00] hover:bg-white transition-colors shadow-xs"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#e67e22] text-[#e67e22]' : ''}`} />
                </button>

                {/* Bottom Card Image Overlays */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{recipe.cookTime}</span>
                    </span>
                    <span className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Flame className="w-3.5 h-3.5 text-[#ffdcc5]" />
                      <span>{recipe.calories} kcal</span>
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-black/40 text-[11px] font-semibold">
                    {recipe.difficulty}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-bold text-base text-[#1a1c1c] line-clamp-1 group-hover:text-[#944a00] transition-colors">
                    {isAr && recipe.titleAr ? recipe.titleAr : recipe.title}
                  </h3>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-[#564337]">
                    <img 
                      src={recipe.author.avatar} 
                      alt={recipe.author.name} 
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span>{recipe.author.name}</span>
                  </div>
                </div>

                {/* Ingredient Pantry Preview */}
                <div className="text-xs bg-[#f9f9f9] p-2.5 rounded-xl border border-[#eee] flex items-center justify-between">
                  <span className="text-[#564337]">
                    {recipe.ingredients.filter(i => i.inPantry).length}/{recipe.ingredients.length} {isAr ? 'مكونات في مؤونتك' : 'in your pantry'}
                  </span>
                  <span className="font-semibold text-[#006d37]">
                    {Math.round((recipe.ingredients.filter(i => i.inPantry).length / recipe.ingredients.length) * 100)}% {isAr ? 'جاهز' : 'ready'}
                  </span>
                </div>

                {/* Card Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartCooking(recipe);
                    }}
                    className="flex items-center justify-center space-x-1.5 rtl:space-x-reverse bg-[#e67e22] hover:bg-[#944a00] text-white py-2 rounded-xl text-xs font-semibold transition-colors shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{isAr ? 'ابدأ الطبخ' : 'Cook Voice'}</span>
                  </button>

                  <button
                    onClick={(e) => handleAddBasketClick(recipe, e)}
                    className={`flex items-center justify-center space-x-1.5 rtl:space-x-reverse py-2 rounded-xl text-xs font-semibold transition-colors border ${
                      isBasketAdded
                        ? 'bg-[#006d37] text-white border-[#006d37]'
                        : 'bg-white text-[#564337] border-[#e2e2e2] hover:bg-[#f3f3f3]'
                    }`}
                  >
                    {isBasketAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>{isBasketAdded ? (isAr ? 'تمت الإضافة' : 'Added') : (isAr ? 'أضف للسلة' : 'Get Items')}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col my-auto border border-[#eee]">
            
            {/* Modal Header Image */}
            <div className="relative h-64 sm:h-72 w-full bg-stone-900 shrink-0">
              <img 
                src={selectedRecipe.image} 
                alt={selectedRecipe.title} 
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 rtl:right-auto rtl:left-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center font-bold text-lg"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white space-y-2">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="bg-[#e67e22] text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
                    {selectedRecipe.cuisine}
                  </span>
                  <span className="bg-white/20 backdrop-blur-md text-xs px-2 py-0.5 rounded-full">
                    {selectedRecipe.difficulty}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  {isAr && selectedRecipe.titleAr ? selectedRecipe.titleAr : selectedRecipe.title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-[#1a1c1c]">
              
              {/* Quick Specs */}
              <div className="grid grid-cols-4 gap-3 bg-[#f9f9f9] p-3.5 rounded-2xl border border-[#eee] text-center">
                <div>
                  <p className="text-[11px] text-[#564337]">{isAr ? 'التحضير' : 'Prep Time'}</p>
                  <p className="font-bold text-sm">{selectedRecipe.prepTime}</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#564337]">{isAr ? 'الطهي' : 'Cook Time'}</p>
                  <p className="font-bold text-sm">{selectedRecipe.cookTime}</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#564337]">{isAr ? 'الحصص' : 'Servings'}</p>
                  <p className="font-bold text-sm">{selectedRecipe.servings} {isAr ? 'أشخاص' : 'prs'}</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#564337]">{isAr ? 'السعرات' : 'Calories'}</p>
                  <p className="font-bold text-sm text-[#944a00]">{selectedRecipe.calories}</p>
                </div>
              </div>

              {/* Zero Waste Tip */}
              {selectedRecipe.zeroWasteTip && (
                <div className="bg-[#006d37]/10 border border-[#006d37]/20 p-4 rounded-2xl flex items-start space-x-3 rtl:space-x-reverse">
                  <ShieldCheck className="w-5 h-5 text-[#006d37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs text-[#006d37] uppercase tracking-wider">
                      {isAr ? 'نصيحة صفر هدر من شيف يم' : 'Yum Zero-Waste Kitchen Tip'}
                    </h4>
                    <p className="text-xs text-[#1a1c1c] mt-0.5">{selectedRecipe.zeroWasteTip}</p>
                  </div>
                </div>
              )}

              {/* Ingredients List */}
              <div className="space-y-3">
                <h3 className="font-bold text-base flex items-center justify-between">
                  <span>{isAr ? 'المكونات المطلوبة' : 'Required Ingredients'}</span>
                  <span className="text-xs text-[#564337] font-normal">
                    {selectedRecipe.ingredients.length} {isAr ? 'عناصر' : 'items'}
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedRecipe.ingredients.map((ing, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-[#f0ece9] bg-[#ffffff] text-xs"
                    >
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className={`w-2 h-2 rounded-full ${ing.inPantry ? 'bg-[#006d37]' : 'bg-[#ba1a1a]'}`} />
                        <span className="font-medium">{isAr && ing.nameAr ? ing.nameAr : ing.name}</span>
                      </div>
                      <span className="font-semibold text-[#564337]">{ing.amount} {ing.unit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps Preview */}
              <div className="space-y-3">
                <h3 className="font-bold text-base">{isAr ? 'خطوات التحضير والإعداد' : 'Preparation Method'}</h3>
                <div className="space-y-3">
                  {selectedRecipe.steps.map((step) => (
                    <div key={step.stepNumber} className="p-3.5 rounded-2xl bg-[#f9f9f9] border border-[#eee] space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#944a00]">
                          {isAr ? `الخطوة ${step.stepNumber}: ${step.title}` : `Step ${step.stepNumber}: ${step.title}`}
                        </span>
                        <span className="text-[11px] text-[#564337] font-medium">{step.durationMinutes} mins</span>
                      </div>
                      <p className="text-[#1a1c1c] leading-relaxed">{step.instruction}</p>
                      {step.chefTip && (
                        <p className="text-[11px] text-[#564337] bg-white p-2 rounded-lg border border-[#f0ece9] italic">
                          💡 {step.chefTip}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 border-t border-[#eee] bg-[#f9f9f9] flex items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => {
                  onAddToBasket(selectedRecipe);
                  setSelectedRecipe(null);
                }}
                className="flex items-center justify-center space-x-2 rtl:space-x-reverse px-4 py-2.5 rounded-xl border border-[#e2e2e2] bg-white hover:bg-[#f3f3f3] text-xs font-semibold text-[#1a1c1c]"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? 'إضافة المكونات للسلة' : 'Add Ingredients to Basket'}</span>
              </button>

              <button
                onClick={() => {
                  onStartCooking(selectedRecipe);
                  setSelectedRecipe(null);
                }}
                className="flex-1 flex items-center justify-center space-x-2 rtl:space-x-reverse px-6 py-2.5 rounded-xl bg-[#e67e22] hover:bg-[#944a00] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#e67e22]/20"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isAr ? 'بدء جلسة الطبخ الصوتي بالذكاء الاصطناعي' : 'Launch AI Voice Cooking Session'}</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
