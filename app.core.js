/**
 * Pure / testable logic extracted from app.js.
 *
 * This module re-implements every non-DOM function so that unit tests can
 * import them without needing a full browser environment.  The browser-facing
 * app.js remains unchanged – it is the source of truth at runtime.
 */

// ── constants ────────────────────────────────────────────────────────────────

export const PAGE_SIZE = 50;
export const A1_RECEIVED_CURRENT_CYCLE_CAP_DAYS = 180;

export const defaults = {
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
  page: 1,
};

export const statusLabels = {
  notice_issued: ["已发通知书", "Notice issued"],
  regulator_opinion: ["征询监管意见中", "Regulator opinion"],
  supplement_requested: ["补充材料", "Supplement requested"],
  csrc_received: ["已接收", "CSRC received"],
  waiting_received: ["等待接收", "Awaiting receipt"],
  not_required: ["无需备案", "Not required"],
  review_pending: ["待披露", "Pending"],
  pending_match: ["待披露", "Pending"],
};

export const dayFieldPairs = {
  a1ToReceived: {
    calendar: "calendarDaysA1ToReceived",
    business: "businessDaysA1ToReceived",
    label: "A1至接收",
  },
  currentA1ToReceived: {
    calendar: "calendarDaysCurrentA1ToReceived",
    business: "businessDaysCurrentA1ToReceived",
    label: "当前A1至接收",
  },
  receivedToNotice: {
    calendar: "calendarDaysReceivedToNotice",
    business: "businessDaysReceivedToNotice",
    label: "接收至通知",
  },
  a1ToNotice: {
    calendar: "calendarDaysA1ToNotice",
    business: "businessDaysA1ToNotice",
    label: "A1至通知",
  },
  a1ToListing: {
    calendar: "calendarDaysA1ToListing",
    business: "businessDaysA1ToListing",
    label: "A1至上市",
  },
};

export const daySortFields = Object.values(dayFieldPairs).flatMap((p) => [
  p.calendar,
  p.business,
]);

export const statusSortRank = {
  notice_issued: 10,
  regulator_opinion: 20,
  supplement_requested: 30,
  csrc_received: 40,
  not_required: 80,
  waiting_received: 90,
  review_pending: 100,
  pending_match: 100,
};

export const descendingDefaultSortFields = new Set([
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
  "listingMarketCapHkdBn",
]);

export const sponsorDisplayRules = [
  { pattern: /China International Capital|CICC/i, shortName: "中金", aliases: ["CICC", "中国国际金融", "China International Capital"] },
  { pattern: /CITIC Securities/i, shortName: "中信证券", aliases: ["CITIC", "中信", "CITIC Securities"] },
  { pattern: /China Securities.*International/i, shortName: "中信建投国际", aliases: ["中信建投", "CSC", "China Securities"] },
  { pattern: /Huatai/i, shortName: "华泰国际", aliases: ["华泰", "Huatai"] },
  { pattern: /Guotai Junan/i, shortName: "国泰君安", aliases: ["国泰君安国际", "GTJA", "Guotai Junan"] },
  { pattern: /CMB International/i, shortName: "招银国际", aliases: ["招银", "CMBI", "CMB International"] },
  { pattern: /Goldman/i, shortName: "高盛", aliases: ["Goldman Sachs"] },
  { pattern: /Morgan Stanley/i, shortName: "摩根士丹利", aliases: ["MS", "Morgan Stanley"] },
  { pattern: /UBS/i, shortName: "瑞银", aliases: ["UBS", "瑞銀"] },
  { pattern: /HSBC|Hongkong and Shanghai Banking/i, shortName: "汇丰", aliases: ["滙豐", "汇丰银行", "HSBC"] },
];

export const traditionalToSimplified = {
  "萬": "万", "與": "与", "專": "专", "業": "业", "東": "东", "絲": "丝",
  "豐": "丰", "臨": "临", "為": "为", "麗": "丽", "義": "义", "書": "书",
  "產": "产", "國": "国", "華": "华", "電": "电", "開": "开", "關": "关",
  "銀": "银", "鋼": "钢", "處": "处", "滙": "汇",
};

export const HIDDEN_INTERNAL_TAGS = new Set(["已上市", "HKEX全量上市样本"]);

// ── formatters ───────────────────────────────────────────────────────────────

const numberFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
const integerFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function asDateValue(value) {
  if (!value) return null;
  const time = Date.parse(`${value}T00:00:00+08:00`);
  return Number.isNaN(time) ? null : time;
}

