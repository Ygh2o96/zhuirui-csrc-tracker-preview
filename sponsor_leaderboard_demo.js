// Sponsor leaderboard view module. Wrapped in an IIFE because it shares the
// page (and global scope) with app.js inside the integrated shell.
(() => {

const DATA_URL = "data/sponsor_leaderboard_demo.json";
const BUNDLED_DATA_URL = "data/sponsor_leaderboard_demo_data.js?v=3993252927dd1552";

// Integrated view root inside the main app shell (index.html). All sponsor
// DOM ids carry an `sl` prefix to avoid colliding with tracker ids.
const viewRoot = document.getElementById("sponsorLeaderboardView");
const pkRoot = document.getElementById("sponsorPkView");

const state = {
  data: null,
  search: "",
  preset: "all",
  metric: "projectCount",
  sortKey: "projectCount",
  sortHeaderKey: "projectCount",
  sortDir: null,
  credit: "creditAllFull",
  stage: "all",
  type: "all",
  nature: "all",
  sector: "all",
  // Mixed-stage views need a date that follows the project's current stage:
  // public A1 for applications, IPO listing date or validated RTO completion.
  dateField: "stageDate",
  dateFrom: "",
  dateTo: "",
  dateQuick: "all",
  activeRows: [],
  activeFacts: [],
};

const els = {};
const pkEls = {};
let searchRenderTimer = null;

const pkState = {
  sponsorA: "",
  sponsorB: "",
  credit: "creditAllFull",
};

const metricLabels = {
  projectCount: "项目数",
  activeCount: "公开申请中",
  listedCount: "已上市",
  ahCount: "A+H",
  listingMarketCapHkdBnSum: "上市市值",
  aShareMarketCapRmbBnSum: "A股市值",
  lifecycleMedianDays: "A1→上市平均时间",
  noticeCycleMedianDays: "A1→通知中位数",
  receivedCycleMedianDays: "A1→接收中位数",
  sponsorPrincipalCount: "SP人数",
  type6TotalCount: "六号牌总人数",
  projectsPerSponsorPrincipal: "每名SP负责项目",
  activeProjectsPerSponsorPrincipal: "每名SP负责公开申请中项目",
  activeProjectsPerType6Rep: "公开申请中项目/Rep（内部）",
  type6RepPerActiveProject: "每个公开申请中项目配置Rep",
  type6RepPerProject: "每个项目配置Rep",
  projectsPerType6Rep: "项目/Rep（内部）",
  type6TotalPerProject: "项目六号牌配置",
  projectsPerType6Total: "六号牌项目负荷",
  listingMarketCapPerType6TotalHkdBn: "六号牌人均上市市值",
  listingMarketCapPerSponsorPrincipalHkdBn: "SP人均上市市值",
};

const creditLabels = {
  creditAllFull: "具名全部计入",
  creditEqual: "按保荐人数量平分",
  creditFirstNamed: "只计牵头/首名",
};

const PUBLIC_ACTIVE_CAVEAT =
  "申请中沿用追踪表分类，包括港交所已失效或撤回、仍按备案进展跟踪的项目。人数与项目数分别取自各自注明日期的公开资料。";

const BENCHMARK_PREFIX = "__benchmark_";
const BENCHMARK_GROUPS = [
  {
    id: `${BENCHMARK_PREFIX}all`,
    zh: "全行业中位",
    en: "Market median",
    note: "全部可比保荐人",
    filter: () => true,
  },
  {
    id: `${BENCHMARK_PREFIX}cn`,
    zh: "中资中位",
    en: "Chinese sponsors median",
    note: "中资保荐人",
    filter: (row) => row.sponsorNature === "中资",
  },
  {
    id: `${BENCHMARK_PREFIX}foreign`,
    zh: "外资中位",
    en: "International sponsors median",
    note: "外资保荐人",
    filter: (row) => row.sponsorNature === "外资",
  },
  {
    id: `${BENCHMARK_PREFIX}hk`,
    zh: "港资中位",
    en: "Hong Kong sponsors median",
    note: "港资保荐人",
    filter: (row) => row.sponsorNature === "港资",
  },
];

const BENCHMARK_MEDIAN_FIELDS = [
  "projectCount",
  "activeCount",
  "hkexActiveCount",
  "hkexInactiveCount",
  "hkexOtherStatusCount",
  "listedCount",
  "noticeCount",
  "ahCount",
  "hShareCount",
  "redChipCount",
  "deSpacCount",
  "hdrCount",
  "otherIssuerTypeCount",
  "listingMarketCapHkdBnSum",
  "listingMarketCapHkdBnMedian",
  "aShareMarketCapRmbBnSum",
  "aShareMarketCapRmbBnMedian",
  "applyingAhMarketCapRmbBnSum",
  "applyingAhMarketCapRmbBnMedian",
  "lifecycleMedianDays",
  "listedLifecycleAverageDays",
  "listedLifecycleMedianDays",
  "noticeCycleMedianDays",
  "receivedCycleMedianDays",
  "applyingElapsedAverageDays",
  "applyingElapsedMedianDays",
  "type6ROCount",
  "type6RepCount",
  "type6TotalCount",
  "sponsorPrincipalCount",
  "projectsPerType6Rep",
  "type6RepPerProject",
  "projectsPerType6RO",
  "type6ROPerProject",
  "projectsPerSponsorPrincipal",
  "sponsorPrincipalPerProject",
  "projectsPerType6Total",
  "type6TotalPerProject",
  "type6TotalPerActiveProject",
  "activeProjectsPerType6Total",
  "sponsorPrincipalPerActiveProject",
  "activeProjectsPerSponsorPrincipal",
  "type6RepPerActiveProject",
  "activeProjectsPerType6Rep",
  "listingMarketCapPerType6TotalHkdBn",
  "listingMarketCapPerSponsorPrincipalHkdBn",
];

function publicMethodologyText(value) {
  if (!value) return "";
  return String(value)
    .replace(/capacity proxy/gi, "capacity indicator")
    .replace(/\bproxy\b/gi, "indicator")
    .replace(/容量代理/g, "容量旁证")
    .replace(/间接测量/g, "旁证");
}

const SECTOR_OPTIONS = [
  { value: "all", label: "全部赛道" },
  {
    value: "tmt",
    label: "TMT/科技",
    keywords: ["信息传输", "信息技术", "软件", "互联网", "人工智能", "ai", "大模型", "数据", "云", "saas", "半导体", "半导体材料", "碳化硅", "集成电路", "电子制造", "芯片", "通信", "光模块", "网络设备", "计算机", "算法", "虚拟资产", "移动内容", "移动广告", "数字教育", "智能硬件", "激光雷达", "传感器", "游戏", "传媒", "文娱"],
  },
  {
    value: "healthcare",
    label: "医疗健康",
    keywords: ["医药", "医学", "药物", "药品", "制药", "制剂", "生物", "医疗", "器械", "卫生", "临床", "手术", "疫苗", "抗体", "细胞", "基因", "诊断", "检验", "影像", "创新药", "adc", "cdmo", "crdmo", "mirna", "肿瘤", "医院", "诊所", "护理", "健康", "慢病", "数字疗法"],
  },
  {
    value: "new_energy_auto",
    label: "新能源/汽车",
    keywords: ["新能源", "汽车", "动力电池", "储能", "光伏", "智能驾驶", "自动驾驶", "座舱", "车载", "整车", "两轮车", "电动自行车", "锂", "氢能", "电池"],
  },
  {
    value: "consumer",
    label: "消费/零售",
    keywords: ["消费", "食品", "饮料", "日化", "批发", "零售", "电商", "餐饮", "住宿", "旅游", "文旅", "景区", "酒店", "休闲", "农、林、牧、渔", "农林牧渔", "养殖", "茶饮", "现制饮品", "白酒", "乳业", "奶", "珠宝", "母婴", "营养品", "卫生用品", "调味品", "家电", "超市", "零食", "香水", "护肤", "美妆"],
  },
  {
    value: "industrial",
    label: "工业/先进制造",
    keywords: ["高端装备", "机器人", "智能制造", "制造业", "工业", "机械", "工程机械", "材料", "化工", "仪器", "设备", "装备", "自动化", "科学研究"],
  },
  {
    value: "finance_property",
    label: "金融/地产",
    keywords: ["金融", "保险", "证券", "支付", "私募股权", "放贷", "信贷", "房地产业", "房地产", "物业"],
  },
  {
    value: "logistics_infra",
    label: "物流/交通/基建",
    keywords: ["物流", "运输", "供应链", "交通", "仓储", "建筑", "建筑工程", "营造工程", "机电工程", "安装工程", "消防工程", "基建"],
  },
  {
    value: "energy_resources_env",
    label: "能源/资源/环保",
    keywords: ["采矿", "开采", "矿业", "矿产", "资源", "电力", "燃气", "公用能源", "环保", "水利", "环境", "公共设施"],
  },
  { value: "other", label: "其他/综合", keywords: [] },
];

const SECTOR_BY_VALUE = new Map(SECTOR_OPTIONS.map((option) => [option.value, option]));

const SECTOR_MATCH_PRIORITY = [
  "healthcare",
  "new_energy_auto",
  "finance_property",
  "tmt",
  "consumer",
  "logistics_infra",
  "energy_resources_env",
  "industrial",
];

const SECTOR_STRONG_SIGNALS = [
  { value: "healthcare", keywords: ["创新药", "医药", "医学", "药品", "制剂", "医疗", "医院", "手术", "医疗机器人", "慢病", "数字疗法", "疫苗", "抗体", "基因", "诊断", "检验", "影像", "肿瘤"] },
  { value: "new_energy_auto", keywords: ["新能源", "汽车", "智能驾驶", "自动驾驶", "车载", "动力电池", "储能", "光伏", "氢能", "电动两轮车", "电动自行车"] },
  { value: "finance_property", keywords: ["金融", "保险", "证券", "支付", "私募股权", "放贷", "信贷"] },
  { value: "tmt", keywords: ["半导体", "半导体材料", "碳化硅", "集成电路", "芯片", "人工智能", "大模型", "通信", "光模块", "网络设备", "计算机视觉", "算法", "软件", "saas", "虚拟资产", "移动广告", "移动内容", "数字教育"] },
  { value: "industrial", keywords: ["高端装备", "机器人", "智能制造", "工程机械", "机械", "自动化", "仪器", "装备"] },
  { value: "consumer", keywords: ["食品", "饮料", "白酒", "乳业", "茶饮", "餐饮", "旅游", "文旅", "景区", "酒店", "超市", "零食", "香水", "护肤", "美妆", "珠宝", "母婴", "养殖"] },
  { value: "energy_resources_env", keywords: ["采矿", "开采", "矿业", "矿产", "电力", "燃气", "环保"] },
];

const SECTOR_METRIC_KEYS = new Set([
  "projectCount",
  "activeCount",
  "listedCount",
  "ahCount",
  "listingMarketCapHkdBnSum",
  "aShareMarketCapRmbBnSum",
  "applyingAhMarketCapRmbBnSum",
  "lifecycleMedianDays",
  "listedLifecycleMedianDays",
  "noticeCycleMedianDays",
  "receivedCycleMedianDays",
]);

const sortLabels = {
  ...metricLabels,
  sponsorName: "保荐人",
  sponsorNature: "性质",
  topIndustry: "行业",
  listedLifecycleAverageDays: "A1到上市流程平均",
  applyingElapsedAverageDays: "项目生命周期阶段",
};

function $(id) {
  return document.getElementById(`sl${id.charAt(0).toUpperCase()}${id.slice(1)}`);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalize(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function compactNumber(value, digits = 0) {
  if (!isNumber(value)) return "待披露";
  const rounded = Number(value.toFixed(digits));
  return new Intl.NumberFormat("zh-Hans", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(rounded);
}

function compactCredit(value) {
  if (!isNumber(value)) return "0";
  if (Math.abs(value - Math.round(value)) < 0.01) {
    return compactNumber(Math.round(value), 0);
  }
  return compactNumber(value, 1);
}

function formatCap(value, currency) {
  if (!isNumber(value) || value <= 0) return "—";
  return `${currency}${compactNumber(value, value >= 100 ? 0 : 1)}bn`;
}

function formatCapPerPerson(value, currency = "HK$") {
  if (!isNumber(value) || value <= 0) return "—";
  return `${currency}${compactNumber(value, value >= 10 ? 1 : 2)}bn/人`;
}

function formatDays(value, samples) {
  if (!isNumber(value)) return "无可比样本";
  return `${compactNumber(Math.ceil(value), 0)}天${isNumber(samples) ? `（样本 ${samples}）` : ""}`;
}

function formatRatio(value, digits = 2) {
  if (!isNumber(value)) return "待披露";
  return compactNumber(value, digits);
}

function capacityDates(summary, sources, timestamp = false) {
  const items = [...(summary ? [summary] : []), ...(Array.isArray(sources) ? sources : [])];
  const dates = new Set();
  for (const value of items) {
    if (typeof value !== "string") continue;
    const day = timestamp && /^\d{4}-\d\d-\d\dT/.test(value) && Number.isFinite(Date.parse(value)) ? value.slice(0, 10) : value;
    if (!/^\d{4}-\d\d-\d\d$/.test(day)) continue;
    const ms = Date.parse(day);
    if (Number.isFinite(ms) && new Date(ms).toISOString().slice(0, 10) === day) dates.add(day);
  }
  const known = [...dates].sort();
  const incomplete = items.some(value => !value || !known.includes(timestamp && typeof value === "string" ? value.slice(0, 10) : value));
  if (!known.length) return "日期未披露";
  return (known.length > 1 ? "多日期 " : "") + known.join(" / ") + (incomplete ? "（部分日期未披露）" : "");
}

function capacityDateLabel(row, sp, includeCapture = false) {
  if (row.firmScope === "benchmark") return "组内中位 · 日期不汇总";
  if (sp && row.currentSponsorRegister?.registerStatus === "not_listed") return "名册 " + row.currentSponsorRegister.asOf;
  if (!isNumber(sp ? row.sponsorPrincipalCount : row.type6TotalCount)) return "无对应记录";
  const snapshots = Array.isArray(row.sponsorPrincipalInstitutionSources) ? row.sponsorPrincipalInstitutionSources : [];
  const spDates = Array.isArray(row.sponsorPrincipalSourceDates) ? row.sponsorPrincipalSourceDates : [];
  const source = sp ? capacityDates(row.sponsorPrincipalAsOfDate, [...spDates, ...snapshots.map(s => s?.asOfDate)])
    : capacityDates(row.type6AsOfDate, row.type6SourceDates);
  const captured = includeCapture && sp && snapshots.some(s => s?.capturedAt)
    ? " · 采集 " + capacityDates(null, snapshots.map(s => s?.capturedAt), true) : "";
  return "来源 " + source + captured;
}

function capacityDisplay(row) {
  const sp = isNumber(row.sponsorPrincipalCount), type6 = isNumber(row.type6TotalCount);
  if (!sp && !type6) return { main: "待接入", sub: "暂无匹配 SP / 六号牌数据" };
  const benchmark = row.firmScope === "benchmark";
  const count = v => compactNumber(v, benchmark ? 1 : 0);
  const main = row.currentSponsorRegister?.registerStatus === "not_listed" ? "未列现行保荐人名册" : sp ? (benchmark ? "中位 " : "") + count(row.sponsorPrincipalCount) + " SP" : "名册无记录";
  const role = (label, n) => isNumber(n) ? label + " " + count(n) : label + "待补";
  const roles = type6 ? [role("六号牌", row.type6TotalCount), role("RO", row.type6ROCount), role("Rep", row.type6RepCount)].join(" / ") : "六号牌待补";
  const dates = benchmark ? "组内中位 · 日期不汇总" : "SP" + capacityDateLabel(row, true) + "；六号牌" + capacityDateLabel(row, false);
  return { main, sub: roles + " · " + dates };
}
function formatDate(value) {
  return value || "待披露";
}

function dateDiffDays(start, end) {
  if (!start || !end) return null;
  const startTime = Date.parse(`${start}T00:00:00Z`);
  const endTime = Date.parse(`${end}T00:00:00Z`);
  if (!Number.isFinite(startTime) || !Number.isFinite(endTime) || endTime < startTime) return null;
  return Math.round((endTime - startTime) / 86400000);
}

function addDays(dateString, days) {
  const base = dateString ? new Date(dateString) : new Date();
  if (Number.isNaN(base.getTime())) return "";
  base.setUTCDate(base.getUTCDate() + days);
  return base.toISOString().slice(0, 10);
}

function metricSortAsc(metric) {
  return new Set([
    "sponsorName",
    "sponsorNature",
    "topIndustry",
    "lifecycleMedianDays",
    "listedLifecycleAverageDays",
    "noticeCycleMedianDays",
    "receivedCycleMedianDays",
    "sponsorPrincipalPerProject",
    "sponsorPrincipalPerActiveProject",
    "type6RepPerActiveProject",
    "type6RepPerProject",
    "type6TotalPerProject",
  ]).has(metric);
}

function lifecycleSortKey() {
  return state.stage === "applying" ? "applyingElapsedAverageDays" : "lifecycleMedianDays";
}

function effectiveSortDir(metric = state.sortKey) {
  return state.sortDir || (metricSortAsc(metric) ? "asc" : "desc");
}

function resolveHeaderSortKey(rawKey) {
  if (rawKey === "__lifecycle") return lifecycleSortKey();
  if (rawKey === "__metric") return state.metric;
  if (rawKey === "__marketCap") {
    const mode = marketCapMode();
    return mode === "listed" || mode === "mixed" ? "listingMarketCapHkdBnSum" : "aShareMarketCapRmbBnSum";
  }
  return rawKey;
}

function metricValue(row, metric = state.metric) {
  if (metric === "sponsorName") return row.displayNameZh || row.displayNameEn || "";
  if (metric === "sponsorNature") return row.sponsorNature || "";
  if (metric === "topIndustry") return row.topIndustries?.[0] || "";
  if (metric === "lifecycleMedianDays" || metric === "listedLifecycleAverageDays") return row.listedLifecycleAverageDays;
  if (metric === "applyingElapsedAverageDays") return row.applyingElapsedAverageDays;
  if (metric === "noticeCycleMedianDays") return row.noticeCycleMedianDays;
  if (metric === "receivedCycleMedianDays") return row.receivedCycleMedianDays;
  return row[metric];
}

function missingSortValue(row, metric, value) {
  if (metric === "sponsorName" || metric === "sponsorNature" || metric === "topIndustry") {
    return !String(value || "").trim();
  }
  if (metric === "lifecycleMedianDays" || metric === "listedLifecycleAverageDays") return !isNumber(value) || !row.listedLifecycleN;
  if (metric === "applyingElapsedAverageDays") return !isNumber(value) || !row.applyingElapsedN;
  if (metric === "noticeCycleMedianDays") return !isNumber(value) || !row.noticeCycleN;
  if (metric === "receivedCycleMedianDays") return !isNumber(value) || !row.receivedCycleN;
  return !isNumber(value);
}

function factCredit(fact) {
  const value = fact[state.credit];
  return isNumber(value) ? value : 1;
}

function creditedFacts(facts) {
  // Credit controls membership before any counts, samples or drilldowns.
  return facts.filter((fact) => factCredit(fact) > 0);
}

function marketCapObservation(fact, kind) {
  const listing = kind === "listing";
  const provenance = fact[`${kind}MarketCapProvenance`] || {};
  const value = fact[listing ? "listingMarketCapHkdBn" : "aShareMarketCapAtA1RmbBn"];
  const estimate = listing && isNumber(fact.listingMarketCapEstimateHkdBn) && fact.listingMarketCapEstimateHkdBn > 0
    ? fact.listingMarketCapEstimateHkdBn : value;
  // The exporter owns share-class, same-day pricing and FX validation.
  const eligible = (listing
    ? fact.listingMarketCapSampleEligible === true && (provenance.status === "verified" || (provenance.status === "estimate" && provenance.method === "dated_filings_and_first_trading_close_estimate")) && fact.hkexStage === "listed"
    : fact.aShareMarketCapRankEligible === true && ["verified", "estimate"].includes(provenance.status))
    && isNumber(value) && value > 0;
  const estimateValue = isNumber(estimate) && estimate > 0 ? estimate : null;
  const status = eligible ? provenance.status : estimateValue === null ? "missing"
    : ["unsupported", "verified"].includes(provenance.status) ? "unsupported" : "estimate";
  return {value: eligible ? value : null, estimateValue, status, provenance};
}

function aggregateMarketCaps(facts, kind) {
  const coverage = {verified: 0, estimate: 0, unsupported: 0, missing: 0, total: facts.length};
  const values = [];
  let sum = 0;
  for (const fact of facts) {
    const observation = marketCapObservation(fact, kind);
    coverage[observation.status] += 1;
    if (observation.value !== null) {
      values.push(observation.value);
      sum += observation.value * factCredit(fact);
    }
  }
  const complete = values.length > 0 && values.length === facts.length;
  return {sum: complete ? sum : null, median: median(values), n: values.length, coverage};
}

function formatListingCap(row, value = row.listingMarketCapHkdBnSum, perPerson = false) {
  return perPerson ? formatCapPerPerson(value) : formatCap(value, "HK$");
}

function formatAShareCap(row, prefix = "aShareMarketCap") {
  return formatCap(row[`${prefix}RmbBnSum`], "¥");
}

function median(values) {
  const clean = values.filter(isNumber).sort((a, b) => a - b);
  if (!clean.length) return null;
  const mid = Math.floor(clean.length / 2);
  if (clean.length % 2) return clean[mid];
  return (clean[mid - 1] + clean[mid]) / 2;
}

function average(values) {
  const clean = values.filter(isNumber);
  if (!clean.length) return null;
  return clean.reduce((sum, value) => sum + value, 0) / clean.length;
}

function weightedCount(facts, predicate) {
  return facts.reduce((sum, fact) => sum + (predicate(fact) ? factCredit(fact) : 0), 0);
}

function topIndustries(facts) {
  const counts = new Map();
  for (const fact of facts) {
    const tags = [...(fact.industryTags || []), ...(fact.csrcIndustryTags || [])];
    for (const tag of tags) {
      if (!tag) continue;
      counts.set(tag, (counts.get(tag) || 0) + factCredit(fact));
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "zh-Hans"))
    .slice(0, 4)
    .map(([name]) => name);
}

function firmById() {
  return new Map((state.data?.firms || []).map((firm) => [firm.sponsorId, firm]));
}

function factFilingEligible(fact, milestone) {
  return fact.csrcFilingRequired === true
    && (milestone !== "notice" || !fact.noticeSupersededByCurrentFiling);
}

function factLifecycleTiming(fact) {
  if (fact.hkexStage === "listed") {
    if (fact.listingDurationSampleEligible === false || fact.specialListingRoute === "rto") {
      return {
        days: null,
        kind: "excluded",
        label: "A1→上市（统计剔除）",
        reason: durationExclusionReason(fact),
      };
    }
    const days = isNumber(fact.calendarDaysA1ToListing) ? fact.calendarDaysA1ToListing : null;
    return { days, kind: "listed", label: "A1→上市（最终）" };
  }
  if (fact.hkexStage === "applying") {
    const today = metaToday();
    return { days: dateDiffDays(fact.a1Date, today), kind: "applying", label: `A1→快照日已过（截至${today}）` };
  }
  return { days: dateDiffDays(fact.a1Date, fact.listingDate || metaToday()), kind: "other", label: "A1→截至/上市（非统计）" };
}

function durationExclusionReason(fact) {
  if (fact.listingTiming?.exclusionReasonZh) return fact.listingTiming.exclusionReasonZh;
  const tags = new Set(fact.statusTags || []);
  if (fact.specialListingRoute === "de_spac" || tags.has("De-SPAC")) return "De-SPAC特殊路径，剔除周期统计";
  if (fact.specialListingRoute === "hdr" || tags.has("HDR")) return "HDR/DRS特殊路径，剔除周期统计";
  if (fact.specialListingRoute === "introduction") return "介绍上市 / Listing by introduction，剔除周期统计";
  if (fact.specialListingRoute === "rto") return "反向收购 / Reverse takeover，剔除周期统计";
  if (tags.has("密交") || fact.hkexConfidentialFilingDate) return "密交/疑似密交，公开A1非完整周期，剔除统计";
  if (tags.has("outlier剔除统计") || tags.has("过渡期A1锚点") || tags.has("制度前A1") || tags.has("A1已失效")) {
    return "非可比或异常锚点，剔除周期统计";
  }
  if (!fact.a1Date) return "未见可核实的首次公开A1";
  if (fact.listingDurationSampleEligible === false) return "首次公开A1与上市时间未能完整核实";
  return "";
}

function lifecycleNote(row) {
  const parts = [];
  if (row.listedLifecycleN) parts.push("已上市项目");
  if (row.lifecycleApplyingN) parts.push("申请中项目");
  if (row.lifecycleExcludedN) parts.push("剔除特殊路径");
  if (row.lifecycleOtherN) parts.push("其他/搁置");
  return parts.length ? `${parts.join(" / ")}；密交/De-SPAC/HDR/outlier按主 tracker 门控剔除` : "暂无日期齐全样本";
}

function lifecycleCellNote(row) {
  if (state.stage === "applying") {
    return "生命周期阶段，不纳入快慢统计";
  }
  const parts = [];
  if (row.listedLifecycleN) parts.push("仅已上市项目");
  if (row.lifecycleExcludedN) parts.push("特殊路径已剔除");
  if (row.lifecycleApplyingN && state.stage === "all") parts.push("申请中不计快慢");
  return parts.length ? parts.join("；") : "暂无可比样本";
}

// BEGIN shared tracker timing (sync_sponsor_timing.py)
function postRegimeListingDate(date, regimeStart) {
  return Boolean(date) && String(date) >= (regimeStart || "2023-03-31");
}

function timingNoticeGap(record, listingDate, regimeStart) {
  return record.csrcFilingRequired === true && !record.noticeDate && postRegimeListingDate(listingDate, regimeStart);
}

function timingSample(record, metric, field, currentReceiptField, stage, listingDate, regimeStart) {
  if (metric === "a1ToListing") {
    if (record.listingDurationSampleEligible === false) return null;
  } else {
    if (record.csrcFilingRequired !== true || record.durationSampleEligible === false) return null;
    if (record.noticeSupersededByCurrentFiling && ["a1ToNotice", "receivedToNotice"].includes(metric)) return null;
    if (timingNoticeGap(record, listingDate, regimeStart)) return null;
    if (metric === "a1ToReceived" && stage !== "listed" && record.calendarDaysA1ToReceived > 180) {
      field = currentReceiptField;
    }
  }
  return Number.isFinite(record[field]) ? record[field] : null;
}
// END shared tracker timing

function personnelPerProject(count, projects) {
  return isNumber(count) && count >= 0 && isNumber(projects) && projects > 0 ? count / projects : null;
}

function aggregateFacts(facts, stage = state.stage) {
  const firms = firmById();
  const grouped = new Map();
  for (const fact of creditedFacts(facts)) {
    if (!grouped.has(fact.sponsorId)) grouped.set(fact.sponsorId, []);
    grouped.get(fact.sponsorId).push(fact);
  }

  const rows = [];
  for (const [sponsorId, sponsorFacts] of grouped.entries()) {
    const firm = firms.get(sponsorId) || {
      sponsorId,
      displayNameZh: sponsorId,
      displayNameEn: sponsorId,
      legalNames: [],
      sponsorNature: "待核",
    };
    const allLifecycleTimings = sponsorFacts.map(factLifecycleTiming);
    const lifecycleTimings = allLifecycleTimings.filter((item) => isNumber(item.days));
    const listedLifecycleValues = lifecycleTimings.filter((item) => item.kind === "listed").map((item) => item.days);
    const applyingElapsedValues = lifecycleTimings.filter((item) => item.kind === "applying").map((item) => item.days);
    const cycleValues = (metric, field) => sponsorFacts.map((fact) =>
      timingSample(fact, metric, field, "calendarDaysCurrentA1ToReceived", stage,
        fact.listingDate, state.data?.meta?.csrcRegimeEffectiveDate)).filter(isNumber);
    const noticeCycleValues = cycleValues("a1ToNotice", "calendarDaysA1ToNotice");
    const receivedCycleValues = cycleValues("a1ToReceived", "calendarDaysA1ToReceived");
    const listingCaps = aggregateMarketCaps(sponsorFacts.filter((fact) => fact.hkexStage === "listed" && (fact.specialListingRoute !== "rto" || fact.listingDate)), "listing");
    const aShareCaps = aggregateMarketCaps(sponsorFacts.filter((fact) => fact.isAH || isNumber(fact.aShareMarketCapAtA1RmbBn)), "aShare");
    const applyingAhCaps = aggregateMarketCaps(sponsorFacts.filter((fact) => fact.hkexStage === "applying" && fact.isAH), "aShare");
    const projectCount = weightedCount(sponsorFacts, () => true);
    const activeCount = weightedCount(sponsorFacts, (fact) => fact.hkexStage === "applying");
  const type6RepCount = isNumber(firm.type6RepCount) ? firm.type6RepCount : null;
  const type6ROCount = isNumber(firm.type6ROCount) ? firm.type6ROCount : null;
  const type6TotalCount = isNumber(firm.type6TotalCount) ? firm.type6TotalCount : null;
    const sponsorPrincipalCount = isNumber(firm.sponsorPrincipalCount) ? firm.sponsorPrincipalCount : null;
    const query = normalize(state.search);
    rows.push({
      ...firm,
      facts: sponsorFacts,
      searchSponsorMatch: firmMatchesSearch(firm, query),
      searchSponsorRank: firmSearchRank(firm, query),
      projectCount,
      activeCount,
      applicationStatusCounts: Object.fromEntries([...new Set(sponsorFacts.filter(f => f.hkexStage === "applying")
        .map(f => f.applicationStatusLabelZh).filter(Boolean))].map(label => [label,
          weightedCount(sponsorFacts, f => f.hkexStage === "applying" && f.applicationStatusLabelZh === label)])),
      hkexActiveCount: weightedCount(sponsorFacts, (f) => f.hkexStage === "applying" && f.applicationStatusGroup === "active"),
      hkexInactiveCount: weightedCount(sponsorFacts, (f) => f.hkexStage === "applying" && ["lapsed", "withdrawn", "rejected", "returned", "inactive"].includes(f.applicationStatusGroup)),
      hkexOtherStatusCount: weightedCount(sponsorFacts, (f) => f.hkexStage === "applying" && !["active", "inactive", "lapsed", "withdrawn", "rejected", "returned"].includes(f.applicationStatusGroup)),
      listedCount: weightedCount(sponsorFacts, (fact) => fact.hkexStage === "listed"),
      noticeCount: weightedCount(sponsorFacts, (fact) => fact.status === "notice_issued" && factFilingEligible(fact, "notice")),
      ahCount: weightedCount(sponsorFacts, (fact) => fact.isAH),
      hShareCount: weightedCount(sponsorFacts, (fact) => fact.issuerType === "H股"),
      redChipCount: weightedCount(sponsorFacts, (fact) => fact.issuerType === "红筹"),
      deSpacCount: weightedCount(sponsorFacts, (fact) => fact.issuerType === "De-SPAC"),
      hdrCount: weightedCount(sponsorFacts, (fact) => fact.issuerType === "HDR"),
      otherIssuerTypeCount: weightedCount(sponsorFacts, (fact) => fact.issuerType === "其他"),
      listingMarketCapHkdBnSum: listingCaps.sum,
      listingMarketCapHkdBnMedian: listingCaps.median,
      listingMarketCapN: listingCaps.n,
      listingMarketCapCoverage: listingCaps.coverage,
      aShareMarketCapRmbBnSum: aShareCaps.sum,
      aShareMarketCapRmbBnMedian: aShareCaps.median,
      aShareMarketCapN: aShareCaps.n,
      aShareMarketCapCoverage: aShareCaps.coverage,
      applyingAhMarketCapRmbBnSum: applyingAhCaps.sum,
      applyingAhMarketCapRmbBnMedian: applyingAhCaps.median,
      applyingAhMarketCapN: applyingAhCaps.n,
      applyingAhMarketCapCoverage: applyingAhCaps.coverage,
      lifecycleMedianDays: median(listedLifecycleValues),
      lifecycleTimingN: listedLifecycleValues.length,
      lifecycleListedN: lifecycleTimings.filter((item) => item.kind === "listed").length,
      lifecycleApplyingN: lifecycleTimings.filter((item) => item.kind === "applying").length,
      lifecycleOtherN: lifecycleTimings.filter((item) => item.kind === "other").length,
      lifecycleExcludedN: allLifecycleTimings.filter((item) => item.kind === "excluded").length,
      listedLifecycleAverageDays: average(listedLifecycleValues),
      listedLifecycleMedianDays: median(listedLifecycleValues),
      listedLifecycleN: listedLifecycleValues.length,
      noticeCycleMedianDays: median(noticeCycleValues),
      noticeCycleN: noticeCycleValues.length,
      receivedCycleMedianDays: median(receivedCycleValues),
      receivedCycleN: receivedCycleValues.length,
      applyingElapsedAverageDays: average(applyingElapsedValues),
      applyingElapsedMedianDays: median(applyingElapsedValues),
      applyingElapsedN: applyingElapsedValues.length,
      projectsPerType6Rep: type6RepCount && type6RepCount > 0 ? projectCount / type6RepCount : null,
      type6RepPerProject: personnelPerProject(type6RepCount, projectCount),
      projectsPerType6RO: type6ROCount && type6ROCount > 0 ? projectCount / type6ROCount : null,
      type6ROPerProject: personnelPerProject(type6ROCount, projectCount),
      projectsPerSponsorPrincipal: sponsorPrincipalCount && sponsorPrincipalCount > 0 ? projectCount / sponsorPrincipalCount : null,
      sponsorPrincipalPerProject: personnelPerProject(sponsorPrincipalCount, projectCount),
      projectsPerType6Total: type6TotalCount && type6TotalCount > 0 ? projectCount / type6TotalCount : null,
      type6TotalPerProject: personnelPerProject(type6TotalCount, projectCount),
      type6TotalPerActiveProject: personnelPerProject(type6TotalCount, activeCount),
      activeProjectsPerType6Total: type6TotalCount && type6TotalCount > 0 ? activeCount / type6TotalCount : null,
      sponsorPrincipalPerActiveProject: personnelPerProject(sponsorPrincipalCount, activeCount),
      activeProjectsPerSponsorPrincipal: sponsorPrincipalCount && sponsorPrincipalCount > 0 ? activeCount / sponsorPrincipalCount : null,
      type6RepPerActiveProject: personnelPerProject(type6RepCount, activeCount),
      activeProjectsPerType6Rep: type6RepCount && type6RepCount > 0 ? activeCount / type6RepCount : null,
      listingMarketCapPerType6TotalHkdBn:
        isNumber(listingCaps.sum) && type6TotalCount > 0 ? listingCaps.sum / type6TotalCount : null,
      listingMarketCapPerSponsorPrincipalHkdBn:
        isNumber(listingCaps.sum) && sponsorPrincipalCount > 0 ? listingCaps.sum / sponsorPrincipalCount : null,
      topIndustries: topIndustries(sponsorFacts),
    });
  }
  return rows.sort(compareRows);
}

function aggregateFactsForCredit(facts, credit, stage = "all") {
  const previousCredit = state.credit;
  state.credit = credit;
  try {
    return aggregateFacts(facts, stage);
  } finally {
    state.credit = previousCredit;
  }
}

function countRowsWithNumber(rows, key) {
  return rows.filter((row) => isNumber(row[key])).length;
}

function benchmarkLabel(group, rows) {
  if (group.id === `${BENCHMARK_PREFIX}all` && state.sector !== "all") {
    return {
      zh: `${sectorLabel()}中位`,
      en: `${sectorLabel()} median`,
    };
  }
  return { zh: group.zh, en: group.en };
}

function buildBenchmarkRow(group, sourceRows) {
  const rows = sourceRows.filter(group.filter);
  if (!rows.length) return null;
  const labels = benchmarkLabel(group, rows);
  const row = {
    sponsorId: group.id,
    sponsorTag: null,
    displayNameZh: labels.zh,
    displayNameEn: labels.en,
    canonicalName: `${labels.en} benchmark`,
    legalNames: [],
    aliases: [group.zh, group.en, group.note, "benchmark", "median", "中位", "基准"],
    sponsorNature: "基准",
    natureConfidence: "derived",
    mappingConfidence: "derived_benchmark",
    firmScope: "benchmark",
    benchmarkGroupSize: rows.length,
    benchmarkNote: `${group.note} · 组内中位数 · ${rows.length}家`,
    facts: [],
    searchSponsorMatch: false,
    searchSponsorRank: 0,
    type6Quality: "benchmark",
    sponsorPrincipalQuality: "benchmark",
    topIndustries: [state.sector === "all" ? "全行业" : sectorLabel()],
  };
  for (const key of BENCHMARK_MEDIAN_FIELDS) {
    row[key] = median(rows.map((item) => item[key]).filter(isNumber));
  }
  if (hasPartialListingValue(rows)) {
    for (const field of ["listingMarketCapHkdBnSum", "listingMarketCapPerType6TotalHkdBn", "listingMarketCapPerSponsorPrincipalHkdBn"]) {
      row[field] = null;
    }
  }
  row.listingMarketCapN = countRowsWithNumber(rows, "listingMarketCapHkdBnSum");
  row.aShareMarketCapN = countRowsWithNumber(rows, "aShareMarketCapRmbBnSum");
  row.applyingAhMarketCapN = countRowsWithNumber(rows, "applyingAhMarketCapRmbBnSum");
  for (const prefix of ["listingMarketCap", "aShareMarketCap", "applyingAhMarketCap"]) {
    row[`${prefix}Coverage`] = {verified: row[`${prefix}N`], total: rows.length, unit: "firms"};
    {
      const key = prefix === "listingMarketCap" ? "listingMarketCapHkdBnSum" : `${prefix}RmbBnSum`;
      const estimated = rows.filter((item) => isNumber(item[key]) && item[`${prefix}Coverage`]?.estimate > 0).length;
      row[`${prefix}Coverage`].estimate = estimated;
      row[`${prefix}Coverage`].verified -= estimated;
    }
  }
  row.lifecycleTimingN = countRowsWithNumber(rows, "listedLifecycleAverageDays");
  row.lifecycleListedN = row.lifecycleTimingN;
  row.lifecycleApplyingN = countRowsWithNumber(rows, "applyingElapsedAverageDays");
  row.lifecycleOtherN = 0;
  row.lifecycleExcludedN = 0;
  row.listedLifecycleN = row.lifecycleTimingN;
  row.noticeCycleN = countRowsWithNumber(rows, "noticeCycleMedianDays");
  row.receivedCycleN = countRowsWithNumber(rows, "receivedCycleMedianDays");
  row.applyingElapsedN = row.lifecycleApplyingN;
  return row;
}

function benchmarkRows(rows) {
  const sourceRows = rows.filter((row) => row.firmScope !== "rollup" && row.firmScope !== "benchmark" && row.projectCount > 0);
  return BENCHMARK_GROUPS.map((group) => buildBenchmarkRow(group, sourceRows)).filter(Boolean);
}

function rowsWithBenchmarks(rows) {
  return [...benchmarkRows(rows), ...rows];
}

function emptyPkRow(template) {
  if (!template) return null;
  const type6RepCount = isNumber(template.type6RepCount) ? template.type6RepCount : null;
  const type6ROCount = isNumber(template.type6ROCount) ? template.type6ROCount : null;
  const type6TotalCount = isNumber(template.type6TotalCount) ? template.type6TotalCount : null;
  const sponsorPrincipalCount = isNumber(template.sponsorPrincipalCount) ? template.sponsorPrincipalCount : null;
  return {
    sponsorId: template.sponsorId,
    sponsorTag: template.sponsorTag,
    displayNameZh: template.displayNameZh || template.sponsorId,
    displayNameEn: template.displayNameEn || template.sponsorId,
    canonicalName: template.canonicalName || template.displayNameEn || template.displayNameZh || template.sponsorId,
    legalNames: template.legalNames || [],
    registeredEntity: template.registeredEntity,
    aliases: template.aliases || [],
    sponsorNature: template.sponsorNature || "待核",
    natureConfidence: template.natureConfidence,
    ownershipDisclosure: template.ownershipDisclosure,
    mappingConfidence: template.mappingConfidence,
    firmScope: "empty_filter",
    emptyFilter: true,
    facts: [],
    searchSponsorMatch: template.searchSponsorMatch || false,
    searchSponsorRank: template.searchSponsorRank || 0,
    type6Quality: template.type6Quality,
    sponsorPrincipalQuality: template.sponsorPrincipalQuality,
    type6AsOfDate: template.type6AsOfDate,
    type6SourceDates: template.type6SourceDates,
    sponsorPrincipalAsOfDate: template.sponsorPrincipalAsOfDate,
    sponsorPrincipalSourceDates: template.sponsorPrincipalSourceDates,
    sponsorPrincipalInstitutionSources: template.sponsorPrincipalInstitutionSources,
    type6RepCount,
    type6ROCount,
    type6TotalCount,
    sponsorPrincipalCount,
    projectCount: 0,
    activeCount: 0,
    hkexActiveCount: 0,
    hkexInactiveCount: 0,
    hkexOtherStatusCount: 0,
    listedCount: 0,
    noticeCount: 0,
    ahCount: 0,
    hShareCount: 0,
    redChipCount: 0,
    deSpacCount: 0,
    hdrCount: 0,
    otherIssuerTypeCount: 0,
    listingMarketCapHkdBnSum: null,
    listingMarketCapHkdBnMedian: null,
    listingMarketCapN: 0,
    listingMarketCapCoverage: aggregateMarketCaps([], "listing").coverage,
    aShareMarketCapRmbBnSum: null,
    aShareMarketCapRmbBnMedian: null,
    aShareMarketCapN: 0,
    aShareMarketCapCoverage: aggregateMarketCaps([], "aShare").coverage,
    applyingAhMarketCapRmbBnSum: null,
    applyingAhMarketCapRmbBnMedian: null,
    applyingAhMarketCapN: 0,
    applyingAhMarketCapCoverage: aggregateMarketCaps([], "aShare").coverage,
    lifecycleMedianDays: null,
    lifecycleTimingN: 0,
    lifecycleListedN: 0,
    lifecycleApplyingN: 0,
    lifecycleOtherN: 0,
    lifecycleExcludedN: 0,
    listedLifecycleAverageDays: null,
    listedLifecycleMedianDays: null,
    listedLifecycleN: 0,
    noticeCycleMedianDays: null,
    noticeCycleN: 0,
    receivedCycleMedianDays: null,
    receivedCycleN: 0,
    applyingElapsedAverageDays: null,
    applyingElapsedMedianDays: null,
    applyingElapsedN: 0,
    projectsPerType6Rep: type6RepCount && type6RepCount > 0 ? 0 : null,
    type6RepPerProject: null,
    projectsPerType6RO: type6ROCount && type6ROCount > 0 ? 0 : null,
    type6ROPerProject: null,
    projectsPerSponsorPrincipal: sponsorPrincipalCount && sponsorPrincipalCount > 0 ? 0 : null,
    sponsorPrincipalPerProject: null,
    projectsPerType6Total: type6TotalCount && type6TotalCount > 0 ? 0 : null,
    type6TotalPerProject: null,
    type6TotalPerActiveProject: null,
    activeProjectsPerType6Total: type6TotalCount && type6TotalCount > 0 ? 0 : null,
    sponsorPrincipalPerActiveProject: null,
    activeProjectsPerSponsorPrincipal: sponsorPrincipalCount && sponsorPrincipalCount > 0 ? 0 : null,
    type6RepPerActiveProject: null,
    activeProjectsPerType6Rep: type6RepCount && type6RepCount > 0 ? 0 : null,
    listingMarketCapPerType6TotalHkdBn: null,
    listingMarketCapPerSponsorPrincipalHkdBn: null,
    topIndustries: [state.sector === "all" ? "当前筛选" : sectorLabel()],
  };
}

function pkComparableRow(sponsorId, comparisonRows, optionRows) {
  return comparisonRows.find((row) => row.sponsorId === sponsorId) || emptyPkRow(optionRows.find((row) => row.sponsorId === sponsorId));
}

function dateScopeLabel() {
  const fieldLabel = {
    stageDate: "阶段日（申请中A1 / 已上市上市日）",
    a1Date: "A1",
    noticeDate: "备案通知书",
    receivedDate: "接收",
    listingDate: "上市日",
  }[state.dateField] || "日期";
  if (!state.dateFrom && !state.dateTo) return `${fieldLabel} · 全部`;
  return `${fieldLabel} · ${state.dateFrom || "最早"} 至 ${state.dateTo || "最新"}`;
}

function scopeLabel() {
  const sector = state.sector === "all" ? "全部赛道" : `赛道：${sectorLabel()}`;
  const types = state.type === "all" ? "" : `类型：${state.type}；`;
  return `${types}${sector}；${dateScopeLabel()}`;
}

function compareRows(a, b) {
  if (normalize(state.search)) {
    const aSponsorRank = a.searchSponsorRank || 0;
    const bSponsorRank = b.searchSponsorRank || 0;
    if (aSponsorRank !== bSponsorRank) return bSponsorRank - aSponsorRank;
  }
  const sortKey = state.sortKey || state.metric;
  const av = metricValue(a, sortKey);
  const bv = metricValue(b, sortKey);
  const aMissing = missingSortValue(a, sortKey, av);
  const bMissing = missingSortValue(b, sortKey, bv);
  if (aMissing !== bMissing) return aMissing ? 1 : -1;
  const sortFactor = effectiveSortDir(sortKey) === "asc" ? 1 : -1;
  if (!aMissing && av !== bv) {
    if (isNumber(av) && isNumber(bv)) return (av - bv) * sortFactor;
    return String(av).localeCompare(String(bv), "zh-Hans") * sortFactor;
  }
  if (b.projectCount !== a.projectCount) return b.projectCount - a.projectCount;
  return String(a.displayNameEn).localeCompare(String(b.displayNameEn));
}

function firmSearchText(firm) {
  return firmSearchTerms(firm).join(" ");
}

function firmSearchTerms(firm) {
  return [
    firm?.displayNameZh,
    firm?.displayNameEn,
    firm?.sponsorTag,
    firm?.canonicalName,
    firm?.registeredEntity?.ce,
    firm?.registeredEntity?.legalNameZh,
    ...(firm?.legalNames || []),
    ...(firm?.aliases || []),
    ...(firm?.type6InstitutionEvidence || []).map((r) => r.firmNameZh),
    ...(firm?.sponsorPrincipalInstitutionEvidence || []).map((r) => r.firmNameZh),
  ]
    .map(normalize)
    .filter(Boolean);
}

function firmMatchesSearch(firm, query) {
  return !!query && firmSearchText(firm).includes(query);
}

function firmSearchRank(firm, query) {
  if (!query) return 0;
  const terms = firmSearchTerms(firm);
  if (terms.some((term) => term === query)) return 3;
  if (terms.some((term) => term.startsWith(query))) return 2;
  if (terms.some((term) => term.includes(query))) return 1;
  return 0;
}

function matchesSearch(fact, firm, query) {
  if (!query) return true;
  const haystack = [
    firmSearchText(firm),
    fact.issuerName,
    fact.csrcName,
    fact.hkexListingCompanyName,
    ...(fact.issuerSearchAliases || []),
    fact.hkexListingStockCode,
    fact.sponsorLegalName,
    fact.issuerType,
    fact.statusLabelZh,
    ...(fact.industryTags || []),
    ...(fact.csrcIndustryTags || []),
  ]
    .map(normalize)
    .join(" ");
  return haystack.includes(query);
}

function factIndustryTags(fact) {
  return [...(fact.industryTags || []), ...(fact.csrcIndustryTags || [])]
    .map((tag) => String(tag || "").trim())
    .filter(Boolean);
}

function sectorKeywordMatches(option, tag) {
  const text = normalize(tag);
  return option?.keywords?.some((keyword) => text.includes(normalize(keyword))) || false;
}

function factSector(fact) {
  const tags = factIndustryTags(fact);
  // The mirror emits this label only for an explicitly undetermined current perimeter.
  if (!tags.length && fact.industryDisplayLabel) return null;
  for (const signal of SECTOR_STRONG_SIGNALS) {
    if (tags.some((tag) => signal.keywords.some((keyword) => normalize(tag).includes(normalize(keyword))))) {
      return signal.value;
    }
  }
  for (const sectorValue of SECTOR_MATCH_PRIORITY) {
    const option = SECTOR_BY_VALUE.get(sectorValue);
    if (tags.some((tag) => sectorKeywordMatches(option, tag))) return sectorValue;
  }
  return "other";
}

function sectorLabel(value = state.sector) {
  return SECTOR_BY_VALUE.get(value)?.label || "全部赛道";
}

function matchesSector(fact) {
  return state.sector === "all" || factSector(fact) === state.sector;
}

function matchesIssuerType(fact) {
  return state.type === "all" || fact.issuerType === state.type;
}

function filteredFacts() {
  const firms = firmById();
  const query = normalize(state.search);
  return (state.data?.projectFacts || []).filter((fact) => {
    const firm = firms.get(fact.sponsorId);
    if (!matchesSearch(fact, firm, query)) return false;
    if (!matchesSector(fact)) return false;
    if (state.stage !== "all" && fact.hkexStage !== state.stage) return false;
    if (!matchesIssuerType(fact)) return false;
    if (state.nature !== "all" && firm?.sponsorNature !== state.nature) return false;
    return matchesDateScope(fact);
  });
}

function matchesDateScope(fact) {
  const dateValue = factDateForScope(fact, state.dateField);
  if (state.dateFrom && (!dateValue || dateValue < state.dateFrom)) return false;
  if (state.dateTo && (!dateValue || dateValue > state.dateTo)) return false;
  return true;
}

function completedRtoDate(fact) {
  if (fact.specialListingRoute !== "rto") return "";
  const value = fact.transactionCompletionDate;
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value) || value.startsWith("0000-")) return "";
  const parsed = new Date(`${value}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) return "";
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Hong_Kong", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date());
  if (value > today) return "";
  const source = fact.transactionCompletionSourceUrl;
  if (typeof source !== "string" || !/^https?:\/\/[^/\\]/i.test(source)) return "";
  try {
    const url = new URL(source);
    return ["http:", "https:"].includes(url.protocol) && url.hostname ? value : "";
  } catch {
    return "";
  }
}

function factDateForScope(fact, dateField = state.dateField) {
  if (dateField !== "stageDate") return fact[dateField];
  if (fact.hkexStage === "listed" && fact.specialListingRoute === "rto") return completedRtoDate(fact);
  if (fact.hkexStage === "listed") return fact.listingDate;
  if (fact.hkexStage === "applying") return fact.a1Date;
  return "";
}

function pkFilteredFacts() {
  return (state.data?.projectFacts || []).filter((fact) => matchesDateScope(fact) && matchesSector(fact) && matchesIssuerType(fact));
}

function pkOptionFacts() {
  return state.data?.projectFacts || [];
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b), "zh-Hans"));
}

function populateOptions() {
  const facts = state.data?.projectFacts || [];
  const firms = state.data?.firms || [];
  const types = uniqueSorted(facts.map((fact) => fact.issuerType));
  const natures = uniqueSorted(firms.map((firm) => firm.sponsorNature));
  els.typeSelect.innerHTML =
    '<option value="all">全部类型</option>' +
    types.map((type) => `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`).join("");
  els.natureSelect.innerHTML =
    '<option value="all">全部性质</option>' +
    natures.map((nature) => `<option value="${escapeHtml(nature)}">${escapeHtml(nature)}</option>`).join("");
  const sectorOptionsHtml = SECTOR_OPTIONS.map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join("");
  els.sectorSelect.innerHTML = sectorOptionsHtml;
  if (pkEls.sectorSelect) pkEls.sectorSelect.innerHTML = sectorOptionsHtml;
}

function metaToday() {
  const source = state.data?.meta?.sourceGeneratedAt || state.data?.meta?.generatedAt;
  return source ? source.slice(0, 10) : new Date().toISOString().slice(0, 10);
}

function enforceMetricCompatibility() {
  if (state.sortHeaderKey === "__lifecycle") {
    state.sortKey = lifecycleSortKey();
  }
  if (state.stage === "applying" && state.metric === "lifecycleMedianDays") {
    state.metric = "activeCount";
    if (state.sortKey === "lifecycleMedianDays") state.sortKey = "activeCount";
    if (state.sortHeaderKey === "__metric") state.sortHeaderKey = "__metric";
    if (state.sortHeaderKey === "lifecycleMedianDays") state.sortHeaderKey = "activeCount";
    state.sortDir = null;
  }
  if (state.sector !== "all" && !SECTOR_METRIC_KEYS.has(state.metric)) {
    state.metric = "projectCount";
    state.sortKey = "projectCount";
    state.sortHeaderKey = "projectCount";
    state.sortDir = null;
  }
}

function resetPresetFilters() {
  state.search = "";
  state.stage = "all";
  state.type = "all";
  state.nature = "all";
  state.sector = "all";
  state.dateField = "stageDate";
  state.dateFrom = "";
  state.dateTo = "";
  state.dateQuick = "all";
}

function setPreset(preset) {
  state.preset = preset;
  resetPresetFilters();
  if (preset === "applying") {
    state.stage = "applying";
    enforceMetricCompatibility();
  } else if (preset === "listed") {
    state.stage = "listed";
  } else if (preset === "ah") {
    state.type = "A+H";
  } else if (preset === "recentA1") {
    state.dateField = "a1Date";
    state.dateTo = metaToday();
    state.dateFrom = addDays(state.dateTo, -30);
    state.dateQuick = "custom";
  } else if (preset === "recentNotice") {
    state.dateField = "noticeDate";
    state.dateTo = metaToday();
    state.dateFrom = addDays(state.dateTo, -90);
    state.dateQuick = "custom";
  }
  enforceMetricCompatibility();
  syncControls();
  render();
  renderPk();
}

function monthsBefore(dateString, months) {
  const end = new Date(dateString + "T00:00:00Z");
  const year = end.getUTCFullYear();
  const month = end.getUTCMonth() - months;
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return new Date(Date.UTC(year, month, Math.min(end.getUTCDate(), lastDay))).toISOString().slice(0, 10);
}

function setDateQuickRange(range) {
  state.dateQuick = range;
  const today = metaToday();
  state.dateTo = "";
  state.dateFrom = "";
  if (range === "3m") {
    state.dateTo = today;
    state.dateFrom = monthsBefore(today, 3);
  } else if (range === "6m") {
    state.dateTo = today;
    state.dateFrom = monthsBefore(today, 6);
  } else if (range === "1y") {
    state.dateTo = today;
    state.dateFrom = monthsBefore(today, 12);
  } else if (range === "2026ytd") {
    state.dateFrom = "2026-01-01";
    state.dateTo = today;
  } else {
    state.dateQuick = "all";
  }
  state.preset = "custom";
  syncControls();
  render();
  renderPk();
}

function syncControls() {
  els.searchInput.value = state.search;
  els.metricSelect.value = state.metric;
  els.creditSelect.value = state.credit;
  els.stageSelect.value = state.stage;
  els.typeSelect.value = state.type;
  els.natureSelect.value = state.nature;
  els.sectorSelect.value = state.sector;
  els.dateFieldSelect.value = state.dateField;
  els.dateFrom.value = state.dateFrom;
  els.dateTo.value = state.dateTo;
  viewRoot.querySelectorAll(".preset").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.preset === state.preset);
  });
  document.querySelectorAll(".sponsor-league [data-date-quick]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.dateQuick === state.dateQuick);
  });
  if (pkEls.dateFieldSelect) pkEls.dateFieldSelect.value = state.dateField;
  if (pkEls.sectorSelect) pkEls.sectorSelect.value = state.sector;
  if (pkEls.dateFrom) pkEls.dateFrom.value = state.dateFrom;
  if (pkEls.dateTo) pkEls.dateTo.value = state.dateTo;
  els.metricSelect.querySelectorAll("option").forEach((option) => {
    option.disabled = state.sector !== "all" && !SECTOR_METRIC_KEYS.has(option.value);
  });
  syncSortHeaders();
}

function readControls() {
  const nextMetric = els.metricSelect.value;
  if (nextMetric !== state.metric) {
    state.metric = nextMetric;
    state.sortKey = nextMetric;
    state.sortHeaderKey = "__metric";
    state.sortDir = null;
  }
  state.search = els.searchInput.value;
  state.credit = els.creditSelect.value;
  state.stage = els.stageSelect.value;
  state.type = els.typeSelect.value;
  state.nature = els.natureSelect.value;
  state.sector = els.sectorSelect.value;
  state.dateField = els.dateFieldSelect.value;
  state.dateFrom = els.dateFrom.value;
  state.dateTo = els.dateTo.value;
  state.dateQuick = "custom";
  state.preset = "custom";
  enforceMetricCompatibility();
  if (!state.sortKey) state.sortKey = state.metric;
  syncControls();
  render();
  renderPk();
}

function readPkDateControls() {
  if (pkEls.sectorSelect) state.sector = pkEls.sectorSelect.value;
  if (pkEls.dateFieldSelect) state.dateField = pkEls.dateFieldSelect.value;
  if (pkEls.dateFrom) state.dateFrom = pkEls.dateFrom.value;
  if (pkEls.dateTo) state.dateTo = pkEls.dateTo.value;
  state.dateQuick = "custom";
  state.preset = "custom";
  enforceMetricCompatibility();
  syncControls();
  render();
  renderPk();
}

function sortLabel(sortKey = state.sortKey) {
  if (sortKey === "listingMarketCapHkdBnSum" || sortKey === "aShareMarketCapRmbBnSum") return marketCapHeaderText();
  return sortLabels[sortKey] || metricLabels[sortKey] || "排名指标";
}

function syncSortHeaders() {
  viewRoot.querySelectorAll(".sl-th-sort").forEach((button) => {
    const sortKey = resolveHeaderSortKey(button.dataset.sortKey);
    const active = button.dataset.sortKey === state.sortHeaderKey && sortKey === state.sortKey;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
    const th = button.closest("th");
    if (th) th.setAttribute("aria-sort", active ? (effectiveSortDir(sortKey) === "asc" ? "ascending" : "descending") : "none");
    const indicator = button.querySelector(".sl-sort-indicator");
    if (indicator) indicator.textContent = active ? (effectiveSortDir(sortKey) === "asc" ? "↑" : "↓") : "";
  });
}

function setSortFromHeader(rawKey) {
  const nextKey = resolveHeaderSortKey(rawKey);
  if (rawKey === state.sortHeaderKey && nextKey === state.sortKey) {
    state.sortDir = effectiveSortDir(nextKey) === "asc" ? "desc" : "asc";
  } else {
    state.sortKey = nextKey;
    state.sortHeaderKey = rawKey;
    state.sortDir = null;
  }
  state.preset = "custom";
  syncControls();
  render();
}

function metricDisplay(row) {
  if (state.metric === "listingMarketCapHkdBnSum") {
    return {
      main: formatListingCap(row),
      sub: `上市日全部普通股市值`,
    };
  }
  if (state.metric === "aShareMarketCapRmbBnSum") {
    return {
      main: formatAShareCap(row),
      sub: metricLabels.aShareMarketCapRmbBnSum,
    };
  }
  if (state.metric === "lifecycleMedianDays") {
    return {
      ...lifecycleDisplay(row),
    };
  }
  if (state.metric === "noticeCycleMedianDays") {
    return {
      main: formatDays(row.noticeCycleMedianDays, row.noticeCycleN),
      sub: "排名仅纳入已发通知书 A1→通知样本",
    };
  }
  if (state.metric === "receivedCycleMedianDays") {
    return {
      main: formatDays(row.receivedCycleMedianDays, row.receivedCycleN),
      sub: "排名仅纳入已接收 A1→接收样本",
    };
  }
  if (state.metric === "sponsorPrincipalCount") {
    return capacityDisplay(row);
  }
  if (state.metric === "projectsPerType6Rep") {
    return {
      main: formatRatio(row.projectsPerType6Rep),
      sub: isNumber(row.type6RepCount) ? `内部项目/Rep口径 · 不作为公开负荷展示 · Rep ${compactNumber(row.type6RepCount, 0)}` : "暂无六号牌Rep",
    };
  }
  if (state.metric === "type6RepPerProject") {
    return {
      main: formatRatio(row.type6RepPerProject),
      sub: isNumber(row.type6RepCount) ? `每个项目配置Rep · 容量背景 Capacity · Rep ${compactNumber(row.type6RepCount, 0)}` : "暂无六号牌Rep",
    };
  }
  if (state.metric === "sponsorPrincipalPerProject") {
    return {
      main: formatRatio(row.sponsorPrincipalPerProject),
      sub: isNumber(row.sponsorPrincipalCount) ? `每项目平均SP配置 · 容量背景 Capacity · SP ${compactNumber(row.sponsorPrincipalCount, 0)}` : "暂无SP人数",
    };
  }
  if (state.metric === "type6TotalPerProject") {
    return {
      main: formatRatio(row.type6TotalPerProject),
      sub: isNumber(row.type6TotalCount) ? `每项目六号牌配置 · 容量背景 Capacity · ${compactNumber(row.type6TotalCount, 0)}人` : "暂无六号牌人数",
    };
  }
  if (state.metric === "projectsPerSponsorPrincipal") {
    return {
      main: formatRatio(row.projectsPerSponsorPrincipal),
      sub: isNumber(row.sponsorPrincipalCount) ? `每名SP负责项目数 · 负荷口径 Workload · SP ${compactNumber(row.sponsorPrincipalCount, 0)}` : "暂无SP人数",
    };
  }
  if (state.metric === "projectsPerType6Total") {
    return {
      main: formatRatio(row.projectsPerType6Total),
      sub: isNumber(row.type6TotalCount) ? `每名六号牌人员负责几个项目 · ${compactNumber(row.type6TotalCount, 0)}人` : "暂无六号牌人数",
    };
  }
  if (state.metric === "sponsorPrincipalPerActiveProject") {
    return {
      main: formatRatio(row.sponsorPrincipalPerActiveProject),
      sub: isNumber(row.sponsorPrincipalCount) ? `SP配置背景 · Capacity background · 申请中 ${compactCredit(row.activeCount)}` : "暂无SP人数",
    };
  }
  if (state.metric === "type6RepPerActiveProject") {
    return {
      main: formatRatio(row.type6RepPerActiveProject),
      sub: isNumber(row.type6RepCount) ? `每个公开申请中项目配置Rep · 公开样本旁证 · Rep ${compactNumber(row.type6RepCount, 0)}` : "暂无六号牌Rep",
    };
  }
  if (state.metric === "activeProjectsPerSponsorPrincipal") {
    return {
      main: formatRatio(row.activeProjectsPerSponsorPrincipal),
      sub: isNumber(row.sponsorPrincipalCount) ? `每名SP负责公开申请中项目 · 公开样本旁证 · SP ${compactNumber(row.sponsorPrincipalCount, 0)}` : "暂无SP人数",
    };
  }
  if (state.metric === "activeProjectsPerType6Rep") {
    return {
      main: formatRatio(row.activeProjectsPerType6Rep),
      sub: isNumber(row.type6RepCount) ? `内部公开项目/Rep口径 · 不作为公开负荷展示 · Rep ${compactNumber(row.type6RepCount, 0)}` : "暂无六号牌Rep",
    };
  }
  if (state.metric === "listingMarketCapPerType6TotalHkdBn") {
    return {
      main: formatListingCap(row, row.listingMarketCapPerType6TotalHkdBn, true),
      sub: `${isNumber(row.type6TotalCount) ? `上市日市值 / 六号牌 ${compactNumber(row.type6TotalCount, 0)}人` : "暂无六号牌人数"}`,
    };
  }
  if (state.metric === "listingMarketCapPerSponsorPrincipalHkdBn") {
    return {
      main: formatListingCap(row, row.listingMarketCapPerSponsorPrincipalHkdBn, true),
      sub: `${isNumber(row.sponsorPrincipalCount) ? `上市日市值 / SP ${compactNumber(row.sponsorPrincipalCount, 0)}人` : "暂无SP人数"}`,
    };
  }
  return {
    main: compactCredit(metricValue(row)),
    sub: creditLabels[state.credit] || "计入口径",
  };
}

function marketCapMode() {
  if (state.stage === "listed") return "listed";
  if (state.stage === "applying") return "applyingAh";
  if (state.type === "A+H") return "aShare";
  return "mixed";
}

function marketCapHeaderText() {
  const mode = marketCapMode();
  if (mode === "listed") return metricLabels.listingMarketCapHkdBnSum;
  if (mode === "applyingAh" || mode === "aShare") return metricLabels.aShareMarketCapRmbBnSum;
  return "市值 / Equity value";
}

function lifecycleHeaderText() {
  return state.stage === "applying" ? "项目生命周期阶段" : "A1到上市流程平均";
}

function lifecycleHeaderTitle() {
  if (state.stage === "applying") {
    return "上市申请中项目显示公开 A1 后截至快照日的平均已过时间；这是生命周期阶段/freshness，不纳入 A1 到上市快慢统计。";
  }
  return "每个有完整日期的普通IPO计一次，从可核实的首次公开A1起算，包括重新递表所经日历时间；项目明细另列最终成功轮次。";
}

function marketCapSortValue(row) {
  const mode = marketCapMode();
  if (mode === "listed") return row.listingMarketCapHkdBnSum;
  if (mode === "applyingAh") return row.applyingAhMarketCapRmbBnSum;
  if (mode === "aShare") return row.aShareMarketCapRmbBnSum;
  return row.listingMarketCapHkdBnSum ?? row.applyingAhMarketCapRmbBnSum ?? row.aShareMarketCapRmbBnSum ?? null;
}

function shouldShowMarketCap(rows) {
  const mode = marketCapMode();
  const prefixes = mode === "listed" ? ["listingMarketCap"]
    : mode === "applyingAh" ? ["applyingAhMarketCap"]
    : mode === "aShare" ? ["aShareMarketCap"] : ["listingMarketCap", "aShareMarketCap"];
  return rows.some((row) => marketCapSortValue(row) > 0 || prefixes.some((prefix) => row[`${prefix}Coverage`]?.total > 0));
}

function marketCapDisplay(row) {
  const mode = marketCapMode();
  let prefix = "listingMarketCap";
  if (mode === "applyingAh") prefix = "applyingAhMarketCap";
  else if (mode === "aShare") prefix = "aShareMarketCap";
  else if (mode === "mixed" && !row.listingMarketCapCoverage?.total) {
    prefix = row.applyingAhMarketCapCoverage?.total ? "applyingAhMarketCap" : "aShareMarketCap";
  }
  const listing = prefix === "listingMarketCap";
  const total = row[`${prefix}Coverage`]?.total;
  return {
    main: total === 0 ? "不适用" : listing ? formatListingCap(row) : formatAShareCap(row, prefix),
    sub: `${listing ? "上市日市值（A/H同日折算）" : metricLabels.aShareMarketCapRmbBnSum}`,
  };
}

function hasPartialListingValue(rows) {
  return rows.some(row => row.firmScope !== "rollup" && row.listingMarketCapCoverage?.total > 0
    && !isNumber(row.listingMarketCapHkdBnSum));
}

function metricCards(rows) {
  const MIN_ACTIVE_PROJECTS = 8;
  const MIN_MARKET_CAP_PROJECTS = 3;
  const comparableRows = rows.filter((row) => row.firmScope !== "rollup" && row.firmScope !== "benchmark");
  const activeLeader = [...comparableRows].filter((row) => row.activeCount > 0).sort((a, b) => b.activeCount - a.activeCount || b.projectCount - a.projectCount)[0];
  const timingLeader = [...comparableRows]
    .filter((row) => isNumber(row.listedLifecycleAverageDays) && row.listedLifecycleN >= 5)
    .sort((a, b) => a.listedLifecycleAverageDays - b.listedLifecycleAverageDays)[0];
  const spWorkloadLeader = [...comparableRows]
    .filter((row) => isNumber(row.activeProjectsPerSponsorPrincipal) && row.activeCount >= MIN_ACTIVE_PROJECTS)
    .sort((a, b) => b.activeProjectsPerSponsorPrincipal - a.activeProjectsPerSponsorPrincipal || b.activeCount - a.activeCount)[0];
  const repLeanLeader = [...comparableRows]
    .filter((row) => isNumber(row.type6RepPerActiveProject) && row.activeCount >= MIN_ACTIVE_PROJECTS)
    .sort((a, b) => a.type6RepPerActiveProject - b.type6RepPerActiveProject || b.activeCount - a.activeCount)[0];
  const listingValueRows = hasPartialListingValue(comparableRows) ? [] : comparableRows;
  const mcapPerSpLeader = [...listingValueRows]
    .filter(
      (row) =>
        isNumber(row.listingMarketCapPerSponsorPrincipalHkdBn) &&
        row.listingMarketCapN >= MIN_MARKET_CAP_PROJECTS,
    )
    .sort(
      (a, b) =>
        b.listingMarketCapPerSponsorPrincipalHkdBn - a.listingMarketCapPerSponsorPrincipalHkdBn ||
        b.listingMarketCapHkdBnSum - a.listingMarketCapHkdBnSum,
    )[0];
  const mcapPerTotalLeader = [...listingValueRows]
    .filter(
      (row) =>
        isNumber(row.listingMarketCapPerType6TotalHkdBn) &&
        row.listingMarketCapN >= MIN_MARKET_CAP_PROJECTS,
    )
    .sort((a, b) => b.listingMarketCapPerType6TotalHkdBn - a.listingMarketCapPerType6TotalHkdBn || b.listingMarketCapHkdBnSum - a.listingMarketCapHkdBnSum)[0];
  const listedMcapLeader = [...listingValueRows]
    .filter((row) => row.listingMarketCapHkdBnSum > 0)
    .sort((a, b) => b.listingMarketCapHkdBnSum - a.listingMarketCapHkdBnSum || b.listingMarketCapN - a.listingMarketCapN)[0];
  const projectLeader = [...comparableRows].filter((row) => row.projectCount > 0).sort((a, b) => b.projectCount - a.projectCount || b.activeCount - a.activeCount)[0];
  const listedLeader = [...comparableRows].filter((row) => row.listedCount > 0).sort((a, b) => b.listedCount - a.listedCount || b.projectCount - a.projectCount)[0];

  if (state.sector !== "all") {
    const label = sectorLabel();
    const cards = [
      {
        label: `${label}项目最多`,
        value: projectLeader ? projectLeader.displayNameZh : "待披露",
        note: projectLeader ? `${compactCredit(projectLeader.projectCount)} 个${label}项目 · 赛道按公开行业标签归类` : "无赛道样本",
      },
      {
        label: `${label}公开申请中最多`,
        value: activeLeader ? activeLeader.displayNameZh : "待披露",
        note: activeLeader ? `${compactCredit(activeLeader.activeCount)} 个公开申请中项目 · 内部pipeline不可见` : "无公开申请中样本",
      },
      {
        label: `${label}已上市最多`,
        value: listedLeader ? listedLeader.displayNameZh : "待披露",
        note: listedLeader ? `${compactCredit(listedLeader.listedCount)} 个已上市项目` : "无已上市样本",
      },
      {
        label: `${label}上市市值`,
        value: listedMcapLeader?.displayNameZh,
        note: listedMcapLeader ? `${formatListingCap(listedMcapLeader)}` : "—",
      },
      {
        label: `${label}已上市周期较快`,
        value: timingLeader ? timingLeader.displayNameZh : "样本不足",
        note: timingLeader ? `${formatDays(timingLeader.listedLifecycleAverageDays)} · 仅已上市项目` : "需至少5个已上市样本",
      },
    ];
    return cards.filter(card => card.value)
      .map(
        (card) => `<article class="metric-card">
          <span>${escapeHtml(card.label)}</span>
          <strong>${escapeHtml(card.value)}</strong>
          <small>${escapeHtml(card.note)}</small>
        </article>`,
      )
      .join("");
  }

  const cards = [
    {
      label: "公开申请中项目最多",
      value: activeLeader ? activeLeader.displayNameZh : "待披露",
      note: activeLeader ? `${compactCredit(activeLeader.activeCount)} 个公开A1申请中项目 · 内部pipeline不可见` : "无公开申请中样本",
    },
    {
      label: "SP公开申请负荷最高",
      value: spWorkloadLeader ? spWorkloadLeader.displayNameZh : "样本不足",
      note: spWorkloadLeader
        ? `每名SP负责 ${formatRatio(spWorkloadLeader.activeProjectsPerSponsorPrincipal)} 个公开申请中项目 · SP ${compactNumber(spWorkloadLeader.sponsorPrincipalCount, 0)} · 至少${MIN_ACTIVE_PROJECTS}个公开样本`
        : "需匹配SP且达到申请中样本门槛",
    },
    {
      label: "Rep公开申请配置最低",
      value: repLeanLeader ? repLeanLeader.displayNameZh : "样本不足",
      note: repLeanLeader
        ? `每个公开申请中项目配置 ${formatRatio(repLeanLeader.type6RepPerActiveProject)} 名Rep · Rep ${compactNumber(repLeanLeader.type6RepCount, 0)} · 至少${MIN_ACTIVE_PROJECTS}个公开样本`
        : "需匹配Rep且达到公开申请中样本门槛",
    },
    {
      label: "SP人均市值产出最高",
      value: mcapPerSpLeader?.displayNameZh,
      note: mcapPerSpLeader
        ? `每名SP对应 ${formatListingCap(mcapPerSpLeader, mcapPerSpLeader.listingMarketCapPerSponsorPrincipalHkdBn, true)} 上市日市值`
        : `需有SP人数及至少${MIN_MARKET_CAP_PROJECTS}个上市日市值样本`,
    },
    {
      label: "六号牌持牌人员人均市值产出最高",
      value: mcapPerTotalLeader?.displayNameZh,
      note: mcapPerTotalLeader
        ? `每名六号牌持牌人员对应 ${formatListingCap(mcapPerTotalLeader, mcapPerTotalLeader.listingMarketCapPerType6TotalHkdBn, true)} 上市日市值`
        : `需有六号牌人数及至少${MIN_MARKET_CAP_PROJECTS}个上市日市值样本`,
    },
    {
      label: "项目上市市值第一",
      value: listedMcapLeader?.displayNameZh,
      note: listedMcapLeader ? `${formatListingCap(listedMcapLeader)}` : "—",
    },
    {
      label: "已上市周期较快",
      value: timingLeader ? timingLeader.displayNameZh : "样本不足",
      note: timingLeader ? `${formatDays(timingLeader.listedLifecycleAverageDays)} · 仅已上市项目` : "需至少5个已上市样本",
    },
  ];
  return cards.filter(card => card.value)
    .map(
      (card) => `<article class="metric-card">
        <span>${escapeHtml(card.label)}</span>
        <strong>${escapeHtml(card.value)}</strong>
        <small>${escapeHtml(card.note)}</small>
      </article>`,
    )
    .join("");
}

function lifecycleDisplay(row) {
  if (state.stage === "applying") {
    return { main: formatDays(row.applyingElapsedAverageDays), sub: "申请至快照日平均已过时间" };
  }
  if (row.firmScope === "benchmark") {
    return {main: formatDays(row.listedLifecycleAverageDays), sub: "机构组内中位数"};
  }
  const listed = (row.facts || []).filter((fact) => fact.hkexStage === "listed");
  const n = row.listedLifecycleN || 0;
  if (n) {
    return {main: formatDays(row.listedLifecycleAverageDays), sub: "已上市项目A1到上市流程平均时间"};
  }
  if (listed.length) {
    return {main: "无可比周期", sub: ""};
  }
  return {main: "无上市项目", sub: ""};
}

function applicationBreakdown(row) {
  if (!row.activeCount || row.firmScope === "benchmark") return "";
  return Object.entries(row.applicationStatusCounts || {}).filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "zh"))
    .map(([label, count]) => `${label} ${compactCredit(count)}`).join(" · ");
}

function applicationDetails(row) {
  if (!row.activeCount || row.firmScope === "benchmark") return "";
  return Object.entries(row.applicationStatusCounts || {}).filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "zh"))
    .map(([label, count]) => `<details data-app-group="${escapeHtml(label)}" data-app-sponsor="${escapeHtml(row.sponsorId)}"><summary>${escapeHtml(label)} ${compactCredit(count)}</summary><ul></ul></details>`).join("");
}

function bindApplicationDetails(container, rows) {
  const indexed = new Map(rows.filter(Boolean).map(row => [row.sponsorId, row]));
  container.querySelectorAll("details[data-app-group]").forEach(details => {
    details.addEventListener("toggle", () => {
      if (!details.open) return;
      const row = indexed.get(details.dataset.appSponsor);
      const facts = (row?.facts || []).filter(f => f.hkexStage === "applying" && f.applicationStatusLabelZh === details.dataset.appGroup);
      details.querySelector("ul").innerHTML = facts.map(f => {
        const date = f.hkexReturnedApplication?.date || f.currentA1Date;
        return `<li>${escapeHtml(f.issuerName)}${date ? " · " + escapeHtml(date) : ""} · ${escapeHtml(f.statusLabelZh || "")}</li>`;
      }).join("");
    });
  });
}

function metricRanks(rows) {
  // Rank the metric independently of the chosen display order or search relevance.
  const key = state.metric;
  const canonical = (value) => ["projectCount", "activeCount", "listedCount", "ahCount"].includes(key)
    ? Number(value.toFixed(10)) : value;
  const values = rows.filter((row) => row.firmScope !== "rollup" && !missingSortValue(row, key, metricValue(row, key)))
    .map((row) => canonical(metricValue(row, key))).sort((a, b) => metricSortAsc(key) ? a - b : b - a);
  const positions = new Map();
  if (key.startsWith("listingMarketCap") && hasPartialListingValue(rows)) {
    return new Map(rows.map(row => [row.sponsorId, "—"]));
  }
  values.forEach((value, i) => { if (!positions.has(value)) positions.set(value, i + 1); });
  return new Map(rows.map((row) => {
    const value = metricValue(row, key);
    const rank = row.firmScope !== "rollup" && isNumber(value) ? positions.get(canonical(value)) : null;
    return [row.sponsorId, rank ? `#${rank}` : "—"];
  }));
}

function rowHtml(row, rank, showMarketCap) {
  const primary = metricDisplay(row);
  const marketCap = marketCapDisplay(row);
  const type6 = capacityDisplay(row);
  const lifecycle = lifecycleDisplay(row);
  const marketCapCell = showMarketCap
    ? `<td data-label="${escapeHtml(marketCapHeaderText())}"><span class="number">${escapeHtml(marketCap.main)}</span></td>`
    : "";
  const scopePill =
    row.firmScope === "rollup"
      ? '<span class="pill amber">合并口径</span>'
      : "";
  const industries = row.topIndustries?.length
    ? row.topIndustries.map((tag) => `<span class="pill">${escapeHtml(tag)}</span>`).join("")
    : '<span class="pill">待披露</span>';
  const typePills = [
    row.ahCount > 0 ? `A+H ${compactCredit(row.ahCount)}` : "",
    row.hShareCount > 0 ? `H股 ${compactCredit(row.hShareCount)}` : "",
    row.redChipCount > 0 ? `红筹 ${compactCredit(row.redChipCount)}` : "",
    row.deSpacCount > 0 ? `De-SPAC ${compactCredit(row.deSpacCount)}` : "",
    row.hdrCount > 0 ? `HDR ${compactCredit(row.hdrCount)}` : "",
    row.otherIssuerTypeCount > 0 ? `其他 ${compactCredit(row.otherIssuerTypeCount)}` : "",
  ]
    .filter(Boolean)
    .map((label) => `<span class="pill teal">${escapeHtml(label)}</span>`)
    .join("");
  return `<tr class="clickable-row" data-sponsor="${escapeHtml(row.sponsorId)}">
    <td data-label="排名" class="rank">${escapeHtml(rank)}</td>
    <td data-label="保荐人" class="sponsor-cell">
      <button type="button" aria-label="查看${escapeHtml(row.displayNameZh)}详情">${escapeHtml(row.displayNameZh)}</button>
      <small>${escapeHtml(row.displayNameEn)}</small>
      <span class="row-action">查看详情</span>
      ${scopePill}
    </td>
    <td data-label="性质"><span class="pill teal">${escapeHtml(row.sponsorNature || "待核")}</span></td>
    <td data-label="SP / 六号牌"><span class="number">${escapeHtml(type6.main)}</span><span class="sub-number">${escapeHtml(type6.sub)}</span></td>
    <td data-label="项目"><span class="number">${compactCredit(row.projectCount)}</span><span class="sub-number">${typePills}</span></td>
    <td data-label="申请中"><span class="number">${compactCredit(row.activeCount)}</span></td>
    <td data-label="已上市"><span class="number">${compactCredit(row.listedCount)}</span></td>
    <td data-label="A+H"><span class="number">${compactCredit(row.ahCount)}</span></td>
    <td data-label="排名指标"><span class="number">${escapeHtml(primary.main)}</span></td>
    ${marketCapCell}
    <td data-label="${escapeHtml(lifecycleHeaderText())}"><span class="number">${escapeHtml(lifecycle.main)}</span><span class="sub-number">${escapeHtml(lifecycle.sub)}</span></td>
    <td data-label="行业">${industries}</td>
  </tr>`;
}

function render() {
  if (!state.data) return;
  const facts = creditedFacts(filteredFacts());
  const rows = aggregateFacts(facts);
  const showMarketCap = shouldShowMarketCap(rows);
  state.activeFacts = facts;
  state.activeRows = rows;
  els.metricStrip.innerHTML = metricCards(rows);
  els.primaryMetricHead.querySelector(".sl-th-label").textContent = metricLabels[state.metric] || "排名指标";
  els.marketCapHead.hidden = !showMarketCap;
  els.marketCapHead.querySelector(".sl-th-label").textContent = marketCapHeaderText();
  if (els.lifecycleHead) {
    els.lifecycleHead.querySelector(".sl-th-label").textContent = lifecycleHeaderText();
    els.lifecycleHead.title = lifecycleHeaderTitle();
  }
  els.resultHint.textContent = `${compactNumber(rows.length)} 家保荐人/合并口径 · ${creditLabels[state.credit]}`;
  if (!rows.length) {
    els.leaderboardRows.innerHTML = `<tr><td colspan="${showMarketCap ? 12 : 11}" class="empty-state">没有符合条件的样本</td></tr>`;
    return;
  }
  const ranks = metricRanks(rows);
  els.leaderboardRows.innerHTML = rows.map((row) => rowHtml(row, ranks.get(row.sponsorId), showMarketCap)).join("");
  els.leaderboardRows.querySelectorAll("tr[data-sponsor]").forEach((row) => {
    row.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a, details[data-app-group]")) return;
      openDrawer(row.dataset.sponsor);
    });
  });
}

