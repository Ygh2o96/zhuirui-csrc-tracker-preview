// Sponsor leaderboard view module. Wrapped in an IIFE because it shares the
// page (and global scope) with app.js inside the integrated shell.
(() => {

const DATA_URL = "data/sponsor_leaderboard_demo.json";
const BUNDLED_DATA_URL = "data/sponsor_leaderboard_demo_data.js";

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
  dateField: "a1Date",
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
  lifecycleMedianDays: "A1→上市中位数",
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
  "申请中项目仅指HKEX已公开A1的上市申请；密交、未公开pipeline及尚未公开的申报中项目不可见，因此SP/Rep负荷只是公开样本旁证。";

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
  if (!isNumber(value) || value <= 0) return "待披露";
  return `${currency}${compactNumber(value, value >= 100 ? 0 : 1)}bn`;
}

function formatCapPerPerson(value, currency = "HK$") {
  if (!isNumber(value) || value <= 0) return "待披露";
  return `${currency}${compactNumber(value, value >= 10 ? 1 : 2)}bn/人`;
}

function formatDays(value, sampleN) {
  if (!isNumber(value)) return "待披露";
  const suffix = isNumber(sampleN) ? ` · n=${sampleN}` : "";
  return `${compactNumber(Math.round(value), 0)}天${suffix}`;
}

function formatRatio(value, digits = 2) {
  if (!isNumber(value)) return "待披露";
  return compactNumber(value, digits);
}

function capacityDisplay(row) {
  const quality = row.sponsorPrincipalQuality || row.type6Quality || "fresh";
  if (isNumber(row.sponsorPrincipalCount)) {
    const type6 = isNumber(row.type6TotalCount) ? `六号牌 ${compactNumber(row.type6TotalCount, 0)}` : "六号牌待补";
    const ro = isNumber(row.type6ROCount) ? `RO ${compactNumber(row.type6ROCount, 0)}` : "RO待补";
    const rep = isNumber(row.type6RepCount) ? `Rep ${compactNumber(row.type6RepCount, 0)}` : "Rep待补";
    return {
      main: `${compactNumber(row.sponsorPrincipalCount, 0)} SP`,
      sub: `${type6} / ${ro} / ${rep} · ${quality}`,
    };
  }
  if (!isNumber(row.type6TotalCount)) return { main: "待接入", sub: "暂无匹配 SP / 六号牌数据" };
  const fallbackQuality = row.type6Quality === "archive_db" ? "archive" : row.type6Quality || "fresh";
  return {
    main: "SP待补",
    sub: `六号牌 ${compactNumber(row.type6TotalCount, 0)} / RO ${compactNumber(row.type6ROCount || 0, 0)} / Rep ${compactNumber(row.type6RepCount || 0, 0)} · ${fallbackQuality}`,
  };
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
    "noticeCycleMedianDays",
    "receivedCycleMedianDays",
    "sponsorPrincipalPerProject",
    "sponsorPrincipalPerActiveProject",
    "type6RepPerActiveProject",
    "type6RepPerProject",
    "type6TotalPerProject",
  ]).has(metric);
}

function effectiveSortDir(metric = state.sortKey) {
  return state.sortDir || (metricSortAsc(metric) ? "asc" : "desc");
}

function resolveHeaderSortKey(rawKey) {
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
  if (metric === "lifecycleMedianDays") return row.listedLifecycleMedianDays;
  if (metric === "noticeCycleMedianDays") return row.noticeCycleMedianDays;
  if (metric === "receivedCycleMedianDays") return row.receivedCycleMedianDays;
  return row[metric];
}

function missingSortValue(row, metric, value) {
  if (metric === "sponsorName" || metric === "sponsorNature" || metric === "topIndustry") {
    return !String(value || "").trim();
  }
  if (metric === "lifecycleMedianDays") return !isNumber(value) || !row.listedLifecycleN;
  if (metric === "noticeCycleMedianDays") return !isNumber(value) || !row.noticeCycleN;
  if (metric === "receivedCycleMedianDays") return !isNumber(value) || !row.receivedCycleN;
  return !isNumber(value);
}

function factCredit(fact) {
  const value = fact[state.credit];
  return isNumber(value) ? value : 1;
}

function median(values) {
  const clean = values.filter(isNumber).sort((a, b) => a - b);
  if (!clean.length) return null;
  const mid = Math.floor(clean.length / 2);
  if (clean.length % 2) return clean[mid];
  return (clean[mid - 1] + clean[mid]) / 2;
}

function weightedCount(facts, predicate) {
  return facts.reduce((sum, fact) => sum + (predicate(fact) ? factCredit(fact) : 0), 0);
}

function weightedSum(facts, key) {
  return facts.reduce((sum, fact) => {
    const value = fact[key];
    return sum + (isNumber(value) ? value * factCredit(fact) : 0);
  }, 0);
}

function weightedSumWhere(facts, key, predicate) {
  return facts.reduce((sum, fact) => {
    const value = fact[key];
    return sum + (predicate(fact) && isNumber(value) ? value * factCredit(fact) : 0);
  }, 0);
}