export function formatDate(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(String(value))) return formatPending();
  return String(value);
}

export function formatDatePlain(value) {
  const html = formatDate(value);
  return html.includes("<span") ? "待披露" : html;
}

export function formatNumber(value, mode = "decimal") {
  if (value === null || value === undefined || value === "" || Number.isNaN(value))
    return "待披露";
  return mode === "integer"
    ? integerFormatter.format(value)
    : numberFormatter.format(value);
}

export function formatDayValue(value) {
  if (value === null || value === undefined || value === "" || Number.isNaN(value))
    return "待披露";
  return integerFormatter.format(Math.ceil(value));
}

export function formatDayNumber(value, unit = "自然日") {
  return typeof value === "number" ? `${formatDayValue(value)} ${unit}` : formatPending();
}

export function formatPending() {
  return '<span class="pending-zh">待披露</span><span class="pending-en">Pending</span>';
}

// ── record classification ────────────────────────────────────────────────────

export function isAhCandidate(record) {
  return (
    Boolean(record.isAH) ||
    Boolean(record.aShareCode) ||
    String(record.aShareStatus || "").includes("A-share listed")
  );
}

export function isHkexListed(record) {
  const rawStatus = String(record.hkexPublicStatus || "").trim();
  return (
    rawStatus.toLowerCase() === "listed" ||
    rawStatus === "已上市" ||
    (record.statusTags || []).includes("已上市")
  );
}

export function isPostRegimeListed(record, regimeStart = "2023-03-31") {
  if (!isHkexListed(record)) return false;
  return (
    Boolean(record.hkexListingDate) &&
    String(record.hkexListingDate) >= regimeStart
  );
}

export function hasNoticeGapAfterListing(record, regimeStart = "2023-03-31") {
  return (
    isPostRegimeListed(record, regimeStart) &&
    record.csrcFilingRequired !== false &&
    !record.noticeDate
  );
}

export function hkexListingStage(record, regimeStart = "2023-03-31") {
  if (record.practicalStage) return record.practicalStage;
  if (isPostRegimeListed(record, regimeStart)) return "listed";
  const rawStatus = String(record.hkexPublicStatus || "").trim();
  const normalized = rawStatus.toLowerCase();
  if (
    ["active", "processing"].includes(normalized) ||
    rawStatus === "處理中" ||
    rawStatus === "处理中"
  )
    return "applying";
  if (
    ["lapsed", "withdrawn", "rejected"].includes(normalized) ||
    ["失效", "撤回", "拒绝", "拒絕"].includes(rawStatus)
  )
    return "other";
  return "applying";
}

export function hkexStageLabel(stage) {
  const labels = {
    all: "全部 All",
    applying: "上市申请中 In application",
    listed: "已上市 Listed",
    other: "搁置/撤回 Stalled / withdrawn",
  };
  return labels[stage] || stage;
}

export function hkexListingStageCounts(records) {
  const counts = { all: records.length, applying: 0, listed: 0, other: 0 };
  for (const record of records) {
    const stage = hkexListingStage(record);
    counts[stage] = (counts[stage] || 0) + 1;
  }
  return counts;
}

// ── issuer type ──────────────────────────────────────────────────────────────

export function issuerTypeKey(record) {
  if (isAhCandidate(record)) return "a_h";
  const raw = `${record.structureType || ""} ${record.issuerJurisdiction || ""}`.toLowerCase();
  if (raw.includes("red-chip") || raw.includes("offshore")) return "red_chip";
  if (raw.includes("h-share") || raw.includes("prc-incorporated")) return "h_share";
  return "other";
}

export function issuerTypeInfo(recordOrKey) {
  const key =
    typeof recordOrKey === "string" ? recordOrKey : issuerTypeKey(recordOrKey);
  const labels = {
    a_h: { primary: "A+H", secondary: "A-share + H-share", rank: 1 },
    h_share: { primary: "H股", secondary: "H-share", rank: 2 },
    red_chip: { primary: "红筹", secondary: "Red-chip", rank: 3 },
    other: { primary: "其他", secondary: "Other", rank: 9 },
  };
  return labels[key] || labels.other;
}

// ── name helpers ─────────────────────────────────────────────────────────────

export function hasCjk(value) {
  return /[\u3400-\u9fff]/.test(String(value || ""));
}

export function nameParts(record) {
  if (hasCjk(record.csrcName)) {
    return { primary: record.csrcName, secondary: record.issuerName };
  }
  return { primary: record.issuerName, secondary: record.csrcName };
}