function pkMetricRows(rowA, rowB) {
  const metrics = [
    { label: "项目总数 / Total deals", key: "projectCount", value: (row) => row.projectCount, format: compactCredit, higher: true, note: "规模口径 / Scale" },
    { label: "公开申请中项目 / Public active deals", key: "activeCount", value: (row) => row.activeCount, format: compactCredit, higher: true, note: "按追踪表申请中分类", coverage: applicationBreakdown },
    { label: "已上市项目 / Listed deals", key: "listedCount", value: (row) => row.listedCount, format: compactCredit, higher: true, note: "完成项目 / Completed listings" },
    { label: "A+H项目 / A+H deals", key: "ahCount", value: (row) => row.ahCount, format: compactCredit, higher: true, note: "A+H覆盖 / A+H coverage" },
    { label: "SP人数 / Sponsor principals", key: "sponsorPrincipalCount", value: (row) => row.sponsorPrincipalCount, format: (value) => (isNumber(value) ? `${compactNumber(value, 0)}人` : "待披露"), higher: true, note: "容量口径 / Capacity" },
    {
      label: "每名SP负责公开申请中项目 / Public active deals per SP",
      key: "activeProjectsPerSponsorPrincipal",
      value: (row) => row.activeProjectsPerSponsorPrincipal,
      format: (value) => (isNumber(value) ? `${formatRatio(value)}个/SP` : "待披露"),
      higher: true,
      note: "公开样本旁证 / Public disclosure indicator",
    },
    {
      label: "每个公开申请中项目配置Rep / Rep per public active deal",
      key: "type6RepPerActiveProject",
      value: (row) => row.type6RepPerActiveProject,
      format: (value) => (isNumber(value) ? `${formatRatio(value)}名/项目` : "待披露"),
      higher: null,
      note: "执行配置 / Execution staffing",
    },
    {
      label: "申请中A+H A股估值 / Applying A+H A-share valuation",
      key: "applyingAhMarketCapRmbBnSum",
      value: (row) => row.applyingAhMarketCapRmbBnSum,
      format: (value, row) => formatAShareCap(row, "applyingAhMarketCap"),
      higher: true,
      note: "A股收盘价与股本 / A-share closing price and share capital",
    },
    {
      label: metricLabels.listingMarketCapHkdBnSum,
      key: "listingMarketCapHkdBnSum",
      value: (row) => row.listingMarketCapHkdBnSum,
      format: (value, row) => formatListingCap(row, value),
      higher: true,
      note: "上市日全部普通股市值 / Total ordinary equity value at listing",
    },
    {
      label: metricLabels.listingMarketCapPerSponsorPrincipalHkdBn,
      key: "listingMarketCapPerSponsorPrincipalHkdBn",
      value: (row) => row.listingMarketCapPerSponsorPrincipalHkdBn,
      format: (value, row) => formatListingCap(row, value, true),
      higher: true,
      note: "人均上市市值 / Listing value per person",
    },
    {
      label: metricLabels.listingMarketCapPerType6TotalHkdBn,
      key: "listingMarketCapPerType6TotalHkdBn",
      value: (row) => row.listingMarketCapPerType6TotalHkdBn,
      format: (value, row) => formatListingCap(row, value, true),
      higher: true,
      note: "人均上市市值 / Listing value per person",
    },
    { label: "A1→接收中位数 / A1 to receipt", key: "receivedCycleMedianDays", value: (row) => row.receivedCycleMedianDays, format: (value, row) => formatDays(value, row.receivedCycleN), higher: false, note: "已接收样本 / Received sample" },
    { label: "A1→通知中位数 / A1 to notice", key: "noticeCycleMedianDays", value: (row) => row.noticeCycleMedianDays, format: (value, row) => formatDays(value, row.noticeCycleN), higher: false, note: "已通知样本 / Notice-issued sample" },
    { label: "A1→上市平均时间 / Average A1-to-listing", key: "listedLifecycleAverageDays", value: (row) => row.listedLifecycleAverageDays, format: (value, row) => isNumber(value) ? formatDays(value) : row.listedCount ? "无可比周期" : "无上市项目", higher: false, note: "仅已上市项目 / Listed deals only" },
  ];
  const visibleMetrics = state.sector === "all" ? metrics : metrics.filter((metric) => SECTOR_METRIC_KEYS.has(metric.key));
  return visibleMetrics.map((metric) => ({
    ...metric,
    a: metric.value(rowA),
    b: metric.value(rowB),
  }));
}

