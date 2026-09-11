import React from 'react';
import { X, CheckCircle, Palette, Type, ShieldCheck, Sparkles } from 'lucide-react';

interface DesignSpecModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignSpecModal: React.FC<DesignSpecModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-gray-900">
              方案详情排版调整对照规范
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto text-xs text-gray-600">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Scheme Detail Page Module Specification */}
            <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 sm:col-span-2">
              <div className="flex items-center gap-2 text-emerald-950 font-semibold mb-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>方案详情页 6 项精准调整</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                <div className="bg-white p-3 rounded-xl border border-emerald-100/80">
                  <div className="font-bold text-emerald-800 mb-1">1. 纯净导航栏</div>
                  <p className="text-[11.5px] leading-relaxed text-gray-600">
                    删除了页面右上角的分享图标，标题居中显示，仅保留返回按钮。
                  </p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-emerald-100/80">
                  <div className="font-bold text-emerald-800 mb-1">2. 动态状态胶囊（截图1/2/3）</div>
                  <p className="text-[11.5px] leading-relaxed text-gray-600">
                    海报右上角动态显示：开展中（淡绿）、待开始（暖橙）、已结束（浅灰）。
                  </p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-emerald-100/80">
                  <div className="font-bold text-emerald-800 mb-1">3. 精简信息头</div>
                  <p className="text-[11.5px] leading-relaxed text-gray-600">
                    删除了签到二维码入口与多余导语，仅保留主题标签、活动名称与时间。
                  </p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-emerald-100/80">
                  <div className="font-bold text-emerald-800 mb-1">4. 方案简介统合卡片（截图4）</div>
                  <p className="text-[11.5px] leading-relaxed text-gray-600">
                    标题定为「方案简介」及主旨，全部文字与 1/2/3 执行流程收纳在同个卡片中。
                  </p>
                </div>
              </div>
            </div>

            {/* Typography & Hierarchy */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 text-gray-900 font-semibold mb-2">
                <Type className="w-4 h-4 text-purple-600" />
                <span>截图4 单卡片排版规范</span>
              </div>
              <ul className="space-y-1.5 text-gray-600">
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>主段落：</strong>13.5px 正文深灰，1.65 倍舒适行高。</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>步骤 1/2/3：</strong>左侧加粗数字 + 标题与副文本纵向排布。</span>
                </li>
              </ul>
            </div>

            {/* Status Colors & Badges */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 text-gray-900 font-semibold mb-2">
                <Palette className="w-4 h-4 text-emerald-600" />
                <span>海报徽标样式对照</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between bg-white p-1.5 rounded-lg border border-gray-100">
                  <span className="text-gray-700">截图1 开展中</span>
                  <span className="px-3 py-0.5 rounded-full text-[11.5px] font-medium bg-[#d6f5e3] text-[#12a150]">开展中</span>
                </div>
                <div className="flex items-center justify-between bg-white p-1.5 rounded-lg border border-gray-100">
                  <span className="text-gray-700">截图2 待开始</span>
                  <span className="px-3 py-0.5 rounded-full text-[11.5px] font-medium bg-[#ffecd7] text-[#fa6400]">待开始</span>
                </div>
                <div className="flex items-center justify-between bg-white p-1.5 rounded-lg border border-gray-100">
                  <span className="text-gray-700">截图3 已结束</span>
                  <span className="px-3 py-0.5 rounded-full text-[11.5px] font-medium bg-[#eef1f5] text-[#556980]">已结束</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-900 text-white rounded-xl text-xs font-medium hover:bg-gray-800 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};
