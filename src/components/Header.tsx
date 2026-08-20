import React from 'react';
import { 
  Sparkles, 
  Compass, 
  Mic, 
  Refrigerator, 
  ShoppingBag, 
  Globe2, 
  Swords, 
  Radio, 
  Layers, 
  Languages, 
  Flame,
  ChefHat
} from 'lucide-react';
import { TabType, Language } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenAIGenerator: () => void;
  onOpenScreenGallery: () => void;
  pantryExpiringCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  onOpenAIGenerator,
  onOpenScreenGallery,
  pantryExpiringCount
}) => {
  const isAr = language === 'ar';

  const navItems = [
    { id: 'discover' as TabType, label: isAr ? 'استكشف النكهات' : 'Discover', icon: Compass },
    { id: 'ai-cooking' as TabType, label: isAr ? 'الطبخ بالصوت الذكي' : 'AI Voice Chef', icon: Mic, badge: 'AI' },
    { id: 'smart-pantry' as TabType, label: isAr ? 'المؤونة الذكية' : 'Zero-Waste Pantry', icon: Refrigerator, count: pantryExpiringCount },
    { id: 'smart-basket' as TabType, label: isAr ? 'سلة التسوق' : 'Smart Basket', icon: ShoppingBag },
    { id: 'world-map-passport' as TabType, label: isAr ? 'جواز سفر نكهات العالم' : 'Passport & Map', icon: Globe2 },
    { id: 'culinary-battles' as TabType, label: isAr ? 'معارك الطهاة' : 'Battles Arena', icon: Swords, badge: 'Live' },
    { id: 'live-studio' as TabType, label: isAr ? 'استوديو البث المباشر' : 'Live Studio', icon: Radio },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#f0ece9] shadow-xs">
      {/* Top Banner & Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer" onClick={() => setActiveTab('discover')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#944a00] to-[#e67e22] flex items-center justify-center shadow-md shadow-[#e67e22]/20 text-white font-bold text-xl">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="font-bold text-xl tracking-tight text-[#1a1c1c]">Yum</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#e67e22]/10 text-[#944a00]">
                  {isAr ? 'عالمك من الطعام' : 'World of Food'}
                </span>
              </div>
              <p className="text-[11px] text-[#564337] hidden sm:block">
                {isAr ? 'منظومة الطبخ والذكاء الاصطناعي الذكية' : 'AI-Native Culinary & FoodTech Ecosystem'}
              </p>
            </div>
          </div>

          {/* Quick Actions & Tools */}
          <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
            
            {/* AI Generator Button */}
            <button
              id="header-ai-generate-btn"
              onClick={onOpenAIGenerator}
              className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-[#e67e22] to-[#944a00] text-white px-3.5 sm:px-4 py-2 rounded-full font-medium text-xs sm:text-sm shadow-md shadow-[#e67e22]/25 hover:shadow-lg hover:shadow-[#e67e22]/40 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline">{isAr ? 'توليد وصفة بالذكاء الاصطناعي' : 'Yum AI Chef'}</span>
              <span className="sm:hidden">AI</span>
            </button>

            {/* 38+ Screens Prototype Explorer */}
            <button
              id="header-prototype-gallery-btn"
              onClick={onOpenScreenGallery}
              className="flex items-center space-x-1.5 rtl:space-x-reverse bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#1a1c1c] px-3 py-2 rounded-full text-xs font-semibold transition-colors border border-[#e2e2e2]"
              title="Explore all 38+ imported UI screen prototypes and code"
            >
              <Layers className="w-4 h-4 text-[#944a00]" />
              <span className="hidden md:inline">{isAr ? 'معرض الشاشات (38+)' : 'Screens (38+)'}</span>
            </button>

            {/* Language Switcher */}
            <button
              id="header-lang-btn"
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center space-x-1 rtl:space-x-reverse text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-[#e2e2e2] text-[#564337] hover:bg-[#f3f3f3] transition-colors"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'عربي' : 'EN'}</span>
            </button>

            {/* Taste DNA Badge */}
            <div className="hidden lg:flex items-center space-x-1.5 rtl:space-x-reverse bg-[#006d37]/10 text-[#006d37] px-3 py-1 rounded-full text-xs font-semibold">
              <Flame className="w-3.5 h-3.5" />
              <span>{isAr ? 'بصمة النكهات: 96%' : 'Taste DNA: 96% Match'}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex space-x-1 rtl:space-x-reverse overflow-x-auto hide-scrollbar py-2 border-t border-[#f0ece9]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 rtl:space-x-reverse px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#e67e22] text-white shadow-sm shadow-[#e67e22]/30 font-semibold'
                    : 'text-[#564337] hover:bg-[#f3f3f3] hover:text-[#1a1c1c]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#944a00]'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full uppercase font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#e67e22]/15 text-[#944a00]'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {item.count !== undefined && item.count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white text-[#944a00]' : 'bg-[#ba1a1a] text-white'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
