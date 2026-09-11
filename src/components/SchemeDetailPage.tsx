import React, { useState } from 'react';
import { ChevronLeft, Bookmark, Clock, UserPlus, Users, Check, Download, Upload, X, MessageCircle, Aperture, Wifi, ChevronDown, ChevronUp } from 'lucide-react';
import { ActivityItem, ActivityStatus } from '../types';
import { BusinessSummarySection } from './BusinessSummarySection';

interface SchemeDetailPageProps {
  activity: ActivityItem;
  onBack: () => void;
  onViewCustomerList?: () => void;
}

export const SchemeDetailPage: React.FC<SchemeDetailPageProps> = ({
  activity,
  onBack,
  onViewCustomerList,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  // 方案简介右边展开/收起按钮，默认收起状态
  const [isIntroExpanded, setIsIntroExpanded] = useState(false);

  const isAcqActivity = activity.category === '获客活动';
  const isEnded = activity.status === '已结束';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Status Badge dynamic rendering
  const renderStatusBadge = (status: ActivityStatus) => {
    switch (status) {
      case '开展中':
        return (
          <span className="inline-flex items-center px-3.5 py-0.5 rounded-full text-xs font-medium bg-[#d6f5e3] text-[#12a150] shadow-xs">
            开展中
          </span>
        );
      case '待开始':
        return (
          <span className="inline-flex items-center px-3.5 py-0.5 rounded-full text-xs font-medium bg-[#ffecd7] text-[#fa6400] shadow-xs">
            待开始
          </span>
        );
      case '已结束':
      default:
        return (
          <span className="inline-flex items-center px-3.5 py-0.5 rounded-full text-xs font-medium bg-[#eef1f5] text-[#556980] shadow-xs">
            已结束
          </span>
        );
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f8f9fa] select-none h-full min-h-0">
      {/* Top Navigation Bar: 获客活动点击活动卡片进入详情页：顶部标题改为“活动详情”，名单位置靠近标题 */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-3 py-2.5 border-b border-gray-100 flex items-center justify-between shadow-2xs relative">
        <button
          onClick={onBack}
          className="p-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1 z-10 cursor-pointer"
          aria-label="返回上一页"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800 stroke-[2.2]" />
        </button>

        {/* 居中标题与名单项（参考截图 1:1 还原，客户名单无背景色，仅参考位置保留文案） */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {isAcqActivity ? (
            <div className="flex items-center gap-7 pointer-events-auto">
              <div className="flex flex-col items-center cursor-default">
                <span className="text-[16px] font-bold text-gray-950 tracking-tight leading-tight">
                  活动详情
                </span>
                <span className="w-5 h-[2.5px] bg-[#00b578] rounded-full mt-1" />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (onViewCustomerList) {
                    onViewCustomerList();
                  }
                }}
                className="text-[16px] font-normal text-gray-500 hover:text-gray-900 transition-colors cursor-pointer leading-tight pb-[3.5px]"
              >
                客户名单
              </button>
            </div>
          ) : (
            <h1 className="text-base font-bold text-gray-900 tracking-tight pointer-events-auto">
              方案详情
            </h1>
          )}
        </div>

        <div className="w-7 z-10" />
      </div>

      {/* Main Content Area - 可滚动区域 */}
      <div className="flex-1 pb-6 space-y-3 overflow-y-auto no-scrollbar">
        {/* 获客活动：还原海报banner（右上角带动态状态徽标） */}
        {isAcqActivity && (
          <div className="w-full h-64 sm:h-72 bg-gray-900 relative overflow-hidden shrink-0">
            {activity.bannerUrl ? (
              <img
                src={activity.bannerUrl}
                alt={activity.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-emerald-800 via-teal-900 to-gray-900 flex items-center justify-center text-white/80">
                <span>方案海报</span>
              </div>
            )}
            {/* Subtle bottom shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

            {/* Dynamic Status Badge */}
            <div className="absolute top-3.5 right-3.5">
              {renderStatusBadge(activity.status)}
            </div>
          </div>
        )}

        {/* Info Header Card (主题标签、状态标签、活动名称、活动时间) */}
        <div className="w-full bg-white px-4 pt-4 pb-5 border-b border-gray-100 space-y-3.5 shadow-2xs">
          {/* 主题标签: 客户经营 / 客户活动 与 状态标签（仅客户经营在右侧显示，获客活动在海报右上角显示） */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#00b578] font-normal text-[13px]">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-[#00b578] stroke-current fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round"
              >
                <path d="M5 3h14a1 1 0 0 1 1 1v17l-8-4.5L4 21V4a1 1 0 0 1 1-1z" />
              </svg>
              <span className="font-medium">
                {isAcqActivity ? '客户活动' : (activity.tag || activity.category)}
              </span>
            </div>
            {!isAcqActivity && renderStatusBadge(activity.status)}
          </div>

          {/* 活动名称 - 大字号加粗 */}
          <h2 className="text-[18px] sm:text-[19px] font-bold text-gray-950 leading-snug tracking-tight">
            {activity.title}
          </h2>

          {/* 活动时间 - 绿色时钟图标 */}
          <div className="flex items-center gap-2 text-[13px] text-gray-700 pt-1.5 border-t border-gray-50/80">
            <Clock className="w-4 h-4 text-[#00b578] stroke-[2] shrink-0" />
            <span className="font-normal text-gray-800 tracking-wide">{activity.timeRange}</span>
          </div>
        </div>

        {/* 获客活动 vs 客户经营 详情内容展示 */}
        {isAcqActivity ? (
          /* 获客活动：还原之前的活动详情页面设计（标题为“活动详情”，包含文字描述与海报配图，无展开/收起按钮） */
          <div className="w-full bg-white px-4 py-4 border-t border-b border-gray-100 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="w-1 h-4 bg-[#00b578] rounded-full inline-block shrink-0" />
              <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">
                活动详情
              </h3>
            </div>
            <p className="text-[14px] text-gray-700 leading-relaxed font-normal">
              {activity.description || '本次活动旨在邀请客户共同参与户外健行，感受自然之美，增进彼此交流。现场将安排专业向导带领游览，并提供精美茶歇与互动礼品。'}
            </p>
            {/* 活动详情海报图 */}
            <div className="w-full rounded-2xl overflow-hidden shadow-xs border border-gray-100 mt-2">
              <img
                src={activity.detailImageUrl || activity.bannerUrl}
                alt="活动详情海报"
                className="w-full h-auto max-h-[220px] object-cover"
              />
            </div>
          </div>
        ) : (
          /* 客户经营：方案简介模块，带绿色箭头展开/收起按钮 */
          <div className="w-full bg-white px-4 py-4 border-t border-b border-gray-100 space-y-3.5 shadow-2xs">
            {/* Header: ▌ 方案简介 与 纯图标展开/收起按钮 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1 h-4 bg-[#00b578] rounded-full inline-block shrink-0" />
                <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">
                  方案简介
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsIntroExpanded((prev) => !prev)}
                aria-label={isIntroExpanded ? '收起方案简介' : '展开方案简介'}
                className="p-1 text-[#00b578] hover:bg-[#00b578]/10 rounded-full transition-colors cursor-pointer flex items-center justify-center"
              >
                {isIntroExpanded ? (
                  <ChevronUp className="w-5 h-5 stroke-[2.2]" />
                ) : (
                  <ChevronDown className="w-5 h-5 stroke-[2.2]" />
                )}
              </button>
            </div>

            {/* 收起时显示方案简介第一段话，展开可以看全部内容 */}
            <p className="text-[13.5px] text-gray-700 leading-relaxed font-normal">
              {activity.description}
            </p>

            {/* 展开时显示的步骤及详细流程 */}
            {isIntroExpanded && activity.steps && activity.steps.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-gray-100/80 animate-in fade-in duration-200">
                {activity.steps.map((st) => (
                  <div key={st.step} className="space-y-0.5">
                    <div className="text-[14px] font-medium text-gray-900 leading-snug">
                      {st.title}
                    </div>
                    <div className="text-[13px] text-gray-600 leading-normal">
                      {st.desc}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 方案详情页-我的经营总结模块（仅在客户经营活动中展示） */}
        {!isAcqActivity && <BusinessSummarySection activity={activity} />}
      </div>

      {/* 需求4：页面底部固定按钮
          获客活动：若未结束，显示分享海报、转发问卷；若已结束，不显示分享海报、转发问卷按钮 */}
      {isAcqActivity ? (
        !isEnded ? (
          <div className="sticky bottom-0 left-0 right-0 bg-white px-4 py-3.5 border-t border-gray-200/80 flex items-center gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] z-30 mt-auto">
            <button
              type="button"
              onClick={() => setShowPosterModal(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#00A758] hover:bg-[#00954e] active:scale-[0.98] text-white font-medium text-[15px] rounded-full shadow-xs transition-all duration-150"
            >
              <Download className="w-4 h-4 stroke-[2.2]" />
              <span>分享海报</span>
            </button>
            <button
              type="button"
              onClick={() => setShowSurveyModal(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#00A758] hover:bg-[#00954e] active:scale-[0.98] text-white font-medium text-[15px] rounded-full shadow-xs transition-all duration-150"
            >
              <Upload className="w-4 h-4 stroke-[2.2]" />
              <span>转发问卷</span>
            </button>
          </div>
        ) : null
      ) : (
        <div className="sticky bottom-0 left-0 right-0 bg-white px-4 py-3 border-t border-gray-200/80 flex items-center shadow-[0_-4px_16px_rgba(0,0,0,0.06)] z-30 mt-auto">
          <button
            type="button"
            onClick={() => {
              if (onViewCustomerList) {
                onViewCustomerList();
              } else {
                showToast('已打开客户清单列表');
              }
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#00A758] hover:bg-[#00954e] active:scale-[0.98] text-white font-medium text-sm rounded-full shadow-xs transition-all duration-150"
          >
            <Users className="w-4 h-4 stroke-[2.2]" />
            <span>查看客户清单</span>
          </button>
        </div>
      )}

      {/* ================= 需求4 & 新增：分享海报弹窗与转发问卷弹窗嵌入手机模型尺寸里 ================= */}
      {showPosterModal && (
        <div className="absolute inset-0 z-[60] flex flex-col bg-[#1a1d1f] overflow-hidden animate-in fade-in duration-150">
          {/* iOS 状态栏 (参考截图2: 9:41, 信号条, WiFi, 电池) */}
          <div className="shrink-0 text-white select-none">
            <div className="w-full flex items-center justify-between px-6 pt-3 pb-1 text-[13px] font-semibold">
              <span>9:41</span>
              <div className="flex items-center space-x-2">
                {/* 信号条 */}
                <div className="flex items-end gap-[1.5px] h-3">
                  <span className="w-[3px] h-1 bg-white rounded-2xs" />
                  <span className="w-[3px] h-1.5 bg-white rounded-2xs" />
                  <span className="w-[3px] h-2 bg-white rounded-2xs" />
                  <span className="w-[3px] h-3 bg-white rounded-2xs" />
                </div>
                {/* WiFi */}
                <Wifi className="w-3.5 h-3.5 text-white stroke-[2.2]" />
                {/* 电池 */}
                <div className="w-5 h-2.5 border border-white rounded-[3px] p-[1px] flex items-center">
                  <div className="h-full w-[82%] bg-white rounded-[1.5px]" />
                </div>
              </div>
            </div>
          </div>

          {/* 顶栏：返回与标题“分享海报” */}
          <div className="px-4 py-2 flex items-center text-white shrink-0 relative">
            <button
              type="button"
              onClick={() => setShowPosterModal(false)}
              className="p-1 -ml-1 text-white hover:text-gray-300 transition-colors z-10 cursor-pointer"
              aria-label="关闭"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
            </button>
            <h2 className="text-[17px] font-bold text-center absolute inset-0 flex items-center justify-center pointer-events-none">
              分享海报
            </h2>
          </div>

          {/* 海报卡片区（参考截图2：尺寸放大，充满中间区域，左右适度边距，圆角阴影海报） */}
          <div className="px-4 flex-1 flex items-center justify-center my-auto min-h-0 py-2">
            <div className="w-full max-w-[360px] aspect-[3/4.1] max-h-[480px] rounded-2xl overflow-hidden shadow-2xl relative bg-black/40 border border-white/10 my-auto">
              <div className="relative w-full h-full">
                <img
                  src={activity.detailImageUrl || activity.bannerUrl}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
                {/* 底部暗色渐变遮罩 (参考截图2) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 via-45% to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 text-white space-y-2">
                  <h3 className="text-[16px] font-bold leading-snug drop-shadow-md text-white">
                    {activity.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[12px] text-white/90">
                    <Clock className="w-3.5 h-3.5 text-white/80 shrink-0" />
                    <span className="truncate">{activity.timeRange}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 底部分享至面板（微信好友、微信朋友圈、保存图片 - 参考截图1与截图2 1:1还原） */}
          <div className="bg-white rounded-t-[28px] pt-4 pb-6 px-6 shrink-0 shadow-[0_-8px_24px_rgba(0,0,0,0.3)]">
            <div className="text-center text-[16px] font-bold text-gray-900 mb-4">
              分享至
            </div>
            <div className="flex items-center justify-around">
              {/* 微信好友 (参考截图1: 绿色实心圆背景 + 白色线条气泡图案) */}
              <button
                type="button"
                onClick={() => {
                  showToast('已生成微信分享卡片，可直接发送给好友！');
                }}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-[#07c160] flex items-center justify-center text-white shadow-xs group-active:scale-95 transition-transform">
                  <MessageCircle className="w-7 h-7 text-white stroke-[2.2]" fill="none" />
                </div>
                <span className="text-[13px] text-gray-700 font-medium">微信好友</span>
              </button>

              {/* 微信朋友圈 (参考截图1: 绿色实心圆背景 + 白色线条快门/镜头光圈图案) */}
              <button
                type="button"
                onClick={() => {
                  showToast('已生成专属朋友圈活动海报！');
                }}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-[#07c160] flex items-center justify-center text-white shadow-xs group-active:scale-95 transition-transform">
                  <Aperture className="w-7 h-7 text-white stroke-[2.2]" fill="none" />
                </div>
                <span className="text-[13px] text-gray-700 font-medium">微信朋友圈</span>
              </button>

              {/* 保存图片 */}
              <button
                type="button"
                onClick={() => {
                  setSaveSuccess(true);
                  showToast('活动海报已成功保存至系统相册！');
                  setTimeout(() => setSaveSuccess(false), 2000);
                }}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-[#f4f5f7] flex items-center justify-center text-gray-700 shadow-xs group-active:scale-95 transition-transform">
                  {saveSuccess ? (
                    <Check className="w-6 h-6 text-[#07c160] stroke-[2.4]" />
                  ) : (
                    <Download className="w-6 h-6 text-gray-700 stroke-[2]" />
                  )}
                </div>
                <span className="text-[13px] text-gray-700 font-medium">
                  {saveSuccess ? '已保存相册' : '保存图片'}
                </span>
              </button>
            </div>

            {/* 底部指示横条 */}
            <div className="w-32 h-1 bg-gray-200 rounded-full mx-auto mt-6"></div>
          </div>
        </div>
      )}

      {/* ================= 需求4 & 新增：转发问卷分享至弹窗嵌入手机模型尺寸里 ================= */}
      {showSurveyModal && (
        <div 
          className="absolute inset-0 z-[60] flex flex-col justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSurveyModal(false);
          }}
        >
          <div className="w-full bg-white rounded-t-[28px] pt-5 pb-7 px-6 shadow-2xl relative animate-in slide-in-from-bottom-6 duration-200">
            {/* 顶栏：标题“分享至”与右侧关闭叉号 */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-[16px] font-bold text-gray-900">分享至</span>
              <button
                type="button"
                onClick={() => setShowSurveyModal(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="关闭"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 渠道按钮：微信好友、微信朋友圈 (参考截图1: 绿色实心圆背景 + 白色线条图标 1:1还原) */}
            <div className="flex items-center justify-around px-8 py-2">
              {/* 微信好友 */}
              <button
                type="button"
                onClick={() => {
                  setShowSurveyModal(false);
                  showToast(`已生成《${activity.title}》问卷分享卡片！`);
                }}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-[#07c160] flex items-center justify-center text-white shadow-xs group-active:scale-95 transition-transform">
                  <MessageCircle className="w-7 h-7 text-white stroke-[2.2]" fill="none" />
                </div>
                <span className="text-[13px] text-gray-700 font-medium">微信好友</span>
              </button>

              {/* 微信朋友圈 */}
              <button
                type="button"
                onClick={() => {
                  setShowSurveyModal(false);
                  showToast(`已生成问卷分享图文，可前往朋友圈发布！`);
                }}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-[#07c160] flex items-center justify-center text-white shadow-xs group-active:scale-95 transition-transform">
                  <Aperture className="w-7 h-7 text-white stroke-[2.2]" fill="none" />
                </div>
                <span className="text-[13px] text-gray-700 font-medium">微信朋友圈</span>
              </button>
            </div>

            {/* 底部指示横条 */}
            <div className="w-32 h-1 bg-gray-200 rounded-full mx-auto mt-6"></div>
          </div>
        </div>
      )}

      {/* Toast feedback */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900/90 text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-150">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
