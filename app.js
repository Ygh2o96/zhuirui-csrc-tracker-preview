// no-cache (not no-store) lets the browser revalidate with the CDN ETag and
// skip re-downloading the multi-MB payload when the snapshot is unchanged.
const DATA_URL = `data/csrc_tracker_public.json?v=${Date.now()}`;
const PAGE_SIZE = 50;
const A1_RECEIVED_CURRENT_CYCLE_CAP_DAYS = 180;

const defaults = {
  selectedId: null,
  status: "all",
  hkexStage: "applying",
  query: "",
  view: "tracker",
  dateField: "a1Date",
  dateFrom: "",
  dateTo: "",
  structure: "all",
  industry: "all",
  sponsor: "all",
  marketCapMin: "",
  marketCapMax: "",
  sortField: "currentA1Date",
  sortDir: "desc",
  dayCountMode: "calendar",
  daySortField: "calendarDaysA1ToReceived",
  page: 1
};

const state = {
  data: null,
  ...defaults
};

const statusLabels = {
  notice_issued: ["已发通知书", "Notice issued"],
  regulator_opinion: ["征询监管意见中", "Regulator opinion"],
  supplement_requested: ["补充材料", "Supplement requested"],
  csrc_received: ["已接收", "CSRC received"],
  waiting_received: ["等待接收", "Awaiting receipt"],
  not_required: ["无需备案", "Not required"],
  review_pending: ["待披露", "Pending"],
  pending_match: ["待披露", "Pending"]
};

const viewTitles = {
  tracker: "监管节奏追踪",
  pipeline: "数据管线",
  precedents: "案例检索",
  dossiers: "发行人档案",
  signals: "市场信号",
  research: "研究笔记"
};

const metricDefinitions = [
  {
    metric: "a1ToReceived",
    labelZh: "备案锚点（A1日）至接收天数",
    labelEn: "CSRC A1 date anchor to received days",
    note: "按有公开接收日样本；历史锚点超过180天时改用当前A1，当前A1后未接收则剔除"
  },
  {
    metric: "receivedToNotice",
    labelZh: "接收至通知天数",
    labelEn: "CSRC received to notice days",
    note: "需同一发行人接收日及通知书"
  },
  {
    metric: "a1ToNotice",
    labelZh: "备案锚点（A1日）至通知天数",
    labelEn: "CSRC A1 date anchor to notice days",
    note: "按有通知书样本"
  }
];

const listedMetricDefinitions = [
  {
    metric: "a1ToNotice",
    labelZh: "首次A1至备案通过天数",
    labelEn: "First A1 to CSRC notice days",
    note: "按上市日在CSRC新规后且已有source-backed备案通知书样本"
  },
  {
    metric: "a1ToListing",
    labelZh: "首次A1至上市天数",
    labelEn: "First A1 to HKEX listing days",
    note: "按HKEX New Listing Report上市日样本；密交/疑似密交剔除；无需备案发行人可纳入"
  }
];

const trackedStateKeys = [
  "view",
  "status",
  "hkexStage",
  "query",
  "dateField",
  "dateFrom",
  "dateTo",
  "structure",
  "industry",
  "sponsor",
  "marketCapMin",
  "marketCapMax",
  "sortField",
  "sortDir",
  "dayCountMode",
  "daySortField",
  "page"
];

const dayFieldPairs = {
  a1ToReceived: {
    calendar: "calendarDaysA1ToReceived",
    business: "businessDaysA1ToReceived",
    label: "A1至接收"
  },
  currentA1ToReceived: {
    calendar: "calendarDaysCurrentA1ToReceived",
    business: "businessDaysCurrentA1ToReceived",
    label: "当前A1至接收"
  },
  receivedToNotice: {
    calendar: "calendarDaysReceivedToNotice",
    business: "businessDaysReceivedToNotice",
    label: "接收至通知"
  },
  a1ToNotice: {
    calendar: "calendarDaysA1ToNotice",
    business: "businessDaysA1ToNotice",
    label: "A1至通知"
  },
  a1ToListing: {
    calendar: "calendarDaysA1ToListing",
    business: "businessDaysA1ToListing",
    label: "A1至上市"
  }
};

const daySortFields = Object.values(dayFieldPairs).flatMap((item) => [item.calendar, item.business]);

const statusSortRank = {
  notice_issued: 10,
  regulator_opinion: 20,
  supplement_requested: 30,
  csrc_received: 40,
  not_required: 80,
  waiting_received: 90,
  review_pending: 100,
  pending_match: 100
};

const descendingDefaultSortFields = new Set([
  "a1Date",
  "currentA1Date",
  "csrcReceivedDate",
  "csrcCurrentReceivedDate",
  "noticeDate",
  "hkexListingDate",
  "calendarDaysA1ToReceived",
  "calendarDaysCurrentA1ToReceived",
  "calendarDaysReceivedToNotice",
  "calendarDaysA1ToNotice",
  "businessDaysA1ToReceived",
  "businessDaysCurrentA1ToReceived",
  "businessDaysReceivedToNotice",
  "businessDaysA1ToNotice",
  "businessDaysA1ToListing",
  "calendarDaysCurrentA1ToNotice",
  "businessDaysCurrentA1ToNotice",
  "calendarDaysA1ToListing",
  "aShareMarketCapAtA1RmbBn",
  "listingMarketCapHkdBn"
]);

const numberFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
const integerFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const rmbBnFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
const rmbYiFormatter = new Intl.NumberFormat("zh-CN", { maximumFractionDigits: 1 });

function setLoading(isLoading) {
  const loader = document.getElementById("loadingScreen");
  if (!loader) return;
  loader.classList.toggle("is-hidden", !isLoading);
  loader.setAttribute("aria-hidden", String(!isLoading));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function asDateValue(value) {
  if (!value) return null;
  const time = Date.parse(`${value}T00:00:00+08:00`);
  return Number.isNaN(time) ? null : time;
}

function formatDate(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(String(value))) return formatPending();
  return String(value);
}

function formatDatePlain(value) {
  const html = formatDate(value);
  return html.includes("<span") ? "待披露" : html;
}

function formatNumber(value, mode = "decimal") {
  if (value === null || value === undefined || value === "" || Number.isNaN(value)) return "待披露";
  return mode === "integer" ? integerFormatter.format(value) : numberFormatter.format(value);
}

function formatDayValue(value) {
  if (value === null || value === undefined || value === "" || Number.isNaN(value)) return "待披露";
  return integerFormatter.format(Math.ceil(value));
}

function formatDayNumber(value, unit = dayUnitLabel()) {
  return typeof value === "number" ? `${formatDayValue(value)} ${unit}` : formatPending();
}

function formatPending() {
  return `<span class="pending-zh">待披露</span><span class="pending-en">Pending</span>`;
}

function isAhCandidate(record) {
  return Boolean(record.isAH) || Boolean(record.aShareCode) || String(record.aShareStatus || "").includes("A-share listed");
}

function isHkexListed(record) {
  const rawStatus = String(record.hkexPublicStatus || "").trim();
  return rawStatus.toLowerCase() === "listed" || rawStatus === "已上市" || (record.statusTags || []).includes("已上市");
}

function isPostRegimeListed(record) {
  if (!isHkexListed(record)) return false;
  const regimeStart = state.data?.meta?.csrcRegimeEffectiveDate || "2023-03-31";
  return Boolean(record.hkexListingDate) && String(record.hkexListingDate) >= regimeStart;
}

function hasNoticeGapAfterListing(record) {
  return isPostRegimeListed(record) && record.csrcFilingRequired !== false && !record.noticeDate;
}

function hkexListingStage(record) {
  // practicalStage is computed by the exporter: lapsed/withdrawn issuers with
  // live CSRC progress stay in "applying" (they almost always refile); only
  // genuinely stale cases park in "other".
  if (record.practicalStage) return record.practicalStage;
  if (isPostRegimeListed(record)) return "listed";
  const rawStatus = String(record.hkexPublicStatus || "").trim();
  const normalized = rawStatus.toLowerCase();
  if (["active", "processing"].includes(normalized) || rawStatus === "處理中" || rawStatus === "处理中") return "applying";
  if (["lapsed", "withdrawn", "rejected"].includes(normalized) || ["失效", "撤回", "拒绝", "拒絕"].includes(rawStatus)) return "other";
  return "applying";
}

function hkexStageLabel(stage) {
  const labels = {
    all: "全部 All",
    applying: "上市申请中 In application",
    listed: "已上市 Listed",
    other: "搁置/撤回 Stalled / withdrawn"
  };
  return labels[stage] || stage;
}

let stageCountsCache = null;

function hkexListingStageCounts(records = state.data?.records || []) {
  if (records === state.data?.records && stageCountsCache) return stageCountsCache;
  const counts = { all: records.length, applying: 0, listed: 0, other: 0 };
  for (const record of records) {
    const stage = hkexListingStage(record);
    counts[stage] = (counts[stage] || 0) + 1;
  }
  if (records === state.data?.records) stageCountsCache = counts;
  return counts;
}

function syncListingStageButtons() {
  const stageCounts = hkexListingStageCounts();
  document.querySelectorAll("[data-hkex-stage]").forEach((button) => {
    const stage = button.dataset.hkexStage;
    button.classList.toggle("is-active", stage === state.hkexStage);
    button.setAttribute("aria-pressed", String(stage === state.hkexStage));
    button.title = `${hkexStageLabel(stage)}：${formatNumber(stageCounts[stage] || 0, "integer")} 家`;
  });
  document.querySelectorAll("[data-stage-count]").forEach((item) => {
    const stage = item.dataset.stageCount;
    item.textContent = formatNumber(stageCounts[stage] || 0, "integer");
  });
}

const allStageListingMetric = {
  metric: "a1ToListing",
  labelZh: "首次A1至上市天数",
  labelEn: "First A1 to HKEX listing days",
  note: "按HKEX New Listing Report上市日样本；密交/疑似密交剔除；无需备案发行人可纳入"
};

function currentMetricDefinitions() {
  if (state.hkexStage === "listed") return listedMetricDefinitions;
  if (state.hkexStage === "all") return [...metricDefinitions, allStageListingMetric];
  if (state.hkexStage === "other") return [];
  return metricDefinitions;
}

function currentDayMetricEntries() {
  const metrics = state.hkexStage === "listed"
    ? ["a1ToNotice", "a1ToListing"]
    : ["a1ToReceived", "currentA1ToReceived", "receivedToNotice", "a1ToNotice"];
  return metrics.map((metric) => dayFieldPairs[metric]).filter(Boolean);
}

function issuerTypeKey(record) {
  if (isAhCandidate(record)) return "a_h";
  const raw = `${record.structureType || ""} ${record.issuerJurisdiction || ""}`.toLowerCase();
  if (raw.includes("red-chip") || raw.includes("offshore")) return "red_chip";
  if (raw.includes("h-share") || raw.includes("prc-incorporated")) return "h_share";
  return "other";
}

function issuerTypeInfo(recordOrKey) {
  const key = typeof recordOrKey === "string" ? recordOrKey : issuerTypeKey(recordOrKey);
  const labels = {
    a_h: { primary: "A+H", secondary: "A-share + H-share", rank: 1 },
    h_share: { primary: "H股", secondary: "H-share", rank: 2 },
    red_chip: { primary: "红筹", secondary: "Red-chip", rank: 3 },
    other: { primary: "其他", secondary: "Other", rank: 9 }
  };
  return labels[key] || labels.other;
}

function renderIssuerType(record) {
  const info = issuerTypeInfo(record);
  return `<span class="issuer-type-primary">${escapeHtml(info.primary)}</span><span class="pending-en">${escapeHtml(info.secondary)}</span>`;
}

function formatMarketCap(record) {
  const value = record.aShareMarketCapAtA1RmbBn;
  if (!isAhCandidate(record)) return `<span class="not-applicable">不适用</span><span class="pending-en">N/A</span>`;
  if (typeof value !== "number") return formatPending();
  const yiValue = value * 10;
  return `
    <span class="market-cap-value">${rmbYiFormatter.format(yiValue)}亿</span>
    <span class="pending-en">¥${rmbBnFormatter.format(value)}B · A1日</span>
  `;
}

function formatListingMarketCap(record) {
  const value = record.listingMarketCapHkdBn;
  if (typeof value !== "number") return formatPending();
  const yiValue = value * 10;
  return `
    <span class="market-cap-value">${rmbYiFormatter.format(yiValue)}亿</span>
    <span class="pending-en">HK$${rmbBnFormatter.format(value)}B · 上市日</span>
  `;
}