function pkWinnerClass(metric, side) {
  const av = metric.a;
  const bv = metric.b;
  if (typeof metric.higher !== "boolean" || !isNumber(av) || !isNumber(bv) || av === bv) return "";
  const aWins = metric.higher ? av > bv : av < bv;
  return (side === "a" && aWins) || (side === "b" && !aWins) ? " is-winner" : "";
}

function pkBarStyle(metric, side) {
  const value = side === "a" ? metric.a : metric.b;
  const other = side === "a" ? metric.b : metric.a;
  if (!isNumber(value) || !isNumber(other)) return "";
  const max = Math.max(Math.abs(value), Math.abs(other), 0.0001);
  const rawPct = (Math.abs(value) / max) * 100;
  const pct = value === 0 ? 0 : Math.max(8, Math.min(100, rawPct));
  return `style="--spk-bar:${pct.toFixed(1)}%"`;
}

function renderSponsorOwnership(row) {
  const disclosure = row.ownershipDisclosure;
  if (!disclosure) return "";
  const source = disclosure.source;
  if (!source || !/^https:\/\/www1?\.hkexnews\.hk\/listedco\/listconews\/(sehk|gem)\/\d{4}\/\d{4}\/\d+(_c)?\.pdf$/.test(source.url)) return "";
  const page = source.pdfPages?.[0];
  if (!Number.isInteger(page) || page < 1) return "";
  return `<p>${escapeHtml(disclosure.detailZh)} <a href="${escapeHtml(source.url)}#page=${page}" target="_blank" rel="noreferrer">股权披露 · ${escapeHtml(source.documentDate)} · PDF 第${page}页</a></p>`;
}

