import React, { useState } from 'react';
import { ChevronLeft, Search, X } from 'lucide-react';

interface HeaderNavProps {
  title?: string;
  activeNav?: '感恩季' | '更多';
  onNavChange?: (nav: '感恩季' | '更多') => void;
  showMore?: boolean;
  onMoreClick?: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onBack?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  title = '感恩季',
  activeNav = '感恩季',
  onNavChange,
  showMore = true,
  onMoreClick,
  searchQuery,
  onSearchChange,
  onBack,
}) => {
  const [isSearching, setIsSearching] = useState(false);

  const handleNavClick = (nav: '感恩季' | '更多') => {
    if (onNavChange) {
      onNavChange(nav);
    } else if (nav === '更多' && onMoreClick) {
      onMoreClick();
    } else if (nav === '感恩季' && onBack) {
      onBack();
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100">
      {/* Main Nav Bar */}
      <div className="h-12 px-4 flex items-center justify-between relative">
        {isSearching ? (
          <div className="w-full flex items-center gap-2 animate-in fade-in duration-150">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                placeholder="搜索活动名称..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-gray-100/90 text-sm text-gray-900 rounded-full pl-9 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#00c06d]/30"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button
              onClick={() => {
                setIsSearching(false);
                onSearchChange('');
              }}
              className="text-xs font-medium text-gray-600 hover:text-gray-900 px-2 py-1"
            >
              取消
            </button>
          </div>
        ) : (
          <>
            {/* Left Back Arrow */}
            <button
              onClick={onBack}
              className="p-2 -ml-2 text-gray-700 hover:text-gray-900 active:bg-gray-100 rounded-full transition-colors"
              title="返回"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            {/* Center: 感恩季 + 更多 并排居中 */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
              <button
                onClick={() => handleNavClick('感恩季')}
                className={`text-[17px] tracking-tight transition-colors ${
                  activeNav === '感恩季'
                    ? 'font-bold text-gray-900'
                    : 'font-normal text-gray-500 hover:text-gray-800'
                }`}
              >
                感恩季
              </button>
              <span className="w-px h-4 bg-gray-200" />
              <button
                onClick={() => handleNavClick('更多')}
                className={`text-[17px] tracking-tight transition-colors ${
                  activeNav === '更多'
                    ? 'font-bold text-gray-900'
                    : 'font-normal text-gray-500 hover:text-[#00c06d]'
                }`}
              >
                更多
              </button>
            </div>

            {/* Right Search Button */}
            <button
              onClick={() => setIsSearching(true)}
              className="p-2 -mr-2 text-gray-700 hover:text-gray-900 active:bg-gray-100 rounded-full transition-colors"
              title="搜索活动"
            >
              <Search className="w-5 h-5 stroke-[2]" />
            </button>
          </>
        )}
      </div>
    </header>
  );
};
