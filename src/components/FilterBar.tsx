import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { ActivityStatus } from '../types';

interface FilterBarProps {
  selectedStatuses: ActivityStatus[];
  onSelectStatuses: (statuses: ActivityStatus[]) => void;
}

// 可筛选的活动状态
const FILTER_STATUSES: ActivityStatus[] = ['待开始', '开展中', '已结束'];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedStatuses,
  onSelectStatuses,
}) => {
  const [statusPanelOpen, setStatusPanelOpen] = useState(false);
  // 面板内临时选中的状态列表（点击确定才生效）
  const [tempStatuses, setTempStatuses] = useState<ActivityStatus[]>(selectedStatuses);
  const containerRef = useRef<HTMLDivElement>(null);

  const openPanel = () => {
    if (statusPanelOpen) {
      // 已展开时再次点击 → 收起
      closePanel();
      return;
    }
    setTempStatuses(selectedStatuses);
    setStatusPanelOpen(true);
  };

  const closePanel = () => {
    setStatusPanelOpen(false);
  };

  const handleConfirm = () => {
    onSelectStatuses(tempStatuses);
    closePanel();
  };

  const handleReset = () => {
    setTempStatuses([]);
  };

  const toggleStatus = (status: ActivityStatus) => {
    setTempStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  // 点击空白处收起：监听文档点击，若点击在组件外则收起
  useEffect(() => {
    if (!statusPanelOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closePanel();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [statusPanelOpen]);

  const selectedCount = selectedStatuses.length;
  // 面板展开时实时显示勾选数量，收起后显示已确认数量
  const displayCount = statusPanelOpen ? tempStatuses.length : selectedCount;

  return (
    <div
      ref={containerRef}
      className="bg-white select-none relative"
    >
      {/* 触发按钮行：未选时灰色「活动状态 ∨」，有选中或展开时绿色「活动状态（N）」 */}
      <button
        onClick={openPanel}
        className="w-full flex items-center gap-1.5 px-4 py-3 border-b border-gray-100"
      >
        <span
          className={`text-[14px] font-medium ${
            statusPanelOpen || displayCount > 0 ? 'text-[#00A758]' : 'text-gray-700'
          }`}
        >
          {displayCount > 0 ? `活动状态 (${displayCount})` : '活动状态'}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            statusPanelOpen || displayCount > 0 ? 'text-[#00A758]' : 'text-gray-500'
          } ${statusPanelOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* 筛选面板（带半透明遮罩，从 FilterBar 位置向下展开） */}
      {statusPanelOpen && (
        <>
          {/* 半透明深色遮罩 */}
          <div
            onClick={closePanel}
            className="absolute left-0 right-0 top-full z-20 bg-black/50 backdrop-blur-[0.5px] animate-in fade-in duration-150"
            style={{ height: 'calc(100vh - 120px)' }}
          />

          {/* 白色筛选面板 */}
          <div className="absolute left-0 right-0 top-full z-30 bg-white shadow-2xl animate-in slide-in-from-top-1 duration-200">
            {/* 状态选项列表（每项 + 右侧复选框，支持多选） */}
            <div className="px-4 py-2">
              {FILTER_STATUSES.map((status) => {
                const isChecked = tempStatuses.includes(status);
                return (
                  <button
                    key={status}
                    onClick={() => toggleStatus(status)}
                    className="w-full flex items-center justify-between py-3 border-b border-gray-50 last:border-b-0"
                  >
                    <span
                      className={`text-[15px] ${
                        isChecked ? 'text-[#00A758]' : 'text-gray-600'
                      }`}
                    >
                      {status}
                    </span>
                    {/* 自定义复选框：选中为绿色圆角方块 + 白色对勾 */}
                    <div
                      className={`w-[22px] h-[22px] rounded-md flex items-center justify-center border transition-all ${
                        isChecked
                          ? 'bg-[#00A758] border-[#00A758]'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {isChecked && (
                        <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2 6.5L4.8 9.2L10 3.2"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 底部按钮区域：重置 + 确定 */}
            <div className="px-4 pb-4 pt-2 grid grid-cols-2 gap-3">
              <button
                onClick={handleReset}
                className="py-2.5 rounded-md border border-gray-200 text-gray-700 text-sm font-normal hover:bg-gray-50 active:scale-[0.98] transition-all"
              >
                重置
              </button>
              <button
                onClick={handleConfirm}
                className="py-2.5 rounded-md bg-[#00A758] hover:bg-[#00954e] text-white text-sm font-medium active:scale-[0.98] transition-all"
              >
                确定
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