function renderPkCard(row, sideLabel) {
  if (!row) {
    return `<article class="spk-card"><span>${escapeHtml(sideLabel)}</span><strong>待选择</strong></article>`;
  }
  const capacity = capacityDisplay(row);
  const note = row.firmScope === "benchmark"
    ? row.benchmarkNote || "组内中位数"
    : row.firmScope === "rollup"
      ? `${row.displayNameEn} · 合并口径`
    : row.emptyFilter
      ? `${row.displayNameEn} · 当前筛选暂无样本`
      : `${row.displayNameEn} · ${row.sponsorNature || "待核"}`;
  return `<article class="spk-card">
    <span>${escapeHtml(sideLabel)}</span>
    <strong>${escapeHtml(row.displayNameZh)}</strong>
    <small>${escapeHtml(note)}</small>
    <div class="spk-card-grid">
      <div><b>${compactCredit(row.projectCount)}</b><span>项目</span></div>
      <div><b>${compactCredit(row.activeCount)}</b><span>申请中</span></div>
      <div><b>${compactCredit(row.listedCount)}</b><span>已上市</span></div>
      <div><b>${escapeHtml(capacity.main)}</b><span>${escapeHtml(capacity.sub)}</span></div>
    </div>
  </article>`;
}

function renderPkMetric(metric, rowA, rowB) {
  return `<article class="spk-metric-row">
    <div class="spk-metric-side${pkWinnerClass(metric, "a")}" ${pkBarStyle(metric, "a")}>
      <span>${escapeHtml(rowA.displayNameZh)}</span>
      <b>${escapeHtml(metric.format(metric.a, rowA))}</b>
      ${metric.coverage ? `<small class="market-cap-coverage">${metric.key === "activeCount" ? applicationDetails(rowA) : escapeHtml(metric.coverage(rowA))}</small>` : ""}
      <i aria-hidden="true"></i>
    </div>
    <div class="spk-metric-name">
      <strong>${escapeHtml(metric.label)}</strong>
      <span>${escapeHtml(metric.note || (metric.higher ? "规模口径 / Scale" : "周期较短 / Shorter cycle"))}</span>
    </div>
    <div class="spk-metric-side${pkWinnerClass(metric, "b")}" ${pkBarStyle(metric, "b")}>
      <span>${escapeHtml(rowB.displayNameZh)}</span>
      <b>${escapeHtml(metric.format(metric.b, rowB))}</b>
      ${metric.coverage ? `<small class="market-cap-coverage">${metric.key === "activeCount" ? applicationDetails(rowB) : escapeHtml(metric.coverage(rowB))}</small>` : ""}
      <i aria-hidden="true"></i>
    </div>
  </article>`;
}

