import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  Check,
  Info,
  Filter,
  ArrowUpDown,
  Eye,
  EyeOff,
  X,
  Bookmark,
  MessageCircle,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import type { ActivityItem } from '../types';
import { SurveyResultPage } from './SurveyResultPage';
import maleAvatar from '../assets/男头像.png';
import femaleAvatar from '../assets/女头像.png';

interface ParticipantCustomersPageProps {
  activity: ActivityItem;
  onBack: () => void;
}

interface CustomerInfo {
  id: string;
  name: string;
  phoneMasked: string;
  phoneFull: string;
  vipLabel: string;
  age: string;
  activityName: string;
  startDate: string;
  vipTier: string;
  income: string;
  policyCount: string;
  policyApe: string;
  lastPurchaseDate: string;
  forwardStatus: '已转发' | '未转发';
}

// 3个客户卡片数据定义
interface CustomerCardItem {
  id: number;
  name: string;
  phoneMasked: string;
  phoneFull: string;
  vipLabel: string;
  age: string;
  income: string;
  wechatBound: string;
  groupInsurance: string;
  preservationCustomer: string;
  claimCount: string;
  totalPolicies: string;
  annualMedicalPolicy: string;
  avatar: 'male' | 'female';
  buttonType: 'share' | 'already_shared' | 'results' | 'results_nowin';
  // 该卡片需隐藏的字段 key（不同客户展示字段不同）
  hiddenFields?: string[];
}

const THREE_CUSTOMERS: CustomerCardItem[] = [
  {
    id: 1,
    name: '宋资',
    phoneMasked: '138****2928',
    phoneFull: '13888212928',
    vipLabel: '黄金会员',
    age: '50岁',
    income: '8000',
    wechatBound: '是',
    groupInsurance: '否',
    preservationCustomer: '是',
    claimCount: '0',
    totalPolicies: '5',
    annualMedicalPolicy: '是',
    avatar: 'male',
    buttonType: 'share',
  },
  {
    id: 2,
    name: '张伟明',
    phoneMasked: '139****5673',
    phoneFull: '13988215673',
    vipLabel: '宏运世家钻石会员',
    age: '50岁',
    income: '8000',
    wechatBound: '是',
    groupInsurance: '否',
    preservationCustomer: '是',
    claimCount: '0',
    totalPolicies: '5',
    annualMedicalPolicy: '是',
    avatar: 'male',
    buttonType: 'already_shared',
  },
  {
    id: 3,
    name: '陈美玲',
    phoneMasked: '137****9012',
    phoneFull: '13788219012',
    vipLabel: '宏运世家黄钻至尊会员',
    age: '50岁',
    income: '8000',
    wechatBound: '是',
    groupInsurance: '否',
    preservationCustomer: '是',
    claimCount: '0',
    totalPolicies: '5',
    annualMedicalPolicy: '是',
    avatar: 'female',
    buttonType: 'results',
  },
  {
    id: 4,
    name: '赵小芳',
    phoneMasked: '137****9012',
    phoneFull: '13788219012',
    vipLabel: '白金会员',
    age: '50岁',
    income: '8000',
    wechatBound: '是',
    groupInsurance: '否',
    preservationCustomer: '是',
    claimCount: '0',
    totalPolicies: '5',
    annualMedicalPolicy: '是',
    avatar: 'female',
    buttonType: 'results_nowin',
    hiddenFields: ['income', 'wechatBound', 'groupInsurance', 'preservationCustomer'],
  },
];

