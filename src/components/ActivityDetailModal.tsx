import React from 'react';
import { X, Clock, Users, CheckCircle2 } from 'lucide-react';
import { ActivityItem } from '../types';

interface ActivityDetailModalProps {
  activity: ActivityItem | null;
  onClose: () => void;
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({ activity, onClose }) => {
  if (!activity) return null;

  const isOngoing = activity.status === '开展中';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-100 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                  activity.status === '开展中'
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200/70'
                    : activity.status === '待开始'
                    ? 'bg-amber-50 text-amber-600 border-amber-200/70'
                    : 'bg-gray-100 text-gray-400 border-gray-200/70'
                }`}
              >
                {activity.status}
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                {activity.category}
              </span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 leading-snug">
              {activity.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Key Parameters */}
          <div className="bg-gray-50/80 rounded-2xl p-4 space-y-2.5 border border-gray-100 text-xs">
            <div className="flex items-center gap-2.5 text-gray-600">
              <Clock className="w-4 h-4 text-gray-400 shrink-0" />
              <span>
                <strong className="text-gray-800 font-medium">活动时间：</strong>
                {activity.timeRange}
              </span>
            </div>
            {activity.participantsCount !== undefined && activity.participantsCount > 0 && (
              <div className="flex items-center gap-2.5 text-gray-600">
                <Users className="w-4 h-4 text-gray-400 shrink-0" />
                <span>
                  <strong className="text-gray-800 font-medium">参与热度：</strong>
                  已吸引 {activity.participantsCount.toLocaleString()} 位客户关注/参与
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          {activity.description && (
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-1.5">活动详情</h4>
              <p className="text-xs text-gray-600 leading-relaxed bg-white rounded-xl p-3 border border-gray-100">
                {activity.description}
              </p>
            </div>
          )}

          {/* Target Audience */}
          {activity.targetAudience && (
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-1.5">受众对象</h4>
              <div className="flex items-center gap-2 text-xs text-gray-600 bg-white rounded-xl p-3 border border-gray-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{activity.targetAudience}</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            关闭
          </button>
          <button
            onClick={() => {
              alert(`已${isOngoing ? '进入' : activity.status === '待开始' ? '预约' : '查看'}活动：${activity.title}`);
            }}
            className={`px-5 py-2 rounded-xl text-xs font-medium text-white shadow-xs transition-transform active:scale-95 ${
              isOngoing
                ? 'bg-gray-900 hover:bg-gray-800'
                : activity.status === '待开始'
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-gray-500 hover:bg-gray-600'
            }`}
          >
            {isOngoing ? '立即参与活动' : activity.status === '待开始' ? '预约开启提醒' : '查看活动回顾'}
          </button>
        </div>
      </div>
    </div>
  );
};
