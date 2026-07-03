// Sponsor leaderboard view module. Wrapped in an IIFE because it shares the
// page (and global scope) with app.js inside the integrated shell.
(() => {

const DATA_URL = "data/sponsor_leaderboard_demo.json";
const BUNDLED_DATA_URL = "data/sponsor_leaderboard_demo_data.js";

// Integrated view root inside the main app shell (index.html). All sponsor
// DOM ids carry an `sl` prefix to avoid colliding with tracker ids.
const viewRoot = document.getElementById("sponsorLeaderboardView");

const state = {
  data: null,
  search: "",
  preset: "all",
  metric: "projectCount",
  credit: "creditAllFull",
  stage: "all",
  type: "all",
  nature: "all",
  dateField: "a1Date",
  dateFrom: "",
  dateTo: "",
  activeRows: [],
  activeFacts: [],
};

const els = {};
let searchRenderTimer = null;

const metricLabels = {
  projectCount: "项目数",
  activeCount: "申请中",
  listedCount: "已上市",
  ahCount: "A+H",
  listingMarketCapHkdBnSum: "上市市值",
  aShareMarketCapRmbBnSum: "A股市值",
  lifecycleMedianDays: "A1→上市中位数",
  type6TotalCount: "六号牌人数",
  type6RepPerProject: "Rep/项目",
  projectsPerType6Rep: "项目/六号牌Rep",
  projectsPerType6RO: "项目/RO",
  projectsPerType6Total: "项目/六号牌总人数",
};

const creditLabels = {
  creditAllFull: "全额计入",
  creditEqual: "平均拆分",
  creditFirstNamed: "首名计入",
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

function formatDays(value, sampleN) {
  if (!isNumber(value)) return "待披露";
  const suffix = isNumber(sampleN) ? ` · n=${sampleN}` : "";
  return `${compactNumber(Math.round(value), 0)}天${suffix}`;
}

function formatRatio(value, digits = 2) {
  if (!isNumber(value)) return "待披露";
  return compactNumber(value, digits);
}

function type6Display(row) {
  if (!isNumber(row.type6TotalCount)) return { main: "待接入", sub: "暂无匹配六号牌数据" };
  const quality = row.type6Quality === "archive_db" ? "archive" : row.type6Quality || "fresh";
  return {
    main: `${compactNumber(row.type6TotalCount, 0)}人`,
    sub: `RO ${compactNumber(row.type6ROCount || 0, 0)} / Rep ${compactNumber(row.type6RepCount || 0, 0)} · ${quality}`,
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
  return metric === "lifecycleMedianDays";
}

function metricValue(row, metric = state.metric) {
  if (metric === "lifecycleMedianDays") return row.listedLifecycleMedianDays;
  return row[metric];
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
    const listingCaps = sponsorFacts.map((fact) => fact.listingMarketCapHkdBn).filter(isNumber);
    const aShareCaps = sponsorFacts.map((fact) => fact.aShareMarketCapAtA1RmbBn).filter(isNumber);
    const applyingAhCaps = sponsorFacts
      .filter((fact) => fact.hkexStage === "applying" && fact.isAH)
      .map((fact) => fact.aShareMarketCapAtA1RmbBn)
      .filter(isNumber);
    const projectCount = weightedCount(sponsorFacts, () => true);
    const type6RepCount = isNumber(firm.type6RepCount) ? firm.type6RepCount : null;
    const type6ROCount = isNumber(firm.type6ROCount) ? firm.type6ROCount : null;
    const type6TotalCount = isNumber(firm.type6TotalCount) ? firm.type6TotalCount : null;
    const query = normalize(state.search);
    rows.push({
      ...firm,
      facts: sponsorFacts,
      searchSponsorMatch: firmMatchesSearch(firm, query),
      projectCount,
      activeCount: weightedCount(sponsorFacts, (fact) => fact.hkexStage === "applying"),
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
      applyingElapsedMedianDays: median(applyingElapsedValues),
      applyingElapsedN: applyingElapsedValues.length,
      projectsPerType6Rep: type6RepCount && type6RepCount > 0 ? projectCount / type6RepCount : null,
      type6RepPerProject: projectCount > 0 && type6RepCount ? type6RepCount / projectCount : null,
      projectsPerType6RO: type6ROCount && type6ROCount > 0 ? projectCount / type6ROCount : null,
      projectsPerType6Total: type6TotalCount && type6TotalCount > 0 ? projectCount / type6TotalCount : null,
      topIndustries: topIndustries(sponsorFacts),
    });
  }
  return rows.sort(compareRows);
}

function compareRows(a, b) {
  if (normalize(state.search)) {
    const aSponsorMatch = !!a.searchSponsorMatch;
    const bSponsorMatch = !!b.searchSponsorMatch;
    if (aSponsorMatch !== bSponsorMatch) return aSponsorMatch ? -1 : 1;
  }
  const av = metricValue(a);
  const bv = metricValue(b);
  const aMissing = !isNumber(av) || (state.metric === "lifecycleMedianDays" && !a.listedLifecycleN);
  const bMissing = !isNumber(bv) || (state.metric === "lifecycleMedianDays" && !b.listedLifecycleN);
  if (aMissing !== bMissing) return aMissing ? 1 : -1;
  if (!aMissing && av !== bv) return metricSortAsc(state.metric) ? av - bv : bv - av;
  if (b.projectCount !== a.projectCount) return b.projectCount - a.projectCount;
  return String(a.displayNameEn).localeCompare(String(b.displayNameEn));
}

function firmSearchText(firm) {
  return [
    firm?.displayNameZh,
    firm?.displayNameEn,
    firm?.sponsorTag,
    firm?.canonicalName,
    ...(firm?.legalNames || []),
    ...(firm?.aliases || []),
  ]
    .map(normalize)
    .join(" ");
}

function firmMatchesSearch(firm, query) {
  return !!query && firmSearchText(firm).includes(query);
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

function filteredFacts() {
  const firms = firmById();
  const query = normalize(state.search);
  return (state.data?.projectFacts || []).filter((fact) => {
    const firm = firms.get(fact.sponsorId);
    if (!matchesSearch(fact, firm, query)) return false;
    if (state.stage !== "all" && fact.hkexStage !== state.stage) return false;
    if (state.type !== "all" && fact.issuerType !== state.type) return false;
    if (state.nature !== "all" && firm?.sponsorNature !== state.nature) return false;
    const dateValue = fact[state.dateField];
    if (state.dateFrom && (!dateValue || dateValue < state.dateFrom)) return false;
    if (state.dateTo && (!dateValue || dateValue > state.dateTo)) return false;
    return true;
  });
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
}

function metaToday() {
  const source = state.data?.meta?.sourceGeneratedAt || state.data?.meta?.generatedAt;
  return source ? source.slice(0, 10) : new Date().toISOString().slice(0, 10);
}

function enforceMetricCompatibility() {
  if (state.stage === "applying" && state.metric === "lifecycleMedianDays") {
    state.metric = "activeCount";
  }
}

function setPreset(preset) {
  state.preset = preset;
  if (preset === "all") {
    state.stage = "all";
    state.type = "all";
    state.nature = "all";
    state.dateFrom = "";
    state.dateTo = "";
    state.dateField = "a1Date";
  } else if (preset === "applying") {
    state.stage = "applying";
    state.type = "all";
    state.dateFrom = "";
    state.dateTo = "";
    enforceMetricCompatibility();
  } else if (preset === "listed") {
    state.stage = "listed";
    state.dateField = "listingDate";
    state.dateFrom = "";
    state.dateTo = "";
  } else if (preset === "ah") {
    state.stage = "all";
    state.type = "A+H";
    state.dateFrom = "";
    state.dateTo = "";
  } else if (preset === "recentA1") {
    state.stage = "all";
    state.type = "all";
    state.dateField = "a1Date";
    state.dateTo = metaToday();
    state.dateFrom = addDays(state.dateTo, -30);
  } else if (preset === "recentNotice") {
    state.stage = "all";
    state.type = "all";
    state.dateField = "noticeDate";
    state.dateTo = metaToday();
    state.dateFrom = addDays(state.dateTo, -90);
  }
  enforceMetricCompatibility();
  syncControls();
  render();
}

function syncControls() {
  els.searchInput.value = state.search;
  els.metricSelect.value = state.metric;
  els.creditSelect.value = state.credit;
  els.stageSelect.value = state.stage;
  els.typeSelect.value = state.type;
  els.natureSelect.value = state.nature;
  els.dateFieldSelect.value = state.dateField;
  els.dateFrom.value = state.dateFrom;
  els.dateTo.value = state.dateTo;
  viewRoot.querySelectorAll(".preset").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.preset === state.preset);
  });
}

function readControls() {
  state.search = els.searchInput.value;
  state.metric = els.metricSelect.value;
  state.credit = els.creditSelect.value;
  state.stage = els.stageSelect.value;
  state.type = els.typeSelect.value;
  state.nature = els.natureSelect.value;
  state.dateField = els.dateFieldSelect.value;
  state.dateFrom = els.dateFrom.value;
  state.dateTo = els.dateTo.value;
  state.preset = "custom";
  enforceMetricCompatibility();
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
  if (state.metric === "type6TotalCount") {
    return type6Display(row);
  }
  if (state.metric === "projectsPerType6Rep") {
    return {
      main: formatRatio(row.projectsPerType6Rep),
      sub: isNumber(row.type6RepCount) ? `项目/Rep · Rep ${compactNumber(row.type6RepCount, 0)}` : "暂无六号牌Rep",
    };
  }
  if (state.metric === "type6RepPerProject") {
    return {
      main: formatRatio(row.type6RepPerProject),
      sub: isNumber(row.type6RepCount) ? `Rep/项目 · Rep ${compactNumber(row.type6RepCount, 0)}` : "暂无六号牌Rep",
    };
  }
  if (state.metric === "projectsPerType6RO") {
    return {
      main: formatRatio(row.projectsPerType6RO),
      sub: isNumber(row.type6ROCount) ? `项目/RO · RO ${compactNumber(row.type6ROCount, 0)}` : "暂无六号牌RO",
    };
  }
  if (state.metric === "projectsPerType6Total") {
    return {
      main: formatRatio(row.projectsPerType6Total),
      sub: isNumber(row.type6TotalCount) ? `项目/六号牌总人数 · ${compactNumber(row.type6TotalCount, 0)}人` : "暂无六号牌人数",
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
  const projectLeader = [...rows].filter((row) => row.projectCount > 0).sort((a, b) => b.projectCount - a.projectCount)[0];
  const mcapLeader = [...rows].filter((row) => marketCapSortValue(row) > 0).sort((a, b) => marketCapSortValue(b) - marketCapSortValue(a))[0];
  const ahLeader = [...rows].sort((a, b) => b.ahCount - a.ahCount)[0];
  const timingLeader = [...rows]
    .filter((row) => isNumber(row.listedLifecycleMedianDays) && row.listedLifecycleN >= 5)
    .sort((a, b) => a.listedLifecycleMedianDays - b.listedLifecycleMedianDays)[0];
  const type6Leader = [...rows]
    .filter((row) => row.firmScope !== "rollup" && isNumber(row.type6TotalCount))
    .sort((a, b) => b.type6TotalCount - a.type6TotalCount || b.projectCount - a.projectCount)[0];
  const peopleEfficiencyLeader = [...rows]
    .filter((row) => row.firmScope !== "rollup" && isNumber(row.projectsPerType6Total) && row.projectCount > 0)
    .sort((a, b) => b.projectsPerType6Total - a.projectsPerType6Total || b.projectCount - a.projectCount)[0];
  const roLeverageLeader = [...rows]
    .filter((row) => row.firmScope !== "rollup" && isNumber(row.projectsPerType6RO) && row.projectCount > 0)
    .sort((a, b) => b.projectsPerType6RO - a.projectsPerType6RO || b.projectCount - a.projectCount)[0];

  const cards = [
    {
      label: "项目数第一",
      value: projectLeader ? projectLeader.displayNameZh : "待披露",
      note: projectLeader ? `${compactCredit(projectLeader.projectCount)} 个项目 · ${creditLabels[state.credit]}` : "无样本",
    },
    {
      label: `${marketCapHeaderText()}第一`,
      value: mcapLeader ? mcapLeader.displayNameZh : "待披露",
      note: mcapLeader ? marketCapDisplay(mcapLeader).main : "无样本",
    },
    {
      label: "A+H 项目第一",
      value: ahLeader && ahLeader.ahCount > 0 ? ahLeader.displayNameZh : "待披露",
      note: ahLeader ? `${compactCredit(ahLeader.ahCount)} 个A+H项目` : "无样本",
    },
    {
      label: "已上市周期较快",
      value: timingLeader ? timingLeader.displayNameZh : "样本不足",
      note: timingLeader ? `${formatDays(timingLeader.listedLifecycleMedianDays, timingLeader.listedLifecycleN)} · 仅已上市样本` : "需至少5个已上市样本",
    },
    {
      label: "六号牌人数第一",
      value: type6Leader ? type6Leader.displayNameZh : "待接入",
      note: type6Leader ? type6Display(type6Leader).sub : "Webb SFC Type 6",
    },
    {
      label: "人效第一",
      value: peopleEfficiencyLeader ? peopleEfficiencyLeader.displayNameZh : "样本不足",
      note: peopleEfficiencyLeader
        ? `${formatRatio(peopleEfficiencyLeader.projectsPerType6Total)} 项目/六号牌总人数 · 每项目 ${formatRatio(peopleEfficiencyLeader.type6TotalCount / peopleEfficiencyLeader.projectCount)} 人`
        : "需匹配六号牌人数及项目样本",
    },
    {
      label: "RO杠杆第一",
      value: roLeverageLeader ? roLeverageLeader.displayNameZh : "样本不足",
      note: roLeverageLeader
        ? `${formatRatio(roLeverageLeader.projectsPerType6RO)} 项目/RO · RO ${compactNumber(roLeverageLeader.type6ROCount || 0, 0)}`
        : "需匹配负责人员RO样本",
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
  const type6 = type6Display(row);
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
    <td data-label="六号牌"><span class="number">${escapeHtml(type6.main)}</span><span class="sub-number">${escapeHtml(type6.sub)}</span></td>
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
  els.primaryMetricHead.textContent = metricLabels[state.metric] || "排名指标";
  els.marketCapHead.hidden = !showMarketCap;
  els.marketCapHead.textContent = marketCapHeaderText();
  const rankingNote = " · A1→上市统计仅纳入已上市项目；申请中为 elapsed/freshness";
  const syntheticFactCount = facts.filter((fact) => fact.isSyntheticRollup).length;
  const baseFactCount = facts.length - syntheticFactCount;
  const factText = syntheticFactCount
    ? `${compactNumber(baseFactCount)} 原始 + ${compactNumber(syntheticFactCount)} 合并 fact`
    : `${compactNumber(facts.length)} 条计分 fact`;
  els.resultHint.textContent = `${compactNumber(rows.length)} 家保荐人/合并口径 · ${factText} · ${creditLabels[state.credit]}${rankingNote}`;
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

function drawerStats(row) {
  return [
    ["项目", compactCredit(row.projectCount)],
    ["申请中", compactCredit(row.activeCount)],
    ["已上市", compactCredit(row.listedCount)],
    ["A+H", compactCredit(row.ahCount)],
    ["六号牌", type6Display(row).main],
    ["Rep/项目", formatRatio(row.type6RepPerProject)],
    ["项目/六号牌Rep", formatRatio(row.projectsPerType6Rep)],
    ["项目/RO", formatRatio(row.projectsPerType6RO)],
    ["项目/六号牌总人数", formatRatio(row.projectsPerType6Total)],
    ["上市日港股市值", formatCap(row.listingMarketCapHkdBnSum, "HK$")],
    ["A1日A股市值", formatCap(row.aShareMarketCapRmbBnSum, "¥")],
    ["A1→上市中位数", formatDays(row.listedLifecycleMedianDays, row.listedLifecycleN)],
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
    <p class="drawer-subtitle">${escapeHtml(row.displayNameEn)} · ${escapeHtml(row.sponsorNature || "待核")} · ${escapeHtml(row.mappingConfidence || "demo")}</p>
    <div class="drawer-pills">${legalNames}</div>
    <div class="drawer-summary">${drawerStats(row)}</div>
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
  ["searchInput", "metricSelect", "creditSelect", "stageSelect", "typeSelect", "natureSelect", "dateFieldSelect", "dateFrom", "dateTo"].forEach((id) => {
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
  els.clearButton.addEventListener("click", () => {
    state.search = "";
    state.metric = "projectCount";
    state.credit = "creditAllFull";
    setPreset("all");
  });
  els.drawerBackdrop.addEventListener("click", closeDrawer);
  els.drawerClose.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDrawer();
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
  bindControls();
  try {
    await loadData();
    const meta = state.data.meta || {};
    els.coverageText.textContent = meta.coverageZh || "HKEX / CSRC tracker derived sponsor view";
    els.firmCount.textContent = compactNumber(meta.firmCount || state.data.firms.length, 0);
    const sourceNote = meta.sourceGeneratedAt ? ` · 源快照 ${meta.sourceGeneratedAt}` : "";
    els.generatedAt.textContent = `生成 ${meta.generatedAt || "待披露"}${sourceNote}`;
    els.demoNote.textContent = meta.demoNoteZh || "本地 demo，不用于公开发布。";
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
      els.demoNote.textContent += ` 六号牌容量：${cap.quality || "source"} · ${cap.asOfDate || "date pending"}${freshnessNote}${blockNote} · ${matchNote}；仅作机构容量代理。`;
      if (cap.quality === "archive_db" && cap.dataFreshnessNote) {
        els.demoNote.textContent += ` ${cap.dataFreshnessNote}`;
      }
    }
    if (state.data.quality?.length) {
      els.demoNote.textContent += ` 质量提示：${state.data.quality.map((item) => `${item.code}=${item.count || item.items?.length || 1}`).join("；")}`;
    }
    populateOptions();
    syncControls();
    render();
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
  document.querySelectorAll('.nav-item[data-view="sponsorLeaderboard"]').forEach((button) => {
    button.addEventListener("click", ensureInit);
  });
  if (new URLSearchParams(window.location.search).get("view") === "sponsorLeaderboard") {
    ensureInit();
  }
}

})();
