import React, { useState } from 'react';
import { 
  Refrigerator, 
  AlertTriangle, 
  Sparkles, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Flame, 
  Leaf, 
  TrendingUp, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { PantryItem, Recipe, Language } from '../types';

interface SmartPantryZeroWasteViewProps {
  pantryItems: PantryItem[];
  setPantryItems: React.Dispatch<React.SetStateAction<PantryItem[]>>;
  language: Language;
  onGenerateZeroWasteRecipe: (ingredients: string[]) => void;
}

export const SmartPantryZeroWasteView: React.FC<SmartPantryZeroWasteViewProps> = ({
  pantryItems,
  setPantryItems,
  language,
  onGenerateZeroWasteRecipe
}) => {
  const isAr = language === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<PantryItem['category']>('Vegetables');
  const [newItemQuantity, setNewItemQuantity] = useState('1 pc');
  const [newItemDays, setNewItemDays] = useState(5);

  const categories = isAr
    ? ['الكل', 'الخضروات', 'البروتينات', 'منتجات الألبان', 'المؤونة والتوابل', 'الحبوب', 'المخبوزات']
    : ['All', 'Vegetables', 'Proteins', 'Dairy', 'Pantry & Spices', 'Grains', 'Bakery'];

  const categoryMap: Record<string, string> = {
    'الخضروات': 'Vegetables',
    'البروتينات': 'Proteins',
    'منتجات الألبان': 'Dairy',
    'المؤونة والتوابل': 'Pantry & Spices',
    'الحبوب': 'Grains',
    'المخبوزات': 'Bakery'
  };

  const expiringItems = pantryItems.filter((i) => i.daysRemaining <= 2);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: PantryItem = {
      id: `p-${Date.now()}`,
      name: newItemName.trim(),
      category: newItemCategory,
      quantity: newItemQuantity,
      daysRemaining: Number(newItemDays),
      freshnessScore: Math.min(100, Math.max(20, Number(newItemDays) * 15)),
      image: newItemCategory === 'Vegetables' ? '🥦' : newItemCategory === 'Proteins' ? '🥩' : newItemCategory === 'Dairy' ? '🧀' : '📦',
      isExpiringSoon: Number(newItemDays) <= 2
    };

    setPantryItems((prev) => [newItem, ...prev]);
    setNewItemName('');
    setShowAddModal(false);
  };

  const handleDeleteItem = (id: string) => {
    setPantryItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleRescueExpiring = () => {
    const ingredientsToRescue = expiringItems.map((i) => i.name);
    onGenerateZeroWasteRecipe(ingredientsToRescue.length > 0 ? ingredientsToRescue : pantryItems.slice(0, 3).map(i => i.name));
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* Zero Waste Impact & Pantry Health Header Card */}
      <section className="rounded-3xl bg-gradient-to-r from-[#006d37] to-[#1d3347] text-white p-6 sm:p-8 shadow-lg shadow-[#006d37]/15">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/15 px-3 py-1 rounded-full text-xs font-semibold">
              <Leaf className="w-3.5 h-3.5 text-[#6bfe9c]" />
              <span>{isAr ? 'مؤشر استدامة المطبخ الذكي' : 'Kitchen Sustainability Score'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              {isAr ? 'المؤونة الذكية وحلول صفر هدر غذائي' : 'Smart Zero-Waste Pantry Engine'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-200">
              {isAr
                ? 'أنقذ مكوناتك قبل انتهاء صلاحيتها. يبتكر ذكاء يم وصفات شهية تستهلك الأطعمة العاجلة بدقة.'
                : 'Track expiry, eliminate kitchen food waste, and generate custom gourmet recipes from surplus items.'}
            </p>
          </div>

          <div className="flex items-center space-x-4 rtl:space-x-reverse bg-black/25 p-4 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#6bfe9c]">94%</span>
              <p className="text-[11px] text-stone-300">{isAr ? 'كفاءة الاستهلاك' : 'Waste Saved'}</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#ffdcc5]">{expiringItems.length}</span>
              <p className="text-[11px] text-stone-300">{isAr ? 'أطعمة عاجلة' : 'Expiring Soon'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Expiring Soon Rescue Banner */}
      {expiringItems.length > 0 && (
        <section className="bg-[#ffdad6]/60 border border-[#ffdad6] p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#93000a]">
                {isAr ? `تنبيه: ${expiringItems.length} مكونات توشك على انتهاء الصلاحية` : `Urgent: ${expiringItems.length} items expiring within 48 hours`}
              </h3>
              <p className="text-xs text-[#564337] mt-0.5">
                {expiringItems.map((i) => i.name).join(' • ')}
              </p>
            </div>
          </div>

          <button
            onClick={handleRescueExpiring}
            className="flex items-center space-x-2 rtl:space-x-reverse bg-[#ba1a1a] hover:bg-[#93000a] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-transform active:scale-95 shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAr ? 'توليد وصفة إنقاذ فورية' : 'Generate Rescue Recipe'}</span>
          </button>
        </section>
      )}

      {/* Control Bar & Actions */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Category Filter */}
        <div className="flex space-x-2 rtl:space-x-reverse overflow-x-auto hide-scrollbar py-1 w-full sm:w-auto">
          {categories.map((cat) => {
            const normalized = categoryMap[cat] || cat;
            const isSelected = selectedCategory === normalized || (selectedCategory === 'All' && (cat === 'All' || cat === 'الكل'));
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(normalized === 'الكل' ? 'All' : normalized)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#006d37] text-white'
                    : 'bg-white text-[#564337] border border-[#e2e2e2] hover:bg-[#f3f3f3]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Add Item Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 rtl:space-x-reverse bg-[#006d37] hover:bg-[#005228] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>{isAr ? 'إضافة مكون للمؤونة' : 'Add Pantry Item'}</span>
        </button>
      </section>

      {/* Pantry Items Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pantryItems
          .filter((item) => selectedCategory === 'All' || item.category === selectedCategory)
          .map((item) => {
            const isUrgent = item.daysRemaining <= 2;
            return (
              <div
                key={item.id}
                className={`yum-card p-4 flex flex-col justify-between space-y-3 relative overflow-hidden bg-white border ${
                  isUrgent ? 'border-[#ffdad6] bg-[#fffcfb]' : 'border-[#eee]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="text-2xl">{item.image}</span>
                    <div>
                      <h4 className="font-bold text-sm text-[#1a1c1c]">{item.name}</h4>
                      <span className="text-[11px] text-[#564337]">{item.category}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-stone-400 hover:text-[#ba1a1a] transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Freshness Bar & Days */}
                <div className="space-y-1.5 pt-2 border-t border-[#f0ece9]">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#564337]">{item.quantity}</span>
                    <span className={isUrgent ? 'text-[#ba1a1a] font-bold' : 'text-[#006d37]'}>
                      {item.daysRemaining} {isAr ? 'أيام متبقية' : 'days left'}
                    </span>
                  </div>

                  <div className="w-full bg-[#f0ece9] h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isUrgent ? 'bg-[#ba1a1a]' : item.freshnessScore > 70 ? 'bg-[#006d37]' : 'bg-[#e67e22]'
                      }`}
                      style={{ width: `${item.freshnessScore}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </section>

      {/* Add Pantry Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 space-y-5 shadow-2xl border border-[#eee]">
            <div className="flex items-center justify-between border-b border-[#f0ece9] pb-3">
              <h3 className="font-bold text-base text-[#1a1c1c]">
                {isAr ? 'إضافة مكون جديد إلى المؤونة' : 'Add New Pantry Item'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-black">✕</button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#564337] block mb-1">
                  {isAr ? 'اسم المكون' : 'Item Name'}
                </label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder={isAr ? 'مثال: أفوكادو ناضج، كزبرة طازجة...' : 'e.g., Organic Avocados, Fresh Basil...'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e2e2] text-xs focus:border-[#006d37] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#564337] block mb-1">
                    {isAr ? 'التصنيف' : 'Category'}
                  </label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#e2e2e2] text-xs bg-white"
                  >
                    <option value="Vegetables">{isAr ? 'الخضروات' : 'Vegetables'}</option>
                    <option value="Proteins">{isAr ? 'البروتينات' : 'Proteins'}</option>
                    <option value="Dairy">{isAr ? 'منتجات الألبان' : 'Dairy'}</option>
                    <option value="Pantry & Spices">{isAr ? 'المؤونة والتوابل' : 'Pantry & Spices'}</option>
                    <option value="Grains">{isAr ? 'الحبوب' : 'Grains'}</option>
                    <option value="Bakery">{isAr ? 'المخبوزات' : 'Bakery'}</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#564337] block mb-1">
                    {isAr ? 'الكمية' : 'Quantity'}
                  </label>
                  <input
                    type="text"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(e.target.value)}
                    placeholder="e.g. 500 g / 2 pcs"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e2e2] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#564337] block mb-1">
                  {isAr ? 'أيام الصلاحية المقدرة' : 'Estimated Days to Expiry'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="365"
                  value={newItemDays}
                  onChange={(e) => setNewItemDays(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e2e2] text-xs"
                />
              </div>

              <div className="flex justify-end space-x-2 rtl:space-x-reverse pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#564337] hover:bg-[#f3f3f3]"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#006d37] hover:bg-[#005228] text-white text-xs font-bold shadow-xs"
                >
                  {isAr ? 'حفظ المكون' : 'Save to Pantry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
