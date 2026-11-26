/*!
 * YingSight Deal Structure Kit (YingSightDealDiagramKit v2.0)
 * Copyright (c) 2026 YingSight (https://www.ying-sight.com/). All rights reserved.
 * Proprietary & Non-Open-Source Compilation (Cap. 528 HK) — see /LICENSE & /llms.txt.
 * AI research retrieval & attributed citation/recommendation welcomed; code/schema cloning & commercial scraping prohibited.
 * UMD module: exposes window.YingSightDealDiagramKit (browser) and module.exports (CommonJS/Node).
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.YingSightDealDiagramKit = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const VERSION = "2.0.0";

  const VALID_MODALITIES = new Set([
    "in_kind",
    "cash",
    "shares",
    "cash_and_asset",
    "share_swap",
    "mixed",
  ]);
  const VALID_STATUSES = new Set(["closed", "active", "approved", "terminated"]);
  const VALID_NODE_ROLES = new Set([
    "buyer",
    "seller",
    "listed",
    "target",
    "public",
    "holdco",
    "creditor",
  ]);
  const VALID_LINK_STYLES = new Set(["solid", "dashed", "dotted"]);
  const VALID_FLOW_KINDS = new Set(["cash", "shares", "asset", "cancel"]);
  const VALID_FLOW_DIRECTIONS = new Set(["ltr", "rtl", "bi"]);
  const VALID_FILTERS = new Set(["all", "cash", "shares", "structural"]);

  const FONT_SANS =
    'Inter, -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Microsoft YaHei", sans-serif';
  const FONT_MONO =
    '"JetBrains Mono", "SFMono-Regular", ui-monospace, Menlo, Monaco, Consolas, monospace';

  const ROLE_META = {
    buyer: {
      labelZh: "买方 / 要约人",
      shortZh: "买方",
      fill: "#ffffff",
      stroke: "#c7d4e2",
      accent: "#0f3d5e",
      tagBg: "#eff4fa",
      tagFg: "#0f3d5e",
      dashed: false,
      doubleFrame: false,
    },
    seller: {
      labelZh: "卖方 / 原控股",
      shortZh: "卖方",
      fill: "#ffffff",
      stroke: "#dfd0b6",
      accent: "#8a541a",
      tagBg: "#fcf6e8",
      tagFg: "#7c4a15",
      dashed: false,
      doubleFrame: false,
    },
    listed: {
      labelZh: "上市主体",
      shortZh: "上市公司",
      fill: "#f7fafd",
      stroke: "#0f3d5e",
      accent: "#0f3d5e",
      tagBg: "#e6eff8",
      tagFg: "#0f3d5e",
      dashed: false,
      doubleFrame: true,
    },
    public: {
      labelZh: "计划 / 独立股东",
      shortZh: "公众股东",
      fill: "#fbfbfc",
      stroke: "#8d9aa8",
      accent: "#64748b",
      tagBg: "#f1f4f8",
      tagFg: "#475569",
      dashed: true,
      doubleFrame: false,
    },
    target: {
      labelZh: "标的 / 附属",
      shortZh: "标的资产",
      fill: "#ffffff",
      stroke: "#cbd5e1",
      accent: "#2b5b6c",
      tagBg: "#eef5f7",
      tagFg: "#2b5b6c",
      dashed: false,
      doubleFrame: false,
    },
    holdco: {
      labelZh: "控股主体",
      shortZh: "控股公司",
      fill: "#f4faf7",
      stroke: "#0d654d",
      accent: "#0d654d",
      tagBg: "#e3f3eb",
      tagFg: "#0d654d",
      dashed: false,
      doubleFrame: true,
    },
    creditor: {
      labelZh: "债权人 / 认购方",
      shortZh: "债权人",
      fill: "#fffafa",
      stroke: "#e2bfc3",
      accent: "#881b25",
      tagBg: "#fdf2f2",
      tagFg: "#881b25",
      dashed: false,
      doubleFrame: false,
    },
  };

  const MODALITY_BADGES = {
    in_kind: { labelZh: "非现金债务抵偿", shortZh: "非现金" },
    cash: { labelZh: "全现金 Cash", shortZh: "全现金" },
    shares: { labelZh: "发行代价股 Shares", shortZh: "代价股" },
    cash_and_asset: { labelZh: "现金+资产交割", shortZh: "现金+资产" },
    share_swap: { labelZh: "换股重组 Share Swap", shortZh: "换股重组" },
    mixed: { labelZh: "现金+股份混合 Mixed", shortZh: "混合对价" },
  };

  const STATUS_META = {
    closed: {
      labelZh: "已完成 / 生效",
      outcomeFill: "#eef7f1",
      outcomeStroke: "#b6d8c4",
      outcomeFg: "#0d654d",
      gateFill: "#0f3d5e",
    },
    active: {
      labelZh: "进行中 / 待文件",
      outcomeFill: "#eff4fa",
      outcomeStroke: "#bdd1e6",
      outcomeFg: "#1c3d6e",
      gateFill: "#1c3d6e",
    },
    approved: {
      labelZh: "股东已批准",
      outcomeFill: "#fcf6e8",
      outcomeStroke: "#e4cea0",
      outcomeFg: "#7c4a15",
      gateFill: "#7c4a15",
    },
    terminated: {
      labelZh: "协议已终止",
      outcomeFill: "#fdf2f2",
      outcomeStroke: "#e2adb2",
      outcomeFg: "#881b25",
      gateFill: "#991b1b",
    },
  };

  const FLOW_KIND_META = {
    cash: {
      labelZh: "现金",
      group: "cash",
      color: "#0d654d",
      pillBg: "#ffffff",
      pillStroke: "#0d654d",
      stepBg: "#0d654d",
    },
    shares: {
      labelZh: "股权/换股",
      group: "shares",
      color: "#1c3d6e",
      pillBg: "#ffffff",
      pillStroke: "#1c3d6e",
      stepBg: "#1c3d6e",
    },
    asset: {
      labelZh: "资产/股权交付",
      group: "structural",
      color: "#8a541a",
      pillBg: "#ffffff",
      pillStroke: "#8a541a",
      stepBg: "#8a541a",
    },
    cancel: {
      labelZh: "注销/退市",
      group: "structural",
      color: "#475569",
      pillBg: "#ffffff",
      pillStroke: "#475569",
      stepBg: "#475569",
    },
  };

  const FILTER_BUTTONS = [
    { key: "all", labelZh: "全部流向" },
    { key: "cash", labelZh: "现金对价流" },
    { key: "shares", labelZh: "股权·换股" },
    { key: "structural", labelZh: "股权·资产变更" },
  ];

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function hasForbiddenToken(str) {
    return /\b(NaN|undefined|Infinity)\b/.test(str);
  }

  function assertNonEmptyString(val, path) {
    if (typeof val !== "string" || !val.trim()) {
      throw new Error(`Invalid DiagramSpec: ${path} must be a non-empty string`);
    }
    if (hasForbiddenToken(val)) {
      throw new Error(`Invalid DiagramSpec: ${path} contains forbidden literal (${val})`);
    }
  }

  function assertOptionalString(val, path) {
    if (val === undefined || val === null) return;
    if (typeof val !== "string") {
      throw new Error(`Invalid DiagramSpec: ${path} must be a string when provided`);
    }
    if (hasForbiddenToken(val)) {
      throw new Error(`Invalid DiagramSpec: ${path} contains forbidden literal (${val})`);
    }
  }

  function cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function charVisualUnits(ch) {
    const code = ch.charCodeAt(0);
    if (code >= 0x2e80 && code <= 0x9fff) return 1.0;
    if (code >= 0xff00 && code <= 0xffef) return 1.0;
    if (ch === " " || ch === "." || ch === ":" || ch === "·") return 0.35;
    if (ch === "%") return 0.88;
    if (ch === "≥" || ch === "≤" || ch === ">" || ch === "<" || ch === "+" || ch === "=" || ch === "≈") return 0.8;
    if (ch === "–" || ch === "—") return 0.65;
    if (ch >= "A" && ch <= "Z") return 0.7;
    return 0.57;
  }

  function measureTextUnits(str) {
    let units = 0;
    for (const ch of String(str || "")) units += charVisualUnits(ch);
    return units;
  }

  function truncateVisual(str, maxUnits) {
    const text = String(str || "").trim();
    if (measureTextUnits(text) <= maxUnits) return text;
    let acc = 0;
    let out = "";
    for (const ch of text) {
      const w = charVisualUnits(ch);
      if (acc + w > maxUnits - 1.1) return out.trim() + "…";
      out += ch;
      acc += w;
    }
    return out;
  }

  function wrapSvgText(text, maxUnits, maxLines) {
    const clean = String(text || "").trim();
    if (!clean) return [];
    if (measureTextUnits(clean) <= maxUnits) return [clean];
    const lines = [];
    let current = "";
    let units = 0;
    const tokens = clean.match(/[A-Za-z0-9.%:+/()-]+|\s+|./g) || [];
    for (let i = 0; i < tokens.length; i++) {
      const tok = tokens[i];
      const tw = measureTextUnits(tok);
      if (units + tw <= maxUnits || !current) {
        current += tok;
        units += tw;
      } else {
        lines.push(truncateVisual(current.trim(), maxUnits));
        if (lines.length === maxLines - 1) {
          const rest = tokens.slice(i).join("").trim();
          if (rest) lines.push(truncateVisual(rest, maxUnits));
          return lines.slice(0, maxLines);
        }
        current = tok.trimStart();
        units = measureTextUnits(current);
      }
    }
    if (current.trim()) {
      lines.push(truncateVisual(current.trim(), maxUnits));
    }
    return lines.slice(0, maxLines);
  }

  function formatChineseMoney(value, currency, approximate) {
    const num = Number(value);
    if (!Number.isFinite(num)) return "";
    const n = Math.abs(num);
    const [scale, suffix, digits] = n >= 1e8 ? [1e8,"亿",1] : n >= 1e4 ? [1e4,"万",1] : [1,"",Math.max(2,(String(num).split(".")[1] || "").length)];
    const prefix = `${approximate ? "约 " : ""}${currency ? currency + " " : ""}`;
    return `${prefix}${(num / scale).toLocaleString("en-US", {maximumFractionDigits:digits})}${suffix}`;
  }

  function formatChineseShares(value) {
    const num = Number(value);
    if (!Number.isFinite(num)) return "";
    if (num >= 1e8) {
      const yi = num / 1e8;
      return `${yi.toLocaleString("en-US", { maximumFractionDigits: 1 })}亿股`;
    }
    if (num >= 1e4) {
      const wan = num / 1e4;
      return `${wan.toLocaleString("en-US", { maximumFractionDigits: 1 })}万股`;
    }
    return `${Math.round(num).toLocaleString("en-US")}股`;
  }

  function formatTermExact(term) {
    if (!term || !Number.isFinite(Number(term.value))) return "";
    if (term.unit === "money") {
      const num = Number(term.value);
      const hasFrac = Math.abs(num - Math.round(num)) > 1e-6;
      const dec = hasFrac ? Math.max(2, Number.isInteger(term.precision) ? term.precision : 2) : 0;
      const prefix = `${term.approximate ? "约 " : ""}${term.currency ? term.currency + " " : ""}`;
      return `${prefix}${num.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec })}`;
    }
    return formatTermBrief(term);
  }

  function formatTermBrief(term) {
    if (!term || !Number.isFinite(Number(term.value))) return "";
    if (term.unit === "money") {
      return formatChineseMoney(term.value, term.currency || "", Boolean(term.approximate));
    }
    if (term.unit === "per_share") {
      const [coefficient, exponent] = String(term.value).toLowerCase().split("e");
      const decimals = Math.max(2, (coefficient.split(".")[1]?.length || 0) - Number(exponent || 0));
      return `${term.approximate ? "约 " : ""}${term.currency ? term.currency + " " : ""}${Number(term.value).toLocaleString("en-US", {minimumFractionDigits:2,maximumFractionDigits:decimals})}/股`;
    }
    if (term.unit === "shares") {
      return formatChineseShares(term.value);
    }
    if (term.unit === "ratio") {
      const decimals = Number.isInteger(term.precision) ? term.precision : 2;
      return `1 : ${Number(term.value).toFixed(decimals)}`;
    }
    if (term.unit === "percent") {
      const decimals = Number.isInteger(term.precision) ? term.precision : 2;
      return `${Number(term.value).toFixed(decimals)}%`;
    }
    return String(term.value);
  }

  function formatDdkRuleShort(code, label) {
    const rawLabel = String(label || "").trim();
    const rawCode = String(code || "").trim();
    const rangeMatch = rawLabel.match(/([0-9]+[A-Za-z]?(?:\.[0-9A-Za-z()]+)*\s*[–-]\s*[0-9]+[A-Za-z]?(?:\.[0-9A-Za-z()]+)*)/);
    if (rangeMatch && /^HKEX:/i.test(rawCode)) return `LR ${rangeMatch[1].replace(/\s+/g, "")}`;
    if (/^HKEX:/i.test(rawCode)) {
      const rest = rawCode.slice(5);
      return /^PN/i.test(rest) ? rest : `LR ${rest}`;
    }
    if (/^TC:/i.test(rawCode)) return `TC ${rawCode.slice(3)}`;
    if (/^AU:CorpsAct:/i.test(rawCode)) return `AU ${rawCode.split(":").pop()}`;
    return rawCode || rawLabel;
  }

  function formatArrowRuleSubline(rules, fallbackCodes, prefix) {
    const pfx = prefix || "适用规则：";
    const items = [];
    const seen = new Set();
    const pushItem = (txt) => {
      const clean = String(txt || "").trim();
      if (clean && !seen.has(clean)) {
        seen.add(clean);
        items.push(clean);
      }
    };
    if (Array.isArray(rules) && rules.length) {
      for (const r of rules) pushItem(formatDdkRuleShort(r?.code, r?.label));
    }
    if (!items.length && Array.isArray(fallbackCodes)) {
      for (const c of fallbackCodes) pushItem(formatDdkRuleShort(c, ""));
    }
    if (!items.length) return `${pfx}上市规则第14章`;
    if (items.length <= 2) return `${pfx}${items.join(" · ")}`;
    return `${pfx}${items.slice(0, 2).join(" · ")} 等 ${items.length} 项`;
  }

  /* =========================================================================
     1. 2D SVG PITCHBOOK PRIMITIVE ENGINE (`primitives`)
     ========================================================================= */
  const MASTER_W = 1080;
  const LEFT_PANEL = { x: 16, y: 14, w: 616 };
  const RIGHT_PANEL = { x: 684, y: 14, w: 380 };
  const GATE_X = 658;

  function createDiagramCanvas(opts) {
    const cfg = opts && typeof opts === "object" ? opts : {};
    const width = Number.isFinite(cfg.width) ? cfg.width : MASTER_W;
    const height = Number.isFinite(cfg.height) ? cfg.height : 460;
    const leftW = Number.isFinite(cfg.leftWidth) ? cfg.leftWidth : LEFT_PANEL.w;
    const rightX = Number.isFinite(cfg.rightX) ? cfg.rightX : RIGHT_PANEL.x;
    const rightW = Number.isFinite(cfg.rightWidth) ? cfg.rightWidth : RIGHT_PANEL.w;
    const panelH = height - 28;
    const status = VALID_STATUSES.has(cfg.status)
      ? cfg.status
      : cfg.terminated
        ? "terminated"
        : "closed";

    return {
      width,
      height,
      status,
      terminated: Boolean(cfg.terminated || status === "terminated"),
      leftTitle: cfg.leftTitle || "交易结构与流向",
      rightTitle: cfg.rightTitle || "交易后股权架构",
      transitionLabel: cfg.transitionLabel || (cfg.terminated ? "协议终止" : "交割后"),
      outcomeBadge: cfg.outcomeBadge || "",
      terminatedBanner: cfg.terminatedBanner || "",
      leftPanel: { x: LEFT_PANEL.x, y: LEFT_PANEL.y, w: leftW, h: panelH },
      rightPanel: { x: rightX, y: RIGHT_PANEL.y, w: rightW, h: panelH },
      gateX: Math.round((LEFT_PANEL.x + leftW + rightX) / 2),
      boxes: [],
      ownershipEdges: [],
      txArrows: [],
    };
  }

  function resolveBoxAnchor(box, side, offsetRatio) {
    const ratio = Number.isFinite(offsetRatio) ? offsetRatio : 0.5;
    if (side === "top") return [box.x + box.w * ratio, box.y];
    if (side === "bottom") return [box.x + box.w * ratio, box.y + box.h];
    if (side === "left") return [box.x, box.y + box.h * ratio];
    if (side === "right") return [box.x + box.w, box.y + box.h * ratio];
    return [box.x + box.w / 2, box.y + box.h / 2];
  }

  function drawEntityBox(opts) {
    const cfg = opts && typeof opts === "object" ? opts : {};
    const styleKey = VALID_NODE_ROLES.has(cfg.style || cfg.role)
      ? cfg.style || cfg.role
      : "target";
    const meta = ROLE_META[styleKey];
    const x = Number(cfg.x);
    const y = Number(cfg.y);
    const w = Number(cfg.w);
    const h = Number(cfg.h);
    const title = String(cfg.title || cfg.name || "");
    const subtitle = cfg.subtitle ? String(cfg.subtitle) : "";
    const badge = cfg.badge ? String(cfg.badge) : "";
    const code = cfg.code ? String(cfg.code) : "";
    const jurisdiction = cfg.jurisdiction ? String(cfg.jurisdiction) : "";
    const roleLabel = cfg.roleLabel ? String(cfg.roleLabel) : meta.shortZh;

    const tagUnits = measureTextUnits(roleLabel);
    const tagW = Math.max(36, Math.round(tagUnits * 10 + 14));
    const rightChip = code || jurisdiction;
    const chipW = rightChip ? Math.max(38, Math.round(measureTextUnits(rightChip) * 9.5 + 12)) : 0;

    const maxTitleUnits = Math.max(8, (w - 22) / 12.7);
    const titleLines = wrapSvgText(title, maxTitleUnits, 2);
    const maxSubUnits = Math.max(8, (w - 22) / 10.4);
    const subText = subtitle ? truncateVisual(subtitle, maxSubUnits) : "";

    const strokeDash = meta.dashed ? ' stroke-dasharray="5 3"' : "";
    const strokeW = meta.doubleFrame ? "1.5" : "1.1";

    let svg = `<g class="ddk-svg-box is-role-${escapeHtml(styleKey)}" data-ddk-box="${escapeHtml(cfg.id || "")}" data-ddk-bbox="${x},${y},${w},${h}">`;
    // Outer frame
    svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${meta.fill}" stroke="${meta.stroke}" stroke-width="${strokeW}"${strokeDash} />`;
    if (meta.doubleFrame) {
      svg += `<rect x="${x + 3.5}" y="${y + 3.5}" width="${w - 7}" height="${h - 7}" rx="2.5" fill="none" stroke="${meta.accent}" stroke-opacity="0.28" stroke-width="0.9" />`;
    } else {
      // Crisp vertical inner accent bar (zero top corner horns)
      svg += `<rect x="${x + 1}" y="${y + 1}" width="3.5" height="${h - 2}" rx="1.5" fill="${meta.accent}" />`;
    }

    // Header micro-row: Role tag + right-aligned code/jurisdiction
    const headY = y + 8;
    const leftPad = x + 11;
    svg += `<rect x="${leftPad}" y="${headY}" width="${tagW}" height="16" rx="2" fill="${meta.tagBg}" />`;
    svg += `<text x="${leftPad + tagW / 2}" y="${headY + 11.5}" text-anchor="middle" font-family="${escapeHtml(FONT_SANS)}" font-size="9.5" font-weight="700" fill="${meta.tagFg}">${escapeHtml(roleLabel)}</text>`;

    if (rightChip) {
      const chipX = x + w - 9 - chipW;
      const chipFill = code ? "#ffffff" : "#f1f1ec";
      const chipStroke = code ? "#b8cce0" : "#e2e5e9";
      const chipFg = code ? "#0f3d5e" : "#5b6673";
      svg += `<rect x="${chipX}" y="${headY}" width="${chipW}" height="16" rx="2" fill="${chipFill}" stroke="${chipStroke}" stroke-width="0.9" />`;
      svg += `<text x="${chipX + chipW / 2}" y="${headY + 11.5}" text-anchor="middle" font-family="${escapeHtml(code ? FONT_MONO : FONT_SANS)}" font-size="9.5" font-weight="600" fill="${chipFg}">${escapeHtml(rightChip)}</text>`;
    }

    // Main title (1 or 2 lines)
    const titleBaseY =
      titleLines.length === 1
        ? h <= 72
          ? y + 40
          : y + 44
        : y + 38;
    titleLines.forEach((line, idx) => {
      svg += `<text x="${leftPad}" y="${titleBaseY + idx * 15}" font-family="${escapeHtml(FONT_SANS)}" font-size="12.5" font-weight="700" fill="#0f172a">${escapeHtml(line)}</text>`;
    });

    // Subtitle / bottom badge
    const footY = y + h - 11;
    if (subText) {
      svg += `<text x="${leftPad}" y="${footY}" font-family="${escapeHtml(FONT_SANS)}" font-size="10.2" font-weight="400" fill="#5b6673">${escapeHtml(subText)}</text>`;
    } else if (badge) {
      const bW = Math.min(w - 22, Math.max(48, Math.round(measureTextUnits(badge) * 9.5 + 14)));
      svg += `<rect x="${leftPad}" y="${y + h - 22}" width="${bW}" height="15" rx="2" fill="#fafaf7" stroke="#d5dce4" stroke-width="0.8" />`;
      svg += `<text x="${leftPad + bW / 2}" y="${y + h - 11.5}" text-anchor="middle" font-family="${escapeHtml(FONT_SANS)}" font-size="9.5" font-weight="600" fill="#334155">${escapeHtml(truncateVisual(badge, (bW - 8) / 9.5))}</text>`;
    }

    if (badge && subText && w >= 164 && !rightChip) {
      const bW = Math.max(42, Math.round(measureTextUnits(badge) * 9 + 12));
      const bX = x + w - 9 - bW;
      svg += `<rect x="${bX}" y="${headY}" width="${bW}" height="16" rx="2" fill="#fafaf7" stroke="#d5dce4" stroke-width="0.8" />`;
      svg += `<text x="${bX + bW / 2}" y="${headY + 11.5}" text-anchor="middle" font-family="${escapeHtml(FONT_SANS)}" font-size="9.2" font-weight="600" fill="#334155">${escapeHtml(badge)}</text>`;
    }

    svg += "</g>";
    return {
      id: cfg.id || "",
      panel: cfg.panel || "left",
      role: styleKey,
      x,
      y,
      w,
      h,
      title,
      subtitle,
      badge,
      code,
      jurisdiction,
      svg,
    };
  }

  function buildArrowheadPolygon(x1, y1, x2, y2, size) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;
    const px = -uy;
    const py = ux;
    const tipX = x2;
    const tipY = y2;
    const baseX = x2 - ux * size;
    const baseY = y2 - uy * size;
    const halfW = size * 0.52;
    const p1x = (baseX + px * halfW).toFixed(1);
    const p1y = (baseY + py * halfW).toFixed(1);
    const p2x = (baseX - px * halfW).toFixed(1);
    const p2y = (baseY - py * halfW).toFixed(1);
    return `${tipX.toFixed(1)},${tipY.toFixed(1)} ${p1x},${p1y} ${p2x},${p2y}`;
  }

  function buildRoundedOrthogonalPath(points, radius) {
    if (!points || points.length < 2) return "";
    if (points.length === 2) {
      return `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)} L ${points[1][0].toFixed(1)} ${points[1][1].toFixed(1)}`;
    }
    const r = Number.isFinite(radius) ? radius : 8;
    let d = `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
    for (let i = 1; i < points.length - 1; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];
      const d1 = Math.hypot(curr[0] - prev[0], curr[1] - prev[1]);
      const d2 = Math.hypot(next[0] - curr[0], next[1] - curr[1]);
      const cr = Math.min(r, d1 / 2, d2 / 2);
      if (cr < 1) {
        d += ` L ${curr[0].toFixed(1)} ${curr[1].toFixed(1)}`;
        continue;
      }
      const p1x = curr[0] - ((curr[0] - prev[0]) / d1) * cr;
      const p1y = curr[1] - ((curr[1] - prev[1]) / d1) * cr;
      const p2x = curr[0] + ((next[0] - curr[0]) / d2) * cr;
      const p2y = curr[1] + ((next[1] - curr[1]) / d2) * cr;
      d += ` L ${p1x.toFixed(1)} ${p1y.toFixed(1)} Q ${curr[0].toFixed(1)} ${curr[1].toFixed(1)} ${p2x.toFixed(1)} ${p2y.toFixed(1)}`;
    }
    const last = points[points.length - 1];
    d += ` L ${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
    return d;
  }

  function drawOwnershipEdge(opts) {
    const cfg = opts && typeof opts === "object" ? opts : {};
    const fromBox = cfg.fromBox;
    const toBox = cfg.toBox;
    const start =
      Array.isArray(cfg.startPoint)
        ? cfg.startPoint
        : resolveBoxAnchor(fromBox, cfg.anchorFrom || "bottom", cfg.anchorFromRatio ?? 0.5);
    const end =
      Array.isArray(cfg.endPoint)
        ? cfg.endPoint
        : resolveBoxAnchor(toBox, cfg.anchorTo || "top", cfg.anchorToRatio ?? 0.5);
    const dashed = Boolean(cfg.dashed);
    const strokeColor = dashed ? "#64748b" : "#1c3d6e";
    const dashAttr = dashed ? ' stroke-dasharray="4 3"' : "";

    let points;
    if (Array.isArray(cfg.pathPoints) && cfg.pathPoints.length >= 2) {
      points = cfg.pathPoints;
    } else if (Math.abs(start[0] - end[0]) < 2) {
      points = [start, end];
    } else {
      const midY = Number.isFinite(cfg.midY) ? cfg.midY : (start[1] + end[1]) / 2;
      points = [start, [start[0], midY], [end[0], midY], end];
    }

    // Shorten final tip slightly so polygon arrowhead sits flush against target box
    const drawPoints = points.map((p) => [p[0], p[1]]);
    const lastIdx = drawPoints.length - 1;
    const prevPt = drawPoints[lastIdx - 1];
    const endPt = drawPoints[lastIdx];
    const segLen = Math.hypot(endPt[0] - prevPt[0], endPt[1] - prevPt[1]) || 1;
    const inset = Math.min(6, segLen * 0.4);
    drawPoints[lastIdx] = [
      endPt[0] - ((endPt[0] - prevPt[0]) / segLen) * inset,
      endPt[1] - ((endPt[1] - prevPt[1]) / segLen) * inset,
    ];

    const pathD = buildRoundedOrthogonalPath(drawPoints, 6);
    const arrowPoly = buildArrowheadPolygon(prevPt[0], prevPt[1], endPt[0], endPt[1], 7);

    let pillRect = null;
    let pillSvg = "";
    if (cfg.pctLabel) {
      const label = String(cfg.pctLabel);
      const pillW = Number.isFinite(cfg.pillWidth)
        ? cfg.pillWidth
        : Math.max(66, Math.round(measureTextUnits(label) * 10.6 + 18));
      const pillH = Number.isFinite(cfg.pillHeight) ? cfg.pillHeight : 22;
      const centerX = Array.isArray(cfg.labelCenter)
        ? cfg.labelCenter[0]
        : (start[0] + end[0]) / 2;
      const centerY = Array.isArray(cfg.labelCenter)
        ? cfg.labelCenter[1]
        : (start[1] + end[1]) / 2;
      const px = Math.round(centerX - pillW / 2);
      const py = Math.round(centerY - pillH / 2);
      pillRect = {
        id: `${cfg.id || "edge"}_pill`,
        kind: "ownership",
        x: px,
        y: py,
        w: pillW,
        h: pillH,
        text: label,
      };
      pillSvg =
        `<rect x="${px}" y="${py}" width="${pillW}" height="${pillH}" rx="11" fill="#ffffff" stroke="${strokeColor}" stroke-width="1"${dashAttr} />` +
        `<text x="${px + pillW / 2}" y="${py + pillH / 2 + 3.6}" text-anchor="middle" font-family="${escapeHtml(FONT_SANS)}" font-size="10.2" font-weight="650" fill="${strokeColor}">${escapeHtml(label)}</text>`;
    }

    const svg =
      `<g class="ddk-svg-edge${dashed ? " is-dashed" : ""}" data-ddk-edge="${escapeHtml(cfg.id || "")}">` +
      `<path d="${pathD}" fill="none" stroke="${strokeColor}" stroke-width="1.6"${dashAttr} stroke-linecap="round" />` +
      `<polygon points="${arrowPoly}" fill="${strokeColor}" />` +
      pillSvg +
      `</g>`;

    return {
      id: cfg.id || "",
      panel: cfg.panel || "left",
      from: fromBox?.id || cfg.from || "",
      to: toBox?.id || cfg.to || "",
      dashed,
      pctLabel: cfg.pctLabel || "",
      pathPoints: points,
      pillRect,
      svg,
    };
  }

  function drawTxArrow(opts) {
    const cfg = opts && typeof opts === "object" ? opts : {};
    const kind = VALID_FLOW_KINDS.has(cfg.kind) ? cfg.kind : "cash";
    const meta = FLOW_KIND_META[kind];
    const terminated = Boolean(cfg.terminated);
    const bidirectional = Boolean(cfg.bidirectional);
    const points = Array.isArray(cfg.pathPoints) ? cfg.pathPoints : [];
    if (points.length < 2) {
      throw new Error(`drawTxArrow(${cfg.id || ""}) requires at least 2 pathPoints`);
    }

    const color = terminated ? "#991b1b" : meta.color;
    const dashAttr = terminated ? ' stroke-dasharray="6 4"' : "";

    // Trim endpoints slightly so inline arrowheads meet box edges cleanly
    const drawPoints = points.map((p) => [p[0], p[1]]);
    const first = drawPoints[0];
    const second = drawPoints[1];
    const lastIdx = drawPoints.length - 1;
    const penult = drawPoints[lastIdx - 1];
    const last = drawPoints[lastIdx];

    const endLen = Math.hypot(last[0] - penult[0], last[1] - penult[1]) || 1;
    const endInset = Math.min(7, endLen * 0.4);
    drawPoints[lastIdx] = [
      last[0] - ((last[0] - penult[0]) / endLen) * endInset,
      last[1] - ((last[1] - penult[1]) / endLen) * endInset,
    ];

    let startCapSvg = "";
    if (bidirectional) {
      const startLen = Math.hypot(second[0] - first[0], second[1] - first[1]) || 1;
      const startInset = Math.min(7, startLen * 0.4);
      drawPoints[0] = [
        first[0] + ((second[0] - first[0]) / startLen) * startInset,
        first[1] + ((second[1] - first[1]) / startLen) * startInset,
      ];
      const revPoly = buildArrowheadPolygon(second[0], second[1], first[0], first[1], 8.5);
      startCapSvg = `<polygon points="${revPoly}" fill="${color}" />`;
    } else {
      startCapSvg = `<circle cx="${first[0].toFixed(1)}" cy="${first[1].toFixed(1)}" r="3.4" fill="${color}" />`;
    }

    const endPoly = buildArrowheadPolygon(penult[0], penult[1], last[0], last[1], 8.5);
    const pathD = buildRoundedOrthogonalPath(drawPoints, Number.isFinite(cfg.radius) ? cfg.radius : 10);

    // Halo pill for crisp zero-clutter readability
    let pillRect = null;
    let pillSvg = "";
    if (cfg.label) {
      const label = String(cfg.label);
      const sublabel = cfg.sublabel ? String(cfg.sublabel) : "";
      const rawStep = cfg.step ? String(cfg.step) : "";
      const stepMap = { "①": "1", "②": "2", "③": "3", "④": "4", "⑤": "5" };
      const step = stepMap[rawStep] || rawStep;
      const autoPadX = sublabel ? (step ? 40 : 20) : (step ? 35 : 16);
      const autoW = sublabel
        ? Math.max(
            measureTextUnits(label) * 11.5 + autoPadX,
            measureTextUnits(sublabel) * 10.1 + autoPadX
          )
        : measureTextUnits(label) * (step ? 11.1 : 10.5) + autoPadX;
      const pillW = Number.isFinite(cfg.labelWidth)
        ? cfg.labelWidth
        : Math.max(52, Math.round(autoW));
      const pillH = Number.isFinite(cfg.labelHeight)
        ? cfg.labelHeight
        : sublabel
          ? 44
          : 26;

      // Default center: midpoint of middle path segment
      const midSegIdx = Math.floor((points.length - 1) / 2);
      const defCx = (points[midSegIdx][0] + points[midSegIdx + 1][0]) / 2;
      const defCy = (points[midSegIdx][1] + points[midSegIdx + 1][1]) / 2;
      const cx = Array.isArray(cfg.labelCenter) ? cfg.labelCenter[0] : defCx;
      const cy = Array.isArray(cfg.labelCenter) ? cfg.labelCenter[1] : defCy;
      const px = Math.round(cx - pillW / 2);
      const py = Math.round(cy - pillH / 2);

      pillRect = {
        id: `${cfg.id || "arrow"}_pill`,
        kind: "tx",
        x: px,
        y: py,
        w: pillW,
        h: pillH,
        text: `${label} ${sublabel}`.trim(),
      };

      const pillFill = terminated ? "#fffafa" : "#ffffff";
      const pillDash = terminated ? ' stroke-dasharray="4 3"' : "";

      // White outer halo to cleanly mask underlying line crossing
      pillSvg += `<rect x="${px - 2}" y="${py - 2}" width="${pillW + 4}" height="${pillH + 4}" rx="6" fill="#fafaf7" fill-opacity="0.92" />`;
      pillSvg += `<rect x="${px}" y="${py}" width="${pillW}" height="${pillH}" rx="4" fill="${pillFill}" stroke="${color}" stroke-width="1.2"${pillDash} />`;

      if (sublabel) {
        const availW = pillW - (step ? 39 : 18);
        const line1Max = Math.max(5, availW / 11.45);
        const line2Max = Math.max(6, availW / 10.05);
        const line1 = truncateVisual(label, line1Max);
        const line2 = truncateVisual(sublabel, line2Max);
        if (step) {
          const sx = px + 15;
          const sy = py + 15;
          pillSvg += `<circle cx="${sx}" cy="${sy}" r="8.5" fill="${color}" />`;
          pillSvg += `<text x="${sx}" y="${sy + 3.4}" text-anchor="middle" font-family="${escapeHtml(FONT_SANS)}" font-size="9.5" font-weight="700" fill="#ffffff">${escapeHtml(step)}</text>`;
          pillSvg += `<text x="${px + 29}" y="${py + 18.5}" font-family="${escapeHtml(FONT_SANS)}" font-size="11.2" font-weight="700" fill="${color}">${escapeHtml(line1)}</text>`;
        } else {
          pillSvg += `<text x="${px + pillW / 2}" y="${py + 18.5}" text-anchor="middle" font-family="${escapeHtml(FONT_SANS)}" font-size="11.2" font-weight="700" fill="${color}">${escapeHtml(line1)}</text>`;
        }
        pillSvg += `<text x="${px + (step ? 29 : pillW / 2)}" y="${py + 35}" ${step ? "" : 'text-anchor="middle" '}font-family="${escapeHtml(FONT_SANS)}" font-size="9.8" font-weight="500" fill="#475569">${escapeHtml(line2)}</text>`;
      } else {
        const availW = pillW - (step ? 34 : 12);
        const line1Max = Math.max(3, availW / (step ? 11.05 : 10.45));
        const line1 = truncateVisual(label, line1Max);
        if (step) {
          const sx = px + 13;
          const sy = py + pillH / 2;
          pillSvg += `<circle cx="${sx}" cy="${sy}" r="7.5" fill="${color}" />`;
          pillSvg += `<text x="${sx}" y="${sy + 3.2}" text-anchor="middle" font-family="${escapeHtml(FONT_SANS)}" font-size="9" font-weight="700" fill="#ffffff">${escapeHtml(step)}</text>`;
          pillSvg += `<text x="${px + 25}" y="${py + pillH / 2 + 3.8}" font-family="${escapeHtml(FONT_SANS)}" font-size="10.8" font-weight="700" fill="${color}">${escapeHtml(line1)}</text>`;
        } else {
          pillSvg += `<text x="${px + pillW / 2}" y="${py + pillH / 2 + 3.6}" text-anchor="middle" font-family="${escapeHtml(FONT_SANS)}" font-size="10.2" font-weight="700" fill="${color}">${escapeHtml(line1)}</text>`;
        }
      }
    }

    const svg =
      `<g class="ddk-tx-arrow is-kind-${escapeHtml(kind)}${terminated ? " is-terminated" : ""}" data-ddk-flow-kind="${escapeHtml(kind)}" data-ddk-flow-group="${escapeHtml(meta.group)}" data-flow-kind="${escapeHtml(kind)}" data-ddk-arrow="${escapeHtml(cfg.id || "")}">` +
      `<path d="${pathD}" fill="none" stroke="${color}" stroke-width="2.1"${dashAttr} stroke-linecap="round" stroke-linejoin="round" />` +
      startCapSvg +
      `<polygon points="${endPoly}" fill="${color}" />` +
      pillSvg +
      `</g>`;

    return {
      id: cfg.id || "",
      panel: cfg.panel || "left",
      kind,
      group: meta.group,
      terminated,
      bidirectional,
      step: cfg.step || "",
      label: cfg.label || "",
      sublabel: cfg.sublabel || "",
      pathPoints: points,
      pillRect,
      svg,
    };
  }

  /* =========================================================================
     2. MATHEMATICAL GEOMETRY LINTER (`lintDiagramGeometry`)
     ========================================================================= */
  function rectsOverlap(a, b, margin) {
    const m = Number.isFinite(margin) ? margin : 0;
    return !(
      a.x + a.w + m <= b.x ||
      b.x + b.w + m <= a.x ||
      a.y + a.h + m <= b.y ||
      b.y + b.h + m <= a.y
    );
  }

  function rectClearance(a, b) {
    const dx = Math.max(0, b.x - (a.x + a.w), a.x - (b.x + b.w));
    const dy = Math.max(0, b.y - (a.y + a.h), a.y - (b.y + b.h));
    if (dx === 0 && dy === 0) return -1;
    return Math.max(dx, dy);
  }

  function checkFiniteRect(rect, label, width, height, errors) {
    for (const k of ["x", "y", "w", "h"]) {
      if (typeof rect[k] !== "number" || !Number.isFinite(rect[k])) {
        errors.push(`Non-finite ${k} on ${label}`);
        return false;
      }
    }
    if (rect.w <= 0 || rect.h <= 0) {
      errors.push(`Non-positive dimensions on ${label}`);
      return false;
    }
    if (rect.x < 0 || rect.y < 0 || rect.x + rect.w > width || rect.y + rect.h > height) {
      errors.push(
        `Out of viewBox (${width}x${height}): ${label} [${rect.x},${rect.y},${rect.w},${rect.h}]`
      );
      return false;
    }
    return true;
  }

  function lintDiagramGeometry(svgOrLayout) {
    const errors = [];

    if (typeof svgOrLayout === "string") {
      if (hasForbiddenToken(svgOrLayout)) {
        errors.push("Rendered SVG contains NaN/undefined/Infinity literal");
      }
      const vbMatch = svgOrLayout.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
      if (!vbMatch) {
        errors.push("SVG missing valid viewBox");
        return { ok: false, errors, stats: { boxCount: 0, pillCount: 0 } };
      }
      const width = Number(vbMatch[1]);
      const height = Number(vbMatch[2]);
      const boxes = [];
      const boxRe = /data-ddk-box="([^"]*)"\s+data-ddk-bbox="([^"]+)"/g;
      let m;
      while ((m = boxRe.exec(svgOrLayout)) !== null) {
        const [x, y, w, h] = m[2].split(",").map(Number);
        const r = { id: m[1], x, y, w, h };
        checkFiniteRect(r, `box:${r.id}`, width, height, errors);
        boxes.push(r);
      }
      for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
          if (rectsOverlap(boxes[i], boxes[j], 18)) {
            errors.push(`Box overlap (<18px gap): ${boxes[i].id} vs ${boxes[j].id}`);
          }
        }
      }
      return { ok: errors.length === 0, errors, stats: { boxCount: boxes.length, pillCount: 0 } };
    }

    const layout =
      svgOrLayout && svgOrLayout.topology ? svgOrLayout.topology : svgOrLayout;
    if (!layout || typeof layout !== "object") {
      return {
        ok: false,
        errors: ["lintDiagramGeometry requires a layout, DiagramSpec, or SVG string"],
        stats: { boxCount: 0, edgeCount: 0, arrowCount: 0, pillCount: 0 },
      };
    }

    const width = Number(layout.width);
    const height = Number(layout.height);
    if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
      errors.push("Layout width and height must be positive finite numbers");
      return { ok: false, errors, stats: { boxCount: 0, edgeCount: 0, arrowCount: 0, pillCount: 0 } };
    }

    const boxes = Array.isArray(layout.boxes) ? layout.boxes : [];
    const edges = Array.isArray(layout.ownershipEdges) ? layout.ownershipEdges : [];
    const arrows = Array.isArray(layout.txArrows) ? layout.txArrows : [];
    const leftSafe = layout.leftPanel
      ? {
          x1: layout.leftPanel.x + 6,
          y1: layout.leftPanel.y + (layout.terminatedBanner ? 72 : 34),
          x2: layout.leftPanel.x + layout.leftPanel.w - 6,
          y2: layout.leftPanel.y + layout.leftPanel.h - 6,
        }
      : null;
    const rightSafe = layout.rightPanel
      ? {
          x1: layout.rightPanel.x + 6,
          y1: layout.rightPanel.y + 34,
          x2: layout.rightPanel.x + layout.rightPanel.w - 6,
          y2: layout.rightPanel.y + layout.rightPanel.h - (layout.outcomeBadge ? 50 : 6),
        }
      : null;

    function checkPanelSafe(rect, panelName, label) {
      const safe = panelName === "left" ? leftSafe : panelName === "right" ? rightSafe : null;
      if (!safe) return;
      if (rect.x < safe.x1 || rect.y < safe.y1 || rect.x + rect.w > safe.x2 || rect.y + rect.h > safe.y2) {
        errors.push(
          `Panel bounds violation (${panelName}): ${label} [${rect.x},${rect.y},${rect.w},${rect.h}] outside [${safe.x1},${safe.y1}..${safe.x2},${safe.y2}]`
        );
      }
    }

    // 1. Validate box bounds, panel safe-zone & text hygiene
    for (const box of boxes) {
      if (checkFiniteRect(box, `box:${box.id}`, width, height, errors)) {
        checkPanelSafe(box, box.panel, `box:${box.id}`);
      }
      for (const field of ["title", "subtitle", "badge", "code"]) {
        if (box[field] && hasForbiddenToken(String(box[field]))) {
          errors.push(`Forbidden literal in box:${box.id}.${field}`);
        }
      }
    }

    // 2. Box-vs-Box clearance >= 18px
    let minBoxGap = Infinity;
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const gap = rectClearance(boxes[i], boxes[j]);
        if (gap < minBoxGap) minBoxGap = gap;
        if (rectsOverlap(boxes[i], boxes[j], 18)) {
          errors.push(
            `Box collision (<18px gap) between "${boxes[i].id}" and "${boxes[j].id}"`
          );
        }
      }
    }

    // 3. Collect all pills (ownership pills + txArrow pills + banners)
    const pills = [];
    for (const edge of edges) {
      for (const pt of edge.pathPoints || []) {
        if (!Number.isFinite(pt[0]) || !Number.isFinite(pt[1]) || pt[0] < 0 || pt[1] < 0 || pt[0] > width || pt[1] > height) {
          errors.push(`Ownership edge "${edge.id}" path point out of bounds`);
        }
      }
      if (edge.pillRect) {
        if (checkFiniteRect(edge.pillRect, `edgePill:${edge.id}`, width, height, errors)) {
          checkPanelSafe(edge.pillRect, edge.panel, `edgePill:${edge.id}`);
        }
        if (hasForbiddenToken(edge.pillRect.text || "")) {
          errors.push(`Forbidden literal in edgePill:${edge.id}`);
        }
        pills.push(edge.pillRect);
      }
    }

    for (const arrow of arrows) {
      for (const pt of arrow.pathPoints || []) {
        if (!Number.isFinite(pt[0]) || !Number.isFinite(pt[1]) || pt[0] < 0 || pt[1] < 0 || pt[0] > width || pt[1] > height) {
          errors.push(`TxArrow "${arrow.id}" path point out of bounds`);
        }
      }
      if (arrow.pillRect) {
        if (checkFiniteRect(arrow.pillRect, `arrowPill:${arrow.id}`, width, height, errors)) {
          checkPanelSafe(arrow.pillRect, arrow.panel, `arrowPill:${arrow.id}`);
        }
        if (hasForbiddenToken(arrow.pillRect.text || "")) {
          errors.push(`Forbidden literal in arrowPill:${arrow.id}`);
        }
        pills.push(arrow.pillRect);
      }
    }

    // 4. Pill-vs-Box collision check (strict >= 4px margin)
    for (const pill of pills) {
      for (const box of boxes) {
        if (rectsOverlap(pill, box, 4)) {
          errors.push(`Label pill "${pill.id}" overlaps entityBox "${box.id}"`);
        }
      }
    }

    // 5. Pill-vs-Pill collision check (strict >= 4px margin)
    for (let i = 0; i < pills.length; i++) {
      for (let j = i + 1; j < pills.length; j++) {
        if (rectsOverlap(pills[i], pills[j], 4)) {
          errors.push(`Label pill "${pills[i].id}" overlaps label pill "${pills[j].id}"`);
        }
      }
    }

    // 6. Ensure no TxArrow path segment cuts through a different arrow's label pill
    function segIntersectsRect(p1, p2, r) {
      const minX = Math.min(p1[0], p2[0]);
      const maxX = Math.max(p1[0], p2[0]);
      const minY = Math.min(p1[1], p2[1]);
      const maxY = Math.max(p1[1], p2[1]);
      if (maxX <= r.x + 1 || minX >= r.x + r.w - 1 || maxY <= r.y + 1 || minY >= r.y + r.h - 1) {
        return false;
      }
      // Axis-aligned segments (orthogonal paths) intersect iff their bbox overlaps interior
      if (Math.abs(p1[0] - p2[0]) < 1 || Math.abs(p1[1] - p2[1]) < 1) return true;
      return true;
    }

    for (const arrow of arrows) {
      const pts = arrow.pathPoints || [];
      for (let s = 0; s < pts.length - 1; s++) {
        for (const other of arrows) {
          if (other.id === arrow.id || !other.pillRect) continue;
          if (segIntersectsRect(pts[s], pts[s + 1], other.pillRect)) {
            errors.push(`TxArrow "${arrow.id}" segment cuts across pill "${other.pillRect.id}"`);
          }
        }
      }
    }

    return {
      ok: errors.length === 0,
      errors,
      stats: {
        boxCount: boxes.length,
        edgeCount: edges.length,
        arrowCount: arrows.length,
        pillCount: pills.length,
        minBoxGap: Number.isFinite(minBoxGap) ? minBoxGap : null,
      },
    };
  }

  /* =========================================================================
     3. 2D TOPOLOGY BUILDERS (HAND-CRAFTED PER ARCHETYPE & VERIFIED DEAL)
     ========================================================================= */
  function finalizeLayout(canvas, boxDefs, edgeDefs, arrowDefs) {
    const byId = new Map();
    for (const b of boxDefs) {
      const rendered = drawEntityBox(b);
      canvas.boxes.push(rendered);
      byId.set(rendered.id, rendered);
    }
    for (const e of edgeDefs) {
      const rendered = drawOwnershipEdge({
        ...e,
        fromBox: byId.get(e.from),
        toBox: byId.get(e.to),
      });
      canvas.ownershipEdges.push(rendered);
    }
    for (const a of arrowDefs) {
      const rendered = drawTxArrow(a);
      canvas.txArrows.push(rendered);
    }
    return canvas;
  }

  function buildOfferTopology(p) {
    const canvas = createDiagramCanvas({
      width: MASTER_W,
      height: 472,
      status: p.status,
      leftTitle: p.leftTitle || "交易结构与两步要约流向",
      rightTitle: p.rightTitle || "交割后股权架构",
      transitionLabel: p.transitionLabel || "控股权交割",
      outcomeBadge: p.outcomeBadge,
    });
    return finalizeLayout(
      canvas,
      [
        // Left Panel: 3 top entities (Buyer | Seller | Public) + Listed below Seller & Public
        { id: "L_buyer", panel: "left", x: 32, y: 166, w: 158, h: 86, role: "buyer", title: p.buyerName, subtitle: p.buyerSub || "买方 · 强制要约人", badge: p.buyerBadge || "新控权方" },
        { id: "L_seller", panel: "left", x: 258, y: 166, w: 158, h: 86, role: "seller", title: p.sellerName, subtitle: p.sellerSub || "原控股股东 · 出售方" },
        { id: "L_public", panel: "left", x: 454, y: 166, w: 160, h: 86, role: "public", title: p.publicName || "其余独立股东", subtitle: p.publicSub || "全面要约对象" },
        { id: "L_listed", panel: "left", x: 298, y: 348, w: 300, h: 84, role: "listed", title: p.listedName, code: p.code, subtitle: p.listedSub || "港交所主板上市主体" },
        // Right Panel: Post-deal structure
        { id: "R_buyer", panel: "right", x: 700, y: 118, w: 162, h: 84, role: "buyer", title: p.buyerName, subtitle: p.afterBuyerSub || "新任控股股东" },
        { id: "R_public", panel: "right", x: 886, y: 118, w: 162, h: 84, role: "public", title: p.afterPublicName || "公众及不接纳股东", subtitle: p.afterPublicSub || "维持上市流通" },
        { id: "R_listed", panel: "right", x: 734, y: 296, w: 280, h: 84, role: "listed", title: p.listedName, code: p.code, subtitle: p.afterListedSub || "港交所主板维持上市" },
      ],
      [
        { id: "E_L1", panel: "left", from: "L_seller", to: "L_listed", anchorFromRatio: 0.62, anchorToRatio: 0.2, pctLabel: p.beforeSellerPct || "70% · 2.80亿股", pillWidth: 122, labelCenter: [356, 300], dashed: false },
        { id: "E_L2", panel: "left", from: "L_public", to: "L_listed", anchorFromRatio: 0.5, anchorToRatio: 0.78, pctLabel: p.beforePublicPct || "30% · 1.20亿股", pillWidth: 122, labelCenter: [534, 300], dashed: true },
        { id: "E_R1", panel: "right", from: "R_buyer", to: "R_listed", anchorFromRatio: 0.5, anchorToRatio: 0.17, pctLabel: p.afterBuyerPct || "≥70% 控股权", pillWidth: 116, labelCenter: [781, 249], dashed: false },
        { id: "E_R2", panel: "right", from: "R_public", to: "R_listed", anchorFromRatio: 0.5, anchorToRatio: 0.83, pctLabel: p.afterPublicPct || "≤30% 余下股份", pillWidth: 120, labelCenter: [967, 249], dashed: true },
      ],
      [
        // Arrow 1: Cash payment Buyer -> Seller along bottom-left open bay
        {
          id: "A_step1_cash",
          panel: "left",
          step: "①",
          kind: "cash",
          terminated: p.status === "terminated" && !p.controlCompleted,
          pathPoints: [[111, 252], [111, 356], [274, 356], [274, 252]],
          label: p.step1CashLabel,
          sublabel: p.step1CashSub,
          labelCenter: [148, 356],
          labelWidth: 228,
          labelHeight: 46,
        },
        // Arrow 1b: Direct horizontal control block shares Seller -> Buyer
        {
          id: "A_step1_shares",
          panel: "left",
          kind: "shares",
          terminated: p.status === "terminated" && !p.controlCompleted,
          pathPoints: [[258, 209], [190, 209]],
          label: p.step1SharesLabel || "70%股",
          labelCenter: [224, 209],
          labelWidth: 52,
          labelHeight: 22,
        },
        // Arrow 2: Overhead arch Buyer -> Public Shareholders (MGO)
        {
          id: "A_step2_mgo",
          panel: "left",
          step: "②",
          kind: "cash",
          terminated: p.status === "terminated",
          pathPoints: [[111, 166], [111, 96], [534, 96], [534, 166]],
          label: p.step2MgoLabel,
          sublabel: p.step2MgoSub,
          labelCenter: [324, 96],
          labelWidth: 382,
          labelHeight: 46,
        },
      ]
    );
  }

  function buildSchemeTopology(p) {
    const isTerm = p.status === "terminated";
    const isClosed = p.status === "closed";
    const canvas = createDiagramCanvas({
      width: MASTER_W,
      height: 452,
      status: p.status,
      terminated: isTerm,
      leftTitle: p.leftTitle || "协议安排私有化交易流向",
      rightTitle: p.rightTitle || (isTerm ? "终止后维持架构" : isClosed ? "私有化后股权架构" : "拟议私有化后架构"),
      transitionLabel: p.transitionLabel || (isTerm ? "协议终止" : isClosed ? "计划生效" : "推进中"),
      outcomeBadge: p.outcomeBadge,
    });
    return finalizeLayout(
      canvas,
      [
        { id: "L_buyer", panel: "left", x: 34, y: 152, w: 238, h: 84, role: "buyer", title: p.buyerName, subtitle: p.buyerSub || "要约人 · 收购方", badge: p.buyerBadge },
        { id: "L_public", panel: "left", x: 374, y: 152, w: 238, h: 84, role: "public", title: p.publicName, subtitle: p.publicSub || "无利害关系表决股东" },
        { id: "L_listed", panel: "left", x: 108, y: 334, w: 270, h: 84, role: "listed", title: p.listedName, code: p.code, jurisdiction: p.jurisdiction, subtitle: p.listedSub || "港交所主板上市公司" },
        // Right Panel
        ...(isTerm
          ? [
              { id: "R_buyer", panel: "right", x: 700, y: 112, w: 162, h: 82, role: "buyer", title: p.buyerName, subtitle: "维持既有持股" },
              { id: "R_public", panel: "right", x: 886, y: 112, w: 162, h: 82, role: "public", title: p.publicName, subtitle: "计划未实施" },
              { id: "R_listed", panel: "right", x: 734, y: 282, w: 280, h: 82, role: "listed", title: p.listedName, code: p.code, subtitle: "维持主板上市" },
            ]
          : [
              { id: "R_buyer", panel: "right", x: 734, y: 96, w: 280, h: 84, role: "buyer", title: p.buyerName, subtitle: p.afterBuyerSub || (isClosed ? "唯一全资控股股东" : "拟议全资控股股东") },
              { id: "R_target", panel: "right", x: 734, y: 274, w: 280, h: 84, role: "target", title: p.listedName, jurisdiction: p.jurisdiction, subtitle: p.afterTargetSub || (isClosed ? "非上市全资附属公司" : "待法院批准及计划生效"), badge: p.afterTargetBadge || (isClosed ? "已撤销上市" : "拟议退市") },
            ]),
      ],
      [
        { id: "E_L1", panel: "left", from: "L_buyer", to: "L_listed", anchorFromRatio: 0.5, anchorToRatio: 0.17, pctLabel: p.beforeBuyerPct || "既有控股股权", pillWidth: 116, labelCenter: [153, 285], dashed: false },
        { id: "E_L2", panel: "left", from: "L_public", to: "L_listed", anchorFromRatio: 0.2, anchorToRatio: 0.84, pathPoints: [[422, 236], [422, 285], [335, 285], [335, 334]], pctLabel: p.beforePublicPct || "计划股份", pillWidth: 96, labelCenter: [348, 285], dashed: true },
        ...(isTerm
          ? [
              { id: "E_R1", panel: "right", from: "R_buyer", to: "R_listed", anchorFromRatio: 0.5, anchorToRatio: 0.17, pctLabel: "既有持股", pillWidth: 94, labelCenter: [781, 238], dashed: false },
              { id: "E_R2", panel: "right", from: "R_public", to: "R_listed", anchorFromRatio: 0.5, anchorToRatio: 0.83, pctLabel: "公众持股", pillWidth: 94, labelCenter: [967, 238], dashed: true },
            ]
          : [
              { id: "E_R1", panel: "right", from: "R_buyer", to: "R_target", pctLabel: isClosed ? "100% 全资控股" : "拟 100% 控股", pillWidth: 132, labelCenter: [874, 227], dashed: false },
            ]),
      ],
      [
        // Arrow 1: Overhead Cash Consideration Buyer -> Scheme Shareholders
        {
          id: "A_scheme_cash",
          panel: "left",
          step: "①",
          kind: "cash",
          terminated: isTerm,
          pathPoints: [[153, 152], [153, 92], [493, 92], [493, 152]],
          label: p.cashLabel,
          sublabel: p.cashSub,
          labelCenter: [323, 92],
          labelWidth: 368,
          labelHeight: 46,
        },
        // Arrow 2: Right-side cancellation flow Scheme Shares -> Listed Co Delisting
        {
          id: "A_scheme_cancel",
          panel: "left",
          step: "②",
          kind: "cancel",
          terminated: isTerm,
          pathPoints: [[534, 236], [534, 376], [378, 376]],
          label: p.cancelLabel,
          sublabel: p.cancelSub,
          labelCenter: [506, 356],
          labelWidth: 214,
          labelHeight: 46,
        },
      ]
    );
  }

  function buildCommercialProcurementTopology(p) {
    const isTerm = p.status === "terminated";
    const canvas = createDiagramCanvas({
      width: MASTER_W,
      height: 432,
      status: p.status,
      terminated: isTerm,
      leftTitle: p.leftTitle || "商业设备 / 资产采购合同流向",
      rightTitle: p.rightTitle || "合同履约与资产入账状态",
      transitionLabel: p.transitionLabel || (isTerm ? "合同终止" : "商业履约"),
      outcomeBadge: p.outcomeBadge,
    });
    return finalizeLayout(
      canvas,
      [
        { id: "L_buyer", panel: "left", x: 34, y: 158, w: 252, h: 86, role: "listed", roleLabel: "采购买方", title: p.buyerName, code: p.code, subtitle: p.buyerSub || "港股买方主体（设备采购方）" },
        { id: "L_vendor", panel: "left", x: 360, y: 158, w: 252, h: 86, role: "seller", roleLabel: "供应商", title: p.vendorName, subtitle: p.vendorSub || "独立设备供应商 / 合同卖方" },
        { id: "R_buyer", panel: "right", x: 734, y: 104, w: 280, h: 86, role: "listed", roleLabel: "买方主体", title: p.buyerName, code: p.code, subtitle: isTerm ? "采购合同已终止" : "按约结算货款 · 维持原架构" },
        { id: "R_asset", panel: "right", x: 734, y: 256, w: 280, h: 86, role: "target", roleLabel: "采购设备", title: p.assetName, subtitle: isTerm ? "未交付" : (p.assetSub || "固定资产 / 产线设备交付验收"), badge: isTerm ? "已终止" : "商业资产" },
      ],
      [],
      [
        {
          id: "A_proc_cash",
          panel: "left",
          step: "①",
          kind: "cash",
          terminated: isTerm,
          pathPoints: [[160, 158], [160, 92], [486, 92], [486, 158]],
          label: p.payLabel || "支付采购合同价款",
          sublabel: p.paySub || "按里程碑结算及抵扣预付款",
          labelCenter: [323, 92],
          labelWidth: 382,
          labelHeight: 46,
        },
        {
          id: "A_proc_asset",
          panel: "left",
          step: "②",
          kind: "asset",
          terminated: isTerm,
          pathPoints: [[486, 244], [486, 336], [160, 336], [160, 244]],
          label: p.deliveryLabel || "交付采购设备及安装验收",
          sublabel: p.deliverySub || "纯商业资产采购 · 不涉及子公司收购",
          labelCenter: [323, 336],
          labelWidth: 382,
          labelHeight: 46,
        },
      ]
    );
  }

  function buildRtoTopology(p) {
    const canvas = createDiagramCanvas({
      width: MASTER_W,
      height: 484,
      status: p.status,
      leftTitle: p.leftTitle || "反向收购合并流向 · LR 14.06B",
      rightTitle: p.rightTitle || "合并后上市股权架构",
      transitionLabel: p.transitionLabel || "合并交割",
      outcomeBadge: p.outcomeBadge,
    });
    return finalizeLayout(
      canvas,
      [
        // Left Panel: Two parallel corporate columns with center crossing vector arrows
        { id: "L_orig_sh", panel: "left", x: 32, y: 62, w: 180, h: 74, role: "public", title: p.origShName, subtitle: "既有上市股东" },
        { id: "L_target_sh", panel: "left", x: 436, y: 62, w: 180, h: 74, role: "seller", title: p.targetShName, subtitle: "标的股东 · 换股入主" },
        { id: "L_listed", panel: "left", x: 32, y: 356, w: 180, h: 84, role: "listed", title: p.beforeListedName, code: p.code, jurisdiction: p.jurisdiction, subtitle: "主板上市平台" },
        { id: "L_target", panel: "left", x: 436, y: 356, w: 180, h: 84, role: "target", title: p.targetName, subtitle: p.targetSub || "合并注入标的集团" },
        // Right Panel: 3-tier converged stack
        { id: "R_new_ctrl", panel: "right", x: 700, y: 62, w: 162, h: 72, role: "buyer", title: p.afterCtrlName, subtitle: "代价股控股股东" },
        { id: "R_orig_sh", panel: "right", x: 886, y: 62, w: 162, h: 72, role: "public", title: p.origShName, subtitle: "摊薄后存续股东" },
        { id: "R_combined", panel: "right", x: 724, y: 204, w: 300, h: 76, role: "listed", title: p.afterListedName, code: p.code, subtitle: p.afterListedSub || "合并更名 · 维持主板上市" },
        { id: "R_sub", panel: "right", x: 744, y: 338, w: 260, h: 68, role: "target", title: p.targetName, subtitle: "并入上市集团全资核心业务" },
      ],
      [
        { id: "E_L1", panel: "left", from: "L_orig_sh", to: "L_listed", anchorFromRatio: 0.36, anchorToRatio: 0.36, pctLabel: "100% 原股本", pillWidth: 102, labelCenter: [97, 248], dashed: true },
        { id: "E_L2", panel: "left", from: "L_target_sh", to: "L_target", anchorFromRatio: 0.64, anchorToRatio: 0.64, pctLabel: "100% 标的股权", pillWidth: 112, labelCenter: [551, 248], dashed: false },
        { id: "E_R1", panel: "right", from: "R_new_ctrl", to: "R_combined", anchorFromRatio: 0.5, anchorToRatio: 0.19, pctLabel: p.afterCtrlPct || "控股股权", pillWidth: 112, labelCenter: [781, 169], dashed: false },
        { id: "E_R2", panel: "right", from: "R_orig_sh", to: "R_combined", anchorFromRatio: 0.5, anchorToRatio: 0.81, pctLabel: p.afterOrigPct || "存续少数权益", pillWidth: 112, labelCenter: [967, 169], dashed: true },
        { id: "E_R3", panel: "right", from: "R_combined", to: "R_sub", pctLabel: "100% 全资控股", pillWidth: 124, labelCenter: [874, 309], dashed: false },
      ],
      [
        // Arrow 1: Listed Co -> Target Shareholders (Consideration Shares)
        {
          id: "A_rto_shares",
          panel: "left",
          step: "①",
          kind: "shares",
          terminated: p.status === "terminated",
          pathPoints: [[182, 356], [182, 178], [404, 178], [404, 99], [436, 99]],
          label: p.sharesLabel,
          sublabel: p.sharesSub,
          labelCenter: [324, 178],
          labelWidth: 220,
          labelHeight: 50,
        },
        // Arrow 2: Target Group -> Listed Co (100% Absorption / Merger Injection)
        {
          id: "A_rto_asset",
          panel: "left",
          step: "②",
          kind: "asset",
          terminated: p.status === "terminated",
          pathPoints: [[436, 398], [212, 398]],
          label: p.assetLabel,
          sublabel: p.assetSub,
          labelCenter: [324, 398],
          labelWidth: 204,
          labelHeight: 50,
        },
      ]
    );
  }

  function buildHoldcoTopology(p) {
    const canvas = createDiagramCanvas({
      width: MASTER_W,
      height: 468,
      status: p.status,
      leftTitle: p.leftTitle || "安排计划 1:1 换股重组流向",
      rightTitle: p.rightTitle || "重组后新控股架构",
      transitionLabel: p.transitionLabel || "介绍上市",
      outcomeBadge: p.outcomeBadge,
    });
    return finalizeLayout(
      canvas,
      [
        // Left Panel
        { id: "L_sh", panel: "left", x: 40, y: 70, w: 228, h: 78, role: "public", title: p.shName || "全体既有计划股东", subtitle: "按原持股比例平移" },
        { id: "L_old", panel: "left", x: 40, y: 254, w: 228, h: 86, role: "listed", title: p.oldHoldco, code: p.code, jurisdiction: p.oldJur, subtitle: p.oldSub || "原境外上市控股主体" },
        { id: "L_new", panel: "left", x: 382, y: 254, w: 228, h: 86, role: "holdco", title: p.newHoldco, jurisdiction: p.newJur, subtitle: p.newSub || "新设香港控股 · 介绍上市" },
        // Right Panel: 3-tier vertical chain
        { id: "R_sh", panel: "right", x: 734, y: 60, w: 280, h: 70, role: "public", title: p.shName || "全体计划股东", subtitle: "持股比例零摊薄" },
        { id: "R_new", panel: "right", x: 734, y: 184, w: 280, h: 78, role: "holdco", title: p.newHoldco, code: p.code, jurisdiction: p.newJur, subtitle: "新控股上市主体 · 介绍上市" },
        { id: "R_old", panel: "right", x: 734, y: 318, w: 280, h: 72, role: "target", title: p.oldHoldco, jurisdiction: p.oldJur, subtitle: "转为全资附属 · 原股退市" },
      ],
      [
        { id: "E_L1", panel: "left", from: "L_sh", to: "L_old", pctLabel: "100% 原计划股份", pillWidth: 132, labelCenter: [154, 201], dashed: false },
        { id: "E_R1", panel: "right", from: "R_sh", to: "R_new", pctLabel: "100% 介绍上市股份", pillWidth: 138, labelCenter: [874, 156], dashed: false },
        { id: "E_R2", panel: "right", from: "R_new", to: "R_old", pctLabel: "100% 全资控股", pillWidth: 124, labelCenter: [874, 290], dashed: false },
      ],
      [
        // Arrow 1: Bidirectional 1:1 share swap Shareholders <-> New HK HoldCo
        {
          id: "A_holdco_swap",
          panel: "left",
          step: "①",
          kind: "shares",
          bidirectional: true,
          terminated: p.status === "terminated",
          pathPoints: [[268, 109], [496, 109], [496, 254]],
          label: p.swapLabel,
          sublabel: p.swapSub,
          labelCenter: [452, 166],
          labelWidth: 266,
          labelHeight: 46,
        },
        // Arrow 2: Old HoldCo Delisting -> New HoldCo Listing by Introduction
        {
          id: "A_holdco_cancel",
          panel: "left",
          step: "②",
          kind: "cancel",
          terminated: p.status === "terminated",
          pathPoints: [[154, 340], [154, 404], [496, 404], [496, 340]],
          label: p.cancelLabel,
          sublabel: p.cancelSub,
          labelCenter: [325, 404],
          labelWidth: 356,
          labelHeight: 44,
        },
      ]
    );
  }

  function buildDisposalTopology(p) {
    const canvas = createDiagramCanvas({
      width: MASTER_W,
      height: 472,
      status: p.status,
      leftTitle: p.leftTitle || "主要交易 · 资产处置与现金结算",
      rightTitle: p.rightTitle || "交易后权属与资金架构",
      transitionLabel: p.transitionLabel || (p.status === "approved" ? "股东批准" : "资产交割"),
      outcomeBadge: p.outcomeBadge,
    });
    return finalizeLayout(
      canvas,
      [
        // Left Panel: 3-tier Seller/SPV/Asset chain on left exchanging directly with Buyer on right
        { id: "L_listed", panel: "left", x: 34, y: 60, w: 222, h: 74, role: "listed", title: p.listedName, code: p.code, subtitle: "港交所主板上市母公司" },
        { id: "L_spv", panel: "left", x: 34, y: 192, w: 222, h: 78, role: "seller", title: p.sellerName, subtitle: p.sellerSub || "上市附属 · 收款方/卖方" },
        { id: "L_asset", panel: "left", x: 34, y: 348, w: 222, h: 84, role: "target", title: p.assetName, subtitle: p.assetSub || "拟处置标的资产" },
        { id: "L_buyer", panel: "left", x: 406, y: 218, w: 208, h: 84, role: "buyer", title: p.buyerName, subtitle: p.buyerSub || "资产承购方 · 付款方" },
        // Right Panel: Clean side-by-side separation (Listed+SPV cash vs Buyer+Asset)
        { id: "R_listed", panel: "right", x: 700, y: 84, w: 160, h: 82, role: "listed", title: p.listedName, code: p.code, subtitle: "保留主板上市" },
        { id: "R_spv", panel: "right", x: 700, y: 258, w: 160, h: 84, role: "seller", title: p.sellerShort || p.sellerName, subtitle: p.afterSellerSub || "收回处置现金" },
        { id: "R_buyer", panel: "right", x: 888, y: 84, w: 160, h: 82, role: "buyer", title: p.buyerShort || p.buyerName, subtitle: "承接标的权属" },
        { id: "R_asset", panel: "right", x: 888, y: 258, w: 160, h: 84, role: "target", title: p.assetShort || p.assetName, subtitle: p.afterAssetSub || "按批准交付买方" },
      ],
      [
        { id: "E_L1", panel: "left", from: "L_listed", to: "L_spv", pctLabel: "上市集团附属", pillWidth: 108, labelCenter: [145, 163], dashed: false },
        { id: "E_L2", panel: "left", from: "L_spv", to: "L_asset", pctLabel: p.beforeHoldLabel || "持有权属及租约", pillWidth: 122, labelCenter: [145, 310], dashed: false },
        { id: "E_R1", panel: "right", from: "R_listed", to: "R_spv", pctLabel: "上市附属", pillWidth: 88, labelCenter: [780, 211], dashed: false },
        { id: "E_R2", panel: "right", from: "R_buyer", to: "R_asset", pctLabel: p.afterHoldLabel || "批准后交付", pillWidth: 104, labelCenter: [968, 211], dashed: p.status !== "closed" },
      ],
      [
        // Arrow 1: Cash Settlement Buyer -> SPV2
        {
          id: "A_disp_cash",
          panel: "left",
          step: "①",
          kind: "cash",
          terminated: p.status === "terminated",
          pathPoints: [[510, 218], [510, 118], [308, 118], [308, 224], [256, 224]],
          label: p.cashLabel,
          sublabel: p.cashSub,
          labelCenter: [456, 118],
          labelWidth: 264,
          labelHeight: 46,
        },
        // Arrow 2: Asset Delivery SPV2/Asset -> Buyer
        {
          id: "A_disp_asset",
          panel: "left",
          step: "②",
          kind: "asset",
          terminated: p.status === "terminated",
          pathPoints: [[256, 390], [510, 390], [510, 302]],
          label: p.assetLabel,
          sublabel: p.assetSubArrow,
          labelCenter: [446, 390],
          labelWidth: 274,
          labelHeight: 46,
        },
      ]
    );
  }

  function buildAcquisitionTopology(p) {
    const isTerm = p.status === "terminated";
    const canvas = createDiagramCanvas({
      width: MASTER_W,
      height: 468,
      status: p.status,
      terminated: isTerm,
      leftTitle: p.leftTitle || (isTerm ? "原拟重大收购结构 · 协议已终止" : "重大收购结构与对价流向"),
      rightTitle: p.rightTitle || (isTerm ? "终止后架构 · 维持原状" : "交割后并表架构"),
      transitionLabel: p.transitionLabel || (isTerm ? "协议终止" : "收购交割"),
      outcomeBadge: p.outcomeBadge,
      terminatedBanner: isTerm ? p.terminatedBanner || "✕ 收购协议已终止 · 所有拟议发股及注入均未实施" : "",
    });
    const topShift = isTerm ? 18 : 0;
    return finalizeLayout(
      canvas,
      [
        // Left Panel
        { id: "L_listed", panel: "left", x: 34, y: 194 + topShift, w: 190, h: 90, role: "listed", title: p.listedName, code: p.code, subtitle: isTerm ? "原拟收购方 · 主板主体" : "收购方 · 主板主体" },
        { id: "L_seller", panel: "left", x: 422, y: 100 + topShift, w: 192, h: 78, role: "seller", title: p.sellerName, subtitle: p.sellerSub || "资产出售方" },
        { id: "L_target", panel: "left", x: 422, y: 302 + topShift, w: 192, h: 82, role: "target", title: p.targetName, subtitle: p.targetSub || "拟收购标的股权" },
        // Right Panel
        ...(isTerm
          ? [
              { id: "R_listed", panel: "right", x: 700, y: 170, w: 158, h: 90, role: "listed", title: p.listedName, code: p.code, subtitle: "零发股 · 维持原状" },
              { id: "R_seller", panel: "right", x: 886, y: 92, w: 162, h: 78, role: "seller", title: p.sellerName, subtitle: p.afterSellerSub || "维持原持股" },
              { id: "R_target", panel: "right", x: 886, y: 280, w: 162, h: 78, role: "target", title: p.targetName, subtitle: "未并表 · 仍属卖方" },
            ]
          : [
              { id: "R_seller", panel: "right", x: 734, y: 66, w: 280, h: 68, role: "seller", title: p.sellerName, subtitle: p.afterSellerSub || "取得对价股份/对价" },
              { id: "R_listed", panel: "right", x: 734, y: 192, w: 280, h: 76, role: "listed", title: p.listedName, code: p.code, subtitle: "扩大后上市平台" },
              { id: "R_target", panel: "right", x: 734, y: 322, w: 280, h: 70, role: "target", title: p.targetName, subtitle: "并表成为附属公司" },
            ]),
      ],
      [
        { id: "E_L1", panel: "left", from: "L_seller", to: "L_target", pctLabel: p.beforeTargetPct || "100% 标的股权", pillWidth: 118, labelCenter: [518, 240 + topShift], dashed: false },
        ...(isTerm
          ? [
              { id: "E_R1", panel: "right", from: "R_seller", to: "R_target", pctLabel: "100% 原持股", pillWidth: 110, labelCenter: [967, 225], dashed: false },
            ]
          : [
              { id: "E_R1", panel: "right", from: "R_seller", to: "R_listed", pctLabel: "代价股份权益", pillWidth: 112, labelCenter: [874, 163], dashed: true },
              { id: "E_R2", panel: "right", from: "R_listed", to: "R_target", pctLabel: "控股并表", pillWidth: 96, labelCenter: [874, 295], dashed: false },
            ]),
      ],
      [
        // Arrow 1: Consideration (Shares or Cash) Listed Co -> Seller
        {
          id: "A_acq_pay",
          panel: "left",
          step: isTerm ? "✕" : "①",
          kind: p.payKind || "shares",
          terminated: isTerm,
          pathPoints: [[129, 194 + topShift], [129, 139 + topShift], [422, 139 + topShift]],
          label: p.payLabel,
          sublabel: p.paySub,
          labelCenter: [282, 139 + topShift],
          labelWidth: 256,
          labelHeight: 48,
        },
        // Arrow 2: Target Injection Target -> Listed Co
        {
          id: "A_acq_asset",
          panel: "left",
          step: isTerm ? "✕" : "②",
          kind: "asset",
          terminated: isTerm,
          pathPoints: [[422, 343 + topShift], [129, 343 + topShift], [129, 284 + topShift]],
          label: p.assetLabel,
          sublabel: p.assetSub,
          labelCenter: [282, 343 + topShift],
          labelWidth: 256,
          labelHeight: 48,
        },
      ]
    );
  }

  function buildSpinOffTopology(p) {
    const canvas = createDiagramCanvas({
      width: MASTER_W,
      height: 468,
      status: p.status,
      leftTitle: p.leftTitle || "PN15 分拆上市结构流向",
      rightTitle: p.rightTitle || "分拆后双上市平台",
      transitionLabel: p.transitionLabel || "独立挂牌",
      outcomeBadge: p.outcomeBadge,
    });
    return finalizeLayout(
      canvas,
      [
        { id: "L_sh", panel: "left", x: 40, y: 66, w: 224, h: 74, role: "public", title: p.shName || "母公司全体股东", subtitle: "含合资格优先认购股东" },
        { id: "L_parent", panel: "left", x: 40, y: 196, w: 224, h: 80, role: "listed", title: p.parentName, code: p.code, subtitle: "港股上市母公司" },
        { id: "L_spinco", panel: "left", x: 40, y: 344, w: 224, h: 82, role: "target", title: p.spinCoName, subtitle: "拟分拆独立上市附属" },
        { id: "L_mkt", panel: "left", x: 404, y: 196, w: 208, h: 82, role: "public", title: "全球发售投资者", subtitle: "含母公司股东保证配额" },
        // Right Panel
        { id: "R_parent", panel: "right", x: 700, y: 108, w: 162, h: 84, role: "listed", title: p.parentName, code: p.code, subtitle: "保留余下核心业务" },
        { id: "R_pub", panel: "right", x: 886, y: 108, w: 162, h: 84, role: "public", title: "SpinCo 公众股东", subtitle: "二级市场独立流通" },
        { id: "R_spinco", panel: "right", x: 734, y: 294, w: 280, h: 84, role: "listed", title: p.spinCoName, subtitle: "PN15 独立上市平台" },
      ],
      [
        { id: "E_L1", panel: "left", from: "L_sh", to: "L_parent", pctLabel: "100% 母公司股本", pillWidth: 128, labelCenter: [152, 168], dashed: true },
        { id: "E_L2", panel: "left", from: "L_parent", to: "L_spinco", pctLabel: "分拆前控股", pillWidth: 102, labelCenter: [152, 310], dashed: false },
        { id: "E_R1", panel: "right", from: "R_parent", to: "R_spinco", anchorFromRatio: 0.5, anchorToRatio: 0.17, pctLabel: "保留控股/参股", pillWidth: 118, labelCenter: [781, 243], dashed: false },
        { id: "E_R2", panel: "right", from: "R_pub", to: "R_spinco", anchorFromRatio: 0.5, anchorToRatio: 0.83, pctLabel: "公众流通股", pillWidth: 104, labelCenter: [967, 243], dashed: true },
      ],
      [
        {
          id: "A_spin_shares",
          panel: "left",
          step: "①",
          kind: "shares",
          terminated: p.status === "terminated",
          pathPoints: [[264, 385], [508, 385], [508, 278]],
          label: p.sharesLabel || "全球发售新股 / 保证配额",
          sublabel: p.sharesSub || "PN15 独立上市释放业务估值",
          labelCenter: [446, 385],
          labelWidth: 266,
          labelHeight: 46,
        },
        {
          id: "A_spin_entitle",
          panel: "left",
          step: "②",
          kind: "asset",
          terminated: p.status === "terminated",
          pathPoints: [[264, 103], [508, 103], [508, 196]],
          label: p.assetLabel || "合资格股东优先认购 / 实物分派",
          sublabel: p.assetSub || "适用 PN15 及 LR 14 章视作出售",
          labelCenter: [452, 118],
          labelWidth: 266,
          labelHeight: 46,
        },
      ]
    );
  }

  function buildDebtTopology(p) {
    const canvas = createDiagramCanvas({
      width: MASTER_W,
      height: 468,
      status: p.status,
      leftTitle: p.leftTitle || "债务协议安排与债转股流向",
      rightTitle: p.rightTitle || "重组后资本架构",
      transitionLabel: p.transitionLabel || "重组生效",
      outcomeBadge: p.outcomeBadge,
    });
    return finalizeLayout(
      canvas,
      [
        // Left Panel: Original Shareholders -> Listed Issuer on left; Scheme Creditors on right
        { id: "L_sh", panel: "left", x: 34, y: 66, w: 220, h: 78, role: "seller", title: p.origShName || "原控股及公众股东", subtitle: "重组前既有股东" },
        { id: "L_listed", panel: "left", x: 34, y: 244, w: 220, h: 90, role: "listed", title: p.listedName, code: p.code, subtitle: "协议安排重组发行人" },
        { id: "L_cred", panel: "left", x: 404, y: 204, w: 210, h: 88, role: "creditor", title: p.creditorName || "境外计划债权人", subtitle: "美元优先票据及银团" },
        // Right Panel
        { id: "R_cred", panel: "right", x: 700, y: 112, w: 162, h: 84, role: "creditor", title: "转股债权人", subtitle: "新股 / MCB / 新票据" },
        { id: "R_sh", panel: "right", x: 886, y: 112, w: 162, h: 84, role: "public", title: "原存续股东", subtitle: "摊薄后存续股本" },
        { id: "R_listed", panel: "right", x: 734, y: 292, w: 280, h: 84, role: "listed", title: p.listedName, code: p.code, subtitle: "境外债务出清 · 维持上市" },
      ],
      [
        { id: "E_L1", panel: "left", from: "L_sh", to: "L_listed", pctLabel: "原 100% 股本", pillWidth: 112, labelCenter: [144, 194], dashed: false },
        { id: "E_R1", panel: "right", from: "R_cred", to: "R_listed", anchorFromRatio: 0.5, anchorToRatio: 0.17, pctLabel: "债转股权益", pillWidth: 104, labelCenter: [781, 244], dashed: false },
        { id: "E_R2", panel: "right", from: "R_sh", to: "R_listed", anchorFromRatio: 0.5, anchorToRatio: 0.83, pctLabel: "存续普通股", pillWidth: 104, labelCenter: [967, 244], dashed: true },
      ],
      [
        // Arrow 1: Creditors -> Listed Issuer (Waive / Cancel Defaulted Offshore Debt)
        {
          id: "A_debt_cancel",
          panel: "left",
          step: "①",
          kind: "cancel",
          terminated: p.status === "terminated",
          pathPoints: [[509, 204], [509, 118], [296, 118], [296, 266], [254, 266]],
          label: p.cancelLabel || "豁免注销原境外违约债务",
          sublabel: p.cancelSub || "债权人会议 ≥75% 债权额通过 · 法院批准",
          labelCenter: [452, 118],
          labelWidth: 274,
          labelHeight: 46,
        },
        // Arrow 2: Listed Issuer -> Creditors (Debt-to-Equity / MCB / Extended Notes)
        {
          id: "A_debt_shares",
          panel: "left",
          step: "②",
          kind: "shares",
          terminated: p.status === "terminated",
          pathPoints: [[144, 334], [144, 394], [509, 394], [509, 292]],
          label: p.sharesLabel || "发行债转股 / MCB + 展期新票据",
          sublabel: p.sharesSub || "特别授权降杠杆 · 兼顾 LR 13.24",
          labelCenter: [344, 394],
          labelWidth: 288,
          labelHeight: 46,
        },
      ]
    );
  }

  function buildAhAbsorptionTopology(p) {
    const canvas = createDiagramCanvas({
      width: MASTER_W,
      height: 472,
      status: p.status,
      leftTitle: p.leftTitle || "A+H 换股吸收合并流向",
      rightTitle: p.rightTitle || "合并后单一旗舰平台",
      transitionLabel: p.transitionLabel || "换股合一",
      outcomeBadge: p.outcomeBadge,
    });
    return finalizeLayout(
      canvas,
      [
        { id: "L_group", panel: "left", x: 184, y: 60, w: 280, h: 72, role: "holdco", title: p.groupName || "共同控股集团", subtitle: "央国企 / 产业控股股东" },
        { id: "L_absorber", panel: "left", x: 34, y: 214, w: 224, h: 84, role: "buyer", title: p.absorberName || "吸收合并方 (A+H)", subtitle: "存续旗舰上市主体" },
        { id: "L_absorbed", panel: "left", x: 390, y: 214, w: 224, h: 84, role: "listed", title: p.absorbedName, code: p.code, subtitle: "被吸收合并方 (H股)" },
        // Right Panel
        { id: "R_group", panel: "right", x: 700, y: 112, w: 162, h: 82, role: "holdco", title: p.groupName || "控股集团", subtitle: "统一控股股东" },
        { id: "R_pub", panel: "right", x: 886, y: 112, w: 162, h: 82, role: "public", title: "A+H 公众股东", subtitle: "含换股 H股股东" },
        { id: "R_survivor", panel: "right", x: 734, y: 292, w: 280, h: 84, role: "listed", title: p.absorberName || "存续 A+H 旗舰主体", subtitle: "全面承继资产与业务" },
      ],
      [
        { id: "E_L1", panel: "left", from: "L_group", to: "L_absorber", anchorFromRatio: 0.24, anchorToRatio: 0.5, pathPoints: [[251, 132], [251, 173], [146, 173], [146, 214]], pctLabel: "控股存续平台", pillWidth: 108, labelCenter: [164, 173], dashed: false },
        { id: "E_L2", panel: "left", from: "L_group", to: "L_absorbed", anchorFromRatio: 0.76, anchorToRatio: 0.5, pathPoints: [[397, 132], [397, 173], [502, 173], [502, 214]], pctLabel: "关联控股", pillWidth: 96, labelCenter: [484, 173], dashed: true },
        { id: "E_R1", panel: "right", from: "R_group", to: "R_survivor", anchorFromRatio: 0.5, anchorToRatio: 0.17, pctLabel: "控股股东", pillWidth: 96, labelCenter: [781, 243], dashed: false },
        { id: "E_R2", panel: "right", from: "R_pub", to: "R_survivor", anchorFromRatio: 0.5, anchorToRatio: 0.83, pctLabel: "公众流通股", pillWidth: 104, labelCenter: [967, 243], dashed: true },
      ],
      [
        // Inner arch: Absorber -> Absorbed H-Shareholders (Share Swap)
        {
          id: "A_ah_swap",
          panel: "left",
          step: "①",
          kind: "shares",
          terminated: p.status === "terminated",
          pathPoints: [[204, 298], [204, 344], [444, 344], [444, 298]],
          label: p.swapLabel || "按换股比率发行新 H股 · 附异议现金选择权",
          sublabel: p.swapSub || "基准日均价定价 · 满足 TC 2.10 H股类别会表决",
          labelCenter: [324, 344],
          labelWidth: 344,
          labelHeight: 44,
        },
        // Outer concentric arch: Absorbed -> Absorber (Asset Assumption & Delisting, strictly outside inner pill)
        {
          id: "A_ah_cancel",
          panel: "left",
          step: "②",
          kind: "cancel",
          terminated: p.status === "terminated",
          pathPoints: [[558, 298], [558, 412], [90, 412], [90, 298]],
          label: p.cancelLabel || "承继全部资产负债 · 被吸收 H股 LR 6.15(2) 退市注销",
          sublabel: p.cancelSub || "同步获联交所及内地证监会/国资审批",
          labelCenter: [324, 412],
          labelWidth: 386,
          labelHeight: 42,
        },
      ]
    );
  }

  function buildTopupPlacingTopology(p) {
    const canvas = createDiagramCanvas({
      width: MASTER_W,
      height: 468,
      status: p.status,
      leftTitle: p.leftTitle || "先旧后新闪电配售 / 新股配售流向",
      rightTitle: p.rightTitle || "配售完成后股本结构",
      transitionLabel: p.transitionLabel || "认新完成",
      outcomeBadge: p.outcomeBadge,
    });
    return finalizeLayout(
      canvas,
      [
        { id: "L_vendor", panel: "left", x: 34, y: 66, w: 220, h: 78, role: "seller", title: p.vendorName || "控股股东（卖旧认新）", subtitle: "T+2 先行出售既有老股" },
        { id: "L_listed", panel: "left", x: 34, y: 248, w: 220, h: 86, role: "listed", title: p.listedName, code: p.code, subtitle: "一般性授权增发主体" },
        { id: "L_placees", panel: "left", x: 404, y: 162, w: 210, h: 84, role: "buyer", title: p.placeesName || "不少于6名独立承配人", subtitle: "配售代理簿记建档承配" },
        { id: "R_vendor", panel: "right", x: 700, y: 110, w: 162, h: 84, role: "seller", title: "控股股东", subtitle: "股数还原 · 持股比微摊" },
        { id: "R_placees", panel: "right", x: 886, y: 110, w: 162, h: 84, role: "public", title: "承配人及公众股东", subtitle: "公众流通盘扩大" },
        { id: "R_listed", panel: "right", x: 734, y: 292, w: 280, h: 84, role: "listed", title: p.listedName, code: p.code, subtitle: "募资净额入账 · 扩大已发行股本" },
      ],
      [
        { id: "E_L1", panel: "left", from: "L_vendor", to: "L_listed", pctLabel: "既有控股股权", pillWidth: 112, labelCenter: [144, 196], dashed: false },
        { id: "E_R1", panel: "right", from: "R_vendor", to: "R_listed", anchorFromRatio: 0.5, anchorToRatio: 0.17, pctLabel: "摊薄后控股", pillWidth: 104, labelCenter: [781, 243], dashed: false },
        { id: "E_R2", panel: "right", from: "R_placees", to: "R_listed", anchorFromRatio: 0.5, anchorToRatio: 0.83, pctLabel: "扩大公众股", pillWidth: 104, labelCenter: [967, 243], dashed: true },
      ],
      [
        {
          id: "A_topup_old",
          panel: "left",
          step: "①",
          kind: "shares",
          terminated: p.status === "terminated",
          pathPoints: [[254, 105], [509, 105], [509, 162]],
          label: p.oldLabel || "先旧：折让配售老股 · T+2 交割",
          sublabel: p.oldSub || "配售代理独家/联席簿记 · 不少于6名独立承配人",
          labelCenter: [442, 105],
          labelWidth: 274,
          labelHeight: 46,
        },
        {
          id: "A_topup_cash",
          panel: "left",
          step: "②",
          kind: "cash",
          terminated: p.status === "terminated",
          pathPoints: [[509, 246], [509, 394], [144, 394], [144, 334]],
          label: p.cashLabel || "后新：扣配售佣金净额认购等额新股",
          sublabel: p.cashSub || "14日内完成新股认购 · 适用 LR 14A.92(4) 豁免",
          labelCenter: [346, 394],
          labelWidth: 288,
          labelHeight: 46,
        },
      ]
    );
  }

  function buildCbTopology(p) {
    const canvas = createDiagramCanvas({
      width: MASTER_W,
      height: 468,
      status: p.status,
      leftTitle: p.leftTitle || "可转债 / 可交换债簿记发行流向",
      rightTitle: p.rightTitle || "发行后资本与潜在转股架构",
      transitionLabel: p.transitionLabel || "债券交割",
      outcomeBadge: p.outcomeBadge,
    });
    return finalizeLayout(
      canvas,
      [
        { id: "L_sh", panel: "left", x: 34, y: 66, w: 220, h: 78, role: "public", title: p.shName || "现有控股及公众股东", subtitle: "转股前既有股东" },
        { id: "L_listed", panel: "left", x: 34, y: 244, w: 220, h: 90, role: "listed", title: p.listedName, code: p.code, subtitle: p.issuerSub || "可转债发行人 / 担保主体" },
        { id: "L_inv", panel: "left", x: 404, y: 204, w: 210, h: 88, role: "creditor", title: p.invName || "境外机构债券认购人", subtitle: p.investorSub || "债券认购人" },
        { id: "R_sh", panel: "right", x: 700, y: 112, w: 162, h: 84, role: "public", title: "既有股东", subtitle: "未转股前零即时摊薄" },
        { id: "R_cb", panel: "right", x: 886, y: 112, w: 162, h: 84, role: "creditor", title: "可转债持有人", subtitle: p.holderSub || "按条款享有转股权" },
        { id: "R_listed", panel: "right", x: 734, y: 292, w: 280, h: 84, role: "listed", title: p.listedName, code: p.code, subtitle: p.listingSub || "转股时按条款发行新股" },
      ],
      [
        { id: "E_L1", panel: "left", from: "L_sh", to: "L_listed", pctLabel: "100% 既有股本", pillWidth: 114, labelCenter: [144, 194], dashed: false },
        { id: "E_R1", panel: "right", from: "R_sh", to: "R_listed", anchorFromRatio: 0.5, anchorToRatio: 0.17, pctLabel: "既有普通股", pillWidth: 104, labelCenter: [781, 244], dashed: false },
        { id: "E_R2", panel: "right", from: "R_cb", to: "R_listed", anchorFromRatio: 0.5, anchorToRatio: 0.83, pctLabel: "潜在转股权益", pillWidth: 108, labelCenter: [967, 244], dashed: true },
      ],
      [
        {
          id: "A_cb_cash",
          panel: "left",
          step: "①",
          kind: "cash",
          terminated: p.status === "terminated",
          pathPoints: [[509, 204], [509, 118], [296, 118], [296, 266], [254, 266]],
          label: p.cashLabel || "认购可转债本金 · 扣承销佣金净额",
          sublabel: p.cashSub || "牵头经办人簿记定价 · 低息或零息长期资金",
          labelCenter: [452, 118],
          labelWidth: 274,
          labelHeight: 46,
        },
        {
          id: "A_cb_conv",
          panel: "left",
          step: "②",
          kind: "shares",
          terminated: p.status === "terminated",
          pathPoints: [[144, 334], [144, 394], [509, 394], [509, 292]],
          label: p.convLabel || "按初始转股价附条件换股新股",
          sublabel: p.convSub || "较参考股价溢价转股 · 一般或特别授权",
          labelCenter: [344, 394],
          labelWidth: 288,
          labelHeight: 46,
        },
      ]
    );
  }

  function buildRightsIssueTopology(p) {
    const canvas = createDiagramCanvas({
      width: MASTER_W,
      height: 468,
      status: p.status,
      leftTitle: p.leftTitle || "供股 / 公开招股与包销流向",
      rightTitle: p.rightTitle || "供股完成后股本结构",
      transitionLabel: p.transitionLabel || "供股交割",
      outcomeBadge: p.outcomeBadge,
    });
    return finalizeLayout(
      canvas,
      [
        { id: "L_qsh", panel: "left", x: 34, y: 66, w: 220, h: 78, role: "public", title: p.qshName || "合资格现有股东", subtitle: "按持股比例获配供股权" },
        { id: "L_listed", panel: "left", x: 34, y: 248, w: 220, h: 86, role: "listed", title: p.listedName, code: p.code, subtitle: "供股 / 公开招股发行人" },
        { id: "L_uw", panel: "left", x: 404, y: 162, w: 210, h: 84, role: "buyer", title: p.uwName || "包销商 / 独立承配人", subtitle: "余额包销或未获认购补偿配售" },
        { id: "R_qsh", panel: "right", x: 700, y: 110, w: 162, h: 84, role: "public", title: "参与供股股东", subtitle: "按比例认购免受摊薄" },
        { id: "R_uw", panel: "right", x: 886, y: 110, w: 162, h: 84, role: "buyer", title: "包销商 / 承配人", subtitle: "承接未获认购股份" },
        { id: "R_listed", panel: "right", x: 734, y: 292, w: 280, h: 84, role: "listed", title: p.listedName, code: p.code, subtitle: "募集净额入账 · 股本相应扩大" },
      ],
      [
        { id: "E_L1", panel: "left", from: "L_qsh", to: "L_listed", pctLabel: "按比例供股基准", pillWidth: 118, labelCenter: [144, 196], dashed: true },
        { id: "E_R1", panel: "right", from: "R_qsh", to: "R_listed", anchorFromRatio: 0.5, anchorToRatio: 0.17, pctLabel: "供股后权益", pillWidth: 104, labelCenter: [781, 243], dashed: false },
        { id: "E_R2", panel: "right", from: "R_uw", to: "R_listed", anchorFromRatio: 0.5, anchorToRatio: 0.83, pctLabel: "包销/承配股", pillWidth: 104, labelCenter: [967, 243], dashed: true },
      ],
      [
        {
          id: "A_ri_sub",
          panel: "left",
          step: "①",
          kind: "cash",
          terminated: p.status === "terminated",
          pathPoints: [[254, 105], [509, 105], [509, 162]],
          label: p.subLabel || "折让认购供股股款 · 余额转包销商",
          sublabel: p.subSub || "供股可买卖未缴股款供股权 · 公开招股不可转让",
          labelCenter: [442, 105],
          labelWidth: 274,
          labelHeight: 46,
        },
        {
          id: "A_ri_uw",
          panel: "left",
          step: "②",
          kind: "shares",
          terminated: p.status === "terminated",
          pathPoints: [[509, 246], [509, 394], [144, 394], [144, 334]],
          label: p.uwLabel || "配发供股新股 · 支付包销及顾问费",
          sublabel: p.uwSub || "增发 >50% 须 LR 7.19A 独立股东批准及 IFA",
          labelCenter: [346, 394],
          labelWidth: 288,
          labelHeight: 46,
        },
      ]
    );
  }

  function buildConnectedWhitewashTopology(p) {
    const canvas = createDiagramCanvas({
      width: MASTER_W,
      height: 468,
      status: p.status,
      leftTitle: p.leftTitle || "14A 章非豁免关连 / 清洗豁免程序",
      rightTitle: p.rightTitle || "独立股东批准交割后架构",
      transitionLabel: p.transitionLabel || "独立批准",
      outcomeBadge: p.outcomeBadge,
    });
    return finalizeLayout(
      canvas,
      [
        { id: "L_conn", panel: "left", x: 34, y: 66, w: 220, h: 78, role: "seller", title: p.connName || "控股股东 / 关连人士", subtitle: "利害关系方 · 股东会回避表决" },
        { id: "L_listed", panel: "left", x: 34, y: 244, w: 220, h: 90, role: "listed", title: p.listedName, code: p.code, subtitle: "设独立董事委员会 (IBC)" },
        { id: "L_ish", panel: "left", x: 404, y: 204, w: 210, h: 88, role: "public", title: p.ishName || "无利害独立股东 + IFA", subtitle: "审阅独立财务顾问函件表决" },
        { id: "R_conn", panel: "right", x: 700, y: 112, w: 162, h: 84, role: "seller", title: "关连方 / 认购人", subtitle: "完成交割 · 豁免 MGO" },
        { id: "R_ish", panel: "right", x: 886, y: 112, w: 162, h: 84, role: "public", title: "独立公众股东", subtitle: "维持最低公众持股量" },
        { id: "R_listed", panel: "right", x: 734, y: 292, w: 280, h: 84, role: "listed", title: p.listedName, code: p.code, subtitle: "完成关连资产交割或新股增发" },
      ],
      [
        { id: "E_L1", panel: "left", from: "L_conn", to: "L_listed", pctLabel: "关连持股 ≥10%/30%", pillWidth: 126, labelCenter: [144, 194], dashed: false },
        { id: "E_R1", panel: "right", from: "R_conn", to: "R_listed", anchorFromRatio: 0.5, anchorToRatio: 0.17, pctLabel: "交割后持股", pillWidth: 104, labelCenter: [781, 244], dashed: false },
        { id: "E_R2", panel: "right", from: "R_ish", to: "R_listed", anchorFromRatio: 0.5, anchorToRatio: 0.83, pctLabel: "独立公众股", pillWidth: 104, labelCenter: [967, 244], dashed: true },
      ],
      [
        {
          id: "A_cw_ifa",
          panel: "left",
          step: "①",
          kind: "asset",
          terminated: p.status === "terminated",
          pathPoints: [[509, 204], [509, 118], [296, 118], [296, 266], [254, 266]],
          label: p.ifaLabel || "IFA 出具独立意见 · 独立股东表决",
          sublabel: p.ifaSub || "14A章普通决议 >50% · 清洗豁免须 ≥75% 赞成",
          labelCenter: [452, 118],
          labelWidth: 274,
          labelHeight: 46,
        },
        {
          id: "A_cw_tx",
          panel: "left",
          step: "②",
          kind: "shares",
          terminated: p.status === "terminated",
          pathPoints: [[144, 334], [144, 394], [509, 394], [509, 292]],
          label: p.txLabel || "关连收售对价结算 / 增发新股免全面要约",
          sublabel: p.txSub || "寄发通函并经联交所及证监会执行人员审阅",
          labelCenter: [344, 394],
          labelWidth: 288,
          labelHeight: 46,
        },
      ]
    );
  }

  /* =========================================================================
     4. 14 CANONICAL HKEX IB DEAL & ECM ARCHETYPES (ORGANIZED BY 4 REVENUE PILLARS)
     ========================================================================= */
  const PILLAR_GROUPS = [
    {
      id: "ch14_14a",
      labelZh: "第 14 / 14A 章 · 并购与关连",
      shortZh: "14 / 14A 章并购关连",
      subZh: "须予披露 (5–25%) · 主要交易 (Major) · VSA/VSD · 14A 关连",
      archetypes: ["disclosable_major", "acquisition", "disposal", "connected_whitewash"],
    },
    {
      id: "takeovers",
      labelZh: "收购守则 · 私有化与要约",
      shortZh: "收购守则与要约",
      subZh: "TC 2.10 私有化 · TC 26.1 全面要约 · 清洗豁免 / 回购",
      archetypes: ["scheme", "offer", "connected_whitewash"],
    },
    {
      id: "reorg",
      labelZh: "集团重组 · 分拆与化债",
      shortZh: "重组 · 分拆 · 化债",
      subZh: "LR 14.06B 反收购 · PN15 分拆 · 控司/A+H 换股 · 境外债重组",
      archetypes: ["reverse_takeover", "spin_off", "holding_substitution", "ah_share_absorption", "debt_restructuring"],
    },
    {
      id: "ecm",
      labelZh: "再融资配售 · CB 与供股",
      shortZh: "再融资 · 配售 · CB",
      subZh: "先旧后新 / 新股配售 · 可转债 CB/EB · 供股 / 公开招股包销",
      archetypes: ["topup_placing", "convertible_bond", "rights_open_offer"],
    },
  ];

  const ARCHETYPES = {
    scheme: {
      id: "scheme",
      labelZh: "协议安排私有化",
      shortZh: "协议私有化",
      labelEn: "Scheme of Arrangement Privatisation",
      modalityLabelZh: "全现金注销 · 法院批准退市",
      ruleTriggers: ["TC:2.10", "TC:3.5", "HKEX:6.15(2)"],
      summaryZh:
        "要约人透过法院会议及股东特别大会表决通过协议安排，以现金注销计划股份、向要约人发行新股并撤销港交所上市地位。",
      codexTemplate: {
        id: "TEMPLATE-scheme",
        archetype: "scheme",
        modality: "cash",
        status: "closed",
        before: {
          title: "交易前股权架构",
          nodes: [
            { id: "offeror", role: "buyer", name: "要约人 / 控股方", sublabel: "收购方", tier: 0 },
            { id: "scheme_sh", role: "public", name: "计划股东（无利害股东）", sublabel: "法院会议表决主体", tier: 0 },
            { id: "listed", role: "listed", name: "港股上市主体", code: "00000.HK", sublabel: "主板上市公司", tier: 1 },
          ],
          equityLinks: [
            { from: "offeror", to: "listed", label: "既有控股股权", style: "solid" },
            { from: "scheme_sh", to: "listed", label: "计划股份", style: "dashed" },
          ],
        },
        flows: [
          {
            id: "f1",
            kind: "cash",
            direction: "ltr",
            step: "01",
            fromLabel: "要约人",
            toLabel: "计划股东",
            headline: "每股注销价 · 现金对价总额",
            subline: "较最后交易日溢价 · 全现金支付",
            proposedOrTerminated: false,
          },
          {
            id: "f2",
            kind: "cancel",
            direction: "rtl",
            step: "02",
            fromLabel: "计划股份",
            toLabel: "注销并撤销上市",
            headline: "注销计划股份 · LR 6.15(2) 退市",
            subline: "须满足 TC 2.10（赞成 ≥75% 且无利害反对 ≤10%）及法院批准",
            proposedOrTerminated: false,
          },
        ],
        after: {
          title: "交易后股权架构",
          nodes: [
            { id: "offeror_after", role: "buyer", name: "要约人 / 控股方", sublabel: "全资母公司", tier: 0 },
            { id: "listed_after", role: "target", name: "私有化后主体", sublabel: "非上市全资附属", badge: "已撤销上市", tier: 1 },
          ],
          equityLinks: [
            { from: "offeror_after", to: "listed_after", label: "100% 全资控股", pct: 100, style: "solid" },
          ],
          outcomeBadge: "100% 全资控股 · 已撤销上市",
        },
        annotations: [
          { tag: "①", title: "交易主体与标的", body: "要约人以法院协议安排注销全部计划股份实现私有化。", ruleCode: null },
          { tag: "②", title: "对价与估值锚点", body: "列明每股注销价、现金总需求及最后交易日溢价。", ruleCode: null },
          { tag: "③", title: "监管规则触发", body: "适用《收购守则》Rule 2.10 双重表决门槛及 LR 6.15(2) 退市。", ruleCode: "TC:2.10 · HKEX:6.15(2)" },
          { tag: "④", title: "审批与交割节奏", body: "追踪首次公告 → 寄发计划文件 → 法院会议 → 法院批准 → 生效退市。", ruleCode: null },
        ],
        topology: buildSchemeTopology({
          status: "closed",
          buyerName: "要约人 / 控股方",
          publicName: "计划股东（无利害股东）",
          listedName: "港股上市主体",
          code: "00000.HK",
          cashLabel: "现金注销对价 · 每股注销价",
          cashSub: "较最后交易日溢价 · 全现金支付计划股东",
          cancelLabel: "注销计划股份 · 撤销上市",
          cancelSub: "TC 2.10 赞成 ≥75% / 反对 ≤10%",
          outcomeBadge: "100% 全资控股 · 已撤销上市",
        }),
      },
    },

    offer: {
      id: "offer",
      labelZh: "控制权变更 / 强制全面要约",
      shortZh: "控股权/全面要约",
      labelEn: "Change of Control & Mandatory General Offer",
      modalityLabelZh: "协议转让控股权 + 现金全面要约",
      ruleTriggers: ["TC:26.1", "TC:3.5"],
      summaryZh:
        "买方向原控股股东协议购入跨越 30% 门槛的控股权，依法触发《收购守则》Rule 26.1 强制全面现金要约，维持港交所上市地位。",
      codexTemplate: {
        id: "TEMPLATE-offer",
        archetype: "offer",
        modality: "cash",
        status: "active",
        before: {
          title: "交易前股权架构",
          nodes: [
            { id: "seller", role: "seller", name: "原控股股东", sublabel: "出售方", tier: 0 },
            { id: "public", role: "public", name: "其余独立股东", sublabel: "潜在要约对象", tier: 0 },
            { id: "listed", role: "listed", name: "港股上市主体", code: "00000.HK", sublabel: "主板上市公司", tier: 1 },
            { id: "buyer", role: "buyer", name: "新控权收购方", sublabel: "外部要约人", badge: "拟入主", tier: 2 },
          ],
          equityLinks: [
            { from: "seller", to: "listed", label: "原控股权（≥30%）", style: "solid" },
            { from: "public", to: "listed", label: "余下公众股权", style: "dashed" },
          ],
        },
        flows: [
          {
            id: "f1",
            kind: "cash",
            direction: "ltr",
            step: "Step 1",
            fromLabel: "收购方",
            toLabel: "原控股股东",
            headline: "现金收购控股权区块",
            subline: "协议买卖股份完成后触发控制权变更",
            proposedOrTerminated: false,
          },
          {
            id: "f2",
            kind: "cash",
            direction: "ltr",
            step: "Step 2",
            fromLabel: "要约人",
            toLabel: "其余要约股东",
            headline: "TC 26.1 强制无条件现金要约",
            subline: "按不低于控股权收购价向余下股东提出全面现金要约",
            proposedOrTerminated: false,
          },
        ],
        after: {
          title: "交易后股权架构",
          nodes: [
            { id: "buyer_after", role: "buyer", name: "新控股股东", sublabel: "完成控股权交割", tier: 0 },
            { id: "public_after", role: "public", name: "公众股东", sublabel: "维持公众持股量", tier: 0 },
            { id: "listed_after", role: "listed", name: "港股上市主体", code: "00000.HK", sublabel: "维持主板上市", tier: 1 },
          ],
          equityLinks: [
            { from: "buyer_after", to: "listed_after", label: "控股股权", style: "solid" },
            { from: "public_after", to: "listed_after", label: "公众持股", style: "dashed" },
          ],
          outcomeBadge: "新控权方入主 · 维持主板上市",
        },
        annotations: [
          { tag: "①", title: "交易主体与标的", body: "买方协议受让原大股东控股权并向独立股东提强制全面要约。", ruleCode: null },
          { tag: "②", title: "两步现金安排", body: "并列展示大宗控股权现金对价、要约总值与扣除不接纳承诺后的最高现金需求。", ruleCode: null },
          { tag: "③", title: "监管规则触发", body: "持股跨越 30% 触发《收购守则》Rule 26.1 强制全面现金要约。", ruleCode: "TC:26.1" },
          { tag: "④", title: "审批与交割节奏", body: "跟踪买卖协议交割日、综合文件寄发及要约截止结果。", ruleCode: null },
        ],
        topology: buildOfferTopology({
          status: "active",
          buyerName: "新控权收购方",
          sellerName: "原控股股东",
          publicName: "其余独立股东",
          listedName: "港股上市主体",
          code: "00000.HK",
          beforeSellerPct: "原控股权 ≥30%",
          beforePublicPct: "余下公众股",
          afterBuyerPct: "新控股权",
          afterPublicPct: "公众持股",
          step1CashLabel: "现金收购控股权区块",
          step1CashSub: "买卖协议交割触发控权易手",
          step1SharesLabel: "控股权",
          step2MgoLabel: "TC 26.1 强制无条件现金要约",
          step2MgoSub: "按同等每股要约价向余下股东发出全面要约",
          outcomeBadge: "新控权方入主 · 维持主板上市",
        }),
      },
    },

    acquisition: {
      id: "acquisition",
      labelZh: "非常重大 / 关连收购",
      shortZh: "重大/关连收购",
      labelEn: "Very Substantial / Connected Acquisition",
      modalityLabelZh: "发行代价股或现金收购标的",
      ruleTriggers: ["HKEX:14", "HKEX:14A", "HKEX:14.06C"],
      summaryZh:
        "上市公司向第三方或关连卖方收购重大资产或股权，以发行代价股份、现金或混合方式支付，视规模触发第 14/14A 章或极端交易审查。",
      codexTemplate: {
        id: "TEMPLATE-acquisition",
        archetype: "acquisition",
        modality: "shares",
        status: "active",
        before: {
          title: "交易前架构",
          nodes: [
            { id: "listed", role: "listed", name: "港股上市主体", code: "00000.HK", sublabel: "收购方", tier: 0 },
            { id: "seller", role: "seller", name: "资产出售方", sublabel: "卖方 / 关连方", tier: 0 },
            { id: "target", role: "target", name: "目标公司 / 业务", sublabel: "拟注入标的", tier: 1 },
          ],
          equityLinks: [{ from: "seller", to: "target", label: "标的股权", style: "solid" }],
        },
        flows: [
          {
            id: "f1",
            kind: "shares",
            direction: "ltr",
            step: "01",
            fromLabel: "上市主体",
            toLabel: "出售方",
            headline: "发行代价股份 / 支付收购对价",
            subline: "按约定发行价配发新股或现金分期结算",
            proposedOrTerminated: false,
          },
          {
            id: "f2",
            kind: "asset",
            direction: "rtl",
            step: "02",
            fromLabel: "出售方",
            toLabel: "上市主体",
            headline: "注入目标公司股权 / 核心资产",
            subline: "完成后目标公司并表成为上市附属",
            proposedOrTerminated: false,
          },
        ],
        after: {
          title: "交易后架构",
          nodes: [
            { id: "seller_after", role: "seller", name: "原出售方", sublabel: "持有代价股份", tier: 0 },
            { id: "listed_after", role: "listed", name: "港股上市主体", code: "00000.HK", sublabel: "扩大后上市平台", tier: 1 },
            { id: "target_after", role: "target", name: "目标公司", sublabel: "并表附属公司", tier: 2 },
          ],
          equityLinks: [
            { from: "seller_after", to: "listed_after", label: "代价股份权益", style: "dashed" },
            { from: "listed_after", to: "target_after", label: "控股 / 全资并表", style: "solid" },
          ],
          outcomeBadge: "标的资产并表 · 维持主板上市",
        },
        annotations: [
          { tag: "①", title: "交易主体与标的", body: "上市公司收购卖方所持目标股权，构成须予公布及/或关连交易。", ruleCode: null },
          { tag: "②", title: "对价与支付方式", body: "列明购买价、币种折算及代价股份发行价与股数。", ruleCode: null },
          { tag: "③", title: "监管规则触发", body: "视百分比率适用 LR 第 14 章、14A 章或拟申请 14.06C 极端交易。", ruleCode: "HKEX:14 · HKEX:14A" },
          { tag: "④", title: "审批与交割节奏", body: "须独立股东批准及联交所审阅通函；若协议终止则标示 TC 31.1(c) 限制。", ruleCode: null },
        ],
        topology: buildAcquisitionTopology({
          status: "active",
          listedName: "港股上市主体",
          code: "00000.HK",
          sellerName: "资产出售方",
          targetName: "目标公司 / 业务",
          payKind: "shares",
          payLabel: "按发行价配发代价股份",
          paySub: "约定购买价 · 须独立股东批准",
          assetLabel: "注入目标公司 100% 股权",
          assetSub: "LR 第 14 / 14A 章重大及关连收购",
          outcomeBadge: "标的资产并表 · 维持主板上市",
        }),
      },
    },

    disposal: {
      id: "disposal",
      labelZh: "主要 / 非常重大资产处置",
      shortZh: "重大资产处置",
      labelEn: "Major / Very Substantial Disposal",
      modalityLabelZh: "资产出表 + 现金结算回笼",
      ruleTriggers: ["HKEX:14", "HKEX:14.07"],
      summaryZh:
        "上市公司或其附属 SPV 向买方出售非核心资产、附属股权或终止融资租赁并交付标的资产，回收现金并依百分比率履行第 14 章股东审批。",
      codexTemplate: {
        id: "TEMPLATE-disposal",
        archetype: "disposal",
        modality: "cash_and_asset",
        status: "approved",
        before: {
          title: "交易前权属架构",
          nodes: [
            { id: "listed", role: "listed", name: "港股上市主体", code: "00000.HK", sublabel: "母公司", tier: 0 },
            { id: "spv", role: "seller", name: "出售方附属 / SPV", sublabel: "收款方", tier: 1 },
            { id: "buyer", role: "buyer", name: "资产承购方", sublabel: "付款方", tier: 1 },
            { id: "asset", role: "target", name: "拟处置标的资产", sublabel: "独立估值锚定", tier: 2 },
          ],
          equityLinks: [
            { from: "listed", to: "spv", label: "附属控制", style: "solid" },
            { from: "spv", to: "asset", label: "资产权属", style: "solid" },
          ],
        },
        flows: [
          {
            id: "f1",
            kind: "cash",
            direction: "rtl",
            step: "01",
            fromLabel: "承购方",
            toLabel: "上市附属 SPV",
            headline: "支付现金处置对价 / 结算款",
            subline: "对标独立估值师市场估值",
            proposedOrTerminated: false,
          },
          {
            id: "f2",
            kind: "asset",
            direction: "ltr",
            step: "02",
            fromLabel: "上市附属 SPV",
            toLabel: "承购方",
            headline: "交付标的资产及终止相关合约",
            subline: "资产出表并改善上市集团现金流",
            proposedOrTerminated: false,
          },
        ],
        after: {
          title: "交易后权属架构",
          nodes: [
            { id: "listed_after", role: "listed", name: "港股上市主体", code: "00000.HK", sublabel: "回收现金 · 维持上市", tier: 0 },
            { id: "buyer_after", role: "buyer", name: "资产承购方", sublabel: "承接标的资产", tier: 1 },
            { id: "asset_after", role: "target", name: "已处置标的资产", sublabel: "移出上市合并范围", tier: 2 },
          ],
          equityLinks: [{ from: "buyer_after", to: "asset_after", label: "交付过户", style: "solid" }],
          outcomeBadge: "资产出表回笼现金 · 维持上市",
        },
        annotations: [
          { tag: "①", title: "交易主体与标的", body: "上市公司附属主体向承购方出售标的资产并终止关联租约。", ruleCode: null },
          { tag: "②", title: "对价与估值锚点", body: "对比现金结算额与独立估值报告所载市场公允值。", ruleCode: null },
          { tag: "③", title: "监管规则触发", body: "依据 LR 14.07 百分比率界定主要交易（25%–75%）或非常重大出售（≥75%）。", ruleCode: "HKEX:14.07" },
          { tag: "④", title: "审批与交付节点", body: "按公告 → 通函寄发 → 股东批准 → 资产交付追踪里程碑。", ruleCode: null },
        ],
        topology: buildDisposalTopology({
          status: "approved",
          listedName: "港股上市主体",
          code: "00000.HK",
          sellerName: "出售方附属 SPV",
          buyerName: "资产承购方",
          assetName: "拟处置标的资产",
          cashLabel: "现金处置结算对价",
          cashSub: "对标独立估值报告市场公允值",
          assetLabel: "交付标的资产并终止相关合约",
          assetSubArrow: "LR 14.07 主要交易 · 股东大会批准",
          outcomeBadge: "资产出表回笼现金 · 维持上市",
        }),
      },
    },

    reverse_takeover: {
      id: "reverse_takeover",
      labelZh: "反向收购 / 借壳合并",
      shortZh: "反向收购 RTO",
      labelEn: "Reverse Takeover (RTO) Merger",
      modalityLabelZh: "大比例发行代价股 · 视同新上市审批",
      ruleTriggers: ["HKEX:14.06B", "TC:26"],
      summaryZh:
        "上市平台透过大比例增发代价股份合并收购规模显著更大的未上市业务，导致控制权易手并按《上市规则》14.06B 视同新上市申请审批。",
      codexTemplate: {
        id: "TEMPLATE-rto",
        archetype: "reverse_takeover",
        modality: "shares",
        status: "closed",
        before: {
          title: "合并前双主体架构",
          nodes: [
            { id: "orig_sh", role: "public", name: "原上市公司股东", sublabel: "既有股东", tier: 0 },
            { id: "target_sh", role: "seller", name: "标的集团股东", sublabel: "新控权注入方", tier: 0 },
            { id: "listed", role: "listed", name: "原港股上市平台", code: "00000.HK", sublabel: "合并存续上市主体", tier: 1 },
            { id: "target", role: "target", name: "拟并入目标集团", sublabel: "核心经营业务", tier: 1 },
          ],
          equityLinks: [
            { from: "orig_sh", to: "listed", label: "100% 原上市股本", pct: 100, style: "dashed" },
            { from: "target_sh", to: "target", label: "100% 标的股权", pct: 100, style: "solid" },
          ],
        },
        flows: [
          {
            id: "f1",
            kind: "shares",
            direction: "ltr",
            step: "01",
            fromLabel: "港股上市平台",
            toLabel: "标的集团股东",
            headline: "按换股比例增发大比例代价股份",
            subline: "标的股东成为扩大后股本控股股东（配套清洗豁免）",
            proposedOrTerminated: false,
          },
          {
            id: "f2",
            kind: "asset",
            direction: "rtl",
            step: "02",
            fromLabel: "标的集团股东",
            toLabel: "港股上市平台",
            headline: "合并注入目标集团 100% 股权",
            subline: "按 LR 14.06B 新上市标准获联交所批准后交割并更名",
            proposedOrTerminated: false,
          },
        ],
        after: {
          title: "合并后上市架构",
          nodes: [
            { id: "target_sh_after", role: "buyer", name: "原标的集团股东", sublabel: "取得控制权", tier: 0 },
            { id: "orig_sh_after", role: "public", name: "原上市公司股东", sublabel: "摊薄后存续股东", tier: 0 },
            { id: "listed_after", role: "listed", name: "合并后上市集团", code: "00000.HK", sublabel: "更名并延续上市", tier: 1 },
            { id: "target_after", role: "target", name: "目标业务集团", sublabel: "全资核心子公司", tier: 2 },
          ],
          equityLinks: [
            { from: "target_sh_after", to: "listed_after", label: "控股股权", style: "solid" },
            { from: "orig_sh_after", to: "listed_after", label: "存续少数权益", style: "dashed" },
            { from: "listed_after", to: "target_after", label: "100% 全资控股", pct: 100, style: "solid" },
          ],
          outcomeBadge: "标的股东入主控股 · LR 14.06B 合并完成",
        },
        annotations: [
          { tag: "①", title: "交易主体与标的", body: "上市平台以发行代价股份方式反向并购目标集团，并完成主体更名。", ruleCode: null },
          { tag: "②", title: "换股与股权稀释", body: "披露精确换股比例、发行代价股总数及标的股东占扩大后股本比例。", ruleCode: null },
          { tag: "③", title: "监管规则触发", body: "构成《上市规则》14.06B 反向收购，须按新上市申请标准通过聆讯审批。", ruleCode: "HKEX:14.06B" },
          { tag: "④", title: "全周期追踪", body: "独立追踪首次公告至合并完成之自然日周期。", ruleCode: null },
        ],
        topology: buildRtoTopology({
          status: "closed",
          origShName: "原上市公司股东",
          targetShName: "标的集团股东",
          beforeListedName: "原港股上市平台",
          targetName: "拟并入目标集团",
          afterCtrlName: "原标的集团股东",
          afterListedName: "合并后上市集团",
          code: "00000.HK",
          afterCtrlPct: "扩大后控股",
          afterOrigPct: "存续少数权益",
          sharesLabel: "按换股比增发代价股",
          sharesSub: "标的股东入主控权 · 清洗豁免",
          assetLabel: "100% 吸收合并注入",
          assetSub: "LR 14.06B 视同新上市审批",
          outcomeBadge: "标的股东入主控股 · LR 14.06B 合并完成",
        }),
      },
    },

    holding_substitution: {
      id: "holding_substitution",
      labelZh: "更换控股公司 / 迁册介绍上市",
      shortZh: "更换控股/迁册",
      labelEn: "Holding Company Substitution / Redomiciliation",
      modalityLabelZh: "1:1 等比换股 · 原股退市与介绍上市",
      ruleTriggers: ["HKEX:6.15(2)", "HKEX:7.14"],
      summaryZh:
        "透过法院安排计划按 1:1 等比例将既有股东持股平移至新司法管辖区控股公司，撤销原主体上市地位并由新控股公司以介绍方式同步上市。",
      codexTemplate: {
        id: "TEMPLATE-holdco",
        archetype: "holding_substitution",
        modality: "share_swap",
        status: "closed",
        before: {
          title: "重组前架构",
          nodes: [
            { id: "sh", role: "public", name: "原全体计划股东", sublabel: "既有股东名册", tier: 0 },
            { id: "old_holdco", role: "listed", name: "原境外上市控股公司", code: "00000.HK", sublabel: "原注册地上市主体", tier: 1 },
          ],
          equityLinks: [{ from: "sh", to: "old_holdco", label: "100% 既有股份", pct: 100, style: "solid" }],
        },
        flows: [
          {
            id: "f1",
            kind: "shares",
            direction: "bi",
            step: "01",
            fromLabel: "原全体计划股东",
            toLabel: "新控股公司",
            headline: "1 : 1 等比换股 · 零现金零摊薄",
            subline: "每 1 股原股份换取 1 股新控股公司股份",
            proposedOrTerminated: false,
          },
          {
            id: "f2",
            kind: "cancel",
            direction: "ltr",
            step: "02",
            fromLabel: "原上市主体",
            toLabel: "新控股介绍上市",
            headline: "LR 6.15(2) 撤销原上市 · 新控股介绍上市",
            subline: "原控股公司转为新控股公司 100% 全资附属",
            proposedOrTerminated: false,
          },
        ],
        after: {
          title: "重组后架构",
          nodes: [
            { id: "sh_after", role: "public", name: "原全体股东", sublabel: "持股比例零变动", tier: 0 },
            { id: "new_holdco", role: "holdco", name: "新香港控股公司", code: "00000.HK", sublabel: "介绍上市新主体", tier: 1 },
            { id: "old_sub", role: "target", name: "原境外控股主体", sublabel: "转为全资附属", badge: "原股退市", tier: 2 },
          ],
          equityLinks: [
            { from: "sh_after", to: "new_holdco", label: "100% 介绍上市股份", pct: 100, style: "solid" },
            { from: "new_holdco", to: "old_sub", label: "100% 全资控股", pct: 100, style: "solid" },
          ],
          outcomeBadge: "新控股 100% 控股原主体 · 介绍上市",
        },
        annotations: [
          { tag: "①", title: "架构重组路径", body: "经原注册地法院安排计划设立香港或新辖区顶层控股公司。", ruleCode: null },
          { tag: "②", title: "1:1 等比换股", body: "无新股融资及现金流出，既有股东在集团内的经济权益完全不变。", ruleCode: null },
          { tag: "③", title: "监管规则触发", body: "适用 LR 6.15(2) 撤销原主体上市及介绍方式新控股上市。", ruleCode: "HKEX:6.15(2)" },
          { tag: "④", title: "审批与实施周期", body: "记录首次公告、法院聆讯批准及新股份开始买卖实施日。", ruleCode: null },
        ],
        topology: buildHoldcoTopology({
          status: "closed",
          oldHoldco: "原境外上市控股公司",
          newHoldco: "新香港控股公司",
          code: "00000.HK",
          oldJur: "境外",
          newJur: "香港",
          swapLabel: "法院安排计划 · 1 : 1 换股",
          swapSub: "1 股原股换 1 股新控股 · 无现金零摊薄",
          cancelLabel: "LR 6.15(2) 原股撤销上市 · 新控股介绍上市",
          cancelSub: "原主体转为新控股 100% 全资附属",
          outcomeBadge: "新控股 100% 控股原主体 · 介绍上市",
        }),
      },
    },

    spin_off: {
      id: "spin_off",
      labelZh: "分拆独立上市",
      shortZh: "PN15 分拆上市",
      labelEn: "PN15 Spin-off & Separate Listing",
      modalityLabelZh: "实物分派 / 优先认购 + 独立挂牌",
      ruleTriggers: ["HKEX:PN15", "HKEX:14"],
      summaryZh:
        "港股母公司依据《上市规则》第 15 项应用指引（PN15）将成熟子公司分拆独立上市，透过全球发售、实物分派或保证配额保障既有股东权益。",
      codexTemplate: {
        id: "TEMPLATE-spinoff",
        archetype: "spin_off",
        modality: "shares",
        status: "active",
        before: {
          title: "分拆前架构",
          nodes: [
            { id: "parent_sh", role: "public", name: "母公司全体股东", sublabel: "含合资格优先认购股东", tier: 0 },
            { id: "parent", role: "listed", name: "港股上市母公司", code: "00000.HK", sublabel: "控股母公司", tier: 1 },
            { id: "spinco", role: "target", name: "拟分拆业务子公司 (SpinCo)", sublabel: "全资/控股附属", tier: 2 },
          ],
          equityLinks: [
            { from: "parent_sh", to: "parent", label: "100% 母公司股本", pct: 100, style: "dashed" },
            { from: "parent", to: "spinco", label: "分拆前母公司控股", style: "solid" },
          ],
        },
        flows: [
          {
            id: "f1",
            kind: "shares",
            direction: "ltr",
            step: "01",
            fromLabel: "分拆主体 SpinCo",
            toLabel: "全球发售新股 / 母公司股东",
            headline: "PN15 独立上市 · 实物分派或保证配额",
            subline: "释放细分业务估值，满足 PN15 对母公司余下业务的独立盈利测试",
            proposedOrTerminated: false,
          },
          {
            id: "f2",
            kind: "asset",
            direction: "ltr",
            step: "02",
            fromLabel: "上市母公司",
            toLabel: "SpinCo 独立上市平台",
            headline: "业务及管理独立分拆 · 视作出售",
            subline: "分拆完成后视持股比例决定并表或权益法入账",
            proposedOrTerminated: false,
          },
        ],
        after: {
          title: "分拆后双平台",
          nodes: [
            { id: "parent_after", role: "listed", name: "上市母公司", code: "00000.HK", sublabel: "保留核心余下业务", tier: 0 },
            { id: "new_investors", role: "public", name: "SpinCo 公众及获配股东", sublabel: "独立二级市场流通", tier: 0 },
            { id: "spinco_after", role: "listed", name: "独立上市子公司 (SpinCo)", sublabel: "新独立上市代码", badge: "独立上市", tier: 1 },
          ],
          equityLinks: [
            { from: "parent_after", to: "spinco_after", label: "保留控股/参股权", style: "solid" },
            { from: "new_investors", to: "spinco_after", label: "公众流通股", style: "dashed" },
          ],
          outcomeBadge: "双上市平台运作 · 符合 PN15 分拆要求",
        },
        annotations: [
          { tag: "①", title: "分拆主体与边界", body: "明确母公司余下业务与分拆子公司（SpinCo）的业务划分与独立性。", ruleCode: null },
          { tag: "②", title: "股东保证配额", body: "披露实物分派比例或优先发售保证配额，确保现有股东权益。", ruleCode: null },
          { tag: "③", title: "监管规则触发", body: "适用《上市规则》第 15 项应用指引（PN15）及第 14 章视作出售测试。", ruleCode: "HKEX:PN15" },
          { tag: "④", title: "审批与进程", body: "需获联交所 PN15 分拆同意、独立上市聆讯及（如适用）股东批准。", ruleCode: null },
        ],
        topology: buildSpinOffTopology({
          status: "active",
          parentName: "港股上市母公司",
          code: "00000.HK",
          spinCoName: "拟分拆子公司 (SpinCo)",
          outcomeBadge: "双上市平台运作 · 符合 PN15 分拆要求",
        }),
      },
    },

    debt_restructuring: {
      id: "debt_restructuring",
      labelZh: "债务重组 / 债转股",
      shortZh: "债务重组/债转股",
      labelEn: "Debt Restructuring & Debt-to-Equity Scheme",
      modalityLabelZh: "债权削减 + 债转股 / 新债展期",
      ruleTriggers: ["HKEX:14", "TC:26", "HKEX:13.24"],
      summaryZh:
        "陷入流动性压力的港股发行人透过香港/开曼/英属维尔京群岛债权人协议安排，以现金回赎、展期新票据、强制可转债及债转股实现全面去杠杆。",
      codexTemplate: {
        id: "TEMPLATE-debt",
        archetype: "debt_restructuring",
        modality: "mixed",
        status: "active",
        before: {
          title: "重组前资本结构",
          nodes: [
            { id: "orig_sh", role: "seller", name: "原控股及公众股东", sublabel: "既有股权结构", tier: 0 },
            { id: "creditors", role: "creditor", name: "计划债权人（美元债/银团）", sublabel: "违约或待展期境外债务", tier: 0 },
            { id: "listed", role: "listed", name: "港股上市发行人", code: "00000.HK", sublabel: "债务重组主体", tier: 1 },
          ],
          equityLinks: [
            { from: "orig_sh", to: "listed", label: "原 100% 股本", pct: 100, style: "solid" },
            { from: "creditors", to: "listed", label: "境外债权主张", style: "dashed" },
          ],
        },
        flows: [
          {
            id: "f1",
            kind: "cancel",
            direction: "rtl",
            step: "01",
            fromLabel: "计划债权人",
            toLabel: "上市发行人",
            headline: "豁免 / 注销既有境外违约债务",
            subline: "债权人会议 ≥75% 债权额赞成并获法院批准",
            proposedOrTerminated: false,
          },
          {
            id: "f2",
            kind: "shares",
            direction: "ltr",
            step: "02",
            fromLabel: "上市发行人",
            toLabel: "计划债权人",
            headline: "增发债转股 / 强制可转债 (MCB) + 展期新债",
            subline: "实现资产负债表降杠杆，原股东股权显著摊薄",
            proposedOrTerminated: false,
          },
        ],
        after: {
          title: "重组后资本结构",
          nodes: [
            { id: "creditors_after", role: "creditor", name: "转股债权人", sublabel: "持有新股 / MCB / 展期债", tier: 0 },
            { id: "orig_sh_after", role: "public", name: "原控股及公众股东", sublabel: "摊薄后存续股本", tier: 0 },
            { id: "listed_after", role: "listed", name: "重组后上市发行人", code: "00000.HK", sublabel: "债务出清 · 恢复持续经营", tier: 1 },
          ],
          equityLinks: [
            { from: "creditors_after", to: "listed_after", label: "债转股权益", style: "solid" },
            { from: "orig_sh_after", to: "listed_after", label: "存续股权", style: "dashed" },
          ],
          outcomeBadge: "境外债务重组生效 · 股本重塑去杠杆",
        },
        annotations: [
          { tag: "①", title: "重组范围与债权组别", body: "涵盖公募美元票据、银团贷款等纳入协议安排的境外债务。", ruleCode: null },
          { tag: "②", title: "削债与转股方案", body: "列示本金削减比例、债转股价格、MCB 条款及展期新债期限。", ruleCode: null },
          { tag: "③", title: "监管规则与豁免", body: "增发特别授权及潜在清洗豁免（TC 26），兼顾 LR 13.24 持续经营指引。", ruleCode: "TC:26 · HKEX:13.24" },
          { tag: "④", title: "RSA 支持率与法院进程", body: "追踪重组支持协议（RSA）同意率、债权人会议表决及生效日。", ruleCode: null },
        ],
        topology: buildDebtTopology({
          status: "active",
          listedName: "港股上市发行人",
          code: "00000.HK",
          outcomeBadge: "境外债务重组生效 · 股本重塑去杠杆",
        }),
      },
    },

    ah_share_absorption: {
      id: "ah_share_absorption",
      labelZh: "A+H 吸收合并 / 换股合并",
      shortZh: "A+H 吸收合并",
      labelEn: "A+H Share Absorption Merger",
      modalityLabelZh: "跨境换股 + 异议股东现金选择权",
      ruleTriggers: ["TC:2.10", "HKEX:6.15(2)", "CSRC"],
      summaryZh:
        "A 股或 A+H 上市主体以换股吸收合并港股关联上市公司，向异议股东提供现金选择权，合并后被吸收方注销法人资格并撤销港交所上市。",
      codexTemplate: {
        id: "TEMPLATE-ah-absorption",
        archetype: "ah_share_absorption",
        modality: "share_swap",
        status: "active",
        before: {
          title: "合并前 A+H 双架构",
          nodes: [
            { id: "parent", role: "holdco", name: "控股集团 / 共同实际控制人", sublabel: "央国企或产业控股集团", tier: 0 },
            { id: "absorber", role: "buyer", name: "吸收合并方 (A+H / A股)", sublabel: "存续上市主体", tier: 1 },
            { id: "absorbed", role: "listed", name: "被吸收合并方 (H股)", code: "00000.HK", sublabel: "拟注销退市主体", tier: 1 },
          ],
          equityLinks: [
            { from: "parent", to: "absorber", label: "控股存续平台", style: "solid" },
            { from: "parent", to: "absorbed", label: "关联持股", style: "dashed" },
          ],
        },
        flows: [
          {
            id: "f1",
            kind: "shares",
            direction: "ltr",
            step: "01",
            fromLabel: "吸收合并方",
            toLabel: "被吸收方 H股股东",
            headline: "按换股比例发行新 H股 / A股",
            subline: "以基准日均价锚定换股比率，异议股东享有现金选择权",
            proposedOrTerminated: false,
          },
          {
            id: "f2",
            kind: "cancel",
            direction: "rtl",
            step: "02",
            fromLabel: "被吸收方全部资产与股份",
            toLabel: "吸收合并方承继",
            headline: "承继全部资产负债 · 被吸收方退市注销",
            subline: "须同步获 H股类别股东会（TC 2.10）、证监会/国资委及联交所批准",
            proposedOrTerminated: false,
          },
        ],
        after: {
          title: "合并后统一平台",
          nodes: [
            { id: "parent_after", role: "holdco", name: "控股集团", sublabel: "单一控股层", tier: 0 },
            { id: "public_after", role: "public", name: "合并后 A+H 公众股东", sublabel: "含原被吸收方换股股东", tier: 0 },
            { id: "survivor", role: "listed", name: "存续 A+H 旗舰上市主体", sublabel: "全面承继资产与业务", badge: "统一上市平台", tier: 1 },
          ],
          equityLinks: [
            { from: "parent_after", to: "survivor", label: "控股股东", style: "solid" },
            { from: "public_after", to: "survivor", label: "A+H 公众流通股", style: "dashed" },
          ],
          outcomeBadge: "A+H 旗舰平台合一 · 被吸收方撤销上市",
        },
        annotations: [
          { tag: "①", title: "双边合并主体", body: "消除同业竞争并整合 A+H 资本平台，由存续主体承继全部资产与负债。", ruleCode: null },
          { tag: "②", title: "换股比例与现金选择权", body: "披露双方换股定价基准、换股溢价及异议股东现金选择权价格。", ruleCode: null },
          { tag: "③", title: "跨境双边监管审批", body: "须同时符合香港《收购守则》Rule 2.10、LR 6.15(2) 及内地证监会/国资监管审批。", ruleCode: "TC:2.10 · HKEX:6.15(2)" },
          { tag: "④", title: "实施与退市节点", body: "完成异议现金选择权申报、换股登记、原 H股退市及新股挂牌上市。", ruleCode: null },
        ],
        topology: buildAhAbsorptionTopology({
          status: "active",
          groupName: "共同控股集团",
          absorberName: "吸收合并方 (A+H)",
          absorbedName: "被吸收合并方 (H股)",
          code: "00000.HK",
          outcomeBadge: "A+H 旗舰平台合一 · 被吸收方撤销上市",
        }),
      },
    },

    disclosable_major: {
      id: "disclosable_major",
      labelZh: "第 14 章须予披露 / 主要并购",
      shortZh: "须予披露/主要交易",
      labelEn: "Ch.14 Discloseable & Major M&A",
      modalityLabelZh: "5%–25% 仅公告 · 25%+ 通函及股东批准",
      ruleTriggers: ["HKEX:14.06(2)", "HKEX:14.06(3)", "HKEX:14.44"],
      summaryZh:
        "按五项百分比率（资产/盈利/收益/代价/股本）分级监管：5%–25% 须予披露交易仅刊发公告；25%–100%（出售 <75%）主要交易须刊发会计师/估值通函并获股东大会或 LR 14.44 书面股东批准。",
      codexTemplate: {
        id: "TEMPLATE-disclosable-major",
        archetype: "disclosable_major",
        modality: "cash",
        status: "approved",
        before: {
          title: "交易前权属架构",
          nodes: [
            { id: "listed", role: "listed", name: "港股上市主体", code: "00000.HK", sublabel: "收购方 / 买方", tier: 0 },
            { id: "seller", role: "seller", name: "独立第三方卖方", sublabel: "非关连出售方", tier: 0 },
            { id: "target", role: "target", name: "目标公司 / 营业资产", sublabel: "五项百分比率测算标的", tier: 1 },
          ],
          equityLinks: [{ from: "seller", to: "target", label: "标的控股权", style: "solid" }],
        },
        flows: [
          {
            id: "f1",
            kind: "cash",
            direction: "ltr",
            step: "01",
            fromLabel: "港股上市主体",
            toLabel: "独立第三方卖方",
            headline: "现金分期结算或配发一般授权代价股",
            subline: "5%–25% 须予披露免股东会 · ≥25% 主要交易须通函及股东批准",
            proposedOrTerminated: false,
          },
          {
            id: "f2",
            kind: "asset",
            direction: "rtl",
            step: "02",
            fromLabel: "独立第三方卖方",
            toLabel: "港股上市主体",
            headline: "交割目标股权 · 并入合并报表",
            subline: "主要交易可凭控股股东 >50% 书面批准（LR 14.44）免召开实体股东会",
            proposedOrTerminated: false,
          },
        ],
        after: {
          title: "交割后并表架构",
          nodes: [
            { id: "seller_after", role: "seller", name: "原独立卖方", sublabel: "收取现金或代价股", tier: 0 },
            { id: "listed_after", role: "listed", name: "港股上市主体", code: "00000.HK", sublabel: "主业并表扩张", tier: 1 },
            { id: "target_after", role: "target", name: "目标附属公司", sublabel: "控股并表附属", tier: 2 },
          ],
          equityLinks: [
            { from: "listed_after", to: "target_after", label: "控股并表", style: "solid" },
          ],
          outcomeBadge: "第 14 章并购完成交割 · 标的并表",
        },
        annotations: [
          { tag: "①", title: "五项百分比率分级", body: "按资产、盈利、收益、代价及股本比率孰高判定股份交易(<5%)、须予披露(5–25%)或主要交易(≥25%)。", ruleCode: "HKEX:14.07" },
          { tag: "②", title: "对价与业绩对赌", body: "列明现金分期节奏、代价股发行价或卖方盈利保证条款。", ruleCode: null },
          { tag: "③", title: "通函与书面批准捷径", body: "须予披露交易仅需董事会批准公告；主要交易如无股东具重大利益，可适用 LR 14.44 控股股东书面批准。", ruleCode: "HKEX:14.06(2) · HKEX:14.06(3)" },
          { tag: "④", title: "中介角色与文件", body: "涉及财务顾问（FA）、独立估值师（LR 14.61 贴现现金流须会计师及 FA 核证）及申报会计师。", ruleCode: null },
        ],
        topology: buildAcquisitionTopology({
          status: "approved",
          leftTitle: "第 14 章须予披露 / 主要并购流向",
          rightTitle: "交割后并表架构",
          transitionLabel: "分级审批",
          listedName: "港股上市主体",
          code: "00000.HK",
          sellerName: "独立第三方卖方",
          targetName: "目标公司 / 资产",
          payKind: "cash",
          payLabel: "支付现金或配发代价股",
          paySub: "5–25% 仅公告 · ≥25% 通函+股东/书面批准",
          assetLabel: "交割目标股权并表",
          assetSub: "LR 14.06(2)/(3) · 五项百分比率核定",
          outcomeBadge: "第 14 章并购完成交割 · 标的并表",
        }),
      },
    },

    connected_whitewash: {
      id: "connected_whitewash",
      labelZh: "14A 章非豁免关连 / 清洗豁免",
      shortZh: "14A关连/清洗豁免",
      labelEn: "Ch.14A Non-Exempt Connected & Whitewash Waiver",
      modalityLabelZh: "独董委 + IFA 函件 + 独立股东表决",
      ruleTriggers: ["HKEX:14A.36", "TC:Note1-Rule26", "TC:ScheduleVI"],
      summaryZh:
        "与控股股东/关连人士进行 ≥5% 收售或持续关连交易（年度上限），或向认购方定向发股跨 30% 申请清洗豁免：利害股东须回避，由独立董事委员会（IBC）及独立财务顾问（IFA）向独立股东出具意见。",
      codexTemplate: {
        id: "TEMPLATE-connected-whitewash",
        archetype: "connected_whitewash",
        modality: "mixed",
        status: "approved",
        before: {
          title: "交易前关连架构",
          nodes: [
            { id: "conn", role: "seller", name: "控股股东 / 关连人士", sublabel: "利害关系方 · 回避投票", tier: 0 },
            { id: "ish", role: "public", name: "无利害独立股东 + IFA", sublabel: "股东特别大会表决主体", tier: 0 },
            { id: "listed", role: "listed", name: "港股上市主体", code: "00000.HK", sublabel: "成立独立董事委员会 (IBC)", tier: 1 },
          ],
          equityLinks: [
            { from: "conn", to: "listed", label: "关连持股 ≥10%/30%", style: "solid" },
            { from: "ish", to: "listed", label: "独立股东权益", style: "dashed" },
          ],
        },
        flows: [
          {
            id: "f1",
            kind: "asset",
            direction: "rtl",
            step: "01",
            fromLabel: "独立财务顾问 (IFA)",
            toLabel: "独立董事委员会及独立股东",
            headline: "IFA 独立意见函件 + 独立股东投票批准",
            subline: "14A章普通决议 >50% 赞成 · 清洗豁免须 ≥75% 独立股东赞成",
            proposedOrTerminated: false,
          },
          {
            id: "f2",
            kind: "shares",
            direction: "ltr",
            step: "02",
            fromLabel: "港股上市主体",
            toLabel: "关连方 / 认购人",
            headline: "执行关连收售 / 持续年度上限 / 增发新股免 MGO",
            subline: "0.1%–5% 仅公告豁免通函 · ≥5% 须寄发通函并经监管审阅",
            proposedOrTerminated: false,
          },
        ],
        after: {
          title: "批准交割后架构",
          nodes: [
            { id: "conn_after", role: "seller", name: "关连方 / 认购人", sublabel: "完成交割 · 豁免全面要约", tier: 0 },
            { id: "ish_after", role: "public", name: "独立公众股东", sublabel: "维持最低公众持股量", tier: 0 },
            { id: "listed_after", role: "listed", name: "港股上市主体", code: "00000.HK", sublabel: "完成关连交易或特定授权增发", tier: 1 },
          ],
          equityLinks: [
            { from: "conn_after", to: "listed_after", label: "交割后持股", style: "solid" },
            { from: "ish_after", to: "listed_after", label: "独立公众股", style: "dashed" },
          ],
          outcomeBadge: "获独立股东正式批准 · 完成关连或清洗交割",
        },
        annotations: [
          { tag: "①", title: "关连关系与回避", body: "核定关连人士身份（控股股东、董事、主要股东或联系人）及须放弃表决权的股份数。", ruleCode: "HKEX:14A" },
          { tag: "②", title: "豁门门槛与年度上限", body: "0.1%–5%（LR 14A.76(2)）仅需公告；≥5% 一次性交易及持续关连三年年度上限须独立股东批准。", ruleCode: "HKEX:14A.76" },
          { tag: "③", title: "清洗豁免双重门槛", body: "定向发股跨 30% 触发清洗豁免时，须证监会执行人员授出豁免且独立股东 ≥75% 投票通过。", ruleCode: "TC:Note1-Rule26" },
          { tag: "④", title: "高频 IFA 创收场景", body: "必须委任持牌 6 号牌独立财务顾问（IFA）就条款公平合理出具签署意见函件。", ruleCode: null },
        ],
        topology: buildConnectedWhitewashTopology({
          status: "approved",
          listedName: "港股上市主体",
          code: "00000.HK",
          outcomeBadge: "获独立股东正式批准 · 完成关连或清洗交割",
        }),
      },
    },

    topup_placing: {
      id: "topup_placing",
      labelZh: "先旧后新闪电配售 / 新股配售",
      shortZh: "先旧后新/配售",
      labelEn: "Top-up & New Share Placing",
      modalityLabelZh: "配售代理簿记 · T+2 交割 + 14日认新",
      ruleTriggers: ["HKEX:13.36(2)(b)", "HKEX:14A.92(4)", "HKEX:13.28"],
      summaryZh:
        "港股再融资最高频品种：大股东透过配售代理向不少于 6 名独立承配人折让出售老股（T+2 闪电交割），同时按净配售价认购上市公司根据一般性授权发行的等额新股，于 14 日内完成。",
      codexTemplate: {
        id: "TEMPLATE-topup-placing",
        archetype: "topup_placing",
        modality: "mixed",
        status: "closed",
        before: {
          title: "配售前股本架构",
          nodes: [
            { id: "vendor", role: "seller", name: "控股股东（卖旧认新）", sublabel: "T+2 出售既有老股", tier: 0 },
            { id: "placees", role: "buyer", name: "不少于6名独立承配人", sublabel: "经配售代理簿记承配", tier: 0 },
            { id: "listed", role: "listed", name: "港股上市主体", code: "00000.HK", sublabel: "动用 20% 一般性授权", tier: 1 },
          ],
          equityLinks: [{ from: "vendor", to: "listed", label: "既有控股股权", style: "solid" }],
        },
        flows: [
          {
            id: "f1",
            kind: "shares",
            direction: "ltr",
            step: "01",
            fromLabel: "控股股东",
            toLabel: "独立承配人",
            headline: "先旧：折让配售老股 · T+2 即时交割",
            subline: "折让幅度须 <20%（LR 13.36(5)）· 配售代理收取配售佣金",
            proposedOrTerminated: false,
          },
          {
            id: "f2",
            kind: "cash",
            direction: "rtl",
            step: "02",
            fromLabel: "配售所得净额",
            toLabel: "上市主体增发等额新股",
            headline: "后新：大股东按净额认购等额新股",
            subline: "自签协议起 14 日内完成新股发行 · 适用 LR 14A.92(4) 关连豁免",
            proposedOrTerminated: false,
          },
        ],
        after: {
          title: "认新完成后股本架构",
          nodes: [
            { id: "vendor_after", role: "seller", name: "控股股东", sublabel: "持股股数不变 · 比例微摊", tier: 0 },
            { id: "placees_after", role: "public", name: "承配人及公众股东", sublabel: "公众流通盘扩大", tier: 0 },
            { id: "listed_after", role: "listed", name: "港股上市主体", code: "00000.HK", sublabel: "募集净额入账 · 扩大股本", tier: 1 },
          ],
          equityLinks: [
            { from: "vendor_after", to: "listed_after", label: "摊薄后控股", style: "solid" },
            { from: "placees_after", to: "listed_after", label: "扩大公众股", style: "dashed" },
          ],
          outcomeBadge: "闪电配售及认新完成 · 募集净额入账",
        },
        annotations: [
          { tag: "①", title: "先旧后新效率优势", body: "承配人 T+2 即可获配自由流通老股，较直接发行新股大幅缩短联交所上市批准等待期。", ruleCode: null },
          { tag: "②", title: "折让上限与一般授权", body: "配售价较基准价折让不得达 20% 或以上（LR 13.36(5)），且股数不超过年度 20% 一般性授权。", ruleCode: "HKEX:13.36(5)" },
          { tag: "③", title: "14 日关连豁免铁律", body: "认购新股股数不得超过卖旧股数，且须于协议后 14 日内完成，方可豁免 14A 章独立股东批准。", ruleCode: "HKEX:14A.92(4)" },
          { tag: "④", title: "投行配售佣金", body: "整体协调人 / 独家或联席配售代理（Placing Agent）按配售总额收取配售及包销佣金。", ruleCode: null },
        ],
        topology: buildTopupPlacingTopology({
          status: "closed",
          listedName: "港股上市主体",
          code: "00000.HK",
          outcomeBadge: "闪电配售及认新完成 · 募集净额入账",
        }),
      },
    },

    convertible_bond: {
      id: "convertible_bond",
      labelZh: "可转换债券 / 可交换债发行",
      shortZh: "可转债 CB/EB",
      labelEn: "Convertible & Exchangeable Bond Offering",
      modalityLabelZh: "境外簿记发行 · 票息 + 溢价转股权",
      ruleTriggers: ["HKEX:Ch.15", "HKEX:13.36", "HKEX:13.28"],
      summaryZh:
        "上市公司（或境外 SPV 经母公司担保）向境外机构投资者簿记发行可转换债券（CB）或可交换债（EB），兼具低息债权成本与较现价溢价转股结构，部分大型交易同步配套股份回购对冲。",
      codexTemplate: {
        id: "TEMPLATE-convertible-bond",
        archetype: "convertible_bond",
        modality: "mixed",
        status: "closed",
        before: {
          title: "发行前资本架构",
          nodes: [
            { id: "sh", role: "public", name: "现有控股及公众股东", sublabel: "转股前既有股东", tier: 0 },
            { id: "inv", role: "creditor", name: "境外机构债券认购人", sublabel: "Reg S 簿记认购方", tier: 0 },
            { id: "listed", role: "listed", name: "港股上市主体", code: "00000.HK", sublabel: "CB 发行人 / 担保人", tier: 1 },
          ],
          equityLinks: [{ from: "sh", to: "listed", label: "100% 既有股本", style: "solid" }],
        },
        flows: [
          {
            id: "f1",
            kind: "cash",
            direction: "rtl",
            step: "01",
            fromLabel: "境外债券认购人",
            toLabel: "港股上市主体",
            headline: "认购可转债本金 · 募集净额入账",
            subline: "独家/联席全球协调人簿记承销 · 低票息或零息结构",
            proposedOrTerminated: false,
          },
          {
            id: "f2",
            kind: "shares",
            direction: "ltr",
            step: "02",
            fromLabel: "港股上市主体",
            toLabel: "可转债持有人",
            headline: "按初始转股价授予溢价换股权",
            subline: "转股股份由一般性授权或股东特别大会特定授权覆盖",
            proposedOrTerminated: false,
          },
        ],
        after: {
          title: "交割后资本与转股架构",
          nodes: [
            { id: "sh_after", role: "public", name: "既有股东", sublabel: "转股前零即时摊薄", tier: 0 },
            { id: "cb_after", role: "creditor", name: "可转债持有人", sublabel: "债权本息 + 溢价看涨期权", tier: 0 },
            { id: "listed_after", role: "listed", name: "港股上市主体", code: "00000.HK", sublabel: "债券挂牌 · 潜在转股扩股", tier: 1 },
          ],
          equityLinks: [
            { from: "sh_after", to: "listed_after", label: "既有普通股", style: "solid" },
            { from: "cb_after", to: "listed_after", label: "潜在转股权益", style: "dashed" },
          ],
          outcomeBadge: "可转债完成簿记交割 · 换股授权生效",
        },
        annotations: [
          { tag: "①", title: "债券规模与期限", body: "披露发行本金总额、币种、到期年限、票面利率、到期赎回价及持有人回售权（Put Option）。", ruleCode: null },
          { tag: "②", title: "初始转股价与溢价", body: "列示初始转股价、较参考收市价转股溢价率，以及悉数转股占扩大后股本比例。", ruleCode: null },
          { tag: "③", title: "授权口径与发改委备案", body: "核验转股股份使用一般性授权或特别授权，中资主体同步履行发改委外债及证监会备案。", ruleCode: "HKEX:13.36" },
          { tag: "④", title: "投行承销角色", body: "由牵头经办人 / 账簿管理人（JGC / JBR）负责境外簿记定价、掉期对冲及承销结算。", ruleCode: null },
        ],
        topology: buildCbTopology({
          status: "closed",
          listedName: "港股上市主体",
          code: "00000.HK",
          outcomeBadge: "可转债完成簿记交割 · 换股授权生效",
        }),
      },
    },

    rights_open_offer: {
      id: "rights_open_offer",
      labelZh: "供股 / 公开招股包销",
      shortZh: "供股/公开招股",
      labelEn: "Rights Issue & Open Offer",
      modalityLabelZh: "按比例折让供股 + 包销商或补偿安排",
      ruleTriggers: ["HKEX:7.19A", "HKEX:7.24A", "HKEX:7.27B"],
      summaryZh:
        "向全体合资格股东按现有持股比例折让发行新股（供股可转让未缴股款供股权，公开招股不可转让），未获认购股份通过补偿安排配售或由包销商包销；增发超 50% 须独立股东批准并聘 IFA。",
      codexTemplate: {
        id: "TEMPLATE-rights-issue",
        archetype: "rights_open_offer",
        modality: "mixed",
        status: "approved",
        before: {
          title: "供股前股权架构",
          nodes: [
            { id: "qsh", role: "public", name: "合资格现有股东", sublabel: "按持股比例获配供股权", tier: 0 },
            { id: "uw", role: "buyer", name: "包销商 / 独立承配人", sublabel: "包销协议或补偿配售代理", tier: 0 },
            { id: "listed", role: "listed", name: "港股上市主体", code: "00000.HK", sublabel: "供股 / 公开招股发行人", tier: 1 },
          ],
          equityLinks: [{ from: "qsh", to: "listed", label: "按比例供股基准", style: "dashed" }],
        },
        flows: [
          {
            id: "f1",
            kind: "cash",
            direction: "ltr",
            step: "01",
            fromLabel: "合资格股东 / 包销商",
            toLabel: "港股上市主体",
            headline: "按供股价认购缴款 · 余额由包销商包销",
            subline: "理论摊薄效应不得达 25% 或以上（LR 7.27B，特殊困难除外）",
            proposedOrTerminated: false,
          },
          {
            id: "f2",
            kind: "shares",
            direction: "rtl",
            step: "02",
            fromLabel: "港股上市主体",
            toLabel: "参与股东及包销商",
            headline: "配发缴足供股股份 · 结算包销佣金",
            subline: "12 个月累计股本或市值增幅 >50% 须独立股东会批准及 IFA 意见",
            proposedOrTerminated: false,
          },
        ],
        after: {
          title: "供股完成后股本架构",
          nodes: [
            { id: "qsh_after", role: "public", name: "参与供股股东", sublabel: "维持权益比例", tier: 0 },
            { id: "uw_after", role: "buyer", name: "包销商 / 承配人", sublabel: "承接未获认购股份", tier: 0 },
            { id: "listed_after", role: "listed", name: "港股上市主体", code: "00000.HK", sublabel: "募集资金净额入账", tier: 1 },
          ],
          equityLinks: [
            { from: "qsh_after", to: "listed_after", label: "供股后权益", style: "solid" },
            { from: "uw_after", to: "listed_after", label: "包销/承配股", style: "dashed" },
          ],
          outcomeBadge: "供股及包销交割完成 · 新股开始买卖",
        },
        annotations: [
          { tag: "①", title: "供股比例与未缴股款权", body: "列示每持有 X 股供 Y 股基准、认购价折让、理论除权价（TERP）及未缴股款供股权交易期。", ruleCode: null },
          { tag: "②", title: "包销与补偿安排", body: "包销模式下包销商收取包销佣金；非包销模式须设置未获认购股份补偿配售机制（LR 7.21）。", ruleCode: "HKEX:7.21" },
          { tag: "③", title: "50% 独立股东门槛与 25% 摊薄上限", body: "股本扩幅 >50% 触发 LR 7.19A/7.24A 控股股东回避、通函及 IFA 意见；理论摊薄上限 25%（LR 7.27B）。", ruleCode: "HKEX:7.19A · HKEX:7.27B" },
          { tag: "④", title: "潜在清洗豁免联动", body: "若大股东担任包销商导致持股跨越 30% 或 2% 自由增购率，须同步申请清洗豁免。", ruleCode: null },
        ],
        topology: buildRightsIssueTopology({
          status: "approved",
          listedName: "港股上市主体",
          code: "00000.HK",
          outcomeBadge: "供股及包销交割完成 · 新股开始买卖",
        }),
      },
    },
  };

  /* =========================================================================
     5. CURATED SOURCE-EXACT SPECS + 2D SPATIAL TOPOLOGIES FOR ALL 7 REAL CASES
        (100% verified against web_mvp/data/transaction_cases.json!)
     ========================================================================= */
  // Issuer filings and completion dates are case-specific; do not infer figures from an archetype.
  const VERIFIED_ACQUISITIONS = {
    "HK-03738-20261009-on-sun-international": {
      code: "03738", date: "2026-10-20", completion: "YS-20261020-d81cbbb6faa9", modality: "shares",
      authorities: [
        ["YS-20261009-3b495bcba594", "2026/1009/2026100901351", 2, "法定买方、卖方及股份对价"],
        ["YS-20261020-d81cbbb6faa9", "2026/1020/2026102001461", 1, "10月20日交割、发行价及全资持股"],
        ["YS-20261020-d81cbbb6faa9", "2026/1020/2026102001461", 2, "实际发行股数及卖方持股"],
      ],
      expected: [
        ["contract_consideration", 75000000, "money", "HKD", false, "YS-20261009-3b495bcba594", 2],
        ["issued_shares", 20547945, "shares", null, false, "YS-20261020-d81cbbb6faa9", 2],
        ["issue_price", 3.65, "per_share", "HKD", false, "YS-20261020-d81cbbb6faa9", 1],
        ["target_equity_stake", 100, "percent", null, false, "YS-20261009-3b495bcba594", 2],
      ],
    },
    "HK-01910-20260813-beis-85pct": {
      code: "01910", date: "2026-10-01", completion: "YS-20261002-f50bec52e805", modality: "cash",
      authorities: [
        ["YS-20261002-f50bec52e805", "2026/1002/2026100200003", 1, "10月1日交割及85%持股"],
        ["YS-20261112-176fe40fb31f", "2026/1112/2026111201360", 8, "基础现金对价及营运资金调整"],
        ["YS-20260813-211f68dda7d2", "2026/0813/2026081300019", 3, "协议对价调整机制"],
        ["YS-20260813-211f68dda7d2", "2026/0813/2026081300019", 4, "保留15%及期权安排"],
        ["YS-20260813-211f68dda7d2", "2026/0813/2026081300019", 5, "行权时标的回购"],
        ["YS-20260813-211f68dda7d2", "2026/0813/2026081300019", 8, "法定买方及四名卖方"],
      ],
      expected: [
        ["closed_stake", 85, "percent", null, false, "YS-20261002-f50bec52e805", 1],
        ["rollover_stake", 15, "percent", null, false, "YS-20260813-211f68dda7d2", 4],
        ["base_cash_consideration", 178500000, "money", "USD", false, "YS-20261112-176fe40fb31f", 8],
      ],
      summary: "交割 85% · 基础现金 USD 178.5m（可调整）· 卖方保留 15%",
      buyer: ["samsonite-llc", "Samsonite LLC", "buyer", null, "新秀丽间接全资附属公司"],
      seller: ["beis-sellers", "四名卖方", "seller", null, "含 Home Beis, Inc."],
      flows: [
        ["target-equity", "asset", "ltr", 181, "转让 85% 标的权益", "Beis, LLC"],
        ["cash", "cash", "rtl", 286, "基础现金对价 USD 178.5m", "受交割后营运资金调整"],
      ],
      after: [
        ["samsonite-group", 697, 64, 168, 70, "listed", "新秀丽集团", "01910.HK", "Samsonite Group S.A."],
        ["samsonite-llc", 697, 214, 168, 69, "buyer", "Samsonite LLC", null, "本次受让 85% 权益"],
        ["home-beis", 888, 214, 165, 69, "public", "Home Beis, Inc.", null, "由 Shay Mitchell 持有", "保留股东"],
        ["beis", 716, 354, 316, 70, "target", "Beis, LLC", null, "持有 BÉIS 品牌"],
      ],
      interests: [
        ["parent-indirect", "samsonite-group", "samsonite-llc", 781, 134, 214, 174, 142, "间接全资持有", true, null],
        ["closed-stake", "samsonite-llc", "beis", 781, 283, 354, 317, 141, "85% 已交割", false, 85],
        ["retained-stake", "home-beis", "beis", 970, 283, 354, 317, 142, "15% 继续持有", false, 15],
      ],
      outcome: "新秀丽间接持有 85% · Home Beis 保留 15%",
      notes: [
        ["85% 收购的现金口径", "基础现金对价为 1.785 亿美元，受交割后营运资金调整；最终支付金额以调整结果为准。"],
        ["剩余 15% 的期权", "Home Beis 保留 15%。期权在交割第三周年后方可行使；若行权，由 Beis 回购相应权益。"],
      ],
    },
    "HK-01347-20250831-huali-micro": {
      code: "01347", date: "2026-09-09", completion: "YS-20260911-bddbeff3e78a", modality: "mixed",
      authorities: [
        ["YS-20250831-af138066909b", "2025/0831/2025083100319", 1, "原持股及收购范围"],
        ["YS-20260911-bddbeff3e78a", "2026/0911/2026091100436", 1, "代价股份与交割"],
        ["YS-20260911-bddbeff3e78a", "2026/0911/2026091100436", 2, "交割后全资持股"],
      ],
      expected: [
        ["target_interest_pct", 97.4988, "percent", null, false, "YS-20250831-af138066909b", 1],
        ["consideration_shares", 190768392, "shares", null, false, "YS-20260911-bddbeff3e78a", 1],
        ["issue_price", 43.34, "per_share", "CNY", false, "YS-20260911-bddbeff3e78a", 1],
        ["contract_price", 8267902153.26, "money", "CNY", false, "YS-20260911-bddbeff3e78a", 1],
      ],
      summary: "190,768,392 股 A 股＋零碎股份折现 · 受让 97.4988%",
      buyer: ["hua-hong", "华虹宏力半导体", "listed", "01347.HK", "亦于上交所上市 · 688347.SH"],
      seller: ["four-vendors", "四名卖方", "seller", null, "华虹集团及三家基金"],
      flows: [
        ["target-equity", "asset", "ltr", 159, "转让 97.4988% 标的股权", "上海华力微电子"],
        ["a-shares", "shares", "rtl", 238, "190,768,392 股华虹 A 股", "每股人民币 43.34 元"],
        ["fractional-cash", "cash", "rtl", 317, "零碎股份折现", "人民币 43.98 元"],
      ],
      after: [
        ["hua-hong", 710, 78, 328, 72, "listed", "华虹宏力半导体", "01347.HK", "亦于上交所上市 · 688347.SH"],
        ["huali", 710, 316, 328, 76, "target", "上海华力微电子", null, "华虹直接及间接合计持股 100%"],
      ],
      interests: [
        ["new-stake", "hua-hong", "huali", 786, 150, 316, 232, 150, "97.4988% 本次直接购入", false, 97.4988],
        ["old-stake", "hua-hong", "huali", 962, 150, 316, 232, 150, "约 2.5012% 原间接持股", true, 2.5012],
      ],
      outcome: "华力微成为华虹全资附属公司",
      notes: [
        ["零碎股份折现", "收购代价合计人民币 8,267,902,153.26 元。扣除 190,768,392 股 A 股 × 人民币 43.34 元/股，折现差额为人民币 43.98 元。"],
        ["原持与本次受让", "华虹交割前已间接持有约 2.5012%，本次向四名卖方直接受让 97.4988%。配套募资另计。"],
      ],
    },
    "HK-06616-20260206-junheng-jihua": {
      code: "06616", date: "2026-09-29", completion: "YS-20260930-1d4f98fcce7e", modality: "cash",
      authorities: [
        ["YS-20260813-0f1210ea7eec", "2026/0813/2026081301576", 49, "钧衡合伙结构"],
        ["YS-20260917-cf3b038b7d25", "2026/0917/2026091700999", 57, "修订后协议现金价"],
        ["YS-20260930-1d4f98fcce7e", "2026/0930/2026093002361", 1, "股份过户及控股"],
      ],
      expected: [
        ["stake", 29.89, "percent", null, true, "YS-20260930-1d4f98fcce7e", 1],
        ["acquired_shares", 202308616, "shares", null, false, "YS-20260930-1d4f98fcce7e", 1],
        ["purchase_price", 1494515000, "money", "CNY", true, "YS-20260917-cf3b038b7d25", 57],
      ],
      summary: "协议现金 · 钧衡受让约 29.89% 并取得控股权",
      buyer: ["junheng", "桐庐钧衡", "buyer", null, "合同买方 · 专设有限合伙"],
      seller: ["jihua-vendors", "吉华原股东", "seller", null, "杭州锦辉机电、邵辉"],
      flows: [
        ["target-equity", "asset", "ltr", 181, "交割 202,308,616 股", "约占吉华集团已发行股本 29.89%"],
        ["cash", "cash", "rtl", 286, "修订后协议现金价", "约人民币 14.94515 亿元"],
      ],
      after: [
        ["shenzhen-chesir", 697, 64, 168, 73, "buyer", "深圳七色珠光", null, "06616 间接全资附属公司", "普通合伙人"],
        ["hongzun", 888, 64, 165, 73, "public", "桐庐六安", null, "持有钧衡有限合伙份额", "有限合伙人"],
        ["junheng", 716, 220, 316, 68, "buyer", "桐庐钧衡", null, "环球新材控制的非全资附属公司", "收购载体"],
        ["jihua", 716, 354, 316, 70, "target", "吉华集团", "603980.SH", "钧衡为第一大股东及控股股东"],
      ],
      interests: [
        ["gp", "shenzhen-chesir", "junheng", 781, 137, 220, 174, 154, "40% 合伙份额 · GP 管理", false, 40],
        ["lp", "hongzun", "junheng", 970, 137, 220, 174, 144, "60% 合伙份额 · LP", true, 60],
        ["stake", "junheng", "jihua", 874, 288, 354, 320, 164, "约 29.89% 标的股权", false, 29.89],
      ],
      outcome: "经非全资钧衡控股吉华 · 其他股东继续持股",
      notes: [
        ["钧衡的控制权", "深圳七色珠光是环球新材的间接全资子公司，持有钧衡 40% 合伙份额，并以普通合伙人身份负责日常管理。桐庐六安持有限合伙份额 60%。"],
        ["交易价格与完成口径", "约人民币 14.94515 亿元是修订后协议现金价。完成公告确认股份过户，以及钧衡持有吉华约 29.89% 并成为控股股东。"],
      ],
    },
  };

  function matchesVerifiedAcquisition(txCase, shape, documents) {
    if (txCase.code !== shape.code || txCase.stage?.status !== "closed" ||
        txCase.stage?.eventKind !== "completion" || txCase.stage?.date !== shape.date ||
        !txCase.events?.some(e => e.kind === "completion" && e.state === "actual" && e.date === shape.date &&
          e.evidence?.documentId === shape.completion && e.evidence.pages?.includes(1)) ||
        !shape.authorities.every(([id, path]) => documents?.[id]?.caseId === txCase.id &&
          documents[id].url === `https://www1.hkexnews.hk/listedco/listconews/sehk/${path}.pdf`) ||
        !shape.expected.every(([key, value, unit, currency, approximate, id, page]) => {
          const terms = txCase.terms?.filter(t => t.key === key) || [];
          return terms.length === 1 && terms[0].value === value && terms[0].unit === unit &&
            terms[0].currency === currency && terms[0].approximate === approximate &&
            terms[0].evidence?.documentId === id && terms[0].evidence.pages?.includes(page);
        })) return false;
    return true;
  }

  function verifiedAcquisitionSpec(txCase, documents) {
    const shape = VERIFIED_ACQUISITIONS[txCase.id];
    if (!matchesVerifiedAcquisition(txCase, shape, documents)) return null;
    const [sellerId, sellerName, sellerRole,,sellerSubtitle] = shape.seller;
    const [buyerId, buyerName, buyerRole, buyerCode,buyerSubtitle] = shape.buyer;
    const outcomeBadge = shape.outcome;
    const node = (id, role, name, code, sublabel) => ({ id, role, name, code, sublabel });
    const flowArrow = ([id,kind,direction,y,label,sublabel],i) => {
      const ltr=direction==="ltr", left=207, right=438;
      return { id, panel:"left", kind, step:String(i+1), label, sublabel,
        pathPoints:[[ltr?left:right,y],[ltr?right:left,y]],
        labelCenter:[323,y], labelWidth:187, labelHeight:45 };
    };
    const topology = finalizeLayout(createDiagramCanvas({
      width:MASTER_W, height:490, status:"closed", leftTitle:"交割流向及对价", rightTitle:"交割后持股及控制",
      transitionLabel:"股份交割", outcomeBadge,
    }), [
      {id:sellerId,panel:"left",x:32,y:106,w:175,h:263,role:sellerRole,title:sellerName,subtitle:sellerSubtitle},
      {id:buyerId,panel:"left",x:438,y:106,w:176,h:263,role:buyerRole,title:buyerName,code:buyerCode,subtitle:buyerSubtitle},
      ...shape.after.map(([id,x,y,w,h,role,title,code,subtitle,roleLabel]) => ({id,panel:"right",x,y,w,h,role,title,code,subtitle,roleLabel})),
    ], shape.interests.map(([id,from,to,x,y,endY,labelY,pillWidth,pctLabel,dashed]) => ({
      id, panel:"right", from, to, pathPoints:[[x,y],[x,endY]], labelCenter:[x,labelY], pillWidth,pctLabel,dashed,
    })), shape.flows.map(flowArrow));
    return {
      id:txCase.id, caseId:txCase.id, code:txCase.code, name:txCase.name, mechanism:txCase.mechanism,
      stageLabel:txCase.stage.label, stageDate:shape.date, status:"closed", archetype:"acquisition", modality:shape.modality,
      compactSummary:shape.summary, topology,
      before:{title:"交割各方",nodes:[node(sellerId,sellerRole,sellerName,null,sellerSubtitle),node(buyerId,buyerRole,buyerName,buyerCode,buyerSubtitle)],equityLinks:[]},
      after:{
        title:"交割后持股架构",
        nodes:shape.after.map(([id,,,,,role,name,code,sublabel])=>node(id,role,name,code,sublabel)),
        equityLinks:shape.interests.map(([,from,to,,,,,,label,dashed,pct])=>({from,to,label,pct,style:dashed?"dashed":"solid"})),
        outcomeBadge,
      },
      flows:shape.flows.map(([id,kind,direction,,headline,subline],i)=>({
        id,kind,direction,step:String(i+1),headline,subline,
        fromLabel:direction==="ltr"?sellerName:buyerName,toLabel:direction==="ltr"?buyerName:sellerName,
      })),
      annotations:shape.notes.map(([title,body],i)=>({tag:String(i+1),title,body})),
      evidenceLinks:shape.authorities.map(([documentId,,page,label])=>({documentId,pages:[page],label})),
    };
  }

  // Source-pinned asset flows: the facts view remains if amounts or stages change.
  const ASSET_CASE_DIAGRAMS = {
    "HK-02596-20260615-liya-hejin-property": {
      doc: "YS-20260615-c21197f7e8f1", date: "2026-06-15", code: "02596", category: "acquisition",
      sourceUrl: "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0615/2026061501508.pdf",
      total: ["contract_consideration", "CNY", 16000000, [1,3]], contractOnly: true,
      requiredTerms: [
        ["contract_consideration", "CNY", 16000000, [1,3]],
        ["property_valuation", "CNY", 17424400, [4]],
        ["property_book_value", "CNY", 12967500, [2]]
      ],
      expectedParties: {
        "收购方": "宜宾市商业银行股份有限公司",
        "卖方": "宜宾翠屏区丽雅房地产开发有限公司",
        "标的": "丽雅和锦19号楼1楼及2楼两间临街商业单元，共989.18平方米"
      },
      title: "丽雅和锦物业现金买卖", buyer: "宜宾市商业银行", seller: "宜宾翠屏区丽雅房地产",
      asset: "丽雅和锦两间临街商铺", assetDetail: "19号楼1、2楼 · 989.18平方米",
      amount: "CNY 16,000,000", paymentLabel: "发票核实后按条件一次付款",
      cashSublabel: "含税合同总价", delivery: "按约交付物业", deliverySublabel: "与全款支付同日",
      pending: "已签约 · 交付日期未披露", purchase: "实物物业现金买卖",
      archetype: "acquisition", caseArchetypeLabel: "关连物业收购",
      caseModalityLabel: "现金买卖（合同）", caseModalityShortLabel: "合同现金",
      assetContractLabel: "实物物业买卖",
      scope: "宜宾市商业银行向宜宾翠屏区丽雅房地产开发有限公司购买两间临街商业单元，面积989.18平方米，含税合同总价为人民币1,600万元。",
      evidenceLinks: [{documentId:"YS-20260615-c21197f7e8f1",pages:[1,3],label:"买卖合同与付款交付安排"}]
    },
    "HK-00990-20261120-penang-prai-offshore-equipment": {
      doc: "YS-20261120-edd55890578e", total: ["usd_supply_price", "USD", 76682926.83],
      paid: ["loi_advance_paid", "USD", 11055000], date: "2026-11-20",
      title: "Prai 数据中心设备供应", buyer: "Deep Source (PN)", seller: "Longmotive DC Solutions",
      asset: "Prai 离岸设备", assetDetail: "设备及附随 CIF 服务",
      amount: "USD 76,682,926.83", paidLabel: "已付并抵扣 USD 11,055,000",
      delivery: "按约供应设备", pending: "设备验收待证", purchase: "设备采购合同",
      scope: "檳城 Prai 项目。设备及附随离岸服务，不含现场施工；预付款含于合同价。"
    },
    "HK-02878-20261106-bonson-wing-hong-office": {
      doc: "YS-20261106-f176d62e171c", total: ["property_purchase_cash", "HKD", 130408000],
      paid: ["initial_deposit_paid", "HKD", 6520400], date: "2026-11-06",
      title: "永康街办公室收购", buyer: "Solomon Systech Ltd.", seller: "Bonson Holdings Ltd.",
      asset: "永康街 18 个办公室", assetDetail: "永康街83号28楼",
      amount: "HKD 130,408,000", paidLabel: "已付按金 HKD 6,520,400",
      delivery: "拟交付空置物业", pending: "正式签约及交割待证", purchase: "物业临时买卖协议",
      scope: "约 11,646 平方尺。其余价款为协议约定；交付时须腾空。"
    }
  };

  function buildVerifiedAssetCase(txCase, f, documents) {
    const matches = ([key,currency,value,pages]) => {
      const terms = (txCase.terms || []).filter(t => t.key === key);
      return terms.length === 1 && terms[0].unit === "money" && terms[0].currency === currency &&
        terms[0].value === value && terms[0].evidence?.documentId === f.doc &&
        (!pages || pages.every(p => terms[0].evidence.pages?.includes(p)));
    };
    if (f.contractOnly) {
      const doc = documents?.[f.doc];
      const anchored = (e, pages) => e?.documentId === f.doc && pages.every(p => e.pages?.includes(p));
      if (txCase.code !== f.code || txCase.category !== f.category || txCase.headlineKey !== f.total[0] ||
          doc?.id !== f.doc || doc.caseId !== txCase.id || doc.url !== f.sourceUrl || doc.date !== f.date ||
          (txCase.terms || []).length !== f.requiredTerms.length || !f.requiredTerms.every(matches) ||
          !txCase.terms.every(t => t.approximate === false) ||
          !Object.entries(f.expectedParties).every(([key,value]) => txCase.parties?.[key] === value) ||
          txCase.lifecycle || txCase.events?.length !== 1 || !anchored(txCase.events[0].evidence,[1,2]) ||
          !txCase.rules?.some(r => r.code === "HKEX:14A" && anchored(r.evidence,[1,5]))) return null;
    }
    const actualStart = (txCase.events || []).some(e => e.kind === "first_announcement" &&
      e.state === "actual" && e.date === f.date && e.evidence?.documentId === f.doc);
    if (!actualStart || txCase.stage?.status !== "active" || txCase.stage?.date !== f.date ||
        txCase.stage?.eventKind !== "first_announcement" || !matches(f.total) || (f.paid ? !matches(f.paid) : !f.contractOnly)) return null;
    const paymentLabel = f.paidLabel || f.paymentLabel;
    const outcomeBadge = f.pending;
    const topology = finalizeLayout(createDiagramCanvas({
      width: 1080, height: 460, status: "active", leftTitle: f.title,
      rightTitle: "资产与履约状态", transitionLabel: "合同安排", outcomeBadge
    }), [
      {id:"L_buyer",panel:"left",x:34,y:110,w:192,h:154,role:"buyer",title:f.buyer,subtitle:"合同买方"},
      {id:"L_seller",panel:"left",x:422,y:110,w:190,h:154,role:"seller",title:f.seller,subtitle:"合同卖方"},
      {id:"R_asset",panel:"right",x:718,y:94,w:316,h:86,role:"target",title:f.asset,subtitle:f.assetDetail},
      {id:"R_pending",panel:"right",x:718,y:268,w:316,h:88,role:"buyer",...(f.contractOnly ? {roleLabel:"履约状态"} : {}),title:f.pending,subtitle:paymentLabel}
    ], [], [
      {id:"A_cash",panel:"left",step:"1",kind:"cash",pathPoints:[[226,153],[422,153]],label:f.amount,
       sublabel:f.cashSublabel || "合同价款",labelCenter:[324,153],labelWidth:168,labelHeight:38},
      {id:"A_asset",panel:"left",step:"2",kind:"asset",pathPoints:[[422,217],[226,217]],label:f.delivery,
       sublabel:f.deliverySublabel || f.assetDetail,labelCenter:[324,217],labelWidth:168,labelHeight:38}
    ]);
    return {
      id:txCase.id, caseId:txCase.id,code:txCase.code,name:txCase.name,mechanism:f.purchase,
      stageLabel:txCase.stage.label,stageDate:f.date,archetype:f.archetype || "disclosable_major",modality:"cash_and_asset",status:"active",
      ...(f.contractOnly ? {caseArchetypeLabel:f.caseArchetypeLabel,caseModalityLabel:f.caseModalityLabel,caseModalityShortLabel:f.caseModalityShortLabel,assetContractLabel:f.assetContractLabel,evidenceLinks:f.evidenceLinks} : {}),
      before:{title:f.title,nodes:[
        {id:"buyer",role:"buyer",name:f.buyer,tier:0},
        {id:"seller",role:"seller",name:f.seller,tier:0}],equityLinks:[]},
      after:{title:"资产与履约状态",nodes:[{id:"asset",role:"target",name:f.asset,tier:0}],equityLinks:[],outcomeBadge},
      flows:[
        {id:"cash",kind:"cash",direction:"ltr",fromLabel:f.buyer,toLabel:f.seller,headline:f.amount,subline:paymentLabel},
        {id:"delivery",kind:"asset",direction:"rtl",fromLabel:f.seller,toLabel:f.buyer,headline:f.delivery,subline:f.pending}
      ],
      annotations:[{tag:"①",title:"标的与合同价款",body:f.scope},{tag:"②",title:f.contractOnly ? "付款与交付安排" : "已付与履约",body:paymentLabel+"；"+f.pending+"。"}],
      topology,compactSummary:f.amount+" · "+f.pending
    };
  }

  // HKEX 2026080502047 pp. 1–7; 2026103000864 pp. 1–2. Keep the
  // two recipients, and pre-/post-increase denominators, separate.
  function buildShanghaiJiangcuAcquisition(txCase) {
    const agreement = "YS-20260805-f652ae5bb2b8";
    const latestUpdate = "YS-20261030-335be03e7aa2";
    const events = [...(txCase.events || []), ...(txCase.processEvents || [])];
    const verifiedEventKinds = new Set(["first_announcement", "dispatch_extension", "supplement"]);
    const sourceEvent = (kind, date, documentId) => events.some(e =>
      e.kind === kind && e.state === "actual" && e.date === date && e.evidence?.documentId === documentId);
    const expectedTerms = [
      ["deal_consideration", "money", "CNY", 164033300],
      ["share_swap_consideration", "money", "CNY", 7700000],
      ["consideration_shares", "shares", null, 2791250],
      ["issue_price", "per_share", "HKD", 3.20],
      ["target_capital_increase", "money", "CNY", 156333300],
      ["enlarged_stake", "percent", null, 70.3],
    ];
    const termsMatch = expectedTerms.every(([key, unit, currency, value]) => {
      const matches = (txCase.terms || []).filter(t => t.key === key);
      return matches.length === 1 && matches[0].unit === unit &&
        (matches[0].currency ?? null) === currency && matches[0].value === value &&
        matches[0].evidence?.documentId === agreement;
    });
    if (txCase.code !== "08247" || txCase.stage?.status !== "active" ||
        txCase.stage?.eventKind !== "first_announcement" || txCase.stage?.date !== "2026-08-05" ||
        !sourceEvent("first_announcement", "2026-08-05", agreement) ||
        !sourceEvent("dispatch_extension", "2026-10-30", latestUpdate) ||
        events.some(e => e.state === "actual" && (!verifiedEventKinds.has(e.kind) || e.date > "2026-10-30")) ||
        !termsMatch) return null;

    const issuer = "中生北控生物科技";
    const seller = "潘震河";
    const target = "上海匠簇科技有限公司";
    const leftTitle = "拟议交易：旧股换股及现金增资";
    const rightTitle = "若交割：增资后股权架构";
    const outcomeBadge = "待通函及股东批准 · 尚未交割";
    const pendingStake = "拟持约 70.3%";
    const topology = finalizeLayout(createDiagramCanvas({
      width: MASTER_W, height: 460, status: "active", leftTitle, rightTitle,
      transitionLabel: "若交割", outcomeBadge,
    }), [
      { id: "L_issuer", panel: "left", x: 34, y: 103, w: 191, h: 123, role: "listed",
        title: issuer, code: "08247.HK", subtitle: "收购及增资方" },
      { id: "L_seller", panel: "left", x: 424, y: 103, w: 188, h: 123, role: "seller",
        title: seller, subtitle: "出售增资前 10% 旧股" },
      { id: "L_target", panel: "left", x: 34, y: 345, w: 191, h: 79, role: "target",
        title: target, roleLabel: "标的公司", subtitle: "标的及增资收款方" },
      { id: "R_issuer", panel: "right", x: 734, y: 104, w: 280, h: 87, role: "listed",
        title: issuer, code: "08247.HK", subtitle: "拟成为标的控股股东" },
      { id: "R_target", panel: "right", x: 734, y: 288, w: 280, h: 87, role: "target",
        title: target, roleLabel: "标的公司", subtitle: "3.3% 摊薄后旧股 + 67% 增资权益" },
    ], [
      { id: "E_existing_stake", panel: "left", from: "L_seller", to: "L_target",
        pathPoints: [[518, 226], [518, 384.5], [225, 384.5]], pctLabel: "增资前持有 10%",
        pillWidth: 130, labelCenter: [380, 384.5] },
      { id: "E_pending_control", panel: "right", from: "R_issuer", to: "R_target",
        dashed: true, pctLabel: pendingStake, pillWidth: 130, labelCenter: [874, 239] },
    ], [
      { id: "A_consideration_shares", panel: "left", step: "1", kind: "shares",
        pathPoints: [[225, 135], [424, 135]], label: "拟发行代价 H 股",
        sublabel: "2,791,250 股 · HKD 3.20/股", labelWidth: 176, labelHeight: 42 },
      { id: "A_existing_equity", panel: "left", kind: "asset",
        pathPoints: [[424, 196], [225, 196]], label: "拟转让 10% 旧股",
        sublabel: "增资前 · 对价 CNY 7,700,000", labelWidth: 176, labelHeight: 42 },
      { id: "A_capital_increase", panel: "left", step: "2", kind: "cash",
        pathPoints: [[129.5, 226], [129.5, 345]], label: "拟向标的现金增资",
        sublabel: "CNY 156,333,300", labelWidth: 179, labelHeight: 42 },
    ]);
    return {
      id: txCase.id, caseId: txCase.id, code: txCase.code, name: txCase.name,
      stageLabel: "已签附条件协议；通函延期", stageDate: "2026-10-30",
      archetype: "disclosable_major", modality: "mixed", status: "active",
      before: { title: leftTitle, nodes: [
        { id: "issuer", role: "listed", name: issuer, code: "08247.HK", tier: 0 },
        { id: "seller", role: "seller", name: seller, tier: 0 },
        { id: "target", role: "target", name: target, tier: 1 },
      ], equityLinks: [
        { from: "seller", to: "target", label: "增资前持有 10%", pct: 10, style: "solid" },
      ] },
      flows: [
        { id: "consideration_shares", kind: "shares", direction: "ltr", step: "1",
          fromLabel: issuer, toLabel: seller, headline: "拟发行 2,791,250 股 H 股",
          subline: "HKD 3.20/股；约定旧股对价 CNY 7,700,000", proposedOrTerminated: true },
        { id: "existing_equity", kind: "asset", direction: "rtl", step: "1",
          fromLabel: seller, toLabel: issuer, headline: "拟转让上海匠簇 10% 旧股",
          subline: "10% 为增资前比例", proposedOrTerminated: true },
        { id: "capital_increase", kind: "cash", direction: "ltr", step: "2",
          fromLabel: issuer, toLabel: target, headline: "拟现金增资 CNY 156,333,300",
          subline: "现金支付给标的，认取增资后约 67% 权益", proposedOrTerminated: true },
      ],
      after: { title: rightTitle, nodes: [
        { id: "issuer_after", role: "listed", name: issuer, code: "08247.HK", tier: 0 },
        { id: "target_after", role: "target", name: target, tier: 1 },
      ], equityLinks: [
        { from: "issuer_after", to: "target_after", label: pendingStake, pct: 70.3, style: "dashed" },
      ], outcomeBadge },
      annotations: [
        { tag: "①", title: "旧股收购及发股", body: "潘震河拟转让增资前 10% 旧股，获发 2,791,250 股代价 H 股，发行价每股 HKD 3.20。" },
        { tag: "②", title: "增资与摊薄", body: "CNY 156,333,300 现金拟注入上海匠簇，取得扩大后约 67%；首步旧股摊薄至约 3.3%，两步合计拟持约 70.3%。协议两步总对价 CNY 164,033,300。" },
        { tag: "③", title: "主要交易及股东批准", body: "交易须获股东批准；一般授权下发行代价股份本身无需另行批准。", ruleCode: "HKEX:19" },
        { tag: "④", title: "最新公告：通函再延期", body: "10 月 30 日公告预计于 2026 年 12 月 31 日或之前寄发通函。9 月 17 日法院解除卖方 10% 股权保全。" },
      ],
      topology, compactSummary: "拟发 H 股换入 10% 旧股并现金增资 · 若交割拟持约 70.3%",
    };
  }

  function verifiedOnSunSpec(txCase, documents) {
    const shape = VERIFIED_ACQUISITIONS[txCase.id];
    if (!matchesVerifiedAcquisition(txCase, shape, documents)) return null;
    const legal = {"上市发行人":"Vobile Group Limited","卖方":"Li Ye",
      "收购方":"Vobile Investment Holdings Limited","法律标的":"On Sun International Limited"};
    if (!Object.entries(legal).every(([key,name]) => txCase.parties?.[key]===name)) return null;

    const seller="Li Ye", issuer="阜博集团", purchaser="Vobile Investment Holdings", target="安晴国际";
    const outcomeBadge="Vobile Investment 全资持有安晴国际";
    const topology=finalizeLayout(createDiagramCanvas({
      width:MASTER_W,height:490,status:"closed",leftTitle:"股份支付及标的转让",rightTitle:"交割后持股架构",
      transitionLabel:"股份交割",outcomeBadge,
    }), [
      {id:"L_seller",panel:"left",x:32,y:104,w:175,h:250,role:"seller",title:seller,subtitle:"安晴国际原股东"},
      {id:"L_issuer",panel:"left",x:438,y:80,w:176,h:100,role:"listed",roleLabel:"股份发行人",title:issuer,code:"03738.HK",subtitle:"在一般授权下发行代价股"},
      {id:"L_buyer",panel:"left",x:438,y:248,w:176,h:107,role:"buyer",roleLabel:"法定买方",title:purchaser,subtitle:"阜博集团直接全资附属"},
      {id:"R_seller",panel:"right",x:715,y:51,w:318,h:62,role:"public",roleLabel:"新股东",title:seller,subtitle:"获发阜博集团股份"},
      {id:"R_issuer",panel:"right",x:715,y:150,w:318,h:63,role:"listed",title:issuer,code:"03738.HK",subtitle:"Vobile Group Limited"},
      {id:"R_buyer",panel:"right",x:715,y:252,w:318,h:66,role:"buyer",roleLabel:"法定买方",title:purchaser,subtitle:"Vobile Investment Holdings Limited"},
      {id:"R_target",panel:"right",x:715,y:358,w:318,h:66,role:"target",title:target,subtitle:"On Sun International Limited"},
    ], [
      {id:"seller-minority",panel:"right",from:"R_seller",to:"R_issuer",dashed:true,pctLabel:"约 0.79% · 上市公司",pillWidth:146,labelCenter:[874,131]},
      {id:"parent-buyer",panel:"right",from:"R_issuer",to:"R_buyer",pctLabel:"100% 直接持有",pillWidth:125,labelCenter:[874,232]},
      {id:"buyer-target",panel:"right",from:"R_buyer",to:"R_target",pctLabel:"100% 已交割",pillWidth:118,labelCenter:[874,337]},
    ], [
      {id:"listed-issues-shares",panel:"left",step:"1",kind:"shares",pathPoints:[[438,127],[207,127]],label:"发行 20,547,945 股新股",sublabel:"每股发行价 3.65 港元",labelCenter:[323,127],labelWidth:192,labelHeight:45},
      {id:"assets-to-legal-buyer",panel:"left",step:"2",kind:"asset",pathPoints:[[207,293],[438,293]],label:"转让安晴国际 100% 股权",sublabel:"卖方转予法定买方",labelCenter:[323,293],labelWidth:192,labelHeight:45},
    ]);

    const leftNodes=[["seller",seller,"seller"],["issuer",issuer,"listed"],["buyer",purchaser,"buyer"]];
    const nodes = (tuples) => tuples.map(([id,name,role])=>({id,name,role}));
    return {
      id:txCase.id,caseId:txCase.id,code:txCase.code,name:txCase.name,mechanism:txCase.mechanism,
      stageLabel:txCase.stage.label,stageDate:shape.date,status:"closed",archetype:"acquisition",caseArchetypeLabel:"股份交易",modality:shape.modality,
      compactSummary:"法定买方收购 100% · 阜博发行 20,547,945 股 · 协议对价 7,500 万港元",
      topology,
      before:{title:"交割各方",nodes:nodes(leftNodes),equityLinks:[]},
      after:{title:"交割后持股架构",nodes:nodes([...leftNodes,["target",target,"target"]]),equityLinks:[
        {from:"seller",to:"issuer",label:"约 0.79% · 上市公司",pct:0.79,style:"dashed"},
        {from:"issuer",to:"buyer",label:"100% 直接持有",pct:100,style:"solid"},
        {from:"buyer",to:"target",label:"100% 已交割",pct:100,style:"solid"},
      ],outcomeBadge},
      flows:[
        {id:"listed-issues-shares",kind:"shares",direction:"rtl",step:"1",fromLabel:issuer,toLabel:seller,
          headline:"发行 20,547,945 股新股",subline:"每股发行价 3.65 港元"},
        {id:"assets-to-legal-buyer",kind:"asset",direction:"ltr",step:"2",fromLabel:seller,toLabel:purchaser,
          headline:"转让安晴国际 100% 股权"},
      ],
      annotations:[
        {tag:"1",title:"股份对价",body:"协议对价为 7,500 万港元，全部以阜博新股支付。已发行股数乘发行价为 74,999,999.25 港元；相差 0.75 港元是两项数字的计算差额，公告未列现金补款。"},
        {tag:"2",title:"发股与受让为不同主体",body:"阜博集团向 Li Ye 发股；阜博集团直接全资附属公司 Vobile Investment Holdings Limited 受让安晴全部股权。卖方取得的是阜博上市股份，约占交割后已发行股份的 0.79%。"},
      ],
      evidenceLinks:shape.authorities.map(([documentId,,page,label])=>({documentId,pages:[page],label})),
    };
  }

  const CURATED_BUILDERS = {
    "HK-03738-20261009-on-sun-international": verifiedOnSunSpec,
    "HK-01910-20260813-beis-85pct": verifiedAcquisitionSpec,
    "HK-08247-20260805-shanghai-jiangcu": buildShanghaiJiangcuAcquisition,
    "HK-03320-20260715-lier-chemical": function (r) {
      const expected = {
        proposed_consideration:[5656249662.43,"CNY","YS-20260730-77fd66557384"],
        proposed_shares:[188102749,null,"YS-20260730-77fd66557384"],
        proposed_equity:[23.5,null,"YS-20260730-77fd66557384"],
        paid_contract_deposit:[1696874898.73,"CNY","YS-20260730-77fd66557384"],
        paid_contract_deposit_ratio:[30,null,"YS-20261123-98e3588d8fec"]
      };
      for (const [key,[value,currency,documentId]] of Object.entries(expected)) {
        if (!(r.terms||[]).some(t=>t.key===key && t.value===value && t.currency===currency && t.evidence?.documentId===documentId)) return null;
      }
      if (r.stage?.status!=="active" || !(r.processEvents||[]).some(e=>e.date==="2026-11-23" && e.state==="actual" && e.evidence?.documentId==="YS-20261123-98e3588d8fec")) return null;
      const deal="拟股权转让 · 定金已付";
      const topology=finalizeLayout(createDiagramCanvas({
        status:"active",width:1080,height:460,leftTitle:"利尔化学股权转让安排",
        rightTitle:"拟变动的持股关系",transitionLabel:"待交割",outcomeBadge:deal
      }),[
        {id:"L_buy",panel:"left",x:32,y:111,w:190,h:158,role:"listed",title:"华润双鹤",code:"600062.SH",subtitle:"法定买方"},
        {id:"L_sell",panel:"left",x:422,y:111,w:190,h:158,role:"seller",title:"四川久远 · 四川化材",subtitle:"两名股份出让方"},
        {id:"R_buy",panel:"right",x:724,y:86,w:306,h:86,role:"buyer",title:"华润双鹤",subtitle:"拟购合计 188,102,749 股"},
        {id:"R_target",panel:"right",x:724,y:270,w:306,h:84,role:"target",title:"利尔化学",code:"002258.SZ",subtitle:"标的上市公司"}
      ],[
        {id:"r_stake",panel:"right",from:"R_buy",to:"R_target",pctLabel:"拟取得约23.50%",dashed:true,labelCenter:[877,220],pillWidth:142}
      ],[
        {id:"l_cash",panel:"left",step:"1",kind:"cash",pathPoints:[[222,152],[422,152]],label:"拟价 RMB 56.56亿",sublabel:"30% 合约定金已付",labelCenter:[322,152],labelWidth:174,labelHeight:38},
        {id:"l_equity",panel:"left",step:"2",kind:"shares",pathPoints:[[422,218],[222,218]],label:"拟转让约 23.50%",sublabel:"188,102,749 股",labelCenter:[322,218],labelWidth:174,labelHeight:38}
      ]);
      return {
        id:r.id,caseId:r.id,code:r.code,name:"华润双鹤收购利尔化学股权",mechanism:"现金协议转让",
        stageLabel:"定金已付 · 待交割",stageDate:"2026-11-23",archetype:"disclosable_major",modality:"cash",status:"active",
        before:{title:"利尔化学股权转让安排",nodes:[{id:"b",role:"buyer",name:"华润双鹤",tier:0},{id:"s",role:"seller",name:"四川久远与四川化材",tier:0}],equityLinks:[]},
        after:{title:"拟变动的持股关系",nodes:[{id:"b1",role:"buyer",name:"华润双鹤",tier:0},{id:"t1",role:"target",name:"利尔化学",tier:1}],equityLinks:[{from:"b1",to:"t1",label:"拟取得约23.50%",pct:23.5,style:"dashed"}],outcomeBadge:deal},
        flows:[
          {id:"cash",kind:"cash",direction:"ltr",fromLabel:"华润双鹤",toLabel:"四川久远与四川化材",headline:"拟总代价 RMB 5,656,249,662.43",subline:"其中已付合约定金 RMB 1,696,874,898.73"},
          {id:"equity",kind:"shares",direction:"rtl",fromLabel:"四川久远与四川化材",toLabel:"华润双鹤",headline:"拟转让利尔化学 188,102,749 股",subline:"约23.50%已发行股本；待过户"}
        ],
        annotations:[
          {tag:"①",title:"两名卖方的现金安排",body:"拟定总代价 RMB 5,656,249,662.43；按合同分项合计已付 RMB 1,696,874,898.73，含转入的竞投定金。"},
          {tag:"②",title:"11月23日进展",body:"已履行定金先决条件，其他先决条件待满足，期限由120日延至240日。"}
        ],
        topology,compactSummary:"拟购约23.50% · 定金已付 · 待交割"
      };
    },

    "HK-01347-20250831-huali-micro": verifiedAcquisitionSpec,
    "HK-06616-20260206-junheng-jihua": verifiedAcquisitionSpec,
    "HK-00011-20251009-hsbc": function (txCase) {
      return {
        id: txCase.id,
        caseId: txCase.id,
        code: txCase.code,
        name: txCase.name,
        mechanism: txCase.mechanism,
        stageLabel: txCase.stage?.label || "计划已生效",
        stageDate: txCase.stage?.date || "2026-01-26",
        archetype: "scheme",
        modality: "cash",
        status: txCase.stage?.status || "closed",
        compactSummary: "汇丰全现金 HKD 155.00/股（约 HKD 1,061.6亿）注销计划股份 → 100% 私有化退市",
        before: {
          title: "交易前股权架构",
          nodes: [
            { id: "hsbc", role: "buyer", name: "香港上海汇丰银行有限公司", sublabel: "要约人 · 收购方", badge: "控股母行", tier: 0 },
            { id: "scheme_sh", role: "public", name: "恒生银行计划股东", sublabel: "无利害关系表决股东", badge: "计划股份", tier: 0 },
            { id: "hsb", role: "listed", name: "恒生银行", code: "00011.HK", jurisdiction: "香港", sublabel: "港交所主板上市主体", tier: 1 },
          ],
          equityLinks: [
            { from: "hsbc", to: "hsb", label: "既有控股股权", style: "solid" },
            { from: "scheme_sh", to: "hsb", label: "恒生银行计划股份", style: "dashed" },
          ],
        },
        flows: [
          {
            id: "cash_consideration",
            kind: "cash",
            direction: "ltr",
            step: "01",
            fromLabel: "香港上海汇丰银行有限公司",
            toLabel: "恒生银行计划股东",
            headline: "HKD 155.00/股 · 总现金约 HKD 1,061.6亿",
            subline: "较前收市溢价 +30.3% · 隐含全公司股权估值约 HKD 2,903.1亿（未扣股息调整）",
            proposedOrTerminated: false,
          },
          {
            id: "scheme_cancel",
            kind: "cancel",
            direction: "rtl",
            step: "02",
            fromLabel: "恒生银行计划股份",
            toLabel: "注销并向汇丰发行新股",
            headline: "注销计划股份 · LR 6.15(2) 撤销上市",
            subline: "TC 2.10 赞成 85.75% / 无利害反对 5.94% · 2026-01-26 生效 · 01-27 退市",
            proposedOrTerminated: false,
          },
        ],
        after: {
          title: "交易后架构",
          nodes: [
            { id: "hsbc_after", role: "buyer", name: "香港上海汇丰银行有限公司", sublabel: "唯一全资控股母行", badge: "要约人", tier: 0 },
            { id: "hsb_after", role: "target", name: "恒生银行", jurisdiction: "香港", sublabel: "非上市全资附属银行", badge: "已撤销上市", tier: 1 },
          ],
          equityLinks: [
            { from: "hsbc_after", to: "hsb_after", label: "100% 全资控股", pct: 100, style: "solid" },
          ],
          outcomeBadge: "100% 全资控股 · 已撤销上市",
        },
        annotations: [
          { tag: "①", title: "买方与标的", body: "收购方香港上海汇丰银行有限公司透过法院协议安排私有化恒生银行（00011.HK）全部计划股份。", ruleCode: null },
          { tag: "②", title: "对价与估值锚点", body: "每股现金注销价 HKD 155.00（溢价 +30.3%），计划股份总现金约 HKD 1,061.6亿，全公司股权估值约 HKD 2,903.1亿。", ruleCode: null },
          { tag: "③", title: "监管规则触发", body: "适用 TC 3.5 / TC 2.10（法院会议赞成 85.75%、无利害反对 5.94%）、TC 8.2 延寄及 LR 6.15(2) 撤销上市。", ruleCode: "TC:2.10 · HKEX:6.15(2)" },
          { tag: "④", title: "审批与交割周期", body: "2025-10-09 公告，2026-01-08 投票通过，01-23 高院批准，2026-01-26 生效（67 / 24 / 18 天）。", ruleCode: null },
        ],
        topology: buildSchemeTopology({
          status: txCase.stage?.status || "closed",
          leftTitle: "协议安排私有化交易流向",
          rightTitle: "私有化后股权架构",
          transitionLabel: "计划生效",
          buyerName: "香港上海汇丰银行有限公司",
          buyerSub: "要约人 · 收购方",
          buyerBadge: "控股母行",
          publicName: "恒生银行计划股东",
          publicSub: "无利害关系表决股东",
          listedName: "恒生银行",
          code: "00011.HK",
          jurisdiction: "香港",
          listedSub: "港交所主板上市银行",
          beforeBuyerPct: "既有控股股权",
          beforePublicPct: "计划股份",
          cashLabel: "HKD 155.00/股 · 总现金约 HKD 1,061.6亿",
          cashSub: "较前收市溢价 +30.3% · 全公司估值约 HKD 2,903.1亿",
          cancelLabel: "注销计划股份 · LR 6.15(2)",
          cancelSub: "TC 2.10 赞成 85.75% / 反对 5.94%",
          afterBuyerSub: "唯一全资控股母行",
          afterTargetSub: "非上市全资附属银行 · 01-27 退市",
          afterTargetBadge: "LR 6.15(2) 退市",
          outcomeBadge: "100% 全资控股 · 已撤销上市",
        }),
      };
    },

    "HK-00459-20251209-wealth-builder": function (txCase) {
      return {
        id: txCase.id,
        caseId: txCase.id,
        code: txCase.code,
        name: txCase.name,
        mechanism: txCase.mechanism,
        stageLabel: txCase.stage?.label || "计划已生效",
        stageDate: txCase.stage?.date || "2026-03-26",
        archetype: "scheme",
        modality: "cash",
        status: txCase.stage?.status || "closed",
        compactSummary: "Wealth Builder 现金 HKD 0.133/股（最高 HKD 8,947.3万）注销计划股份 → 开曼计划生效",
        before: {
          title: "交易前股权架构",
          nodes: [
            { id: "wb", role: "buyer", name: "Wealth Builder Holdings Limited", sublabel: "要约方 · 收购方", badge: "要约人", tier: 0 },
            { id: "scheme_sh", role: "public", name: "鋑联控股计划股东", sublabel: "无利害关系表决股东", badge: "计划股份", tier: 0 },
            { id: "legend", role: "listed", name: "鋑联控股", code: "00459.HK", jurisdiction: "开曼群岛", sublabel: "港交所主板上市主体", tier: 1 },
          ],
          equityLinks: [
            { from: "wb", to: "legend", label: "要约方既有持股", style: "solid" },
            { from: "scheme_sh", to: "legend", label: "鋑联控股计划股份", style: "dashed" },
          ],
        },
        flows: [
          {
            id: "cash_consideration",
            kind: "cash",
            direction: "ltr",
            step: "01",
            fromLabel: "Wealth Builder Holdings",
            toLabel: "鋑联控股计划股东",
            headline: "HKD 0.133/股 · 最高现金需求 HKD 8,947.3万",
            subline: "较最后交易日溢价 +77.33%（假设股本不变 · 含 JLL 物业估值）",
            proposedOrTerminated: false,
          },
          {
            id: "scheme_cancel",
            kind: "cancel",
            direction: "rtl",
            step: "02",
            fromLabel: "鋑联控股计划股份",
            toLabel: "开曼大法院批准注销",
            headline: "注销计划股份 · 私有化计划生效",
            subline: "TC 2.10 赞成 90.22% / 无利害反对 1.22% · 配套 TC 10.4 盈利预测双签核",
            proposedOrTerminated: false,
          },
        ],
        after: {
          title: "交易后架构",
          nodes: [
            { id: "wb_after", role: "buyer", name: "Wealth Builder Holdings Limited", sublabel: "私有化控股股东", badge: "要约人", tier: 0 },
            { id: "legend_after", role: "target", name: "鋑联控股", jurisdiction: "开曼群岛", sublabel: "计划已生效（2026-03-26）", badge: "私有化完成", tier: 1 },
          ],
          equityLinks: [
            { from: "wb_after", to: "legend_after", label: "100% 全资控股", pct: 100, style: "solid" },
          ],
          outcomeBadge: "100% 全资控股 · 计划已生效",
        },
        annotations: [
          { tag: "①", title: "买方与标的", body: "Wealth Builder Holdings Limited 透过开曼大法院协议安排私有化鋑联控股（00459.HK）全部计划股份。", ruleCode: null },
          { tag: "②", title: "对价与估值锚点", body: "每股现金注销价 HKD 0.133（溢价 +77.33%），计划股份最高现金需求 HKD 8,947.3万，由 JLL 出具物业估值。", ruleCode: null },
          { tag: "③", title: "监管规则触发", body: "适用 TC 2.10（赞成 90.22% / 反对 1.22%）、TC 8.2 延寄及 TC 10 / 10.4 盈利预测双签核（Somerley + PwC）。", ruleCode: "TC:2.10 · TC:10.4" },
          { tag: "④", title: "审批与交割周期", body: "2026-03-19 开曼大法院批准，2026-03-26 计划生效（50 / 23 / 34 天）；公告预计 2026-03-30 退市。", ruleCode: null },
        ],
        topology: buildSchemeTopology({
          status: txCase.stage?.status || "closed",
          leftTitle: "开曼协议安排私有化流向",
          rightTitle: "私有化后股权架构",
          transitionLabel: "计划生效",
          buyerName: "Wealth Builder Holdings",
          buyerSub: "要约方 · 收购方",
          publicName: "鋑联控股计划股东",
          publicSub: "无利害关系表决股东",
          listedName: "鋑联控股",
          code: "00459.HK",
          jurisdiction: "开曼群岛",
          listedSub: "港交所主板上市主体",
          beforeBuyerPct: "要约方既有持股",
          beforePublicPct: "计划股份",
          cashLabel: "HKD 0.133/股 · 最高现金 HKD 8,947.3万",
          cashSub: "较最后交易日溢价 +77.33% · 含 JLL 物业估值",
          cancelLabel: "注销计划股份 · 开曼生效",
          cancelSub: "赞成 90.22% / 反对 1.22% · TC 10.4",
          afterBuyerSub: "私有化全资控股股东",
          afterTargetSub: "开曼大法院批准 · 03-26 生效",
          afterTargetBadge: "计划已生效",
          outcomeBadge: "100% 全资控股 · 计划已生效",
        }),
      };
    },

    "HK-02885-20261109-liye": function (txCase) {
      return {
        id: txCase.id,
        caseId: txCase.id,
        code: txCase.code,
        name: txCase.name,
        mechanism: txCase.mechanism,
        stageLabel: txCase.stage?.label || "控股权已交割 · 待综合文件",
        stageDate: txCase.stage?.date || "2026-11-16",
        archetype: "offer",
        modality: "cash",
        status: txCase.stage?.status || "active",
        compactSummary: "立业集团 HKD 2.338亿交割 70% 控股权 → 触发 TC 26.1 按 HKD 0.835/股强制现金要约",
        before: {
          title: "交易前股权架构",
          nodes: [
            { id: "seller", role: "seller", name: "Peiport Alpha Limited", sublabel: "原控股股东 · 出售方", badge: "出让 70%", tier: 0 },
            { id: "public", role: "public", name: "其余独立股东", sublabel: "含 2,000万股不接纳承诺", badge: "要约范围 30%", tier: 0 },
            { id: "listed", role: "listed", name: "彼岸控股", code: "02885.HK", sublabel: "港交所主板上市主体", tier: 1 },
            { id: "buyer", role: "buyer", name: "香港立业集团有限公司", sublabel: "外部收购方 · 强制要约人", badge: "拟入主 70%", tier: 2 },
          ],
          equityLinks: [
            { from: "seller", to: "listed", label: "70%（2.80亿股）", pct: 70, style: "solid" },
            { from: "public", to: "listed", label: "30%（1.20亿股）", pct: 30, style: "dashed" },
          ],
        },
        flows: [
          {
            id: "step1_cash",
            kind: "cash",
            direction: "ltr",
            step: "Step 1",
            fromLabel: "香港立业集团有限公司",
            toLabel: "Peiport Alpha Limited",
            headline: "现金 HKD 2.338亿 收购 70% 控股权",
            subline: "按 HKD 0.835/股 买入 2.80亿股 · 已于 2026-11-16 完成交割",
            proposedOrTerminated: false,
          },
          {
            id: "step1_shares",
            kind: "shares",
            direction: "rtl",
            step: "Step 1",
            fromLabel: "Peiport Alpha Limited",
            toLabel: "香港立业集团有限公司",
            headline: "过户彼岸控股 70% 控股权（2.80亿股）",
            subline: "控制权正式易手，依法触发强制全面要约义务",
            proposedOrTerminated: false,
          },
          {
            id: "step2_mgo",
            kind: "cash",
            direction: "ltr",
            step: "Step 2",
            fromLabel: "香港立业集团有限公司",
            toLabel: "其余 1.20亿股要约股东",
            headline: "TC 26.1 强制无条件现金要约 HKD 0.835/股",
            subline: "要约范围 1.20亿股总值 HKD 1.002亿 · 扣 2,000万股不接纳承诺后最高现金 HKD 8,350万",
            proposedOrTerminated: false,
          },
        ],
        after: {
          title: "交割后股权架构",
          nodes: [
            { id: "buyer_after", role: "buyer", name: "香港立业集团有限公司", sublabel: "新任控股股东", badge: "控股权已交割", tier: 0 },
            { id: "public_after", role: "public", name: "公众及不接纳承诺股东", sublabel: "含 2,000万股不接纳承诺", badge: "待综合文件", tier: 0 },
            { id: "listed_after", role: "listed", name: "彼岸控股", code: "02885.HK", sublabel: "港交所主板维持上市", tier: 1 },
          ],
          equityLinks: [
            { from: "buyer_after", to: "listed_after", label: "≥ 70% 控股权", pct: 70, style: "solid" },
            { from: "public_after", to: "listed_after", label: "≤ 30% 余下股份", pct: 30, style: "dashed" },
          ],
          outcomeBadge: "立业集团 ≥70% 控股 · 维持上市",
        },
        annotations: [
          { tag: "①", title: "买方、卖方与标的", body: "香港立业集团有限公司向 Peiport Alpha Limited 收购彼岸控股（02885.HK）70% 股权（2.80亿股），随后向余下股东提全面要约。", ruleCode: null },
          { tag: "②", title: "两步现金对价", body: "控股权对价 HKD 2.338亿（每股 HKD 0.835）；余下 1.20亿股要约总值 HKD 1.002亿，扣 2,000万股不接纳承诺后最高现金 HKD 8,350万。", ruleCode: null },
          { tag: "③", title: "监管规则与中介", body: "收购 70% 触发《收购守则》Rule 26.1 强制无条件现金要约；申万宏源融资任要约方 FA，Austrax Capital 任独董会 IFA。", ruleCode: "TC:26.1" },
          { tag: "④", title: "审批与交割状态", body: "2026-11-09 首次公告，2026-11-16 控股权已交割；目前处于待寄发综合要约文件阶段。", ruleCode: null },
        ],
        topology: buildOfferTopology({
          status: txCase.stage?.status || "active",
          leftTitle: "交易结构与两步要约流向",
          rightTitle: "交割后股权架构",
          transitionLabel: "控权交割",
          buyerName: "香港立业集团",
          buyerSub: "买方 · 强制要约人",
          buyerBadge: "新控权方",
          sellerName: "Peiport Alpha",
          sellerSub: "原控股股东 · 卖方",
          publicName: "其余独立股东",
          publicSub: "含 2,000万股不接纳承诺",
          listedName: "彼岸控股",
          code: "02885.HK",
          listedSub: "港交所主板上市主体",
          beforeSellerPct: "70% · 2.80亿股",
          beforePublicPct: "30% · 1.20亿股",
          step1CashLabel: "现金 HKD 2.338亿 购 70%",
          step1CashSub: "HKD 0.835/股 · 11-16 已交割",
          step1SharesLabel: "70%股",
          step2MgoLabel: "TC 26.1 强制无条件现金要约 HKD 0.835/股",
          step2MgoSub: "1.20亿股总值 HKD 1.002亿 · 扣 2,000万股承诺后最高现金 HKD 8,350万",
          afterBuyerSub: "控股权已交割",
          afterPublicName: "公众及不接纳股东",
          afterPublicSub: "待综合要约文件",
          afterListedSub: "港交所主板维持上市",
          afterBuyerPct: "≥70% 控股权",
          afterPublicPct: "≤30% 余下股份",
          outcomeBadge: "立业集团 ≥70% 控股 · 维持上市",
        }),
      };
    },

    "HK-00953-20260121-cmc": function (txCase) {
      return {
        id: txCase.id,
        caseId: txCase.id,
        code: txCase.code,
        name: txCase.name,
        mechanism: txCase.mechanism,
        stageLabel: txCase.stage?.label || "收购协议已终止",
        stageDate: txCase.stage?.date || "2026-09-18",
        archetype: "acquisition",
        modality: "shares",
        status: txCase.stage?.status || "terminated",
        compactSummary: "原拟按 HKD 0.32 发 159.3亿股购 CMC Moon（CNY 45.8亿）· 2026-09-18 协议已终止",
        before: {
          title: "原拟交易架构",
          nodes: [
            { id: "listed", role: "listed", name: "邵氏兄弟控股有限公司", code: "00953.HK", sublabel: "原拟收购方 · 上市主体", tier: 0 },
            { id: "seller", role: "seller", name: "CMC 透过 HoldCo", sublabel: "原拟出售方 · 关连人士", badge: "关连卖方", tier: 0 },
            { id: "target", role: "target", name: "CMC Moon Holdings Limited", sublabel: "原拟注入标的 · 全部股权", badge: "未实施", tier: 1 },
          ],
          equityLinks: [
            { from: "seller", to: "target", label: "100% 标的股权", pct: 100, style: "solid" },
          ],
        },
        flows: [
          {
            id: "proposed_shares",
            kind: "shares",
            direction: "ltr",
            step: "拟议",
            fromLabel: "邵氏兄弟控股 (00953.HK)",
            toLabel: "CMC 透过 HoldCo",
            headline: "原拟按 HKD 0.32 发行 159.3亿股代价股",
            subline: "原协议购买价 CNY 45.8亿（折算约 HKD 51.0亿）· 协议终止未发行",
            proposedOrTerminated: true,
          },
          {
            id: "proposed_asset",
            kind: "asset",
            direction: "rtl",
            step: "拟议",
            fromLabel: "CMC 透过 HoldCo",
            toLabel: "邵氏兄弟控股 (00953.HK)",
            headline: "原拟注入 CMC Moon 全部股权（未交割）",
            subline: "原拟申请 LR 14.06C 极端交易 · 2026-09-18 正式终止收购协议",
            proposedOrTerminated: true,
          },
        ],
        after: {
          title: "终止后架构",
          nodes: [
            { id: "listed_after", role: "listed", name: "邵氏兄弟控股有限公司", code: "00953.HK", sublabel: "维持原上市架构 · 未发新股", badge: "维持原状", tier: 0 },
            { id: "seller_after", role: "seller", name: "CMC 透过 HoldCo", sublabel: "受 TC 31.1(c) 六个月限制", badge: "协议已终止", tier: 0 },
            { id: "target_after", role: "target", name: "CMC Moon Holdings Limited", sublabel: "仍由原卖方持有 · 未并表", tier: 1 },
          ],
          equityLinks: [
            { from: "seller_after", to: "target_after", label: "维持 100% 原持股", pct: 100, style: "solid" },
          ],
          outcomeBadge: "维持原上市架构 · 触发 TC 31.1(c) 六个月限制",
        },
        annotations: [
          { tag: "①", title: "原拟买卖与标的", body: "邵氏兄弟控股（00953.HK）原拟向关连方 CMC（透过 HoldCo）收购 CMC Moon Holdings Limited 全部股权。", ruleCode: null },
          { tag: "②", title: "原拟发股对价", body: "原购买价 CNY 45.8亿（折算约 HKD 51.0亿），拟按 HKD 0.32/股发行 159.3亿股（15,929,741,365 股）代价股份。", ruleCode: null },
          { tag: "③", title: "监管规则与终止限制", body: "涉 LR 第 14 章非常重大收购、第 14A 章关连收购及拟申请 LR 14.06C 极端交易；终止后触发 TC 31.1(c) 六个月限制。", ruleCode: "HKEX:14.06C (拟) · TC:31.1(c)" },
          { tag: "④", title: "终止进展", body: "2026-01-21 首次公告，2026-09-18 宣布收购协议终止；中信证券（香港）任上市公司 FA。", ruleCode: null },
        ],
        topology: buildAcquisitionTopology({
          status: txCase.stage?.status || "terminated",
          leftTitle: "原拟非常重大及关连收购 · 协议已终止",
          rightTitle: "终止后架构 · 维持原状",
          transitionLabel: "协议终止",
          terminatedBanner: "✕ 2026-09-18 收购协议已终止 · 原拟发股与注入均未实施",
          listedName: "邵氏兄弟控股",
          code: "00953.HK",
          sellerName: "CMC 透过 HoldCo",
          sellerSub: "原拟出售方 · 关连卖方",
          targetName: "CMC Moon Holdings",
          targetSub: "原拟收购标的 · 全部股权",
          payKind: "shares",
          payLabel: "原拟按 HKD 0.32 发 159.3亿股",
          paySub: "原价 CNY 45.8亿（约 HKD 51.0亿）· 未实施",
          assetLabel: "原拟注入 CMC Moon 全部股权",
          assetSub: "拟申请 LR 14.06C 极端交易 · 已终止",
          afterSellerSub: "受 TC 31.1(c) 六个月限制",
          outcomeBadge: "维持原上市架构 · 触发 TC 31.1(c) 六个月限制",
        }),
      };
    },

    "HK-01563-20260521-xhnavigator": function (txCase) {
      return {
        id: txCase.id,
        caseId: txCase.id,
        code: txCase.code,
        name: txCase.name,
        mechanism: txCase.mechanism,
        stageLabel: txCase.stage?.label || "股东已批准",
        stageDate: txCase.stage?.date || "2026-08-27",
        archetype: "disposal",
        modality: "cash_and_asset",
        status: txCase.stage?.status || "approved",
        compactSummary: "01563 附属交付 XH Navigator 散货船（估值 USD 900万）换取现金结算 USD 895万 · 股东已批准",
        before: {
          title: "交易前权属架构",
          nodes: [
            { id: "listed", role: "listed", name: "友联国际教育租赁", code: "01563.HK", sublabel: "港交所主板上市母公司", tier: 0 },
            { id: "spv", role: "seller", name: "Union Shipping Fund I — SPV2 Limited", sublabel: "01563.HK 附属 · 收款方/卖方", badge: "出售 SPV", tier: 1 },
            { id: "buyer", role: "buyer", name: "Xie Hai Navigator Shipping Co., Limited", sublabel: "付款方 · 船舶承购方", badge: "买方", tier: 1 },
            { id: "vessel", role: "target", name: "XH Navigator 散货船及相关租约", sublabel: "BMI 市场估值 USD 900万", badge: "处置标的", tier: 2 },
          ],
          equityLinks: [
            { from: "listed", to: "spv", label: "上市集团附属", style: "solid" },
            { from: "spv", to: "vessel", label: "散货船权属及租约", style: "solid" },
          ],
        },
        flows: [
          {
            id: "cash_settlement",
            kind: "cash",
            direction: "rtl",
            step: "01",
            fromLabel: "Xie Hai Navigator Shipping",
            toLabel: "Union Shipping Fund I — SPV2",
            headline: "现金结算额 USD 895万",
            subline: "租约终止及船舶交付现金结算 · 对标独立估值 USD 900万（2026-04-30）",
            proposedOrTerminated: false,
          },
          {
            id: "vessel_delivery",
            kind: "asset",
            direction: "ltr",
            step: "02",
            fromLabel: "Union Shipping Fund I — SPV2",
            toLabel: "Xie Hai Navigator Shipping",
            headline: "交付 XH Navigator 散货船并终止租约",
            subline: "构成 LR 14.07 主要交易（25%–75%）· 2026-08-27 股东大会已批准",
            proposedOrTerminated: false,
          },
        ],
        after: {
          title: "批准后拟交割架构",
          nodes: [
            { id: "listed_after", role: "listed", name: "友联国际教育租赁", code: "01563.HK", sublabel: "维持主板上市 · 回收现金", tier: 0 },
            { id: "spv_after", role: "seller", name: "Union Shipping Fund I — SPV2 Limited", sublabel: "收款 USD 895万 · 租约终止", badge: "资产出表", tier: 1 },
            { id: "buyer_after", role: "buyer", name: "Xie Hai Navigator Shipping Co., Limited", sublabel: "承接船舶所有权", tier: 1 },
            { id: "vessel_after", role: "target", name: "XH Navigator 散货船", sublabel: "按决议安排交付买方", badge: "股东已批准", tier: 2 },
          ],
          equityLinks: [
            { from: "listed_after", to: "spv_after", label: "上市集团附属", style: "solid" },
            { from: "buyer_after", to: "vessel_after", label: "股东批准后交付", style: "dashed" },
          ],
          outcomeBadge: "股东已批准（2026-08-27）· 船舶资产出表",
        },
        annotations: [
          { tag: "①", title: "买卖各方与标的", body: "01563.HK 附属 Union Shipping Fund I — SPV2 向 Xie Hai Navigator Shipping 处置 XH Navigator 散货船并终止租约。", ruleCode: null },
          { tag: "②", title: "现金结算与估值锚点", body: "现金结算额 USD 895万；BMI Appraisals 独立估值报告评估该散货船市场估值 USD 900万（估值日 2026-04-30）。", ruleCode: null },
          { tag: "③", title: "监管规则触发", body: "适用《上市规则》第 14 章及 LR 14.07 百分比率测试（高于 25%、低于 75%），构成主要交易须股东批准。", ruleCode: "HKEX:14.07" },
          { tag: "④", title: "审批进度", body: "2026-05-21 公告，07-23 寄发通函（63天），2026-08-27 股东批准（35天）；现阶段为股东已批准。", ruleCode: null },
        ],
        topology: buildDisposalTopology({
          status: txCase.stage?.status || "approved",
          leftTitle: "主要交易 · 船舶处置与现金结算",
          rightTitle: "批准后拟交割架构",
          transitionLabel: "股东批准",
          listedName: "友联国际教育租赁",
          code: "01563.HK",
          sellerName: "Union Shipping SPV2",
          sellerShort: "Union Shipping SPV2",
          sellerSub: "01563.HK 附属 · 收款方",
          buyerName: "Xie Hai Navigator",
          buyerShort: "Xie Hai Navigator",
          buyerSub: "付款方 · 承购方",
          assetName: "XH Navigator 散货船",
          assetShort: "XH Navigator 散货船",
          assetSub: "BMI 估值 USD 900万",
          beforeHoldLabel: "船舶所有权及租约",
          cashLabel: "现金结算额 USD 895万",
          cashSub: "对标 BMI 估值 USD 900万（2026-04-30）",
          assetLabel: "终止租约并交付 XH Navigator",
          assetSubArrow: "LR 14.07 主要交易（25%–75%）· 股东已批准",
          afterSellerSub: "收回 USD 895万现金",
          afterAssetSub: "按决议交付买方",
          afterHoldLabel: "批准后交付",
          outcomeBadge: "股东已批准（2026-08-27）· 船舶资产出表",
        }),
      };
    },

    "HK-06998-20241007-edding": function (txCase) {
      return {
        id: txCase.id,
        caseId: txCase.id,
        code: txCase.code,
        name: txCase.name,
        mechanism: txCase.mechanism,
        stageLabel: txCase.stage?.label || "合并已完成",
        stageDate: txCase.stage?.date || "2025-12-30",
        archetype: "reverse_takeover",
        modality: "shares",
        status: txCase.stage?.status || "closed",
        compactSummary: "06998 按 1:3.30 发行 14.83亿股合并 Edding Group → 标的股东持 73.73% · 更名亿腾嘉和",
        before: {
          title: "合并前双主体架构",
          nodes: [
            { id: "genor_sh", role: "public", name: "原嘉和生物股东", sublabel: "既有上市股东", badge: "原股东", tier: 0 },
            { id: "edding_sh", role: "seller", name: "Edding Group 原股东", sublabel: "标的注入方", badge: "换股入主", tier: 0 },
            { id: "genor", role: "listed", name: "嘉和生物药业（开曼）控股", code: "06998.HK", jurisdiction: "开曼群岛", sublabel: "港交所主板上市平台", tier: 1 },
            { id: "edding", role: "target", name: "Edding Group Company Limited", sublabel: "合并目标医药集团", badge: "标的集团", tier: 1 },
          ],
          equityLinks: [
            { from: "genor_sh", to: "genor", label: "100% 原上市股本", pct: 100, style: "dashed" },
            { from: "edding_sh", to: "edding", label: "100% 标的股权", pct: 100, style: "solid" },
          ],
        },
        flows: [
          {
            id: "rto_shares",
            kind: "shares",
            direction: "ltr",
            step: "01",
            fromLabel: "06998.HK 上市主体",
            toLabel: "Edding Group 原股东",
            headline: "按 1 : 3.30 发行 14.83亿股代价股",
            subline: "实发 1,482,921,982 股（每 1 股标的换 3.30 股）· 占扩大后股本 73.73%",
            proposedOrTerminated: false,
          },
          {
            id: "rto_merger",
            kind: "asset",
            direction: "rtl",
            step: "02",
            fromLabel: "Edding Group 原股东",
            toLabel: "06998.HK 上市主体",
            headline: "合并注入 Edding Group 全部股权",
            subline: "LR 14.06B 反向收购按新上市申请获批 · 2025-12-30 完成并更名亿腾嘉和",
            proposedOrTerminated: false,
          },
        ],
        after: {
          title: "合并后上市架构",
          nodes: [
            { id: "edding_sh_after", role: "buyer", name: "原 Edding 股东", sublabel: "代价股份入主控权", badge: "73.73%", tier: 0 },
            { id: "genor_sh_after", role: "public", name: "原嘉和生物股东", sublabel: "摊薄后存续股东", badge: "26.27%", tier: 0 },
            { id: "combined", role: "listed", name: "亿腾嘉和医药集团有限公司", code: "06998.HK", sublabel: "原嘉和生物更名 · 主板上市", tier: 1 },
            { id: "edding_sub", role: "target", name: "Edding Group Company Limited", sublabel: "并入上市集团全资核心业务", badge: "全资并表", tier: 2 },
          ],
          equityLinks: [
            { from: "edding_sh_after", to: "combined", label: "73.73% 扩大后股本", pct: 73.73, style: "solid" },
            { from: "genor_sh_after", to: "combined", label: "26.27% 原股东", pct: 26.27, style: "dashed" },
            { from: "combined", to: "edding_sub", label: "100% 合并控股", pct: 100, style: "solid" },
          ],
          outcomeBadge: "原Edding股东持 73.73% · 更名亿腾嘉和",
        },
        annotations: [
          { tag: "①", title: "上市主体与标的", body: "嘉和生物（06998.HK）以增发代价股方式合并收购 Edding Group Company Limited，完成后更名亿腾嘉和医药集团。", ruleCode: null },
          { tag: "②", title: "换股比例与股本格局", body: "按 1 : 3.30 发行 1,482,921,982 股（14.83亿股）代价股，合并后原 Edding 股东占扩大后股本 73.73%，原嘉和股东占 26.27%。", ruleCode: null },
          { tag: "③", title: "监管规则触发", body: "确认构成《上市规则》14.06B 反向收购并按新上市申请处理；Somerley Capital 就合并、清洗豁免及特别交易任 IFA。", ruleCode: "HKEX:14.06B" },
          { tag: "④", title: "全周期时间线", body: "2024-10-07 首次公告，2025-12-05 寄发通函（424天），12-22 投票通过（17天），2025-12-30 合并完成（历时 449 天）。", ruleCode: null },
        ],
        topology: buildRtoTopology({
          status: txCase.stage?.status || "closed",
          leftTitle: "反向收购合并流向 · LR 14.06B",
          rightTitle: "合并后上市股权架构",
          transitionLabel: "合并完成",
          origShName: "原嘉和生物股东",
          targetShName: "Edding 原股东",
          beforeListedName: "嘉和生物",
          targetName: "Edding Group",
          targetSub: "合并目标医药集团",
          afterCtrlName: "原 Edding 股东",
          afterListedName: "亿腾嘉和医药集团",
          afterListedSub: "原嘉和生物更名 · 主板上市",
          code: "06998.HK",
          jurisdiction: "开曼群岛",
          afterCtrlPct: "73.73% 控股",
          afterOrigPct: "26.27% 存续",
          sharesLabel: "1:3.30 发行 14.83亿股",
          sharesSub: "实发 1,482,921,982 股（73.73%）",
          assetLabel: "100% 吸收合并注入",
          assetSub: "LR 14.06B 反向收购 · 449 天",
          outcomeBadge: "原Edding股东持 73.73% · 更名亿腾嘉和",
        }),
      };
    },

    "HK-01712-20260429-holdco": function (txCase) {
      return {
        id: txCase.id,
        caseId: txCase.id,
        code: txCase.code,
        name: txCase.name,
        mechanism: txCase.mechanism,
        stageLabel: txCase.stage?.label || "计划已实施及介绍上市",
        stageDate: txCase.stage?.date || "2026-09-02",
        archetype: "holding_substitution",
        modality: "share_swap",
        status: txCase.stage?.status || "closed",
        compactSummary: "澳洲 Part 5.1 安排计划 1:1 换股 → 原澳股退市，香港新控股 01712.HK 介绍上市（126天）",
        before: {
          title: "重组前澳洲架构",
          nodes: [
            { id: "orig_sh", role: "public", name: "原计划股东（全体既有股东）", sublabel: "持有原澳洲上市股份", badge: "100% 既有股东", tier: 0 },
            { id: "au_holdco", role: "listed", name: "Dragon Mining Limited", code: "01712.HK", jurisdiction: "澳大利亚", sublabel: "原澳大利亚上市控股公司", tier: 1 },
          ],
          equityLinks: [{ from: "orig_sh", to: "au_holdco", label: "100% 原计划股份", pct: 100, style: "solid" }],
        },
        flows: [
          {
            id: "swap_1_to_1",
            kind: "shares",
            direction: "bi",
            step: "01",
            fromLabel: "原全体计划股东",
            toLabel: "Dragon Gold Mining（香港）",
            headline: "澳洲 Part 5.1 安排计划 · 1 : 1 换股",
            subline: "每 1 股原澳洲股份换取 1 股香港新控股股份 · 无现金流出且比例零变动",
            proposedOrTerminated: false,
          },
          {
            id: "delist_intro",
            kind: "cancel",
            direction: "ltr",
            step: "02",
            fromLabel: "Dragon Mining（澳大利亚）",
            toLabel: "香港新控股介绍上市",
            headline: "原股份 LR 6.15(2) 撤销上市 · 新香港控股介绍上市",
            subline: "2026-08-13 澳洲法院批准生效 · 2026-09-02 实施及挂牌（全程 126 天）",
            proposedOrTerminated: false,
          },
        ],
        after: {
          title: "重组后香港架构",
          nodes: [
            { id: "sh_after", role: "public", name: "原全体计划股东", sublabel: "按原比例平移持股", badge: "比例零摊薄", tier: 0 },
            { id: "hk_holdco", role: "holdco", name: "Dragon Gold Mining Limited", code: "01712.HK", jurisdiction: "香港", sublabel: "新香港控股主体 · 介绍上市", tier: 1 },
            { id: "au_sub", role: "target", name: "Dragon Mining Limited", jurisdiction: "澳大利亚", sublabel: "原澳公司转为全资附属", badge: "原股已退市", tier: 2 },
          ],
          equityLinks: [
            { from: "sh_after", to: "hk_holdco", label: "100% 介绍上市股份", pct: 100, style: "solid" },
            { from: "hk_holdco", to: "au_sub", label: "100% 全资控股", pct: 100, style: "solid" },
          ],
          outcomeBadge: "香港新控股 100% 控澳主体 · 介绍上市",
        },
        annotations: [
          { tag: "①", title: "原控股与新控股主体", body: "透过澳洲《公司法》Part 5.1 安排计划将顶层控股由澳大利亚 Dragon Mining 切换至香港 Dragon Gold Mining Limited。", ruleCode: null },
          { tag: "②", title: "1 : 1 等比换股", body: "每 1 股计划股份换取 1 股香港新控股股份，不涉及融资或现金对价，股东持股比例完全平移。", ruleCode: null },
          { tag: "③", title: "监管规则与澳洲专家", body: "适用 LR 6.15(2) 原股份撤销上市及新控股介绍上市；Grant Thornton（Andrea De Cian / Mark Butterfield）任澳洲独立专家。", ruleCode: "HKEX:6.15(2)" },
          { tag: "④", title: "审批与实施周期", body: "2026-04-29 首次公告，08-13 澳洲法院批准并生效，2026-09-02 计划实施及介绍上市（历时 126 天）。", ruleCode: null },
        ],
        topology: buildHoldcoTopology({
          status: txCase.stage?.status || "closed",
          leftTitle: "澳洲 Part 5.1 安排计划换股流向",
          rightTitle: "重组后香港控股架构",
          transitionLabel: "介绍上市",
          shName: "全体计划股东",
          oldHoldco: "Dragon Mining Limited",
          oldJur: "澳大利亚",
          oldSub: "原澳洲上市控股主体",
          newHoldco: "Dragon Gold Mining",
          newJur: "香港",
          newSub: "新设香港控股 · 介绍上市",
          code: "01712.HK",
          swapLabel: "澳洲 Part 5.1 计划 · 1 : 1 换股",
          swapSub: "1 股澳股换 1 股香港新股 · 无现金流出",
          cancelLabel: "LR 6.15(2) 原澳股退市 · 新香港控股介绍上市",
          cancelSub: "08-13 澳洲法院生效 · 09-02 实施（126 天）",
          outcomeBadge: "香港新控股 100% 控澳主体 · 介绍上市",
        }),
      };
    },
  };

  /* =========================================================================
     6. VALIDATOR (`validateDiagramSpec`)
     ========================================================================= */
  function validateStage(stage, stageName) {
    if (!stage || typeof stage !== "object" || Array.isArray(stage)) {
      throw new Error(`Invalid DiagramSpec: ${stageName} must be an object`);
    }
    assertNonEmptyString(stage.title, `${stageName}.title`);
    if (!Array.isArray(stage.nodes) || stage.nodes.length === 0) {
      throw new Error(`Invalid DiagramSpec: ${stageName}.nodes must be a non-empty array`);
    }

    const nodeIds = new Set();
    for (let i = 0; i < stage.nodes.length; i++) {
      const node = stage.nodes[i];
      const prefix = `${stageName}.nodes[${i}]`;
      if (!node || typeof node !== "object" || Array.isArray(node)) {
        throw new Error(`Invalid DiagramSpec: ${prefix} must be an object`);
      }
      assertNonEmptyString(node.id, `${prefix}.id`);
      if (nodeIds.has(node.id)) {
        throw new Error(`Invalid DiagramSpec: duplicate node id "${node.id}" in ${stageName}`);
      }
      nodeIds.add(node.id);
      if (!VALID_NODE_ROLES.has(node.role)) {
        throw new Error(`Invalid DiagramSpec: ${prefix}.role "${node.role}" is unsupported`);
      }
      assertNonEmptyString(node.name, `${prefix}.name`);
      assertOptionalString(node.sublabel, `${prefix}.sublabel`);
      assertOptionalString(node.code, `${prefix}.code`);
      assertOptionalString(node.jurisdiction, `${prefix}.jurisdiction`);
      assertOptionalString(node.badge, `${prefix}.badge`);
      if (node.tier !== undefined) {
        if (!Number.isInteger(node.tier) || node.tier < 0 || node.tier > 3) {
          throw new Error(`Invalid DiagramSpec: ${prefix}.tier must be integer 0..3`);
        }
      }
    }

    if (!Array.isArray(stage.equityLinks)) {
      throw new Error(`Invalid DiagramSpec: ${stageName}.equityLinks must be an array`);
    }
    for (let i = 0; i < stage.equityLinks.length; i++) {
      const link = stage.equityLinks[i];
      const prefix = `${stageName}.equityLinks[${i}]`;
      if (!link || typeof link !== "object" || Array.isArray(link)) {
        throw new Error(`Invalid DiagramSpec: ${prefix} must be an object`);
      }
      assertNonEmptyString(link.from, `${prefix}.from`);
      assertNonEmptyString(link.to, `${prefix}.to`);
      if (!nodeIds.has(link.from)) {
        throw new Error(`Invalid DiagramSpec: orphan equityLink.from "${link.from}" in ${stageName}`);
      }
      if (!nodeIds.has(link.to)) {
        throw new Error(`Invalid DiagramSpec: orphan equityLink.to "${link.to}" in ${stageName}`);
      }
      if (link.from === link.to) {
        throw new Error(`Invalid DiagramSpec: self-referential equityLink "${link.from}" in ${stageName}`);
      }
      assertOptionalString(link.label, `${prefix}.label`);
      if (link.style !== undefined && !VALID_LINK_STYLES.has(link.style)) {
        throw new Error(`Invalid DiagramSpec: ${prefix}.style "${link.style}" is unsupported`);
      }
      if (link.pct !== undefined && link.pct !== null) {
        if (typeof link.pct !== "number" || !Number.isFinite(link.pct) || link.pct < 0 || link.pct > 100) {
          throw new Error(`Invalid DiagramSpec: ${prefix}.pct must be a finite number between 0 and 100`);
        }
      }
    }

    if (stageName === "after") {
      assertNonEmptyString(stage.outcomeBadge, "after.outcomeBadge");
    }
  }

  function validateDiagramSpec(spec) {
    if (!spec || typeof spec !== "object" || Array.isArray(spec)) {
      throw new Error("Invalid DiagramSpec: spec must be a plain object");
    }
    if (!Object.prototype.hasOwnProperty.call(ARCHETYPES, spec.archetype)) {
      throw new Error(`Invalid DiagramSpec: unsupported archetype "${spec.archetype}"`);
    }
    if (!VALID_MODALITIES.has(spec.modality)) {
      throw new Error(`Invalid DiagramSpec: unsupported modality "${spec.modality}"`);
    }
    if (!VALID_STATUSES.has(spec.status)) {
      throw new Error(`Invalid DiagramSpec: unsupported status "${spec.status}"`);
    }

    assertOptionalString(spec.id, "id");
    assertOptionalString(spec.caseId, "caseId");
    assertOptionalString(spec.code, "code");
    assertOptionalString(spec.name, "name");
    assertOptionalString(spec.mechanism, "mechanism");
    assertOptionalString(spec.stageLabel, "stageLabel");
    assertOptionalString(spec.stageDate, "stageDate");
    assertOptionalString(spec.compactSummary, "compactSummary");

    validateStage(spec.before, "before");

    if (!Array.isArray(spec.flows) || spec.flows.length === 0) {
      throw new Error("Invalid DiagramSpec: flows must be a non-empty array");
    }
    for (let i = 0; i < spec.flows.length; i++) {
      const flow = spec.flows[i];
      const prefix = `flows[${i}]`;
      if (!flow || typeof flow !== "object" || Array.isArray(flow)) {
        throw new Error(`Invalid DiagramSpec: ${prefix} must be an object`);
      }
      if (!VALID_FLOW_KINDS.has(flow.kind)) {
        throw new Error(`Invalid DiagramSpec: ${prefix}.kind "${flow.kind}" is unsupported`);
      }
      if (!VALID_FLOW_DIRECTIONS.has(flow.direction)) {
        throw new Error(`Invalid DiagramSpec: ${prefix}.direction "${flow.direction}" is unsupported`);
      }
      assertNonEmptyString(flow.fromLabel, `${prefix}.fromLabel`);
      assertNonEmptyString(flow.toLabel, `${prefix}.toLabel`);
      assertNonEmptyString(flow.headline, `${prefix}.headline`);
      assertOptionalString(flow.subline, `${prefix}.subline`);
      assertOptionalString(flow.step, `${prefix}.step`);
      if (flow.proposedOrTerminated !== undefined && typeof flow.proposedOrTerminated !== "boolean") {
        throw new Error(`Invalid DiagramSpec: ${prefix}.proposedOrTerminated must be a boolean`);
      }
    }

    validateStage(spec.after, "after");

    if (!Array.isArray(spec.annotations) || spec.annotations.length === 0) {
      throw new Error("Invalid DiagramSpec: annotations must be a non-empty array");
    }
    for (let i = 0; i < spec.annotations.length; i++) {
      const note = spec.annotations[i];
      const prefix = `annotations[${i}]`;
      if (!note || typeof note !== "object" || Array.isArray(note)) {
        throw new Error(`Invalid DiagramSpec: ${prefix} must be an object`);
      }
      assertNonEmptyString(note.tag, `${prefix}.tag`);
      assertNonEmptyString(note.title, `${prefix}.title`);
      assertNonEmptyString(note.body, `${prefix}.body`);
      assertOptionalString(note.ruleCode, `${prefix}.ruleCode`);
    }

    if (spec.topology) {
      const lint = lintDiagramGeometry(spec.topology);
      if (!lint.ok) {
        throw new Error(`Invalid DiagramSpec geometry: ${lint.errors.join("; ")}`);
      }
    }

    return spec;
  }

  /* =========================================================================
     7. AUTOMATIC SYNTHESIZER (`deriveDiagramFromCase`) + SPEC TOPOLOGY FALLBACK
     ========================================================================= */
  function detectArchetype(txCase) {
    if (!txCase || typeof txCase !== "object") return "acquisition";
    if (txCase.category && Object.prototype.hasOwnProperty.call(ARCHETYPES, txCase.category)) {
      return txCase.category;
    }
    if (txCase.category === "disclosable" || txCase.category === "major" || txCase.category === "share_transaction") {
      return "disclosable_major";
    }
    if (txCase.category === "connected" || txCase.category === "continuing_connected" || txCase.category === "whitewash") {
      return "connected_whitewash";
    }
    if (txCase.category === "placing") return "topup_placing";
    if (txCase.category === "rights_issue" || txCase.category === "open_offer") return "rights_open_offer";
    const rules = (txCase.rules || []).map((r) => String(r.code || "").toUpperCase());
    const text = `${txCase.mechanism || ""} ${txCase.name || ""} ${rules.join(" ")}`.toLowerCase();
    if (/先旧后新|闪电配售|配售新股|top.?up|placing/.test(text)) return "topup_placing";
    if (/可转债|可转换债券|可交换债|convertible.?bond|exchangeable.?bond/.test(text)) return "convertible_bond";
    if (/供股|公开招股|rights.?issue|open.?offer/.test(text)) return "rights_open_offer";
    if (/清洗豁免|whitewash|持续关连|continuing.?connected/.test(text)) return "connected_whitewash";
    if (/pn15|分拆|spin.?off/.test(text)) return "spin_off";
    if (/债转股|债务重组|debt.?restruct|creditor.?scheme/.test(text)) return "debt_restructuring";
    if (/吸收合并|换股合并|absorption.?merger/.test(text)) return "ah_share_absorption";
    if (/14\.06b|反向收购|借壳|reverse.?takeover/.test(text)) return "reverse_takeover";
    if (/更换控股|迁册|介绍上市|holding.?substit/.test(text)) return "holding_substitution";
    if (/26\.1|强制.*要约|全面要约|mandatory.*offer/.test(text)) return "offer";
    if (/2\.10|私有化|协议安排|privatisation|scheme/.test(text)) return "scheme";
    if (/处置|出售|剥离|disposal/.test(text)) return "disposal";
    if (/14\.06\(2\)|14\.06\(3\)|须予披露|discloseable|主要交易|major.?transaction/.test(text) && !/14\.06c|非常重大|vsa/.test(text)) {
      return "disclosable_major";
    }
    if (/14a|关连交易|connected.?transaction/.test(text) && !/14\.06c|非常重大|vsa/.test(text)) {
      return "connected_whitewash";
    }
    return "acquisition";
  }

  // A scheme beneficiary can receive cash even when the issuer restores capital
  // with a separate issue to the bidder. Only classify supported, sourced term sets.
  function exactCashSchemeTerms(terms, archetype) {
    if (archetype !== "scheme") return null;
    const model = {
      scheme_cash: "money", scheme_cash_max: "money", scheme_cash_cap: "money",
      scheme_cash_base: "money", scheme_cash_increment: "money", bond_cash_increment: "money",
      base_scheme_shares: "shares", scheme_total: "money", scheme_price: "per_share", scheme_shares: "shares",
      scheme_ref_shares: "shares", option_price: "per_share", against_shares: "shares",
      vote_for_pct: "percent", against_all_pct: "percent",
    };
    if (!terms.every((t) => Object.hasOwn(model,t.key) && model[t.key] === t.unit)) return null;
    const findKey = (keys) => terms.find((t) => keys.includes(t.key));
    const anchorCash = terms.filter((t) => ["scheme_cash","scheme_cash_max","scheme_cash_cap","scheme_total"].includes(t.key));
    const cash = anchorCash[0];
    const price = findKey(["scheme_price"]);
    const quantity = findKey(["scheme_shares","scheme_ref_shares","base_scheme_shares"]);
    const scenarios = ["base_scheme_shares","scheme_cash_base","scheme_cash_increment","bond_cash_increment"];
    const compound = terms.some((t) => scenarios.includes(t.key));
    if (compound && (!scenarios.every((k) => terms.some((t) => t.key === k && t.evidence?.documentId))
      || cash?.key !== "scheme_cash_max" || quantity?.key !== "base_scheme_shares")) return null;
    const anchored = (t) => t && Number.isFinite(t.value) && t.value > 0 && t.evidence?.documentId;
    return anchorCash.length === 1 && anchored(cash) && anchored(price) && anchored(quantity) && cash.currency
      && cash.currency === price.currency && /现金/.test(cash.label || "")
      && /注销/.test(price.label || "") ? { cash, price, quantity, compound } : null;
  }

  function detectModality(txCase, archetype) {
    const terms = Array.isArray(txCase.terms) ? txCase.terms : [];
    if (exactCashSchemeTerms(terms, archetype)) return "cash";
    const hasMoney = terms.some((t) => t.unit === "money" || t.unit === "per_share");
    const hasShares = terms.some((t) => t.unit === "shares" || t.unit === "ratio");
    if (archetype === "holding_substitution" || archetype === "ah_share_absorption") {
      return hasMoney && hasShares ? "mixed" : "share_swap";
    }
    if (archetype === "disposal") return hasMoney ? "cash_and_asset" : "mixed";
    if (archetype === "debt_restructuring") return "mixed";
    if (hasMoney && hasShares) {
      const onlyIssuePrice =
        terms
          .filter((t) => t.unit === "money" || t.unit === "per_share")
          .every((t) => ["issue_price", "proposed_purchase", "translated_purchase"].includes(t.key)) &&
        terms.some((t) => t.key === "consideration_shares");
      return onlyIssuePrice ? "shares" : "mixed";
    }
    if (hasShares) return "shares";
    return "cash";
  }

  function pickParty(parties, candidates, fallback) {
    if (!parties || typeof parties !== "object") return fallback;
    for (const key of candidates) {
      if (parties[key] && String(parties[key]).trim()) return String(parties[key]).trim();
    }
    for (const [k, v] of Object.entries(parties)) {
      if (v && candidates.some((c) => k.toLowerCase().includes(c.toLowerCase()))) {
        return String(v).trim();
      }
    }
    return fallback;
  }

  function synthesizeTopologyFromSpec(spec) {
    const findByRole = (stage, role, fallback) => {
      const n = (stage.nodes || []).find((x) => x.role === role);
      return n ? n.name : fallback;
    };
    const listedNode = (spec.before.nodes || []).find((x) => x.role === "listed") || spec.before.nodes[0];
    const code = spec.code ? `${String(spec.code).replace(/\.HK$/i, "")}.HK` : listedNode?.code;
    const f0 = spec.flows[0];
    const f1 = spec.flows[1] || spec.flows[0];

    if (spec.archetype === "scheme") {
      return buildSchemeTopology({
        status: spec.status,
        buyerName: findByRole(spec.before, "buyer", "要约人"),
        publicName: findByRole(spec.before, "public", "计划股东"),
        listedName: spec.name || listedNode.name,
        code,
        cashLabel: f0.headline,
        cashSub: f0.subline || "协议安排现金注销对价",
        cancelLabel: f1.headline,
        cancelSub: f1.subline || "注销计划股份 · 撤销上市",
        outcomeBadge: spec.after.outcomeBadge,
      });
    }
    if (spec.archetype === "offer") {
      return buildOfferTopology({
        status: spec.status,
        buyerName: findByRole(spec.before, "buyer", "收购方"),
        sellerName: findByRole(spec.before, "seller", "原控股股东"),
        publicName: findByRole(spec.before, "public", "其余独立股东"),
        listedName: spec.name || listedNode.name,
        code,
        beforeSellerPct: "拟转让控股权",
        beforePublicPct: "余下公众股",
        step1CashLabel: f0.headline,
        step1CashSub: f0.subline || "控股权买卖交割",
        step1SharesLabel: "控股权",
        step2MgoLabel: f1.headline,
        step2MgoSub: f1.subline || "TC 26.1 强制全面现金要约",
        outcomeBadge: spec.after.outcomeBadge,
      });
    }
    if (spec.archetype === "disposal") {
      return buildDisposalTopology({
        status: spec.status,
        listedName: spec.name || listedNode.name,
        code,
        sellerName: findByRole(spec.before, "seller", "出售附属"),
        buyerName: findByRole(spec.before, "buyer", "资产承购方"),
        assetName: findByRole(spec.before, "target", "拟处置标的"),
        cashLabel: f0.headline,
        cashSub: f0.subline || "资产处置现金对价",
        assetLabel: f1.headline,
        assetSubArrow: f1.subline || "标的交付与合约终止",
        outcomeBadge: spec.after.outcomeBadge,
      });
    }
    if (spec.archetype === "reverse_takeover") {
      return buildRtoTopology({
        status: spec.status,
        origShName: findByRole(spec.before, "public", "原上市股东"),
        targetShName: findByRole(spec.before, "seller", "标的集团股东"),
        beforeListedName: spec.name || listedNode.name,
        targetName: findByRole(spec.before, "target", "目标业务集团"),
        afterCtrlName: findByRole(spec.after, "buyer", "原标的股东"),
        afterListedName: findByRole(spec.after, "listed", spec.name || listedNode.name),
        code,
        sharesLabel: f0.headline,
        sharesSub: f0.subline || "增发代价股份实现反向收购",
        assetLabel: f1.headline,
        assetSub: f1.subline || "LR 14.06B 按新上市审批",
        outcomeBadge: spec.after.outcomeBadge,
      });
    }
    if (spec.archetype === "holding_substitution") {
      return buildHoldcoTopology({
        status: spec.status,
        shName: findByRole(spec.before, "public", "原全体计划股东"),
        oldHoldco: listedNode.name,
        newHoldco: findByRole(spec.after, "holdco", `${spec.name || listedNode.name}（新控股）`),
        code,
        swapLabel: f0.headline,
        swapSub: f0.subline || "等比换股 · 无现金流出",
        cancelLabel: f1.headline,
        cancelSub: f1.subline || "原股退市 · 新控股介绍上市",
        outcomeBadge: spec.after.outcomeBadge,
      });
    }
    if (spec.archetype === "spin_off") {
      return buildSpinOffTopology({
        status: spec.status,
        shName: findByRole(spec.before, "public", "母公司全体股东"),
        parentName: spec.name || listedNode.name,
        code,
        spinCoName: findByRole(spec.before, "target", "分拆子公司 (SpinCo)"),
        sharesLabel: f0.headline,
        sharesSub: f0.subline || "PN15 独立上市",
        assetLabel: f1.headline,
        assetSub: f1.subline || "优先认购 / 实物分派",
        outcomeBadge: spec.after.outcomeBadge,
      });
    }
    if (spec.archetype === "debt_restructuring") {
      return buildDebtTopology({
        status: spec.status,
        origShName: findByRole(spec.before, "seller", "原控股及公众股东"),
        creditorName: findByRole(spec.before, "creditor", "境外计划债权人"),
        listedName: spec.name || listedNode.name,
        code,
        cancelLabel: f0.headline,
        cancelSub: f0.subline || "豁免既有境外债务",
        sharesLabel: f1.headline,
        sharesSub: f1.subline || "债转股 / MCB / 展期新票据",
        outcomeBadge: spec.after.outcomeBadge,
      });
    }
    if (spec.archetype === "ah_share_absorption") {
      return buildAhAbsorptionTopology({
        status: spec.status,
        groupName: findByRole(spec.before, "holdco", "共同控股集团"),
        absorberName: findByRole(spec.before, "buyer", "吸收合并方 (A+H)"),
        absorbedName: spec.name || listedNode.name,
        code,
        swapLabel: f0.headline,
        swapSub: f0.subline || "换股发行新股 · 异议现金选择权",
        cancelLabel: f1.headline,
        cancelSub: f1.subline || "承继资产负债 · H股退市",
        outcomeBadge: spec.after.outcomeBadge,
      });
    }
    if (spec.archetype === "topup_placing") {
      return buildTopupPlacingTopology({
        status: spec.status,
        vendorName: findByRole(spec.before, "seller", "控股股东（卖旧认新）"),
        placeesName: findByRole(spec.before, "buyer", "不少于6名独立承配人"),
        listedName: spec.name || listedNode.name,
        code,
        oldLabel: f0.headline,
        oldSub: f0.subline || "折让配售老股 · T+2 交割",
        cashLabel: f1.headline,
        cashSub: f1.subline || "14日内按净额认购新股",
        outcomeBadge: spec.after.outcomeBadge,
      });
    }
    if (spec.archetype === "convertible_bond") {
      return buildCbTopology({
        status: spec.status,
        shName: findByRole(spec.before, "public", "现有控股及公众股东"),
        invName: findByRole(spec.before, "creditor", "境外机构债券认购人"),
        listedName: spec.name || listedNode.name,
        code,
        cashLabel: f0.headline,
        cashSub: f0.subline || "认购可转债本金 · 募集净额",
        convLabel: f1.headline,
        convSub: f1.subline || "按初始转股价附条件换股",
        outcomeBadge: spec.after.outcomeBadge,
      });
    }
    if (spec.archetype === "rights_open_offer") {
      return buildRightsIssueTopology({
        status: spec.status,
        qshName: findByRole(spec.before, "public", "合资格现有股东"),
        uwName: findByRole(spec.before, "buyer", "包销商 / 独立承配人"),
        listedName: spec.name || listedNode.name,
        code,
        subLabel: f0.headline,
        subSub: f0.subline || "按供股价认购 · 余额包销",
        uwLabel: f1.headline,
        uwSub: f1.subline || "配发供股新股",
        outcomeBadge: spec.after.outcomeBadge,
      });
    }
    if (spec.archetype === "connected_whitewash") {
      return buildConnectedWhitewashTopology({
        status: spec.status,
        connName: findByRole(spec.before, "seller", "控股股东 / 关连人士"),
        ishName: findByRole(spec.before, "public", "无利害独立股东 + IFA"),
        listedName: spec.name || listedNode.name,
        code,
        ifaLabel: f0.headline,
        ifaSub: f0.subline || "IFA 独立意见 + 独立股东批准",
        txLabel: f1.headline,
        txSub: f1.subline || "关连交割 / 清洗豁免生效",
        outcomeBadge: spec.after.outcomeBadge,
      });
    }
    if (
      (spec.archetype === "acquisition" || spec.archetype === "disclosable_major") &&
      Array.isArray(spec.before?.equityLinks) &&
      spec.before.equityLinks.length === 0 &&
      Array.isArray(spec.after?.equityLinks) &&
      spec.after.equityLinks.length === 0
    ) {
      return buildCommercialProcurementTopology({
        status: spec.status,
        buyerName: spec.name || listedNode.name,
        code,
        vendorName: findByRole(spec.before, "seller", "独立设备供应商"),
        assetName: findByRole(spec.before, "target", "采购标的设备 / 资产"),
        payLabel: f0.headline,
        paySub: f0.subline || "按采购合同结算价款",
        deliveryLabel: f1.headline,
        deliverySub: f1.subline || "商业设备交付验收 · 非附属公司收购",
        outcomeBadge: spec.after.outcomeBadge,
      });
    }
    return buildAcquisitionTopology({
      status: spec.status,
      listedName: spec.name || listedNode.name,
      code,
      sellerName: findByRole(spec.before, "seller", "资产出售方"),
      targetName: findByRole(spec.before, "target", "拟收购标的"),
      payKind: f0.kind === "cash" ? "cash" : "shares",
      payLabel: f0.headline,
      paySub: f0.subline || "收购对价支付",
      assetLabel: f1.headline,
      assetSub: f1.subline || "标的注入并表",
      outcomeBadge: spec.after.outcomeBadge,
    });
  }

  function isCommercialProcurementCase(txCase) {
    if (!txCase || typeof txCase !== "object") return false;
    const cat = String(txCase.category || "").toLowerCase();
    if (["equipment_purchase", "equipment_procurement", "asset_purchase", "procurement", "capex_purchase"].includes(cat)) {
      return true;
    }
    const terms = Array.isArray(txCase.terms) ? txCase.terms : [];
    if (terms.some((t) => t.unit === "shares" || t.unit === "ratio" || t.key === "enlarged_stake")) {
      return false;
    }
    const partiesBlob = Object.entries(txCase.parties || {}).map(([k, v]) => `${k} ${v}`).join(" ");
    const termsBlob = terms.map((t) => `${t.key || ""} ${t.label || ""} ${t.basis || ""}`).join(" ");
    const blob = `${txCase.mechanism || ""} ${txCase.name || ""} ${partiesBlob} ${termsBlob}`;
    const hasEquip = /设备采购|采购设备|机器采购|采购机器|生产线采购|采购合同|设备供应|船舶建造|飞机购买|槟城.*设备|equipment\s*(?:purchase|procurement|supply)|machinery\s*purchase/i.test(blob);
    const hasEquityTarget = /目标公司.*股权|收购.*%.*股权|待售股份|目标集团股权/i.test(blob);
    return hasEquip && !hasEquityTarget;
  }

  function deriveCommercialProcurementCase(txCase) {
    const rawStatus = txCase.stage?.status;
    const status = VALID_STATUSES.has(rawStatus) ? rawStatus : "active";
    const isTerminated = status === "terminated";
    const name = String(txCase.name || "港股买方主体").trim();
    const code = txCase.code ? `${String(txCase.code).replace(/\.HK$/i, "")}.HK` : undefined;
    const parties = txCase.parties || {};
    const terms = Array.isArray(txCase.terms) ? txCase.terms : [];
    const rules = Array.isArray(txCase.rules) ? txCase.rules : [];

    const buyerParty = pickParty(parties, ["买方", "采购方", "订购方", "付款方", "buyer", "purchaser"], name);
    const vendorName = pickParty(parties, ["卖方", "供应商", "承包商", "收款方", "设备供应商", "vendor", "supplier", "seller"], "独立设备供应商");
    const assetName = pickParty(parties, ["采购标的", "设备", "标的设备", "采购资产", "标的", "equipment", "asset", "target"], "生产设备 / 商业资产");

    const headlineTerm = terms.find((t) => t.key === txCase.headlineKey) || terms[0] || null;
    const pendingCap = txCase.id === "HK-00950-20261119-nova-assembly-line-order" && status === "active" && headlineTerm?.key === "equipment_purchase_cap";
    const buyerCode = pendingCap ? undefined : code;
    const deliveryHeadline = pendingCap ? `拟交付 ${assetName}` : `交付 ${assetName}`;
    const deliveryRuleBrief = formatArrowRuleSubline(rules, ["HKEX:14.06"], "适用 ");
    const deliveryContext = pendingCap ? "卖方接纳订单后约 50 周" : `商业资产入账 · ${deliveryRuleBrief}`;
    const secondaryTerms = terms.filter((t) => t !== headlineTerm);
    const primaryExact = headlineTerm
      ? `${headlineTerm.label} ${headlineTerm.approximate ? formatTermBrief(headlineTerm) : formatTermExact(headlineTerm)}`
      : (txCase.mechanism || "商业设备采购");
    const secondaryExact = secondaryTerms
      .slice(0, 2)
      .map((t) => `${t.label} ${t.approximate ? formatTermBrief(t) : formatTermExact(t)}`)
      .filter(Boolean)
      .join(" · ");

    const ruleCodes = rules.map((r) => r.code).filter(Boolean);
    const ruleSummary = ruleCodes.length ? ruleCodes.join(" · ") : "HKEX:14.06";
    const stageLabel = txCase.stage?.label || STATUS_META[status].labelZh;
    const stageDate = txCase.stage?.date || txCase.progressDate || "";
    const archetype = detectArchetype(txCase) === "disclosable_major" ? "disclosable_major" : "acquisition";

    const spec = {
      id: txCase.id || `SYN-${txCase.code || "00000"}-procurement`,
      caseId: txCase.id || `SYN-${txCase.code || "00000"}-procurement`,
      code: txCase.code || undefined,
      name,
      mechanism: txCase.mechanism || "商业设备采购",
      stageLabel,
      stageDate: stageDate || undefined,
      archetype,
      modality: "cash_and_asset",
      status,
      compactSummary: `${name} · ${primaryExact}${secondaryExact ? `（${secondaryExact}）` : ""} → 商业设备采购履约`,
      before: {
        title: "采购合同主体",
        nodes: [
          { id: "buyer_entity", role: "listed", name: buyerParty, code:buyerCode, sublabel: "采购买方主体", tier: 0 },
          { id: "vendor_entity", role: "seller", name: vendorName, sublabel: "设备供应商 / 合同卖方", tier: 0 },
          { id: "equip_asset", role: "target", name: assetName, sublabel: "商业采购设备标的", tier: 1 },
        ],
        equityLinks: [],
      },
      flows: [
        {
          id: "proc_pay",
          kind: "cash",
          direction: "ltr",
          step: "01",
          fromLabel: buyerParty,
          toLabel: vendorName,
          headline: primaryExact,
          subline: secondaryExact || "按采购协议里程碑结算货款",
          proposedOrTerminated: isTerminated || pendingCap,
        },
        {
          id: "proc_deliver",
          kind: "asset",
          direction: "rtl",
          step: "02",
          fromLabel: vendorName,
          toLabel: buyerParty,
          headline: deliveryHeadline,
          subline: `纯商业资产采购 · ${deliveryRuleBrief}`,
          proposedOrTerminated: isTerminated || pendingCap,
        },
      ],
      after: {
        title: "合同履约与资产入账状态",
        nodes: [
          { id: "buyer_after", role: "listed", name: buyerParty, code:buyerCode, sublabel: isTerminated ? "采购合同已终止" : "结算合同款项 · 维持原有架构", tier: 0 },
          { id: "equip_after", role: "target", name: assetName, sublabel: isTerminated ? "未交付" : "固定资产交付验收（非附属公司）", badge: isTerminated ? "已终止" : pendingCap ? "待交付" : "商业资产", tier: 1 },
        ],
        equityLinks: [],
        outcomeBadge: isTerminated ? "采购协议已终止" : `设备采购商业履约 · ${stageLabel}`,
      },
      annotations: [
        {
          tag: "①",
          title: "采购方、供应商与设备标的",
          body: Object.entries(parties).map(([k, v]) => `${k}：${v}`).join("；") || `${buyerParty} 向 ${vendorName} 采购 ${assetName}（纯商业设备采购）。`,
          ruleCode: null,
        },
        {
          tag: "②",
          title: pendingCap ? "采购上限及付款条款" : "合同价款与预付款抵扣",
          body: terms.map((t) => `${t.label} ${t.approximate ? formatTermBrief(t) : formatTermExact(t)}${t.basis ? `（${t.basis}）` : ""}`).join("；") || `${primaryExact}。`,
          ruleCode: null,
        },
        {
          tag: "③",
          title: "上市规则分类",
          body: rules.length ? rules.map((r) => `${r.label || r.code}（${r.application || "适用规则"}）`).join("；") : "按上市规则第 14 章百分比率披露商业资本开支采购。",
          ruleCode: ruleSummary,
        },
        {
          tag: "④",
          title: "履约阶段状态",
          body: `${stageLabel}${stageDate ? `（${stageDate}）` : ""}${pendingCap?"":" · 属商业设备及固定资产采购合同，仅作资产购置入账。"}`,
          ruleCode: null,
        },
      ],
    };

    spec.topology = buildCommercialProcurementTopology({
      status,
      buyerName: buyerParty,
      code:buyerCode,
      buyerSub:pendingCap ? "间接全资附属公司 · 采购方" : undefined,
      rightTitle:pendingCap ? "采购订单履约安排" : undefined,
      assetSub:pendingCap ? "预计交付后验收" : undefined,
      vendorName,
      assetName,
      payLabel: primaryExact,
      paySub: secondaryExact || "按采购协议结算价款",
      deliveryLabel: deliveryHeadline,
      deliverySub: deliveryContext,
      outcomeBadge: spec.after.outcomeBadge,
    });

    return validateDiagramSpec(spec);
  }

  // The percentage terms in a CB record are rates, discount/premium or
  // conditional dilution, never current ownership by position in the array.
  const CB_ISSUE_CONTEXT = {
    "HK-00264-20261027-cb-placing": ["一般授权 · 尽力配售", "债券不申请上市", "不少于六名独立承配人", "年票息 10%", "中联发展控股"],
    "HK-00821-20260710-specific-mandate-cb": ["特别授权 · 尽力配售", "债券不申请上市", "不少于六名独立承配人", "三年期 · 零息", "滙盈控股"],
    "HK-00992-20260617-lenovo-2033-cb": ["联席全球协调人及簿记管理人", "交割公告：预计于 Vienna MTF 挂牌", "不少于六名独立专业投资者", "2033年到期 · 零息", "联想集团"],
  };

  function applyConvertibleIssueTerms(spec, txCase, terms, moneyTerm, stageLabel) {
    const ref = Object.hasOwn(CB_ISSUE_CONTEXT, txCase.id) ? CB_ISSUE_CONTEXT[txCase.id] : null;
    const [channel, listing, group, holder, shortIssuer] = ref || ["", "", "可转债认购人", "", spec.name];
    const term = (key, unit) => terms.find(t => t.key === key && t.unit === unit && Number.isFinite(t.value));
    const price = term("conversion_price", "per_share");
    const shares = term("conversion_shares", "shares");
    const discount = term("conversion_discount_pct", "percent");
    const premium = term("conversion_premium_pct", "percent");
    const money = moneyTerm ? "债券本金 " + formatTermBrief(moneyTerm) : "认购可转债";
    const conv = price ? "初始换股价 " + formatTermBrief(price) : "按条款行使转股权";
    const compare = discount ? `换股价折让 ${discount.value}%` : premium ? `换股价溢价 ${premium.value}%` : "";
    const potential = shares ? "悉数转股新增 " + formatTermBrief(shares) : "";
    const outcome = stageLabel || "可转债发行";
    const code = txCase.code ? String(txCase.code).replace(/\.HK$/i, "")+".HK" : "";
    spec.caseModalityLabel = "债券认购及换股权";
    spec.caseModalityShortLabel = "债券融资";
    for (const phase of [spec.before, spec.after]) {
      for (const node of phase.nodes) {
        if (node.role === "creditor") Object.assign(node,{name:group,sublabel:holder});
        if (node.role === "listed") Object.assign(node,{name:shortIssuer,sublabel:"可转债发行人"});
      }
    }
    Object.assign(spec.flows[0],{fromLabel:group,toLabel:shortIssuer,headline:money,subline:channel});
    Object.assign(spec.flows[1],{fromLabel:shortIssuer,toLabel:"可转债持有人",headline:conv,subline:[compare,potential].filter(Boolean).join(" · ")});
    spec.after.outcomeBadge=outcome;
    spec.compactSummary=[shortIssuer,money,conv,compare,potential,outcome].filter(Boolean).join(" · ");
    spec.topology = buildCbTopology({
      status:spec.status,leftTitle:"可转债认购及换股条款",
      listedName:shortIssuer,code,invName:group,investorSub:"债券认购人",issuerSub:"可转债发行人",
      holderSub:holder,listingSub:listing,cashLabel:money,cashSub:channel||"债券认购款",
      convLabel:conv,convSub:[compare,potential].filter(Boolean).join(" · ")||"按条款办理换股",
      outcomeBadge:outcome
    });
    return spec;
  }

  const CASE_SPECIFIC_TOPOLOGY_REQUIRED = new Set(["offer", "acquisition", "disclosable_major", "reverse_takeover", "debt_restructuring"]);

  function deriveDiagramFromCase(txCase) {
    if (!txCase || typeof txCase !== "object") {
      throw new Error("deriveDiagramFromCase requires a transaction case object");
    }
    if (isCommercialProcurementCase(txCase)) {
      return deriveCommercialProcurementCase(txCase);
    }
    const archetype = detectArchetype(txCase);
    // Atlas offer / acquisition / restructuring examples contain sample percentages, roles and approval mechanics.
    // Show the case's disclosure fields until there is a case-specific topology.
    if (CASE_SPECIFIC_TOPOLOGY_REQUIRED.has(archetype)) return null;
    const archInfo = ARCHETYPES[archetype];
    const modality = detectModality(txCase, archetype);
    const rawStatus = txCase.stage?.status;
    const status = VALID_STATUSES.has(rawStatus) ? rawStatus : "active";
    const isTerminated = status === "terminated";

    const name = String(txCase.name || "港股上市主体").trim();
    const code = txCase.code ? `${String(txCase.code).replace(/\.HK$/i, "")}.HK` : undefined;
    const parties = txCase.parties || {};
    const terms = Array.isArray(txCase.terms) ? txCase.terms : [];
    const rules = Array.isArray(txCase.rules) ? txCase.rules : [];

    const headlineTerm = terms.find((t) => t.key === txCase.headlineKey) || terms[0] || null;
    const perShareTerm = terms.find((t) => t.unit === "per_share");
    const sharesTerm = terms.find((t) => t.unit === "shares");
    const ratioTerm = terms.find((t) => t.unit === "ratio");
    const pctTerm = terms.find((t) => t.unit === "percent");
    const moneyTerm =
      terms.find((t) => t.key === txCase.headlineKey && t.unit === "money") ||
      terms.find((t) => t.unit === "money");

    const buyerName = pickParty(
      parties,
      ["收购方", "要约人", "买方", "付款方", "吸收合并方", "新控股公司", "认购方", "buyer", "offeror"],
      archetype === "acquisition" || archetype === "reverse_takeover" ? name : "收购方 / 要约人"
    );
    const sellerName = pickParty(
      parties,
      ["出售方", "卖方", "收款方", "原控股公司", "原大股东", "债权人", "seller", "vendor"],
      "卖方 / 原股东"
    );
    const targetName = pickParty(
      parties,
      ["标的", "标的公司", "被吸收方", "分拆主体", "新控股公司", "target"],
      `${name} 相关标的`
    );

    const cashScheme = exactCashSchemeTerms(terms, archetype);
    const amountHeadlineParts = [];
    if (cashScheme) {
      amountHeadlineParts.push(formatTermBrief(cashScheme.price));
      const limit = ["scheme_cash_max","scheme_cash_cap"].includes(cashScheme.cash.key) ? "现金上限 " : "";
      amountHeadlineParts.push(limit + formatTermBrief(cashScheme.cash));
    } else {
      if (perShareTerm) amountHeadlineParts.push(formatTermBrief(perShareTerm));
      if (moneyTerm) amountHeadlineParts.push(formatTermBrief(moneyTerm));
    }
    if (ratioTerm) amountHeadlineParts.push(`换股 ${formatTermBrief(ratioTerm)}`);
    if (sharesTerm && !cashScheme) amountHeadlineParts.push(`发行 ${formatTermBrief(sharesTerm)}`);
    const primaryAmountText =
      amountHeadlineParts.filter(Boolean).join(" · ") ||
      (headlineTerm ? `${headlineTerm.label} ${formatTermBrief(headlineTerm)}` : txCase.mechanism || archInfo.labelZh);

    const ruleCodes = rules.map((r) => r.code).filter(Boolean);
    const ruleSummary = ruleCodes.length ? ruleCodes.join(" · ") : archInfo.ruleTriggers.join(" · ");
    const stageLabel = txCase.stage?.label || STATUS_META[status].labelZh;
    const stageDate = txCase.stage?.date || txCase.progressDate || "";

    const baseTemplate = cloneDeep(archInfo.codexTemplate);
    delete baseTemplate.topology;

    const spec = {
      ...baseTemplate,
      id: txCase.id || `SYN-${txCase.code || "00000"}-${archetype}`,
      caseId: txCase.id || `SYN-${txCase.code || "00000"}-${archetype}`,
      code: txCase.code || undefined,
      name,
      mechanism: txCase.mechanism || archInfo.labelZh,
      stageLabel,
      stageDate: stageDate || undefined,
      archetype,
      modality,
      status,
    };

    // Map dynamic entity names & verified terms onto the archetype template
    for (const stageKey of ["before", "after"]) {
      spec[stageKey].nodes = spec[stageKey].nodes.map((n) => {
        const copy = { ...n };
        if (copy.role === "listed") {
          copy.name = name;
          if (code) copy.code = code;
        } else if (copy.role === "buyer" && buyerName) {
          copy.name = buyerName;
        } else if (copy.role === "seller" && sellerName) {
          copy.name = sellerName;
        } else if (copy.role === "target" && targetName) {
          copy.name = targetName;
        } else if (copy.role === "holdco" && archetype === "holding_substitution") {
          copy.name = pickParty(parties, ["新控股公司"], `${name}（新控股）`);
          if (code) copy.code = code;
        } else if (copy.role === "creditor") {
          copy.name = pickParty(parties, ["债权人", "计划债权人"], "境外计划债权人");
        }
        return copy;
      });
    }

    spec.flows[0].headline = primaryAmountText;
    if (cashScheme) {
      spec.flows[0].subline = cashScheme.compound
        ? "每股现金注销价（可扣股息） · 上限含期权与换债情景"
        : "每股注销价 · 计划股份现金对价";
      const action = cashScheme.compound ? "基准计划股"
        : cashScheme.quantity.key === "scheme_ref_shares" ? "参考计划股" : "计划注销";
      spec.flows[1].headline = `${action} ${formatTermBrief(cashScheme.quantity)}`;
    }
    spec.flows[0].proposedOrTerminated = isTerminated;
    if (spec.flows[1]) {
      spec.flows[1].subline = formatArrowRuleSubline(rules, archInfo.ruleTriggers, "适用规则：");
      spec.flows[1].proposedOrTerminated = isTerminated;
    }

    spec.after.outcomeBadge = isTerminated
      ? `协议已终止 · 维持原上市架构`
      : pctTerm && Number.isFinite(pctTerm.value)
        ? `核心持股 ${pctTerm.value}% · ${stageLabel}`
        : `${archInfo.shortZh} · ${stageLabel}`;

    const partyLines = Object.entries(parties)
      .map(([k, v]) => `${k}：${v}`)
      .join("；");
    const termLines = terms
      .slice(0, 3)
      .map((t) => `${t.label} ${formatTermBrief(t)}`)
      .filter(Boolean)
      .join("；");

    spec.annotations = [
      { tag: "①", title: "买方 / 卖方与标的", body: partyLines || `${name} 涉及 ${archInfo.labelZh}。`, ruleCode: null },
      { tag: "②", title: "对价与条款锚点", body: termLines || `${primaryAmountText}。`, ruleCode: null },
      {
        tag: "③",
        title: "监管规则触发",
        body: rules.length
          ? rules.map((r) => `${r.label || r.code}（${r.application || "适用规则"}）`).join("；")
          : archInfo.summaryZh,
        ruleCode: ruleSummary,
      },
      {
        tag: "④",
        title: "审批 / 交割状态",
        body: `${stageLabel}${stageDate ? `（${stageDate}）` : ""}${txCase.lifecycle?.naturalDays ? ` · 全周期 ${txCase.lifecycle.naturalDays} 天` : ""}。`,
        ruleCode: null,
      },
    ];

    if (archetype === "convertible_bond") {
      return validateDiagramSpec(applyConvertibleIssueTerms(spec, txCase, terms, moneyTerm, stageLabel));
    }
    spec.compactSummary = `${name} · ${primaryAmountText} → ${spec.after.outcomeBadge}`;
    spec.topology = synthesizeTopologyFromSpec(spec);

    return validateDiagramSpec(spec);
  }

  const ROAD_KING_RKE_CASE = "HK-01098-20261120-rke-stake-creditor-spv";

  // Revalidate the dated source/terms before using this case-specific planned layout.
  function roadKingRkeSpec(txCase, documents) {
    const cir = "YS-20261123-bff054f0e2b1";
    const ann = "YS-20261120-9f13a48ef590";
    const may = "YS-20260527-bd443d3b6245";
    const date = "2026-11-23";
    const hke = "https://www1.hkexnews.hk/listedco/listconews/sehk/";
    const sources = [
      [cir, "2026/1123/2026112300059.pdf", date],
      [ann, "2026/1120/2026112001173.pdf", "2026-11-20"],
      [may, "2026/0527/2026052701516.pdf", "2026-05-27"],
    ];
    const anchored = (e, id, pages) => e?.documentId === id &&
      pages.every(p => e.pages?.includes(p));
    const termsAre = (key, value, unit, currency, approximate, pages) => {
      const terms = txCase.terms?.filter(t => t.key === key) || [];
      return terms.length === 1 && terms[0].value === value && terms[0].unit === unit &&
        terms[0].currency === currency && terms[0].approximate === approximate &&
        anchored(terms[0].evidence, cir, pages);
    };
    const events = txCase.events || [];
    if (txCase.code !== "01098" || txCase.category !== "disposal" ||
        txCase.stage?.status !== "active" || txCase.stage?.eventKind !== "dispatch" ||
        txCase.stage?.date !== date || txCase.headlineKey !== "stake_fair_value_noncash_estimate" ||
        !sources.every(([id, path, sourceDate]) => documents?.[id]?.caseId === txCase.id &&
          documents[id].url === hke + path && documents[id].date === sourceDate) ||
        !events.some(e => e.kind === "dispatch" && e.state === "actual" && e.date === date &&
          anchored(e.evidence, cir, [1, 17])) ||
        !events.some(e => e.kind === "first_announcement" && e.state === "actual" && e.date === "2026-11-20" &&
          anchored(e.evidence, ann, [3, 4])) ||
        events.some(e => e.state === "actual" && e.kind !== "dispatch" && e.kind !== "first_announcement") ||
        !termsAre("rke_transferred_stake", 70, "percent", null, false, [41]) ||
        !termsAre("rke_retained_stake", 5, "percent", null, false, [41]) ||
        !termsAre("stake_fair_value_noncash_estimate", 2796564000, "money", "HKD", true, [120,122,160]) ||
        !txCase.rules?.some(r => r.code === "HKEX:14" && anchored(r.evidence, cir, [50]))) return null;

    const leftTitle = "债务重组与拟转让路径";
    const rightTitle = "重组生效后的拟议持股";
    const outcomeBadge = "通函已寄发 · 待批准和重组生效";
    const boxes = [
      {id:"rk-listed",panel:"left",x:33,y:51,w:174,h:68,role:"listed",title:"路劲基建",code:"01098.HK",subtitle:"境外债务重组发行人"},
      {id:"rk-seller",panel:"left",x:33,y:164,w:174,h:78,role:"seller",title:"New Select",subtitle:"转让方 · 现持 RKE 75%"},
      {id:"rk-spv-left",panel:"left",x:435,y:164,w:178,h:78,role:"holdco",roleLabel:"拟设载体",title:"债权人处置 SPV",subtitle:"BVI · 拟受让方"},
      {id:"rk-creditors",panel:"left",x:208,y:383,w:231,h:67,role:"creditor",title:"New Select 计划债权人",subtitle:"债权解除、获配收费公路债券"},
      {id:"rk-trust",panel:"right",x:698,y:57,w:138,h:66,role:"holdco",roleLabel:"目的信托",title:"债权人目的信托",subtitle:"拟持有处置 SPV"},
      {id:"rk-spv-right",panel:"right",x:698,y:188,w:134,h:70,role:"holdco",roleLabel:"拟设载体",title:"处置 SPV",subtitle:"拟控制 RKE 董事会"},
      {id:"rk-retain",panel:"right",x:852,y:188,w:97,h:70,role:"seller",title:"New Select",subtitle:"路劲全资附属"},
      {id:"rk-third",panel:"right",x:969,y:188,w:82,h:70,role:"public",roleLabel:"存续股东",title:"第三方股东",subtitle:"原持股不变"},
      {id:"rk-rke",panel:"right",x:703,y:363,w:345,h:62,role:"target",title:"路劲高速公路（RKE）",subtitle:"印尼收费公路权益控股平台"},
    ];
    const ownership = [
      {id:"rk-old-parent",panel:"left",from:"rk-listed",to:"rk-seller",pctLabel:"100% 全资",pct:100,pillWidth:94},
      {id:"rk-trust-spv",panel:"right",from:"rk-trust",to:"rk-spv-right",pctLabel:"拟持 100%",pct:100,dashed:true,pillWidth:91},
      {id:"rk-new-stake",panel:"right",from:"rk-spv-right",to:"rk-rke",pathPoints:[[767,258],[767,363]],labelCenter:[767,315],pctLabel:"拟受让 70%",pct:70,dashed:true,pillWidth:110},
      {id:"rk-kept-stake",panel:"right",from:"rk-retain",to:"rk-rke",pathPoints:[[902,258],[902,363]],labelCenter:[902,315],pctLabel:"拟保留 5%",pct:5,dashed:true,pillWidth:101},
      {id:"rk-other-stake",panel:"right",from:"rk-third",to:"rk-rke",pathPoints:[[1010,258],[1010,363]],labelCenter:[1010,315],pctLabel:"维持 25%",pct:25,dashed:true,pillWidth:81},
    ];
    const flowDefs = [
      {id:"rk-proposed-transfer",kind:"asset",from:"rk-seller",to:"rk-spv-left",direction:"ltr",pathPoints:[[207,203],[435,203]],labelCenter:[321,203],labelWidth:193,labelHeight:45,label:"拟转让 RKE 70% 股权",sublabel:"非现金估值约 HK$27.97 亿"},
      {id:"rk-claim-release",kind:"cancel",from:"rk-creditors",to:"rk-seller",direction:"rtl",pathPoints:[[208,415],[120,415],[120,242]],labelCenter:[120,321],labelWidth:178,labelHeight:45,label:"拟解除合资格债权",sublabel:"依据 New Select 计划"},
      {id:"rk-spv-bonds",kind:"asset",from:"rk-spv-left",to:"rk-creditors",direction:"rtl",pathPoints:[[524,242],[524,415],[439,415]],labelCenter:[524,321],labelWidth:177,labelHeight:45,label:"拟发收费公路债券",sublabel:"由 SPV 发行 · 零息有抵押"},
    ];
    const topology = finalizeLayout(createDiagramCanvas({
      width:MASTER_W,height:490,status:"active",leftTitle,rightTitle,transitionLabel:"待生效",outcomeBadge,
    }), boxes, ownership, flowDefs.map((f,i)=>({...f,panel:"left",step:String(i+1)})));
    const box = id => boxes.find(b=>b.id===id);
    const asNode = b => ({id:b.id,role:b.role,name:b.title,code:b.code,sublabel:b.subtitle});
    const asLink = e => ({from:e.from,to:e.to,label:e.pctLabel,pct:e.pct,style:e.dashed?"dashed":"solid"});
    const notes = [
      ["标的与非现金对价","拟转让的是 RKE 70% 股权，而非直接转让印尼收费公路。70% 权益估值为 HK$2,796,564,000（估算，基准日为 2026 年 8 月 31 日）；New Select 不收取处置现金。"],
      ["债权与证券分别入图","New Select 计划债权人拟解除合资格债权，并获配由处置 SPV 发行的有抵押零息收费公路债券。路劲本身境外重组方案中的新股和现金清扫房地产债券是另一证券链。"],
      ["标的持股变化","处置 SPV 拟由债权人目的信托全资持有；New Select 由 75% 降至 5%，原第三方 25% 不变。若重组生效，RKE 将不再是路劲附属公司。"],
      ["批准与时间","11 月 23 日已寄发通函。两项协议安排互为条件；非常重大出售须股东批准，法院与其他适用条件亦待落实。"],
      ["顾问职责","Opus 的独立意见针对方案 2 相关关连证券安排；ValQuest 负责 RKE 股权估值；Crowe 核验计算、A&M 审阅估值预测。"],
    ];
    return {
      id:txCase.id,caseId:txCase.id,code:txCase.code,name:txCase.name,mechanism:txCase.mechanism,
      stageLabel:txCase.stage.label,stageDate:date,archetype:"disposal",modality:"in_kind",status:"active",
      compactSummary:"拟以 RKE 70% 股权抵偿债务 · 非现金估值约 HK$27.97 亿",
      before:{title:leftTitle,nodes:boxes.filter(b=>b.panel==="left").map(asNode),equityLinks:ownership.filter(e=>e.panel==="left").map(asLink)},
      after:{title:rightTitle,nodes:boxes.filter(b=>b.panel==="right").map(asNode),equityLinks:ownership.filter(e=>e.panel==="right").map(asLink),outcomeBadge},
      flows:flowDefs.map((f,i)=>({id:f.id,kind:f.kind,direction:f.direction,step:String(i+1),
        fromLabel:box(f.from).title,toLabel:box(f.to).title,headline:f.label,subline:f.sublabel,proposedOrTerminated:true})),
      annotations:notes.map(([title,body],i)=>({tag:String(i+1),title,body})),
      evidenceLinks:[
        {documentId:ann,pages:[11],label:"债权人计划：收费公路债券"},
        {documentId:cir,pages:[41],label:"谁转让、受让及保留多少"},
        {documentId:cir,pages:[160],label:"70% 权益非现金估值"},
        {documentId:cir,pages:[50],label:"股东批准与适用规则"},
        {documentId:cir,pages:[96],label:"Opus 独立意见范围"},
        {documentId:cir,pages:[165],label:"Crowe 计算核验"},
        {documentId:cir,pages:[167],label:"A&M 预测审阅"},
        {documentId:cir,pages:[163],label:"ValQuest 估值报告"},
      ],
      topology,
    };
  }

  const LIANFA_PROPERTY_CASE = "HK-02156-20260911-lianfa-property";

  // A single completed share transfer. Contract instalments describe payables, not receipts.
  function buildLianfaPropertyClosure(row, documents) {
    const closingDate = "2026-11-05";
    const signed = "YS-20260911-f624330bc2b4";
    const circular = "YS-20261009-09d00ed8178d";
    const vote = "YS-20261030-96e95aadad44";
    const close = "YS-20261105-f276804539a2";
    const sourceRoot = "https://www1.hkexnews.hk/listedco/listconews/sehk/";
    const sources = [
      [signed, "2026/0911/2026091101309.pdf", "2026-09-11"],
      [circular, "2026/1009/2026100900294.pdf", "2026-10-09"],
      [vote, "2026/1030/2026103000932.pdf", "2026-10-30"],
      [close, "2026/1105/2026110501819.pdf", closingDate],
    ];
    const legalParties = {
      "上市主体":"C&D Property Management Group Co., Ltd（建发物业管理集团有限公司）",
      "法定买方":"Xiamen Lirong Investment Management Co., Ltd.（厦门利融投资管理有限公司）",
      "法定卖方":"Xiamen Lianfa (Group) Real Estate Co., Limited（厦门联发（集团）房地产有限公司）",
      "标的":"Xiamen Lianfa (Group) Property Services Company Limited（厦门联发（集团）物业服务有限公司）",
    };
    const anchored = (e, id, pages) => e?.documentId === id && pages.every(p => e.pages?.includes(p));
    const termDefs = [
      ["contract_cash_consideration",304410000,"money","CNY",circular,[7]],
      ["initial_instalment_due",254410000,"money","CNY",circular,[7]],
      ["deferred_instalment_due",50000000,"money","CNY",circular,[7,9,30]],
      ["registered_stake",100,"percent",null,close,[1]],
    ];
    const actualDefs = [
      ["first_announcement","2026-09-11",signed,[1,3]],
      ["vote","2026-10-30",vote,[1,2]],
      ["completion",closingDate,close,[1]],
      ["supplement","2026-10-09",circular,[1]],
    ];
    const actual = [...(row.events || []), ...(row.processEvents || [])].filter(e => e.state === "actual");
    if (row.code !== "02156" || row.category !== "acquisition" ||
        row.stage?.status !== "closed" || row.stage?.eventKind !== "completion" || row.stage?.date !== closingDate ||
        row.headlineKey !== "contract_cash_consideration" ||
        !sources.every(([id, path, date]) => documents?.[id]?.id === id &&
          documents[id].caseId === row.id && documents[id].date === date &&
          documents[id].url === sourceRoot + path) ||
        !Object.entries(legalParties).every(([key, value]) => row.parties?.[key] === value) ||
        actual.length !== actualDefs.length ||
        !actualDefs.every(([kind,date,documentId,pages]) => actual.filter(e =>
          e.kind === kind && e.date === date && e.timeZone === "Asia/Hong_Kong" &&
          anchored(e.evidence, documentId, pages)).length === 1) ||
        row.terms?.length !== termDefs.length ||
        !termDefs.every(([key,value,unit,currency,documentId,pages]) => row.terms.filter(t =>
          t.key === key && t.value === value && t.unit === unit && t.currency === currency &&
          t.approximate === false && anchored(t.evidence,documentId,pages)).length === 1) ||
        !["HKEX:14","HKEX:14A"].every(code => row.rules?.some(r =>
          r.code === code && anchored(r.evidence,circular,[14])))) return null;

    const issuer = "建发物业管理集团";
    const buyer = "厦门利融投资管理";
    const seller = "厦门联发（集团）房地产";
    const target = "厦门联发（集团）物业服务";
    const leftTitle = "股权转让与两期合同付款";
    const rightTitle = "交割后股权架构";
    const outcomeBadge = "2026.11.05 · 100% 股权过户完成";
    const mk = (id,panel,x,y,w,h,role,title,subtitle,code,tier) =>
      ({id,panel,x,y,w,h,role,roleLabel:role === "target" ? "标的公司" : undefined,title,subtitle,code,tier});
    const boxes = [
      mk("lf-l-issuer","left",32,58,190,71,"listed",issuer,"港股上市母公司","02156.HK",0),
      mk("lf-l-buyer","left",32,166,190,151,"buyer",buyer,"法定受让方及付款方",undefined,1),
      mk("lf-l-seller","left",426,166,190,151,"seller",seller,"法定出让方及收款方",undefined,1),
      mk("lf-l-target","left",426,381,190,65,"target",target,"股权标的",undefined,2),
      mk("lf-r-issuer","right",709,59,330,73,"listed",issuer,"港股上市母公司","02156.HK",0),
      mk("lf-r-buyer","right",709,192,330,72,"buyer",buyer,"标的登记股东",undefined,1),
      mk("lf-r-target","right",709,327,330,74,"target",target,"建发物业间接全资附属",undefined,2),
    ];
    const ownership = [
      ["lf-l-parent","left","lf-l-issuer","lf-l-buyer","100% 全资",[127,147.5]],
      ["lf-l-original","left","lf-l-seller","lf-l-target","交割前 100%",[521,349]],
      ["lf-r-parent","right","lf-r-issuer","lf-r-buyer","100% 全资",[874,162]],
      ["lf-r-registered","right","lf-r-buyer","lf-r-target","100% 已登记",[874,295.5]],
    ].map(([id,panel,from,to,pctLabel,labelCenter])=>({id,panel,from,to,pctLabel,labelCenter,pillWidth:110}));
    const flowDefs = [
      ["lf-share-transfer","shares","rtl","lf-l-seller","lf-l-buyer",193,"100% 股权已过户","2026 年 11 月 5 日",false],
      ["lf-instalment-1","cash","ltr","lf-l-buyer","lf-l-seller",241,"首期应付 RMB 2.5441 亿","实付未披露",true],
      ["lf-instalment-2","cash","ltr","lf-l-buyer","lf-l-seller",289,"尾款应付 RMB 5,000 万","实付未披露",true],
    ];
    const arrows = flowDefs.map(([id,kind,direction,,,y,label,sublabel],index)=>({
      id, kind, panel:"left", step:index ? String(index) : undefined,
      pathPoints:direction==="rtl" ? [[426,y],[222,y]] : [[222,y],[426,y]],
      label,sublabel,labelCenter:[324,y],labelWidth:180,labelHeight:42,
    }));
    const topology = finalizeLayout(createDiagramCanvas({
      width:MASTER_W,height:470,status:"closed",leftTitle,rightTitle,transitionLabel:"完成过户",outcomeBadge,
    }), boxes, ownership, arrows);
    const asNode = ({id,role,title,subtitle,code,tier}) => ({id,role,name:title,sublabel:subtitle,code,tier});
    const asLink = ({from,to,pctLabel}) => ({from,to,label:pctLabel,pct:100,style:"solid"});
    const nameFor = id => boxes.find(box=>box.id===id).title;
    return {
      id:row.id, caseId:row.id, code:row.code, name:row.name, mechanism:"关连现金股权转让 · 对价分两期",
      stageLabel:"100% 股权过户完成", stageDate:closingDate, archetype:"acquisition", modality:"cash", status:"closed",
      before:{title:leftTitle,nodes:boxes.filter(b=>b.panel==="left").map(asNode),
        equityLinks:ownership.filter(e=>e.panel==="left").map(asLink)},
      after:{title:rightTitle,nodes:boxes.filter(b=>b.panel==="right").map(asNode),
        equityLinks:ownership.filter(e=>e.panel==="right").map(asLink),outcomeBadge},
      flows:flowDefs.map(([id,kind,direction,from,to,,headline,subline,paymentUnverified])=>({
        id,kind,direction,fromLabel:nameFor(from),toLabel:nameFor(to),headline,subline,
        proposedOrTerminated:paymentUnverified,
      })),
      annotations:[
        {tag:"①",title:"股权登记完成",body:"11 月 5 日，厦门利融投资管理有限公司登记为厦门联发（集团）物业服务有限公司唯一股东；建发物业透过其全资子公司厦门利融间接持有标的 100% 股权。"},
        {tag:"②",title:"合同对价及付款安排",body:"向厦门联发（集团）房地产有限公司支付的合同总对价为人民币 304,410,000 元（含税）。首期 254,410,000 元于条件达成或获豁免并完成过户后 10 个营业日内应付；尾款 50,000,000 元于 2027 年 6 月 30 日起 10 个营业日内应付，按约可抵扣。交割公告未披露两期实付。"},
        {tag:"③",title:"须予披露及关连交易",body:"9 月 11 日签订股权转让协议，10 月 30 日独立股东批准。",ruleCode:"HKEX:14 · HKEX:14A"},
      ],
      evidenceLinks:[
        {documentId:signed,pages:[1],label:"9 月 11 日协议公告"},
        {documentId:circular,pages:[7],label:"买卖双方、股权及两期对价"},
        {documentId:circular,pages:[33],label:"尾款付款节点及抵扣条款"},
        {documentId:circular,pages:[14],label:"上市规则与关连关系"},
        {documentId:vote,pages:[2],label:"10 月 30 日独立股东表决"},
        {documentId:close,pages:[1],label:"11 月 5 日唯一股东登记及交割"},
      ],
      topology, compactSummary:"11 月 5 日完成 100% 股权过户 · 合同对价 RMB 3.0441 亿，两期实付未披露",
    };
  }

  const ERJIN_ACQUISITION_CASE = "HK-01918-20260824-erjin-management";

  // The implementation milestone here concerns issuer shares, not target title.
  function buildErjinImplementation(row, documents) {
    const first = "YS-20260824-46e3196d57ae";
    const supplement = "YS-20261020-7920c1843d33";
    const circular = "YS-20261026-43104d602078";
    const vote = "YS-20261111-3edfe2b9b6b4";
    const issue = "YS-20261119-8a124e13cad5";
    const issueDate = "2026-11-19";
    const hke = "https://www1.hkexnews.hk/listedco/listconews/sehk/";
    const sources = [
      [first,"2026/0824/2026082401335.pdf","2026-08-24"],
      [supplement,"2026/1020/2026102000769.pdf","2026-10-20"],
      [circular,"2026/1026/2026102600558.pdf","2026-10-26"],
      [vote,"2026/1111/2026111101055.pdf","2026-11-11"],
      [issue,"2026/1119/2026111900641.pdf",issueDate],
    ];
    const parties = {
      "上市发行人":"Sunac China Holdings Limited",
      "卖方":"Sunus Holdings Limited",
      "收购方":"Sunac Property Management Limited",
      "法律标的":"Sun Success Investment Limited",
      "间接业务标的":"Erjin Construction Management Group Co., Ltd.",
    };
    const supportedActual = [
      ["first_announcement","2026-08-24",first,[1,2,18,19]],
      ["supplement","2026-10-20",supplement,[1,2]],
      ["supplement","2026-10-26",circular,[]],
      ["vote","2026-11-11",vote,[1,2,3]],
      ["implementation",issueDate,issue,[1]],
    ];
    const supportedTerms = [
      ["contract_consideration",123150000,"money","CNY",first,[1,3]],
      ["contract_hkd_equivalent",142361400,"money","HKD",first,[1,3]],
      ["issued_shares",260258500,"shares",null,issue,[1]],
      ["issue_price",0.547,"per_share","HKD",issue,[1]],
      ["target_equity_stake",100,"percent",null,first,[1,2]],
    ];
    const supports = (e,id,pages) => e?.documentId===id && pages.every(p=>e.pages?.includes(p));
    const actual = [...(row.events || []),...(row.processEvents || [])].filter(e=>e.state==="actual");
    if (row.code!=="01918" || row.category!=="acquisition" ||
        !["active","closed","implemented"].includes(row.stage?.status) ||
        row.stage?.eventKind!=="implementation" || row.stage?.date!==issueDate ||
        row.headlineKey!=="contract_consideration" || row.lifecycle?.endKind==="completion" ||
        !Object.entries(parties).every(([key,value])=>row.parties?.[key]===value) ||
        !sources.every(([id,p,date])=>documents?.[id]?.id===id && documents[id].caseId===row.id &&
          documents[id].date===date && documents[id].url===hke+p) ||
        actual.length!==supportedActual.length ||
        !supportedActual.every(([kind,date,id,pages])=>actual.filter(e=>e.kind===kind&&
          e.date===date&&e.timeZone==="Asia/Hong_Kong"&&supports(e.evidence,id,pages)).length===1) ||
        row.terms?.length!==supportedTerms.length ||
        !supportedTerms.every(([key,value,unit,currency,id,pages])=>row.terms.filter(t=>
          t.key===key&&t.value===value&&t.unit===unit&&t.currency===currency&&
          t.approximate===false&&supports(t.evidence,id,pages)).length===1) ||
        ![["HKEX:14.06(1)",[2]],["HKEX:14A",[1,2]]].every(([code,pages])=>
          row.rules?.some(r=>r.code===code&&supports(r.evidence,supplement,pages)))) return null;

    const company = "融创中国";
    const seller = "融者共创控股";
    const buyer = "融创房地产管理";
    const target = "融顺投资";
    const operating = "而今建设管理集团";
    const leftTitle = "签约结构与实际发股";
    const rightTitle = "协议拟达成的持股链";
    const outcomeBadge = "标的过户日期未单独披露";
    const node = (id,panel,x,y,w,h,role,title,subtitle,tier,code,roleLabel)=>
      ({id,panel,x,y,w,h,role,title,subtitle,tier,code,roleLabel});
    const boxes = [
      node("ej-l-company","left",33,74,189,79,"listed",company,"代价股发行主体",0,"01918.HK"),
      node("ej-l-buyer","left",33,229,189,73,"buyer",buyer,"协议买方",1),
      node("ej-l-seller","left",426,74,189,79,"seller",seller,"股份收取方",0),
      node("ej-l-target","left",426,229,189,73,"target",target,"协议收购全部股权",1,undefined,"法律标的"),
      node("ej-l-operating","left",426,381,189,75,"target",operating,"间接业务标的",2,undefined,"业务标的"),
      node("ej-r-company","right",714,52,320,65,"listed",company,"代价股发行主体",0,"01918.HK"),
      node("ej-r-buyer","right",714,151,320,65,"buyer",buyer,"协议买方",1),
      node("ej-r-target","right",714,258,320,65,"target",target,"标的过户日未单列",2,undefined,"法律标的"),
      node("ej-r-operating","right",714,363,320,62,"target",operating,"境内运营公司",3,undefined,"业务标的"),
    ];
    const interests = [
      ["ej-l-buy-controlled","left","ej-l-company","ej-l-buyer","间接全资",100,true,[127.5,191]],
      ["ej-l-seller-before","left","ej-l-seller","ej-l-target","签约时持有 100%",100,false,[520.5,191]],
      ["ej-l-target-operating","left","ej-l-target","ej-l-operating","间接持有 100%",100,true,[520.5,341.5]],
      ["ej-r-buy-controlled","right","ej-r-company","ej-r-buyer","间接全资",100,true,[874,134]],
      ["ej-r-acquisition","right","ej-r-buyer","ej-r-target","协议拟取得 100%",100,true,[874,237]],
      ["ej-r-target-operating","right","ej-r-target","ej-r-operating","间接持有 100%",100,true,[874,343]],
    ].map(([id,panel,from,to,pctLabel,pct,dashed,labelCenter])=>({id,panel,from,to,pctLabel,pct,dashed,labelCenter,pillWidth:136}));
    const topology = finalizeLayout(createDiagramCanvas({
      width:MASTER_W,height:490,status:"active",leftTitle,rightTitle,transitionLabel:"发股已证",outcomeBadge,
    }),boxes,interests,[
      {id:"ej-share-issue",panel:"left",kind:"shares",pathPoints:[[222,113.5],[426,113.5]],
       label:"已发 260,258,500 股",sublabel:"11 月 19 日 · HKD 0.547/股",
       labelWidth:183,labelHeight:44,labelCenter:[324,113.5]},
    ]);
    const asNode=({id,role,title,subtitle,tier,code})=>({id,role,name:title,sublabel:subtitle,tier,code});
    const asLink=({from,to,pctLabel,pct,dashed})=>({from,to,label:pctLabel,pct,style:dashed?"dashed":"solid"});
    const panel=(side,title)=>({title,nodes:boxes.filter(b=>b.panel===side).map(asNode),
      equityLinks:interests.filter(e=>e.panel===side).map(asLink)});
    return {
      id:row.id,caseId:row.id,code:row.code,name:"融创中国收购融顺投资及而今管理",
      mechanism:"关连股份收购 · 特别授权发行代价股份",
      stageLabel:"代价股份已发行 · 标的过户日未单列",stageDate:issueDate,
      archetype:"acquisition",modality:"shares",status:"active",
      before:panel("left",leftTitle),
      after:{...panel("right",rightTitle),outcomeBadge},
      flows:[{id:"ej-share-issue",kind:"shares",direction:"ltr",fromLabel:company,toLabel:seller,
        headline:"已配发 260,258,500 股代价股份",subline:"11 月 19 日 · 发行价 HKD 0.547/股",proposedOrTerminated:false}],
      annotations:[
        {tag:"①",title:"两类股份，两个事实",body:"11 月 19 日，融创中国向融者共创控股配发 260,258,500 股代价股份，每股 0.547 港元。协议拟由融创房地产管理收购融顺投资的一股（全部已发行股本），从而间接取得而今建设管理集团 100%。通函约定交割时发股；翌日披露表未单独列明融顺投资的股权过户登记日期。"},
        {tag:"②",title:"协议总对价",body:"人民币 123,150,000 元以发行代价股份支付；港元 142,361,400 元是协议按 1.156 换算的等值，不是额外一笔对价。"},
        {tag:"③",title:"股份交易及关连交易",body:"10 月 20 日补充协议加入独立股东批准条件，改用特别授权发行；11 月 11 日独立股东通过议案。",ruleCode:"HKEX:14.06(1) · HKEX:14A"},
      ],
      evidenceLinks:[
        {documentId:issue,pages:[1],label:"11 月 19 日实际发股及发行价"},
        {documentId:circular,pages:[5],label:"协议买方、法律标的及一股口径"},
        {documentId:circular,pages:[6],label:"法律卖方定义"},
        {documentId:circular,pages:[8],label:"间接业务标的及协议对价"},
        {documentId:circular,pages:[18],label:"交割触发条件与持股后果"},
        {documentId:supplement,pages:[2],label:"关连交易与特别授权"},
        {documentId:vote,pages:[2],label:"11 月 11 日表决及特别授权"},
      ],
      topology,compactSummary:"已发 260,258,500 股 · 标的股权过户日未单列",
    };
  }

  function buildGetNiceScheme(txCase, documents) {
    const d = "YS-20260928-7ffcd48f9d9d";
    const id = "HK-00064-20260717-privatisation";
    const doc = documents?.[d], stage = txCase.stage, terms = txCase.terms || [];
    const event = txCase.events?.find(e => e.kind==="effective" && e.state==="actual" && e.date==="2026-11-05");
    const anchored = (key,value,unit) => terms.some(t=>t.key===key && t.value===value && t.unit===unit &&
      t.currency==="HKD" && t.evidence?.documentId===d);
    if (txCase.id!==id || txCase.code!=="00064" || txCase.category!=="scheme"
      || stage?.status!=="closed" || stage?.eventKind!=="delisting" || stage?.date!=="2026-11-06"
      || event?.evidence?.documentId!=="YS-20261106-bc31c8416f9e"
      || documents?.["YS-20261106-bc31c8416f9e"]?.url!=="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1106/2026110600048_c.pdf"
      || doc?.caseId!==id || doc.date!=="2026-09-28"
      || doc.url!=="https://www.xn--2ov566aump.hk/sfc/services/dod/DIDoc?DocRef=bbebe90bd1d64d72a96a7f8a21e8915b"
      || txCase.parties?.["要约方"]!=="Honeylink Agents Limited"
      || txCase.headlineKey!=="combined_cash_for_scheme_holders"
      || !terms.some(t=>t.key==="scheme_shares"&&t.value===298778970&&t.unit==="shares")
      || !terms.some(t=>t.key==="issuer_special_dividend"&&t.value===2&&t.unit==="per_share"&&t.currency==="HKD")
      || !anchored("bidder_cancel_price",2,"per_share") || !anchored("combined_scheme_price",4,"per_share")
      || !anchored("bidder_cash_for_scheme_holders",597557940,"money")
      || !anchored("issuer_dividend_for_scheme_holders",597557940,"money")
      || !anchored("combined_cash_for_scheme_holders",1195115880,"money")) return null;
    const offeror="Honeylink Agents Limited", issuer="结好控股", publicName="计划股东";
    const outcome="2026.11.06 · 已撤销上市";
    const common = {panel:"left",labelHeight:44,labelWidth:172};
    const topology = finalizeLayout(createDiagramCanvas({
      width:MASTER_W,height:515,status:"closed",leftTitle:"两笔现金与计划股份注销",
      rightTitle:"私有化后股权架构",transitionLabel:"计划生效",outcomeBadge:outcome}),
      [
        {id:"L_bidder",panel:"left",x:38,y:134,w:191,h:83,role:"buyer",title:offeror,subtitle:"要约人 · 承担现金注销款"},
        {id:"L_public",panel:"left",x:428,y:134,w:192,h:83,role:"public",title:publicName,subtitle:"合计每股获 4.00 港元"},
        {id:"L_issuer",panel:"left",x:38,y:340,w:191,h:83,role:"listed",title:issuer,subtitle:"发行人 · 承担特别股息",code:"00064.HK"},
        {id:"R_bidder",panel:"right",x:734,y:100,w:280,h:84,role:"buyer",title:offeror,subtitle:"唯一股东"},
        {id:"R_issuer",panel:"right",x:734,y:280,w:280,h:84,role:"target",title:issuer,subtitle:"非上市全资附属公司",badge:"已撤销上市"},
      ],
      [{id:"E_right",panel:"right",from:"R_bidder",to:"R_issuer",pctLabel:"100% 全资控股",labelCenter:[874,233],pillWidth:116}],
      [
        {...common,id:"A_cancel_cash",step:"①",kind:"cash",pathPoints:[[229,171],[428,171]],label:"现金注销价 2.00 港元/股",sublabel:"要约人支付",labelCenter:[329,171]},
        {...common,id:"A_dividend_cash",step:"②",kind:"cash",pathPoints:[[229,369],[390,369],[390,201],[428,201]],label:"特别股息 2.00 港元/股",sublabel:"结好控股支付",labelCenter:[324,369]},
        {...common,id:"A_cancel_shares",step:"③",kind:"cancel",pathPoints:[[529,217],[529,461],[132,461],[132,423]],label:"注销 2.99 亿股计划股份",sublabel:"开曼时间 11 月 5 日生效",labelCenter:[326,461]},
      ]);
    return {
      id,caseId:id,code:"00064",name:issuer,mechanism:txCase.mechanism,status:"closed",
      stageLabel:stage.label,stageDate:stage.date,archetype:"scheme",modality:"cash",caseModalityShortLabel:"注销款＋特别股息",
      before:{title:"计划生效前",nodes:[{id:"offeror",role:"buyer",name:offeror},{id:"shareholders",role:"public",name:publicName},{id:"issuer",role:"listed",name:issuer}],equityLinks:[]},
      after:{title:"私有化后",outcomeBadge:outcome,nodes:[{id:"offeror_after",role:"buyer",name:offeror},{id:"issuer_after",role:"target",name:issuer}],equityLinks:[{from:"offeror_after",to:"issuer_after",label:"100% 全资控股",pct:100,style:"solid"}]},
      flows:[
        {id:"cash1",kind:"cash",direction:"ltr",step:"1",fromLabel:offeror,toLabel:publicName,headline:"现金注销价 2.00 港元/股"},
        {id:"cash2",kind:"cash",direction:"ltr",step:"2",fromLabel:issuer,toLabel:publicName,headline:"特别股息 2.00 港元/股"},
        {id:"cancel",kind:"cancel",direction:"rtl",step:"3",fromLabel:publicName,toLabel:issuer,headline:"注销 2.99 亿股计划股份"}
      ],
      annotations:[
        {tag:"①",title:"计划股东收取现金",body:"按计划文件的 298,778,970 股计，注销款及特别股息各约 5.98 亿港元，合计约 11.95 亿港元。"},
        {tag:"②",title:"特别股息范围",body:"要约人已放弃其原持有股份对应的特别股息。"},
      ],
      evidenceLinks:[{documentId:d,label:"计划文件 · 董事会函件，印刷页 12–14"},{documentId:"YS-20261106-bc31c8416f9e",pages:[2,3],label:"计划生效及撤销上市安排"}],
      topology,compactSummary:"要约人付 2.00 港元/股 · 发行人派 2.00 港元/股 · 合计 4.00 港元/股",
    };
  }

  function buildYueyunBuyback(txCase, documents) {
    const gz = txCase.id === "HK-03399-20261119-guangzhou-motor-transport-buyback";
    const hk = txCase.id === "HK-03399-20261119-hong-kong-motor-transport-buyback";
    if (!gz && !hk) return null;
    const id=txCase.id, did="YS-20261119-7837e945675a", doc=documents?.[did], stage=txCase.stage;
    const prefix=gz?"gz":"hk", currency=gz?"CNY":"HKD", total=gz?9802700:119621500, half=total/2, page=gz?3:5;
    const terms=txCase.terms||[];
    const anchor=(key,value,p)=>terms.some(t=>t.key===prefix+"_"+key&&t.value===value&&t.unit==="money"&&
      t.currency===currency&&t.evidence?.documentId===did&&t.evidence.pages?.includes(p)&&
      (gz || t.evidence.contractPage===5));
    const area=gz?"廣州":"香港", expectedName="粵運交通："+area+"附屬公司回購";
    if(txCase.code!=="03399"||txCase.category!=="acquisition"||txCase.name!==expectedName||
      txCase.headlineKey!==prefix+"_price"||stage?.status!=="active"||stage.date!=="2026-11-19"||
      doc?.date!=="2026-11-19"||doc.url!=="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1119/2026111901253.pdf"||
      txCase.parties?.["賣方"]!=="深圳市交通運輸有限公司"||
      !anchor("price",total,page)||!anchor("first_due",half,gz?4:5)||!anchor("next_due",half,gz?4:5))return null;
    const target=area+"附屬公司", seller="深圳市交通運輸", owner="粵運交通", other="真美旅遊貿易";
    const term=terms.find(t=>t.key===prefix+"_price");
    const value=formatTermBrief(term), cancel=gz?"回購並減資註銷 19% 股權":"回購並註銷 3,420 股（19%）";
    const outcome="回購及註銷完成後 · 粵運交通約 76.54%";
    const conditions=gz?"合同已生效 · 工商登記待確認":"同意及批准已取得 · 辭任及交割待完成確認";
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:448,status:"active",
      leftTitle:area+"附屬公司現金回購",rightTitle:"註銷後擬議股權",transitionLabel:"交割及註銷後",outcomeBadge:outcome}),
      [
        {id:"L_target",panel:"left",x:34,y:176,w:209,h:84,role:"listed",title:target,subtitle:"回購方 · 粵運交通原持股 62%"},
        {id:"L_seller",panel:"left",x:407,y:176,w:209,h:84,role:"seller",title:seller,subtitle:"出售方 · 原持股 19%"},
        {id:"R_owner",panel:"right",x:700,y:101,w:162,h:76,role:"buyer",title:owner,subtitle:"原持股 62%",code:"03399.HK"},
        {id:"R_other",panel:"right",x:887,y:101,w:162,h:76,role:"public",title:other,subtitle:"原持股 19%"},
        {id:"R_target",panel:"right",x:734,y:284,w:280,h:84,role:"target",title:target,subtitle:"仍為非全資附屬公司"},
      ],[
        {id:"E1",panel:"right",from:"R_owner",to:"R_target",anchorToRatio:.17,pctLabel:"約 76.54%",pillWidth:98,labelCenter:[786,232]},
        {id:"E2",panel:"right",from:"R_other",to:"R_target",anchorToRatio:.83,pctLabel:"約 23.46%",pillWidth:98,labelCenter:[967,232]},
      ],[
        {id:"A_cash",panel:"left",step:"①",kind:"cash",pathPoints:[[138,176],[138,105],[512,105],[512,176]],
          label:"現金回購 "+value,sublabel:"兩期各 50% · 合約付款",labelCenter:[325,105],labelWidth:340,labelHeight:46},
        {id:"A_cancel",panel:"left",step:"②",kind:"cancel",pathPoints:[[512,260],[512,339],[138,339],[138,260]],
          label:cancel,sublabel:"兩份回購各自完成",labelCenter:[325,339],labelWidth:325,labelHeight:46},
      ]);
    return {
      id,caseId:id,code:"03399",name:expectedName,mechanism:txCase.mechanism,status:"active",
      stageLabel:stage.label,stageDate:stage.date,archetype:"acquisition",modality:"cash",
      caseArchetypeLabel:"附屬公司回購註銷",caseModalityShortLabel:"現金分期",
      before:{title:"回購安排",nodes:[{id:"buyer",role:"buyer",name:target},{id:"seller",role:"seller",name:seller}],equityLinks:[]},
      after:{title:"註銷後擬議股權",outcomeBadge:outcome,nodes:[{id:"o",role:"buyer",name:owner},{id:"m",role:"public",name:other},{id:"t",role:"target",name:target}],equityLinks:[
        {from:"o",to:"t",label:"約 76.54%",pct:76.54,style:"dashed"},{from:"m",to:"t",label:"約 23.46%",pct:23.46,style:"dashed"}]},
      flows:[
        {id:"cash",kind:"cash",direction:"ltr",step:"1",fromLabel:target,toLabel:seller,headline:"現金回購 "+value,subline:"兩期各 50% · 合約付款",proposedOrTerminated:true},
        {id:"cancel",kind:"cancel",direction:"rtl",step:"2",fromLabel:seller,toLabel:target,headline:cancel,proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"最新階段",body:conditions},{tag:"②",title:"合約付款",body:gz?
        "首期於生效後 15 個工作日內應付；後期於相關人員辭任及登記後 15 個工作日內應付。":
        "首期於所須同意及批准取得後 15 個營業日內應付；餘款於交割時應付。"}],
      evidenceLinks:[{documentId:did,pages:gz?[3,4]:[5,6],label:area+"回購條款"}],
      topology,compactSummary:target+"回購並註銷 19% · "+value+" · 粵運交通擬升至約 76.54%",
    };
  }

  function buildMostKwaiChungTwoAcquisitions(txCase, documents) {
    const id="HK-01716-20260831-wannianfeng-zhousha";
    const signed="YS-20260831-932ed7a0b39e", notice="YS-20261026-9d8f997730ac";
    const defs=[
      ["contract_cash_total",146300,[2,3]],["wannianfeng_cash",143300,[2,6]],["zhousha_cash",3000,[3,7]],
    ];
    if(txCase.id!==id||txCase.code!=="01716"||txCase.category!=="acquisition"||txCase.stage?.status!=="closed"||
       txCase.stage.eventKind!=="completion_confirmed"||txCase.stage.date!=="2026-10-26"||txCase.lifecycle||
       documents?.[signed]?.url!=="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0831/2026083102393.pdf"||
       documents?.[notice]?.url!=="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1026/2026102601085.pdf"||
       txCase.parties?.["买方"]!=="Most Kwai Chung Limited"||
       txCase.parties?.["卖方"]!=="Xiamen Kuangshi Lianmeng Network Technology Co., Ltd."||
       !txCase.events?.some(e=>e.kind==="completion_confirmed"&&e.date==="2026-10-26"&&e.state==="actual"&&
          e.evidence?.documentId===notice&&e.evidence.pages?.includes(1))||
       txCase.headlineKey!=="contract_cash_total"||
       !defs.every(([k,v,p])=>txCase.terms?.some(t=>t.key===k&&t.value===v&&t.unit==="money"&&t.currency==="CNY"&&
          t.evidence?.documentId===signed&&p.every(n=>t.evidence.pages?.includes(n)))))return null;
    const name="毛记葵涌", buyer="毛记葵涌集团", vendor="厦门旷世联盟", target1="厦门万年丰", target2="厦门洲沙";
    const stageLabel=txCase.stage.label, outcome="10 月 26 日公告确认 · 两项均已完成";
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:448,status:"closed",
      leftTitle:"两项现金收购",rightTitle:"完成后股权",transitionLabel:"已完成",outcomeBadge:outcome}),[
        {id:"lb",panel:"left",x:38,y:174,w:202,h:82,role:"buyer",title:buyer,subtitle:"现金买方",code:"01716.HK"},
        {id:"ls",panel:"left",x:411,y:174,w:202,h:82,role:"seller",title:vendor,subtitle:"两项股权的卖方"},
        {id:"rb",panel:"right",x:734,y:102,w:280,h:76,role:"buyer",title:buyer,subtitle:"间接持有两家标的"},
        {id:"r1",panel:"right",x:697,y:294,w:163,h:74,role:"target",title:target1,subtitle:"标的 1"},
        {id:"r2",panel:"right",x:888,y:294,w:163,h:74,role:"target",title:target2,subtitle:"标的 2"},
      ],[
        {id:"o1",panel:"right",from:"rb",to:"r1",anchorFromRatio:.17,pctLabel:"100%",pillWidth:74,labelCenter:[780,237]},
        {id:"o2",panel:"right",from:"rb",to:"r2",anchorFromRatio:.83,pctLabel:"100%",pillWidth:74,labelCenter:[968,237]},
      ],[
        {id:"p",panel:"left",step:"①",kind:"cash",pathPoints:[[139,174],[139,98],[512,98],[512,174]],label:"合同价合计人民币 14.63 万元",
         sublabel:"万年丰 14.33 万元 · 洲沙 3,000 元",labelCenter:[326,98],labelWidth:353,labelHeight:46},
        {id:"e",panel:"left",step:"②",kind:"asset",pathPoints:[[512,256],[512,336],[139,336],[139,256]],label:"转让两家标的各 100% 股权",
         sublabel:"登记完成由 10 月 26 日公告确认",labelCenter:[326,336],labelWidth:349,labelHeight:46},
      ]);
    return {id,caseId:id,code:"01716",name,mechanism:txCase.mechanism,stageLabel,stageDate:txCase.stage.date,status:"closed",
      archetype:"acquisition",modality:"cash",caseArchetypeLabel:"两项现金股权收购",
      before:{title:"收购方与卖方",nodes:[{id:"buyer",role:"buyer",name:buyer},{id:"seller",role:"seller",name:vendor}],equityLinks:[]},
      after:{title:"完成后股权",outcomeBadge:outcome,nodes:[{id:"owner",role:"buyer",name:buyer},{id:"w",role:"target",name:target1},{id:"z",role:"target",name:target2}],
       equityLinks:[{from:"owner",to:"w",label:"100%（间接）",pct:100,style:"solid"},{from:"owner",to:"z",label:"100%（间接）",pct:100,style:"solid"}]},
      flows:[{id:"price",kind:"cash",direction:"ltr",step:"1",fromLabel:buyer,toLabel:vendor,headline:"两份合同约定价合计人民币 14.63 万元"},
       {id:"transfer",kind:"asset",direction:"rtl",step:"2",fromLabel:vendor,toLabel:buyer,headline:"转让两个标的各 100% 股权"}],
      annotations:[{tag:"①",title:"合同现金价",body:"万年丰人民币 14.33 万元；洲沙人民币 3,000 元。"},
       {tag:"②",title:"确认日期",body:"10 月 26 日公告确认两项均已完成登记。"}],
      evidenceLinks:[{documentId:signed,pages:[2,3],label:"两份协议和合同价"},{documentId:notice,pages:[1],label:"完成确认公告"}],
      topology,compactSummary:"现金合同价人民币 14.63 万元 · 两项收购均已完成",
    };
  }

  function buildWesternSolarJv(txCase,documents) {
    const id="HK-00276-20261118-western-solar-energy-jv", sid="YS-20261118-a7989fd414ec";
    const doc=documents?.[sid], check=[
      ["issuer_commitment_cap",2205000,"money",3],["partner_commitment_cap",2295000,"money",3],
      ["initial_capital_total",4500000,"money",3],["issuer_subscription_floor",100000,"money",4],
      ["issuer_post_stake",49,"percent",4],["partner_post_stake",51,"percent",4],
      ["partner_prior_cost_reimbursable",210000,"money",4],
    ];
    if(txCase.id!==id||txCase.code!=="00276"||txCase.stage?.status!=="active"||txCase.stage?.date!=="2026-11-18"||
      txCase.headlineKey!=="issuer_commitment_cap"||doc?.caseId!==id||
      doc.url!=="https://www.hkexnews.hk/listedco/listconews/sehk/2026/1118/2026111801048_c.pdf"||
      txCase.parties?.["合营伙伴"]!=="New Progress Group LLC"||txCase.parties?.["合营公司"]!=="Western Solar Energy LLC"||
      !check.every(([key,v,u,p])=>txCase.terms?.some(t=>t.key===key&&t.unit===u&&t.value===v&&
       t.currency===(u==="money"?"USD":null)&&t.evidence?.documentId===sid&&t.evidence.pages?.includes(p))))return null;
    const a="BVI Newco", b="New Progress Group", c="Western Solar Energy";
    const out="合营完成后 · BVI Newco 49%／伙伴 51%";
    const status="active", labels=["最高 220.5 万美元","最高 229.5 万美元"];
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:467,status,leftTitle:"合营资金承诺",
      rightTitle:"合营完成后拟议股权",transitionLabel:"条件达成后",outcomeBadge:out}),[
        {id:"la",panel:"left",x:38,y:116,w:239,h:80,role:"buyer",title:a,subtitle:"蒙古能源拟设全资载体"},
        {id:"lb",panel:"left",x:370,y:116,w:243,h:80,role:"public",title:b,subtitle:"合营伙伴"},
        {id:"lc",panel:"left",x:118,y:330,w:424,h:78,role:"target",title:c,subtitle:"初始资本需求合计 450 万美元"},
        {id:"ra",panel:"right",x:700,y:112,w:161,h:80,role:"buyer",title:a,subtitle:"拟持有 49%"},
        {id:"rb",panel:"right",x:888,y:112,w:163,h:80,role:"public",title:b,subtitle:"拟持有 51%"},
        {id:"rc",panel:"right",x:734,y:306,w:280,h:80,role:"target",title:c,subtitle:"拟议合营公司"},
      ],[
        {id:"ea",panel:"right",from:"ra",to:"rc",anchorToRatio:.20,pctLabel:"49%",labelCenter:[786,246],pillWidth:74,dashed:true},
        {id:"eb",panel:"right",from:"rb",to:"rc",anchorToRatio:.80,pctLabel:"51%",labelCenter:[962,246],pillWidth:74,dashed:true},
      ],[
        {id:"fa",panel:"left",kind:"cash",step:"①",pathPoints:[[155,196],[155,272],[224,272],[224,330]],label:labels[0],
          sublabel:"股份认购及股东贷款",labelCenter:[162,272],labelWidth:205,labelHeight:46},
        {id:"fb",panel:"left",kind:"cash",step:"②",pathPoints:[[491,196],[491,272],[434,272],[434,330]],label:labels[1],
          sublabel:"股份认购及股东贷款",labelCenter:[490,272],labelWidth:205,labelHeight:46},
      ]);
    return {id,caseId:id,code:"00276",name:"蒙古能源",mechanism:txCase.mechanism,stageLabel:txCase.stage.label,stageDate:txCase.stage.date,status,
      archetype:"acquisition",modality:"cash",caseArchetypeLabel:"合营投资",caseModalityShortLabel:"认购＋股东贷款",
      before:{title:"合营资金",nodes:[{id:"a",role:"buyer",name:a},{id:"b",role:"public",name:b},{id:"c",role:"target",name:c}],equityLinks:[]},
      after:{title:"合营完成后拟议股权",outcomeBadge:out,nodes:[{id:"aa",role:"buyer",name:a},{id:"bb",role:"public",name:b},{id:"cc",role:"target",name:c}],
       equityLinks:[{from:"aa",to:"cc",label:"49%",pct:49,style:"dashed"},{from:"bb",to:"cc",label:"51%",pct:51,style:"dashed"}]},
      flows:[{id:"a",kind:"cash",direction:"ltr",step:"1",fromLabel:a,toLabel:c,headline:labels[0],subline:"认购及股东贷款",proposedOrTerminated:true},
       {id:"b",kind:"cash",direction:"rtl",step:"2",fromLabel:b,toLabel:c,headline:labels[1],subline:"认购及股东贷款",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"股权及资金安排",body:"完成涉及现有股份转让及合营公司发行新股。BVI Newco 认购款至少 10 万美元；余额以股东贷款提供。"},
       {tag:"②",title:"合营伙伴前期垫款",body:"New Progress Group 已垫付 21 万美元，可由合营公司偿付。"}],
      evidenceLinks:[{documentId:sid,pages:[3,4],label:"双方出资、资金形式及拟议股权"}],
      topology,compactSummary:"蒙古能源拟持 49% · 认购及股东贷款承诺最多 220.5 万美元",
    };
  }

  function buildTaizhouEquipmentBuyback(txCase,documents) {
    const id="HK-06998-20261117-taizhou-equipment-buyback",did="YS-20261117-b1ff242e6efc";
    const terms=txCase.terms||[], t=terms.find(x=>x.key==="original_cost_buyback_cap"), d=documents?.[did];
    if(txCase.id!==id||txCase.code!=="06998"||txCase.category!=="disposal"||txCase.stage?.status!=="active"||
      txCase.stage.date!=="2026-11-17"||!t||txCase.headlineKey!==t.key||t.unit!=="money"||t.currency!=="CNY"||t.value!==11000000||
      t.evidence?.documentId!==did||![4,5,8].every(p=>t.evidence.pages?.includes(p))||
      d?.caseId!==id||d.url!=="https://www.hkexnews.hk/listedco/listconews/sehk/2026/1117/2026111701390_c.pdf"||
      txCase.parties?.["设备所有人"]!=="亿腾医药（珠海）有限公司"||txCase.parties?.["拟回购方"]!=="泰州亿腾景昂药业股份有限公司")return null;
    const buyer="泰州亿腾景昂", seller="亿腾医药（珠海）", stage=txCase.stage;
    const out="足额结清后 · 设备转由泰州方持有";
    const top=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:452,status:"active",leftTitle:"设备回购与采购款抵扣",
      rightTitle:"设备所有权",transitionLabel:"足额结清后",outcomeBadge:out}),[
        {id:"b",panel:"left",x:37,y:167,w:238,h:87,role:"buyer",title:buyer,subtitle:"拟回购方"},
        {id:"s",panel:"left",x:371,y:167,w:238,h:87,role:"seller",title:seller,subtitle:"结清前保留设备所有权"},
        {id:"br",panel:"right",x:734,y:167,w:280,h:87,role:"buyer",title:buyer,subtitle:"拟取得设备所有权"},
      ],[],[
        {id:"offset",panel:"left",step:"①",kind:"asset",pathPoints:[[156,167],[156,93],[489,93],[489,167]],
         label:"以采购款抵扣 · 回购上限人民币 1,100 万元",sublabel:"最终口径按设备原采购成本",labelCenter:[323,93],labelWidth:374,labelHeight:46},
        {id:"title",panel:"left",step:"②",kind:"asset",pathPoints:[[489,254],[489,341],[156,341],[156,254]],
         label:"足额结清后转移设备所有权",sublabel:"届满或提前终止时，泰州方可选择补差额",labelCenter:[323,341],labelWidth:370,labelHeight:46},
      ]);
    return {id,caseId:id,code:"06998",name:"亿腾嘉和：泰州设备回购安排",mechanism:txCase.mechanism,stageLabel:stage.label,stageDate:stage.date,
      status:"active",archetype:"disposal",modality:"in_kind",caseArchetypeLabel:"设备回购",caseModalityLabel:"采购款抵扣 · 可选补差额",caseModalityShortLabel:"采购款抵扣",
      before:{title:"回购条款",nodes:[{id:"a",role:"buyer",name:buyer},{id:"b",role:"seller",name:seller}],equityLinks:[]},
      after:{title:"足额结清后",outcomeBadge:out,nodes:[{id:"br",role:"buyer",name:buyer}],equityLinks:[]},
      flows:[{id:"f1",kind:"asset",direction:"ltr",step:"1",fromLabel:buyer,toLabel:seller,headline:"采购款抵扣，回购上限人民币 1,100 万元",proposedOrTerminated:true},
       {id:"f2",kind:"asset",direction:"rtl",step:"2",fromLabel:seller,toLabel:buyer,headline:"足额结清后转移设备所有权",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"差额选择权",body:"协议届满或提前终止时，泰州方可支付尚未抵足的差额；若不选择回购，珠海方可收回设备。"}],
      evidenceLinks:[{documentId:did,pages:[4,5,8,12,13],label:"回购、抵扣、所有权与一次性关连交易"}],
      topology:top,compactSummary:"采购款抵扣 · 设备回购上限人民币 1,100 万元 · 结清后转移所有权",
    };
  }

  function buildTuoketuoAbsorption(txCase,documents) {
    const id="HK-00991-20261117-tuoketuo-ii-absorption", orig="YS-20261117-2d5e018f9044", sup="YS-20261123-96db35ddb7a1";
    const fields=[["listed_issuer_post_stake",54.71,"percent",3],["survivor_equity_appraisal",10017000000,"money",2],
      ["absorbed_equity_appraisal",3599000000,"money",2],["affiliate_post_stake",5.29,"percent",3]];
    if(txCase.id!==id||txCase.code!=="00991"||txCase.stage?.status!=="active"||txCase.stage.date!=="2026-11-17"||
      txCase.headlineKey!=="listed_issuer_post_stake"||
      documents?.[orig]?.url!=="https://www.hkexnews.hk/listedco/listconews/sehk/2026/1117/2026111701502_c.pdf"||
      documents?.[sup]?.url!=="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1123/2026112300696.pdf"||
      !txCase.processEvents?.some(e=>e.kind==="supplement"&&e.state==="actual"&&e.date==="2026-11-23"&&e.evidence?.documentId===sup)||
      !fields.every(([k,v,u,p])=>txCase.terms?.some(t=>t.key===k&&t.value===v&&t.unit===u&&
        t.currency===(u==="money"?"CNY":null)&&t.evidence?.documentId===orig&&t.evidence.pages?.includes(p))))return null;
    const a="托电公司",b="托二公司",m="托二原股东",o="大唐发电",out="工商变更完成后 · 大唐发电拟持 54.71%";
    const top=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:"active",leftTitle:"吸收合并 · 权益与资产负债",
      rightTitle:"合并后拟议架构",transitionLabel:"工商变更后",outcomeBadge:out}),[
        {id:"la",panel:"left",x:38,y:178,w:232,h:89,role:"buyer",title:a,subtitle:"存续公司 · 提供自身股权"},
        {id:"lm",panel:"left",x:392,y:143,w:219,h:81,role:"public",title:m,subtitle:"按折算安排取得存续方权益"},
        {id:"lb",panel:"left",x:392,y:327,w:219,h:83,role:"target",title:b,subtitle:"被吸收主体 · 完成后注销"},
        {id:"ro",panel:"right",x:734,y:115,w:280,h:86,role:"buyer",title:o,subtitle:"拟持 54.71%",code:"00991.HK"},
        {id:"ra",panel:"right",x:734,y:295,w:280,h:86,role:"target",title:a,subtitle:"托二原业务及资产负债由其承接"},
      ],[
        {id:"r",panel:"right",from:"ro",to:"ra",pctLabel:"拟持 54.71%",pillWidth:110,labelCenter:[874,247],dashed:true},
      ],[
        {id:"q",panel:"left",kind:"shares",step:"①",pathPoints:[[153,178],[153,91],[501,91],[501,143]],
          label:"存续方股权作为合并对价",sublabel:"依据两公司权益评估折算",labelCenter:[325,91],labelWidth:321,labelHeight:46},
        {id:"a",panel:"left",kind:"asset",step:"②",pathPoints:[[392,369],[150,369],[150,267]],
          label:"托二资产、负债、业务及人员并入",sublabel:"同一控制下 · 按账面价值入账",labelCenter:[259,369],labelWidth:248,labelHeight:46},
      ]);
    return {id,caseId:id,code:"00991",name:o,mechanism:txCase.mechanism,status:"active",stageLabel:txCase.stage.label,stageDate:txCase.stage.date,
      archetype:"ah_share_absorption",modality:"share_swap",caseArchetypeLabel:"同一控制下吸收合并",caseModalityLabel:"权益换入资产与负债",caseModalityShortLabel:"权益换入",
      before:{title:"合并双方",nodes:[{id:"a",role:"buyer",name:a},{id:"b",role:"target",name:b},{id:"m",role:"public",name:m}],equityLinks:[]},
      after:{title:"合并后拟议架构",outcomeBadge:out,nodes:[{id:"ro",role:"buyer",name:o},{id:"ra",role:"target",name:a}],equityLinks:[{from:"ro",to:"ra",label:"拟持 54.71%",pct:54.71,style:"dashed"}]},
      flows:[{id:"q",kind:"shares",direction:"ltr",step:"1",fromLabel:a,toLabel:m,headline:"存续方股权作为合并对价",proposedOrTerminated:true},
       {id:"a",kind:"asset",direction:"rtl",step:"2",fromLabel:b,toLabel:a,headline:"承接资产、负债、业务及人员",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"拟议股权比例",body:"大唐发电 54.71%，京能电力 25%，华能蒙电 15%，大唐京津冀 5.29%。"},
       {tag:"②",title:"权益评估",body:"托电人民币 100.17 亿元；托二人民币 35.99 亿元。天源以 2025 年末为基准采用收益法，天职香港核阅相关计算。"}],
      evidenceLinks:[{documentId:orig,pages:[2,3],label:"合并结构、评估值及股权比例"},{documentId:sup,pages:[2,3,4,5],label:"盈利预测相关报告"}],
      topology:top,compactSummary:"托电吸收托二 · 大唐发电拟持 54.71% · 双方无需额外支付",
    };
  }

  function buildCctBondAmendment(txCase,documents) {
    const id="HK-00138-20260911-cb-second-amendment", cir="YS-20261021-42caee12176d", proof="YS-20261118-d011c865bc22";
    const trueTerm=(k,v,u,p)=>txCase.terms?.some(t=>t.key===k&&t.value===v&&t.unit===u&&t.currency==="HKD"&&
      t.evidence?.documentId===cir&&t.evidence.pages?.includes(p));
    if(txCase.id!==id||txCase.code!=="00138"||txCase.category!=="debt_restructuring"||txCase.headlineKey!=="existing_principal"||
       txCase.stage?.status!=="closed"||txCase.stage.eventKind!=="debt_amendment_effective"||txCase.stage.date!=="2026-11-18"||
       documents?.[cir]?.url!=="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1021/2026102100330.pdf"||
       documents?.[proof]?.url!=="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1118/2026111800844.pdf"||
       !txCase.events?.some(e=>e.kind==="debt_amendment_effective"&&e.state==="actual"&&e.date==="2026-11-18"&&e.evidence?.documentId===proof)||
       !trueTerm("existing_principal",87920000,"money",8)||!trueTerm("treasure_goal_principal",83000000,"money",8)||
       !trueTerm("cheer_fame_principal",4920000,"money",8)||!trueTerm("amended_conversion_price",.27,"per_share",10)) return null;
    const issuer="中建富通",holders="现有债券持有人", outcome="2026.11.18 · 第二修订契据完成", status="closed";
    const top=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:475,status,leftTitle:"既有可转债修订",
      rightTitle:"修订后的债券条款",transitionLabel:"契据完成",outcomeBadge:outcome}),[
        {id:"l1",panel:"left",x:37,y:159,w:235,h:84,role:"listed",title:issuer,subtitle:"原发行人",code:"00138.HK"},
        {id:"l2",panel:"left",x:372,y:159,w:237,h:84,role:"creditor",title:holders,subtitle:"Treasure Goal 及 Cheer Fame"},
        {id:"r1",panel:"right",x:734,y:111,w:280,h:74,role:"listed",title:"到期：2028 年 12 月 31 日",subtitle:"原到期日为 2025 年 12 月 31 日"},
        {id:"r2",panel:"right",x:734,y:220,w:280,h:74,role:"creditor",title:"修订转股价：0.27 港元／股",subtitle:"行使转股权时适用"},
        {id:"r3",panel:"right",x:734,y:329,w:280,h:74,role:"target",title:"年息：4.5% 调整至 0%",subtitle:"自 2026 年 9 月 11 日起按修订条款计息"},
      ],[],[
        {id:"a",panel:"left",kind:"asset",step:"①",pathPoints:[[155,159],[155,91],[492,91],[492,159]],
          label:"第二修订契据",sublabel:"延长到期 · 修订转股价和票息",labelCenter:[323,91],labelWidth:306,labelHeight:46}
      ]);
    return {id,caseId:id,code:"00138",name:issuer,mechanism:txCase.mechanism,stageLabel:txCase.stage.label,stageDate:txCase.stage.date,status,
      archetype:"debt_restructuring",modality:"in_kind",caseArchetypeLabel:"旧可转债条款修订",caseModalityLabel:"既有债券 · 契据修订",caseModalityShortLabel:"契据修订",
      before:{title:"契据双方",nodes:[{id:"a",role:"listed",name:issuer},{id:"b",role:"creditor",name:holders}],equityLinks:[]},
      after:{title:"修订条款",outcomeBadge:outcome,nodes:[{id:"i",role:"listed",name:issuer}],equityLinks:[]},
      flows:[{id:"a",kind:"asset",direction:"ltr",step:"1",fromLabel:issuer,toLabel:holders,headline:"修订既有可转债条款"}],
      annotations:[{tag:"①",title:"通函所列未偿本金",body:"合计 8,792 万港元：Treasure Goal 8,300 万港元，Cheer Fame 492 万港元。"}],
      evidenceLinks:[{documentId:cir,pages:[8,9,10],label:"既有本金及修订条款"},{documentId:proof,pages:[1],label:"2026 年 11 月 18 日契据完成"}],
      topology:top,compactSummary:"旧债本金 8,792 万港元 · 延至 2028 年末 · 契据已完成",
    };
  }

  const REVIEWED_PN15_DRAFT={
  "HK-01125-20261117-shanghai-hk-plaza-reit": {
    "parent": "丽丰控股",
    "target": "上海香港广场部分商办资产",
    "structure": "资产拟纳入基础设施 REIT",
    "market": "上交所",
    "progress": "获港交所许可推进 · 尚待向内地提交",
    "code": "01125",
    "mechanism": "商业不动产REIT分拆",
    "stageDate": "2026-11-17",
    "stageLabel": "港交所准予推进 · 境内申请待提交",
    "targetLegalName": "上海香港广场部分资产（上海丽兴房地产有限公司）",
    "parentLegalName": "Lai Fung Holdings Limited",
    "documentId": "YS-20261117-615377283a09",
    "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1117/2026111700670.pdf",
    "pages": [
      1
    ],
    "section": null
  },
  "HK-01523-20260225-peplink-spin": {
    "parent": "珩湾科技",
    "target": "Peplink Holdings",
    "structure": "现有股份拟按比例分派",
    "market": "香港联交所",
    "progress": "获港交所许可推进 · 分派仍有条件",
    "code": "01523",
    "mechanism": "按比例分派现有股份并拟单独挂牌",
    "stageDate": "2026-02-25",
    "stageLabel": "港交所准予推进 · 有条件实物分派",
    "targetLegalName": "Peplink Holdings Limited",
    "parentLegalName": "Plover Bay Technologies Limited",
    "documentId": "YS-20260225-a458a3ff9807",
    "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0225/2026022500598.pdf",
    "pages": [
      2,
      6
    ],
    "section": null
  },
  "HK-01171-20260327-wubo-spin": {
    "parent": "兖矿能源",
    "target": "物泊科技",
    "structure": "拟分拆子公司发行 H 股",
    "market": "香港联交所",
    "progress": "已递交上市申请 · 拟独立挂牌",
    "code": "01171",
    "mechanism": "分拆子公司拟发行H股",
    "stageDate": "2026-06-30",
    "stageLabel": "已递交香港上市申请 · 拟挂牌",
    "targetLegalName": "Wubo Technology Co., Ltd.（物泊科技股份有限公司）",
    "parentLegalName": "Yankuang Energy Group Company Limited",
    "documentId": "YS-20260630-e2eca995b4d9",
    "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063003933.pdf",
    "pages": [
      1
    ],
    "section": null
  },
  "HK-00017-20260917-shanghai-nwt-reit": {
    "parent": "新世界发展",
    "target": "上海香港新世界大厦",
    "structure": "资产拟纳入基础设施 REIT",
    "market": "上交所",
    "progress": "上交所已受理 · 后续注册及挂牌待披露",
    "code": "00017",
    "mechanism": "商业不动产REIT分拆",
    "stageDate": "2026-09-21",
    "stageLabel": "上交所已受理申请 · 后续注册及挂牌待披露",
    "targetLegalName": "上海香港新世界大厦（上海 K11 商场及办公楼）",
    "parentLegalName": "New World Development Company Limited",
    "documentId": "YS-20260921-b9b4e2624e9e",
    "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0921/2026092100137.pdf",
    "pages": [
      3
    ],
    "section": null
  },
  "HK-01548-20260904-probio-spin": {
    "parent": "金斯瑞生物科技",
    "target": "Probio Technology",
    "structure": "拟分拆子公司全球发售",
    "market": "香港联交所",
    "progress": "获港交所许可推进分拆",
    "code": "01548",
    "mechanism": "分拆子公司拟在香港主板全球发售",
    "stageDate": "2026-09-04",
    "stageLabel": "港交所准予推进分拆",
    "targetLegalName": "Probio Technology Limited",
    "parentLegalName": "Genscript Biotech Corporation",
    "documentId": "YS-20260904-892b82d78786",
    "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0904/2026090400067.pdf",
    "pages": [
      1
    ],
    "section": null
  },
  "HK-02161-20260717-jpj-tcm-spin": {
    "parent": "健倍苗苗",
    "target": "JPJ (TCM)",
    "structure": "拟分拆子公司全球发售",
    "market": "香港联交所",
    "progress": "已递交上市申请 · 拟独立挂牌",
    "code": "02161",
    "mechanism": "分拆子公司拟在香港主板全球发售",
    "stageDate": "2026-07-17",
    "stageLabel": "已递交香港上市申请 · 拟挂牌",
    "targetLegalName": "JPJ (TCM) Limited",
    "parentLegalName": "JBM (Healthcare) Limited",
    "documentId": "YS-20260717-7ca880e0b807",
    "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0717/2026071701272.pdf",
    "pages": [
      1
    ],
    "section": null
  },
  "HK-02382-20260105-sunny-auto-spin": {
    "parent": "舜宇光学科技",
    "target": "舜宇智行科技",
    "structure": "拟分拆子公司发行 H 股",
    "market": "香港联交所",
    "progress": "2026 年 8 月 31 日公开新版申请文件",
    "code": "02382",
    "mechanism": "分拆子公司拟发行H股",
    "stageDate": "2026-08-31",
    "stageLabel": "新版上市申请已刊发 · 拟挂牌",
    "targetLegalName": "Ningbo Sunny Smart Autotech Company Limited（寧波舜宇智行科技股份有限公司）",
    "parentLegalName": "Sunny Optical Technology (Group) Company Limited",
    "documentId": "YS-20260831-1d116266e6b7",
    "url": "https://www1.hkexnews.hk/app/sehk/2026/108854/2026083102564_c.htm",
    "pages": [],
    "section": "申请版本索引：封面及申请人法律名称"
  },
  "HK-01530-20251120-mandi-spin": {
    "parent": "三生制药",
    "target": "Mandi Inc.",
    "structure": "拟有条件实物分派及子公司新股发售",
    "market": "香港联交所",
    "progress": "股东已批准有条件分派 · 后续实施待披露",
    "code": "01530",
    "mechanism": "母公司实物分派＋子公司新股全球发售",
    "stageDate": "2026-04-23",
    "stageLabel": "股东已批准有条件分派 · 待实施",
    "targetLegalName": "Mandi Inc.",
    "parentLegalName": "3SBio Inc.",
    "documentId": "YS-20260423-677f98e6ac33",
    "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0423/2026042302638.pdf",
    "pages": [
      1,
      2,
      3
    ],
    "section": null
  },
  "HK-03337-20220829-tall-inspection-spin": {
    "parent": "安东油田服务",
    "target": "T-ALL Inspection Group",
    "structure": "拟分拆子公司发行 H 股",
    "market": "香港联交所",
    "progress": "已递交上市申请 · 拟独立挂牌",
    "code": "03337",
    "mechanism": "分拆子公司拟发行H股",
    "stageDate": "2026-06-30",
    "stageLabel": "已递交香港上市申请 · 拟挂牌",
    "targetLegalName": "T-ALL Inspection Group Co., Ltd.",
    "parentLegalName": "Anton Oilfield Services Group",
    "documentId": "YS-20260630-bc027e662c16",
    "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0630/2026063003739.pdf",
    "pages": [
      2
    ],
    "section": null
  },
  "HK-09888-20251207-kunlunxin-spin": {
    "parent": "百度",
    "target": "昆仑芯",
    "structure": "拟分拆子公司全球发售",
    "market": "香港联交所",
    "progress": "已保密递交上市申请 · 拟独立挂牌",
    "code": "09888",
    "mechanism": "分拆子公司拟在香港主板全球发售",
    "stageDate": "2026-01-02",
    "stageLabel": "香港上市申请已保密递交",
    "targetLegalName": "Kunlunxin (Beijing) Technology Co., Ltd.",
    "parentLegalName": "Baidu, Inc.",
    "documentId": "YS-20260102-416599b77928",
    "url": "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0102/2026010200013.pdf",
    "pages": [
      1,
      2
    ],
    "section": null
  }
};
  function buildPn15PlannedStructure(row,documents) {
    if (!Object.hasOwn(REVIEWED_PN15_DRAFT,row.id))return null;
    const m=REVIEWED_PN15_DRAFT[row.id], source=documents?.[m.documentId];
    const stage=row.events?.find(e=>e.kind==="pn15_status_notice"&&e.state==="actual"&&e.date===m.stageDate);
    if(row.category!=="spin_off"||row.code!==m.code||row.headlineKey!==null||row.stage?.status!=="active"||
      row.stage.date!==m.stageDate||row.stage.label!==m.stageLabel||row.mechanism!==m.mechanism||
      source?.caseId!==row.id||source.date!==m.stageDate||source.url!==m.url||
      stage?.evidence?.documentId!==m.documentId||!m.pages.every(p=>stage.evidence.pages?.includes(p))||
      (m.section&&stage.evidence.section!==m.section)||row.parties?.["分拆标的"]!==m.targetLegalName||
      row.parties?.["上市母公司"]!==m.parentLegalName)return null;
    const a=m.parent,b=m.target,venue=m.market,status="active";
    const leftTitle="拟分拆结构",rightTitle="目的地及已披露阶段";
    const top=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:425,status,leftTitle,rightTitle,
      transitionLabel:"拟独立挂牌",outcomeBadge:m.progress}),[
        {id:"li",panel:"left",x:37,y:165,w:241,h:83,role:"listed",title:a,subtitle:"上市母公司",code:m.code+".HK"},
        {id:"la",panel:"left",x:372,y:165,w:240,h:83,role:"target",title:b,subtitle:"拟分拆标的"},
        {id:"rm",panel:"right",x:734,y:112,w:280,h:82,role:"buyer",title:venue,subtitle:"拟上市目的地"},
        {id:"rp",panel:"right",x:734,y:253,w:280,h:84,role:"target",title:b,subtitle:"拟独立挂牌"},
      ],[],[
        {id:"p",panel:"left",step:"①",kind:"asset",pathPoints:[[157,165],[157,92],[492,92],[492,165]],
         label:m.structure,sublabel:"按已披露分拆方案",labelCenter:[323,92],labelWidth:368,labelHeight:46},
      ]);
    return {id:row.id,caseId:row.id,code:row.code,name:a,mechanism:row.mechanism,status,
      stageLabel:m.stageLabel,stageDate:m.stageDate,archetype:"spin_off",modality:"in_kind",
      caseArchetypeLabel:venue==="上交所"?"拟议 REIT 分拆":"拟议分拆",
      caseModalityLabel:"拟独立挂牌",caseModalityShortLabel:"拟独立挂牌",
      before:{title:leftTitle,nodes:[{id:"i",role:"listed",name:a},{id:"a",role:"target",name:b}],equityLinks:[]},
      after:{title:rightTitle,outcomeBadge:m.progress,nodes:[{id:"m",role:"buyer",name:venue},{id:"p",role:"target",name:b}],equityLinks:[]},
      flows:[{id:"1",kind:"asset",direction:"ltr",step:"1",fromLabel:a,toLabel:b,headline:m.structure,proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"拟分拆法律主体",body:m.targetLegalName}],evidenceLinks:[{documentId:m.documentId,pages:m.pages,label:"已披露分拆阶段"}],
      topology:top,compactSummary:m.progress,
    };
  }

  // The agreement completed before the later conditional offer lapsed. Render each leg independently.
  function buildWkTwoLegOffer(c, documents) {
    const ann = "YS-20260804-1bd4df06877d", result = "YS-20261002-05e8bf78644d";
    const buyer = c.parties?.["买方／要约人"], seller = c.parties?.["出售方"];
    const term = (key, val) => c.terms?.some(t => t.key === key && t.value === val);
    if (buyer !== "WellLuck Limited" || seller !== "WK (BVI) Limited" ||
        c.stage?.eventKind !== "lapsed" || c.stage.date !== "2026-10-02" ||
        !c.events?.some(e => e.kind === "control_completion" && e.state === "actual" && e.date === "2026-07-30" && e.evidence?.documentId === ann) ||
        documents?.[ann]?.url !== "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0804/2026080402199.pdf" ||
        documents?.[result]?.url !== "https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1002/2026100203225.pdf" ||
        !term("post_offer_buyer_holding",39) || !term("post_offer_public_holding",61) ||
        !term("offer_voting_threshold",50) || !term("control_cash",70200000) || !term("control_shares",780000000) ||
        !term("valid_tenders_at_failed_close",30000) || !term("offer_shares_acquired",0)) return null;
    const name = "泓基集团（控股）";
    const stageLabel = c.stage.label, outcomeBadge = "WellLuck 持股 39% · 公众持股 61%";
    const leftTitle = "协议交割与余股要约", rightTitle = "要约失效后实际持股";
    const listed = {id:"listed",role:"listed",name,code:"02535.HK",tier:1};
    const buyerNode={id:"buyer",role:"buyer",name:buyer,sublabel:"Chan Wing Keung 全资拥有",tier:0};
    const sellerNode={id:"seller",role:"seller",name:seller,sublabel:"协议出售方",tier:0};
    const publicNode={id:"public",role:"public",name:"公众股东",tier:0};
    const link=(from,to,pct,style)=>({from,to,pct,label:pct+"%",style});
    const cash="现金 7,020 万港元", shares="39% 股权", offer="余股现金要约失效";
    const flow=(id,kind,step,fromLabel,toLabel,headline,subline,proposedOrTerminated,direction="ltr")=>
      ({id,kind,step,fromLabel,toLabel,headline,subline,proposedOrTerminated,direction});
    return {
      id:c.id,caseId:c.id,code:c.code,name,archetype:"offer",modality:"cash",status:"terminated",
      stageLabel,stageDate:c.stage.date,mechanism:c.mechanism,caseArchetypeLabel:"协议收购及强制要约",
      before:{title:leftTitle,nodes:[buyerNode,sellerNode,publicNode,listed],equityLinks:[link("seller","listed",39,"solid"),link("public","listed",61,"dashed")]},
      after:{title:rightTitle,nodes:[buyerNode,publicNode,listed],equityLinks:[link("buyer","listed",39,"solid"),link("public","listed",61,"dashed")],outcomeBadge},
      flows:[flow("wk-cash","cash","①",buyer,seller,cash,"每股 HK$0.09 · 7 月 30 日已付",false),
        flow("wk-shares","shares","①",seller,buyer,shares,"7.8 亿股 · 7 月 30 日已过户",false,"rtl"),
        flow("wk-offer","cash","②",buyer,"公众股东",offer,"有效接纳 3 万股 · 实际过户 0 股",true)],
      annotations:[
        {tag:"①",title:"协议收购",body:"WellLuck Limited 向 WK (BVI) Limited 买入 7.8 亿股（39%），现金 7,020 万港元，7 月 30 日交割。卖方交割后持股 0%。"},
        {tag:"②",title:"余股要约",body:"10 月 2 日有效接纳 3 万股。已持股与有效接纳合计 39.0015%，未达超过 50% 表决权的生效条件，接纳股份未过户。",ruleCode:"TC:26.1"}],
      evidenceLinks:[{documentId:ann,pages:[2,6,7,21],label:"协议交割公告"},{documentId:result,pages:[2,3],label:"要约结果公告"}],
      compactSummary:"泓基集团 · 39% 股权已交割 · HKD 7,020万 · 余股要约失效",
      topology:buildOfferTopology({
        status:"terminated",controlCompleted:true,leftTitle,rightTitle,transitionLabel:"实际持股",
        buyerName:buyer,buyerSub:"Chan Wing Keung 全资拥有",buyerBadge:"7 月 30 日完成收购",
        sellerName:seller,sellerSub:"出售方 · 交割后持股 0%",
        publicName:"公众股东",publicSub:"余股要约范围 12.2 亿股",listedName:name,code:"02535.HK",
        beforeSellerPct:"39% · 7.8 亿股",beforePublicPct:"61% · 12.2 亿股",
        step1CashLabel:cash,step1CashSub:"HK$0.09/股 · 7 月 30 日交割",step1SharesLabel:"39% 股权",
        step2MgoLabel:"10 月 2 日 · 余股现金要约失效",step2MgoSub:"有效接纳 3 万股 · 实际过户 0 股",
        afterBuyerSub:"7.8 亿股 · 已交割",afterPublicName:"公众股东",afterPublicSub:"12.2 亿股",afterBuyerPct:"39% 已交割",afterPublicPct:"61% 公众持股",outcomeBadge}),
    };
  }


  function buildCtghkmIntroduction(row,docs){
    const id="HK-00308-20260520-ctg-hkm-spin", announce="YS-20261030-9ecf2791baa8", ev="YS-20261126-fd5585c465f7";
    if(row.id!==id||row.stage?.status!=="closed"||row.stage.eventKind!=="listing"||row.stage.date!=="2026-11-26"||docs?.[ev]?.url!=="https://www.hkex.com.hk/services/trading/securities/trading-news/newly-listed-securities?sc_lang=en"||!row.events?.some(e=>e.kind==="listing"&&e.state==="actual"&&e.evidence?.documentId===ev)||!row.terms?.some(t=>t.key==="distributed_shares"&&t.value===1384158427&&t.evidence?.documentId===announce))return null;
    const parent="香港中旅", holder="合资格母公司股东", child="中旅港澳", done="2026 年 11 月 26 日 · 已介绍上市";
    const box=(id,panel,x,y,w,role,title,subtitle,code)=>({id,panel,x,y,w,h:78,role,title,subtitle,code});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:360,status:"closed",leftTitle:"分拆方式 · 实物分派现有股份",rightTitle:"港交所主板 · 介绍上市",transitionLabel:"11 月 26 日",outcomeBadge:done}),[
      box("L_parent","left",38,125,175,"listed",parent,"分拆上市母公司","00308.HK"),box("L_holder","left",432,125,176,"public",holder,"每持 4 股母公司股份"),
      box("R_child","right",748,125,270,"listed",child,"介绍上市 · 无发售募资","01821.HK")
    ],[],[{id:"distribution",panel:"left",kind:"shares",step:"①",pathPoints:[[213,166],[432,166]],labelCenter:[323,166],labelWidth:160,labelHeight:40,label:"实物分派 1 股中旅港澳",sublabel:"按所持母公司股份 4 比 1"}]);
    return {id,caseId:id,code:row.code,name:parent,mechanism:row.mechanism,stageLabel:done,stageDate:row.stage.date,archetype:"spin_off",modality:"in_kind",status:"closed",caseArchetypeLabel:"PN15 分拆 · 介绍上市",caseModalityLabel:"实物分派 · 无募资",caseModalityShortLabel:"介绍上市",
      before:{title:"分拆安排",nodes:[{id:"p",role:"listed",name:parent},{id:"h",role:"public",name:holder}],equityLinks:[]},after:{title:"主板挂牌",nodes:[{id:"c",role:"listed",name:child}],equityLinks:[],outcomeBadge:done},
      flows:[{id:"distribution",kind:"shares",direction:"ltr",fromLabel:parent,toLabel:holder,headline:"4 股母公司股份获分派 1 股中旅港澳"}],
      annotations:[{tag:"①",title:"股份来源",body:"分派范围为中旅港澳 1,384,158,427 股现有股份，不设公开或国际新股发售。"}],evidenceLinks:[{documentId:announce,pages:[13,106,212],label:"介绍上市文件 · 分派比例与股份数"},{documentId:ev,pages:[],label:"港交所 · 新上市证券"}],compactSummary:"香港中旅按 4 比 1 实物分派 · 中旅港澳已介绍上市 · 无发售募资",topology};
  }
  function buildOrientalAcquisition(c,docs) {
    const id="HK-03958-20260506-shanghai-securities",a="YS-20261125-9ff064851fca",d="YS-20261030-819ccc6f36b2",r="YS-20261118-0b6542517441",w="YS-20260824-4368788fe9ca";
    if(c.code!=="03958"||c.category!=="major_acquisition"||c.stage?.status!=="approved"||c.stage?.eventKind!=="asset_transfer"||c.stage?.date!=="2026-11-24"||!c.processEvents?.some(e=>e.state==="actual"&&e.kind==="asset_transfer"&&e.date===c.stage.date&&e.evidence?.documentId===a)||[...(c.events||[]),...(c.processEvents||[])].some(e=>e.state==="actual"&&(e.date>"2026-11-24"||["completion","closed","settlement"].includes(e.kind))))return null;
    for(const [doc,url] of [[a,"https://big5.sse.com.cn/site/cht/www.sse.com.cn/disclosure/listedinfo/announcement/c/new/2026-11-25/600958_20261125_VYBI.pdf"],[d,"https://www.hkexnews.hk/listedco/listconews/sehk/2026/1030/2026103002175_c.pdf"],[r,"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1118/2026111801509.pdf"],[w,"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0824/2026082402029.pdf"]])if(docs?.[doc]?.caseId!==id||docs[doc].url!==url)return null;
    for(const [key,val,unit,ccy,doc] of [["consideration",25120000000,"money","CNY",d],["cash_consideration",1570000000,"money","CNY",d],["share_consideration",23550000000,"money","CNY",d],["consideration_shares",2288629735,"shares",undefined,r]])if(!c.terms?.some(t=>t.key===key&&t.value===val&&t.unit===unit&&t.currency===ccy&&t.evidence?.documentId===doc))return null;
    const name="东方证券",target="上海证券",outcome="标的已过户 · 现金与代价股份待交收";
    const box=(id,x,y,title,subtitle,role,panel="left")=>({id,panel,x,y,w:180,h:75,title,subtitle,role});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:500,status:"approved",leftTitle:"对价待交收 · 人民币 251.2 亿元",rightTitle:"标的股权 · 已过户",transitionLabel:"11 月 24 日",outcomeBadge:outcome}),
     [box("L_b",34,179,name,"买方 · A＋H","buyer"),box("L_cash",433,77,"国泰海通","唯一现金收款方","seller"),box("L_share",433,312,"五家交易对方","含国泰海通","seller"),box("R_b",767,80,name,"买方","listed","right"),box("R_t",767,304,target,"已成为直接全资子公司","target","right")],
     [{id:"E_after",panel:"right",from:"R_b",to:"R_t",pctLabel:"直接持股 100%",labelCenter:[857,225],pillWidth:130}],
     [{id:"A_cash",step:"①",panel:"left",kind:"cash",label:"待付现金 15.7 亿元",labelCenter:[343,113],labelWidth:158,labelHeight:35,pathPoints:[[214,197],[252,197],[252,113],[433,113]]},
      {id:"A_share",step:"②",panel:"left",kind:"shares",label:"待发行代价 A 股",labelCenter:[343,351],labelWidth:158,labelHeight:35,pathPoints:[[214,234],[252,234],[252,351],[433,351]]}]);
    return {id,caseId:id,code:c.code,name,mechanism:c.mechanism,archetype:"acquisition",modality:"mixed",status:"approved",stageLabel:outcome,stageDate:c.stage.date,caseModalityShortLabel:"发行 A 股＋现金",
      before:{title:"对价待交收",nodes:[{id:"b",role:"buyer",name},{id:"t",role:"target",name:target}],equityLinks:[]},
      after:{title:"股权过户",nodes:[{id:"b2",role:"buyer",name},{id:"t2",role:"target",name:target}],equityLinks:[{from:"b2",to:"t2",label:"直接持股 100%",pct:100,style:"solid"}],outcomeBadge:outcome},
      flows:[{id:"cash",kind:"cash",direction:"ltr",fromLabel:name,toLabel:"国泰海通",step:"1",headline:"待付现金 15.7 亿元"},{id:"shares",kind:"shares",direction:"ltr",fromLabel:name,toLabel:"五家交易对方",step:"2",headline:"待发行 2,288,629,735 股 A 股"}],
      annotations:[{tag:"①",title:"股份对价",body:"百联集团、国泰海通、上海国际集团投资、上海国际集团、上海城投集团合计拟获发 2,288,629,735 股 A 股，对价人民币 235.5 亿元；除息后发行价 10.29 元／股。"},
      {tag:"②",title:"现金及新增股份",body:"现金人民币 15.7 亿元待向国泰海通支付；代价股份仍待发行、登记及上市。"},
      {tag:"③",title:"重大收购及清洗豁免",body:"香港证监会执行人员于 8 月 21 日有条件授出清洗豁免；8 月 24 日相关股东决议通过。"}],
      evidenceLinks:[{documentId:a,pages:[1,2],label:"上交所 · 标的股权过户及待办"},{documentId:d,pages:[14,15,37,39],label:"重组报告书 · 五家交易对方及对价"},{documentId:r,pages:[1],label:"同意注册 · 代价 A 股"},{documentId:w,pages:[17,18],label:"股东投票及清洗豁免"}],topology,compactSummary:"上海证券 100% 已过户 · 代价 A 股与现金待交收"};
  }


  function buildIsuzuVerified(c,docs){
    const d='YS-20261124-5df5dde9d854', q='YS-20261111-1dce71300d70', o='YS-20261009-0cf6d1cb9a80', id='HK-01122-20261009-isuzu-engine';
    const a=(key,value,doc)=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===doc);
    if(c.id!==id||c.category!=='major_acquisition'||c.stage?.status!=='active'||c.stage.date!=='2026-11-24'||c.stage.eventKind!=='dispatch'||c.parties?.['买方']!=='庆铃汽车股份有限公司'||c.parties?.['卖方']!=='庆铃汽车（集团）有限公司'||docs?.[d]?.url!=='https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1124/2026112400615.pdf'||!a('price',661362919.5,q)||!a('original',659870026.65,o)||!a('acquired',30.43,d)||!a('pre_stake',19.57,d)||!a('post_stake',50,d))return null;
    const b='庆铃汽车股份',s='庆铃汽车集团',z='五十铃汽车',i='五十铃（中国）发动机',out='通函已发布 · 待独立股东表决';
    const box=(id,panel,x,y,w,role,title,subtitle)=>({id,panel,x,y,w,h:90,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:490,status:'active',leftTitle:'签约安排',rightTitle:'如完成 · 各持 50%',transitionLabel:'如完成',outcomeBadge:out}),[
      box('L_b','left',35,129,180,'buyer',b,'现持约 19.57%'),box('L_s','left',425,129,180,'seller',s,'出售约 30.43%'),
      box('R_b','right',690,112,172,'buyer',b,'拟持 50%'),box('R_z','right',886,112,164,'buyer',z,'继续持有 50%'),box('R_i','right',768,322,222,'target',i,'合营 · 共同控制')],[],[
      {id:'p',panel:'left',kind:'cash',step:'①',pathPoints:[[215,155],[425,155]],labelCenter:[320,155],labelWidth:165,labelHeight:33,label:'拟付人民币约 6.6 亿元'},
      {id:'s',panel:'left',kind:'shares',step:'②',pathPoints:[[425,195],[215,195]],labelCenter:[320,195],labelWidth:158,labelHeight:33,label:'约 30.43% 股权'},
      {id:'b',panel:'right',kind:'shares',step:'③',pathPoints:[[776,202],[776,268],[815,268],[815,322]],labelCenter:[776,238],labelWidth:128,labelHeight:34,label:'19.57% → 50%'},
      {id:'z',panel:'right',kind:'shares',step:'④',pathPoints:[[968,202],[968,268],[944,268],[944,322]],labelCenter:[968,238],labelWidth:105,labelHeight:34,label:'维持 50%'}
    ]);
    const node=(id,role,name)=>({id,role,name});
    return {id,caseId:id,code:c.code,name:i,mechanism:c.mechanism,stageLabel:c.stage.label,stageDate:c.stage.date,archetype:'acquisition',modality:'cash',status:'active',caseArchetypeLabel:'主要及关连交易',caseModalityShortLabel:'现金收购股权',before:{title:'签约安排',nodes:[node('b','buyer',b),node('s','seller',s)],equityLinks:[]},after:{title:'如完成',outcomeBadge:out,nodes:[node('b','buyer',b),node('z','buyer',z),node('i','target',i)],equityLinks:[{from:'b',to:'i',label:'拟持 50%',pct:50,style:'dashed'},{from:'z',to:'i',label:'维持 50%',pct:50,style:'dashed'}]},flows:[{id:'p',kind:'cash',direction:'ltr',fromLabel:b,toLabel:s,headline:'拟付约人民币 6.6 亿元',proposedOrTerminated:true},{id:'s',kind:'shares',direction:'rtl',fromLabel:s,toLabel:b,headline:'拟转让约 30.43% 股权',proposedOrTerminated:true}],annotations:[{tag:'①',title:'更正后的对价',body:'对价约人民币 6.6 亿元，依约扣除相应税项后支付。'},{tag:'②',title:'完成后共同控制',body:'庆铃汽车股份由约 19.57% 增至 50%，与五十铃汽车共同控制合营公司，采用权益法核算。'},{tag:'③',title:'独立股东表决',body:'通函列明临时股东大会定于 12 月 24 日；庆铃集团及其联系人须放弃表决。'}],evidenceLinks:[{documentId:d,pages:[9,10,20,21,23],label:'通函 · 股权、对价及表决'},{documentId:q,pages:[2],label:'11 月 11 日更正公告'}],compactSummary:'条件收购约 30.43% · 人民币约 6.6 亿元 · 完成后各持 50%、共同控制',topology};
  }
  function buildSanRexScheme(c, docs) {
    const id="HK-01521-20261109-sanrex",d="YS-20261109-4f78ce1ae2cd",s="YS-20261125-5d25a1cd2a0f";
    if(c.id!==id||c.code!=="01521"||c.category!=="scheme"||c.stage?.date!=="2026-11-25"||c.stage?.status!=="active"||c.stage?.eventKind!=="supplement"||c.parties?.["要约方"]!=="SanRex Limited")return null;
    for(const [doc,path] of [[d,"1109/2026110900893"],[s,"1125/2026112501641"]])if(docs?.[doc]?.caseId!==id||docs[doc].url!=="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/"+path+".pdf")return null;
    for(const [key,val,unit,ccy,doc] of [["per_scheme_share",2.37,"per_share","HKD",d],["scheme_cash",2026069185,"money","HKD",d],["earnout_cap_usd",75000000,"money","USD",d],["concert_pct_before_scheme",72.84,"percent",null,s],["disinterested_pct_before_scheme",27.16,"percent",null,s],["disinterested_shares_before_scheme",553733061,"shares",null,s]])if(!c.terms?.some(t=>t.key===key&&t.value===val&&t.unit===unit&&t.currency===ccy&&t.evidence?.documentId===doc))return null;
    const o="SanRex Limited",n="方达控股",outcome="拟私有化 · 尚待先决条件及计划生效";
    const box=(id,x,y,title,subtitle,role,panel="left")=>({id,panel,x,y,w:191,h:80,title,subtitle,role});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:515,status:"active",leftTitle:"计划股份的两种注销对价",rightTitle:"计划生效后（拟）",transitionLabel:"若生效",outcomeBadge:outcome}),
    [box("L_offer",36,182,o,"要约人","buyer"),box("L_cash",430,82,"杭州泰格及其他现金股东","每股收取现金注销价","public"),box("L_roll",430,318,"香港泰格、李博士及其信托","以注销价缴足所持要约人股份","public"),box("R_offer",768,98,o,"拟直接持有全部股份","buyer","right"),box("R_issuer",768,312,n,"拟撤销上市 · 01521.HK","target","right")],
    [{id:"E_after",panel:"right",from:"R_offer",to:"R_issuer",pctLabel:"拟持股 100%",labelCenter:[864,245],pillWidth:112}],
    [{id:"A_cash",panel:"left",step:"①",kind:"cash",pathPoints:[[227,201],[261,201],[261,122],[430,122]],label:"现金 2.37 港元/股",labelCenter:[345,122],labelWidth:148,labelHeight:36},
     {id:"A_equity",panel:"left",step:"②",kind:"shares",pathPoints:[[227,243],[261,243],[261,358],[430,358]],label:"滚存计价 2.37 港元/股",labelCenter:[345,358],labelWidth:158,labelHeight:36}]);
    return {id,caseId:id,code:c.code,name:n,mechanism:c.mechanism,status:"active",stageLabel:c.stage.label,stageDate:c.stage.date,archetype:"scheme",modality:"mixed",caseModalityShortLabel:"现金注销＋股权滚存",before:{title:"提案公布时",nodes:[{id:"o",role:"buyer",name:o},{id:"i",role:"listed",name:n}],equityLinks:[]},after:{title:"若计划生效",outcomeBadge:outcome,nodes:[{id:"o2",role:"buyer",name:o},{id:"i2",role:"target",name:n}],equityLinks:[{from:"o2",to:"i2",label:"拟持股 100%",pct:100,style:"dashed"}]},
      flows:[{id:"cash",kind:"cash",direction:"ltr",step:"1",fromLabel:o,toLabel:"杭州泰格及其他现金股东",headline:"现金 2.37 港元/股"},{id:"roll",kind:"shares",direction:"ltr",step:"2",fromLabel:o,toLabel:"香港泰格、李博士及其信托",headline:"同价缴足要约人股份"}],
      annotations:[{tag:"①",title:"提案公布日持股（11 月 25 日澄清）",body:"要约人、财团成员及一致行动人士合计 72.84%；无利害关系股东 5.54 亿股，占 27.16%。"},{tag:"②",title:"港元现金需求",body:"按公告期权行使等假设，上限 20.3 亿港元。"},{tag:"③",title:"附条件业绩付款",body:"计划生效且标的业务收入、经调整 EBITDA 利润率达标时，全体记录日计划股东及接受期权要约者另按股数获付。2026 年上限 5,000 万美元；2027 年上限 2,500 万美元。"}],
      evidenceLinks:[{documentId:d,pages:[2,16,17],label:"联合公告 · 注销、滚存及业绩付款"},{documentId:s,pages:[2,3],label:"联合澄清 · 提案公布日股权结构"}],topology,compactSummary:"现金注销或股权滚存 · 2.37 港元/股 · 另设附条件业绩付款"};
  }


  function buildMaoyeVerified(c,docs){
    const d='YS-20260929-94d290c5bc2f', id='HK-00848-20260929-wf-scheme', u='YS-20261120-f2d5d8e98a97', e='YS-20261020-591eda3ab265';
    if(c.id!==id || c.code!=='00848' || c.category!=='scheme' || c.stage?.status!=='active' || c.stage.eventKind!=='dispatch_extension' || c.stage.date!=='2026-10-29' || docs?.[u]?.url!=='https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1120/2026112001717.pdf' || docs?.[e]?.url!=='https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1020/2026102001543.pdf' || !c.processEvents?.some(x=>x.kind==='dispatch_extension' && x.date==='2026-10-29' && x.state==='actual' && x.evidence?.documentId===u) || c.parties?.['要约方']!=='W.F Group Limited' || docs?.[d]?.url!=='https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0929/2026092902197.pdf' || Object.entries({scheme_cash_max:185187808,scheme_cash_price:0.208,scheme_shares:890326000,rollover_shares:4250000000}).some(([key,value])=>!c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===d))) return null;
    const b='W.F Group Limited', h='计划股东', r='继续持股股东', i='茂业国际', out='建议阶段 · 须待计划生效';
    const box=(id,panel,x,y,w,role,title,subtitle)=>({id,panel,x,y,w,h:80,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:490,status:'active',leftTitle:'注销安排',rightTitle:'如计划生效 · 股权分布',transitionLabel:'如生效',outcomeBadge:out}),[
      box('L_a','left',35,120,180,'buyer',b,'要约人'),box('L_h','left',425,120,180,'public',h,'拟注销 8.9 亿股'),box('L_r','left',35,315,180,'public',r,'42.5 亿股继续持有'),
      box('R_a','right',690,112,176,'buyer',b,'拟持 17.32%'),box('R_r','right',888,112,164,'public',r,'拟持 82.68%'),box('R_i','right',795,322,184,'listed',i,'拟撤销上市')],[],[
      {id:'cash',panel:'left',kind:'cash',step:'①',pathPoints:[[215,160],[425,160]],labelCenter:[320,160],labelWidth:155,labelHeight:42,label:'拟付 HK$0.208 / 股',sublabel:'最高 1.9 亿港元'},
      {id:'a',panel:'right',kind:'shares',step:'②',pathPoints:[[782,192],[782,268],[842,268],[842,322]],labelCenter:[782,235],labelWidth:105,labelHeight:34,label:'拟获等数新股'},
      {id:'r',panel:'right',kind:'shares',step:'③',pathPoints:[[970,192],[970,268],[934,268],[934,322]],labelCenter:[970,235],labelWidth:95,labelHeight:34,label:'股份保留'}
    ]);
    const node=(id,role,name)=>({id,role,name});
    return {id,caseId:id,code:c.code,name:i,mechanism:c.mechanism,stageLabel:c.stage.label,stageDate:c.stage.date,archetype:'scheme',modality:'cash',status:'active',caseArchetypeLabel:'协议安排私有化',caseModalityShortLabel:'现金注销／继续持股',before:{title:'已公告安排',nodes:[node('a','buyer',b),node('h','public',h),node('r','public',r)],equityLinks:[]},after:{title:'如计划生效',outcomeBadge:out,nodes:[node('a','buyer',b),node('r','public',r),node('i','listed',i)],equityLinks:[{from:'a',to:'i',label:'拟持 17.32%',pct:17.32,style:'dashed'},{from:'r',to:'i',label:'拟持 82.68%',pct:82.68,style:'dashed'}]},flows:[{id:'cash',kind:'cash',direction:'ltr',fromLabel:b,toLabel:h,headline:'拟付每股 0.208 港元',proposedOrTerminated:true}],annotations:[{tag:'①',title:'注销及发行新股',body:'如计划生效，890,326,000 股计划股份注销，茂业国际向要约人发行同等数量的新股。'},{tag:'②',title:'继续持股',body:'42.5 亿股不予注销；黄先生及茂业百货届时分别持有约 0.97% 及 81.71%。'},{tag:'③',title:'计划文件寄发',body:'执行人员于 10 月 29 日批准延至 2027 年 1 月 15 日或之前寄发，11 月 20 日公告。'}],evidenceLinks:[{documentId:d,pages:[2,3,18],label:'联合公告 · 注销价及生效后股权'},{documentId:u,pages:[2],label:'批准延后寄发 · 11 月 20 日公告'}],compactSummary:'拟付每股 0.208 港元 · 如生效要约人持 17.32%，继续持股股东持 82.68%',topology};
  }

  function buildCrystalVerified(c,docs){
    const d='YS-20260927-fa12de75eac3', id='HK-01086-20260927-crystal-aurora', u='YS-20261123-b5269daab4a1';
    if(c.id!==id || c.code!=='01086' || c.category!=='scheme' || c.stage?.status!=='active' || c.stage.eventKind!=='dispatch_extension' || c.stage.date!=='2026-11-23' || c.parties?.['要约方']!=='Crystal Aurora International Ltd.' || docs?.[d]?.url!=='https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0927/2026092700021.pdf' || docs?.[u]?.url!=='https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1123/2026112301232.pdf' || Object.entries({scheme_cash_max:1322255626.5,scheme_price:1.5,existing_scheme_shares:790136251,all_exercised_scheme_shares:881503751,no_exercise_options_cash:63850343}).some(([key,value])=>!c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===d))) return null;
    const b='Crystal Aurora International Ltd.', h='计划股东', o='获要约购股权持有人', i='好孩子国际', out='11 月 23 日进展 · 计划待生效';
    const box=(id,panel,x,y,w,role,title,subtitle)=>({id,panel,x,y,w,h:80,role,title,subtitle});
    const arr=(id,panel,kind,step,x1,x2,y,label,sublabel)=>({id,panel,kind,step,pathPoints:[[x1,y],[x2,y]],labelCenter:[(x1+x2)/2,y],labelWidth:Math.abs(x1-x2)-24,labelHeight:44,label,sublabel});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:566,status:'active',leftTitle:'现金对价 · 视购股权行使而定',rightTitle:'继续持股及回购',transitionLabel:'如生效',outcomeBadge:out}),[
      box('L_a','left',35,212,230,'buyer',b,'要约人'),box('L_h','left',438,102,172,'public',h,'股份注销'),box('L_o','left',438,322,172,'public',o,'购股权要约'),
      box('R_i','right',715,100,312,'listed',i,'其后回购要约人获发股份'),box('R_o','right',715,270,312,'buyer',b,'以贷款义务获承接为对价'),box('R_r','right',715,410,312,'public','要约人集团其他成员及继续持股股东','回购后合计持有 100%')],[],[
      {...arr('cash','left','cash','①',265,438,230,'拟付 HK$1.50 / 股','最高约 13.2 亿港元'),pathPoints:[[265,230],[390,230],[390,142],[438,142]]},
      {...arr('options','left','cash','②',265,438,280,'拟付购股权对价','约 6,385 万港元'),pathPoints:[[265,280],[390,280],[390,362],[438,362]]},
      {id:'repurchase',panel:'right',kind:'shares',step:'③',pathPoints:[[868,270],[868,180]],labelCenter:[868,225],labelWidth:156,labelHeight:42,label:'回购并注销新股',sublabel:'发行人承接融资贷款义务'}
    ]);
    const node=(id,role,name)=>({id,role,name});
    return {id,caseId:id,code:c.code,name:i,mechanism:c.mechanism,stageLabel:'再次申请延后寄发 · 12 月 4 日期限待正式批准',stageDate:c.stage.date,archetype:'scheme',modality:'cash',status:'active',caseArchetypeLabel:'协议安排私有化',caseModalityShortLabel:'现金注销／继续持股',before:{title:'已公告安排',nodes:[node('b','buyer',b),node('h','public',h),node('o','public',o)],equityLinks:[]},after:{title:'如计划生效及回购完成',outcomeBadge:out,nodes:[node('r','public','要约人集团其他成员及继续持股股东'),node('i','listed',i)],equityLinks:[{from:'r',to:'i',label:'合计持有 100%',pct:100,style:'dashed'}]},flows:[{id:'cash',kind:'cash',direction:'ltr',fromLabel:b,toLabel:h,headline:'拟付每股 1.50 港元',proposedOrTerminated:true},{id:'options',kind:'cash',direction:'ltr',fromLabel:b,toLabel:o,headline:'按购股权行使情景',proposedOrTerminated:true}],annotations:[{tag:'①',title:'全部行使',body:'按 881,503,751 股计划股份每股 1.50 港元，最高现金 1,322,255,626.50 港元；该情景无购股权现金款。'},{tag:'②',title:'全部不行使',body:'注销 790,136,251 股约需 11.9 亿港元；购股权要约另需约 6,385.0 万港元。'},{tag:'③',title:'继续持股与关联购股权',body:'继续持股不兑现金；关联购股权持有人承诺不行使，计划生效后以发行股份补偿期权失效。发行人其后拟回购并注销要约人获发的全部新股，并承接融资贷款义务。'},{tag:'④',title:'计划文件寄发',body:'11 月 23 日公告：开曼法院指示聆讯安排于 11 月 26 日。执行人员表示倾向同意将寄发期限延至 12 月 4 日，当时尚未正式批准。'}],evidenceLinks:[{documentId:d,pages:[2,3,12,13,17,18],label:'联合公告 · 注销、购股权、继续持股及回购'},{documentId:u,pages:[2],label:'11 月 23 日进展公告'}],compactSummary:'拟付每股 1.50 港元 · 购股权按行使情景分列 · 生效后拟回购新股',topology};
  }

  function buildSkyworthScheme(c, docs) {
    const id="HK-00751-20260120-scheme-buyback-photovoltaic",d="YS-20260120-299a029fa494",s="YS-20261116-cc4eec1f8b25";
    if(c.code!=="00751"||c.category!=="scheme"||c.stage?.status!=="active"||c.stage?.date!=="2026-01-20"||c.parties?.["回购主体"]!=="Skyworth Group Limited"||!c.processEvents?.some(e=>e.date==="2026-11-16"&&e.state==="actual"&&e.evidence?.documentId===s)||[...(c.events||[]),...(c.processEvents||[])].some(e=>e.state==="actual"&&e.date>"2026-11-16"))return null;
    for(const [doc,path] of [[d,"0120/2026012000750"],[s,"1116/2026111600658"]])if(docs?.[doc]?.caseId!==id||docs[doc].url!=="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/"+path+".pdf")return null;
    for(const [key,val,unit,ccy] of [["cash_alternative",4.03,"per_share","HKD"],["scheme_shares",634536832,"shares",null],["scheme_cash_max",2557183433,"money","HKD"],["pv_distribution_ratio",0.3699779,"ratio",null]])if(!c.terms?.some(t=>t.key===key&&t.value===val&&t.unit===unit&&t.currency===ccy&&t.evidence?.documentId===d))return null;
    const name="创维集团",outcome="待监管前置条件 · 计划未生效";
    const box=(id,x,y,title,subtitle,role,panel="left")=>({id,panel,x,y,w:178,h:74,title,subtitle,role});
    const arrow=(id,step,panel,kind,y,label,points)=>({id,step,panel,kind,label,labelCenter:[panel==="left"?327:860,y],labelWidth:141,labelHeight:36,pathPoints:points});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:479,status:"active",leftTitle:"发行人回购 · 每股计划股份",rightTitle:"另行实物分派 · 每股原持股",transitionLabel:"互为条件",outcomeBadge:outcome}),
    [box("L_iss",35,180,name,"拟注销计划股份","listed"),box("L_cash",432,76,"现金选项","计划股东","public"),box("L_share",432,313,"股份选项","拟获未上市创维集团新股","public"),box("R_iss",755,74,name,"分派创维光伏股份","listed","right"),box("R_all",755,312,"登记日股东","包括黄氏一致行动集团","public","right")],
    [],
    [arrow("A_cash","①","left","cash",114,"4.03 港元现金",[[213,200],[254,200],[254,114],[432,114]]),arrow("A_share","②","left","shares",350,"1 股创维集团新股",[[213,234],[254,234],[254,350],[432,350]]),{...arrow("A_pv","③","right","shares",227,"0.3699779 股创维光伏",[[847,148],[847,312]]),labelCenter:[847,227],labelWidth:174}]);
    return {id,caseId:id,code:c.code,name,mechanism:c.mechanism,status:"active",stageLabel:outcome,stageDate:"2026-11-16",archetype:"scheme",modality:"mixed",caseModalityShortLabel:"回购选择＋实物分派",before:{title:"现有上市结构",nodes:[{id:"i",role:"listed",name}],equityLinks:[]},after:{title:"如计划生效",nodes:[{id:"i2",role:"target",name},{id:"pv",role:"listed",name:"创维光伏（拟介绍上市）"}],equityLinks:[],outcomeBadge:outcome},
      flows:[{id:"cash",kind:"cash",direction:"ltr",fromLabel:name,toLabel:"计划股东",step:"1",headline:"4.03 港元／计划股"},{id:"share",kind:"shares",direction:"ltr",fromLabel:name,toLabel:"计划股东",step:"2",headline:"1 股创维集团新股／计划股"},{id:"pv",kind:"shares",direction:"ltr",fromLabel:name,toLabel:"登记日股东",step:"3",headline:"0.3699779 股创维光伏／原股"}],
      annotations:[{tag:"①",title:"回购范围与对价",body:"黄氏一致行动集团持股不纳入回购。计划股东可按比例选现金或股份；未有效选择者收取现金。全选现金情景约 25.6 亿港元。"},
      {tag:"②",title:"分派及上市安排",body:"实物分派覆盖登记日全体股东；创维光伏拟介绍上市，创维集团拟在计划生效后撤销上市。"},
      {tag:"③",title:"11 月 16 日进展",body:"创维光伏股东已批准分派及介绍上市。公告称拟于 11 月底保密递交；证监会备案通知、联交所原则批准及适用监管要求尚待满足。滚存安排仍须按收购守则第 25 条获批。"}],
      evidenceLinks:[{documentId:d,pages:[2,3,6,7,11,12],label:"回购、实物分派与特别交易公告"},{documentId:s,pages:[2],label:"11 月 16 日进展公告"}],topology,compactSummary:"4.03 港元现金或 1 股创维集团新股 · 另拟实物分派创维光伏股份"};
  }


  function buildEnnLapse(c,docs) {
    const id="HK-02688-20250326-xinneng-mixed-scheme-lapsed",d="YS-20250326-e9838a9556e1",s="YS-20260612-7ad33c3a58ab",x="YS-20260128-4616d9eef791";
    if(c.code!=="02688"||c.category!=="scheme"||c.stage?.status!=="terminated"||c.stage?.date!=="2026-06-12"||c.stage.eventKind!=="terminated"||!c.events?.some(e=>e.kind==="terminated"&&e.date===c.stage.date&&e.state==="actual"&&e.evidence?.documentId===s)||c.parties?.["要约人"]!=="Xinneng (Hong Kong) Energy Investment Limited"||[...(c.events||[]),...(c.processEvents||[])].some(e=>e.state==="actual"&&(e.date>"2026-06-12"||["effective","delisting","completion"].includes(e.kind))))return null;
    for(const [doc,path] of [[d,"2025/0326/2025032600769"],[s,"2026/0612/2026061201210"],[x,"2026/0128/2026012800489"]])if(docs?.[doc]?.caseId!==id||docs[doc].url!=="https://www1.hkexnews.hk/listedco/listconews/sehk/"+path+".pdf")return null;
    for(const [key,val,unit,ccy] of [["cash_leg",24.5,"per_share","HKD"],["stock_ratio",2.9427,"ratio",null]])if(!c.terms?.some(t=>t.key===key&&t.value===val&&t.unit===unit&&t.currency===ccy&&t.evidence?.documentId===d))return null;
    const name="新奥能源",bidder="新能（香港）能源投资",parent="新奥天然气",outcome="2026.06.12 · 方案及期权要约失效";
    const box=(id,x,y,title,subtitle,role,panel="left")=>({id,panel,x,y,w:175,h:74,title,subtitle,role});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:475,status:"terminated",leftTitle:"原拟对价 · 每股计划股份",rightTitle:"最后期限届满 · 实际结果",transitionLabel:"未实施",outcomeBadge:outcome}),
    [box("L_cash",34,76,bidder,"要约人","buyer"),box("L_share",34,302,parent,"要约人母公司 · 拟发行 H 股","buyer"),box("L_holder",430,173,"新奥能源计划股东","两部分均为原拟对价","public"),box("R_issuer",767,104,name,"保留上市 · 02688.HK","listed","right"),box("R_parent",767,290,parent,"终止推进本次 H 股上市申请","target","right")],[],
    [{id:"A_cash",step:"①",panel:"left",kind:"cash",label:"拟付 24.50 港元现金",labelCenter:[315,113],labelWidth:168,labelHeight:34,pathPoints:[[209,113],[405,113],[405,196],[430,196]]},
     {id:"A_share",step:"②",panel:"left",kind:"shares",label:"拟发 2.9427 股 H 股",labelCenter:[315,339],labelWidth:168,labelHeight:34,pathPoints:[[209,339],[405,339],[405,222],[430,222]]}]);
    return {id,caseId:id,code:c.code,name,mechanism:c.mechanism,status:"terminated",stageLabel:c.stage.label,stageDate:c.stage.date,archetype:"scheme",modality:"mixed",caseModalityShortLabel:"原拟现金＋H股 · 已失效",
      before:{title:"原拟方案",nodes:[{id:"o",role:"buyer",name:bidder},{id:"i",role:"listed",name}],equityLinks:[]},
      after:{title:"实际结果",nodes:[{id:"i2",role:"listed",name}],equityLinks:[],outcomeBadge:outcome},
      flows:[{id:"cash",kind:"cash",direction:"ltr",fromLabel:bidder,toLabel:"计划股东",step:"1",headline:"拟付 24.50 港元现金"},{id:"shares",kind:"shares",direction:"ltr",fromLabel:parent,toLabel:"计划股东",step:"2",headline:"拟发 2.9427 股新奥天然气 H 股"}],
      annotations:[{tag:"①",title:"未满足的上市先决条件",body:"联交所上市委员会尚未原则批准；证监会及其他主管部门所需批准或备案尚未办妥。两项均为不可豁免先决条件。"},
      {tag:"②",title:"未再延长最后期限",body:"新奥天然气及要约人战略审视后决定不再延期。6 月 12 日方案及期权要约失效，未寄发计划文件。"},
      {tag:"③",title:"收购守则第 31.1 条",body:"失效后 12 个月内，除执行人员同意外，适用对新要约及规则所列相关交易的限制。"}],
      evidenceLinks:[{documentId:d,pages:[2],label:"初报 · 拟议现金及换股条款"},{documentId:x,pages:[2,3],label:"延期公告 · 将最后期限延至 6 月 12 日"},{documentId:s,pages:[2,3],label:"失效公告 · 两项条件及守则限制"}],topology,compactSummary:"原拟每股 24.50 港元＋2.9427 股 H 股 · 2026.06.12 失效"};
  }


  function buildAneVerified(c,docs){
    const d='YS-20260206-19db726ab38f', sd='YS-20251218-abc91a874377', id='HK-09956-20251017-celestia-cayman-mixed-scheme';
    const nums={cash_cancelled_shares:926622591,share_alt_actual:58806550,centurium_deemed_paid_scheme_shares:185954093,total_cancelled_scheme_shares:1171383234,eligible_share_elections:103082280,share_alt_cap:58806553};
    if(c.id!==id||c.code!=='09956'||c.category!=='scheme'||c.stage?.status!=='closed'||c.stage.eventKind!=='effective'||c.stage.date!=='2026-02-05'||docs?.[d]?.url!=='https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0206/2026020600011.pdf'||!c.terms?.some(t=>t.key==='cash_alt'&&t.currency==='HKD'&&t.value===12.18&&t.evidence?.documentId===sd)||Object.entries(nums).some(([key,value])=>!c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===d)))return null;
    const b='Celestia BidCo Limited', t='Celestia TopCo Limited', p='计划股东', g='Topaz Gem', i='安能物流', out='开曼时间 2026.02.05 · 计划生效';
    const box=(id,panel,x,y,w,role,title,subtitle)=>({id,panel,x,y,w,h:76,role,title,subtitle});
    const arr=(id,kind,step,y,label,sublabel)=>({id,panel:'left',kind,step,pathPoints:[[220,y],[441,y]],labelCenter:[331,y],labelWidth:184,labelHeight:42,label,sublabel});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:570,status:'closed',leftTitle:'生效日 · 三类注销对价',rightTitle:'完成及滚存转让后的架构',transitionLabel:'计划生效',outcomeBadge:out}),[
      box('L_b','left',35,90,185,'buyer',b,'要约人'),box('L_p','left',441,90,175,'public',p,'现金选项'),
      box('L_t','left',35,215,185,'buyer',t,'股份选项发行人'),box('L_s','left',441,215,175,'public','选择股份的股东','获发 TopCo A 类股'),
      box('L_u','left',35,340,185,'buyer',t,'已持股份获列缴足'),box('L_g','left',441,340,175,'public',g,'单独非现金安排'),
      box('R_t','right',724,78,300,'buyer',t,'间接持股'),
      box('R_h','right',724,192,300,'buyer','HoldCo','直接持有要约人'),
      box('R_b','right',724,306,300,'buyer',b,'直接持有安能物流'),
      box('R_i','right',724,420,300,'target',i,'ANE (Cayman) Inc.')],[
        {id:'E_th',panel:'right',from:'R_t',to:'R_h',pctLabel:'100%',labelCenter:[874,173],pillWidth:66},
        {id:'E_hb',panel:'right',from:'R_h',to:'R_b',pctLabel:'100%',labelCenter:[874,287],pillWidth:66},
        {id:'E_bi',panel:'right',from:'R_b',to:'R_i',pctLabel:'100%',labelCenter:[874,401],pillWidth:66}
      ],[
        arr('cash','cash','①',128,'现金 HK$12.18 / 股','926,622,591 股'),
        arr('stock','shares','②',253,'配发 TopCo A 类股','58,806,550 股'),
        arr('paidup','shares','③',378,'原持 TopCo 股份缴足','对应 185,954,093 股')
      ]);
    const node=(id,role,name)=>({id,role,name});
    return {id,caseId:id,code:c.code,name:i,mechanism:c.mechanism,stageLabel:c.stage.label,stageDate:c.stage.date,archetype:'scheme',modality:'mixed',status:'closed',caseArchetypeLabel:'协议安排私有化',caseModalityShortLabel:'现金／股份选项',before:{title:'计划股份注销',nodes:[node('b','buyer',b),node('p','public',p),node('g','public',g)],equityLinks:[]},after:{title:'协议安排完成',outcomeBadge:out,nodes:[node('b','buyer',b),node('i','target',i)],equityLinks:[{from:'b',to:'i',label:'持有 100%',pct:100,style:'solid'}]},flows:[{id:'cash',kind:'cash',direction:'ltr',fromLabel:b,toLabel:p,headline:'926,622,591 股按每股 12.18 港元注销'},{id:'stock',kind:'shares',direction:'ltr',fromLabel:t,toLabel:'选择股份的股东',headline:'配发 58,806,550 股 TopCo A 类股'},{id:'paidup',kind:'shares',direction:'ltr',fromLabel:t,toLabel:g,headline:'原持 TopCo 股份列作缴足'}],annotations:[{tag:'①',title:'现金注销',body:'926,622,591 股按每股 12.18 港元注销，含有效选择股份后超比例转现金的部分。'},{tag:'②',title:'股份选择及实际配发',body:'103,082,280 股有效选择股份，上限为 58,806,553 股；比例调整并处理零碎股后，实际配发 58,806,550 股 TopCo A 类股。'},{tag:'③',title:'Topaz Gem 单列',body:'185,954,093 股注销，非现金对价为原持未缴足 TopCo A 类股按每股 12.18 港元列作缴足。三类合计注销 1,171,383,234 股。'}],evidenceLinks:[{documentId:d,pages:[2,3,4],label:'生效公告 · 注销分项与完成后股权'},{documentId:sd,pages:[130],label:'计划文件 · 每股计划股份对价'}],compactSummary:'现金注销 9.3 亿股 · 配发 5,880.7 万股 TopCo 股份 · Topaz Gem 缴足安排单列',topology};
  }

  function buildBaicSwapTender(c,docs){
    const id="HK-01958-20261117-battery-swap-assets", k="YS-20261117-ecf2d7e81bf5";
    if(c.id!==id || c.stage?.status!=="active" || c.stage.date!=="2026-11-17" || c.stage.eventKind!=="first_announcement" || docs?.[k]?.url!=="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1117/2026111700544.pdf" || !c.terms?.some(t=>t.key==="appraisal" && t.value===277900000 && t.evidence?.documentId===k)) return null;
    const seller="北京汽车动力总成", exchange="北京产权交易所", target="112 座换电站相关资产", outcome="已公告拟出售 · 待竞价";
    const box=(id,panel,x,y,w,role,title,subtitle)=>({id,panel,x,y,w,h:78,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:380,status:"active",leftTitle:"拟公开挂牌程序",rightTitle:"标的及定价口径",transitionLabel:"拟竞价",outcomeBadge:outcome}),[
      box("L_s","left",40,128,185,"seller",seller,"出让方"),box("L_p","left",430,128,180,"target",exchange,"拟公开挂牌"),
      box("R_a","right",754,88,256,"target",target,"设备及附属资产"),box("R_v","right",754,235,256,"public","成本法评估约人民币 2.8 亿","不含税 · 最终成交价待竞价")
    ],[],[{id:"f1",panel:"left",kind:"asset",step:"①",pathPoints:[[225,167],[430,167]],labelCenter:[327,167],labelWidth:150,labelHeight:38,label:"拟提交挂牌"}]);
    return {id,caseId:id,code:c.code,name:"北京汽车",mechanism:c.mechanism,stageLabel:outcome,stageDate:c.stage.date,archetype:"disposal",modality:"cash",status:"active",caseArchetypeLabel:"拟公开出售资产",caseModalityLabel:"成交价及支付方式待定",caseModalityShortLabel:"竞价待定",before:{title:"已披露",nodes:[{id:"s",role:"seller",name:seller},{id:"p",role:"target",name:exchange}],equityLinks:[]},after:{title:"待竞价",nodes:[{id:"a",role:"target",name:target}],equityLinks:[],outcomeBadge:outcome},
      flows:[{id:"f1",kind:"asset",direction:"ltr",fromLabel:seller,toLabel:exchange,headline:"拟提交挂牌",proposedOrTerminated:true}],annotations:[{tag:"①",title:"公开挂牌",body:"初始公告披露拟经北京产权交易所公开竞价，受让方及交易协议待定。"},{tag:"②",title:"定价",body:"估值日 2026 年 9 月 30 日，成本法评估约人民币 2.8 亿元（不含税）；成交价以最终出价为准。"}],evidenceLinks:[{documentId:k,pages:[1,2,3,4,7],label:"公告 · 公开挂牌与估值口径"}],compactSummary:"北京汽车 · 112 座换电站相关资产 · 拟公开挂牌",topology};
  }

  function buildBhafCapitalReduction(c,docs) {
    const id="HK-01958-20261021-bhaf-capital-reduction", circ="YS-20261106-859535be915b", vote="YS-20261126-da2149999496";
    if(c.id!==id || c.stage.status!=="approved" || c.stage.date!=="2026-11-26" || c.stage.eventKind!=="vote" ||
       !c.events.some(e=>e.kind==="vote"&&e.state==="actual"&&e.evidence?.documentId===vote) ||
       !c.terms.some(t=>t.key==="issuer_exit"&&t.value===2207700000&&t.currency==="CNY") ||
       !c.terms.some(t=>t.key==="other_exit"&&t.value===936600000&&t.currency==="CNY") ||
       !c.terms.some(t=>t.key==="issuer_stake"&&t.value===33) || !c.terms.some(t=>t.key==="other_stake"&&t.value===14) ||
       docs?.[circ]?.url!=="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1106/2026110601592.pdf" ||
       docs?.[vote]?.url!=="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1126/2026112601216.pdf") return null;
    const s="北汽投资", j="北京现代", f="北京现代汽车金融", hc="现代资本", hm="现代汽车";
    const badge="股东已批准 · 待金融监管部门批准";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:390,status:"approved",leftTitle:"减资付款及退出股东",rightTitle:"如完成 · 减资后的结构",transitionLabel:"减资完成后",outcomeBadge:badge}),[
      box("L_s","left",44,88,174,74,"seller",s,"退出全部 33%"),
      box("L_j","left",44,211,174,74,"seller",j,"退出全部 14%"),
      box("L_f","left",434,88,174,197,"target",f,"减资主体及付款方"),
      box("R_f","right",755,84,240,76,"target",f,"注册资本 40 亿 → 21.2 亿元"),
      box("R_o","right",755,206,240,76,"public","继续持股",hc+"、"+hm)
    ],[],[
      {id:"c1",panel:"left",kind:"cash",step:"①",pathPoints:[[434,125],[218,125]],labelCenter:[325,125],labelWidth:172,labelHeight:37,label:"人民币 22.1 亿元"},
      {id:"c2",panel:"left",kind:"cash",step:"②",pathPoints:[[434,248],[218,248]],labelCenter:[325,248],labelWidth:172,labelHeight:37,label:"人民币 9.4 亿元"}
    ]);
    const node=(id,role,name)=>({id,role,name});
    return {id,caseId:id,code:c.code,name:c.name,mechanism:c.mechanism,stageLabel:c.stage.label,stageDate:c.stage.date,archetype:"disposal",modality:"cash",status:"approved",caseArchetypeLabel:"减资退出",caseModalityShortLabel:"现金减资",before:{title:"减资前",nodes:[node("s","seller",s),node("j","seller",j),node("f","target",f)],equityLinks:[{from:"s",to:"f",label:"33%",pct:33,style:"solid"},{from:"j",to:"f",label:"14%",pct:14,style:"solid"}]},after:{title:"减资完成后",outcomeBadge:badge,nodes:[node("f","target",f),node("hc","public",hc),node("hm","public",hm)],equityLinks:[]},
      flows:[{id:"c1",kind:"cash",direction:"rtl",fromLabel:f,toLabel:s,headline:"人民币 22.077 亿元（33%）",proposedOrTerminated:true},{id:"c2",kind:"cash",direction:"rtl",fromLabel:f,toLabel:j,headline:"人民币 9.366 亿元（14%）",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"两笔现金对价",body:"北京现代汽车金融拟向北汽投资支付人民币 22.077 亿元，另向北京现代支付人民币 9.366 亿元；两方分别退出所持全部权益。"},
      {tag:"②",title:"批准与后续条件",body:"11 月 26 日股东批准，赞成率 99.82%。协议生效仍须金融监管部门等批准，付款另受债权人程序等条件约束。"}],
      evidenceLinks:[{documentId:circ,pages:[9,10,11],label:"通函：减资结构、对价与条件"},{documentId:vote,pages:[2],label:"股东大会表决结果"}],compactSummary:"北京汽车 · 减资退出 33%／14% · 股东已批准",topology};
  }

  function buildEvidencedRightsIssue(c,docs) {
    const x=c.rightsExecution;
    if(!x||!["excess","placement","best_efforts"].includes(x.method)||!docs?.[x.evidence?.documentId]||
       docs[x.evidence.documentId].caseId!==c.id||!x.evidence?.pages?.length) return null;
    const price=c.terms?.find(t=>t.key==="subscription_price"&&t.currency==="HKD"&&t.value>0);
    if(!price||!c.stage?.label||!c.stage.date) return null;
    const s=c.stage.status, done=s==="closed"||s==="implemented", i=x.issuerLabel, sh="合資格股東";
    const mode={excess:"非包銷 · 額外供股申請",placement:"非包銷 · 餘股盡力配售",best_efforts:"先補償配售 · 餘股盡力包銷"}[x.method];
    const detail={excess:"剩餘股份可申請額外認購",placement:"未認購股份按盡力基準配售",best_efforts:"補償配售後的餘股按協議盡力包銷"}[x.method];
    const badge=mode+" · "+c.stage.label;
    const term="每股 "+price.value.toString()+" 港元";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:365,status:s,leftTitle:"供股股份與認購款",rightTitle:"發行安排",transitionLabel:"供股",outcomeBadge:badge}),[
      box("L_i","left",42,99,159,139,"listed",i,term),
      box("L_h","left",454,99,149,139,"public",sh,"按供股配額認購"),
      box("R_m","right",725,91,300,75,"target",mode,detail),
      box("R_s","right",725,201,300,69,"public","進度",c.stage.label)
    ],[],[
      {id:"shares",panel:"left",kind:"shares",step:"①",pathPoints:[[201,135],[454,135]],labelCenter:[327,135],labelWidth:176,labelHeight:35,label:"供股股份"},
      {id:"cash",panel:"left",kind:"cash",step:"②",pathPoints:[[454,206],[201,206]],labelCenter:[327,206],labelWidth:176,labelHeight:35,label:"按認購繳款"}
    ]);
    const nodes=[{id:"i",role:"listed",name:i},{id:"h",role:"public",name:sh}];
    return {id:c.id,caseId:c.id,code:c.code,name:i,mechanism:c.mechanism,stageLabel:c.stage.label,stageDate:c.stage.date,
      archetype:"rights_open_offer",modality:"cash",status:s,caseArchetypeLabel:"供股",caseModalityShortLabel:mode,
      before:{title:"供股結構",nodes,equityLinks:[]},after:{title:"發行安排",outcomeBadge:badge,nodes,equityLinks:[]},
      flows:[{id:"shares",kind:"shares",direction:"ltr",fromLabel:i,toLabel:sh,headline:"按配額發行供股股份",proposedOrTerminated:!done},
        {id:"cash",kind:"cash",direction:"rtl",fromLabel:sh,toLabel:i,headline:"實際認購額按"+term+"計",proposedOrTerminated:!done}],
      annotations:[{tag:"①",title:mode,body:c.mechanism},{tag:"②",title:"進度",body:c.stage.label+"（"+c.stage.date+"）"}],
      evidenceLinks:[{documentId:x.evidence.documentId,pages:x.evidence.pages,label:"原件：供股方式與認購安排"}],
      compactSummary:i+" · "+term+" · "+mode,topology};
  }
  function getSpecForCase(txCase, documents) {
    if (txCase?.category === "rights_issue") { const x=buildEvidencedRightsIssue(txCase,documents);return x&&validateDiagramSpec(x); }
    if(txCase?.id==="HK-01958-20261021-bhaf-capital-reduction"){const x=buildBhafCapitalReduction(txCase,documents);return x&&validateDiagramSpec(x);}
    if(txCase?.id==="HK-01958-20261117-battery-swap-assets"){const x=buildBaicSwapTender(txCase,documents);return x&&validateDiagramSpec(x);}
    if (txCase?.id === "HK-01521-20261109-sanrex") {const verified=buildSanRexScheme(txCase,documents);return verified&&validateDiagramSpec(verified);}
    if (txCase?.id === "HK-00848-20260929-wf-scheme") {const verified=buildMaoyeVerified(txCase,documents);return verified&&validateDiagramSpec(verified);}
    if (txCase?.id === "HK-01086-20260927-crystal-aurora") {const verified=buildCrystalVerified(txCase,documents);return verified&&validateDiagramSpec(verified);}
    if (txCase?.id === "HK-00751-20260120-scheme-buyback-photovoltaic") {const verified=buildSkyworthScheme(txCase,documents);return verified&&validateDiagramSpec(verified);}
    if (txCase?.id === "HK-02688-20250326-xinneng-mixed-scheme-lapsed") {const verified=buildEnnLapse(txCase,documents);return verified&&validateDiagramSpec(verified);}
    if (txCase?.id === "HK-09956-20251017-celestia-cayman-mixed-scheme") {const verified=buildAneVerified(txCase,documents);return verified&&validateDiagramSpec(verified);}
    if (txCase?.id === "HK-03958-20260506-shanghai-securities") {const vetted=buildOrientalAcquisition(txCase,documents);return vetted&&validateDiagramSpec(vetted);}
    if (txCase?.id === "HK-01122-20261009-isuzu-engine") {const vetted=buildIsuzuVerified(txCase,documents);return vetted&&validateDiagramSpec(vetted);}
    if (txCase?.id==="HK-00308-20260520-ctg-hkm-spin" && txCase.stage?.eventKind==="listing") {const d=buildCtghkmIntroduction(txCase,documents);return d&&validateDiagramSpec(d);}
    if (!txCase || typeof txCase !== "object") {
      throw new Error("getSpecForCase requires a transaction case object");
    }
    if (txCase.id === "HK-02535-20260804-control-mgo") {
      const spec = buildWkTwoLegOffer(txCase, documents);
      return spec && validateDiagramSpec(spec);
    }
    if (Object.hasOwn(REVIEWED_PN15_DRAFT,txCase.id)) {
      const draft=buildPn15PlannedStructure(txCase,documents);
      return draft && validateDiagramSpec(draft);
    }
    if (txCase.id === "HK-00138-20260911-cb-second-amendment") {
      const verified=buildCctBondAmendment(txCase,documents);
      return verified && validateDiagramSpec(verified);
    }
    if (txCase.id === "HK-00991-20261117-tuoketuo-ii-absorption") {
      const verified=buildTuoketuoAbsorption(txCase,documents);
      return verified && validateDiagramSpec(verified);
    }
    if (txCase.id === "HK-06998-20261117-taizhou-equipment-buyback") {
      const verified=buildTaizhouEquipmentBuyback(txCase,documents);
      return verified && validateDiagramSpec(verified);
    }
    if (txCase.id === "HK-00276-20261118-western-solar-energy-jv") {
      const verified=buildWesternSolarJv(txCase,documents);
      return verified && validateDiagramSpec(verified);
    }
    if (txCase.id === "HK-00950-20261119-nova-assembly-line-order") {
      const cap=txCase.terms?.find(t=>t.key==="equipment_purchase_cap");
      const deposit=txCase.terms?.find(t=>t.key==="deposit_rate");
      const doc=documents?.[cap?.evidence?.documentId];
      if (txCase.stage?.status!=="active" || cap?.value!==7668400 || cap.currency!=="USD" ||
          cap.evidence?.pages?.join(",")!=="1,2" || deposit?.value!==30 || deposit.unit!=="percent" ||
          deposit.evidence?.documentId!==doc?.id || !deposit.evidence?.pages?.includes(2) ||
          doc?.caseId!==txCase.id || doc.url!=="https://www.hkexnews.hk/listedco/listconews/sehk/2026/1119/2026111900018_c.pdf" ||
          doc.date!=="2026-11-19" || txCase.parties?.["采购方"]!=="Nova Pneuma Incorporated" ||
          txCase.parties?.["供应商"]!=="Automation Tool Company（ATC Automation）") return null;
      return deriveCommercialProcurementCase(txCase);
    }
    if (txCase.id === "HK-01716-20260831-wannianfeng-zhousha") {
      const verified=buildMostKwaiChungTwoAcquisitions(txCase,documents);
      return verified && validateDiagramSpec(verified);
    }
    if (txCase.id === "HK-03399-20261119-guangzhou-motor-transport-buyback" ||
        txCase.id === "HK-03399-20261119-hong-kong-motor-transport-buyback") {
      const verified = buildYueyunBuyback(txCase, documents);
      return verified && validateDiagramSpec(verified);
    }
    if (txCase.id === "HK-00064-20260717-privatisation") {
      const verified = buildGetNiceScheme(txCase, documents);
      return verified && validateDiagramSpec(verified);
    }
    if (txCase.id === ERJIN_ACQUISITION_CASE) {
      const spec = buildErjinImplementation(txCase, documents);
      if (spec) spec.caseArchetypeLabel = "股份交易及关连收购";
      return spec && validateDiagramSpec(spec);
    }
    if (txCase.id === LIANFA_PROPERTY_CASE) {
      const spec = buildLianfaPropertyClosure(txCase, documents);
      if (spec) spec.caseArchetypeLabel = "须予披露及关连收购";
      if (spec) { spec.caseModalityLabel = "现金对价（合同）"; spec.caseModalityShortLabel = "合同现金"; }
      return spec && validateDiagramSpec(spec);
    }
    if (txCase.id === ROAD_KING_RKE_CASE) {
      const spec = roadKingRkeSpec(txCase, documents);
      return spec && validateDiagramSpec(spec);
    }
    if (Object.hasOwn(VERIFIED_ACQUISITIONS, txCase.id)) {
      const spec = CURATED_BUILDERS[txCase.id](txCase, documents);
      return spec && validateDiagramSpec(spec);
    }
    if (txCase.diagramSpec && typeof txCase.diagramSpec === "object") {
      const merged = {
        id: txCase.id,
        caseId: txCase.id,
        code: txCase.code,
        name: txCase.name,
        mechanism: txCase.mechanism,
        stageLabel: txCase.stage?.label,
        stageDate: txCase.stage?.date,
        ...cloneDeep(txCase.diagramSpec),
      };
      if (!merged.topology && CASE_SPECIFIC_TOPOLOGY_REQUIRED.has(merged.archetype)) return null;
      if (!merged.topology) merged.topology = synthesizeTopologyFromSpec(merged);
      return validateDiagramSpec(merged);
    }
    const assetFacts = ASSET_CASE_DIAGRAMS[txCase.id];
    if (assetFacts) {
      const spec = buildVerifiedAssetCase(txCase, assetFacts, documents);
      return spec ? validateDiagramSpec(spec) : null;
    }
    const builder = txCase.id ? CURATED_BUILDERS[txCase.id] : null;
    if (builder) {
      const spec = builder(txCase);
      return spec ? validateDiagramSpec(spec) : null;
    }
    // The shared connected/whitewash atlas template is not a fact about a deal.
    // For ordinary Chapter 14A fallback cases, keep the source-backed text
    // rather than inventing a waiver, issuance, or post-closing capital structure.
    if (ordinaryConnectedFallback(txCase) || nonUnderwrittenRightsFallback(txCase)) return null;
    return deriveDiagramFromCase(txCase);
  }

  /* =========================================================================
     8. 2D SVG COMPOSITION & HTML COMPONENT RENDERER
     ========================================================================= */
  function renderPanelFrameSvg(panel, title, fillBg, terminatedBanner) {
    const { x, y, w, h } = panel;
    let out = `<g class="ddk-panel-frame">`;
    out += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="${fillBg}" stroke="#d8dde4" stroke-width="1" />`;
    out += `<rect x="${x}" y="${y}" width="${w}" height="32" rx="5" fill="#f3f4f0" />`;
    out += `<rect x="${x}" y="${y + 24}" width="${w}" height="8" fill="#f3f4f0" />`;
    out += `<line x1="${x}" y1="${y + 32}" x2="${x + w}" y2="${y + 32}" stroke="#e2e5e9" stroke-width="1" />`;
    out += `<text x="${x + 14}" y="${y + 20.5}" font-family="${escapeHtml(FONT_SANS)}" font-size="11.5" font-weight="700" fill="#1e293b">${escapeHtml(title)}</text>`;
    if (terminatedBanner) {
      const bx = x + 16;
      const by = y + 40;
      const bw = w - 32;
      out += `<rect x="${bx}" y="${by}" width="${bw}" height="28" rx="3" fill="#fdf2f2" stroke="#c53030" stroke-width="1" stroke-dasharray="4 3" />`;
      out += `<text x="${bx + bw / 2}" y="${by + 18}" text-anchor="middle" font-family="${escapeHtml(FONT_SANS)}" font-size="10.8" font-weight="700" fill="#991b1b">${escapeHtml(terminatedBanner)}</text>`;
    }
    out += `</g>`;
    return out;
  }

  function renderOutcomeBannerSvg(rightPanel, outcomeText, status) {
    if (!outcomeText) return "";
    const st = STATUS_META[status] || STATUS_META.closed;
    const x = rightPanel.x + 16;
    const w = rightPanel.w - 32;
    const h = 34;
    const y = rightPanel.y + rightPanel.h - h - 12;
    const dash = status === "terminated" ? ' stroke-dasharray="4 3"' : "";
    const text = truncateVisual(outcomeText, (w - 16) / 11);
    return (
      `<g class="ddk-svg-outcome">` +
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${st.outcomeFill}" stroke="${st.outcomeStroke}" stroke-width="1.1"${dash} />` +
      `<text x="${x + w / 2}" y="${y + 21}" text-anchor="middle" font-family="${escapeHtml(FONT_SANS)}" font-size="11.2" font-weight="700" fill="${st.outcomeFg}">${escapeHtml(text)}</text>` +
      `</g>`
    );
  }

  function renderTransitionGateSvg(layout) {
    const gx = layout.gateX;
    const gy = Math.round(layout.height / 2);
    const st = STATUS_META[layout.status] || STATUS_META.closed;
    const color = st.gateFill;
    const label = layout.transitionLabel || "交割后";
    const pillW = Math.min(50, Math.max(40, Math.round(measureTextUnits(label) * 8.6 + 8)));
    return (
      `<g class="ddk-svg-gate" aria-hidden="true">` +
      `<line x1="${gx - 18}" y1="${gy - 3}" x2="${gx + 8}" y2="${gy - 3}" stroke="${color}" stroke-width="2" />` +
      `<line x1="${gx - 18}" y1="${gy + 3}" x2="${gx + 8}" y2="${gy + 3}" stroke="${color}" stroke-width="2" />` +
      `<polygon points="${gx + 19},${gy} ${gx + 6},${gy - 9} ${gx + 6},${gy + 9}" fill="${color}" />` +
      `<rect x="${gx - pillW / 2}" y="${gy - 34}" width="${pillW}" height="18" rx="3" fill="#ffffff" stroke="${color}" stroke-width="0.9" />` +
      `<text x="${gx}" y="${gy - 22}" text-anchor="middle" font-family="${escapeHtml(FONT_SANS)}" font-size="9" font-weight="700" fill="${color}">${escapeHtml(truncateVisual(label, 5.2))}</text>` +
      `</g>`
    );
  }

  function renderPanelContents(layout, panelName) {
    const edgesSvg = layout.ownershipEdges
      .filter((e) => e.panel === panelName)
      .map((e) => e.svg)
      .join("");
    const boxesSvg = layout.boxes
      .filter((b) => b.panel === panelName)
      .map((b) => b.svg)
      .join("");
    const arrowsSvg = layout.txArrows
      .filter((a) => a.panel === panelName)
      .map((a) => a.svg)
      .join("");
    return edgesSvg + boxesSvg + arrowsSvg;
  }

  function verifiedDiagramDescription(spec, panel) {
    if (!spec.evidenceLinks?.length) return "";
    const flows = spec.flows.map(f => `${f.fromLabel}向${f.toLabel}：${f.headline}${f.subline ? "，"+f.subline : ""}`);
    const names = new Map(spec.after.nodes.map(n => [n.id, n.name]));
    const interests = [...spec.after.equityLinks.map(e => `${names.get(e.from)}至${names.get(e.to)}：${e.label}`), spec.after.outcomeBadge];
    const facts = panel === "left" ? flows : panel === "right" ? interests : [...flows, ...interests];
    return ` aria-description="${escapeHtml(facts.join("；"))}"`;
  }

  function renderDesktopSvg(layout, spec) {
    const leftFrame = renderPanelFrameSvg(
      layout.leftPanel,
      layout.leftTitle,
      "#fafaf7",
      layout.terminatedBanner
    );
    const rightFrame = renderPanelFrameSvg(
      layout.rightPanel,
      layout.rightTitle,
      "#ffffff",
      ""
    );
    const leftBody = renderPanelContents(layout, "left");
    const rightBody = renderPanelContents(layout, "right");
    const gate = renderTransitionGateSvg(layout);
    const outcome = renderOutcomeBannerSvg(
      layout.rightPanel,
      layout.outcomeBadge || spec.after.outcomeBadge,
      layout.status
    );

    return `<svg class="ddk-svg-desktop" viewBox="0 0 ${layout.width} ${layout.height}" role="img" aria-label="${escapeHtml((spec.name || "") + " " + layout.leftTitle + " 与 " + layout.rightTitle)}"${verifiedDiagramDescription(spec)}>
      ${leftFrame}
      ${rightFrame}
      ${gate}
      ${leftBody}
      ${rightBody}
      ${outcome}
    </svg>`;
  }

  function renderMobileStackedSvgs(layout, spec) {
    const lp = layout.leftPanel;
    const rp = layout.rightPanel;
    const leftFrame = renderPanelFrameSvg(lp, layout.leftTitle, "#fafaf7", layout.terminatedBanner);
    const leftBody = renderPanelContents(layout, "left");
    const rightFrame = renderPanelFrameSvg(rp, layout.rightTitle, "#ffffff", "");
    const rightBody = renderPanelContents(layout, "right");
    const outcome = renderOutcomeBannerSvg(
      rp,
      layout.outcomeBadge || spec.after.outcomeBadge,
      layout.status
    );

    return `<div class="ddk-svg-mobile">
      <svg class="ddk-svg-panel" viewBox="0 0 ${lp.w} ${lp.h}" role="img" aria-label="${escapeHtml(layout.leftTitle)}"${verifiedDiagramDescription(spec, "left")}>
        <g transform="translate(${-lp.x}, ${-lp.y})">
          ${leftFrame}
          ${leftBody}
        </g>
      </svg>
      <div class="ddk-mobile-gate is-status-${escapeHtml(layout.status)}" aria-hidden="true">
        <span>▼ ${escapeHtml(layout.transitionLabel || "交割后")}</span>
      </div>
      <svg class="ddk-svg-panel is-right" viewBox="0 0 ${rp.w} ${rp.h}" role="img" aria-label="${escapeHtml(layout.rightTitle)}"${verifiedDiagramDescription(spec, "right")}>
        <g transform="translate(${-rp.x}, ${-rp.y})">
          ${rightFrame}
          ${rightBody}
          ${outcome}
        </g>
      </svg>
    </div>`;
  }

  function resolveSpec(txCaseOrSpec, documents) {
    if (!txCaseOrSpec || typeof txCaseOrSpec !== "object") {
      throw new Error("renderDealDiagram requires a transaction case or DiagramSpec object");
    }
    if (txCaseOrSpec.before && txCaseOrSpec.after && txCaseOrSpec.flows) {
      if (!txCaseOrSpec.topology && CASE_SPECIFIC_TOPOLOGY_REQUIRED.has(txCaseOrSpec.archetype)) return null;
      const spec = txCaseOrSpec.topology
        ? txCaseOrSpec
        : { ...txCaseOrSpec, topology: synthesizeTopologyFromSpec(txCaseOrSpec) };
      return validateDiagramSpec(spec);
    }
    return getSpecForCase(txCaseOrSpec, documents);
  }

  function renderDealDiagram(txCaseOrSpec, opts) {
    const options = opts && typeof opts === "object" ? opts : {};
    const spec = resolveSpec(txCaseOrSpec, options.documents);
    if (!spec) return "";
    const initialFilter = VALID_FILTERS.has(options.initialFilter) ? options.initialFilter : "all";
    const showAnnotations = options.showAnnotations !== false;
    const archInfo = ARCHETYPES[spec.archetype];
    const modalityInfo = MODALITY_BADGES[spec.modality];
    const statusInfo = STATUS_META[spec.status];
    const caseAttr = spec.caseId || spec.id || spec.archetype;
    const isTerminated = spec.status === "terminated";
    const layout = spec.topology || synthesizeTopologyFromSpec(spec);

    const isPureAssetContract =
      Array.isArray(spec.before?.equityLinks) &&
      spec.before.equityLinks.length === 0 &&
      Array.isArray(spec.after?.equityLinks) &&
      spec.after.equityLinks.length === 0 &&
      !spec.flows.some((f) => f.kind === "shares");

    const activeFilterButtons = isPureAssetContract
      ? [
          { key: "all", labelZh: "全部流向" },
          { key: "cash", labelZh: "合同价款流" },
          { key: "structural", labelZh: "设备·资产交付" },
        ]
      : FILTER_BUTTONS;

    const filterBtnsHtml = activeFilterButtons.map((btn) => {
      const active = btn.key === initialFilter;
      return `<button type="button" class="ddk-filter-btn${active ? " is-active" : ""}" data-ddk-filter-btn="${btn.key}" aria-pressed="${active ? "true" : "false"}">${escapeHtml(btn.labelZh)}</button>`;
    }).join("");

  function ddkRuleQueryKeyword(code, label) {
    const rawCode = String(code || "").trim();
    if (/^HKEX:/i.test(rawCode)) return rawCode.slice(5);
    if (/^TC:/i.test(rawCode)) return rawCode;
    return rawCode || String(label || "").trim();
  }

  function renderDdkRuleToken(code, label, tooltip, interactive) {
    const shortText = formatDdkRuleShort(code, label);
    const fullCode = String(code || label || "").trim();
    const q = ddkRuleQueryKeyword(code, label);
    const tip = tooltip || (label && label !== shortText ? `${label}（点击检索同规则先例）` : `点击检索 ${shortText} 相关先例`);
    if (interactive && fullCode) {
      return `<button type="button" class="ddk-rule-token" data-ddk-rule-search="${escapeHtml(fullCode)}" data-ddk-rule-query="${escapeHtml(q)}" data-ddk-rule-code="${escapeHtml(fullCode)}" title="${escapeHtml(tip)}">${escapeHtml(shortText)}</button>`;
    }
    return `<span class="ddk-rule-token is-static" data-ddk-rule-code="${escapeHtml(fullCode)}">${escapeHtml(shortText)}</span>`;
  }

  function renderDdkAnnotations(spec, rawCase, options, statusInfo) {
    const list = Array.isArray(spec.annotations) ? spec.annotations : [];
    if (!list.length) return "";
    const hasInteractiveSearch = Boolean(rawCase && typeof rawCase === "object" && !rawCase.before);
    const sourceFn = typeof options?.sourceLink === "function" ? options.sourceLink : null;
    const rawRules = Array.isArray(rawCase?.rules) ? rawCase.rules : [];
    const autoGeneratedRuleBody = rawRules.length
      ? rawRules.map((r) => `${r.label || r.code}（${r.application || "适用规则"}）`).join("；")
      : "";

    const colClass = list.length === 1 ? " is-cols-1" : list.length === 2 ? " is-cols-2" : list.length === 3 ? " is-cols-3" : " is-cols-4";

    const cellsHtml = list.map((a, idx) => {
      const isRuleCol = Boolean(a.ruleCode) || /规则|分类/.test(a.title || "");
      const isStatusCol = !isRuleCol && (idx === 3 || (list.length >= 3 && idx === list.length - 1 && /审批|交割|状态|进展|周期|时间线|履约/.test(a.title || "")));

      // 1) Regulatory Rule Trigger Column: lightweight wrappable rule index + paired/expandable explanations (no grey slab, no repetition)
      if (isRuleCol) {
        const useStructuredRules = rawRules.length > 0 && (a.body === autoGeneratedRuleBody || !a.body);
        if (useStructuredRules) {
          const renderRuleItem = (r) => {
            const token = renderDdkRuleToken(r.code, r.label, `${r.label || r.code}：点击筛选同规则案例`, hasInteractiveSearch);
            const desc = String(r.application || "").trim();
            const srcLink = sourceFn && r.evidence?.documentId ? sourceFn(r.evidence, "") : "";
            return `<li class="ddk-rule-item">${token}<span class="ddk-rule-desc">${escapeHtml(desc)}</span>${srcLink ? `<span class="ddk-rule-src">${srcLink}</span>` : ""}</li>`;
          };

          if (rawRules.length <= 2) {
            return `<div class="ddk-callout is-rules-col">
              <div class="ddk-callout-head">
                <span class="ddk-callout-tag">${escapeHtml(a.tag)}</span>
                <strong class="ddk-callout-title">${escapeHtml(a.title)}</strong>
              </div>
              <ul class="ddk-rule-list">${rawRules.map(renderRuleItem).join("")}</ul>
            </div>`;
          }

          const indexHtml = rawRules
            .map((r, i) => `${i > 0 ? '<span class="ddk-rule-sep" aria-hidden="true">·</span>' : ""}${renderDdkRuleToken(r.code, r.label, `${r.label || r.code}：${r.application || ""}`, hasInteractiveSearch)}`)
            .join("");

          return `<div class="ddk-callout is-rules-col is-multi-rules">
            <div class="ddk-callout-head">
              <span class="ddk-callout-tag">${escapeHtml(a.tag)}</span>
              <strong class="ddk-callout-title">${escapeHtml(a.title)}</strong>
              <span class="ddk-callout-meta">${rawRules.length} 项触发</span>
            </div>
            <div class="ddk-rule-index" role="list" aria-label="触发规则号索引">${indexHtml}</div>
            <details class="ddk-rules-fold">
              <summary><span class="ddk-fold-closed">展开逐条说明与原件页码</span><span class="ddk-fold-open">收起逐条说明</span></summary>
              <ul class="ddk-rule-list is-folded">${rawRules.map(renderRuleItem).join("")}</ul>
            </details>
          </div>`;
        }

        // Curated / standalone DiagramSpec fallback: split ruleCode into lightweight tokens without concatenated grey box
        const tokens = String(a.ruleCode || "")
          .split(/\s*·\s*/)
          .map((s) => s.trim())
          .filter(Boolean);
        const tokenRowHtml = tokens.length
          ? `<div class="ddk-rule-index">${tokens
              .map((tok, i) => {
                const matchedRule = rawRules.find((r) => r.code === tok || r.label === tok);
                return `${i > 0 ? '<span class="ddk-rule-sep" aria-hidden="true">·</span>' : ""}${renderDdkRuleToken(tok, matchedRule?.label || tok, matchedRule ? `${matchedRule.label}：${matchedRule.application || ""}` : "", hasInteractiveSearch)}`;
              })
              .join("")}</div>`
          : "";
        return `<div class="ddk-callout is-rules-col">
          <div class="ddk-callout-head">
            <span class="ddk-callout-tag">${escapeHtml(a.tag)}</span>
            <strong class="ddk-callout-title">${escapeHtml(a.title)}</strong>
          </div>
          ${tokenRowHtml}
          <p class="ddk-callout-body">${escapeHtml(a.body)}</p>
        </div>`;
      }

      // 2) Approval / Closing Status Column: first line prominently highlights current status + date
      if (isStatusCol) {
        const stageLabel = spec.stageLabel || rawCase?.stage?.label || statusInfo?.labelZh || "";
        const stageDate = spec.stageDate || rawCase?.stage?.date || "";
        const defaultAutoStatusBody = `${stageLabel}${stageDate ? `（${stageDate}）` : ""}${rawCase?.lifecycle?.naturalDays ? ` · 全周期 ${rawCase.lifecycle.naturalDays} 天` : ""}。`;
        const isAutoBody = !a.body || a.body === defaultAutoStatusBody || a.body === `${stageLabel}${stageDate ? `（${stageDate}）` : ""}。`;

        let subHtml = "";
        if (!isAutoBody) {
          subHtml = `<p class="ddk-stage-sub">${escapeHtml(a.body)}</p>`;
        } else {
          const procEvents = Array.isArray(rawCase?.processEvents) ? rawCase.processEvents : [];
          const coreEvents = Array.isArray(rawCase?.events) ? rawCase.events : [];
          if (procEvents.length > 0) {
            const latest = procEvents[procEvents.length - 1];
            const rawDetail = String(latest.detail || "").replace(/^公司收(?:到)?/, "收");
            const firstSentence = rawDetail.split(/[。；]/)[0] || rawDetail;
            const brief = firstSentence.length > 44 ? `${firstSentence.slice(0, 43)}…` : firstSentence;
            const latestSrc = sourceFn && latest.evidence?.documentId
              ? sourceFn(latest.evidence, "")
              : "";
            subHtml = `<p class="ddk-stage-sub"><span class="ddk-stage-sub-kicker">最新 ${escapeHtml(latest.date || "")}</span> ${escapeHtml(brief)}${procEvents.length > 1 ? `<span class="ddk-stage-sub-count">（共 ${procEvents.length} 项进展）</span>` : ""}${latestSrc ? ` <span class="ddk-rule-src">${latestSrc}</span>` : ""}</p>`;
          } else if (rawCase?.lifecycle?.naturalDays) {
            const firstAnn = coreEvents[0]?.date;
            subHtml = `<p class="ddk-stage-sub">${firstAnn && firstAnn !== stageDate ? `首次公告 ${escapeHtml(firstAnn)} · ` : ""}全周期 <strong class="ddk-num">${escapeHtml(String(rawCase.lifecycle.naturalDays))} 天</strong></p>`;
          } else if (coreEvents.length > 0 && coreEvents[0].date && coreEvents[0].date !== stageDate) {
            subHtml = `<p class="ddk-stage-sub">首次公告 ${escapeHtml(coreEvents[0].date)}${coreEvents.length > 2 ? ` · 已披露 ${coreEvents.length} 个里程碑` : ""}</p>`;
          }
        }

        const headlineHtml = stageLabel
          ? `<div class="ddk-stage-headline is-status-${escapeHtml(spec.status)}">
              <span class="ddk-stage-state"><i class="ddk-stage-dot" aria-hidden="true"></i><strong>${escapeHtml(stageLabel)}</strong></span>
              ${stageDate ? `<time class="ddk-stage-date">${escapeHtml(stageDate)}</time>` : ""}
            </div>`
          : `<p class="ddk-callout-body">${escapeHtml(a.body)}</p>`;

        return `<div class="ddk-callout is-status-col">
          <div class="ddk-callout-head">
            <span class="ddk-callout-tag">${escapeHtml(a.tag)}</span>
            <strong class="ddk-callout-title">${escapeHtml(a.title)}</strong>
          </div>
          ${headlineHtml}
          ${subHtml}
        </div>`;
      }

      // 3) Parties / Consideration Columns: clean key-value lines when semicolon-delimited, without extra boxes
      const bodyStr = String(a.body || "").trim();
      const semiParts = bodyStr.includes("；") ? bodyStr.split("；").map((s) => s.trim()).filter(Boolean) : [];
      if (semiParts.length >= 2 && semiParts.length <= 4) {
        const linesHtml = semiParts
          .map((seg) => {
            const colonIdx = seg.indexOf("：");
            if (colonIdx > 0 && colonIdx <= 12) {
              return `<div class="ddk-kv-line"><span class="ddk-kv-k">${escapeHtml(seg.slice(0, colonIdx))}</span><span class="ddk-kv-v">${escapeHtml(seg.slice(colonIdx + 1).trim())}</span></div>`;
            }
            return `<div class="ddk-kv-line"><span class="ddk-kv-v">${escapeHtml(seg)}</span></div>`;
          })
          .join("");
        return `<div class="ddk-callout">
          <div class="ddk-callout-head">
            <span class="ddk-callout-tag">${escapeHtml(a.tag)}</span>
            <strong class="ddk-callout-title">${escapeHtml(a.title)}</strong>
          </div>
          <div class="ddk-kv-stack">${linesHtml}</div>
        </div>`;
      }

      return `<div class="ddk-callout">
        <div class="ddk-callout-head">
          <span class="ddk-callout-tag">${escapeHtml(a.tag)}</span>
          <strong class="ddk-callout-title">${escapeHtml(a.title)}</strong>
        </div>
        <p class="ddk-callout-body">${escapeHtml(bodyStr)}</p>
      </div>`;
    }).join("");

    return `<aside class="ddk-annotations${colClass}" aria-label="交易架构要点批注">${cellsHtml}</aside>`;
  }

    const annotationsHtml = showAnnotations
      ? renderDdkAnnotations(spec, txCaseOrSpec, options, statusInfo)
      : "";

    const headerPillTitle = spec.caseArchetypeLabel || (isPureAssetContract && spec.mechanism ? spec.mechanism : archInfo.labelZh);
    const legendHtml = isPureAssetContract
      ? `<span class="ddk-legend-item"><i class="is-cash"></i>合同价款结算</span>
        <span class="ddk-legend-item"><i class="is-asset"></i>设备 / 商业资产交付</span>
        <span class="ddk-legend-item">${escapeHtml(spec.assetContractLabel || "纯商业采购合同（非公司收购）")}</span>`
      : `<span class="ddk-legend-item"><i class="is-cash"></i>现金对价</span>
        <span class="ddk-legend-item"><i class="is-shares"></i>股权 / 换股</span>
        <span class="ddk-legend-item"><i class="is-asset"></i>资产交付 / 注销退市</span>
        <span class="ddk-legend-item"><i class="is-edge-solid"></i>${spec.evidenceLinks?.length ? "实线直接持股或管理 · 虚线间接或非管理权益" : "实线控股 · 虚线公众/少数"}</span>`;

    return `<section class="ddk-board is-status-${escapeHtml(spec.status)}${isTerminated ? " is-terminated" : ""}${options.compact ? " is-compact" : ""}" data-ddk-case="${escapeHtml(caseAttr)}" data-ddk-archetype="${escapeHtml(spec.archetype)}" data-ddk-filter="${escapeHtml(initialFilter)}" aria-label="交易架构与对价流向图">
      <header class="ddk-header">
        <div class="ddk-header-meta">
          <span class="ddk-archetype-pill">${escapeHtml(headerPillTitle)}<small>${escapeHtml(archInfo.id.toUpperCase())}</small></span>
          <span class="ddk-modality-pill is-modality-${escapeHtml(spec.modality)}">${escapeHtml(spec.caseModalityLabel || modalityInfo.labelZh)}</span>
          <span class="ddk-status-pill is-status-${escapeHtml(spec.status)}">${escapeHtml(spec.stageLabel || statusInfo.labelZh)}${spec.stageDate ? `<time>${escapeHtml(spec.stageDate)}</time>` : ""}</span>
        </div>
        <div class="ddk-filter-bar" role="group" aria-label="交易流向筛选">${filterBtnsHtml}</div>
      </header>
      <div class="ddk-svg-stage">
        ${renderDesktopSvg(layout, spec)}
        ${renderMobileStackedSvgs(layout, spec)}
      </div>
      <div class="ddk-legend-bar" aria-label="图例与筛选状态">
        ${legendHtml}
        <span class="ddk-filter-note" data-ddk-filter-note hidden></span>
      </div>
      ${annotationsHtml}${(spec.evidenceLinks?.length && typeof options.sourceLink === "function") ?
        `
      <div class="ddk-legend-bar" aria-label="交易结构披露原件">${spec.evidenceLinks.map(e => options.sourceLink(e, e.label)).join("")}</div>` : ""}
    </section>`;
  }

  function ordinaryConnectedFallback(txCase) {
    if (!txCase || detectArchetype(txCase) !== "connected_whitewash") return false;
    const rules = txCase.rules || [];
    return rules.some(r => /^HKEX:14A(?:[.]|$)/i.test(r.code || "")) &&
      !rules.some(r => /^TC:(?:NOTE1[-:]?RULE26|26[-:]?NOTE1|SCHEDULEVI|WHITEWASH)$/i.test(r.code || "") ||
        (/^TC:/i.test(r.code || "") && /清洗豁免|whitewash/i.test(r.application || "")));
  }

  function nonUnderwrittenRightsFallback(txCase) {
    return txCase?.category === "rights_issue" &&
      (!txCase.mandates?.some(m => m.role === "Underwriter")) &&
      /不[設设]包[銷销]|[無无]包[銷销]|不予包[銷销]|non[- ]underwritten/i.test(txCase.mechanism || "");
  }

  function renderCompactFlowBadge(txCase, documents) {
    const spec = resolveSpec(txCase, documents);
    if (!spec) {
      const nonUnderwritten = nonUnderwrittenRightsFallback(txCase);
      if (!nonUnderwritten && !ordinaryConnectedFallback(txCase)) return "";
      const label = nonUnderwritten ? "供股 · 不设包销" : txCase.category === "continuing_connected" ? "持续关连交易" :
        txCase.category === "vsa_vsd" ? "非常重大收购及出售 · 关连交易" : "关连交易";
      const stage = txCase.stage?.label || "";
      return `<div class="ddk-compact-flow" data-ddk-case="${escapeHtml(txCase.id || "")}"><span class="ddk-cf-archetype">${escapeHtml(label)}</span>${stage ? `<span class="ddk-cf-summary">${escapeHtml(stage)}</span>` : ""}</div>`;
    }
    const archInfo = ARCHETYPES[spec.archetype];
    const modalityInfo = MODALITY_BADGES[spec.modality];
    const caseAttr = spec.caseId || spec.id || spec.archetype;
    const summary =
      spec.compactSummary ||
      `${spec.flows[0].headline} → ${spec.after.outcomeBadge}`;

    return `<div class="ddk-compact-flow is-status-${escapeHtml(spec.status)} is-modality-${escapeHtml(spec.modality)}" data-ddk-case="${escapeHtml(caseAttr)}" data-ddk-archetype="${escapeHtml(spec.archetype)}">
      <span class="ddk-cf-archetype">${escapeHtml(spec.caseArchetypeLabel || archInfo.shortZh)}</span>
      <span class="ddk-cf-modality is-modality-${escapeHtml(spec.modality)}">${escapeHtml(spec.caseModalityShortLabel || modalityInfo.shortZh)}</span>
      <span class="ddk-cf-summary">${escapeHtml(summary)}</span>
    </div>`;
  }

  /* =========================================================================
     9. SINGLE IDEMPOTENT DELEGATED INTERACTION LISTENER
     ========================================================================= */
  const boundTargets = new WeakSet();

  function applyFilterToBoard(board, filterKey) {
    const key = VALID_FILTERS.has(filterKey) ? filterKey : "all";
    board.setAttribute("data-ddk-filter", key);
    if (board.dataset) board.dataset.ddkFilter = key;

    const buttons = board.querySelectorAll
      ? board.querySelectorAll("[data-ddk-filter-btn]")
      : [];
    for (const btn of buttons) {
      const btnKey = btn.getAttribute
        ? btn.getAttribute("data-ddk-filter-btn")
        : btn.dataset?.ddkFilterBtn;
      const active = btnKey === key;
      if (btn.classList) btn.classList.toggle("is-active", active);
      if (btn.setAttribute) btn.setAttribute("aria-pressed", active ? "true" : "false");
    }

    const note = board.querySelector ? board.querySelector("[data-ddk-filter-note]") : null;
    if (note) {
      const desktopSvg = board.querySelector ? board.querySelector(".ddk-svg-desktop") : null;
      const scope = desktopSvg || board;
      const arrows = scope.querySelectorAll
        ? Array.from(scope.querySelectorAll("[data-ddk-flow-kind]"))
        : [];
      if (key === "all") {
        note.hidden = true;
        note.textContent = "";
      } else {
        const matched = arrows.filter((el) => {
          const kind = el.getAttribute ? el.getAttribute("data-ddk-flow-kind") : el.dataset?.ddkFlowKind;
          const group = el.getAttribute ? el.getAttribute("data-ddk-flow-group") : el.dataset?.ddkFlowGroup;
          return key === "structural" ? group === "structural" : kind === key;
        }).length;
        note.hidden = false;
        note.textContent =
          matched === 0
            ? "当前交易无此类流向（其余已淡化）"
            : `已高亮 ${matched} / ${arrows.length} 条流向`;
      }
    }
  }

  function handleDelegatedClick(event) {
    const target = event && event.target;
    if (!target || typeof target.closest !== "function") return;
    const btn = target.closest("[data-ddk-filter-btn]");
    if (!btn) return;
    const board = btn.closest(".ddk-board");
    if (!board) return;
    const filterKey = btn.getAttribute
      ? btn.getAttribute("data-ddk-filter-btn")
      : btn.dataset?.ddkFilterBtn;
    applyFilterToBoard(board, filterKey);
  }

  function bindDiagramInteractions(targetDoc) {
    const doc = targetDoc || (typeof document !== "undefined" ? document : null);
    if (!doc || typeof doc.addEventListener !== "function") return false;
    if (boundTargets.has(doc)) return false;
    doc.addEventListener("click", handleDelegatedClick);
    boundTargets.add(doc);
    return true;
  }

  if (typeof document !== "undefined" && typeof document.addEventListener === "function") {
    bindDiagramInteractions(document);
  }

  return {
    VERSION,
    PILLAR_GROUPS,
    ARCHETYPES,
    primitives: {
      createDiagramCanvas,
      drawEntityBox,
      drawOwnershipEdge,
      drawTxArrow,
      finalizeLayout,
      resolveBoxAnchor,
    },
    lintDiagramGeometry,
    getSpecForCase,
    deriveDiagramFromCase,
    detectArchetype,
    validateDiagramSpec,
    renderDealDiagram,
    renderCompactFlowBadge,
    bindDiagramInteractions,
    applyFilterToBoard,
  };
});
