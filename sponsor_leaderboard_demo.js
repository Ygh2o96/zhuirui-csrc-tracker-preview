// Sponsor leaderboard view module. Wrapped in an IIFE because it shares the
// page (and global scope) with app.js inside the integrated shell.
(() => {

const DATA_URL = "data/sponsor_leaderboard_demo.json";
const BUNDLED_DATA_URL = "data/sponsor_leaderboard_demo_data.js?v=f0770adad99ba9a6";

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
  econTotalHkdM: "总经济（保荐+估佣）",
  econPerSponsorPrincipalHkdM: "SP人均经济",
  econPerExecutionStaffHkdM: "Rep人均经济（含非SP RO）",
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
  "faTxCount",
  "econTotalHkdM",
  "econSpFeeHkdM",
  "econCommHkdM",
  "econPerSponsorPrincipalHkdM",
  "spFeePerSpHkdM",
  "commPerSpHkdM",
  "econPerExecutionStaffHkdM",
  "spFeePerExecHkdM",
  "commPerExecHkdM",
  "execStaffCount",
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
  "econTotalHkdM",
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
  if (row.firmScope === "benchmark") return "同组机构中位数";
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
  let roles = "六号牌待补";
  if (type6) {
    if (!benchmark && sp && isNumber(row.type6ROCount) && isNumber(row.type6RepCount) && row.type6ROCount >= row.sponsorPrincipalCount) {
      const nonSpRo = row.type6ROCount - row.sponsorPrincipalCount;
      roles = `六号牌 ${count(row.type6TotalCount)}（非SP RO ${count(nonSpRo)} · Rep ${count(row.type6RepCount)}）`;
    } else {
      roles = [role("六号牌", row.type6TotalCount), role("RO", row.type6ROCount), role("Rep", row.type6RepCount)].join(" / ");
    }
  }
  return { main, sub: roles };
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
  const label = perPerson ? formatCapPerPerson(value) : formatCap(value, "HK$");
  return isNumber(value) && value > 0 && row.listingMarketCapCoverage?.estimate > 0
    ? `${label} · 含估算 / Includes estimates` : label;
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
    if (fact.listingDurationSampleEligible === false || isSpecialTimingRoute(fact)) {
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
    return "截至快照日已递表时长";
  }
  const parts = [];
  if (row.listedLifecycleN) parts.push("已上市项目样本");
  if (row.lifecycleExcludedN) parts.push("常规IPO口径");
  return parts.length ? parts.join("；") : "暂无可比样本";
}

// BEGIN shared tracker timing (sync_sponsor_timing.py)
function postRegimeListingDate(date, regimeStart) {
  return Boolean(date) && String(date) >= (regimeStart || "2023-03-31");
}

function timingNoticeGap(record, listingDate, regimeStart) {
  return record.csrcFilingRequired === true && !record.noticeDate && postRegimeListingDate(listingDate, regimeStart);
}

function isSpecialTimingRoute(record) {
  return ["de_spac", "hdr", "gem_to_main_transfer", "introduction", "rto"].includes(record.specialListingRoute);
}

function timingSample(record, metric, field, currentReceiptField, stage, listingDate, regimeStart) {
  if (isSpecialTimingRoute(record)) return null;
  if (metric === "a1ToListing") {
    if (record.listingDurationSampleEligible === false) return null;
  } else {
    if (record.csrcFilingRequired !== true || record.durationSampleEligible === false) return null;
    if (record.noticeSupersededByCurrentFiling && ["a1ToNotice", "receivedToNotice"].includes(metric)) return null;
    if (timingNoticeGap(record, listingDate, regimeStart)) return null;
    if (metric === "a1ToReceived" && record.a1ReceiptTiming?.policy === "longest_verified_same_cycle") {
      const selected = record.a1ReceiptTiming[field.startsWith("business") ? "businessDays" : "calendarDays"];
      return Number.isFinite(selected) ? selected : null;
    }
    if (metric === "a1ToReceived" && stage !== "listed" && record.calendarDaysA1ToReceived > 180) {
      field = currentReceiptField;
    }
  }
  return Number.isFinite(record[field]) ? record[field] : null;
}
// END shared tracker timing

const ECON_FX_TO_HKD = { HKD: 1, USD: 7.8, CNY: 1.08 };
const FA_ELIGIBLE_TX_ROLES = new Set(["FA", "PlacingAgent", "Underwriter", "Sponsor", "RestructuringFA"]);
const TX_FIRM_AFFILIATE_ALIASES = {
  "thehongkongandshanghaibankingcorporationlimited": "hsbc",
  "hsbccorporatefinancehongkonglimited": "hsbc",
  "jpmorgansecuritiesasiapacificlimited": "jpm",
  "jpmorgansecuritiesfareastlimited": "jpm",
  "ubsag": "ubs",
  "ubsaghongkongbranch": "ubs",
  "ubssecuritieshongkonglimited": "ubs",
  "clsalimited": "citic",
  "clsacapitalmarketslimited": "citic",
  "citicsecuritieshongkonglimited": "citic",
  "merrilllynchasiapacificlimited": "ml",
  "bofasecurities": "ml",
  "goldmansachsasialimited": "gs",
  "goldmansachsasiallc": "gs",
  "morganstanleyasialimited": "ms",
  "citigroupglobalmarketsasialimited": "citi",
  "deutschebankaghongkongbranch": "db",
  "bnpparibassecuritiesasialimited": "bnpp",
  "chinainternationalcapitalcorporationhongkongsecuritieslimited": "cicc",
  "huataifinancialholdingshongkonglimited": "huatai",
  "guotaijunancapitallimited": "gtja",
  "guotaijunansecuritieshongkonglimited": "gtja",
  "haitonginternationalcapitallimited": "haitong",
  "haitonginternationalsecuritiescompanylimited": "haitong",
  "gfcapitalhongkonglimited": "gf",
  "gfsecuritieshongkongbrokeragelimited": "gf",
  "chinasecuritiesinternationalcorporatefinancecompanylimited": "csi",
  "chinamerchantssecuritieshkcolimited": "cms",
  "cmbinternationalcapitallimited": "cmbi",
  "bociasialimited": "boci",
  "ccbinternationalcapitallimited": "ccbi",
  "icbcinternationalcapitallimited": "icbci",
  "abcicapitallimited": "abci",
  "shenwanyuanhongkong": "sws",
  "shenwanhongyuancapitalhklimited": "sws",
  "dbsasiacapitallimited": "dbs",
  "spdbinternationalcapitallimited": "spdb",
  "quamcapitallimited": "quam",
};

function normFirmKey(name) {
  return String(name || "").toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]/g, "");
}

function transactionCasesRows() {
  if (typeof window === "undefined") return [];
  const cases = window.YingSightTransactions?.getCases?.();
  return Array.isArray(cases) ? cases : [];
}

function effectiveMandatesForTx(tx) {
  if (typeof window !== "undefined" && typeof window.YingSightTransactions?.getEffectiveMandates === "function") {
    return window.YingSightTransactions.getEffectiveMandates(tx);
  }
  return Array.isArray(tx?.mandates) ? tx.mandates : [];
}

function buildFirmLookupMap(firmsMap) {
  const lookup = new Map(Object.entries(TX_FIRM_AFFILIATE_ALIASES));
  for (const [sponsorId, firm] of firmsMap.entries()) {
    if (firm.firmScope === "rollup" || firm.firmScope === "benchmark") continue;
    for (const nm of [firm.canonicalName, firm.displayNameEn, firm.displayNameZh, ...(firm.legalNames || []), ...(firm.aliases || [])]) {
      const k = normFirmKey(nm);
      if (k) lookup.set(k, sponsorId);
    }
  }
  return lookup;
}

function faTransactionsBySponsor(firmsMap, stage = state.stage, creditMode = state.credit, ignoreSearchNature = false, ipoIssuersBySponsor = null) {
  const bySponsor = new Map();
  if (stage !== "all" || state.type !== "all" || state.sector !== "all") return bySponsor;
  const cases = transactionCasesRows();
  if (!cases.length) return bySponsor;
  const lookup = buildFirmLookupMap(firmsMap);
  const query = ignoreSearchNature ? "" : normalize(state.search);
  for (const tx of cases) {
    const txDate = tx.progressDate || tx.events?.[0]?.date || tx.stage?.date || "";
    if (!ignoreSearchNature) {
      if (state.dateFrom && (!txDate || txDate < state.dateFrom)) continue;
      if (state.dateTo && (!txDate || txDate > state.dateTo)) continue;
    } else if (!factsIgnoreDatesInPkOptionMode) {
      if (state.dateFrom && (!txDate || txDate < state.dateFrom)) continue;
      if (state.dateTo && (!txDate || txDate > state.dateTo)) continue;
    }
    const rawMandates = effectiveMandatesForTx(tx).filter((m) => FA_ELIGIBLE_TX_ROLES.has(m?.role));
    if (!rawMandates.length) continue;
    const enrich = typeof window !== "undefined" ? window.YingSightTransactions?.getCaseEnrichment?.(tx.id) : null;
    const linkedIssuerId = tx.issuerId || enrich?.issuerId || "";
    const orderedSponsorIds = [];
    const rolesBySponsor = new Map();
    for (const m of rawMandates) {
      const sid = m.sponsorId || lookup.get(normFirmKey(m.firm));
      if (!sid || !firmsMap.has(sid)) continue;
      if (!orderedSponsorIds.includes(sid)) orderedSponsorIds.push(sid);
      if (!rolesBySponsor.has(sid)) rolesBySponsor.set(sid, []);
      rolesBySponsor.get(sid).push(m);
    }
    if (!orderedSponsorIds.length) continue;
    const faCount = orderedSponsorIds.length;
    const txHaystack = normalize([tx.name, tx.code, tx.mechanism, ...(tx.aliases || [])].join(" "));
    orderedSponsorIds.forEach((sid, idx) => {
      const firm = firmsMap.get(sid);
      if (!ignoreSearchNature && state.nature !== "all" && firm?.sponsorNature !== state.nature) return;
      if (query && !firmMatchesSearch(firm, query) && !txHaystack.includes(query)) return;
      const rawWeight = creditMode === "creditEqual" ? 1 / faCount : creditMode === "creditFirstNamed" ? (idx === 0 ? 1 : 0) : 1;
      if (rawWeight <= 0) return;
      const alreadyInIpo = Boolean(linkedIssuerId && ipoIssuersBySponsor?.get(sid)?.has(linkedIssuerId));
      const weight = alreadyInIpo ? 0 : rawWeight;
      if (!bySponsor.has(sid)) bySponsor.set(sid, { count: 0, items: [] });
      const bucket = bySponsor.get(sid);
      bucket.count += weight;
      bucket.items.push({
        id: tx.id,
        code: tx.code,
        name: tx.name,
        date: txDate,
        mechanism: tx.mechanism,
        roles: rolesBySponsor.get(sid).map((m) => m.role),
        weight,
      });
    });
  }
  return bySponsor;
}

let factsIgnoreDatesInPkOptionMode = false;

function rosterDealMatchesScope(row, stage = state.stage) {
  if (stage === "applying") return false;
  const dDate = row.listingDate || row.date || "";
  if (!factsIgnoreDatesInPkOptionMode) {
    if (state.dateFrom && (!dDate || dDate < state.dateFrom)) return false;
    if (state.dateTo && (!dDate || dDate > state.dateTo)) return false;
  }
  if (state.type !== "all") {
    const tLabel = row.isAH ? "A+H" : row.issuerType === "h_share" ? "H股" : row.issuerType === "red_chip" ? "红筹" : "其他";
    if (tLabel !== state.type) return false;
  }
  if (state.sector !== "all") {
    if (factSector({ industryTags: row.industryTags || [] }) !== state.sector) return false;
  }
  return true;
}

function sponsorAttributedEconomics(firm, creditMode = state.credit, stage = state.stage) {
  if (!firm || !firm.sponsorId || firm.sponsorId.startsWith(BENCHMARK_PREFIX) || firm.firmScope === "rollup") {
    return null;
  }
  const allRows = offeringRosterRows();
  if (!allRows.length) return null;
  const matched = [];
  for (const row of allRows) {
    if (row.route !== "listed_offering" || !Array.isArray(row.institutions)) continue;
    if (!rosterDealMatchesScope(row, stage)) continue;
    const idx = row.institutions.findIndex((inst) => inst.sponsorId === firm.sponsorId);
    if (idx < 0) continue;
    if (creditMode === "creditFirstNamed" && idx !== 0) continue;
    matched.push(row);
  }
  let commHkd = 0;
  let spFeeHkd = 0;
  for (const row of matched) {
    const sponsorCount = Math.max(1, row.institutions.length);
    const exactEst = Number(row.offered?.estimate?.value);
    const gross = Number(row.offered?.gross?.value ?? row.gross?.hkd);
    if (Number.isFinite(exactEst) && exactEst >= 0) {
      commHkd += exactEst / sponsorCount;
    } else if (Number.isFinite(gross) && gross > 0 && isNumber(row.fixedBps)) {
      commHkd += (gross * (row.fixedBps / 10000)) / sponsorCount;
    }
    const sp = row.sponsorFee;
    const fx = sp?.currency ? ECON_FX_TO_HKD[sp.currency] : null;
    if (sp && sp.value != null && fx) {
      const val = Number(sp.value);
      if (Number.isFinite(val) && val >= 0) {
        let mult = null;
        if (["sole_sponsor", "joint_aggregate", "engagement"].includes(sp.scope)) mult = 1;
        else if (sp.scope === "per_sponsor" && Number.isInteger(sp.perSponsorCount) && sp.perSponsorCount >= 1) mult = sp.perSponsorCount;
        if (mult !== null) spFeeHkd += (val * mult * fx) / sponsorCount;
      }
    }
  }
  let dealCount = matched.length;
  if (stage !== "applying" && state.type === "all" && state.sector === "all") {
    for (const tx of transactionCasesRows()) {
      const enrich = typeof window !== "undefined" ? window.YingSightTransactions?.getCaseEnrichment?.(tx.id) : null;
      const rtoSp = enrich?.sponsorFee;
      if (!rtoSp) continue;
      const txDate = tx.progressDate || tx.stage?.date || "";
      if (!factsIgnoreDatesInPkOptionMode) {
        if (state.dateFrom && (!txDate || txDate < state.dateFrom)) continue;
        if (state.dateTo && (!txDate || txDate > state.dateTo)) continue;
      }
      const spMandates = effectiveMandatesForTx(tx).filter((m) => m.role === "Sponsor");
      const sIdx = spMandates.findIndex((m) => m.sponsorId === firm.sponsorId);
      if (sIdx < 0) continue;
      if (creditMode === "creditFirstNamed" && sIdx !== 0) continue;
      const fx = ECON_FX_TO_HKD[rtoSp.currency] || 0;
      if (fx > 0) {
        spFeeHkd += (Number(rtoSp.value) * fx) / Math.max(1, spMandates.length);
        dealCount += 1;
      }
    }
  }
  if (!dealCount) return null;
  const totalEconHkd = commHkd + spFeeHkd;
  return {
    dealCount,
    commHkdM: commHkd / 1e6,
    spFeeHkdM: spFeeHkd / 1e6,
    totalEconHkdM: totalEconHkd / 1e6,
  };
}