function countWhereNumber(facts, key, predicate) {
  return facts.filter((fact) => predicate(fact) && isNumber(fact[key])).length;
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

function factLifecycleTiming(fact) {
  if (fact.hkexStage === "listed") {
    if (fact.listingDurationSampleEligible === false) {
      return {
        days: null,
        kind: "excluded",
        label: "A1→上市（统计剔除）",
        reason: durationExclusionReason(fact),
      };
    }
    const days = isNumber(fact.calendarDaysA1ToListing)
      ? fact.calendarDaysA1ToListing
      : dateDiffDays(fact.a1Date, fact.listingDate);
    return { days, kind: "listed", label: "A1→上市（最终）" };
  }
  if (fact.hkexStage === "applying") {
    const today = metaToday();
    return { days: dateDiffDays(fact.a1Date, today), kind: "applying", label: `A1→快照日已过（截至${today}）` };
  }
  return { days: dateDiffDays(fact.a1Date, fact.listingDate || metaToday()), kind: "other", label: "A1→截至/上市（非统计）" };
}

function durationExclusionReason(fact) {
  const tags = new Set(fact.statusTags || []);
  if (fact.specialListingRoute === "de_spac" || tags.has("De-SPAC")) return "De-SPAC特殊路径，剔除周期统计";
  if (fact.specialListingRoute === "hdr" || tags.has("HDR")) return "HDR/DRS特殊路径，剔除周期统计";
  if (tags.has("密交") || fact.hkexConfidentialFilingDate) return "密交/疑似密交，公开A1非完整周期，剔除统计";
  if (tags.has("outlier剔除统计") || tags.has("过渡期A1锚点") || tags.has("制度前A1") || tags.has("A1已失效")) {
    return "非可比或异常锚点，剔除周期统计";
  }
  if (fact.listingDurationSampleEligible === false) return "沿用监管节奏追踪样本门控，剔除周期统计";
  return "";
}

function lifecycleNote(row) {
  const parts = [];
  if (row.listedLifecycleN) parts.push(`已上市最终样本 ${row.listedLifecycleN}`);
  if (row.lifecycleApplyingN) parts.push(`申请中 elapsed ${row.lifecycleApplyingN}`);
  if (row.lifecycleExcludedN) parts.push(`剔除 ${row.lifecycleExcludedN}`);
  if (row.lifecycleOtherN) parts.push(`其他/搁置 ${row.lifecycleOtherN}`);
  return parts.length ? `${parts.join(" / ")}；密交/De-SPAC/HDR/outlier按主 tracker 门控剔除` : "暂无日期齐全样本";
}

function lifecycleCellNote(row) {
  if (state.stage === "applying") {
    return "申请中 elapsed 仅作 freshness";
  }
  const parts = [];
  if (row.listedLifecycleN) parts.push(`已上市样本 ${row.listedLifecycleN}`);
  if (row.lifecycleExcludedN) parts.push(`剔除 ${row.lifecycleExcludedN}`);
  if (row.lifecycleApplyingN && state.stage === "all") parts.push("申请中不计快慢");
  return parts.length ? parts.join("；") : "暂无可比样本";
}

function aggregateFacts(facts) {
  const firms = firmById();
  const grouped = new Map();
  for (const fact of facts) {
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
    const noticeCycleValues = sponsorFacts
      .filter((fact) => isNumber(fact.calendarDaysA1ToNotice) && fact.durationSampleEligible !== false)
      .map((fact) => fact.calendarDaysA1ToNotice);
    const receivedCycleValues = sponsorFacts
      .filter((fact) => isNumber(fact.calendarDaysA1ToReceived) && fact.durationSampleEligible !== false)
      .map((fact) => fact.calendarDaysA1ToReceived);
    const listingCaps = sponsorFacts.map((fact) => fact.listingMarketCapHkdBn).filter(isNumber);
    const aShareCaps = sponsorFacts.map((fact) => fact.aShareMarketCapAtA1RmbBn).filter(isNumber);
    const applyingAhCaps = sponsorFacts
      .filter((fact) => fact.hkexStage === "applying" && fact.isAH)
      .map((fact) => fact.aShareMarketCapAtA1RmbBn)
      .filter(isNumber);
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
      listedCount: weightedCount(sponsorFacts, (fact) => fact.hkexStage === "listed"),
      noticeCount: weightedCount(sponsorFacts, (fact) => fact.status === "notice_issued"),
      ahCount: weightedCount(sponsorFacts, (fact) => fact.isAH),
      hShareCount: weightedCount(sponsorFacts, (fact) => fact.issuerType === "H股"),
      redChipCount: weightedCount(sponsorFacts, (fact) => fact.issuerType === "红筹"),
      deSpacCount: weightedCount(sponsorFacts, (fact) => fact.issuerType === "De-SPAC"),
      hdrCount: weightedCount(sponsorFacts, (fact) => fact.issuerType === "HDR"),
      listingMarketCapHkdBnSum: weightedSum(sponsorFacts, "listingMarketCapHkdBn"),
      listingMarketCapHkdBnMedian: median(listingCaps),
      listingMarketCapN: listingCaps.length,
      aShareMarketCapRmbBnSum: weightedSum(sponsorFacts, "aShareMarketCapAtA1RmbBn"),
      aShareMarketCapRmbBnMedian: median(aShareCaps),
      aShareMarketCapN: aShareCaps.length,
      applyingAhMarketCapRmbBnSum: weightedSumWhere(
        sponsorFacts,
        "aShareMarketCapAtA1RmbBn",
        (fact) => fact.hkexStage === "applying" && fact.isAH,
      ),
      applyingAhMarketCapRmbBnMedian: median(applyingAhCaps),
      applyingAhMarketCapN: countWhereNumber(
        sponsorFacts,
        "aShareMarketCapAtA1RmbBn",
        (fact) => fact.hkexStage === "applying" && fact.isAH,
      ),
      lifecycleMedianDays: median(listedLifecycleValues),
      lifecycleTimingN: listedLifecycleValues.length,
      lifecycleListedN: lifecycleTimings.filter((item) => item.kind === "listed").length,
      lifecycleApplyingN: lifecycleTimings.filter((item) => item.kind === "applying").length,
      lifecycleOtherN: lifecycleTimings.filter((item) => item.kind === "other").length,
      lifecycleExcludedN: allLifecycleTimings.filter((item) => item.kind === "excluded").length,
      listedLifecycleMedianDays: median(listedLifecycleValues),
      listedLifecycleN: listedLifecycleValues.length,
      noticeCycleMedianDays: median(noticeCycleValues),
      noticeCycleN: noticeCycleValues.length,
      receivedCycleMedianDays: median(receivedCycleValues),
      receivedCycleN: receivedCycleValues.length,
      applyingElapsedMedianDays: median(applyingElapsedValues),
      applyingElapsedN: applyingElapsedValues.length,
      projectsPerType6Rep: type6RepCount && type6RepCount > 0 ? projectCount / type6RepCount : null,
      type6RepPerProject: projectCount > 0 && type6RepCount ? type6RepCount / projectCount : null,
      projectsPerType6RO: type6ROCount && type6ROCount > 0 ? projectCount / type6ROCount : null,
      type6ROPerProject: projectCount > 0 && type6ROCount ? type6ROCount / projectCount : null,
      projectsPerSponsorPrincipal: sponsorPrincipalCount && sponsorPrincipalCount > 0 ? projectCount / sponsorPrincipalCount : null,
      sponsorPrincipalPerProject: projectCount > 0 && sponsorPrincipalCount ? sponsorPrincipalCount / projectCount : null,
      projectsPerType6Total: type6TotalCount && type6TotalCount > 0 ? projectCount / type6TotalCount : null,
      type6TotalPerProject: projectCount > 0 && type6TotalCount ? type6TotalCount / projectCount : null,
      type6TotalPerActiveProject: activeCount > 0 && type6TotalCount ? type6TotalCount / activeCount : null,
      activeProjectsPerType6Total: type6TotalCount && type6TotalCount > 0 ? activeCount / type6TotalCount : null,
      sponsorPrincipalPerActiveProject: activeCount > 0 && sponsorPrincipalCount ? sponsorPrincipalCount / activeCount : null,
      activeProjectsPerSponsorPrincipal: sponsorPrincipalCount && sponsorPrincipalCount > 0 ? activeCount / sponsorPrincipalCount : null,
      type6RepPerActiveProject: activeCount > 0 && type6RepCount ? type6RepCount / activeCount : null,
      activeProjectsPerType6Rep: type6RepCount && type6RepCount > 0 ? activeCount / type6RepCount : null,
      listingMarketCapPerType6TotalHkdBn:
        listingCaps.length > 0 && type6TotalCount && type6TotalCount > 0 ? weightedSum(sponsorFacts, "listingMarketCapHkdBn") / type6TotalCount : null,
      listingMarketCapPerSponsorPrincipalHkdBn:
        listingCaps.length > 0 && sponsorPrincipalCount && sponsorPrincipalCount > 0 ? weightedSum(sponsorFacts, "listingMarketCapHkdBn") / sponsorPrincipalCount : null,
      topIndustries: topIndustries(sponsorFacts),
    });
  }
  return rows.sort(compareRows);
}

