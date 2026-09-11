import { ActivityItem } from '../types';

// ================= 感恩季专题活动 (首页展示) =================
export const GANENJI_ACTIVITIES: ActivityItem[] = [
  // 客户经营 (3项)
  {
    id: 'act-1',
    title: '2026感恩季·尊享会客户感恩回馈专场',
    category: '客户经营',
    tag: '客户经营',
    status: '开展中',
    timeRange: '2026-10-01 09:00 - 2026-12-31 17:00',
    bannerUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80',
    briefSummary: '回馈尊享会高价值客户，开启专属感恩礼遇之约。',
    aim: '回馈尊享会客户',
    description: '回馈尊享会高价值客户，通过满意度调研问卷了解服务体验，并为完成问卷的客户开启感恩抽奖礼遇，持续深化客户经营与品牌信赖。',
    steps: [
      {
        step: 1,
        title: '满意度调研',
        desc: '向符合条件的尊享会客户发送线上满意度问卷'
      },
      {
        step: 2,
        title: '客户问卷反馈',
        desc: '收集客户服务体验反馈，及时跟进与优化服务'
      },
      {
        step: 3,
        title: '感恩抽奖礼遇',
        desc: '为完成问卷的客户发放专属感恩抽奖，回馈心意'
      }
    ],
    detailImageUrl: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80',
    targetAudience: '尊享会白金及钻石级高价值签约客户',
    participantsCount: 1420,
    hasSurvey: true,
    hasLottery: true,
    stats: {
      totalEligible: 12,
      surveySent: 8,
      surveyResponded: 4,
      lotterySent: 4,
      lotteryCompleted: 2,
    },
  },
  {
    id: 'act-2',
    title: '2026感恩季·线上服务满意度调研',
    category: '客户经营',
    tag: '客户经营',
    status: '待开始',
    timeRange: '2026-10-01 09:00 - 17:00',
    bannerUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    briefSummary: '倾听客户心声，持续优化全流程线上服务体验。',
    aim: '回馈尊享会客户',
    description: '回馈尊享会高价值客户，通过满意度调研问卷了解服务体验，并为完成问卷的客户开启感恩抽奖礼遇，持续深化客户经营与品牌信赖。',
    steps: [
      {
        step: 1,
        title: '满意度调研',
        desc: '向符合条件的尊享会客户发送线上满意度问卷'
      },
      {
        step: 2,
        title: '客户问卷反馈',
        desc: '收集客户服务体验反馈，及时跟进与优化服务'
      },
      {
        step: 3,
        title: '感恩抽奖礼遇',
        desc: '为完成问卷的客户发放专属感恩抽奖，回馈心意'
      }
    ],
    detailImageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    targetAudience: '近1年内办理过保全或理赔业务的在线客户',
    participantsCount: 5620,
    hasSurvey: true,
    hasLottery: false,
    stats: {
      totalEligible: 12,
      surveySent: 0,
      surveyResponded: 0,
      lotterySent: 0,
      lotteryCompleted: 0,
    },
  },
  {
    id: 'act-3',
    title: '2026感恩季·客户生日云端关怀',
    category: '客户经营',
    tag: '客户经营',
    status: '已结束',
    timeRange: '2026-08-26 09:30 - 16:20',
    bannerUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1000&q=80',
    briefSummary: '岁岁相伴，暖心送达生日专属定制礼遇。',
    aim: '回馈尊享会客户',
    description: '回馈尊享会高价值客户，通过满意度调研问卷了解服务体验，并为完成问卷的客户开启感恩抽奖礼遇，持续深化客户经营与品牌信赖。',
    steps: [
      {
        step: 1,
        title: '满意度调研',
        desc: '向符合条件的尊享会客户发送线上满意度问卷'
      },
      {
        step: 2,
        title: '客户问卷反馈',
        desc: '收集客户服务体验反馈，及时跟进与优化服务'
      },
      {
        step: 3,
        title: '感恩抽奖礼遇',
        desc: '为完成问卷的客户发放专属感恩抽奖，回馈心意'
      }
    ],
    detailImageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    targetAudience: '在保有约会员客户',
    participantsCount: 2310,
    hasSurvey: true,
    hasLottery: false,
    stats: {
      totalEligible: 12,
      surveySent: 8,
      surveyResponded: 4,
      lotterySent: 0,
      lotteryCompleted: 0,
    },
  },

  // 获客活动 (3项 - 严格参考需求与设计规范)
  {
    id: 'act-acq-1',
    title: '2026感恩季·百万医疗线上转保推荐',
    category: '获客活动',
    tag: '客户活动',
    status: '开展中',
    timeRange: '2026-10-01 09:00 - 2026-10-31 18:00',
    bannerUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80',
    briefSummary: '百万医疗升级保障，便捷线上推荐转保。',
    aim: '百万医疗转保推荐',
    description: '本次活动旨在邀请客户共同参与户外健行，感受自然之美，增进彼此交流。现场将安排专业向导带领游览，并提供精美茶歇与互动礼品。',
    steps: [
      {
        step: 1,
        title: '需求测算',
        desc: '客户在线填写保障需求与现有保单检视'
      },
      {
        step: 2,
        title: '方案推荐',
        desc: '根据客户年龄与需求智能生成百万医疗转保方案'
      },
      {
        step: 3,
        title: '线上投保',
        desc: '协助客户快速完成线上核保与电子保单签署'
      }
    ],
    detailImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    targetAudience: '持有基础医疗或健康险的到期及待升级客户',
    participantsCount: 3820,
    hasSurvey: true,
    hasLottery: true,
    stats: {
      totalEligible: 12,
      surveySent: 7,
      surveyResponded: 3,
      lotterySent: 3,
      lotteryCompleted: 1,
    },
  },
  {
    id: 'act-acq-2',
    title: '2026感恩季·云端健康科普直播',
    category: '获客活动',
    tag: '客户活动',
    status: '待开始',
    timeRange: '2026-11-15 09:00 - 2026-12-31 18:00',
    bannerUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80',
    briefSummary: '名医专家云端开讲，全方位健康守护科普。',
    aim: '健康科普与客群拓展',
    description: '特邀三甲名医与健康管理专家在线直播，涵盖常见病预防、家庭健康急救及健康生活习惯科普，邀请新老客户在线互动。',
    steps: [
      {
        step: 1,
        title: '直播预约',
        desc: '向客户发送直播邀请函，支持一键预约与日程提醒'
      },
      {
        step: 2,
        title: '专家直播',
        desc: '观看名医大咖线上互动答疑与健康科普'
      },
      {
        step: 3,
        title: '专属福袋',
        desc: '直播间参与互动抽奖，赢取感恩季健康守护礼'
      }
    ],
    detailImageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    targetAudience: '家庭健康关注者及线上互动客群',
    participantsCount: 4560,
    hasSurvey: true,
    hasLottery: true,
    stats: {
      totalEligible: 12,
      surveySent: 0,
      surveyResponded: 0,
      lotterySent: 0,
      lotteryCompleted: 0,
    },
  },
  {
    id: 'act-acq-3',
    title: '2026感恩季·老客户线上转介绍有礼',
    category: '获客活动',
    tag: '客户活动',
    status: '已结束',
    timeRange: '2026-08-01 09:00 - 2026-08-31 18:00',
    bannerUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1000&q=80',
    briefSummary: '老友相荐共享好礼，温情传递保障温度。',
    aim: '转介绍裂变获客',
    description: '鼓励现有老客户向亲友推荐优质保险保障与健康服务，成功邀请双方均可获得感恩季专属定制好礼。',
    steps: [
      {
        step: 1,
        title: '分享专属海报',
        desc: '老客户生成带专属推荐码的感恩季活动海报并分享'
      },
      {
        step: 2,
        title: '亲友在线体验',
        desc: '受邀亲友完成服务体验或需求预约咨询'
      },
      {
        step: 3,
        title: '双向感恩礼',
        desc: '双方解锁感恩季定制好礼与专属增值权益'
      }
    ],
    detailImageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    targetAudience: '在保3年以上的忠诚老客户',
    participantsCount: 1980,
    hasSurvey: false,
    hasLottery: true,
    stats: {
      totalEligible: 12,
      surveySent: 8,
      surveyResponded: 4,
      lotterySent: 4,
      lotteryCompleted: 2,
    },
  },
];