function formatHkdMillionsShort(hkdM) {
  if (!isNumber(hkdM) || hkdM < 0) return "—";
  if (hkdM === 0) return "HK$0";
  const hkd = hkdM * 1e6;
  if (hkd >= 1e8) return `HK$${compactNumber(hkd / 1e8, 2)}亿`;
  const wan = hkd / 1e4;
  if (wan >= 100) return `HK$${compactNumber(wan, 0)}万`;
  if (wan >= 10) return `HK$${compactNumber(wan, 1)}万`;
  return `HK$${compactNumber(wan, 2)}万`;
}

function formatHkdMillionsPerPerson(hkdM, unit = "人") {
  if (!isNumber(hkdM) || hkdM <= 0) return "—";
  return `${formatHkdMillionsShort(hkdM)}/${unit}`;
}

function formatEconSplitParts(spFeeM, commM) {
  if (!isNumber(spFeeM) && !isNumber(commM)) return "";
  const spPart = isNumber(spFeeM) ? formatHkdMillionsShort(spFeeM).replace(/^HK\$/, "") : "—";
  const commPart = isNumber(commM) ? formatHkdMillionsShort(commM).replace(/^HK\$/, "") : "—";
  return `保荐费 ${spPart} + 估佣 ${commPart}`;
}

function totalEconSubLabel(row) {
  if (!row || !isNumber(row.econTotalHkdM)) return "";
  const parts = formatEconSplitParts(row.econSpFeeHkdM, row.econCommHkdM);
  if (row.firmScope === "benchmark") return parts ? `同组中位 · ${parts}` : "同组机构中位数";
  return [parts, row.econDealCount ? `${row.econDealCount} 宗联席平分` : "联席平分"].filter(Boolean).join(" · ");
}

function spEconSubLabel(row) {
  if (!row || !isNumber(row.econPerSponsorPrincipalHkdM)) return "";
  const parts = formatEconSplitParts(row.spFeePerSpHkdM, row.commPerSpHkdM);
  if (row.firmScope === "benchmark") return parts ? `同组中位 · ${parts}` : "同组机构中位数";
  const spTxt = isNumber(row.sponsorPrincipalCount) ? `${compactNumber(row.sponsorPrincipalCount, 0)} SP` : "";
  return [parts, spTxt].filter(Boolean).join(" · ");
}

function execEconSubLabel(row) {
  if (!row || !isNumber(row.econPerExecutionStaffHkdM)) return "";
  const parts = formatEconSplitParts(row.spFeePerExecHkdM, row.commPerExecHkdM);
  if (row.firmScope === "benchmark") return parts ? `同组中位 · ${parts}` : "同组机构中位数（含非SP RO与Rep）";
  const staffBreak = isNumber(row.type6RepCount) && isNumber(row.nonSpRoCount)
    ? `${compactNumber(row.execStaffCount, 0)}人（${compactNumber(row.type6RepCount, 0)} Rep + ${compactNumber(row.nonSpRoCount, 0)} 非SP RO）`
    : isNumber(row.execStaffCount) ? `${compactNumber(row.execStaffCount, 0)}人` : "";
  return [parts, staffBreak].filter(Boolean).join(" · ");
}

function personnelPerProject(count, projects) {
  return isNumber(count) && count >= 0 && isNumber(projects) && projects > 0 ? count / projects : null;
}

function aggregateFacts(facts, stage = state.stage, ignoreSearchNature = false) {
  const firms = firmById();
  const grouped = new Map();
  const ipoIssuersBySponsor = new Map();
  for (const fact of creditedFacts(facts)) {
    if (!grouped.has(fact.sponsorId)) grouped.set(fact.sponsorId, []);
    grouped.get(fact.sponsorId).push(fact);
    if (fact.issuerId) {
      if (!ipoIssuersBySponsor.has(fact.sponsorId)) ipoIssuersBySponsor.set(fact.sponsorId, new Set());
      ipoIssuersBySponsor.get(fact.sponsorId).add(fact.issuerId);
    }
  }
  const faBySponsor = faTransactionsBySponsor(firms, stage, state.credit, ignoreSearchNature, ipoIssuersBySponsor);
  for (const sid of faBySponsor.keys()) {
    if (!grouped.has(sid)) grouped.set(sid, []);
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
    const faBucket = faBySponsor.get(sponsorId);
    const faTxCount = faBucket ? faBucket.count : 0;
    const ipoProjectCount = weightedCount(sponsorFacts, () => true);
    const projectCount = ipoProjectCount + faTxCount;
    const activeCount = weightedCount(sponsorFacts, (fact) => fact.hkexStage === "applying");
  const type6RepCount = isNumber(firm.type6RepCount) ? firm.type6RepCount : null;
  const type6ROCount = isNumber(firm.type6ROCount) ? firm.type6ROCount : null;
  const type6TotalCount = isNumber(firm.type6TotalCount) ? firm.type6TotalCount : null;
    const sponsorPrincipalCount = isNumber(firm.sponsorPrincipalCount) ? firm.sponsorPrincipalCount : null;
    const nonSpRoCount = isNumber(type6ROCount) && isNumber(sponsorPrincipalCount)
      ? Math.max(0, type6ROCount - sponsorPrincipalCount)
      : null;
    const execStaffCount = isNumber(type6TotalCount) && isNumber(sponsorPrincipalCount) && type6TotalCount > sponsorPrincipalCount
      ? type6TotalCount - sponsorPrincipalCount
      : null;
    const attrEcon = sponsorAttributedEconomics(firm, state.credit, stage);
    const hasSpCap = isNumber(sponsorPrincipalCount) && sponsorPrincipalCount > 0;
    const hasExecCap = isNumber(execStaffCount) && execStaffCount > 0;
    const econPerSponsorPrincipalHkdM = attrEcon && hasSpCap ? attrEcon.totalEconHkdM / sponsorPrincipalCount : null;
    const spFeePerSpHkdM = attrEcon && hasSpCap ? attrEcon.spFeeHkdM / sponsorPrincipalCount : null;
    const commPerSpHkdM = attrEcon && hasSpCap ? attrEcon.commHkdM / sponsorPrincipalCount : null;
    const econPerExecutionStaffHkdM = attrEcon && hasExecCap ? attrEcon.totalEconHkdM / execStaffCount : null;
    const spFeePerExecHkdM = attrEcon && hasExecCap ? attrEcon.spFeeHkdM / execStaffCount : null;
    const commPerExecHkdM = attrEcon && hasExecCap ? attrEcon.commHkdM / execStaffCount : null;
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
      nonSpRoCount,
      execStaffCount,
      faTxCount,
      faTransactions: faBucket ? faBucket.items : [],
      econDealCount: attrEcon ? attrEcon.dealCount : 0,
      econTotalHkdM: attrEcon ? attrEcon.totalEconHkdM : null,
      econSpFeeHkdM: attrEcon ? attrEcon.spFeeHkdM : null,
      econCommHkdM: attrEcon ? attrEcon.commHkdM : null,
      econPerSponsorPrincipalHkdM,
      spFeePerSpHkdM,
      commPerSpHkdM,
      econPerExecutionStaffHkdM,
      spFeePerExecHkdM,
      commPerExecHkdM,
      topIndustries: topIndustries(sponsorFacts),
    });
  }
  return rows.sort(compareRows);
}