function populatePkOptions(rows) {
  if (!pkRoot || !pkEls.sponsorA || !pkEls.sponsorB) return;
  const benchmarkOptions = rows
    .filter((row) => row.firmScope === "benchmark")
    .map((row) => `<option value="${escapeHtml(row.sponsorId)}">${escapeHtml(row.displayNameZh)} · ${escapeHtml(row.displayNameEn)}</option>`)
    .join("");
  const firmOptions = rows
    .filter((row) => row.firmScope !== "benchmark")
    .sort((a, b) => b.projectCount - a.projectCount || String(a.displayNameZh).localeCompare(String(b.displayNameZh), "zh-Hans"))
    .map((row) => {
      const scope = row.firmScope === "rollup" ? " · 合并口径" : "";
      return `<option value="${escapeHtml(row.sponsorId)}">${escapeHtml(row.displayNameZh)} · ${escapeHtml(row.displayNameEn)}${scope}</option>`;
    })
    .join("");
  const options = `${benchmarkOptions ? `<optgroup label="市场基准">${benchmarkOptions}</optgroup>` : ""}<optgroup label="保荐人">${firmOptions}</optgroup>`;
  pkEls.sponsorA.innerHTML = options;
  pkEls.sponsorB.innerHTML = options;
  const defaultA = rows.find((row) => row.sponsorId === "cicc") || rows.find((row) => row.firmScope !== "benchmark") || rows[0];
  const defaultB = rows.find((row) => row.sponsorId === `${BENCHMARK_PREFIX}all`) || rows.find((row) => row.sponsorId === "citic") || rows.find((row) => row.sponsorId !== defaultA?.sponsorId) || rows[1];
  pkState.sponsorA = pkState.sponsorA || defaultA?.sponsorId || "";
  pkState.sponsorB = pkState.sponsorB || defaultB?.sponsorId || "";
  pkEls.sponsorA.value = pkState.sponsorA;
  pkEls.sponsorB.value = pkState.sponsorB;
  pkEls.creditSelect.value = pkState.credit;
}