function hasCjk(value) {
  return /[\u3400-\u9fff]/.test(String(value || ""));
}

function nameParts(record) {
  if (hasCjk(record.csrcName)) {
    return { primary: record.csrcName, secondary: record.issuerName };
  }
  return { primary: record.issuerName, secondary: record.csrcName };
}

function statusLabel(status, index = 0) {
  return (statusLabels[status] || [status, status])[index];
}

function dayUnitLabel() {
  return state.dayCountMode === "business" ? "工作日" : "自然日";
}

function dayBasisNote() {
  return state.dayCountMode === "business" ? "按中国节假日调休口径" : "按自然日差值";
}

function dayMetricEntry(field) {
  return Object.values(dayFieldPairs).find((item) => item.calendar === field || item.business === field) || null;
}

function fieldForDayMode(field, mode = state.dayCountMode) {
  const entry = dayMetricEntry(field);
  return entry ? entry[mode] : field;
}

function dayMetricField(metric) {
  return dayFieldPairs[metric]?.[state.dayCountMode] || metric;
}

function setDaySelectOptions() {
  const select = document.getElementById("daySortField");
  if (!select) return;
  const entries = currentDayMetricEntries();
  if (!entries.some((entry) => entry[state.dayCountMode] === state.daySortField)) {
    state.daySortField = entries[0]?.[state.dayCountMode] || fieldForDayMode(state.daySortField, state.dayCountMode);
    if (daySortFields.includes(state.sortField)) state.sortField = state.daySortField;
  }
  const html = entries
    .map((entry) => `<option value="${entry[state.dayCountMode]}">${entry.label}</option>`)
    .join("");
  if (select.innerHTML !== html) select.innerHTML = html;
}

const sponsorDisplayRules = [
  { pattern: /China International Capital|CICC/i, shortName: "中金", aliases: ["CICC", "中国国际金融", "China International Capital"] },
  { pattern: /CITIC Securities/i, shortName: "中信证券", aliases: ["CITIC", "中信", "CITIC Securities"] },
  { pattern: /China Securities.*International/i, shortName: "中信建投国际", aliases: ["中信建投", "CSC", "China Securities"] },
  { pattern: /Huatai/i, shortName: "华泰国际", aliases: ["华泰", "Huatai"] },
  { pattern: /Guotai Junan/i, shortName: "国泰君安", aliases: ["国泰君安国际", "GTJA", "Guotai Junan"] },
  { pattern: /CMB International/i, shortName: "招银国际", aliases: ["招银", "CMBI", "CMB International"] },
  { pattern: /China Merchants Securities/i, shortName: "招商证券", aliases: ["招商", "CMS", "China Merchants"] },
  { pattern: /Haitong/i, shortName: "海通国际", aliases: ["海通", "Haitong"] },
  { pattern: /J\.?P\.?\s*Morgan|JP Morgan/i, shortName: "摩根大通", aliases: ["JPM", "J.P. Morgan", "JP Morgan"] },
  { pattern: /CCB International|CCBI/i, shortName: "建银国际", aliases: ["建银", "CCBI", "CCB International"] },
  { pattern: /GF Capital|GF Securities/i, shortName: "广发", aliases: ["广发证券", "GF", "GF Securities"] },
  { pattern: /ABCI/i, shortName: "农银国际", aliases: ["农银", "ABCI"] },
  { pattern: /Goldman/i, shortName: "高盛", aliases: ["Goldman Sachs"] },
  { pattern: /Morgan Stanley/i, shortName: "摩根士丹利", aliases: ["MS", "Morgan Stanley"] },
  { pattern: /CLSA|CITIC CLSA/i, shortName: "中信里昂", aliases: ["里昂", "CLSA"] },
  { pattern: /Citigroup|Citi/i, shortName: "花旗", aliases: ["Citi", "Citigroup"] },
  { pattern: /BOCI/i, shortName: "中银国际", aliases: ["中银", "BOCI"] },
  { pattern: /Merrill|BofA|Bank of America/i, shortName: "美银", aliases: ["美林", "BofA", "Bank of America", "Merrill"] },
  { pattern: /China Galaxy/i, shortName: "银河国际", aliases: ["银河", "China Galaxy"] },
  { pattern: /CMBC International/i, shortName: "民银国际", aliases: ["民银", "CMBC"] },
  { pattern: /UBS/i, shortName: "瑞银", aliases: ["UBS", "瑞銀"] },
  { pattern: /Sinolink/i, shortName: "国金", aliases: ["国金证券", "Sinolink"] },
  { pattern: /ICBC International/i, shortName: "工银国际", aliases: ["工银", "ICBC"] },
  { pattern: /HSBC|Hongkong and Shanghai Banking/i, shortName: "汇丰", aliases: ["滙豐", "汇丰银行", "HSBC"] },
  { pattern: /Shenwan Hongyuan|Shenyin Wanguo/i, shortName: "申万宏源", aliases: ["申万", "申銀萬國", "Shenwan"] },
  { pattern: /Ping An/i, shortName: "平安", aliases: ["平安证券", "Ping An"] },
  { pattern: /Deutsche/i, shortName: "德银", aliases: ["德意志银行", "Deutsche"] },
  { pattern: /Zhongtai/i, shortName: "中泰国际", aliases: ["中泰", "Zhongtai"] },
  { pattern: /Jefferies/i, shortName: "杰富瑞", aliases: ["Jefferies"] },
  { pattern: /SPDB/i, shortName: "浦银国际", aliases: ["浦银", "SPDB"] },
  { pattern: /DBS/i, shortName: "星展", aliases: ["星展银行", "DBS"] },
  { pattern: /BNP/i, shortName: "法巴", aliases: ["法国巴黎银行", "BNP", "BNP Paribas"] },
  { pattern: /BOCOM/i, shortName: "交银国际", aliases: ["交银", "BOCOM"] },
  { pattern: /China Everbright|CEB International/i, shortName: "光大国际", aliases: ["光大", "Everbright", "CEB"] },
  { pattern: /Guoyuan/i, shortName: "国元", aliases: ["Guoyuan"] },
  { pattern: /Orient Capital/i, shortName: "东方融资", aliases: ["Orient Capital"] },
  { pattern: /Rainbow/i, shortName: "Rainbow", aliases: ["Rainbow"] },
  { pattern: /Sunny Fortune/i, shortName: "Sunny", aliases: ["Sunny Fortune"] },
  { pattern: /China Industrial Securities/i, shortName: "兴证国际", aliases: ["兴证", "China Industrial Securities"] },
  { pattern: /First Shanghai/i, shortName: "第一上海", aliases: ["First Shanghai"] },
  { pattern: /Yue Xiu/i, shortName: "越秀", aliases: ["Yue Xiu"] },
  { pattern: /Alliance Capital Partners/i, shortName: "Alliance", aliases: ["Alliance"] },
  { pattern: /SDIC|Essence/i, shortName: "国投证券", aliases: ["安信", "Essence", "SDIC"] },
  { pattern: /Quam/i, shortName: "华富建业", aliases: ["Quam"] },
  { pattern: /Zero2IPO/i, shortName: "清科", aliases: ["Zero2IPO"] },
  { pattern: /South China/i, shortName: "南华", aliases: ["South China"] },
  { pattern: /Lego/i, shortName: "Lego", aliases: ["Lego"] },
  { pattern: /VBG/i, shortName: "建泉", aliases: ["VBG"] },
  { pattern: /Guosen/i, shortName: "国信", aliases: ["Guosen"] },
  { pattern: /China Renaissance/i, shortName: "华兴", aliases: ["华兴资本", "China Renaissance"] },
  { pattern: /Goldlink/i, shortName: "金联", aliases: ["Goldlink"] },
  { pattern: /Dongxing/i, shortName: "东兴", aliases: ["Dongxing"] },
  { pattern: /Macquarie/i, shortName: "麦格理", aliases: ["Macquarie"] },
  { pattern: /Altus/i, shortName: "浩德", aliases: ["Altus"] },
  { pattern: /Red Sun/i, shortName: "红日", aliases: ["Red Sun"] },
  { pattern: /Cinda/i, shortName: "信达国际", aliases: ["信达", "Cinda"] },
  { pattern: /Caitong/i, shortName: "财通国际", aliases: ["财通", "Caitong"] },
  { pattern: /Innovax/i, shortName: "创升", aliases: ["Innovax"] },
  { pattern: /Somerley/i, shortName: "新百利", aliases: ["Somerley"] },
  { pattern: /China Sunrise/i, shortName: "华升", aliases: ["China Sunrise"] }
];

