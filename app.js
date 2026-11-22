// no-cache (not no-store) lets the browser revalidate with the CDN ETag and
// skip re-downloading the multi-MB payload when the snapshot is unchanged.
const DATA_URL = "data/csrc_tracker_public.json";
const PAGE_SIZE = 50;

const defaults = {
  selectedId: null,
  status: "all",
  hkexStage: "applying",
  query: "",
  offeringQuery: "",
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
  waiting_received: ["尚未接收", "No public receipt yet"],
  not_required: ["无需备案", "Not required"],
  applicability_pending: ["无公开备案记录", "No public filing record"],
  review_pending: ["待披露", "Pending"],
  pending_match: ["待披露", "Pending"]
};

const viewTitles = {
  tracker: "监管节奏追踪",
  offerings: "发售搁置",
  sponsorLeaderboard: "保荐龙虎榜",
  sponsorPk: "保荐人擂台",
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
    note: "按上市日在CSRC新规后且已有source-backed备案通知书样本；De-SPAC/HDR剔除"
  },
  {
    metric: "a1ToListing",
    labelZh: "首次A1至上市天数",
    labelEn: "First A1 to HKEX listing days",
    note: "按HKEX New Listing Report上市日样本；密交/疑似密交/De-SPAC/HDR剔除；无需备案发行人可纳入"
  }
];

const trackedStateKeys = [
  "view",
  "status",
  "hkexStage",
  "query",
  "offeringQuery",
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
  applicability_pending: 95,
  waiting_received: 90,
  review_pending: 100,
  pending_match: 100
};