function aggregateFactsForCredit(facts, credit) {
  const previousCredit = state.credit;
  state.credit = credit;
  try {
    return aggregateFacts(facts);
  } finally {
    state.credit = previousCredit;
  }
}

function dateScopeLabel() {
  const fieldLabel = {
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
  return `${sector}；${dateScopeLabel()}`;
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
    ...(firm?.legalNames || []),
    ...(firm?.aliases || []),
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

function filteredFacts() {
  const firms = firmById();
  const query = normalize(state.search);
  return (state.data?.projectFacts || []).filter((fact) => {
    const firm = firms.get(fact.sponsorId);
    if (!matchesSearch(fact, firm, query)) return false;
    if (!matchesSector(fact)) return false;
    if (state.stage !== "all" && fact.hkexStage !== state.stage) return false;
    if (state.type !== "all" && fact.issuerType !== state.type) return false;
    if (state.nature !== "all" && firm?.sponsorNature !== state.nature) return false;
    return matchesDateScope(fact);
  });
}

function matchesDateScope(fact) {
  const dateValue = fact[state.dateField];
  if (state.dateFrom && (!dateValue || dateValue < state.dateFrom)) return false;
  if (state.dateTo && (!dateValue || dateValue > state.dateTo)) return false;
  return true;
}

function pkFilteredFacts() {
  return (state.data?.projectFacts || []).filter((fact) => matchesDateScope(fact) && matchesSector(fact));
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

function setPreset(preset) {
  state.preset = preset;
  if (preset === "all") {
    state.stage = "all";
    state.type = "all";
    state.nature = "all";
    state.sector = "all";
    state.dateFrom = "";
    state.dateTo = "";
    state.dateField = "a1Date";
    state.dateQuick = "all";
  } else if (preset === "applying") {
    state.stage = "applying";
    state.type = "all";
    state.dateFrom = "";
    state.dateTo = "";
    state.dateQuick = "all";
    enforceMetricCompatibility();
  } else if (preset === "listed") {
    state.stage = "listed";
    state.dateField = "listingDate";
    state.dateFrom = "";
    state.dateTo = "";
    state.dateQuick = "all";
  } else if (preset === "ah") {
    state.stage = "all";
    state.type = "A+H";
    state.dateFrom = "";
    state.dateTo = "";
    state.dateQuick = "all";
  } else if (preset === "recentA1") {
    state.stage = "all";
    state.type = "all";
    state.dateField = "a1Date";
    state.dateTo = metaToday();
    state.dateFrom = addDays(state.dateTo, -30);
    state.dateQuick = "custom";
  } else if (preset === "recentNotice") {
    state.stage = "all";
    state.type = "all";
    state.dateField = "noticeDate";
    state.dateTo = metaToday();
    state.dateFrom = addDays(state.dateTo, -90);
    state.dateQuick = "custom";
  }
  enforceMetricCompatibility();
  syncControls();
  render();
}

function setDateQuickRange(range) {
  state.dateQuick = range;
  const today = metaToday();
  state.dateTo = "";
  state.dateFrom = "";
  if (range === "3m") {
    state.dateTo = today;
    state.dateFrom = addDays(today, -90);
  } else if (range === "6m") {
    state.dateTo = today;
    state.dateFrom = addDays(today, -183);
  } else if (range === "1y") {
    state.dateTo = today;
    state.dateFrom = addDays(today, -365);
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
}

function readPkDateControls() {
  if (pkEls.sectorSelect) state.sector = pkEls.sectorSelect.value;
  if (pkEls.dateFieldSelect) state.dateField = pkEls.dateFieldSelect.value;
  if (pkEls.dateFrom) state.dateFrom = pkEls.dateFrom.value;
  if (pkEls.dateTo) state.dateTo = pkEls.dateTo.value;
  state.dateQuick = "custom";
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
      main: formatCap(row.listingMarketCapHkdBnSum, "HK$"),
      sub: `${row.listingMarketCapN || 0} 个有市值项目`,
    };
  }
  if (state.metric === "aShareMarketCapRmbBnSum") {
    return {
      main: formatCap(row.aShareMarketCapRmbBnSum, "¥"),
      sub: `${row.aShareMarketCapN || 0} 个A股市值项目`,
    };
  }
  if (state.metric === "lifecycleMedianDays") {
    return {
      main: formatDays(row.listedLifecycleMedianDays, row.listedLifecycleN),
      sub: "排名仅纳入已上市 A1→上市样本",
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
      main: formatCapPerPerson(row.listingMarketCapPerType6TotalHkdBn),
      sub: isNumber(row.type6TotalCount) ? `上市日港股市值 / 六号牌总人数 · ${compactNumber(row.type6TotalCount, 0)}人` : "暂无六号牌人数",
    };
  }
  if (state.metric === "listingMarketCapPerSponsorPrincipalHkdBn") {
    return {
      main: formatCapPerPerson(row.listingMarketCapPerSponsorPrincipalHkdBn),
      sub: isNumber(row.sponsorPrincipalCount) ? `SP人均上市日港股市值产出 · SP ${compactNumber(row.sponsorPrincipalCount, 0)}` : "暂无SP人数",
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
  if (mode === "listed") return "上市日市值";
  if (mode === "applyingAh") return "A+H A1市值";
  if (mode === "aShare") return "A股市值";
  return "市值";
}

function marketCapSortValue(row) {
  const mode = marketCapMode();
  if (mode === "listed") return row.listingMarketCapHkdBnSum;
  if (mode === "applyingAh") return row.applyingAhMarketCapRmbBnSum;
  if (mode === "aShare") return row.aShareMarketCapRmbBnSum;
  return row.listingMarketCapHkdBnSum || row.applyingAhMarketCapRmbBnSum || row.aShareMarketCapRmbBnSum || 0;
}

function shouldShowMarketCap(rows) {
  return rows.some((row) => marketCapSortValue(row) > 0);
}

function marketCapDisplay(row) {
  const mode = marketCapMode();
  if (mode === "listed") {
    return {
      main: formatCap(row.listingMarketCapHkdBnSum, "HK$"),
      sub: row.listingMarketCapN ? `上市日港股 · ${row.listingMarketCapN} 个项目` : "已上市项目暂无市值",
    };
  }
  if (mode === "applyingAh") {
    if (row.applyingAhMarketCapRmbBnSum > 0) {
      return {
        main: formatCap(row.applyingAhMarketCapRmbBnSum, "¥"),
        sub: `A1日A股 · ${row.applyingAhMarketCapN} 个A+H申请中项目`,
      };
    }
    return { main: "不适用", sub: "申请中非A+H不展示市值" };
  }
  if (mode === "aShare") {
    return {
      main: formatCap(row.aShareMarketCapRmbBnSum, "¥"),
      sub: row.aShareMarketCapN ? `A1日A股 · ${row.aShareMarketCapN} 个项目` : "暂无A股市值",
    };
  }
  if (row.listingMarketCapHkdBnSum > 0) {
    const sub =
      row.applyingAhMarketCapRmbBnSum > 0
        ? `上市日港股 · 另有A+H申请中 ${formatCap(row.applyingAhMarketCapRmbBnSum, "¥")}`
        : `上市日港股 · ${row.listingMarketCapN} 个项目`;
    return { main: formatCap(row.listingMarketCapHkdBnSum, "HK$"), sub };
  }
  if (row.applyingAhMarketCapRmbBnSum > 0) {
    return {
      main: formatCap(row.applyingAhMarketCapRmbBnSum, "¥"),
      sub: `A+H申请中 · A1日A股 · ${row.applyingAhMarketCapN} 个项目`,
    };
  }
  if (row.aShareMarketCapRmbBnSum > 0) {
    return { main: formatCap(row.aShareMarketCapRmbBnSum, "¥"), sub: `A1日A股 · ${row.aShareMarketCapN} 个项目` };
  }
  return { main: "不适用", sub: "暂无适用市值" };
}

function metricCards(rows) {
  const MIN_ACTIVE_PROJECTS = 8;
  const MIN_MARKET_CAP_PROJECTS = 3;
  const activeLeader = [...rows].filter((row) => row.activeCount > 0).sort((a, b) => b.activeCount - a.activeCount || b.projectCount - a.projectCount)[0];
  const timingLeader = [...rows]
    .filter((row) => isNumber(row.listedLifecycleMedianDays) && row.listedLifecycleN >= 5)
    .sort((a, b) => a.listedLifecycleMedianDays - b.listedLifecycleMedianDays)[0];
  const spWorkloadLeader = [...rows]
    .filter((row) => row.firmScope !== "rollup" && isNumber(row.activeProjectsPerSponsorPrincipal) && row.activeCount >= MIN_ACTIVE_PROJECTS)
    .sort((a, b) => b.activeProjectsPerSponsorPrincipal - a.activeProjectsPerSponsorPrincipal || b.activeCount - a.activeCount)[0];
  const repLeanLeader = [...rows]
    .filter((row) => row.firmScope !== "rollup" && isNumber(row.type6RepPerActiveProject) && row.activeCount >= MIN_ACTIVE_PROJECTS)
    .sort((a, b) => a.type6RepPerActiveProject - b.type6RepPerActiveProject || b.activeCount - a.activeCount)[0];
  const mcapPerSpLeader = [...rows]
    .filter(
      (row) =>
        row.firmScope !== "rollup" &&
        isNumber(row.listingMarketCapPerSponsorPrincipalHkdBn) &&
        row.listingMarketCapN >= MIN_MARKET_CAP_PROJECTS,
    )
    .sort(
      (a, b) =>
        b.listingMarketCapPerSponsorPrincipalHkdBn - a.listingMarketCapPerSponsorPrincipalHkdBn ||
        b.listingMarketCapHkdBnSum - a.listingMarketCapHkdBnSum,
    )[0];
  const mcapPerTotalLeader = [...rows]
    .filter(
      (row) =>
        row.firmScope !== "rollup" &&
        isNumber(row.listingMarketCapPerType6TotalHkdBn) &&
        row.listingMarketCapN >= MIN_MARKET_CAP_PROJECTS,
    )
    .sort((a, b) => b.listingMarketCapPerType6TotalHkdBn - a.listingMarketCapPerType6TotalHkdBn || b.listingMarketCapHkdBnSum - a.listingMarketCapHkdBnSum)[0];
  const listedMcapLeader = [...rows]
    .filter((row) => row.listingMarketCapHkdBnSum > 0)
    .sort((a, b) => b.listingMarketCapHkdBnSum - a.listingMarketCapHkdBnSum || b.listingMarketCapN - a.listingMarketCapN)[0];
  const projectLeader = [...rows].filter((row) => row.projectCount > 0).sort((a, b) => b.projectCount - a.projectCount || b.activeCount - a.activeCount)[0];
  const listedLeader = [...rows].filter((row) => row.listedCount > 0).sort((a, b) => b.listedCount - a.listedCount || b.projectCount - a.projectCount)[0];

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
        label: `${label}项目上市市值第一`,
        value: listedMcapLeader ? listedMcapLeader.displayNameZh : "待披露",
        note: listedMcapLeader ? `${formatCap(listedMcapLeader.listingMarketCapHkdBnSum, "HK$")} · 已上市项目上市日港股市值合计` : "无已上市市值样本",
      },
      {
        label: `${label}已上市周期较快`,
        value: timingLeader ? timingLeader.displayNameZh : "样本不足",
        note: timingLeader ? `${formatDays(timingLeader.listedLifecycleMedianDays, timingLeader.listedLifecycleN)} · 仅已上市样本` : "需至少5个已上市样本",
      },
    ];
    return cards
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
      value: mcapPerSpLeader ? mcapPerSpLeader.displayNameZh : "样本不足",
      note: mcapPerSpLeader
        ? `每名SP对应 ${formatCapPerPerson(mcapPerSpLeader.listingMarketCapPerSponsorPrincipalHkdBn)} 上市日港股市值 · ${mcapPerSpLeader.listingMarketCapN} 个上市市值样本`
        : "需有上市市值和SP样本",
    },
    {
      label: "六号牌持牌人员人均市值产出最高",
      value: mcapPerTotalLeader ? mcapPerTotalLeader.displayNameZh : "样本不足",
      note: mcapPerTotalLeader
        ? `每名六号牌持牌人员对应 ${formatCapPerPerson(mcapPerTotalLeader.listingMarketCapPerType6TotalHkdBn)} 上市日港股市值 · ${mcapPerTotalLeader.listingMarketCapN} 个上市市值样本`
        : "需有上市市值和六号牌样本",
    },
    {
      label: "项目上市市值第一",
      value: listedMcapLeader ? listedMcapLeader.displayNameZh : "待披露",
      note: listedMcapLeader ? `${formatCap(listedMcapLeader.listingMarketCapHkdBnSum, "HK$")} · 已上市项目上市日港股市值合计` : "无已上市市值样本",
    },
    {
      label: "已上市周期较快",
      value: timingLeader ? timingLeader.displayNameZh : "样本不足",
      note: timingLeader ? `${formatDays(timingLeader.listedLifecycleMedianDays, timingLeader.listedLifecycleN)} · 仅已上市样本` : "需至少5个已上市样本",
    },
  ];
  return cards
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
  const finalText = formatDays(row.listedLifecycleMedianDays, row.listedLifecycleN);
  const elapsedText = formatDays(row.applyingElapsedMedianDays, row.applyingElapsedN);
  if (state.stage === "applying") {
    return {
      main: elapsedText,
      sub: "申请中 time elapsed；只反映项目 freshness，不纳入 A1→上市快慢统计",
    };
  }
  if (row.listedLifecycleN) {
    return {
      main: finalText,
      sub: "A1→上市最终样本",
    };
  }
  if (row.applyingElapsedN) {
    return {
      main: "暂无已上市样本",
      sub: `申请中已过中位 ${elapsedText}；不纳入周期快慢统计`,
    };
  }
  return {
    main: "待披露",
    sub: "暂无可比 A1→上市样本",
  };
}