const traditionalToSimplified = {
  "萬": "万", "與": "与", "專": "专", "業": "业", "東": "东", "絲": "丝", "丟": "丢", "兩": "两", "嚴": "严", "喪": "丧", "個": "个", "豐": "丰",
  "臨": "临", "為": "为", "麗": "丽", "舉": "举", "麼": "么", "義": "义", "烏": "乌", "樂": "乐", "喬": "乔", "習": "习", "鄉": "乡",
  "書": "书", "買": "买", "亂": "乱", "爭": "争", "於": "于", "虧": "亏", "雲": "云", "亞": "亚", "產": "产", "畝": "亩", "親": "亲",
  "褻": "亵", "嚲": "亸", "億": "亿", "僅": "仅", "從": "从", "侖": "仑", "倉": "仓", "儀": "仪", "們": "们", "價": "价", "眾": "众",
  "優": "优", "會": "会", "傘": "伞", "偉": "伟", "傳": "传", "傷": "伤", "倫": "伦", "偽": "伪", "佇": "伫", "體": "体", "餘": "余",
  "傭": "佣", "僉": "佥", "俠": "侠", "侶": "侣", "僥": "侥", "偵": "侦", "側": "侧", "僑": "侨", "儈": "侩", "儂": "侬", "儼": "俨",
  "儉": "俭", "債": "债", "傾": "倾", "偻": "偻", "償": "偿", "儲": "储", "兒": "儿", "兌": "兑", "內": "内", "兩": "两", "冊": "册",
  "寫": "写", "軍": "军", "農": "农", "馮": "冯", "沖": "冲", "決": "决", "況": "况", "凍": "冻", "淨": "净", "準": "准", "涼": "凉",
  "減": "减", "湊": "凑", "凜": "凛", "幾": "几", "鳳": "凤", "憑": "凭", "凱": "凯", "擊": "击", "鑿": "凿", "剎": "刹", "劑": "剂",
  "則": "则", "剛": "刚", "創": "创", "刪": "删", "別": "别", "剗": "刬", "剄": "刭", "剎": "刹", "劉": "刘", "劊": "刽", "劍": "剑",
  "剝": "剥", "劇": "剧", "勸": "劝", "辦": "办", "務": "务", "勛": "勋", "動": "动", "勵": "励", "勁": "劲", "勞": "劳", "勢": "势",
  "勻": "匀", "匭": "匦", "匯": "汇", "區": "区", "協": "协", "單": "单", "賣": "卖", "盧": "卢", "鹵": "卤", "衛": "卫", "卻": "却",
  "廠": "厂", "廳": "厅", "歷": "历", "厲": "厉", "壓": "压", "厭": "厌", "廈": "厦", "縣": "县", "參": "参", "雙": "双", "發": "发",
  "變": "变", "敘": "叙", "疊": "叠", "葉": "叶", "號": "号", "嘆": "叹", "嘰": "叽", "嚇": "吓", "嗎": "吗", "啟": "启", "吳": "吴",
  "吶": "呐", "嘔": "呕", "員": "员", "聽": "听", "嗆": "呛", "嗚": "呜", "詠": "咏", "鹹": "咸", "響": "响", "啞": "哑", "嘩": "哗",
  "噲": "哙", "喲": "哟", "嘜": "唛", "喚": "唤", "啄": "啄", "問": "问", "啓": "启", "啞": "哑", "嘖": "啧", "嘗": "尝", "嘮": "唠",
  "嘯": "啸", "嘰": "叽", "噴": "喷", "噸": "吨", "嚨": "咙", "嚐": "尝", "嚮": "向", "嚶": "嘤", "嚴": "严", "囑": "嘱", "囂": "嚣",
  "團": "团", "園": "园", "國": "国", "圖": "图", "圓": "圆", "聖": "圣", "場": "场", "壞": "坏", "塊": "块", "堅": "坚", "壇": "坛",
  "壩": "坝", "墳": "坟", "墜": "坠", "壟": "垄", "壘": "垒", "墾": "垦", "執": "执", "堯": "尧", "報": "报", "塢": "坞", "墊": "垫",
  "塵": "尘", "塹": "堑", "墮": "堕", "壯": "壮", "聲": "声", "殼": "壳", "壺": "壶", "處": "处", "備": "备", "複": "复", "夠": "够",
  "頭": "头", "誇": "夸", "夾": "夹", "奪": "夺", "奮": "奋", "奧": "奥", "妝": "妆", "婦": "妇", "媽": "妈", "嫵": "妩", "嫻": "娴",
  "嬌": "娇", "嬈": "娆", "娛": "娱", "媧": "娲", "嫗": "妪", "媼": "媪", "嬋": "婵", "嬸": "婶", "孫": "孙", "學": "学", "孿": "孪",
  "寧": "宁", "寶": "宝", "實": "实", "寵": "宠", "審": "审", "寫": "写", "寬": "宽", "賓": "宾", "寢": "寝", "對": "对", "尋": "寻",
  "導": "导", "將": "将", "爾": "尔", "塵": "尘", "嘗": "尝", "堯": "尧", "尷": "尴", "屍": "尸", "盡": "尽", "層": "层", "屜": "屉",
  "屬": "属", "岡": "冈", "島": "岛", "峽": "峡", "崗": "岗", "巋": "岿", "嶇": "岖", "嶄": "崭", "嶼": "屿", "歲": "岁", "豈": "岂",
  "嶺": "岭", "嶽": "岳", "巔": "巅", "幣": "币", "帥": "帅", "師": "师", "帳": "帐", "帶": "带", "幀": "帧", "幫": "帮", "幹": "干",
  "幾": "几", "庫": "库", "廁": "厕", "廂": "厢", "廄": "厩", "廈": "厦", "廚": "厨", "廝": "厮", "廟": "庙", "廠": "厂", "廡": "庑",
  "廢": "废", "廣": "广", "廩": "廪", "廬": "庐", "廳": "厅", "弒": "弑", "張": "张", "強": "强", "彆": "别", "彈": "弹", "彌": "弥",
  "彎": "弯", "彙": "汇", "彥": "彦", "後": "后", "徑": "径", "從": "从", "徠": "徕", "復": "复", "徵": "征", "徹": "彻", "恆": "恒",
  "恥": "耻", "悅": "悦", "悶": "闷", "惡": "恶", "惱": "恼", "惲": "恽", "愛": "爱", "愜": "惬", "愨": "悫", "愴": "怆", "愷": "恺",
  "愾": "忾", "態": "态", "慣": "惯", "慘": "惨", "慚": "惭", "慟": "恸", "慪": "怄", "慫": "怂", "慮": "虑", "慳": "悭", "慶": "庆",
  "憂": "忧", "憊": "惫", "憐": "怜", "憑": "凭", "憚": "惮", "憤": "愤", "憫": "悯", "憮": "怃", "憲": "宪", "憶": "忆", "懇": "恳",
  "應": "应", "懌": "怿", "懍": "懔", "懟": "怼", "懣": "懑", "懲": "惩", "懶": "懒", "懷": "怀", "懸": "悬", "懺": "忏", "懼": "惧",
  "懾": "慑", "戀": "恋", "戇": "戆", "戔": "戋", "戲": "戏", "戧": "戗", "戰": "战", "戩": "戬", "戶": "户", "拋": "抛", "挾": "挟",
  "捨": "舍", "掃": "扫", "掄": "抡", "掙": "挣", "掛": "挂", "採": "采", "揀": "拣", "換": "换", "揮": "挥", "損": "损", "搖": "摇",
  "搗": "捣", "搜": "搜", "搶": "抢", "摑": "掴", "摜": "掼", "摟": "搂", "摯": "挚", "摳": "抠", "摶": "抟", "撈": "捞", "撐": "撑",
  "撓": "挠", "撥": "拨", "撫": "抚", "撲": "扑", "撳": "揿", "撻": "挞", "撾": "挝", "撿": "捡", "擁": "拥", "擄": "掳", "擇": "择",
  "擊": "击", "擋": "挡", "擔": "担", "據": "据", "擠": "挤", "擬": "拟", "擯": "摈", "擰": "拧", "擱": "搁", "擲": "掷", "擴": "扩",
  "擺": "摆", "擻": "擞", "擾": "扰", "攆": "撵", "攏": "拢", "攔": "拦", "攖": "撄", "攙": "搀", "攜": "携", "攝": "摄", "攢": "攒",
  "攣": "挛", "攤": "摊", "攪": "搅", "攬": "揽", "敗": "败", "敘": "叙", "敵": "敌", "數": "数", "斂": "敛", "斃": "毙", "斕": "斓",
  "斬": "斩", "斷": "断", "於": "于", "時": "时", "晉": "晋", "晝": "昼", "暈": "晕", "暉": "晖", "暢": "畅", "暫": "暂", "曄": "晔",
  "曆": "历", "曇": "昙", "曉": "晓", "曖": "暧", "曠": "旷", "曨": "昽", "曬": "晒", "書": "书", "會": "会", "朧": "胧", "東": "东",
  "極": "极", "構": "构", "槍": "枪", "楓": "枫", "梟": "枭", "櫃": "柜", "檸": "柠", "檢": "检", "樓": "楼", "標": "标", "樞": "枢",
  "樣": "样", "樸": "朴", "樹": "树", "橋": "桥", "機": "机", "橢": "椭", "橫": "横", "檔": "档", "檯": "台", "檳": "槟", "檸": "柠",
  "櫥": "橱", "櫻": "樱", "權": "权", "欄": "栏", "欽": "钦", "歐": "欧", "殲": "歼", "殺": "杀", "殼": "壳", "毀": "毁", "毆": "殴",
  "畢": "毕", "氣": "气", "氫": "氢", "氬": "氩", "氳": "氲", "漢": "汉", "湯": "汤", "溝": "沟", "沒": "没", "淚": "泪", "淥": "渌",
  "潔": "洁", "潛": "潜", "潤": "润", "澀": "涩", "淵": "渊", "淶": "涞", "淺": "浅", "漿": "浆", "澆": "浇", "湞": "浈", "濁": "浊",
  "測": "测", "濟": "济", "瀏": "浏", "渾": "浑", "滸": "浒", "濃": "浓", "澤": "泽", "濤": "涛", "澗": "涧", "瀋": "沈", "瀘": "泸",
  "濾": "滤", "瀟": "潇", "灑": "洒", "灣": "湾", "滅": "灭", "燈": "灯", "靈": "灵", "災": "灾", "爐": "炉", "點": "点", "煉": "炼",
  "熾": "炽", "爍": "烁", "爛": "烂", "爭": "争", "爺": "爷", "牆": "墙", "牽": "牵", "犧": "牺", "狀": "状", "獨": "独", "狹": "狭",
  "獅": "狮", "獎": "奖", "獵": "猎", "豬": "猪", "貓": "猫", "現": "现", "瑋": "玮", "環": "环", "璽": "玺", "瓊": "琼", "電": "电",
  "畫": "画", "當": "当", "疇": "畴", "療": "疗", "瘡": "疮", "瘋": "疯", "瘍": "疡", "瘓": "痪", "瘞": "瘗", "瘡": "疮", "癆": "痨",
  "癇": "痫", "癉": "瘅", "癒": "愈", "癘": "疠", "癟": "瘪", "癢": "痒", "癤": "疖", "癥": "症", "癧": "疬", "癩": "癞", "癬": "癣",
  "癭": "瘿", "癮": "瘾", "癰": "痈", "癱": "瘫", "癲": "癫", "發": "发", "皚": "皑", "皰": "疱", "盜": "盗", "盞": "盏", "監": "监",
  "盤": "盘", "盧": "卢", "眥": "眦", "眾": "众", "睏": "困", "睜": "睁", "矚": "瞩", "矯": "矫", "礦": "矿", "碼": "码", "磚": "砖",
  "確": "确", "磧": "碛", "磯": "矶", "禪": "禅", "禮": "礼", "禱": "祷", "禍": "祸", "禎": "祯", "離": "离", "禿": "秃", "稅": "税",
  "穀": "谷", "穌": "稣", "積": "积", "穎": "颖", "窩": "窝", "窪": "洼", "窮": "穷", "竄": "窜", "竅": "窍", "竇": "窦", "競": "竞",
  "筆": "笔", "筍": "笋", "箋": "笺", "節": "节", "範": "范", "築": "筑", "篤": "笃", "簡": "简", "簽": "签", "簾": "帘", "籃": "篮",
  "籌": "筹", "籤": "签", "籲": "吁", "粵": "粤", "糞": "粪", "糧": "粮", "糾": "纠", "紀": "纪", "紂": "纣", "約": "约", "紅": "红",
  "紋": "纹", "納": "纳", "紐": "纽", "紓": "纾", "純": "纯", "紕": "纰", "紗": "纱", "紙": "纸", "級": "级", "紛": "纷", "紜": "纭",
  "紡": "纺", "緊": "紧", "細": "细", "紱": "绂", "紳": "绅", "紹": "绍", "紺": "绀", "終": "终", "絆": "绊", "組": "组", "絎": "绗",
  "結": "结", "絕": "绝", "絛": "绦", "絞": "绞", "絡": "络", "給": "给", "絢": "绚", "統": "统", "絲": "丝", "絳": "绛", "絹": "绢",
  "綁": "绑", "綃": "绡", "綏": "绥", "經": "经", "綜": "综", "綠": "绿", "綢": "绸", "綣": "绻", "綫": "线", "維": "维", "綱": "纲",
  "網": "网", "綴": "缀", "綵": "彩", "綸": "纶", "綹": "绺", "綺": "绮", "綻": "绽", "綽": "绰", "綾": "绫", "綿": "绵", "緄": "绲",
  "緇": "缁", "緊": "紧", "緋": "绯", "緒": "绪", "緘": "缄", "緙": "缂", "線": "线", "緝": "缉", "緞": "缎", "締": "缔", "緡": "缗",
  "緣": "缘", "編": "编", "緩": "缓", "緬": "缅", "緯": "纬", "練": "练", "緶": "缏", "緹": "缇", "緻": "致", "縈": "萦", "縉": "缙",
  "縊": "缢", "縋": "缒", "縐": "绉", "縑": "缣", "縛": "缚", "縝": "缜", "縞": "缟", "縟": "缛", "縣": "县", "縫": "缝", "縭": "缡",
  "縮": "缩", "縱": "纵", "縲": "缧", "縴": "纤", "縵": "缦", "縷": "缕", "縹": "缥", "總": "总", "績": "绩", "繃": "绷", "繅": "缫",
  "繆": "缪", "繈": "襁", "繒": "缯", "織": "织", "繕": "缮", "繚": "缭", "繞": "绕", "繡": "绣", "繢": "缋", "繩": "绳", "繪": "绘",
  "繫": "系", "繭": "茧", "繮": "缰", "繯": "缳", "繰": "缲", "繳": "缴", "繹": "绎", "繼": "继", "繽": "缤", "纈": "缬", "續": "续",
  "纏": "缠", "纓": "缨", "纖": "纤", "纜": "缆", "缽": "钵", "罈": "坛", "罌": "罂", "罰": "罚", "羅": "罗", "羆": "罴", "羈": "羁",
  "羋": "芈", "羥": "羟", "義": "义", "習": "习", "翹": "翘", "聖": "圣", "聞": "闻", "聯": "联", "聰": "聪", "聲": "声", "聳": "耸",
  "職": "职", "聶": "聂", "聾": "聋", "肅": "肃", "脅": "胁", "脈": "脉", "脛": "胫", "脫": "脱", "腎": "肾", "腫": "肿", "腳": "脚",
  "腸": "肠", "膚": "肤", "膠": "胶", "膽": "胆", "膾": "脍", "臉": "脸", "臍": "脐", "臏": "膑", "臘": "腊", "臚": "胪", "臟": "脏",
  "臠": "脔", "臢": "臜", "臨": "临", "與": "与", "興": "兴", "舉": "举", "舊": "旧", "艙": "舱", "艦": "舰", "艱": "艰", "艷": "艳",
  "藝": "艺", "節": "节", "薌": "芗", "蕪": "芜", "蘆": "芦", "蘇": "苏", "蘊": "蕴", "蘋": "苹", "藍": "蓝", "薊": "蓟", "虛": "虚",
  "蟲": "虫", "蝕": "蚀", "蟻": "蚁", "蠶": "蚕", "衆": "众", "術": "术", "衛": "卫", "衝": "冲", "袞": "衮", "補": "补", "裝": "装",
  "裡": "里", "製": "制", "複": "复", "褲": "裤", "襲": "袭", "見": "见", "觀": "观", "規": "规", "覓": "觅", "視": "视", "覘": "觇",
  "覡": "觋", "覥": "觍", "覦": "觎", "親": "亲", "覬": "觊", "覯": "觏", "覲": "觐", "覷": "觑", "覺": "觉", "覽": "览", "覿": "觌",
  "觔": "筋", "觴": "觞", "觸": "触", "訁": "讠", "訂": "订", "訃": "讣", "計": "计", "訊": "讯", "訌": "讧", "討": "讨", "訐": "讦",
  "訓": "训", "訕": "讪", "訖": "讫", "託": "托", "記": "记", "訛": "讹", "訝": "讶", "訟": "讼", "訣": "诀", "訥": "讷", "訪": "访",
  "設": "设", "許": "许", "訴": "诉", "診": "诊", "註": "注", "詁": "诂", "詆": "诋", "詎": "讵", "詐": "诈", "詒": "诒", "詔": "诏",
  "評": "评", "詛": "诅", "詞": "词", "詠": "咏", "詢": "询", "詣": "诣", "試": "试", "詩": "诗", "詫": "诧", "詬": "诟", "詭": "诡",
  "詮": "诠", "話": "话", "該": "该", "詳": "详", "詵": "诜", "詼": "诙", "誅": "诛", "誇": "夸", "誌": "志", "認": "认", "誑": "诳",
  "誒": "诶", "誕": "诞", "誘": "诱", "語": "语", "誠": "诚", "誡": "诫", "誣": "诬", "誤": "误", "誥": "诰", "誦": "诵", "誨": "诲",
  "說": "说", "誰": "谁", "課": "课", "誹": "诽", "誼": "谊", "調": "调", "諂": "谄", "諄": "谆", "談": "谈", "諉": "诿", "請": "请",
  "諍": "诤", "諏": "诹", "諑": "诼", "諒": "谅", "論": "论", "諗": "谂", "諛": "谀", "諜": "谍", "諧": "谐", "諫": "谏", "諭": "谕",
  "諮": "谘", "諱": "讳", "諳": "谙", "諶": "谌", "諷": "讽", "諸": "诸", "諺": "谚", "諾": "诺", "謀": "谋", "謁": "谒", "謂": "谓",
  "謄": "誊", "謅": "诌", "謊": "谎", "謎": "谜", "謐": "谧", "謔": "谑", "謖": "谡", "謗": "谤", "謙": "谦", "講": "讲", "謝": "谢",
  "謠": "谣", "謡": "谣", "謨": "谟", "謫": "谪", "謬": "谬", "謳": "讴", "謹": "谨", "謾": "谩", "譁": "哗", "證": "证", "譎": "谲",
  "譏": "讥", "譖": "谮", "識": "识", "譙": "谯", "譚": "谭", "譜": "谱", "警": "警", "譫": "谵", "譯": "译", "議": "议", "譴": "谴",
  "護": "护", "譽": "誉", "讀": "读", "變": "变", "讒": "谗", "讓": "让", "讕": "谰", "讖": "谶", "讚": "赞", "讜": "谠", "貝": "贝",
  "貞": "贞", "負": "负", "財": "财", "貢": "贡", "貧": "贫", "貨": "货", "販": "贩", "貪": "贪", "貫": "贯", "責": "责", "貯": "贮",
  "貴": "贵", "貶": "贬", "買": "买", "貸": "贷", "費": "费", "貼": "贴", "貽": "贻", "貿": "贸", "賀": "贺", "賁": "贲", "賂": "赂",
  "賃": "赁", "賄": "贿", "資": "资", "賈": "贾", "賊": "贼", "賑": "赈", "賒": "赊", "賓": "宾", "賕": "赇", "賙": "赒", "賚": "赉",
  "賜": "赐", "賞": "赏", "賠": "赔", "賡": "赓", "賢": "贤", "賣": "卖", "賤": "贱", "賦": "赋", "質": "质", "賬": "账", "賭": "赌",
  "賴": "赖", "賵": "赗", "賺": "赚", "購": "购", "賽": "赛", "贄": "贽", "贅": "赘", "贈": "赠", "贊": "赞", "贍": "赡", "贏": "赢",
  "贓": "赃", "贖": "赎", "贗": "赝", "贛": "赣", "趕": "赶", "趙": "赵", "趨": "趋", "躉": "趸", "躍": "跃", "躑": "踯", "躒": "跞",
  "躓": "踬", "躕": "蹰", "躚": "跹", "躡": "蹑", "躥": "蹿", "躦": "躜", "軀": "躯", "車": "车", "軋": "轧", "軌": "轨", "軍": "军",
  "軒": "轩", "軔": "轫", "軟": "软", "軤": "轷", "軫": "轸", "軲": "轱", "軸": "轴", "軹": "轵", "軺": "轺", "軻": "轲", "軼": "轶",
  "軾": "轼", "較": "较", "輅": "辂", "輇": "辁", "載": "载", "輊": "轾", "輒": "辄", "輓": "挽", "輔": "辅", "輕": "轻", "輛": "辆",
  "輜": "辎", "輝": "辉", "輞": "辋", "輟": "辍", "輥": "辊", "輦": "辇", "輩": "辈", "輪": "轮", "輯": "辑", "輸": "输", "輻": "辐",
  "輾": "辗", "輿": "舆", "轂": "毂", "轄": "辖", "轅": "辕", "轆": "辘", "轉": "转", "轍": "辙", "轎": "轿", "轔": "辚", "轟": "轰",
  "轡": "辔", "轢": "轹", "轤": "轳", "辦": "办", "辭": "辞", "辯": "辩", "農": "农", "逕": "迳", "這": "这", "連": "连", "週": "周",
  "進": "进", "遊": "游", "運": "运", "過": "过", "達": "达", "違": "违", "遙": "遥", "遜": "逊", "遞": "递", "遠": "远", "適": "适",
  "遲": "迟", "遷": "迁", "選": "选", "遺": "遗", "遼": "辽", "邁": "迈", "還": "还", "邇": "迩", "邊": "边", "邏": "逻", "鄧": "邓",
  "鄭": "郑", "鄰": "邻", "鄲": "郸", "鄴": "邺", "鄶": "郐", "鄺": "邝", "酈": "郦", "醞": "酝", "醫": "医", "醬": "酱", "釀": "酿",
  "釁": "衅", "釋": "释", "釐": "厘", "釒": "钅", "鈍": "钝", "鈔": "钞", "鐘": "钟", "鈣": "钙", "鈦": "钛", "鈞": "钧", "鈉": "钠",
  "鋼": "钢", "鉅": "钜", "鉛": "铅", "鉤": "钩", "鉑": "铂", "銀": "银", "銅": "铜", "銘": "铭", "銳": "锐", "銷": "销", "鋁": "铝",
  "鋒": "锋", "鋅": "锌", "錦": "锦", "錄": "录", "錢": "钱", "錫": "锡", "錯": "错", "錳": "锰", "錶": "表", "鍋": "锅", "鍍": "镀",
  "鍛": "锻", "鍾": "钟", "鎂": "镁", "鎮": "镇", "鏈": "链", "鏡": "镜", "鏽": "锈", "鐵": "铁", "鑄": "铸", "鑑": "鉴", "鑒": "鉴",
  "鑠": "铄", "鑣": "镳", "鑰": "钥", "鑽": "钻", "鑾": "銮", "長": "长", "門": "门", "閃": "闪", "閉": "闭", "開": "开", "閏": "闰",
  "閑": "闲", "間": "间", "閔": "闵", "閘": "闸", "閡": "阂", "閣": "阁", "閥": "阀", "閨": "闺", "閩": "闽", "閭": "闾", "閱": "阅",
  "閻": "阎", "闊": "阔", "闆": "板", "闈": "闱", "闔": "阖", "闖": "闯", "關": "关", "闞": "阚", "闡": "阐", "闢": "辟", "闥": "闼",
  "阪": "坂", "陘": "陉", "陝": "陕", "陣": "阵", "陰": "阴", "陳": "陈", "陸": "陆", "陽": "阳", "隉": "陧", "隊": "队", "階": "阶",
  "際": "际", "隨": "随", "險": "险", "隱": "隐", "隴": "陇", "隸": "隶", "雋": "隽", "雖": "虽", "雙": "双", "雜": "杂", "雞": "鸡",
  "離": "离", "難": "难", "雲": "云", "電": "电", "霧": "雾", "霽": "霁", "靂": "雳", "靄": "霭", "靈": "灵", "靚": "靓", "靜": "静",
  "頂": "顶", "頃": "顷", "項": "项", "順": "顺", "頇": "顸", "須": "须", "頊": "顼", "頌": "颂", "預": "预", "頑": "顽", "頒": "颁",
  "頓": "顿", "頗": "颇", "領": "领", "頡": "颉", "頤": "颐", "頦": "颏", "頭": "头", "頰": "颊", "頲": "颋", "頸": "颈", "頻": "频",
  "顆": "颗", "題": "题", "額": "额", "顎": "颚", "顏": "颜", "顓": "颛", "願": "愿", "顙": "颡", "顛": "颠", "類": "类", "顢": "颟",
  "顥": "颢", "顧": "顾", "顫": "颤", "顬": "颥", "顯": "显", "顰": "颦", "顱": "颅", "顳": "颞", "顴": "颧", "風": "风", "颱": "台",
  "颳": "刮", "颶": "飓", "颺": "扬", "飛": "飞", "饑": "饥", "飯": "饭", "飲": "饮", "飾": "饰", "飽": "饱", "餃": "饺", "餅": "饼",
  "養": "养", "餌": "饵", "餓": "饿", "餘": "余", "餡": "馅", "館": "馆", "饋": "馈", "饒": "饶", "饗": "飨", "饞": "馋", "饢": "馕",
  "馬": "马", "駁": "驳", "駐": "驻", "駕": "驾", "駛": "驶", "駝": "驼", "駟": "驷", "駢": "骈", "駭": "骇", "駱": "骆", "騎": "骑",
  "騙": "骗", "騷": "骚", "驅": "驱", "驚": "惊", "驗": "验", "驢": "驴", "驥": "骥", "髏": "髅", "髒": "脏", "體": "体", "鬆": "松",
  "鬍": "胡", "鬚": "须", "鬥": "斗", "鬧": "闹", "鬨": "哄", "鬱": "郁", "魎": "魉", "魘": "魇", "魚": "鱼", "魯": "鲁", "鮑": "鲍",
  "鮮": "鲜", "鯉": "鲤", "鯨": "鲸", "鯊": "鲨", "鱷": "鳄", "鳥": "鸟", "鳩": "鸠", "鳳": "凤", "鳴": "鸣", "鴻": "鸿", "鵬": "鹏",
  "鶴": "鹤", "鷗": "鸥", "鷹": "鹰", "鹼": "碱", "鹽": "盐", "麗": "丽", "麥": "麦", "黃": "黄", "點": "点", "黨": "党", "齊": "齐",
  "齒": "齿", "龍": "龙", "龐": "庞", "龔": "龚",
  "來": "来", "劃": "划", "勝": "胜", "夢": "梦", "宮": "宫", "嵐": "岚", "揚": "扬", "昇": "升", "榮": "荣", "歡": "欢",
  "滄": "沧", "滙": "汇", "滬": "沪", "潯": "浔", "濰": "潍", "濱": "滨", "瀾": "澜", "無": "无", "熱": "热", "營": "营",
  "瑤": "瑶", "礎": "础", "腦": "脑", "臥": "卧", "華": "华", "萊": "莱", "蓋": "盖", "蓮": "莲", "藥": "药", "蘭": "兰",
  "詰": "诘", "賾": "赜", "鈴": "铃", "鋪": "铺", "鋰": "锂", "鎖": "锁", "鐳": "镭", "馭": "驭", "騰": "腾", "鱘": "鲟",
  "鴿": "鸽", "麵": "面", "臺": "台", "証": "证"
};