export function statusLabel(status, index = 0) {
  return (statusLabels[status] || [status, status])[index];
}

// ── day helpers ──────────────────────────────────────────────────────────────

export function dayUnitLabel(dayCountMode = "calendar") {
  return dayCountMode === "business" ? "工作日" : "自然日";
}

export function dayBasisNote(dayCountMode = "calendar") {
  return dayCountMode === "business" ? "按中国节假日调休口径" : "按自然日差值";
}

export function dayMetricEntry(field) {
  return (
    Object.values(dayFieldPairs).find(
      (item) => item.calendar === field || item.business === field
    ) || null
  );
}

export function fieldForDayMode(field, mode = "calendar") {
  const entry = dayMetricEntry(field);
  return entry ? entry[mode] : field;
}

export function dayMetricField(metric, dayCountMode = "calendar") {
  return dayFieldPairs[metric]?.[dayCountMode] || metric;
}

export function dayMetricForField(field) {
  for (const [metric, pair] of Object.entries(dayFieldPairs)) {
    if (field === pair.calendar || field === pair.business) return metric;
  }
  return null;
}

// ── sponsor helpers ──────────────────────────────────────────────────────────

export function sponsorShortName(name) {
  const raw = String(name || "").trim();
  if (!raw || raw === "待抽取") return raw;
  const matched = sponsorDisplayRules.find((rule) => rule.pattern.test(raw));
  const result =
    matched
      ? matched.shortName
      : raw
          .replace(
            /\b(Hong Kong|HK|International|Capital|Securities|Corporate Finance|Company|Limited|Co\.?|Ltd\.?|AG|plc|Branch)\b/gi,
            " "
          )
          .replace(/[(),.]/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .split(" ")
          .slice(0, 2)
          .join(" ") || raw;
  return result;
}

export function sponsorSearchAliases(name) {
  const raw = String(name || "").trim();
  const matched = sponsorDisplayRules.find(
    (rule) => rule.pattern.test(raw) || rule.shortName === raw
  );
  return matched ? [matched.shortName, ...(matched.aliases || [])] : [];
}

export function sponsorDisplayEntries(record) {
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

export function sponsorLabels(record) {
  return sponsorDisplayEntries(record).map((entry) => entry.shortName);
}

// ── text / search ────────────────────────────────────────────────────────────

export function foldTraditional(value) {
  return String(value || "").replace(
    /[\u3400-\u9fff]/g,
    (char) => traditionalToSimplified[char] || char
  );
}

export function normalizeSearchText(value) {
  return foldTraditional(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[()（）【】\[\],，.。;；:：''"""\-_/\\]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ── outlier / tag helpers ────────────────────────────────────────────────────

export function isStatsOutlier(record) {
  if (record.csrcFilingRequired === false) return false;
  if ((record.statusTags || []).includes("密交")) return false;
  if ((record.statusTags || []).includes("过渡期A1锚点")) return false;
  if (
    record.durationSampleEligible === false &&
    record.a1Date &&
    (record.noticeDate || record.csrcReceivedDate)
  )
    return true;
  if (
    (record.timelineFlags || []).includes(
      "csrc_notice_before_received_chronology_conflict"
    )
  )
    return true;
  return false;
}

export function visibleStatusTags(record, hkexStage = "applying") {
  const tags = (record.statusTags || []).filter(
    (tag) => !HIDDEN_INTERNAL_TAGS.has(tag)
  );
  if (hkexStage === "all" && record.practicalStage === "listed")
    tags.unshift("已上市");
  if (isStatsOutlier(record)) tags.push("outlier剔除统计");
  return tags;
}

// ── sorting ──────────────────────────────────────────────────────────────────

export function firstTextValue(values) {
  const list = Array.isArray(values) ? values : [values];
  return (
    list
      .map((v) => String(v || "").trim())
      .filter(
        (v) => v && v !== "待抽取" && v !== "Pending extraction"
      )
      .sort((a, b) =>
        a.localeCompare(b, "zh-Hans", { numeric: true, sensitivity: "base" })
      )[0] || ""
  );
}

export function durationValueForDisplay(record, metric, dayCountMode = "calendar") {
  if (metric === "a1ToListing" && record.listingDurationSampleEligible === false)
    return null;
  if (metric === "a1ToNotice" && record.durationSampleEligible === false)
    return null;
  const key = dayMetricField(metric, dayCountMode);
  return typeof record[key] === "number" ? record[key] : null;
}

export function sortKey(record, field, dayCountMode = "calendar") {
  if (field === "status")
    return { value: statusSortRank[record.status] || 999, type: "number" };
  if (field === "industryTags")
    return { value: firstTextValue(record.industryTags || []), type: "text" };
  if (field === "sponsors")
    return { value: firstTextValue(sponsorLabels(record)), type: "text" };
  if (field === "structureType")
    return { value: issuerTypeInfo(record).rank, type: "number" };
  const durationMetric = dayMetricForField(field);
  if (durationMetric)
    return {
      value: durationValueForDisplay(record, durationMetric, dayCountMode),
      type: "number",
    };
  if (field === "issuerName") {
    const names = nameParts(record);
    return {
      value: `${names.primary || ""} ${names.secondary || ""}`.trim(),
      type: "text",
    };
  }
  if (field === "aShareMarketCapAtA1RmbBn") {
    return {
      value: isAhCandidate(record)
        ? record.aShareMarketCapAtA1RmbBn
        : null,
      type: "number",
    };
  }
  if (field === "listingMarketCapHkdBn") {
    return {
      value:
        typeof record.listingMarketCapHkdBn === "number"
          ? record.listingMarketCapHkdBn
          : null,
      type: "number",
    };
  }
  if (field === "csrcReceivedDate") {
    return {
      value: asDateValue(
        record.csrcReceivedDate || record.csrcFirstReceivedDate
      ),
      type: "number",
    };
  }
  if (field.endsWith("Date"))
    return { value: asDateValue(record[field]), type: "number" };
  return {
    value: record[field],
    type: typeof record[field] === "number" ? "number" : "text",
  };
}

export function isMissingSortKey(key) {
  const value = key.value;
  if (value === null || value === undefined || value === "") return true;
  if (typeof value === "number") return Number.isNaN(value);
  const normalized = String(value).trim().toLowerCase();
  return [
    "待补",
    "待补充",
    "待披露",
    "pending",
    "n/a",
    "not applicable",
    "不适用",
  ].includes(normalized);
}

export function compareSortKeys(aKey, bKey) {
  if (aKey.type === "number" && bKey.type === "number")
    return aKey.value - bKey.value;
  return String(aKey.value).localeCompare(String(bKey.value), "zh-Hans", {
    numeric: true,
    sensitivity: "base",
  });
}

export function defaultSortDir(field) {
  return descendingDefaultSortFields.has(field) ? "desc" : "asc";
}

// ── statistics ───────────────────────────────────────────────────────────────

export function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2) return sorted[middle];
  return (sorted[middle - 1] + sorted[middle]) / 2;
}

export function durationValueForStats(record, metric, dayCountMode = "calendar", hkexStage = "applying") {
  if (metric.metric === "a1ToListing") {
    if (record.listingDurationSampleEligible === false) return null;
    const key = dayMetricField(metric.metric, dayCountMode);
    return typeof record[key] === "number" ? record[key] : null;
  }
  if (record.csrcFilingRequired === false) return null;
  if (record.durationSampleEligible === false) return null;
  if (hasNoticeGapAfterListing(record)) return null;
  if (
    hkexStage !== "listed" &&
    metric.metric === "a1ToReceived" &&
    record.calendarDaysA1ToReceived > A1_RECEIVED_CURRENT_CYCLE_CAP_DAYS
  ) {
    const currentField = dayMetricField("currentA1ToReceived", dayCountMode);
    return typeof record[currentField] === "number"
      ? record[currentField]
      : null;
  }
  const key = dayMetricField(metric.metric, dayCountMode);
  return typeof record[key] === "number" ? record[key] : null;
}

export function statsFor(records, metric, dayCountMode = "calendar", hkexStage = "applying") {
  const values = records
    .map((r) => durationValueForStats(r, metric, dayCountMode, hkexStage))
    .filter((v) => typeof v === "number");
  if (!values.length)
    return { count: 0, average: null, median: null, min: null, max: null };
  const total = values.reduce((sum, v) => sum + v, 0);
  return {
    count: values.length,
    average: total / values.length,
    median: median(values),
    min: Math.min(...values),
    max: Math.max(...values),
  };
}

// ── misc ─────────────────────────────────────────────────────────────────────

export function emptyPayload(message) {
  return {
    meta: { labelZh: "加载失败", marketCapNoteZh: message },
    summary: {},
    records: [],
  };
}

export function debounce(fn, wait = 160) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}
