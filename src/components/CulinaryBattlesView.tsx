import React, { useState } from 'react';
import { 
  Swords, 
  Trophy, 
  Flame, 
  Clock, 
  Vote, 
  Sparkles, 
  CheckCircle2, 
  Heart,
  MessageCircle,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BattleEntry, Language } from '../types';

interface CulinaryBattlesViewProps {
  battles: BattleEntry[];
  setBattles: React.Dispatch<React.SetStateAction<BattleEntry[]>>;
  language: Language;
}

export const CulinaryBattlesView: React.FC<CulinaryBattlesViewProps> = ({
  battles,
  setBattles,
  language
}) => {
  const isAr = language === 'ar';
  const [votedBattleIds, setVotedBattleIds] = useState<Record<string, 'A' | 'B'>>({});

  const handleCastVote = (battleId: string, side: 'A' | 'B') => {
    if (votedBattleIds[battleId]) return;

    setBattles((prev) =>
      prev.map((b) => {
        if (b.id !== battleId) return b;
        return {
          ...b,
          chefA: { ...b.chefA, votes: side === 'A' ? b.chefA.votes + 1 : b.chefA.votes },
          chefB: { ...b.chefB, votes: side === 'B' ? b.chefB.votes + 1 : b.chefB.votes },
          totalVotes: b.totalVotes + 1
        };
      })
    );

    setVotedBattleIds((prev) => ({ ...prev, [battleId]: side }));

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* Battles Arena Banner */}
      <section className="rounded-3xl bg-gradient-to-r from-[#502600] via-[#944a00] to-[#ba1a1a] text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/15 px-3 py-1 rounded-full text-xs font-semibold">
              <Swords className="w-3.5 h-3.5 text-[#ffdcc5]" />
              <span>{isAr ? 'حلبة التنافس والنزالات المباشرة' : 'Live Culinary Battles Arena'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              {isAr ? 'معارك الطهاة: إنسان ضد ذكاء اصطناعي ونزالات النجوم' : 'Yum Culinary Battles & World League'}
            </h1>
            <p className="text-xs sm:text-sm text-[#ffdcc5]/90">
              {isAr
                ? 'شاهد الطهاة الموهوبين يتنافسون في تحضير أطباق مبتكرة مع قيود زمنية، وصوّت لطبقك المفضل في الوقت الحقيقي.'
                : 'Watch master chefs and AI recipe algorithms go head-to-head. Vote live and decide who claims the golden apron.'}
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/10 flex items-center space-x-4 rtl:space-x-reverse shrink-0">
            <Trophy className="w-8 h-8 text-[#ffdcc5]" />
            <div>
              <p className="text-xs text-[#ffdcc5]">{isAr ? 'الموسم الثالث' : 'Season 3 Championship'}</p>
              <p className="text-lg font-bold">{isAr ? 'جائزة الشيف الذهبي' : 'Golden Apron League'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Battles Cards */}
      <div className="space-y-8">
        {battles.map((battle) => {
          const voteChoice = votedBattleIds[battle.id];
          const pctA = Math.round((battle.chefA.votes / (battle.totalVotes || 1)) * 100);
          const pctB = 100 - pctA;

          return (
            <div
              key={battle.id}
              className="yum-card p-6 sm:p-8 bg-white border border-[#eee] space-y-6 relative overflow-hidden"
            >
              {/* Battle Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f0ece9] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="bg-[#ba1a1a] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1 rtl:space-x-reverse animate-pulse">
                      <Flame className="w-3 h-3" />
                      <span>{battle.status}</span>
                    </span>
                    <span className="text-xs font-semibold text-[#564337]">{battle.category}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#1a1c1c]">{battle.title}</h2>
                  <p className="text-xs text-[#944a00] font-semibold">{isAr ? `الموضوع: ${battle.theme}` : `Theme: ${battle.theme}`}</p>
                </div>

                <div className="flex items-center space-x-3 rtl:space-x-reverse text-xs text-[#564337] font-semibold bg-[#f9f9f9] px-4 py-2 rounded-xl border border-[#eee] self-start sm:self-auto">
                  <Clock className="w-4 h-4 text-[#e67e22]" />
                  <span>{battle.timeLeft} {isAr ? 'متبقية' : 'left'}</span>
                  <span>•</span>
                  <span>{battle.totalVotes.toLocaleString()} {isAr ? 'صوت' : 'votes'}</span>
                </div>
              </div>

              {/* Head-to-Head Duel Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                
                {/* Chef A Card */}
                <div className={`p-5 rounded-2xl border transition-all space-y-4 ${
                  voteChoice === 'A' ? 'border-[#e67e22] bg-[#fffaf5]' : 'border-[#eee] bg-[#fdfdfd]'
                }`}>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img 
                      src={battle.chefA.avatar} 
                      alt={battle.chefA.name} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#e67e22]"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-[#1a1c1c]">{battle.chefA.name}</h3>
                      <p className="text-[11px] text-[#564337] line-clamp-1">{battle.chefA.bio}</p>
                    </div>
                  </div>

                  <div className="relative h-44 rounded-xl overflow-hidden">
                    <img 
                      src={battle.chefA.dishImage} 
                      alt={battle.chefA.dishName} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 text-white font-bold text-xs">
                      {battle.chefA.dishName}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-base font-extrabold text-[#944a00]">{pctA}% ({battle.chefA.votes})</span>
                    <button
                      disabled={!!voteChoice}
                      onClick={() => handleCastVote(battle.id, 'A')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        voteChoice === 'A'
                          ? 'bg-[#006d37] text-white shadow-xs'
                          : voteChoice
                          ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                          : 'bg-[#e67e22] hover:bg-[#944a00] text-white shadow-xs active:scale-95'
                      }`}
                    >
                      {voteChoice === 'A' ? (isAr ? 'تم التصويت ✓' : 'Voted ✓') : (isAr ? 'صوّت لهذا الطبق' : 'Vote Chef A')}
                    </button>
                  </div>
                </div>

                {/* VS Badge in Center */}
                <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1a1c1c] text-white font-extrabold text-xs items-center justify-center border-4 border-white shadow-lg z-10">
                  VS
                </div>

                {/* Chef B Card */}
                <div className={`p-5 rounded-2xl border transition-all space-y-4 ${
                  voteChoice === 'B' ? 'border-[#e67e22] bg-[#fffaf5]' : 'border-[#eee] bg-[#fdfdfd]'
                }`}>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img 
                      src={battle.chefB.avatar} 
                      alt={battle.chefB.name} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#3f5f92]"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-[#1a1c1c]">{battle.chefB.name}</h3>
                      <p className="text-[11px] text-[#564337] line-clamp-1">{battle.chefB.bio}</p>
                    </div>
                  </div>

                  <div className="relative h-44 rounded-xl overflow-hidden">
                    <img 
                      src={battle.chefB.dishImage} 
                      alt={battle.chefB.dishName} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 text-white font-bold text-xs">
                      {battle.chefB.dishName}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-base font-extrabold text-[#3f5f92]">{pctB}% ({battle.chefB.votes})</span>
                    <button
                      disabled={!!voteChoice}
                      onClick={() => handleCastVote(battle.id, 'B')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        voteChoice === 'B'
                          ? 'bg-[#006d37] text-white shadow-xs'
                          : voteChoice
                          ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                          : 'bg-[#3f5f92] hover:bg-[#1d3347] text-white shadow-xs active:scale-95'
                      }`}
                    >
                      {voteChoice === 'B' ? (isAr ? 'تم التصويت ✓' : 'Voted ✓') : (isAr ? 'صوّت لهذا الطبق' : 'Vote Chef B')}
                    </button>
                  </div>
                </div>

              </div>

              {/* Live Votes Percentage Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="w-full bg-[#f0ece9] h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-[#e67e22] h-full transition-all duration-500" style={{ width: `${pctA}%` }} />
                  <div className="bg-[#3f5f92] h-full transition-all duration-500" style={{ width: `${pctB}%` }} />
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