const sponsorShortNameCache = new Map();

function sponsorShortName(name) {
  const raw = String(name || "").trim();
  if (!raw || raw === "待抽取") return raw;
  const cached = sponsorShortNameCache.get(raw);
  if (cached !== undefined) return cached;
  const matched = sponsorDisplayRules.find((rule) => rule.pattern.test(raw));
  const result = matched ? matched.shortName : (raw
    .replace(/\b(Hong Kong|HK|International|Capital|Securities|Corporate Finance|Company|Limited|Co\.?|Ltd\.?|AG|plc|Branch)\b/gi, " ")
    .replace(/[(),.]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .slice(0, 2)
    .join(" ") || raw);
  sponsorShortNameCache.set(raw, result);
  return result;
}

function sponsorSearchAliases(name) {
  const raw = String(name || "").trim();
  const matched = sponsorDisplayRules.find((rule) => rule.pattern.test(raw) || rule.shortName === raw);
  return matched ? [matched.shortName, ...(matched.aliases || [])] : [];
}

function sponsorDisplayEntries(record) {
  const entries = [];
  const seen = new Set();
  for (const sponsor of record.sponsors || []) {
    const shortName = sponsorShortName(sponsor);
    if (!shortName) continue;
    const key = shortName.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    entries.push({ shortName, fullName: sponsor });
  }
  return entries;
}

function sponsorLabels(record) {
  return sponsorDisplayEntries(record).map((entry) => entry.shortName);
}

function foldTraditional(value) {
  return String(value || "").replace(/[\u3400-\u9fff]/g, (char) => traditionalToSimplified[char] || char);
}

function normalizeSearchText(value) {
  return foldTraditional(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[()（）【】\[\],，.。;；:：'’"“”\-_/\\]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const HIDDEN_INTERNAL_TAGS = new Set(["已上市", "HKEX全量上市样本"]);

const tagDictionary = {
  "已上市": { en: "Listed", title: "Listed on HKEX / 已在港交所上市", cls: "listed-tag" },
  "密交": { en: "Confidential route", title: "HKEX public A1 is not a reliable duration anchor because the process appears to have started earlier, including confidential filing or prior-cycle evidence / 公开A1不适合作为时长锚点，可能存在密交或前序周期证据", cls: "info-tag" },
  "通知书待核": { en: "Notice pending", title: "Listed, but a source-backed CSRC filing notice is not yet matched / 已上市但尚未匹配到官方备案通知书", cls: "pending-listed-tag" },
  "无需备案": { en: "Filing N/A", title: "Outside CSRC overseas filing regime scope; excluded from filing duration statistics / 不属于境外上市备案范围，不计入备案时长统计", cls: "info-tag" },
  "制度前A1": { en: "Pre-regime A1", title: "All A1 cycles predate the CSRC filing regime effective date 2023-03-31 / 全部A1周期早于备案新规生效日", cls: "info-tag" },
  "A1已失效": { en: "A1 lapsed", title: "HKEX application lapsed; CSRC filing remains standing and a refiling is typical / 港交所申请已失效，备案仍然有效，通常会重新递交", cls: "inactive-tag" },
  "已撤回": { en: "Withdrawn", title: "HKEX application withdrawn / 港交所申请已撤回", cls: "inactive-tag" },
  "已拒绝": { en: "Rejected", title: "HKEX application rejected / 港交所申请被拒", cls: "inactive-tag" },
  "outlier剔除统计": { en: "Outlier excluded", title: "Excluded from headline duration statistics: no post-regime A1 cycle precedes the CSRC notice (e.g. filing completed under an earlier lapsed cycle) / 通知书早于已知的制度后A1周期，无有效统计锚点，不计入头部时长统计", cls: "outlier-tag" },
  "制度后A1锚点": { en: "Post-regime A1 anchor", title: "Earliest A1 predates the CSRC filing regime; durations are anchored to the first A1 cycle posted on/after 2023-03-31 / 最早A1早于备案新规，时长统计以制度生效后的第一次A1为锚点", cls: "info-tag" },
  "过渡期A1锚点": { en: "Transition cohort", title: "In-process application straddled the regime effective date (存量在审); the displayed filing clock starts at 2023-03-31 and the true A1 anchor is unobservable, so this record is excluded from headline duration statistics / 申请周期跨越制度生效日，展示时长自2023-03-31起算；真实A1锚点不可观测，不计入头部时长统计", cls: "outlier-tag" },
  "GEM转主板": { en: "GEM-to-Main transfer", title: "Transfer of listing from GEM to the Main Board (no prospectus or sponsor in the New Listing Report); no new offering, so no fresh CSRC filing is expected / GEM转主板，无新发行，无需重新备案", cls: "info-tag" }
};

function isStatsOutlier(record) {
  if (record.csrcFilingRequired === false) return false;
  if ((record.statusTags || []).includes("密交")) return false;
  if ((record.statusTags || []).includes("过渡期A1锚点")) return false;
  if (record.durationSampleEligible === false && record.a1Date && (record.noticeDate || record.csrcReceivedDate)) return true;
  if ((record.timelineFlags || []).includes("csrc_notice_before_received_chronology_conflict")) return true;
  return false;
}

function visibleStatusTags(record) {
  const tags = (record.statusTags || []).filter((tag) => !HIDDEN_INTERNAL_TAGS.has(tag));
  if (state.hkexStage === "all" && record.practicalStage === "listed") tags.unshift("已上市");
  if (isStatsOutlier(record)) tags.push("outlier剔除统计");
  return tags;
}

function renderStatusTags(record) {
  const tags = visibleStatusTags(record);
  if (!tags.length) return "";
  return `
    <span class="status-tag-list">
      ${tags.map((tag) => {
        const info = tagDictionary[tag] || {};
        const en = info.en ? `<small>${escapeHtml(info.en)}</small>` : "";
        return `<span class="${escapeHtml(info.cls || "")}" title="${escapeHtml(info.title || tag)}">${escapeHtml(tag)}${en}</span>`;
      }).join("")}
    </span>
  `;
}

function renderStatusBadge(record) {
  return `
    <span class="status-stack">
      <span class="badge ${escapeHtml(record.status)}"><b>${escapeHtml(statusLabel(record.status))}</b><small>${escapeHtml(statusLabel(record.status, 1))}</small></span>
      ${renderStatusTags(record)}
    </span>
  `;
}

const recordTextCache = new WeakMap();

function getRecordText(record) {
  const cached = recordTextCache.get(record);
  if (cached !== undefined) return cached;
  const sponsorAliases = (record.sponsors || []).flatMap((sponsor) => sponsorSearchAliases(sponsor));
  const rawText = [
    record.issuerName,
    record.csrcName,
    issuerTypeInfo(record).primary,
    issuerTypeInfo(record).secondary,
    record.structureType,
    record.issuerJurisdiction,
    record.aShareStatus,
    record.aShareCode,
    record.backendStageZh,
    record.currentA1Date,
    record.hkexListingDate,
    record.hkexListingStockCode,
    record.hkexProspectusDate,
    record.hkexListingCompanyName,
    record.csrcFirstReceivedDate,
    record.csrcCurrentReceivedDate,
    ...(record.statusTags || []),
    ...(record.timelineFlags || []),
    record.feedbackStatus,
    ...(record.industryTags || []),
    ...(record.csrcIndustryTags || []),
    ...(record.regulatoryTags || []),
    ...sponsorLabels(record),
    ...sponsorAliases,
    ...(record.sponsors || [])
  ]
    .join(" ");
  const text = normalizeSearchText(rawText);
  recordTextCache.set(record, text);
  return text;
}

function renderStackedDate(primary, secondaryLabel, secondary) {
  const secondaryHtml = secondary && secondary !== primary
    ? `<span class="date-secondary">${escapeHtml(secondaryLabel)} ${formatDatePlain(secondary)}</span>`
    : "";
  return `<span class="date-primary">${formatDate(primary)}</span>${secondaryHtml}`;
}

function renderA1Cell(record) {
  return renderStackedDate(record.a1Date, "当前", record.currentA1Date);
}

function renderReceivedCell(record) {
  const primary = record.csrcReceivedDate || record.csrcFirstReceivedDate;
  return renderStackedDate(primary, "当前", record.csrcCurrentReceivedDate);
}

function renderListingCell(record) {
  const secondary = record.hkexListingStockCode ? `股份代号 ${record.hkexListingStockCode}` : "";
  const secondaryHtml = secondary ? `<span class="date-secondary">${escapeHtml(secondary)}</span>` : "";
  return `<span class="date-primary">${formatDate(record.hkexListingDate)}</span>${secondaryHtml}`;
}

function syncTrackerTableMode() {
  const listed = state.hkexStage === "listed";
  const col4 = document.getElementById("dateColumn4Sort");
  const col5 = document.getElementById("dateColumn5Sort");
  if (col4) col4.dataset.sortField = listed ? "noticeDate" : "csrcReceivedDate";
  if (col5) col5.dataset.sortField = listed ? "hkexListingDate" : "noticeDate";
  const capSort = document.getElementById("marketCapSort");
  if (capSort) capSort.dataset.sortField = listed ? "listingMarketCapHkdBn" : "aShareMarketCapAtA1RmbBn";
  const setText = (id, text) => {
    const node = document.getElementById(id);
    if (node) node.textContent = text;
  };
  setText("dateColumn4Zh", listed ? "备案通过" : "接收");
  setText("dateColumn4En", listed ? "CSRC notice" : "First / current");
  setText("dateColumn5Zh", listed ? "上市日" : "通知书");
  setText("dateColumn5En", listed ? "Listing" : "Notice");
  setText("marketCapZh", listed ? "上市日市值" : "A1日市值");
  setText("marketCapEn", listed ? "Listing mkt cap" : "A-share mkt cap");
  setText("marketCapMinZh", listed ? "港股市值下限" : "A股市值下限");
  setText("marketCapMinEn", listed ? "Listing-day mkt cap min · HKD bn" : "A1-day mkt cap min · RMB bn");
  setText("marketCapMaxZh", listed ? "港股市值上限" : "A股市值上限");
  setText("marketCapMaxEn", listed ? "Listing-day mkt cap max · HKD bn" : "A1-day mkt cap max · RMB bn");
  const aShareCapOption = document.getElementById("aShareMarketCapSortOption");
  const listingCapOption = document.getElementById("listingMarketCapSortOption");
  if (aShareCapOption) aShareCapOption.hidden = listed;
  if (listingCapOption) listingCapOption.hidden = !listed;
  const criteriaNote = document.getElementById("stageCriteriaNote");
  if (criteriaNote) criteriaNote.hidden = state.hkexStage !== "other";
  const dayModeBar = document.querySelector(".day-mode-bar");
  if (dayModeBar) dayModeBar.hidden = state.hkexStage === "other";
  document.querySelector(".tracker-table")?.classList.toggle("show-listing-col", state.hkexStage === "all");
}

function getBaseFilteredRecords() {
  const query = normalizeSearchText(state.query);
  const from = asDateValue(state.dateFrom);
  const to = asDateValue(state.dateTo);
  const parseCap = (raw) => {
    if (raw === "" || raw === null || raw === undefined) return null;
    const value = Number(raw);
    return Number.isFinite(value) ? value : null;
  };
  const capMin = parseCap(state.marketCapMin);
  const capMax = parseCap(state.marketCapMax);

  return state.data.records.filter((record) => {
    if (state.status !== "all" && record.status !== state.status) return false;
    if (state.hkexStage !== "all" && hkexListingStage(record) !== state.hkexStage) return false;
    if (state.structure !== "all" && issuerTypeKey(record) !== state.structure) return false;
    if (state.industry !== "all"
        && !(record.csrcIndustryTags || []).includes(state.industry)
        && !(record.industryTags || []).includes(state.industry)) return false;
    if (
      state.sponsor !== "all" &&
      !(record.sponsors || []).includes(state.sponsor) &&
      !sponsorLabels(record).includes(state.sponsor)
    ) return false;
    if (query && !getRecordText(record).includes(query)) return false;

    if (capMin !== null || capMax !== null) {
      const listedCapMode = state.hkexStage === "listed";
      const capValue = listedCapMode ? record.listingMarketCapHkdBn : record.aShareMarketCapAtA1RmbBn;
      if (!listedCapMode && !isAhCandidate(record)) return false;
      if (typeof capValue !== "number") return false;
      if (capMin !== null && capValue < capMin) return false;
      if (capMax !== null && capValue > capMax) return false;
    }

    const rawDate = state.dateField === "csrcReceivedDate"
      ? (record.csrcReceivedDate || record.csrcFirstReceivedDate)
      : record[state.dateField];
    const recordDate = asDateValue(rawDate);
    if ((from || to) && !recordDate) return false;
    if (from && recordDate < from) return false;
    if (to && recordDate > to) return false;
    return true;
  });
}

function firstTextValue(values) {
  const list = Array.isArray(values) ? values : [values];
  return list
    .map((value) => String(value || "").trim())
    .filter((value) => value && value !== "待抽取" && value !== "Pending extraction")
    .sort((a, b) => a.localeCompare(b, "zh-Hans", { numeric: true, sensitivity: "base" }))[0] || "";
}

function dayMetricForField(field) {
  for (const [metric, pair] of Object.entries(dayFieldPairs)) {
    if (field === pair.calendar || field === pair.business) return metric;
  }
  return null;
}

function durationValueForDisplay(record, metric) {
  if (metric === "a1ToListing" && record.listingDurationSampleEligible === false) return null;
  if (metric === "a1ToNotice" && record.durationSampleEligible === false) return null;
  const key = dayMetricField(metric);
  return typeof record[key] === "number" ? record[key] : null;
}

function sortKey(record, field) {
  if (field === "status") return { value: statusSortRank[record.status] || 999, type: "number" };
  if (field === "industryTags") return { value: firstTextValue(record.industryTags || []), type: "text" };
  if (field === "sponsors") return { value: firstTextValue(sponsorLabels(record)), type: "text" };
  if (field === "structureType") return { value: issuerTypeInfo(record).rank, type: "number" };
  const durationMetric = dayMetricForField(field);
  if (durationMetric) return { value: durationValueForDisplay(record, durationMetric), type: "number" };
  if (field === "issuerName") {
    const names = nameParts(record);
    return { value: `${names.primary || ""} ${names.secondary || ""}`.trim(), type: "text" };
  }
  if (field === "aShareMarketCapAtA1RmbBn") {
    return { value: isAhCandidate(record) ? record.aShareMarketCapAtA1RmbBn : null, type: "number" };
  }
  if (field === "listingMarketCapHkdBn") {
    return { value: typeof record.listingMarketCapHkdBn === "number" ? record.listingMarketCapHkdBn : null, type: "number" };
  }
  if (field === "csrcReceivedDate") {
    return { value: asDateValue(record.csrcReceivedDate || record.csrcFirstReceivedDate), type: "number" };
  }
  if (field.endsWith("Date")) return { value: asDateValue(record[field]), type: "number" };
  return { value: record[field], type: typeof record[field] === "number" ? "number" : "text" };
}

function isMissingSortKey(key) {
  const value = key.value;
  if (value === null || value === undefined || value === "") return true;
  if (typeof value === "number") return Number.isNaN(value);
  const normalized = String(value).trim().toLowerCase();
  return ["待补", "待补充", "待披露", "pending", "n/a", "not applicable", "不适用"].includes(normalized);
}

function compareSortKeys(aKey, bKey) {
  if (aKey.type === "number" && bKey.type === "number") return aKey.value - bKey.value;
  return String(aKey.value).localeCompare(String(bKey.value), "zh-Hans", { numeric: true, sensitivity: "base" });
}

function getFilteredRecords() {
  const rows = getBaseFilteredRecords();
  const direction = state.sortDir === "asc" ? 1 : -1;
  const decorated = rows.map((record) => {
    const key = sortKey(record, state.sortField);
    return { record, key, missing: isMissingSortKey(key), name: String(record.issuerName) };
  });
  decorated.sort((a, b) => {
    if (a.missing && b.missing) return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
    if (a.missing) return 1;
    if (b.missing) return -1;
    const compared = compareSortKeys(a.key, b.key);
    if (compared !== 0) return compared * direction;
    return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
  });
  return decorated.map((item) => item.record);
}

function getUniqueOptions(getter) {
  const values = new Set();
  for (const record of state.data.records) {
    const raw = getter(record);
    const list = Array.isArray(raw) ? raw : [raw];
    for (const value of list) {
      if (value && value !== "待抽取" && value !== "Pending extraction") values.add(value);
    }
  }
  return [...values].sort((a, b) => a.localeCompare(b, "zh-Hans", { sensitivity: "base" }));
}

function populateSelect(id, options, currentValue, allLabel, stateKey) {
  const select = document.getElementById(id);
  select.innerHTML = [
    `<option value="all">${escapeHtml(allLabel)}</option>`,
    ...options.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`)
  ].join("");
  const valid = options.includes(currentValue);
  select.value = valid ? currentValue : "all";
  if (!valid && stateKey && state[stateKey] !== "all") state[stateKey] = "all";
}

function populateFilters() {
  const structureOptions = ["a_h", "h_share", "red_chip", "other"]
    .filter((key) => state.data.records.some((record) => issuerTypeKey(record) === key));
  const structureSelect = document.getElementById("structureFilter");
  if (state.structure !== "all" && !structureOptions.includes(state.structure)) state.structure = "all";
  structureSelect.innerHTML = [
    `<option value="all">全部类型</option>`,
    ...structureOptions.map((key) => {
      const info = issuerTypeInfo(key);
      return `<option value="${escapeHtml(key)}">${escapeHtml(info.primary)} · ${escapeHtml(info.secondary)}</option>`;
    })
  ].join("");
  structureSelect.value = structureOptions.includes(state.structure) ? state.structure : "all";
  populateSelect("industryFilter", getUniqueOptions((record) => record.csrcIndustryTags || []), state.industry, "全部行业", "industry");
  const sponsorOptions = getUniqueOptions((record) => sponsorLabels(record));
  if (state.sponsor !== "all" && !sponsorOptions.includes(state.sponsor)) {
    const shortName = sponsorShortName(state.sponsor);
    if (sponsorOptions.includes(shortName)) state.sponsor = shortName;
  }
  populateSelect("sponsorFilter", sponsorOptions, state.sponsor, "全部保荐人", "sponsor");
}

function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2) return sorted[middle];
  return (sorted[middle - 1] + sorted[middle]) / 2;
}

function durationValueForStats(record, metric) {
  if (metric.metric === "a1ToListing") {
    if (record.listingDurationSampleEligible === false) return null;
    const key = dayMetricField(metric.metric);
    return typeof record[key] === "number" ? record[key] : null;
  }
  if (record.csrcFilingRequired === false) return null;
  if (record.durationSampleEligible === false) return null;
  if (hasNoticeGapAfterListing(record)) return null;
  if (state.hkexStage !== "listed" && metric.metric === "a1ToReceived" && record.calendarDaysA1ToReceived > A1_RECEIVED_CURRENT_CYCLE_CAP_DAYS) {
    const currentField = dayMetricField("currentA1ToReceived");
    return typeof record[currentField] === "number" ? record[currentField] : null;
  }
  const key = dayMetricField(metric.metric);
  return typeof record[key] === "number" ? record[key] : null;
}

function statsFor(records, metric) {
  const values = records
    .map((record) => durationValueForStats(record, metric))
    .filter((value) => typeof value === "number");
  if (!values.length) {
    return { count: 0, average: null, median: null, min: null, max: null };
  }
  const total = values.reduce((sum, value) => sum + value, 0);
  return {
    count: values.length,
    average: total / values.length,
    median: median(values),
    min: Math.min(...values),
    max: Math.max(...values)
  };
}

function renderDurationMetric(metric, stats) {
  const regimeStart = state.data?.meta?.csrcRegimeEffectiveDate || "2023-03-31";
  const isListingMetric = metric.metric === "a1ToListing";
  const startLabel = isListingMetric
    ? `仅纳入上市日≥${regimeStart}且日期顺序有效样本；密交/疑似密交剔除`
    : (
      state.hkexStage === "listed"
        ? `已上市页仅纳入上市日≥${regimeStart}且日期顺序有效样本`
        : `纳入所有日期齐全且顺序有效样本 · CSRC口径≥${regimeStart}`
    );
  const metricNote = `${metric.note} · ${dayBasisNote()}`;
  const caption = stats.count
    ? `${startLabel} · ${integerFormatter.format(stats.count)} 条样本 · 平均/中位/最低/最高 · ${metricNote}`
    : `${startLabel} 暂无可统计样本 · ${metricNote}`;
  const statValue = (value) => formatDayValue(value);
  return `
    <article class="metric metric-wide duration-card">
      <div class="metric-title">
        <span class="metric-zh">${escapeHtml(metric.labelZh)}</span>
        <span class="metric-en">${escapeHtml(metric.labelEn)}</span>
      </div>
      <div class="duration-core">
        <span>平均天数</span>
        <strong>${statValue(stats.average)}</strong>
      </div>
      <div class="metric-stat-grid">
        <div><span>中位</span><strong>${statValue(stats.median)}</strong></div>
        <div><span>最低</span><strong>${statValue(stats.min)}</strong></div>
        <div><span>最高</span><strong>${statValue(stats.max)}</strong></div>
      </div>
      <div class="metric-caption">${caption}</div>
    </article>
  `;
}

function renderMetrics(records) {
  const statusCounts = records.reduce((counts, record) => {
    counts[record.status] = (counts[record.status] || 0) + 1;
    return counts;
  }, {});
  const statusHtml = ["notice_issued", "regulator_opinion", "supplement_requested", "csrc_received", "waiting_received", "not_required"]
    .map((status) => `<span>${escapeHtml(statusLabel(status))} ${formatNumber(statusCounts[status] || 0, "integer")}</span>`)
    .join("");
  const metricSet = currentMetricDefinitions();
  const titleZh = state.hkexStage === "listed" ? "已上市样本" : "筛选结果";
  const titleEn = state.hkexStage === "listed" ? "Listed issuers" : "Filtered issuers";

  const html = [
    `
      <article class="metric metric-count">
        <div class="metric-title">
          <span class="metric-zh">${titleZh}</span>
          <span class="metric-en">${titleEn}</span>
        </div>
        <div class="metric-value">${formatNumber(records.length, "integer")}</div>
        <div class="status-mini">${statusHtml}</div>
      </article>
    `,
    ...metricSet.map((metric) => renderDurationMetric(metric, statsFor(records, metric)))
  ];
  document.getElementById("metricsGrid").innerHTML = html.join("");
}

function renderDays(record) {
  const fields = {
    a1ToReceived: dayMetricField("a1ToReceived"),
    currentA1ToReceived: dayMetricField("currentA1ToReceived"),
    receivedToNotice: dayMetricField("receivedToNotice"),
    a1ToNotice: dayMetricField("a1ToNotice"),
    a1ToListing: dayMetricField("a1ToListing")
  };
  if (state.hkexStage === "listed") {
    return `
      <div class="days-cell">
        <div class="days-cell-mode">${dayUnitLabel()}</div>
        <div><span>首次A1至备案通过 A1→Notice</span><strong>${formatDayValue(durationValueForDisplay(record, "a1ToNotice"))}</strong></div>
        <div><span>首次A1至上市 A1→Listing</span><strong>${formatDayValue(durationValueForDisplay(record, "a1ToListing"))}</strong></div>
      </div>
    `;
  }
  const currentReceivedLine = typeof record[fields.currentA1ToReceived] === "number"
    ? `<div><span>当前A1至接收</span><strong>${formatDayValue(record[fields.currentA1ToReceived])}</strong></div>`
    : "";
  return `
    <div class="days-cell">
      <div class="days-cell-mode">${dayUnitLabel()}</div>
      <div><span>备案锚点（A1日）至接收</span><strong>${formatDayValue(record[fields.a1ToReceived])}</strong></div>
      ${currentReceivedLine}
      <div><span>接收至通知</span><strong>${formatDayValue(record[fields.receivedToNotice])}</strong></div>
      <div><span>备案锚点（A1日）至通知</span><strong>${formatDayValue(record[fields.a1ToNotice])}</strong></div>
    </div>
  `;
}

function renderPagination(total, pageCount, startIndex, endIndex) {
  const pagination = document.getElementById("paginationBar");
  pagination.innerHTML = `
    <div class="pagination-copy">
      <strong>${formatNumber(startIndex + 1, "integer")}–${formatNumber(endIndex, "integer")}</strong>
      <span>共 ${formatNumber(total, "integer")} 家 · 第 ${formatNumber(state.page, "integer")} / ${formatNumber(pageCount, "integer")} 页</span>
    </div>
    <div class="pagination-actions">
      <button id="prevPage" ${state.page <= 1 ? "disabled" : ""}>上一页 Prev</button>
      <button id="nextPage" ${state.page >= pageCount ? "disabled" : ""}>下一页 Next</button>
    </div>
  `;

  document.getElementById("prevPage").addEventListener("click", () => {
    state.page = Math.max(1, state.page - 1);
    syncUrl();
    renderRows();
  });
  document.getElementById("nextPage").addEventListener("click", () => {
    state.page = Math.min(pageCount, state.page + 1);
    syncUrl();
    renderRows();
  });
}

let lastModalTrigger = null;

function closeDetail() {
  const modal = document.getElementById("detailModal");
  if (!modal || !modal.classList.contains("is-open")) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastModalTrigger && document.contains(lastModalTrigger)) lastModalTrigger.focus();
  lastModalTrigger = null;
}

function openDetail(recordId) {
  const record = state.data.records.find((item) => item.id === recordId);
  if (!record) return;
  state.selectedId = recordId;
  lastModalTrigger = document.activeElement;
  renderDetail(record);
  const modal = document.getElementById("detailModal");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.getElementById("detailClose")?.focus();
  document.querySelectorAll("#trackerRows [data-record-id]").forEach((row) => {
    row.classList.toggle("is-selected", row.dataset.recordId === recordId);
  });
}

function trapModalFocus(event) {
  const modal = document.getElementById("detailModal");
  if (!modal || !modal.classList.contains("is-open") || event.key !== "Tab") return;
  const focusable = modal.querySelectorAll("button, a[href], select, input, [tabindex]:not([tabindex='-1'])");
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function selectRecord(recordId) {
  openDetail(recordId);
}

function renderRows() {
  const rows = getFilteredRecords();
  renderMetrics(rows);

  if (!rows.length) {
    const isLoadFailure = !(state.data?.records || []).length;
    const emptyMessage = isLoadFailure
      ? "数据加载失败，请点击右上角「刷新」重试 / Data failed to load — use Refresh."
      : "当前筛选无匹配发行人，可点击「清除」重置筛选 / No matching issuer — try Clear filters.";
    document.getElementById("trackerRows").innerHTML = `
      <tr>
        <td colspan="10" class="muted empty-row">${emptyMessage}</td>
      </tr>
    `;
    document.getElementById("paginationBar").innerHTML = "";
    closeDetail();
    return;
  }

  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  state.page = Math.min(Math.max(1, Number(state.page) || 1), pageCount);
  const startIndex = (state.page - 1) * PAGE_SIZE;
  const pageRows = rows.slice(startIndex, startIndex + PAGE_SIZE);
  const endIndex = startIndex + pageRows.length;

  if (!rows.some((record) => record.id === state.selectedId)) {
    state.selectedId = pageRows[0].id;
  }

  document.getElementById("trackerRows").innerHTML = pageRows
    .map((record) => {
      const selected = record.id === state.selectedId ? "is-selected" : "";
      const names = nameParts(record);
      const csrcCats = record.csrcIndustryTags || [];
      const bizTags = (record.industryTags || []).filter((tag) => !csrcCats.includes(tag));
      const industries = [
        ...csrcCats.slice(0, 2).map((tag) => `<span class="csrc-cat-tag" title="${escapeHtml(tag)}（证监会行业门类）">${escapeHtml(tag)}</span>`),
        ...bizTags.slice(0, 1).map((tag) => `<span title="${escapeHtml(tag)}">${escapeHtml(tag)}</span>`)
      ].join("");
      const sponsors = sponsorDisplayEntries(record)
        .slice(0, 4)
        .map((entry) => `<span title="${escapeHtml(entry.fullName)}">${escapeHtml(entry.shortName)}</span>`)
        .join("");
      const listedPage = state.hkexStage === "listed";
      return `
        <tr class="${selected}" data-record-id="${escapeHtml(record.id)}" tabindex="0" role="button" aria-label="查看 ${escapeHtml(names.primary)}">
          <td class="issuer-cell">
            <strong>${escapeHtml(names.primary)}</strong>
            <span>${escapeHtml(names.secondary)}</span>
          </td>
          <td class="status-cell">${renderStatusBadge(record)}</td>
          <td class="date-cell">${renderA1Cell(record)}</td>
          <td class="date-cell">${listedPage ? formatDate(record.noticeDate) : renderReceivedCell(record)}</td>
          <td class="date-cell">${listedPage ? renderListingCell(record) : formatDate(record.noticeDate)}</td>
          <td class="listing-date-cell all-only-col">${formatDate(record.hkexListingDate)}</td>
          <td class="days-td">${renderDays(record)}</td>
          <td class="type-cell">${renderIssuerType(record)}</td>
          <td class="mcap-cell">${listedPage ? formatListingMarketCap(record) : formatMarketCap(record)}</td>
          <td class="mcap-cell all-only-col">${formatListingMarketCap(record)}</td>
          <td class="industry-cell"><div class="tag-list">${industries}</div></td>
          <td><div class="tag-list">${sponsors}</div></td>
        </tr>
      `;
    })
    .join("");

  renderPagination(rows.length, pageCount, startIndex, endIndex);
}

function renderDetail(record) {
  const detail = document.getElementById("issuerDetail");
  if (!record) {
    detail.innerHTML = `<div class="muted">请选择发行人 / Select an issuer.</div>`;
    return;
  }
  const names = nameParts(record);
  const sponsorList = sponsorDisplayEntries(record)
    .map(
      (entry) => `
        <div class="sponsor-detail">
          <strong title="${escapeHtml(entry.fullName)}">${escapeHtml(entry.shortName)}</strong>
          <span>${escapeHtml(entry.fullName)}</span>
        </div>
      `
    )
    .join("");
  const industryEn = record.industryTagEn ? `<span class="pending-en">${escapeHtml(record.industryTagEn)}</span>` : "";
  const detailCats = record.csrcIndustryTags || [];
  const detailBiz = (record.industryTags || []).filter((tag) => !detailCats.includes(tag));
  const industryList = [
    ...detailCats.map((tag) => `<span class="csrc-cat-tag">${escapeHtml(tag)}</span>`),
    ...detailBiz.map((tag) => `<span>${escapeHtml(tag)}</span>`)
  ].join("") + industryEn;
  const regulatorLabels = {
    "MIIT_工信": "工信部 MIIT",
    "CAC_网信数据": "网信办 CAC",
    "NMPA_药监医疗": "药监局 NMPA",
    "NHC_卫健": "卫健委 NHC",
    "MOE_教育": "教育部 MOE",
    "PBOC_NFRA_finance": "央行/金监局 PBOC·NFRA",
    "NDRC_energy": "发改委 NDRC",
    "MNR_resources": "自然资源部 MNR",
    "MEE_environment": "生态环境部 MEE",
    "MOHURD_real_estate": "住建部 MOHURD",
    "SAMR_consumer": "市监总局 SAMR",
    "CSRC_filing_direct_overseas": "证监会 CSRC"
  };
  const regulatorList = (record.regulatoryTags || []).map((tag) => `<span>${escapeHtml(regulatorLabels[tag] || tag)}</span>`).join("");
  const sourceLinks = (record.sourceLinks || [])
    .filter((source) => /^https?:\/\//i.test(String(source.url || "")))
    .map((source) => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.label)}</a>`)
    .join("");
  const feedbackItems = (record.feedbackItems || [])
    .map((item) => {
      const text = String(item.questionText || "");
      const lead = text.slice(0, 220);
      const rest = text.slice(220);
      const body = rest
        ? `<p>${escapeHtml(lead)}…</p><details><summary>展开全文 Show full text</summary><p>${escapeHtml(text)}</p></details>`
        : `<p>${escapeHtml(text)}</p>`;
      return `
        <article class="feedback-card">
          <strong>${escapeHtml(item.publishedDate || "")} · ${escapeHtml(item.title || "补充材料")}</strong>
          ${body}
        </article>
      `;
    })
    .join("");
  const timelineFlagLabels = {
    hkex_public_first_a1_before_current_local_a1: "曾有更早A1 Earlier A1 cycle",
    csrc_received_before_timeline_anchor_possible_mismatch: "接收早于A1锚点 Received before A1 anchor",
    csrc_received_before_current_a1_after_public_first_a1: "接收属前一周期 Received in prior cycle",
    csrc_notice_before_timeline_anchor_possible_mismatch: "通知书早于公开A1 Notice before public A1",
    csrc_notice_before_current_a1_after_public_first_a1: "通知书属前一周期 Notice in prior cycle",
    csrc_notice_before_received_chronology_conflict: "通知书早于最新接收 Notice predates latest receipt",
    notice_without_status_received_match: "有通知书无接收记录 Notice without received date",
    status_without_notice_match: "已接收待通知书 Received, notice pending",
    feedback_before_timeline_anchor_possible_mismatch: "补充材料早于A1 Feedback before A1",
    pre_regime_a1_no_csrc_notice_expected: "制度前A1无需备案 Pre-regime A1, no filing",
    same_day_notice_without_status_received_match_possible_missing_anchor: "通知书与A1同日 Notice same day as A1"
  };
  const timelineFlags = (record.timelineFlags || [])
    .map((flag) => timelineFlagLabels[flag])
    .filter(Boolean)
    .slice(0, 5)
    .map((label) => `<span>${escapeHtml(label)}</span>`)
    .join("");
  const historicalAnchorLine = record.historicalTimelineAnchorDate && record.historicalTimelineAnchorDate !== record.a1Date
    ? `<div class="timeline-row"><span>历史最早A1 Earliest A1</span><strong>${formatDate(record.historicalTimelineAnchorDate)}</strong></div>`
    : "";
  const dayFields = {
    a1ToReceived: dayMetricField("a1ToReceived"),
    currentA1ToReceived: dayMetricField("currentA1ToReceived"),
    receivedToNotice: dayMetricField("receivedToNotice"),
    a1ToNotice: dayMetricField("a1ToNotice"),
    a1ToListing: dayMetricField("a1ToListing")
  };
  const dayUnit = dayUnitLabel();
  const listedPage = state.hkexStage === "listed";
  const listedTimelineRows = listedPage
    ? `
          <div class="timeline-row"><span>HKEX招股书 Prospectus</span><strong>${formatDate(record.hkexProspectusDate)}</strong></div>
          <div class="timeline-row"><span>HKEX上市日 Listing</span><strong>${formatDate(record.hkexListingDate)}</strong></div>
      `
    : "";
  const daysRows = listedPage
    ? `
          <div><span>首次A1至备案通过 A1→Notice</span><strong>${formatDayNumber(durationValueForDisplay(record, "a1ToNotice"), dayUnit)}</strong></div>
          <div><span>首次A1至上市 A1→Listing</span><strong>${formatDayNumber(durationValueForDisplay(record, "a1ToListing"), dayUnit)}</strong></div>
      `
    : `
          <div><span>备案锚点（A1日）至接收 A1→Received</span><strong>${formatDayNumber(record[dayFields.a1ToReceived], dayUnit)}</strong></div>
          <div><span>当前A1至当前接收 Current A1→Received</span><strong>${formatDayNumber(record[dayFields.currentA1ToReceived], dayUnit)}</strong></div>
          <div><span>接收至通知 Received→Notice</span><strong>${formatDayNumber(record[dayFields.receivedToNotice], dayUnit)}</strong></div>
          <div><span>备案锚点（A1日）至通知 A1→Notice</span><strong>${formatDayNumber(record[dayFields.a1ToNotice], dayUnit)}</strong></div>
      `;

  detail.innerHTML = `
    <div class="detail-header">
      <h2>${escapeHtml(names.primary)}</h2>
      <div class="muted">${escapeHtml(names.secondary)}</div>
    </div>
    <div class="detail-grid">
      <div class="detail-item">
        <span>状态 Status</span>
        <strong>${renderStatusBadge(record)}</strong>
      </div>
      <div class="detail-item">
        <span>时间线 Timeline</span>
        <div class="timeline">
          <div class="timeline-row"><span>备案A1锚点 A1 anchor</span><strong>${formatDate(record.a1Date)}</strong></div>
          ${record.statsAnchorDate && record.statsAnchorDate !== record.a1Date ? `<div class="timeline-row"><span>统计锚点（制度后首A1）Stats anchor</span><strong>${formatDate(record.statsAnchorDate)}</strong></div>` : ""}
          ${historicalAnchorLine}
          <div class="timeline-row"><span>当前A1 Current A1</span><strong>${formatDate(record.currentA1Date)}</strong></div>
          <div class="timeline-row"><span>首轮接收 First received</span><strong>${formatDate(record.csrcFirstReceivedDate || record.csrcReceivedDate)}</strong></div>
          <div class="timeline-row"><span>当前接收 Current received</span><strong>${formatDate(record.csrcCurrentReceivedDate)}</strong></div>
          <div class="timeline-row"><span>备案通知书 CSRC notice</span><strong>${formatDate(record.noticeDate)}</strong></div>
          ${listedTimelineRows}
        </div>
      </div>
      <div class="detail-item">
        <span>天数 Days · ${dayUnit}</span>
        <div class="detail-days">
          ${daysRows}
        </div>
      </div>
      <div class="detail-item">
        <span>发行人类型 Issuer type</span>
        <strong>${renderIssuerType(record)}</strong>
      </div>
      <div class="detail-item">
        <span>${listedPage ? "上市日市值 Listing-day mkt cap" : "A 股状态 / A1 日市值 A-share status / mkt cap"}</span>
        <div>${listedPage ? `<div class="market-cap-detail">${formatListingMarketCap(record)}</div>` : `${escapeHtml(record.aShareStatus)}<div class="market-cap-detail">${formatMarketCap(record)}</div>`}</div>
      </div>
      <div class="detail-item">
        <span>行业标签 Industry</span>
        <div class="tag-list">${industryList}</div>
      </div>
      <div class="detail-item">
        <span>监管语境 Regulator context</span>
        <div class="tag-list">${regulatorList || '<span>暂无标签</span>'}</div>
      </div>
      <div class="detail-item">
        <span>时间线来源 Timeline quality</span>
        <div class="tag-list">${timelineFlags || `<span>${escapeHtml(record.timelineQuality || "partial_public_dates")}</span>`}</div>
      </div>
      <div class="detail-item">
        <span>保荐人 Sponsors</span>
        <div class="sponsor-detail-list">${sponsorList || "<span>待抽取</span>"}</div>
      </div>
      <div class="detail-item">
        <span>证监会反馈 CSRC feedback</span>
        <div>${escapeHtml(record.feedbackStatus)}</div>
        ${feedbackItems ? `<div class="feedback-list">${feedbackItems}</div>` : ""}
      </div>
      <div class="detail-item">
        <span>来源 Sources</span>
        <div class="source-list">${sourceLinks || '<span class="muted">暂无公开链接 / Pending source URL</span>'}</div>
      </div>
    </div>
  `;
}

function trackerTitle() {
  const stageTitles = {
    all: "监管节奏追踪 · 全部",
    applying: "监管节奏追踪 · 上市申请中",
    listed: "监管节奏追踪 · 已上市",
    other: "监管节奏追踪 · 搁置/撤回"
  };
  return stageTitles[state.hkexStage] || "监管节奏追踪";
}

function switchView(view, updateLocation = true) {
  state.view = view;
  const stagePanel = document.getElementById("listingStagePanel");
  if (stagePanel) stagePanel.style.display = view === "tracker" ? "" : "none";
  document.getElementById("viewTitle").textContent = view === "tracker"
    ? trackerTitle()
    : (viewTitles[view] || "追瑞");
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === view);
  });
  document.querySelectorAll(".view-panel").forEach((panel) => {
    panel.classList.remove("is-visible");
  });
  document.getElementById(`${view}View`)?.classList.add("is-visible");
  if (updateLocation) syncUrl();
}

function renderChrome() {
  const meta = state.data.meta || {};
  const summary = state.data.summary || {};
  document.getElementById("sourcePill").textContent = `${meta.labelZh || meta.label || "数据快照"} · ${formatNumber(summary.trackedIssuers || state.data.records.length, "integer")} 家`;
  document.getElementById("dataMode").textContent =
    meta.sourceMode === "live_snapshot" ? "后端快照" : "限量预览";
  document.getElementById("snapshotMeta").textContent =
    meta.generatedAt
      ? `${meta.disclaimerZh || "初步自动收集，未人工复核，仅示例"} · 生成时间 ${meta.generatedAt} · ${meta.marketCapNoteZh || ""}`
      : meta.disclaimerZh || meta.marketCapNoteZh || "";
  if (state.view === "tracker") {
    document.getElementById("viewTitle").textContent = trackerTitle();
  }
  syncListingStageButtons();
  syncTrackerTableMode();
}

function emptyPayload(message) {
  return {
    meta: { labelZh: "加载失败", marketCapNoteZh: message },
    summary: {},
    records: []
  };
}

function applyStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  for (const key of trackedStateKeys) {
    if (!params.has(key)) continue;
    const value = params.get(key);
    if (key === "page") {
      state.page = Math.max(1, Number(value) || 1);
    } else if (value !== null) {
      state[key] = value;
    }
  }
}