export const ParticipantCustomersPage: React.FC<ParticipantCustomersPageProps> = ({
  activity,
  onBack,
}) => {
  // 每个卡片独立的手机号显示状态
  const [showPhoneMap, setShowPhoneMap] = useState<Record<number, boolean>>({});
  const toggleShowPhone = (id: number) => {
    setShowPhoneMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 排序状态
  const [selectedSort, setSelectedSort] = useState<'姓名' | '活动开始时间' | null>(null);

  // 筛选状态 (需求选项：转发问卷、已转发问卷、问卷结果、转发抽奖、已转发抽奖、抽奖结果)
  const [selectedFilterTags, setSelectedFilterTags] = useState<string[]>([]);

  // 截图1分享弹窗状态
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareTargetInfo, setShareTargetInfo] = useState<{ name: string; type: '问卷' | '抽奖' }>({
    name: '宋资',
    type: '问卷',
  });

  // 截图2中奖结果弹窗状态
  const [isLotteryModalOpen, setIsLotteryModalOpen] = useState(false);
  const [lotteryCustomerName, setLotteryCustomerName] = useState('宋资');

  // 问卷结果弹窗状态
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
  const [surveyCustomerName, setSurveyCustomerName] = useState('宋资');

  // 活动状态判断
  const isEnded = activity?.status === '已结束';
  const isPending = activity?.status === '待开始';
  const isAct2 = activity?.id === 'act-2';
  const isAct3 = activity?.id === 'act-3';
  const isAct101 = activity?.id === 'act-101';

  // 是否获客活动
  const isAcqActivity = activity?.category === '获客活动';

  // 1. 活动管理平台是否配置问卷、抽奖
  const isSurveyConfigured = activity?.hasSurvey !== false;
  const isLotteryConfigured = activity?.hasLottery !== false;

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  // 活动已结束 弹窗提示状态
  const [isEndedAlertOpen, setIsEndedAlertOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleActivityEndedClick = () => {
    setIsEndedAlertOpen(true);
    showToast('活动已结束');
  };

  // 根据活动配置动态确定筛选选项
  const FILTER_OPTIONS = useMemo(() => {
    if (isAct2) {
      // 需求2：感恩季第2个活动卡片删除客户卡片上的按钮，不提供按钮标签筛选
      return [];
    }
    if (isAct3) {
      return ['待转发问卷', '已转发问卷', '问卷结果'];
    }
    const opts: string[] = [];
    if (isSurveyConfigured) {
      opts.push('待转发问卷', '已转发问卷', '问卷结果');
    }
    if (isLotteryConfigured) {
      opts.push('待转发抽奖', '已转发抽奖', '抽奖结果', '未中奖');
    }
    return opts.length > 0
      ? opts
      : ['待转发问卷', '已转发问卷', '问卷结果', '待转发抽奖', '已转发抽奖', '抽奖结果', '未中奖'];
  }, [isAct2, isAct3, isSurveyConfigured, isLotteryConfigured]);

  const toggleFilterTag = (tag: string) => {
    setSelectedFilterTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredCustomers = useMemo(() => {
    let list = [...THREE_CUSTOMERS];

    // 需求：更多活动卡片点击第1个活动卡片(act-101)，删除第四个赵小芳客户卡片
    if (isAct101) {
      list = list.filter((cust) => cust.name !== '赵小芳');
    }

    // 筛选标签
    if (selectedFilterTags.length > 0) {
      list = list.filter((cust) => {
        return selectedFilterTags.some((tag) => {
          if (isAct2 || isAct3) {
            if (tag === '待转发问卷') return cust.id === 1;
            if (tag === '已转发问卷') return cust.id === 2;
            if (tag === '问卷结果') return cust.id === 3 || cust.id === 4;
            return false;
          }
          if (tag === '待转发问卷') {
            return cust.buttonType === 'share';
          }
          if (tag === '已转发问卷') {
            return cust.buttonType === 'already_shared';
          }
          if (tag === '问卷结果') {
            return cust.buttonType === 'results' || cust.buttonType === 'results_nowin';
          }
          if (tag === '待转发抽奖') {
            return cust.buttonType === 'share';
          }
          if (tag === '已转发抽奖') {
            return cust.buttonType === 'already_shared';
          }
          if (tag === '抽奖结果') {
            return cust.buttonType === 'results' || cust.buttonType === 'results_nowin';
          }
          if (tag === '未中奖') {
            return cust.buttonType === 'results_nowin' || cust.name === '赵小芳';
          }
          return true;
        });
      });
    }

    // 排序
    if (selectedSort === '姓名') {
      list.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
    }

    return list;
  }, [isAct101, isAct2, isAct3, selectedFilterTags, selectedSort]);

  // 当打开问卷结果时，直接作为子页面渲染在当前手机容器中，与现有页面样式尺寸保持完全一致（防止超宽屏穿透）
  if (isSurveyModalOpen) {
    return (
      <SurveyResultPage
        customerName={surveyCustomerName}
        showNavigationButtons={!isAct101}
        onBack={() => setIsSurveyModalOpen(false)}
      />
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col bg-[#f4f5f7] select-none h-full relative overflow-hidden">
      {/* Top Navigation Bar:
          - 获客活动：显示活动详情与客户名单可互相切换 Tab
          - 客户经营/更多活动等其他活动：标题仅居中显示“客户清单” */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-3 py-2.5 border-b border-gray-100 flex items-center justify-between shadow-2xs relative">
        <button
          onClick={onBack}
          className="p-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-1 z-10 cursor-pointer"
          aria-label={isAcqActivity ? '返回活动详情' : '返回方案详情'}
        >
          <ChevronLeft className="w-5 h-5 text-gray-800 stroke-[2.2]" />
        </button>

        {/* 居中标题与名单项 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {isAcqActivity ? (
            <div className="flex items-center gap-7 pointer-events-auto">
              <button
                type="button"
                onClick={onBack}
                className="text-[16px] font-normal text-gray-500 hover:text-gray-900 transition-colors cursor-pointer leading-tight pb-[3.5px]"
              >
                活动详情
              </button>
              <div className="flex flex-col items-center cursor-default">
                <span className="text-[16px] font-bold text-gray-950 tracking-tight leading-tight">
                  客户名单
                </span>
                <span className="w-5 h-[2.5px] bg-[#00b578] rounded-full mt-1" />
              </div>
            </div>
          ) : (
            <h1 className="text-base font-bold text-gray-900 tracking-tight pointer-events-auto">
              客户清单
            </h1>
          )}
        </div>

        <div className="w-7 z-10" />
      </div>

      {/* Main Scroll Content */}
      <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
        {/* Module 2: 符合条件客户 (通栏显示) */}
        <div className="w-full bg-white border-t border-gray-200/80 shadow-2xs relative flex-1 flex flex-col">
          {/* Header Bar: 严格参考截图样式，左侧为 "符合条件客户（共12人）"，右侧为排序、筛选圆形按钮 */}
          <div className="px-4 py-3.5 border-b border-gray-100 flex items-center justify-between bg-white relative z-30">
            {/* Left Title: 绿竖条 + 符合条件客户（共12人） */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#00b578] rounded-full inline-block shrink-0" />
              <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">
                符合条件客户<span className="text-xs font-normal text-gray-500 ml-1.5">（共12人）</span>
              </h3>
            </div>

            {/* Right: 筛选按钮 */}
            <div className="flex items-center gap-2.5">
              {/* 筛选按钮 */}
              <button
                onClick={() => {
                  setIsFilterOpen(!isFilterOpen);
                  setIsSortOpen(false);
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs ${
                  isFilterOpen
                    ? 'bg-[#00b578] text-white shadow-md'
                    : selectedFilterTags.length > 0
                    ? 'bg-emerald-50 text-[#00b578] border border-emerald-400'
                    : 'bg-white border border-gray-200/90 text-[#00b578] hover:bg-emerald-50/50'
                }`}
                title="筛选"
              >
                <Filter className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>
          </div>

          {/* ================= 排序弹窗 (严格参考用户截图样式：贴紧标题栏底部展开的白卡片 + 下方深色半透明遮罩) ================= */}
          {isSortOpen && (
            <>
              {/* 背景半透明深色遮罩 (严格还原截图半透明压暗效果，透出下方客户卡片) */}
              <div
                onClick={() => setIsSortOpen(false)}
                className="absolute inset-0 top-[49px] bg-black/60 z-20 backdrop-blur-[0.5px] animate-in fade-in duration-150"
              />
              <div className="absolute top-[49px] inset-x-0 z-30 w-full bg-white px-5 pt-4 pb-5 border-b border-gray-100 shadow-2xl space-y-4 animate-in slide-in-from-top-1 duration-150">
                <div className="text-left pb-1">
                  <span className="text-[15px] font-bold text-gray-900">排序</span>
                </div>

                {/* 排序选项胶囊 (完全还原截图：浅灰底色胶囊、深灰文本、右侧上下双箭头) */}
                <div className="flex items-center gap-3">
                  {(['姓名', '活动开始时间'] as const).map((name) => {
                    const isSelected = selectedSort === name;
                    return (
                      <button
                        key={name}
                        onClick={() => setSelectedSort(isSelected ? null : name)}
                        className={`px-4 py-2 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-[#e7f7ed] text-[#00b578] border border-[#00b578] font-semibold'
                            : 'bg-[#f4f6f8] text-gray-700 hover:bg-gray-200 border border-transparent'
                        }`}
                      >
                        <span>{name}</span>
                        <ArrowUpDown className="w-3 h-3 text-current stroke-[2.2]" />
                      </button>
                    );
                  })}
                </div>

                {/* 底部重置与确定按钮 (像素级还原截图：白底重置 + 纯绿底确定) */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <button
                    onClick={() => {
                      setSelectedSort(null);
                      showToast('已重置排序条件');
                    }}
                    className="w-full py-2.5 rounded-md border border-gray-200 text-gray-700 text-sm font-normal hover:bg-gray-50 active:scale-98 transition-all flex items-center justify-center"
                  >
                    重置
                  </button>
                  <button
                    onClick={() => {
                      setIsSortOpen(false);
                      showToast(selectedSort ? `已按「${selectedSort}」排序` : '已应用排序');
                    }}
                    className="w-full py-2.5 rounded-md bg-[#00b578] hover:bg-[#00a36c] active:scale-98 text-white text-sm font-medium shadow-xs transition-all flex items-center justify-center"
                  >
                    确定
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ================= 筛选弹窗 (严格参考用户截图样式：删除保单号/姓名/电话，只保留状态筛选项) ================= */}
          {isFilterOpen && (
            <>
              {/* 背景半透明深色遮罩 */}
              <div
                onClick={() => setIsFilterOpen(false)}
                className="absolute inset-0 top-[49px] bg-black/60 z-20 backdrop-blur-[0.5px] animate-in fade-in duration-150"
              />
              <div className="absolute top-[49px] inset-x-0 z-30 w-full bg-white px-5 pt-4 pb-5 border-b border-gray-100 shadow-2xl space-y-4 animate-in slide-in-from-top-1 duration-150">
                <div className="text-left pb-1">
                  <span className="text-[15px] font-bold text-gray-900">筛选</span>
                </div>

                {/* 6 个状态筛选项 (按要求3已彻底删除保单号、投保人姓名、电话筛选条件) */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  {FILTER_OPTIONS.map((tag) => {
                    const isChecked = selectedFilterTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleFilterTag(tag)}
                        className={`py-2.5 px-1 text-xs font-medium rounded-full border transition-all text-center truncate ${
                          isChecked
                            ? 'bg-[#e7f7ed] text-[#00b578] border-[#00b578] font-semibold shadow-2xs'
                            : 'bg-[#f4f6f8] text-gray-700 border-transparent hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>

                {/* 底部重置与确定按钮 (像素级对齐截图：白底重置 + 纯绿底确定) */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <button
                    onClick={() => {
                      setSelectedFilterTags([]);
                      showToast('已重置筛选选项');
                    }}
                    className="w-full py-2.5 rounded-md border border-gray-200 text-gray-700 text-sm font-normal hover:bg-gray-50 active:scale-98 transition-all flex items-center justify-center"
                  >
                    重置
                  </button>
                  <button
                    onClick={() => {
                      setIsFilterOpen(false);
                      showToast(
                        selectedFilterTags.length > 0
                          ? `已筛选：${selectedFilterTags.join('、')}`
                          : '已应用筛选'
                      );
                    }}
                    className="w-full py-2.5 rounded-md bg-[#00b578] hover:bg-[#00a36c] active:scale-98 text-white text-sm font-medium shadow-xs transition-all flex items-center justify-center"
                  >
                    确定
                  </button>
                </div>
              </div>
            </>
          )}

          {/* 客户卡片内容区 */}
          <div className="w-full flex-1 p-3.5 sm:p-4 space-y-4 pb-8">
            {filteredCustomers.map((cust, index) => {
              const isPhoneVisible = !!showPhoneMap[cust.id];
              return (
                <div
                  key={cust.id}
                  id={`customer-card-${cust.id}`}
                  className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 space-y-3.5 shadow-xs transition-shadow hover:shadow-sm"
                >
                  {/* 头部：头像 + 姓名 + 尊享会金卡标签 + 手机号(带眼睛)紧密排列 */}
                  <div className="flex items-center gap-3">
                    {/* 客户真实头像：男头像/女头像 */}
                    <img
                      src={cust.avatar === 'male' ? maleAvatar : femaleAvatar}
                      alt={cust.name}
                      className="w-12 h-12 rounded-full object-cover shrink-0 shadow-xs border border-gray-200/80"
                    />

                    {/* 姓名、尊享会金卡标签、手机号 */}
                    <div className="space-y-1">
                      {/* Row 1: 姓名「王强」 + 尊享会金卡标签 */}
                      <div className="flex items-center gap-2">
                        <span className="text-[17px] font-bold text-gray-900 tracking-tight">
                          {cust.name}
                        </span>
                        {/* 客户身份标签：无背景，中宏绿字体，左侧带绿色书签图标 */}
                        <div className="flex items-center gap-1 text-[12px] text-[#00b578] font-medium">
                          <Bookmark className="w-3.5 h-3.5 text-[#00b578] fill-none stroke-[2]" />
                          <span>{cust.vipLabel}</span>
                        </div>
                      </div>

                      {/* Row 2: 手机号 + 可切换明文的眼睛图标 */}
                      <div className="flex items-center gap-1.5 text-[13px] text-gray-500 font-mono">
                        <span>
                          {isPhoneVisible ? cust.phoneFull : cust.phoneMasked}
                        </span>
                        <button
                          onClick={() => toggleShowPhone(cust.id)}
                          className="p-0.5 text-gray-400 hover:text-gray-700 transition-colors"
                          title={isPhoneVisible ? '隐藏手机号' : '查看完整手机号'}
                        >
                          {isPhoneVisible ? (
                            <EyeOff className="w-3.5 h-3.5 text-gray-600" />
                          ) : (
                            <Eye className="w-3.5 h-3.5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 水平分割线 */}
                  <div className="border-t border-gray-100" />

                  {/* 核心字段键值对列表（按客户配置过滤隐藏字段） */}
                  <div className="space-y-3 text-[13.5px]">
                    {[
                      { key: 'age', label: '年龄', value: cust.age },
                      { key: 'income', label: '月收入', value: cust.income },
                      { key: 'wechatBound', label: '是否已绑定微信', value: cust.wechatBound },
                      { key: 'groupInsurance', label: '是否团险客户', value: cust.groupInsurance },
                      { key: 'preservationCustomer', label: '是否保全客户', value: cust.preservationCustomer },
                      { key: 'claimCount', label: '累计理赔次数', value: cust.claimCount },
                      { key: 'totalPolicies', label: '总保单数-投保人', value: cust.totalPolicies },
                      { key: 'annualMedicalPolicy', label: '是否有一年期医疗有效保单', value: cust.annualMedicalPolicy },
                    ]
                      .filter((f) => !(cust.hiddenFields || []).includes(f.key))
                      .map((f) => (
                        <div key={f.key} className="flex items-center justify-between">
                          <span className="text-[#8a92a6] font-normal">{f.label}</span>
                          <span className="text-[#2b3648] font-normal">{f.value}</span>
                        </div>
                      ))}
                  </div>

                  {/* 分割线与底部操作按钮区域 */}
                  {/* 需求2：感恩季活动第2个活动卡片进入客户清单详情页，删除客户卡片上的按钮 */}
                  {!isAct2 && (
                    <>
                      <div className="border-t border-gray-100" />

                      {/* 底部操作按钮区域：所有按钮样式均与“已转发抽奖”保持一致 */}
                      <div className="pt-0.5 flex items-center gap-3">
                        {(() => {
                          // 需求：客户经营第3个活动卡片（act-3）：
                          // 点击待转发问卷、已转发问卷、最后1个客户的问卷结果按钮，弹窗提示”活动已结束“
                          // 中间的客户（如陈美玲）的问卷结果按钮，点击正常查看其调研问卷详情
                          if (isAct3) {
                            const isLastCustomer = index === filteredCustomers.length - 1;
                            if (cust.id === 1) {
                              return (
                                <button
                                  onClick={handleActivityEndedClick}
                                  className="px-4 py-2 rounded-full text-xs font-medium bg-[#00c06d] text-white shadow-2xs hover:bg-[#00ab61] active:scale-95 transition-all"
                                >
                                  待转发问卷
                                </button>
                              );
                            }
                            if (cust.id === 2) {
                              return (
                                <button
                                  onClick={handleActivityEndedClick}
                                  className="px-4 py-2 rounded-full text-xs font-medium bg-[#00c06d] text-white shadow-2xs hover:bg-[#00ab61] active:scale-95 transition-all"
                                >
                                  已转发问卷
                                </button>
                              );
                            }
                            if (isLastCustomer) {
                              // 最后1个客户的问卷结果按钮：弹窗提示“活动已结束”
                              return (
                                <button
                                  onClick={handleActivityEndedClick}
                                  className="px-4 py-2 rounded-full text-xs font-medium bg-[#00c06d] text-white shadow-2xs hover:bg-[#00ab61] active:scale-95 transition-all"
                                >
                                  问卷结果
                                </button>
                              );
                            }
                            // 其它客户（如陈美玲）：正常查看调研问卷详情
                            return (
                              <button
                                onClick={() => {
                                  setSurveyCustomerName(cust.name);
                                  setIsSurveyModalOpen(true);
                                }}
                                className="px-4 py-2 rounded-full text-xs font-medium bg-[#00c06d] text-white shadow-2xs hover:bg-[#00ab61] active:scale-95 transition-all"
                              >
                                问卷结果
                              </button>
                            );
                          }

                          const effectiveButtonType = isEnded ? 'share' : cust.buttonType;
                          return (
                            <>
                              {/* 待转发 / share 状态：待转发问卷（直接唤起微信分享）、待转发抽奖 */}
                              {effectiveButtonType === 'share' && (
                                <>
                                  {isSurveyConfigured && (
                                    <button
                                      onClick={() => {
                                        setShareTargetInfo({ name: cust.name, type: '问卷' });
                                        setIsShareModalOpen(true);
                                      }}
                                      className="px-4 py-2 rounded-full text-xs font-medium bg-[#00c06d] text-white shadow-2xs hover:bg-[#00ab61] active:scale-95 transition-all"
                                    >
                                      待转发问卷
                                    </button>
                                  )}
                                  {isLotteryConfigured && (
                                    <button
                                      onClick={() => {
                                        if (isEnded) {
                                          showToast('活动已结束，抽奖通道已关闭');
                                          return;
                                        }
                                        // 弹窗样式与「已转发抽奖」保持一致：直接唤起「分享至」微信分享弹窗
                                        setShareTargetInfo({ name: cust.name, type: '抽奖' });
                                        setIsShareModalOpen(true);
                                      }}
                                      className="px-4 py-2 rounded-full text-xs font-medium bg-[#00c06d] text-white shadow-2xs hover:bg-[#00ab61] active:scale-95 transition-all"
                                    >
                                      待转发抽奖
                                    </button>
                                  )}
                                </>
                              )}

                              {/* 已转发状态：已转发问卷、已转发抽奖（均直接唤起微信分享弹窗） */}
                              {effectiveButtonType === 'already_shared' && (
                                <>
                                  {isSurveyConfigured && (
                                    <button
                                      onClick={() => {
                                        setShareTargetInfo({ name: cust.name, type: '问卷' });
                                        setIsShareModalOpen(true);
                                      }}
                                      className="px-4 py-2 rounded-full text-xs font-medium bg-[#00c06d] text-white shadow-2xs hover:bg-[#00ab61] active:scale-95 transition-all"
                                    >
                                      已转发问卷
                                    </button>
                                  )}
                                  {isLotteryConfigured && (
                                    <button
                                      onClick={() => {
                                        setShareTargetInfo({ name: cust.name, type: '抽奖' });
                                        setIsShareModalOpen(true);
                                      }}
                                      className="px-4 py-2 rounded-full text-xs font-medium bg-[#00c06d] text-white shadow-2xs hover:bg-[#00ab61] active:scale-95 transition-all"
                                    >
                                      已转发抽奖
                                    </button>
                                  )}
                                </>
                              )}

                              {/* 结果状态：问卷结果、抽奖结果 */}
                              {effectiveButtonType === 'results' && (
                                <>
                                  {isSurveyConfigured && (
                                    <button
                                      onClick={() => {
                                        setSurveyCustomerName(cust.name);
                                        setIsSurveyModalOpen(true);
                                      }}
                                      className="px-4 py-2 rounded-full text-xs font-medium bg-[#00c06d] text-white shadow-2xs hover:bg-[#00ab61] active:scale-95 transition-all"
                                    >
                                      问卷结果
                                    </button>
                                  )}
                                  {isLotteryConfigured && (
                                    <button
                                      onClick={() => {
                                        setLotteryCustomerName(cust.name);
                                        setIsLotteryModalOpen(true);
                                      }}
                                      className="px-4 py-2 rounded-full text-xs font-medium bg-[#00c06d] text-white shadow-2xs hover:bg-[#00ab61] active:scale-95 transition-all"
                                    >
                                      抽奖结果
                                    </button>
                                  )}
                                </>
                              )}

                              {/* 未中奖状态：问卷结果可查看、抽奖未中奖（置灰不可点击） */}
                              {effectiveButtonType === 'results_nowin' && (
                                <>
                                  {isSurveyConfigured && (
                                    <button
                                      onClick={() => {
                                        setSurveyCustomerName(cust.name);
                                        setIsSurveyModalOpen(true);
                                      }}
                                      className="px-4 py-2 rounded-full text-xs font-medium bg-[#00c06d] text-white shadow-2xs hover:bg-[#00ab61] active:scale-95 transition-all"
                                    >
                                      问卷结果
                                    </button>
                                  )}
                                  {isLotteryConfigured && (
                                    <button
                                      disabled
                                      className="px-4 py-2 rounded-full text-xs font-medium bg-gray-200 text-gray-400 cursor-not-allowed select-none"
                                    >
                                      未中奖
                                    </button>
                                  )}
                                </>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= 需求2：转发问卷/抽奖 底部弹窗 (无缝内嵌在手机容器内，避免宽屏穿透) ================= */}
      {isShareModalOpen && (
        <div className="absolute inset-0 z-50 flex items-end justify-center animate-in fade-in duration-200 overflow-hidden">
          {/* 半透明深色遮罩 */}
          <div
            onClick={() => setIsShareModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-[0.5px]"
          />

          {/* 底部滑出白色分享卡片 (对齐截图1样式) */}
          <div className="relative z-10 w-full bg-white rounded-t-2xl shadow-2xl p-5 pb-8 animate-in slide-in-from-bottom duration-200">
            {/* 顶栏：左侧加粗「分享至」，右侧关闭叉号 */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-50">
              <h4 className="text-[17px] font-bold text-gray-900 tracking-tight">
                分享至
              </h4>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title="关闭"
              >
                <X className="w-5 h-5 stroke-[2]" />
              </button>
            </div>

            {/* 内容区：居中纯绿色圆形微信图标 + 下方「微信好友」文字 (完全还原截图1) */}
            <div className="pt-6 pb-2 flex flex-col items-center">
              <button
                onClick={() => {
                  setIsShareModalOpen(false);
                  showToast(`已成功将${shareTargetInfo.type}分享给微信好友（${shareTargetInfo.name}）`);
                }}
                className="group flex flex-col items-center gap-2 focus:outline-none"
              >
                {/* 微信绿色大圆钮 */}
                <div className="w-14 h-14 rounded-full bg-[#07c160] flex items-center justify-center text-white shadow-sm group-hover:bg-[#06ad56] active:scale-95 transition-all">
                  <MessageCircle className="w-7 h-7 text-white stroke-[2.2]" fill="none" />
                </div>
                {/* 微信好友文字 */}
                <span className="text-xs text-gray-700 font-normal">微信好友</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 需求3：中奖结果 弹窗 (无缝内嵌在手机容器内，避免宽屏穿透) ================= */}
      {isLotteryModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200 overflow-hidden">
          {/* 半透明深色遮罩 */}
          <div
            onClick={() => setIsLotteryModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-[0.5px]"
          />

          {/* 居中模态卡片 (对齐截图2样式) */}
          <div className="relative z-10 w-[86%] max-w-[320px] bg-white rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* 顶部橙红暖色渐变区域 + 白字「中奖结果」 */}
            <div className="bg-gradient-to-r from-[#ff5a2c] via-[#ff6835] to-[#ff7e42] py-3.5 px-4 text-center">
              <h4 className="text-[19px] font-bold text-white tracking-wide">
                中奖结果
              </h4>
            </div>

            {/* 卡片白底主体 */}
            <div className="px-6 pt-7 pb-6 flex flex-col items-center text-center space-y-4">
              {/* 客户姓名：要求“中奖客户姓名根据客户卡片姓名显示” */}
              <div className="text-[15px] text-gray-700 font-medium tracking-tight">
                客户：{lotteryCustomerName}
              </div>

              {/* 奖项大字：加粗鲜红「一等奖 (戴森吹风机)」 */}
              <div className="text-[20px] font-black text-[#ff4b4b] tracking-tight py-1">
                一等奖 (戴森吹风机)
              </div>

              {/* 底部绿色胶囊长按钮「关闭」 */}
              <div className="w-full pt-3">
                <button
                  onClick={() => setIsLotteryModalOpen(false)}
                  className="w-full py-2.5 bg-[#00b578] hover:bg-[#00a36c] active:scale-98 text-white font-semibold text-base rounded-full shadow-xs transition-all flex items-center justify-center"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 需求3：活动已结束 居中提示弹窗 */}
      {isEndedAlertOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200 overflow-hidden">
          <div
            onClick={() => setIsEndedAlertOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-[0.5px]"
          />
          <div className="relative z-10 w-[80%] max-w-[290px] bg-white rounded-2xl overflow-hidden shadow-2xl p-5 text-center space-y-3.5 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
              <Info className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[16px] font-bold text-gray-900">提示</h4>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">活动已结束</p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setIsEndedAlertOpen(false)}
                className="w-full py-2.5 bg-[#00c06d] hover:bg-[#00ab61] active:scale-98 text-white font-semibold text-sm rounded-full shadow-xs transition-all"
              >
                知道了
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-gray-900/90 text-white text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-150">
          {toastMessage.includes('已结束') ? (
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          ) : (
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          )}
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
