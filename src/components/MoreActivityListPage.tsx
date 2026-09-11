import React, { useState, useMemo } from 'react';
import { ActivityItem, ActivityCategory, ActivityStatus } from '../types';
import { ActivityCard } from './ActivityCard';
import { HeaderNav } from './HeaderNav';
import { FilterBar } from './FilterBar';
import { FilterX } from 'lucide-react';

interface MoreActivityListPageProps {
  allActivities: ActivityItem[];
  onActivityClick: (activity: ActivityItem) => void;
  onBack: () => void;
}

const CATEGORY_TABS: { key: '全部' | ActivityCategory; label: string }[] = [
  { key: '全部', label: '全部' },
  { key: '客户经营', label: '客户经营' },
  { key: '获客活动', label: '获客活动' },
  { key: '招募活动', label: '招募活动' },
];

export const MoreActivityListPage: React.FC<MoreActivityListPageProps> = ({
  allActivities,
  onActivityClick,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'全部' | ActivityCategory>('全部');
  const [selectedStatuses, setSelectedStatuses] = useState<ActivityStatus[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const parseStartTime = (timeRangeStr: string): number => {
    try {
      const parts = timeRangeStr.split(' - ');
      const startStr = parts[0]?.trim();
      if (startStr) {
        const timestamp = new Date(startStr.replace(/-/g, '/')).getTime();
        if (!isNaN(timestamp)) return timestamp;
      }
    } catch {
      // ignore
    }
    return 0;
  };

  const getStatusPriority = (status: ActivityStatus): number => {
    switch (status) {
      case '开展中':
        return 1;
      case '待开始':
        return 2;
      case '已结束':
        return 3;
      default:
        return 4;
    }
  };

  const filtered = useMemo(() => {
    const list = allActivities.filter((item) => {
      // 分类筛选
      if (activeTab !== '全部' && item.category !== activeTab) {
        return false;
      }
      // 状态筛选
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(item.status)) {
        return false;
      }
      // 搜索筛选
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc) {
          return false;
        }
      }
      return true;
    });

    // 排序：开展中 -> 待开始 -> 已结束，同状态按开始时间降序
    return [...list].sort((a, b) => {
      const prioA = getStatusPriority(a.status);
      const prioB = getStatusPriority(b.status);
      if (prioA !== prioB) {
        return prioA - prioB;
      }
      return parseStartTime(b.timeRange) - parseStartTime(a.timeRange);
    });
  }, [activeTab, selectedStatuses, searchQuery, allActivities]);

  return (
    <div className="w-full flex-1 flex flex-col h-full bg-white select-none">
      {/* 顶栏：支持搜索框按钮与切换感恩季/更多 */}
      <HeaderNav
        title="更多"
        activeNav="更多"
        onTabChange={(tab) => {
          if (tab === '感恩季') onBack();
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onBack={onBack}
      />

      {/* 分类 Tab: 全部、客户经营、获客活动 */}
      <div className="px-4 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-gray-100 bg-white">
        {CATEGORY_TABS.map((tab) => {
          const selected = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                selected
                  ? 'bg-[#00c06d] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Filter Bar */}
      <FilterBar
        selectedStatuses={selectedStatuses}
        onSelectStatuses={setSelectedStatuses}
      />

      {/* 活动列表展示 */}
      <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 bg-[#f8f9fa] space-y-3 pb-12">
        {filtered.length > 0 ? (
          filtered.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onClick={onActivityClick}
            />
          ))
        ) : (
          <div className="py-20 text-center text-gray-400 space-y-3 flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-1">
              <FilterX className="w-7 h-7" />
            </div>
            <p className="text-[15px] font-medium text-gray-500">
              {activeTab === '招募活动' ? '暂无数据' : '暂无更多活动'}
            </p>
            {activeTab !== '招募活动' && (
              <button
                onClick={() => {
                  setActiveTab('全部');
                  setSelectedStatuses([]);
                  setSearchQuery('');
                }}
                className="text-xs text-emerald-600 font-medium hover:underline pt-1"
              >
                清除筛选条件
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