function syncUrl() {
  const params = new URLSearchParams();
  for (const key of trackedStateKeys) {
    const value = state[key];
    if (value === defaults[key] || value === "" || value === null || value === undefined) continue;
    params.set(key, String(value));
  }
  const query = params.toString();
  const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;
  window.history.replaceState(null, "", nextUrl);
}

function syncControls() {
  const listed = state.hkexStage === "listed";
  if (listed && state.sortField === "aShareMarketCapAtA1RmbBn") state.sortField = "listingMarketCapHkdBn";
  if (!listed && state.sortField === "listingMarketCapHkdBn") state.sortField = "aShareMarketCapAtA1RmbBn";
  state.daySortField = fieldForDayMode(state.daySortField, state.dayCountMode);
  if (daySortFields.includes(state.sortField)) state.sortField = fieldForDayMode(state.sortField, state.dayCountMode);
  setDaySelectOptions();
  syncTrackerTableMode();
  document.getElementById("issuerSearch").value = state.query;
  document.getElementById("dateField").value = state.dateField;
  document.getElementById("dateFrom").value = state.dateFrom;
  document.getElementById("dateTo").value = state.dateTo;
  document.getElementById("structureFilter").value = state.structure;
  document.getElementById("industryFilter").value = state.industry;
  document.getElementById("sponsorFilter").value = state.sponsor;
  document.getElementById("marketCapMin").value = state.marketCapMin;
  document.getElementById("marketCapMax").value = state.marketCapMax;
  document.getElementById("sortField").value = daySortFields.includes(state.sortField) ? "__days__" : state.sortField;
  document.getElementById("daySortField").value = state.daySortField;
  document.querySelectorAll("[data-day-count-mode]").forEach((button) => {
    const active = button.dataset.dayCountMode === state.dayCountMode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  const dayModeHint = document.getElementById("dayModeHint");
  if (dayModeHint) dayModeHint.textContent = dayBasisNote();
  document.getElementById("sortDirection").textContent = state.sortDir === "asc" ? "升序" : "降序";
  document.getElementById("sortDirection").dataset.dir = state.sortDir;
  document.querySelectorAll(".segment").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.status === state.status);
  });
  syncListingStageButtons();
  syncSortHeaders();
}

