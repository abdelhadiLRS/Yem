import React, { useState } from 'react';
import { 
  Sparkles, 
  ChefHat, 
  Flame, 
  Clock, 
  Plus, 
  Check, 
  Play, 
  X, 
  Loader2, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Recipe, Language } from '../types';

interface AIRecipeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecipeGenerated: (recipe: Recipe) => void;
  language: Language;
  initialIngredients?: string[];
}

export const AIRecipeGeneratorModal: React.FC<AIRecipeGeneratorModalProps> = ({
  isOpen,
  onClose,
  onRecipeGenerated,
  language,
  initialIngredients = []
}) => {
  const isAr = language === 'ar';
  const [prompt, setPrompt] = useState('');
  const [ingredientsText, setIngredientsText] = useState(initialIngredients.join(', '));
  const [cuisine, setCuisine] = useState('Mediterranean Fusion');
  const [dietaryOptions, setDietaryOptions] = useState<string[]>([]);
  const [cookingTime, setCookingTime] = useState(25);
  const [loading, setLoading] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);

  if (!isOpen) return null;

  const cuisines = [
    'Mediterranean Fusion',
    'Levantine Gourmet',
    'North African Spiced',
    'Japanese Artisan Washoku',
    'Oaxacan Modern',
    'Italian Coastal',
    'South Asian Spice Craft'
  ];

  const dietaryChoices = ['Zero Waste', 'High Protein', 'Gluten-Free', 'Vegetarian', 'Keto Friendly', 'Halal'];

  const toggleDietary = (item: string) => {
    setDietaryOptions((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedRecipe(null);

    const ingArray = ingredientsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const response = await fetch('/api/ai/recipe-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          ingredients: ingArray,
          cuisine,
          dietary: dietaryOptions,
          cookingTime
        })
      });

      const data = await response.json();
      if (data.success && data.recipe) {
        const fullRecipe: Recipe = {
          id: `ai-rec-${Date.now()}`,
          title: data.recipe.title,
          cuisine: data.recipe.cuisine || cuisine,
          countryCode: 'UN',
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
          prepTime: data.recipe.prepTime || '12 mins',
          cookTime: data.recipe.cookTime || `${cookingTime} mins`,
          difficulty: data.recipe.difficulty || 'Medium',
          calories: data.recipe.calories || 450,
          servings: data.recipe.servings || 2,
          rating: 5.0,
          reviewsCount: 1,
          author: {
            name: 'Yum AI Culinary Engine',
            avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
            badge: 'Gemini AI'
          },
          tags: data.recipe.tags || ['Yum AI Generated', 'Zero Waste'],
          dietary: dietaryOptions,
          matchScore: 99,
          ingredients: data.recipe.ingredients.map((ing: any) => ({
            name: ing.item || ing.name,
            amount: ing.amount || '1',
            unit: ing.unit || 'serving',
            inPantry: ing.pantryMatch ?? true
          })),
          steps: data.recipe.steps.map((st: any, idx: number) => ({
            stepNumber: st.stepNumber || idx + 1,
            title: st.title || `Step ${idx + 1}`,
            instruction: st.instruction,
            durationMinutes: st.durationMinutes || 4,
            chefTip: st.chefTip
          })),
          tasteProfile: data.recipe.tasteProfile || { sweet: 3, savory: 9, spicy: 5, sour: 6, umami: 9 },
          zeroWasteTip: data.recipe.zeroWasteTip
        };

        setGeneratedRecipe(fullRecipe);
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUseRecipe = () => {
    if (generatedRecipe) {
      onRecipeGenerated(generatedRecipe);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-[#eee] max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f0ece9] pb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#944a00] to-[#e67e22] text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#1a1c1c]">
                {isAr ? 'مولّد الوصفات والطهي الذكي بالذكاء الاصطناعي' : 'Yum AI Recipe & Fusion Generator'}
              </h2>
              <p className="text-xs text-[#564337]">
                {isAr ? 'ابتكر وصفات مخصصة فورية بناءً على مكوناتك ورغباتك' : 'Craft custom recipes with Zero-Waste intelligence'}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-stone-400 hover:text-black rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!generatedRecipe ? (
          <form onSubmit={handleGenerate} className="space-y-5">
            {/* Ingredients Available */}
            <div>
              <label className="text-xs font-bold text-[#564337] block mb-1">
                {isAr ? 'المكونات المتوفرة لديك (افصل بفواصل)' : 'Available Ingredients (comma-separated)'}
              </label>
              <input
                type="text"
                value={ingredientsText}
                onChange={(e) => setIngredientsText(e.target.value)}
                placeholder="e.g. Seabass fillet, saffron, fennel, lemon, olive oil..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#e2e2e2] text-xs focus:border-[#e67e22] focus:outline-hidden"
              />
            </div>

            {/* Cuisine Selector */}
            <div>
              <label className="text-xs font-bold text-[#564337] block mb-1">
                {isAr ? 'طابع المطبخ أو أسلوب الطهي' : 'Culinary Style / Cuisine Fusion'}
              </label>
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#e2e2e2] text-xs bg-white"
              >
                {cuisines.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Dietary Tags */}
            <div>
              <label className="text-xs font-bold text-[#564337] block mb-1.5">
                {isAr ? 'التفضيلات الغذائية والصحية' : 'Dietary & Wellness Tags'}
              </label>
              <div className="flex flex-wrap gap-2">
                {dietaryChoices.map((d) => {
                  const isChecked = dietaryOptions.includes(d);
                  return (
                    <button
                      type="button"
                      key={d}
                      onClick={() => toggleDietary(d)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        isChecked
                          ? 'bg-[#944a00] text-white shadow-xs'
                          : 'bg-[#f3f3f3] text-[#564337] hover:bg-[#e8e8e8]'
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-[#564337] mb-1">
                <span>{isAr ? 'وقت الطهي المستهدف' : 'Target Cooking Time'}</span>
                <span className="text-[#944a00]">{cookingTime} {isAr ? 'دقيقة' : 'mins'}</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={cookingTime}
                onChange={(e) => setCookingTime(Number(e.target.value))}
                className="w-full accent-[#e67e22]"
              />
            </div>

            {/* Custom Request Prompt */}
            <div>
              <label className="text-xs font-bold text-[#564337] block mb-1">
                {isAr ? 'رغبات إضافية أو نكهات تفضلها' : 'Special Cravings or Flavor Notes (Optional)'}
              </label>
              <textarea
                rows={2}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={isAr ? 'مثال: اجعلها خفيفة، مع صوص كريمي غني بالحمضيات...' : 'e.g. Make it vibrant with a silky citrus reduction...'}
                className="w-full px-4 py-2 rounded-xl border border-[#e2e2e2] text-xs focus:border-[#e67e22] focus:outline-hidden"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-[#e67e22] to-[#944a00] hover:opacity-95 text-white py-3.5 rounded-2xl text-sm font-bold shadow-lg shadow-[#e67e22]/25 transition-all active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{isAr ? 'جاري ابتكار الوصفة بالذكاء الاصطناعي...' : 'Crafting Bespoke Recipe with Yum AI...'}</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>{isAr ? 'توليد الوصفة الآن' : 'Generate Bespoke Recipe'}</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Generated Recipe Preview */
          <div className="space-y-6">
            <div className="bg-[#fef9f5] border border-[#ffdcc5] p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-[#e67e22] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  {generatedRecipe.cuisine}
                </span>
                <span className="text-xs font-semibold text-[#564337] flex items-center space-x-1 rtl:space-x-reverse">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{generatedRecipe.cookTime}</span>
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#1a1c1c]">{generatedRecipe.title}</h3>
              <p className="text-xs text-[#564337]">{generatedRecipe.ingredients.length} ingredients • {generatedRecipe.steps.length} steps</p>

              {/* Zero Waste Tip */}
              {generatedRecipe.zeroWasteTip && (
                <div className="bg-white p-3 rounded-xl border border-[#ffdcc5] flex items-center space-x-2 rtl:space-x-reverse text-xs text-[#006d37]">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{generatedRecipe.zeroWasteTip}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 rtl:space-x-reverse">
              <button
                onClick={() => setGeneratedRecipe(null)}
                className="px-4 py-2.5 rounded-xl border border-[#e2e2e2] text-xs font-semibold text-[#564337] hover:bg-[#f3f3f3]"
              >
                {isAr ? 'تعديل الإعدادات' : 'Modify Settings'}
              </button>

              <button
                onClick={handleUseRecipe}
                className="flex-1 flex items-center justify-center space-x-2 rtl:space-x-reverse bg-[#e67e22] hover:bg-[#944a00] text-white py-2.5 rounded-xl text-xs font-bold shadow-md shadow-[#e67e22]/20"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isAr ? 'فتح الوصفة والبدء فوراً' : 'Save & Launch Cooking'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
