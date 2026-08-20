import React, { useState } from 'react';
import { 
  ShoppingBag, 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Plus, 
  DollarSign, 
  Tag, 
  MapPin, 
  ArrowRight, 
  Sparkles,
  Share2
} from 'lucide-react';
import { BasketItem, Language } from '../types';

interface SmartBasketViewProps {
  basketItems: BasketItem[];
  setBasketItems: React.Dispatch<React.SetStateAction<BasketItem[]>>;
  language: Language;
}

export const SmartBasketView: React.FC<SmartBasketViewProps> = ({
  basketItems,
  setBasketItems,
  language
}) => {
  const isAr = language === 'ar';
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Produce');
  const [newItemPrice, setNewItemPrice] = useState('2.50');

  const toggleItemCheck = (id: string) => {
    setBasketItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const deleteItem = (id: string) => {
    setBasketItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCompleted = () => {
    setBasketItems((prev) => prev.filter((item) => !item.checked));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: BasketItem = {
      id: `b-${Date.now()}`,
      name: newItemName.trim(),
      category: newItemCategory,
      quantity: 1,
      unit: 'item',
      estimatedPrice: parseFloat(newItemPrice) || 2.50,
      checked: false,
      store: 'Local Organic Market'
    };

    setBasketItems((prev) => [newItem, ...prev]);
    setNewItemName('');
  };

  // Group items by category / aisle
  const categories = Array.from(new Set(basketItems.map((i) => i.category)));
  const totalCost = basketItems.reduce((acc, i) => acc + (i.checked ? 0 : i.estimatedPrice), 0);
  const checkedCost = basketItems.reduce((acc, i) => acc + (i.checked ? i.estimatedPrice : 0), 0);

  return (
    <div className="space-y-8 pb-20">
      
      {/* Smart Basket Summary Header */}
      <section className="rounded-3xl bg-gradient-to-r from-[#944a00] to-[#e67e22] text-white p-6 sm:p-8 shadow-xl shadow-[#944a00]/15">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
              <ShoppingBag className="w-3.5 h-3.5 text-[#ffdcc5]" />
              <span>{isAr ? 'محرك تحسين التسوق الذكي' : 'Aisle-Mapped Grocery Engine'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              {isAr ? 'سلة التسوق الذكية والميزانية' : 'Smart Basket & Shopping Assistant'}
            </h1>
            <p className="text-xs sm:text-sm text-[#ffdcc5]/90 max-w-lg">
              {isAr 
                ? 'تنظيم تلقائي لمكونات وصفاتك حسب ممرات السوبرماركت ومقارنة أفضل الأسعار المحلية.'
                : 'Auto-grouped by supermarket aisle, budget estimator, and smart recipe ingredient integration.'}
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex items-center space-x-6 rtl:space-x-reverse shrink-0">
            <div>
              <p className="text-[11px] text-[#ffdcc5]">{isAr ? 'المتبقي للشراء' : 'Estimated Total'}</p>
              <p className="text-2xl sm:text-3xl font-extrabold">${totalCost.toFixed(2)}</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-[11px] text-stone-300">{isAr ? 'في العربة' : 'In Cart'}</p>
              <p className="text-lg sm:text-xl font-bold text-[#6bfe9c]">${checkedCost.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Add Form */}
      <section className="yum-card p-4 sm:p-5 bg-white">
        <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            required
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder={isAr ? 'أضف عنصر جديد (مثال: حليب لوز عضوي)...' : 'Add grocery item (e.g. Organic Oat Milk)...'}
            className="flex-1 w-full px-4 py-2.5 rounded-xl border border-[#e2e2e2] text-xs focus:border-[#e67e22] focus:outline-hidden"
          />

          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl border border-[#e2e2e2] text-xs bg-white"
          >
            <option value="Produce">{isAr ? 'الخضار والفواكه' : 'Produce'}</option>
            <option value="Meat & Seafood">{isAr ? 'اللحوم والأسماك' : 'Meat & Seafood'}</option>
            <option value="Dairy">{isAr ? 'منتجات الألبان' : 'Dairy'}</option>
            <option value="Herbs & Spices">{isAr ? 'الأعشاب والتوابل' : 'Herbs & Spices'}</option>
            <option value="Condiments">{isAr ? 'الصلصات والتوابل' : 'Condiments'}</option>
            <option value="Bakery">{isAr ? 'المخبوزات' : 'Bakery'}</option>
          </select>

          <div className="relative w-full sm:w-28">
            <span className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400">$</span>
            <input
              type="number"
              step="0.10"
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
              className="w-full pl-6 rtl:pl-2 rtl:pr-6 pr-2 py-2.5 rounded-xl border border-[#e2e2e2] text-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center space-x-1.5 rtl:space-x-reverse bg-[#e67e22] hover:bg-[#944a00] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>{isAr ? 'إضافة' : 'Add Item'}</span>
          </button>
        </form>
      </section>

      {/* Aisle Grouped Grocery List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#1a1c1c] flex items-center space-x-2 rtl:space-x-reverse">
            <span>{isAr ? 'قائمة التسوق مقسمة حسب الممر' : 'Items Grouped by Supermarket Aisle'}</span>
            <span className="text-xs text-[#564337] font-normal">({basketItems.length} items)</span>
          </h2>

          {basketItems.some((i) => i.checked) && (
            <button
              onClick={clearCompleted}
              className="text-xs font-semibold text-[#ba1a1a] hover:underline flex items-center space-x-1 rtl:space-x-reverse"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'مسح العناصر المكتملة' : 'Clear Checked'}</span>
            </button>
          )}
        </div>

        {basketItems.length === 0 ? (
          <div className="yum-card p-12 text-center space-y-3 bg-white">
            <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="font-bold text-base text-[#1a1c1c]">
              {isAr ? 'سلة التسوق فارغة حالياً' : 'Your Smart Basket is Empty'}
            </h3>
            <p className="text-xs text-[#564337] max-w-sm mx-auto">
              {isAr
                ? 'تصفح الوصفات واضغط على "أضف للسلة" لاستيراد المكونات المفقودة بنقرة واحدة.'
                : 'Browse recipes in Discover and click "Get Items" to import needed ingredients with smart store optimization.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat) => {
              const itemsInCat = basketItems.filter((i) => i.category === cat);
              return (
                <div key={cat} className="yum-card p-5 space-y-3 bg-white border border-[#eee]">
                  <div className="flex items-center justify-between border-b border-[#f0ece9] pb-2">
                    <h3 className="font-bold text-sm text-[#944a00] flex items-center space-x-2 rtl:space-x-reverse">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{cat}</span>
                    </h3>
                    <span className="text-[11px] text-[#564337]">{itemsInCat.length} {isAr ? 'عناصر' : 'items'}</span>
                  </div>

                  <div className="space-y-2">
                    {itemsInCat.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleItemCheck(item.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                          item.checked
                            ? 'bg-[#f3f3f3] border-[#e2e2e2] text-stone-400'
                            : 'bg-[#f9f9f9] border-[#eee] text-[#1a1c1c] hover:bg-[#fff9f4] hover:border-[#ffdcc5]'
                        }`}
                      >
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          {item.checked ? (
                            <CheckCircle2 className="w-4 h-4 text-[#006d37] shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-stone-400 shrink-0" />
                          )}
                          <div>
                            <p className={`font-semibold ${item.checked ? 'line-through' : ''}`}>{item.name}</p>
                            {item.sourceRecipe && (
                              <p className="text-[10px] text-[#e67e22]">
                                {isAr ? `من وصفة: ${item.sourceRecipe}` : `Recipe: ${item.sourceRecipe}`}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <span className="font-bold text-[#1a1c1c]">${item.estimatedPrice.toFixed(2)}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteItem(item.id);
                            }}
                            className="text-stone-300 hover:text-[#ba1a1a] p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
};
