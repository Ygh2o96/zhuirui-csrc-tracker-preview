const DATA_URL = "data/csrc_tracker_public.json";
const PAGE_SIZE = 50;

const defaults = {
  selectedId: null,
  status: "all",
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
  sortField: "a1Date",
  sortDir: "desc",
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
  review_pending: ["待复核", "Review queue"],
  pending_match: ["待复核", "Review queue"]
};

const viewTitles = {
  tracker: "证监会备案追踪",
  precedents: "案例检索",
  dossiers: "发行人档案",
  signals: "市场信号",
  research: "研究笔记"
};

const metricDefinitions = [
  {
    key: "businessDaysA1ToReceived",
    labelZh: "递表至接收",
    labelEn: "A1 filing to CSRC received",
    note: "按有公开接收日样本"
  },
  {
    key: "businessDaysReceivedToNotice",
    labelZh: "接收至通知",
    labelEn: "CSRC received to notice",
    note: "需同一发行人接收日及通知书",
    minCount: 5
  },
  {
    key: "businessDaysA1ToNotice",
    labelZh: "递表至通知",
    labelEn: "A1 filing to notice",
    note: "按有通知书样本"
  }
];

const trackedStateKeys = [
  "view",
  "status",
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
  "page"
];

const dateFormatter = new Intl.DateTimeFormat("zh-HK", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
});

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
  const time = asDateValue(value);
  if (!time) return `<span class="pending-zh">待补充</span><span class="pending-en">Pending</span>`;
  const parts = Object.fromEntries(
    dateFormatter.formatToParts(new Date(time)).map((part) => [part.type, part.value])
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function formatDatePlain(value) {
  const html = formatDate(value);
  return html.includes("<span") ? "待补" : html;
}

function formatNumber(value, mode = "decimal") {
  if (value === null || value === undefined || value === "" || Number.isNaN(value)) return "待补";
  return mode === "integer" ? integerFormatter.format(value) : numberFormatter.format(value);
}

function formatPending() {
  return `<span class="pending-zh">待补充</span><span class="pending-en">Pending</span>`;
}

function isAhCandidate(record) {
  return Boolean(record.isAH) || String(record.structureType || "").includes("A+H");
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

const sponsorDisplayRules = [
  [/China International Capital|CICC/i, "中金"],
  [/CITIC Securities/i, "中信证券"],
  [/China Securities.*International/i, "中信建投国际"],
  [/Huatai/i, "华泰国际"],
  [/Guotai Junan/i, "国泰君安"],
  [/CMB International/i, "招银国际"],
  [/China Merchants Securities/i, "招商证券"],
  [/Haitong/i, "海通国际"],
  [/J\.?P\.?\s*Morgan|JP Morgan/i, "摩根大通"],
  [/CCB International|CCBI/i, "建银国际"],
  [/GF Capital|GF Securities/i, "广发"],
  [/ABCI/i, "农银国际"],
  [/Goldman/i, "高盛"],
  [/Morgan Stanley/i, "摩根士丹利"],
  [/CLSA|CITIC CLSA/i, "中信里昂"],
  [/Citigroup|Citi/i, "花旗"],
  [/BOCI/i, "中银国际"],
  [/Merrill|BofA|Bank of America/i, "美银"],
  [/China Galaxy/i, "银河国际"],
  [/CMBC International/i, "民银国际"],
  [/UBS/i, "瑞银"],
  [/Sinolink/i, "国金"],
  [/ICBC International/i, "工银国际"],
  [/HSBC|Hongkong and Shanghai Banking/i, "汇丰"],
  [/Shenwan Hongyuan|Shenyin Wanguo/i, "申万宏源"],
  [/Ping An/i, "平安"],
  [/Deutsche/i, "德银"],
  [/Zhongtai/i, "中泰国际"],
  [/Jefferies/i, "杰富瑞"],
  [/SPDB/i, "浦银国际"],
  [/DBS/i, "星展"],
  [/BNP/i, "法巴"],
  [/BOCOM/i, "交银国际"],
  [/China Everbright|CEB International/i, "光大国际"],
  [/Guoyuan/i, "国元"],
  [/Orient Capital/i, "Orient"],
  [/Rainbow/i, "Rainbow"],
  [/Sunny Fortune/i, "Sunny"],
  [/China Industrial Securities/i, "兴证国际"],
  [/First Shanghai/i, "第一上海"],
  [/Yue Xiu/i, "越秀"],
  [/Alliance Capital Partners/i, "Alliance"],
  [/SDIC|Essence/i, "国投证券"],
  [/Quam/i, "华富建业"],
  [/Zero2IPO/i, "清科"],
  [/South China/i, "南华"],
  [/Lego/i, "Lego"],
  [/VBG/i, "建泉"],
  [/Guosen/i, "国信"],
  [/China Renaissance/i, "华兴"],
  [/Goldlink/i, "金联"],
  [/Dongxing/i, "东兴"],
  [/Macquarie/i, "麦格理"],
  [/Altus/i, "浩德"],
  [/Red Sun/i, "红日"],
  [/Cinda/i, "信达国际"],
  [/Caitong/i, "财通国际"],
  [/Innovax/i, "创升"],
  [/Somerley/i, "新百利"],
  [/China Sunrise/i, "华升"]
];

function sponsorShortName(name) {
  const raw = String(name || "").trim();
  if (!raw || raw === "待抽取") return raw;
  const matched = sponsorDisplayRules.find(([pattern]) => pattern.test(raw));
  if (matched) return matched[1];
  return raw
    .replace(/\b(Hong Kong|HK|International|Capital|Securities|Corporate Finance|Company|Limited|Co\.?|Ltd\.?|AG|plc|Branch)\b/gi, " ")
    .replace(/[(),.]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .slice(0, 2)
    .join(" ") || raw;
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

function renderStatusTags(record) {
  const tags = record.statusTags || [];
  if (!tags.length) return "";
  return `
    <span class="status-tag-list">
      ${tags.map((tag) => `<span title="HKEX confidential filing date used as A1 anchor">${escapeHtml(tag)}</span>`).join("")}
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

function getRecordText(record) {
  return [
    record.issuerName,
    record.csrcName,
    record.structureType,
    record.issuerJurisdiction,
    record.aShareStatus,
    record.aShareCode,
    record.backendStageZh,
    record.currentA1Date,
    record.csrcFirstReceivedDate,
    record.csrcCurrentReceivedDate,
    ...(record.statusTags || []),
    ...(record.timelineFlags || []),
    record.feedbackStatus,
    ...(record.industryTags || []),
    ...(record.csrcIndustryTags || []),
    ...(record.regulatoryTags || []),
    ...sponsorLabels(record),
    ...(record.sponsors || [])
  ]
    .join(" ")
    .toLowerCase();
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

function getBaseFilteredRecords() {
  const query = state.query.trim().toLowerCase();
  const from = asDateValue(state.dateFrom);
  const to = asDateValue(state.dateTo);
  const capMin = state.marketCapMin === "" ? null : Number(state.marketCapMin);
  const capMax = state.marketCapMax === "" ? null : Number(state.marketCapMax);

  return state.data.records.filter((record) => {
    if (state.status !== "all" && record.status !== state.status) return false;
    if (state.structure !== "all" && record.structureType !== state.structure) return false;
    if (state.industry !== "all" && !(record.industryTags || []).includes(state.industry)) return false;
    if (
      state.sponsor !== "all" &&
      !(record.sponsors || []).includes(state.sponsor) &&
      !sponsorLabels(record).includes(state.sponsor)
    ) return false;
    if (query && !getRecordText(record).includes(query)) return false;

    if (capMin !== null || capMax !== null) {
      if (!isAhCandidate(record) || typeof record.aShareMarketCapAtA1RmbBn !== "number") return false;
      if (capMin !== null && record.aShareMarketCapAtA1RmbBn < capMin) return false;
      if (capMax !== null && record.aShareMarketCapAtA1RmbBn > capMax) return false;
    }

    const recordDate = asDateValue(record[state.dateField]);
    if ((from || to) && !recordDate) return false;
    if (from && recordDate < from) return false;
    if (to && recordDate > to) return false;
    return true;
  });
}

function compareValues(a, b, field) {
  const aValue = a[field];
  const bValue = b[field];
  const aMissing = aValue === null || aValue === undefined || aValue === "";
  const bMissing = bValue === null || bValue === undefined || bValue === "";
  if (aMissing && bMissing) return 0;
  if (aMissing) return 1;
  if (bMissing) return -1;

  if (field.endsWith("Date")) {
    return asDateValue(aValue) - asDateValue(bValue);
  }
  if (typeof aValue === "number" && typeof bValue === "number") {
    return aValue - bValue;
  }
  return String(aValue).localeCompare(String(bValue), "zh-Hans", { numeric: true, sensitivity: "base" });
}

function getFilteredRecords() {
  const rows = getBaseFilteredRecords();
  const direction = state.sortDir === "asc" ? 1 : -1;
  return [...rows].sort((a, b) => {
    const compared = compareValues(a, b, state.sortField);
    if (compared !== 0) return compared * direction;
    return String(a.issuerName).localeCompare(String(b.issuerName), "en", { sensitivity: "base" });
  });
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

function populateSelect(id, options, currentValue, allLabel) {
  const select = document.getElementById(id);
  select.innerHTML = [
    `<option value="all">${escapeHtml(allLabel)}</option>`,
    ...options.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`)
  ].join("");
  select.value = options.includes(currentValue) ? currentValue : "all";
}

function populateFilters() {
  populateSelect("structureFilter", getUniqueOptions((record) => record.structureType), state.structure, "全部类型");
  populateSelect("industryFilter", getUniqueOptions((record) => record.industryTags || []), state.industry, "全部行业");
  const sponsorOptions = getUniqueOptions((record) => sponsorLabels(record));
  if (state.sponsor !== "all" && !sponsorOptions.includes(state.sponsor)) {
    const shortName = sponsorShortName(state.sponsor);
    if (sponsorOptions.includes(shortName)) state.sponsor = shortName;
  }
  populateSelect("sponsorFilter", sponsorOptions, state.sponsor, "全部保荐人");
}

function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2) return sorted[middle];
  return (sorted[middle - 1] + sorted[middle]) / 2;
}