function renderPk() {
  if (!state.data || !pkRoot || !pkEls.versus || !pkEls.metrics) return;
  const scopedFacts = pkFilteredFacts();
  const rows = aggregateFactsForCredit(scopedFacts, pkState.credit);
  const comparisonRows = rowsWithBenchmarks(rows);
  // Keep sponsors selectable even when this credit mode gives them no deals.
  const optionRows = aggregateFactsForCredit(pkOptionFacts(), "creditAllFull");
  const selectorRows = [...benchmarkRows(rows), ...optionRows];
  populatePkOptions(selectorRows);
  const rowA = pkComparableRow(pkState.sponsorA, comparisonRows, selectorRows) || comparisonRows.find((row) => row.firmScope !== "benchmark") || selectorRows.find((row) => row.firmScope !== "benchmark") || comparisonRows[0] || selectorRows[0];
  const rowB = pkComparableRow(pkState.sponsorB, comparisonRows, selectorRows) || comparisonRows.find((row) => row.sponsorId === `${BENCHMARK_PREFIX}all`) || comparisonRows.find((row) => row.sponsorId !== rowA?.sponsorId) || selectorRows.find((row) => row.sponsorId !== rowA?.sponsorId) || comparisonRows[1] || selectorRows[1] || rowA;
  if (!rowA || !rowB) {
    if (pkEls.cardA) {
      pkEls.cardA.innerHTML = '<div class="empty-state">该时间范围暂无可比较样本 / No comparable sample in this date range</div>';
    }
    if (pkEls.cardB) pkEls.cardB.innerHTML = "";
    pkEls.metrics.innerHTML = "";
    return;
  }
  pkState.sponsorA = rowA.sponsorId;
  pkState.sponsorB = rowB.sponsorId;
  pkEls.sponsorA.value = pkState.sponsorA;
  pkEls.sponsorB.value = pkState.sponsorB;
  pkEls.creditLabel.textContent = creditLabels[pkState.credit] || "具名全部计入";
  const sourceDate = state.data.meta?.sourceGeneratedAt || state.data.meta?.generatedAt || "待披露";
  const sectorNote = state.sector === "all" ? "" : " 赛道比较只按项目行业标签重聚合，不推断人员在各行业的内部分布。";
  pkEls.sourceNote.textContent = `同源龙虎榜快照 · ${scopeLabel()} · 基准项按组内中位数显示，避免头部项目拉高均值。申请中沿用追踪表分类，包括部分港交所已失效或撤回的申请。${sectorNote} 特殊路径剔除沿用监管节奏追踪。快照 ${sourceDate}。`;
  if (pkEls.cardA) pkEls.cardA.innerHTML = renderPkCard(rowA, "左侧");
  if (pkEls.cardB) pkEls.cardB.innerHTML = renderPkCard(rowB, "右侧");
  pkEls.metrics.innerHTML = pkMetricRows(rowA, rowB).map((metric) => renderPkMetric(metric, rowA, rowB)).join("");
  bindApplicationDetails(pkEls.metrics, [rowA, rowB]);
}

