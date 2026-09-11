import React, { useState, useMemo } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { FilterBar } from './components/FilterBar';
import { ActivityCard } from './components/ActivityCard';
import { SchemeDetailPage } from './components/SchemeDetailPage';
import { ParticipantCustomersPage } from './components/ParticipantCustomersPage';
import { MoreActivityListPage } from './components/MoreActivityListPage';
import { IOSStatusBar } from './components/IOSStatusBar';
import { DesignSpecModal } from './components/DesignSpecModal';
import { GANENJI_ACTIVITIES, MORE_ACTIVITIES } from './data/activities';
import { ActivityItem, ActivityStatus, ActivityCategory } from './types';
import { FilterX } from 'lucide-react';

// 分类标签：全部、客户经营、获客活动、招募活动
const CATEGORY_TABS: { key: '全部' | ActivityCategory; label: string }[] = [
  { key: '全部', label: '全部' },
  { key: '客户经营', label: '客户经营' },
  { key: '获客活动', label: '获客活动' },
  { key: '招募活动', label: '招募活动' },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryTab, setCategoryTab] = useState<'全部' | ActivityCategory>('全部');
  const [selectedStatuses, setSelectedStatuses] = useState<ActivityStatus[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const [showingCustomerList, setShowingCustomerList] = useState(false);
  const [showingMorePage, setShowingMorePage] = useState(false);
  const [fromMorePage, setFromMorePage] = useState(false);
  const [isSpecModalOpen, setIsSpecModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'mobile' | 'responsive'>('mobile');

  // 感恩季专题活动
  const HOME_ACTIVITIES = GANENJI_ACTIVITIES;

  // 时间解析函数（用于时间降序比较）
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

  // 状态优先级（开展中 -> 待开始 -> 已结束）
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

  // 需求2：全部标签、客户经营标签、获客活动标签里的活动卡片排序：
  // 先是开展中、然后是待开始、最后是已结束的活动。同一个状态的活动，再按照开始时间降序
  const filteredActivities = useMemo(() => {
    const list = HOME_ACTIVITIES.filter((item) => {
      if (categoryTab !== '全部' && item.category !== categoryTab) {
        return false;
      }
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(item.status)) {
        return false;
      }
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

    // 排序逻辑
    return [...list].sort((a, b) => {
      const prioA = getStatusPriority(a.status);
      const prioB = getStatusPriority(b.status);
      if (prioA !== prioB) {
        return prioA - prioB;
      }
      // 同一个状态，按开始时间降序（最新开始排在前面）
      return parseStartTime(b.timeRange) - parseStartTime(a.timeRange);
    });
  }, [categoryTab, selectedStatuses, searchQuery, HOME_ACTIVITIES]);

  return (
    <div className="min-h-screen bg-[#eef1f5] text-gray-900 font-sans flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* Main Screen Container */}
      <main className="flex-1 flex items-start justify-center p-2.5 sm:p-5 md:py-8 w-full">
        <div
          className={`w-full transition-all duration-200 bg-white flex flex-col relative ${
            viewMode === 'mobile'
              ? 'max-w-[420px] rounded-[32px] shadow-[0_12px_44px_rgba(0,0,0,0.08)] border border-gray-200/90 overflow-hidden h-[820px]'
              : 'max-w-2xl rounded-2xl shadow-sm border border-gray-200 overflow-hidden h-[760px]'
          }`}
        >
          {/* 1. iOS 固定状态栏 */}
          <IOSStatusBar />

          {/* 页面路由切换 */}
          {showingCustomerList && selectedActivity ? (
            <ParticipantCustomersPage
              activity={selectedActivity}
              onBack={() => {
                setShowingCustomerList(false);
                if (fromMorePage) {
                  setFromMorePage(false);
                  setSelectedActivity(null);
                  setShowingMorePage(true);
                }
              }}
            />
          ) : showingMorePage && !selectedActivity ? (
            /* 更多活动列表页面 */
            <MoreActivityListPage
              allActivities={MORE_ACTIVITIES}
              onActivityClick={(act) => {
                setSelectedActivity(act);
                setShowingMorePage(false);
                setFromMorePage(true);
              }}
              onBack={() => setShowingMorePage(false)}
            />
          ) : selectedActivity ? (
            /* 需求3 & 需求4：方案详情页面 */
            <SchemeDetailPage
              activity={selectedActivity}
              onBack={() => {
                setSelectedActivity(null);
                if (fromMorePage) {
                  setFromMorePage(false);
                  setShowingMorePage(true);
                }
              }}
              onViewCustomerList={() => setShowingCustomerList(true)}
            />
          ) : (
            /* 感恩季首页活动列表 */
            <div className="flex-1 flex flex-col h-0">
              <HeaderNav
                title="感恩季"
                activeNav="感恩季"
                onTabChange={(tab) => {
                  if (tab === '更多') {
                    setSelectedStatuses([]);
                    setSearchQuery('');
                    setShowingMorePage(true);
                  }
                }}
                showMore={true}
                onMoreClick={() => {
                  setSelectedStatuses([]);
                  setSearchQuery('');
                  setShowingMorePage(true);
                }}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onBack={() => {
                  setSelectedStatuses([]);
                  setCategoryTab('全部');
                  setSearchQuery('');
                }}
              />

              {/* 需求1：切换感恩季，显示全部、客户经营、获客活动 tab 标签（删除招募活动） */}
              <div className="px-4 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-gray-100 bg-white">
                {CATEGORY_TABS.map((tab) => {
                  const selected = categoryTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setCategoryTab(tab.key)}
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

              {/* Activities List Area with Card Design - 可滚动区域 */}
              <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 bg-[#f8f9fa] space-y-3 pb-12">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      onClick={() => {
                        setSelectedActivity(activity);
                        setShowingCustomerList(false);
                      }}
                    />
                  ))
                ) : (
                  <div className="py-20 text-center text-gray-400 space-y-3 flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-1">
                      <FilterX className="w-7 h-7" />
                    </div>
                    <p className="text-[15px] font-medium text-gray-500">
                      {categoryTab === '招募活动' ? '暂无数据' : '未找到符合条件的活动'}
                    </p>
                    {categoryTab !== '招募活动' && (
                      <button
                        onClick={() => {
                          setCategoryTab('全部');
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
          )}
        </div>
      </main>

      {/* Design Spec Modal */}
      <DesignSpecModal
        isOpen={isSpecModalOpen}
        onClose={() => setIsSpecModalOpen(false)}
      />
    </div>
  );
}