function statsFor(records, key, minCount = 0) {
  const values = records.map((record) => record[key]).filter((value) => typeof value === "number");
  if (!values.length || values.length < minCount) {
    return { count: values.length, average: null, median: null, min: null, max: null, sampleTooSmall: values.length > 0 };
  }
  const total = values.reduce((sum, value) => sum + value, 0);
  return {
    count: values.length,
    average: total / values.length,
    median: median(values),
    min: Math.min(...values),
    max: Math.max(...values),
    sampleTooSmall: false
  };
}

function renderDurationMetric(metric, stats) {
  const caption = stats.sampleTooSmall
    ? `${integerFormatter.format(stats.count)} 条样本，暂不展示统计`
    : stats.count
      ? `${integerFormatter.format(stats.count)} 条样本 · ${metric.note}`
      : "暂无可统计样本";
  return `
    <article class="metric metric-wide duration-card">
      <div class="metric-title">
        <span class="metric-zh">${escapeHtml(metric.labelZh)}</span>
        <span class="metric-en">${escapeHtml(metric.labelEn)}</span>
      </div>
      <div class="duration-core">
        <span>平均工作日</span>
        <strong>${formatNumber(stats.average)}</strong>
      </div>
      <div class="metric-stat-grid">
        <div><span>中位</span><strong>${formatNumber(stats.median)}</strong></div>
        <div><span>最低</span><strong>${formatNumber(stats.min)}</strong></div>
        <div><span>最高</span><strong>${formatNumber(stats.max)}</strong></div>
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
  const statusHtml = ["notice_issued", "regulator_opinion", "supplement_requested", "csrc_received", "waiting_received", "review_pending"]
    .map((status) => `<span>${escapeHtml(statusLabel(status))} ${formatNumber(statusCounts[status] || 0, "integer")}</span>`)
    .join("");

  const html = [
    `
      <article class="metric metric-count">
        <div class="metric-title">
          <span class="metric-zh">筛选结果</span>
          <span class="metric-en">Filtered issuers</span>
        </div>
        <div class="metric-value">${formatNumber(records.length, "integer")}</div>
        <div class="status-mini">${statusHtml}</div>
      </article>
    `,
    ...metricDefinitions.map((metric) => renderDurationMetric(metric, statsFor(records, metric.key, metric.minCount || 0)))
  ];
  document.getElementById("metricsGrid").innerHTML = html.join("");
}

function renderDays(record) {
  const currentReceivedLine = typeof record.businessDaysCurrentA1ToReceived === "number"
    ? `<div><span>当前A1至接收</span><strong>${formatNumber(record.businessDaysCurrentA1ToReceived)}</strong></div>`
    : "";
  return `
    <div class="days-cell">
      <div><span>递表至接收</span><strong>${formatNumber(record.businessDaysA1ToReceived)}</strong></div>
      ${currentReceivedLine}
      <div><span>接收至通知</span><strong>${formatNumber(record.businessDaysReceivedToNotice)}</strong></div>
      <div><span>递表至通知</span><strong>${formatNumber(record.businessDaysA1ToNotice)}</strong></div>
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
      <button id="prevPage" ${state.page <= 1 ? "disabled" : ""}>上一页</button>
      <button id="nextPage" ${state.page >= pageCount ? "disabled" : ""}>下一页</button>
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

function selectRecord(recordId) {
  state.selectedId = recordId;
  renderRows();
}

function renderRows() {
  const rows = getFilteredRecords();
  renderMetrics(rows);

  if (!rows.length) {
    document.getElementById("trackerRows").innerHTML = `
      <tr>
        <td colspan="10" class="muted empty-row">当前筛选无匹配发行人 / No matching issuer.</td>
      </tr>
    `;
    document.getElementById("paginationBar").innerHTML = "";
    renderDetail(null);
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
      const industries = (record.industryTags || [])
        .slice(0, 3)
        .map((tag) => `<span>${escapeHtml(tag)}</span>`)
        .join("");
      const sponsors = sponsorDisplayEntries(record)
        .slice(0, 3)
        .map((entry) => `<span title="${escapeHtml(entry.fullName)}">${escapeHtml(entry.shortName)}</span>`)
        .join("");
      return `
        <tr class="${selected}" data-record-id="${escapeHtml(record.id)}" tabindex="0" role="button" aria-label="查看 ${escapeHtml(names.primary)}">
          <td class="issuer-cell">
            <strong>${escapeHtml(names.primary)}</strong>
            <span>${escapeHtml(names.secondary)}</span>
          </td>
          <td>${renderStatusBadge(record)}</td>
          <td class="date-cell">${renderA1Cell(record)}</td>
          <td class="date-cell">${renderReceivedCell(record)}</td>
          <td class="date-cell">${formatDate(record.noticeDate)}</td>
          <td>${renderDays(record)}</td>
          <td>${escapeHtml(record.structureType)}</td>
          <td>${formatMarketCap(record)}</td>
          <td><div class="tag-list">${industries}</div></td>
          <td><div class="tag-list">${sponsors}</div></td>
        </tr>
      `;
    })
    .join("");

  document.querySelectorAll("[data-record-id]").forEach((row) => {
    row.addEventListener("click", () => selectRecord(row.dataset.recordId));
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectRecord(row.dataset.recordId);
      }
    });
  });

  renderPagination(rows.length, pageCount, startIndex, endIndex);
  renderDetail(rows.find((record) => record.id === state.selectedId) || pageRows[0]);
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
  const industryList = (record.industryTags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  const regulatorList = (record.regulatoryTags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  const sourceLinks = (record.sourceLinks || [])
    .map((source) => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.label)}</a>`)
    .join("");
  const feedbackItems = (record.feedbackItems || [])
    .map(
      (item) => `
        <article class="feedback-card">
          <strong>${escapeHtml(item.publishedDate || "")} · ${escapeHtml(item.title || "补充材料")}</strong>
          <p>${escapeHtml(item.questionText || "")}</p>
        </article>
      `
    )
    .join("");
  const timelineFlags = (record.timelineFlags || [])
    .slice(0, 5)
    .map((flag) => `<span>${escapeHtml(flag)}</span>`)
    .join("");

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
          <div class="timeline-row"><span>A1 锚点</span><strong>${formatDate(record.a1Date)}</strong></div>
          <div class="timeline-row"><span>当前 A1</span><strong>${formatDate(record.currentA1Date)}</strong></div>
          <div class="timeline-row"><span>首轮接收</span><strong>${formatDate(record.csrcFirstReceivedDate || record.csrcReceivedDate)}</strong></div>
          <div class="timeline-row"><span>当前接收</span><strong>${formatDate(record.csrcCurrentReceivedDate)}</strong></div>
          <div class="timeline-row"><span>备案通知书</span><strong>${formatDate(record.noticeDate)}</strong></div>
        </div>
      </div>
      <div class="detail-item">
        <span>工作日 Business days</span>
        <div class="detail-days">
          <div><span>锚点至接收</span><strong>${formatNumber(record.businessDaysA1ToReceived)}</strong></div>
          <div><span>当前A1至当前接收</span><strong>${formatNumber(record.businessDaysCurrentA1ToReceived)}</strong></div>
          <div><span>接收至通知</span><strong>${formatNumber(record.businessDaysReceivedToNotice)}</strong></div>
          <div><span>递表至通知</span><strong>${formatNumber(record.businessDaysA1ToNotice)}</strong></div>
        </div>
      </div>
      <div class="detail-item">
        <span>发行人类型 Issuer type</span>
        <strong>${escapeHtml(record.structureType)}</strong>
      </div>
      <div class="detail-item">
        <span>A 股状态 / A1 日当天市值</span>
        <div>${escapeHtml(record.aShareStatus)}<div class="market-cap-detail">${formatMarketCap(record)}</div></div>
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

function switchView(view, updateLocation = true) {
  state.view = view;
  document.getElementById("viewTitle").textContent = viewTitles[view] || "追瑞";
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
      ? `初步自动收集，未人工复核，仅示例 · 生成时间 ${meta.generatedAt} · ${meta.marketCapNoteZh || ""}`
      : meta.disclaimerZh || meta.marketCapNoteZh || "";
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
  document.getElementById("issuerSearch").value = state.query;
  document.getElementById("dateField").value = state.dateField;
  document.getElementById("dateFrom").value = state.dateFrom;
  document.getElementById("dateTo").value = state.dateTo;
  document.getElementById("structureFilter").value = state.structure;
  document.getElementById("industryFilter").value = state.industry;
  document.getElementById("sponsorFilter").value = state.sponsor;
  document.getElementById("marketCapMin").value = state.marketCapMin;
  document.getElementById("marketCapMax").value = state.marketCapMax;
  document.getElementById("sortField").value = state.sortField;
  document.getElementById("sortDirection").textContent = state.sortDir === "asc" ? "升序" : "降序";
  document.querySelectorAll(".segment").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.status === state.status);
  });
}

function updateTracker(partial = {}, options = {}) {
  Object.assign(state, partial);
  if (options.resetPage !== false) state.page = 1;
  syncControls();
  syncUrl();
  renderRows();
}

async function loadData() {
  setLoading(true);
  try {
    const response = await fetch(DATA_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.data = await response.json();
  } catch (error) {
    state.data = emptyPayload(`无法读取 ${DATA_URL}，请检查本地 server。`);
  }
  applyStateFromUrl();
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

document.getElementById("issuerSearch").addEventListener("input", (event) => {
  updateTracker({ query: event.target.value });
});

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

document.getElementById("marketCapMin").addEventListener("input", (event) => {
  updateTracker({ marketCapMin: event.target.value });
});

document.getElementById("marketCapMax").addEventListener("input", (event) => {
  updateTracker({ marketCapMax: event.target.value });
});

document.getElementById("sortField").addEventListener("change", (event) => {
  updateTracker({ sortField: event.target.value });
});

document.getElementById("sortDirection").addEventListener("click", () => {
  updateTracker({ sortDir: state.sortDir === "asc" ? "desc" : "asc" });
});

document.getElementById("clearFilters").addEventListener("click", () => {
  Object.assign(state, {
    status: "all",
    query: "",
    dateField: "a1Date",
    dateFrom: "",
    dateTo: "",
    structure: "all",
    industry: "all",
    sponsor: "all",
    marketCapMin: "",
    marketCapMax: "",
    sortField: "a1Date",
    sortDir: "desc",
    page: 1
  });
  syncControls();
  syncUrl();
  renderRows();
});

document.getElementById("refreshButton").addEventListener("click", loadData);

loadData();
