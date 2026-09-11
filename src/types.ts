export type ActivityStatus = '开展中' | '待开始' | '已结束';

export type ActivityCategory = '客户经营' | '获客活动' | '招募活动';

export interface SchemeStep {
  step: number;
  title: string;
  desc: string;
}

export interface ActivityStats {
  totalEligible?: number;
  surveySent?: number;
  surveyResponded?: number;
  lotterySent?: number;
  lotteryCompleted?: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  category: ActivityCategory;
  status: ActivityStatus;
  timeRange: string;
  tag?: string; // 主题标签 (e.g. '客户经营' / '获客活动')
  bannerUrl?: string; // 海报banner
  briefSummary?: string; // 简短导语
  aim?: string; // 主旨
  description?: string; // 方案/活动简介主体文本
  steps?: SchemeStep[]; // 步骤流程
  detailImageUrl?: string; // 详情配图
  targetAudience?: string;
  participantsCount?: number;
  hasSurvey?: boolean; // 活动管理平台是否配置问卷
  hasLottery?: boolean; // 活动管理平台是否配置抽奖
  stats?: ActivityStats;
}