function drawerStats(row) {
  const cycleSummary = [
    row.receivedCycleN ? `接收 ${formatDays(row.receivedCycleMedianDays, row.receivedCycleN)}` : "",
    row.noticeCycleN ? `通知 ${formatDays(row.noticeCycleMedianDays, row.noticeCycleN)}` : "",
    row.listedLifecycleN ? `上市 ${formatDays(row.listedLifecycleAverageDays)}` : "",
  ]
    .filter(Boolean)
    .join(" · ");
  return [
    ["项目数", compactCredit(row.projectCount)],
    ["公开申请中项目", compactCredit(row.activeCount)],
    ["已上市项目", compactCredit(row.listedCount)],
    ["A+H项目", compactCredit(row.ahCount)],
    ["SP人数", isNumber(row.sponsorPrincipalCount) ? `${compactNumber(row.sponsorPrincipalCount, 0)}人` : row.currentSponsorRegister?.registerStatus === "not_listed" ? "未列现行保荐人名册" : "无对应记录"],
    ["六号牌人数", isNumber(row.type6TotalCount) ? `${compactNumber(row.type6TotalCount, 0)}人` : "待接入"],
    ["每名SP负责公开申请中", isNumber(row.activeProjectsPerSponsorPrincipal) ? `${formatRatio(row.activeProjectsPerSponsorPrincipal)}个` : "待披露"],
    ["每个公开申请中项目配置Rep", isNumber(row.type6RepPerActiveProject) ? `${formatRatio(row.type6RepPerActiveProject)}名/项目` : "待披露"],
    [metricLabels.listingMarketCapPerSponsorPrincipalHkdBn, formatListingCap(row, row.listingMarketCapPerSponsorPrincipalHkdBn, true)],
    [metricLabels.listingMarketCapPerType6TotalHkdBn, formatListingCap(row, row.listingMarketCapPerType6TotalHkdBn, true)],
    [metricLabels.listingMarketCapHkdBnSum, formatListingCap(row)],
    [metricLabels.aShareMarketCapRmbBnSum, formatAShareCap(row)],
    ["流程时间", cycleSummary || "待披露"],
    ["申请中平均已过", formatDays(row.applyingElapsedAverageDays)],
  ]
    .map(
      ([label, value]) => `<div class="drawer-stat">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(value)}</strong>
      </div>`,
    )
    .join("");
}

function hasCjk(value) {
  return /[\u3400-\u9fff]/.test(String(value || ""));
}

function issuerPrimaryName(fact) {
  if (hasCjk(fact.csrcName)) return fact.csrcName;
  if (hasCjk(fact.hkexListingCompanyName)) return fact.hkexListingCompanyName;
  return fact.issuerName || fact.csrcName || "未命名项目";
}

function issuerShadowName(fact) {
  const primary = issuerPrimaryName(fact);
  const candidates = [fact.issuerName, fact.hkexListingCompanyName, fact.csrcName].filter(Boolean);
  return candidates.find((name) => name !== primary && !hasCjk(name)) || "";
}

