import React, { useState } from 'react';
import { ChevronLeft, Check } from 'lucide-react';
import surveyBannerImg from '../assets/images/survey_banner_1788429156090.jpg';

interface SurveyResultPageProps {
  customerName: string;
  onBack: () => void;
  showNavigationButtons?: boolean;
}

export const SurveyResultPage: React.FC<SurveyResultPageProps> = ({
  customerName,
  onBack,
  showNavigationButtons = true,
}) => {
  // 问卷题目列表（客户已提交的答案）
  const questions = [
    {
      id: 1,
      title: '您或家人未来半年内，还想了解哪些保障？',
      type: '多选',
      options: [
        { id: 1, text: '抵扣个税类', checked: true },
        { id: 2, text: '养老金补充类', checked: true },
        { id: 3, text: '储蓄类', checked: false },
        { id: 4, text: '关爱健康类', checked: false },
        { id: 5, text: '出行保障类', checked: false },
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

  return (
    <div className="w-full flex-1 flex flex-col bg-white select-none relative animate-in fade-in duration-200">
      {/* 顶部导航条：与客户清单/方案详情样式尺寸完全保持一致 */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-3 py-3 border-b border-gray-100 flex items-center justify-between shadow-2xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-gray-800 hover:text-emerald-700 transition-colors py-0.5 px-1 rounded-md active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800 stroke-[2.2]" />
          <span className="text-sm font-medium text-gray-800">返回</span>
        </button>
        <h1 className="text-base font-bold text-gray-900 tracking-tight">问卷结果</h1>
        <div className="w-12 flex justify-end" />
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* ================= 1. 顶部视觉大 Banner (尺寸比例与现有手机页面完全一致) ================= */}
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

        {/* ================= 2. 主体内容白底卡片 (向上覆盖Banner弧形圆角，完全还原截图2) ================= */}
        <div className="relative -mt-5 bg-white rounded-t-[24px] px-4 sm:px-5 pt-5 pb-10 shadow-sm">
          {/* 绿色致辞文字 */}
          <div className="text-[#009f4d] text-[13px] sm:text-[13.5px] leading-[1.65] font-medium tracking-tight mb-4">
            亲爱的<span className="font-bold underline decoration-emerald-300 underline-offset-2">{customerName || 'XXX'}</span>，欢迎参与中宏保险客户服务节调研，本问卷为自愿填写，您的真实反馈是我们提升服务的重要参考。感谢您的支持与配合！
          </div>

          {/* 进度指示条 (左侧绿色进度条，右侧 当前题 / 总题数 计数) */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#00a854] h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
            <div className="text-xs font-bold shrink-0">
              <span className="text-[#00a854]">{currentIndex + 1}</span>
              <span className="text-gray-400 font-normal"> / {questions.length}</span>
            </div>
          </div>

          {/* 题目行 */}
          <div className="mb-4">
            <div className="flex items-baseline flex-wrap gap-1.5 mb-3.5">
              <span className="bg-[#d7f2e3] text-[#009f4d] text-xs font-bold px-2 py-0.5 rounded-md">
                第{currentIndex + 1}题
              </span>
              <span className="text-sm sm:text-[15px] font-bold text-gray-900 leading-snug">
                {currentQuestion.title}
              </span>
              <span className="text-xs text-gray-400 font-normal">
                ({currentQuestion.type})
              </span>
            </div>

            {/* 选项列表 (展示客户已提交的勾选结果) */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt) => (
                <div
                  key={opt.id}
                  className={`w-full rounded-xl px-4 py-3.5 flex items-center justify-between transition-all ${
                    opt.checked
                      ? 'bg-[#edf9f2] border border-[#00c06d]/40 shadow-2xs'
                      : 'bg-[#f4f6f8] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* 复选勾选状态图标 */}
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
                </div>
              ))}
            </div>
          </div>

          {/* 上一题 / 下一题 翻页按钮 */}
          {showNavigationButtons && (
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => !isFirst && setCurrentIndex((i) => i - 1)}
                disabled={isFirst}
                className={`flex-1 py-2.5 rounded-full text-sm font-medium border transition-all ${
                  isFirst
                    ? 'bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 active:scale-[0.98]'
                }`}
              >
                上一题
              </button>
              <button
                onClick={() => !isLast && setCurrentIndex((i) => i + 1)}
                className="flex-1 py-2.5 rounded-full text-sm font-medium bg-[#00c06d] text-white hover:bg-[#00ab61] active:scale-[0.98] transition-all shadow-2xs"
              >
                下一题
              </button>
            </div>
          )}

          {/* 问卷已完成状态底注说明 */}
          <div className="mt-8 text-center text-xs text-gray-400">
            客户 {customerName} 已于 2026-08-28 完成该问卷调研并提交
          </div>
        </div>
      </div>
    </div>
  );
};