function rowHtml(row, index, showMarketCap) {
  const primary = metricDisplay(row);
  const marketCap = marketCapDisplay(row);
  const type6 = capacityDisplay(row);
  const lifecycle = lifecycleDisplay(row);
  const marketCapCell = showMarketCap
    ? `<td data-label="${escapeHtml(marketCapHeaderText())}"><span class="number">${escapeHtml(marketCap.main)}</span><span class="sub-number">${escapeHtml(marketCap.sub)}</span></td>`
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
  ]
    .filter(Boolean)
    .map((label) => `<span class="pill teal">${escapeHtml(label)}</span>`)
    .join("");
  return `<tr class="clickable-row" data-sponsor="${escapeHtml(row.sponsorId)}">
    <td data-label="排名" class="rank">#${index + 1}</td>
    <td data-label="保荐人" class="sponsor-cell">
      <button type="button" aria-label="查看${escapeHtml(row.displayNameZh)}详情">${escapeHtml(row.displayNameZh)}</button>
      <small>${escapeHtml(row.displayNameEn)}${row.legalNames?.[0] ? ` · ${escapeHtml(row.legalNames[0])}` : ""}</small>
      <span class="row-action">查看详情</span>
      ${scopePill}
    </td>
    <td data-label="性质"><span class="pill teal">${escapeHtml(row.sponsorNature || "待核")}</span></td>
    <td data-label="SP / 六号牌"><span class="number">${escapeHtml(type6.main)}</span><span class="sub-number">${escapeHtml(type6.sub)}</span></td>
    <td data-label="项目"><span class="number">${compactCredit(row.projectCount)}</span><span class="sub-number">${typePills}</span></td>
    <td data-label="申请中"><span class="number">${compactCredit(row.activeCount)}</span></td>
    <td data-label="已上市"><span class="number">${compactCredit(row.listedCount)}</span></td>
    <td data-label="A+H"><span class="number">${compactCredit(row.ahCount)}</span></td>
    <td data-label="排名指标"><span class="number">${escapeHtml(primary.main)}</span><span class="sub-number">${escapeHtml(primary.sub)}</span></td>
    ${marketCapCell}
    <td data-label="周期 / 已过"><span class="number">${escapeHtml(lifecycle.main)}</span><span class="sub-number">${escapeHtml(lifecycle.sub)} · ${escapeHtml(lifecycleCellNote(row))}</span></td>
    <td data-label="行业">${industries}</td>
  </tr>`;
}

