import React, { useState } from 'react';
import { 
  Globe2, 
  Award, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  BookOpen, 
  ChevronRight,
  Flame,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PassportStamp, Language } from '../types';

interface PassportWorldMapViewProps {
  stamps: PassportStamp[];
  setStamps: React.Dispatch<React.SetStateAction<PassportStamp[]>>;
  language: Language;
}

export const PassportWorldMapView: React.FC<PassportWorldMapViewProps> = ({
  stamps,
  setStamps,
  language
}) => {
  const isAr = language === 'ar';
  const [selectedStamp, setSelectedStamp] = useState<PassportStamp>(stamps[0]);

  const unlockedCount = stamps.filter((s) => s.unlocked).length;
  const totalDishesTried = stamps.reduce((acc, s) => acc + s.dishesTried, 0);

  const handleUnlockStamp = (id: string) => {
    setStamps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, unlocked: true, unlockDate: 'Today' } : s))
    );
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* Passport Header Banner */}
      <section className="rounded-3xl bg-gradient-to-r from-[#1d3347] via-[#3f5f92] to-[#006a6a] text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/15 px-3 py-1 rounded-full text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-[#76d6d5]" />
              <span>{isAr ? 'جواز سفر وتحديات نكهات العالم' : 'Global Culinary Passport'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              {isAr ? 'خريطة النكهات وجواز السفر الذكي' : 'Yum World Map & Culinary Passport'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-200">
              {isAr
                ? 'استكشف تقاليد الطهي عبر القارات، اجمع أختام المطابخ الدولية، واحفظ وصفات التراث الأصيلة.'
                : 'Collect country passport stamps as you cook international dishes, unlock regional flavor secrets, and preserve heritage recipes.'}
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex items-center space-x-6 rtl:space-x-reverse shrink-0">
            <div className="text-center">
              <p className="text-[11px] text-stone-300">{isAr ? 'الأختام المفتوحة' : 'Unlocked Stamps'}</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#76d6d5]">{unlockedCount}/{stamps.length}</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-[11px] text-stone-300">{isAr ? 'أطباق مجربة' : 'Dishes Mastered'}</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#ffdcc5]">{totalDishesTried}</p>
            </div>
          </div>
        </div>
      </section>

      {/* World Map Explorer & Stamp Shelf */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Country Passport Grid */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#1a1c1c] flex items-center space-x-2 rtl:space-x-reverse">
              <Globe2 className="w-4 h-4 text-[#e67e22]" />
              <span>{isAr ? 'كتالوج أختام المطابخ العالمية' : 'World Cuisine Stamp Collection'}</span>
            </h2>
            <span className="text-xs text-[#564337]">
              {isAr ? 'اضغط على أي ختم للاستكشاف' : 'Select a stamp to view details'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {stamps.map((stamp) => {
              const isSelected = selectedStamp.id === stamp.id;
              return (
                <div
                  key={stamp.id}
                  onClick={() => setSelectedStamp(stamp)}
                  className={`yum-card p-5 cursor-pointer flex flex-col justify-between space-y-4 transition-all relative overflow-hidden bg-white border ${
                    isSelected
                      ? 'border-[#e67e22] ring-2 ring-[#e67e22]/20 shadow-md'
                      : 'border-[#eee] hover:border-stone-300'
                  }`}
                >
                  {/* Flag & Status Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{stamp.flag}</span>
                    {stamp.unlocked ? (
                      <span className="bg-[#006d37]/10 text-[#006d37] px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center space-x-1 rtl:space-x-reverse">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{stamp.badgeLevel}</span>
                      </span>
                    ) : (
                      <span className="bg-stone-100 text-stone-500 px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center space-x-1 rtl:space-x-reverse">
                        <Lock className="w-3 h-3" />
                        <span>{isAr ? 'مقفل' : 'Locked'}</span>
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-[#1a1c1c]">
                      {isAr ? stamp.countryAr : stamp.country}
                    </h3>
                    <p className="text-xs text-[#564337] line-clamp-1">{stamp.cuisineName}</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1 pt-2 border-t border-[#f0ece9]">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[#564337]">
                      <span>{isAr ? 'تقدم الطهي' : 'Mastery'}</span>
                      <span>{stamp.dishesTried}/{stamp.dishesTotal} {isAr ? 'أطباق' : 'dishes'}</span>
                    </div>
                    <div className="w-full bg-[#f0ece9] h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${stamp.unlocked ? 'bg-[#e67e22]' : 'bg-stone-300'}`}
                        style={{ width: `${(stamp.dishesTried / stamp.dishesTotal) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Country Heritage & Stamp Deep-Dive */}
        <div className="lg:col-span-4 space-y-4">
          <div className="yum-card p-6 bg-white space-y-5 border border-[#eee]">
            
            {/* Header */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse border-b border-[#f0ece9] pb-4">
              <span className="text-5xl">{selectedStamp.flag}</span>
              <div>
                <h3 className="text-xl font-bold text-[#1a1c1c]">
                  {isAr ? selectedStamp.countryAr : selectedStamp.country}
                </h3>
                <p className="text-xs text-[#944a00] font-semibold">{selectedStamp.cuisineName}</p>
              </div>
            </div>

            {/* Description & Cultural Context */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#564337] uppercase tracking-wider flex items-center space-x-1.5 rtl:space-x-reverse">
                <BookOpen className="w-3.5 h-3.5 text-[#e67e22]" />
                <span>{isAr ? 'قصة وهوية المطبخ' : 'Heritage & Flavor Identity'}</span>
              </h4>
              <p className="text-xs text-[#1a1c1c] leading-relaxed bg-[#f9f9f9] p-3.5 rounded-2xl border border-[#eee]">
                {selectedStamp.description}
              </p>
            </div>

            {/* Signature Dish */}
            <div className="bg-[#ffdcc5]/30 border border-[#ffdcc5] p-4 rounded-2xl space-y-1">
              <span className="text-[11px] font-bold text-[#944a00] uppercase tracking-wider">
                {isAr ? 'الطبق الأيقوني التراثي' : 'Signature Heritage Dish'}
              </span>
              <p className="font-bold text-sm text-[#502600]">{selectedStamp.signatureDish}</p>
            </div>

            {/* Action */}
            {selectedStamp.unlocked ? (
              <div className="p-3 bg-[#006d37]/10 text-[#006d37] rounded-xl text-center text-xs font-bold flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <Award className="w-4 h-4" />
                <span>{isAr ? `ختم موثق (${selectedStamp.badgeLevel})` : `Stamp Verified (${selectedStamp.badgeLevel})`}</span>
              </div>
            ) : (
              <button
                onClick={() => handleUnlockStamp(selectedStamp.id)}
                className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse bg-[#e67e22] hover:bg-[#944a00] text-white py-3 rounded-2xl text-xs font-bold shadow-md shadow-[#e67e22]/20 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isAr ? 'توثيق طهي طبق جديد وفتح الختم' : 'Cook Dish & Unlock Passport Stamp'}</span>
              </button>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
