import React, { useState } from 'react';
import { 
  Radio, 
  Users, 
  MessageCircle, 
  Send, 
  Heart, 
  Sparkles, 
  Flame, 
  DollarSign, 
  CheckCircle2,
  Share2,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LiveStream, Language } from '../types';

interface LiveStudioViewProps {
  streams: LiveStream[];
  language: Language;
}

export const LiveStudioView: React.FC<LiveStudioViewProps> = ({
  streams,
  language
}) => {
  const isAr = language === 'ar';
  const [activeStream, setActiveStream] = useState<LiveStream>(streams[0]);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: 'Nadia (Dubai)', text: 'What is the exact ratio of black vinegar?', time: '12:04' },
    { sender: 'Chef Julien (Lyon)', text: 'Magnificent dough elasticity! The gluten window is clear.', time: '12:05' },
    { sender: 'Karim (Cairo)', text: 'Loving the live ingredient overlay feature!', time: '12:06' },
  ]);
  const [likesCount, setLikesCount] = useState(activeStream.viewers);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { sender: 'You (Home Chef)', text: chatInput.trim(), time: 'Just now' }
    ]);
    setChatInput('');
  };

  const handleLikeStream = () => {
    setLikesCount((prev) => prev + 1);
    confetti({
      particleCount: 25,
      spread: 40,
      origin: { y: 0.85 }
    });
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* Live Studio Header Banner */}
      <section className="rounded-3xl bg-gradient-to-r from-[#944a00] via-[#502600] to-[#1a1c1c] text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-[#ba1a1a] px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              <Radio className="w-3.5 h-3.5" />
              <span>{isAr ? 'استوديو البث الحي والتفاعلي' : 'Yum Live Cooking Studio'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              {isAr ? 'جلسات طهي حية مع كبار الطهاة ومكونات في الوقت الحقيقي' : 'Interactive Broadcast & Live Chef Masterclasses'}
            </h1>
          </div>

          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {streams.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveStream(s);
                  setLikesCount(s.viewers);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  activeStream.id === s.id
                    ? 'bg-[#e67e22] text-white border-[#e67e22]'
                    : 'bg-white/10 text-stone-200 border-white/20 hover:bg-white/20'
                }`}
              >
                {s.chefName}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Broadcast Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Live Video Canvas & Real-time Overlays */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="relative rounded-3xl overflow-hidden bg-black aspect-video shadow-2xl border border-white/10">
            <img 
              src={activeStream.thumbnail} 
              alt={activeStream.title}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* Top Video Header */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="bg-[#ba1a1a] text-white text-xs font-extrabold px-3 py-1 rounded-full flex items-center space-x-1.5 rtl:space-x-reverse">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <span>LIVE</span>
                </span>
                <span className="bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full flex items-center space-x-1.5 rtl:space-x-reverse">
                  <Users className="w-3.5 h-3.5 text-[#ffdcc5]" />
                  <span>{likesCount.toLocaleString()} {isAr ? 'مشاهد' : 'viewers'}</span>
                </span>
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <button
                  onClick={handleLikeStream}
                  className="bg-black/60 hover:bg-black/80 backdrop-blur-md text-white p-2.5 rounded-full transition-transform active:scale-90"
                >
                  <Heart className="w-4 h-4 text-[#e67e22] fill-[#e67e22]" />
                </button>
              </div>
            </div>

            {/* Live Ingredient Augmented Reality Overlay */}
            <div className="absolute top-16 right-4 rtl:right-auto rtl:left-4 max-w-xs bg-black/75 backdrop-blur-md text-white p-3.5 rounded-2xl border border-white/20 space-y-2 hidden sm:block">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs font-bold text-[#ffdcc5]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? 'المكونات المستخدمة الآن' : 'Live Ingredient Overlay'}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeStream.currentIngredients.map((ing, i) => (
                  <span key={i} className="text-[11px] bg-white/15 px-2 py-0.5 rounded-lg">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Step Banner */}
            <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
              <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold inline-block text-[#ffdcc5]">
                {isAr ? `الخطوة الحالية: ${activeStream.activeStep}` : `Live Stage: ${activeStream.activeStep}`}
              </div>
              <h2 className="text-base sm:text-xl font-bold">{activeStream.title}</h2>
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-stone-300">
                <img 
                  src={activeStream.chefAvatar} 
                  alt={activeStream.chefName} 
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="font-semibold text-white">{activeStream.chefName}</span>
                <span>•</span>
                <span>{activeStream.dishName}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Live Chat & Q&A Stream */}
        <div className="lg:col-span-4 flex flex-col h-full space-y-4">
          <div className="yum-card p-5 flex-1 flex flex-col justify-between space-y-4 bg-white border border-[#eee] min-h-[400px]">
            
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-[#f0ece9] pb-3">
              <h3 className="font-bold text-sm text-[#1a1c1c] flex items-center space-x-2 rtl:space-x-reverse">
                <MessageCircle className="w-4 h-4 text-[#e67e22]" />
                <span>{isAr ? 'المحادثة الحية وأسئلة الشيف' : 'Live Broadcast Chat'}</span>
              </h3>
              <span className="text-xs text-[#006d37] font-semibold">● Active</span>
            </div>

            {/* Chat Messages Feed */}
            <div className="space-y-3 overflow-y-auto max-h-72 text-xs flex-1">
              {chatMessages.map((msg, i) => (
                <div key={i} className="space-y-0.5 bg-[#f9f9f9] p-2.5 rounded-xl border border-[#eee]">
                  <div className="flex items-center justify-between text-[10px] text-[#564337]">
                    <span className="font-bold text-[#944a00]">{msg.sender}</span>
                    <span>{msg.time}</span>
                  </div>
                  <p className="text-[#1a1c1c] leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Chat Input Form */}
            <form onSubmit={handleSendMessage} className="relative pt-2 border-t border-[#f0ece9]">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={isAr ? 'اطرح سؤالاً للشيف مباشرة...' : 'Ask the chef a question...'}
                className="w-full pl-3 pr-10 rtl:pr-3 rtl:pl-10 py-2.5 rounded-xl border border-[#e2e2e2] text-xs focus:border-[#e67e22] focus:outline-hidden"
              />
              <button
                type="submit"
                className="absolute right-2 rtl:right-auto rtl:left-2 top-1/2 -translate-y-1/2 text-[#e67e22] hover:text-[#944a00] p-1"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>

      </div>

    </div>
  );
};
