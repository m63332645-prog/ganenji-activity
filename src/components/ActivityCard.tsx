import React from 'react';
import { Clock } from 'lucide-react';
import { ActivityItem } from '../types';

interface ActivityCardProps {
  activity: ActivityItem;
  onClick: (activity: ActivityItem) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onClick }) => {
  // Status badge styling strictly aligned with Screenshot 1
  const getStatusBadge = () => {
    switch (activity.status) {
      case '开展中':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-200/60 shrink-0">
            开展中
          </span>
        );
      case '待开始':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-200/60 shrink-0">
            待开始
          </span>
        );
      case '已结束':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-400 border border-gray-200/70 shrink-0">
            已结束
          </span>
        );
    }
  };

  const imageSrc = activity.bannerUrl || activity.detailImageUrl;

  return (
    <div
      onClick={() => onClick(activity)}
      className="group bg-white rounded-2xl p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100/90 hover:border-gray-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-200 cursor-pointer active:scale-[0.995] flex items-center gap-3.5"
    >
      {/* Left side: Square image */}
      <div className="w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-100 relative">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={activity.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white text-xs font-medium">
            活动
          </div>
        )}
      </div>

      {/* Right side: Title, Status, and Time */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 self-stretch">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[14.5px] font-bold text-gray-900 leading-snug tracking-tight line-clamp-2 group-hover:text-emerald-700 transition-colors">
            {activity.title}
          </h3>
          {getStatusBadge()}
        </div>

        {/* Info: Time Info Row */}
        <div className="flex items-center gap-1.5 text-gray-500 text-[12px] leading-tight mt-1.5">
          <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="truncate">{activity.timeRange}</span>
        </div>
      </div>
    </div>
  );
};