const descendingDefaultSortFields = new Set([
  "a1Date",
  "currentA1Date",
  "hkexLatestDocumentDate",
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
  "calendarDaysCurrentA1ToNotice",
  "businessDaysCurrentA1ToNotice",
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
  return html.includes("<span") ? "—" : html;
}

function formatNumber(value, mode = "decimal") {
  if (value === null || value === undefined || value === "" || Number.isNaN(value)) return "待披露";
  return mode === "integer" ? integerFormatter.format(value) : numberFormatter.format(value);
}

function parseVisitCounterValue(value) {
  const compact = String(value ?? "").replaceAll(",", "").trim();
  if (!/^\d+$/.test(compact)) return null;
  const parsed = Number(compact);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

function visitCounterPresentation(sitePv, siteUv) {
  const pv = parseVisitCounterValue(sitePv);
  const uv = parseVisitCounterValue(siteUv);
  if (pv === null || uv === null || (pv === 0 && uv === 0)) return null;

  if (pv >= uv) {
    return {
      displayPv: formatNumber(pv, "integer"),
      displayUv: formatNumber(uv, "integer"),
      state: "exact",
      title: ""
    };
  }

  return {
    displayPv: `≥${formatNumber(uv, "integer")}`,
    displayUv: formatNumber(uv, "integer"),
    state: "lower-bound",
    title:
      "访问量历史基线异常，暂显示由访客数可证实的最低访问量。 Historical PV baseline is inconsistent; showing the defensible minimum."
  };
}

function initVisitCounter() {
  const container = document.getElementById("siteVisitCounter");
  const pvElement = document.getElementById("busuanzi_value_site_pv");
  const uvElement = document.getElementById("busuanzi_value_site_uv");
  if (!container || !pvElement || !uvElement || typeof MutationObserver === "undefined") return;

  let timeoutId = null;
  const observer = new MutationObserver(renderWhenReady);

  function renderWhenReady() {
    const presentation = visitCounterPresentation(pvElement.textContent, uvElement.textContent);
    if (!presentation) return;

    observer.disconnect();
    if (timeoutId !== null) window.clearTimeout(timeoutId);
    pvElement.textContent = presentation.displayPv;
    uvElement.textContent = presentation.displayUv;
    container.dataset.counterState = presentation.state;
    container.classList.toggle("is-lower-bound", presentation.state === "lower-bound");
    container.title = presentation.title;
    container.setAttribute(
      "aria-label",
      `自上线累计，访问量 ${presentation.displayPv}，访客 ${presentation.displayUv}`
    );
    container.style.display = "block";
  }

  observer.observe(pvElement, { childList: true, characterData: true, subtree: true });
  observer.observe(uvElement, { childList: true, characterData: true, subtree: true });
  renderWhenReady();
  timeoutId = window.setTimeout(() => observer.disconnect(), 8000);
}

function formatDayValue(value) {
  if (value === null || value === undefined || value === "" || Number.isNaN(value)) return "—";
  return integerFormatter.format(Math.ceil(value));
}

function formatDayNumber(value, unit = dayUnitLabel()) {
  return typeof value === "number" ? `${formatDayValue(value)} ${unit}` : "—";
}

function formatPending() {
  return `<span aria-label="无公开日期">—</span>`;
}

function isAhCandidate(record) {
  return Boolean(record.isAH) || Boolean(record.aShareCode) || String(record.aShareStatus || "").includes("A-share listed");
}

function isHkexListed(record) {
  const rawStatus = String(record.hkexPublicStatus || "").trim();
  return Boolean(record.hkexListingDate) || rawStatus.toLowerCase() === "listed" || rawStatus === "已上市" || (record.statusTags || []).includes("已上市");
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
    if (metric === "a1ToReceived" && stage !== "listed" && record.calendarDaysA1ToReceived > 180) {
      field = currentReceiptField;
    }
  }
  return Number.isFinite(record[field]) ? record[field] : null;
}
// END shared tracker timing

function isPostRegimeListed(record) {
  return postRegimeListingDate(record.hkexListingDate, state.data?.meta?.csrcRegimeEffectiveDate);
}

function hasNoticeGapAfterListing(record) {
  return timingNoticeGap(record, record.hkexListingDate, state.data?.meta?.csrcRegimeEffectiveDate);
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
  note: "按HKEX New Listing Report上市日样本；密交/疑似密交/De-SPAC/HDR剔除；无需备案发行人可纳入"
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
    : state.hkexStage === "all"
      ? ["a1ToReceived", "currentA1ToReceived", "receivedToNotice", "a1ToNotice", "a1ToListing"]
      : ["a1ToReceived", "currentA1ToReceived", "receivedToNotice", "a1ToNotice"];
  return metrics.map((metric) => dayFieldPairs[metric]).filter(Boolean);
}

function issuerTypeKey(record) {
  if (record.issuerTypeKey) return record.issuerTypeKey;
  if (record.specialListingRoute === "de_spac") return "de_spac";
  if (record.specialListingRoute === "hdr") return "hdr";
  if (isAhCandidate(record)) return "a_h";
  const structure = String(record.structureType || record.rawStructureType || "").trim().toLowerCase();
  if (/^de[- ]spac\b/.test(structure)) return "de_spac";
  if (/^hdr\b|^depositary receipt/.test(structure)) return "hdr";
  if (/^h[- ]share\b|^prc-incorporated\b|^h股/.test(structure)) return "h_share";
  if (/^red[- ]?chip\b|^红筹|^紅籌/.test(structure)) return "red_chip";
  return "other";
}

function issuerTypeInfo(recordOrKey) {
  const key = typeof recordOrKey === "string" ? recordOrKey : issuerTypeKey(recordOrKey);
  const labels = {
    a_h: { primary: "A+H", secondary: "A-share + H-share", rank: 1 },
    h_share: { primary: "H股", secondary: "H-share", rank: 2 },
    red_chip: { primary: "红筹", secondary: "Red-chip", rank: 3 },
    de_spac: { primary: "De-SPAC", secondary: "De-SPAC", rank: 4 },
    hdr: { primary: "HDR", secondary: "Depositary receipts", rank: 5 },
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
  if (!Number.isFinite(value) || value <= 0) return formatPending();
  const yiValue = value * 10;
  return `
    <span class="market-cap-value">${rmbYiFormatter.format(yiValue)}亿</span>
    <span class="pending-en">¥${rmbBnFormatter.format(value)}B</span>
  `;
}

function formatListingMarketCap(record) {
  const value = record.listingMarketCapHkdBn;
  if (record.listingMarketCapSampleEligible !== true) {
    return record.hkexListingDate ? "—" : "不适用";
  }
  if (!Number.isFinite(value) || value <= 0) return formatPending();
  const yiValue = value * 10;
  const estimate = record.listingMarketCapProvenance?.status === "estimate";
  return `
    <span class="market-cap-value">${estimate ? "约 " : ""}${rmbYiFormatter.format(yiValue)}亿</span>
    <span class="pending-en">${estimate ? "Est. " : ""}HK$${rmbBnFormatter.format(value)}B</span>
  `;
}

function renderValuationDetails(record, listing) {
  const data = record[listing ? "listingMarketCapProvenance" : "aShareMarketCapProvenance"];
  if (listing && !["verified","estimate"].includes(data?.status)) {
    const quote = record.hkListingSessionClose;
    if (!quote) return "";
    return `<div class="timeline-row"><span>港股收市价 / HK closing price</span><strong>HK$${escapeHtml(quote.price)} · ${escapeHtml(quote.priceDate)}</strong><a href="${escapeHtml(quote.sourceUrl)}" target="_blank" rel="noopener noreferrer">行情来源</a></div>`;
  }
  if (!data) return "";
  const policies = {
    hk_ordinary_historical_estimate: "港股收盘价计量全部普通股 / Full ordinary equity at HK close",
    ah_components_ex_treasury: "A/H分别估值，折算港币 / A/H components in HKD",
    hk_ordinary_ex_treasury: "港股收盘价计量全部普通股 / Full ordinary equity at HK close",
    hk_hdr_and_idx_ordinary_ex_treasury: "香港预托证券与印尼其余普通股分别按当地收盘价计值 / HK depositary receipts and remaining IDX shares at local closing prices",
  };
  const rows = [
    ["估值锚点 Valuation anchor", data.anchorDate],
    ...(!listing ? [["价格日期 Price date", data.priceDate], ["股本日期 Share date", data.sharesAsOf]] : []),
    ["估值口径 Basis", policies[data.policy]],
    ["币种 Currency", data.valueCurrency],
  ];
  for (const item of (data.components || [])) {
    const quantityLabel = data.status === "estimate" ? "估值采用股数 / Shares used" : item.class === "HDR" ? "香港预托证券份数 / HK depositary receipts" : `${item.class} 股数（不含库存股） / Shares ex treasury`;
    rows.push([quantityLabel, item.sharesExTreasury == null ? null : formatNumber(item.sharesExTreasury)]);
    rows.push([`${item.class} 股本日期 / Share date`, item.sharesAsOf]);
    rows.push([`${item.class} 收盘价 / Closing price`, item.price == null ? null : `${item.priceCurrency} ${item.price} · ${item.priceDate || ""}`]);
    if (item.priceStatus === "verified" && item.priceDatePolicy === "latest_exchange_session_on_or_before_valuation_date" && item.priceDate !== data.anchorDate) {
      rows.push([`${item.class} 价格口径 / Price basis`, "估值日休市，沿用最近交易日收盘价 / Market closed; most recent trading close"]);
    }
  }
  if (listing && ["ah_components_ex_treasury", "hk_hdr_and_idx_ordinary_ex_treasury"].includes(data.policy)) {
    const fx = data.fx;
    const base = data.policy === "ah_components_ex_treasury" ? "CNY" : "IDR";
    const complete = data.fxStatus === "verified" && fx?.baseCurrency === base && fx.quoteCurrency === "HKD"
      && (typeof fx.rate === "number" || (typeof fx.rate === "string" && /^\d+(?:\.\d+)?$/.test(fx.rate)))
      && Number.isFinite(Number(fx.rate)) && Number(fx.rate) > 0
      && typeof fx.date === "string" && fx.date === data.anchorDate && /^\d{4}-\d{2}-\d{2}$/.test(fx.date)
      && new Date(fx.date + "T00:00:00Z").toJSON()?.slice(0, 10) === fx.date;
    const displayRate = base === "IDR" && complete ? Number(fx.rate).toPrecision(8) : fx?.rate;
    rows.push(["当日汇率 FX", complete ? `${fx.baseCurrency}/${fx.quoteCurrency} ${displayRate} · ${fx.date}` : null]);
  }
  return `<div class="timeline">${rows.filter(([, value]) => value != null && value !== "").map(([label, value]) => `<div class="timeline-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}</div>`;
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
  return (state.data?.meta?.statusLabels?.[status] || statusLabels[status] || [status, status])[index];
}

function publicStatusKey(status) {
  return statusLabel(status) === statusLabel("applicability_pending") ? "applicability_pending" : status;
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
    if (daySortFields.includes(state.sortField)) {
      state.sortField = state.daySortField;
      state.sortDir = defaultSortDir(state.daySortField);
    }
  }
  const html = entries
    .map((entry) => `<option value="${escapeHtml(entry[state.dayCountMode])}">${escapeHtml(entry.label)}</option>`)
    .join("");
  if (select.innerHTML !== html) select.innerHTML = html;
  select.title = dayMetricForField(state.daySortField) === "a1ToListing"
    ? "A1至上市默认升序（最快优先）"
    : "选择天数排序口径";
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
  const registered = state.data?.meta?.sponsorEntities?.[raw];
  const matched = sponsorDisplayRules.find((rule) => rule.pattern.test(raw));
  const result = registered?.shortNameZh || matched?.shortName || raw;
  sponsorShortNameCache.set(raw, result);
  return result;
}

function sponsorSearchAliases(name) {
  const raw = String(name || "").trim();
  const matched = sponsorDisplayRules.find((rule) => rule.pattern.test(raw) || rule.shortName === raw);
  const registered = state.data?.meta?.sponsorEntities?.[raw];
  if (registered) return [registered.shortNameZh, registered.legalNameZh, registered.ce];
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
    entries.push({ shortName, fullName: sponsor, registered: state.data?.meta?.sponsorEntities?.[sponsor] });
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

const HIDDEN_INTERNAL_TAGS = new Set(["已上市", "HKEX全量上市样本", "未见于最新状态表"]);

const tagDictionary = {
  "已上市": { en: "Listed", title: "Listed on HKEX / 已在港交所上市", cls: "listed-tag" },
  "密交": { en: "Confidential route", title: "保密递交上市申请 / Confidential submission of a listing application", cls: "info-tag" },
  "通知书待核": { en: "Notice pending", title: "Listed, but a source-backed CSRC filing notice is not yet matched / 已上市但尚未匹配到官方备案通知书", cls: "pending-listed-tag" },
  "官方状态冲突": { en: "Official status conflict", title: "The same latest CSRC status workbook contains different statuses for this issuer; the contradiction is preserved and no ordering is inferred / 同一份最新官方备案情况表载有不同状态，页面保留矛盾且不推断先后", cls: "outlier-tag" },
  "介绍上市": { en: "Introduction", title: "Listing by introduction; excluded from ordinary IPO duration statistics / 介绍上市，不计入普通IPO周期统计", cls: "info-tag" },
  "RTO": { en: "Reverse takeover", title: "Reverse takeover; excluded from ordinary IPO duration statistics / 反向收购，不计入普通IPO周期统计", cls: "info-tag" },
  "RTO已完成": { en: "RTO completed", title: "Official completion announcement; the completion date is separate from the original IPO date / 官方公告确认交易完成；完成日与首次IPO日分别记录", cls: "info-tag" },
  "待HKEX公开": { en: "HKEX AP not public", title: "Official CSRC notice exists, but no public HKEX AP/listing row is currently matched / 已有官方备案通知书，但暂未匹配到公开HKEX AP或上市行", cls: "info-tag" },
  "无需备案": { en: "Filing N/A", title: "No filing required for this listing event; see the applicability basis / 本次上市事项无需备案，具体依据见适用性说明", cls: "info-tag" },
  "制度前A1": { en: "Pre-regime A1", title: "All A1 cycles predate the CSRC filing regime effective date 2023-03-31 / 全部A1周期早于备案新规生效日", cls: "info-tag" },
  "A1已失效": { en: "A1 lapsed", title: "HKEX application lapsed; CSRC filing remains standing and a refiling is typical / 港交所申请已失效，备案仍然有效，通常会重新递交", cls: "inactive-tag" },
  "已撤回": { en: "Withdrawn", title: "HKEX application withdrawn / 港交所申请已撤回", cls: "inactive-tag" },
  "已拒绝": { en: "Rejected", title: "HKEX application rejected / 港交所申请被拒", cls: "inactive-tag" },
  "outlier剔除统计": { en: "Outlier excluded", title: "Excluded from headline duration statistics: no post-regime A1 cycle precedes the CSRC notice (e.g. filing completed under an earlier lapsed cycle) / 通知书早于已知的制度后A1周期，无有效统计锚点，不计入头部时长统计", cls: "outlier-tag" },
  "制度后A1锚点": { en: "Post-regime A1 anchor", title: "Earliest A1 predates the CSRC filing regime; durations are anchored to the first A1 cycle posted on/after 2023-03-31 / 最早A1早于备案新规，时长统计以制度生效后的第一次A1为锚点", cls: "info-tag" },
  "过渡期内上市": { en: "Listed in transition period", title: "主板上市日在境外上市备案制度过渡期内；招股书披露见项目详情。 / See issuer details for the prospectus disclosure.", cls: "info-tag" },
  "过渡期A1锚点": { en: "Transition cohort", title: "In-process application straddled the regime effective date (存量在审); the displayed filing clock starts at 2023-03-31 and the true A1 anchor is unobservable, so this record is excluded from headline duration statistics / 申请周期跨越制度生效日，展示时长自2023-03-31起算；真实A1锚点不可观测，不计入头部时长统计", cls: "outlier-tag" },
  "前轮A1锚点": { en: "Previous-cycle A1 anchor", title: "The selected A1 falls on the CSRC notice date, so the displayed filing clock uses the latest earlier A1 in the HKEX consolidated index; a pre-regime fallback is excluded from headline statistics / 所选A1与通知书同日，展示时长改用港交所综合索引中通知日前最近一轮A1；如该日期早于备案新规则不计入头部统计", cls: "info-tag" },
  "GEM转主板": { en: "GEM-to-Main transfer", title: "Transfer from GEM to the Main Board; filing or reporting obligations depend on the transaction / GEM转主板；备案或报告义务须根据具体交易判断", cls: "info-tag" }
};

function isStatsOutlier(record) {
  if (record.specialListingRoute) return false;
  if (record.csrcFilingRequired !== true) return false;
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

function issuerDocumentSource(source) {
  if (!source) return "";
  const ap = /^https:\/\/www1\.hkexnews\.hk\/app\/(sehk|gem)\/\d{4}\/\d+\/documents\/(sehk|gem)\d+(_c)?\.pdf$/.test(source.url);
  const report = /^https:\/\/www1?\.hkexnews\.hk\/listedco\/listconews\/(sehk|gem)\/\d{4}\/\d{4}\/\d+(_c)?\.pdf$/.test(source.url);
  if (!ap && !report) return "";
  const pages = (source.pdfPages || []).filter(page => Number.isInteger(page) && page > 0);
  if (!pages.length) return "";
  const doc = {PHIP:"聆讯后资料集", AP:"申请版本", board_transfer_announcement:"转板公告", annual_results:"全年业绩公告"}[source.documentType] || "港交所文件";
  return `<a href="${escapeHtml(source.url)}#page=${pages[0]}" target="_blank" rel="noreferrer">${doc} · ${escapeHtml(source.documentDate)} · PDF 第${pages.join("、")}页</a>`;
}

function renderListingRole(record, detailed = false) {
  const role = record.listingRoleDisclosure;
  if (!role) return "";
  let label;
  if (role.kind === "sole_listing_agent" && role.legalName) {
    label = `独家上市代理 · ${role.legalName}`;
  } else if (role.kind === "chapter_9b_transfer") {
    label = "第9B章简化转板";
  } else {
    return "";
  }
  if (!detailed) return `<span>${escapeHtml(label)}</span>`;
  return `<div class="sponsor-detail"><strong>${escapeHtml(label)}</strong>${issuerDocumentSource(role.source)}</div>`;
}

function renderIssuerDisclosure(record) {
  const disclosure = record.filingScopeDisclosure;
  const incorporation = record.issuerJurisdictionEvidence;
  const filing = disclosure && record.csrcFilingApplicability === "pending"
    ? `<p>${escapeHtml(disclosure.detailZh)}<br>${escapeHtml(disclosure.detailEn)}<br>${issuerDocumentSource(disclosure.source)}</p>` : "";
  const domicile = incorporation
    ? `<p>注册地 / Incorporation · ${escapeHtml(incorporation.jurisdictionZh)} / ${escapeHtml(record.issuerJurisdiction)}<br>${issuerDocumentSource(incorporation.source)}</p>` : "";
  return filing + domicile;
}

function renderStatusBadge(record) {
  const hkexStatus = record.hkexPublicStatus || "";
  const milestones = {
    Listed: ["已上市", "Listed on HKEX"],
    Active: ["港交所申请处理中", "Active HKEX application"],
    Lapsed: ["港交所申请已失效", "HKEX application lapsed"],
    Withdrawn: ["已撤回港交所申请", "HKEX application withdrawn"],
    Rejected: ["港交所已拒绝申请", "HKEX application rejected"],
  };
  const milestone = record.status === "applicability_pending" ? milestones[hkexStatus] : null;
  const labels = milestone || [statusLabel(record.status), statusLabel(record.status, 1)];
  return `
    <span class="status-stack">
      <span class="badge ${escapeHtml(record.status)}"><b>${escapeHtml(labels[0])}</b><small>${escapeHtml(labels[1])}</small></span>
      ${renderStatusTags(record)}
    </span>
  `;
}

// Reviewed projection of overrides/public_document_facts.json. The source register
// validates the PDF bytes, issuer, signed date, stock code and operative language.
// A source citation alone never establishes the current application/offer status.
const offeringNoticeEvidence = [
  {
    "issuerId": "ganzhou hemay pharmaceutical co., ltd. - b",
    "issuerName": "Ganzhou Hemay Pharmaceutical Co., Ltd. - B",
    "applicationDate": "2026-06-08",
    "applicationId": "108622",
    "kind": "offeringPostponement",
    "stockCode": "00054",
    "date": "2026-11-04",
    "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1104/2026110400409.pdf",
    "pages": [
      2,
      3
    ],
    "research": {
      "date": "2026-10-30",
      "offerShares": 55210000,
      "newShares": 55210000,
      "saleShares": 0,
      "postShares": 452056576,
      "hongKongShares": 5521000,
      "internationalShares": 49689000,
      "priceLow": 15.5,
      "priceHigh": 18.9,
      "priceAdjustmentLow": 14.0,
      "capitalComponents": [
        [
          "未上市股份",
          142877096
        ],
        [
          "全流通转换 H 股",
          253969480
        ],
        [
          "本轮新发 H 股",
          55210000
        ]
      ],
      "denominatorPages": [
        247,
        24
      ],
      "quantityPages": [
        2,
        291
      ],
      "partyPages": [
        77,
        78
      ],
      "structurePages": [
        291,
        292
      ],
      "mechanism": "可酌情重分配至 15%",
      "sponsors": [
        {
          "name": "SDIC Securities Corporate Finance (Hong Kong) Limited",
          "shortName": "国投证券企业融资（香港）",
          "roles": []
        }
      ],
      "cmis": [
        {
          "name": "SDIC Securities (Hong Kong) Limited",
          "shortName": "国投证券（香港）",
          "roles": [
            "保荐人整体协调人（Sponsor-OC）",
            "联席全球协调人",
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": true
        },
        {
          "name": "SPDB International Capital Limited",
          "shortName": "浦银国际融资",
          "roles": [
            "整体协调人",
            "联席全球协调人",
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": true
        },
        {
          "name": "China Industrial Securities International Capital Limited",
          "shortName": "兴证国际融资",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "CMB International Capital Limited",
          "shortName": "招银国际融资",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "CCB International Capital Limited",
          "shortName": "建银国际金融",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "BOCOM International Securities Limited",
          "shortName": "交银国际证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Guosen Securities (HK) Brokerage Company, Limited",
          "shortName": "国信证券（香港）经纪",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "uSmart Securities Limited",
          "shortName": "盈立证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Patrons Securities Limited",
          "shortName": "Patrons Securities",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "ABCI Capital Limited",
          "shortName": "农银国际融资",
          "roles": [
            "联席账簿管理人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "ABCI Securities Company Limited",
          "shortName": "农银国际证券",
          "roles": [
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        }
      ],
      "cornerstoneStatus": "disclosed",
      "cornerstoneScenarios": [
        {
          "price": 18.9,
          "shares": 12041400
        },
        {
          "price": 15.5,
          "shares": 14682800
        }
      ],
      "cornerstonePages": [
        249,
        251,
        252,
        253,
        254,
        255,
        439,
        440
      ],
      "cornerstones": [
        {
          "name": "GF Fund Management Co., Ltd.",
          "shortName": "广发基金",
          "type": "中国内地公募基金管理人",
          "pdfPages": [
            251,
            252
          ],
          "capacity": "代表旗下数只基金全权认购",
          "profileUrl": "https://www.gffunds.com.cn/gywm/4/202609/t20260903_431076.shtml",
          "id": "gf-mainland",
          "commitmentCurrency": "USD",
          "commitmentAmount": 9500000,
          "feesIncluded": false
        },
        {
          "name": "GF International Investment Management Limited",
          "shortName": "广发国际（GF Fund HK）",
          "type": "香港持牌资管",
          "pdfPages": [
            252
          ],
          "capacity": "代表旗下一只基金全权认购",
          "id": "gf-hk",
          "commitmentCurrency": "USD",
          "commitmentAmount": 500000,
          "feesIncluded": false
        },
        {
          "name": "China Universal Asset Management Co., Ltd.",
          "shortName": "汇添富基金",
          "type": "中国内地公募基金管理人",
          "pdfPages": [
            252,
            253
          ],
          "capacity": "代表旗下数只基金全权认购",
          "id": "cuam-mainland",
          "commitmentCurrency": "USD",
          "commitmentAmount": 8000000,
          "feesIncluded": false
        },
        {
          "name": "China Universal Asset Management (Hong Kong) Company Limited",
          "shortName": "汇添富香港",
          "type": "香港持牌资管",
          "pdfPages": [
            253
          ],
          "capacity": "代表 CUAM China-Hong Kong Strategy Fund 全权认购",
          "id": "cuam-hk",
          "commitmentCurrency": "USD",
          "commitmentAmount": 1000000,
          "feesIncluded": false
        },
        {
          "name": "Fullgoal Fund Management Co., Ltd.",
          "shortName": "富国基金",
          "type": "中国内地公募基金管理人",
          "pdfPages": [
            253,
            254
          ],
          "capacity": "代表旗下数只公募基金全权认购",
          "id": "fullgoal-mainland",
          "commitmentCurrency": "USD",
          "commitmentAmount": 5372000,
          "feesIncluded": false
        },
        {
          "name": "Fullgoal Asset Management (HK) Limited",
          "shortName": "富国香港",
          "type": "香港持牌资管",
          "pdfPages": [
            254
          ],
          "capacity": "代表旗下一只基金全权认购",
          "id": "fullgoal-hk",
          "commitmentCurrency": "USD",
          "commitmentAmount": 1628000,
          "feesIncluded": false
        },
        {
          "name": "E Fund Management Co., Ltd.",
          "shortName": "易方达基金",
          "type": "中国内地公募基金管理人",
          "pdfPages": [
            254
          ],
          "capacity": "以代理身份代表旗下一只基金全权认购",
          "profileUrl": "https://www.efunds.com.cn/lm/jgd-sy/",
          "id": "efund",
          "commitmentCurrency": "USD",
          "commitmentAmount": 3000000,
          "feesIncluded": false
        }
      ],
      "announcementWording": "现时市况",
      "market": {
        "date": "2026-11-04",
        "hsiClose": 23919.5,
        "changePercent": 1.673,
        "turnoverHkd": 236896230172,
        "sourceLabel": "港交所日报",
        "sourceUrl": "https://www.hkex.com.hk/chi/stat/smstat/dayquot/d261104c.htm",
        "listedLast7Days": 0,
        "listingReportUrl": "https://www2.hkexnews.hk/-/media/HKEXnews/Homepage/New-Listings/New-Listing-Information/New-Listing-Report/Main/NLR2026_Eng.xlsx"
      },
      "prospectusUrl": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1030/2026103000029.pdf",
      "prospectusSha256": "e7e3594bcd41dfe41516e274dccf857adbfe06495225b87357a8738f471780a7",
      "ocSources": [
        {
          "url": "https://www1.hkexnews.hk/app/sehk/2026/108622/documents/sehk26060801741.pdf",
          "date": "2026-06-08",
          "sha256": "15efda2bb2315bd390333df71f130db2e18b56a759498a3e1065cef10fde9713",
          "publishedDate": "08/06/2026"
        }
      ],
      "cornerstoneCommitmentTotal": {
        "currency": "USD",
        "amount": 29000000,
        "label": "计划认购额",
        "basis": "原指示价 HKD 15.50–18.90"
      },
      "cornerstoneGroups": [
        {
          "id": "gf",
          "name": "广发基金",
          "memberIds": [
            "gf-mainland",
            "gf-hk"
          ],
          "tags": [
            {
              "dimension": "身份",
              "label": "中国内地公募基金管理人"
            },
            {
              "dimension": "认购",
              "label": "代旗下基金全权认购"
            },
            {
              "dimension": "特征",
              "label": "内地管理人及全资香港子公司"
            }
          ],
          "pdfPages": [
            251,
            252,
            254,
            439
          ],
          "ranking": {
            "metric": "非货公募规模",
            "currency": "RMB",
            "amountHundredMillion": 11209.42,
            "rank": 3,
            "asOf": "2026-06-30",
            "dataProvider": "Wind、公司统计",
            "sourceUrl": "https://static.cninfo.com.cn/finalpage/2026-08-29/1225532942.PDF#page=23",
            "sourceLabel": "广发证券半年报 p.23",
            "publicationDate": "2026-08-29"
          }
        },
        {
          "id": "cuam",
          "name": "汇添富基金",
          "memberIds": [
            "cuam-mainland",
            "cuam-hk"
          ],
          "tags": [
            {
              "dimension": "身份",
              "label": "中国内地公募基金管理人"
            },
            {
              "dimension": "认购",
              "label": "代旗下基金全权认购"
            },
            {
              "dimension": "特征",
              "label": "内地管理人及全资香港子公司"
            }
          ],
          "pdfPages": [
            252,
            253,
            254,
            439
          ]
        },
        {
          "id": "fullgoal",
          "name": "富国基金",
          "memberIds": [
            "fullgoal-mainland",
            "fullgoal-hk"
          ],
          "tags": [
            {
              "dimension": "身份",
              "label": "中国内地公募基金管理人"
            },
            {
              "dimension": "认购",
              "label": "代旗下基金全权认购"
            },
            {
              "dimension": "特征",
              "label": "内地公募基金及香港基金账户"
            }
          ],
          "pdfPages": [
            253,
            254,
            439
          ]
        },
        {
          "id": "efund",
          "name": "易方达基金",
          "memberIds": [
            "efund"
          ],
          "tags": [
            {
              "dimension": "身份",
              "label": "中国内地公募基金管理人"
            },
            {
              "dimension": "认购",
              "label": "以代理身份代一只基金认购"
            },
            {
              "dimension": "特征",
              "label": "QDII · 全球医疗健康投资"
            }
          ],
          "pdfPages": [
            254,
            440
          ]
        }
      ],
      "plannedMarketCap": {
        "priceHkd": 17.3,
        "method": "postSharesTimesProspectusPrice",
        "priceBasis": "招股书采用价 HKD 17.30",
        "pdfPages": [
          24,
          25
        ],
        "decimals": 2,
        "amountHkd": 7820578764.8,
        "overAllotmentExercised": false
      }
    }
  },
  {
    "issuerId": "changzhou microintelligence co., ltd",
    "issuerName": "Changzhou Microintelligence Co., Ltd",
    "applicationDate": "2026-03-31",
    "applicationId": "108374",
    "kind": "offeringPostponement",
    "stockCode": "03275",
    "date": "2026-10-25",
    "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1025/2026102500001.pdf",
    "pages": [
      1,
      2,
      3
    ],
    "research": {
      "date": "2026-10-20",
      "offerShares": 37275800,
      "newShares": 37275800,
      "saleShares": 0,
      "postShares": 372757356,
      "hongKongShares": 3727600,
      "internationalShares": 33548200,
      "priceLow": 16.63,
      "priceHigh": 21.46,
      "capitalComponents": [
        [
          "全流通转换 H 股",
          335481556
        ],
        [
          "本轮新发 H 股",
          37275800
        ]
      ],
      "denominatorPages": [
        232,
        23,
        119
      ],
      "quantityPages": [
        2,
        290
      ],
      "partyPages": [
        73,
        74,
        75
      ],
      "structurePages": [
        290,
        291,
        292
      ],
      "mechanism": "机制 B · 无强制回拨",
      "sponsors": [
        {
          "name": "Orient Capital (Hong Kong) Limited",
          "shortName": "东方融资（香港）",
          "roles": []
        }
      ],
      "cmis": [
        {
          "name": "Orient Securities (Hong Kong) Limited",
          "shortName": "东方证券（香港）",
          "roles": [
            "保荐人整体协调人（Sponsor-OC）",
            "联席全球协调人",
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": true
        },
        {
          "name": "BOCI Asia Limited",
          "shortName": "中银国际亚洲",
          "roles": [
            "整体协调人",
            "联席全球协调人",
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": true
        },
        {
          "name": "Futu Securities International (Hong Kong) Limited",
          "shortName": "富途证券国际（香港）",
          "roles": [
            "联席全球协调人",
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "China Industrial Securities International Capital Limited",
          "shortName": "兴证国际融资",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "CMBC Securities Company Limited",
          "shortName": "民银证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "First Shanghai Securities Limited",
          "shortName": "第一上海证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Huafu International Securities Limited",
          "shortName": "华福国际证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "ICBC International Securities Limited",
          "shortName": "工银国际证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Shanxi Securities International Limited",
          "shortName": "山证国际证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "SPDB International Capital Limited",
          "shortName": "浦银国际融资",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Tiger Brokers (HK) Global Limited",
          "shortName": "老虎证券（香港）环球",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Yuet Sheung International Securities Limited",
          "shortName": "粤商国际证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        }
      ],
      "cornerstoneStatus": "disclosed",
      "cornerstoneScenarios": [
        {
          "price": 21.46,
          "shares": 731300
        },
        {
          "price": 16.63,
          "shares": 943700
        }
      ],
      "cornerstonePages": [
        275,
        276,
        277,
        278,
        412
      ],
      "cornerstones": [
        {
          "name": "Elbe Rhein Investment Limited",
          "shortName": "易北莱茵投资",
          "type": "私人投资及资产管理公司",
          "pdfPages": [
            278
          ],
          "capacity": "公司直接签约认购",
          "id": "elbe",
          "commitmentCurrency": "USD",
          "commitmentAmount": 2000000,
          "feesIncluded": false,
          "formerName": "Migao Corporation Limited (米高集团有限公司)"
        }
      ],
      "announcementWording": "包括当时市况在内的多项因素",
      "market": {
        "date": "2026-10-23",
        "hsiClose": 23093.37,
        "changePercent": 0.692,
        "turnoverHkd": 249783590343,
        "sourceLabel": "港交所日报",
        "sourceUrl": "https://www.hkex.com.hk/chi/stat/smstat/dayquot/d261023c.htm",
        "listedLast7Days": 0,
        "listingReportUrl": "https://www2.hkexnews.hk/-/media/HKEXnews/Homepage/New-Listings/New-Listing-Information/New-Listing-Report/Main/NLR2026_Eng.xlsx"
      },
      "prospectusUrl": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1020/2026102000029.pdf",
      "prospectusSha256": "0b2da8fb140c1a13a630e3e99eb157feb7a8096a1434f306c6f3423690f69434",
      "ocSources": [
        {
          "url": "https://www1.hkexnews.hk/app/sehk/2026/108374/documents/sehk26033100372.pdf",
          "date": "2026-03-31",
          "sha256": "33c1a8a2df59c9ef7c8a0e30f2825320409256aa3f8c5321f8f2f5e2f224248f",
          "publishedDate": "31/03/2026"
        }
      ],
      "cornerstoneCommitmentTotal": {
        "currency": "USD",
        "amount": 2000000,
        "label": "计划认购额",
        "equivalentHkd": 15700000
      },
      "cornerstoneGroups": [
        {
          "id": "elbe",
          "name": "易北莱茵投资",
          "memberIds": [
            "elbe"
          ],
          "tags": [
            {
              "dimension": "身份",
              "label": "私人投资公司全资股东"
            },
            {
              "dimension": "认购",
              "label": "透过易北莱茵投资签约"
            },
            {
              "dimension": "特征",
              "label": "科技及智能制造投资"
            }
          ],
          "pdfPages": [
            277,
            278,
            412
          ],
          "displayName": "Jonas Liu",
          "displayRole": "全资持有人",
          "ownership": "全资持有易北莱茵投资",
          "profile": "微亿基石签约方 Elbe Rhein 的全资持有人；载体从事科技及智能制造投资"
        }
      ],
      "cornerstoneFunding": {
        "label": "认购资金（招股书列示）",
        "description": "自身资金、股东资金或所管理资产；未细分本单来源",
        "pdfPages": [
          276
        ]
      },
      "plannedMarketCap": {
        "priceHkd": 19.05,
        "method": "postSharesTimesProspectusPrice",
        "priceBasis": "中位价 HKD 19.05",
        "pdfPages": [
          23,
          275
        ],
        "decimals": 2,
        "amountHkd": 7101027631.8,
        "overAllotmentExercised": false
      }
    }
  },
  {
    "issuerId": "jiangsu slender west lake cultural tourism co. ltd",
    "issuerName": "Jiangsu Slender West Lake Cultural Tourism Co. Ltd",
    "applicationDate": "2026-03-30",
    "applicationId": "108373",
    "kind": "offeringPostponement",
    "stockCode": "06157",
    "date": "2026-10-20",
    "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1020/2026102000564.pdf",
    "pages": [
      1,
      2,
      3
    ],
    "research": {
      "date": "2026-10-14",
      "offerShares": 44760000,
      "newShares": 44760000,
      "saleShares": 0,
      "postShares": 179025816,
      "hongKongShares": 4476000,
      "internationalShares": 40284000,
      "priceLow": 3.92,
      "priceHigh": 5.07,
      "capitalComponents": [
        [
          "原内资股",
          134265816
        ],
        [
          "本轮新发 H 股",
          44760000
        ]
      ],
      "denominatorPages": [
        215,
        18,
        97
      ],
      "quantityPages": [
        2,
        288
      ],
      "partyPages": [
        62,
        63
      ],
      "structurePages": [
        288,
        289,
        290
      ],
      "mechanism": "机制 B · 无强制回拨",
      "sponsors": [
        {
          "name": "China Everbright Capital Limited",
          "shortName": "中国光大融资",
          "roles": []
        }
      ],
      "cmis": [
        {
          "name": "China Everbright Securities (HK) Limited",
          "shortName": "中国光大证券（香港）",
          "roles": [
            "独家整体协调人",
            "独家全球协调人",
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": true
        },
        {
          "name": "Bluestone Securities (HK) CO., Limited",
          "shortName": "Bluestone Securities (HK)",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Caitong International Securities Company Limited",
          "shortName": "财通国际证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "China Industrial Securities International Capital Limited",
          "shortName": "兴证国际融资",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "China Renaissance Securities (Hong Kong) Limited",
          "shortName": "华兴证券（香港）",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "CMB International Capital Limited",
          "shortName": "招银国际融资",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "CMBC Securities Company Limited",
          "shortName": "民银证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "ICBC International Securities Limited",
          "shortName": "工银国际证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "South China Securities Limited",
          "shortName": "南华证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "SPDB International Capital Limited",
          "shortName": "浦银国际融资",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Sunfund Securities Limited",
          "shortName": "Sunfund Securities",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Zheshang International Financial Holdings Co., Limited",
          "shortName": "浙商国际金融控股",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        }
      ],
      "cornerstoneStatus": "not_disclosed",
      "cornerstoneScenarios": [],
      "cornerstonePages": [
        440
      ],
      "cornerstones": [],
      "announcementWording": "包括当时市况在内的多项因素",
      "market": {
        "date": "2026-10-20",
        "hsiClose": 23867.74,
        "changePercent": -1.319,
        "turnoverHkd": 190454582738,
        "sourceLabel": "港交所日报",
        "sourceUrl": "https://www.hkex.com.hk/chi/stat/smstat/dayquot/d261020c.htm",
        "listedLast7Days": 1,
        "listingReportUrl": "https://www2.hkexnews.hk/-/media/HKEXnews/Homepage/New-Listings/New-Listing-Information/New-Listing-Report/Main/NLR2026_Eng.xlsx"
      },
      "prospectusUrl": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1014/2026101400023.pdf",
      "prospectusSha256": "cc25588930d424e1d7b221547d07aa1dd15ed7417637dcbfc861e899bf8d3131",
      "ocSources": [
        {
          "url": "https://www1.hkexnews.hk/app/sehk/2026/108373/documents/sehk26100700094.pdf",
          "date": "2026-10-07",
          "sha256": "80ab64b67e2f6106fe08366c4c19c9251b31d59931a2bbb55644d0a6d4bb6a99",
          "publishedDate": "07/10/2026"
        },
        {
          "url": "https://www1.hkexnews.hk/app/sehk/2026/108373/documents/sehk26033100112.pdf",
          "date": "2026-03-30",
          "sha256": "17288d3b48172ee9a19d49c91f22f90f78afecfd9638efc8d664874a049d5895",
          "publishedDate": "31/03/2026"
        }
      ],
      "cornerstoneGroups": [],
      "plannedMarketCap": {
        "priceHkd": 4.5,
        "method": "postSharesTimesProspectusPrice",
        "priceBasis": "中位价 HKD 4.50",
        "pdfPages": [
          18,
          97,
          215
        ],
        "decimals": 2,
        "amountHkd": 805616172.0,
        "overAllotmentExercised": false
      }
    }
  },
  {
    "issuerId": "shenzhen forms syntron information co., ltd.",
    "issuerName": "Shenzhen Forms Syntron Information Co., Ltd.",
    "applicationDate": "2026-07-05",
    "applicationId": "108727",
    "kind": "offeringPostponement",
    "stockCode": "06700",
    "date": "2026-09-17",
    "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0917/2026091701579.pdf",
    "pages": [
      1,
      2,
      3
    ],
    "research": {
      "date": "2026-09-14",
      "offerShares": 58961100,
      "newShares": 58961100,
      "saleShares": 0,
      "postShares": 589610375,
      "hongKongShares": 5896200,
      "internationalShares": 53064900,
      "priceLow": null,
      "priceHigh": 16.0,
      "capitalComponents": [
        [
          "原 A 股",
          530649275
        ],
        [
          "本轮新发 H 股",
          58961100
        ]
      ],
      "denominatorPages": [
        221,
        27,
        406
      ],
      "quantityPages": [
        2,
        288
      ],
      "partyPages": [
        85
      ],
      "structurePages": [
        288,
        289,
        290
      ],
      "mechanism": "机制 B · 无强制回拨",
      "sponsors": [
        {
          "name": "CMB International Capital Limited",
          "shortName": "招银国际融资",
          "roles": []
        },
        {
          "name": "Guosen Securities (HK) Capital Company Limited",
          "shortName": "国信证券（香港）融资",
          "roles": []
        }
      ],
      "cmis": [
        {
          "name": "CMB International Capital Limited",
          "shortName": "招银国际融资",
          "roles": [
            "保荐人整体协调人（Sponsor-OC）",
            "联席全球协调人",
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": true
        },
        {
          "name": "Guosen Securities (HK) Capital Company Limited",
          "shortName": "国信证券（香港）融资",
          "roles": [
            "保荐人整体协调人（Sponsor-OC）",
            "联席全球协调人",
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": true
        },
        {
          "name": "Victory Securities Company Limited",
          "shortName": "胜利证券",
          "roles": [
            "联席账簿管理人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Emperio Securities And Assets Management Limited",
          "shortName": "Emperio Securities and Assets Management",
          "roles": [
            "联席账簿管理人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Futu Securities International (Hong Kong) Limited",
          "shortName": "富途证券国际（香港）",
          "roles": [
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Get Nice Securities Limited",
          "shortName": "结好证券",
          "roles": [
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Harmonia Capital Limited",
          "shortName": "Harmonia Capital",
          "roles": [
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Innovax Securities Limited",
          "shortName": "建泉证券",
          "roles": [
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        }
      ],
      "cornerstoneStatus": "disclosed",
      "cornerstoneScenarios": [
        {
          "price": 16.0,
          "shares": 7431200
        }
      ],
      "cornerstonePages": [
        216,
        217,
        218,
        219,
        465
      ],
      "cornerstones": [
        {
          "name": "Mr. Cheng Chi Heng",
          "shortName": "郑志恒",
          "type": "个人投资者",
          "pdfPages": [
            218
          ],
          "id": "cheng",
          "commitmentCurrency": "HKD",
          "commitmentAmount": 40000000,
          "capacity": "个人直接认购",
          "feesIncluded": true
        },
        {
          "name": "Successful Lotus Limited",
          "shortName": "Successful Lotus",
          "type": "私人投资控股公司",
          "pdfPages": [
            218
          ],
          "capacity": "李家杰全资持有的投资控股公司",
          "id": "successful-lotus",
          "commitmentCurrency": "HKD",
          "commitmentAmount": 39600000,
          "feesIncluded": false
        },
        {
          "name": "Thalassa Capital Dynamics SPC (acting for and on behalf of Thalassa Horizon SP)",
          "shortName": "Thalassa Capital / Thalassa Horizon SP",
          "type": "股权投资载体",
          "pdfPages": [
            218,
            219
          ],
          "manager": "Seascape Synergy Group Limited",
          "id": "thalassa",
          "commitmentCurrency": "HKD",
          "commitmentAmount": 30000000,
          "capacity": "通过 Thalassa Horizon SP 认购",
          "feesIncluded": true
        },
        {
          "name": "Yeebo Alpha Limited",
          "shortName": "Yeebo Alpha",
          "type": "产业集团投资载体",
          "pdfPages": [
            219
          ],
          "capacity": "亿都（国际控股）有限公司全资投资子公司",
          "id": "yeebo-alpha",
          "commitmentCurrency": "HKD",
          "commitmentAmount": 10000000,
          "feesIncluded": false
        }
      ],
      "announcementWording": "包括当时市况在内的多项因素",
      "market": {
        "date": "2026-09-17",
        "hsiClose": 24604.29,
        "changePercent": -0.44,
        "turnoverHkd": 185586000000,
        "sourceLabel": "华富财经",
        "sourceUrl": "https://quamnet.com/post/fkXPwq8pgktJkQOyqH1mk",
        "listedLast7Days": 0,
        "listingReportUrl": "https://www2.hkexnews.hk/-/media/HKEXnews/Homepage/New-Listings/New-Listing-Information/New-Listing-Report/Main/NLR2026_Eng.xlsx"
      },
      "prospectusUrl": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0914/2026091400005.pdf",
      "prospectusSha256": "af4d588ed2bcaf260f947aa695818b30e8c332b0051f0fb01ec39eef0f145251",
      "ocSources": [
        {
          "url": "https://www1.hkexnews.hk/app/sehk/2026/108727/documents/sehk26070500184.pdf",
          "date": "2026-07-05",
          "sha256": "1c9eb68bcc8f399e3ebc354b3225af7f125fddf919bdf1e7dfb4c765f4f4abab",
          "publishedDate": "05/07/2026"
        }
      ],
      "cornerstoneCommitmentTotal": {
        "currency": "HKD",
        "amount": 119600000,
        "label": "计划认购额"
      },
      "cornerstoneGroups": [
        {
          "id": "cheng",
          "name": "郑志恒",
          "memberIds": [
            "cheng"
          ],
          "tags": [
            {
              "dimension": "身份",
              "label": "个人投资者"
            },
            {
              "dimension": "认购",
              "label": "个人直接认购"
            },
            {
              "dimension": "特征",
              "label": "周大福珠宝副主席兼执行董事"
            }
          ],
          "pdfPages": [
            217,
            218,
            465
          ],
          "displayName": "郑志恒",
          "displayRole": "直接签约",
          "profile": "周大福珠宝（01929）副主席兼执行董事（招股书当期）"
        },
        {
          "id": "successful-lotus",
          "name": "Successful Lotus",
          "memberIds": [
            "successful-lotus"
          ],
          "tags": [
            {
              "dimension": "身份",
              "label": "个人投资者"
            },
            {
              "dimension": "认购",
              "label": "透过全资投资控股公司签约"
            },
            {
              "dimension": "特征",
              "label": "恒基地产主席兼董事总经理"
            }
          ],
          "pdfPages": [
            217,
            218,
            465
          ],
          "displayName": "李家杰",
          "displayRole": "全资持有人",
          "ownership": "全资持有 Successful Lotus",
          "profile": "恒基兆业地产（00012）主席兼董事总经理，创办人李兆基之子",
          "profileSources": [
            {
              "label": "恒基 · 李家杰职务",
              "url": "https://www.hld.com/tc/about-the-group/our-leadership/dr-lee-ka-kit"
            },
            {
              "label": "恒基 · 创办人资料",
              "url": "https://www.hld.com/en/about-the-group/our-leadership/dr-lee-shau-kee?is_preload=1"
            }
          ]
        },
        {
          "id": "thalassa",
          "name": "Thalassa Capital",
          "memberIds": [
            "thalassa"
          ],
          "tags": [
            {
              "dimension": "身份",
              "label": "外部投资管理人"
            },
            {
              "dimension": "认购",
              "label": "管理 Thalassa Horizon SP 账户"
            },
            {
              "dimension": "特征",
              "label": "开曼 SPC · 独立投资组合"
            }
          ],
          "pdfPages": [
            217,
            218,
            219,
            465
          ],
          "displayName": "Seascape Synergy",
          "displayRole": "管理人",
          "profile": "Thalassa Horizon SP 的外部管理人"
        },
        {
          "id": "yeebo-alpha",
          "name": "Yeebo Alpha",
          "memberIds": [
            "yeebo-alpha"
          ],
          "tags": [
            {
              "dimension": "身份",
              "label": "香港上市产业集团"
            },
            {
              "dimension": "认购",
              "label": "透过全资投资子公司签约"
            },
            {
              "dimension": "特征",
              "label": "显示器件及 AI 算力"
            }
          ],
          "pdfPages": [
            217,
            219,
            465
          ],
          "displayName": "亿都（00259）",
          "displayRole": "母公司",
          "ownership": "全资持有 Yeebo Alpha",
          "profile": "香港上市产业集团；显示器件及 AI 算力业务"
        }
      ],
      "cornerstoneFunding": {
        "label": "认购资金（招股书列示）",
        "description": "自身资金、股东资金或受托资产；未逐名细分",
        "pdfPages": [
          216
        ]
      },
      "plannedMarketCap": {
        "priceHkd": 16.0,
        "method": "disclosedAPlusH",
        "amountHkd": 15612030000,
        "priceBasis": "A+H · H 股最高价 HKD 16.00 情景",
        "pdfPages": [
          27
        ],
        "decimals": 2,
        "aShares": 530649275,
        "aReferencePriceRmb": 23.9,
        "hShares": 58961100,
        "hShareMarketCapHkd": 943380000,
        "overAllotmentExercised": false
      }
    }
  },
  {
    "issuerId": "ekh limited",
    "issuerName": "EKH Limited",
    "applicationDate": "2026-04-01",
    "applicationId": "108390",
    "kind": "offeringNotProceeding",
    "stockCode": "02523",
    "date": "2026-07-08",
    "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0708/2026070801370.pdf",
    "pages": [
      1,
      2,
      3
    ],
    "research": {
      "date": "2026-06-30",
      "offerShares": 51600000,
      "newShares": 51600000,
      "saleShares": 0,
      "postShares": 438578285,
      "hongKongShares": 5160000,
      "internationalShares": 46440000,
      "priceLow": 2.2,
      "priceHigh": 2.68,
      "capitalComponents": [
        [
          "已发行普通股",
          285940889
        ],
        [
          "上市前可转债转换",
          80620476
        ],
        [
          "上市前股份奖励",
          20416920
        ],
        [
          "本轮新发股份",
          51600000
        ]
      ],
      "denominatorPages": [
        295,
        28,
        166
      ],
      "quantityPages": [
        2,
        370
      ],
      "partyPages": [
        93,
        94
      ],
      "structurePages": [
        370,
        371,
        372
      ],
      "mechanism": "可酌情重分配至 15%",
      "sponsors": [
        {
          "name": "Quam Capital Limited",
          "shortName": "华富建业企业融资",
          "roles": []
        },
        {
          "name": "Alliance Capital Partners Limited",
          "shortName": "同人融资",
          "roles": []
        }
      ],
      "cmis": [
        {
          "name": "Quam Securities Limited",
          "shortName": "华富建业证券",
          "roles": [
            "保荐人整体协调人（Sponsor-OC）",
            "独家全球协调人",
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": true
        },
        {
          "name": "CEB International Capital Corporation Limited",
          "shortName": "光银国际资本",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "CMB International Capital Limited",
          "shortName": "招银国际融资",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Eddid Securities and Futures Limited",
          "shortName": "艾德证券期货",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Grand China Securities Limited",
          "shortName": "大中华证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "Orient Securities (Hong Kong) Limited",
          "shortName": "东方证券（香港）",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "SBI E2-Capital Securities Limited",
          "shortName": "SBI E2-Capital Securities",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "SPDB International Capital Limited",
          "shortName": "浦银国际融资",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        },
        {
          "name": "uSmart Securities Limited",
          "shortName": "盈立证券",
          "roles": [
            "联席账簿管理人",
            "联席牵头经办人"
          ],
          "overallCoordinator": false
        }
      ],
      "cornerstoneStatus": "not_disclosed",
      "cornerstoneScenarios": [],
      "cornerstonePages": [
        586,
        587
      ],
      "cornerstones": [],
      "publicSubscription": "香港公开发售获超额认购",
      "market": {
        "date": "2026-07-08",
        "hsiClose": 24199.46,
        "changePercent": 2.99,
        "turnoverHkd": 375835000000,
        "sourceLabel": "新华社",
        "sourceUrl": "https://www.xinhuanet.com/20260708/2afddbbd1ea040eba7ecf7e6a798da86/c.html",
        "listedLast7Days": 6,
        "listingReportUrl": "https://www2.hkexnews.hk/-/media/HKEXnews/Homepage/New-Listings/New-Listing-Information/New-Listing-Report/Main/NLR2026_Eng.xlsx"
      },
      "prospectusUrl": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063000027.pdf",
      "prospectusSha256": "10cff38ca9c60fdabfe841e03ecea2a05ede66206f94732961ec6709b63017bb",
      "ocSources": [
        {
          "url": "https://www1.hkexnews.hk/app/sehk/2026/108390/documents/sehk26040100606.pdf",
          "date": "2026-03-31",
          "sha256": "96382b718db76c824879ed6b0ce4422167107131f0c487b854d211711a262c1c",
          "publishedDate": "01/04/2026"
        }
      ],
      "cornerstoneGroups": [],
      "plannedMarketCap": {
        "priceHkd": 2.44,
        "method": "disclosedTotal",
        "amountHkd": 1070100000,
        "priceBasis": "中位价 HKD 2.44",
        "pdfPages": [
          166
        ],
        "decimals": 1,
        "overAllotmentExercised": false
      }
    }
  }
];

function currentOfferingNotice(record) {
  if (record.hkexListingDate || record.practicalStage === "listed" ||
      /^(listed|withdrawn|rejected|returned)$/i.test(record.hkexPublicStatus || "") ||
      /^(listed|withdrawn|rejected|returned)$/.test(record.hkexApplicationStatusGroup || "")) return null;
  const notice = offeringNoticeEvidence.find(item => item.issuerId === record.id && item.issuerName === record.issuerName);
  if (!notice || record.currentA1Date !== notice.applicationDate || notice.applicationDate > notice.date) return null;
  const applications = record.hkexPublishedApplications || [];
  const documents = applications.flatMap(item => item.documents || []);
  if (!applications.some(item => item.applicationId === notice.applicationId &&
      (item.documents || []).some(doc => /Application Proof/i.test(doc.label || "") && doc.date === notice.applicationDate))) return null;
  if (record.hkexProspectusDate > notice.date || documents.some(doc =>
      (/Application Proof/i.test(doc.label || "") && doc.date > notice.applicationDate) ||
      (/PHIP|Prospectus|Allotment|招股|配发|配發|重启|重啟|Relaunch|Resumption/i.test(doc.label || "") && doc.date > notice.date))) return null;
  const links = record.sourceLinks || [];
  const expectedLabel = notice.kind === "offeringNotProceeding"
    ? "本次发售及上市未进行 / This offering and listing did not proceed"
    : "延迟发售及上市 / Offering and listing postponed";
  if (!links.some(link => link.url === `${notice.url}#page=${notice.pages[0]}` &&
      (link.originalLabel || link.label) === `${notice.date} ${expectedLabel}`)) return null;
  // A later dated offering/allotment announcement supersedes this notice even
  // before the listing feed has caught up. Undated or unrelated links do not.
  if (links.some(link => {
    const url = String(link.url || "").split("#")[0];
    const match = url.match(/^https:\/\/www1?\.hkexnews\.hk\/listedco\/listconews\/sehk\/(\d{4})\/(\d{2})(\d{2})\/\d+\.pdf$/);
    return match && `${match[1]}-${match[2]}-${match[3]}` > notice.date &&
      /Prospectus|Allotment|招股|配发|配發|重启|重啟|Relaunch|Resumption|withdraw|撤回/i.test(link.originalLabel || link.label || "");
  })) return null;
  return notice;
}

function offeringNoticeLabels(notice) {
  return notice.kind === "offeringNotProceeding"
    ? ["本轮发售不进行", "This offering not proceeding", "本轮发售不进行"]
    : ["发售及上市延期", "Offering and listing postponed", "发售搁置"];
}

function offeringSearchText(record) {
  const notice = currentOfferingNotice(record);
  if (!notice) return "";
  const facts = notice.research || {};
  const institutions = [...(facts.sponsors || []), ...(facts.cmis || []), ...(facts.cornerstones || [])];
  return ["发售搁置 暂停 paused", ...offeringNoticeLabels(notice), notice.date, notice.stockCode,
    ...institutions.flatMap(item => [item.name, item.shortName, item.type, item.manager, item.capacity, item.formerName, ...(item.roles || [])]),
    ...(facts.cornerstoneGroups || []).flatMap(group => [group.name, group.displayName, group.displayRole, group.ownership, group.profile, ...group.tags.map(tag => tag.label), group.ranking?.metric, group.ranking?.asOf])].filter(Boolean).join(" ");
}

function renderOfferingBadge(record) {
  const notice = currentOfferingNotice(record);
  if (!notice) return "";
  const labels = offeringNoticeLabels(notice);
  return `<button type="button" class="offering-badge" data-offering-id="${escapeHtml(record.id)}" title="${escapeHtml(labels[1])} · ${notice.date}">${labels[2]} ↗</button>`;
}


function offeringNumber(value, decimals = 0) {
  return Number(value).toLocaleString("en-US", {minimumFractionDigits: decimals, maximumFractionDigits: decimals});
}

function offeringPrice(facts) {
  const high = offeringNumber(facts.priceHigh, 2);
  return facts.priceLow === null ? `最高 HKD ${high}` : `HKD ${offeringNumber(facts.priceLow, 2)}–${high}`;
}

function offeringGross(facts) {
  const high = offeringNumber(facts.offerShares * facts.priceHigh / 1000000, 2);
  return facts.priceLow === null ? `最高 HKD ${high} 百万` : `HKD ${offeringNumber(facts.offerShares * facts.priceLow / 1000000, 2)}–${high} 百万`;
}

function offeringCornerstoneRatio(facts) {
  const scenarios = facts.cornerstoneScenarios || [];
  if (!scenarios.length) return "";
  const rates = scenarios.map(item => item.shares / facts.offerShares * 100).sort((a,b) => a-b);
  return rates.length > 1
    ? `${offeringNumber(rates[0], 2)}%–${offeringNumber(rates.at(-1), 2)}%（指示价区间）`
    : `${offeringNumber(rates[0], 2)}%（按 HKD ${offeringNumber(scenarios[0].price, 2)}、股数计算）`;
}

function renderOfferingOrganizations(items, withRoles = false) {
  return `<ul class="offering-organizations">${items.map(item => `<li><span class="offering-org-name">${escapeHtml(item.shortName)}</span><span class="offering-legal-name">${escapeHtml(item.name)}</span>${withRoles ? `<span class="offering-org-role">${escapeHtml(item.roles.join(" / "))}</span>` : ""}</li>`).join("")}</ul>`;
}

function offeringCornerstoneGroups(facts) {
  const byId = new Map((facts.cornerstones || []).map(item => [item.id, item]));
  const seen = new Set();
  return (facts.cornerstoneGroups || []).map(group => {
    const members = group.memberIds.map(id => byId.get(id)).filter(item => {
      if (!item) return false;
      const key = item.name.trim().toLowerCase().replace(/\s+/g, " ");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return {...group, members, amount: members.reduce((sum, item) => sum + item.commitmentAmount, 0)};
  }).filter(group => group.members.length);
}

function renderOfferingCornerstones(facts) {
  const groups = offeringCornerstoneGroups(facts);
  const heading = '<h3>基石投资者 <span>Cornerstone investors</span></h3>';
  if (!groups.length) return `${heading}<p class="offering-undisclosed">招股书未披露基石名单</p>`;
  const total = facts.cornerstoneCommitmentTotal;
  const amount = (currency, value) => `${escapeHtml(currency)} ${offeringNumber(value)}`;
  const signatories = groups.reduce((sum, group) => sum + group.members.length, 0);
  const totalAmount = groups.reduce((sum, group) => sum + group.amount, 0);
  return `${heading}<div class="offering-cornerstone-summary"><span>${groups.length} 组</span><span>${signatories} 名法律签约方</span><strong>${escapeHtml(total.label)} ${amount(total.currency, totalAmount)}</strong>${total.basis ? `<span>${escapeHtml(total.basis)}</span>` : ""}${total.equivalentHkd ? `<span>约 HKD ${offeringNumber(total.equivalentHkd)}</span>` : ""}</div>
    ${facts.cornerstoneFunding ? `<p class="offering-cornerstone-detail">${escapeHtml(facts.cornerstoneFunding.label)}：${escapeHtml(facts.cornerstoneFunding.description)}</p>` : ""}
    <ul class="offering-cornerstone-groups">${groups.map(group => {
      const one = group.members.length === 1 ? group.members[0] : null;
      const rank = group.ranking;
      return `<li data-cornerstone-group="${escapeHtml(group.id)}"><div class="offering-cornerstone-name"><strong>${escapeHtml(group.displayName || group.name)}${group.displayRole ? ` · ${escapeHtml(group.displayRole)}` : ""}</strong><span>${amount(group.members[0].commitmentCurrency, group.amount)}${one?.feesIncluded ? ' <span class="offering-fee-basis">含费用</span>' : ""}</span></div>
        ${group.profile ? `<p class="offering-cornerstone-profile">${escapeHtml(group.profile)}</p>` : ""}
        ${one ? `<p class="offering-cornerstone-legal" data-cornerstone-signatory="${escapeHtml(one.id)}">拟认购签约方：${escapeHtml(one.name)}</p>` : ""}
        <ul class="offering-cornerstone-tags">${group.tags.filter(tag => !group.profile || tag.dimension !== "特征").map(tag => `<li><span>${escapeHtml(tag.dimension)}</span>${escapeHtml(tag.label)}</li>`).join("")}</ul>
        ${group.ownership ? `<p class="offering-cornerstone-detail">持有：${escapeHtml(group.ownership)}</p>` : ""}
        ${one?.manager ? `<p class="offering-cornerstone-detail">管理人：${escapeHtml(one.manager)}</p>` : ""}
        ${rank ? `<p class="offering-cornerstone-rank">${escapeHtml(rank.metric)} ${escapeHtml(rank.currency)} ${offeringNumber(rank.amountHundredMillion, 2)} 亿元 · 行业第 ${rank.rank}<span>${escapeHtml(rank.asOf)} · ${escapeHtml(rank.dataProvider)}</span></p>` : ""}
        ${group.members.length > 1 ? `<details class="offering-disclosure"><summary>法律签约方与原额 · ${group.members.length} 名</summary><ul class="offering-cornerstone-members">${group.members.map(item => `<li data-cornerstone-signatory="${escapeHtml(item.id)}"><div><strong>${escapeHtml(item.name)}</strong><span>${amount(item.commitmentCurrency, item.commitmentAmount)}</span></div><p>${escapeHtml(item.type)} · ${escapeHtml(item.capacity)}</p></li>`).join("")}</ul></details>` : ""}
      </li>`;
    }).join("")}</ul>`;
}

function renderOfferingResearch(facts, notice) {
  const n = offeringNumber, market = facts.market;
  const row = (label, value) => `<div><dt>${label}</dt><dd>${value}</dd></div>`;
  const cornerstones = facts.cornerstones || [];
  const ocs = facts.cmis.filter(item => item.overallCoordinator), others = facts.cmis.filter(item => !item.overallCoordinator);
  const marketDate = market.date === notice.date ? market.date : `${market.date}（前一交易日）`;
  return `<dl class="offering-metrics">
      ${row("计划发售股份 / Offer shares", `${n(facts.offerShares)} 股`)}
      ${row("招股价 / Offer price", offeringPrice(facts))}
      ${row("计划发售总额 / Gross offer", offeringGross(facts))}
      ${row("发售比例 / Offer ÷ post-offer shares", `${n(facts.offerShares / facts.postShares * 100, 2)}%`)}
    </dl>
    <div class="offering-research-columns">
      <section><h3>发售结构 <span>Offer structure</span></h3><dl class="offering-facts">
        ${facts.plannedMarketCap ? row("计划上市市值（绿鞋前）", `HKD ${n(facts.plannedMarketCap.amountHkd / 1000000, facts.plannedMarketCap.decimals)} 百万 · ${escapeHtml(facts.plannedMarketCap.priceBasis)}`) : ""}
        ${row("发售后总股本", `${n(facts.postShares)} 股`)}
        ${row("香港公开发售（初始）", `${n(facts.hongKongShares)} 股 · ${n(facts.hongKongShares / facts.offerShares * 100, 2)}%`)}
        ${row("发售股份性质", facts.saleShares ? `新股 ${n(facts.newShares)} 股；旧股 ${n(facts.saleShares)} 股` : "全部新股")}
        ${row("分配机制", escapeHtml(facts.mechanism))}
        ${facts.priceAdjustmentLow ? row("最低可调招股价", `HKD ${n(facts.priceAdjustmentLow, 2)}`) : ""}
        ${cornerstones.length ? row("基石占发售股份", offeringCornerstoneRatio(facts)) : ""}
      </dl><details class="offering-disclosure"><summary>股本构成</summary><dl class="offering-facts">${facts.capitalComponents.map(([label, shares]) => row(escapeHtml(label), `${n(shares)} 股`)).join("")}</dl></details></section>
      <section><h3>公告日市场 <span>Market close</span></h3><dl class="offering-facts">
        ${row("收市日期", marketDate)}
        ${row("恒生指数", `${n(market.hsiClose, 2)} · ${market.changePercent > 0 ? "+" : ""}${n(market.changePercent, 2)}%`)}
        ${row("主板成交额", `HKD ${n(market.turnoverHkd / 100000000, 2)} 亿`)}
        ${row("此前 7 日主板挂牌（含公告日）", `${market.listedLast7Days} 宗`)}
        ${facts.publicSubscription ? row("公开认购", escapeHtml(facts.publicSubscription)) : ""}
      </dl></section>
    </div>
    <div class="offering-research-columns offering-parties">
      <section><h3>保荐人 <span>Sponsors</span></h3>${renderOfferingOrganizations(facts.sponsors)}
        <h3>整体协调人 <span>OC · ${ocs.length} 家</span></h3>${renderOfferingOrganizations(ocs)}
        <details class="offering-disclosure"><summary>CMI 名单与角色（${facts.cmis.length} 家，含 OC）</summary>${renderOfferingOrganizations(facts.cmis, true)}</details>
      </section>
      <section class="offering-cornerstones">${renderOfferingCornerstones(facts)}</section>
    </div>`;
}

function renderOfferingSources(facts, notice) {
  const link = (url,label) => `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
  const pdf = (label,pages) => `<div><b>${label}</b>${pages.map(page => link(`${facts.prospectusUrl}#page=${page}`, `p.${page}`)).join(" ")}</div>`;
  return `<details class="offering-sources"><summary>原件与页码 <span>Sources · PDF pages</span></summary><div class="offering-source-list">
    <div><b>发售公告 ${notice.date}</b>${notice.pages.map(page => link(`${notice.url}#page=${page}`,`p.${page}`)).join(" ")}</div>
    ${pdf(`招股书 ${facts.date} · 条款`,[2])}${pdf("股本",facts.denominatorPages)}${facts.plannedMarketCap ? pdf("计划上市市值",facts.plannedMarketCap.pdfPages) : ""}${pdf("发售结构",facts.structurePages)}${pdf("保荐人 / CMI",facts.partyPages)}${pdf("基石",facts.cornerstonePages)}
    <div><b>OC 公告</b>${facts.ocSources.map(source => link(`${source.url}#page=3`,`${source.date} p.3`)).join(" ")}</div>
    <div><b>市场</b>${link(facts.market.sourceUrl,facts.market.sourceLabel)} ${link(facts.market.listingReportUrl,"港交所上市报告")}</div>
    ${(facts.cornerstones || []).filter(item => item.profileUrl).map(item => `<div><b>机构介绍</b>${link(item.profileUrl,item.shortName)}</div>`).join("")}
    ${(facts.cornerstoneGroups || []).filter(group => group.ranking).map(group => `<div><b>规模及排名</b>${link(group.ranking.sourceUrl,group.ranking.sourceLabel)}</div>`).join("")}
    ${(facts.cornerstoneGroups || []).flatMap(group => group.profileSources || []).map(source => `<div><b>人物身份</b>${link(source.url,source.label)}</div>`).join("")}
  </div></details>`;
}

function renderOfferings() {
  const root = document.getElementById("offeringCards");
  if (!root) return;
  const all = (state.data?.records || []).map(record => ({record, notice: currentOfferingNotice(record)}))
    .filter(item => item.notice).sort((a, b) => b.notice.date.localeCompare(a.notice.date));
  const query = normalizeSearchText(state.offeringQuery);
  const rows = all.filter(({record}) => !query || getRecordText(record).includes(query));
  const postponed = all.filter(item => item.notice.kind === "offeringPostponement").length;
  document.getElementById("offeringCount").textContent = `${rows.length} / ${all.length} 家 · ${postponed} 家延期 · ${all.length - postponed} 家本轮不进行`;
  document.getElementById("offeringSearch").value = state.offeringQuery;
  root.innerHTML = rows.map(({record, notice}) => {
    const names = nameParts(record), labels = offeringNoticeLabels(notice), facts = notice.research;
    return `<article class="offering-card" data-offering-card="${escapeHtml(record.id)}">
      <div class="offering-card-heading"><div><h2>${escapeHtml(foldTraditional(names.primary))}</h2><p>${escapeHtml(names.secondary)}</p></div><span class="offering-code">${notice.stockCode}<small>发售代码 / Offer code</small></span></div>
      <div class="offering-event"><div><strong>${labels[0]}</strong><small>${labels[1]}</small></div><time datetime="${notice.date}">${notice.date}</time></div>
      ${renderOfferingResearch(facts, notice)}
      <dl class="offering-context">
        <div><dt>监管备案 / CSRC filing</dt><dd>${escapeHtml(statusLabel(record.status))}<span>${escapeHtml(statusLabel(record.status, 1))}</span></dd></div>
        <div><dt>港交所申请 / HKEX application</dt><dd>${escapeHtml(record.hkexApplicationStatusLabelZh || record.hkexPublicStatus)}<span>${escapeHtml(record.hkexPublicStatus)} · 当前 A1 ${notice.applicationDate}</span></dd></div>
      </dl>
      <div class="offering-links">${renderOfferingSources(facts, notice)}<button type="button" class="text-button" data-offering-detail="${escapeHtml(record.id)}">发行人详情 / Details</button></div>
    </article>`;
  }).join("") || '<p class="muted">没有匹配项目 / No matching offerings</p>';
}

const recordTextCache = new WeakMap();

function getRecordText(record) {
  const cached = recordTextCache.get(record);
  if (cached !== undefined) return cached;
  const sponsorAliases = (record.sponsors || []).flatMap((sponsor) => sponsorSearchAliases(sponsor));
  const rawText = [
    record.issuerName,
    offeringSearchText(record),
    record.id === "leadrive technology (shanghai) co., ltd." ? "Leaddrive" : "",
    record.csrcName,
    ...(record.issuerSearchAliases || []),
    issuerTypeInfo(record).primary,
    issuerTypeInfo(record).secondary,
    record.structureType,
    record.issuerJurisdiction,
    record.aShareStatus,
    record.aShareCode,
    record.backendStageZh,
    record.currentA1Date,
    record.hkexApplicationStatusLabelZh,
    ...(record.hkexPublishedApplications || []).flatMap(a => a.documents.flatMap(d => [d.date, d.label, hkexDocumentLabel(d.label)])),
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

function submissionDateRows(record) {
  const e = record.listedSubmissionEvidence;
  if (!e) return "";
  const row = (label, value) => `<div class="timeline-row"><span>${label}</span><strong>${value}</strong></div>`;
  if (e.kind === "confidential_submission" && e.publicDocumentType === "PHIP") {
    return row("密交递交 / Confidential submission", formatDate(e.submissionDate)) +
      row("聆讯后资料集 / PHIP", formatDate(e.publicDocumentDate)) +
      row("公开申请版本 / Public AP", "未见公开申请版本 / No public AP evidenced");
  }
  if (e.kind === "public_same_day_AP" && e.publicDocumentType === "AP_UNSPECIFIED") {
    return row("首次已见公开申请版本 / First evidenced public AP", formatDate(e.publicDocumentDate)) +
      row("版本类别 / AP version", "未注明首次或修订 / Original or revised not specified");
  }
  return "";
}

function hkexDocumentLabel(label) {
  const labels = {"Application Proof (1st submission)": "首次申请版本", "Application Proof (Revised)": "修订申请版本",
    "OC Announcement - Appointment": "整体协调人委任", "OC Announcement - Appointment (Revised)": "整体协调人委任（修订）",
    "OC Announcement - Termination": "整体协调人终止委任", "PHIP (1st submission)": "聆讯后资料集"};
  return labels[label] || label;
}

function renderHkexPostings(record) {
  const docs = (record.hkexPublishedApplications || []).flatMap(a => a.documents || [])
    .filter(d => /^https:\/\/www1\.hkexnews\.hk\/app\/sehk\/\d{4}\/\d+\/documents\/sehk\d+(_c)?\.pdf$/.test(d.url))
    .sort((a, b) => b.date.localeCompare(a.date) || Number(a.previous) - Number(b.previous));
  if (!docs.length) return "";
  const lead = docs[0];
  return `<details><summary>港交所申请文件 · ${escapeHtml(lead.date)}</summary>${docs.map(d =>
    `<div><a href="${escapeHtml(d.url)}" target="_blank" rel="noreferrer">${escapeHtml(d.date)} · ${escapeHtml(hkexDocumentLabel(d.label))}</a>${d.previous ? " · 此前刊发" : ""}</div>`
  ).join("")}</details>`;
}

function renderHkexStatusEvidence(record) {
  if (record.hkexReturnedApplication) return `<p>港交所于 ${escapeHtml(record.hkexReturnedApplication.date)} 发回本次上市申请。<a href="https://www1.hkexnews.hk/ncms/json/eds/appreturned_sehk_e.json" target="_blank" rel="noreferrer">港交所已发回申请名单</a></p>`;
  if (record.hkexApplicationProofEvidence) return `<p>港交所曾于 ${escapeHtml(record.hkexApplicationProofEvidence.date)} 刊发申请版本。当前名册未列示本次申请状态。</p>`;
  return "";
}

function renderA1Cell(record) {
  const reported = record.listedSubmissionEvidence;
  if (reported?.kind === "confidential_submission" && reported.publicDocumentType === "PHIP")
    return `<span class="date-primary">公开AP未见 / No public AP evidenced</span><span class="date-secondary">密交 ${formatDate(reported.submissionDate)}</span>`;
  if (reported?.kind === "public_same_day_AP" && reported.publicDocumentType === "AP_UNSPECIFIED")
    return `<span class="date-primary">${formatDate(reported.publicDocumentDate)}</span><span class="date-secondary">首次已见 / First evidenced AP</span>`;

  if (record.hkexConfidentialFilingDate && record.hkexConfidentialFilingDate === record.a1Date) {
    const publicA1 = record.hkexPublicFirstPostingDate || record.currentA1Date;
    const publicA1Html = publicA1 && publicA1 !== record.a1Date
      ? `<span class="date-secondary">公开 ${formatDatePlain(publicA1)}</span>`
      : "";
    return `<span class="date-primary">密交 ${formatDate(record.a1Date)}</span>${publicA1Html}`;
  }
  return renderStackedDate(record.a1Date, "当前", record.currentA1Date);
}

function renderReceivedDateValue(value, isAsOf = false) {
  if (!isAsOf) return formatDate(value);
  if (!value) return formatDate(value);
  return `<span class="date-primary">截至 ${escapeHtml(formatDatePlain(value))}</span><span class="date-secondary">已接收 · as of status</span>`;
}

function isLaterCycleReceived(record) {
  const current = asDateValue(record.csrcCurrentReceivedDate);
  const notice = asDateValue(record.noticeDate);
  return current !== null && notice !== null && current > notice;
}

function renderReceivedCell(record) {
  const primary = record.csrcReceivedDate || record.csrcFirstReceivedDate;
  const primaryIsAsOf = record.csrcReceivedDateIsAsOf || (
    !record.csrcReceivedDate && record.csrcFirstReceivedDate && record.csrcFirstReceivedDateIsAsOf
  );
  const currentIsAsOf = record.csrcCurrentReceivedDateIsAsOf;
  const currentLabel = isLaterCycleReceived(record) ? "后续备案轮次" : "当前";
  if (!primary && record.csrcCurrentReceivedDate) {
    return `${renderReceivedDateValue(record.csrcCurrentReceivedDate, currentIsAsOf)}<span class="date-secondary">${currentLabel}接收</span>`;
  }
  if (!primary && record.status === "waiting_received") return "尚未接收";
  if (!primary && record.status === "not_required") return "无需备案";
  const secondaryHtml = record.csrcCurrentReceivedDate && record.csrcCurrentReceivedDate !== primary
    ? `<span class="date-secondary">${currentLabel} ${currentIsAsOf ? "截至 " : ""}${formatDatePlain(record.csrcCurrentReceivedDate)}</span>`
    : "";
  return `${renderReceivedDateValue(primary, primaryIsAsOf)}${secondaryHtml}`;
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

function listingOrCompletionDate(record) {
  if (record.specialListingRoute !== "rto") return record.hkexListingDate || record.listingDate || "";
  const stage = record.practicalStage || record.hkexStage;
  return stage === "listed" ? completedRtoDate(record) : "";
}

function renderListingCell(record, showStockCode = true) {
  const listingDate = listingOrCompletionDate(record);
  const secondary = showStockCode && record.hkexListingStockCode ? `股份代号 ${record.hkexListingStockCode}` : "";
  const secondaryHtml = secondary ? `<span class="date-secondary">${escapeHtml(secondary)}</span>` : "";
  if (record.specialListingRoute === "rto" && listingDate) {
    return `<span class="date-primary">${formatDate(listingDate)}</span><span class="date-secondary">RTO完成 Completed</span>${secondaryHtml}`;
  }
  if (!showStockCode) return formatDate(listingDate);
  if (!listingDate && record.hkexPublicStatus === "Active") return "尚无本次上市日";
  return `<span class="date-primary">${formatDate(listingDate)}</span>${secondaryHtml}`;
}

function renderNoticeCell(record) {
  if (record.transactionDisclosures?.kind === "reverse_takeover_filing_notice") {
    return `${formatDate(record.transactionDisclosures.signedDate)}<span class="date-secondary">反向收购备案 / RTO notice</span>`;
  }
  if (record.noticeDateBasis === "publication_date_only" && record.noticePublishedDate)
    return `公示 ${formatDate(record.noticePublishedDate)}`;
  const label = record.noticeSupersededByCurrentFiling ? "历史通知 Historical notice"
    : record.noticeDateBasis === "publication_date_fallback" ? "网页发布 Published" : "";
  return `${formatDate(record.noticeDate)}${label ? `<span class="date-secondary">${label}</span>` : ""}`;
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
  setText("marketCapMinZh", listed ? "上市总市值下限" : "A股市值下限");
  setText("marketCapMinEn", listed ? "Listing value min · HKD bn" : "A-share value min · RMB bn");
  setText("marketCapMaxZh", listed ? "上市总市值上限" : "A股市值上限");
  setText("marketCapMaxEn", listed ? "Listing value max · HKD bn" : "A-share value max · RMB bn");
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
    if (state.status !== "all" && publicStatusKey(record.status) !== publicStatusKey(state.status)) return false;
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
      const capValue = listedCapMode
        ? (record.listingMarketCapSampleEligible === true ? record.listingMarketCapHkdBn : null)
        : (record.aShareMarketCapRankEligible === true ? record.aShareMarketCapAtA1RmbBn : null);
      if (!listedCapMode && !isAhCandidate(record)) return false;
      if (!Number.isFinite(capValue) || capValue <= 0) return false;
      if (capMin !== null && capValue < capMin) return false;
      if (capMax !== null && capValue > capMax) return false;
    }

    const rawDate = state.dateField === "csrcReceivedDate"
      ? (record.csrcReceivedDate || record.csrcFirstReceivedDate || record.csrcCurrentReceivedDate)
      : state.dateField === "hkexListingDate" ? listingOrCompletionDate(record) : record[state.dateField];
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
  const key = dayMetricField(metric);
  return typeof record[key] === "number" ? record[key] : null;
}

function sortKey(record, field) {
  if (field === "status") return { value: statusSortRank[record.status] || 999, type: "number" };
  if (field === "industryTags") return { value: firstTextValue(record.industryTags || []), type: "text" };
  if (field === "sponsors") return { value: firstTextValue(sponsorLabels(record)), type: "text" };
  if (field === "structureType") return { value: issuerTypeInfo(record).rank, type: "number" };
  const durationMetric = dayMetricForField(field);
  if (durationMetric) return { value: durationValueForStats(record, {metric: durationMetric}), type: "number" };
  if (field === "issuerName") {
    const names = nameParts(record);
    return { value: `${names.primary || ""} ${names.secondary || ""}`.trim(), type: "text" };
  }
  if (field === "aShareMarketCapAtA1RmbBn") {
    return { value: isAhCandidate(record) && record.aShareMarketCapRankEligible === true ? record.aShareMarketCapAtA1RmbBn : null, type: "number" };
  }
  if (field === "listingMarketCapHkdBn") {
    return { value: record.listingMarketCapSampleEligible === true && typeof record.listingMarketCapHkdBn === "number" ? record.listingMarketCapHkdBn : null, type: "number" };
  }
  if (field === "noticeDate" && record.transactionDisclosures?.kind === "reverse_takeover_filing_notice") {
    return { value: asDateValue(record.transactionDisclosures.signedDate), type: "number" };
  }
  if (field === "csrcReceivedDate") {
    return { value: asDateValue(record.csrcReceivedDate || record.csrcFirstReceivedDate || record.csrcCurrentReceivedDate), type: "number" };
  }
  if (field === "hkexListingDate") return { value: asDateValue(listingOrCompletionDate(record)), type: "number" };
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
  const structureOptions = ["a_h", "h_share", "red_chip", "de_spac", "hdr", "other"]
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
  return timingSample(record, metric.metric, dayMetricField(metric.metric), dayMetricField("currentA1ToReceived"),
    record.practicalStage || (record.hkexListingDate ? "listed" : state.hkexStage), record.hkexListingDate, state.data?.meta?.csrcRegimeEffectiveDate);
}

function statsFor(records, metric) {
  const entries = records
    .map((record) => ({ record, value: durationValueForStats(record, metric) }))
    .filter((entry) => typeof entry.value === "number")
    .sort((a, b) => a.value - b.value || String(a.record.issuerName).localeCompare(String(b.record.issuerName), "en", { sensitivity: "base" }));
  if (!entries.length) {
    return { count: 0, average: null, median: null, min: null, max: null, minRecord: null, maxRecord: null };
  }
  const values = entries.map((entry) => entry.value);
  const total = values.reduce((sum, value) => sum + value, 0);
  const minEntry = entries[0];
  const maxEntry = entries.find((entry) => entry.value === values[values.length - 1]);
  return {
    count: values.length,
    average: total / values.length,
    median: median(values),
    min: minEntry.value,
    max: maxEntry.value,
    minRecord: minEntry.record,
    maxRecord: maxEntry.record
  };
}

function statRecordLabel(record) {
  if (!record) return "";
  const names = nameParts(record);
  return names.primary || names.secondary || record.issuerName || record.id || "";
}

function renderExtremeStat(label, value, record, metric, sortDir) {
  if (!record || typeof value !== "number") {
    return `<div><span>${escapeHtml(label)}</span><strong>${formatDayValue(value)}</strong></div>`;
  }
  const recordLabel = statRecordLabel(record);
  return `
    <div>
      <span>${escapeHtml(label)}</span>
      <button
        class="metric-extreme-link"
        type="button"
        data-record-id="${escapeHtml(record.id)}"
        data-sort-field="${escapeHtml(dayMetricField(metric.metric))}"
        data-sort-dir="${escapeHtml(sortDir)}"
        title="按该口径排序并定位 ${escapeHtml(recordLabel)}"
      >
        <strong>${formatDayValue(value)}</strong>
        <small>${escapeHtml(recordLabel)}</small>
      </button>
    </div>
  `;
}

function renderDurationMetric(metric, stats) {
  const regimeStart = state.data?.meta?.csrcRegimeEffectiveDate || "2023-03-31";
  const isListingMetric = metric.metric === "a1ToListing";
  const startLabel = isListingMetric
    ? `仅纳入上市日≥${regimeStart}且日期顺序有效样本；密交/疑似密交/De-SPAC/HDR剔除`
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
        ${renderExtremeStat("最低", stats.min, stats.minRecord, metric, "asc")}
        ${renderExtremeStat("最高", stats.max, stats.maxRecord, metric, "desc")}
      </div>
      <div class="metric-caption">${caption}</div>
    </article>
  `;
}

function renderMetrics(records) {
  const statusCounts = new Map();
  for (const record of records) {
    const key = publicStatusKey(record.status);
    statusCounts.set(key, (statusCounts.get(key) || 0) + 1);
  }
  const statuses = new Set([...Object.keys(state.data?.meta?.statusLabels || statusLabels).map(publicStatusKey), ...statusCounts.keys()]);
  const statusHtml = [...statuses].map((status) => {
    const count = statusCounts.get(status) || 0;
    const active = state.status !== "all" && publicStatusKey(state.status) === status;
    return `<button type="button" data-count-status="${escapeHtml(status)}" aria-pressed="${active}">${escapeHtml(statusLabel(status))} ${formatNumber(count, "integer")}</button>`;
  }).join("");
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
  const days = (metric) => durationValueForStats(record, {metric});
  if (state.hkexStage === "listed") {
    return `
      <div class="days-cell">
        <div class="days-cell-mode">${dayUnitLabel()}</div>
        <div><span>首次A1至备案通过 A1→Notice</span><strong>${formatDayValue(days("a1ToNotice"))}</strong></div>
        <div><span>首次A1至上市 A1→Listing</span><strong>${formatDayValue(days("a1ToListing"))}</strong></div>
      </div>
    `;
  }
  const received = days("a1ToReceived");
  const current = days("currentA1ToReceived");
  const currentReceivedLine = Number.isFinite(current) && current !== received
    ? `<div><span>当前A1至接收</span><strong>${formatDayValue(current)}</strong></div>`
    : "";
  const listingDays = days("a1ToListing");
  const allStageListingLine = state.hkexStage === "all" && typeof listingDays === "number"
    ? `<div class="days-cell-listing"><span title="首次A1至上市 First A1 to HKEX listing">A1→上市</span><strong>${formatDayValue(listingDays)}</strong></div>`
    : "";
  return `
    <div class="days-cell">
      <div class="days-cell-mode">${dayUnitLabel()}</div>
      <div><span>备案锚点（A1日）至接收</span><strong>${formatDayValue(received)}</strong></div>
      ${currentReceivedLine}
      <div><span>接收至通知</span><strong>${formatDayValue(days("receivedToNotice"))}</strong></div>
      <div><span>备案锚点（A1日）至通知</span><strong>${formatDayValue(days("a1ToNotice"))}</strong></div>
      ${allStageListingLine}
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

function focusRecordInTable(recordId, sortField, sortDir) {
  if (!recordId) return;
  state.sortField = sortField || state.sortField;
  if (daySortFields.includes(state.sortField)) state.daySortField = state.sortField;
  state.sortDir = sortDir === "asc" ? "asc" : "desc";
  state.selectedId = recordId;
  syncControls();
  const rows = getFilteredRecords();
  const index = rows.findIndex((record) => record.id === recordId);
  if (index >= 0) state.page = Math.floor(index / PAGE_SIZE) + 1;
  syncUrl();
  renderChrome();
  renderRows();
  window.requestAnimationFrame(() => {
    const row = [...document.querySelectorAll("#trackerRows [data-record-id]")]
      .find((item) => item.dataset.recordId === recordId);
    if (!row) return;
    row.classList.add("is-stat-focused");
    row.scrollIntoView({ block: "center", behavior: "smooth" });
    row.focus({ preventScroll: true });
    window.setTimeout(() => row.classList.remove("is-stat-focused"), 1400);
  });
}

function renderRows() {
  const rows = getFilteredRecords();
  renderMetrics(rows);

  if (!rows.length) {
    const isLoadFailure = !(state.data?.records || []).length;
    const emptyMessage = isLoadFailure
      ? "数据加载失败，请点击右上角「刷新」重试 / Data failed to load — use Refresh."
      : "当前筛选无匹配发行人，可点击「清除」重置筛选 / No matching issuer — try Clear filters.";
    const visibleColumnCount = state.hkexStage === "all" ? 12 : 10;
    document.getElementById("trackerRows").innerHTML = `
      <tr>
        <td colspan="${visibleColumnCount}" class="muted empty-row">${emptyMessage}</td>
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
      const sponsors = record.sponsorAppointmentStatus === "waived" ? '<span title="Sponsor appointment waived for this transaction">获豁免委聘</span>' : sponsorDisplayEntries(record)
        .slice(0, 4)
        .map((entry) => `<span title="${escapeHtml(entry.fullName)}">${escapeHtml(entry.shortName)}</span>`)
        .join("");
      const listedPage = state.hkexStage === "listed";
      return `
        <tr class="${selected}" data-record-id="${escapeHtml(record.id)}" tabindex="0" role="button" aria-label="查看 ${escapeHtml(names.primary)}">
          <td class="issuer-cell">
            <strong>${escapeHtml(names.primary)}</strong>
            <span>${escapeHtml(names.secondary)}</span>
            ${renderOfferingBadge(record)}
          </td>
          <td class="status-cell">${renderStatusBadge(record)}</td>
          <td class="date-cell">${renderA1Cell(record)}</td>
          <td class="date-cell">${listedPage ? renderNoticeCell(record) : renderReceivedCell(record)}</td>
          <td class="date-cell">${listedPage ? renderListingCell(record) : renderNoticeCell(record)}</td>
          <td class="listing-date-cell all-only-col">${renderListingCell(record, false)}</td>
          <td class="days-td">${renderDays(record)}</td>
          <td class="type-cell">${renderIssuerType(record)}</td>
          <td class="mcap-cell">${listedPage ? formatListingMarketCap(record) : formatMarketCap(record)}</td>
          <td class="mcap-cell all-only-col">${formatListingMarketCap(record)}</td>
          <td class="industry-cell"><div class="tag-list">${industries || escapeHtml(record.industryDisplayLabel || "")}</div></td>
          <td><div class="tag-list">${sponsors}${renderListingRole(record)}</div></td>
        </tr>
      `;
    })
    .join("");

  renderPagination(rows.length, pageCount, startIndex, endIndex);
}

const listingPdfUrl = url => typeof url === "string" && /^https:\/\/www1?\.hkexnews\.hk\/listedco\/listconews\/sehk\/\d{4}\/\d{4}\/\d+\.pdf$/i.test(url);

function economicsRoute(record) {
  return record.listingEconomics?.route?.value || (record.specialListingRoute === "gem_to_main_transfer" ? "transfer" :
    record.specialListingRoute === "introduction" || record.listingFeeTerms?.noOffering ? "introduction" : "");
}

function renderListingFeeTerms(record) {
  const f = record.listingFeeTerms;
  if (!record.hkexListingDate || !f || !listingPdfUrl(f.url)) return "";
  const pct = n => new Intl.NumberFormat("zh-HK", { style: "percent", maximumFractionDigits: 4 }).format(n);
  const row = (label, value, item) => {
    const links = (Array.isArray(item?.pages) ? item.pages : []).filter(p => Number.isInteger(p) && p > 0)
      .map(p => `<a href="${escapeHtml(f.url)}#page=${p}" target="_blank" rel="noreferrer" aria-label="招股书 PDF 第 ${p} 页">PDF p.${p}</a>`).join(" · ");
    return `<div class="timeline-row"><span>${label}</span><div><strong>${escapeHtml(value)}</strong>${links ? `<small class="source-list">${links}</small>` : ""}</div></div>`;
  };
  const fee = f.fee || f.feeApprox;
  const rows = [fee
    ? row("保荐费（招股书披露）", `${f.fee ? "" : "约 "}${fee.currency} ${fee.value.toLocaleString("en-US")}${fee.perSponsorCount ? "（按各保荐人约定费用合计）" : ""}`, fee)
    : row("保荐费（招股书披露）", f.feeUnresolved ? "原文披露不一致" : "暂无可核实金额", f.feeUnresolved)];
  const route = economicsRoute(record);
  if (route === "introduction" || route === "transfer") rows.push(row("承销佣金率", route === "transfer" ? "不适用（转板上市）" : "不适用（介绍上市）"));
  else {
    if (f.rate) rows.push(row("固定承销佣金率", pct(f.rate.value), f.rate));
    if (f.hkRate) rows.push(row("香港公开发售佣金率", pct(f.hkRate.value), f.hkRate));
    if (f.intRate) rows.push(row("国际配售佣金率", pct(f.intRate.value), f.intRate));
    if (!f.rate && !f.hkRate && !f.intRate) {
      const item = f.rateConditional, d = item?.disclosure, p = item?.pages;
      const bound = Number.isFinite(d?.rate) && Object.keys(d).length === 2 && d.rate >= 0 && d.rate <= 1 && Array.isArray(p) &&
        p.length === 1 && Number.isInteger(p[0]) && p[0] > 0 && d.source === `${f.url}#page=${p[0]}`;
      rows.push(bound
        ? row("附条件承销佣金率", `${d.rate.toLocaleString("zh-HK", {style: "percent", maximumSignificantDigits: 17})}（适用条件见招股书）`, item)
        : row("固定承销佣金率", item ? "视发售条款而定" : "暂无可核实费率", item));
    }
    if (f.discMax) rows.push(row("酌情奖励费上限", pct(f.discMax.value), f.discMax));
    else if (f.discRate) rows.push(row("酌情奖励费率（非承诺支付）", pct(f.discRate.value), f.discRate));
  }
  return `<div class="detail-item"><span>发行费用 Offering fees</span><div class="timeline">${rows.join("")}</div></div>`;
}

// The exporter binds these outcome pages to an issuer. The UI checks only publisher/path syntax.
function outcomePublisher(url) {
  if (typeof url !== "string" || /[^\x21-\x7e]/.test(url)) return "";
  if (/^https:\/\/www1\.hkexnews\.hk\/listedco\/listconews\/sehk\/[0-9]{4}\/[0-9]{4}\/[0-9]{13}_c\.pdf$/.test(url)) return "HKEX";
  if (/^https:\/\/disc\.static\.szse\.cn\/disc\/disk03\/finalpage\/20[0-9]{2}-[0-9]{2}-[0-9]{2}\/[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}\.PDF$/.test(url)) return "SZSE";
  if (/^https:\/\/static\.cninfo\.com\.cn\/finalpage\/20[0-9]{2}-[0-9]{2}-[0-9]{2}\/[0-9]{10}\.PDF$/.test(url)) return "CNINFO";
  return "";
}

// Source decimals are already validated. Format their digits without binary floating point.
function listingDecimal(value, minFraction = 0, shift = 0) {
  if (typeof value !== "string" || !/^\d+(?:\.\d+)?$/.test(value)) return "";
  const [whole, fraction = ""] = value.split(".");
  const integer = (whole + fraction.padEnd(shift, "0").slice(0, shift)).replace(/^0+(?=\d)/, "");
  const tail = fraction.slice(shift).replace(/0+$/, "").padEnd(minFraction, "0");
  return integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (tail ? "." + tail : "");
}

function secondarySourceNote(url) {
  let host;
  try { host = new URL(url).hostname; } catch { return ""; }
  if (host === "scribd.com" || host === "www.scribd.com") return " · Scribd 转载 / Secondary repost";
  if (host === "stcn.com" || host === "www.stcn.com") return " · 证券时报转载 / Secondary media source";
  return "";
}

function renderListingEconomics(record) {
  const e = record.listingEconomics;
  if (!record.hkexListingDate || !record.hkexListingStockCode || !e) return "";
  const missing = "暂无可核实数据 / Unverified";
  const validPage = page => Number.isInteger(page) && page >= 1 && page <= 2147483647;
  const sourcesOf = f => Array.isArray(f?.sources) ? f.sources : [];
  const issued = e.actual?.sizeBasis === "issuer_issued_ipo";
  const unitsOnly = issued && e.actual.grossMethod === "issued_units_cash_unreconciled";
  const outcomePages = new Map();
  if (e.route?.value === "offering" && (e.shoe?.value === "not_exercised" || (issued && e.shoe?.value === "no_option"))) {
    for (const s of sourcesOf(e.shoe)) {
      const publisher = outcomePublisher(s?.url);
      if (publisher && validPage(s.page)) outcomePages.set(s.url + "#page=" + s.page, publisher);
    }
  }
  const sourceLinks = (facts, allowOutcome = false) => {
    const links = new Map();
    for (const f of facts) for (const s of sourcesOf(f)) {
      if (typeof s?.url !== "string" || /[^\x21-\x7e]/.test(s.url)) continue;
      const year = String(record.hkexListingDate).slice(0, 4);
      if (f === e.route && /^\d{4}$/.test(year) && s.url === "https://www2.hkexnews.hk/-/media/HKEXnews/Homepage/New-Listings/New-Listing-Information/New-Listing-Report/Main/NLR" + year + "_Eng.xlsx" &&
          Number.isSafeInteger(s.row) && s.row > 0 && s.row <= 1048576) {
        links.set(s.url + ":" + s.row, '<a target="_blank" rel="noreferrer" href="' + escapeHtml(s.url) + '">NLR row ' + s.row + '</a>');
        continue;
      }
      if (!validPage(s.page)) continue;
      const href = s.url + "#page=" + s.page;
      const issueField = issued && (f === e.actual.shares || f === e.actual.gross || f === e.actual.estimate ||
        (unitsOnly && (f === e.actual.reportedGross || f === e.actual.unitsTimesPrice)));
      const publisher = (allowOutcome && issueField && outcomePublisher(s.url)) ||
        (allowOutcome && outcomePages.get(href)) || (listingPdfUrl(s.url) && "PDF");
      if (!publisher) continue;
      const file = s.url.split("/").pop();
      links.set(href, '<a target="_blank" rel="noreferrer" href="' + escapeHtml(href) +
        '" title="' + escapeHtml(file) + '" aria-label="' + escapeHtml(file) + ', page ' + s.page + '">' + publisher + ' p.' + s.page + '</a>');
    }
    return links.size ? '<small class="econ-sources">' + [...links.values()].join(" · ") + "</small>" : "";
  };
  const fieldLine = allowOutcome => (label, value, ...facts) => '<div class="econ-line"><dt>' + escapeHtml(label) +
    "</dt><dd><strong>" + escapeHtml(value) + "</strong>" + sourceLinks(facts, allowOutcome) + "</dd></div>";
  const line = fieldLine(false), outcomeLine = fieldLine(true);
  const pct = f => {
    const digits = listingDecimal(f.value, 0, 2);
    return digits ? digits + "%" : missing;
  };
  const money = (p, f) => {
    const digits = listingDecimal(f.value, 2);
    return digits ? p.currency + " " + digits : missing;
  };
  const reasons = {
    cap: "仅披露上限 / Cap only", nonuniform: "费率不统一 / Nonuniform rates",
    unallocated: "各档基数未确定 / Bases not allocated", conditional: "费率有条件 / Conditional rate"
  };
  const states = {
    not_exercised: "未行使 / Not exercised",
    no_option: "无超额配股权 / No option", partial: "部分行使 / Partially exercised", full: "全数行使 / Fully exercised",
    exercised: "已行使 / Exercised", confirmed_zero: "无额外配发 / No additional allotment"
  };
  const phase = (title, p, isActual = false) => {
    const sizeLine = isActual ? outcomeLine : line;
    const finalIssue = isActual && issued;
    const grossLabels = {
      issued_units_cash_unreconciled: "确切募集总额 / Exact gross proceeds",
      reported: "新股发行总额（披露）/ Reported gross on new shares",
      reconciled_components: "新股发行总额（按披露金额合计）/ Gross from disclosed amounts",
      shares_times_price: "新股发行总额（股数 × 发售价）/ Gross from shares × price"
    };
    const rows = [sizeLine(finalIssue ? grossLabels[p.grossMethod] : "发行总额 / Gross proceeds", p?.gross ? money(p, p.gross) : missing, p?.gross)];
    if (p?.shares) rows.push(sizeLine(finalIssue ? "发行人新发股数 / New shares issued" : e.unit === "HDR" ? "发售预托证券 / Offer HDRs" : "发售股数 / Offer shares", listingDecimal(p.shares.value) || missing, p.shares));
    if (p?.price) rows.push(line("最终发售价 / Final price", money(p, p.price), p.price));
    if (isActual && unitsOnly) {
      rows.push(sizeLine("发行人披露的募集总额 / Issuer-reported gross", money(p, p.reportedGross), p.reportedGross));
      rows.push(sizeLine("股数 × 发售价（仅作说明）/ Shares × price (illustrative only)", money(p, p.unitsTimesPrice), p.unitsTimesPrice));
    }
    if (p?.rate) rows.push(line("适用固定费率 / Fixed rate", pct(p.rate), p.rate, p.basis));
    for (const [k, label] of [["hk", "香港公开发售 / HK public offer"], ["international", "国际配售 / International placing"]]) {
      const t = p?.tranches?.[k];
      if (t) rows.push(line(label, money(p, t.gross) + " × " + pct(t.rate), t.gross, t.rate, p.basis));
    }
    rows.push((p?.estimate ? sizeLine : line)(finalIssue ? "新股固定佣金测算 / Illustrative fixed commission on new shares" : "估算固定佣金 / Est. fixed commission", p?.estimate ? money(p, p.estimate) :
      reasons[p?.basis?.value] || missing, p?.estimate || p?.basis));
    return "<section><h4>" + title + "</h4><dl>" + rows.join("") + "</dl></section>";
  };
  const kind = economicsRoute(record);
  let body;
  if (kind === "introduction" || kind === "transfer") {
    body = '<p class="econ-note">' + (kind === "introduction" ? "介绍上市 / Listing by introduction" :
      "转板上市 / Board transfer") + " · 不适用 / N/A" + sourceLinks([e.route]) + "</p>";
  } else if (!e.route) {
    body = '<p class="econ-note">' + missing + "</p>";
  } else {
    body = phase("基础发售（不含超额配股）/ Base offer, excluding option", e.offered) + "<dl>" +
      outcomeLine("超额配股权 / Over-allotment", states[e.shoe?.value] || "未核实超额配股权行使结果 / Exercise outcome unverified", e.shoe) + "</dl>" +
      (issued ? phase("最终发行（仅发行人新股）/ Final issuance (issuer-issued shares only)", e.actual, true) : e.shoe?.value === "pending" || (!e.shoe && !e.actual) ? '<p class="econ-note">鞋后实际发行规模未核实 / Final offer size unverified</p>' :
        phase("最终发售（含实际超额配股）/ Final offer after over-allotment", e.actual, true)) +
      '<p class="econ-note">估算佣金 = 适用发售总额 × 固定费率，不含酌情费用。' +
      ' Estimated commission = applicable gross proceeds × fixed rate, excluding discretionary fees.</p>';
  }
  return '<div class="detail-item listing-economics"><h3>发行规模 / 承销佣金测算<small>Offer size &amp; estimated underwriting commission</small></h3>' + body + "</div>";
}

function renderTransactionDisclosures(record) {
  const event = record.transactionDisclosures;
  if (!event) return "";
  const rows = [];
  const row = (label, value) => rows.push(
    `<div class="timeline-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`
  );
  let title;
  if (event.kind === "reverse_takeover_filing_notice") {
    title = "反向收购备案 / Reverse takeover filing";
    row("通知书收件人 / Addressee", event.recipient);
    row("备案通知书 / CSRC notice", event.noticeNumber);
    row("通知书落款 / Signed", formatDate(event.signedDate));
    row("证监会公布 / Published", formatDate(event.publishedDate));
    row("反向收购完成 / Merger completed", formatDate(event.completionDate));
  } else if (event.kind === "holding_company_substitution") {
    title = "控股公司重组及介绍上市 / Holding-company substitution";
    row("原上市公司 / Predecessor", event.predecessorNameZh + " · " + event.predecessorName);
    row("新上市公司 / Successor", event.successorNameZh + " · " + event.successorName);
    row("股东表决通过 / Shareholders approved", formatDate(event.schemeMeetingDate));
    row("法院批准 / Court approval", formatDate(event.courtApprovalDate));
    row("重组计划生效 / Scheme effective", formatDate(event.schemeEffectiveDate));
    row("介绍上市并开始买卖 / Trading began", formatDate(event.mainBoardTradingDate));
  } else if (event.kind === "indirect_transition_disclosure") {
    title = "备案过渡期披露 / CSRC transition disclosure";
    row("发行人招股书 / Prospectus", formatDate(event.prospectusDate));
    row("备案安排", event.issuerDisclosureZh);
    row("Filing arrangements", event.issuerDisclosureEn);
    row("主板开始买卖 / Main Board trading began", formatDate(event.mainBoardTradingDate));
  } else if (event.kind === "gem_board_transfer") {
    title = "GEM 转主板 / Board transfer";
    row("股票代码 / Stock codes", `GEM ${event.gemCode} → 主板 ${event.stockCode}`);
    row("向港交所申请转板 / Transfer application", formatDate(event.applicationDate));
    if (event.resubmissionDate) row("再次递交转板申请 / Resubmission", formatDate(event.resubmissionDate));
    row("港交所原则批准 / HKEX approval in principle", formatDate(event.approvalInPrincipleDate));
    row("转板公告 / Announcement published", formatDate(event.announcementPublishedDate));
    row("主板开始买卖 / Main Board trading began", formatDate(event.mainBoardTradingDate));
    if (event.reportDisclosure) {
      const report = event.reportDisclosure;
      const label = report.status === "intended" ? "公司拟于转板完成并公告后三个工作日内向证监会报告" :
        "公司披露须于转板完成并公告后三个工作日内向证监会报告";
      row("转板后报告 / Post-transfer report", label);
      row("实际提交日期 / Actual submission date", "尚无公开确认 / Unconfirmed");
    }
  } else return "";
  const links = Object.values(event.sources).map(source =>
    `<a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.locator)}</a>`
  ).join(" · ");
  return `<div class="detail-item"><span>${escapeHtml(title)}</span><div class="timeline">${rows.join("")}</div><small class="source-list">${links}</small></div>`;
}

function renderDetail(record) {
  const detail = document.getElementById("issuerDetail");
  if (!record) {
    detail.innerHTML = `<div class="muted">请选择发行人 / Select an issuer.</div>`;
    return;
  }
  const names = nameParts(record);
  const sponsorList = record.sponsorAppointmentStatus === "waived" ? '<div class="sponsor-detail"><strong>获豁免委聘保荐人</strong><span>Sponsor appointment waived for this transaction</span></div>' : sponsorDisplayEntries(record)
    .map(
      (entry) => `
        <div class="sponsor-detail">
          <strong title="${escapeHtml(entry.fullName)}">${escapeHtml(entry.shortName)}</strong>
          <span>${escapeHtml(entry.fullName)}</span>
          ${entry.registered ? `<a href="https://apps.sfc.hk/publicregWeb/corp/${encodeURIComponent(entry.registered.ce)}/details" target="_blank" rel="noopener noreferrer">${escapeHtml(entry.registered.legalNameZh)} · SFC ${escapeHtml(entry.registered.ce)}</a>` : ""}
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
    "MCT_tourism": "文旅部 MCT",
    "CSRC_filing_direct_overseas": "证监会 CSRC"
  };
  const regulatorList = (record.regulatoryTags || []).map((tag) => `<span>${escapeHtml(regulatorLabels[tag] || tag)}</span>`).join("");
  const sourceLinks = (record.sourceLinks || [])
    .filter((source) => /^https?:\/\//i.test(String(source.url || "")))
    .map((source) => {
      const secondary = secondarySourceNote(source.url);
      const label = escapeHtml(source.label) + secondary;
      if (source.availability === "unavailable") {
        const note = secondary ? "链接不可用 / Unavailable" : "官方历史文件暂不可用 / Historical file unavailable";
        return `<span class="muted" title="${escapeHtml(source.checkedAt || '')}">${label} · ${note}</span>`;
      }
      return `<a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${label}${source.availability === "relocated" && !secondary ? ' · 官方存档 / Archive' : ''}</a>`;
    })
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
    filing_not_required_no_csrc_notice_expected: "无需备案，无通知书 Not required, no notice expected",
    csrc_official_status_conflict_same_snapshot: "同一官方快照状态冲突 Official status conflict",
    hkex_phip_public_no_observed_a1: "PHIP已公开但无可观察A1 PHIP public, A1 unobserved",
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
          <div class="timeline-row"><span>${record.transactionDisclosures?.kind === "holding_company_substitution" ? "重组计划文件 Scheme booklet" : "HKEX招股书 Prospectus"}</span><strong>${formatDate(record.hkexProspectusDate)}</strong></div>
          <div class="timeline-row"><span>HKEX上市日 Listing</span><strong>${formatDate(record.hkexListingDate)}</strong></div>
      `
    : "";
  const daysRows = listedPage
    ? `
          <div><span>首次A1至备案通过 A1→Notice</span><strong>${formatDayNumber(durationValueForDisplay(record, "a1ToNotice"), dayUnit)}</strong></div>
          <div><span>首次A1至上市 A1→Listing</span><strong>${formatDayNumber(durationValueForDisplay(record, "a1ToListing"), dayUnit)}</strong></div>
      `
    : `
          <div><span>备案计时至接收 A1→Received</span><strong>${formatDayNumber(durationValueForStats(record, {metric:"a1ToReceived"}), dayUnit)}</strong></div>
          ${hkexListingStage(record) !== "listed" && record.calendarDaysA1ToReceived > 180 ? `<div><span>历史A1至接收 Historical A1→Received</span><strong>${formatDayNumber(record[dayFields.a1ToReceived], dayUnit)}</strong></div>` : ""}
          <div><span>当前A1至当前接收 Current A1→Received</span><strong>${formatDayNumber(record[dayFields.currentA1ToReceived], dayUnit)}</strong></div>
          <div><span>接收至通知 Received→Notice</span><strong>${formatDayNumber(record[dayFields.receivedToNotice], dayUnit)}</strong></div>
          <div><span>备案锚点（A1日）至通知 A1→Notice</span><strong>${formatDayNumber(record[dayFields.a1ToNotice], dayUnit)}</strong></div>
      `;

  const noticePredatesKnownAnchor = (record.timelineFlags || []).includes(
    "csrc_notice_before_timeline_anchor_possible_mismatch",
  );
  const confidentialAnchorLabel =
    record.hkexConfidentialFilingDate === record.a1Date
      ? noticePredatesKnownAnchor
        ? "已观察密交AP日 Observed confidential AP"
        : "密交A1锚点 Confidential A1 anchor"
      : "备案A1锚点 A1 anchor";

  detail.innerHTML = `
    <div class="detail-header">
      <h2>${escapeHtml(names.primary)}</h2>
      <div class="muted">${escapeHtml(names.secondary)}</div>
    </div>
    <div class="detail-grid">
      <div class="detail-item">
        <span>状态 Status</span>
        <strong>${renderStatusBadge(record)}</strong>
        ${renderIssuerDisclosure(record)}
        ${renderHkexStatusEvidence(record)}
        ${renderHkexPostings(record)}
        ${record.csrcFilingApplicability && record.csrcFilingApplicability !== "pending" ? `<div class="muted">备案适用性 Filing scope: ${escapeHtml({required: "适用 / Applicable", not_required: "无需备案 / No filing required", pending: "暂无核实资料 / Unconfirmed"}[record.csrcFilingApplicability] || "")}</div>` : ""}
        ${record.status === "applicability_pending" ? `<div class="muted">证监会公示中未匹配到本次上市的备案记录。<a href="https://www.csrc.gov.cn/csrc/c101935/zfxxgk_zdgk.shtml" target="_blank" rel="noreferrer">查阅证监会公示</a></div>` : ""}
        ${record.csrcFilingReportingRequired ? `<div>转板后须向证监会报告 / Post-transfer reporting required</div>` : ""}
        ${record.csrcFilingApplicabilityReason && record.csrcFilingApplicability !== "pending" ? `<details><summary>备案依据 Filing basis</summary>${record.csrcFilingApplicabilityReasonZh ? `<p>${escapeHtml(record.csrcFilingApplicabilityReasonZh)}</p>` : ""}<p>${escapeHtml(record.csrcFilingApplicabilityReason)}</p>${record.csrcFilingEvidenceLocator ? `<p>${escapeHtml(record.csrcFilingEvidenceLocator)}</p>` : ""}${(record.csrcFilingApplicabilitySourceUrls || []).filter((url) => /^https:\/\//.test(url)).map((url) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">来源 Source</a>`).join(" · ")}</details>` : ""}
      </div>
      <div class="detail-item">
        <span>时间线 Timeline</span>
        <div class="timeline">
          ${submissionDateRows(record) || `
          <div class="timeline-row"><span>${confidentialAnchorLabel}</span><strong>${formatDate(record.a1Date)}</strong></div>
          ${record.hkexConfidentialFilingDate && record.hkexConfidentialFilingDate !== record.a1Date ? `<div class="timeline-row" title="${escapeHtml(record.hkexConfidentialFilingEvidence || "")}"><span>密交递交 Confidential filing</span><strong>${formatDate(record.hkexConfidentialFilingDate)}</strong></div>` : ""}
          ${record.hkexConfidentialFilingDate && (record.hkexPublicFirstPostingDate || record.currentA1Date) ? `<div class="timeline-row"><span>公开A1 Public A1</span><strong>${formatDate(record.hkexPublicFirstPostingDate || record.currentA1Date)}</strong></div>` : ""}
          ${record.statsAnchorDate && record.statsAnchorDate !== record.a1Date ? `<div class="timeline-row"><span>统计锚点（制度后首A1）Stats anchor</span><strong>${formatDate(record.statsAnchorDate)}</strong></div>` : ""}
          ${historicalAnchorLine}
          <div class="timeline-row"><span>当前A1 Current A1</span><strong>${formatDate(record.currentA1Date)}</strong></div>
          `}
          <div class="timeline-row"><span>${record.csrcReceivedDateIsAsOf ? "首轮接收状态 First received status" : "首轮接收 First received"}</span><strong>${renderReceivedDateValue(record.csrcFirstReceivedDate || record.csrcReceivedDate, record.csrcReceivedDateIsAsOf)}</strong></div>
          <div class="timeline-row"><span>${isLaterCycleReceived(record) ? "后续备案轮次接收 Later-cycle received" : (record.csrcCurrentReceivedDateIsAsOf ? "当前接收状态 Current received status" : "当前接收 Current received")}</span><strong>${renderReceivedDateValue(record.csrcCurrentReceivedDate, record.csrcCurrentReceivedDateIsAsOf)}</strong></div>
          ${(record.fullCirculationNotices || []).filter((item) => /^https?:\/\//.test(item.sourceUrl || "")).map((item) =>
            `<div class="timeline-row"><span>全流通备案通知书 Full circulation</span><strong><a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noreferrer" title="${escapeHtml(item.title || "")}">${escapeHtml(item.noticeDate || item.publishedDate || "查看通知书")}</a></strong></div>`
          ).join("")}
          <div class="timeline-row"><span>${record.noticeSupersededByCurrentFiling ? "历史备案通知书 Historical CSRC notice" : "备案通知书 CSRC notice"}</span><strong>${renderNoticeCell(record)}</strong></div>
          ${record.noticePublishedDate && record.noticePublishedDate !== record.noticeDate ? `<div class="timeline-row"><span>通知网页发布日期 Notice publication</span><strong>${formatDate(record.noticePublishedDate)}</strong></div>` : ""}
          ${record.transactionCompletionDate && record.transactionDisclosures?.kind !== "reverse_takeover_filing_notice" ? `<div class="timeline-row"><span>反向收购完成 RTO completion</span><strong>${formatDate(record.transactionCompletionDate)}</strong></div>` : ""}
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
        <span>${listedPage ? "上市日总市值 Listing-day total equity value" : "A 股状态 / 估值 A-share status / valuation"}</span>
        <div>${listedPage ? `<div class="market-cap-detail">${formatListingMarketCap(record)}</div>` : `${escapeHtml(record.aShareStatus)}<div class="market-cap-detail">${formatMarketCap(record)}</div>`}${renderValuationDetails(record, listedPage)}</div>
      </div>
      <div class="detail-item">
        <span>行业标签 Industry</span>
        <div class="tag-list">${industryList || escapeHtml(record.industryDisplayLabel || "")}</div>
      </div>
      ${record.historicalApplicantIndustry?.scope === "original_applicant_group_as_filed" ? `
        <div class="detail-item">
          <span>原申请人集团行业（合并前） Original applicant group before merger</span>
          <div>${escapeHtml(record.historicalApplicantIndustry.legalIssuer)} · ${escapeHtml(record.historicalApplicantIndustry.code)} ${escapeHtml(record.historicalApplicantIndustry.label)}</div>
          <div>申请编号 ${escapeHtml(record.historicalApplicantIndustry.applicationId)} · AP ${escapeHtml(record.historicalApplicantIndustry.apDate)} · 财务期末 ${escapeHtml(record.historicalApplicantIndustry.periodEnd)}</div>
        </div>` : ""}
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
        <div class="sponsor-detail-list">${(sponsorList + renderListingRole(record, true)) || "<span>待抽取</span>"}</div>
      </div>
      ${renderTransactionDisclosures(record)}
      ${renderListingFeeTerms(record)}
      ${renderListingEconomics(record)}
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
  state.view = viewTitles[view] ? view : "tracker";
  const stagePanel = document.getElementById("listingStagePanel");
  if (stagePanel) stagePanel.style.display = state.view === "tracker" ? "" : "none";
  document.getElementById("viewTitle").textContent = state.view === "tracker"
    ? trackerTitle()
    : (viewTitles[state.view] || "追瑞");
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === state.view);
  });
  const activeNav = document.querySelector(`.nav-item[data-view="${state.view}"]`);
  activeNav?.scrollIntoView({ block: "nearest", inline: "center" });
  document.querySelectorAll(".view-panel").forEach((panel) => {
    panel.classList.remove("is-visible");
  });
  document.getElementById(`${state.view}View`)?.classList.add("is-visible");
  if (state.view === "offerings") renderOfferings();
  if (updateLocation) syncUrl();
}

function renderChrome() {
  const meta = state.data.meta || {};
  const summary = state.data.summary || {};
  const coverage = summary.listingMarketCapCoverage;
  const coverageNote = document.getElementById("listingMarketCapCoverageNote");
  if (coverageNote) {
    const valid = [coverage?.total, coverage?.verified, coverage?.estimate, coverage?.excluded]
      .every(n => Number.isSafeInteger(n) && n >= 0)
      && coverage.verified + coverage.estimate + coverage.excluded === coverage.total;
    coverageNote.hidden = !valid;
    coverageNote.textContent = valid
      ? `上市市值覆盖 ${coverage.total} 家：已核实 ${coverage.verified} 家，估算 ${coverage.estimate} 家，未纳入 ${coverage.excluded} 家。 / Listing market caps: ${coverage.verified} verified, ${coverage.estimate} estimated, ${coverage.excluded} excluded (${coverage.total} total).`
      : "";
  }
  document.getElementById("sourcePill").textContent = `${meta.labelZh || meta.label || "数据快照"} · ${formatNumber(summary.trackedIssuers || state.data.records.length, "integer")} 家`;
  document.getElementById("dataMode").textContent =
    meta.sourceMode === "live_snapshot" ? "后端快照" : "限量预览";
  document.getElementById("snapshotMeta").textContent =
    meta.generatedAt
      ? `港交所及中国证监会公开资料 · 更新时间 ${meta.generatedAt.replace("T", " ").slice(0, 16)}（香港）`
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
  if (!state.data) {
    syncUrl();
    return;
  }
  if (options.debounce) {
    renderInputLater();
    return;
  }
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
  sponsorShortNameCache.clear();
  for (const record of state.data.records || []) {
    getRecordText(record);
  }
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
  renderOfferings();
}

document.querySelectorAll(".nav-item[data-view]").forEach((button) => {
  button.addEventListener("click", event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    switchView(button.dataset.view);
  });
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

// Capture input immediately; debounce only rendering so hydration cannot erase a keystroke.
const renderInputLater = debounce(() => updateTracker({}, { resetPage: false }));
for (const [id, key] of [["issuerSearch", "query"], ["marketCapMin", "marketCapMin"], ["marketCapMax", "marketCapMax"]]) {
  document.getElementById(id).addEventListener("input", event => updateTracker({ [key]: event.target.value }, { debounce: true }));
}

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

document.getElementById("sortField").addEventListener("change", (event) => {
  const nextField = event.target.value === "__days__" ? state.daySortField : event.target.value;
  const patch = { sortField: nextField };
  if (daySortFields.includes(nextField)) patch.daySortField = nextField;
  updateTracker(patch);
});

document.getElementById("daySortField").addEventListener("change", (event) => {
  updateTracker({
    daySortField: event.target.value,
    sortField: event.target.value,
    sortDir: defaultSortDir(event.target.value)
  });
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
  const offering = event.target.closest("[data-offering-id]");
  if (offering) {
    const record = state.data.records.find(item => item.id === offering.dataset.offeringId);
    state.offeringQuery = currentOfferingNotice(record)?.stockCode || "";
    closeDetail();
    switchView("offerings");
    return;
  }
  const row = event.target.closest("[data-record-id]");
  if (row) selectRecord(row.dataset.recordId);
});
trackerRowsBody.addEventListener("keydown", (event) => {
  if (event.target.closest("[data-offering-id]")) return;
  if (event.key !== "Enter" && event.key !== " ") return;
  const row = event.target.closest("[data-record-id]");
  if (!row) return;
  event.preventDefault();
  selectRecord(row.dataset.recordId);
});

document.getElementById("metricsGrid").addEventListener("click", (event) => {
  const status = event.target.closest("[data-count-status]")?.dataset.countStatus;
  if (status) {
    updateTracker({status: publicStatusKey(state.status) === status ? "all" : status});
    return;
  }
  const button = event.target.closest("[data-record-id][data-sort-field]");
  if (!button) return;
  focusRecordInTable(button.dataset.recordId, button.dataset.sortField, button.dataset.sortDir);
});

document.getElementById("detailBackdrop").addEventListener("click", closeDetail);
document.getElementById("detailClose").addEventListener("click", closeDetail);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDetail();
  trapModalFocus(event);
});

document.getElementById("clearFilters").addEventListener("click", () => {
  updateTracker({ ...defaults, view: state.view, hkexStage: state.hkexStage });
});

document.getElementById("refreshButton").addEventListener("click", loadData);

document.getElementById("offeringSearch").addEventListener("input", event => {
  state.offeringQuery = event.target.value;
  renderOfferings();
  syncUrl();
});
document.getElementById("clearOfferingSearch").addEventListener("click", () => {
  state.offeringQuery = "";
  renderOfferings();
  syncUrl();
  document.getElementById("offeringSearch").focus();
});
document.getElementById("returnToTracker").addEventListener("click", () => switchView("tracker"));
document.getElementById("offeringCards").addEventListener("click", event => {
  const button = event.target.closest("[data-offering-detail]");
  if (button) openDetail(button.dataset.offeringDetail);
});

// Hydrate deep-link intent once, before yielding to any user input or fetch.
applyStateFromUrl();
initVisitCounter();
loadData();