function valuationEvidenceLinks(references) {
  const seen = new Set();
  return references.filter(([, evidence]) => {
    const url = evidence?.sourceUrl;
    if (typeof url !== "string" || !/^https?:\/\//i.test(url) || seen.has(url)) return false;
    seen.add(url);
    return true;
  }).map(([label, evidence]) => `<a class="source-link" href="${escapeHtml(evidence.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`).join(" · ");
}

function listingComponentDetails(provenance) {
  const components = Array.isArray(provenance.components)
    ? provenance.components.filter((item) => item && typeof item === "object" && !Array.isArray(item)) : [];
  const positiveInput = (value) => (typeof value === "number" || (typeof value === "string" && value.trim()))
    && Number.isFinite(Number(value)) && Number(value) > 0 ? String(value) : "—";
  const detailLine = (text, links = "") => `<small class="market-cap-detail">${escapeHtml(text)}${links ? ` · ${links}` : ""}</small>`;
  const lines = [detailLine(`估值锚定日 ${provenance.anchorDate || "—"}`,
    valuationEvidenceLinks([["股类依据 / Share-class evidence", provenance.coverageEvidence]]))];
  if (!components.length) lines.push(detailLine("未取得上市日各类股份的完整估值"));
  const shareClasses = new Map([["A", "A股"], ["H", "H股"], ["ordinary", "普通股 / Ordinary shares"]]);
  for (const component of components) {
    const shareClass = shareClasses.get(component.class) || component.class || "股类—";
    const details = [
      `${shareClass} ${component.securityCode || "代码—"}`,
      `收盘价 / Close ${component.priceCurrency || "币种—"} ${positiveInput(component.price)}`,
      `价格日 / Price date ${component.priceDate || "—"}`,
      `${component.sharesStatus === "estimate" ? "估值采用股数 / Shares used" : "股数（不含库存股） / Shares ex treasury"} ${positiveInput(component.sharesExTreasury)}`,
      `股本日 / Share date ${component.sharesAsOf || "—"}`,
    ];
    if (component.priceStatus === "verified"
        && component.priceDatePolicy === "latest_exchange_session_on_or_before_valuation_date") {
      details.push("估值日或之前最近交易日收盘价 / Latest exchange close on or before valuation date");
    }
    if (component.priceStatus !== "verified") details.push("缺少当日收盘价 / Close unavailable");
    if (!["verified","estimate"].includes(component.sharesStatus)) details.push("缺少当日股本 / Shares unavailable");
    const calendarEvidence = Array.isArray(component.priceCalendarEvidence) ? component.priceCalendarEvidence : [];
    const links = valuationEvidenceLinks([["价格来源 / Price source", component.priceEvidence],
      ["股本来源 / Share source", component.sharesEvidence],
      ...calendarEvidence.map((evidence) => ["交易日依据 / Exchange calendar", evidence])]);
    lines.push(detailLine(details.join(" · "), links));
  }
  if (Array.isArray(provenance.corroboratingSources) && provenance.corroboratingSources.length) {
    lines.push(detailLine("上市股本佐证 / Listing capital", valuationEvidenceLinks(
      provenance.corroboratingSources.map((source) => [source.publishedDate || "文件 / Filing", source]))));
  }
  const fx = provenance.fx && typeof provenance.fx === "object" && !Array.isArray(provenance.fx) ? provenance.fx : null;
  if (fx || components.some((component) => component.class === "A")) {
    const text = `汇率 / FX ${fx?.baseCurrency || "—"}/${fx?.quoteCurrency || "—"} ${positiveInput(fx?.rate)} · 汇率日 / FX date ${fx?.date || "—"}`;
    lines.push(detailLine(text, valuationEvidenceLinks([["汇率来源 / FX source", fx?.evidence], ["汇率单位 / FX units", fx?.unitEvidence]])));
  }
  return lines.join("\n");
}

function projectMarketCapDetail(fact, kind) {
  const listing = kind === "listing";
  const observation = marketCapObservation(fact, kind);
  const {provenance, status, value} = observation;
  const label = listing ? metricLabels.listingMarketCapHkdBnSum : metricLabels.aShareMarketCapRmbBnSum;
  const currency = listing ? "HK$" : "¥";
  if (value === null) {
    const quote = listing ? fact.hkListingSessionClose : null;
    if (!quote) return "";
    return `<div class="market-cap-detail">港股收市价 HK$${escapeHtml(quote.price)} · ${escapeHtml(quote.priceDate)} · ${valuationEvidenceLinks([["行情来源", quote]])}</div>`;
  }
  const amount = formatCap(value, currency);
  if (listing && (provenance.version === 2 || Array.isArray(provenance.components))) {
    return `<small class="market-cap-detail">${escapeHtml(label)}：${escapeHtml(amount)}</small>
      ${listingComponentDetails(provenance)}`;
  }
  const details = [
    `估值锚定日 ${provenance.anchorDate || fact[`${kind}MarketCapAnchorDate`] || "—"}`,
    `价格日 ${provenance.priceDate || fact[`${kind}MarketCapTradeDate`] || "—"}`,
    `股本日 ${provenance.sharesAsOf || "—"}`,
  ];
  if (provenance.priceCurrency) details.push(`价格币种 ${provenance.priceCurrency}`);
  if (listing && (fact.isAH || provenance.fxDate || isNumber(provenance.fxRate))) {
    details.push(`汇率 ${isNumber(provenance.fxRate) && provenance.fxRate > 0 ? provenance.fxRate : "—"} · 汇率日 ${provenance.fxDate || "—"}`);
  }
  const scopeLabels = {
    unverified_share_basis_at_hk_price: "港股价格 × 未核实类别股本",
    unverified_share_basis_at_a_price: "A股价格 × 未核实类别股本",
  };
  if (scopeLabels[provenance.scope]) details.push(scopeLabels[provenance.scope]);
  if (status === "verified" && listing && fact.isAH) details.push("A/H同日分别估值后折算港元合计");
  details.push(`价格来源 ${provenance.priceSource || "未提供"}`, `股本来源 ${provenance.sharesSource || "未提供"}`);
  if (provenance.retrievedAt) details.push(`获取日 ${provenance.retrievedAt}`);
  const links = [["价格来源", provenance.priceSourceUrl], ["股本来源", provenance.sharesSourceUrl]]
    .filter(([, url]) => /^https?:\/\//i.test(url || ""))
    .map(([name, url]) => `<a class="source-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(name)}</a>`)
    .join(" · ");
  return `<small class="market-cap-detail">${escapeHtml(label)}：${escapeHtml(amount)}</small>
    <small class="market-cap-detail">${escapeHtml(details.join(" · "))}${links ? ` · ${links}` : ""}</small>`;
}

function sponsorSourceLink(link) {
  link = link || {};
  const secondary = secondarySourceNote(link.url);
  const label = escapeHtml(link.label || "来源 / Source") + secondary;
  if (link.availability === "unavailable") {
    return `<span class="source-link">${label} · 链接不可用 / Unavailable</span>`;
  }
  if (!/^https?:\/\//.test(link.url || "")) {
    return `<span class="source-link">${label} · 暂无链接 / URL unavailable</span>`;
  }
  const note = link.availability === "relocated" && !secondary ? " · 官方存档 / Archive"
    : link.availability && link.availability !== "available" && !link.availabilityNote ? " · 待复核 / Pending verification" : "";
  return `<a class="source-link" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${label}${note}</a>`;
}

function projectLine(fact) {
  const timing = factLifecycleTiming(fact);
  const timingValue = timing.kind === "excluded" ? "统计剔除" : formatDays(timing.days);
  const timingReason = timing.reason ? ` · ${timing.reason}` : "";
  const clock = fact.listingTiming;
  const cycleDetails = [];
  const firstA1 = clock?.firstA1Date || clock?.firstPublicA1Date;
  if (firstA1 && clock.listingDate && isNumber(clock.firstToListingDays)) {
    cycleDetails.push(`最早有记录的A1 ${firstA1} → 上市 ${clock.listingDate} · ${formatDays(clock.firstToListingDays)}`);
  }
  if (clock?.successfulCycleA1Date && clock.successfulCycleA1Date !== firstA1 && isNumber(clock.successfulCycleToListingDays)) {
    cycleDetails.push(`成功上市的申请轮次 ${clock.successfulCycleA1Date} → ${clock.listingDate} · ${formatDays(clock.successfulCycleToListingDays)}`);
  }
  const cycleSources = [["最早有记录的A1", clock?.firstSourceUrl], ["上市轮次A1", clock?.successfulCycleSourceUrl]]
    .filter((item, index, items) => item[1] && items.findIndex((v) => v[1] === item[1]) === index)
    .map(([label, url]) => sponsorSourceLink({label, url}));
  const primaryName = issuerPrimaryName(fact);
  const shadowName = issuerShadowName(fact);
  const isCompletedRto = fact.specialListingRoute === "rto" && fact.hkexStage === "listed";
  const completionDate = isCompletedRto ? completedRtoDate(fact) : "";
  const listingDateText = isCompletedRto && !fact.listingDate ? ""
    : ` · ${isCompletedRto ? "首次IPO上市 / Initial IPO listing" : "上市"} ${escapeHtml(formatDate(fact.listingDate))}`;
  const completionSource = (fact.sourceLinks || []).find((link) => (link?.originalUrl || link?.url) === fact.transactionCompletionSourceUrl)
    || {label: "完成公告 / Completion announcement", url: fact.transactionCompletionSourceUrl};
  const completionLine = isCompletedRto
    ? `<small>反向收购完成 / RTO completion ${escapeHtml(formatDate(completionDate))}${completionDate
      ? ` · ${sponsorSourceLink(completionSource)}` : ""}</small>` : "";
  const industryTags = fact.industryTags?.length ? fact.industryTags : fact.csrcIndustryTags || [];
  const sourceLinks = (fact.sourceLinks || [])
    .slice(0, 3)
    .map(sponsorSourceLink)
    .join("");
  return `<article class="deal-item">
    <strong>${escapeHtml(primaryName)}${fact.hkexListingStockCode ? ` · ${escapeHtml(fact.hkexListingStockCode)}` : ""}</strong>
    ${shadowName ? `<small class="shadow-name">${escapeHtml(shadowName)}</small>` : ""}
    <small>
      ${escapeHtml(fact.applicationStatusLabelZh || fact.hkexPublicStatus || "未见港交所申请状态")}${fact.hkexReturnedApplication?.date ? " · " + escapeHtml(fact.hkexReturnedApplication.date) : ""} · 备案 ${escapeHtml(fact.statusLabelZh || fact.status || "待核")} · ${escapeHtml(fact.issuerType || "类型待核")} ·
      首次 A1 ${escapeHtml(formatDate(fact.a1Date))}${fact.currentA1Date && fact.currentA1Date !== fact.a1Date ? ` · 最近 A1 ${escapeHtml(fact.currentA1Date)}` : ""} · ${fact.noticeDateBasis === "reverse_takeover_signature_date" ? "反向收购备案通知" : fact.noticeSupersededByCurrentFiling ? "历史通知 / Historical notice" : "通知"} ${fact.noticeDate ? escapeHtml(formatDate(fact.noticeDate)) : fact.csrcFilingRequired === false ? "无需备案" : "未见备案通知书"}${listingDateText}
    </small>
    <small>本行计入的保荐机构 · ${escapeHtml((fact.sourceSponsorLegalNames || fact.sponsorLegalNames || []).join(" / ") || fact.sponsorLegalName)}</small>
    ${completionLine}
    <small>${escapeHtml(timing.label)}：${escapeHtml(timingValue)}${escapeHtml(timingReason)}</small>
    ${cycleDetails.map((line) => `<small>${escapeHtml(line)}</small>`).join("")}
    ${cycleSources.length ? `<small>${cycleSources.join(" · ")}</small>` : ""}
    ${fact.hkexStage === "listed" || marketCapObservation(fact, "listing").estimateValue !== null ? projectMarketCapDetail(fact, "listing") : ""}
    ${fact.isAH || marketCapObservation(fact, "aShare").estimateValue !== null ? projectMarketCapDetail(fact, "aShare") : ""}
    <small>
      ${escapeHtml(industryTags.slice(0, 4).join(" / ") || fact.industryDisplayLabel || "行业待披露")}
      ${sourceLinks ? ` · ${sourceLinks}` : ""}
    </small>
  </article>`;
}

function capacitySourcePills(row, field) {
  const pill = s => '<span class="pill">' + escapeHtml(s) + '</span>';
  const names = [...new Set(row[field + "SourceFirmNames"] || [])].map(pill);
  const evidence = [...(row[field + "InstitutionEvidence"] || []), ...(row[field + "InstitutionSources"] || [])];
  // Names and URLs are independently deduplicated; an index is not an entity binding.
  const sources = [...new Set(row[field + "SourceUrls"] || [])].map(raw => {
    let u;
    try { u = new URL(raw); } catch { return pill("来源未核实 / Source unverified"); }
    const bound = evidence.filter(s => s.sourceUrl === raw || s.sourceUrls?.includes(raw));
    const date = bound.length ? "截至 / As of " + capacityDates(null, bound.map(s => s.asOfDate))
      : "组内来源日期 / Group source dates: " + capacityDates(row[field + "AsOfDate"], row[field + "SourceDates"]);
    const official = field === "type6" && /^https:\/\/apps\.sfc\.hk\/publicregWeb\/corp\/([A-Z]{3}\d{3})\/(ro|rep)$/.exec(raw);
    let label;
    if (field === "sponsorPrincipal" && bound.some(s => s.source === "sfc_sponsor_principal_roster") &&
        /^https:\/\/apps\.sfc\.hk\/publicregWeb\/corp\/[A-Z]{3}\d{3}\/details$/.test(raw)) {
      label = "证监会保荐人主要人员名册 / SFC register";
    } else if (official) {
      label = "证监会机构名册 / SFC corporate register · " + official[1] + " " + official[2].toUpperCase();
    } else if (u.origin === "https://webbsite.0xmd.com" && !u.username && !u.password) {
      label = "同事整理的第三方镜像 / Colleague-compiled third-party mirror (Webb / 0xmd)";
    } else if (field === "sponsorPrincipal" && (bound.some(s => s.source === "sfc_sponsor_principal_register_mirror") ||
        u.protocol === "https:" && u.hostname.endsWith(".ok.kimi.link"))) {
      // A shared mirror landing page is not a firm-specific register entry.
      return pill("同事整理的第三方镜像 / Colleague-compiled third-party mirror · " + date);
    } else {
      return pill("来源未核实 / Source unverified · " + date);
    }
    return '<a class="pill" href="' + escapeHtml(raw) + '" target="_blank" rel="noopener noreferrer">' +
      escapeHtml(label + " · " + date) + '</a>';
  });
  return names.concat(sources).join("");
}

function openDrawer(sponsorId) {
  const row = state.activeRows.find((item) => item.sponsorId === sponsorId);
  if (!row) return;
  const facts = [...row.facts].sort((a, b) => {
    const ad = a.listingDate || a.noticeDate || a.a1Date || "";
    const bd = b.listingDate || b.noticeDate || b.a1Date || "";
    return bd.localeCompare(ad);
  });
  const registration = row.registeredEntity;
  const registerLink = registration ? `<a class="pill" href="https://apps.sfc.hk/publicregWeb/corp/${encodeURIComponent(registration.ce)}/details" target="_blank" rel="noopener noreferrer">${escapeHtml(registration.legalNameZh)} · SFC ${escapeHtml(registration.ce)}</a>` : "";
  const legalNames = (row.legalNames || [])
    .map((name) => `<span class="pill">${escapeHtml(name)}</span>`)
    .join("");
  const industries = (row.topIndustries || []).map((name) => `<span class="pill teal">${escapeHtml(name)}</span>`).join("");
  const principalSources = capacitySourcePills(row, "sponsorPrincipal");
  const type6Sources = capacitySourcePills(row, "type6");
  els.drawerContent.innerHTML = `<h3>${escapeHtml(row.displayNameZh)}</h3>
    <p class="drawer-subtitle">${escapeHtml(row.displayNameEn)} · ${escapeHtml(row.sponsorNature || "未披露")}</p>
    ${renderSponsorOwnership(row)}
    <div class="drawer-pills">${legalNames}${registerLink}</div>
    <div class="drawer-summary">${drawerStats(row)}</div>
    <h4>SP · ${escapeHtml(capacityDateLabel(row, true, true))}</h4>
    <div class="drawer-pills capacity-source-pills">${principalSources || '<span class="pill">未匹配 Sponsor Principal 行</span>'}</div>
    <h4>六号牌 · ${escapeHtml(capacityDateLabel(row, false))}</h4>
    <div class="drawer-pills capacity-source-pills">${type6Sources || '<span class="pill">未匹配六号牌来源 / No matched Type 6 source</span>'}</div>
    <h4>主要行业</h4>
    <div class="drawer-pills">${industries || '<span class="pill">待披露</span>'}</div>
    <h4>项目明细（${facts.length}）</h4>
    <div class="deal-list">${facts.slice(0, 40).map(projectLine).join("")}</div>
    ${facts.length > 40 ? `<details class="remaining-projects"><summary>查看其余 ${facts.length - 40} 个项目</summary><div class="deal-list"></div></details>` : ""}`;
  const remaining = els.drawerContent.querySelector(".remaining-projects");
  remaining?.addEventListener("toggle", () => {
    if (remaining.open) remaining.querySelector(".deal-list").innerHTML = facts.slice(40).map(projectLine).join("");
  }, { once: true });
  els.drawer.classList.add("is-open");
  els.drawer.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  els.drawer.classList.remove("is-open");
  els.drawer.setAttribute("aria-hidden", "true");
}

function bindControls() {
  ["searchInput", "metricSelect", "creditSelect", "stageSelect", "typeSelect", "natureSelect", "sectorSelect", "dateFieldSelect", "dateFrom", "dateTo"].forEach((id) => {
    if (id === "searchInput") {
      els[id].addEventListener("input", () => {
        window.clearTimeout(searchRenderTimer);
        searchRenderTimer = window.setTimeout(readControls, 180);
      });
    } else {
      els[id].addEventListener("change", readControls);
    }
  });
  viewRoot.querySelectorAll(".preset").forEach((button) => {
    button.addEventListener("click", () => setPreset(button.dataset.preset));
  });
  viewRoot.querySelectorAll("[data-date-quick]").forEach((button) => {
    button.addEventListener("click", () => setDateQuickRange(button.dataset.dateQuick));
  });
  viewRoot.querySelectorAll(".sl-th-sort").forEach((button) => {
    button.addEventListener("click", () => setSortFromHeader(button.dataset.sortKey));
  });
  els.clearButton.addEventListener("click", () => {
    state.search = "";
    state.metric = "projectCount";
    state.sortKey = "projectCount";
    state.sortHeaderKey = "projectCount";
    state.sortDir = null;
    state.credit = "creditAllFull";
    setPreset("all");
  });
  els.drawerBackdrop.addEventListener("click", closeDrawer);
  els.drawerClose.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDrawer();
  });
}

function bindPkControls() {
  if (!pkRoot || !pkEls.sponsorA || !pkEls.sponsorB || !pkEls.creditSelect || !pkEls.swapButton) return;
  pkEls.sponsorA.addEventListener("change", () => {
    pkState.sponsorA = pkEls.sponsorA.value;
    renderPk();
  });
  pkEls.sponsorB.addEventListener("change", () => {
    pkState.sponsorB = pkEls.sponsorB.value;
    renderPk();
  });
  pkEls.creditSelect.addEventListener("change", () => {
    pkState.credit = pkEls.creditSelect.value;
    renderPk();
  });
  [pkEls.sectorSelect, pkEls.dateFieldSelect, pkEls.dateFrom, pkEls.dateTo].forEach((element) => {
    if (element) element.addEventListener("change", readPkDateControls);
  });
  pkRoot.querySelectorAll("[data-date-quick]").forEach((button) => {
    button.addEventListener("click", () => setDateQuickRange(button.dataset.dateQuick));
  });
  pkEls.swapButton.addEventListener("click", () => {
    const previous = pkState.sponsorA;
    pkState.sponsorA = pkState.sponsorB;
    pkState.sponsorB = previous;
    renderPk();
  });
}

function cacheElements() {
  [
    "coverageText",
    "firmCount",
    "generatedAt",
    "demoNote",
    "metricStrip",
    "searchInput",
    "metricSelect",
    "creditSelect",
    "stageSelect",
    "typeSelect",
    "natureSelect",
    "sectorSelect",
    "dateFieldSelect",
    "dateFrom",
    "dateTo",
    "clearButton",
    "resultHint",
    "primaryMetricHead",
    "marketCapHead",
    "lifecycleHead",
    "leaderboardRows",
    "drawer",
    "drawerBackdrop",
    "drawerClose",
    "drawerContent",
  ].forEach((id) => {
    els[id] = $(id);
  });
}

function cachePkElements() {
  if (!pkRoot) return;
  pkEls.sponsorA = document.getElementById("spkSponsorA");
  pkEls.sponsorB = document.getElementById("spkSponsorB");
  pkEls.creditSelect = document.getElementById("spkCreditSelect");
  pkEls.swapButton = document.getElementById("spkSwapButton");
  pkEls.versus = document.getElementById("spkVersus");
  pkEls.cardA = document.getElementById("spkCardA");
  pkEls.cardB = document.getElementById("spkCardB");
  pkEls.metrics = document.getElementById("spkMetrics");
  pkEls.sourceNote = document.getElementById("spkSourceNote");
  pkEls.creditLabel = document.getElementById("spkCreditLabel");
  pkEls.sectorSelect = document.getElementById("spkSectorSelect");
  pkEls.dateFieldSelect = document.getElementById("spkDateFieldSelect");
  pkEls.dateFrom = document.getElementById("spkDateFrom");
  pkEls.dateTo = document.getElementById("spkDateTo");
}

function validatePayload(payload) {
  if (!Array.isArray(payload.firms) || !Array.isArray(payload.projectFacts)) {
    throw new Error("Sponsor demo payload missing firms/projectFacts arrays");
  }
  return payload;
}

function loadBundledData() {
  if (window.SPONSOR_LEADERBOARD_DEMO_DATA) return Promise.resolve(window.SPONSOR_LEADERBOARD_DEMO_DATA);
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = BUNDLED_DATA_URL;
    script.onload = () => resolve(window.SPONSOR_LEADERBOARD_DEMO_DATA || null);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });
}

async function loadData() {
  let payload = window.location.protocol === "file:" ? await loadBundledData() : null;
  if (!payload) {
    try {
      const response = await fetch(DATA_URL, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Failed to load ${DATA_URL}: ${response.status}`);
      payload = await response.json();
    } catch (error) {
      payload = await loadBundledData();
      if (!payload) throw error;
      console.warn(`Falling back to bundled demo data after JSON load failed: ${error.message}`);
    }
  }
  validatePayload(payload);
  state.data = payload;
}

async function init() {
  cacheElements();
  cachePkElements();
  bindControls();
  bindPkControls();
  try {
    await loadData();
    const meta = state.data.meta || {};
    els.coverageText.textContent = meta.coverageZh || "HKEX / CSRC tracker derived sponsor view";
    els.firmCount.textContent = compactNumber(meta.firmCount || state.data.firms.length, 0);
    const sourceNote = meta.sourceGeneratedAt ? ` · 源快照 ${meta.sourceGeneratedAt}` : "";
    els.generatedAt.textContent = `生成 ${meta.generatedAt || "待披露"}${sourceNote}`;
    els.demoNote.textContent = "具名全部计入时，每家保荐人各计一个项目。平分时按具名保荐人数分摊；只计首名时，项目归入文件列示的第一家。";
    populateOptions();
    syncControls();
    render();
    if (pkRoot) {
      renderPk();
    }
  } catch (error) {
    console.error(error);
    els.demoNote.textContent = `载入失败：${error.message}`;
    els.leaderboardRows.innerHTML = `<tr><td colspan="12" class="empty-state">数据载入失败，请检查本地 JSON。</td></tr>`;
  }
}

// Load the sponsor payload only when a sponsor view is opened.
let initStarted = false;

function ensureInit() {
  if (initStarted) return;
  initStarted = true;
  init();
}

if (viewRoot) {
  document.querySelectorAll('.nav-item[data-view="sponsorLeaderboard"], .nav-item[data-view="sponsorPk"]').forEach((button) => {
    button.addEventListener("click", ensureInit);
  });
  const requestedView = new URLSearchParams(window.location.search).get("view");
  if (requestedView === "sponsorLeaderboard" || requestedView === "sponsorPk") {
    ensureInit();
  }
}

})();
