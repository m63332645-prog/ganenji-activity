import React, { useState } from 'react';
import { ChevronLeft, Check, X, MessageCircle } from 'lucide-react';
import surveyBannerImg from '../assets/images/survey_banner_1788429156090.jpg';

interface ForwardSurveyPageProps {
  customerName: string;
  onBack: () => void;
  onShareSuccess?: (targetName: string) => void;
}

export const ForwardSurveyPage: React.FC<ForwardSurveyPageProps> = ({
  customerName,
  onBack,
  onShareSuccess,
}) => {
  // 截图2红框中的选项，按用户要求：复制问卷结果页样式，但是不要勾选选项
  const [options, setOptions] = useState([
    { id: 1, text: '抵扣个税类', checked: false },
    { id: 2, text: '养老金补充类', checked: false },
    { id: 3, text: '储蓄类', checked: false },
    { id: 4, text: '关爱健康类', checked: false },
    { id: 5, text: '出行保障类', checked: false },
  ]);

  // 分享弹窗状态
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleOption = (id: number) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, checked: !opt.checked } : opt))
    );
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-white select-none relative animate-in fade-in duration-200 h-full overflow-hidden">
      {/* 顶部导航条：样式尺寸与现有页面保持完全一致，标题右上角有【转发】图标按钮 */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-3.5 py-3 border-b border-gray-100 flex items-center justify-between shadow-2xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-gray-800 hover:text-emerald-700 transition-colors py-0.5 px-1 rounded-md active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800 stroke-[2.2]" />
          <span className="text-sm font-medium text-gray-800">返回</span>
        </button>
        <h1 className="text-base font-bold text-gray-900 tracking-tight">转发问卷</h1>
        {/* 标题右上角的【转发】图标按钮（参考截图1经典 iOS/分享托盘向上箭头样式） */}
        <button
          onClick={() => setIsShareModalOpen(true)}
          className="p-1 text-gray-700 hover:text-[#00c06d] active:scale-95 transition-all flex items-center justify-center rounded-lg hover:bg-gray-50"
          title="转发问卷"
        >
          <svg
            className="w-5 h-5 stroke-[2] stroke-current fill-none"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* 向上箭头 */}
            <path d="M12 3v12" />
            <path d="m8 7 4-4 4 4" />
            {/* 敞口托盘底座 */}
            <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* ================= 1. 顶部视觉大 Banner (复制问卷结果页样式) ================= */}
        <div className="relative w-full h-[180px] sm:h-[195px] overflow-hidden bg-[#247ba0]">
          {/* 背景大图 */}
          <img
            src={surveyBannerImg}
            alt="满格精彩 尽兴乐活"
            className="w-full h-full object-cover object-center"
          />

          {/* 渐变遮罩增强文字清晰度 */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#10567a]/40 via-transparent to-[#0a3a52]/40 pointer-events-none" />

          {/* Banner 内容覆盖层 */}
          <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between z-10">
            {/* 左上角品牌与30周年标识 */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 text-white">
                {/* 中宏保险三叶草矢量标志 */}
                <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
                </svg>
                <div className="leading-tight">
                  <div className="text-[11px] font-black tracking-wider uppercase drop-shadow-xs">中宏保险</div>
                  <div className="text-[6.5px] tracking-tight opacity-90 scale-90 origin-left">MANULIFE-SINOCHEM</div>
                </div>
              </div>

              {/* 细白竖线分割 */}
              <div className="w-[1px] h-3.5 bg-white/60" />

              {/* 30徽标 */}
              <div className="flex items-center justify-center border border-white/80 rounded-full px-1.5 py-0.2 text-[9px] font-bold text-white tracking-tighter">
                30
              </div>
            </div>

            {/* 中间大字文案 */}
            <div className="pt-2 pb-0.5">
              <h2 className="text-[25px] sm:text-[28px] font-black text-white tracking-wider drop-shadow-md leading-none">
                满格精彩
              </h2>
              <h2 className="text-[25px] sm:text-[28px] font-black text-white tracking-wider drop-shadow-md leading-tight mt-0.5">
                尽兴乐活
              </h2>
              {/* 英文草书 / 优雅衬线 */}
              <div
                className="text-[12.5px] sm:text-[13.5px] text-white/95 tracking-wide drop-shadow-sm mt-1 italic font-serif"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Celebrating 30th Anniversary
              </div>
            </div>
          </div>
        </div>

        {/* ================= 2. 主体内容白底卡片 (复制问卷结果页样式) ================= */}
        <div className="relative -mt-5 bg-white rounded-t-[24px] px-4 sm:px-5 pt-5 pb-12 shadow-sm">
          {/* 绿色致辞文字 */}
          <div className="text-[#009f4d] text-[13px] sm:text-[13.5px] leading-[1.65] font-medium tracking-tight mb-4">
            亲爱的<span className="font-bold underline decoration-emerald-300 underline-offset-2">{customerName || '王强'}</span>，欢迎参与中宏保险客户服务节调研，本问卷为自愿填写，您的真实反馈是我们提升服务的重要参考。感谢您的支持与配合！
          </div>

          {/* 进度指示条 */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#00a854] h-full rounded-full w-0 transition-all duration-300" />
            </div>
            <div className="text-xs font-bold shrink-0">
              <span className="text-[#00a854]">0</span>
              <span className="text-gray-400 font-normal"> / 1</span>
            </div>
          </div>

          {/* 题目行 (参考截图2红框内容：仅展示这一个问题) */}
          <div className="mb-4">
            <div className="flex items-baseline flex-wrap gap-1.5 mb-3.5">
              <span className="bg-[#d7f2e3] text-[#009f4d] text-xs font-bold px-2 py-0.5 rounded-md">
                第1题
              </span>
              <span className="text-sm sm:text-[15px] font-bold text-gray-900 leading-snug">
                您或家人未来半年内，还想了解哪些保障？
              </span>
              <span className="text-xs text-gray-400 font-normal">
                (多选)
              </span>
            </div>

            {/* 选项列表 (按要求：不要勾选选项) */}
            <div className="space-y-2.5">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => toggleOption(opt.id)}
                  type="button"
                  className={`w-full rounded-xl px-4 py-3.5 flex items-center justify-between transition-all text-left ${
                    opt.checked
                      ? 'bg-[#edf9f2] border border-[#00c06d]/40 shadow-2xs'
                      : 'bg-[#f4f6f8] border border-transparent hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* 复选框图标：未勾选时为空白框，勾选时为绿色勾 */}
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                        opt.checked
                          ? 'bg-[#00c06d] text-white shadow-2xs'
                          : 'border-2 border-gray-300 bg-white'
                      }`}
                    >
                      {opt.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    {/* 选项文本 */}
                    <span
                      className={`text-sm tracking-tight ${
                        opt.checked ? 'text-gray-900 font-semibold' : 'text-gray-700 font-normal'
                      }`}
                    >
                      {opt.text}
                    </span>
                  </div>

                  {opt.checked && (
                    <span className="text-[11px] font-medium text-[#009f4d] bg-white px-2 py-0.5 rounded-full shadow-2xs border border-emerald-100">
                      已选择
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= 转发弹窗：1:1 参考用户截图，无缝内嵌在标准手机容器内，无全屏穿透 ================= */}
      {isShareModalOpen && (
        <div className="absolute inset-0 z-50 flex items-end justify-center animate-in fade-in duration-200 overflow-hidden">
          {/* 半透明深色遮罩 */}
          <div
            onClick={() => setIsShareModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-[0.5px]"
          />

          {/* 底部滑出白底卡片 (对齐用户截图：加粗「分享至」+ 右侧关闭✕ + 纯绿大圆微信图标 +「微信好友」) */}
          <div className="relative z-10 w-full bg-white rounded-t-2xl shadow-2xl p-5 pb-8 animate-in slide-in-from-bottom duration-200">
            {/* 顶栏：左侧「分享至」，右侧关闭按钮 */}
            <div className="flex items-center justify-between pb-5 border-b border-gray-100/80">
              <h4 className="text-[18px] font-bold text-gray-900 tracking-tight">
                分享至
              </h4>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 active:scale-95 transition-colors"
                title="关闭"
              >
                <X className="w-5 h-5 stroke-[2]" />
              </button>
            </div>

            {/* 内容区：居中纯绿色圆形微信图标 + 下方「微信好友」文字 (完全还原截图) */}
            <div className="pt-6 pb-4 flex flex-col items-center">
              <button
                onClick={() => {
                  setIsShareModalOpen(false);
                  showToast(`已成功将问卷分享给微信好友 (${customerName || '客户'})`);
                  if (onShareSuccess) {
                    onShareSuccess(customerName);
                  }
                }}
                className="group flex flex-col items-center gap-2 focus:outline-none active:scale-95 transition-all"
              >
                {/* 微信绿色大圆钮 */}
                <div className="w-14 h-14 rounded-full bg-[#07c160] flex items-center justify-center text-white shadow-sm group-hover:bg-[#06ad56] transition-colors">
                  <MessageCircle className="w-7 h-7 text-white stroke-[2.2]" fill="none" />
                </div>
                {/* 微信好友文字 */}
                <span className="text-xs text-gray-700 font-normal">微信好友</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast 提示 */}
      {toastMessage && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-gray-900/90 text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-150">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
