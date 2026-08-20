import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Smartphone, 
  Tablet, 
  Monitor, 
  ExternalLink, 
  Code, 
  Image as ImageIcon, 
  X, 
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { ScreenArtifact, Language } from '../types';

interface ScreenExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  screens: ScreenArtifact[];
  language: Language;
}

export const ScreenExplorerModal: React.FC<ScreenExplorerModalProps> = ({
  isOpen,
  onClose,
  screens,
  language
}) => {
  const isAr = language === 'ar';
  const [selectedScreen, setSelectedScreen] = useState<ScreenArtifact>(screens[0]);
  const [viewMode, setViewMode] = useState<'iframe' | 'image'>('iframe');
  const [deviceSize, setDeviceSize] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', ...Array.from(new Set(screens.map((s) => s.category)))];

  const filteredScreens = screens.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedCategory === 'All') return matchesSearch;
    return matchesSearch && s.category === selectedCategory;
  });

  const getDeviceWidthClass = () => {
    if (deviceSize === 'mobile') return 'max-w-[400px] h-[720px] rounded-3xl border-8 border-stone-800 shadow-2xl';
    if (deviceSize === 'tablet') return 'max-w-[760px] h-[720px] rounded-2xl border-4 border-stone-800 shadow-2xl';
    return 'w-full h-[720px] rounded-xl border border-stone-300';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-hidden">
      <div className="bg-white w-full max-w-7xl h-[94vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[#eee]">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:px-6 bg-[#f9f9f9] border-b border-[#eee] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-9 h-9 rounded-xl bg-[#944a00] text-white flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <h2 className="font-bold text-base text-[#1a1c1c]">
                  {isAr ? 'معرض نماذج وشاشات التطبيق المستوردة (38+ شاشة)' : 'Imported Screen Prototypes Gallery (38+ Screens)'}
                </h2>
                <span className="bg-[#e67e22]/15 text-[#944a00] text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {screens.length} Screens
                </span>
              </div>
              <p className="text-xs text-[#564337]">
                {isAr ? 'استعراض النماذج الأصلية بتقنية HTML و CSS وصور الشاشات المصممة' : 'Interactive live rendering of all imported HTML prototypes and layout artifacts'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse self-end sm:self-auto">
            {/* View Mode Toggle */}
            <div className="flex bg-[#e8e8e8] p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setViewMode('iframe')}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 rtl:space-x-reverse transition-all ${
                  viewMode === 'iframe' ? 'bg-white text-[#944a00] shadow-xs' : 'text-[#564337]'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Live HTML</span>
              </button>
              <button
                onClick={() => setViewMode('image')}
                className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 rtl:space-x-reverse transition-all ${
                  viewMode === 'image' ? 'bg-white text-[#944a00] shadow-xs' : 'text-[#564337]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>PNG Render</span>
              </button>
            </div>

            {/* Device Viewport Toggle (for iframe mode) */}
            {viewMode === 'iframe' && (
              <div className="hidden md:flex bg-[#e8e8e8] p-1 rounded-xl text-xs">
                <button
                  onClick={() => setDeviceSize('mobile')}
                  className={`p-1.5 rounded-lg ${deviceSize === 'mobile' ? 'bg-white text-[#944a00] shadow-xs' : 'text-stone-500'}`}
                  title="Mobile View"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceSize('tablet')}
                  className={`p-1.5 rounded-lg ${deviceSize === 'tablet' ? 'bg-white text-[#944a00] shadow-xs' : 'text-stone-500'}`}
                  title="Tablet View"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceSize('desktop')}
                  className={`p-1.5 rounded-lg ${deviceSize === 'desktop' ? 'bg-white text-[#944a00] shadow-xs' : 'text-stone-500'}`}
                  title="Desktop View"
                >
                  <Monitor className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Open Raw in New Window */}
            {selectedScreen.codeUrl && (
              <a
                href={selectedScreen.codeUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white border border-[#e2e2e2] text-[#564337] hover:bg-[#f3f3f3]"
                title="Open in new window"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white border border-[#e2e2e2] text-stone-400 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Area: Sidebar List + Preview Stage */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Sidebar: Screen Catalog List */}
          <div className="w-full md:w-80 lg:w-96 border-r rtl:border-r-0 rtl:border-l border-[#eee] bg-[#fdfdfd] flex flex-col shrink-0 overflow-hidden">
            
            {/* Search & Filter */}
            <div className="p-3 space-y-2 border-b border-[#eee]">
              <div className="relative">
                <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isAr ? 'ابحث في الشاشات...' : 'Search screen names...'}
                  className="w-full pl-9 rtl:pl-2 rtl:pr-9 pr-2 py-2 rounded-xl bg-white border border-[#e2e2e2] text-xs focus:border-[#e67e22] focus:outline-hidden"
                />
              </div>

              <div className="flex space-x-1.5 rtl:space-x-reverse overflow-x-auto hide-scrollbar py-1">
                {categories.slice(0, 6).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${
                      selectedCategory === cat ? 'bg-[#944a00] text-white' : 'bg-white border border-[#e2e2e2] text-stone-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Screens List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredScreens.map((screen) => {
                const isSelected = selectedScreen.id === screen.id;
                return (
                  <div
                    key={screen.id}
                    onClick={() => setSelectedScreen(screen)}
                    className={`p-3 rounded-2xl cursor-pointer flex items-center justify-between text-xs transition-all ${
                      isSelected
                        ? 'bg-[#e67e22]/10 border border-[#e67e22]/40 text-[#944a00] font-bold'
                        : 'hover:bg-white text-[#1a1c1c] border border-transparent'
                    }`}
                  >
                    <div className="space-y-0.5 truncate pr-2">
                      <p className="truncate">{screen.name}</p>
                      <span className="text-[10px] text-[#897365] font-normal">{screen.category}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 font-mono text-stone-500 shrink-0">
                      {screen.id}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Stage: Interactive Viewer */}
          <div className="flex-1 bg-[#1a1c1c] flex items-center justify-center p-4 overflow-auto">
            {viewMode === 'iframe' && selectedScreen.codeUrl ? (
              <div className={`w-full ${getDeviceWidthClass()} bg-white overflow-hidden flex flex-col transition-all duration-300`}>
                <iframe
                  src={selectedScreen.codeUrl}
                  title={selectedScreen.name}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            ) : selectedScreen.imageUrl ? (
              <div className="max-w-2xl max-h-full overflow-auto rounded-2xl shadow-2xl p-2 bg-stone-900">
                <img
                  src={selectedScreen.imageUrl}
                  alt={selectedScreen.name}
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            ) : (
              <div className="text-white text-center">
                <p>No preview available for this item.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
