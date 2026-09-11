import React from 'react';

interface IOSStatusBarProps {
  className?: string;
}

export const IOSStatusBar: React.FC<IOSStatusBarProps> = ({ className = '' }) => {
  return (
    <div
      className={`w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 select-none px-6 pt-3 pb-2 flex items-center justify-between text-xs font-semibold text-gray-900 border-b border-gray-100/60 ${className}`}
    >
      {/* Time */}
      <span className="font-semibold text-[13px] tracking-tight">18:54</span>

      {/* Signal, 5G, Battery */}
      <div className="flex items-center gap-1.5 text-[11px]">
        {/* Signal Bars */}
        <div className="flex items-end gap-[2px] h-3">
          <span className="w-[3px] h-1 bg-gray-900 rounded-2xs" />
          <span className="w-[3px] h-1.5 bg-gray-900 rounded-2xs" />
          <span className="w-[3px] h-2.5 bg-gray-900 rounded-2xs" />
          <span className="w-[3px] h-3 bg-gray-900 rounded-2xs" />
        </div>

        {/* 5G label */}
        <span className="text-[10px] font-bold tracking-tighter">5G</span>

        {/* Battery Outline */}
        <div className="w-5 h-2.5 border border-gray-900 rounded-[3px] p-[1px] flex items-center">
          <div className="h-full w-[82%] bg-gray-900 rounded-[1.5px]" />
        </div>
      </div>
    </div>
  );
};