function updateTracker(partial = {}, options = {}) {
  Object.assign(state, partial);
  if (options.resetPage !== false) state.page = 1;
  syncControls();
  syncUrl();
  renderChrome();
  renderRows();
  if (document.getElementById("detailModal")?.classList.contains("is-open")) {
    renderDetail(state.data.records.find((item) => item.id === state.selectedId));
  }
}

function defaultSortDir(field) {
  return descendingDefaultSortFields.has(field) ? "desc" : "asc";
}

function syncSortHeaders() {
  document.querySelectorAll(".th-sort").forEach((button) => {
    const field = button.dataset.sortField === "__days__" ? state.daySortField : button.dataset.sortField;
    const active = field === state.sortField;
    button.classList.toggle("is-active", active);
    const th = button.closest("th");
    if (th) th.setAttribute("aria-sort", active ? (state.sortDir === "asc" ? "ascending" : "descending") : "none");
    const indicator = button.querySelector(".sort-indicator");
    if (indicator) indicator.textContent = active ? (state.sortDir === "asc" ? "↑" : "↓") : "";
  });
}

function updateSortField(field) {
  const nextField = field === "__days__" ? state.daySortField : field;
  const nextDir = state.sortField === nextField
    ? (state.sortDir === "asc" ? "desc" : "asc")
    : defaultSortDir(nextField);
  updateTracker({ sortField: nextField, sortDir: nextDir });
}