// ================= 更多活动（常规活动页面展示） =================
export const MORE_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-101',
    title: '线上保险知识公开课',
    category: '客户经营',
    tag: '客户经营',
    status: '开展中',
    timeRange: '2026-10-01 09:00 - 2026-10-31 18:00',
    bannerUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=80',
    briefSummary: '客户金融保险知识科普，提升保单与保障认知。',
    aim: '回馈尊享会客户',
    description: '回馈尊享会高价值客户，通过满意度调研问卷了解服务体验，并为完成问卷的客户开启感恩抽奖礼遇，持续深化客户经营与品牌信赖。',
    steps: [
      { step: 1, title: '满意度调研', desc: '向符合条件的尊享会客户发送线上满意度问卷' },
      { step: 2, title: '客户问卷反馈', desc: '收集客户服务体验反馈，及时跟进与优化服务' },
      { step: 3, title: '感恩抽奖礼遇', desc: '为完成问卷的客户发放专属感恩抽奖，回馈心意' },
    ],
    detailImageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
    targetAudience: '尊享会客户及全体线上用户',
    participantsCount: 3280,
    hasSurvey: true,
    hasLottery: false,
    stats: {
      totalEligible: 12,
      surveySent: 8,
      surveyResponded: 4,
      lotterySent: 0,
      lotteryCompleted: 0,
    },
  },
  {
    id: 'act-106',
    title: '代理人年度荣誉颁奖',
    category: '客户经营',
    tag: '客户经营',
    status: '待开始',
    timeRange: '2026-11-15 09:00 - 17:00',
    bannerUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80',
    briefSummary: '年度优秀代理人表彰盛典，激励团队成长。',
    aim: '回馈尊享会客户',
    description: '回馈尊享会高价值客户，通过满意度调研问卷了解服务体验，并为完成问卷的客户开启感恩抽奖礼遇，持续深化客户经营与品牌信赖。',
    steps: [
      { step: 1, title: '满意度调研', desc: '向符合条件的尊享会客户发送线上满意度问卷' },
      { step: 2, title: '客户问卷反馈', desc: '收集客户服务体验反馈，及时跟进与优化服务' },
      { step: 3, title: '感恩抽奖礼遇', desc: '为完成问卷的客户发放专属感恩抽奖，回馈心意' },
    ],
    detailImageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
    targetAudience: '全体代理人与邀约准合伙人',
    participantsCount: 1850,
    hasSurvey: false,
    hasLottery: true,
    stats: {
      totalEligible: 12,
      surveySent: 0,
      surveyResponded: 0,
      lotterySent: 6,
      lotteryCompleted: 3,
    },
  },
  {
    id: 'act-107',
    title: '社区公益保险讲座',
    category: '客户经营',
    tag: '客户经营',
    status: '已结束',
    timeRange: '2026-09-01 09:00 - 2026-09-30 18:00',
    bannerUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1000&q=80',
    briefSummary: '走进社区开展公益科普，树立品牌形象。',
    aim: '回馈尊享会客户',
    description: '回馈尊享会高价值客户，通过满意度调研问卷了解服务体验，并为完成问卷的客户开启感恩抽奖礼遇，持续深化客户经营与品牌信赖。',
    steps: [
      { step: 1, title: '满意度调研', desc: '向符合条件的尊享会客户发送线上满意度问卷' },
      { step: 2, title: '客户问卷反馈', desc: '收集客户服务体验反馈，及时跟进与优化服务' },
      { step: 3, title: '感恩抽奖礼遇', desc: '为完成问卷的客户发放专属感恩抽奖，回馈心意' },
    ],
    detailImageUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=800&q=80',
    targetAudience: '社区居民及到场咨询客户',
    participantsCount: 2460,
    hasSurvey: false,
    hasLottery: false,
    stats: {
      totalEligible: 12,
      surveySent: 0,
      surveyResponded: 0,
      lotterySent: 0,
      lotteryCompleted: 0,
    },
  },
];

// 保持向前兼容导出
export const ACTIVITIES_DATA: ActivityItem[] = [...GANENJI_ACTIVITIES, ...MORE_ACTIVITIES];