function render() {
  if (!state.data) return;
  const facts = filteredFacts();
  const rows = aggregateFacts(facts);
  const showMarketCap = shouldShowMarketCap(rows);
  state.activeFacts = facts;
  state.activeRows = rows;
  els.metricStrip.innerHTML = metricCards(rows);
  els.primaryMetricHead.querySelector(".sl-th-label").textContent = metricLabels[state.metric] || "排名指标";
  els.marketCapHead.hidden = !showMarketCap;
  els.marketCapHead.querySelector(".sl-th-label").textContent = marketCapHeaderText();
  const rankingNote = " · A1→上市统计仅纳入已上市项目；申请中为 elapsed/freshness";
  const sectorNote = state.sector === "all" ? "" : ` · 赛道：${sectorLabel()} · 人员/SP/Rep不按赛道拆分`;
  const syntheticFactCount = facts.filter((fact) => fact.isSyntheticRollup).length;
  const baseFactCount = facts.length - syntheticFactCount;
  const factText = syntheticFactCount
    ? `${compactNumber(baseFactCount)} 原始 + ${compactNumber(syntheticFactCount)} 合并 fact`
    : `${compactNumber(facts.length)} 条计分 fact`;
  const sortNote = ` · 按${sortLabel()}${effectiveSortDir() === "asc" ? "升序" : "降序"}`;
  els.resultHint.textContent = `${compactNumber(rows.length)} 家保荐人/合并口径 · ${factText} · ${creditLabels[state.credit]}${sortNote}${sectorNote}${rankingNote}`;
  if (!rows.length) {
    els.leaderboardRows.innerHTML = `<tr><td colspan="${showMarketCap ? 12 : 11}" class="empty-state">没有符合条件的样本</td></tr>`;
    return;
  }
  els.leaderboardRows.innerHTML = rows.map((row, index) => rowHtml(row, index, showMarketCap)).join("");
  els.leaderboardRows.querySelectorAll("tr[data-sponsor]").forEach((row) => {
    row.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a")) return;
      openDrawer(row.dataset.sponsor);
    });
  });
}