async function loadData() {
  setLoading(true);
  try {
    const response = await fetch(DATA_URL, { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.data = await response.json();
  } catch (error) {
    state.data = emptyPayload(`无法读取 ${DATA_URL}，请检查本地 server。`);
  }
  stageCountsCache = null;
  for (const record of state.data.records || []) {
    getRecordText(record);
  }
  applyStateFromUrl();
  if (!["calendar", "business"].includes(state.dayCountMode)) state.dayCountMode = "calendar";
  if (state.sortField === "__days__") state.sortField = state.daySortField;
  state.daySortField = fieldForDayMode(state.daySortField, state.dayCountMode);
  if (daySortFields.includes(state.sortField)) {
    state.sortField = fieldForDayMode(state.sortField, state.dayCountMode);
    state.daySortField = state.sortField;
  }
  state.selectedId = state.data.records[0]?.id || null;
  populateFilters();
  syncControls();
  render();
  switchView(state.view, false);
  window.setTimeout(() => setLoading(false), 160);
}

function render() {
  renderChrome();
  renderRows();
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => updateTracker({ status: button.dataset.status }));
});

document.querySelectorAll("[data-hkex-stage]").forEach((button) => {
  button.addEventListener("click", () => updateTracker({ hkexStage: button.dataset.hkexStage }));
});

