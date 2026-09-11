import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { ActivityItem } from '../types';

interface BusinessSummarySectionProps {
  activity: ActivityItem;
}

export const BusinessSummarySection: React.FC<BusinessSummarySectionProps> = ({ activity }) => {
  const isEnded = activity?.status === '已结束';
  const isPending = activity?.status === '待开始';

  // 1. 活动管理平台是否配置问卷、抽奖
  const isSurveyConfigured = activity?.hasSurvey !== false;
  const isLotteryConfigured = activity?.hasLottery !== false;

  // 2. 核心业务与参与数值
  const totalEligible = activity?.stats?.totalEligible ?? 12;

  // 问卷与抽奖发送及回复数 (若活动未配置，则对应数据为 0)
  const rawSurveySent = activity?.stats?.surveySent ?? (isPending || isEnded ? 0 : 8);
  const rawSurveyResponded = activity?.stats?.surveyResponded ?? (isPending || isEnded ? 0 : 4);
  const rawLotterySent = activity?.stats?.lotterySent ?? (isPending || isEnded ? 0 : 4);
  const rawLotteryCompleted = activity?.stats?.lotteryCompleted ?? (isPending || isEnded ? 0 : 2);

  const surveySent = isSurveyConfigured ? rawSurveySent : 0;
  const surveyResponded = isSurveyConfigured ? rawSurveyResponded : 0;
  const surveyRemaining = Math.max(0, totalEligible - surveySent);

  const lotterySent = isLotteryConfigured ? rawLotterySent : 0;
  const lotteryCompleted = isLotteryConfigured ? rawLotteryCompleted : 0;
  const lotteryRemaining = Math.max(0, totalEligible - lotterySent);

  // 3. 是否有客户参与判断 (转发问卷回复问卷、转发抽奖参与抽奖)
  const hasSurveyParticipation = isSurveyConfigured && (surveySent > 0 || surveyResponded > 0);
  const hasLotteryParticipation = isLotteryConfigured && (lotterySent > 0 || lotteryCompleted > 0);

  // 4. 我的经营总结模块显示逻辑：
  // - 若活动管理平台未配置问卷、抽奖，则我的经营总结整个模块都不显示
  // - 若符合条件的客户没有一个客户转发问卷回复问卷、转发抽奖参与抽奖，则我的经营总结整个模块都不显示
  const shouldShowBusinessSummary =
    (isSurveyConfigured || isLotteryConfigured) &&
    (hasSurveyParticipation || hasLotteryParticipation);

  // 5. 漏斗图展示模式判断：
  // - 若符合条件的客户仅参与问卷调查，未参与抽奖，则仅显示问卷漏斗图，没有问卷活动流程、抽奖活动流程切换tab
  // - 若符合条件的客户仅参与抽奖，未参与问卷，则仅显示抽奖漏斗图，没有问卷活动流程、抽奖活动流程切换tab
  // - 若两者都有参与，则显示切换tab与轮播切换
  const showOnlySurvey = hasSurveyParticipation && !hasLotteryParticipation;
  const showOnlyLottery = hasLotteryParticipation && !hasSurveyParticipation;
  const showBothFunnels = hasSurveyParticipation && hasLotteryParticipation;

  // 漏斗轮播状态 (0: 问卷流程, 1: 抽奖流程)
  const [funnelIndex, setFunnelIndex] = useState<0 | 1>(0);

  if (!shouldShowBusinessSummary) {
    return null;
  }

  // 实际生效的漏斗索引：仅参与抽奖时强制为 1，仅参与问卷时强制为 0，否则使用当前用户切换的索引
  const effectiveFunnelIndex: 0 | 1 = showOnlyLottery ? 1 : (showOnlySurvey ? 0 : funnelIndex);

  // 当前激活的漏斗层级数值
  const middleCount = effectiveFunnelIndex === 0 ? surveySent : lotterySent;
  const bottomCount = effectiveFunnelIndex === 0 ? surveyResponded : lotteryCompleted;
  const currentProgressCount = effectiveFunnelIndex === 0 ? surveySent : lotterySent;
  const currentRemainingCount = effectiveFunnelIndex === 0 ? surveyRemaining : lotteryRemaining;

  return (
    <div className="w-full bg-white border-t border-b border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-4 sm:p-5 space-y-4">
      {/* 1. 标题栏 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-[#00b578] rounded-full inline-block shrink-0" />
          <h2 className="text-[16px] font-bold text-gray-900 tracking-tight">
            我的经营总结
          </h2>
        </div>
        <span className="text-xs text-gray-400 font-normal">
          助力代理人厘清待办
        </span>
      </div>

      {/* 2. 漏斗图模块 */}
      <div className="relative">
        {/* 仅在问卷与抽奖均有参与时，才显示切换tab和左右切换翻页按钮 */}
        {showBothFunnels && (
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 bg-[#f5f6f8] p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setFunnelIndex(0)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                  effectiveFunnelIndex === 0
                    ? 'bg-white text-[#00a854] shadow-xs font-semibold'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                问卷活动流程
              </button>
              <button
                type="button"
                onClick={() => setFunnelIndex(1)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                  effectiveFunnelIndex === 1
                    ? 'bg-white text-[#00a854] shadow-xs font-semibold'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                抽奖活动流程
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setFunnelIndex((prev) => (prev === 0 ? 1 : 0))}
                aria-label="上一页"
                className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setFunnelIndex((prev) => (prev === 0 ? 1 : 0))}
                aria-label="下一页"
                className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* 漏斗图展示区域 */}
        <div className="bg-[#fafbfc] rounded-xl p-3 sm:p-4 border border-gray-100/90 transition-all duration-300">
          {/* 漏斗图标题 */}
          <div className="text-center text-[13px] sm:text-sm font-medium text-gray-700 tracking-tight mb-3">
            {effectiveFunnelIndex === 0 ? '问卷漏斗图 (单位:人)' : '抽奖漏斗图 (单位:人)'}
          </div>

          {/* 漏斗主体与右侧文字说明 */}
          <div className="flex items-center justify-center gap-5 sm:gap-8 max-w-[320px] mx-auto">
            {/* 左侧：倒三色漏斗 */}
            <div className="w-[140px] sm:w-[150px] shrink-0">
              <svg viewBox="0 0 160 110" className="w-full h-auto drop-shadow-xs overflow-visible">
                {/* 第1层（绿色倒梯形）：符合条件客户数 */}
                <path
                  d="M 6 2 L 154 2 L 126 34 L 34 34 Z"
                  fill="#00a854"
                />
                <text
                  x="80"
                  y="22"
                  fill="#ffffff"
                  fontSize="15"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {totalEligible}
                </text>

                {/* 第2层：已发问卷 / 已发抽奖 */}
                {middleCount === 0 ? (
                  <g>
                    <circle
                      cx="80"
                      cy="53"
                      r="13.5"
                      stroke="#f59a23"
                      strokeWidth="1.6"
                      fill="#ffffff"
                    />
                    <text
                      x="80"
                      y="53.5"
                      fill="#f59a23"
                      fontSize="13"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      0
                    </text>
                  </g>
                ) : (
                  <g>
                    <path
                      d="M 36 37 L 124 37 L 100 70 L 60 70 Z"
                      fill="#f59a23"
                    />
                    <text
                      x="80"
                      y="56"
                      fill="#ffffff"
                      fontSize="14"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {middleCount}
                    </text>
                  </g>
                )}

                {/* 第3层：已回问卷 / 已抽奖 */}
                {bottomCount === 0 ? (
                  <g>
                    <circle
                      cx="80"
                      cy="90"
                      r="13.5"
                      stroke="#e53e3e"
                      strokeWidth="1.6"
                      fill="#ffffff"
                    />
                    <text
                      x="80"
                      y="90.5"
                      fill="#e53e3e"
                      fontSize="13"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      0
                    </text>
                  </g>
                ) : (
                  <g>
                    <path
                      d="M 62 73 L 98 73 L 80 108 Z"
                      fill="#e53e3e"
                    />
                    <text
                      x="80"
                      y="90"
                      fill="#ffffff"
                      fontSize="13"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {bottomCount}
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* 右侧：三层标签文字 (与漏斗高度严格对齐) */}
            <div className="flex flex-col justify-between h-[100px] text-[13px] text-[#3e4856] py-0.5 whitespace-nowrap">
              <div className="flex items-center h-[30px]">
                <span className="font-normal text-gray-700">符合条件客户数</span>
              </div>
              <div className="flex items-center h-[32px]">
                <span className="font-normal text-gray-700">
                  {effectiveFunnelIndex === 0 ? '已发问卷' : '已发抽奖'}
                </span>
              </div>
              <div className="flex items-center h-[34px]">
                <span className="font-normal text-gray-700">
                  {effectiveFunnelIndex === 0 ? '已回问卷' : '已抽奖'}
                </span>
              </div>
            </div>
          </div>

          {/* 仅在问卷与抽奖均有参与时，才显示轮播圆点指示器 */}
          {showBothFunnels && (
            <div className="flex items-center justify-center gap-1.5 mt-3">
              <button
                type="button"
                onClick={() => setFunnelIndex(0)}
                aria-label="切换到问卷流程漏斗"
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  effectiveFunnelIndex === 0 ? 'w-5 bg-[#00a854]' : 'w-1.5 bg-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setFunnelIndex(1)}
                aria-label="切换到抽奖流程漏斗"
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  effectiveFunnelIndex === 1 ? 'w-5 bg-[#00a854]' : 'w-1.5 bg-gray-300'
                }`}
              />
            </div>
          )}
        </div>
      </div>

      {/* 3. 进度条 (根据激活的漏斗动态显示) */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-[13.5px] text-[#556477] font-normal">
            {effectiveFunnelIndex === 0 ? '问卷发放进度' : '转发抽奖进度'}
          </span>
          <span className="text-[15px] font-bold text-gray-900 tracking-tight">
            {currentProgressCount} / {totalEligible} 人
          </span>
        </div>
        {/* 进度条 */}
        <div className="w-full bg-[#f0f2f5] h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#00a854] h-full rounded-full transition-all duration-500"
            style={{ width: `${(currentProgressCount / totalEligible) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11.5px] text-gray-400">
          <span>共 {totalEligible} 位客户符合条件</span>
          <span>
            {effectiveFunnelIndex === 0
              ? `还剩 ${currentRemainingCount} 位待发问卷`
              : `还剩 ${currentRemainingCount} 位待发放抽奖`}
          </span>
        </div>
      </div>

      {/* 4. 底部温馨提醒 */}
      {isEnded ? (
        <div className="bg-[#f7f8fa] rounded-xl p-3 border border-gray-200/90 flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-full bg-gray-200/80 flex items-center justify-center text-gray-500 shrink-0">
            <AlertTriangle className="w-3 h-3 stroke-[2.4]" />
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            活动已结束，
            {showBothFunnels && (
              <>共有 <strong className="font-bold text-gray-800">{surveyRemaining}</strong> 位客户未发放问卷、<strong className="font-bold text-gray-800">{lotteryRemaining}</strong> 位客户未发放抽奖。</>
            )}
            {showOnlySurvey && (
              <>共有 <strong className="font-bold text-gray-800">{surveyRemaining}</strong> 位客户未发放问卷。</>
            )}
            {showOnlyLottery && (
              <>共有 <strong className="font-bold text-gray-800">{lotteryRemaining}</strong> 位客户未发放抽奖。</>
            )}
          </p>
        </div>
      ) : (
        <div className="bg-[#f0f9f4] rounded-xl p-3 border border-[#d2f0e0] flex items-center gap-2.5">
          <div className="w-5 h-5 rounded-full bg-[#00b578]/15 flex items-center justify-center text-[#00b578] shrink-0">
            <AlertTriangle className="w-3 h-3 stroke-[2.4]" />
          </div>
          <p className="text-xs text-[#2a4d3b] leading-relaxed">
            {showBothFunnels && (
              <>还需为 <strong className="font-bold text-[#00a854]">{surveyRemaining}</strong> 位客户发放问卷、<strong className="font-bold text-[#00a854]">{lotteryRemaining}</strong> 位客户发放抽奖，加油完成感恩回馈。</>
            )}
            {showOnlySurvey && (
              <>还需为 <strong className="font-bold text-[#00a854]">{surveyRemaining}</strong> 位客户发放问卷，加油完成感恩回馈。</>
            )}
            {showOnlyLottery && (
              <>还需为 <strong className="font-bold text-[#00a854]">{lotteryRemaining}</strong> 位客户发放抽奖，加油完成感恩回馈。</>
            )}
          </p>
        </div>
      )}
    </div>
  );
};