function pkMetricRows(rowA, rowB) {
  const metrics = [
    { label: "项目总数 / Total deals", key: "projectCount", value: (row) => row.projectCount, format: compactCredit, higher: true, note: "规模口径 / Scale" },
    { label: "公开申请中项目 / Public active deals", key: "activeCount", value: (row) => row.activeCount, format: compactCredit, higher: true, note: "公开A1样本 / Public APs only" },
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
    { label: "上市日港股市值 / Listed market cap", key: "listingMarketCapHkdBnSum", value: (row) => row.listingMarketCapHkdBnSum, format: (value) => formatCap(value, "HK$"), higher: true, note: "项目上市市值 / Listed deal value" },
    {
      label: "SP人均市值产出 / Market cap per SP",
      key: "listingMarketCapPerSponsorPrincipalHkdBn",
      value: (row) => row.listingMarketCapPerSponsorPrincipalHkdBn,
      format: (value) => formatCapPerPerson(value),
      higher: true,
      note: "人均产出 / Output per person",
    },
    {
      label: "六号牌人均市值产出 / Market cap per Type 6",
      key: "listingMarketCapPerType6TotalHkdBn",
      value: (row) => row.listingMarketCapPerType6TotalHkdBn,
      format: (value) => formatCapPerPerson(value),
      higher: true,
      note: "人均产出 / Output per person",
    },
    { label: "A1→接收中位数 / A1 to receipt", key: "receivedCycleMedianDays", value: (row) => row.receivedCycleMedianDays, format: (value, row) => formatDays(value, row.receivedCycleN), higher: false, note: "已接收样本 / Received sample" },
    { label: "A1→通知中位数 / A1 to notice", key: "noticeCycleMedianDays", value: (row) => row.noticeCycleMedianDays, format: (value, row) => formatDays(value, row.noticeCycleN), higher: false, note: "已通知样本 / Notice-issued sample" },
    { label: "A1→上市中位数 / A1 to listing", key: "listedLifecycleMedianDays", value: (row) => row.listedLifecycleMedianDays, format: (value, row) => formatDays(value, row.listedLifecycleN), higher: false, note: "仅已上市 / Listed sample" },
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

function renderPkCard(row, sideLabel) {
  if (!row) {
    return `<article class="spk-card"><span>${escapeHtml(sideLabel)}</span><strong>待选择</strong></article>`;
  }
  const capacity = capacityDisplay(row);
  return `<article class="spk-card">
    <span>${escapeHtml(sideLabel)}</span>
    <strong>${escapeHtml(row.displayNameZh)}</strong>
    <small>${escapeHtml(row.displayNameEn)} · ${escapeHtml(row.sponsorNature || "待核")}</small>
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
      <i aria-hidden="true"></i>
    </div>
    <div class="spk-metric-name">
      <strong>${escapeHtml(metric.label)}</strong>
      <span>${escapeHtml(metric.note || (metric.higher ? "规模口径 / Scale" : "周期较短 / Shorter cycle"))}</span>
    </div>
    <div class="spk-metric-side${pkWinnerClass(metric, "b")}" ${pkBarStyle(metric, "b")}>
      <span>${escapeHtml(rowB.displayNameZh)}</span>
      <b>${escapeHtml(metric.format(metric.b, rowB))}</b>
      <i aria-hidden="true"></i>
    </div>
  </article>`;
}

function populatePkOptions(rows) {
  if (!pkRoot || !pkEls.sponsorA || !pkEls.sponsorB) return;
  const options = rows
    .filter((row) => row.firmScope !== "rollup")
    .sort((a, b) => b.projectCount - a.projectCount || String(a.displayNameZh).localeCompare(String(b.displayNameZh), "zh-Hans"))
    .map((row) => `<option value="${escapeHtml(row.sponsorId)}">${escapeHtml(row.displayNameZh)} · ${escapeHtml(row.displayNameEn)}</option>`)
    .join("");
  pkEls.sponsorA.innerHTML = options;
  pkEls.sponsorB.innerHTML = options;
  const defaultA = rows.find((row) => row.sponsorId === "cicc") || rows[0];
  const defaultB = rows.find((row) => row.sponsorId === "citic") || rows.find((row) => row.sponsorId !== defaultA?.sponsorId) || rows[1];
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
  if (!pkEls.sponsorA.options.length) populatePkOptions(rows);
  const rowA = rows.find((row) => row.sponsorId === pkState.sponsorA) || rows[0];
  const rowB = rows.find((row) => row.sponsorId === pkState.sponsorB) || rows.find((row) => row.sponsorId !== rowA?.sponsorId) || rows[1] || rowA;
  if (!rowA || !rowB) {
    pkEls.versus.innerHTML = '<div class="empty-state">该时间范围暂无可比较样本 / No comparable sample in this date range</div>';
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
  pkEls.sourceNote.textContent = `同源于保荐龙虎榜 JSON；${scopeLabel()}；快照 ${sourceDate}；${PUBLIC_ACTIVE_CAVEAT}${sectorNote} 密交、De-SPAC、HDR、outlier 等周期剔除沿用监管节奏追踪。`;
  pkEls.versus.innerHTML = `${renderPkCard(rowA, "左侧")}<div class="spk-vs">VS</div>${renderPkCard(rowB, "右侧")}`;
  pkEls.metrics.innerHTML = pkMetricRows(rowA, rowB).map((metric) => renderPkMetric(metric, rowA, rowB)).join("");
}

function drawerStats(row) {
  const cycleSummary = [
    row.receivedCycleN ? `接收 ${formatDays(row.receivedCycleMedianDays, row.receivedCycleN)}` : "",
    row.noticeCycleN ? `通知 ${formatDays(row.noticeCycleMedianDays, row.noticeCycleN)}` : "",
    row.listedLifecycleN ? `上市 ${formatDays(row.listedLifecycleMedianDays, row.listedLifecycleN)}` : "",
  ]
    .filter(Boolean)
    .join(" · ");
  return [
    ["项目数", compactCredit(row.projectCount)],
    ["公开申请中项目", compactCredit(row.activeCount)],
    ["已上市项目", compactCredit(row.listedCount)],
    ["A+H项目", compactCredit(row.ahCount)],
    ["SP人数", isNumber(row.sponsorPrincipalCount) ? `${compactNumber(row.sponsorPrincipalCount, 0)}人` : "待接入"],
    ["六号牌人数", isNumber(row.type6TotalCount) ? `${compactNumber(row.type6TotalCount, 0)}人` : "待接入"],
    ["每名SP负责公开申请中", isNumber(row.activeProjectsPerSponsorPrincipal) ? `${formatRatio(row.activeProjectsPerSponsorPrincipal)}个` : "待披露"],
    ["每个公开申请中项目配置Rep", isNumber(row.type6RepPerActiveProject) ? `${formatRatio(row.type6RepPerActiveProject)}名/项目` : "待披露"],
    ["SP人均上市市值", formatCapPerPerson(row.listingMarketCapPerSponsorPrincipalHkdBn)],
    ["六号牌人均上市市值", formatCapPerPerson(row.listingMarketCapPerType6TotalHkdBn)],
    ["上市日港股市值合计", formatCap(row.listingMarketCapHkdBnSum, "HK$")],
    ["A1日A股市值合计", formatCap(row.aShareMarketCapRmbBnSum, "¥")],
    ["周期中位数", cycleSummary || "待披露"],
    ["申请中已过中位数", formatDays(row.applyingElapsedMedianDays, row.applyingElapsedN)],
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

function projectLine(fact) {
  const timing = factLifecycleTiming(fact);
  const timingValue = timing.kind === "excluded" ? "统计剔除" : formatDays(timing.days);
  const timingReason = timing.reason ? ` · ${timing.reason}` : "";
  const primaryName = issuerPrimaryName(fact);
  const shadowName = issuerShadowName(fact);
  const industryTags = fact.industryTags?.length ? fact.industryTags : fact.csrcIndustryTags || [];
  const sourceLinks = (fact.sourceLinks || [])
    .filter((link) => /^https?:\/\//.test(link.url || ""))
    .slice(0, 3)
    .map((link) => `<a class="source-link" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label || "来源")}</a>`)
    .join("");
  return `<article class="deal-item">
    <strong>${escapeHtml(primaryName)}</strong>
    ${shadowName ? `<small class="shadow-name">${escapeHtml(shadowName)}</small>` : ""}
    <small>
      ${escapeHtml(fact.statusLabelZh || fact.status || "待核")} · ${escapeHtml(fact.issuerType || "类型待核")} ·
      A1 ${escapeHtml(formatDate(fact.a1Date))} · 通知 ${escapeHtml(formatDate(fact.noticeDate))} · 上市 ${escapeHtml(formatDate(fact.listingDate))}
    </small>
    <small>${escapeHtml(timing.label)}：${escapeHtml(timingValue)}${escapeHtml(timingReason)}</small>
    <small>
      ${escapeHtml(industryTags.slice(0, 4).join(" / ") || "行业待披露")}
      ${sourceLinks ? ` · ${sourceLinks}` : ""}
    </small>
  </article>`;
}

function openDrawer(sponsorId) {
  const row = state.activeRows.find((item) => item.sponsorId === sponsorId);
  if (!row) return;
  const facts = [...row.facts].sort((a, b) => {
    const ad = a.listingDate || a.noticeDate || a.a1Date || "";
    const bd = b.listingDate || b.noticeDate || b.a1Date || "";
    return bd.localeCompare(ad);
  });
  const legalNames = (row.legalNames || [])
    .slice(0, 6)
    .map((name) => `<span class="pill">${escapeHtml(name)}</span>`)
    .join("");
  const industries = (row.topIndustries || []).map((name) => `<span class="pill teal">${escapeHtml(name)}</span>`).join("");
  const principalSources = (row.sponsorPrincipalSourceFirmNames || [])
    .slice(0, 6)
    .map((name, index) => {
      const url = (row.sponsorPrincipalSourceUrls || [])[index] || "";
      if (/^https?:\/\//i.test(url)) {
        return `<a class="pill" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(name)}</a>`;
      }
      return `<span class="pill">${escapeHtml(name)}</span>`;
    })
    .join("");
  const type6Sources = (row.type6SourceFirmNames || [])
    .slice(0, 6)
    .map((name, index) => {
      const url = (row.type6SourceUrls || [])[index] || "";
      if (/^https?:\/\//i.test(url)) {
        return `<a class="pill" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(name)}</a>`;
      }
      return `<span class="pill">${escapeHtml(name)}</span>`;
    })
    .join("");
  els.drawerContent.innerHTML = `<h3>${escapeHtml(row.displayNameZh)}</h3>
    <p class="drawer-subtitle">${escapeHtml(row.displayNameEn)} · ${escapeHtml(row.sponsorNature || "待核")}</p>
    <div class="drawer-pills">${legalNames}</div>
    <div class="drawer-summary">${drawerStats(row)}</div>
    <h4>SP 来源</h4>
    <div class="drawer-pills">${principalSources || '<span class="pill">未匹配 Sponsor Principal 行</span>'}</div>
    <h4>六号牌来源</h4>
    <div class="drawer-pills">${type6Sources || '<span class="pill">未匹配 Webb Type 6 行</span>'}</div>
    <h4>主要行业</h4>
    <div class="drawer-pills">${industries || '<span class="pill">待披露</span>'}</div>
    <h4>样本项目${facts.length > 40 ? `（显示40 / ${facts.length}）` : ""}</h4>
    <div class="deal-list">${facts.slice(0, 40).map(projectLine).join("")}</div>`;
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
      const response = await fetch(`${DATA_URL}?demo=${Date.now()}`);
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
    els.demoNote.textContent = `${publicMethodologyText(meta.demoNoteZh || "本地 demo，不用于公开发布。")} ${PUBLIC_ACTIVE_CAVEAT}`;
    if (meta.licenseCapacity?.available) {
      const cap = meta.licenseCapacity;
      const matchNote = cap.rollupCapacityFirmCount
        ? `匹配 ${cap.matchedRealFirmCount || 0} 家 + ${cap.rollupCapacityFirmCount} 个合并口径`
        : `匹配 ${cap.matchedFirmCount || 0} 家`;
      const freshnessNote =
        cap.quality === "archive_db" && cap.archiveFrozenAt
          ? ` · archive frozen ${cap.archiveFrozenAt}`
          : "";
      const blockNote = cap.primarySourceBlockedReason ? " · 0xmd fallback" : "";
      els.demoNote.textContent += ` 六号牌容量：${cap.quality || "source"} · ${cap.asOfDate || "date pending"}${freshnessNote}${blockNote} · ${matchNote}；仅作机构容量旁证。`;
      if (cap.quality === "archive_db" && cap.dataFreshnessNote) {
        els.demoNote.textContent += ` ${publicMethodologyText(cap.dataFreshnessNote)}`;
      }
    }
    if (meta.sponsorPrincipals?.available) {
      const sp = meta.sponsorPrincipals;
      const spMatchNote = sp.rollupCapacityFirmCount
        ? `匹配 ${sp.matchedRealFirmCount || 0} 家 + ${sp.rollupCapacityFirmCount} 个合并口径`
        : `匹配 ${sp.matchedFirmCount || 0} 家`;
      els.demoNote.textContent += ` SP口径：${sp.quality || "source"} · ${sp.asOfDate || "date pending"} · ${spMatchNote}；SP为可签sponsor工作的principal，负荷/人效优先使用该口径。`;
    }
    if (state.data.quality?.length) {
      els.demoNote.textContent += ` 质量提示：${state.data.quality.map((item) => `${item.code}=${item.count || item.items?.length || 1}`).join("；")}`;
    }
    populateOptions();
    syncControls();
    render();
    if (pkRoot) {
      const pkRows = aggregateFactsForCredit(pkFilteredFacts(), pkState.credit);
      populatePkOptions(pkRows);
      renderPk();
    }
  } catch (error) {
    console.error(error);
    els.demoNote.textContent = `载入失败：${error.message}`;
    els.leaderboardRows.innerHTML = `<tr><td colspan="12" class="empty-state">数据载入失败，请检查本地 JSON。</td></tr>`;
  }
}

// The payload is ~3MB, so defer loading until the sponsor view is actually
// opened (via nav click or ?view=sponsorLeaderboard deep link).
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