function debounce(fn, wait = 160) {
  let timer = null;
  return (...args) => {
    if (timer) window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), wait);
  };
}

document.getElementById("issuerSearch").addEventListener(
  "input",
  debounce((event) => updateTracker({ query: event.target.value }))
);

document.getElementById("dateField").addEventListener("change", (event) => {
  updateTracker({ dateField: event.target.value });
});

document.getElementById("dateFrom").addEventListener("change", (event) => {
  updateTracker({ dateFrom: event.target.value });
});

document.getElementById("dateTo").addEventListener("change", (event) => {
  updateTracker({ dateTo: event.target.value });
});

document.getElementById("structureFilter").addEventListener("change", (event) => {
  updateTracker({ structure: event.target.value });
});

document.getElementById("industryFilter").addEventListener("change", (event) => {
  updateTracker({ industry: event.target.value });
});

document.getElementById("sponsorFilter").addEventListener("change", (event) => {
  updateTracker({ sponsor: event.target.value });
});

document.getElementById("marketCapMin").addEventListener(
  "input",
  debounce((event) => updateTracker({ marketCapMin: event.target.value }))
);

document.getElementById("marketCapMax").addEventListener(
  "input",
  debounce((event) => updateTracker({ marketCapMax: event.target.value }))
);

document.getElementById("sortField").addEventListener("change", (event) => {
  const nextField = event.target.value === "__days__" ? state.daySortField : event.target.value;
  const patch = { sortField: nextField };
  if (daySortFields.includes(nextField)) patch.daySortField = nextField;
  updateTracker(patch);
});

document.getElementById("daySortField").addEventListener("change", (event) => {
  updateTracker({ daySortField: event.target.value, sortField: event.target.value });
});

document.querySelectorAll("[data-day-count-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    const nextMode = button.dataset.dayCountMode;
    const nextDaySortField = fieldForDayMode(state.daySortField, nextMode);
    const nextSortField = daySortFields.includes(state.sortField)
      ? fieldForDayMode(state.sortField, nextMode)
      : state.sortField;
    updateTracker({
      dayCountMode: nextMode,
      daySortField: nextDaySortField,
      sortField: nextSortField
    });
  });
});

document.getElementById("sortDirection").addEventListener("click", () => {
  updateTracker({ sortDir: state.sortDir === "asc" ? "desc" : "asc" });
});

document.querySelectorAll(".th-sort").forEach((button) => {
  button.addEventListener("click", () => updateSortField(button.dataset.sortField));
});

const trackerRowsBody = document.getElementById("trackerRows");
trackerRowsBody.addEventListener("click", (event) => {
  const row = event.target.closest("[data-record-id]");
  if (row) selectRecord(row.dataset.recordId);
});
trackerRowsBody.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const row = event.target.closest("[data-record-id]");
  if (!row) return;
  event.preventDefault();
  selectRecord(row.dataset.recordId);
});

document.getElementById("detailBackdrop").addEventListener("click", closeDetail);
document.getElementById("detailClose").addEventListener("click", closeDetail);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDetail();
  trapModalFocus(event);
});

document.getElementById("clearFilters").addEventListener("click", () => {
  Object.assign(state, {
    status: "all",
    hkexStage: "applying",
    query: "",
    dateField: "a1Date",
    dateFrom: "",
    dateTo: "",
    structure: "all",
    industry: "all",
    sponsor: "all",
    marketCapMin: "",
    marketCapMax: "",
    sortField: "currentA1Date",
    sortDir: "desc",
    dayCountMode: "calendar",
    daySortField: "calendarDaysA1ToReceived",
    page: 1
  });
  syncControls();
  syncUrl();
  renderRows();
});

document.getElementById("refreshButton").addEventListener("click", loadData);

loadData();