function aggregateFactsForCredit(facts, credit, stage = "all", ignoreDates = false) {
  const previousCredit = state.credit;
  const previousIgnoreDates = factsIgnoreDatesInPkOptionMode;
  state.credit = credit;
  factsIgnoreDatesInPkOptionMode = ignoreDates;
  try {
    return aggregateFacts(facts, stage, true);
  } finally {
    state.credit = previousCredit;
    factsIgnoreDatesInPkOptionMode = previousIgnoreDates;
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
    nonSpRoCount: isNumber(type6ROCount) && isNumber(sponsorPrincipalCount) ? Math.max(0, type6ROCount - sponsorPrincipalCount) : null,
    execStaffCount: isNumber(type6TotalCount) && isNumber(sponsorPrincipalCount) && type6TotalCount > sponsorPrincipalCount ? type6TotalCount - sponsorPrincipalCount : null,
    faTxCount: 0,
    faTransactions: [],
    econDealCount: 0,
    econTotalHkdM: null,
    econSpFeeHkdM: null,
    econCommHkdM: null,
    econPerSponsorPrincipalHkdM: null,
    spFeePerSpHkdM: null,
    commPerSpHkdM: null,
    econPerExecutionStaffHkdM: null,
    spFeePerExecHkdM: null,
    commPerExecHkdM: null,
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

function factDateForScope(fact, dateField = state.dateField) {
  if (dateField !== "stageDate") return fact[dateField];
  if (fact.hkexStage === "listed") return listingOrCompletionDate(fact);
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

function displayIssuerTypeLabel(rawType) {
  if (rawType === "其他") return "港资/海外";
  return rawType || "";
}

function populateOptions() {
  const facts = state.data?.projectFacts || [];
  const firms = state.data?.firms || [];
  const types = uniqueSorted(facts.map((fact) => fact.issuerType));
  const natures = uniqueSorted(firms.map((firm) => firm.sponsorNature));
  els.typeSelect.innerHTML =
    '<option value="all">全部类型</option>' +
    types.map((type) => `<option value="${escapeHtml(type)}">${escapeHtml(type === "其他" ? "港资/海外 (非H股/红筹)" : type)}</option>`).join("");
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

function defaultYtdKey(today = metaToday()) {
  const currentYear = Math.max(2026, Number(String(today).slice(0, 4)) || 2026);
  return `${currentYear}ytd`;
}

function resetPresetFilters() {
  state.search = "";
  state.stage = "all";
  state.type = "all";
  state.nature = "all";
  state.sector = "all";
  state.dateField = "stageDate";
  if (viewRoot) {
    const ytdKey = defaultYtdKey();
    const yr = ytdKey.slice(0, 4);
    state.dateFrom = `${yr}-01-01`;
    state.dateTo = "";
    state.dateQuick = ytdKey;
  } else {
    state.dateFrom = "";
    state.dateTo = "";
    state.dateQuick = "all";
  }
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

function buildDateQuickOptions(today = metaToday()) {
  const currentYear = Math.max(2026, Number(String(today).slice(0, 4)) || 2026);
  const opts = [
    { key: "3m", label: "近3个月" },
    { key: "6m", label: "近6个月" },
  ];
  if (currentYear >= 2027) {
    for (let y = 2026; y < currentYear; y += 1) {
      opts.push({ key: `${y}full`, label: `${y}全年` });
    }
    opts.push({ key: `${currentYear}ytd`, label: `${currentYear}至今` });
  } else {
    opts.push({ key: "2026ytd", label: "2026年至今" });
  }
  opts.push({ key: "all", label: "历史全量" });
  return opts;
}

function renderDateQuickGroups() {
  if (typeof document === "undefined") return;
  const opts = buildDateQuickOptions();
  document.querySelectorAll(".sl-date-quick, .spk-date-quick").forEach((group) => {
    group.innerHTML = opts
      .map((o) => `<button type="button" data-date-quick="${escapeHtml(o.key)}" class="${o.key === state.dateQuick ? "is-active" : ""}">${escapeHtml(o.label)}</button>`)
      .join("");
  });
}

function setDateQuickRange(range) {
  state.dateQuick = range;
  const today = metaToday();
  state.dateTo = "";
  state.dateFrom = "";
  const fullMatch = /^(\d{4})full$/.exec(String(range || ""));
  const ytdMatch = /^(\d{4})ytd$/.exec(String(range || ""));
  if (range === "3m") {
    state.dateTo = today;
    state.dateFrom = monthsBefore(today, 3);
  } else if (range === "6m") {
    state.dateTo = today;
    state.dateFrom = monthsBefore(today, 6);
  } else if (range === "1y") {
    state.dateTo = today;
    state.dateFrom = monthsBefore(today, 12);
  } else if (fullMatch) {
    state.dateFrom = `${fullMatch[1]}-01-01`;
    state.dateTo = `${fullMatch[1]}-12-31`;
  } else if (ytdMatch) {
    state.dateFrom = `${ytdMatch[1]}-01-01`;
    state.dateTo = today >= `${ytdMatch[1]}-01-01` ? today : `${ytdMatch[1]}-12-31`;
  } else {
    state.dateQuick = "all";
  }
  state.preset = "custom";
  syncControls();
  render();
  renderPk();
}

function syncControls() {
  renderDateQuickGroups();
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
      sub: isNumber(row.type6RepCount) ? `项目/Rep比 · Rep ${compactNumber(row.type6RepCount, 0)}` : "暂无六号牌Rep",
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
      sub: isNumber(row.type6RepCount) ? `公开申请中项目/Rep比 · Rep ${compactNumber(row.type6RepCount, 0)}` : "暂无六号牌Rep",
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
  if (state.metric === "econTotalHkdM") {
    return {
      main: formatHkdMillionsShort(row.econTotalHkdM),
      sub: totalEconSubLabel(row) || "暂无期内定价IPO样本",
    };
  }
  if (state.metric === "econPerSponsorPrincipalHkdM") {
    return {
      main: formatHkdMillionsPerPerson(row.econPerSponsorPrincipalHkdM, "SP"),
      sub: spEconSubLabel(row) || "暂无期内定价样本或SP人数",
    };
  }
  if (state.metric === "econPerExecutionStaffHkdM") {
    return {
      main: formatHkdMillionsPerPerson(row.econPerExecutionStaffHkdM, "人"),
      sub: execEconSubLabel(row) || "暂无期内定价样本或六号牌人数",
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

const EST_QUALIFIER = " · 含估算 / Includes estimates";

function renderQualifiedHtml(value) {
  const raw = String(value ?? "");
  const idx = raw.indexOf(EST_QUALIFIER);
  if (idx < 0) return escapeHtml(raw);
  return `${escapeHtml(raw.slice(0, idx))}<span class="sl-est-qualifier">${escapeHtml(raw.slice(idx))}</span>`;
}

function marketCapHeaderText() {
  const mode = marketCapMode();
  if (mode === "listed") return metricLabels.listingMarketCapHkdBnSum;
  if (mode === "applyingAh" || mode === "aShare") return metricLabels.aShareMarketCapRmbBnSum;
  return "市值规模";
}

function lifecycleHeaderText() {
  return state.stage === "applying" ? "项目生命周期阶段" : "A1→上市均值";
}

function lifecycleHeaderTitle() {
  if (state.stage === "applying") {
    return "上市申请中项目列示公开 A1 后截至快照日的平均已历时长。";
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
    sub: `${listing ? "上市日总市值" : metricLabels.aShareMarketCapRmbBnSum}`,
  };
}

function hasPartialListingValue(rows) {
  return rows.some(row => row.firmScope !== "rollup" && row.listingMarketCapCoverage?.total > 0
    && !isNumber(row.listingMarketCapHkdBnSum));
}

function renderMetricCard(card) {
  const clickableSponsor = Boolean(card.sponsorId);
  const clickableMetric = !clickableSponsor && Boolean(card.metricKey);
  const cls = clickableSponsor || clickableMetric ? "metric-card is-clickable" : "metric-card";
  const attrs = clickableSponsor
    ? ` data-metric-sponsor="${escapeHtml(card.sponsorId)}" data-metric-key="${escapeHtml(card.metricKey || "")}" tabindex="0" role="button" aria-label="${escapeHtml(card.label)}：${escapeHtml(card.value)}，点击查看保荐机构执业档案"`
    : clickableMetric
      ? ` data-metric-focus="${escapeHtml(card.metricKey)}" tabindex="0" role="button" aria-label="${escapeHtml(card.label)}：${escapeHtml(card.value)}，点击按该指标排序"`
      : "";
  const cue = clickableSponsor
    ? '<em class="metric-card-cue">查看档案 →</em>'
    : clickableMetric
      ? '<em class="metric-card-cue">聚焦榜单 →</em>'
      : "";
  return `<article class="${cls}"${attrs}>
        <div class="metric-card-top"><span>${escapeHtml(card.label)}</span>${cue}</div>
        <strong>${escapeHtml(card.value)}</strong>
        <small>${renderQualifiedHtml(card.note)}</small>
      </article>`;
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
  const econTotalLeader = [...comparableRows]
    .filter((row) => isNumber(row.econTotalHkdM) && row.econTotalHkdM > 0)
    .sort((a, b) => b.econTotalHkdM - a.econTotalHkdM || (b.econDealCount || 0) - (a.econDealCount || 0))[0];
  const econPerSpLeader = [...comparableRows]
    .filter((row) => isNumber(row.econPerSponsorPrincipalHkdM) && row.econDealCount >= 2)
    .sort((a, b) => b.econPerSponsorPrincipalHkdM - a.econPerSponsorPrincipalHkdM || (b.econTotalHkdM || 0) - (a.econTotalHkdM || 0))[0];
  const econPerExecLeader = [...comparableRows]
    .filter((row) => isNumber(row.econPerExecutionStaffHkdM) && row.econDealCount >= 2)
    .sort((a, b) => b.econPerExecutionStaffHkdM - a.econPerExecutionStaffHkdM || (b.econTotalHkdM || 0) - (a.econTotalHkdM || 0))[0];

  if (state.sector !== "all") {
    const label = sectorLabel();
    const cards = [
      {
        label: `${label}项目最多`,
        value: projectLeader ? projectLeader.displayNameZh : "待披露",
        note: projectLeader ? `${compactCredit(projectLeader.projectCount)} 个${label}项目 · 赛道按公开行业标签归类` : "无赛道样本",
        sponsorId: projectLeader?.sponsorId,
        metricKey: "projectCount",
      },
      {
        label: `${label}总经济最高`,
        value: econTotalLeader?.displayNameZh,
        note: econTotalLeader ? `${formatHkdMillionsShort(econTotalLeader.econTotalHkdM)} · ${formatEconSplitParts(econTotalLeader.econSpFeeHkdM, econTotalLeader.econCommHkdM)}` : "",
        metricKey: "econTotalHkdM",
      },
      {
        label: `${label}公开申请中最多`,
        value: activeLeader ? activeLeader.displayNameZh : "待披露",
        note: activeLeader ? `${compactCredit(activeLeader.activeCount)} 个公开申请中项目 · 港交所公开递表` : "无公开申请中样本",
        sponsorId: activeLeader?.sponsorId,
        metricKey: "activeCount",
      },
      {
        label: `${label}已上市最多`,
        value: listedLeader ? listedLeader.displayNameZh : "待披露",
        note: listedLeader ? `${compactCredit(listedLeader.listedCount)} 个已上市项目` : "无已上市样本",
        sponsorId: listedLeader?.sponsorId,
        metricKey: "listedCount",
      },
      {
        label: `${label}上市市值`,
        value: listedMcapLeader?.displayNameZh,
        note: listedMcapLeader ? `${formatListingCap(listedMcapLeader)}` : "—",
        sponsorId: listedMcapLeader?.sponsorId,
        metricKey: "listingMarketCapHkdBnSum",
      },
      {
        label: `${label}已上市周期较快`,
        value: timingLeader ? timingLeader.displayNameZh : "样本不足",
        note: timingLeader ? `${formatDays(timingLeader.listedLifecycleAverageDays)} · 仅已上市项目` : "需至少5个已上市样本",
        sponsorId: timingLeader?.sponsorId,
        metricKey: "lifecycleMedianDays",
      },
    ];
    return cards.filter(card => card.value).map(renderMetricCard).join("");
  }

  const uniqueIssuers = new Set(comparableRows.flatMap((row) => (row.facts || []).map((fact) => fact.issuerId).filter(Boolean))).size;
  const totalFaMandates = new Set(comparableRows.flatMap((row) => (row.faTransactions || []).map((t) => t.id))).size;
  const cards = [
    {
      label: "活跃保荐机构",
      value: comparableRows.length ? `${compactNumber(comparableRows.length, 0)} 家` : "",
      note: uniqueIssuers
        ? `覆盖 ${compactNumber(uniqueIssuers, 0)} 宗IPO${totalFaMandates ? ` + ${compactNumber(totalFaMandates, 0)} 宗FA交易` : ""} · ${creditLabels[state.credit] || "具名全部计入"}`
        : `${creditLabels[state.credit] || "具名全部计入"} · 港股保荐与FA全览`,
      metricKey: "projectCount",
    },
    {
      label: "总经济第一（保荐+估佣）",
      value: econTotalLeader?.displayNameZh,
      note: econTotalLeader
        ? `${formatHkdMillionsShort(econTotalLeader.econTotalHkdM)} · ${formatEconSplitParts(econTotalLeader.econSpFeeHkdM, econTotalLeader.econCommHkdM)}（联席平分）`
        : "",
      metricKey: "econTotalHkdM",
    },
    {
      label: "SP人均经济最高",
      value: econPerSpLeader?.displayNameZh,
      note: econPerSpLeader
        ? `${formatHkdMillionsPerPerson(econPerSpLeader.econPerSponsorPrincipalHkdM, "SP")} · ${formatEconSplitParts(econPerSpLeader.spFeePerSpHkdM, econPerSpLeader.commPerSpHkdM)}`
        : "",
      metricKey: "econPerSponsorPrincipalHkdM",
    },
    {
      label: "Rep人均经济最高（含非SP RO）",
      value: econPerExecLeader?.displayNameZh,
      note: econPerExecLeader
        ? `${formatHkdMillionsPerPerson(econPerExecLeader.econPerExecutionStaffHkdM, "人")} · ${execEconSubLabel(econPerExecLeader)}`
        : "",
      metricKey: "econPerExecutionStaffHkdM",
    },
    {
      label: "公开申请中项目最多",
      value: activeLeader ? activeLeader.displayNameZh : "待披露",
      note: activeLeader ? `${compactCredit(activeLeader.activeCount)} 个公开 A1 申请中项目` : "无公开申请中样本",
      sponsorId: activeLeader?.sponsorId,
      metricKey: "activeCount",
    },
    {
      label: "SP人均市值产出最高",
      value: mcapPerSpLeader?.displayNameZh,
      note: mcapPerSpLeader
        ? `每名SP对应 ${formatListingCap(mcapPerSpLeader, mcapPerSpLeader.listingMarketCapPerSponsorPrincipalHkdBn, true)} 上市日市值`
        : `需有SP人数及至少${MIN_MARKET_CAP_PROJECTS}个上市日市值样本`,
      sponsorId: mcapPerSpLeader?.sponsorId,
      metricKey: "listingMarketCapPerSponsorPrincipalHkdBn",
    },
    {
      label: "六号牌持牌人员人均市值产出最高",
      value: mcapPerTotalLeader?.displayNameZh,
      note: mcapPerTotalLeader
        ? `每名六号牌持牌人员对应 ${formatListingCap(mcapPerTotalLeader, mcapPerTotalLeader.listingMarketCapPerType6TotalHkdBn, true)} 上市日市值`
        : `需有六号牌人数及至少${MIN_MARKET_CAP_PROJECTS}个上市日市值样本`,
      sponsorId: mcapPerTotalLeader?.sponsorId,
      metricKey: "listingMarketCapPerType6TotalHkdBn",
    },
    {
      label: "项目上市市值第一",
      value: listedMcapLeader?.displayNameZh,
      note: listedMcapLeader ? `${formatListingCap(listedMcapLeader)}` : "—",
      sponsorId: listedMcapLeader?.sponsorId,
      metricKey: "listingMarketCapHkdBnSum",
    },
    {
      label: "已上市周期较快",
      value: timingLeader ? timingLeader.displayNameZh : "样本不足",
      note: timingLeader ? `${formatDays(timingLeader.listedLifecycleAverageDays)} · 仅已上市项目` : "需至少5个已上市样本",
      sponsorId: timingLeader?.sponsorId,
      metricKey: "lifecycleMedianDays",
    },
  ];
  return cards.filter(card => card.value).map(renderMetricCard).join("");
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

const CSRC_TRACKER_URL = "data/csrc_tracker_public.json";
let csrcRecordsCache = null;
let csrcRecordsById = null;
let csrcRecordsByCode = null;
let csrcLoadPromise = null;

function indexCsrcRecords(records) {
  if (!Array.isArray(records) || !records.length) return;
  csrcRecordsCache = records;
  csrcRecordsById = new Map();
  csrcRecordsByCode = new Map();
  for (const record of records) {
    if (!record || typeof record !== "object") continue;
    if (record.id) csrcRecordsById.set(record.id, record);
    if (record.hkexListingStockCode) {
      const code = String(record.hkexListingStockCode).replace(/\.HK$/i, "").padStart(5, "0");
      csrcRecordsByCode.set(code, record);
    }
  }
}

function syncGlobalCsrcRecords() {
  if (typeof window === "undefined") return;
  if (Array.isArray(window.__yingsightCsrcRecords) && window.__yingsightCsrcRecords.length && window.__yingsightCsrcRecords !== csrcRecordsCache) {
    indexCsrcRecords(window.__yingsightCsrcRecords);
  }
}

function ensureCsrcRecordsLoaded() {
  syncGlobalCsrcRecords();
  if (csrcRecordsById || csrcLoadPromise) return csrcLoadPromise;
  if (typeof window === "undefined" || typeof fetch !== "function" || window.location?.protocol === "file:") return null;
  csrcLoadPromise = fetch(CSRC_TRACKER_URL, { cache: "default" })
    .then((res) => (res.ok ? res.json() : null))
    .then((payload) => {
      if (Array.isArray(payload?.records)) {
        indexCsrcRecords(payload.records);
        if (state.data) {
          if (viewRoot?.classList?.contains?.("is-visible")) render();
          if (pkRoot?.classList?.contains?.("is-visible")) renderPk();
        }
      }
    })
    .catch(() => {});
  return csrcLoadPromise;
}

function csrcRecordForRound(round) {
  if (!round) return null;
  syncGlobalCsrcRecords();
  if (!csrcRecordsById) return null;
  if (round.issuerId && csrcRecordsById.has(round.issuerId)) return csrcRecordsById.get(round.issuerId);
  if (round.code) {
    const code = String(round.code).replace(/\.HK$/i, "").padStart(5, "0");
    if (csrcRecordsByCode?.has(code)) return csrcRecordsByCode.get(code);
  }
  return null;
}

function effectiveSponsorFeeForRound(round) {
  if (!round) return null;
  if (round.sponsorFee && isNumber(Number(round.sponsorFee.value)) && Number(round.sponsorFee.value) > 0 && round.sponsorFee.currency) {
    return {
      value: Number(round.sponsorFee.value),
      currency: round.sponsorFee.currency,
      approximate: Boolean(round.sponsorFee.approximate),
      scope: round.sponsorFee.scope || (round.institutions?.length > 1 ? "joint" : "sole_sponsor"),
    };
  }
  const record = csrcRecordForRound(round);
  const terms = record?.listingFeeTerms;
  if (!terms || typeof terms !== "object") return null;
  const raw = terms.fee || terms.feeApprox;
  if (!raw || !isNumber(Number(raw.value)) || Number(raw.value) <= 0 || !raw.currency) return null;
  return {
    value: Number(raw.value),
    currency: raw.currency,
    approximate: !terms.fee && Boolean(terms.feeApprox),
    scope: round.institutions?.length > 1 ? "joint" : "sole_sponsor",
  };
}

function formatSponsorFeeMoney(value, currency = "HKD", approximate = false) {
  if (!isNumber(value) || value <= 0) return "—";
  const prefix = approximate ? "约 " : "";
  if (value >= 1e8) return `${prefix}${currency} ${compactNumber(value / 1e8, 2)}亿`;
  if (value >= 1e4) {
    const wan = value / 1e4;
    const digits = Math.abs(wan - Math.round(wan)) < 0.05 ? 0 : 1;
    return `${prefix}${currency} ${compactNumber(wan, digits)}万`;
  }
  return `${prefix}${currency} ${compactNumber(value, 0)}`;
}

function formatOfferedHkdYi(hkdBn) {
  if (!isNumber(hkdBn) || hkdBn <= 0) return "—";
  const yi = hkdBn * 10;
  return `HK$${compactNumber(yi, yi >= 100 ? 0 : 1)}亿`;
}

function offeringRosterRows() {
  if (typeof window === "undefined") return [];
  const rows = window.YingSightOfferingFees?.getRows?.();
  return Array.isArray(rows) ? rows : [];
}

function summarizeSponsorFeesByCurrency(deals,currency='HKD') {
  const exact=window.YingSightOfferingFees?.summarizeSponsorFees?.(deals.map(d=>d.id),currency);
  const disclosedCount=deals.filter(deal=>effectiveSponsorFeeForRound(deal)).length;
  return {count:disclosedCount,comparableCount:exact?.count||0,currency,
    summary:exact?.text||'— (n=0)',compact:exact?.text||'— (n=0)'};
}

function sponsorFeeStats(sponsorId) {
  if (!sponsorId || sponsorId.startsWith(BENCHMARK_PREFIX)) return null;
  const allRows = offeringRosterRows();
  const matchesFirm = (row) => Array.isArray(row.institutions) && row.institutions.some((inst) => inst.sponsorId === sponsorId);
  const deals = allRows.filter((row) => row.route === "listed_offering" && matchesFirm(row) && rosterDealMatchesScope(row));
  const pausedDeals = allRows.filter((row) => row.route === "paused_offer" && matchesFirm(row));
  if (!deals.length && !pausedDeals.length) return null;
  const fixedValues = deals.map((row) => row.fixedBps).filter(isNumber);
  const upperValues = deals.map((row) => row.upperBps).filter(isNumber);
  const feeBreakdown = summarizeSponsorFeesByCurrency(deals);
  const offeredHkdValues = deals
    .map((row) => Number(row.offered?.gross?.value ?? row.gross?.hkd))
    .filter((val) => Number.isFinite(val) && val > 0);
  const totalOfferedHkdBn = offeredHkdValues.length ? offeredHkdValues.reduce((sum, val) => sum + val, 0) / 1e9 : null;
  const calcEff = (subset) => {
    let grossSum = 0;
    let fixedCommSum = 0;
    let upperGrossSum = 0;
    let upperCommSum = 0;
    for (const row of subset) {
      const g = Number(row.offered?.gross?.value ?? row.gross?.hkd);
      if (!Number.isFinite(g) || g <= 0) continue;
      if (isNumber(row.fixedBps)) {
        grossSum += g;
        fixedCommSum += g * (row.fixedBps / 10000);
      }
      if (isNumber(row.upperBps)) {
        upperGrossSum += g;
        upperCommSum += g * (row.upperBps / 10000);
      }
    }
    return {
      effFixedBps: grossSum > 0 ? (fixedCommSum / grossSum) * 10000 : null,
      effUpperBps: upperGrossSum > 0 ? (upperCommSum / upperGrossSum) * 10000 : null,
      fixedCommHkdBn: fixedCommSum > 0 ? fixedCommSum / 1e9 : null,
    };
  };
  const roleOf = (row) => {
    const insts = Array.isArray(row.institutions) ? row.institutions : [];
    const idx = insts.findIndex((inst) => inst.sponsorId === sponsorId);
    if (idx < 0) return null;
    if (insts.length === 1) return "sole";
    return idx === 0 ? "joint_lead" : "joint_co";
  };
  const soleDeals = deals.filter((r) => roleOf(r) === "sole");
  const leadDeals = deals.filter((r) => roleOf(r) === "joint_lead");
  const coDeals = deals.filter((r) => roleOf(r) === "joint_co");
  const allEff = calcEff(deals);
  const soleEff = calcEff(soleDeals);
  const leadEff = calcEff(leadDeals);
  const coEff = calcEff(coDeals);
  return {
    n: deals.length,
    deals,
    pausedDeals,
    pausedN: pausedDeals.length,
    effectiveFixedBps: allEff.effFixedBps,
    effectiveUpperBps: allEff.effUpperBps,
    totalFixedCommHkdBn: allEff.fixedCommHkdBn,
    fixedMedianBps: median(fixedValues),
    upperMedianBps: median(upperValues),
    soleN: soleDeals.length,
    soleEffBps: soleEff.effFixedBps,
    leadN: leadDeals.length,
    leadEffBps: leadEff.effFixedBps,
    coN: coDeals.length,
    coEffBps: coEff.effFixedBps,
    disclosedSponsorFeeN: feeBreakdown.count,
    comparableSponsorFeeN: feeBreakdown.comparableCount,
    totalOfferedHkdBn,
    sponsorFeeSummary: feeBreakdown.summary,
    sponsorFeeCompact: feeBreakdown.compact,
  };
}

function formatPaceDelta(firmDays, marketDays) {
  if (!isNumber(firmDays) || !isNumber(marketDays)) return null;
  const diff = Math.round(firmDays) - Math.round(marketDays);
  if (diff === 0) return { text: "与全行业持平", cls: "is-neutral" };
  return diff < 0
    ? { text: `较全行业快 ${Math.abs(diff)} 天`, cls: "is-faster" }
    : { text: `较全行业慢 ${diff} 天`, cls: "is-slower" };
}

function sponsorMarketBenchmark() {
  const comparable = (state.activeRows || []).filter((row) => row.firmScope !== "rollup" && row.firmScope !== "benchmark" && row.projectCount > 0);
  const pool = comparable.length >= 3 ? comparable : aggregateFactsForCredit(state.data?.projectFacts || [], state.credit).filter((row) => row.firmScope !== "rollup" && row.firmScope !== "benchmark" && row.projectCount > 0);
  return buildBenchmarkRow(BENCHMARK_GROUPS[0], pool);
}

function renderDrawerInsights(row) {
  const benchmark = sponsorMarketBenchmark();
  const feeStats = row.firmScope !== "rollup" ? sponsorFeeStats(row.sponsorId) : null;
  const paceItems = [
    {
      label: "A1 → 接收中位数",
      value: row.receivedCycleN ? formatDays(row.receivedCycleMedianDays, row.receivedCycleN) : "—",
      market: benchmark?.receivedCycleMedianDays,
      firm: row.receivedCycleMedianDays,
      hasSample: Boolean(row.receivedCycleN),
    },
    {
      label: "A1 → 通知中位数",
      value: row.noticeCycleN ? formatDays(row.noticeCycleMedianDays, row.noticeCycleN) : "—",
      market: benchmark?.noticeCycleMedianDays,
      firm: row.noticeCycleMedianDays,
      hasSample: Boolean(row.noticeCycleN),
    },
    {
      label: "A1 → 上市均值",
      value: row.listedLifecycleN ? formatDays(row.listedLifecycleAverageDays, row.listedLifecycleN) : "—",
      market: benchmark?.listedLifecycleAverageDays,
      firm: row.listedLifecycleAverageDays,
      hasSample: Boolean(row.listedLifecycleN),
    },
  ].filter((item) => item.hasSample);

  const paceHtml = paceItems.length
    ? `<section class="drawer-insight-panel">
        <div class="drawer-insight-head">
          <h4>监管节奏 vs 全行业基准</h4>
          <span>对比口径：${escapeHtml(creditLabels[state.credit] || "具名全部计入")}</span>
        </div>
        <div class="drawer-pace-grid">
          ${paceItems.map((item) => {
            const delta = formatPaceDelta(item.firm, item.market);
            const benchText = isNumber(item.market) ? `全行业中位 ${compactNumber(Math.ceil(item.market), 0)}天` : "";
            return `<div class="drawer-pace-cell">
              <span>${escapeHtml(item.label)}</span>
              <strong>${escapeHtml(item.value)}</strong>
              ${delta ? `<em class="pace-delta ${delta.cls}">${escapeHtml(delta.text)}</em>` : ""}
              ${benchText ? `<small>${escapeHtml(benchText)}</small>` : ""}
            </div>`;
          }).join("")}
        </div>
      </section>`
    : "";

  const feeRosterLoaded = offeringRosterRows().length > 0;
  let feeHtml = "";
  if (row.firmScope !== "rollup" && feeRosterLoaded) {
    if (feeStats && feeStats.n > 0) {
      const rolePills = [
        feeStats.soleN > 0 ? `<button type="button" class="drawer-role-pill is-sole" data-jump-sponsor-fees="${escapeHtml(row.sponsorId)}" data-jump-sponsor-role="sole">独家保荐 <b>${compactNumber(feeStats.soleN, 0)}</b> 宗${isNumber(feeStats.soleEffBps) ? ` · 有效 ${escapeHtml(formatFeeBps(feeStats.soleEffBps))}` : ""}</button>` : "",
        feeStats.leadN > 0 ? `<button type="button" class="drawer-role-pill is-lead" data-jump-sponsor-fees="${escapeHtml(row.sponsorId)}" data-jump-sponsor-role="joint_lead">牵头联席 <b>${compactNumber(feeStats.leadN, 0)}</b> 宗${isNumber(feeStats.leadEffBps) ? ` · 有效 ${escapeHtml(formatFeeBps(feeStats.leadEffBps))}` : ""}</button>` : "",
        feeStats.coN > 0 ? `<button type="button" class="drawer-role-pill is-co" data-jump-sponsor-fees="${escapeHtml(row.sponsorId)}" data-jump-sponsor-role="joint_co">非牵头联席 <b>${compactNumber(feeStats.coN, 0)}</b> 宗${isNumber(feeStats.coEffBps) ? ` · 有效 ${escapeHtml(formatFeeBps(feeStats.coEffBps))}` : ""}</button>` : "",
      ].filter(Boolean).join("");
      const commSub = isNumber(feeStats.totalFixedCommHkdBn)
        ? `估佣 ${formatOfferedHkdYi(feeStats.totalFixedCommHkdBn)}${isNumber(feeStats.fixedMedianBps) ? ` · 单数中位 ${formatFeeBps(feeStats.fixedMedianBps)}` : ""}`
        : "";
      const totalEconBreak = formatEconSplitParts(row.econSpFeeHkdM, row.econCommHkdM);
      const spEconBreak = spEconSubLabel(row);
      const execEconBreak = execEconSubLabel(row);
      feeHtml = `<section class="drawer-insight-panel drawer-fee-panel">
        <div class="drawer-insight-head">
          <h4>期内发行与承销费用实绩</h4>
          <span>HKD 整单明确金额（样本 ${compactNumber(feeStats.comparableSponsorFeeN, 0)} 宗）</span>
        </div>
        <div class="drawer-fee-grid">
          <div><span>归属总经济（联席平分）</span><strong>${escapeHtml(formatHkdMillionsShort(row.econTotalHkdM))}</strong>${totalEconBreak ? `<small>${escapeHtml(totalEconBreak)}</small>` : ""}</div>
          <div><span>SP 人均经济</span><strong>${escapeHtml(formatHkdMillionsPerPerson(row.econPerSponsorPrincipalHkdM, "SP"))}</strong>${spEconBreak ? `<small>${escapeHtml(spEconBreak)}</small>` : ""}</div>
          <div><span>Rep 人均经济（含非SP RO）</span><strong>${escapeHtml(formatHkdMillionsPerPerson(row.econPerExecutionStaffHkdM, "人"))}</strong>${execEconBreak ? `<small>${escapeHtml(execEconBreak)}</small>` : ""}</div>
          <div><span>期内定价新股 / 募资</span><strong>${compactNumber(feeStats.n, 0)} 宗 · ${escapeHtml(formatOfferedHkdYi(feeStats.totalOfferedHkdBn))}</strong></div>
          <div><span>有效固定佣金率</span><strong>${escapeHtml(formatFeeBps(feeStats.effectiveFixedBps ?? feeStats.fixedMedianBps))}</strong>${commSub ? `<small>${escapeHtml(commSub)}</small>` : ""}</div>
          <div><span>有效最高总费率</span><strong>${escapeHtml(formatFeeBps(feeStats.effectiveUpperBps ?? feeStats.upperMedianBps))}</strong></div>
        </div>
        ${rolePills ? `<div class="drawer-role-jumps" aria-label="按保荐席位切至费用页">${rolePills}</div>` : ""}
        <div class="drawer-fee-sponsor-bar">
          <span>所涉项目整单保荐费 · HKD</span>
          <strong>${escapeHtml(feeStats.sponsorFeeSummary)}</strong>
        </div>
        ${feeStats.pausedN > 0 ? `<div class="drawer-paused-strip">
          <span class="drawer-paused-label">涉及发售搁置（${feeStats.pausedN} 宗）</span>
          <div class="drawer-paused-links">
            ${feeStats.pausedDeals.map((deal) => `<button type="button" class="drawer-paused-btn" data-global-round="${escapeHtml(deal.id)}">${escapeHtml(deal.name)} (${escapeHtml(deal.code)}) · 查看搁置发售剖析 →</button>`).join("")}
          </div>
        </div>` : ""}
        <div class="drawer-fee-actions">
          <button type="button" class="action-link-btn" data-jump-sponsor-fees="${escapeHtml(row.sponsorId)}">在「新股与费用」查看该机构承销项目 (${compactNumber(feeStats.n, 0)} 宗) →</button>
        </div>
      </section>`;
    } else {
      feeHtml = `<section class="drawer-insight-panel drawer-fee-panel">
        <div class="drawer-insight-head">
          <h4>2026 发行与承销费用实绩</h4>
          <span>招股书费用条款核验</span>
        </div>
        <p class="drawer-fee-status">暂无2026定价IPO（在审 ${compactCredit(row.activeCount)} 宗${row.listedCount > 0 ? ` · 2023–2025 已上市 ${compactCredit(row.listedCount)} 宗` : ""}）</p>
        ${feeStats?.pausedN > 0 ? `<div class="drawer-paused-strip">
          <span class="drawer-paused-label">涉及发售搁置（${feeStats.pausedN} 宗）</span>
          <div class="drawer-paused-links">
            ${feeStats.pausedDeals.map((deal) => `<button type="button" class="drawer-paused-btn" data-global-round="${escapeHtml(deal.id)}">${escapeHtml(deal.name)} (${escapeHtml(deal.code)}) · 查看搁置发售剖析 →</button>`).join("")}
          </div>
        </div>` : ""}
      </section>`;
    }
  }

  const faHtml = Array.isArray(row.faTransactions) && row.faTransactions.length > 0
    ? `<section class="drawer-insight-panel">
        <div class="drawer-insight-head">
          <h4>并购重组与再融资 FA 交易（${row.faTransactions.length} 宗）</h4>
          <span>仅计入 FA / 配售 / 包销角色</span>
        </div>
        <div class="drawer-paused-links">
          ${row.faTransactions.map((tx) => `<button type="button" class="drawer-paused-btn" data-global-tx="${escapeHtml(tx.id)}">${escapeHtml(tx.name)} (${escapeHtml(tx.code)}) · ${escapeHtml(tx.mechanism)} →</button>`).join("")}
        </div>
      </section>`
    : "";

  return paceHtml + feeHtml + faHtml;
}

function formatFeeBps(bps) {
  if (!isNumber(bps)) return "—";
  return `${(bps / 100).toFixed(2)}%`;
}

function findOfferingRoundForFact(fact) {
  if (!fact) return null;
  const rows = offeringRosterRows();
  if (!rows.length) return null;
  if (fact.issuerId) {
    const byIssuer = rows.find((row) => row.issuerId === fact.issuerId);
    if (byIssuer) return byIssuer;
  }
  if (fact.hkexListingStockCode) {
    const code = String(fact.hkexListingStockCode).replace(/\.HK$/i, "").padStart(5, "0");
    const byCode = rows.find((row) => row.code === code);
    if (byCode) return byCode;
  }
  return null;
}

function formatMatchedRoundFeeSummary(round) {
  if (!round) return "";
  const parts = [];
  if (round.route === "paused_offer") {
    parts.push("搁置发售");
  } else {
    const grossRaw = Number(round.actual?.gross?.value ?? round.offered?.gross?.value ?? round.gross?.hkd);
    if (Number.isFinite(grossRaw) && grossRaw > 0) {
      parts.push(`募资 HK$${compactNumber(grossRaw / 1e8, 2)}亿`);
    }
  }
  if (isNumber(round.fixedBps)) parts.push(`固定佣金 ${formatFeeBps(round.fixedBps)}`);
  if (isNumber(round.upperBps)) parts.push(`最高总费率 ${formatFeeBps(round.upperBps)}`);
  const fee = effectiveSponsorFeeForRound(round);
  if (fee) {
    parts.push(`保荐费 ${formatSponsorFeeMoney(fee.value, fee.currency, fee.approximate)}`);
  }
  return parts.join(" · ");
}

function rowHtml(row, rank, showMarketCap) {
  const primary = metricDisplay(row);
  const marketCap = marketCapDisplay(row);
  const type6 = capacityDisplay(row);
  const lifecycle = lifecycleDisplay(row);
  const feeStats = row.firmScope !== "rollup" ? sponsorFeeStats(row.sponsorId) : null;
  const marketCapCell = showMarketCap
    ? `<td data-label="${escapeHtml(marketCapHeaderText())}" class="col-num"><span class="number">${renderQualifiedHtml(marketCap.main)}</span></td>`
    : "";
  const scopePill =
    row.firmScope === "rollup"
      ? '<span class="pill amber">合并口径</span>'
      : "";
  const isInteractiveFirm = row.firmScope !== "benchmark";
  const industries = row.topIndustries?.length
    ? row.topIndustries
        .map((tag) =>
          isInteractiveFirm
            ? `<button type="button" class="pill sl-pill-btn" data-open-sponsor-id="${escapeHtml(row.sponsorId)}" data-open-sponsor-industry="${escapeHtml(tag)}" title="点击查看 ${escapeHtml(row.displayNameZh)} · ${escapeHtml(tag)} 项目明细">${escapeHtml(tag)}</button>`
            : `<span class="pill">${escapeHtml(tag)}</span>`,
        )
        .join("")
    : '<span class="pill">待披露</span>';
  const typePillDefs = [
    row.ahCount > 0 ? { cat: "A+H", label: `A+H ${compactCredit(row.ahCount)}`, tip: "点击查看该机构 A+H 申报与上市项目" } : null,
    row.hShareCount > 0 ? { cat: "H股", label: `H股 ${compactCredit(row.hShareCount)}`, tip: "点击查看该机构境内注册 H 股项目" } : null,
    row.redChipCount > 0 ? { cat: "红筹", label: `红筹 ${compactCredit(row.redChipCount)}`, tip: "点击查看该机构红筹架构项目" } : null,
    row.deSpacCount > 0 ? { cat: "De-SPAC", label: `De-SPAC ${compactCredit(row.deSpacCount)}`, tip: "点击查看该机构 De-SPAC 并购上市项目" } : null,
    row.hdrCount > 0 ? { cat: "HDR", label: `HDR ${compactCredit(row.hdrCount)}`, tip: "点击查看该机构香港预托证券 HDR 项目" } : null,
    row.otherIssuerTypeCount > 0
      ? {
          cat: "其他",
          label: `港资/海外 ${compactCredit(row.otherIssuerTypeCount)}`,
          tip: "点击查看该机构香港本地企业、海外外国企业及香港 OFC 上市基金（非内地 H 股/红筹架构）项目明细",
        }
      : null,
    row.faTxCount > 0 ? { cat: "FA", label: `交易FA ${compactCredit(row.faTxCount)}`, tip: "点击查看该机构并购重组与再融资 FA 交易" } : null,
  ].filter(Boolean);
  const typePills = typePillDefs
    .map((p) =>
      isInteractiveFirm
        ? `<button type="button" class="pill teal sl-pill-btn" data-open-sponsor-id="${escapeHtml(row.sponsorId)}" data-open-sponsor-cat="${escapeHtml(p.cat)}" title="${escapeHtml(p.tip)}">${escapeHtml(p.label)}</button>`
        : `<span class="pill teal">${escapeHtml(p.label)}</span>`,
    )
    .join("");
  const natureHtml = isInteractiveFirm && row.sponsorNature
    ? `<button type="button" class="pill teal sl-pill-btn${state.nature === row.sponsorNature ? " is-active" : ""}" data-filter-nature="${escapeHtml(row.sponsorNature)}" title="点击按「${escapeHtml(row.sponsorNature)}」筛选榜单（再次点击恢复全部）">${escapeHtml(row.sponsorNature)}</button>`
    : `<span class="pill teal">${escapeHtml(row.sponsorNature || "待核")}</span>`;
  const effRowBps = feeStats ? (isNumber(feeStats.effectiveFixedBps) ? feeStats.effectiveFixedBps : feeStats.fixedMedianBps) : null;
  const perCapMini = isNumber(row.econPerSponsorPrincipalHkdM)
    ? `<details data-app-group class="sl-econ-inline"><summary>SP人均 ${escapeHtml(formatHkdMillionsShort(row.econPerSponsorPrincipalHkdM))}${isNumber(row.econPerExecutionStaffHkdM) ? ` · Rep ${escapeHtml(formatHkdMillionsShort(row.econPerExecutionStaffHkdM))}` : ""} ▾</summary><div class="sl-econ-inline-body">SP：${escapeHtml(formatEconSplitParts(row.spFeePerSpHkdM, row.commPerSpHkdM))}${isNumber(row.econPerExecutionStaffHkdM) ? `<br>Rep(含非SP RO)：${escapeHtml(formatEconSplitParts(row.spFeePerExecHkdM, row.commPerExecHkdM))}` : ""}</div></details>`
    : "";
  const listedFeeSub = (isNumber(effRowBps)
    ? `<span class="sub-number sl-nowrap" title="有效固定佣金率（Σ固定佣金/Σ发行规模）${isNumber(feeStats?.fixedMedianBps) ? ` · 单数中位 ${formatFeeBps(feeStats.fixedMedianBps)}` : ""}">有效佣金 ${escapeHtml(formatFeeBps(effRowBps))}</span>`
    : "") + perCapMini;
  const isEconPrimary = ["econTotalHkdM", "econPerSponsorPrincipalHkdM", "econPerExecutionStaffHkdM"].includes(state.metric);
  const primarySubHtml = isEconPrimary && primary.sub ? `<span class="sub-number sl-econ-sub">${escapeHtml(primary.sub)}</span>` : "";
  return `<tr class="clickable-row" data-sponsor="${escapeHtml(row.sponsorId)}">
    <td data-label="排名" class="rank">${escapeHtml(rank)}</td>
    <td data-label="保荐人" class="sponsor-cell">
      <input type="checkbox" aria-label="比较 ${escapeHtml(row.displayNameZh)}" data-compare-firm="${escapeHtml(row.sponsorId)}" ${p0CompareIds.includes(row.sponsorId)?'checked':''} ${p0CompareIds.length>=4&&!p0CompareIds.includes(row.sponsorId)?'disabled':''}><button type="button" id="sponsor-${escapeHtml(row.sponsorId)}" title="${escapeHtml((row.legalNames||[]).join(" · "))} ${escapeHtml(row.registeredEntity?.ce||"")}" aria-label="查看${escapeHtml(row.displayNameZh)}详情">${escapeHtml(row.displayNameZh)}</button>
      <small>${escapeHtml(row.displayNameEn)}</small>
      <span class="row-action">查看详情</span>
      ${scopePill}
    </td>
    <td data-label="性质">${natureHtml}</td>
    <td data-label="SP / 六号牌" class="col-num"><span class="number">${escapeHtml(type6.main)}</span><span class="sub-number">${escapeHtml(type6.sub)}</span></td>
    <td data-label="项目" class="col-num"><span class="number">${compactCredit(row.projectCount)}</span><span class="sub-number">${typePills}</span></td>
    <td data-label="申请中" class="col-num"><span class="number">${compactCredit(row.activeCount)}</span></td>
    <td data-label="已上市" class="col-num"><span class="number">${compactCredit(row.listedCount)}</span>${listedFeeSub}</td>
    <td data-label="A+H" class="col-num"><span class="number">${compactCredit(row.ahCount)}</span></td>
    <td data-label="排名指标" class="col-num"><span class="number">${renderQualifiedHtml(primary.main)}</span>${primarySubHtml}</td>
    ${marketCapCell}
    <td data-label="${escapeHtml(lifecycleHeaderText())}" class="col-num"><span class="number">${escapeHtml(lifecycle.main)}</span><span class="sub-number">${escapeHtml(lifecycle.sub)}</span></td>
    <td data-label="行业">${industries}</td>
  </tr>`;
}

function render() {
  if (!state.data) return;
  p0SponsorUrl();
  const facts = creditedFacts(filteredFacts());
  const rows = aggregateFacts(facts);
  const showMarketCap = shouldShowMarketCap(rows);
  state.activeFacts = facts;
  state.activeRows = rows;p0CompareBar();
  const cardsMarkup = metricCards(rows);
  els.metricStrip.innerHTML = cardsMarkup;
  els.metricStrip.hidden = !cardsMarkup;
  els.primaryMetricHead.querySelector(".sl-th-label").textContent = metricLabels[state.metric] || "排名指标";
  els.marketCapHead.hidden = !showMarketCap;
  els.marketCapHead.querySelector(".sl-th-label").textContent = marketCapHeaderText();
  if (els.lifecycleHead) {
    els.lifecycleHead.querySelector(".sl-th-label").textContent = lifecycleHeaderText();
    els.lifecycleHead.title = lifecycleHeaderTitle();
  }
  els.resultHint.textContent = `${compactNumber(rows.length)} 家保荐机构 · ${creditLabels[state.credit]}`;
  if (!rows.length) {
    els.leaderboardRows.innerHTML = `<tr><td colspan="${showMarketCap ? 12 : 11}" class="empty-state">${p0SponsorEmpty()}</td></tr>`;
    return;
  }
  const ranks = metricRanks(rows);
  els.leaderboardRows.innerHTML = rows.map((row) => rowHtml(row, ranks.get(row.sponsorId), showMarketCap)).join("");
  els.leaderboardRows.querySelectorAll("tr[data-sponsor]").forEach((row) => {
    row.addEventListener("click", (event) => {
      if (!(event.target instanceof Element)) return;
      const catBtn = event.target.closest("button[data-open-sponsor-cat]");
      if (catBtn) {
        openDrawer(catBtn.dataset.openSponsorId || row.dataset.sponsor, true, {
          category: catBtn.dataset.openSponsorCat,
          scrollToDeals: true,
        });
        return;
      }
      const indBtn = event.target.closest("button[data-open-sponsor-industry]");
      if (indBtn) {
        openDrawer(indBtn.dataset.openSponsorId || row.dataset.sponsor, true, {
          industry: indBtn.dataset.openSponsorIndustry,
          scrollToDeals: true,
        });
        return;
      }
      const natBtn = event.target.closest("button[data-filter-nature]");
      if (natBtn && natBtn.dataset.filterNature) {
        const targetNat = natBtn.dataset.filterNature;
        state.nature = state.nature === targetNat ? "all" : targetNat;
        state.preset = "custom";
        syncControls();
        render();
        renderPk();
        return;
      }
      if (event.target.closest("a, input, details[data-app-group]")) return;
      openDrawer(row.dataset.sponsor);
    });
  });
}

function unifiedLicenseProvenanceNote() {
  const firms = state.data?.firms || [];
  const spDates = [...new Set(firms.map((f) => f.sponsorPrincipalAsOfDate).filter(Boolean))].sort();
  const t6Dates = [...new Set(firms.map((f) => f.type6AsOfDate).filter(Boolean))].sort();
  const spPart = spDates.length ? `SP名册截至 ${spDates.at(-1)}` : "";
  const t6Part = t6Dates.length ? `六号牌名册截至 ${t6Dates.at(-1)}` : "";
  return [spPart, t6Part].filter(Boolean).join("；");
}

function pkMetricRows(rowA, rowB) {
  const metrics = [
    {
      label: "项目总数（含并购/配售FA） / Total mandates",
      key: "projectCount",
      value: (row) => row.projectCount,
      format: compactCredit,
      higher: true,
      note: "IPO保荐 + 并购重组/再融资FA",
      coverage: (row) => row.faTxCount > 0 ? `含交易FA ${compactCredit(row.faTxCount)} 宗（不含IFA）` : "",
    },
    {
      label: "总经济（保荐+估佣） / Total economics",
      key: "econTotalHkdM",
      value: (row) => row.econTotalHkdM,
      format: (value) => (isNumber(value) ? formatHkdMillionsShort(value) : "待披露"),
      higher: true,
      note: "联席平分归属口径 / Attributed economics",
      coverage: totalEconSubLabel,
    },
    {
      label: "SP人均经济 / Economics per SP",
      key: "econPerSponsorPrincipalHkdM",
      value: (row) => row.econPerSponsorPrincipalHkdM,
      format: (value) => (isNumber(value) ? formatHkdMillionsPerPerson(value, "SP") : "待披露"),
      higher: true,
      note: "拆保荐费与估佣 / Per Sponsor Principal",
      coverage: spEconSubLabel,
    },
    {
      label: "Rep人均经济（含非SP RO） / Economics per Rep",
      key: "econPerExecutionStaffHkdM",
      value: (row) => row.econPerExecutionStaffHkdM,
      format: (value) => (isNumber(value) ? formatHkdMillionsPerPerson(value, "人") : "待披露"),
      higher: true,
      note: "分母含Rep与非SP RO / Per execution staff",
      coverage: execEconSubLabel,
    },
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
      format: (value, row) => {
        if (isNumber(value) && value > 0) return formatAShareCap(row, "applyingAhMarketCap");
        if (row.firmScope !== "benchmark" && (!row.ahCount || row.ahCount <= 0)) return "纯H股/红筹为主（0 宗 A+H）";
        if (row.firmScope !== "benchmark" && !row.applyingAhMarketCapCoverage?.total) return "暂无申请中 A+H 项目";
        return formatAShareCap(row, "applyingAhMarketCap");
      },
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
  const isRealFirm = row.firmScope !== "benchmark";
  const capacity = capacityDisplay(row);
  const feeStats = isRealFirm && row.firmScope !== "rollup" ? sponsorFeeStats(row.sponsorId) : null;
  const note = row.firmScope === "benchmark"
    ? row.benchmarkNote || "组内中位数"
    : row.firmScope === "rollup"
      ? `${row.displayNameEn} · 合并口径`
    : row.emptyFilter
      ? `${row.displayNameEn} · 当前筛选暂无样本`
      : `${row.displayNameEn} · ${row.sponsorNature || "待核"}`;
  const attrs = isRealFirm
    ? ` data-pk-sponsor="${escapeHtml(row.sponsorId)}" tabindex="0" role="button" aria-label="查看${escapeHtml(row.displayNameZh)}保荐机构执业档案"`
    : "";
  const feeRosterLoaded = offeringRosterRows().length > 0;
  let feeFoot = "";
  if (isRealFirm && row.firmScope !== "rollup" && feeRosterLoaded) {
    if ((feeStats && feeStats.n > 0) || isNumber(row.econTotalHkdM)) {
      const spSplit = formatEconSplitParts(row.spFeePerSpHkdM, row.commPerSpHkdM);
      const execSplit = formatEconSplitParts(row.spFeePerExecHkdM, row.commPerExecHkdM);
      feeFoot = `<div class="spk-card-fee">
        ${isNumber(row.econTotalHkdM) ? `<span title="${escapeHtml(totalEconSubLabel(row))}">总经济 <b>${escapeHtml(formatHkdMillionsShort(row.econTotalHkdM))}</b></span>` : ""}
        ${isNumber(row.econPerSponsorPrincipalHkdM) ? `<span title="${escapeHtml(spSplit)}">SP人均 <b>${escapeHtml(formatHkdMillionsPerPerson(row.econPerSponsorPrincipalHkdM, "SP"))}</b>${spSplit ? `<i class="spk-econ-sub">（${escapeHtml(spSplit)}）</i>` : ""}</span>` : ""}
        ${isNumber(row.econPerExecutionStaffHkdM) ? `<span title="${escapeHtml(execSplit)}">Rep人均(含非SP RO) <b>${escapeHtml(formatHkdMillionsPerPerson(row.econPerExecutionStaffHkdM, "人"))}</b></span>` : ""}
        ${feeStats && feeStats.n > 0 ? `<span>有效佣金率 <b>${escapeHtml(formatFeeBps(feeStats.effectiveFixedBps ?? feeStats.fixedMedianBps))}</b></span>` : ""}
        ${feeStats?.pausedN > 0 ? `<span class="spk-card-paused">搁置发售 <b>${compactNumber(feeStats.pausedN, 0)}</b> 宗</span>` : ""}
      </div>`;
    } else {
      feeFoot = `<div class="spk-card-fee is-status">
        <span>期内暂无定价IPO（在审 <b>${compactCredit(row.activeCount)}</b> 宗${row.faTxCount > 0 ? ` · 交易FA <b>${compactCredit(row.faTxCount)}</b> 宗` : ""}）</span>
        ${feeStats?.pausedN > 0 ? `<span class="spk-card-paused">搁置发售 <b>${compactNumber(feeStats.pausedN, 0)}</b> 宗</span>` : ""}
      </div>`;
    }
  }
  return `<article class="spk-card${isRealFirm ? " is-clickable" : " is-benchmark"}"${attrs}>
    <div class="spk-card-head">
      <span>${escapeHtml(sideLabel)}</span>
      ${isRealFirm ? '<em class="spk-card-cue">查看执业档案 →</em>' : '<em class="spk-card-tag">市场基准</em>'}
    </div>
    <strong>${escapeHtml(row.displayNameZh)}</strong>
    <small>${escapeHtml(note)}</small>
    <div class="spk-card-grid">
      <div><b>${compactCredit(row.projectCount)}</b><span>项目总数${row.faTxCount > 0 ? `(含FA ${compactCredit(row.faTxCount)})` : ""}</span></div>
      <div><b>${compactCredit(row.activeCount)}</b><span>公开申请中</span></div>
      <div><b>${compactCredit(row.listedCount)}</b><span>已上市</span></div>
      <div><b>${escapeHtml(capacity.main)}</b><span>${escapeHtml(capacity.sub)}</span></div>
    </div>
    ${feeFoot}
  </article>`;
}

function renderPkMetric(metric, rowA, rowB) {
  const labelZh = String(metric.label || "").split(" / ")[0];
  const noteZh = String(metric.note || (metric.higher ? "规模口径" : "周期较短")).split(" / ")[0];
  return `<article class="spk-metric-row" aria-label="${escapeHtml(metric.label)}">
    <div class="spk-metric-side spk-metric-a${pkWinnerClass(metric, "a")}" ${pkBarStyle(metric, "a")}>
      <div class="spk-metric-readout">
        <span class="spk-side-mobile-name">${escapeHtml(rowA.displayNameZh)}</span>
        <b>${renderQualifiedHtml(metric.format(metric.a, rowA))}</b>
      </div>
      <div class="spk-bar-track" aria-hidden="true"><i></i></div>
      ${metric.coverage ? `<small class="market-cap-coverage">${metric.key === "activeCount" ? applicationDetails(rowA) : escapeHtml(metric.coverage(rowA))}</small>` : ""}
    </div>
    <div class="spk-metric-name">
      <strong>${escapeHtml(labelZh)}</strong>
      <span>${escapeHtml(noteZh)}</span>
    </div>
    <div class="spk-metric-side spk-metric-b${pkWinnerClass(metric, "b")}" ${pkBarStyle(metric, "b")}>
      <div class="spk-bar-track" aria-hidden="true"><i></i></div>
      <div class="spk-metric-readout">
        <span class="spk-side-mobile-name">${escapeHtml(rowB.displayNameZh)}</span>
        <b>${renderQualifiedHtml(metric.format(metric.b, rowB))}</b>
      </div>
      ${metric.coverage ? `<small class="market-cap-coverage">${metric.key === "activeCount" ? applicationDetails(rowB) : escapeHtml(metric.coverage(rowB))}</small>` : ""}
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
  p0SponsorUrl();
  if (!state.data || !pkRoot || !pkEls.versus || !pkEls.metrics) return;
  const scopedFacts = pkFilteredFacts();
  const rows = aggregateFactsForCredit(scopedFacts, pkState.credit);
  const comparisonRows = rowsWithBenchmarks(rows);
  // Keep sponsors selectable even when this credit mode gives them no deals.
  const optionRows = aggregateFactsForCredit(pkOptionFacts(), "creditAllFull", "all", true);
  const selectorRows = [...benchmarkRows(rows), ...optionRows];
  populatePkOptions(selectorRows);
  if (p0CompareIds.length === 2) {
    pkState.sponsorA = p0CompareIds[0];
    pkState.sponsorB = p0CompareIds[1];
  }
  const rowA = pkComparableRow(pkState.sponsorA, comparisonRows, selectorRows) || comparisonRows.find((row) => row.firmScope !== "benchmark") || selectorRows.find((row) => row.firmScope !== "benchmark") || comparisonRows[0] || selectorRows[0];
  const rowB = pkComparableRow(pkState.sponsorB, comparisonRows, selectorRows) || comparisonRows.find((row) => row.sponsorId === `${BENCHMARK_PREFIX}all`) || comparisonRows.find((row) => row.sponsorId !== rowA?.sponsorId) || selectorRows.find((row) => row.sponsorId !== rowA?.sponsorId) || comparisonRows[1] || selectorRows[1] || rowA;
  const multiCompare = p0CompareIds.length >= 3;
  pkRoot.classList?.toggle?.("is-multi-compare", multiCompare);
  if (!rowA || !rowB) {
    if (pkEls.cardA) {
      pkEls.cardA.hidden = false;
      pkEls.cardA.innerHTML = '<div class="empty-state">该时间范围暂无可比较样本 / No comparable sample in this date range</div>';
    }
    if (pkEls.cardB) {
      pkEls.cardB.hidden = true;
      pkEls.cardB.innerHTML = "";
    }
    pkEls.metrics.hidden = true;
    pkEls.metrics.innerHTML = "";
    return;
  }
  pkState.sponsorA = rowA.sponsorId;
  pkState.sponsorB = rowB.sponsorId;
  pkEls.sponsorA.value = pkState.sponsorA;
  pkEls.sponsorB.value = pkState.sponsorB;
  pkEls.creditLabel.textContent = creditLabels[pkState.credit] || "具名全部计入";
  const sourceDate = state.data.meta?.sourceGeneratedAt || state.data.meta?.generatedAt || "待披露";
  const sectorNote = state.sector === "all" ? "" : " 赛道比较只按项目行业标签重聚合。";
  const licNote = unifiedLicenseProvenanceNote();
  pkEls.sourceNote.textContent = `保荐人擂台 · ${scopeLabel()} · 基准按组内中位数显示。${sectorNote} 快照 ${sourceDate}${licNote ? ` · ${licNote}` : ""}。`;
  if (multiCompare) {
    if (pkEls.cardA) {
      pkEls.cardA.hidden = true;
      pkEls.cardA.innerHTML = "";
    }
    if (pkEls.cardB) {
      pkEls.cardB.hidden = true;
      pkEls.cardB.innerHTML = "";
    }
    pkEls.metrics.hidden = true;
    pkEls.metrics.innerHTML = "";
  } else {
    if (pkEls.cardA) {
      pkEls.cardA.hidden = false;
      pkEls.cardA.innerHTML = renderPkCard(rowA, "擂台机构 A");
    }
    if (pkEls.cardB) {
      pkEls.cardB.hidden = false;
      pkEls.cardB.innerHTML = renderPkCard(rowB, rowB.firmScope === "benchmark" ? "市场基准 B" : "擂台机构 B");
    }
    pkEls.metrics.hidden = false;
    const headHtml = `<div class="spk-butterfly-head"><span class="spk-bh-a">${escapeHtml(rowA.displayNameZh)}</span><div class="spk-bh-center"><h3>核心指标蝶形对比</h3><span>深蓝条表示该项领先</span></div><span class="spk-bh-b">${escapeHtml(rowB.displayNameZh)}</span></div>`;
    pkEls.metrics.innerHTML = headHtml + pkMetricRows(rowA, rowB).map((metric) => renderPkMetric(metric, rowA, rowB)).join("");
    bindApplicationDetails(pkEls.metrics, [rowA, rowB]);
  }
  p0CompareTable(comparisonRows, selectorRows);
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
  const amount = `${listing && status === "estimate" ? "约 / Est. " : ""}${formatCap(value, currency)}`;
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
  return renderDocumentLink(link, "source-link");
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
  const matchedRound = findOfferingRoundForFact(fact);
  const matchedFeeSummary = formatMatchedRoundFeeSummary(matchedRound);
  const dealAttrs = matchedRound?.id
    ? ` data-global-round="${escapeHtml(matchedRound.id)}" data-issuer-id="${escapeHtml(fact.issuerId || "")}" tabindex="0" role="button"`
    : fact.issuerId
      ? ` data-issuer-id="${escapeHtml(fact.issuerId)}" tabindex="0" role="button"`
      : "";
  const jumpButton = matchedRound?.id
    ? `<button type="button" class="deal-jump-btn" data-global-round="${escapeHtml(matchedRound.id)}">${matchedRound.route === "paused_offer" ? "搁置发售剖析 →" : "发行与费用档案 →"}</button>`
    : fact.issuerId
      ? `<button type="button" class="deal-jump-btn" data-open-regulatory="${escapeHtml(fact.issuerId)}">监管档案 →</button>`
      : "";
  const dealContextLine = (() => {
    if (fact.hkexStage === "listed") {
      const mcapVal = isNumber(fact.listingMarketCapHkdBn) && fact.listingMarketCapHkdBn > 0
        ? fact.listingMarketCapHkdBn
        : isNumber(fact.listingMarketCapEstimateHkdBn) && fact.listingMarketCapEstimateHkdBn > 0
          ? fact.listingMarketCapEstimateHkdBn
          : null;
      const mcapText = isNumber(mcapVal) ? `上市市值 HKD ${compactNumber(mcapVal * 10, mcapVal >= 10 ? 0 : 1)}亿` : "已上市项目";
      const dateText = fact.listingDate ? `上市日 ${fact.listingDate}` : completionDate ? `完成日 ${completionDate}` : "";
      return [mcapText, dateText, displayIssuerTypeLabel(fact.issuerType)].filter(Boolean).join(" · ");
    }
    if (fact.isAH && isNumber(fact.aShareMarketCapAtA1RmbBn) && fact.aShareMarketCapAtA1RmbBn > 0) {
      return `A股 CNY ${compactNumber(fact.aShareMarketCapAtA1RmbBn * 10, fact.aShareMarketCapAtA1RmbBn >= 10 ? 0 : 1)}亿 · A1 ${formatDate(fact.a1Date)} · ${fact.statusLabelZh || "备案推进中"}`;
    }
    return `A1 ${formatDate(fact.a1Date)} · ${fact.applicationStatusLabelZh || fact.hkexPublicStatus || "申请推进中"} · ${fact.statusLabelZh || displayIssuerTypeLabel(fact.issuerType) || "进度跟踪"}`;
  })();
  return `<article class="deal-item"${dealAttrs}>
    <div class="deal-item-head">
      <strong>${escapeHtml(primaryName)}${fact.hkexListingStockCode ? ` · ${escapeHtml(fact.hkexListingStockCode)}` : ""}</strong>
      ${jumpButton}
    </div>
    ${shadowName ? `<small class="shadow-name">${escapeHtml(shadowName)}</small>` : ""}
    <small class="deal-context-line">${escapeHtml(dealContextLine)}</small>
    ${matchedFeeSummary ? `<small class="deal-fee-badge${matchedRound?.route === "paused_offer" ? " is-paused" : ""}">${escapeHtml(matchedFeeSummary)}</small>` : ""}
    <small>
      ${escapeHtml(fact.applicationStatusLabelZh || fact.hkexPublicStatus || "未见港交所申请状态")}${fact.hkexReturnedApplication?.date ? " · " + escapeHtml(fact.hkexReturnedApplication.date) : ""} · 备案 ${escapeHtml(fact.statusLabelZh || fact.status || "待核")} · ${escapeHtml(displayIssuerTypeLabel(fact.issuerType) || "类型待核")} ·
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

function openDealFromDrawer(deal) {
  if (!deal) return;
  const roundId = deal.dataset.globalRound;
  const issuerId = deal.dataset.issuerId;
  if (roundId) {
    closeDrawer(false);
    if (typeof openOfferingDossier === "function") openOfferingDossier(roundId);
    return;
  }
  if (issuerId) {
    closeDrawer(false);
    if (typeof switchView === "function") switchView("tracker");
    if (typeof openDetail === "function") openDetail(issuerId);
  }
}

function openSponsorFromPk(sponsorId) {
  if (!sponsorId || sponsorId.startsWith(BENCHMARK_PREFIX)) return;
  if (typeof switchView === "function" && pkRoot?.classList?.contains?.("is-visible")) {
    switchView("sponsorLeaderboard");
    Promise.resolve(ensureInit()).then(() => {
      window.requestAnimationFrame(() => openDrawer(sponsorId, true));
    });
    return;
  }
  openDrawer(sponsorId, true);
}

function openDrawer(sponsorId, updateLocation = true, filterOpts = null) {
  let row = state.activeRows.find((item) => item.sponsorId === sponsorId);
  if (!row && state.data?.projectFacts) {
    row = aggregateFactsForCredit(state.data.projectFacts, state.credit).find((item) => item.sponsorId === sponsorId);
  }
  if (!row) return;
  const activeCat = filterOpts?.category || "all";
  const activeInd = filterOpts?.industry || "";
  const scrollToDeals = Boolean(filterOpts?.scrollToDeals);
  const preserveScroll = Boolean(filterOpts?.preserveScroll);
  const wasOpen = Boolean(els.drawer?.classList?.contains?.("is-open"));
  const panel = els.drawer?.querySelector?.(".sl-drawer-panel");
  const prevScroll = preserveScroll && panel ? panel.scrollTop : null;
  if (!wasOpen) p0SponsorTrigger = document.activeElement;
  if(updateLocation&&typeof window!=='undefined'&&typeof history!=='undefined'){const previous=location.pathname+location.search;history.replaceState({...history.state,scrollY:window.scrollY,triggerSelector:'#sponsor-'+CSS.escape(sponsorId)},'',previous);const p=new URLSearchParams(location.search);p.set('firm',sponsorId);history.pushState({fromUrl:previous,scrollY:window.scrollY},'',location.pathname+'?'+p);}
  const allFacts = [...row.facts].sort((a, b) => {
    const ad = a.listingDate || a.noticeDate || a.a1Date || "";
    const bd = b.listingDate || b.noticeDate || b.a1Date || "";
    return bd.localeCompare(ad);
  });
  const faItems = Array.isArray(row.faTransactions) ? row.faTransactions : [];
  const filteredFacts = allFacts.filter((f) => {
    if (activeInd && !(f.industryTags || []).includes(activeInd) && !(f.csrcIndustryTags || []).includes(activeInd)) return false;
    if (activeCat === "all") return true;
    if (activeCat === "FA") return false;
    if (activeCat === "applying") return f.hkexStage === "applying";
    if (activeCat === "listed") return f.hkexStage === "listed";
    if (activeCat === "A+H") return Boolean(f.isAH) || f.issuerType === "A+H";
    return f.issuerType === activeCat;
  });
  const registration = row.registeredEntity;
  const registerLink = registration ? `<a class="pill" href="https://apps.sfc.hk/publicregWeb/corp/${encodeURIComponent(registration.ce)}/details" target="_blank" rel="noopener noreferrer">${escapeHtml(registration.legalNameZh)} · SFC ${escapeHtml(registration.ce)}</a>` : "";
  const legalNames = (row.legalNames || [])
    .map((name) => `<span class="pill">${escapeHtml(name)}</span>`)
    .join("");
  const industries = (row.topIndustries || [])
    .map(
      (name) =>
        `<button type="button" class="pill teal sl-pill-btn${activeInd === name ? " is-active" : ""}" data-drawer-sponsor="${escapeHtml(row.sponsorId)}" data-drawer-industry="${escapeHtml(name)}" title="点击筛选该机构「${escapeHtml(name)}」项目">${escapeHtml(name)}</button>`,
    )
    .join("");
  const principalSources = capacitySourcePills(row, "sponsorPrincipal");
  const type6Sources = capacitySourcePills(row, "type6");
  const insightsHtml = renderDrawerInsights(row);
  let drawerStatsHtml = drawerStats(row).replaceAll(
    EST_QUALIFIER,
    `<span class="sl-est-qualifier">${EST_QUALIFIER}</span>`,
  );
  if (row.aShareMarketCapRmbBnSum == null && row.aShareMarketCapN > 0 && row.aShareMarketCapCoverage?.total > 0) {
    drawerStatsHtml = drawerStatsHtml.replace(
      `<span>${escapeHtml(metricLabels.aShareMarketCapRmbBnSum)}</span>\n        <strong>—</strong>`,
      `<span>${escapeHtml(metricLabels.aShareMarketCapRmbBnSum)}</span>\n        <strong>部分覆盖 (${row.aShareMarketCapN}/${row.aShareMarketCapCoverage.total}宗)</strong>`,
    );
  }
  const catTabs = [
    { key: "all", label: `全部 ${allFacts.length}` },
    row.activeCount > 0 ? { key: "applying", label: `申请中 ${compactCredit(row.activeCount)}` } : null,
    row.listedCount > 0 ? { key: "listed", label: `已上市 ${compactCredit(row.listedCount)}` } : null,
    row.ahCount > 0 ? { key: "A+H", label: `A+H ${compactCredit(row.ahCount)}` } : null,
    row.hShareCount > 0 ? { key: "H股", label: `H股 ${compactCredit(row.hShareCount)}` } : null,
    row.redChipCount > 0 ? { key: "红筹", label: `红筹 ${compactCredit(row.redChipCount)}` } : null,
    row.deSpacCount > 0 ? { key: "De-SPAC", label: `De-SPAC ${compactCredit(row.deSpacCount)}` } : null,
    row.hdrCount > 0 ? { key: "HDR", label: `HDR ${compactCredit(row.hdrCount)}` } : null,
    row.otherIssuerTypeCount > 0 ? { key: "其他", label: `港资/海外 ${compactCredit(row.otherIssuerTypeCount)}` } : null,
    faItems.length > 0 ? { key: "FA", label: `交易FA ${faItems.length}` } : null,
  ].filter(Boolean);
  const catBarHtml = catTabs.length > 1
    ? `<div class="drawer-cat-bar" role="tablist" aria-label="项目明细分类筛选">${catTabs
        .map(
          (t) =>
            `<button type="button" class="pill sl-pill-btn drawer-cat-pill${activeCat === t.key && !activeInd ? " is-active" : ""}" data-drawer-sponsor="${escapeHtml(row.sponsorId)}" data-drawer-cat="${escapeHtml(t.key)}" aria-pressed="${activeCat === t.key && !activeInd}">${escapeHtml(t.label)}</button>`,
        )
        .join("")}${
        activeInd
          ? `<button type="button" class="pill teal sl-pill-btn is-active" data-drawer-sponsor="${escapeHtml(row.sponsorId)}" data-drawer-cat="all" title="清除行业筛选">行业：${escapeHtml(activeInd)} ×</button>`
          : ""
      }</div>`
    : "";
  const catExplainHtml =
    activeCat === "其他"
      ? `<p class="drawer-cat-explain"><strong>港资/海外架构说明：</strong>指香港本地运营企业、海外（东南亚 / 日韩 / 欧美 / 中亚）外国企业及香港第 20 章 OFC 上市基金（不属于中国内地注册 H 股或境内经营红筹架构）。</p>`
      : "";
  const dealsBodyHtml =
    activeCat === "FA"
      ? `<div class="drawer-paused-links">${faItems
          .map(
            (tx) =>
              `<button type="button" class="drawer-paused-btn" data-global-tx="${escapeHtml(tx.id)}">${escapeHtml(tx.name)} (${escapeHtml(tx.code)}) · ${escapeHtml(tx.mechanism)} · ${escapeHtml(tx.date || "")} →</button>`,
          )
          .join("") || '<span class="muted">暂无 FA 交易样本</span>'}</div>`
      : `<div class="deal-list">${filteredFacts.slice(0, 40).map(projectLine).join("") || '<p class="muted">该分类下暂无匹配项目</p>'}</div>
         ${filteredFacts.length > 40 ? `<details class="remaining-projects"><summary>查看其余 ${filteredFacts.length - 40} 个项目</summary><div class="deal-list"></div></details>` : ""}`;
  const headingCount = activeCat === "FA" ? faItems.length : filteredFacts.length;
  const headingSuffix =
    activeInd ? ` · ${activeInd}（${headingCount}）` : activeCat !== "all" ? ` · ${displayIssuerTypeLabel(activeCat)}（${headingCount}）` : `（${allFacts.length}）`;
  els.drawerContent.innerHTML = `<h3>${escapeHtml(row.displayNameZh)}</h3>
    <p class="drawer-subtitle">${escapeHtml(row.displayNameEn)} · ${escapeHtml(row.sponsorNature || "未披露")}</p>
    ${renderSponsorOwnership(row)}
    <div class="drawer-pills">${legalNames}${registerLink}</div>
    <div class="drawer-summary">${drawerStatsHtml}</div>
    ${insightsHtml}
    <h4>主要行业</h4>
    <div class="drawer-pills">${industries || '<span class="pill">待披露</span>'}</div>
    <section id="drawerDealsSection" class="drawer-deals-section">
      <h4>项目明细${escapeHtml(headingSuffix)}</h4>
      ${catBarHtml}
      ${catExplainHtml}
      ${dealsBodyHtml}
    </section>
    <details class="deal-sources-fold drawer-license-fold"><summary><span>牌照名册备查</span><small>展开 SFC 登记链接</small></summary><div class="deal-sources-fold-body"><div class="drawer-pills capacity-source-pills">${principalSources || '<span class="pill">未匹配 Sponsor Principal 行</span>'}${type6Sources || '<span class="pill">未匹配六号牌来源</span>'}</div></div></details>`;
  const remaining = els.drawerContent?.querySelector?.(".remaining-projects");
  remaining?.addEventListener?.("toggle", () => {
    if (remaining.open) remaining.querySelector(".deal-list").innerHTML = filteredFacts.slice(40).map(projectLine).join("");
  }, { once: true });
  els.drawer.classList.add("is-open");
  els.drawer.setAttribute("aria-hidden", "false");
  if (scrollToDeals) {
    const scrollTarget = () => {
      const sec = els.drawerContent?.querySelector?.("#drawerDealsSection");
      if (sec && panel) {
        panel.scrollTop = Math.max(0, sec.offsetTop - 56);
      } else {
        sec?.scrollIntoView?.({ behavior: "smooth", block: "start" });
      }
    };
    if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
      window.requestAnimationFrame(scrollTarget);
    } else {
      scrollTarget();
    }
  } else if (prevScroll !== null && panel) {
    panel.scrollTop = prevScroll;
  } else if (!wasOpen) {
    if (panel) panel.scrollTop = 0;
    els.drawerClose?.focus?.({ preventScroll: true });
  }
}

function closeDrawer(updateLocation=true) {if(!els.drawer?.classList.contains('is-open'))return;els.drawer.classList.remove('is-open');els.drawer.setAttribute('aria-hidden','true');p0SponsorTrigger?.focus({preventScroll:true});p0SponsorTrigger=null;if(updateLocation!==false){const p=new URLSearchParams(location.search);if(p.has('firm')){let canBack=false;if(history.state?.fromUrl){try{const u=new URL(history.state.fromUrl,location.href),v=u.searchParams.get('view');canBack=(v==='sponsors'||v==='sponsorLeaderboard'||v==='sponsorPk')&&!u.searchParams.get('firm');}catch{}}if(canBack)history.back();else{p.delete('firm');history.replaceState({...history.state,fromUrl:''},'',location.pathname+'?'+p);}}}}

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
  viewRoot.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const dq = event.target.closest("[data-date-quick]");
    if (dq) setDateQuickRange(dq.dataset.dateQuick);
  });
  viewRoot.querySelectorAll(".sl-th-sort").forEach((button) => {
    button.addEventListener("click", () => setSortFromHeader(button.dataset.sortKey));
  });
  const activateMetricCard = (card) => {
    if (!card) return;
    if (card.dataset.metricSponsor) {
      openDrawer(card.dataset.metricSponsor);
      return;
    }
    if (card.dataset.metricFocus) {
      state.metric = card.dataset.metricFocus;
      state.sortKey = card.dataset.metricFocus;
      state.sortHeaderKey = card.dataset.metricFocus === "projectCount" ? "projectCount" : "__metric";
      state.sortDir = null;
      syncControls();
      render();
      els.leaderboardRows?.closest?.(".sl-board")?.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
    }
  };
  els.metricStrip?.addEventListener?.("click", (event) => {
    if (!(event.target instanceof Element)) return;
    activateMetricCard(event.target.closest(".metric-card.is-clickable"));
  });
  els.metricStrip?.addEventListener?.("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    if (!(event.target instanceof Element)) return;
    const card = event.target.closest(".metric-card.is-clickable");
    if (card) {
      event.preventDefault();
      activateMetricCard(card);
    }
  });
  els.drawerContent?.addEventListener?.("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const catBtn = event.target.closest("button[data-drawer-cat]");
    if (catBtn) {
      openDrawer(catBtn.dataset.drawerSponsor, false, {
        category: catBtn.dataset.drawerCat || "all",
        preserveScroll: true,
      });
      return;
    }
    const indBtn = event.target.closest("button[data-drawer-industry]");
    if (indBtn) {
      const activeNow = indBtn.classList.contains("is-active");
      openDrawer(
        indBtn.dataset.drawerSponsor,
        false,
        activeNow
          ? { category: "all", preserveScroll: true }
          : { industry: indBtn.dataset.drawerIndustry || "", scrollToDeals: true },
      );
      return;
    }
    if (event.target.closest("button[data-jump-sponsor-fees], button[data-global-round], button[data-global-tx], button[data-open-regulatory]")) {
      closeDrawer(false);
      return;
    }
    if (event.target.closest("a, button, summary, details[data-app-group]")) return;
    const deal = event.target.closest(".deal-item[data-issuer-id], .deal-item[data-global-round]");
    if (deal) openDealFromDrawer(deal);
  });
  els.drawerContent?.addEventListener?.("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    if (!(event.target instanceof Element)) return;
    if (event.target.closest("a, button, summary")) return;
    const deal = event.target.closest(".deal-item[data-issuer-id], .deal-item[data-global-round]");
    if (deal) {
      event.preventDefault();
      openDealFromDrawer(deal);
    }
  });
  els.clearButton.addEventListener("click", () => {
    state.search = "";
    state.metric = "projectCount";
    state.sortKey = "projectCount";
    state.sortHeaderKey = "projectCount";
    state.sortDir = null;
    state.credit = "creditAllFull";
    p0SponsorReset();
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
    if (p0CompareIds.length >= 2) p0CompareIds = [];
    pkState.sponsorA = pkEls.sponsorA.value;
    renderPk();
  });
  pkEls.sponsorB.addEventListener("change", () => {
    if (p0CompareIds.length >= 2) p0CompareIds = [];
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
  pkRoot.addEventListener?.("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const dq = event.target.closest("[data-date-quick]");
    if (dq) setDateQuickRange(dq.dataset.dateQuick);
  });
  pkEls.swapButton.addEventListener("click", () => {
    if (p0CompareIds.length >= 2) p0CompareIds = [];
    const previous = pkState.sponsorA;
    pkState.sponsorA = pkState.sponsorB;
    pkState.sponsorB = previous;
    renderPk();
  });
  pkRoot.addEventListener?.("click", (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest("button[data-exit-multi-compare]")) {
      p0CompareIds = [];
      p0CompareOffset = 0;
      p0SponsorUrl();
      render();
      renderPk();
      return;
    }
    if (event.target.closest("a, select, input, summary, details[data-app-group]")) return;
    const target = event.target.closest("[data-pk-sponsor]");
    if (target?.dataset.pkSponsor) {
      openSponsorFromPk(target.dataset.pkSponsor);
    }
  });
  pkRoot.addEventListener?.("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest("[data-pk-sponsor]");
    if (target?.dataset.pkSponsor) {
      event.preventDefault();
      openSponsorFromPk(target.dataset.pkSponsor);
    }
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
  ensureCsrcRecordsLoaded();
}

async function init() {
  cacheElements();
  cachePkElements();
  bindControls();
  bindPkControls();
  try {
    await loadData();
    const meta = state.data.meta || {};
    els.coverageText.textContent = "保荐人龙虎榜 · 港股保荐机构执业与牌照容量";
    els.firmCount.textContent = compactNumber(meta.firmCount || state.data.firms.length, 0);
    const sourceNote = meta.sourceGeneratedAt ? ` · 源快照 ${meta.sourceGeneratedAt}` : "";
    els.generatedAt.textContent = `更新 ${String(meta.sourceGeneratedAt||meta.generatedAt||"").slice(0,10)}`;
    const licNote = unifiedLicenseProvenanceNote();
    els.demoNote.textContent = `具名全部计入时各计1宗；平分时按具名家数分摊；项目总数含并购/配售FA角色（不含IFA）；总经济按联席平分归属。${licNote ? `牌照口径：${licNote}。` : ""}`;
    populateOptions();
    p0SponsorRead();
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
let initStarted = false;let initPromise;

function ensureInit() {
  if (initStarted) return initPromise;
  initStarted = true;
  initPromise=init();return initPromise;
}

if (viewRoot) {
  const ytdKey = defaultYtdKey();
  const yr = ytdKey.slice(0, 4);
  state.dateFrom = `${yr}-01-01`;
  state.dateQuick = ytdKey;
}
const p0SponsorDefaults=Object.fromEntries(['search','preset','metric','sortKey','sortHeaderKey','sortDir','credit','stage','type','nature','sector','dateField','dateFrom','dateTo','dateQuick'].map(k=>[k,state[k]]));
let p0SponsorRestoring=false,p0SponsorTrigger=null;
function p0SponsorUrl(){if(!viewRoot||typeof window==='undefined'||typeof history==='undefined'||p0SponsorRestoring)return;const p=new URLSearchParams(location.search);for(const [k,base] of Object.entries(p0SponsorDefaults)){if(state[k]!==base&&state[k]!=null&&state[k]!=='')p.set('s_'+k,state[k]);else p.delete('s_'+k);}for(const k of ['sponsorA','sponsorB','credit']){if(pkState[k])p.set('pk_'+k,pkState[k]);else p.delete('pk_'+k);}if(p0CompareIds.length)p.set('s_compare',p0CompareIds.join(','));else p.delete('s_compare');history.replaceState({...history.state,scrollY:window.scrollY},'',location.pathname+'?'+p);}
function p0SponsorRead(){const p=new URLSearchParams(location.search);p0CompareIds=[...new Set((p.get('s_compare')||'').split(',').filter(Boolean))].slice(0,4);for(const [k,base] of Object.entries(p0SponsorDefaults))state[k]=p.has('s_'+k)?p.get('s_'+k):base;for(const k of ['sponsorA','sponsorB','credit'])if(p.has('pk_'+k))pkState[k]=p.get('pk_'+k);}
function p0SponsorEmpty(){const labels={search:'搜索',type:'类型',sector:'行业',nature:'性质',stage:'阶段',dateFrom:'起始',dateTo:'截止'};return `<div class="empty-state-row"><p>未找到匹配当前筛选条件的项目</p><div>${Object.entries(labels).filter(([k])=>state[k]!==p0SponsorDefaults[k]).map(([k,l])=>`<button type="button" data-sponsor-clear="${k}">${l}：${escapeHtml(state[k])} ×</button>`).join('')}</div><button type="button" data-sponsor-reset>清除全部筛选，恢复全量</button></div>`;}
function p0SponsorReset(){Object.assign(state,p0SponsorDefaults);syncControls();render();renderPk();els.searchInput.focus();}
async function p0SponsorRoute(){const p=new URLSearchParams(location.search),v=p.get('view');if(!['sponsors','sponsorLeaderboard','sponsorPk'].includes(v))return;await ensureInit();if(!state.data)return;p0SponsorRestoring=true;closeDrawer(false);p0SponsorRead();syncControls();render();renderPk();const firm=p.get('firm');if(firm)openDrawer(firm,false);p0SponsorRestoring=false;}
if(viewRoot&&typeof window!=='undefined')window.addEventListener('yingsight:view',e=>{if(['sponsorLeaderboard','sponsorPk'].includes(e.detail.view))p0SponsorRoute();});
if(viewRoot&&typeof window!=='undefined')window.addEventListener('yingsight:fees-ready',()=>{if(state.data){render();if(pkRoot)renderPk();}});
if(viewRoot&&typeof window!=='undefined')window.addEventListener('popstate',()=>{if(els.drawer)closeDrawer(false);p0SponsorRoute();});
viewRoot?.addEventListener('click',e=>{const el=e.target.closest('button');if(!el)return;if(el.hasAttribute('data-sponsor-reset'))p0SponsorReset();if(el.dataset.sponsorClear){state[el.dataset.sponsorClear]=p0SponsorDefaults[el.dataset.sponsorClear];syncControls();render();renderPk();els.searchInput.focus();}});
if(viewRoot)document.addEventListener('keydown',e=>{if(e.key!=='Tab'||!els.drawer?.classList.contains('is-open'))return;const items=[...els.drawer.querySelectorAll('button,a[href],summary,input,select,[tabindex="0"]')].filter(x=>!x.hidden),first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}});
let p0CompareIds=[],p0CompareOffset=0;
function p0CompareBar(){const host=document.getElementById('institutionCompareBar');if(!host)return;host.hidden=!p0CompareIds.length;host.innerHTML=`<span>已选 ${p0CompareIds.length}/4 家</span>${p0CompareIds.map(id=>{const r=state.activeRows.find(x=>x.sponsorId===id);return `<button type="button" data-remove-firm="${escapeHtml(id)}">${escapeHtml(r?.displayNameZh||id)} ×</button>`}).join('')}<button type="button" data-sponsor-workbench="compare" ${p0CompareIds.length<2?'disabled':''}>并列比较 →</button><button type="button" data-clear-firms>清除</button>`;}
function p0CompareTable(rows,selectors){const root=document.getElementById('institutionComparison');if(!root)return;const ids=p0CompareIds.length>=2?p0CompareIds:[pkState.sponsorA,pkState.sponsorB];const selected=ids.map(id=>pkComparableRow(id,rows,selectors)).filter(Boolean);if(selected.length<2){root.innerHTML='<p class="empty-state">请选择至少两家机构。</p>';return;}const narrow=window.matchMedia?.('(max-width:767px)').matches;const visible=narrow&&selected.length>2?selected.slice(p0CompareOffset,p0CompareOffset+2):selected;const metrics=pkMetricRows(visible[0],visible[1]).map(m=>m.key==='listedLifecycleAverageDays'?{...m,key:'listedLifecycleMedianDays',label:'A1→上市中位数',value:r=>r.listedLifecycleMedianDays,format:(v,r)=>formatDays(v,r.listedLifecycleN)}:m);const feeMap=new Map(visible.map(r=>[r.sponsorId,r.firmScope!=='benchmark'&&r.firmScope!=='rollup'?sponsorFeeStats(r.sponsorId):null]));const hasAnyFee=[...feeMap.values()].some(s=>s&&s.n>0);const feeCell=(r,fn)=>{if(r.firmScope==='benchmark')return '基准不适用';const s=feeMap.get(r.sponsorId);if(!s||!s.n)return `暂无2026定价IPO（在审 ${compactCredit(r.activeCount)} 宗）`;return fn(s);};const feeSubCell=(r,fn)=>{if(r.firmScope==='benchmark')return '基准不适用';const s=feeMap.get(r.sponsorId);if(!s||!s.n)return '无2026定价样本';return fn(s);};const extraFeeRows=hasAnyFee?`<tr><th scope="row">2026 定价新股（费用样本）</th>${visible.map(r=>`<td data-institution-id="${escapeHtml(r.sponsorId)}" class="col-num">${escapeHtml(feeCell(r,s=>`${compactNumber(s.n,0)} 宗${isNumber(s.totalOfferedHkdBn)?` · ${formatOfferedHkdYi(s.totalOfferedHkdBn)}`:''}`))}</td>`).join('')}</tr><tr><th scope="row">2026 有效固定佣金率（Σ佣金/Σ规模）</th>${visible.map(r=>`<td data-institution-id="${escapeHtml(r.sponsorId)}" class="col-num">${escapeHtml(feeSubCell(r,s=>isNumber(s.effectiveFixedBps??s.fixedMedianBps)?formatFeeBps(s.effectiveFixedBps??s.fixedMedianBps):'待核验'))}</td>`).join('')}</tr><tr><th scope="row">2026 有效最高总费率</th>${visible.map(r=>`<td data-institution-id="${escapeHtml(r.sponsorId)}" class="col-num">${escapeHtml(feeSubCell(r,s=>isNumber(s.effectiveUpperBps??s.upperMedianBps)?formatFeeBps(s.effectiveUpperBps??s.upperMedianBps):'待核验'))}</td>`).join('')}</tr><tr><th scope="row">2026 所涉项目整单保荐费 · HKD</th>${visible.map(r=>`<td data-institution-id="${escapeHtml(r.sponsorId)}" class="col-num">${escapeHtml(feeSubCell(r,s=>s.sponsorFeeSummary!=='—'?s.sponsorFeeSummary:'待披露'))}</td>`).join('')}</tr>`:'';const multiMode=p0CompareIds.length>=3;const matrixHead=multiMode?`<div class="spk-matrix-head"><div><h3>多机构并列矩阵（已选 ${selected.length} 家）</h3><span>同口径多机构执业与费用对照</span></div><button type="button" class="spk-matrix-reset" data-exit-multi-compare>切回双机构擂台</button></div>`:`<div class="spk-matrix-head"><div><h3>完整指标对照表</h3><span>A1→上市中位数 · 2026 承销费用与保荐费基准</span></div></div>`;const matrixSub=(m,r)=>["econTotalHkdM","econPerSponsorPrincipalHkdM","econPerExecutionStaffHkdM","projectCount"].includes(m.key)&&typeof m.coverage==='function'?m.coverage(r):'';root.innerHTML=`<div class="spk-matrix-card">${matrixHead}`+(narrow&&selected.length>2?`<div class="institution-slot-switch">${selected.map((r,i)=>i<selected.length-1?`<button type="button" data-firm-pair="${i}" aria-pressed="${i===p0CompareOffset}">${escapeHtml(r.displayNameZh)} / ${escapeHtml(selected[i+1].displayNameZh)}</button>`:'').join('')}</div>`:'')+`<div class="spk-matrix-wrap"><table class="institution-compare-table"><thead><tr><th>指标</th>${visible.map(r=>`<th data-institution-id="${escapeHtml(r.sponsorId)}"${r.firmScope!=='benchmark'?` data-pk-sponsor="${escapeHtml(r.sponsorId)}" class="is-clickable-th" tabindex="0" role="button"`:''} title="${escapeHtml(r.displayNameEn)}">${escapeHtml(r.displayNameZh)}</th>`).join('')}</tr></thead><tbody>${metrics.map(m=>`<tr><th scope="row">${escapeHtml(m.label.split(' / ')[0])}</th>${visible.map(r=>{const sub=matrixSub(m,r);return `<td data-institution-id="${escapeHtml(r.sponsorId)}" class="col-num">${renderQualifiedHtml(m.format(m.value(r),r))}${sub?`<small class="sl-econ-sub">${escapeHtml(sub)}</small>`:''}</td>`;}).join('')}</tr>`).join('')}${extraFeeRows}</tbody></table></div></div>`;}
viewRoot?.addEventListener('change',e=>{const id=e.target.dataset.compareFirm;if(!id)return;if(e.target.checked&&!p0CompareIds.includes(id)&&p0CompareIds.length<4)p0CompareIds.push(id);else p0CompareIds=p0CompareIds.filter(x=>x!==id);p0CompareOffset=0;p0SponsorUrl();render();document.querySelector(`[data-compare-firm="${CSS.escape(id)}"]`)?.focus({preventScroll:true});});
if(viewRoot)document.addEventListener('click',e=>{const el=e.target.closest('button');if(!el)return;if(el.dataset.removeFirm||el.hasAttribute('data-clear-firms')){p0CompareIds=el.dataset.removeFirm?p0CompareIds.filter(x=>x!==el.dataset.removeFirm):[];p0SponsorUrl();render();if(el.dataset.removeFirm)document.querySelector(`[data-compare-firm="${CSS.escape(el.dataset.removeFirm)}"]`)?.focus({preventScroll:true});else els.searchInput.focus();}if(el.hasAttribute('data-firm-pair')){p0CompareOffset=Number(el.dataset.firmPair);renderPk();document.querySelector(`[data-firm-pair="${p0CompareOffset}"]`)?.focus({preventScroll:true});}});
if(viewRoot&&typeof window!=='undefined')window.addEventListener('resize',()=>{if(state.data&&pkRoot.classList.contains('is-visible'))renderPk();});

if (viewRoot) {
  document.querySelectorAll('.nav-item[data-view="sponsorLeaderboard"], .nav-item[data-view="sponsorPk"]').forEach((button) => {
    button.addEventListener("click", ensureInit);
  });
  const requestedView = new URLSearchParams(window.location.search).get("view");
  if (["sponsors","sponsorLeaderboard","sponsorPk"].includes(requestedView)) {
    p0SponsorRoute();
  }
}

})();
