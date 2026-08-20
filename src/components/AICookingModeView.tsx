import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  HelpCircle, 
  ChefHat, 
  Flame, 
  Clock, 
  ShieldCheck,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Recipe, Language } from '../types';

interface AICookingModeViewProps {
  recipe: Recipe;
  language: Language;
  onExit: () => void;
}

export const AICookingModeView: React.FC<AICookingModeViewProps> = ({
  recipe,
  language,
  onExit
}) => {
  const isAr = language === 'ar';
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isListening, setIsListening] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 minutes default
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [voiceLog, setVoiceLog] = useState<string[]>([]);
  const [aiAssistantQuery, setAiAssistantQuery] = useState('');
  const [aiAssistantResponses, setAiAssistantResponses] = useState<{ query: string; reply: string }[]>([]);

  const currentStep = recipe.steps[currentStepIndex] || recipe.steps[0];
  const isLastStep = currentStepIndex === recipe.steps.length - 1;

  // Initialize timer on step change
  useEffect(() => {
    if (currentStep) {
      setTimerSeconds(currentStep.durationMinutes * 60);
      setIsTimerRunning(false);
    }
  }, [currentStepIndex, currentStep]);

  // Timer tick
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      triggerVoiceFeedback(isAr ? 'انتهى وقت الخطوة بنجاح!' : 'Step timer completed!');
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, isAr]);

  const triggerVoiceFeedback = (text: string) => {
    setIsSpeaking(true);
    setVoiceLog((prev) => [text, ...prev.slice(0, 4)]);
    setTimeout(() => {
      setIsSpeaking(false);
    }, 2500);
  };

  const handleNextStep = () => {
    if (isLastStep) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      triggerVoiceFeedback(isAr ? 'مبروك! أتممت تحضير الطبق بنجاح!' : 'Congratulations! You completed the dish!');
      return;
    }
    setCurrentStepIndex((prev) => Math.min(prev + 1, recipe.steps.length - 1));
    triggerVoiceFeedback(isAr ? `الانتقال إلى الخطوة ${currentStepIndex + 2}` : `Moving to step ${currentStepIndex + 2}`);
  };

  const handlePrevStep = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
    triggerVoiceFeedback(isAr ? `الرجوع إلى الخطوة ${currentStepIndex}` : `Returning to step ${currentStepIndex}`);
  };

  const handleSimulateVoiceCommand = (command: string) => {
    if (command.includes('Next') || command.includes('التالي')) {
      handleNextStep();
    } else if (command.includes('Repeat') || command.includes('كرر')) {
      triggerVoiceFeedback(currentStep.instruction);
    } else if (command.includes('Timer') || command.includes('المؤقت')) {
      setIsTimerRunning(!isTimerRunning);
      triggerVoiceFeedback(isTimerRunning ? 'Timer paused' : 'Timer started');
    } else if (command.includes('Substitute') || command.includes('بديل')) {
      triggerVoiceFeedback(isAr ? 'يمكنك استبدال هذا المكون بزيت الزيتون البكر أو عصير الليمون الطازج.' : 'You can substitute with cold-pressed olive oil or fresh lemon juice.');
    }
  };

  const handleAskAIChef = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiAssistantQuery.trim()) return;

    const q = aiAssistantQuery;
    let reply = "";
    if (q.toLowerCase().includes('heat') || q.toLowerCase().includes('حرارة') || q.toLowerCase().includes('pan')) {
      reply = isAr 
        ? 'اضبط المقلاة على حرارة متوسطة إلى عالية (حوالي 180°م) للحصول على قشرة مقرمشة دون حرق التوابل.'
        : 'Maintain medium-high heat (~180°C/350°F) to ensure crisp caramelization without burning aromatic spices.';
    } else if (q.toLowerCase().includes('salt') || q.toLowerCase().includes('ملح')) {
      reply = isAr
        ? 'أضف رشة خفيفة من ملح البحر الخشن في البداية، وتذوق قبل التقديم مباشرة لضبط النكهة بدقة.'
        : 'Season with a pinch of flaky sea salt at the start, then finish with a delicate pinch right before plating.';
    } else {
      reply = isAr
        ? `بناءً على مطبخ ${recipe.cuisine}: حافظ على وقت الطهي المحدد (${currentStep.durationMinutes} دقائق) ودع الطبق يرتاح لمدة دقيقتين.`
        : `For this ${recipe.cuisine} preparation: Keep the ${currentStep.durationMinutes}-min duration precise and allow 2 minutes resting time before slicing.`;
    }

    setAiAssistantResponses((prev) => [{ query: q, reply }, ...prev]);
    setAiAssistantQuery('');
    triggerVoiceFeedback(reply);
  };

  const toggleIngredientCheck = (name: string) => {
    setCheckedIngredients((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Header & Voice Assistant Status Bar */}
      <div className="bg-[#2f3131] text-white rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 border border-white/10">
        
        {/* Left Side: Recipe Title & Step Counter */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse w-full md:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#e67e22] flex items-center justify-center text-white shrink-0 shadow-lg shadow-[#e67e22]/30">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs text-[#ffdcc5]">
              <span className="font-bold">{recipe.cuisine}</span>
              <span>•</span>
              <span>{isAr ? `الخطوة ${currentStepIndex + 1} من ${recipe.steps.length}` : `Step ${currentStepIndex + 1} of ${recipe.steps.length}`}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold truncate max-w-md">
              {isAr && recipe.titleAr ? recipe.titleAr : recipe.title}
            </h2>
          </div>
        </div>

        {/* Center: Live Voice Waveform Simulation */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse bg-black/40 px-4 py-2 rounded-full border border-white/10">
          <button
            onClick={() => setIsListening(!isListening)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              isListening ? 'bg-[#ba1a1a] text-white animate-pulse shadow-md shadow-[#ba1a1a]/50' : 'bg-stone-700 text-stone-300'
            }`}
            title={isListening ? 'Microphone Active (Hands-free mode)' : 'Microphone Muted'}
          >
            {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          <div className="flex items-center space-x-1">
            {[40, 70, 90, 60, 80, 45, 95, 50].map((height, i) => (
              <span
                key={i}
                style={{ height: isListening ? `${height}%` : '20%' }}
                className="w-1 bg-[#e67e22] rounded-full transition-all duration-300 h-4"
              />
            ))}
          </div>

          <span className="text-xs font-semibold text-[#ffdcc5]">
            {isListening ? (isAr ? 'الاستماع لصوتك نشط' : 'Voice Active') : (isAr ? 'الميكروفون متوقف' : 'Voice Paused')}
          </span>
        </div>

        {/* Right Side: Exit Button */}
        <button
          onClick={onExit}
          className="text-xs font-semibold px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          {isAr ? 'إنهاء جلسة الطبخ' : 'Exit Session'}
        </button>
      </div>

      {/* Main Grid: Active Step Card & Side Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left/Main Column: Active Step Guidance & Interactive Controls */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Step Large Card */}
          <div className="yum-card p-6 sm:p-8 space-y-6 border-2 border-[#e67e22]/30 relative overflow-hidden bg-white">
            
            {/* Step Progress Bar */}
            <div className="w-full bg-[#f0ece9] h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#944a00] to-[#e67e22] h-full transition-all duration-500 rounded-full"
                style={{ width: `${((currentStepIndex + 1) / recipe.steps.length) * 100}%` }}
              />
            </div>

            {/* Step Title & Instruction */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-[#e67e22]/15 text-[#944a00] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  {isAr ? `الخطوة ${currentStep.stepNumber}` : `Step ${currentStep.stepNumber}`}
                </span>
                <span className="text-xs text-[#564337] font-semibold flex items-center space-x-1 rtl:space-x-reverse">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentStep.durationMinutes} {isAr ? 'دقائق' : 'minutes'}</span>
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-[#1a1c1c]">
                {currentStep.title}
              </h1>

              <p className="text-base sm:text-lg text-[#1a1c1c] leading-relaxed font-normal bg-[#f9f9f9] p-5 rounded-2xl border border-[#eee]">
                {currentStep.instruction}
              </p>
            </div>

            {/* Chef Smart Pro Tip */}
            {currentStep.chefTip && (
              <div className="bg-[#ffdcc5]/40 border border-[#ffdcc5] p-4 rounded-2xl flex items-start space-x-3 rtl:space-x-reverse">
                <Sparkles className="w-5 h-5 text-[#944a00] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-[#944a00] uppercase tracking-wider">
                    {isAr ? 'نصيحة الشيف الذكية' : 'Yum Chef Secret'}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#502600] mt-0.5">{currentStep.chefTip}</p>
                </div>
              </div>
            )}

            {/* Step Timer & Audio Controls */}
            <div className="bg-[#f9f9f9] p-5 rounded-2xl border border-[#eee] flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Step Countdown Display */}
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="text-3xl sm:text-4xl font-mono font-bold text-[#1a1c1c]">
                  {formatTimer(timerSeconds)}
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="p-2.5 rounded-full bg-[#e67e22] text-white hover:bg-[#944a00] transition-colors shadow-sm"
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSeconds(currentStep.durationMinutes * 60);
                    }}
                    className="p-2.5 rounded-full bg-white border border-[#e2e2e2] text-[#564337] hover:bg-[#f3f3f3] transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Read Aloud Voice Button */}
              <button
                onClick={() => triggerVoiceFeedback(currentStep.instruction)}
                className="flex items-center space-x-2 rtl:space-x-reverse bg-white border border-[#e2e2e2] hover:bg-[#f3f3f3] text-[#1a1c1c] px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
              >
                <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-[#e67e22] animate-bounce' : 'text-[#944a00]'}`} />
                <span>{isAr ? 'قراءة التعليمات صوتياً' : 'Listen via Voice'}</span>
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handlePrevStep}
                disabled={currentStepIndex === 0}
                className={`flex items-center space-x-1 rtl:space-x-reverse px-4 py-2.5 rounded-xl text-xs font-semibold border ${
                  currentStepIndex === 0
                    ? 'border-transparent text-stone-300 cursor-not-allowed'
                    : 'border-[#e2e2e2] text-[#564337] hover:bg-[#f3f3f3]'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{isAr ? 'الخطوة السابقة' : 'Previous'}</span>
              </button>

              <button
                onClick={handleNextStep}
                className="flex items-center space-x-2 rtl:space-x-reverse bg-[#e67e22] hover:bg-[#944a00] text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-[#e67e22]/25 transition-transform active:scale-95"
              >
                <span>{isLastStep ? (isAr ? 'إنهاء الطبق 🏆' : 'Finish Dish 🏆') : (isAr ? 'الخطوة التالية' : 'Next Step')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Quick Hands-free Simulated Voice Prompts */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#564337] uppercase tracking-wider">
              {isAr ? 'أوامر صوتية جاهزة للاختبار' : 'Hands-Free Voice Command Simulator'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                isAr ? 'الخطوة التالية (Next)' : 'Next Step',
                isAr ? 'أعد القراءة (Repeat)' : 'Repeat Step',
                isAr ? 'شغل المؤقت (Timer)' : 'Start Timer',
                isAr ? 'بديل المكون (Substitute)' : 'Substitute Ingredient',
              ].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleSimulateVoiceCommand(cmd)}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-[#e2e2e2] hover:border-[#e67e22] text-xs font-semibold text-[#1a1c1c] shadow-2xs hover:bg-[#fef9f5] transition-all flex items-center space-x-1.5 rtl:space-x-reverse"
                >
                  <Mic className="w-3 h-3 text-[#e67e22]" />
                  <span>"{cmd}"</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Ingredients Checklist & AI Assistant Query Box */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Ingredients Checklist */}
          <div className="yum-card p-5 space-y-4 bg-white">
            <div className="flex items-center justify-between border-b border-[#f0ece9] pb-3">
              <h3 className="font-bold text-sm text-[#1a1c1c]">
                {isAr ? 'مكونات الطبق' : 'Recipe Ingredients'}
              </h3>
              <span className="text-xs text-[#564337] font-semibold">
                {checkedIngredients.length}/{recipe.ingredients.length} {isAr ? 'تم تجهيزها' : 'checked'}
              </span>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {recipe.ingredients.map((ing, idx) => {
                const isChecked = checkedIngredients.includes(ing.name);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleIngredientCheck(ing.name)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-[#006d37]/5 border-[#006d37]/30 text-[#006d37]'
                        : 'bg-[#f9f9f9] border-[#eee] text-[#1a1c1c] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      {isChecked ? (
                        <CheckCircle2 className="w-4 h-4 text-[#006d37] shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-[#897365] shrink-0" />
                      )}
                      <span className={isChecked ? 'line-through font-normal' : 'font-medium'}>
                        {isAr && ing.nameAr ? ing.nameAr : ing.name}
                      </span>
                    </div>
                    <span className="font-semibold text-stone-500">{ing.amount} {ing.unit}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Chef Assistant Query Box */}
          <div className="yum-card p-5 space-y-4 bg-white border border-[#ffdcc5]">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-[#944a00]">
              <Sparkles className="w-4 h-4" />
              <h3 className="font-bold text-sm">
                {isAr ? 'اسأل شيف يم الذكي' : 'Ask Yum AI Chef'}
              </h3>
            </div>

            <form onSubmit={handleAskAIChef} className="relative">
              <input
                type="text"
                value={aiAssistantQuery}
                onChange={(e) => setAiAssistantQuery(e.target.value)}
                placeholder={isAr ? 'اسأل عن بدائل، حرارة، أو توقيت...' : 'Ask about temperature, technique, or spices...'}
                className="w-full pl-3 pr-10 rtl:pr-3 rtl:pl-10 py-2.5 rounded-xl bg-[#f9f9f9] border border-[#e2e2e2] text-xs focus:outline-hidden focus:border-[#e67e22]"
              />
              <button
                type="submit"
                className="absolute right-2 rtl:right-auto rtl:left-2 top-1/2 -translate-y-1/2 text-[#944a00] hover:text-[#e67e22] p-1"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* AI Q&A Feed */}
            <div className="space-y-2.5 max-h-48 overflow-y-auto">
              {aiAssistantResponses.length === 0 ? (
                <p className="text-[11px] text-[#564337] italic bg-[#f9f9f9] p-3 rounded-xl">
                  {isAr 
                    ? 'اكتب أي استفسار أثناء الطهي (مثال: "ما هي درجة الحرارة المثالية؟") وسيجيبك الشيف الذكي فوراً.'
                    : 'Ask anything during cooking (e.g., "What is the optimal pan temperature?") and get instant chef guidance.'}
                </p>
              ) : (
                aiAssistantResponses.map((item, idx) => (
                  <div key={idx} className="bg-[#fef9f5] p-3 rounded-xl border border-[#ffdcc5] space-y-1 text-xs">
                    <p className="font-semibold text-[#944a00]">"{item.query}"</p>
                    <p className="text-[#1a1c1c]">{item.reply}</p>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
