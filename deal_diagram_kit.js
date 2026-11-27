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
    if (sharesTerm && !cashScheme) {
      const action = String(sharesTerm.label || "股份数").trim();
      amountHeadlineParts.push(`${action} ${formatTermBrief(sharesTerm)}`);
    }
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

  function buildHuaxinHolcim(c,docs){
    const z="YS-20261127-06655-holcim",p="YS-20261012-06655-holcim",v="YS-20261030-06655-holcim";
    if(c.stage?.date!=="2026-11-27"||c.stage.status!=="active"||c.stage.eventKind!=="supplement"||
       docs?.[z]?.url!=="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1127/2026112701028.pdf"||
       ![z,p,v].every(id=>docs[id]?.caseId===c.id)||
       ![["consideration",259680000],["first_a_stake",34.9],["first_b_price",243450000],["first_b_stake",32.723]].every(([k,v])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===z)))return null;
    const l="Holderfin",r="Caricement",badge=c.stage.label;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const arrow=(id,kind,step,y,label,dashed)=>({id,panel:"left",kind,step,pathPoints:[[192,y],[448,y]],labelCenter:[320,y],labelWidth:210,labelHeight:34,label,dashed});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:385,status:"active",leftTitle:"第一階段 · 兩批交割",rightTitle:"控制權與後續安排",transitionLabel:"分批收購",outcomeBadge:badge}),[
      box("L_sell","left",43,100,149,146,"seller",l,"Holderfin B.V."),
      box("L_buy","left",448,100,157,146,"buyer",r,"華新建材全資附屬"),
      box("R_control","right",726,76,300,68,"target","HPI 已取得控制權","11 月 27 日 · 34.90% 間接權益"),
      box("R_pending","right",726,166,300,66,"buyer","第一階段合計 67.623%","尚待第二批 32.723% 交割"),
      box("R_option","right",726,254,300,66,"public","第二階段 31.377%","另按認購／沽售期權安排")
    ],[],[arrow("first_a","shares","①",138,"已交割 34.90%",false),arrow("first_b","shares","②",209,"待交割 32.723%",true)]);
    const nodes=[{id:"l",role:"seller",name:l},{id:"r",role:"buyer",name:r}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:c.stage.date,archetype:"acquisition",modality:"cash",status:"active",
      caseArchetypeLabel:"分批收購並取得控制權",caseModalityShortLabel:"現金 · 分批交割",
      before:{title:"交易雙方",nodes,equityLinks:[]},after:{title:"首批已交割",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"first_a",kind:"shares",direction:"ltr",fromLabel:l,toLabel:r,headline:"首批 34.90% 已交割；已支付 2.5968 億美元",proposedOrTerminated:false},{id:"first_b",kind:"shares",direction:"ltr",fromLabel:l,toLabel:r,headline:"次批 32.723% 待交割；估計 2.4345 億美元",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"已交割及取得控制權",body:"11 月 27 日，Caricement 承接買方權利與義務，已付 2.5968 億美元取得 34.90% 間接權益及控制權。"},{tag:"②",title:"其餘交易安排",body:"次批須於首批交割後三個月內進行，無額外先決條件；第二階段 31.377% 的認購及沽售期權條款不變。"}],
      evidenceLinks:[{documentId:z,pages:[1,2,3],label:"補充協議：買方替換、分批及已交割"},{documentId:p,pages:[17,18],label:"通函：第二階段期權"}],
      compactSummary:"首批 34.90% 已交割取得控制 · 次批 32.723% 待交割",topology});
  }

  function buildLufaxCCT(c,docs) {
    const x=({"HK-06623-20261106-pingan-purchasing":{"k":"purchasing","title":"服務及產品採購續期","counter":"中國平安附屬及聯營公司","pages":[11,12],"resolution":1,"flow":"陸金所向中國平安關連方採購服務及產品並支付費用。","signal":"採購費用上限","unitNote":"按年列示的應付服務費","capRows":[["採購費用",1878400000,1808200000]],"headline":["18.8 億元","18.1 億元"],"firstCap":1878400000},"HK-06623-20261106-pingan-financial":{"k":"financial","title":"金融服務框架續期","counter":"平安銀行及中國平安相關附屬公司","pages":[14,17],"resolution":2,"flow":"陸金所與平安銀行及中國平安相關附屬公司辦理存款、理財、衍生品及同業往來。","signal":"銀行存款每日本金餘額上限","unitNote":"與其他金融服務分項列示","capRows":[["存款每日最高本金",19000000000,19000000000],["存款利息收入",263000000,263000000],["理財產品每日最高餘額",1400000000,1400000000],["理財投資收入",73600000,73600000],["衍生品最高名義本金餘額",1400000000,1400000000],["同業存款每日最高餘額",15610000000,15600000000],["同業存款利息收入",150000000,175000000],["同業拆入每日最高餘額",1650000000,1700000000],["同業拆入應付利息",45000000,47500000]],"headline":["190 億元","190 億元"],"firstCap":19000000000},"HK-06623-20261106-pingan-consumer-finance":{"k":"consumer-finance","title":"平安消費金融合作續期","counter":"平安消費金融","pages":[19,22],"resolution":3,"flow":"陸金所向平安消費金融存放股東存款，其集團提供一般服務及融資擔保。","signal":"擔保本金最高每日餘額","unitNote":"按年列示的最高擔保本金","capRows":[["擔保本金每日最高餘額",31021100000,36373500000],["股東存款每日最高本金",10000000000,10000000000],["股東存款利息收入",250000000,250000000],["一般服務費收入",5510700000,6997400000],["擔保服務費收入",2875600000,3230800000]],"headline":["310.2 億元","363.7 億元"],"firstCap":31021100000},"HK-06623-20261106-pingan-account":{"k":"account","title":"平安產險賬戶管理框架","counter":"中國平安財產保險股份有限公司","pages":[24,25],"resolution":4,"flow":"陸金所管理平安產險信保業務客戶賬戶，平安產險支付固定費及按回收額計費。","signal":"賬戶管理應付服務費上限","unitNote":"僅本次一個年度","capRows":[["賬戶管理服務費收入",464100000]],"headline":["4.6 億元"],"firstCap":464100000}})[c.id],src="YS-20261127-06623-"+x?.k,ann="YS-20261106-06623-"+x?.k,meet="YS-20261127-06623-egm-"+x?.k;
    if(!x||c.stage?.status!=="active"||c.stage?.eventKind!=="dispatch"||c.stage?.date!=="2026-11-27"||![src,ann,meet].every(z=>docs?.[z]?.caseId===c.id)||
       docs[src].url!=="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1127/2026112701295.pdf"||
       !c.terms?.some(t=>t.key==="cap_0_2027"&&t.value===x.firstCap&&t.evidence?.documentId===src))return null;
    const l="陸金所",r={purchasing:"中國平安關連方",financial:"平安銀行及附屬", "consumer-finance":"平安消費金融", account:"平安產險"}[x.k], rt=x.k!=="purchasing", two=x.headline.length>1;
    const short={purchasing:"服務及產品採購",financial:"存款及金融服務","consumer-finance":"股東存款及擔保服務",account:"信保客戶賬戶管理"}[x.k];
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const badge=c.stage.label;
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:365,status:"active",leftTitle:x.title,rightTitle:"建議年度上限",transitionLabel:"待獨立股東批准",outcomeBadge:badge}),[
      box("l","left",43,100,149,140,"listed",l,"上市公司 06623"),box("r","left",448,100,157,140,"target",r,"框架對方"),
      box("cap","right",727,88,300,76,"target","2027 年："+x.headline[0],x.signal),
      box("next","right",727,207,300,76,"public",two?"2028 年："+x.headline[1]:"僅 2027 年",two?x.signal:"待獨立股東表決")],
      [],[{id:"arr",panel:"left",kind:"asset",step:"①",pathPoints:rt?[[192,169],[448,169]]:[[448,169],[192,169]],labelCenter:[320,169],labelWidth:206,labelHeight:35,label:short,dashed:true}]);
    const nodes=[{id:"l",role:"listed",name:l},{id:"r",role:"target",name:r}];
    return validateDiagramSpec({id:c.id,caseId:c.id,code:c.code,name:c.name,mechanism:c.mechanism,stageLabel:badge,stageDate:c.stage.date,archetype:"disclosable_major",modality:"mixed",status:"active",
      caseArchetypeLabel:"持續關連交易",caseModalityShortLabel:"建議年度上限",
      before:{title:"雙方安排",nodes,equityLinks:[]},after:{title:"建議上限",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"arr",kind:"asset",direction:rt?"ltr":"rtl",fromLabel:rt?l:r,toLabel:rt?r:l,headline:x.flow,proposedOrTerminated:true}],
      annotations:[{tag:"①",title:x.signal,body:x.unitNote+"；原幣人民幣，各年度分列。"},{tag:"②",title:"獨立股東表決",body:"12 月 22 日上午 9 時，第 "+x.resolution+" 項決議。"}],
      evidenceLinks:[{documentId:src,pages:[...x.pages,27,x.resolution===1?88:89],label:"通函：期限、上限與股東大會"}],compactSummary:x.signal+" · "+x.headline.join("／"),topology});
  }

  function buildStarShineCircleTime(c,docs){
    const z="YS-20261127-01440-circle-time",p="YS-20261023-01440-circle-time",m="YS-20261127-01440-egm";
    if(c.stage?.date!=="2026-11-27"||c.stage.status!=="active"||c.stage.eventKind!=="dispatch"||
       docs?.[z]?.url!=="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1127/2026112701034.pdf"||
       ![z,p,m].every(id=>docs[id]?.caseId===c.id)||
       ![["consideration",58700000],["loan_face",70965199],["cash_component",0]].every(([k,v])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===z)))return null;
    const l="應星控股",r="Glorious Way",badge=c.stage.label;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const arrow=(id,kind,step,x,y,end,label)=>({id,panel:"left",kind,step,pathPoints:[[x,y],[end,y]],labelCenter:[322,y],labelWidth:210,labelHeight:34,label,dashed:true});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"active",leftTitle:"出售股權及轉讓貸款",rightTitle:"交割時全數抵銷",transitionLabel:"附條件交易",outcomeBadge:badge}),[
      box("L_sell","left",43,100,149,146,"seller",l,"上市公司 01440"),
      box("L_buy","left",448,100,157,146,"buyer",r,"持有上市公司 28.85%"),
      box("R_loan","right",726,84,300,80,"target","Circle Time 貸款","擬轉讓本金約 7,096.5 萬港元"),
      box("R_cancel","right",726,211,300,76,"creditor","上市公司股東貸款","抵銷 5,870 萬港元 · 無現金")
    ],[],[arrow("equity","shares","①",192,138,448,"Circle Time 100%＋貸款"),arrow("setoff","cancel","②",448,209,192,"抵銷 5,870 萬港元")]);
    const nodes=[{id:"l",role:"seller",name:l},{id:"r",role:"buyer",name:r}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:c.stage.date,archetype:"acquisition",modality:"mixed",status:"active",
      caseArchetypeLabel:"附條件出售股權及貸款",caseModalityShortLabel:"股東貸款抵銷",
      before:{title:"附條件買賣",nodes,equityLinks:[]},after:{title:"擬交割結算",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"equity",kind:"shares",direction:"ltr",fromLabel:l,toLabel:r,headline:"擬轉讓 Circle Time 全部股權及其對應貸款債權",proposedOrTerminated:true},{id:"setoff",kind:"cancel",direction:"rtl",fromLabel:r,toLabel:l,headline:"買方持有的上市公司股東貸款擬抵銷 5,870 萬港元",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"標的貸款",body:"交割前重整後，Circle Time 欠應星控股 70,965,199 港元；貸款將連同標的股權轉讓予買方。"},{tag:"②",title:"股東貸款抵銷",body:"應星控股欠買方的股東貸款於交割時抵銷 5,870 萬港元，餘額估計約 1,240 萬港元；12 月 18 日擬交獨立股東表決。"}],
      evidenceLinks:[{documentId:z,pages:[6,9,10,12,20,21],label:"通函：買方、貸款及抵銷安排"},{documentId:m,pages:[1],label:"股東大會通知"}],
      compactSummary:"5,870 萬港元 · 股東貸款全額抵銷對價 · 待獨立股東表決",topology});
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

  function buildVerifiedAnpengOrTianjin(c, docs) {
    const ap=c.id==="HK-01958-20261125-anpeng-capital-injection", tj=c.id==="HK-03382-20260608-tianjin-port-two-terminals";
    if((!ap&&!tj)||c.stage?.status!=="active")return null;
    const kind=ap?"first_announcement":"dispatch",dt=ap?"2026-11-25":"2026-11-24",src=ap?"YS-20261125-4f9bc5f0496c":"YS-20261124-e54f1447bca6";
    const url=ap?"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1125/2026112501353.pdf":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1124/2026112401029.pdf";
    if(c.stage.eventKind!==kind||c.stage.date!==dt||docs?.[src]?.url!==url||docs[src].caseId!==c.id)return null;
    const t=(k,v)=>c.terms.some(o=>o.key===k&&o.value===v&&o.evidence?.documentId===src);
    if(ap?!(t("issuer_cash",4460600)&&t("all_subscribers_cash",17842400)&&t("issuer_post_stake",15)):!(t("consideration",6223719600)&&t("new_a_shares",1344215896)&&t("issue_price",4.63)))return null;
    const l=ap?"四名认购方":"天津港集团",r=ap?"安鹏服务":"天津港股份",s=c.stage.label;
    const mode=ap?"现金增资":"发行 A 股购买资产",top=ap?"增资款 · 各 446.06 万元":"两座码头 · 各 100% 股权",bot=ap?"各获标的 15% 股权":"13.44 亿股 A 股 · 每股 4.63 元";
    const note1=ap?"北京汽车、北汽新能源、北汽福田、北汽鹏龙各出资人民币 446.06 万元，合计 1,784.24 万元；其中 1,230 万元计入注册资本。":"天津港股份拟向天津港集团发行 1,344,215,896 股 A 股，每股人民币 4.63 元，收购二集司及汇盛公司各 100% 股权；总对价人民币 62.237196 亿元。";
    const note2=ap?"如完成，北汽产投持股由 100% 降至 40%，四名认购方各持 15%。协议列明 12 月 30 日前一次付清，各方付款义务仍有先决条件。":"如完成，天津港发展间接持股由 56.81% 降至 38.79%，拟按一致行动协议持续控制并合并报表。天津港集团拟直接持有天津港股份 31.99%。";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:365,status:"active",leftTitle:mode,rightTitle:"如完成 · 股权结构",transitionLabel:"待完成",outcomeBadge:s}),[
     box("L_l","left",42,96,150,146,ap?"buyer":"seller",l,ap?"北汽、北汽新能源／福田、鹏龙":"卖方及 A 股承配方"),
     box("L_r","left",461,96,143,146,ap?"target":"buyer",r,ap?"收取增资款":"收购方及发行人"),
     box("R_o","right",724,85,300,79,"target",ap?"安鹏服务股权":"天津港股份",""+(ap?"北汽产投 40% · 四名认购方各 15%":"天津港发展间接 38.79% · 仍合并报表")),
     box("R_c","right",724,210,300,79,"public",ap?"注册资本":"两座码头",ap?"820 万元 → 2,050 万元":"天津港股份各持 100%")
    ],[],[
      {id:"one",panel:"left",kind:ap?"cash":"asset",step:"①",pathPoints:[[192,139],[461,139]],labelCenter:[326,139],labelWidth:212,labelHeight:34,label:top},
      {id:"two",panel:"left",kind:"shares",step:"②",pathPoints:[[461,207],[192,207]],labelCenter:[326,207],labelWidth:227,labelHeight:34,label:bot}
    ]);
    const nodes=[{id:"l",role:ap?"buyer":"seller",name:l},{id:"r",role:ap?"target":"buyer",name:r}];
    return {id:c.id,caseId:c.id,code:c.code,name:c.name,mechanism:c.mechanism,stageLabel:s,stageDate:dt,archetype:"disposal",modality:ap?"cash":"shares",status:"active",caseArchetypeLabel:ap?"关连增资":"发行 A 股购买资产",caseModalityShortLabel:mode,
      before:{title:"拟议交易",nodes,equityLinks:[]},after:{title:"如完成",nodes,equityLinks:[],outcomeBadge:s},
      flows:[{id:"one",kind:ap?"cash":"asset",direction:"ltr",fromLabel:l,toLabel:r,headline:top,proposedOrTerminated:true},{id:"two",kind:"shares",direction:"rtl",fromLabel:r,toLabel:l,headline:bot,proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"对价及标的",body:note1},{tag:"②",title:"拟议完成后",body:note2}],evidenceLinks:[{documentId:src,pages:ap?[2,3,4]:[9,10,11,18],label:ap?"公告：出资、付款条件及股权":"通函：发行条款及持股结构"}],compactSummary:mode+" · "+s,topology};
  }

  function buildVerifiedDaxOffer(c, docs) {
    const id="HK-02663-20261020-dax", cl="YS-20261104-366816c5caba", delay="YS-20261125-d1b7ab1b9fc0";
    if(c.id!==id||c.stage?.date!=="2026-11-25"||c.stage?.status!=="active"||!c.events?.some(x=>x.kind==="control_completion"&&x.state==="actual"&&x.date==="2026-10-30"&&x.evidence?.documentId===cl)||
      !c.processEvents?.some(x=>x.kind==="dispatch_extension"&&x.date==="2026-11-25"&&x.evidence?.documentId===delay)||docs?.[cl]?.caseId!==id||docs?.[delay]?.caseId!==id)return null;
    const t=(k,v)=>c.terms?.some(o=>o.key===k&&o.value===v&&o.evidence?.documentId===cl);
    if(!t("completed_block_shares",406010000)||!t("completed_block_pct",72.9)||!t("control_block",218717587)||!t("offer_residual_shares",150920000)||!t("offer_cash_cap",81300604)||!t("offer_price",0.5387))return null;
    const name="应力控股",buyer="Dax Energy",sellers="控股权卖方",holders="余股股东",badge="控股权已交割 · 综合文件尚未寄发";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:365,status:"active",leftTitle:"10 月 30 日 · 控股权已交割",rightTitle:"余股现金要约",transitionLabel:"触发要约",outcomeBadge:badge}),[
      box("L_s","left",43,103,152,151,"seller",sellers,"两笔股权转让"),
      box("L_b","left",449,103,156,151,"buyer",buyer,"取得约 72.90%"),
      box("R_a","right",728,93,286,74,"target","每股 0.5387 港元","拟收购余下 1.5092 亿股"),
      box("R_b","right",728,201,286,75,"public","最高 8,130.1 万港元","按余股全部接纳计算")
    ],[],[
      {id:"shares",panel:"left",kind:"shares",step:"①",pathPoints:[[195,144],[449,144]],labelCenter:[323,144],labelWidth:209,labelHeight:36,label:"4.0601 亿股"},
      {id:"cash",panel:"left",kind:"cash",step:"②",pathPoints:[[449,218],[195,218]],labelCenter:[323,218],labelWidth:209,labelHeight:36,label:"现金 2.187 亿港元"}
    ]);
    const nodes=[{id:"s",role:"seller",name:sellers},{id:"b",role:"buyer",name:buyer},{id:"h",role:"public",name:holders}];
    return {id,caseId:id,name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:c.stage.date,archetype:"offer",modality:"cash",status:"active",caseArchetypeLabel:"控股权转让及强制全面要约",caseModalityShortLabel:"现金",
      before:{title:"控股权已交割",nodes,equityLinks:[]},after:{title:"余股要约",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"shares",kind:"shares",direction:"ltr",fromLabel:sellers,toLabel:buyer,headline:"4.0601 亿股",proposedOrTerminated:false},
        {id:"cash",kind:"cash",direction:"rtl",fromLabel:buyer,toLabel:sellers,headline:"218,717,587 港元",proposedOrTerminated:false},
        {id:"offer",kind:"cash",direction:"ltr",fromLabel:buyer,toLabel:holders,headline:"每股 0.5387 港元 · 以实际接纳为准",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"已完成的收购",body:"主协议 397,190,000 股与联名卖方另外 8,820,000 股于 10 月 30 日交割，合计约 72.90%。"},
        {tag:"②",title:"余股及文件",body:"余下 150,920,000 股，如全部接纳最高支付 81,300,604 港元。11 月 25 日申请将综合文件寄发期限延至最迟 12 月 7 日；执行人员表示倾向同意。"}],
      evidenceLinks:[{documentId:cl,pages:[2,3,10],label:"联合公告：交割及余股要约"},{documentId:delay,pages:[2],label:"公告：申请延寄"}],compactSummary:"应力控股 · 72.90% 已交割 · 余股按接纳",topology};
  }

  function buildVerifiedWingFungOrLotus(c,docs){
    const w=c.id==="HK-08526-20261103-lumina",l=c.id==="HK-06063-20260908-control-mgo";if(!w&&!l)return null;
    const docA=w?"YS-20261103-65f91333a74a":"YS-20260908-d05d8436a3bd",docB=w?"YS-20261124-73801e3ed526":"YS-20261020-da8043d5ad2c",docC="YS-20261124-694c9bc9c554";
    if(docs?.[docA]?.caseId!==c.id||docs?.[docB]?.caseId!==c.id||c.stage.date!==(w?"2026-11-24":"2026-10-20")||c.stage.eventKind!==(w?"dispatch_extension":"completion"))return null;
    const term=(k,v,src)=>c.terms.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===src);
    if(w?!(term("control_block",41505401,docA)&&term("block_pct",51.19,docA)&&term("offer_cash_cap",39569993.75,docA)) :
         !(term("control_pct",74.75,docA)&&term("control_cash",101660000,docA)&&term("accepted_shares",64000,docB)&&term("accepted_gross",4352,docB)&&c.processEvents?.some(e=>e.kind==="public_float_restored"&&e.date==="2026-11-24"&&e.state==="actual"&&e.evidence?.documentId===docC)&&docs?.[docC]?.caseId===c.id))return null;
    const buyer=w?"Lumina Holdings":"Victor Xu Limited",seller=w?"Wing Fung Capital":"Platinum Lotus",status=w?"active":"closed",badge=w?"控股权已交割 · 申请延寄综合文件":"要约已截止 · 公众持股量恢复至 25%";
    const box=(id,panel,x,y,wi,h,role,title,subtitle)=>({id,panel,x,y,w:wi,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:365,status,leftTitle:"已完成的控股权转让",rightTitle:w?"余股强制现金要约":"要约结果及后续",transitionLabel:w?"触发要约":"要约已截止",outcomeBadge:badge}),[
      box("L_s","left",41,96,162,149,"seller",seller,w?"转让 8,306.25 万股":"转让 14.95 亿股"),
      box("L_b","left",445,96,160,149,"buyer",buyer,w?"取得约 51.19%":"取得 74.75%"),
      box("R_a","right",724,82,300,80,"target",w?"每股 0.4997 港元":"有效接纳 6.4 万股",w?"全数接纳上限 3,957.0 万港元":"3 份接纳 · 应付 4,352 港元"),
      box("R_b","right",724,208,300,77,"public",w?"综合文件尚未寄发":"公众持股量恢复至 25%",w?"已申请延至最迟 12 月 8 日":"11 月 24 日公开市场出售 6.4 万股")
    ],[],[
     {id:"acq",panel:"left",kind:"shares",step:"①",pathPoints:[[203,135],[445,135]],labelCenter:[324,135],labelWidth:190,labelHeight:36,label:w?"约 51.19% 股权":"74.75% 股权"},
     {id:"value",panel:"left",kind:w?"asset":"cash",step:"②",pathPoints:[[445,207],[203,207]],labelCenter:[324,207],labelWidth:194,labelHeight:36,label:w?"承接债务 · 4,150.5 万港元":"现金 1.0166 亿港元"}
    ]);
    const nodes=[{id:"s",role:"seller",name:seller},{id:"b",role:"buyer",name:buyer},{id:"p",role:"public",name:"余股股东"}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:c.stage.date,archetype:"offer",modality:w?"mixed":"cash",status,caseArchetypeLabel:"控股权转让及强制要约",caseModalityShortLabel:w?"承接债务／余股现金":"现金",
    before:{title:"控股权已交割",nodes,equityLinks:[]},after:{title:w?"余股要约":"要约已截止",nodes,equityLinks:[],outcomeBadge:badge},
    flows:[{id:"acq",kind:"shares",direction:"ltr",fromLabel:seller,toLabel:buyer,headline:w?"8,306.25 万股已转让":"14.95 亿股已转让",proposedOrTerminated:false},
    ...(w?[{id:"value",kind:"asset",direction:"ltr",fromLabel:buyer,toLabel:"Fast Upgrade（债权人）",headline:"承接卖方拖欠贷款本金及利息",proposedOrTerminated:false}]:[{id:"value",kind:"cash",direction:"rtl",fromLabel:buyer,toLabel:seller,headline:"控股权对价 1.0166 亿港元",proposedOrTerminated:false}]),
    {id:"offer",kind:"cash",direction:"ltr",fromLabel:buyer,toLabel:"余股股东",headline:w?"全数接纳时最高 39,569,993.75 港元":"有效接纳 64,000 股 · 应付 4,352 港元",proposedOrTerminated:w}],
    annotations:[{tag:"①",title:"控股权交易及对价",body:w?"Lumina 承接卖方对 Fast Upgrade 未偿还的本金及利息合计 41,505,401 港元，由此履行购股对价；相应股份质押解除。":"Victor Xu 以 101,660,000 港元取得 1,495,000,000 股，占 74.75%。"},
    {tag:"②",title:w?"余股及延寄申请":"要约接纳与公众持股",body:w?"文件原定 11 月 24 日或之前寄发，现申请延至最迟 12 月 8 日，收购执行人员表示倾向同意。":"10 月 20 日要约截止，三份有效接纳合计 64,000 股。11 月 24 日要约人另在公开市场出售 64,000 股，公众持股量恢复至 25%。"}],
    evidenceLinks:[{documentId:docA,pages:w?[2,6,7,8]:[2,3],label:"控股权交割公告"},{documentId:docB,pages:w?[2]:[2,3],label:w?"延期申请":"要约结果"},...(w?[]:[{documentId:docC,pages:[1],label:"公众持股量恢复"}])],compactSummary:badge,topology};
  }

  function buildVerifiedHuyouOrVistar(c,docs){
    const w=c.id==="HK-02179-20261118-huyou-h-share-whitewash",l=c.id==="HK-08535-20261102-zeng-kai";
    if(!w&&!l)return null;
    const docA=w?"YS-20261118-72180dd80772":"YS-20261102-e5d2053658cf",docB=w?"YS-20261124-035393fe6d0e":"YS-20261123-eab2499c4892";
    const dt=w?"2026-11-24":"2026-11-23";
    if(docs?.[docA]?.caseId!==c.id||docs?.[docB]?.caseId!==c.id||c.stage.date!==dt||c.stage.status!=="active"||c.stage.eventKind!==(w?"ifa_appointment":"dispatch_extension"))return null;
    const term=(k,v)=>c.terms.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===docA);
    if(w?!(term("subscription_cash",350696715)&&term("subscription_price",5)):!(term("control_block",28500000)&&term("block_pct",75)&&term("offer_cash_cap",9510000)&&term("offer_price",0.0317)))return null;
    const left=w?"香港护佑健康":"三名控股权卖方",right=w?"瑞科生物":"曾凯",caption=w?"拟认购新 H 股":"10 月 15 日 · 已交割",badge=w?"待清洗豁免及独立股东批准":"控股权已交割 · 申请延寄综合文件";
    const box=(id,panel,x,y,wi,h,role,title,subtitle)=>({id,panel,x,y,w:wi,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:365,status:"active",leftTitle:caption,rightTitle:w?"股权影响及条件":"未完成的余股要约",transitionLabel:w?"如完成":"触发要约",outcomeBadge:badge}),[
       box("L_l","left",46,101,153,141,w?"buyer":"seller",left,w?"扬子江药业全资附属公司":"合计出售 9 亿股"),
       box("L_r","left",447,101,156,141,w?"listed":"buyer",right,w?"发行人":"取得 75%"),
       box("R_a","right",720,84,305,78,"target",w?"一致行动组持股":"每股 0.0317 港元",w?"25.68% → 33.16%":"要约涉及余下 3 亿股"),
       box("R_b","right",720,208,305,78,"public",w?"清洗豁免及独立股东批准":"最高 951 万港元",w?"11 月 24 日委任新百利为独立财顾":"全数接纳上限 · 综合文件尚未寄发"),
    ],[],[
      {id:"leg1",panel:"left",kind:w?"cash":"shares",step:"①",pathPoints:[[199,137],[447,137]],labelCenter:[323,137],labelWidth:206,labelHeight:35,label:w?"拟认购款 3.507 亿港元":"9 亿股"},
      {id:"leg2",panel:"left",kind:w?"shares":"cash",step:"②",pathPoints:[[447,206],[199,206]],labelCenter:[323,206],labelWidth:206,labelHeight:35,label:w?"拟发 7,013.9343 万股 H 股":"现金 2,850 万港元"},
    ]);
    const nodes=[{id:"l",role:w?"buyer":"seller",name:left},{id:"r",role:w?"listed":"buyer",name:right}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:dt,archetype:w?"connected_whitewash":"offer",modality:"cash",status:"active",
      caseArchetypeLabel:w?"H 股认购及清洗豁免":"控股权转让及强制要约",caseModalityShortLabel:w?"现金认购新 H 股":"现金",
      before:{title:caption,nodes,equityLinks:[]},after:{title:w?"如完成":"余股要约",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"leg1",kind:w?"cash":"shares",direction:"ltr",fromLabel:left,toLabel:right,headline:w?"拟认购款 350,696,715 港元":"9 亿股已转让",proposedOrTerminated:w},
      {id:"leg2",kind:w?"shares":"cash",direction:"rtl",fromLabel:right,toLabel:left,headline:w?"拟发行 70,139,343 股新 H 股":"控股权对价 2,850 万港元",proposedOrTerminated:w},...(w?[]:[{id:"offer",kind:"cash",direction:"ltr",fromLabel:right,toLabel:"余股股东",headline:"每股 0.0317 港元，以实际接纳为准",proposedOrTerminated:true}])],
      annotations:[{tag:"①",title:w?"现金认购":"已完成的控股收购",body:w?"香港护佑健康拟以每股 5 港元认购 70,139,343 股新 H 股，认购总额 350,696,715 港元。":"曾凯合计向 Success Step、Noble Capital Concept 及 Legend Advanced 购买 9 亿股；总现金对价由 Success Step 代表三方收取。"},
      {tag:"②",title:w?"清洗豁免条件":"余股要约与寄发申请",body:w?"认购人与一致行动人士合计持股拟从 25.68% 增至 33.16%。完成仍须取得清洗豁免及独立股东批准。":"每股 0.0317 港元，若全数接纳上限 951 万港元。已申请将综合文件延至最迟 12 月 14 日寄发，执行人员表示倾向同意。"}],
      evidenceLinks:[{documentId:docA,pages:w?[1,3,5,17]:[2,3,6,7],label:w?"认购及清洗豁免公告":"控股权交割及余股要约公告"},{documentId:docB,pages:w?[1]:[2],label:w?"独立财务顾问委任":"申请延寄"}],compactSummary:badge,topology};
   }

  function buildVerifiedGreentechOrRke(c,docs){
    const g=c.id==="HK-00195-20261124-zhang-yunhe-partial",r=c.id==="HK-01098-20261120-rke-stake-creditor-spv";
    if(!g&&!r)return null;
    const src=g?"YS-20261124-981e7caeaa57":"YS-20260527-bd443d3b6245",vote="YS-20261124-7751c4cf6b66",dt=g?"2026-11-24":"2026-11-23";
    if(docs?.[src]?.caseId!==c.id||c.stage?.status!=="active"||c.stage?.date!==dt||c.stage.eventKind!==(g?"first_announcement":"creditor_vote")||(!g&&docs?.[vote]?.caseId!==c.id))return null;
    const term=(k,v)=>c.terms.some(t=>t.key===k&&t.value===v);
    if(g?!(term("max_shares",6250000)&&term("offer_price",0.6)&&term("max_cash",3750000)&&c.rules.some(x=>x.code==="TC:28.7")):!(term("rke_transferred_stake",70)&&term("rke_retained_stake",5)&&term("rki_creditors_approved_value_pct",96.93)&&term("new_select_creditors_approved_value_pct",99.61)))return null;
    const left=g?"张云鹤":"New Select",right=g?"合资格股东":"债权人 SPV";
    const badge=g?"拟提出部分要约 · 待同意及豁免":"债权人已批准 · 待股东大会及法院认许";
    const box=(id,panel,x,y,wi,h,role,title,subtitle)=>({id,panel,x,y,w:wi,h,role,title,subtitle});
    const arrows=[{id:"first",panel:"left",kind:g?"cash":"shares",step:"①",pathPoints:[[192,138],[448,138]],labelCenter:[320,138],labelWidth:200,labelHeight:34,label:g?"现金 · 每股 0.60 港元":"拟转让路劲高速 70%"}];
    if(g)arrows.push({id:"second",panel:"left",kind:"shares",step:"②",pathPoints:[[448,209],[192,209]],labelCenter:[320,209],labelWidth:200,labelHeight:34,label:"最多 625 万股"});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"active",leftTitle:g?"退市后的自愿现金部分要约":"路劲高速股权拟用于非现金抵债",rightTitle:g?"要约上限及先决条件":"债权人表决及实施条件",transitionLabel:g?"待提出要约":"待实施",outcomeBadge:badge}),[
      box("L_l","left",43,100,149,146,g?"buyer":"seller",left,g?"要约人":"路劲基建全资附属公司"),
      box("L_r","left",448,100,157,146,g?"public":"buyer",right,g?"绿科科技国际 · 已退市":"拟持路劲高速 70%"),
      box("R_a","right",728,84,295,75,"target",g?"最高 375 万港元":"两项债权人计划获通过",g?"最多约占已发行股本 0.46%":"按债权金额：96.93%／99.61%"),
      box("R_b","right",728,210,295,75,"public",g?"待两项监管决定":"拟保留路劲高速 5%",g?"收购守则 28.1 同意及 28.7 豁免":"仍待股东批准及法院认许"),
    ],[],arrows);
    const nodes=[{id:"l",role:g?"buyer":"seller",name:left},{id:"r",role:g?"public":"buyer",name:right}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:dt,archetype:g?"offer":"debt_restructuring",modality:g?"cash":"in_kind",status:"active",
      caseArchetypeLabel:g?"自愿现金部分要约":"股权抵偿及债务重组",caseModalityShortLabel:g?"现金":"非现金",
      before:{title:g?"要约提出前":"实施前",nodes,equityLinks:[]},after:{title:g?"要约条款":"拟实施后的转让",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"first",kind:g?"cash":"shares",direction:"ltr",fromLabel:left,toLabel:right,headline:g?"每股 0.60 港元、上限 375 万港元":"路劲高速 70% 股权用于债务重组",proposedOrTerminated:true},
      ...(g?[{id:"second",kind:"shares",direction:"rtl",fromLabel:right,toLabel:left,headline:"最多 625 万股",proposedOrTerminated:true}]:[])],
      annotations:[{tag:"①",title:g?"退市后拟议要约":"非现金股权转让",body:g?"绿科科技国际于 2026 年 8 月 24 日退市。11 月 24 日公告为拟议部分要约：每股 0.60 港元，最多 625 万股，最高 375 万港元。":"New Select 拟转让路劲高速 70% 股权至债权人持有的 SPV，并保留 5%。此部分为非现金安排。"},
      {tag:"②",title:g?"先决条件":"债权人表决及后续条件",body:g?"提出要约前须获规则 28.1 同意及规则 28.7 豁免；若获准并提出，要约不以接纳水平为条件。":"两组债权人于 11 月 23 日通过各自计划，按投票债权金额分别为 96.93% 及 99.61%；涉及股权转让仍待所需股东批准及法院认许等条件。"}],
      evidenceLinks:[{documentId:src,pages:g?[1,2,3]:[2,5],label:g?"证监会原件：要约参数及条件":"债务重组公告：股权转让"},...(g?[]:[{documentId:vote,pages:[2,3],label:"两组债权人表决结果"}])],compactSummary:badge,topology};
   }

  function buildVerifiedSmitSwap(c,docs){
    const src="YS-20261013-bfb92807e1bf", close="YS-20261106-bc11bd8d0cdd", dt="2026-11-06";
    if(c.stage?.status!=="closed"||c.stage?.date!==dt||c.stage?.eventKind!=="completion"||docs?.[src]?.caseId!==c.id||docs?.[close]?.caseId!==c.id)return null;
    const term=(k,v)=>c.terms?.some(t=>t.key===k&&t.currency==="CNY"&&t.value===v);
    if(!term("issuer_swap_consideration",194800000)||!term("third_party_injection",518150000))return null;
    const left="S2C Holding",right="无锡亚科鸿禹",badge="换股及增资已完成 · 2026-11-06";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const arrow=(id,k,step,x,y,xx,label)=>({id,panel:"left",kind:k,step,pathPoints:[[x,y],[xx,y]],labelCenter:[320,y],labelWidth:214,labelHeight:34,label});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"closed",leftTitle:"国微控股以股权支付认购对价",rightTitle:"增资完成后持股及对价",transitionLabel:"换股及增资",outcomeBadge:badge}),[
      box("L_l","left",43,100,149,146,"buyer",left,"国微控股投资载体"),box("L_r","left",448,100,157,146,"target",right,"接受股权出资及增资"),
      box("R_a","right",728,84,295,75,"target","换股后 10.12%","其他认购人增资后降至 7.98%"),
      box("R_b","right",728,210,295,75,"buyer","其他认购方增资 5.18 亿元人民币","现金与应收款抵销"),
    ],[],[arrow("in","shares","①",192,138,448,"注入 S2C 上海 13.75%"),arrow("out","shares","②",448,209,192,"取得无锡亚科鸿禹 10.12%")]);
    const nodes=[{id:"l",role:"buyer",name:left},{id:"r",role:"target",name:right}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:dt,archetype:"acquisition",modality:"in_kind",status:"closed",
      caseArchetypeLabel:"以股权出资及增资",caseModalityShortLabel:"股权对价",before:{title:"换股",nodes,equityLinks:[]},after:{title:"增资完成",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"in",kind:"shares",direction:"ltr",fromLabel:left,toLabel:right,headline:"以 S2C 上海 13.75% 股权支付约 1.95 亿元人民币的认购对价"},{id:"out",kind:"shares",direction:"rtl",fromLabel:right,toLabel:left,headline:"换股后 10.12%；增资完成后间接持股约 7.98%"}],
      annotations:[{tag:"①",title:"国微控股一腿",body:"S2C Holding 以 S2C 上海约 13.75% 股权出资，对价约人民币 1.95 亿元。全体换股方对价约人民币 12.23 亿元，已包含此项。"},
      {tag:"②",title:"增资与最终持股",body:"其他认购方增资对价约人民币 5.18 亿元，包括现金及应收款抵销。2026 年 11 月 6 日换股及增资完成，国微控股间接持股约 7.98%。"}],
      evidenceLinks:[{documentId:src,pages:[4],label:"换股及增资条款"},{documentId:close,pages:[1],label:"交易完成及最终持股"}],compactSummary:badge,topology};
  }

  function buildVerifiedVax(c,docs){
    const src="YS-20261022-5d0d050ce57e", close="YS-20261123-e5fe6fe73e9f", dt="2026-11-23";
    if(c.stage?.status!=="closed"||c.stage?.date!==dt||c.stage?.eventKind!=="completion"||docs?.[src]?.caseId!==c.id||docs?.[close]?.caseId!==c.id)return null;
    const term=(k,v)=>c.terms?.some(t=>t.key===k&&t.currency==="HKD"&&t.value===v);
    if(!term("purchase_price",25000000)||!term("cash_consideration",20000000)||!term("convertible_principal",5000000))return null;
    const left="域能控股",right="苏树辉博士",badge="已交割 · 代价可换股债券已发行";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const arrow=(id,k,step,x,y,xx,label)=>({id,panel:"left",kind:k,step,pathPoints:[[x,y],[xx,y]],labelCenter:[320,y],labelWidth:210,labelHeight:34,label});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"closed",leftTitle:"收购 VAX 股权",rightTitle:"交割及可换股债券",transitionLabel:"已交割",outcomeBadge:badge}),[
      box("L_l","left",43,100,149,171,"buyer",left,"买方及发债人"),box("L_r","left",448,100,157,171,"seller",right,"卖方及债券认购人"),
      box("R_a","right",728,84,295,75,"target","取得 VAX 1.46% 股权","2026 年 11 月 23 日交割"),
      box("R_b","right",728,210,295,75,"buyer","可换股债券：本金 500 万港元","初始换股价每股 2.50 港元"),
    ],[],[arrow("pay","cash","①",192,138,448,"现金 2,000 万港元"),arrow("bond","asset","②",192,200,448,"代价债券 500 万港元"),arrow("stake","shares","③",448,252,192,"VAX 1.46% 股权")]);
    const nodes=[{id:"l",role:"buyer",name:left},{id:"r",role:"seller",name:right}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:dt,archetype:"acquisition",modality:"mixed",status:"closed",
      caseArchetypeLabel:"关连股权收购",caseModalityShortLabel:"现金及代价可换股债券",before:{title:"收购",nodes,equityLinks:[]},after:{title:"交割完成",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"pay",kind:"cash",direction:"ltr",fromLabel:left,toLabel:right,headline:"现金 2,000 万港元"},{id:"bond",kind:"asset",direction:"ltr",fromLabel:left,toLabel:right,headline:"500 万港元可换股债券已发行"},{id:"stake",kind:"shares",direction:"rtl",fromLabel:right,toLabel:left,headline:"VAX 1.46% 股权已交割"}],
      annotations:[{tag:"①",title:"收购对价",body:"总对价 2,500 万港元，分为 2,000 万港元现金及 500 万港元代价可换股债券。"},
      {tag:"②",title:"债券发行与换股条款",body:"债券随交割发行；三年期、零息。按初始换股价全数转换对应 200 万股域能控股股份。"}],
      evidenceLinks:[{documentId:src,pages:[9,11,16,17],label:"收购对价及债券条款"},{documentId:close,pages:[1],label:"交割及代价债券发行"}],compactSummary:badge,topology};
  }

  function buildVerifiedCalcExtension(c,docs){
    const src="YS-20261124-a7305a865955", dt="2026-11-24";
    if(c.stage?.status!=="active"||c.stage?.date!==dt||c.stage?.eventKind!=="dispatch"||docs?.[src]?.caseId!==c.id||!docs[src].url?.endsWith("/1125/2026112400422.pdf"))return null;
    const term=(k,v)=>c.terms?.some(t=>t.key===k&&t.currency==="HKD"&&t.value===v);
    if(!term("outstanding_principal",850000000)||!term("annual_financial_assistance_cap",650000000)||!c.processEvents?.some(e=>e.date==="2026-12-16"&&e.kind==="vote"&&e.state==="expected"))return null;
    const left="ARI",right="ZF Investment",badge="拟展期 · 待独立股东表决";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"active",leftTitle:"现有可交换债券拟展期三年",rightTitle:"贷款及担保上限与审批",transitionLabel:"两项议案互为条件",outcomeBadge:badge}),[
      box("L_l","left",43,100,149,146,"target",left,"可交换债券发行人"),box("L_r","left",448,100,157,146,"buyer",right,"中国飞机租赁全资子公司"),
      box("R_a","right",728,84,295,75,"target","每年上限 6.5 亿港元","2027–2029 年股东贷款及担保"),
      box("R_b","right",728,210,295,75,"public","独立股东分别表决","股东大会拟于 2026-12-16 举行"),
    ],[],[{id:"extend",panel:"left",kind:"asset",step:"①",pathPoints:[[192,160],[448,160]],labelCenter:[320,160],labelWidth:210,labelHeight:34,label:"未偿本金 8.5 亿港元"}]);
    const nodes=[{id:"l",role:"target",name:left},{id:"r",role:"buyer",name:right}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:dt,archetype:"debt_restructuring",modality:"in_kind",status:"active",
      caseArchetypeLabel:"可交换债券展期及股东贷款续期",caseModalityShortLabel:"现有债券展期",before:{title:"现有债券条款",nodes,equityLinks:[]},after:{title:"拟展期安排",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"extend",kind:"asset",direction:"ltr",fromLabel:left,toLabel:right,headline:"现有债券未偿本金 8.5 亿港元；到期日拟由 2026-12-31 延至 2029-12-31",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"现有可交换债券",body:"债券可交换为 CAAM 股份。到期日拟由 2026 年 12 月 31 日延至 2029 年 12 月 31 日，未偿本金 8.5 亿港元。"},
      {tag:"②",title:"股东贷款及担保",body:"2027 至 2029 年每日最高日终余额上限每年 6.5 亿港元。两项议案分别表决、互为条件；按通函拟于 2026 年 12 月 16 日表决。"}],
      evidenceLinks:[{documentId:src,pages:[15,18,19,20,105,106],label:"通函：贷款上限、债券展期及股东大会议程"}],compactSummary:badge,topology};
  }

  function buildVerifiedKfmBlock(c,docs){
    const src="YS-20260930-b13b8bdc0162", upd="YS-20261127-03816-cb-issued", dt="2026-11-27";
    if(c.stage?.status!=="active"||c.stage?.date!==dt||c.stage?.eventKind!=="supplement"||docs?.[src]?.caseId!==c.id||docs?.[upd]?.caseId!==c.id||docs[upd].url!=="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1127/2026112701389.pdf")return null;
    const term=(k,v)=>c.terms?.some(t=>t.key===k&&t.value===v);
    if(!term("control_cash",684000000)||!term("block_shares",342000000)||!term("block_pct",57)||!term("offer_shares",150000988)||!term("offer_price",2)||!term("cb_issued_principal",342000000)||!term("cb_max_conversion_shares",171000000))return null;
    const left="KIG Real Estate",right="香港立讯",badge="可换股债已发行 · 控股股份待交割";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const arrow=(id,k,step,x,y,xx,label)=>({id,panel:"left",kind:k,step,pathPoints:[[x,y],[xx,y]],labelCenter:[320,y],labelWidth:214,labelHeight:34,label});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"active",leftTitle:"双方拟买卖 KFM 金德现有股份",rightTitle:"可换股债认购与余股要约",transitionLabel:"控股股份交割后触发要约",outcomeBadge:badge}),[
      box("L_l","left",43,100,149,146,"seller",left,"现有控股股东"),box("L_r","left",448,100,157,146,"buyer",right,"拟收购 KFM 金德 57%"),
      box("R_a","right",728,84,295,75,"buyer","已发行 3.42 亿港元可换股债","合计最多可换 1.71 亿股"),
      box("R_b","right",728,210,295,75,"public","拟按每股 2 港元提出余股要约","按公告情景，现金上限约 3 亿港元"),
    ],[],[arrow("block","shares","①",192,138,448,"拟转让 3.42 亿股现有股份"),arrow("cash","cash","②",448,209,192,"拟付 6.84 亿港元")]);
    const nodes=[{id:"l",role:"seller",name:left},{id:"r",role:"buyer",name:right}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:dt,archetype:"offer",modality:"cash",status:"active",
      caseArchetypeLabel:"控股股份买卖及可能强制要约",caseModalityShortLabel:"现金收购及条件挂钩可换股债",before:{title:"已签控股股份买卖协议",nodes,equityLinks:[]},after:{title:"待交割及触发要约",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"block",kind:"shares",direction:"ltr",fromLabel:left,toLabel:right,headline:"拟转让现有 3.42 亿股，占公告时股本 57%",proposedOrTerminated:true},{id:"cash",kind:"cash",direction:"rtl",fromLabel:right,toLabel:left,headline:"协议现金对价 6.84 亿港元",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"控股股份买卖",body:"KIG 拟出售 3.42 亿股现有股份，每股 2 港元。立讯的可换股债认购完成是股份交割的先决条件之一。"},
      {tag:"②",title:"可换股债进度",body:"11 月 27 日，立讯及其他四项认购完成，合计发行 3.42 亿港元可换股债。每股换股价 2 港元；当日已发行普通股仍为 6 亿股。"},
      {tag:"③",title:"交割后触发的现金要约",body:"按公告股本不变情景，余股最多 150,000,988 股，按每股 2 港元计的现金上限为 300,001,976 港元。KIG 承诺保留的股份不计入此上限。"}],
      evidenceLinks:[{documentId:src,pages:[4,30,38,44],label:"联合公告：现有股份、对价及要约范围"},{documentId:upd,pages:[1,2],label:"第 3.8 条公告：认购完成、债券与现有股份"}],compactSummary:"拟转让 3.42 亿股现有股份 · 占 57% · 控股股份待交割",topology};
  }

  function buildVerifiedOceanVivo(c,docs){
    const cl="YS-20261102-32f4f29d41c2", upd="YS-20261120-d55b54403fab", delay="YS-20261029-d6852276fdec",dt="2026-11-20";
    if(c.stage?.status!=="active"||c.stage?.date!==dt||c.stage?.eventKind!=="supplement"||[cl,upd,delay].some(x=>docs?.[x]?.caseId!==c.id))return null;
    const term=(k,v)=>c.terms?.some(t=>t.key===k&&t.value===v);
    if(!term("side_purchase_shares",32354686)||!term("post_side_purchase_pct",28.07)||!term("offer_shares",316501343)||!term("offer_price",2.21)||!term("offer_cash_cap",699467968))return null;
    const left="陈延标",right="Ocean Vivo",badge="另购股份已交割 · 自愿要约待先决条件";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"active",leftTitle:"另行买卖的现有股份已交割",rightTitle:"拟提出自愿全面现金要约",transitionLabel:"两项进度分别列示",outcomeBadge:badge}),[
      box("L_l","left",43,100,149,146,"seller",left,"另行购股协议卖方"),box("L_r","left",448,100,157,146,"buyer",right,"与一致行动人合持 28.07%"),
      box("R_a","right",728,84,295,75,"target","拟按每股 2.21 港元收购余股","余股 316,501,343 股"),
      box("R_b","right",728,210,295,75,"public","最高现金约 7.0 亿港元","按公告股本不变且全部接纳情景"),
    ],[],[{id:"block",panel:"left",kind:"shares",step:"①",pathPoints:[[192,160],[448,160]],labelCenter:[320,160],labelWidth:224,labelHeight:34,label:"转让 32,354,686 股现有股份"}]);
    const nodes=[{id:"l",role:"seller",name:left},{id:"r",role:"buyer",name:right}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:dt,archetype:"offer",modality:"cash",status:"active",
      caseArchetypeLabel:"另行购股及拟自愿全面现金要约",caseModalityShortLabel:"现金",before:{title:"另行购股协议",nodes,equityLinks:[]},after:{title:"另购交割、余股待要约",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"block",kind:"shares",direction:"ltr",fromLabel:left,toLabel:right,headline:"另行买卖 32,354,686 股已于 11 月 2 日交割"},{id:"offer",kind:"cash",direction:"ltr",fromLabel:right,toLabel:"适用余股股东",headline:"拟每股 2.21 港元现金收购余股",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"单独股份协议",body:"Ocean Vivo 于 11 月 2 日完成向陈延标另行购股，与一致行动人合计持有 123,498,657 股，约占当时已发行股份 28.07%。"},
      {tag:"②",title:"自愿全面现金要约",body:"余股拟覆盖 316,501,343 股。按每股 2.21 港元、全数接纳及股本不变，现金上限约 7.0 亿港元。11 月 20 日公告委任独立财务顾问。"}],
      evidenceLinks:[{documentId:cl,pages:[1,2],label:"联合公告：另行购股交割及余股规模"},{documentId:delay,pages:[2],label:"余股要约先决条件"},{documentId:upd,pages:[1],label:"独立财务顾问委任"}],compactSummary:"另购股份已交割 · 合持 28.07% · 余股要约待先决条件",topology};
  }

  function buildVerifiedZhidaHPlacement(c,docs) {
    const x={"HK-02650-20260623-zhida-h-placement":{"date":"2026-06-30","src":"YS-20260630-a79a958d75c7","ann":"YS-20260623-8c464e9ebb8f","terms":{"consideration":209999637,"net_proceeds":205780000,"price_per_share":10.98,"new_shares":19125650,"post_issue_pct":6.01,"discount_prev_close":11.88,"pre_issue_h_shares":298944035,"post_issue_h_shares":318069685}},"HK-02650-20260923-zhida-h-placement":{"date":"2026-09-25","src":"YS-20260925-a63d060b2285","ann":"YS-20260923-7c8cf0104f5e","terms":{"consideration":207590723.5,"net_proceeds":203440000,"price_per_share":8.77,"new_shares":23670550,"post_issue_pct":6.93,"discount_prev_close":17.11,"pre_issue_h_shares":318069685,"post_issue_h_shares":341740235}}}[c.id];
    if(!x||c.stage?.status!=="closed"||c.stage?.date!==x.date||c.stage?.eventKind!=="completion"||docs?.[x.src]?.caseId!==c.id||docs?.[x.ann]?.caseId!==c.id)return null;
    if(!Object.entries(x.terms).every(([k,v])=>c.terms?.some(t=>t.key===k&&t.value===v)))return null;
    const t=x.terms,n=t.new_shares.toLocaleString('en-US'),px=t.price_per_share.toFixed(2);
    const gross=(t.consideration/1e8).toFixed(2),net=(t.net_proceeds/1e8).toFixed(2),fmt=v=>v.toLocaleString('en-US');
    const left="摯達科技",right="獨立承配人",badge="新 H 股配售已完成";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const arrow=(id,k,step,x,y,xx,label)=>({id,panel:"left",kind:k,step,pathPoints:[[x,y],[xx,y]],labelCenter:[320,y],labelWidth:214,labelHeight:34,label});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"closed",leftTitle:"一般授權發行新 H 股",rightTitle:"配售完成及股本變動",transitionLabel:"現金認購新股",outcomeBadge:badge}),[
      box("L_l","left",43,100,149,146,"listed",left,"發行人"),box("L_r","left",448,100,157,146,"buyer",right,"不少於六名"),
      box("R_a","right",728,84,295,75,"target","募集淨額約 "+net+" 億港元","已扣除相關配售開支"),
      box("R_b","right",728,210,295,75,"public","新股佔配售後 H 股 "+t.post_issue_pct+"%","配售後 H 股 "+fmt(t.post_issue_h_shares)+" 股"),
    ],[],[arrow("shares","shares","①",192,138,448,"發行 "+n+" 股新 H 股"),arrow("cash","cash","②",448,209,192,"每股 "+px+" 港元")]);
    const nodes=[{id:"l",role:"listed",name:left},{id:"r",role:"buyer",name:right}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:x.date,archetype:"topup_placing",modality:"cash",status:"closed",
      caseArchetypeLabel:"一般授權新 H 股配售",caseModalityShortLabel:"現金認購新股",before:{title:"配售前 H 股 "+fmt(t.pre_issue_h_shares),nodes,equityLinks:[]},after:{title:"配售後 H 股 "+fmt(t.post_issue_h_shares),nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"shares",kind:"shares",direction:"ltr",fromLabel:left,toLabel:right,headline:n+" 股新 H 股"},{id:"cash",kind:"cash",direction:"rtl",fromLabel:right,toLabel:left,headline:"募集總額約 "+gross+" 億港元"}],
      annotations:[{tag:"①",title:"配售及募資",body:"每股 "+px+" 港元，較上一交易日收市價折讓 "+t.discount_prev_close+"%。募集總額約 "+gross+" 億港元，淨額約 "+net+" 億港元。"},
      {tag:"②",title:"配售角色",body:"興證國際擔任獨家整體協調人及配售代理；立鼎證券、天澤證券及新百利融資任配售代理。"}],
      evidenceLinks:[{documentId:x.ann,pages:[3,4],label:"配售協議、角色及定價"},{documentId:x.src,pages:[1,2],label:"已完成配售、實際募資及 H 股分母"}],compactSummary:"新 H 股 "+n+" 股 · 已完成 · 佔配售後 H 股 "+t.post_issue_pct+"%",topology};
  }

  function buildVerifiedLianhuaRenewal(c,docs){
    const src="YS-20261120-609daa891ee9", upd="YS-20261125-17efa92d6684", dt="2026-11-25";
    if(c.stage?.status!=="active"||c.stage?.date!==dt||c.stage?.eventKind!=="dispatch_extension"||docs?.[src]?.caseId!==c.id||docs?.[upd]?.caseId!==c.id)return null;
    const term=(k,v)=>c.terms?.some(t=>t.key===k&&t.currency==="CNY"&&t.value===v);
    if(!term("entrusted_principal",675000000)||!term("max_daily_investment_balance",700000000)||!term("annual_management_fee_cap",2100000)||!term("annual_performance_fee_cap",2800000))return null;
    const left="聯華華商",right="上海證券",badge="通函延寄 · 待獨立股東批准";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"active",leftTitle:"單一資產管理合同擬續期",rightTitle:"日投資餘額上限及審批",transitionLabel:"擬續期至 2029 年末",outcomeBadge:badge}),[
      box("L_l","left",43,100,149,146,"listed",left,"聯華超市附屬公司"),box("L_r","left",448,100,157,146,"buyer",right,"全權投資管理"),
      box("R_a","right",728,84,295,75,"target","每日最高投資餘額人民幣 7 億元","含累計投資收益"),
      box("R_b","right",728,210,295,75,"public","待獨立股東批准","擬於 12 月 16 日或之前寄發通函"),
    ],[],[{id:"entrust",panel:"left",kind:"asset",step:"①",pathPoints:[[192,160],[448,160]],labelCenter:[320,160],labelWidth:214,labelHeight:34,label:"委託本金人民幣 6.75 億元"}]);
    const nodes=[{id:"l",role:"listed",name:left},{id:"r",role:"buyer",name:right}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:dt,archetype:"disclosable_major",modality:"in_kind",status:"active",
      caseArchetypeLabel:"非常重大收購 · 關連資產管理",caseModalityShortLabel:"單一資產管理合同",before:{title:"原合約於 2026 年底屆滿",nodes,equityLinks:[]},after:{title:"擬續期 2027–2029 年",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"entrust",kind:"asset",direction:"ltr",fromLabel:left,toLabel:right,headline:"續期委託本金人民幣 6.75 億元，由上海證券全權管理",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"委託及託管",body:"託管行為建設銀行上海市分行。原安排到期時，超出續期委託資產的部分按屆時淨資產贖回。"},
      {tag:"②",title:"各年費用上限",body:"2027–2029 年每年擬設管理費上限人民幣 210 萬元、表現費上限人民幣 280 萬元。"},
      {tag:"③",title:"獨立股東審批",body:"續期交易須獨立股東批准，VBG Capital 已獲委任為獨立財務顧問。"}],
      evidenceLinks:[{documentId:src,pages:[2,3,4,6,46,60,70,71],label:"委託本金、投資上限、費用及審批條款"},{documentId:upd,pages:[1],label:"通函延寄公告"}],compactSummary:"委託本金人民幣 6.75 億元 · 日投資餘額上限 7 億元 · 待獨立股東批准",topology};
  }

  function buildProvenCashPlacement(c,docs) {
    const p=c.placementProof, term=k=>c.terms?.find(t=>t.key===k), v=k=>term(k)?.value;
    if(c.category!=="placing"||!(["ordinary","H","topup"].includes(p.format))||docs?.[p.sourceId]?.caseId!==c.id||(p.extraSourceId&&docs?.[p.extraSourceId]?.caseId!==c.id)||c.stage?.date!==p.period||c.stage?.status!==p.phase)return null;
    const pending=p.phase==="active", real=p.format==="topup", h=p.format==="H";
    if((pending?(c.stage.eventKind!=="supplement"&&!(c.id==="HK-01088-20261127-shenhua-h-share-placing"&&c.stage.eventKind==="first_announcement"&&docs?.[p.sourceId]?.url?.endsWith("/2026112700003.pdf"))):c.stage.eventKind!=="completion")||(!pending&&p.phase!=="closed"))return null;
    const q=v("new_shares"), price=v("price_per_share")??v("placing_price"), gross=v("consideration"), net=v("expected_net_proceeds")??v("net_proceeds"), pct=v("placing_share_post_issue_pct");
    if(!Number.isSafeInteger(q)||q<=0||!(price>0&&gross>0&&net>0&&pct>0&&pct<100)||term("placing_share_post_issue_pct")?.evidence?.documentId!==p.sourceId||Math.abs(Math.round(q*price*100)/100-gross)>(pending?1000:0.001)||(real&&v("old_shares_placed")!==q))return null;
    const fmt=v=>v.toLocaleString("en-US"), amt=x=>x>=1e8?(x/1e8).toFixed(1)+" 億港元":(x/1e4).toFixed(1)+" 萬港元";
    const px=price.toFixed(p.priceDigits), share=h?"新 H 股":"新股", left=real?"Manureen Holdings":p.name,right=real?"Ms. Kan Chi San":"承配人";
    const title=real?"先舊股配售、後補足認購":"一般授權"+share+"配售";
    const badge=pending?"擬配售 · 待條件達成":real?"舊股配售及補足認購均完成":share+"配售已完成";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const arrow=(id,k,step,x,y,xx,label)=>({id,panel:"left",kind:k,step,pathPoints:[[x,y],[xx,y]],labelCenter:[320,y],labelWidth:214,labelHeight:34,label});
    const act=pending?"擬配售最多 ":"發行 ", grossLabel=(pending?"擬募總額約 ":"募集總額約 ")+amt(gross);
    const leg1=real?"舊股 "+fmt(q)+" 股":act+fmt(q)+" 股";
    const leg2="每股 "+px+" 港元";
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:p.phase,leftTitle:real?"第一步：11 月 4 日舊股配售":title,rightTitle:real?"第二步：11 月 13 日補足認購":"配售規模與分母",transitionLabel:real?"同價、同股數":"現金認購",outcomeBadge:badge}),[
      box("L_l","left",43,100,149,146,real?"seller":"listed",left,real?"賣方及補足認購人":"發行人"),
      box("L_r","left",448,100,157,146,"buyer",right,real?"舊股承配人":pending?"擬配售予不少於六名":"不少於六名"),
      box("R_a","right",728,84,295,75,"target",real?"發行同數新股予原賣方":grossLabel,real?grossLabel:"每股 "+px+" 港元"),
      box("R_b","right",728,210,295,75,"public",real?"公司募集淨額約 "+amt(net):(pending?"全數配發後佔比約 ":"新股佔比約 ")+pct+"%",real?"僅計補足認購":"分母："+p.pctBasis),
    ],[],[arrow("shares","shares","①",192,138,448,leg1),arrow("cash","cash","②",448,209,192,leg2)]);
    const nodes=[{id:"l",role:real?"seller":"listed",name:left},{id:"r",role:"buyer",name:right}];
    const flows=[{id:"shares",kind:"shares",direction:"ltr",fromLabel:left,toLabel:right,headline:leg1+" · "+(real?"舊股":share),proposedOrTerminated:pending},
      {id:"cash",kind:"cash",direction:"rtl",fromLabel:right,toLabel:left,headline:leg2,proposedOrTerminated:pending}];
    if(real)flows.push({id:"topup",kind:"shares",direction:"rtl",fromLabel:p.name,toLabel:left,headline:"公司配發 "+fmt(q)+" 股新股予原賣方"});
    const a=[{tag:"①",title:real?"兩次交割":"股數及募資",body:real?"11 月 4 日原賣方向承配人配售現有股份；11 月 13 日發行人向原賣方配發同數新股。兩步每股均為 "+px+" 港元，只有第二步計入公司募資。":(pending?"按全數配發情景，":"完成公告列示，")+grossLabel+"、淨額約 "+amt(net)+"。"},
      {tag:"②",title:"股份比例",body:real?"原賣方於補足認購完成後持股 41.87%，舊股承配人持股 14.17%。":"新股約佔"+p.pctBasis+"的 "+pct+"%。"+(h?"按全部已發行股本計約 "+v("placing_share_total_equity_pct")+"%。":"")}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:p.period,archetype:"topup_placing",modality:"cash",status:p.phase,
      caseArchetypeLabel:title,caseModalityShortLabel:"現金認購",before:{title:real?"舊股配售":"配售條款",nodes,equityLinks:[]},after:{title:real?"補足認購":"配售結果",nodes,equityLinks:[],outcomeBadge:badge},
      flows,annotations:a,evidenceLinks:[{documentId:p.sourceId,pages:real?[1,2,3]:[1,2],label:"股份、定價及募資原件"},...(p.extraSourceId?[{documentId:p.extraSourceId,pages:[1],label:"配售補充披露"}]:[])],
      compactSummary:real?"11 月 4 日配售舊股 · 11 月 13 日補足認購 · 公司募集淨額約 "+amt(net):leg1+" "+share+" · "+grossLabel+" · "+badge,topology};
  }

  function buildVerifiedRuiheAllocation(c,docs){
    const src="YS-20260914-75f81f1751c8", close="YS-20260923-ebc0fd537045", dt="2026-09-22";
    if(c.stage?.status!=="closed"||c.stage?.date!==dt||c.stage?.eventKind!=="completion"||docs?.[src]?.caseId!==c.id||docs?.[close]?.caseId!==c.id||c.offeringRoundId!=="offering:09856:2026-09-14")return null;
    const term=(k,v)=>c.terms?.some(t=>t.key===k&&t.value===v);
    if(!term("allocated_shares",950000)||!term("offer_price",32.96)||!term("allocation_cost",31312000)||!term("cash_paid_with_charges",31627781.52))return null;
    const left="瑞和數智香港",right="納真科技",badge="國際配售已完成 · 2026-09-22";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const arrow=(id,k,step,x,y,xx,label)=>({id,panel:"left",kind:k,step,pathPoints:[[x,y],[xx,y]],labelCenter:[320,y],labelWidth:210,labelHeight:34,label});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"closed",leftTitle:"納真科技國際發售股份",rightTitle:"最終配發及付款",transitionLabel:"掛牌當日完成",outcomeBadge:badge}),[
      box("L_l","left",43,100,149,146,"buyer",left,"瑞和數智全資附屬公司"),box("L_r","left",448,100,157,146,"listed",right,"國際發售發行人"),
      box("R_a","right",728,84,295,75,"target","含費實付 3,162.8 萬港元","含佣金、徵費及交易費"),
      box("R_b","right",728,210,295,75,"public","配發價款 3,131.2 萬港元","原訂單上限 6,000 萬港元"),
    ],[],[arrow("allocation","shares","①",448,138,192,"實際獲配 95 萬股"),arrow("price","cash","②",192,209,448,"最終每股 32.96 港元")]);
    const nodes=[{id:"l",role:"buyer",name:left},{id:"r",role:"listed",name:right}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:dt,archetype:"disclosable_major",modality:"cash",status:"closed",
      caseArchetypeLabel:"國際發售股份認購",caseModalityShortLabel:"現金配發",before:{title:"國際發售",nodes,equityLinks:[]},after:{title:"配發及付款完成",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"allocation",kind:"shares",direction:"rtl",fromLabel:right,toLabel:left,headline:"實際配發 95 萬股國際發售股份"},{id:"price",kind:"cash",direction:"ltr",fromLabel:left,toLabel:right,headline:"每股 32.96 港元；配發價款 3,131.2 萬港元"}],
      annotations:[{tag:"①",title:"正式配發與價款",body:"Ruihe Data Technology (HK) Co., Limited 獲配 950,000 股，每股 32.96 港元，按發售價合計 31,312,000 港元。"},
      {tag:"②",title:"同一認購的兩個金額口徑",body:"連同佣金、徵費及交易費，認購人已於 9 月 22 日支付合計 31,627,781.52 港元。"}],
      evidenceLinks:[{documentId:src,pages:[1,2,3],label:"認購主體、訂單上限及規則"},{documentId:close,pages:[1],label:"實際配發及含費付款"}],compactSummary:"國際配售 95 萬股 · 每股 32.96 港元 · 已完成",topology};
  }

  function buildVerifiedEverestOffer(c,docs){
    const src="YS-20261030-b179f43845db", upd="YS-20261120-7d65ff09997b", dt="2026-11-20";
    if(c.stage?.status!=="active"||c.stage?.date!==dt||c.stage?.eventKind!=="dispatch_extension"||docs?.[src]?.caseId!==c.id||docs?.[upd]?.caseId!==c.id)return null;
    const term=(k,v)=>c.terms?.some(t=>t.key===k&&t.value===v);
    if(!term("control_block",4026133469.90)||!term("block_shares",5515229000)||!term("block_pct",51.016)||!term("letter_other_liabilities",500000000)||!term("offer_price",0.8359)||!term("offer_cash_cap",4426569888.65))return null;
    const left="中國恒大及 CEG Holdings",right="Everest Holdings I",badge="控股股權尚待交割 · 要約待觸發";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const arrow=(id,k,step,x,y,xx,label)=>({id,panel:"left",kind:k,step,pathPoints:[[x,y],[xx,y]],labelCenter:[320,y],labelWidth:214,labelHeight:34,label});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"active",leftTitle:"擬收購恒大物業 51.016%",rightTitle:"附函及交割後余股要約",transitionLabel:"交割後觸發要約",outcomeBadge:badge}),[
      box("L_l","left",43,100,149,146,"seller",left,"兩名賣方均由清盤人代表"),
      box("L_r","left",448,100,157,146,"buyer",right,"PAG Fund IV 收購載體"),
      box("R_a","right",728,84,295,75,"target","另有附函款人民幣 5 億元","於交割時支付，用於稅費等"),
      box("R_b","right",728,210,295,75,"public","交割後每股 0.8359 港元要約","按全部接納，現金上限約 44.3 億港元"),
    ],[],[arrow("block","shares","①",192,138,448,"擬轉讓現有 55.15 億股"),arrow("cash","cash","②",448,209,192,"協議對價 40.3 億港元")]);
    const nodes=[{id:"l",role:"seller",name:left},{id:"r",role:"buyer",name:right}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:dt,archetype:"offer",modality:"cash",status:"active",
      caseArchetypeLabel:"控股權收購及可能強制現金要約",caseModalityShortLabel:"現金",before:{title:"已簽購股協議及附函",nodes,equityLinks:[]},after:{title:"待交割及觸發要約",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"block",kind:"shares",direction:"ltr",fromLabel:left,toLabel:right,headline:"擬收購 5,515,229,000 股恒大物業現有股份",proposedOrTerminated:true},{id:"cash",kind:"cash",direction:"rtl",fromLabel:right,toLabel:left,headline:"購股協議對價 4,026,133,469.90 港元",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"兩名賣方的股份對價",body:"中國恒大一腿約 1.23 億港元、CEG Holdings 一腿約 39.03 億港元；購股協議合計 4,026,133,469.90 港元。"},
      {tag:"②",title:"附函及餘股要約",body:"附函另列交割時以人民幣支付 5 億元。交割後，按公告股本及全數接納情景，餘股現金要約上限 4,426,569,888.65 港元。"},
      {tag:"③",title:"交割及寄發進度",body:"11 月 20 日公告時，購股協議先決條件仍未達成或獲豁免；綜合文件獲准延至交割後七天或 2027 年 2 月 19 日（以較早者為準）。"}],
      evidenceLinks:[{documentId:src,pages:[2,7,8,11,12,15],label:"購股協議、附函及可能要約"},{documentId:upd,pages:[2],label:"購股先決條件與延期批准"}],compactSummary:"擬收購 51.016% · 購股協議 40.3 億港元 · 交割後觸發餘股要約",topology};
  }

  function buildVerifiedHengxinEpc(c,docs){
    const src="YS-20261123-608e42f23f5c",dt="2026-11-23";
    if(c.stage?.status!=="active"||c.stage?.date!==dt||c.stage?.eventKind!=="dispatch"||docs?.[src]?.caseId!==c.id)return null;
    const t=(k,v)=>c.terms.some(x=>x.key===k&&x.currency==="CNY"&&x.value===v);if(!t("epc_contract_price",696800000)||!t("proposed_internal_capital",139360000)||!t("proposed_external_bank_loan",557440000))return null;
    const left="淄博龍恩能源",right="山東恩光能源",badge="通函已發 · 待融資協議及股東批准";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const arrow=(id,k,step,x,y,xx,label)=>({id,panel:"left",kind:k,step,pathPoints:[[x,y],[xx,y]],labelCenter:[320,y],labelWidth:200,labelHeight:34,label});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"active",leftTitle:"200 MW / 800 MWh 儲能項目 EPC",rightTitle:"擬議資金來源及待辦",transitionLabel:"待融資及股東批准",outcomeBadge:badge}),[
      box("L_l","left",43,100,149,146,"buyer",left,"項目發包方"),box("L_r","left",448,100,157,146,"seller",right,"工程總承包方"),
      box("R_a","right",728,84,295,75,"target","擬以 20% 項目資本金出資","人民幣 1.39 億元"),
      box("R_b","right",728,210,295,75,"public","擬以 80% 外部貸款融資","約人民幣 5.57 億元 · 尚未簽約"),
    ],[],[arrow("cash","cash","①",192,138,448,"含稅合同價人民幣 6.97 億元"),arrow("works","asset","②",448,209,192,"設計、採購及施工")]);
    const nodes=[{id:"l",role:"buyer",name:left},{id:"r",role:"seller",name:right}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:dt,archetype:"disclosable_major",modality:"cash",status:"active",
      caseArchetypeLabel:"儲能項目 EPC · 非常重大收購",caseModalityShortLabel:"工程總承包",before:{title:"已簽 EPC 合同",nodes,equityLinks:[]},after:{title:"有待落實",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"cash",kind:"cash",direction:"ltr",fromLabel:left,toLabel:right,headline:"工程合同含稅對價人民幣 696,800,000 元",proposedOrTerminated:true},{id:"works",kind:"asset",direction:"rtl",fromLabel:right,toLabel:left,headline:"設計、採購、施工及配套升壓站",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"工程範圍",body:"淄博龍恩能源委託山東恩光能源承建 200 MW / 800 MWh 儲能項目及配套 220 kV 升壓站，合同含稅對價人民幣 6.968 億元。"},
      {tag:"②",title:"資金安排",body:"通函擬以項目資本金人民幣 1.3936 億元及外部貸款人民幣 5.5744 億元支付。通函披露貸款條款仍在與興業銀行商議，尚無具約束力的融資協議。"},
      {tag:"③",title:"股東批准",body:"通函列明股東特別大會擬於 2026 年 12 月 11 日舉行。"}],
      evidenceLinks:[{documentId:src,pages:[1,5,7,8,15],label:"通函：工程範圍、合同價、資金安排及表決"}],compactSummary:"儲能項目 EPC · 200 MW / 800 MWh · 融資及股東批准待落實",topology};
  }

  function buildVerifiedRitamixOffer(c,docs){
    const src="YS-20261119-c03d928682af",cl="YS-20261106-e4f9ca146adb",dt="2026-11-19";
    if(c.stage?.status!=="active"||c.stage?.date!==dt||c.stage?.eventKind!=="dispatch"||docs?.[src]?.caseId!==c.id||docs?.[cl]?.caseId!==c.id)return null;
    const t=(k,v)=>c.terms.some(x=>x.key===k&&x.value===v);if(!t("first_purchaser_shares",266054340)||!t("second_purchaser_shares",97761660)||!t("block_voting_pct",77.94)||!t("block_total_pct",77.08)||!t("offer_price",0.617)||!t("offer_cash_cap",63517682))return null;
    const left="Garry-Worth 及 Warrants",right="Stellar Gate 及 Innovation Forge",badge="現有股份已交割 · 餘股要約進行中";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const arrow=(id,k,step,x,y,xx,label)=>({id,panel:"left",kind:k,step,pathPoints:[[x,y],[xx,y]],labelCenter:[320,y],labelWidth:200,labelHeight:34,label});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"active",leftTitle:"11 月 6 日兩買方取得現有股份",rightTitle:"11 月 19 日開始餘股要約",transitionLabel:"兩項金額獨立列示",outcomeBadge:badge}),[
      box("L_l","left",43,100,149,146,"seller",left,"原股東"),box("L_r","left",448,100,157,146,"buyer",right,"兩名一致行動買方"),
      box("R_a","right",728,84,295,75,"target","每股 0.617 港元","適用餘下有投票權股份"),
      box("R_b","right",728,210,295,75,"public","約 6,351.8 萬港元上限","預定 12 月 10 日下午 4 時截止"),
    ],[],[arrow("block","shares","①",192,138,448,"已交割 363,816,000 股"),arrow("cash","cash","②",448,209,192,"約定對價 2.24 億港元")]);
    const nodes=[{id:"l",role:"seller",name:left},{id:"r",role:"buyer",name:right}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:dt,archetype:"offer",modality:"cash",status:"active",
      caseArchetypeLabel:"控股股份買賣及強制現金要約",caseModalityShortLabel:"現金",before:{title:"已交割現有股份",nodes,equityLinks:[]},after:{title:"餘股要約",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"block",kind:"shares",direction:"ltr",fromLabel:left,toLabel:right,headline:"兩買方取得 363,816,000 股，佔投票股份 77.94%"},
      {id:"cash",kind:"cash",direction:"rtl",fromLabel:right,toLabel:left,headline:"約定 224,474,472 港元，按協定匯率以美元支付"},
      {id:"offer",kind:"cash",direction:"ltr",fromLabel:"Innovation Forge Holdings",toLabel:"餘股股東",headline:"每股 0.617 港元，現金要約進行中",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"股數及分母",body:"Stellar Gate 取得 266,054,340 股，Innovation Forge 取得 97,761,660 股；合計佔全部股本 77.08%，佔已發行有投票權股份 77.94%。"},
      {tag:"②",title:"餘股要約",body:"要約涵蓋 102,946,000 股有投票權餘股，庫存股 5,238,000 股未列入。以每股 0.617 港元計，最高現金額 63,517,682 港元。"}],
      evidenceLinks:[{documentId:cl,pages:[2],label:"控股股份已交割"},{documentId:src,pages:[3,8,9,14,18,21,22,45],label:"兩買方、兩套股份分母及要約時間"}],compactSummary:"兩買方已取得現有股份 · 77.94% 投票權 · 餘股現金要約進行中",topology};
  }

  function buildVerifiedLoganALC(c,docs){
    const cir="YS-20261105-343f8da94f95",vote="YS-20261120-60c1f3b2f895",dt="2026-11-20";
    if(c.stage?.status!=="approved"||c.stage?.date!==dt||c.stage?.eventKind!=="vote"||docs?.[cir]?.caseId!==c.id||docs?.[vote]?.caseId!==c.id||!c.terms?.some(t=>t.key==="conditional_debt_release"&&t.value===1020000000))return null;
    const l="龍光集團",r="ALC 債權人專項載體",badge="股東已批准 · 資產轉讓仍附條件";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const arrow=(id,kind,step,x,y,xx,label)=>({id,panel:"left",kind,step,pathPoints:[[x,y],[xx,y]],labelCenter:[320,y],labelWidth:200,labelHeight:34,label,proposed:true});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"approved",leftTitle:"附條件的 ALC 資產安排",rightTitle:"11 月 20 日股東表決",transitionLabel:"按重組文件實施",outcomeBadge:badge}),[
      box("L_l","left",43,100,149,146,"seller",l,"擬轉讓方"),box("L_r","left",448,100,157,146,"buyer",r,"擬受讓方"),
      box("R_a","right",728,82,295,75,"target","ALC 資產轉讓 · 100%","佔該決議所投票數"),
      box("R_b","right",728,204,295,75,"public","可轉債 99.95% · 贖回股份 100%","各項決議的贊成票比例"),
    ],[],[arrow("asset","shares","①",192,138,448,"項目持股及股東貸款權益"),arrow("debt","cancel","②",448,209,192,"擬解除約 10.2 億美元債務")]);
    const nodes=[{id:"l",role:"seller",name:l},{id:"r",role:"buyer",name:r}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:dt,archetype:"debt_restructuring",modality:"mixed",status:"approved",
      caseArchetypeLabel:"境外債務重組及 ALC 資產安排",caseModalityShortLabel:"資產及債務解除",before:{title:"擬轉讓資產",nodes,equityLinks:[]},after:{title:"附條件資產轉讓",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"asset",kind:"shares",direction:"ltr",fromLabel:l,toLabel:r,headline:"龍光所持項目公司股份的 50%，以及未償股東貸款的相關權利、利益和所得款",proposedOrTerminated:true},
      {id:"debt",kind:"cancel",direction:"rtl",fromLabel:"相關境外債權人",toLabel:l,headline:"通函估計對應解除約 10.2 億美元債務",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"擬轉讓範圍",body:"龍光所持 ALC 項目公司股份的 50%，以及龍光未償股東貸款的相關權利、利益和所得款。轉讓涉及另一股東和優先融資債權人的同意。"},
      {tag:"②",title:"股東表決",body:"發行強制可轉債及股權架構安排獲 99.95% 贊成；可能轉讓 ALC 資產及發行贖回股份各獲 100% 贊成，均按各決議所投票數計。"}],
      evidenceLinks:[{documentId:cir,pages:[72,73,76,77],label:"轉讓範圍、先決條件及債務解除額"},{documentId:vote,pages:[1,2],label:"三項決議表決結果"}],compactSummary:"ALC 資產轉讓獲股東批准 · 擬解除約 10.2 億美元債務 · 轉讓仍附條件",topology};
  }
  function buildVerifiedBs26(c,docs) {
    const dt="2026-11-26";
    const complete=c.events?.find(e=>e.kind==="control_completion"&&e.state==="actual"&&e.date===dt);
    const src=complete?.evidence?.documentId;
    const doc=docs?.[src];
    if(c.id!=="HK-01705-20261029-time-innovation" || c.stage?.status!=="active" ||
       c.stage?.date!==dt || c.stage?.eventKind!=="control_completion" || doc?.caseId!==c.id ||
       doc.url!=="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1126/2026112601414.pdf" ||
       !c.processEvents?.some(e=>e.date==="2026-12-03"&&e.kind==="dispatch"&&e.state==="expected"&&e.evidence?.documentId===src))return null;
    const term=(key,value)=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===src);
    if(!term("buyer1_proposed_shares",288000000)||!term("buyer2_proposed_shares",12000000)||
       !term("proposed_group_pct",75)||!term("proposed_at_close_cap",167200000)||
       !term("offer_price",0.9634)||!term("offer_shares",100000000)||
       !term("offer_cash_cap",96340000)||c.parties?.["要约方"]!=="Time Innovation Global Limited"||
       c.parties?.["第二买方及一致行动人士"]!=="EJO Investment Pte. Ltd.")return null;
    const left="ACAC、CCST、SCSC",right="Time Innovation 及 EJO",badge="控股股份已交割 · 餘股要約待寄文件";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const arrow=(id,kind,step,x,y,end,label)=>({id,panel:"left",kind,step,pathPoints:[[x,y],[end,y]],labelCenter:[320,y],labelWidth:196,labelHeight:34,label});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"active",leftTitle:"11月26日 · 75%股份交割",rightTitle:"餘股現金要約",transitionLabel:"兩筆金額獨立列示",outcomeBadge:badge}),[
       box("L_sell","left",43,100,149,146,"seller",left,"三名原股東"),
       box("L_buy","left",448,100,157,146,"buyer",right,"交割後 72% + 3%"),
       box("R_rest","right",728,84,295,75,"target","1億股 · 每股 0.9634 港元","Time Innovation 單獨提出"),
       box("R_doc","right",728,210,295,75,"public","最高 9,634 萬港元","綜合文件最遲 12 月 3 日寄發")
    ],[],[arrow("sale","shares","①",192,138,448,"已交割 3 億股"),arrow("cash","cash","②",448,209,192,"首期實付 1.672 億港元")]);
    const nodes=[{id:"l",role:"seller",name:left},{id:"r",role:"buyer",name:right}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,
      stageLabel:badge,stageDate:dt,archetype:"offer",modality:"cash",status:"active",caseArchetypeLabel:"控股股份買賣及強制現金要約",caseModalityShortLabel:"現金",
      before:{title:"75%股份交割",nodes,equityLinks:[]},after:{title:"餘股要約",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"sale",kind:"shares",direction:"ltr",fromLabel:left,toLabel:right,headline:"Time Innovation 2.88億股（72%）；EJO 1,200萬股（3%）"},
        {id:"cash",kind:"cash",direction:"rtl",fromLabel:right,toLabel:left,headline:"交割實付1.672億港元"},
        {id:"offer",kind:"cash",direction:"ltr",fromLabel:"Time Innovation",toLabel:"餘股股東",headline:"現金要約每股 0.9634 港元；待綜合文件",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"交割對價",body:"現金首期已付1.672億港元；協議上限2.89億港元，包括扣留款及或有對價。"},
        {tag:"②",title:"餘股現金要約",body:"餘下1億股，每股0.9634港元；全數接納時最高9,634萬港元。綜合文件最遲12月3日寄發。"}],
      evidenceLinks:[{documentId:src,pages:[2,3],label:"已交割股數及實付首期款"},{documentId:src,pages:[4],label:"要約條款及寄發期限"}],
      compactSummary:"72% + 3% 已交割 · 餘下 25% 待綜合文件",topology};
  }

  function buildVerifiedWalnutExit(c,docs){
    const dt="2026-11-26", end=c.events?.find(e=>e.kind==="completion"&&e.state==="actual"&&e.date===dt),first=c.events?.find(e=>e.kind==="first_announcement"),f=first?.evidence?.documentId,src=end?.evidence?.documentId;
    if(c.id!=="HK-00905-20261102-china-lead-secondary-exit"||c.category!=="secondary_placing"||c.stage?.status!=="closed"||c.stage?.date!==dt||
       docs?.[src]?.caseId!==c.id||docs[src].url!=="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1126/2026112600214.pdf"||
       docs?.[f]?.caseId!==c.id||!docs[f].url.endsWith("/2026110203775.pdf"))return null;
    const term=(key,value)=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===src);
    if(!term("placed_existing_shares",584503925)||!term("placing_price",0.242)||!term("placing_percent",55.64)||
       !term("seller_gross_cash",141449949.85)||!term("seller_after",0))return null;
    const l="China Lead",r="各承配人",badge="舊股配售已完成 · 原控股股東退出";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const arrow=(id,kind,step,x,y,end,label)=>({id,panel:"left",kind,step,pathPoints:[[x,y],[end,y]],labelCenter:[320,y],labelWidth:196,labelHeight:34,label});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"closed",leftTitle:"11月26日 · 舊股配售完成",rightTitle:"交割後持股",transitionLabel:"出售已發行股份",outcomeBadge:badge}),[
     box("L_sell","left",43,100,149,146,"seller",l,"原控股股東"),
     box("L_buy","left",448,100,157,146,"buyer",r,"公告未列名"),
     box("R_zero","right",728,84,295,75,"seller","China Lead 持股歸零","不再為控股股東"),
     box("R_other","right",728,210,295,75,"public","承配人均未達30%","按個別及一致行動合計計算")
    ],[],[arrow("shares","shares","①",192,138,448,"5.845億股舊股（55.64%）"),arrow("cash","cash","②",448,209,192,"出售總額約1.4145億港元")]);
    const nodes=[{id:"l",role:"seller",name:l},{id:"r",role:"buyer",name:r}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:dt,archetype:"disposal",modality:"cash",status:"closed",
     caseArchetypeLabel:"控股股東舊股配售",caseModalityShortLabel:"舊股出售",
     before:{title:"原控股股東配售",nodes,equityLinks:[]},after:{title:"交割後持股",nodes,equityLinks:[],outcomeBadge:badge},
     flows:[{id:"shares",kind:"shares",direction:"ltr",fromLabel:l,toLabel:r,headline:"584,503,925股舊股，佔55.64%"},
     {id:"cash",kind:"cash",direction:"rtl",fromLabel:r,toLabel:l,headline:"每股0.242港元，估算扣費前總額141,449,949.85港元"}],
     annotations:[{tag:"①",title:"配售股份",body:"China Lead 配售其全部現有股份；發行人沒有發行新股。"},
      {tag:"②",title:"交割後持股",body:"China Lead 持股歸零。公告稱承配人個別及連同一致行動人士均未達30%。"}],
     evidenceLinks:[{documentId:f,pages:[1,2],label:"配售協議、賣方及承配人條件"},{documentId:src,pages:[1],label:"配售完成、股數及每股成交價"}],
     compactSummary:"舊股配售完成 · 55.64% · 原控股股東退出",topology};
  }

  function buildVerifiedElate26(c,docs){
    const dt="2026-11-26",src=c.events?.find(e=>e.kind==="first_announcement"&&e.state==="actual"&&e.date===dt)?.evidence?.documentId;
    if(c.code!=="00076"||c.stage?.status!=="active"||c.stage?.eventKind!=="first_announcement"||
      c.stage.date!==dt||docs?.[src]?.caseId!==c.id||!docs[src].url.endsWith("/2026112600659.pdf"))return null;
    const t=(key,value)=>c.terms?.some(q=>q.key===key&&q.value===value&&q.evidence?.documentId===src);
    if(!t("consideration",19553600)||!t("conversion_price",.22)||!t("coupon_pct",0)||!t("conversion_shares",88880000)||!t("holder_limit",5))return null;
    const l="Li Hongyi",r="誼礫控股",badge="已簽認購協議 · 待上市批准";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const arrow=(id,kind,step,x,y,end,label)=>({id,panel:"left",kind,step,pathPoints:[[x,y],[end,y]],labelCenter:[320,y],labelWidth:196,labelHeight:34,label,dashed:true});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"active",leftTitle:"擬認購六年期零息可換股債",rightTitle:"換股條款",transitionLabel:"待換股股份上市批准",outcomeBadge:badge}),[
      box("L_sub","left",43,100,149,146,"creditor",l,"独立認購方"),box("L_issue","left",448,100,157,146,"listed",r,"發行人 00076"),
      box("R_px","right",728,84,295,75,"target","初始每股 0.22 港元","全數換股上限 8,888 萬股"),
      box("R_cap","right",728,210,295,75,"public","每名持有人須低於 5%","全數換股合計情景 16.67%")
    ],[],[arrow("sub","cash","①",192,138,448,"本金 1,955.36 萬港元"),arrow("bond","asset","②",448,209,192,"零息 · 到期 2032-11-25")]);
    const nodes=[{id:"sub",role:"creditor",name:l},{id:"issuer",role:"listed",name:r}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:dt,archetype:"convertible_bond",modality:"cash",status:"active",
     caseArchetypeLabel:"一般授權零息可換股債",caseModalityShortLabel:"擬現金認購",before:{title:"有條件認購",nodes,equityLinks:[]},after:{title:"潛在換股",nodes,equityLinks:[],outcomeBadge:badge},
     flows:[{id:"sub",kind:"cash",direction:"ltr",fromLabel:l,toLabel:r,headline:"應付認購本金港幣 19,553,600",proposedOrTerminated:true},
     {id:"bond",kind:"asset",direction:"rtl",fromLabel:r,toLabel:l,headline:"零息六年可換股債，2032 年 11 月 25 日到期",proposedOrTerminated:true}],
     annotations:[{tag:"①",title:"交割先決條件",body:"換股股份獲上市批准後一個營業日交割；債券本身不申請上市。"},
     {tag:"②",title:"個人限制與合計情景",body:"任何持有人每次換股後持股均須低於5%；悉數換股時的擴大股本比例16.67%為合計情景。"}],
     evidenceLinks:[{documentId:src,pages:[1,2,3],label:"認購、本金、換股價、利率及到期日"},{documentId:src,pages:[7,8],label:"攤薄情景及持股限制"}],compactSummary:"港幣 1,955.36 萬元 · 待換股股份上市批准",topology};
  }

  function buildVerifiedCifiSetoff26(c,docs){
    const dt="2026-11-26", buy=c.events?.find(e=>e.kind==="first_announcement"&&e.state==="actual"&&e.date===dt)?.evidence?.documentId,
      sell=c.processEvents?.find(e=>e.label==="賣方自願公告"&&e.state==="actual"&&e.date===dt)?.evidence?.documentId;
    if(c.code!=="01995"||c.stage?.status!=="active"||c.stage.date!==dt||c.stage.eventKind!=="first_announcement"||
       docs?.[buy]?.caseId!==c.id||docs?.[sell]?.caseId!==c.id||!docs[buy].url.endsWith("/2026112600495.pdf")||!docs[sell].url.endsWith("/2026112600635.pdf"))return null;
    const t=(key,value)=>c.terms?.some(q=>q.key===key&&q.value===value&&q.evidence?.documentId===buy);
    if(!t("consideration",299472000)||!t("cash_component",0)||!t("stake",100)||
       !c.rules?.some(r=>r.classificationStatus==="confirmed"&&r.evidence?.documentId===buy)||
       !c.rules?.some(r=>r.classificationStatus==="below_threshold"&&r.evidence?.documentId===sell))return null;
    const left="瀋陽豐創",right="上海永升物業",badge="已簽附條件協議 · 待股權變更登記";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const arrow=(id,kind,step,x,y,end,label)=>({id,panel:"left",kind,step,pathPoints:[[x,y],[end,y]],labelCenter:[320,y],labelWidth:194,labelHeight:34,label,dashed:true});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"active",leftTitle:"瀋陽卓裕股權轉讓及對價",rightTitle:"兩家上市公司披露",transitionLabel:"交割時抵銷應收款",outcomeBadge:badge}),[
      box("L_sell","left",43,100,149,146,"seller",left,"旭輝控股 00884"),
      box("L_buy","left",448,100,157,146,"buyer",right,"永升服務 01995"),
      box("R_buy","right",728,84,295,75,"buyer","買方 · 須予披露交易","適用比率超過 5% 但低於 25%"),
      box("R_sell","right",728,210,295,75,"seller","賣方 · 自願披露","適用比率均低於 5%")
    ],[],[arrow("equity","shares","①",192,138,448,"擬轉讓瀋陽卓裕 100%股權"),arrow("setoff","cancel","②",448,209,192,"抵銷應收款約人民幣 3.0 億")]);
    const nodes=[{id:"l",role:"seller",name:left},{id:"r",role:"buyer",name:right}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:dt,archetype:"acquisition",modality:"mixed",status:"active",
      caseArchetypeLabel:"股權收購及應收款抵銷",caseModalityShortLabel:"非現金抵銷",
      before:{title:"附條件股權轉讓",nodes,equityLinks:[]},after:{title:"交易分別披露",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"equity",kind:"shares",direction:"ltr",fromLabel:left,toLabel:right,headline:"擬轉讓瀋陽卓裕100%股權，標的持有瀋陽旭輝中心",proposedOrTerminated:true},
      {id:"setoff",kind:"cancel",direction:"rtl",fromLabel:"永升集團應收款",toLabel:"旭輝集團應付款",headline:"人民幣約299,472,000元一一抵銷，無現金對價",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"同一標的、雙方公告",body:"永升物業擬取得瀋陽卓裕100%股權；兩家上市公司的比率基準各自計算。"},
      {tag:"②",title:"交割條件及付款",body:"交割須待債權轉讓及抵銷文件、所需批准和變更登記；交割時由雙方往來款全額抵銷對價。"}],
      evidenceLinks:[{documentId:buy,pages:[1,2,4,5],label:"買方、對價、交割及第14章分類"},{documentId:sell,pages:[1,2,5],label:"賣方同一協議及低於5%分類"}],
      compactSummary:"人民幣約3.0億 · 全數抵銷 · 尚待交割",topology};
  }

  function buildVerifiedProbio26(c,docs){
    const dt="2026-11-26",by=(date,kind)=>c.events?.find(e=>e.date===date&&e.kind===kind&&e.state==="actual")?.evidence?.documentId;
    const ini=by("2026-11-24","first_announcement"),tr=by("2026-11-25","supplement"),rp=by(dt,"supplement");
    if(c.code!=="01548"||c.stage?.status!=="active"||c.stage.date!==dt||c.stage.eventKind!=="supplement")return null;
    if(![[ini,"2026112401141"],[tr,"2026112501349"],[rp,"2026112601104"]].every(([id,p])=>docs?.[id]?.caseId===c.id&&docs[id].url.endsWith("/"+p+".pdf")))return null;
    const t=(key,value,src)=>c.terms?.some(q=>q.key===key&&q.value===value&&q.evidence?.documentId===src);
    if(!t("offshore_transfer_cash",101300000,tr)||!t("offshore_repurchase_cash",101300000,rp)||
       !t("offshore_transfer_shares",102857135,tr)||!t("offshore_repurchase_shares",102857135,rp)||
       !t("post_cancel_interest_proforma",93.99,rp)||!t("full_reorganisation_interest_proforma",96.40,ini))return null;
    const l="兩組境外股東",badge="兩組境外交割完成 · 境內部分待 ODI";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const arrow=(id,k,step,x,y,end,label)=>({id,panel:"left",kind:k,step,pathPoints:[[x,y],[end,y]],labelCenter:[320,y],labelWidth:196,labelHeight:34,label});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"active",leftTitle:"11月25日至26日 · 兩筆境外交割",rightTitle:"後續條件及持股情景",transitionLabel:"境內部分待 ODI",outcomeBadge:badge}),[
      box("L_sell","left",43,100,149,146,"seller",l,"各協議分列"),
      box("L_buy","left",448,100,157,146,"buyer","金斯瑞／ProBio Cayman","母公司受讓／子公司回購"),
      box("R_cancel","right",728,84,295,75,"target","93.99% · 境外回購註銷後","假設未發行員工激勵股"),
      box("R_all","right",728,210,295,75,"public","96.40% · 整項交易完成後","同一員工激勵股假設")
    ],[],[arrow("tr","shares","①",192,138,448,"母公司受讓 · 1.013億美元"),arrow("rp","shares","②",192,209,448,"子公司回購 · 1.013億美元")]);
    const lnodes=[{id:"l",role:"seller",name:l},{id:"p",role:"buyer",name:"金斯瑞"},{id:"s",role:"buyer",name:"ProBio Cayman"}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:dt,archetype:"acquisition",modality:"cash",status:"active",
      caseArchetypeLabel:"股權受讓及優先股回購",caseModalityShortLabel:"現金",
      before:{title:"已交割的境外部分",nodes:lnodes,equityLinks:[]},after:{title:"後續條件及持股情景",nodes:lnodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"tr",kind:"shares",direction:"ltr",fromLabel:"境外轉讓方",toLabel:"金斯瑞",headline:"11月25日受讓102,857,135股，對價約1.013億美元"},
       {id:"rp",kind:"shares",direction:"ltr",fromLabel:"境外賣方",toLabel:"ProBio Cayman",headline:"11月26日回購另一批102,857,135股，對價約1.013億美元"},
       {id:"pending",kind:"shares",direction:"ltr",fromLabel:"境內轉讓方及賣方",toLabel:"金斯瑞及ProBio各自承接",headline:"兩組境內交易待 ODI",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"母公司受讓",body:"金斯瑞已完成境外轉讓。受讓後比例約89.68%，以未配發員工激勵股份計。"},
       {tag:"②",title:"子公司回購",body:"ProBio Cayman 已完成另組境外回購，股份待註銷。93.99%是註銷且未發行員工股的備考比例。"}],
      evidenceLinks:[{documentId:ini,pages:[1,2,7,8],label:"雙協議及整項重組情景"},{documentId:tr,pages:[1],label:"母公司境外受讓已交割"},{documentId:rp,pages:[1,2],label:"子公司境外回購已交割"}],
      compactSummary:"兩筆各約1.013億美元的境外交割 · 境內部分仍待 ODI",topology};
  }

  function buildVerifiedZhiDi26(c,docs){
    const dt="2026-11-26",src=c.events?.find(e=>e.kind==="first_announcement"&&e.state==="actual"&&e.date===dt)?.evidence?.documentId;
    if(c.code!=="00604"||c.stage?.status!=="active"||c.stage.date!==dt||c.stage.eventKind!=="first_announcement"||
       docs?.[src]?.caseId!==c.id||!docs[src].url.endsWith("/2026112601318.pdf"))return null;
    const t=(key,value)=>c.terms?.some(q=>q.key===key&&q.value===value&&q.evidence?.documentId===src);
    if(!t("consideration",21530300)||!t("stake",100)||!c.rules?.some(r=>r.code==="HKEX:14A"&&r.evidence?.documentId===src))return null;
    const left="沙河實業",right="深業物業運營",badge="附條件協議已簽 · 待生效及變更登記";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const arrow=(id,kind,step,x,y,end,label)=>({id,panel:"left",kind,step,pathPoints:[[x,y],[end,y]],labelCenter:[320,y],labelWidth:194,labelHeight:34,label,dashed:true});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"active",leftTitle:"置地投資 · 100% 股權轉讓",rightTitle:"上市規則與交割條件",transitionLabel:"待協議生效及登記",outcomeBadge:badge}),[
      box("L_sell","left",43,100,149,146,"seller",left,"沙河股份 000014.SZ"),
      box("L_buy","left",448,100,157,146,"buyer",right,"深圳控股非全資附屬公司"),
      box("R_rule","right",728,84,295,75,"buyer","第14A章關連交易","最高適用比率高於0.1%且低於5%"),
      box("R_step","right",728,210,295,75,"target","待國資程序及變更登記","免通函及獨立股東批准")
    ],[],[arrow("equity","shares","①",192,138,448,"擬轉讓置地投資 100%股權"),arrow("payment","cash","②",448,209,192,"現金人民幣 2,153.03 萬")]);
    const nodes=[{id:"l",role:"seller",name:left},{id:"r",role:"buyer",name:right}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:dt,archetype:"acquisition",modality:"cash",status:"active",
      caseArchetypeLabel:"關連股權收購",caseModalityShortLabel:"現金",
      before:{title:"附條件股權轉讓",nodes,equityLinks:[]},after:{title:"待生效與股權登記",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"equity",kind:"shares",direction:"ltr",fromLabel:left,toLabel:right,headline:"擬轉讓深圳市深業置地物業投資有限公司100%股權",proposedOrTerminated:true},
      {id:"payment",kind:"cash",direction:"rtl",fromLabel:right,toLabel:left,headline:"現金人民幣 21,530,300 元，生效後五個內地營業日內支付",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"交易雙方",body:"沙河實業與買方均在深業集團控制鏈內。買方是深圳控股非全資附屬公司。"},
      {tag:"②",title:"生效及交割",body:"相關批准及國資程序完成後生效；全額付款後啟動登記，股權登記完成才交割。"}],
      evidenceLinks:[{documentId:src,pages:[1,2,3],label:"對價、上市規則與交割條件"},{documentId:src,pages:[4,6,8,9,11],label:"估值、控制鏈與法定當事方"}],
      compactSummary:"人民幣約2,153萬 · 關連交易 · 尚待交割",topology};
  }

  function buildVerifiedQinfaUnwind26(c,docs){
    const dt="2026-11-26",by=(d,k)=>c.events?.find(e=>e.date===d&&e.kind===k&&e.state==="actual")?.evidence?.documentId;
    const ini=by("2026-11-03","first_announcement"),eff=by("2026-11-03","effective"),sup=by(dt,"supplement");
    if(c.code!=="00866"||c.stage?.status!=="closed"||c.stage.date!==dt||c.stage.eventKind!=="supplement"||eff!==sup||
       by("2026-11-02","completion")!==sup||docs?.[ini]?.caseId!==c.id||docs?.[sup]?.caseId!==c.id||
       !docs[ini].url.endsWith("/2026110301718.pdf")||!docs[sup].url.endsWith("/2026112601398.pdf"))return null;
    const t=(key,value,src)=>c.terms?.some(q=>q.key===key&&q.value===value&&q.evidence?.documentId===src);
    if(!t("agreed_disposal_total",122324000,ini)||!t("trading_10pct_included",9792000,ini)||!t("gyh_consideration",5000000,sup)||!t("lease_monthly",176000,ini))return null;
    const badge="珠海兩公司合約控制已解除",l="珠海貿易",r="秦發物流";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const arrow={id:"gyh",panel:"left",kind:"shares",step:"①",pathPoints:[[192,169],[448,169]],labelCenter:[320,169],labelWidth:194,labelHeight:34,label:"廣義海 100% 股權已轉讓"};
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"closed",leftTitle:"11月2日 · 廣義海股權轉讓",rightTitle:"11月3日 · 結束合約控制",transitionLabel:"先轉讓，後解除合約控制",outcomeBadge:badge}),[
      box("L_sell","left",43,100,149,146,"seller",l,"廣義海原股東"),
      box("L_buy","left",448,100,157,146,"buyer",r,"集團全資附屬公司"),
      box("R_exit","right",728,84,295,75,"target","珠海航運及珠海貿易","不再由集團控制"),
      box("R_cash","right",728,210,295,75,"seller","兩項協議對價約人民幣 1.2 億","已含珠海貿易10%股權對價")
    ],[],[arrow]);
    const nodes=[{id:"l",role:"seller",name:l},{id:"r",role:"buyer",name:r}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:dt,archetype:"acquisition",modality:"mixed",status:"closed",
      caseArchetypeLabel:"合約控制解除及內部資產重組",caseModalityShortLabel:"股權及合約控制",
      before:{title:"廣義海股權已轉讓",nodes,equityLinks:[]},after:{title:"解除合約控制",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"gyh",kind:"shares",direction:"ltr",fromLabel:l,toLabel:r,headline:"11月2日取得廣義海100%，內部轉讓對價人民幣500萬"},
      {id:"unwind",kind:"cancel",direction:"ltr",fromLabel:r,toLabel:"珠海航運、珠海貿易",headline:"11月3日終止合約控制，兩家公司不再並表"},
      {id:"consideration",kind:"cash",direction:"rtl",fromLabel:"原合約當事人",toLabel:r,headline:"兩項協議對價人民幣122,324,000元",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"廣義海",body:"秦發物流於解除合約前已直接取得廣義海。內部轉讓定價按未經審計淨資產。"},
      {tag:"②",title:"兩項解除及辦公室租約",body:"兩項約定對價含珠海貿易10%股權轉讓；辦公室三年租約另列，月租人民幣17.6萬。"}],
      evidenceLinks:[{documentId:ini,pages:[4,5,6,7,8],label:"解除協議對價、股權轉讓及租約條款"},{documentId:sup,pages:[2,3,4],label:"重組前後關係及實際完成日期"}],
      compactSummary:"11月2日內部轉讓 · 11月3日解除合約控制",topology};
  }

  // Two reviewed cases. State and amounts come from case-specific announcements, never from the visual frame.
  function buildReviewedOffer26(c,docs){
    const actual=(d,k)=>c.events?.find(e=>e.date===d&&e.kind===k&&e.state==="actual");
    const proc=(d)=>c.processEvents?.find(e=>e.date===d&&e.state==="actual");
    const source=(e,n)=>{const id=e?.evidence?.documentId,x=docs?.[id];return x?.caseId===c.id&&x.url.endsWith("/"+n+".pdf")?id:null;};
    let f;
    if(c.id==="HK-01710-20261002-luxshare-mou"){
      const i=source(actual("2026-10-02","first_announcement"),"2026100203427"), p=source(proc("2026-11-26"),"2026112601378");
      if(!i||!p||c.stage?.date!=="2026-11-26"||c.stage.eventKind!=="supplement"||
        c.events?.some(e=>e.kind==="control_completion"||e.kind==="dispatch")||
        c.parties?.["拟买方"]!=="Luxshare Precision Limited"||
        c.parties?.["拟卖方"]!=="Trio Industrial Electronics Holding Limited"||
        !c.terms?.some(q=>q.key==="mou_shares"&&q.value===750000000&&q.evidence?.documentId===i)||
        !c.terms?.some(q=>q.key==="mou_stake_pct"&&q.value===75&&q.evidence?.documentId===i))return null;
      f={left:"Trio Industrial Holding",right:"Luxshare Precision",leftSub:"潛在賣方",rightSub:"潛在買方",a:"意向涉及 7.5 億股（75%）",
        lTitle:"潛在交易 · 尚在盡調",rTitle:"排他安排及股權狀態",gate:"尚待正式買賣協議",badge:"排他期延至 12 月 28 日 · 仍在盡調",
        one:["12月28日 · 排他期屆滿","包括當日；盡職調查尚在進行"],two:["尚未簽正式協議","第26.1條強制要約仍取決於交割"],
        flows:[{id:"block",kind:"shares",direction:"ltr",fromLabel:"Trio Industrial Electronics Holding Limited",toLabel:"Luxshare Precision Limited",headline:"諒解備忘錄涉及750,000,000股，佔75%；仍在盡調",proposedOrTerminated:true}],
        annotations:[{tag:"①",title:"排他期",body:"補充契約將排他期延至12月28日（包括當日）。其他諒解備忘錄條款維持。"}],
        evidenceLinks:[{documentId:i,pages:[1,2],label:"潛在交易雙方及股數"},{documentId:p,pages:[1,2],label:"排他期及尚未簽約"}],firstPending:true};
    }else if(c.id==="HK-01389-20261012-max-premier"){
      const i=source(actual("2026-10-05","control_completion"),"2026101201299"),p=source(actual("2026-11-27","dispatch"),"2026112700061");
      const term=(k,v)=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===i);
      if(!i||!p||c.stage?.date!=="2026-11-27"||c.stage.eventKind!=="dispatch"||
        c.events?.some(e=>e.kind==="completion")||
        c.parties?.["要约方"]!=="Max Premier Limited"||c.parties?.["卖方"]!=="Silver Tycoon Limited"||
        !term("block_shares",298092515)||!term("block_pct",53.77)||!term("control_block",102163000)||
        !term("offer_shares",256240817)||!term("offer_price",0.3428))return null;
      f={left:"Silver Tycoon",right:"Max Premier",leftSub:"出售方",rightSub:"買方及要約人",a:"2.981億股已交割（53.77%）",
        lTitle:"10月5日 · 控股股份已交割",rTitle:"餘股要約文件",gate:"與控股權交割分開",badge:"綜合文件已寄發 · 餘股要約進行中",
        one:["每股 0.3428 港元","對約 2.562 億股餘股的要約"],two:["11 月 27 日開始接納","預定 12 月 18 日下午 4 時截止"],
        flows:[{id:"block",kind:"shares",direction:"ltr",fromLabel:"Silver Tycoon Limited",toLabel:"Max Premier Limited",headline:"10月5日已交割298,092,515股，佔53.77%"},
        {id:"offer",kind:"cash",direction:"ltr",fromLabel:"Max Premier Limited",toLabel:"餘股股東",headline:"餘股要約價每股0.3428港元；11月27日開始接納",proposedOrTerminated:true}],
        annotations:[{tag:"①",title:"控股股份與餘股要約",body:"控股股權協議對價1.02163億港元；餘股按每股0.3428港元另計，兩段金額分列。"}],
        evidenceLinks:[{documentId:i,pages:[2,3,4],label:"已完成的股份買賣及要約價"},{documentId:p,pages:[1,2],label:"綜合文件寄發及要約時間表"}],firstPending:false};
    }else if(c.id==="HK-00348-20261118-hwa-sheng"){
      const i=source(actual("2026-11-18","first_announcement"),"2026111801287");
      const term=(k,v)=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===i);
      if(!i||c.stage?.date!=="2026-11-18"||c.stage.eventKind!=="first_announcement"||
        c.events?.some(e=>e.kind==="control_completion"||e.kind==="dispatch"||e.kind==="completion")||
        c.parties?.["要约方"]!=="Hwa Sheng International Investment Limited"||
        !c.parties?.["卖方"]?.includes("Success Profile Inc.")||
        !c.mechanism?.includes("延期付款")||
        !term("proposed_sale_shares",305206460)||!term("proposed_block_pct",33.01)||!term("control_block",24416516.8)||
        !term("offer_price",0.08)||!term("consolidated_offer_price",0.40)||!term("offered_residual_shares",619364376)||
        !term("offer_cash_cap",49549150.08))return null;
      f={left:"原有六名股東",right:"Hwa Sheng",leftSub:"兩組股份買賣協議",rightSub:"擬買方及要約人",a:"擬轉讓舊股 3.052 億股（33.01%）",
        lTitle:"股份買賣已簽約 · 尚待交割",rTitle:"交割後 · 餘股現金要約",gate:"股份買賣先交割",badge:"六張承兌票據延期付款 · 收購尚待交割",
        one:["每股 0.08 港元","五合一後每股 0.40 港元"],two:["有條件現金要約","有效接納須令一致行動集團合計過半"],
        flows:[{id:"block",kind:"shares",direction:"ltr",fromLabel:c.parties["卖方"],toLabel:c.parties["要约方"],headline:"兩組協議擬轉讓305,206,460股現有股份（33.01%）",proposedOrTerminated:true},
          {id:"offer",kind:"cash",direction:"ltr",fromLabel:c.parties["要约方"],toLabel:"餘股股東",headline:"股份交割後始作餘股現金要約，舊股口徑全數接納上限49,549,150.08港元",proposedOrTerminated:true}],
        annotations:[{tag:"①",title:"賣方對價",body:"協議總對價24,416,516.80港元，按補充協議由六張免息承兌票據延期支付。票據交付與股份交割分列。"}],
        evidenceLinks:[{documentId:i,pages:[2,3],label:"兩組買賣協議及前置條件"},{documentId:i,pages:[13,14],label:"六名賣方及票據條款"},{documentId:i,pages:[15,16,17],label:"要約價、接納條件及最高對價"}],firstPending:true,notes:true};
    }else if(c.id==="HK-03774-20261030-sheng-zhan"){
      const i=source(actual("2026-10-23","control_completion"),"2026103002773"),p=source(proc("2026-11-20"),"2026112001408");
      const term=(k,v)=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===i);
      if(!i||!p||c.stage?.date!=="2026-10-23"||c.stage.eventKind!=="control_completion"||
        c.events?.some(e=>e.kind==="dispatch"||e.kind==="completion")||
        c.parties?.["要约方"]!=="Sheng Zhan International Limited"||c.parties?.["卖方"]!=="Equal Joy Holdings Limited"||
        !term("control_block",349650000)||!term("block_shares",466200000)||!term("block_pct",56.93)||
        !term("offer_price",0.75)||!term("offer_shares",352720000)||!term("offer_cash_cap",264540000))return null;
      f={left:"Equal Joy Holdings",right:"Sheng Zhan",leftSub:"出售方",rightSub:"買方及要約人",a:"4.662億股已交割（56.93%）",
        lTitle:"10月23日 · 控股股份已交割",rTitle:"餘股無條件強制要約",gate:"控股權與餘股分列",badge:"控股股份已交割 · 綜合文件延寄",
        one:["每股 0.75 港元","涉及 3.5272 億股餘股"],two:["12月9日 · 最遲寄發","執行人員已同意延期"],
        flows:[{id:"block",kind:"shares",direction:"ltr",fromLabel:c.parties["卖方"],toLabel:c.parties["要约方"],headline:"10月23日已轉讓466,200,000股（56.93%），交割時已付現金3.4965億港元"},
          {id:"offer",kind:"cash",direction:"ltr",fromLabel:c.parties["要约方"],toLabel:"餘股股東",headline:"餘股要約每股0.75港元，全數接納上限2.6454億港元；綜合文件待寄",proposedOrTerminated:true}],
        annotations:[{tag:"①",title:"兩段現金對價",body:"控股部分交割時付現金3.4965億港元。餘股全數接納時最高2.6454億港元。"}],
        evidenceLinks:[{documentId:i,pages:[2,4],label:"買賣雙方、交割及現金付款"},{documentId:i,pages:[6,7],label:"餘股範圍、要約對價及條件"},{documentId:p,pages:[2],label:"綜合文件延寄至12月9日"}],firstPending:false};
    }else return null;
    if(c.stage.status!=="active")return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topo=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"active",leftTitle:f.lTitle,rightTitle:f.rTitle,transitionLabel:f.gate,outcomeBadge:f.badge}),[
      box("L_sell","left",43,100,149,146,"seller",f.left,f.leftSub),box("L_buy","left",448,100,157,146,"buyer",f.right,f.rightSub),
      box("R_1","right",728,84,295,75,"target",...f.one),box("R_2","right",728,210,295,75,"public",...f.two)
    ],[],[{id:"block",panel:"left",kind:"shares",step:"①",pathPoints:[[192,172],[448,172]],labelCenter:[320,172],labelWidth:200,labelHeight:34,label:f.a,dashed:f.firstPending}]);
    const nodes=[{id:"l",role:"seller",name:f.left},{id:"r",role:"buyer",name:f.right}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"offer",modality:"cash",status:"active",stageDate:c.stage.date,stageLabel:f.badge,
      caseArchetypeLabel:f.notes?"協議收購與有條件要約":f.firstPending?"潛在控股權交易":"控股股份與強制要約",caseModalityLabel:f.notes?"票據延期付款／餘股現金要約":f.firstPending?"意向階段":"現金",caseModalityShortLabel:f.notes?"票據／現金":f.firstPending?"意向階段":"現金",
      before:{title:f.lTitle,nodes,equityLinks:[]},after:{title:f.rTitle,nodes,equityLinks:[],outcomeBadge:f.badge},
      flows:f.flows,annotations:f.annotations,evidenceLinks:f.evidenceLinks,compactSummary:f.badge,topology:topo};
  }

  function buildReviewedRealord(c,docs){
    const id=c.events?.find(e=>e.kind==="first_announcement"&&e.date==="2026-11-11"&&e.state==="actual")?.evidence?.documentId;
    const d=docs?.[id];
    const t=(k,v)=>c.terms?.some(x=>x.key===k&&x.value===v&&x.evidence?.documentId===id);
    if(d?.caseId!==c.id||!d.url.endsWith("/2026111101449.pdf")||c.stage?.status!=="active"||
      c.stage.date!=="2026-11-11"||c.stage.eventKind!=="first_announcement"||
      c.events?.some(e=>e.state==="actual"&&e.kind!=="first_announcement")||
      c.parties?.["貸款人／認購人"]!=="Manureen Holdings Limited"||
      !t("consideration",2546800000)||!t("new_shares",11576184000)||!t("price_per_share",0.22))return null;
    const title="有條件貸款資本化", right="交割及轉換條件", badge="已簽有條件協議 · 尚待股東及上市批准";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:382,status:"active",leftTitle:title,rightTitle:right,transitionLabel:"資本化於交割辦理",outcomeBadge:badge}),[
      mk("issuer","left",43,100,149,146,"listed","偉祿科技","發行人 · 01196"),
      mk("lender","left",448,100,157,146,"creditor","Manureen","控股股東及貸款人"),
      mk("approval","right",728,84,295,75,"target","獨立股東批准及特別授權","另須取得轉換股份上市批准"),
      mk("convert","right",728,210,295,75,"public","1 股優先股兌 1 股普通股","按條款轉換，比例可調整")
    ],[],[
      {id:"cps",panel:"left",kind:"shares",step:"①",pathPoints:[[192,143],[448,143]],labelCenter:[320,143],labelWidth:210,labelHeight:34,label:"115.762 億股可轉換優先股",dashed:true},
      {id:"setoff",panel:"left",kind:"cancel",step:"②",pathPoints:[[448,207],[192,207]],labelCenter:[320,207],labelWidth:210,labelHeight:34,label:"以約 25.468 億港元貸款抵銷",dashed:true}
    ]);
    const nodes=[{id:"i",role:"listed",name:"偉祿科技"},{id:"m",role:"creditor",name:"Manureen Holdings Limited"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"debt_restructuring",modality:"mixed",status:"active",stageDate:c.stage.date,stageLabel:badge,
      caseArchetypeLabel:"關連貸款資本化",caseModalityLabel:"可轉換優先股抵銷貸款",caseModalityShortLabel:"貸款抵銷",
      before:{title,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},topology,compactSummary:badge,
      flows:[{id:"cps",kind:"shares",direction:"ltr",fromLabel:"偉祿科技",toLabel:"Manureen Holdings Limited",headline:"按每股0.22港元擬發行11,576,184,000股可轉換優先股",proposedOrTerminated:true},
        {id:"setoff",kind:"cancel",direction:"rtl",fromLabel:"Manureen Holdings Limited",toLabel:"偉祿科技",headline:"認購價以約25.468億港元的部分股東貸款抵銷",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"抵銷金額",body:"資本化部分截至交割日繼續計息，該段利息由發行人向貸款人支付。"}],
      evidenceLinks:[{documentId:id,pages:[1,2,5,6,7],label:"發行數量、貸款抵銷及交割條件"}]});
  }
  function buildReviewedAcquisition26(c,docs){
    const src=(kind,date,leaf)=>{
      const id=c.events?.find(e=>e.kind===kind&&e.date===date&&e.state==="actual")?.evidence?.documentId,d=docs?.[id];
      return d?.caseId===c.id&&d.url.endsWith("/"+leaf+".pdf")?id:null;
    };
    const term=(id,k,v,u)=>c.terms?.some(t=>t.key===k&&t.value===v&&t.currency===u&&t.evidence?.documentId===id);
    if(c.events?.some(e=>e.state==="actual"&&(e.kind==="completion"||e.kind==="control_completion")))return null;
    let f;
    if(c.id==="HK-09860-20251113-crown-bioscience"){
      const i=src("first_announcement","2025-11-13","2025111300342"),t=src("termination","2026-11-13","2026111600079");
      if(!i||!t||c.stage?.status!=="terminated"||c.stage.date!=="2026-11-13"||c.stage.eventKind!=="termination"||
        c.parties?.["直接買方"]!=="Miramar Lifesciences Limited"||c.parties?.["直接賣方"]!=="JSR Life Sciences, LLC"||
        !term(i,"consideration",204000000,"USD")||!term(i,"upfront_cash",120000000,"USD"))return null;
      f={i,t,from:"JSR Life Sciences, LLC",to:"Miramar Lifesciences Limited",fromShort:"JSR Life Sciences",toShort:"Miramar Lifesciences",
        target:"Crown Bioscience International",status:"terminated",title:"原協議 · 收購標的全部股權",right:"終止及原定款項安排",badge:"2026年11月13日協議終止 · 未交割",
        gate:"原協議未交割",share:"原擬轉讓 100% 股權",cash:"原定交割款 1.20 億美元",
        r1:["11月13日 · 雙方協議終止","未能在最後截止日前取得監管批准"],r2:["原定兩筆業績付款","上限分別為 4,000 萬及 4,400 萬美元"],
        note:"原估總對價2.04億美元，交割款及總額可按協議調整；交易終止後不會進行收購。"};
    }else{
      const i=src("first_announcement","2026-11-23","2026112301703");
      if(!i||c.stage?.status!=="active"||c.stage.date!=="2026-11-23"||c.stage.eventKind!=="first_announcement"||
        c.events?.some(e=>e.kind==="termination"&&e.state==="actual")||
        c.parties?.["買方"]!=="天工智匯（深圳）科技有限公司"||c.parties?.["賣方"]!=="天下無霾低碳科技（上海）股份有限公司"||
        !term(i,"consideration",30100000,"CNY")||!term(i,"profit_guarantee_fy26",7000000,"CNY")||!term(i,"profit_guarantee_fy27",9100000,"CNY"))return null;
      f={i,from:c.parties["賣方"],to:c.parties["買方"],fromShort:"天下無霾低碳科技",toShort:"天工智匯（深圳）",
        target:"上海境觀智能科技有限公司",status:"active",title:"有條件股權轉讓協議",right:"付款節點及業績保證",badge:"2026年11月23日簽約 · 尚待股東批准及交割",
        gate:"交割後納入合併報表",share:"擬轉讓 100% 股權",cash:"現金對價 3,010 萬元人民幣",
        r1:["現金分兩期支付","簽約後10% · 交割後90%"],r2:["2026／2027年稅後盈利保證","人民幣700萬／910萬元"],
        note:"兩期款項各於相應日期後一個月內支付，雙方可另議；年度盈利不達標由賣方按差額以現金補足。"};
    }
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topo=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:380,status:f.status,leftTitle:f.title,rightTitle:f.right,transitionLabel:f.gate,outcomeBadge:f.badge}),[
      mk("s","left",43,100,149,146,"seller",f.fromShort,"出售方"),mk("b","left",448,100,157,146,"buyer",f.toShort,"收購方"),
      mk("r1","right",728,84,295,75,"target",...f.r1),mk("r2","right",728,210,295,75,"public",...f.r2)
    ],[],[
      {id:"shares",panel:"left",kind:"shares",step:"①",pathPoints:[[192,143],[448,143]],labelCenter:[320,143],labelWidth:206,labelHeight:34,label:f.share,dashed:true},
      {id:"cash",panel:"left",kind:"cash",step:"②",pathPoints:[[448,207],[192,207]],labelCenter:[320,207],labelWidth:210,labelHeight:34,label:f.cash,dashed:true}
    ]);
    const nodes=[{id:"s",role:"seller",name:f.from},{id:"b",role:"buyer",name:f.to}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:f.status,stageDate:c.stage.date,stageLabel:f.badge,
      before:{title:f.title,nodes,equityLinks:[]},after:{title:f.right,nodes,equityLinks:[],outcomeBadge:f.badge},topology:topo,compactSummary:f.badge,
      flows:[{id:"shares",kind:"shares",direction:"ltr",fromLabel:f.from,toLabel:f.to,headline:f.target+" · "+f.share,proposedOrTerminated:true},
        {id:"cash",kind:"cash",direction:"rtl",fromLabel:f.to,toLabel:f.from,headline:f.cash,proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"款項安排",body:f.note}],
      evidenceLinks:f.t?[{documentId:f.i,pages:[2,3,4,5],label:"原股權及付款安排"},{documentId:f.t,pages:[1,2],label:"監管批准及終止日期"}]:[{documentId:f.i,pages:[1,2,3,4],label:"收購股權、對價及先決條件"}]});
  }
  function buildReviewedGreentechBerk(c,docs){
    const src=(kind,date,fragment)=>{
      const id=c.events?.find(e=>e.kind===kind&&e.date===date&&e.state==="actual")?.evidence?.documentId,d=docs?.[id];
      return d?.caseId===c.id&&d.url.startsWith("https://www.sfc.hk/")&&d.url.includes(fragment)?id:null;
    };
    const i=src("first_announcement","2026-09-07","Greentech_EN_Announcement_20260907.pdf");
    const t=src("offer_lapse","2026-11-10","greentech-level-of-acceptance-and-lapse-announcement-english-clean-20261110-1900v11.pdf");
    const term=(id,k,v)=>c.terms?.some(x=>x.key===k&&x.value===v&&x.evidence?.documentId===id);
    if(!i||!t||c.stage?.status!=="terminated"||c.stage.date!=="2026-11-10"||c.stage.eventKind!=="offer_lapse"||
       c.events?.some(e=>e.state==="actual"&&["completion","control_completion"].includes(e.kind))||
       c.parties?.["要约方"]!=="Berk Kivanc"||c.parties?.["受要约方"]!=="Greentech Technology International Limited"||
       !term(i,"offer_price",0.20)||!term(t,"threshold_shares",19900000)||!term(t,"valid_tenders",1741000)||
       !term(t,"actual_acquired_shares",0)||!term(t,"actual_cash",0))return null;
    const title="原自願有條件部分要約",right="首個截止日 · 接納及結果",badge="2026年11月10日失效 · 未取得股份、毋須支付對價";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:378,status:"terminated",leftTitle:title,rightTitle:right,transitionLabel:"未達不可豁免門檻",outcomeBadge:badge}),[
      mk("s","left",43,100,149,146,"public","合資格股東","綠科科技國際"),
      mk("b","left",448,100,157,146,"buyer","Berk Kivanc","要約人"),
      mk("accept","right",728,84,295,75,"target","有效接納 174.1 萬股","最低接納門檻 1,990 萬股"),
      mk("result","right",728,210,295,75,"public","11月10日 16:00 · 要約失效","接納不再生效；並無股份取得")
    ],[],[{id:"offer",panel:"left",kind:"shares",step:"①",pathPoints:[[192,172],[448,172]],labelCenter:[320,172],labelWidth:205,labelHeight:34,label:"原要約每股 0.20 港元",dashed:true}]);
    const nodes=[{id:"s",role:"public",name:"綠科科技國際合資格股東"},{id:"b",role:"buyer",name:"Berk Kivanc"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"offer",modality:"cash",status:"terminated",stageDate:c.stage.date,stageLabel:badge,
      caseArchetypeLabel:"自願有條件部分要約",caseModalityLabel:"原現金要約",caseModalityShortLabel:"現金",
      before:{title,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},topology,compactSummary:badge,
      flows:[{id:"offer",kind:"shares",direction:"ltr",fromLabel:nodes[0].name,toLabel:nodes[1].name,headline:"原擬收購1,990萬股；接納門檻未達，實際取得0股",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"有效接納及結果",body:"首個截止日有效接納1,741,000股，佔要約股數約8.75%。要約失效，沒有按比例分配或應付對價。"}],
      evidenceLinks:[{documentId:i,pages:[1,2],label:"原要約及價格"},{documentId:t,pages:[2,3],label:"接納數量、失效及處理"}]});
  }
  function buildReviewedJinmaoFinance(c,docs){
    const src=(kind,date,leaf)=>{
      const id=c.events?.find(e=>e.kind===kind&&e.date===date&&e.state==="actual")?.evidence?.documentId,d=docs?.[id];
      return d?.caseId===c.id&&d.url.endsWith("/"+leaf+".pdf")?id:null;
    };
    const i=src("dispatch","2026-11-06","2026110601470"),v=src("vote","2026-11-24","2026112401161");
    const t=(k,v)=>c.terms?.some(x=>x.key===k&&x.value===v&&x.currency==="CNY"&&x.evidence?.documentId===i);
    if(!i||!v||c.stage?.status!=="approved"||c.stage.date!=="2026-11-24"||c.stage.eventKind!=="vote"||
      c.events?.some(e=>e.kind==="termination"&&e.state==="actual")||
      !c.parties?.["金融服務"]?.startsWith("中化集團財務有限責任公司")||
      !c.parties?.["保理服務"]?.startsWith("中化商業保理有限公司")||
      !t("deposit_cap",18000000000)||!t("secured_loan_cap",10000000000)||!t("factoring_daily_cap",10000000000)||!t("nonfinancing_factoring_fee_cap",30000000))return null;
    const title="中國金茂 · 兩項服務框架",right="2027至2029年度上限（人民幣）",badge="11月24日 · 獨立股東通過兩項框架";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:388,status:"approved",leftTitle:title,rightTitle:right,transitionLabel:"各項服務分列",outcomeBadge:badge}),[
      mk("jm","left",43,90,146,164,"listed","中國金茂","服務使用方 · 00817"),
      mk("fn","left",455,79,148,77,"target","中化財務","金融服務提供方"),
      mk("ft","left",455,200,148,77,"target","中化保理","保理服務提供方"),
      mk("caps1","right",728,81,295,83,"target","存款 180 億 · 抵押貸款 100 億","各為每日最高餘額"),
      mk("caps2","right",728,198,295,83,"target","融資保理 100 億","每日餘額；非融資保理費每年3,000萬")
    ],[],[
      {id:"fn",panel:"left",kind:"asset",step:"①",pathPoints:[[455,117],[189,117]],labelCenter:[322,117],labelWidth:180,labelHeight:34,label:"非獨家金融服務"},
      {id:"ft",panel:"left",kind:"asset",step:"②",pathPoints:[[455,237],[189,237]],labelCenter:[322,237],labelWidth:180,labelHeight:34,label:"非獨家保理服務"}
    ]);
    const nodes=[{id:"s",role:"listed",name:c.parties["上市公司"]},{id:"fn",role:"target",name:c.parties["金融服務"]},{id:"ft",role:"target",name:c.parties["保理服務"]}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"disclosable_major",modality:"in_kind",status:"approved",stageDate:c.stage.date,stageLabel:badge,
      caseArchetypeLabel:"持續關連金融服務",caseModalityLabel:"服務上限",caseModalityShortLabel:"服務上限",topology,compactSummary:badge,
      before:{title,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"fn",kind:"asset",direction:"rtl",fromLabel:nodes[1].name,toLabel:nodes[0].name,headline:"金融框架 · 存款及有抵押貸款按每日餘額各設上限"},
        {id:"ft",kind:"asset",direction:"rtl",fromLabel:nodes[2].name,toLabel:nodes[0].name,headline:"保理框架 · 融資按每日餘額、非融資按年度服務費各設上限"}],
      annotations:[{tag:"①",title:"獨立股東表決",body:"金融服務議案獲92.83%贊成；保理服務議案獲99.96%贊成。"}],
      evidenceLinks:[{documentId:i,pages:[12,13,21,24],label:"服務及各項年度上限"},{documentId:v,pages:[1,2,3],label:"兩項表決結果"}]});
  }
  function buildReviewedYovole(c,docs){
    const src=(kind,date,leaf)=>{
      const id=c.events?.find(e=>e.kind===kind&&e.date===date&&e.state==="actual")?.evidence?.documentId,d=docs?.[id];
      return d?.caseId===c.id&&d.url.endsWith("/"+leaf+".pdf")?id:null;
    };
    const i=src("first_announcement","2026-06-29","2026062902639"),p=src("supplement","2026-11-18","2026111801563");
    const t=(id,k,v)=>c.terms?.some(x=>x.key===k&&x.value===v&&x.evidence?.documentId===id);
    if(!i||!p||c.stage?.status!=="active"||c.stage.date!=="2026-11-18"||c.stage.eventKind!=="supplement"||
      c.events?.some(e=>e.state==="actual"&&["completion","termination"].includes(e.kind))||
      c.parties?.["賣方"]!=="Yovole Cayman"||c.parties?.["境內營運標的"]!=="上海有孚雲計算有限公司"||
      !t(i,"consideration",2200000000)||!t(i,"consideration_ceiling",2500000000)||
      !t(p,"cash_settled_lpd",660000000)||!t(p,"cash_pending_base_lpd",1340000000)||!t(p,"consideration_shares_pending_lpd",33057851))return null;
    const title="上海有孚營運公司股權",right="按 11 月 18 日通函 · 對價進度",badge="營運公司已過戶 · 第三、四期對價尚未支付";
    const seller="Yovole Data Group", buyer="晉景新能控股有限公司";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:398,status:"active",leftTitle:title,rightTitle:right,transitionLabel:"股權與付款分列",outcomeBadge:badge}),[
      mk("b","left",43,100,149,146,"buyer","晉景新能","上市買方 · 01783"),
      mk("s","left",448,100,157,146,"target","上海有孚雲計算","境內營運公司"),
      mk("paid","right",724,77,310,83,"target","首兩期 6.60 億港元","1 億訂金及 5.60 億存入托管戶"),
      mk("pending","right",724,204,310,85,"creditor","按基礎價待付 13.40 億港元","另待發行 33,057,851 股代價股")
    ],[],[{id:"shares",panel:"left",kind:"shares",step:"①",pathPoints:[[192,172],[448,172]],labelCenter:[320,172],labelWidth:212,labelHeight:34,label:"買方已直接持有 100%"}]);
    const nodes=[{id:"s",role:"seller",name:seller},{id:"b",role:"buyer",name:buyer},{id:"target",role:"target",name:c.parties["境內營運標的"]}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"mixed",status:"active",stageDate:c.stage.date,stageLabel:badge,
      caseArchetypeLabel:"業務股權收購",caseModalityLabel:"分期現金及代價股",caseModalityShortLabel:"現金及股份",topology,compactSummary:badge,
      before:{title,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"shares",kind:"shares",direction:"ltr",fromLabel:buyer,toLabel:c.parties["境內營運標的"],headline:"上海有孚營運公司股權已過戶；晉景新能直接持有100%"},
        {id:"paid",kind:"cash",direction:"rtl",fromLabel:buyer,toLabel:"首兩期款項（第二期存入托管戶）",headline:"首兩期合計6.60億港元，包含5.60億港元托管付款"},
        {id:"pending",kind:"cash",direction:"rtl",fromLabel:buyer,toLabel:seller,headline:"按基礎對價，餘下現金13.40億港元；第三期6.60億與已付首兩期是不同款項",proposedOrTerminated:true},
        {id:"stock",kind:"shares",direction:"rtl",fromLabel:buyer,toLabel:seller,headline:"第四期另待發行33,057,851股代價股",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"基礎對價及調整",body:"簽約賣方為Yovole Data Group。基礎對價22億港元，按交割帳目調整，上限25億港元。餘款仍視乎牌照公司及業務合作方資格審核等條件。"}],
      evidenceLinks:[{documentId:i,pages:[1,3,4],label:"賣方、基礎對價及四期安排"},{documentId:p,pages:[12,19,20,38],label:"截至通函最後實際可行日期的持股、托管及待付對價"}]});
  }
  function buildReviewedEnvisionServers(c,docs){
    const disp=c.events?.find(e=>e.kind==="dispatch"&&e.date==="2026-11-18"&&e.state==="actual")?.evidence?.documentId;
    const d=docs?.[disp];
    const t=(k,v)=>c.terms?.some(x=>x.key===k&&x.value===v&&x.currency==="CNY"&&x.evidence?.documentId===disp);
    if(d?.caseId!==c.id||!d.url.endsWith("/2026111801563.pdf")||c.stage?.status!=="active"||
      c.stage.date!=="2026-11-18"||c.stage.eventKind!=="dispatch"||
      c.events?.some(e=>e.state==="actual"&&["vote","completion","termination"].includes(e.kind))||
      !c.events?.some(e=>e.kind==="vote"&&e.date==="2026-12-07"&&e.state==="scheduled"&&e.evidence?.documentId===disp)||
      !t("signed_august_purchase",1288400000)||!t("proposed_purchase",380000000))return null;
    const title="高性能伺服器採購雙方",right="兩批採購及進度 · 人民幣含稅",badge="通函已刊發 · 12月7日擬審議兩批採購";
    const seller="上海順詮科技有限公司", buyer="上海有孚雲計算有限公司";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:398,status:"active",leftTitle:title,rightTitle:right,transitionLabel:"兩批分開表決",outcomeBadge:badge}),[
      mk("s","left",43,100,149,146,"seller","上海順詮科技","英業達全資附屬公司"),
      mk("b","left",448,100,157,146,"buyer","上海有孚雲計算","晉景新能集團"),
      mk("signed","right",724,77,310,83,"target","8月已簽 · 12.884 億元","逾400台；已付2.5768億，未交付"),
      mk("pending","right",724,204,310,85,"creditor","追加擬購 · 3.80 億元","逾100台；待股東批准方可簽約")
    ],[],[{id:"servers",panel:"left",kind:"asset",step:"①",pathPoints:[[192,143],[448,143]],labelCenter:[320,143],labelWidth:206,labelHeight:34,label:"8月批次 · 尚未交付",dashed:true},
           {id:"addon",panel:"left",kind:"asset",step:"②",pathPoints:[[192,207],[448,207]],labelCenter:[320,207],labelWidth:206,labelHeight:34,label:"追加批次 · 尚未簽約",dashed:true}]);
    const nodes=[{id:"s",role:"seller",name:seller},{id:"b",role:"buyer",name:buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:"active",stageDate:c.stage.date,stageLabel:badge,
      caseArchetypeLabel:"設備採購",caseModalityLabel:"現金分期",caseModalityShortLabel:"現金",topology,compactSummary:badge,
      before:{title,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"servers",kind:"asset",direction:"ltr",fromLabel:seller,toLabel:buyer,headline:"8月批次已簽約；截至通函日尚未交付",proposedOrTerminated:true},
        {id:"paid",kind:"cash",direction:"rtl",fromLabel:buyer,toLabel:seller,headline:"截至最後實際可行日期，8月批次已付人民幣2.5768億元，待付10.3072億元"},
        {id:"addon",kind:"asset",direction:"ltr",fromLabel:seller,toLabel:buyer,headline:"追加批次未簽約，擬議對價人民幣3.80億元",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"表決安排",body:"第一項議案追認8月合同；第二項議案審議追加採購。兩批設備採購與收購上海有孚股權分列。"}],
      evidenceLinks:[{documentId:disp,pages:[5,8,9,10,11,12,41],label:"採購各方、兩批合同、付款及表決安排"}]});
  }
  function buildReviewedYellowstone(c,docs){
    const id=c.events?.find(e=>e.kind==="completion"&&e.date==="2026-08-26"&&e.state==="actual")?.evidence?.documentId;
    const d=docs?.[id];
    const t=(k,v)=>c.terms?.some(x=>x.key===k&&x.value===v&&x.evidence?.documentId===id);
    if(d?.caseId!==c.id||!d.url.startsWith("https://www.sfc.hk/")||!d.url.includes("/E_Greentech_Yellowstone-20260826.pdf")||
      c.stage?.status!=="closed"||c.stage.date!=="2026-08-26"||c.stage.eventKind!=="completion"||
      c.events?.some(e=>e.state==="actual"&&["termination","offer_lapse"].includes(e.kind))||
      c.parties?.["要约方"]!=="Yellowstone International Limited"||
      !t("offer_price",0.55)||!t("max_shares",230000000)||!t("accepted_shares",114070700)||!t("actual_cash",62738885)||!t("accepted_percent",8.35))return null;
    const title="自願無條件部分要約",right="接納、對價及持股分列",badge="8月26日截止 · 1.140707億股有效接納並全數承購";
    const buyer="Yellowstone International Limited", seller="綠科科技國際合資格股東";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:395,status:"closed",leftTitle:title,rightTitle:right,transitionLabel:"低於上限 · 全數承購",outcomeBadge:badge}),[
      mk("s","left",43,100,149,146,"public","合資格股東","綠科科技國際"),
      mk("b","left",448,100,157,146,"buyer","Yellowstone","要約方"),
      mk("t","right",724,78,310,83,"target","1.140707 億股獲接納","佔已發行股份8.35%；毋須按比例分配"),
      mk("p","right",724,203,310,85,"creditor","應付毛額 6,273.9 萬港元","每股0.55港元 · 按接納股數計")
    ],[],[{id:"shares",panel:"left",kind:"shares",step:"①",pathPoints:[[192,172],[448,172]],labelCenter:[320,172],labelWidth:205,labelHeight:34,label:"有效接納 114,070,700 股"}]);
    const nodes=[{id:"s",role:"public",name:seller},{id:"b",role:"buyer",name:buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"offer",modality:"cash",status:"closed",stageDate:c.stage.date,stageLabel:badge,
      caseArchetypeLabel:"自願無條件部分要約",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,
      before:{title,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"shares",kind:"shares",direction:"ltr",fromLabel:seller,toLabel:buyer,headline:"有效接納114,070,700股，低於2.30億股上限，全部承購"},
        {id:"payable",kind:"cash",direction:"rtl",fromLabel:buyer,toLabel:seller,headline:"應付毛額62,738,885港元，按最終每股0.55港元計，未扣印花稅",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"要約方及一致行動人士",body:"按截止公告，結算後將合計持有126,735,238股（約9.28%），包括要約前一致行動人士持有12,664,538股。"}],
      evidenceLinks:[{documentId:id,pages:[2,3],label:"接納、結算條款及結算後持股"}]});
  }
  function buildReviewedGeo(c,docs){
    const id=c.events?.find(e=>e.kind==="completion"&&e.date==="2026-08-12"&&e.state==="actual")?.evidence?.documentId;
    const d=docs?.[id];
    const t=(k,v)=>c.terms?.some(x=>x.key===k&&x.value===v&&x.evidence?.documentId===id);
    if(d?.caseId!==c.id||d.url!=="https://green-technology.com.hk/upfile/2023/05/20260817052534_553.pdf"||
      c.stage?.status!=="closed"||c.stage.date!=="2026-08-12"||c.stage.eventKind!=="completion"||
      c.events?.some(e=>e.state==="actual"&&["termination","offer_lapse"].includes(e.kind))||
      c.parties?.["要约方"]!=="Geo Environ (HK) Investment Limited"||
      !t("offer_price",0.45)||!t("max_shares",220000000)||!t("accepted_shares",68606600)||!t("actual_cash",30872970)||!t("accepted_percent",5.02))return null;
    const title="自願無條件部分要約",right="接納、對價及持股分列",badge="8月12日截止 · 6,860.66萬股有效接納並全數承購";
    const buyer="Geo Environ (HK) Investment Limited", seller="綠科科技國際合資格股東";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:395,status:"closed",leftTitle:title,rightTitle:right,transitionLabel:"低於上限 · 全數承購",outcomeBadge:badge}),[
      mk("s","left",43,100,149,146,"public","合資格股東","綠科科技國際"),
      mk("b","left",448,100,157,146,"buyer","高能環境（香港）","要約方"),
      mk("t","right",724,78,310,83,"target","6,860.66 萬股獲接納","佔已發行股份5.02%；毋須按比例分配"),
      mk("p","right",724,203,310,85,"creditor","應付毛額 3,087.3 萬港元","每股0.45港元 · 按接納股數計")
    ],[],[{id:"shares",panel:"left",kind:"shares",step:"①",pathPoints:[[192,172],[448,172]],labelCenter:[320,172],labelWidth:205,labelHeight:34,label:"有效接納 68,606,600 股"}]);
    const nodes=[{id:"s",role:"public",name:seller},{id:"b",role:"buyer",name:buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"offer",modality:"cash",status:"closed",stageDate:c.stage.date,stageLabel:badge,
      caseArchetypeLabel:"自願無條件部分要約",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,
      before:{title,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"shares",kind:"shares",direction:"ltr",fromLabel:seller,toLabel:buyer,headline:"有效接納68,606,600股，低於2.20億股上限，全部承購"},
        {id:"payable",kind:"cash",direction:"rtl",fromLabel:buyer,toLabel:seller,headline:"應付毛額30,872,970港元，按最終每股0.45港元計，未扣印花稅",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"要約方及一致行動人士",body:"是次要約仍在上市期間截止；全數承購佔已發行股份約5.02%。"}],
      evidenceLinks:[{documentId:id,pages:[2,3],label:"接納及結算條款"}]});
  }
  function buildReviewedJinmaoTimao(c,docs){
    const src=(kind,date,leaf)=>{
      const id=c.events?.find(e=>e.kind===kind&&e.date===date&&e.state==="actual")?.evidence?.documentId,d=docs?.[id];
      return d?.caseId===c.id&&d.url.endsWith("/"+leaf+".pdf")?id:null;
    };
    const i=src("first_announcement","2026-06-16","2026061601440"),v=src("completion","2026-06-18","2026110601470");
    const t=(k,v)=>c.terms?.some(x=>x.key===k&&x.value===v&&x.currency==="CNY"&&x.evidence?.documentId===i);
    if(!i||!v||c.stage?.status!=="closed"||c.stage.date!=="2026-06-18"||c.stage.eventKind!=="completion"||
      c.events?.some(e=>e.kind==="termination"&&e.state==="actual")||
      c.parties?.["買方"]!=="北京方興亦城置業有限公司"||c.parties?.["賣方"]!=="嘉興琮茂股權投資合夥企業（有限合夥）"||
      !t("consideration",884200000)||!t("debt_interests",521636000)||!t("equity_valuation",710910000))return null;
    const title="天津泰茂股權及債權轉讓",right="交割結果與對價 · 人民幣",badge="2026年6月18日完成 · 中國金茂間接全資持有";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:398,status:"closed",leftTitle:title,rightTitle:right,transitionLabel:"股權與債權一併轉讓",outcomeBadge:badge}),[
      mk("s","left",43,100,149,146,"seller","嘉興琮茂","出售方"),
      mk("b","left",448,100,157,146,"buyer","北京方興亦城","中國金茂間接全資附屬"),
      mk("holding","right",724,77,310,83,"target","中國金茂間接持股 49% → 100%","標的：天津泰茂置業"),
      mk("pay","right",724,204,310,85,"creditor","股權及債權總對價 8.842 億元","內含約 5.21636 億元債權本息")
    ],[],[
      {id:"stake",panel:"left",kind:"shares",step:"①",pathPoints:[[192,143],[448,143]],labelCenter:[320,143],labelWidth:206,labelHeight:34,label:"天津泰茂餘下 51% 股權"},
      {id:"debt",panel:"left",kind:"asset",step:"②",pathPoints:[[192,207],[448,207]],labelCenter:[320,207],labelWidth:206,labelHeight:34,label:"轉讓既有股東債權本息"}
    ]);
    const nodes=[{id:"s",role:"seller",name:c.parties["賣方"]},{id:"b",role:"buyer",name:c.parties["買方"]}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:"closed",stageDate:c.stage.date,stageLabel:badge,
      caseArchetypeLabel:"收購剩餘股權及債權",caseModalityLabel:"一次性現金對價",caseModalityShortLabel:"現金",topology,compactSummary:badge,
      before:{title,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"stake",kind:"shares",direction:"ltr",fromLabel:nodes[0].name,toLabel:nodes[1].name,headline:"轉讓天津泰茂51%股權；中國金茂的間接持股由49%增至100%"},
        {id:"debt",kind:"asset",direction:"ltr",fromLabel:nodes[0].name,toLabel:nodes[1].name,headline:"一併轉讓約5.21636億元人民幣既有債權本息"},
        {id:"cash",kind:"cash",direction:"rtl",fromLabel:nodes[1].name,toLabel:nodes[0].name,headline:"一次性現金總對價約8.842億元人民幣，已包含所轉讓債權"}],
      annotations:[{tag:"①",title:"股權及債權分項",body:"總價包括51%股權對價及債權本息；7.1091億元是標的淨資產評估值。"}],
      evidenceLinks:[{documentId:i,pages:[1,2],label:"交易各方、對價及轉讓範圍"},{documentId:v,pages:[81],label:"完成日期"}]});
  }
  function buildReviewedTianjinPortFramework(c,docs){
    const all=[...(c.events||[]),...(c.processEvents||[])];
    const src=(kind,date,state,leaf)=>{
      const id=all.find(e=>e.kind===kind&&e.date===date&&e.state===state)?.evidence?.documentId,d=docs?.[id];
      return d?.caseId===c.id&&d.url.endsWith("/"+leaf+".pdf")?id:null;
    };
    const i=src("dispatch","2026-11-24","actual","2026112400284"),v=src("shareholder_meeting","2026-12-16","expected","2026112400290");
    const caps={procurement:[451,564,705],lease:[33,209,792],services:[3273,3601,3962]};
    if(!i||!v||c.stage?.status!=="active"||c.stage.date!=="2026-11-24"||c.stage.eventKind!=="dispatch"||
      all.some(e=>e.state==="actual"&&["vote","shareholder_meeting","completion","termination"].includes(e.kind))||
      c.parties?.["關連對手方"]!=="天津港（集團）有限公司及其聯繫人"||
      !Object.entries(caps).every(([k,vs])=>vs.every((n,j)=>c.terms?.some(x=>x.key===k+"_"+(2027+j)&&x.value===n*1000000&&x.currency==="CNY"&&x.evidence?.documentId===i))))return null;
    const title="三項持續關連交易框架",right="2027／2028／2029 年度上限",badge="通函已刊發 · 12月16日擬由獨立股東逐項表決";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const a=c.parties["上市公司"],b=c.parties["關連對手方"];
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:411,status:"active",leftTitle:title,rightTitle:right,transitionLabel:"按年及按服務分列",outcomeBadge:badge}),[
      mk("a","left",43,106,157,146,"listed","天津港發展","上市公司 · 03382"),
      mk("b","left",448,106,157,146,"target","天津港集團","關連方及其聯繫人"),
      mk("p","right",724,75,310,64,"target","商品採購","人民幣百萬元 451／564／705"),
      mk("l","right",724,157,310,64,"target","物業租賃 · 使用權資產","人民幣百萬元 33／209／792"),
      mk("s","right",724,239,310,64,"target","綜合服務","人民幣百萬元 3,273／3,601／3,962")
    ],[],[{id:"framework",panel:"left",kind:"asset",step:"①",pathPoints:[[448,179],[200,179]],labelCenter:[324,179],labelWidth:196,labelHeight:34,label:"三項框架待獨立股東批准",dashed:true}]);
    const nodes=[{id:"a",role:"listed",name:a},{id:"b",role:"target",name:b}];
    const flows=[["p","商品採購：燃油、設備及其他商品"],["l","使用權資產租賃：貨場、倉庫及設施"],["s","綜合服務：公用設施及營運支援"]].map(([id,headline])=>({id,kind:"asset",direction:"rtl",fromLabel:b,toLabel:a,headline,proposedOrTerminated:true}));
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"disclosable_major",modality:"in_kind",status:"active",stageDate:c.stage.date,stageLabel:badge,
      caseArchetypeLabel:"持續關連交易續期",caseModalityLabel:"三項框架年度上限",caseModalityShortLabel:"年度上限",topology,compactSummary:badge,
      before:{title,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows,
      annotations:[{tag:"①",title:"續期及表決",body:"三項框架涵蓋2027年1月1日至2029年12月31日；各年度上限和各項議案分開列示。"}],
      evidenceLinks:[{documentId:i,pages:[10,16,24],label:"九項建議年度上限"},{documentId:v,pages:[1,2],label:"股東特別大會及三項議案"}]});
  }
  function buildReviewedWeimobGpu(c,docs){
    const id=c.events?.find(e=>e.kind==="first_announcement"&&e.date==="2026-11-26"&&e.state==="actual")?.evidence?.documentId;
    const d=docs?.[id];
    const t=(k,v)=>c.terms?.some(x=>x.key===k&&x.value===v&&x.evidence?.documentId===id);
    if(d?.caseId!==c.id||!d.url.endsWith("/2026112600535.pdf")||c.stage?.status!=="active"||
      c.stage.date!=="2026-11-26"||c.stage.eventKind!=="first_announcement"||
      c.events?.some(e=>e.state==="actual"&&["completion","termination","delivery"].includes(e.kind))||
      c.parties?.["供應商"]!=="英邁電子商貿（上海）有限公司"||c.parties?.["買方"]!=="上海微盟智算信息科技有限公司"||
      !t("consideration",344000000)||!t("gpu_units",4000)||!t("advance_pct",10))return null;
    const title="GPU 採購協議一",right="對價及分批履約",badge="11月26日簽約 · 按實際到貨分批付款及交付";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const a=c.parties["買方"],b=c.parties["供應商"];
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:395,status:"active",leftTitle:title,rightTitle:right,transitionLabel:"已簽約 · 待交付",outcomeBadge:badge}),[
      mk("s","left",43,100,149,146,"seller","英邁上海","供應商"),
      mk("b","left",448,100,157,146,"buyer","上海微盟智算","微盟集團全資附屬"),
      mk("price","right",724,78,310,83,"target","約 3.44 億元人民幣","按報關匯率及製造商報價調整"),
      mk("pay","right",724,203,310,85,"creditor","協議約定預付 10%","簽約後兩個營業日內 · 抵扣末批款")
    ],[],[{id:"gpu",panel:"left",kind:"asset",step:"①",pathPoints:[[192,172],[448,172]],labelCenter:[320,172],labelWidth:205,labelHeight:34,label:"4,000 件 GPU 產品",dashed:true}]);
    const nodes=[{id:"s",role:"seller",name:b},{id:"b",role:"buyer",name:a}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:"active",stageDate:c.stage.date,stageLabel:badge,
      caseArchetypeLabel:"設備採購",caseModalityLabel:"分批付款",caseModalityShortLabel:"現金",topology,compactSummary:badge,
      before:{title,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"gpu",kind:"asset",direction:"ltr",fromLabel:b,toLabel:a,headline:"約定分批交付4,000件GPU產品",proposedOrTerminated:true},
        {id:"cash",kind:"cash",direction:"rtl",fromLabel:a,toLabel:b,headline:"約定10%預付款，其餘按批支付；約3.44億元人民幣對價可調整",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"另行披露的採購",body:"向上海賦欣採購1,000件的協議獨立訂立，8,650萬元人民幣對價另列；公告自願披露該協議。"}],
      evidenceLinks:[{documentId:id,pages:[1,2,3,6,7],label:"兩項協議、交付付款及各方定義"}]});
  }
  function buildReviewedSimberi(c,docs){
    const src=(events,kind,date,suffix)=>{
      const id=events?.find(e=>e.kind===kind&&e.date===date&&e.state==="actual")?.evidence?.documentId,d=docs?.[id];
      return d?.caseId===c.id&&d.url.endsWith("/"+suffix+".pdf")?id:null;
    };
    const i=src(c.events,"first_announcement","2026-09-10","2026091000003");
    const p=src(c.processEvents,"status_update","2026-11-16","2026.11.16-update-on-simberi-transaction");
    const t=(id,k,v)=>c.terms?.find(t=>t.key===k&&t.value===v&&(!id||t.evidence?.documentId===id));
    const ret=t(null,"construction_reimbursement",43000000),gross=t(null,"seller_closing_gross_cash",453000000),q=ret?.evidence?.documentId;
    if(!i||!p||!q||docs?.[q]?.caseId!==c.id||!docs[q].url.endsWith("/2026.09.10-st-barbara-to-sell-simberi-interest-to-lingbao.pdf")||
      gross?.evidence?.documentId!==q||c.stage?.date!=="2026-11-16"||c.stage.status!=="active"||c.stage.eventKind!=="status_update"||
      c.events?.some(e=>e.state==="actual"&&["termination","completion"].includes(e.kind))||
      !t(i,"consideration",410000000)||!t(i,"simberi_nsr",2.75)||!t(i,"tabar_nsr",1.5)||
      !c.parties?.["買方"]?.startsWith("Lingbao Gold International Company Limited")||!c.parties?.["賣方"]?.startsWith("St Barbara Limited"))return null;
    const title="Tabar Islands Holdings 餘下股權",right="現金、償付與特許權費",badge="雙方股東批准條件已豁免 · 中國及巴新審批中";
    const buyer="Lingbao Gold International Company Limited",seller="St Barbara Limited";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:411,status:"active",leftTitle:title,rightTitle:right,transitionLabel:"目標2027年第一季度",outcomeBadge:badge}),[
      mk("s","left",43,100,149,146,"seller","St Barbara","ASX: SBM"),
      mk("b","left",448,100,157,146,"buyer","靈寶黃金國際","靈寶黃金全資附屬"),
      mk("cash","right",724,77,310,64,"target","股權現金價 4.10 億澳元","另償付約 4,300 萬澳元建設出資"),
      mk("nsr","right",724,159,310,64,"target","Simberi 2.75% · Tabar 1.5%","兩項淨冶煉收益特許權費"),
      mk("approval","right",724,241,310,64,"public","中國、巴新審批仍在進行","11月16日披露")
    ],[],[{id:"stake",panel:"left",kind:"shares",step:"①",pathPoints:[[192,172],[448,172]],labelCenter:[320,172],labelWidth:205,labelHeight:34,label:"擬轉讓 50% 減 1 股",dashed:true}]);
    const nodes=[{id:"s",role:"seller",name:seller},{id:"b",role:"buyer",name:buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"mixed",status:"active",stageDate:c.stage.date,stageLabel:badge,
      caseArchetypeLabel:"礦業持股收購",caseModalityLabel:"現金及兩項特許權費",caseModalityShortLabel:"現金及權利金",topology,compactSummary:badge,
      before:{title,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"stake",kind:"shares",direction:"ltr",fromLabel:seller,toLabel:buyer,headline:"擬轉讓Tabar Islands Holdings餘下50%減一股股權",proposedOrTerminated:true},
        {id:"pay",kind:"cash",direction:"rtl",fromLabel:buyer,toLabel:seller,headline:"股權現金價4.10億澳元；另償付約4,300萬澳元建設出資，賣方披露交割現金合計約4.53億澳元",proposedOrTerminated:true},
        {id:"nsr",kind:"asset",direction:"rtl",fromLabel:"Tabar Islands Holdings",toLabel:seller,headline:"Simberi金銀產品2.75%及Tabar探礦許可相關礦產品1.5%淨冶煉收益特許權費",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"交割條件",body:"雙方已分別豁免其股東批准條件；中國和巴布亞新幾內亞審批仍在進行。"}],
      evidenceLinks:[{documentId:i,pages:[3,4],label:"股權、現金價及特許權費"},{documentId:q,pages:[1,2],label:"建設出資償還及賣方合計現金"},{documentId:p,pages:[1],label:"豁免及剩餘審批"}]});
  }
  function buildReviewedClosedTrio(c,docs){
    const t=(k,v)=>c.terms?.find(x=>x.key===k&&x.value===v);
    const fromDoc=(id,leaf)=>docs?.[id]?.caseId===c.id&&docs[id].url.endsWith("/"+leaf+".pdf")?id:null;
    const ev=(k,d,leaf)=>fromDoc(c.events?.find(e=>e.kind===k&&e.date===d&&e.state==="actual")?.evidence?.documentId,leaf);
    if(c.stage?.status!=="closed"||c.events?.some(e=>e.state==="actual"&&["termination","offer_lapse"].includes(e.kind)))return null;
    let f;
    if(c.id==="HK-03330-20251210-simberi-subscription"){
      const i=ev("first_announcement","2025-12-10","2025121000331"),q=ev("completion","2026-04-02","2026040200045");
      const q2=fromDoc(t("actual_cash_receipt",389000000)?.evidence?.documentId,"2026.04.02-lingbao-strategic-transaction-completed-and-fid-approved");
      if(!i||!q||!q2||c.stage.date!=="2026-04-02"||c.stage.eventKind!=="completion"||t("consideration",370000000)?.evidence?.documentId!==i||
        t("working_capital_cash_adjustment",19000000)?.evidence?.documentId!==q2||!c.parties?.["買方"]?.startsWith("Lingbao Gold International Company Limited"))return null;
      f={title:"Simberi控股權認購",right:"交割持股及確認收款",badge:"2026年4月2日完成 · 取得50%加1股",
        a:"靈寶黃金國際",as:"認購人",b:"Tabar Islands Holdings",bs:"股權認購標的",label:"已認購 50% 加 1 股",direction:"rtl",kind:"shares",
        nodes:[{id:"a",role:"buyer",name:"Lingbao Gold International Company Limited"},{id:"b",role:"target",name:"Tabar Islands Holdings Pty Ltd"}],
        rows:[["50% 加 1 股","取得控股權；標的成為非全資附屬"],["實收 3.89 億澳元","3.70億基礎價＋1,900萬調整"]],
        flow2:{kind:"cash",fromLabel:"Lingbao Gold International Company Limited",toLabel:"St Barbara Limited",headline:"St Barbara確認收取3.89億澳元，含1,900萬澳元營運資金及現金調整"},
        note:"本圖是2026年4月已完成的控股權認購。2026年9月另簽的餘下股份收購獨立列示。",
        sources:[{documentId:i,pages:[1,2],label:"認購協議及基礎價"},{documentId:q,pages:[1],label:"交割日期及控股權"},{documentId:q2,pages:[1],label:"收款及交割調整"}],archetype:"acquisition",modality:"cash",kindLabel:"增資認購控股"};
    }else if(c.id==="HK-09668-20251010-debt-asset-portfolio-transfer"){
      const q=ev("completion_confirmed","2026-11-13","2026111301030");
      if(!q||c.stage.date!=="2026-11-13"||c.stage.eventKind!=="completion_confirmed"||
        ![["consideration",35400000000],["debt_face",50543000000],["debt_principal",34836000000]].every(([k,v])=>t(k,v)?.evidence?.documentId===q)||
        !c.parties?.["受让方"]?.startsWith("天津津融资产管理有限公司"))return null;
      f={title:"債權資產公開掛牌轉讓",right:"實際轉讓規模及收款",badge:"2026年11月13日確認 · 轉讓全數完成並收款",
        a:"渤海銀行",as:"債權轉讓方",b:"天津津融",bs:"最終受讓人",label:"已轉讓部分債權資產",direction:"ltr",kind:"asset",
        nodes:[{id:"a",role:"seller",name:c.parties["转让方"]},{id:"b",role:"buyer",name:c.parties["受让方"]}],
        rows:[["總債權 505.43 億元","本金348.36億，另含利息等"],["實收 354 億元","較實際轉讓債權總額折讓約30%"]],
        flow2:{kind:"cash",fromLabel:c.parties["受让方"],toLabel:c.parties["转让方"],headline:"人民幣354億元轉讓價款已全數支付"},
        note:"總債權包括本金、利息、罰息及代墊司法費；銀行確認不延長原有轉讓授權。",
        sources:[{documentId:q,pages:[1,2],label:"實際轉讓債權、成交價及收款"}],archetype:"disposal",modality:"cash",kindLabel:"債權資產處置"};
    }else{
      const q=ev("completion","2026-03-17","2026031701576"),i=ev("dispatch","2026-02-12","2026021201356");
      if(!q||!i||c.stage.date!=="2026-03-17"||c.stage.eventKind!=="completion"||t("bond_principal",59000000)?.evidence?.documentId!==q||
         t("issue_price",0.25)?.evidence?.documentId!==i||c.parties?.["卖方"]!=="卓文杰"||c.parties?.["买方"]!=="侨雄（福建）投资有限公司")return null;
      f={title:"江西九愛食品股權收購",right:"股權結果及對價債券",badge:"2026年3月17日完成 · 對價債券已發行",
        a:"卓文杰",as:"股權出售方",b:"僑雄（福建）投資",bs:"權識國際附屬買方",label:"已轉讓標的 72.5% 股權",direction:"ltr",kind:"shares",
        nodes:[{id:"a",role:"seller",name:c.parties["卖方"]},{id:"b",role:"buyer",name:c.parties["买方"]}],
        rows:[["已發行 5,900 萬港元可換股債","由權識國際向出售方發行 · 3年零息"],["初始換股價每股 0.25 港元","按初始價全數轉換可發行2.36億股"]],
        flow2:{kind:"asset",fromLabel:c.parties["可换股债券发行人"],toLabel:c.parties["卖方"],headline:"交割對價為已發行的5,900萬港元可換股債券"},
        note:"交割後江西九愛食品成為權識國際間接持股72.5%的附屬公司。圖列換股條款，實際發行的交割工具為債券。",
        sources:[{documentId:q,pages:[1,2],label:"交割及債券發行"},{documentId:i,pages:[16,17],label:"可換股債券條款"}],archetype:"acquisition",modality:"in_kind",kindLabel:"股權收購 · 可換股債對價"};
    }
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const dir=f.direction==="rtl";
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:398,status:"closed",leftTitle:f.title,rightTitle:f.right,transitionLabel:"交易已完成",outcomeBadge:f.badge}),[
      mk("a","left",43,100,149,146,f.nodes[0].role,f.a,f.as),mk("b","left",448,100,157,146,f.nodes[1].role,f.b,f.bs),
      mk("r1","right",724,77,310,83,"target",...f.rows[0]),mk("r2","right",724,204,310,85,"creditor",...f.rows[1])
    ],[],[{id:"transfer",panel:"left",kind:f.kind,step:"①",pathPoints:dir?[[448,172],[192,172]]:[[192,172],[448,172]],labelCenter:[320,172],labelWidth:208,labelHeight:34,label:f.label}]);
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:f.archetype,modality:f.modality,status:"closed",stageDate:c.stage.date,stageLabel:f.badge,
      caseArchetypeLabel:f.kindLabel,caseModalityLabel:f.modality==="cash"?"現金":"可換股債券",caseModalityShortLabel:f.modality==="cash"?"現金":"可換股債券",topology,compactSummary:f.badge,
      before:{title:f.title,nodes:f.nodes,equityLinks:[]},after:{title:f.right,nodes:f.nodes,equityLinks:[],outcomeBadge:f.badge},
      flows:[{id:"transfer",kind:f.kind,direction:f.direction,fromLabel:f.nodes[dir?1:0].name,toLabel:f.nodes[dir?0:1].name,headline:f.label},
        {id:"pay",direction:dir?"ltr":"rtl",...f.flow2}],annotations:[{tag:"①",title:"交割口徑",body:f.note}],evidenceLinks:f.sources});
  }
  function buildReviewedLeaseQuartet(c,docs){
    const f={
      "HK-08232-20261113-mandarin-plaza-lease": ["2026111300789","2026-11-13","2026-11-13","first_announcement","Realty Holdings Limited","THAC Investment (18) Limited","新文華中心商場","地下 01A–01C、01F–01H","4年 · 2026年11月15日起","2030年11月14日屆滿",9600000,10600000,800000,"960","1,060","80"],
      "HK-08232-20261020-hoi-lai-lease":["2026102000955","2026-10-20","2026-11-10","dispatch_extension","香港房屋委员会","Small Medium Large Limited","海麗商場","一樓 105 號鋪","6年 · 2026年12月31日起","2032年12月30日屆滿",9800000,11300000,300000,"980","1,130","30"],
      "HK-08232-20261020-cheung-tung-lease":["2026102000941","2026-10-20","2026-11-10","dispatch_extension","香港房屋委员会","Small Medium Large Limited","翔東@潮薈","07 號鋪及 B1 廣告燈箱","6年 · 2026年10月20日起","2032年10月19日屆滿",12700000,14700000,400000,"1,270","1,470","40"],
      "HK-00374-20261122-tko-innopark-lease":["2026112200011","2026-11-22","2026-11-22","first_announcement","香港科技园公司","Four Seas Mercantile Limited","將軍澳創新園物業","駿昌街8號地塊及整幢樓宇","10年 · 預計2027年2月15日起","另有5年續租選擇權，須出租方同意",377000000,3140800,9920343,"3.77億","314.08萬","992.03萬"]
    }[c.id];
    const i=c.events?.find(e=>e.kind==="first_announcement"&&e.date===f?.[1]&&e.state==="actual")?.evidence?.documentId;
    const d=docs?.[i],t=(k,v)=>c.terms?.some(x=>x.key===k&&x.value===v&&x.currency==="HKD"&&x.evidence?.documentId===i);
    const modern=c.code==="00374";
    if(!f||d?.caseId!==c.id||!d.url.endsWith("/"+f[0]+".pdf")||c.stage?.status!=="approved"||
      c.stage.date!==f[2]||c.stage.eventKind!==f[3]||c.parties?.["出租方"]!==f[4]||c.parties?.["承租方"]!==f[5]||
      c.events?.some(e=>e.state==="actual"&&["completion","termination"].includes(e.kind))||
      !t("rou_asset",f[10])||!t(modern?"monthly_base_rent":"rent_floor",f[11])||!t(modern?"security_deposit":"deposit",f[12])||
      (c.id.includes("cheung-tung")&&!c.mechanism.includes(" B1 ")))return null;
    const badge=modern?"已接受租賃要約 · 已獲書面批准":"租約已簽 · 已獲書面批准";
    const left=modern?"香港科技園公司":f[4]==="香港房屋委员会"?"香港房屋委員會":"Realty Holdings";
    const right=modern?"四洲貿易":f[5].startsWith("THAC")?"THAC Investment (18)":"Small Medium Large";
    const title=f[6]+"租賃",detail="租期及會計估值",mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:423,status:"approved",leftTitle:title,rightTitle:detail,transitionLabel:"租賃條款",outcomeBadge:badge}),[
      mk("s","left",43,100,149,146,"target",left,"出租方"),mk("b","left",448,100,157,146,"buyer",right,"承租方"),
      mk("term","right",724,76,310,63,"target",f[8],f[9]),
      mk("scope","right",724,162,310,63,"target",f[6],f[7]),
      mk("cost","right",724,248,310,69,"creditor",modern?"估計使用權資產 3.77 億港元":"估計使用權資產 "+f[13]+" 萬港元",
        modern?"首三年月租 314.08 萬港元":"全租期基本租金不少於 "+f[14]+" 萬港元")
    ],[],[{id:"lease",panel:"left",kind:"asset",step:"①",pathPoints:[[192,172],[448,172]],labelCenter:[320,172],labelWidth:205,labelHeight:34,label:modern?"租賃要約已接受":"已簽物業租約",dashed:modern}]);
    const nodes=[{id:"s",role:"target",name:f[4]},{id:"b",role:"buyer",name:f[5]}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"disclosable_major",modality:"cash",status:"approved",stageDate:c.stage.date,stageLabel:badge,
      caseArchetypeLabel:"物業租賃 · 使用權資產",caseModalityLabel:"租賃付款",caseModalityShortLabel:"租金",
      before:{title,nodes,equityLinks:[]},after:{title:detail,nodes,equityLinks:[],outcomeBadge:badge},topology,compactSummary:badge,
      flows:[{id:"lease",kind:"asset",direction:"ltr",fromLabel:f[4],toLabel:f[5],headline:f[6]+" · "+f[7],proposedOrTerminated:modern},
        {id:"rent",kind:"cash",direction:"rtl",fromLabel:f[5],toLabel:f[4],headline:modern?"首三年月租314.08萬港元；第4、7、10年首日檢討租金。":"全租期基本租金不少於"+f[14]+"萬港元；約"+f[15]+"萬港元合約按金另列。",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"書面批准及租賃範圍",body:modern?"已接納獲批租賃要約；正式租約按披露安排簽訂。租賃用作中央食品加工及配送。":"控股股東書面批准代替召開股東大會；承租用途為經營亞洲風味餐廳。"}],
      evidenceLinks:[{documentId:i,pages:modern?[1,2,3,4]:[1,2,3],label:"租期、租賃付款及書面批准"}]});
  }
  function buildReviewedCarriannaFacilities(c,docs){
    const a=c.events?.find(e=>e.kind==="first_announcement"&&e.date==="2026-09-29"&&e.state==="actual")?.evidence?.documentId;
    const b=c.processEvents?.find(e=>e.kind==="dispatch_extension"&&e.date==="2026-11-26"&&e.state==="actual")?.evidence?.documentId;
    const cr=c.events?.find(x=>x.kind==="circular"&&x.date==="2026-11-26"&&x.state==="actual")?.evidence?.documentId;
    const match=(id,s)=>docs?.[id]?.caseId===c.id&&docs[id].url.endsWith("/"+s+".pdf");
    const t=(k,v)=>c.terms?.some(x=>x.key===k&&x.value===v&&x.currency==="HKD"&&x.evidence?.documentId===a);
    if(!match(a,"2026092902207")||!match(b,"2026112601436")||c.stage?.status!=="approved"||
       c.stage.date!=="2026-11-26"||(cr?!match(cr,"2026112601585_c")||c.stage.eventKind!=="circular":c.stage.eventKind!=="dispatch_extension")||
       c.events?.some(e=>e.state==="actual"&&["dispatch","completion","termination"].includes(e.kind))||
       !t("facility_principal",258260000)||!t("guaranteed_principal_limit",129130000)||!t("capital_shortfall_undertaking",34710000))return null;
    const title="合營項目定期貸款",right="佳寧娜擔保與資金承諾",badge=cr?"已獲股東書面批准 · 11月26日刊發通函":"已獲股東書面批准 · 通函寄發期限獲延至11月26日";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:415,status:"approved",leftTitle:title,rightTitle:right,transitionLabel:"貸款與擔保分列",outcomeBadge:badge}),[
      mk("l","left",43,100,149,146,"creditor","O-bank","貸款人"),
      mk("b","left",448,100,157,146,"buyer","興達發展（香港）","借款人 · 合營公司附屬"),
      mk("g","right",724,78,310,83,"target","本金擔保部分最高 1.2913 億港元","另涵蓋融資文件約定的利息、費用等"),
      mk("f","right",724,206,310,85,"creditor","未獲融資開發成本承諾 3,471 萬港元","為佳寧娜就該項成本承擔的上限")
    ],[],[{id:"credit",panel:"left",kind:"cash",step:"①",pathPoints:[[192,172],[448,172]],labelCenter:[320,172],labelWidth:218,labelHeight:34,label:"貸款承諾本金 2.5826 億港元",dashed:true}]);
    const nodes=[{id:"l",role:"creditor",name:"O-bank Co., Ltd."},{id:"b",role:"buyer",name:"Max Win Development (HK) Limited"},{id:"g",role:"listed",name:"佳寧娜集團控股有限公司"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"disclosable_major",modality:"mixed",status:"approved",stageDate:c.stage.date,stageLabel:badge,
      caseArchetypeLabel:"主要交易 · 財務資助",caseModalityLabel:"銀行貸款、擔保及資金承諾",caseModalityShortLabel:"貸款擔保",topology,compactSummary:badge,
      before:{title,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"facility",kind:"cash",direction:"ltr",fromLabel:nodes[0].name,toLabel:nodes[1].name,headline:"定期貸款承諾本金合計2.5826億港元，分A及B兩項額度",proposedOrTerminated:true},
        {id:"guarantee",kind:"asset",direction:"rtl",fromLabel:"佳寧娜及宏達投資控股",toLabel:nodes[0].name,headline:"按合同提供共同及各別擔保；佳寧娜的本金部分最高1.2913億港元，費用及利息另計"},
        {id:"cost",kind:"asset",direction:"rtl",fromLabel:"佳寧娜及宏達投資控股",toLabel:nodes[0].name,headline:"另承諾補足未獲融資的開發成本及超支並促成完工；佳寧娜就成本承諾的金額上限3,471萬港元"}],
      annotations:[{tag:"①",title:"股東書面批准",body:"合計持有約52.50%的緊密聯繫股東就財務資助給予書面批准。"}],
      evidenceLinks:[{documentId:a,pages:[2,3,5,6,10,11,13],label:"貸款、擔保、開發承諾及股東書面批准"},{documentId:b,pages:[1],label:"通函寄發期限豁免"},...(cr?[{documentId:cr,pages:[1,5,7,9,10,18],label:"11月26日刊發通函"}]:[])]});
  }
  function buildReviewedAssetPair(c,docs){
    const ev=(k,d,leaf)=>{
      const id=c.events?.find(e=>e.kind===k&&e.date===d&&e.state==="actual")?.evidence?.documentId;
      return docs?.[id]?.caseId===c.id&&docs[id].url.endsWith("/"+leaf+".pdf")?id:null;
    };
    const term=(id,k,v)=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===id);
    if(c.stage?.status!=="closed"||c.stage.eventKind!=="completion"||c.events.some(e=>e.kind==="termination"&&e.state==="actual"))return null;
    const h=c.id==="HK-01952-20260408-hasten-singapore";
    const s=c.parties["卖方"],b=c.parties["买方"];
    let f;
    if(h){
      const a=ev("dispatch","2026-06-02","2026060202670"),z=ev("completion","2026-06-30","2026082700354");
      if(!a||!z||c.stage.date!=="2026-06-30"||s!=="Hasten Biopharmaceuticals (Asia) Limited"||b!=="EverSea Medicines (Singapore) Pte. Ltd."||
         !term(a,"cash_including_loan",250000000)||!term(z,"initial_paid",150000000)||!term(a,"shareholder_loan",148804000)||
         !term(a,"second_conditional",50000000)||!term(a,"third_conditional",50000000))return null;
      f={title:"Hasten Singapore 股權及債權",right:"交割及分期現金對價",label:"已轉讓100%股權及股東貸款",left:"Hasten Asia",buyer:"EverSea Medicines",kind:"shares",
        badge:"6月30日交割 · 首期1.50億美元已付",p1:["總對價 2.50 億美元","包括受讓的股東貸款"],p2:["餘下兩期各 5,000 萬美元","按協議於2028／2029年第一季付"],
        flows:[{id:"principal",kind:"cash",direction:"rtl",fromLabel:b,toLabel:s,headline:"首期1.50億美元於交割日已付"},
          {id:"next",kind:"cash",direction:"rtl",fromLabel:b,toLabel:s,headline:"餘下兩期各5,000萬美元，按協議付款條件達成或獲豁免後支付",proposedOrTerminated:true}],
        note:"受讓股東貸款本金1.48804億美元，已包括在總對價；標的持有亞太區品牌慢病產品商業權益。",
        source:[{documentId:a,pages:[13,14,15],label:"股權、股東貸款和分期條款"},{documentId:z,pages:[75],label:"交割日和首期付款"}]};
    }else{
      const a=ev("dispatch","2025-12-01","2025120104233"),z=ev("completion","2026-01-30","2026013001142");
      if(!a||!z||c.stage.date!=="2026-01-30"||s!=="Bonkie Limited（邦鸿有限公司）"||b!=="Jingaofeng Garment International Ltd."||
        !term(a,"purchase_price",47532000)||!term(a,"balance",42778800)||!term(a,"initial_deposit",2067000)||!term(a,"further_deposit",2686200))return null;
      f={title:"信德中心西翼物業收購",right:"交割付款及物業範圍",label:"收購兩個辦公室單位",left:"邦鴻有限公司",buyer:"Jingaofeng Garment",kind:"asset",
        badge:"1月30日完成 · 已付交割尾款",p1:["總現金對價 4,753.2 萬港元","交割支付尾款 4,277.88 萬港元"],p2:["信德中心西翼 22 樓","2204及2205號辦公室"],
        flows:[{id:"pay",kind:"cash",direction:"rtl",fromLabel:b,toLabel:s,headline:"總對價4,753.2萬港元；交割日已付尾款4,277.88萬港元"}],
        note:"通函列示兩筆訂金與尾款；物業作集團自用。",
        source:[{documentId:a,pages:[5,6],label:"交易對價、辦公室及付款安排"},{documentId:z,pages:[1],label:"交割與實際尾款"}]};
    }
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:398,status:"closed",leftTitle:f.title,rightTitle:f.right,transitionLabel:"交割已確認",outcomeBadge:f.badge}),[
      mk("s","left",43,100,149,146,"seller",f.left,"出售方"),mk("b","left",448,100,157,146,"buyer",f.buyer,"收購方"),
      mk("r1","right",724,77,310,83,"target",...f.p1),mk("r2","right",724,204,310,85,"creditor",...f.p2)
    ],[],[{id:"transfer",panel:"left",kind:f.kind,step:"①",pathPoints:[[192,172],[448,172]],labelCenter:[320,172],labelWidth:205,labelHeight:34,label:f.label}]);
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:b}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:"closed",stageDate:c.stage.date,stageLabel:f.badge,
      caseArchetypeLabel:h?"全資收購及受讓股東貸款":"辦公物業收購",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:f.badge,
      before:{title:f.title,nodes,equityLinks:[]},after:{title:f.right,nodes,equityLinks:[],outcomeBadge:f.badge},
      flows:[{id:"transfer",kind:f.kind,direction:"ltr",fromLabel:s,toLabel:b,headline:f.label},...f.flows],
      annotations:[{tag:"①",title:"對價口徑",body:f.note}],evidenceLinks:f.source});
  }
  function buildEeasyControl(c,docs){
    const ev=(events,k,date,leaf)=>{
      const id=events?.find(e=>e.kind===k&&e.date===date&&e.state==="actual")?.evidence?.documentId;
      return docs?.[id]?.caseId===c.id&&docs[id].url.endsWith("/"+leaf+".pdf")?id:null;
    };
    const a=ev(c.events,"dispatch","2026-06-02","2026060202942"),z=ev(c.events,"completion","2026-06-26","2026083100441"),p=ev(c.processEvents,"supplement","2026-07-14","2026071400468");
    if(!a||!z||!p||!ev(c.processEvents,"supplement","2026-06-24","2026083100441")||c.stage?.status!=="closed"||c.stage.date!=="2026-06-26"||c.events.some(e=>e.kind==="termination"&&e.state==="actual"))return null;
    const values={aggregate_cash:478151926,secondary:457800000,unpaid_capital:133088,primary:20218838};
    if(!Object.entries(values).every(([k,v])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.currency==="CNY")))return null;
    const s=c.parties["旧股卖方"],b=c.parties["收购载体"],t=c.parties["标的"];
    if(s!=="21 名原有股东"||b!=="黑芝麻智能科技（珠海）有限公司"||t!=="珠海亿智电子科技有限公司")return null;
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const badge="6月26日增資完成 · 間接持股60%";
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:415,status:"closed",leftTitle:"舊股轉讓",rightTitle:"增資後股權與資金",transitionLabel:"兩步完成",outcomeBadge:badge}),[
      mk("s","left",43,98,149,146,"seller","21名原股東","舊股賣方"),mk("b","left",448,98,157,146,"buyer","黑芝麻珠海","最終舊股受讓方"),
      mk("r1","right",724,76,310,83,"target","19.5623% 舊股 + 40.4377% 增資","均按增資後股本計算"),
      mk("r2","right",724,198,310,94,"creditor","流入億智電子：人民幣2,035.2萬元","增資2,021.9萬元；補繳13.3萬元")
    ],[],[{id:"transfer",panel:"left",kind:"shares",step:"①",pathPoints:[[192,170],[448,170]],labelCenter:[320,170],labelWidth:210,labelHeight:34,label:"6月24日：轉讓增資前32.8435%"}]);
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:b},{id:"t",role:"target",name:t}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:"closed",stageDate:c.stage.date,stageLabel:badge,
      caseArchetypeLabel:"舊股轉讓及增資收購",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,
      before:{title:"舊股轉讓",nodes,equityLinks:[]},after:{title:"增資後股權與資金",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"transfer",kind:"shares",direction:"ltr",fromLabel:s,toLabel:b,headline:"6月24日完成舊股轉讓，增資前32.8435%"},{id:"sellerpay",kind:"cash",direction:"rtl",fromLabel:"黑芝麻智能集團",toLabel:s,headline:"付舊股賣方人民幣4.578億元"},{id:"capital",kind:"cash",direction:"ltr",fromLabel:"黑芝麻智能集團",toLabel:t,headline:"增資人民幣20,218,838元；另補繳未繳註冊資本133,088元"}],
      annotations:[{tag:"①",title:"對價與持股",body:"兩步合計現金人民幣4.7815億元；7月14日公告確認已付清。武漢公司簽署舊股協議，珠海公司最終受讓及增資。中期財務資料列收購日為6月30日。"}],
      evidenceLinks:[{documentId:a,pages:[11,12,17],label:"兩步對價、簽約與最終受讓方"},{documentId:z,pages:[18,27],label:"兩步手續完成日及中期財務資料收購日"},{documentId:p,pages:[1],label:"公告確認對價已付清"}]});
  }
  function buildOCTLand(c,docs){
    const h=c.id==="HK-03366-20260326-hefei-land-resumption", dt=h?"2026-06-24":"2026-08-18", stage=c.stage;
    const get=(ev,kind,date,file)=>{const id=ev?.find(x=>x.kind===kind&&x.date===date&&x.state==="actual")?.evidence?.documentId;return docs?.[id]?.caseId===c.id&&docs[id].url.endsWith("/"+file+".pdf")?id:null;};
    const vote=get(c.events,"vote","2026-05-13","2026051300969"),p=get(c.processEvents,"supplement",dt,h?"2026062400911":"2026081801889");
    const sig=h?p:get(c.processEvents,"supplement","2026-08-07","2026081001150");
    if(!vote||!p||!sig||stage?.status!=="approved"||stage.date!==dt||c.events.some(e=>e.state==="actual"&&["termination","completion"].includes(e.kind)))return null;
    const term=(k,v,id)=>c.terms?.some(t=>t.key===k&&t.value===v&&t.currency==="CNY"&&t.evidence?.documentId===id);
    if(h?!(term("consideration",1725000000,p)&&term("first_installment",1330000000,p)&&term("remaining_consideration",395000000,p)):!(term("consideration",596000000,sig)&&term("cash_received",596000000,p)))return null;
    const s=c.parties["转让方"],b=c.parties["收回方"],t=c.parties["标的"];
    if(!s||!b||!t||!(h?b==="合肥市土地储备中心":b==="巢湖市土地储备中心"))return null;
    const who=h?"合肥華僑城實業":"合肥華僑城環巢",org=h?"合肥市土地儲備中心":"巢湖市土地儲備中心";
    const badge=h?"已收首期 · 餘款按交付條件支付":"已收全額 · 交付日期待披露", amount=h?"人民幣17.25億元":"人民幣5.96億元";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:434,status:"approved",leftTitle:"土地使用權收回協議",rightTitle:"現金補償與交付",transitionLabel:"股東已批准",outcomeBadge:badge}),[
      mk("s","left",43,100,149,146,"seller",who,"轉讓方"),mk("b","left",448,100,157,146,"buyer",org,"收回方"),
      mk("r1","right",724,75,310,85,"target","補償合計："+amount,h?"6月24日收到首期13.30億元":"8月18日公告確認5.96億元全數收到"),
      mk("r2","right",724,198,310,100,"creditor",h?"餘款人民幣3.95億元":"地塊交付按協議辦理",h?"完成挂牌成交及交付程序後90天內支付":"交付日期待披露")
    ],[],[{id:"transfer",panel:"left",kind:"asset",step:"①",pathPoints:[[192,172],[448,172]],labelCenter:[320,172],labelWidth:215,labelHeight:36,label:h?"合肥6、7、9號地塊使用權":"巢湖半湯地塊使用權",proposedOrTerminated:true}]);
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:b},{id:"t",role:"target",name:t}];
    const flows=[{id:"transfer",kind:"asset",direction:"ltr",fromLabel:s,toLabel:b,headline:"按照協議辦理土地使用權收回",proposedOrTerminated:true},{id:"paid",kind:"cash",direction:"rtl",fromLabel:b,toLabel:s,headline:h?"已收到首期人民幣13.30億元":"已收到全部現金補償人民幣5.96億元"}];
    if(h)flows.push({id:"balance",kind:"cash",direction:"rtl",fromLabel:b,toLabel:s,headline:"人民幣3.95億元，按協議在挂牌成交及交付程序完成後90日內支付",proposedOrTerminated:true});
    const sources=[{documentId:vote,pages:[1],label:"股東批准"},{documentId:p,pages:[h?1:26],label:h?"首期實收和餘款條件":"全數收到補償"}];
    if(!h)sources.push({documentId:sig,pages:[1],label:"正式簽約、收回方和交付安排"});
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"disposal",modality:"cash",status:"approved",stageDate:dt,stageLabel:badge,
      caseArchetypeLabel:"土地使用權收回",caseModalityLabel:"現金補償",caseModalityShortLabel:"現金",topology,compactSummary:badge,
      before:{title:"土地使用權收回協議",nodes,equityLinks:[]},after:{title:"現金補償與交付",nodes,equityLinks:[],outcomeBadge:badge},flows,
      annotations:[{tag:"①",title:"交付安排",body:h?"三宗地塊；餘款按合同約定的地塊挂牌及收回交付程序支付。":"巢湖經開區管理委員會為協議見證方；收回標的為一宗地塊。"}],evidenceLinks:sources});
  }
  function buildKingfarTrigiant(c,docs){
    const k=c.code==="01354",dt=k?"2026-01-30":"2026-09-24";
    const get=(events,kind,date,leaf)=>{const id=events?.find(e=>e.kind===kind&&e.date===date&&e.state==="actual")?.evidence?.documentId;return docs?.[id]?.caseId===c.id&&docs[id].url.endsWith("/"+leaf+".pdf")?id:null;};
    const z=get(c.events,"completion",dt,k?"2026042403640":"2026092500714");
    const a=k?get(c.events,"dispatch","2026-01-14","2026011401304"):get(c.processEvents,"supplement","2026-09-20","2026092000079");
    if(!a||!z||c.stage?.status!=="closed"||c.stage.eventKind!=="completion"||c.stage.date!==dt||c.events.some(e=>e.kind==="termination"&&e.state==="actual"))return null;
    const m=k?{aggregate_cash:[63007500,a],purchase:[55247500,a],lease:[2960000,a],usage:[4800000,a]}:{equity_cash:[455000000,z],performance_bond:[15000000,z],exchange_fee:[1590000,z],repayment_support:[259400000,a]};
    if(!Object.entries(m).every(([x,[v,id]])=>c.terms?.some(t=>t.key===x&&t.value===v&&t.evidence?.documentId===id&&t.currency==="CNY")))return null;
    const s=c.parties[k?"卖方／出租人":"卖方"],b=c.parties[k?"买方／承租人":"买方"];
    if(!s||!b||!(k?s.startsWith("西安经发地产"):s==="青海青银项目管理有限公司"))return null;
    const bn=k?"經發物業":"江蘇俊知技術",sn=k?"經發地產":"青海青銀項目管理",headline=k?"1月30日完成 · 年報確認":"9月24日完成過戶 · 股權價款已付";
    const badge=k?"1月30日完成 · 年報確認":headline;
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:468,status:"closed",leftTitle:k?"經發大廈資產與使用權":"競標取得國有股權",rightTitle:k?"三份協議 · 人民幣6,300.75萬元":"股權對價與其他付款",transitionLabel:"交割已確認",outcomeBadge:badge}),[
      mk("s","left",43,103,149,144,"seller",sn,k?"出售、出租及出讓方":"出售方"),mk("b","left",448,103,157,144,"buyer",bn,k?"買方及承租人":"買方"),
      mk("r1","right",724,72,310,65,"target",k?"購買：人民幣5,524.75萬元":"股權價款：人民幣4.55億元",k?"14個商業單位及224個普通車位":"含4,350萬元競買按金及4.115億元尾款"),
      mk("r2","right",724,155,310,65,"creditor",k?"租賃：人民幣296萬元":"履約保證金：人民幣1,500萬元",k?"37個人防車位，首段租期20年":"保障三期投產承諾，已支付"),
      mk("r3","right",724,238,310,65,"creditor",k?"使用權：人民幣480萬元":"交易所服務費：約人民幣159萬元",k?"60個機械車位使用權":"另行列示，已支付")
    ],[],[{id:"transfer",panel:"left",kind:k?"asset":"shares",step:"①",pathPoints:[[192,175],[448,175]],labelCenter:[320,175],labelWidth:217,labelHeight:34,label:k?"物業、租賃及車位使用權":"青海中利光纖100%股權"}]);
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:b}];
    const flows=[{id:"transfer",kind:k?"asset":"shares",direction:"ltr",fromLabel:s,toLabel:b,headline:k?"物業、租賃及機械車位使用權":"青海中利光纖100%股權完成過戶"},{id:"price",kind:"cash",direction:"rtl",fromLabel:b,toLabel:s,headline:k?"三份協議對價合計人民幣6,300.75萬元":"股權價款人民幣4.55億元，9月25日公告確認付清"}];
    if(!k)flows.push({id:"support",kind:"cash",direction:"ltr",fromLabel:b,toLabel:"青海中利光纖",headline:"另承諾支持標的於12月31日或之前償債，6月30日欠款約人民幣2.594億元",proposedOrTerminated:true});
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:"closed",stageDate:dt,stageLabel:badge,
      caseArchetypeLabel:k?"物業收購及車位使用安排":"產權競標全資收購",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,
      before:{title:"交易架構",nodes,equityLinks:[]},after:{title:"對價及交割",nodes,equityLinks:[],outcomeBadge:badge},flows,
      annotations:[{tag:"①",title:k?"三種權利":"另行付款與承諾",body:k?"購買物業、租賃人防車位及受讓機械車位使用權分列；完成日期見年報。":"履約保證金與交易所服務費已支付。標的償債支持按合同履行，未列入股權價款。"}],
      evidenceLinks:[{documentId:a,pages:k?[9,10,11,12,14]:[2,3,4],label:k?"三份協議及對價":"競標合同、償債支持及保證金"},{documentId:z,pages:k?[185]:[1,2,3],label:k?"年報確認完成日":"過戶、價款與其他付款"}]});
  }
  function buildModernAI(c,docs){
    const ev=(rows,k,dt,leaf)=>{const id=rows?.find(e=>e.kind===k&&e.date===dt&&e.state==="actual")?.evidence?.documentId;return docs?.[id]?.caseId===c.id&&docs[id].url.endsWith("/"+leaf+".pdf")?id:null;};
    const a=ev(c.events,"dispatch","2026-06-26","2026062603031"),z=ev(c.processEvents,"supplement","2026-09-28","2026092800953");
    if(!a||!z||c.stage?.status!=="closed"||c.stage.eventKind!=="completion_confirmed"||c.events.some(e=>e.kind==="termination"&&e.state==="actual"))return null;
    const terms={purchase_price:41820000,deposit:10000000,balance:31820000};
    if(!Object.entries(terms).every(([k,v])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.currency==="HKD"&&t.evidence?.documentId===a)))return null;
    const b=c.parties["买方"],s=c.parties["卖方"],t=c.parties["标的"];
    if(b!=="Modern Chinese Medicine Group Co., Ltd."||!s?.startsWith("Huang Yu Holdings")||!t?.startsWith("AI Health Global Holdings"))return null;
    const badge="6月完成 · 30%聯營股權";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:426,status:"closed",leftTitle:"收購數智健康全球",rightTitle:"現金價款與持股",transitionLabel:"交割已確認",outcomeBadge:badge}),[
      mk("s","left",43,100,149,146,"seller","皇御控股","出售方"),mk("b","left",448,100,157,146,"buyer","現代中藥集團","買方"),
      mk("r1","right",724,75,310,87,"target","現金對價4,182萬港元","合同約定：簽約訂金1,000萬元"),
      mk("r2","right",724,201,310,95,"creditor","合同尾款3,182萬港元","交割後3個營業日內支付")
    ],[],[{id:"transfer",panel:"left",kind:"shares",step:"①",pathPoints:[[192,172],[448,172]],labelCenter:[320,172],labelWidth:215,labelHeight:36,label:"300萬股，占標的30%"}]);
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:b},{id:"t",role:"target",name:t}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:"closed",stageDate:c.stage.date,stageLabel:badge,caseArchetypeLabel:"收購聯營股權",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,
      before:{title:"股權轉讓",nodes,equityLinks:[]},after:{title:"交易對價",nodes,equityLinks:[{from:"b",to:"t",label:"30%",pct:30,style:"solid"}],outcomeBadge:badge},
      flows:[{id:"transfer",kind:"shares",direction:"ltr",fromLabel:s,toLabel:b,headline:"6月完成收購：300萬股，占30%"},{id:"price",kind:"cash",direction:"rtl",fromLabel:b,toLabel:s,headline:"合同現金價款4,182萬港元；尾款於交割後3個營業日內支付"}],
      annotations:[{tag:"①",title:"交割與入賬",body:"中期報告按月披露6月完成，標的列作聯營公司，採用權益法。"}],
      evidenceLinks:[{documentId:a,pages:[6,7],label:"買賣雙方、股權及付款期限"},{documentId:z,pages:[25,26],label:"6月完成及權益法"}]});
  }
  function buildQiRestaurants(c,docs){
    const x=c.id.endsWith("-168-catering"), dt="2026-11-16";
    const a=c.events?.find(e=>e.kind==="first_announcement"&&e.state==="actual"&&e.date===dt)?.evidence?.documentId;
    if(!a||docs?.[a]?.caseId!==c.id||!docs[a].url.endsWith(x?"/2026111600991.pdf":"/2026111600967_c.pdf")||
      c.stage?.status!=="active"||c.stage.date!==dt||c.events.some(e=>e.state==="actual"&&["completion","termination"].includes(e.kind)))return null;
    const has=(k,v)=>c.terms?.some(t=>t.key===k&&t.value===v&&t.currency==="HKD"&&t.evidence?.documentId===a);
    if(!has("consideration",10000)||!has("lease_rou",x?3260000:1800000))return null;
    const s=c.parties["卖方"],b=c.parties["买方"],t=c.parties["标的"];
    if(!(x?b==="Party Alc Limited"&&s==="Leung Tsz Sang Jason"&&t==="168 Catering Group Limited":b==="酒派汇有限公司"&&s==="张琦"&&t==="九楼小炒大排档有限公司"))return null;
    const badge="已簽買賣協議 · 待交割", title=x?"一路發餐飲":"九樓小炒大排檔", rou=x?"約326萬港元":"約180萬港元";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:418,status:"active",leftTitle:title+" · 擬收購",rightTitle:"現金對價與標的主要資產",transitionLabel:"有待條件達成",outcomeBadge:badge}),[
      mk("s","left",43,100,149,146,"seller",x?"Leung Tsz Sang Jason":"張琦","出售方"),mk("b","left",448,100,157,146,"buyer","酒派匯有限公司","間接全資附屬公司"),
      mk("r1","right",724,75,310,86,"target","現金對價：1萬港元","合同約定於簽署時支付"),
      mk("r2","right",724,196,310,102,"creditor","租賃使用權資產："+rou,"標的主要資產，位於香港灣仔")
    ],[],[{id:"transfer",panel:"left",kind:"shares",step:"①",pathPoints:[[192,172],[448,172]],labelCenter:[320,172],labelWidth:208,labelHeight:34,label:"擬轉讓100%股權",proposedOrTerminated:true}]);
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:b},{id:"t",role:"target",name:t}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:"active",stageDate:dt,stageLabel:badge,caseArchetypeLabel:"餐飲公司全資收購",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,
      before:{title:"股權轉讓",nodes,equityLinks:[]},after:{title:"完成後",nodes,equityLinks:[{from:"b",to:"t",label:"100%",pct:100,style:"dashed"}],outcomeBadge:badge},
      flows:[{id:"transfer",kind:"shares",direction:"ltr",fromLabel:s,toLabel:b,headline:"擬轉讓100%股權",proposedOrTerminated:true},{id:"price",kind:"cash",direction:"rtl",fromLabel:b,toLabel:s,headline:"合同現金價款1萬港元，簽署時應付",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"交割條件",body:"董事會公告列多項先決條件；簽署後90日內未達成或未獲豁免，可按協議終止。"}],evidenceLinks:[{documentId:a,pages:[1,2,3],label:"交易主體、股權、對價及使用權資產"}]});
  }
  function buildHatcherClosures(c,docs){
    const e=c.id.endsWith("eversharp"),dt=e?"2026-10-02":"2026-10-30";
    const get=(events,k,date,file)=>{const id=events?.find(x=>x.kind===k&&x.date===date&&x.state==="actual")?.evidence?.documentId;return docs?.[id]?.caseId===c.id&&docs[id].url.endsWith("/"+file+".pdf")?id:null;};
    const z=get(c.events,"completion",dt,e?"2026100203267":"2026103000618"),a=get(c.events,"first_announcement",e?"2026-07-17":"2026-09-25",e?"2026071700013":"2026092500313");
    if(!z||!a||c.stage?.status!=="closed"||c.stage.date!==dt||c.events.some(x=>x.state==="actual"&&x.kind==="termination"))return null;
    const has=(id,key,v)=>c.terms?.some(t=>t.evidence?.documentId===id&&t.key===key&&t.value===v);
    if(e?!(has(a,"consideration",10000000)&&has(z,"shares",10000000)&&has(z,"dilution",4.79)&&has(z,"acquired",51)):!(has(a,"consideration_hkd",30000000)&&has(a,"target_equity_pct",100)&&has(a,"note_interest_pct",5)))return null;
    const b=c.parties["买方"],s=c.parties["卖方"],t=c.parties["标的"];
    if(b!=="亦辰集团有限公司"||!(e?s==="Dr. Tang Wan Hoi"&&t==="Eversharp Group Limited":s==="Ark Invest Holdings Limited"&&t==="Noah Ark International Group Limited"))return null;
    const badge=e?"10月2日完成 · 已發行對價股":"10月30日完成 · 已發行對價本票",instrument=e?"對價股":"無抵押本票",kind=e?"shares":"asset",pct=e?51:100;
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:434,status:"closed",leftTitle:e?"Eversharp股權":"Noah Ark股權",rightTitle:"交割對價",transitionLabel:"已完成交割",outcomeBadge:badge}),[
      mk("s","left",43,100,149,146,"seller",e?"Dr. Tang Wan Hoi":"Ark Invest Holdings","出售方"),mk("b","left",448,100,157,146,"buyer","亦辰集團","收購方兼發行人"),
      mk("r1","right",724,74,310,89,"target",e?"1,000萬股 × 每股1港元":"本票本金3,000萬港元",e?"合計股權對價1,000萬港元":"交割時向賣方發行"),
      mk("r2","right",724,205,310,90,"creditor",e?"新股占擴大後股本約4.79%":"兩年期 · 年息5%",e?"賣方合計持有亦辰約6%":"本金及應計未付利息到期支付")
    ],[],[{id:"transfer",panel:"left",kind:"shares",step:"①",pathPoints:[[192,173],[448,173]],labelCenter:[320,173],labelWidth:203,labelHeight:36,label:"交割取得標的"+pct+"%股權"}]);
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:b},{id:"t",role:"target",name:t}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:e?"shares":"in_kind",status:"closed",stageDate:dt,stageLabel:badge,
      caseArchetypeLabel:e?"發股收購控股權":"本票支付全資收購",caseModalityLabel:instrument,caseModalityShortLabel:instrument,topology,compactSummary:badge,
      before:{title:"股權轉讓",nodes,equityLinks:[]},after:{title:"交割後持股",nodes,equityLinks:[{from:"b",to:"t",label:pct+"%",pct,style:"solid"}],outcomeBadge:badge},
      flows:[{id:"transfer",kind:"shares",direction:"ltr",fromLabel:s,toLabel:b,headline:"已取得標的"+pct+"%股權"},{id:"payment",kind,direction:"rtl",fromLabel:b,toLabel:s,headline:e?"已配發1,000萬股對價股，每股1港元":"已發行本金3,000萬港元的本票"}],
      annotations:[{tag:"①",title:"交割後",body:e?"標的成為亦辰直接非全資附屬公司，業績併表。":"標的成為亦辰直接全資附屬公司；本票可按協議提早贖回。"}],
      evidenceLinks:[{documentId:a,pages:e?[1,2]:[2,3,4],label:"交易條款與對價形式"},{documentId:z,pages:e?[1,2]:[1],label:"交割及實際發行"}]});
  }
  function buildLinanJtc(c,docs){
    const l=c.code==="08481",dt=l?"2026-09-30":"2026-11-12";
    const get=(k,date,file)=>{const id=c.events?.find(x=>x.kind===k&&x.date===date&&x.state==="actual")?.evidence?.documentId;return docs?.[id]?.caseId===c.id&&docs[id].url.endsWith("/"+file+".pdf")?id:null;};
    const a=get("dispatch",l?dt:"2026-10-23",l?"2026093002091":"2026102300484"),z=l?a:get("vote",dt,"2026111200843");
    if(!a||!z||c.stage?.status!=="approved"||c.stage.date!==dt||c.events.some(x=>x.state==="actual"&&["termination","completion"].includes(x.kind)))return null;
    const m=l?{purchase_price:55920000,initial_payment:27960000,balance:27960000}:{lease_premium:52788000,deposit:2639400,first_instalment:10557600,balance:39591000};
    if(!Object.entries(m).every(([k,v])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.currency===(l?"CNY":"SGD")&&t.evidence?.documentId===a)))return null;
    const s=c.parties[l?"出让方":"出租方"],b=c.parties[l?"买方":"拟登记承租方"];
    if(!(l?s==="杭州市规划和自然资源局临安分局"&&b==="杭州盛龙旅游发展有限公司":s==="Jurong Town Corporation（JTC）"&&b==="CTR Horizon Pte. Ltd."&&c.parties["中标方"]==="Chian Teck Realty Pte Ltd"))return null;
    const badge=l?"已付首期 · 餘款及登記按合同":"股東已批准 · 交地與登記待確認";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:471,status:"approved",leftTitle:l?"臨安濱湖土地出讓":"Kaki Bukit工業用地租賃",rightTitle:l?"成交價及付款":"地價及付款 · 未含消費稅",transitionLabel:l?"已簽出讓合同":"已中標並獲批准",outcomeBadge:badge}),[
      mk("s","left",43,104,149,145,"seller",l?"臨安規劃資源分局":"裕廊集團 JTC",l?"土地出讓方":"出租方"),mk("b","left",448,104,157,145,"buyer",l?"杭州盛龍旅遊":"CTR Horizon",l?"受讓方":"擬登記承租方"),
      mk("r1","right",724,72,310,67,"target",l?"合同價人民幣5,592萬元":"地價5,278.8萬新加坡元",l?"含稅；商業及娛樂用地":"中標方：Chian Teck Realty"),
      mk("r2","right",724,158,310,74,"creditor",l?"首期人民幣2,796萬元已付":"投標按金263.94萬新加坡元已付",l?"截至通函最後實際可行日期":"計入地價"),
      mk("r3","right",724,258,310,92,"creditor",l?"餘款人民幣2,796萬元":"按合同：首期1,055.76萬、餘款3,959.1萬",l?"合同約定於2027年5月6日或之前支付":"分別於接納函日期起28日及90日內應付")
    ],[],[{id:"transfer",panel:"left",kind:"asset",step:"①",pathPoints:[[192,175],[448,175]],labelCenter:[320,175],labelWidth:213,labelHeight:36,label:l?"40年國有土地使用權":"33年工業用地租賃",proposedOrTerminated:true}]);
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:b}];
    const flows=[{id:"transfer",kind:"asset",direction:"ltr",fromLabel:s,toLabel:b,headline:l?"按出讓合同辦理40年用地權利":"按中標文件辦理33年租賃",proposedOrTerminated:true},
      {id:"paid",kind:"cash",direction:"rtl",fromLabel:l?b:c.parties["中标方"],toLabel:s,headline:l?"截至通函最後實際可行日期首期已付2,796萬元":"已付投標按金263.94萬新加坡元，抵扣地價"},
      {id:"due",kind:"cash",direction:"rtl",fromLabel:b,toLabel:s,headline:l?"合同餘款2,796萬元，2027年5月6日或之前應付":"除按金外，首期與尾款按協議分期支付",proposedOrTerminated:true}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:"approved",stageDate:dt,stageLabel:badge,
      caseArchetypeLabel:l?"土地使用權出讓":"工業用地競標租賃",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,
      before:{title:"土地及交易方",nodes,equityLinks:[]},after:{title:"付款及交付",nodes,equityLinks:[],outcomeBadge:badge},flows,
      annotations:[{tag:"①",title:"交付及登記",body:l?"通函所載法律意見：全額付款、交地及土地使用權登記尚未完成。":"租期從建築協議指定的交地日起計，投標與股東批准已完成。"}],
      evidenceLinks:l?[{documentId:a,pages:[7,8,25],label:"合同期限、已付款及登記狀態"}]:[{documentId:a,pages:[6,7,8],label:"中標方、承租方及地價支付"},{documentId:z,pages:[2,3],label:"股東表決結果"}]});
  }
  function buildFangyuanPair(c,docs){
    const n=c.id.includes("20261109"),dt=n?"2026-11-09":"2026-11-13",start=n?dt:"2026-10-26", e=c.events?.find(x=>x.kind==="first_announcement"&&x.state==="actual"&&x.date===start)?.evidence?.documentId;
    const p=n?e:c.events?.find(x=>x.kind==="dispatch"&&x.state==="actual"&&x.date===dt)?.evidence?.documentId;
    if(!e||!p||docs?.[e]?.caseId!==c.id||!docs[e].url.endsWith(n?"/2026110900610.pdf":"/2026102600654.pdf")||docs?.[p]?.caseId!==c.id||!docs[p].url.endsWith(n?"/2026110900610.pdf":"/2026111300321.pdf")||c.stage?.status!=="approved"||c.stage.date!==dt||c.events.some(x=>x.state==="actual"&&["termination","completion"].includes(x.kind)))return null;
    const terms={lease_principal:100000000,projected_lease_receipts:n?128697000:128700000,interest_and_fees:n?28697000:28700000};
    if(!Object.entries(terms).every(([k,v])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.currency==="CNY"&&t.evidence?.documentId===p)))return null;
    const s=c.parties["承租方"],b=c.parties["出租方"];
    if(s!=="芳源环保（惠安）有限公司"||b!=="广东绿金融资租赁有限公司")return null;
    const title=n?"11月9日 · 三份售後回租":"10月26日 · 兩份售後回租",badge="已獲書面批准 · 放款待確認",split=n?"2,000萬＋3,000萬＋5,000萬元":"7,500萬＋2,500萬元",total=n?"1.28697億元":"1.287億元";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:435,status:"approved",leftTitle:title,rightTitle:"本金及租賃收款 · 人民幣",transitionLabel:"按協議支付",outcomeBadge:badge}),[
      mk("s","left",43,100,149,146,"seller","芳源環保（惠安）","資產轉讓方及承租人"),
      mk("b","left",448,100,157,146,"buyer","廣東綠金融資租賃","資產受讓方及出租人"),
      mk("r1","right",724,76,310,86,"target","本金合計1億元",split),
      mk("r2","right",724,202,310,105,"creditor","全期約收"+total,n?"含利息及費用約2,869.7萬元":"含利息及費用約2,870萬元")
    ],[],[{id:"asset",panel:"left",kind:"asset",step:"①",pathPoints:[[192,174],[448,174]],labelCenter:[320,174],labelWidth:206,labelHeight:36,label:"污水處理設備及設施",proposedOrTerminated:true}]);
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:b}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:"approved",stageDate:dt,stageLabel:badge,
      caseArchetypeLabel:"污水設備售後回租",caseModalityLabel:"現金本金與季度租金",caseModalityShortLabel:"現金",topology,compactSummary:badge,
      before:{title:"資產出售",nodes,equityLinks:[]},after:{title:"租賃與收付",nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"asset",kind:"asset",direction:"ltr",fromLabel:s,toLabel:b,headline:"協議轉讓設備所有權，再租回予芳源",proposedOrTerminated:true},{id:"funding",kind:"cash",direction:"rtl",fromLabel:b,toLabel:s,headline:"合同本金合計人民幣1億元",proposedOrTerminated:true},{id:"income",kind:"cash",direction:"ltr",fromLabel:s,toLabel:b,headline:"租期8年，本金及利息按季支付",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:"融資與租期",body:"租期自相應資產轉讓對價付清日起計；資產由承租方使用。"}],
      evidenceLinks:n?[{documentId:e,pages:[1,2,3,4],label:"三份協議、書面批准及租金"}]:[{documentId:e,pages:[1,2,3],label:"兩份協議本金及書面批准"},{documentId:p,pages:[6,7],label:"還款結構及費用"}]});
  }
  function buildSilkKpop(c,docs){
    const a=c.events?.find(e=>e.kind==="first_announcement"&&e.state==="actual"&&e.date==="2026-10-08")?.evidence?.documentId, d="YS-20261119-00472-cninfo153";
    if(!a||docs?.[a]?.caseId!==c.id||!docs[a].url.endsWith("/2026100801157.pdf")||docs?.[d]?.caseId!==c.id||c.stage?.status!=="active"||c.stage.date!=="2026-11-19"||c.events.some(e=>e.state==="actual"&&["termination","completion"].includes(e.kind)))return null;
    const m={investment_krw:5000000000,aurora_secondary:1999990000,soul_secondary:1390700000,soul_primary:1609270000,soul_post_share:30.98};
    if(!Object.entries(m).every(([k,v])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===a)))return null;
    const s=c.parties["i-Aurora 卖方"],g=c.parties["&SOUL 旧股卖方"],b=c.parties["买方及认购方"],t=c.parties["新股发行人"];
    if(s!=="Culture Monster Co., Ltd."||g!=="Better Ground Investment Fund No. 2"||t!=="&SOUL Co., Ltd."||!b?.startsWith("KSR Co., Ltd."))return null;
    const badge="交易條款已披露 · 交割日期待確認";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:468,status:"active",leftTitle:"兩家公司、三份協議",rightTitle:"合約現金對價 · 約50億韓元",transitionLabel:"十月公告條款",outcomeBadge:badge}),[
      mk("a","left",41,92,175,89,"target","i-Aurora","224,164股舊股 · 約2.67%"),
      mk("s","left",41,218,175,89,"target","&SOUL","舊股＋新股 · 擴大後約30.98%"),
      mk("b","left",454,143,152,102,"buyer","KSR","買方及認購方"),
      mk("r1","right",724,72,310,70,"creditor","i-Aurora舊股：約20億韓元","付予Culture Monster"),
      mk("r2","right",724,166,310,70,"creditor","&SOUL舊股：約13.91億韓元","付予Better Ground Investment Fund No. 2"),
      mk("r3","right",724,260,310,70,"target","&SOUL新股：約16.09億韓元","認購40,500股，資金流入標的")
    ],[],[
      {id:"old-a",panel:"left",kind:"shares",step:"①",pathPoints:[[216,138],[410,138],[410,167],[454,167]],labelCenter:[307,138],labelWidth:158,labelHeight:34,label:"i-Aurora舊股",proposedOrTerminated:true},
      {id:"both-s",panel:"left",kind:"shares",step:"②",pathPoints:[[216,259],[410,259],[410,225],[454,225]],labelCenter:[307,259],labelWidth:158,labelHeight:34,label:"&SOUL舊股及新股",proposedOrTerminated:true}
    ]);
    const nodes=[{id:"a",role:"target",name:"i-Aurora Co., Ltd."},{id:"s",role:"target",name:t},{id:"b",role:"buyer",name:b}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:"active",stageDate:c.stage.date,stageLabel:badge,
      caseArchetypeLabel:"兩項舊股轉讓及一項增資",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,
      before:{title:"簽約結構",nodes,equityLinks:[]},after:{title:"協議預計持股",nodes,equityLinks:[{from:"b",to:"a",label:"約2.67%",pct:2.67,style:"dashed"},{from:"b",to:"s",label:"約30.98%",pct:30.98,style:"dashed"}],outcomeBadge:badge},
      flows:[{id:"one",kind:"cash",direction:"ltr",fromLabel:b,toLabel:s,headline:"i-Aurora舊股對價"},{id:"two",kind:"cash",direction:"ltr",fromLabel:b,toLabel:g,headline:"&SOUL舊股對價"},{id:"three",kind:"cash",direction:"ltr",fromLabel:b,toLabel:t,headline:"&SOUL新股認購款"}],
      annotations:[{tag:"①",title:"最新披露",body:"行雲科技11月19日公告在介紹新絲路時稱兩項戰略投資已完成；該公告未列分項交割日期。"}],
      evidenceLinks:[{documentId:a,pages:[1,2,3],label:"三份協議、對價與預計持股"},{documentId:d,pages:[2],label:"行雲科技公告：交易對手方介紹"}]});
  }
  function buildTessonLink(c,docs){
    const t=c.code==="01201",dt=t?"2026-11-17":"2026-09-23";
    const get=(events,k,date,file)=>{const id=events?.find(x=>x.kind===k&&x.date===date&&x.state==="actual")?.evidence?.documentId;return docs?.[id]?.caseId===c.id&&docs[id].url.endsWith("/"+file+".pdf")?id:null;};
    const a=get(c.events,"first_announcement",t?"2026-09-27":dt,t?"2026092700115":"2026092301915"),z=t?get(c.processEvents,"supplement",dt,"2026111700318"):a;
    if(!a||!z||c.stage?.status!=="active"||c.stage.date!==dt||c.events.some(x=>x.state==="actual"&&["termination","completion"].includes(x.kind)))return null;
    const m=t?{acquisition_consideration:98400000,cash:38400000,stock:60000000,capital_injection:21600000,facility:10000000}:{deal_cash_shares:100000000,cash:13725490.2,share_value_filed:86274509.8,consideration_shares:1078431373};
    if(!Object.entries(m).every(([k,v])=>c.terms?.some(q=>q.key===k&&q.value===v&&q.evidence?.documentId===a)))return null;
    const s=c.parties["卖方"],b=c.parties["买方"],p=c.parties["标的"];
    if(!(t?s==="CCPOM Limited"&&b==="Contemporary International Battery Technology Limited"&&p==="时代华智（香港）新能源科技有限公司":b==="中原（亚洲）科技发展有限公司"&&s?.includes("CBN Holding Ltd.")&&p==="连横科技发展有限公司"))return null;
    const badge=t?"已簽協議 · 通函預計12月17日或之前寄發":"有條件收購25% · 待股東批准";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const pct=t?100:25;
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:468,status:"active",leftTitle:t?"時代華智香港股權":"連橫科技股權",rightTitle:t?"對價及兩筆獨立資金":"對價與已知付款",transitionLabel:"按協議交割",outcomeBadge:badge}),[
      mk("s","left",43,104,149,145,"seller",t?"CCPOM Limited":"中財和銳及CBN","出售方"),mk("b","left",448,104,157,145,"buyer",t?"天臣控股附屬公司":"中原（亞洲）科技","買方"),
      mk("r1","right",724,72,310,67,"target",t?"股權作價人民幣9,840萬元":"股權作價1億港元",t?"現金等值3,840萬＋對價股等值6,000萬":"現金約1,372.55萬＋對價股約8,627.45萬"),
      mk("r2","right",724,158,310,74,"creditor",t?"另向香港標的增資等值2,160萬元":"700萬港元現金已付",t?"港幣支付；部分用於清償境內貸款":"已付予中財和銳；抵扣現金總價"),
      mk("r3","right",724,258,310,92,"creditor",t?"境內另簽無息貸款人民幣1,000萬元":"擬發約10.78億股對價股",t?"由中能科技按先決條件提供":"每股0.08港元，占擴大股本約18.86%")
    ],[],[{id:"transfer",panel:"left",kind:"shares",step:"①",pathPoints:[[192,175],[448,175]],labelCenter:[320,175],labelWidth:213,labelHeight:36,label:"擬受讓標的"+pct+"%股權",proposedOrTerminated:true}]);
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:b},{id:"p",role:"target",name:p}];
    const flows=[{id:"transfer",kind:"shares",direction:"ltr",fromLabel:s,toLabel:b,headline:"按協議受讓"+pct+"%股權",proposedOrTerminated:true},{id:"stock",kind:"shares",direction:"rtl",fromLabel:t?"天臣控股":"中原建業",toLabel:s,headline:t?"對價股人民幣等值6,000萬元；以港幣2元每股換算":"擬發1,078,431,373股，發行價每股0.08港元",proposedOrTerminated:true}];
    if(t)flows.push({id:"capital",kind:"cash",direction:"ltr",fromLabel:b,toLabel:p,headline:"另向香港標的注入人民幣等值2,160萬元",proposedOrTerminated:true},{id:"loan",kind:"cash",direction:"ltr",fromLabel:"中能科技",toLabel:"境內標的或約定境內借款人",headline:"另簽人民幣1,000萬元無息貸款",proposedOrTerminated:true});
    else flows.push({id:"initial",kind:"cash",direction:"rtl",fromLabel:b,toLabel:"中財和銳",headline:"已付700萬港元，計入收購現金款"});
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"mixed",status:"active",stageDate:dt,stageLabel:badge,
      caseArchetypeLabel:t?"控股權收購及增資":"少數股權收購",caseModalityLabel:"現金及對價股",caseModalityShortLabel:"現金＋對價股",topology,compactSummary:badge,
      before:{title:"股權轉讓",nodes,equityLinks:[]},after:{title:"交割後",nodes,equityLinks:[{from:"b",to:"p",label:pct+"%",pct,style:"dashed"}],outcomeBadge:badge},flows,
      annotations:[{tag:"①",title:"股權與對價",body:t?"股權作價、增資及境內貸款分列。完成前須完成標的重組，並獲對價股特別授權。":"兩賣方分別出售標的12.75%及12.25%；公告列明標的業績不併表。"}],
      evidenceLinks:t?[{documentId:a,pages:[1,2,3,6,8,13,14],label:"收購、增資、貸款及先決條件"},{documentId:z,pages:[1],label:"延期寄發通函"}]:[{documentId:a,pages:[1,3,4,9,10],label:"股權、對價分配及已付現金"}]});
  }
  function buildQuantumOrLP(c,docs){
    const q=c.code==="00147",dt=q?"2026-11-18":"2026-11-16";
    const get=(k,date,file)=>{const id=c.events?.find(x=>x.kind===k&&x.date===date&&x.state==="actual")?.evidence?.documentId;return docs?.[id]?.caseId===c.id&&docs[id].url.endsWith("/"+file+".pdf")?id:null;};
    const a=get("first_announcement",q?"2026-10-30":dt,q?"2026103002663":"2026111601419"),z=q?get("completion",dt,"2026111800862"):a;
    if(!a||!z||c.stage?.status!==(q?"closed":"active")||c.stage.date!==dt||c.events.some(e=>e.kind==="termination"&&e.state==="actual"))return null;
    const m=q?{cash_consideration:563000000,target_stake:100,operating_stake:85.94}:{proposed_commitment:65000000,prc_commitment:20000000,bvi_commitment:45000000};
    if(!Object.entries(m).every(([k,v])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===a)))return null;
    const badge=q?"11月18日完成 · 收購標的100%股權":"擬出資6,500萬港元 · 待正式協議",title=q?"控股公司與營運股權":"兩項擬設有限合夥";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const nodes=q?[{id:"s",role:"seller",name:c.parties["卖方"]},{id:"b",role:"buyer",name:c.parties["买方"]},{id:"t",role:"target",name:c.parties["标的"]}]:[{id:"prc",role:"target",name:"境內不良資產投資合夥"},{id:"bvi",role:"target",name:"擬設WF — CCMT INVESTMENT L.P."},{id:"b",role:"buyer",name:"中原建業透過兩家附屬公司"}];
    if(q?!(nodes[0].name==="Brainwave Innovations Limited"&&nodes[2].name==="QuantumCompute Solutions Limited"):!(c.parties["BVI普通合伙人"]==="WIND FLOWER GROUP CO., LIMITED"&&c.parties["境内普通合伙人"]==="上海众合利汇信息咨询服务有限公司"))return null;
    const geometry=q?[
      mk("s","left",43,100,160,143,"seller","Brainwave Innovations","出售方"),mk("b","left",456,100,150,143,"buyer","國際商業結算","收購方"),
      mk("r1","right",724,75,310,80,"target","股權總價5.63億港元","現金，交割後第7個營業日或之前應付"),
      mk("r2","right",724,185,310,104,"creditor","間接持上海天璟富聯約85.94%","按已披露的完成重組後結構")
    ]:[
      mk("prc","left",43,82,176,76,"target","境內有限合夥","擬設 · 不良資產投資"),mk("bvi","left",43,212,176,76,"target","BVI有限合夥","擬設 · 以境外架構為主"),
      mk("b","left",456,145,150,82,"buyer","中原建業","透過不同附屬公司"),
      mk("r1","right",724,72,310,79,"target","境內擬認繳2,000萬港元","佔目標認繳額5,000萬港元之40%"),
      mk("r2","right",724,180,310,86,"creditor","BVI擬認繳4,500萬港元","佔目標認繳額7,500萬港元之60%")
    ];
    const gates=q?[{id:"transfer",panel:"left",kind:"shares",step:"①",pathPoints:[[203,170],[456,170]],labelCenter:[321,170],labelWidth:205,labelHeight:34,label:"已取得QuantumCompute 100%"}]:[
      {id:"prc",panel:"left",kind:"cash",step:"①",pathPoints:[[456,167],[415,167],[415,120],[219,120]],labelCenter:[317,120],labelWidth:150,labelHeight:32,label:"2,000萬港元",proposedOrTerminated:true},
      {id:"bvi",panel:"left",kind:"cash",step:"②",pathPoints:[[456,205],[415,205],[415,250],[219,250]],labelCenter:[317,250],labelWidth:150,labelHeight:32,label:"4,500萬港元",proposedOrTerminated:true}
    ];
    const status=q?"closed":"active",topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:438,status,leftTitle:title,rightTitle:q?"作價及穿透股權":"認繳及目標規模",transitionLabel:q?"交割已確認":"按擬議框架",outcomeBadge:badge}),geometry,[],gates);
    const flows=q?[{id:"transfer",kind:"shares",direction:"ltr",fromLabel:nodes[0].name,toLabel:nodes[1].name,headline:"已取得控股公司100%股權"},{id:"pay",kind:"cash",direction:"rtl",fromLabel:nodes[1].name,toLabel:nodes[0].name,headline:"合約5.63億港元，交割後第7個營業日或之前應付",proposedOrTerminated:true}]:[{id:"prc",kind:"cash",direction:"ltr",fromLabel:c.parties["境内认购方"],toLabel:nodes[0].name,headline:"計劃承擔2,000萬港元，分期按通知出資",proposedOrTerminated:true},{id:"bvi",kind:"cash",direction:"ltr",fromLabel:c.parties["BVI认购方"],toLabel:nodes[1].name,headline:"計劃承擔4,500萬港元，分期按通知出資",proposedOrTerminated:true}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:dt,stageLabel:badge,
      caseArchetypeLabel:q?"控股公司全資收購":"不良資產基金擬認繳",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,
      before:{title,nodes,equityLinks:[]},after:{title:q?"交割後":"擬議合夥",nodes,equityLinks:q?[{from:"b",to:"t",pct:100,label:"100%",style:"solid"}]:[],outcomeBadge:badge},flows,
      annotations:[{tag:"①",title:q?"交割與付款":"兩項擬議治理",body:q?"公司11月18日公告確認交割及併表；現金支付安排見10月30日公告。":"兩個合夥各有普通合夥人；出資須按通知分期，分派次序列明有限合夥人6%年單利優先權。"}],
      evidenceLinks:q?[{documentId:a,pages:[2,3,6,7],label:"作價、支付期限與重組後持股"},{documentId:z,pages:[1],label:"正式交割生效"}]:[{documentId:a,pages:[1,2,3,4],label:"兩處結構、擬認繳及分派"}]});
  }
  function buildCsscPair(c,docs){
    const h=c.id.includes("hilli-sale"),dt=h?"2026-11-18":"2026-11-17";
    const get=(k,date,leaf)=>{const id=c.events?.find(e=>e.kind===k&&e.date===date&&e.state==="actual")?.evidence?.documentId;return docs?.[id]?.caseId===c.id&&docs[id].url.endsWith("/"+leaf+".pdf")?id:null;};
    const a=get("first_announcement",h?dt:"2026-09-01",h?"2026111801365":"2026090103681"),z=h?a:get("vote",dt,"2026111701267");
    if(!a||!z||c.stage?.status!==(h?"active":"approved")||c.stage.date!==dt||c.events.some(e=>e.state==="actual"&&["termination","completion"].includes(e.kind)))return null;
    const amounts=h?{total_financing_limit:960000000,incremental_charterhire:449472000,incremental_interest:235997000}:{total_cost:3235000000,per_vessel:323500000};
    if(!Object.entries(amounts).every(([k,v])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.currency===(h?"USD":"CNH")&&t.evidence?.documentId===a)))return null;
    const s=c.parties[h?"出租人及融资方":"卖方"],b=c.parties[h?"承租人":"买方"];
    if(!s||!b||!(h?s==="Fortune Lianjiang Shipping S.A."&&b==="Golar Hilli Corporation":s.includes("Chengxi")&&s.includes("Trading")))return null;
    const status=h?"active":"approved",badge=h?"修訂協議已簽 · 提款待條件達成":"獨立股東已批准 · 待建造及交付";
    const left=h?"HILLI EPISEYO融資修訂":"十艘散貨船建造合同",right=h?"本金上限及增量租金":"建造價及交付安排";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const direction=h?[[203,175],[452,175]]:[[203,175],[452,175]];
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:481,status,leftTitle:left,rightTitle:right,transitionLabel:h?"售後回租續期":"分期建造及交付",outcomeBadge:badge}),[
      mk("s","left",42,104,161,144,"seller",h?"Fortune Lianjiang":"澄西船舶及中船貿易",h?"出租及融資方":"合同賣方"),
      mk("b","left",452,104,153,144,"buyer",h?"Golar Hilli":"中國船舶租賃",h?"承租人":"訂船方"),
      mk("r1","right",724,71,310,70,"target",h?"融資本金上限9.60億美元":"十艘合計離岸人民幣32.35億元",h?"已存續本金與增量本金合計":"每艘3.235億元"),
      mk("r2","right",724,161,310,75,"creditor",h?"增量租金約4.495億美元":"每艘分五期付款",h?"含估計利息約2.360億美元":"主要款項約定在交付時支付"),
      mk("r3","right",724,260,310,79,"creditor",h?"租期延至2038年6月20日":"預計2029年9月至2030年底交付",h?"增量租金分46期支付":"澄西及中船廣西負責建造")
    ],[],[{id:"main",panel:"left",kind:h?"cash":"asset",step:"①",pathPoints:direction,labelCenter:[321,175],labelWidth:212,labelHeight:36,label:h?"新增融資取決於提款時未償本金":"按訂單建造及交付散貨船",proposedOrTerminated:true}]);
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:b}];
    const flows=h?[{id:"finance",kind:"cash",direction:"ltr",fromLabel:s,toLabel:b,headline:"新增額＝9.60億美元上限（或另議較低額）減提款日現有未償本金",proposedOrTerminated:true},{id:"rent",kind:"cash",direction:"rtl",fromLabel:b,toLabel:s,headline:"增量預計租金約4.49472億美元，含估計利息2.35997億美元",proposedOrTerminated:true}]:[{id:"ship",kind:"asset",direction:"ltr",fromLabel:s,toLabel:b,headline:"按合同建造並交付十艘散貨船",proposedOrTerminated:true},{id:"price",kind:"cash",direction:"rtl",fromLabel:b,toLabel:s,headline:"每艘3.235億元離岸人民幣；分五期按建造進度支付",proposedOrTerminated:true}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:dt,stageLabel:badge,
      caseArchetypeLabel:h?"浮式液化天然氣裝置再融資":"關連船舶建造",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,
      before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows,
      annotations:[{tag:"①",title:h?"本金與租金":"分期與交付",body:h?"提款日未償本金決定實際新增融資額；船舶仍按原安排續租。":"付款按每艘建造進度；預計交付期為2029年9月30日至2030年12月31日。"}],
      evidenceLinks:h?[{documentId:a,pages:[1,3,4],label:"修訂上限、增量及租期"}]:[{documentId:a,pages:[1,3,4],label:"十艘、合同價格及預計交付"},{documentId:z,pages:[1,2,3],label:"獨立股東批准"}]});
  }
  function buildNtsNanyang(c,docs){
    const n=c.code==="02473",dt="2026-11-11",status=n?"active":"approved";
    const get=(k,date,leaf)=>{const id=c.events?.find(e=>e.kind===k&&e.date===date&&e.state==="actual")?.evidence?.documentId;return docs?.[id]?.caseId===c.id&&docs[id].url.endsWith("/"+leaf+".pdf")?id:null;};
    const a=get(n?"dispatch":"first_announcement",n?dt:"2026-09-21",n?"2026111101431":"2026092100682"),z=n?a:get("vote",dt,"2026111100181");
    if(!a||!z||c.stage?.status!==status||c.stage.date!==dt||c.events.some(e=>e.state==="actual"&&["termination","completion"].includes(e.kind)))return null;
    const m=n?{share_consideration:149986000,interest:100,operating_stake:94.94,issue_price:0.3947,consideration_shares:380000000,initial_shares:190000000,earnout_2026:105526000,earnout_2027:84474000}:{shipbuilding_total:71400000,price_per_vessel:35700000};
    if(!Object.entries(m).every(([k,v])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===a)))return null;
    const s=c.parties["卖方"],b=c.parties["买方"];
    if(!(n?s==="Jiary Development (Hong Kong) Limited"&&c.parties["标的"]==="PAGAC NTS Limited":s==="江门市南洋船舶工程有限公司"&&b==="Jinmao Marine Inc. 与 Jinquan Marine Inc."))return null;
    const badge=n?"通函已寄發 · 股東會擬11月30日舉行":"股東已批准兩項合同 · 待建造交付";
    const left=n?"收購PAGAC NTS":"兩艘散貨船新造訂單",right=n?"對價股與業績掛鈎分期":"船價及付款節點",kind=n?"shares":"asset";
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:n?"按協議擬發股":"按合同分期",outcomeBadge:badge}),[
      mk("s","left",42,104,161,144,"seller",n?"Jiary Development":"江門南洋船舶",n?"出售方":"承造及出售方"),mk("b","left",452,104,153,144,"buyer",n?"喜相逢集團":"金輝旗下兩家公司",n?"買方及股份發行人":"各自簽約購一艘"),
      mk("r1","right",724,71,310,70,"target",n?"對價上限約1.50億港元":"兩艘合約價合計7,140萬美元",n?"最多3.80億股，每股0.3947港元":"各3,570萬美元，兩份合同不互為條件"),
      mk("r2","right",724,159,310,76,"creditor",n?"交割時擬發1.90億股":"每艘按四個節點付款",n?"餘下最多1.90億股按審計業績發行":"最後一期2,142萬美元，交付時應付"),
      mk("r3","right",724,255,310,84,"creditor",n?"兩期業績對價股":"兩艘預計交付日期",n?"2026最多1.05526億；2027最多8,447.4萬":"2029年8月31日及9月30日或之前")
    ],[],[{id:"main",panel:"left",kind,step:"①",pathPoints:[[203,175],[452,175]],labelCenter:[321,175],labelWidth:213,labelHeight:36,label:n?"擬取得PAGAC NTS 100%":"按兩份合同建造及交付",proposedOrTerminated:true}]);
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:b}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:n?"shares":"cash",status,stageDate:dt,stageLabel:badge,
      caseArchetypeLabel:n?"新股及業績對價收購":"散貨船建造合同",caseModalityLabel:n?"對價股":"現金",caseModalityShortLabel:n?"對價股":"現金",topology,compactSummary:badge,
      before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},
      flows:[{id:"main",kind,direction:"ltr",fromLabel:s,toLabel:b,headline:n?"擬轉讓控股公司100%股權":"按合同交付兩艘散貨船",proposedOrTerminated:true},{id:"payment",kind:n?"shares":"cash",direction:"rtl",fromLabel:b,toLabel:s,headline:n?"固定部分1.90億股；另有兩期業績股份，上限合計1.90億":"每艘合同價3,570萬美元，分四期支付",proposedOrTerminated:true}],
      annotations:[{tag:"①",title:n?"持股與交割條件":"交付安排",body:n?"擬取得PAGAC NTS全部股權，並間接持有經營主體新奇特約94.94%；業績股取決於經審計淨利潤。":"兩份合同分別由Jinmao Marine與Jinquan Marine簽訂。"}],
      evidenceLinks:n?[{documentId:a,pages:[1,12,14,44,47],label:"股東會、兩級股權及對價股上限"}]:[{documentId:a,pages:[1,2,3,4],label:"兩份合約、價格及交付"},{documentId:z,pages:[1,2],label:"兩項決議通過"}]});
  }
  function buildQinglingPair(c,docs){
    const buyback=c.id==="HK-01122-20260922-xinxiang-anda-repurchase";
    const proof=(leaf)=>Object.values(docs??{}).find(d=>d.caseId===c.id&&d.url?.endsWith("/"+leaf+".pdf"))?.id;
    const source=proof(buyback?"2026111900334":"2026101601506"), update=buyback?source:proof("2026112401063");
    const status=buyback?"approved":"active", date=buyback?"2026-11-19":"2026-11-24";
    if(!source||!update||c.stage?.status!==status||c.stage?.date!==date||c.events?.some(x=>x.state==="actual"&&["completion","termination"].includes(x.kind))) return null;
    const terms=buyback?{current_repurchase_cap:15133560}:{exit_cash:202203596.77,capital_reduction:152580287,exit_stake:49.4,post_stake:100};
    if(!Object.entries(terms).every(([k,v])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===source)))return null;
    const l=c.parties[buyback?"出租人":"减资主体及付款方"], r=c.parties[buyback?"回购承诺方":"退出股东"];
    if(l!==(buyback?"重庆市交通设备融资租赁有限公司":"庆铃模具（Qingling Moulds）")||r!==(buyback?"庆铃汽车股份有限公司":"庆铃汽车（集团）有限公司"))return null;
    if(buyback&&c.parties["承租人"]!=="武汉鑫祥安达物流有限责任公司")return null;
    if(!buyback&&c.parties["保留股东"]!=="庆铃汽车股份有限公司")return null;
    const badge=buyback?"三份協議已簽 · 回購須符合觸發條件":"通函延至12月4日或之前 · 待獨立股東批准";
    const lt=buyback?"融資租賃配套回購":"慶鈴模具減資", rt=buyback?"租賃標的與觸發條件":"現金退出與股權變化";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const diagram=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:lt,rightTitle:rt,transitionLabel:buyback?"依約觸發":"待批准及登記",outcomeBadge:badge}),[
      box("l","left",42,106,160,124,"seller",buyback?"重慶交通設備租賃":"慶鈴模具",buyback?"出租人及回購通知方":"減資主體及付款方"),
      box("r","left",444,106,161,124,"buyer",buyback?"慶鈴汽車股份":"慶鈴汽車集團",buyback?"回購承諾方":"持股約49.4% · 擬退出"),
      box("a","right",724,72,310,70,"target",buyback?"65輛新能源車及租賃債權":"現金退出款約2.02億元人民幣",buyback?"承租人：武漢鑫祥安達 · 租期60個月":"由慶鈴模具支付予慶鈴集團"),
      box("b","right",724,164,310,75,"creditor",buyback?"本批估計回購上限1,513.4萬元人民幣":"註冊資本減少約1.53億元人民幣",buyback?"回購款包括約定租金及其他適用款項":"待協議生效及完成減資變更登記"),
      box("c","right",724,260,310,76,"creditor",buyback?"符合條件時出租人可發通知":"慶鈴汽車股份持股約50.6% → 100%",buyback?"包括租金逾期或車輛擔保手續未完成":"慶鈴模具繼續納入合併報表")
    ],[],[{id:"main",panel:"left",kind:buyback?"asset":"cash",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:buyback?"符合條件可要求回購":"條件達成後支付退出款",proposedOrTerminated:true}]);
    const nodes=[{id:"l",role:"seller",name:l},{id:"r",role:"buyer",name:r}];
    return validateDiagramSpec({id:c.id,caseId:c.id,code:c.code,name:c.name,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:buyback?"租賃配套回購":"附屬公司減資",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology:diagram,compactSummary:badge,before:{title:lt,nodes,equityLinks:[]},after:{title:rt,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:buyback?"asset":"cash",direction:"ltr",fromLabel:l,toLabel:r,headline:buyback?"符合條件可要求回購指定車輛及租賃債權":"慶鈴模具向退出股東支付約2.02億元人民幣",proposedOrTerminated:true}],annotations:[{tag:"①",title:buyback?"回購通知":"付款時點",body:buyback?"須符合既定先決及觸發條件；三份協議本批估計最高回購款為人民幣15,133,560元。":"待協議生效、先決條件達成並完成變更登記後30個曆日內付款。"}],evidenceLinks:buyback?[{documentId:source,pages:[82,84,88],label:"本批車輛、回購條件及預計上限"}]:[{documentId:source,pages:[1,3,4,5],label:"減資、退出款與股權"},{documentId:update,pages:[1,2],label:"通函延期"}]});
  }
  function buildTclDingli(c,docs){
    const t=c.code==="01070",status=t?"closed":"active",date=t?"2026-11-02":"2026-11-19";
    const hit=(leaf)=>Object.values(docs??{}).find(d=>d.caseId===c.id&&d.url?.endsWith("/"+leaf+".pdf"))?.id;
    const a=hit(t?"2026071500738":"2026111901538_c"),z=t?hit("2026110203263"):a;
    if(!a||!z||c.stage?.status!==status||c.stage?.date!==date||c.events?.some(e=>e.state==="actual"&&(e.kind==="termination"||(!t&&e.kind==="completion"))))return null;
    if(t&&!c.events?.some(e=>e.kind==="completion"&&e.state==="actual"&&e.date===date&&e.evidence?.documentId===z))return null;
    const terms=t?[["proposed_purchase",5610000000,a],["cash_component",167043375,a],["share_component",5442956625,a],["consideration_shares",362863775,z],["issue_price",15,z],["enlarged_stake",12.58,z]]:[["agreed_price",46140000,a],["asset_pct",51,a],["asset_shares",1173000,a]];
    if(!terms.every(([k,v,id])=>c.terms?.some(x=>x.key===k&&x.value===v&&x.evidence?.documentId===id)))return null;
    const seller=t?"五名賣方":c.parties["卖方"],buyer=t?"TCL電子":c.parties["买方"];
    if(t&&c.parties["买方"]!=="TCL电子")return null;
    if(!t&&(seller!=="Novus Homo Company Limited"||buyer!=="Intelligent Group Limited"||c.parties["标的"]!=="DINGLI & SF SOLAR ENERGY COMPANY LIMITED"))return null;
    const badge=t?"11月2日完成收購及發行對價股":"股權轉讓協議已簽 · 待交割";
    const left=t?"TCL空調業務收購":"泰國光伏資產收購",right=t?"對價與交割後持股":"對價及交割條件";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:t?"已交割":"按協議擬交割",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,"seller",t?"五名原股東":"Novus Homo",t?"出售Cayman控股公司":"出售方 · 關連人士"),
      box("b","left",444,106,161,124,"buyer",t?"TCL電子":"Intelligent Group",t?"買方及對價股發行人":"希教國際非全資附屬公司"),
      box("a","right",724,72,310,70,"target",t?"標的為Cayman控股公司":"Dingli & SF Solar Energy",t?"全資持有廣東控股公司，間接持有經營公司51%":"擬收購51% · 1,173,000股"),
      box("r2","right",724,164,310,75,"creditor",t?"協議對價56.1億港元":"現金對價4,614萬元人民幣",t?"現金約1.67億；股份對價約54.43億":"完成時由買方一次性支付予賣方"),
      box("r3","right",724,260,310,76,"creditor",t?"實發3.62863775億股":"條件達成或豁免後擬交割",t?"每股15港元，佔擴大後股本約12.58%":"原則上於五個營業日內")
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:t?"已轉讓標的100%股權":"擬轉讓標的51%股權",proposedOrTerminated:!t}]);
    const nodes=[{id:"s",role:"seller",name:seller},{id:"b",role:"buyer",name:buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:t?"mixed":"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:t?"收購空調業務控股公司":"收購光伏項目公司",caseModalityLabel:t?"現金及對價股":"現金",caseModalityShortLabel:t?"現金＋股份":"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:seller,toLabel:buyer,headline:t?"交割後全資持有TCL AeroWell (Cayman) Holdings Limited":"擬轉讓Dingli & SF Solar Energy 51%股權",proposedOrTerminated:!t}],annotations:[{tag:"①",title:t?"標的與經營公司":"交割後安排",body:t?"收購標的公司100%股權；標的透過廣東控股公司持有中山空調經營公司51%。":"交割後標的將納入希教國際合併報表。"}],evidenceLinks:t?[{documentId:a,pages:[4,17],label:"協議對價及持股架構"},{documentId:z,pages:[1,2],label:"交割及實際發行股份"}]:[{documentId:a,pages:[1,2,3,8],label:"關連交易、股權、現金對價與交割"}]});
  }
  function buildZsCityhill(c,docs){
    const z=c.code==="08370",status=z?"closed":"approved",date=z?"2026-11-16":"2026-11-19";
    const match=(leaf)=>Object.values(docs??{}).find(d=>d.caseId===c.id&&d.url?.endsWith("/"+leaf+".pdf"))?.id;
    const termsDoc=match(z?"2026091801142":"2026101501344"),detail=match(z?"2026102801221":"2026101501344"),actual=match(z?"2026111601491":"2026111900318");
    if(!termsDoc||!detail||!actual||c.stage?.status!==status||c.stage?.date!==date||c.events?.some(e=>e.state==="actual"&&(e.kind==="termination"||(!z&&e.kind==="completion"))))return null;
    if(!c.events?.some(e=>e.state==="actual"&&e.kind===(z?"completion":"vote")&&e.date===date&&e.evidence?.documentId===actual))return null;
    const checks=z?{proposed_purchase:16953376,equity_purchase:13400000,sale_loan:3553376,deposit_original_currency:19100000}:{proposed_purchase:754060000,closing_component:534060000,contingent_cap:220000000,mup_closing_value:514196356,gold_closing_value:19863644,target_pct:69};
    if(!Object.entries(checks).every(([k,v])=>c.terms?.some(a=>a.key===k&&a.value===v&&a.evidence?.documentId===termsDoc)))return null;
    if(z?c.parties?.["买方"]!=="智昇集团":c.parties?.["买方"]!=="Cityhill Limited"||c.parties?.["卖方"]!=="Han Carvestone International Limited"||c.parties?.["标的"]!=="AOMI Corporation")return null;
    const l=z?"Ma Gary Ming Fai":"Han Carvestone",r=z?"智昇集團":"Cityhill";
    const left=z?"泰國數據中心控股收購":"AOMI 69%股權收購",right=z?"原幣對價及付款安排":"金條、MUP及或有對價";
    const badge=z?"11月16日已交割 · 尾款支付待披露":"11月19日股東批准 · 待交割";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:z?"已完成股權交割":"按協議擬交割",outcomeBadge:badge}),[
      box("l","left",42,106,160,124,"seller",l,z?"賣方及股東貸款轉讓人":"賣方 · 擬保留31%"),
      box("r","left",444,106,161,124,"buyer",r,z?"買方 · 取得項目控制權":"買方 · 擬持有69%"),
      box("a","right",724,72,310,70,"target",z?"合同對價1,695.3萬美元":"對價上限約7.54億港元",z?"股權1,340萬；股東貸款355.3萬美元":"包含交割對價及有條件業績款"),
      box("b","right",724,164,310,75,"creditor",z?"已付1,910萬港元押金抵扣":"交割對價約5.34億港元",z?"按通函折合243.525萬美元":"14,982,411 MUP及約19,370克金條"),
      box("c","right",724,260,310,76,"creditor",z?"尾款1,451.8萬美元":"或有對價上限2.20億港元",z?"合同約定交割後7天內支付":"取決於業績及條件，以MUP結算")
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:z?"轉讓約51.94%股權及貸款":"擬轉讓AOMI 69%股權",proposedOrTerminated:!z}]);
    const nodes=[{id:"l",role:"seller",name:l},{id:"r",role:"buyer",name:r}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:z?"cash":"mixed",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:z?"行使認購期權收購":"金條及MUP支付的股權收購",caseModalityLabel:z?"現金":"金條及MUP",caseModalityShortLabel:z?"現金":"金條＋MUP",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:l,toLabel:r,headline:z?"約51.94% Intelligence Advantage股權及待售股東貸款":"股東已批准，待轉讓AOMI 69%股權",proposedOrTerminated:!z}],annotations:[{tag:"①",title:z?"尾款與交割":"或有部分",body:z?"11月16日公告確認收購交割；通函約定交割後付尾款。":"交割對價包括金條及MUP；或有對價依業績與其他條件另以MUP支付。"}],evidenceLinks:z?[{documentId:detail,pages:[8,9,12,13],label:"股權比例、美元對價與抵扣"},{documentId:actual,pages:[1],label:"交割及項目控制權"}]:[{documentId:detail,pages:[1,2,3,4],label:"AOMI股權、金條、MUP與業績對價"},{documentId:actual,pages:[1,2],label:"股東表決結果"}]});
  }
  function buildHonbridgeComplete(c,docs){
    const hit=(leaf)=>Object.values(docs??{}).find(d=>d.caseId===c.id&&d.url?.endsWith("/"+leaf+".pdf"))?.id;
    const a=hit("2026082102527"), r=hit("2026103002617"), z=hit("2026112501525"), date="2026-11-24",status="closed";
    if(!a||!r||!z||c.stage?.date!==date||c.stage?.status!==status||c.events?.some(e=>e.state==="actual"&&e.kind==="termination"))return null;
    if(!c.events?.some(e=>e.state==="actual"&&e.kind==="completion"&&e.date===date&&e.evidence?.documentId===z))return null;
    if(![["asset_pct",51,a],["original_price",424800000,a],["revised_price",382500000,r]].every(([k,v,id])=>c.terms?.some(x=>x.key===k&&x.value===v&&x.evidence?.documentId===id)))return null;
    const seller=c.parties["卖方"],buyer=c.parties["买方"];if(seller!=="Geely Technology Group Co., Ltd."||!buyer?.includes("联丰泰科技")||c.parties["标的"]!=="聚能（江苏）动力科技有限公司")return null;
    const left="聚能動力股權收購",right="對價及交割狀態",badge="11月24日已交割並完成變更登記";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:"已交割",outcomeBadge:badge}),[
      box("left","left",42,106,160,124,"seller","吉利科技集團","出售方"),
      box("buyer","left",444,106,161,124,"buyer","洪橋集團","透過聯豐泰科技設立境內買方"),
      box("a","right",724,72,310,70,"target","聚能（江蘇）動力科技","已轉讓51%股權"),
      box("b","right",724,164,310,75,"creditor","修訂對價3.825億元人民幣","原對價4.248億元人民幣"),
      box("c","right",724,260,310,76,"creditor","11月24日完成交割","股權變更登記及章程修訂已完成")
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:"交割聚能動力51%股權",proposedOrTerminated:false}]);
    const nodes=[{id:"left",role:"seller",name:seller},{id:"buyer",role:"buyer",name:buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:"主要及關連收購",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:seller,toLabel:buyer,headline:"已取得聚能（江蘇）動力科技51%股權",proposedOrTerminated:false}],annotations:[{tag:"①",title:"交割公告",body:"11月25日刊發公告，確認前一日依協議完成收購、工商變更及章程修訂。"}],evidenceLinks:[{documentId:a,pages:[1,2],label:"標的股權及交易方"},{documentId:r,pages:[1],label:"修訂對價"},{documentId:z,pages:[1],label:"實際交割"}]});
  }
  function buildPossibleOfferPair(c,docs){
    const i=c.code==="01402",status="active",date="2026-11-06";
    const hit=(leaf)=>Object.values(docs??{}).find(d=>d.caseId===c.id&&d.url?.endsWith("/"+leaf+".pdf"))?.id;
    const a=hit(i?"2026091001533":"2026050600487"),z=hit(i?"2026110600951":"2026110600458");
    if(!a||!z||c.stage?.status!==status||c.stage?.date!==date||c.events?.some(e=>e.state==="actual"&&["termination","completion"].includes(e.kind)))return null;
    if(![["block_pct",i?71.59:60.21],["block_shares",i?752100000:187410000]].every(([k,v])=>c.terms?.some(x=>x.key===k&&x.value===v&&x.evidence?.documentId===a)))return null;
    const seller=c.parties["潜在卖方"],buyer=c.parties["潜在买方"];
    if(i?seller!=="Luxurious Bay Capital Limited、Wong King Keung、Knight Sky Holdings Limited"||buyer!=="未公布姓名的独立第三方":seller!=="董事长 Chen Jian"||buyer!=="独立第三方（未披露姓名）")return null;
    const left="控股股權擬議轉讓",right="11月6日公告進展",badge=i?"盡調及磋商進行中 · 未簽正式協議":"磋商續行 · 未簽正式協議 · 無排他安排";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:"第3.7條月度更新",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,"seller",i?"三名潛在賣方":"陳健",i?"Luxurious Bay等披露股東":"潛在賣方 · 董事會主席"),
      box("b","left",444,106,161,124,"buyer","獨立第三方","潛在買方 · 未披露名稱"),
      box("a","right",724,72,310,70,"target",i?"i-Control擬轉讓約71.59%":"富通科技擬轉讓約60.21%",i?"合計7.521億股":"合計1.8741億股"),
      box("r2","right",724,164,310,75,"creditor",i?"盡職審查及磋商進行中":"已恢復磋商，無重大進展",i?"未接獲終止磋商通知":"未簽延期協議，現無排他安排"),
      box("r3","right",724,260,310,76,"creditor","尚未簽署正式買賣協議","若交易落實，可能觸發全面要約")
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:i?"擬議轉讓約71.59%":"擬議轉讓約60.21%",proposedOrTerminated:true}]);
    const nodes=[{id:"s",role:"seller",name:seller},{id:"b",role:"buyer",name:buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"mixed",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:"第3.7條可能控股權轉讓",caseModalityLabel:"對價待定",caseModalityShortLabel:"待定",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:seller,toLabel:buyer,headline:i?"意向涉及752,100,000股":"意向涉及187,410,000股",proposedOrTerminated:true}],annotations:[{tag:"①",title:"進展",body:i?"11月6日公告確認仍在盡職審查及磋商，未簽正式買賣協議。":"11月6日公告確認磋商續行，未簽正式買賣協議，也未延長排他安排。"}],evidenceLinks:[{documentId:a,pages:[1,2],label:"首次披露、擬轉讓股數及比例"},{documentId:z,pages:[1,2],label:"11月6日月度更新"}]});
  }
  function buildNamedLoiPair(c,docs){
    const i=c.code==="01793",status="active",date=i?"2026-11-20":"2026-11-16";
    const hit=(leaf)=>Object.values(docs??{}).find(d=>d.caseId===c.id&&d.url?.endsWith("/"+leaf+".pdf"))?.id;
    const a=hit(i?"2026082100183":"2026071000993"),z=hit(i?"2026112001000":"2026111600702");
    if(!a||!z||c.stage?.status!==status||c.stage?.date!==date||c.events?.some(e=>e.state==="actual"&&["termination","completion"].includes(e.kind)))return null;
    if(![["block_pct",75],["block_shares",i?600000000:750000000]].every(([k,v])=>c.terms?.some(x=>x.key===k&&x.value===v&&x.evidence?.documentId===a)))return null;
    const seller=c.parties["潜在卖方"],buyer=c.parties["潜在买方"];
    if(i?seller!=="Triple Arch Limited"||buyer!=="Talent Pool Group Limited":seller!=="由实益拥有人拟促使 Prime Pinnacle Limited 签约"||buyer!=="Sichuan Wanlexin Technology Company Limited")return null;
    const left="控股股權擬議轉讓",right=i?"11月20日公告進展":"11月16日公告進展",badge=i?"仍在磋商 · 排他期原定11月30日屆滿":"排他期與ODI期限延至11月30日";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:"第3.7條月度更新",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,"seller",i?"Triple Arch":"Prime Pinnacle",i?"潛在賣方 · 維港建設股東":"實益擁有人擬促使其簽約"),
      box("b","left",444,106,161,124,"buyer",i?"Talent Pool":"四川萬樂鑫","潛在買方"),
      box("a","right",724,72,310,70,"target",i?"維港建設擬轉讓75%":"萬順集團擬轉讓75%",i?"合計6億股":"合計7.5億股"),
      box("r2","right",724,164,310,75,"creditor",i?"仍在商討正式協議":"境外投資審批仍在進行",i?"如未簽約，雙方擬商討延長排他期":"補充協議列有按金及再延期條件"),
      box("r3","right",724,260,310,76,"creditor","尚未簽署正式買賣協議","若交易落實，可能觸發全面要約")
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:"擬議轉讓75%股權",proposedOrTerminated:true}]);
    const nodes=[{id:"s",role:"seller",name:seller},{id:"b",role:"buyer",name:buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"mixed",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:"第3.7條可能控股權轉讓",caseModalityLabel:"對價待定",caseModalityShortLabel:"待定",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:seller,toLabel:buyer,headline:i?"意向涉及600,000,000股":"意向涉及750,000,000股",proposedOrTerminated:true}],annotations:[{tag:"①",title:"進展",body:i?"11月20日公告確認正式買賣協議尚未簽署，排他期原定11月30日屆滿。":"排他期與境外投資審批期限均先延至11月30日。補充按金條件達成才可再按合同延長。"}],evidenceLinks:[{documentId:a,pages:[1,2],label:"首次披露、擬轉讓股數及比例"},{documentId:z,pages:[1,2],label:i?"11月20日月度更新":"11月16日補充協議"}]});
  }
  function buildHangYickPartial(c,docs){
    const response="YS-20261111-5234d91d7bb9",offer="YS-20261014-995b7068c611",consent="YS-20261009-2628a17da89b";
    if(![response,offer,consent].every(id=>docs?.[id]?.caseId===c.id)||c.stage?.status!=="active"||c.stage?.date!=="2026-11-11"||c.parties?.["要约方"]!=="Ngai Wa Ping"||[...(c.events??[]),...(c.processEvents??[])].some(e=>e.state==="actual"&&(e.date>c.stage.date||["completion","termination"].includes(e.kind))))return null;
    if(![["partial_max",18000000],["offer_price",0.6],["partial_shares",30000000],["partial_pct",12.86]].every(([k,v])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===response))||!c.processEvents?.some(e=>e.date==="2026-11-30"&&e.state==="expected"&&e.evidence?.documentId===response))return null;
    const status="active",left="自願現金部分要約",right="接納門檻與時間表",badge="已寄發回應文件 · 待首次截止結果";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:"有條件部分要約",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,"seller","合資格股東","現有股東 · 擬交付股份"),
      box("b","left",444,106,161,124,"buyer","Ngai Wa Ping","要約方 · 每股0.60港元"),
      box("a","right",724,72,310,70,"target","擬購恒益控股3,000萬股","約佔已發行股本12.86%"),
      box("r2","right",724,164,310,75,"creditor","最低有效接納3,000萬股","達標時擬支付1,800萬港元"),
      box("r3","right",724,260,310,76,"creditor","11月30日首次截止","香港時間下午4時")
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:"擬接納股份",proposedOrTerminated:true}]);
    const nodes=[{id:"s",role:"seller",name:"合資格股東"},{id:"b",role:"buyer",name:"Ngai Wa Ping"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:c.stage.date,stageLabel:badge,caseArchetypeLabel:"自願部分要約",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:"合資格股東",toLabel:"Ngai Wa Ping",headline:"擬收購3,000萬股",proposedOrTerminated:true}],annotations:[{tag:"①",title:"首次截止",body:"11月30日下午4時；如達最低有效接納股數，按公告所列流程宣布就接納而言成為無條件。"}],evidenceLinks:[{documentId:response,pages:[3,11,12,32,33],label:"回應文件：時間表、條款及接納門檻"},{documentId:offer,pages:[1,2],label:"要約文件寄發公告"}]});
  }
  function buildTHeadPending(c,docs) {
    const id="YS-20261110-2026111001061";
    if(docs?.[id]?.caseId!==c.id||c.stage?.status!=="active"||c.stage.date!=="2026-11-10"||!c.processEvents?.some(e=>e.date==="2026-09-11"&&e.state==="actual"&&e.evidence?.documentId===id)||!c.rules?.some(r=>r.code==="HKEX:PN15:3(f)"&&r.classificationStatus==="granted"&&r.evidence?.documentId===id))return null;
    const status="active",left="現有股權",right="擬議分拆與全球發售",badge="保密遞表已披露 · 待上市審批及備案";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:"PN15 建議分拆",outcomeBadge:badge}),[
      box("p","left",42,106,160,124,"listed","阿里巴巴","上市母公司 · 09988.HK"),
      box("s","left",444,106,161,124,"target","平頭哥","擬在主板發行H股"),
      box("a","right",724,72,310,70,"target","香港公開發售及國際配售","發售規模未定，預計仍為阿里附屬公司"),
      box("r2","right",724,164,310,75,"creditor","股東保證配額：獲豁免","港交所已授出 PN15 第3(f)段豁免"),
      box("r3","right",724,260,310,76,"creditor","9月11日保密遞交A1","11月10日由阿里巴巴對外披露")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:"持有100%股權"}]);
    const nodes=[{id:"p",role:"listed",name:"阿里巴巴",code:"09988.HK"},{id:"s",role:"target",name:"平頭哥（上海）技術股份有限公司"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"spin_off",modality:"cash",status,stageDate:c.stage.date,stageLabel:badge,caseArchetypeLabel:"PN15 建議分拆",caseModalityLabel:"擬全球發售",caseModalityShortLabel:"擬全球發售",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[{from:"p",to:"s",label:"100%",style:"solid"}]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:"平頭哥",toLabel:"全球發售投資者",headline:"擬發售平頭哥H股",proposedOrTerminated:true}],annotations:[{tag:"①",title:"待辦審批",body:"待港交所上市委員會批准、證監會完成備案，以及阿里巴巴和平頭哥作最終決定。"}],evidenceLinks:[{documentId:id,pages:[1,2,3],label:"首公告：申請日期、豁免與條件"}]});
  }
  function buildOmeInvengoStage(c,docs) {
    const o=c.code==="08285", a=o?"YS-20261026-ee42072b4dfa":"YS-20261026-8352e31b75c6",z=o?"YS-20261112-2b64aca0f620":"YS-20261116-6fb2d560c58c",date=o?"2026-11-12":"2026-11-16";
    if(![a,z].every(id=>docs?.[id]?.caseId===c.id)||c.stage?.status!=="active"||c.stage.date!==date||[...(c.events??[]),...(c.processEvents??[])].some(e=>e.state==="actual"&&(e.date>date||["completion","termination","offer_close"].includes(e.kind))))return null;
    const terms=o?[["block_pct",75,a],["ome_post_stake",40,a],["control_block",60060000,a],["offer_cash_cap",20020000,z],["offer_price",.143,z]]:[["subscription_i",20160000,a],["subscription_i_shares",12000000,a],["offer_price",1.68,a],["offer_cash_cap",56792820,a],["offer_shares_net",33805250,a]];
    if(!terms.every(([k,v,id])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===id)))return null;
    if(o&&!c.events?.some(e=>e.kind==="control_completion"&&e.date==="2026-10-26"&&e.state==="actual"&&e.evidence?.documentId===a))return null;
    const status="active",left=o?"已交割的舊股轉讓":"擬議新股認購",right=o?"已提出的餘股要約":"交割後才會觸發要約",badge=o?"75%控制權已交割 · 餘股要約進行中":"認購協議I待交割 · 要約尚未提出";
    const sell=o?"兩名原股東":"Web3 Meta",buy=o?"OME及一致行動方":"Invengo";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:o?"強制現金要約":"有條件強制現金要約",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,o?"seller":"listed",sell,o?"Yen Sheng、Summit Time":"發行人 · 08093.HK"),
      box("b","left",444,106,161,124,"buyer",buy,o?"OME單獨40%；一致行動合計75%":"認購人I · 1,200萬股"),
      box("a","right",724,72,310,70,"target",o?"餘下1.4億股 · 每股0.143港元":"擬要約價每股1.68港元",o?"全部接納的最高現金額2,002萬港元":"四份協議均完成情境"),
      box("r2","right",724,164,310,75,"creditor",o?"11月12日已寄發綜合文件":"扣除不接納承諾後",o?"預計12月3日下午4時截止":"3,380.5萬股；現金上限5,679.3萬港元"),
      box("r3","right",724,260,310,76,"creditor",o?"10月26日交割4.2億股":"截至11月16日，協議I仍待交割",o?"三筆股權轉讓合計6,006萬港元":"認購價款2,016萬港元單獨列示")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:o?"已轉讓4.2億股":"擬發行1,200萬股",proposedOrTerminated:!o}]);
    const nodes=[{id:"s",role:o?"seller":"listed",name:sell},{id:"b",role:"buyer",name:buy}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:o?"已交割控股權及餘股要約":"新股認購及可能要約",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:sell,toLabel:buy,headline:o?"已交割4.2億股，合計持75%":"擬認購1,200萬股，仍待先決條件",proposedOrTerminated:!o}],annotations:[{tag:"①",title:o?"持股拆分":"文件延期",body:o?"OME 40.00%、CSI Floorings 12.11%、GanLan Investments 22.89%。截至綜合文件，合計75%是已交割份額。":"執行人員表示有意同意延期至協議I完成後七日或2027年1月22日（以較早為準）。"}],evidenceLinks:[{documentId:a,pages:o?[2,3]:[4,6,7,22,24],label:o?"控制權交割及買方拆分":"新股認購與要約情境"},{documentId:z,pages:o?[4,14,17]:[2,4],label:o?"綜合文件：期限及要約上限":"先決條件及延期進展"}]});
  }
  function buildMinshangResumption(c,docs){
    const d="YS-20261124-2026112400334", l="YS-20261113-587317b57e27", i="YS-20260922-ce92bbddec66";
    if(![d,l,i].every(x=>docs?.[x]?.caseId===c.id)||c.stage?.date!=="2026-11-24"||c.stage.status!=="active"||!c.terms?.some(t=>t.key==="retained_equity_pct"&&t.value===50)||!c.processEvents?.some(e=>e.date==="2026-11-23"&&e.state==="actual"&&e.evidence?.documentId===d)||c.processEvents?.some(e=>e.state==="actual"&&e.date>c.stage.date))return null;
    const status="active",left="章程改組前後",right="反向收購及復牌要求",badge="已披露新增復牌條件 · 繼續停牌";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:"上市覆核維持裁定",outcomeBadge:badge}),[
      box("m","left",42,106,160,124,"listed","民商創科","上市公司 · 01632.HK"),
      box("s","left",444,106,161,124,"target","民商智惠","2025年8月起納入合併報表"),
      box("a","right",724,72,310,70,"target","原持50%股權，比例不變","改組後可委任5席中的3席"),
      box("r2","right",724,164,310,75,"creditor","按新上市申請人處理","須符合第14.54至14.57條及新上市要求"),
      box("r3","right",724,260,310,76,"creditor","繼續停牌","復牌指引期限：2028年1月1日")
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:"改組後取得董事會控制"}]);
    const nodes=[{id:"m",role:"listed",name:"民商創科",code:"01632.HK"},{id:"s",role:"target",name:"民商智惠"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"mixed",status,stageDate:c.stage.date,stageLabel:badge,caseArchetypeLabel:"反向收購監管裁定",caseModalityLabel:"章程改組",caseModalityShortLabel:"章程改組",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:"民商創科",toLabel:"民商智惠",headline:"董事會控制變更，持股比例不變"}],annotations:[{tag:"①",title:"額外指引",body:"11月23日收悉復牌指引，11月24日公告。股票自2026年7月2日起持續停牌。"}],evidenceLinks:[{documentId:i,pages:[2],label:"章程改組與財務合併"},{documentId:l,pages:[1,2,3],label:"上市覆核決定"},{documentId:d,pages:[1,2],label:"額外復牌指引及時間"}]});
  }
  function buildSigOrCoastal(c,docs){
    const t=c.code==="01905",a=t?"YS-20261023-7273926483f3":"YS-20261112-9c7186b680b6",z=t?"YS-20261113-5f45e1e4e3b7":"YS-20261125-2026112501689",date=t?"2026-11-13":"2026-11-25";
    const terms=t?[["domestic_offer_shares",1244831880],["h_offer_shares",2955171120],["domestic_offer_price",1.85],["h_offer_price",2.16]]:[["block_pct",36.93],["control_cash",11880000],["offer_price",.0776],["offer_cash_cap",20290524.49]];
    if(![a,z].every(x=>docs?.[x]?.caseId===c.id)||c.stage?.status!=="active"||c.stage.date!==date||!terms.every(([k,v])=>c.terms?.some(q=>q.key===k&&q.value===v&&q.evidence?.documentId===a))||[...(c.events??[]),...(c.processEvents??[])].some(e=>e.state==="actual"&&(e.date>date||["completion","termination","offer_close"].includes(e.kind))))return null;
    if(!t&&!c.events?.some(e=>e.date==="2026-08-24"&&e.kind==="control_completion"&&e.state==="actual"))return null;
    const status="active",left=t?"兩項擬議部分要約":"控制權股份已交割",right=t?"股份範圍與寄發條件":"餘股要約與獨立意見",badge=t?"先決條件待滿足 · 綜合文件未寄發":"已委任獨立財顧 · 待綜合文件";
    const seller=t?"境內股東及H股股東":"接管人代原股東出售",buyer=t?"上海國際集團兩家附屬公司":"Deep Water Strategy";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:t?"有先決條件":"強制有條件現金要約",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,"seller",seller,t?"兩個股份類別":"原持股方 Coastal International"),
      box("b","left",444,106,161,124,"buyer",buyer,t?"境內股與H股由不同實體提出":"買方及餘股要約人"),
      box("a","right",724,72,310,70,"target",t?"12.448億境內股 · 每股1.85元人民幣":"已買入36.93% · 1,188萬港元",t?"要約方：上海國有資產經營有限公司":"約1.531億股，8月24日交割"),
      box("r2","right",724,164,310,75,"creditor",t?"29.552億H股 · 每股2.16港元":"餘股每股0.0776港元",t?"要約方：上海國際集團（香港）":"約2.615億股；現金上限2,029.1萬港元"),
      box("r3","right",724,260,310,76,"creditor",t?"綜合文件寄發時間待定":"11月25日委任 Ample Capital",t?"先決條件最後期限目前為2027年6月23日":"為獨立董事委員會提供意見")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:t?"擬收購部分股份":"已完成轉讓股份",proposedOrTerminated:t}]);
    const nodes=[{id:"s",role:"seller",name:seller},{id:"b",role:"buyer",name:buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:t?"境內股及H股部分要約":"股權交割及餘股要約",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:seller,toLabel:buyer,headline:t?"境內股及H股擬議部分要約":"已完成36.93%股份轉讓",proposedOrTerminated:t}],annotations:[{tag:"①",title:t?"寄發安排":"現時進展",body:t?"執行人員表示有意同意延期：在先決條件全部達成日或最後期限（以較早者為準）後不遲於七日寄發。":"餘股要約以持有超過半數投票權為接納條件。法定意見擬隨綜合文件刊發。"}],evidenceLinks:[{documentId:a,pages:t?[2,3,6]:[6,7,12,13,14],label:t?"股份類別、數量及價格":"控股股份交割與餘股要約條件"},{documentId:z,pages:[1,2],label:t?"寄發時限更新":"獨立財務顧問委任"}]});
  }
  const VERIFIED_NOV27_VOTES = {"HK-00217-20261020-dunde-mining-leaseback":{"doc":"YS-20261127-00217-dunde-mining-leaseback-poll","url":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1127/202611271305.pdf","pages":[2],"label":"股東批准 · 待付款起租","res":"1"},"HK-00217-20261021-xinte-wengniuteqi-leasebacks":{"doc":"YS-20261127-00217-xinte-wengniuteqi-leasebacks-poll","url":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1127/202611271305.pdf","pages":[2],"label":"兩項回租均獲批准 · 待付款起租","res":"3、4"},"HK-00217-20261022-jinmei-lease-assignment":{"doc":"YS-20261127-00217-jinmei-lease-assignment-poll","url":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1127/202611271305.pdf","pages":[2],"label":"股東批准 · 待租賃資產轉讓","res":"2"},"HK-00217-20261022-huadian-five-leasebacks":{"doc":"YS-20261127-00217-huadian-five-leasebacks-poll","url":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1127/202611271305.pdf","pages":[3],"label":"五項回租均獲批准 · 待付款起租","res":"5–9"},"HK-01835-20260615-ningbo-jiaxing-lp":{"doc":"YS-20261127-01835-ningbo-jiaxing-lp-poll","url":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1127/202611271118.pdf","pages":[2],"label":"基金份額收購獲批准 · 待交割","res":"1"},"HK-01835-20260630-3g-h-share-control":{"doc":"YS-20261127-01835-3g-h-share-control-poll","url":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1127/202611271118.pdf","pages":[3,4],"label":"認購及配售獲批准 · 未觸發要約","res":"2、3"}};
  function verifiedNov27Vote(c,docs) { const x=VERIFIED_NOV27_VOTES[c.id]; return x && c.stage?.date==="2026-11-27" && c.stage.eventKind==="vote" && docs?.[x.doc]?.caseId===c.id && docs[x.doc].url===x.url && c.events?.some(e=>e.kind==="vote"&&e.date==="2026-11-27"&&e.state==="actual"&&e.evidence?.documentId===x.doc) ? x : null; }
  function buildRealwayOrReceivers(c,docs) {
    const poll=verifiedNov27Vote(c,docs);
    const q=c.code==="01835", a=q?"YS-20260630-d8b64e338b3b":"YS-20260715-9f05f989cd99",z=q?"YS-20261112-2026111200660":"YS-20261116-45425044ba9c",date=q?(poll?"2026-11-27":"2026-11-12"):"2026-11-16";
    const terms=q?[["domestic_cash",31293000],["domestic_shares",45000000],["new_h_subscription",120000000],["h_offer_price",.8],["h_offer_max",70672000]]:[["block_shares",86485742],["block_pct",40.37]];
    if(![a,z,...(!q?["YS-20260116-2026011601867"]:[])].every(x=>docs?.[x]?.caseId===c.id)||c.stage?.status!=="active"||c.stage.date!==date||!terms.every(([k,v])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===a))||[...(c.events??[]),...(c.processEvents??[])].some(e=>e.state==="actual"&&(e.date>date||["completion","termination","offer_close"].includes(e.kind)||(e.kind==="vote"&&!(poll&&e.date===date)))))return null;
    const status="active",left=q?"擬收購境內股份及認購H股":"接管已抵押股份",right=q?"現金要約在交割後才觸發":"可能的控股股份轉讓",badge=q?(poll?poll.label:"通函已刊發 · 11月27日擬表決"):"接管人正物色買家 · 未簽約";
    const seller=q?"原境內股東及瑞威資管":"聯合接管人",buyer=q?"3G及相關收購方":"潛在買家";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:q?"擬議股份交易":"第3.7條月度更新",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,q?"seller":"creditor",seller,q?"境內舊股及新H股":"Lai Wing Lun、Osman Arab"),
      box("b","left",444,106,161,124,"buyer",buyer,q?"境內股份由相關買方收購":"買家尚未披露"),
      box("a","right",724,72,310,70,"target",q?"4,500萬股境內舊股":"接管8,648.6萬股抵押股份",q?"擬支付人民幣3,129.3萬元":"佔7月公告所列股本約40.37%"),
      box("r2","right",724,164,310,75,"creditor",q?"擬認購1.5億股新H股":"接管人正與意向方磋商",q?"合計1.2億港元；另有特別授權配售":"截至11月16日未簽具約束力協議"),
      box("r3","right",724,260,310,76,"creditor",q?"餘下8,834萬股H股：每股0.80港元":"是否轉讓及作出要約仍待確定",q?"擬議現金上限7,067.2萬港元":"7月15日刊發第3.7條公告")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q?"境內轉讓及H股認購":"商議轉讓抵押股份",proposedOrTerminated:true}]);
    const nodes=[{id:"s",role:q?"seller":"creditor",name:seller},{id:"b",role:"buyer",name:buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:q?"cash":"mixed",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:q?"認購、收購及可能強制現金要約":"抵押股份接管",caseModalityLabel:q?"現金":"對價待定",caseModalityShortLabel:q?"現金":"待定",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:seller,toLabel:buyer,headline:q?"擬轉讓境內股及認購新H股":"接管人仍尋找買家",proposedOrTerminated:true}],annotations:[{tag:"①",title:q?"股東表決":"1月接管披露",body:q?(poll?"獨立股東通過認購，配售議案亦通過。境內股份收購及新股交易尚待交割；可能要約仍未觸發。":"公司通函已刊發，股東會定於11月27日。要約從屬於協議交割，綜合要約文件另行寄發。"):"1月8日委任接管人，1月16日披露；股數相同，佔公告當時股本約46.35%。"}],evidenceLinks:[{documentId:a,pages:q?[2,3,5,25]:[1,2],label:q?"境內轉讓、新H股與要約條款":"7月股份基準及第3.7條公告"},{documentId:z,pages:[1,2],label:q?"股東特別大會通知":"11月16日磋商進展"},...(poll?[{documentId:poll.doc,pages:poll.pages,label:"11月27日認購及配售表決"}]:[]),...(!q?[{documentId:"YS-20260116-2026011601867",pages:[1],label:"1月接管任命及持股基準"}]:[])]});
  }
  function buildFoxconnOrLens(c,docs) {
    const f=c.code==="01037", a=f?"YS-20260727-98e48e98a0dc":"YS-20260518-02256a4ed351",z=f?"YS-20261127-01037-vietnam-clearance":"YS-20261106-23bcdca85637",date=f?"2026-11-27":"2026-11-06";
    const ts=f?[["block_pct",33.85],["block_shares",239050141],["control_cash",152370559],["offer_price",.6374],["offer_cash_max",272337631.88]]:[["block_pct",27.81],["block_shares",333713032],["block_cash",734168670.4],["offer_price",2.2],["offer_cash_max",1905849908.6]];
    if(![a,z].every(x=>docs?.[x]?.caseId===c.id)||c.stage?.status!=="active"||c.stage.date!==date||(f&&!(docs[z].url==="https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1127/2026112700217.pdf"&&c.events?.some(e=>e.kind==="antitrust_clearance"&&e.state==="actual"&&e.date==="2026-11-26"&&e.evidence?.documentId===z)))||!ts.every(([k,v])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===a))||[...(c.events??[]),...(c.processEvents??[])].some(e=>e.state==="actual"&&(e.date>date||["completion","control_completion","termination","dispatch","offer_close"].includes(e.kind))))return null;
    const status="active",left="擬收購現有股份",right="餘股要約須待交割",badge=f?"越南反壟斷已獲批准 · 待其餘交割條件":"商務審批已取得 · 交割仍待其他條件";
    const seller=f?"FSK及FDG Fund":"協議賣方",buyer=f?"Foxconn (Far East)":"藍思科技";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:f?"可能強制現金要約":"擬自願有條件要約",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,"seller",seller,f?"協議持有的舊股":"協議持有的舊股"),
      box("b","left",444,106,161,124,"buyer",buyer,"擬買方及餘股要約方"),
      box("a","right",724,72,310,70,"target",f?"擬收購雲智匯科技33.85%":"擬收購巨騰國際27.81%",f?"約2.391億股 · 協議對價1.524億港元":"約3.337億股 · 協議對價7.342億港元"),
      box("r2","right",724,164,310,75,"creditor",f?"擬餘股每股0.6374港元":"擬餘股每股2.20港元",f?"購股權全行權情境：上限2.723億港元":"全數接納情境：上限19.058億港元"),
      box("r3","right",724,260,310,76,"creditor",f?"越南反壟斷批准已取得":"發改審核仍在進行",f?"11月26日獲批；有條件預計12月3日交割":"取得發改批准後再辦外匯申報")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:"擬轉讓舊股",proposedOrTerminated:true}]);
    const nodes=[{id:"s",role:"seller",name:seller},{id:"b",role:"buyer",name:buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:f?"協議收購及可能強制要約":"協議收購及擬自願要約",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:seller,toLabel:buyer,headline:f?"擬轉讓約2.391億股":"擬轉讓約3.337億股",proposedOrTerminated:true}],annotations:[{tag:"①",title:"最新先決條件進展",body:f?"11月26日反壟斷條件達成；其餘條件仍須達成或獲豁免。綜合要約於交割後才作出。":"11月6日公告確認協議條件1、7及12已達成；其餘未達成。"}],evidenceLinks:[{documentId:a,pages:f?[2,3,4,11]:[2,3,5,10,12],label:"初始公告：協議及可能要約條款"},{documentId:z,pages:[1,2],label:"最新公布的審批及先決條件"}]});
  }
  function buildStrongOrLfg(c,docs) {
    const s=c.code==="00852",a=s?"YS-20260225-d4cf56a4292e":"YS-20260109-6e0a7fb6ec51",z=s?"YS-20261103-a35c4dfe466d":"YS-20261030-79d63f5ef2ae",date=s?"2026-11-03":"2026-10-30";
    const ts=s?[["block_pct",49.06],["block_shares",1041746000]]:[["control_total",179695312.8],["control_cash_component",120000000],["control_note_face",59695312.8],["block_shares",299492188],["offer_price",.6],["offer_total_cash_no_exercise",118788430.05]];
    if(![a,z].every(x=>docs?.[x]?.caseId===c.id)||c.stage?.status!=="active"||c.stage.date!==date||!ts.every(([k,v])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===a))||[...(c.events??[]),...(c.processEvents??[])].some(e=>e.state==="actual"&&(e.date>date||["completion","control_completion","termination","dispatch","offer_close"].includes(e.kind))))return null;
    const status="active",left="股權買賣協議已簽",right=s?"法院及融資安排":"監管批准及寄發時限",badge=s?"未交割 · 待BVI法院聆訊":"持牌機構控制權變更待證監會批准";
    const seller=s?"Forever Winner":"原控股股東",buyer=s?"Speed Success":"Fortune Origin";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:"擬議控股權轉讓",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,"seller",seller,s?"由聯合清盤人處理":"協議轉讓全部所持股份"),
      box("b","left",444,106,161,124,"buyer",buyer,"協議買方"),
      box("a","right",724,72,310,70,"target",s?"擬買入強石化49.06%":"擬買入LFG約61.43%",s?"約10.417億股":"約2.995億股 · 合計1.797億港元"),
      box("r2","right",724,164,310,75,"creditor",s?"BVI法院聆訊定於1月25至27日":"現金1.2億＋票據5,969.5萬港元",s?"2027年 · BVI當地日期":"交割後才須作出股份及購股權要約"),
      box("r3","right",724,260,310,76,"creditor",s?"最後截止延至2027年2月28日":"買賣協議最後期限延至11月30日",s?"要約融資仍在安排":"綜合文件延期已獲同意")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:"擬轉讓現有股份",proposedOrTerminated:true}]);
    const nodes=[{id:"s",role:"seller",name:seller},{id:"b",role:"buyer",name:buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"mixed",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:"擬議控股權轉讓",caseModalityLabel:s?"待正式要約文件":"現金及票據",caseModalityShortLabel:s?"待定":"現金及票據",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:seller,toLabel:buyer,headline:s?"擬轉讓約10.417億股":"擬轉讓約2.995億股",proposedOrTerminated:true}],annotations:[{tag:"①",title:s?"要約狀態":"綜合文件",body:s?"11月3日公告仍未交割，可能提出強制性全面要約。":"最新獲准寄發時限為交割後七日或12月8日，以較早者為準。"}],evidenceLinks:[{documentId:a,pages:s?[1,2]:[2,3,5],label:"首公告：股份範圍及交易條款"},{documentId:z,pages:[2,3],label:"法院／監管及寄發進展"}]});
  }
  function buildFinelandOrFuShou(c,docs){
    const f=c.code==="09978",z=f?"YS-20261105-ed17342fa850":"YS-20261016-fdd16c4f8d4a",a=f?"YS-20261008-59c69a3f1d40":"YS-20260918-dfbc0d43d4c5",later="YS-20261113-0552d922a0f2",date=f?"2026-11-05":"2026-10-16";
    const ts=f?[["accepted_shares",1304000,z],["accepted_gross",182560,z],["control_pct",50.01,a],["post_subscription_offeror_pct",58.30,later],["post_subscription_public_float",41.11,later]]:[["accepted_shares",4592696,z],["accepted_gross",459269.6,z],["post_offer_concert_pct",.2,z],["offer_max_cash",11500000,a]];
    if(![a,z,...(f?[later]:[])].every(x=>docs?.[x]?.caseId===c.id)||c.stage?.status!=="closed"||c.stage.date!==date||!c.events?.some(e=>e.date===date&&e.state==="actual"&&e.kind==="completion"&&e.evidence?.documentId===z)||!ts.every(([k,v,d])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===d)))return null;
    const status="closed",left=f?"已交割的控股股份":"自願現金部分要約",right=f?"餘股接納及其後發行":"實際接納股份",badge=f?"11月5日餘股要約截止 · 11月13日另發新股":"10月16日截止 · 有效接納4,592,696股";
    const seller=f?"三名控股股份賣方":"接受要約的股東",buyer=f?"Yoncan":"龔海林";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:f?"強制現金要約":"自願部分要約",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,"seller",seller,f?"已轉讓合計2.00044億股":"10份有效接納"),
      box("b","left",444,106,161,124,"buyer",buyer,f?"10月8日取得50.01%":"每股0.10港元"),
      box("a","right",724,72,310,70,"target",f?"餘股要約有效接納130.4萬股":"有效接納4,592,696股",f?"每股0.14港元；應付18.256萬港元":"應付約45.927萬港元"),
      box("r2","right",724,164,310,75,"creditor",f?"11月5日結果：Yoncan 50.34%":"要約上限1.15億股",f?"公告的要約截止口徑":"有效接納全數承購，佔總股本約0.20%"),
      box("r3","right",724,260,310,76,"creditor",f?"11月13日：Yoncan 58.30%":"要約已截止",f?"另行發行後公眾持股41.11%":"結果公告列明其後結算安排")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:f?"已交割2.00044億股":"有效接納4,592,696股"}]);
    const nodes=[{id:"s",role:"seller",name:seller},{id:"b",role:"buyer",name:buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:f?"控股交割、要約及其後發行":"自願部分要約",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:seller,toLabel:buyer,headline:f?"已交割控股股份":"已披露有效接納股數"}],annotations:[{tag:"①",title:f?"認購與認股權證":"接納與結算",body:f?"11月13日另行完成3.7億股認購及7,700萬份認股權證發行。發行權證無現金對價，0.50港元為行權價。":"全數承購有效接納；應付價款按每股0.10港元計算。結果公告列明於截止後七個營業日內結算。"}],evidenceLinks:[{documentId:a,pages:[1,2],label:f?"原控股股份交割":"要約文件"},{documentId:z,pages:[2,3],label:"要約截止結果及結算安排"},...(f?[{documentId:later,pages:[2,3,4],label:"認購及認股權證發行結果"}]:[])]});
  }
  function buildSuperlandOrMs(c,docs){
    const h=c.code==="00368",a=h?"YS-20260804-9085eceeba96":"YS-20260505-259a5379b74e",z=h?"YS-20261015-d6e31a515172":"YS-20260921-fd5fa3f0d4a5",n="YS-20261112-b376817d8b65",date=h?"2026-10-15":"2026-09-21";
    const terms=h?[["control_shares",600000000,a],["control_cash",225000000,a],["accepted_shares",48580000,z],["accepted_gross",18217500,z],["public_float_restored",25,n]]:[["block_shares",75000000,a],["control_cash",60000000,a],["accept_shares",26000,z],["options_count",600000,z],["offer_actual_cash",92800,z],["public_float",27.11,z]];
    if(![a,z,...(h?[n]:[])].every(x=>docs?.[x]?.caseId===c.id)||c.stage?.status!=="closed"||c.stage.date!==date||!c.events?.some(e=>e.date===date&&e.kind==="completion"&&e.state==="actual"&&e.evidence?.documentId===z)||!terms.every(([k,v,d])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===d)))return null;
    const status="closed",left="已交割控股股份",right=h?"要約接納及公眾持股恢復":"股份與購股權要約結算",badge=h?"10月15日要約截止 · 11月12日披露恢復公眾持股":"9月21日要約截止 · 維持上市";
    const seller=h?"原股東":"Ching Wai Holdings",buyer=h?"Grand Junction及一致行動方":"L.V.E.P. Holdings";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:"強制現金要約",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,"seller",seller,h?"交割股份合計6億股":"轉讓7,500萬股"),
      box("b","left",444,106,161,124,"buyer",buyer,h?"合計取得75%":"取得約36.69%"),
      box("a","right",724,72,310,70,"target",h?"餘股接納4,858萬股":"接納26,000股 · 每股0.80港元",h?"每股0.375港元；應付1,821.75萬港元":"股份要約應付20,800港元"),
      box("r2","right",724,164,310,75,"creditor",h?"要約後一致行動集團81.07%":"接納60萬份購股權",h?"截至11月12日配售4,858萬股":"每份註銷價0.12港元；應付72,000港元"),
      box("r3","right",724,260,310,76,"creditor",h?"公眾持股恢復至25.00%":"兩項要約合計應付92,800港元",h?"公司11月12日公告":"披露當日公眾持股約27.11%")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:h?"已交割 · 2.25億港元":"已交割 · 6,000萬港元"}]);
    const nodes=[{id:"s",role:"seller",name:seller},{id:"b",role:"buyer",name:buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:h?"控股轉讓、要約及恢復公眾持股":"股份及購股權要約",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:seller,toLabel:buyer,headline:h?"控股交易合計6億股":"控股交易7,500萬股"}],annotations:[{tag:"①",title:h?"公眾持股":"結算",body:h?"配售前公眾持股為約18.93%，配售後25.00%；配售是已持有股份的轉讓。":"股份及購股權各按接納數量計算應付；購股權註銷並未發行新股。"}],evidenceLinks:[{documentId:a,pages:[2,3],label:"控股股份交割"},{documentId:z,pages:h?[2,3,4]:[2,3,5],label:"實際接納、金額及結算"},...(h?[{documentId:n,pages:[1],label:"恢復公眾持股"}]:[])]});
  }
  function buildHkeTwoDisposals(c,docs){
    const f="YS-20260929-2026092902043",z="YS-20261105-2026110501200";
    if(![f,z].every(x=>docs?.[x]?.caseId===c.id)||c.stage?.date!=="2026-11-05"||c.stage?.status!=="active"||c.events?.some(e=>e.state==="actual"&&["completion","termination","dispatch"].includes(e.kind))||![["true_victor_price",250260000],["wonder_time_price",500000]].every(([k,v])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===f)))return null;
    const status="active",left="兩項股權及股東貸款出售",right="原幣對價與交割條件",badge="兩項協議已簽 · 通函待寄發";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:"兩項交易互為條件",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,"listed","HKE Holdings","上市公司 · 擬出售方"),
      box("b","left",444,106,161,124,"buyer","兩名關連買方","Finfra、Nexafin"),
      box("a","right",724,72,310,70,"target","True Victor：2.5026億港元","買方 Finfra；按交割淨資產調整"),
      box("r2","right",724,164,310,75,"creditor","Wonder Time：50萬港元","買方 Nexafin；含股權及股東貸款"),
      box("r3","right",724,260,310,76,"creditor","待獨立股東批准","True Victor 另待香港證監會批准")
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:"擬轉讓股權及股東貸款",proposedOrTerminated:true}]);
    const nodes=[{id:"s",role:"listed",name:"HKE Holdings",code:"01726.HK"},{id:"b",role:"buyer",name:"Finfra、Nexafin"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"disposal",modality:"cash",status,stageDate:c.stage.date,stageLabel:badge,caseArchetypeLabel:"主要及關連出售",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:"HKE Holdings",toLabel:"兩名關連買方",headline:"擬出售兩組股權及股東貸款",proposedOrTerminated:true}],annotations:[{tag:"①",title:"通函時間",body:"11月5日公告預計於11月30日或之前寄發；股東表決及交割尚待。"}],evidenceLinks:[{documentId:f,pages:[1,2,3,4,18,19],label:"兩項協議及交易對手"},{documentId:z,pages:[1],label:"通函寄發時間更新"}]});
  }
  function buildContelOrDida(c,docs){
    const ct=c.code==="01912",a=ct?"YS-20260729-b16dccac8d12":"YS-20260731-ce564e940acb",z=ct?"YS-20260911-81524528ed9f":"YS-20260821-b40312a83887",n=ct?"YS-20261106-fcd20ae5f44e":"YS-20261120-2dab9030d213",date=ct?"2026-09-11":"2026-08-21";
    const ts=ct?[["subscription_qty",271230595,a],["placing_qty",58205000,a],["accept_shares",80849500,z],["offer_actual_cash",29510067.5,z],["float_restored",25.01,n]]:[["special_dividend",1.1745,a],["accepted_shares",910755954,z],["accepted_pct",88.74,z],["float_as_of_20261120",11.26,n]];
    if(![a,z,n].every(id=>docs?.[id]?.caseId===c.id)||c.stage?.status!=="closed"||c.stage.date!==date||!c.events?.some(e=>e.date===date&&e.kind==="completion"&&e.state==="actual"&&e.evidence?.documentId===z)||!ts.every(([k,v,id])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===id)))return null;
    const status="closed",left=ct?"新股認購及配售已完成":"自願現金要約",right=ct?"其後要約及公眾持股":"收購結果、股息與公眾持股",badge=ct?"要約已截止 · 公眾持股恢復至25.01%":"要約已截止 · 11月20日公眾持股11.26%";
    const s=ct?"康特隆科技":"接受要約的股東",b=ct?"莊嚴投資":"eLong（同程旅行附屬公司）";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:ct?"強制現金要約":"自願現金要約",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,ct?"listed":"seller",s,ct?"向認購人及承配人發行新股":"有效接納約9.108億股"),
      box("b","left",444,106,161,124,"buyer",b,ct?"認購約2.712億股":"每股要約價1.3875港元"),
      box("a","right",724,72,310,70,"target",ct?"另行完成新股配售5,820.5萬股":"有效接納佔已發行股本88.74%",ct?"與認購均為發行新股":"8月21日截止結果"),
      box("r2","right",724,164,310,75,"creditor",ct?"餘股要約接納8,084.95萬股":"特別股息每股1.1745港元",ct?"應付約2,951.0萬港元":"由嘀嗒出行派付；按7月20日名冊"),
      box("r3","right",724,260,310,76,"creditor",ct?"公眾持股由23.66%恢復至25.01%":"11月20日披露公眾持股11.26%",ct?"11月5至6日於市場出售620萬股":"公司預計2027年5月底恢復")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:ct?"已發行認購新股":"披露有效接納"}]);
    const nodes=[{id:"s",role:ct?"listed":"seller",name:s},{id:"b",role:"buyer",name:b}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:ct?"新股發行、要約及公眾持股":"自願全面現金要約",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:s,toLabel:b,headline:ct?"已發行認購新股":"披露有效接納股份"}],annotations:[{tag:"①",title:ct?"後續公眾持股":"特別股息",body:ct?"11月5日及6日分別在市場出售300萬股及320萬股。":"7月20日已登記股東按公司安排獲派特別股息，資格不取決於是否接受要約。"}],evidenceLinks:[{documentId:a,pages:ct?[1,2]:[16],label:ct?"認購與配售完成":"每股要約款及股息資格"},{documentId:z,pages:[2,3],label:"要約結果及結算條件"},{documentId:n,pages:ct?[1]:[1,2],label:"最新公眾持股披露"}]});
  }
  function buildIdtAndSg(c,docs){
    const it=c.code==="00167",a=it?"YS-20260629-2b747120c152":"YS-20260604-245ca5450b09",m=it?a:"YS-20260623-5a3666fbebc0",z=it?"YS-20260918-c4d47ba98f2b":"YS-20260814-950ba8108b42",date=it?"2026-09-18":"2026-08-14",close=it?"2026-06-13":"2026-06-23";
    const ts=it?[["subscription_cash",43895935,a],["assignment_cash",109502831.3,a],["accept_shares",77416,z],["offer_price",.5941,z],["public_float",39.87,z]]:[["block_cash",198519540,a],["block_shares",23970000,m],["offer_price",8.323,a],["accepted_shares",2000,z],["accepted_cash",16646,z]];
    if(![a,m,z].every(id=>docs?.[id]?.caseId===c.id)||c.stage?.status!=="closed"||c.stage.date!==date||!c.events?.some(e=>e.date===date&&e.kind==="completion"&&e.state==="actual"&&e.evidence?.documentId===z)||!c.events?.some(e=>e.date===close&&e.kind==="control_completion"&&e.state==="actual"&&e.evidence?.documentId===m)||!ts.every(([k,v,id])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===id)))return null;
    const status="closed",left=it?"中間控股公司認購":"控股股份交割",right="餘股要約結果",badge=it?"要約截止 · 公眾持股39.87%":"要約截止 · 公眾持股25.06%";
    const s=it?"弘立（Hunglap）":"蔡敬庭及JC International",b=it?"Horizon Heights":"香港偉業軟件";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:"強制現金要約",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,it?"target":"seller",s,it?"持有萬威國際39.19%股份":"合計出售2,397萬股"),
      box("b","left",444,106,161,124,"buyer",b,it?"認購價4,389.6萬港元":"對價約1.985億港元"),
      box("a","right",724,72,310,70,"target",it?"另承接股東貸款約1.095億港元":"有效接納2,000股；對價16,646港元",it?"6月13日與新股認購同時交割":"8月14日要約截止，每股8.323港元"),
      box("r2","right",724,164,310,75,"creditor",it?"有效接納77,416股":"要約方計及接納持2,397.2萬股",it?"9月18日要約截止，每股0.5941港元":"佔已發行股本約74.91%"),
      box("r3","right",724,260,310,76,"creditor",it?"要約方及一致行動人士持60.13%":"公眾持有約25.06%",it?"公眾持股39.87%，以妥為登記為準":"以接納股份妥為登記為準")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:it?"認購後持弘立89.39%":"交割上市公司約74.91%"}]);
    const nodes=[{id:"s",role:it?"target":"seller",name:s},{id:"b",role:"buyer",name:b}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:it?"控股公司認購與股東貸款承接":"控股股權轉讓",caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:s,toLabel:b,headline:it?"發行中間控股公司新股":"控股股份交割"}],annotations:[{tag:"①",title:it?"萬威國際持股":"控股交易對價",body:it?"要約前，Horizon Heights直接持有108,825,857股，並透過控制弘立（Hunglap）持有203,777,563股。":"控股交易對價包含6,100萬港元延期付款；餘股要約為另一筆對價。"}],evidenceLinks:[{documentId:a,pages:[2,3],label:it?"認購及貸款承接":"控股交易對價"},...(!it?[{documentId:m,pages:[1,2],label:"控股股份交割"}]:[]),{documentId:z,pages:it?[2,3,4]:[2,3,4,5],label:"接納結果及公眾持股"}]});
  }
  function buildMaxicityAndMegain(c,docs){
    const g=c.code==="02295",a=g?"YS-20260702-1c7efccaa83b":"YS-20260123-cde1a7442ed3",z=g?"YS-20260813-42f5c00e6fbf":"YS-20260812-2516956fef5b",n=g?"YS-20260914-5ffb247dcb59":z,date=g?"2026-08-13":"2026-08-12",control=g?"2026-06-22":"2026-07-16";
    const ts=g?[["block_cash",196350000,a],["block_shares",300000000,a],["accepted_shares",33980000,z],["accepted_cash",22239910,z],["public_float_pct",16.5,z],["post_restoration_public_float_pct",25,n]]:[["block_cash",105500000,a],["subscription_cash",63287500,a],["accepted_shares",28050,z],["accepted_cash",17110.5,z]];
    if(![a,z,n].every(id=>docs?.[id]?.caseId===c.id)||c.stage?.status!=="closed"||c.stage.date!==date||!c.events?.some(e=>e.date===date&&e.kind==="completion"&&e.state==="actual"&&e.evidence?.documentId===z)||!c.events?.some(e=>e.date===control&&e.kind==="control_completion"&&e.state==="actual"&&e.evidence?.documentId===(g?a:z))||!ts.every(([k,v,id])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===id)))return null;
    const status="closed",left=g?"控股股份交割":"舊股收購及新股認購",right=g?"要約結果及公眾持股":"要約結果及持股",badge=g?"要約已截止 · 公眾持股恢復至25%":"要約已截止 · 公眾持股29.42%";
    const s=g?"峻峰投資":"美佳音三名原股東",b=g?"綠盛環球能源":"GEEHY International";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:"強制現金要約",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,"seller",s,g?"出售豐城控股3億股":"出售2.11億股舊股"),
      box("b","left",444,106,161,124,"buyer",b,g?"現金對價1.9635億港元":"舊股對價1.055億港元"),
      box("a","right",724,72,310,70,"target",g?"有效接納3,398萬股":"另認購1.0375億股新股",g?"要約應付2,223.991萬港元":"認購額6,328.75萬港元"),
      box("r2","right",724,164,310,75,"creditor",g?"要約截止時公眾持股約16.50%":"有效接納28,050股",g?"8月13日結果：公眾持6,602萬股":"每股0.61港元，共17,110.50港元"),
      box("r3","right",724,260,310,76,"creditor",g?"9月14日披露公眾持股恢復至25%":"計入接納後持股約50.57%",g?"其後另向獨立人士配售3,398萬股":"公眾持股29.42%；以妥為登記為準")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:g?"交割已發行股本75%":"7月16日完成舊股及認購"}]);
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:b}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:s,toLabel:b,headline:g?"控股股份交割":"現金收購原股東股份"}],annotations:[{tag:"①",title:g?"公眾持股恢復":"兩道控股交易",body:g?"公眾持股在8月13日要約結果中為6,602萬股；其後的3,398萬股配售令公眾持股增至1億股。":"舊股賣方為Global Megain Technology、Good Loyal及Lam Tsz Leung；買賣與新股認購均於7月16日完成。"}],evidenceLinks:[{documentId:a,pages:g?[2,5]:[2,3],label:"控股交易條款"},{documentId:z,pages:[2,3,4],label:"要約結果及公眾持股"},...(g?[{documentId:n,pages:[1],label:"恢復公眾持股"}]:[])]});
  }
  function buildChangbaishanOrSmc(c,docs){
    const sm=c.code==="02381",a=sm?"YS-20260908-c879a6b00171":"YS-20260911-8b411f937c83",z=sm?"YS-20261006-d54a8fbc4419":"YS-20261008-4db25c48a3d8",n=sm?"YS-20261007-smc-public-float":z,div="YS-20260813-da15fbbc4b7e",date=sm?"2026-10-06":"2026-10-08",control=sm?"2026-09-08":"2026-09-11";
    const ts=sm?[["control_cash",154000000,"YS-20260731-48f12b579701"],["accepted_shares",1100000,z],["accepted_gross",121000,z],["issuer_dividend_per_share",.04575,div],["restored_public_float_pct",29.945,n]]:[["subscription_setoff",39000000,a],["creditor_scheme_shares_issued",4742453691,a],["accepted_shares",139713,z],["accepted_gross",20956.95,z]];
    if(![a,z,n,...(sm?[div]:[])].every(id=>docs?.[id]?.caseId===c.id)||c.stage?.status!=="closed"||c.stage.date!==date||!c.events?.some(e=>e.date===date&&e.kind==="completion"&&e.state==="actual"&&e.evidence?.documentId===z)||!c.events?.some(e=>e.date===control&&e.kind==="control_completion"&&e.state==="actual"&&e.evidence?.documentId===a)||!ts.every(([k,v,id])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===id)))return null;
    const status="closed",left=sm?"控股股份交割":"債務重組與股份認購",right=sm?"餘股要約與公眾持股":"債權人安排及餘股要約",badge=sm?"要約截止 · 公眾持股恢復至29.945%":"重組已完成 · 餘股要約已截止";
    const s=sm?"蜆壳電器控股":"中國長白山國際",b=sm?"星兆控股":"廣澤集團（香港）";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:"強制現金要約",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,sm?"seller":"listed",s,sm?"出售SMC Electric 14億股":"發行2.6億股認購股份"),
      box("b","left",444,106,161,124,"buyer",b,sm?"對價1.54億港元":"3,900萬港元融資款抵銷認購價"),
      box("a","right",724,72,310,70,"target",sm?"有效接納110萬股":"計劃公司獲發約47.42億股",sm?"每股0.11港元，共12.1萬港元":"代表計劃債權人持有"),
      box("r2","right",724,164,310,75,"creditor",sm?"公司宣派特別股息每股0.04575港元":"有效接納139,713股",sm?"以8月31日名冊及股份交割為準":"每股0.15港元，共20,956.95港元"),
      box("r3","right",724,260,310,76,"creditor",sm?"公眾持股由24.945%回升至29.945%":"一致行動集團披露權益約57.07%",sm?"賣方保留1億股於10月7日計入公眾持股":"計及信託持股權益；公眾持股42.93%")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:sm?"9月8日交割70%股權":"9月11日發股及抵銷"}]);
    const nodes=[{id:"s",role:sm?"seller":"listed",name:s},{id:"b",role:"buyer",name:b}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:sm?"cash":"mixed",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:sm?"現金":"股份及現金",caseModalityShortLabel:sm?"現金":"股份及現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:s,toLabel:b,headline:sm?"控股股份交割":"發行認購股份"}],annotations:[{tag:"①",title:sm?"公眾持股恢復":"計劃股份受益權",body:sm?"賣方在董事辭任後不再屬核心關連人士，其原已持有的股份自該日起納入公眾持股。":"廣澤香港及嘉益的約26.91億股信託受益權已計入計劃公司所持股份。"}],evidenceLinks:[{documentId:a,pages:[2],label:sm?"控股權交割":"重組完成及信託持股"},{documentId:z,pages:sm?[2,3,4]:[2,3,8],label:"要約結果及公眾持股"},...(sm?[{documentId:div,pages:[1],label:"特別股息"},{documentId:n,pages:[8],label:"恢復公眾持股"}]:[])]});
  }
  function buildTontineOrMaxsight(c,docs){
    const ms=c.code==="08483",a=ms?"YS-20260727-60a1957f8e9a":"YS-20260813-6b633838cf75",z=ms?"YS-20261002-59deedbb8f51":"YS-20261002-3e33ba8208b4",n=ms?"YS-20261023-a8d919a34b91":z,date="2026-10-02",status=ms?"closed":"terminated";
    const ts=ms?[["control_shares",600000000,a],["control_cash",52500000,a],["accepted_shares",1144000,z],["accepted_gross",100100,z],["public_float_after_restoration",25,n]]:[["offer_price",.20,a],["minimum_acceptances",56320200,z],["valid_tenders_at_failed_close",812945,z],["preoffer_concert_pct",11.22,z]];
    if(![a,z,n].every(id=>docs?.[id]?.caseId===c.id)||c.stage?.status!==status||c.stage.date!==date||!c.events?.some(e=>e.date===date&&e.kind===(ms?"completion":"terminated")&&e.state==="actual"&&e.evidence?.documentId===z)||!ts.every(([k,v,id])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===id)))return null;
    const left=ms?"控股股份交割":"擬議自願部分要約",right=ms?"餘股要約及公眾持股":"接納結果",badge=ms?"要約截止 · 公眾持股恢復至25%":"接納門檻未達 · 部分要約失效";
    const s=ms?"三名原股東":"合資格股東",b=ms?"CWT Limited":"Wang He（要約人）";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:ms?"強制現金要約":"部分要約",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,"seller",s,ms?"合計出售6億股":"擬收購5,632.02萬股"),
      box("b","left",444,106,161,124,"buyer",b,ms?"現金對價5,250萬港元":"要約價每股0.20港元"),
      box("a","right",724,72,310,70,"target",ms?"有效接納114.4萬股":"有效接納812,945股",ms?"每股0.0875港元，共100,100港元":"最低接納門檻56,320,200股"),
      box("r2","right",724,164,310,75,"creditor",ms?"截止時公眾持股約24.86%":"10月2日部分要約失效",ms?"公眾持有1.98856億股":"接納股份未根據要約交割"),
      box("r3","right",724,260,310,76,"creditor",ms?"10月20日公眾持股恢復至25%":"要約前一致行動人士合計持11.22%",ms?"要約人其後於市場出售114.4萬股":"按10月2日要約人公告列示")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:ms?"7月27日完成75%交割":"部分要約失效",proposedOrTerminated:!ms}]);
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:b}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:s,toLabel:b,headline:ms?"控股股權交割":"按部分要約擬收購股份",proposedOrTerminated:!ms}],annotations:[{tag:"①",title:ms?"控股股份賣方":"股份文件退回",body:ms?"Causeway Treasure Holding、ME Group International及張淦庭。":"部分要約失效後，接受要約的股東將獲退回股票或轉讓收據。"}],evidenceLinks:[{documentId:a,pages:ms?[2,5,20]:[2,3],label:ms?"控股交割及三名賣方":"條件及要約價格"},{documentId:z,pages:ms?[2,3,4]:[2,3],label:"截止公告"},...(ms?[{documentId:n,pages:[2],label:"恢復公眾持股"}]:[])]});
  }
  function buildSinofortuneOrSheung(c,docs){
    const s0=c.code==="08123",a=s0?"YS-20260813-c1eff3142a5f":"YS-20260724-f0efe2e9a72b",z=s0?"YS-20260910-ab04c7fb0f6e":"YS-20260904-d59b21463ed1",date=s0?"2026-09-10":"2026-09-04",control=s0?"2026-08-13":"2026-07-15";
    const ts=s0?[["capitalisation_shares",215499000,a],["completed_debt_setoff",21549900,a],["accepted_shares",933169,z],["post_offer_concert_pct_subject_to_registration",73.78,z]]:[["control_cash",143009472,a],["control_shares",502140000,a],["offer_full_cash_cap",52007328,a],["offer_facility_max",52500000,a],["accepted_shares",639000,z],["accepted_gross",181987.2,z]];
    if(![a,z].every(id=>docs?.[id]?.caseId===c.id)||c.stage?.status!=="closed"||c.stage.date!==date||!c.events?.some(e=>e.date===control&&e.kind==="control_completion"&&e.state==="actual"&&e.evidence?.documentId===a)||!c.events?.some(e=>e.date===date&&e.kind==="completion"&&e.state==="actual"&&e.evidence?.documentId===z)||!ts.every(([k,v,id])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===id)))return null;
    const status="closed",left=s0?"股東貸款資本化":"控股股份交割",right="餘股要約與公眾持股",badge=s0?"要約截止 · 公眾持股26.22%":"要約截止 · 公眾持股26.57%";
    const s=s0?"華億金控":"兩名原股東",b=s0?"Wang Jiawei":"Wise Triumph";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:"強制現金要約",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,s0?"listed":"seller",s,s0?"發行2.15499億股":"發售合計5.0214億股"),
      box("b","left",444,106,161,124,"buyer",b,s0?"抵銷貸款2,154.99萬港元":"現金對價約1.43億港元"),
      box("a","right",724,72,310,70,"target",s0?"一致行動持股由29.31%升至73.51%":"要約最高應付5,200.7萬港元",s0?"8月13日完成貸款資本化":"承諾融資額度上限為5,250萬港元"),
      box("r2","right",724,164,310,75,"creditor",s0?"有效接納933,169股":"有效接納639,000股",s0?"現金要約價每股0.10港元":"每股0.2848港元，應付181,987.20港元"),
      box("r3","right",724,260,310,76,"creditor",s0?"一致行動集團持股約73.78%":"一致行動集團持股約73.43%",s0?"公眾持股26.22%；以妥為登記為準":"公眾持股26.57%；以妥為登記為準")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:s0?"發行股份抵銷股東貸款":"7月15日交割73.33%"}]);
    const nodes=[{id:"s",role:s0?"listed":"seller",name:s},{id:"b",role:"buyer",name:b}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:s0?"mixed":"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:s0?"債轉股及現金":"現金",caseModalityShortLabel:s0?"債轉股及現金":"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:s,toLabel:b,headline:s0?"發行貸款資本化股份":"控股股份交割"}],annotations:[{tag:"①",title:s0?"貸款資本化":"交易雙方",body:s0?"發股代價按認購協議自應償還的股東貸款本金及應計利息中抵銷。":"Creative Elite Global Limited出售4.95億股，Chan Chin Ying Amanda出售714萬股；買方均為Wise Triumph。"}],evidenceLinks:[{documentId:a,pages:s0?[1,2]:[2,3,6],label:s0?"資本化股份發行":"控股交割及融資額度"},{documentId:z,pages:s0?[2,3,4]:[2,4,5],label:"要約結果及公眾持股"}]});
  }
  function buildWorldlinkOrRiverine(c,docs){
    const w=c.code==="06083",a=w?"YS-20260717-ba3bcb56a81e":"YS-20260615-8239cfe4dca5",z=w?"YS-20260828-e13ea650ca0b":"YS-20260811-54015536cfca",date=w?"2026-08-28":"2026-08-11",control=w?"2026-07-17":"2026-06-15";
    const ts=w?[["offeror_block_shares",244964000,a],["consortium_fund_block_shares",81912000,a],["combined_spa_cash",244241747.2,a],["accepted_shares",46991001,z],["accepted_gross_exact",35111675.9472,z]]:[["block_shares",300170000,a],["block_cash",155643703,a],["accepted_shares",8000,z],["accepted_cash",4152,z]];
    if(![a,z].every(id=>docs?.[id]?.caseId===c.id)||c.stage?.status!=="closed"||c.stage.date!==date||!c.events?.some(e=>e.date===control&&e.kind==="control_completion"&&e.state==="actual"&&e.evidence?.documentId===a)||!c.events?.some(e=>e.date===date&&e.kind==="completion"&&e.state==="actual"&&e.evidence?.documentId===z)||!ts.every(([k,v,id])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===id)))return null;
    const status="closed",left="兩名買方完成股份交割",right="餘股要約結果",badge=w?"要約截止 · 公眾持股25.50%":"要約截止 · 公眾持股約25.88%";
    const s=w?"六名原股東":"合高控股",b=w?"Lia Investment":"Yomi.sun Holding";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:"強制現金要約",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,"seller",s,w?"合計出售3.26876億股":"合計出售3.0017億股"),
      box("b","left",444,106,161,124,"buyer",b,w?"購入2.44964億股":"購入2.2289億股"),
      box("a","right",724,72,310,70,"target",w?"Qianshan Asia Buyout Fund":"Lucky Yang Limited",w?"另購入8,191.2萬股":"另購入7,728萬股"),
      box("r2","right",724,164,310,75,"creditor",w?"餘股要約有效接納46,991,001股":"餘股要約有效接納8,000股",w?"每股0.7472港元，對價約3,511.2萬港元":"每股0.519港元，對價4,152港元"),
      box("r3","right",724,260,310,76,"creditor",w?"一致行動集團持股約74.50%":"一致行動集團持股約74.12%",w?"公眾持股25.50%；以妥為登記為準":"公眾持股25.88%；以妥為登記為準")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:w?"7月17日完成股份轉讓":"6月15日完成股份轉讓"}]);
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:b}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:s,toLabel:b,headline:"完成股份轉讓"}],annotations:[{tag:"①",title:"協議對價",body:w?"Lia 支付183,037,100.80港元，Qianshan基金支付61,204,646.40港元。兩者合計約2.442億港元，由Lia另作餘股要約。":"Yomi.sun 支付115,572,592港元，Lucky Yang支付40,071,111港元。兩者合計約1.556億港元，Yomi.sun是唯一要約人。"}],evidenceLinks:[{documentId:a,pages:[2,3],label:"兩名買方及交割條款"},{documentId:z,pages:w?[2,3,4]:[2,3,5],label:"要約接納及公眾持股"}]});
  }
  function buildBonaOrKamfai(c,docs){
    const m=c.code==="08137",a=m?"YS-20260629-1a302ac9d114":"YS-20261120-8c5e87d235cb",z=m?"YS-20260902-fa16802fb6f1":a,date=m?"2026-09-02":"2026-11-20";
    const ts=m?[["deal_consideration",91800000,z],["stake",73,a],["indirect",51.1,a],["interim",49,z]]:[["deal_consideration",14000000,a],["cash",7000000,a],["note",7000000,a],["stake",30,a]];
    if(![a,z].every(id=>docs?.[id]?.caseId===c.id)||c.stage?.status!=="active"||c.stage.date!==date||!ts.every(([k,v,id])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===id)))return null;
    const status="active",left=m?"已完成首輪交割":"擬議收購",right=m?"過渡持股及後續審批":"對價與權益",badge=m?"首輪73%已交割 · 待礦權審批":"協議已簽 · 待交割";
    const s=m?"Able Alliance":"梁永輝",b=m?"洪橋集團":"Yorkshire (BVI)";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:m?"補充協議":"30%權益",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,"seller",s,m?"出售Bona Global 73%股權":"擬出售金輝服務30%股權"),
      box("b","left",444,106,161,124,"buyer",b,m?"總對價9,180萬美元":"港深智能管理全資附屬"),
      box("a","right",724,72,310,70,"target",m?"擬回轉24個百分點":"現金700萬港元",m?"回轉完成後，洪橋暫持49%":"於交割支付"),
      box("r2","right",724,164,310,75,"creditor",m?"南非礦權控制權變更待審批":"不可轉換承兌票據700萬港元",m?"按MPRDA第11條申請書面同意":"交割發行，兩個月到期；免息、無抵押"),
      box("r3","right",724,260,310,76,"creditor",m?"取得同意後擬恢復持股73%":"交割後以權益法入賬",m?"Bona Global持Smarty Minerals 70%":"金輝服務成為聯營公司")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:m?"首輪73%股權已交割":"擬轉讓30%股權",proposedOrTerminated:!m}]);
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:b}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"mixed",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:m?"分期對價":"現金及票據",caseModalityShortLabel:m?"分期對價":"現金及票據",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:s,toLabel:b,headline:m?"首輪73%股權已交割":"擬轉讓30%股權",proposedOrTerminated:!m}],annotations:[{tag:"①",title:m?"過渡安排":"票據到期",body:m?"9月2日補充協議記載回轉安排，回轉本身不產生另行對價，亦不改變原收購總對價。":"票據為買方於交割向賣方發行，自發行日起兩個月到期。"}],evidenceLinks:[{documentId:a,pages:m?[2,3]:[1,2,3,18,19],label:m?"原協議及股權結構":"收購條款及交易各方"},...(m?[{documentId:z,pages:[2,3,5,6],label:"首輪交割、回轉及後續審批"}]:[])]});
  }
  function buildShengmuOrBingo(c,docs){
    const s0=c.code==="01432",a=s0?"YS-20260522-ebd0f97a94c1":"YS-20260528-60e9507d7bf5",z=s0?"YS-20260803-ed5a217dc9c1":"YS-20260729-ed04e5eae1cf",p=s0?"YS-20260910-01432-vote-proxy":z,n=s0?"YS-20261030-01432-float":z,date=s0?"2026-08-03":"2026-07-29",control=s0?"2026-05-22":"2026-05-28";
    const ts=s0?[["block_shares",107200000,a],["accepted_shares",4379519346,z],["offeror_actual_post_offer",53.53,z],["voting_proxy_remaining",15,p],["voting_power_after_partial_lapse",68.53,p],["public_float_oct30",12.87,n]]:[["converted_principal",19000000,"YS-20260212-af11514aeae9"],["conversion_shares",69090909,"YS-20260707-44107334d2b4"],["accepted_shares",52750,z],["accepted_cash",14506.25,z]];
    if(![a,z,p,n].every(id=>docs?.[id]?.caseId===c.id)||c.stage?.status!=="closed"||c.stage.date!==date||!c.events?.some(e=>e.date===control&&e.kind==="control_completion"&&e.state==="actual"&&e.evidence?.documentId===a)||!c.events?.some(e=>e.date===date&&e.kind==="completion"&&e.state==="actual"&&e.evidence?.documentId===z)||!ts.every(([k,v,id])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===id)))return null;
    const status="closed",left=s0?"股份交割與要約":"可換股債轉換",right=s0?"直接持股、投票權與公眾持股":"股份及購股權要約",badge=s0?"要約已截止 · 10月30日公眾持股12.87%":"要約已截止 · 公眾持股38.11%";
    const s=s0?"中國聖牧股份賣方":"比高集團",b=s0?"中國現代牧業":"周星馳";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:"強制現金要約",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,s0?"seller":"listed",s,s0?"先行出售合計1.072億股":"轉換本金1,900萬港元"),
      box("b","left",444,106,161,124,"buyer",b,s0?"要約有效接納約43.795億股":"獲發69,090,909股"),
      box("a","right",724,72,310,70,"target",s0?"現代牧業直接持股53.53%":"有效接納52,750股",s0?"Start Great另持29.99%，合計83.52%":"每股0.275港元，應付14,506.25港元"),
      box("r2","right",724,164,310,75,"creditor",s0?"9月10日投票委託剩餘15.00%":"購股權要約零接納",s0?"現代牧業可行使投票權合計68.53%":"與股份現金要約分開"),
      box("r3","right",724,260,310,76,"creditor",s0?"10月30日公眾持股仍為12.87%":"截止時公眾持股38.11%",s0?"公司預計2027年6月底恢復合規":"以接納股份完成轉讓為準")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:s0?"先行股份交割":"5月28日完成轉換"}]);
    const nodes=[{id:"s",role:s0?"seller":"listed",name:s},{id:"b",role:"buyer",name:b}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:s0?"cash":"mixed",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:s0?"現金":"轉股及現金",caseModalityShortLabel:s0?"現金":"轉股及現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:s,toLabel:b,headline:s0?"先行股份交割":"完成可換股債轉換"}],annotations:[{tag:"①",title:s0?"投票委託變動":"股份及購股權分列",body:s0?"Start Great原委託24.90%股份的投票權，9月有9.90個百分點失效；其自身持股仍分列。":"股份要約接納52,750股，購股權要約未獲接納。"}],evidenceLinks:[{documentId:a,pages:[1,2],label:s0?"先行股份交割":"可換股債轉換"},{documentId:z,pages:s0?[2,3,4]:[3,4,7],label:"要約結果及公眾持股"},...(s0?[{documentId:p,pages:[2,3],label:"投票委託部分失效"},{documentId:n,pages:[1,2],label:"10月30日公眾持股更新"}]:[])]});
  }
  function buildRongzunOrDublin(c,docs){
    const rg=c.code==="01780",a=rg?"YS-20260507-9a80494ecd64":"YS-20261030-b132a2272be2",z=rg?"YS-20260709-f8abbb3f4cc4":"YS-20261027-5b4bc0721824",date=rg?"2026-07-09":"2026-10-27",status=rg?"terminated":"closed";
    const ts=rg?[["block_shares",84000000,a],["block_cash",43680000,a],["offer_price",.52,a],["tendered_shares_before_lapse",215000,z]]:[["cash_usd",127500000,a],["stake",100,a]];
    if(![a,z].every(id=>docs?.[id]?.caseId===c.id)||c.stage?.status!==status||c.stage.date!==date||!c.events?.some(e=>e.date===date&&e.kind===(rg?"terminated":"completion")&&e.state==="actual"&&e.evidence?.documentId===z)||!ts.every(([k,v,id])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===id)))return null;
    const left=rg?"先行股份買賣":"收購都柏林商學院",right=rg?"餘股要約結果":"商標、資金與完成",badge=rg?"餘股要約失效 · 原有持股仍為33.39%":"全資收購及商標轉讓已完成";
    const s=rg?"Xia Liping":"Kaplan International UK",b=rg?"Yang Jingyao":"中國春來";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:rg?"條件現金要約":"股權與商標",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,"seller",s,rg?"出售8,400萬股":"轉讓標的公司全部股權"),
      box("b","left",444,106,161,124,"buyer",b,rg?"現金對價4,368萬港元":"支付現金1.275億美元"),
      box("a","right",724,72,310,70,"target",rg?"要約有效接納215,000股":"Kaplan Inc. 另行轉讓相關商標",rg?"每股0.52港元；股份未按要約交割":"商標與股權合計對價1.275億美元"),
      box("r2","right",724,164,310,75,"creditor",rg?"未達超過50%投票權的條件":"收購貸款本金人民幣4.494億元",rg?"假設接納轉讓，持股也僅33.43%":"其餘由內部資源撥付"),
      box("r3","right",724,260,310,76,"creditor",rg?"要約失效後仍持2.07億股":"10月27日完成 · 愛爾蘭當地時間",rg?"要約人及一致行動人士合計33.39%":"標的成為中國春來全資附屬公司")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:rg?"4月8日完成先行買賣":"完成全部股權轉讓"}]);
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:b}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:s,toLabel:b,headline:rg?"先行股份買賣已完成":"全數股權轉讓已完成"}],annotations:[{tag:"①",title:rg?"要約失效":"鎖箱定價",body:rg?"超過50%投票權為不可豁免的條件。先前完成的買賣與失效的餘股要約分列。":"股權及商標合計現金對價於交割日支付，協議另設鎖箱漏損調整。"}],evidenceLinks:[{documentId:a,pages:rg?[2,3,22]:[9,10],label:rg?"先行股份買賣":"商標、總對價與資金來源"},{documentId:z,pages:rg?[2,3]:[1],label:rg?"要約失效及實際持股":"完成公告"}]});
  }
  function buildCntOrCpm(c,docs){
    const cp=c.code==="01932",a=cp?"YS-20260624-dc2f1d6a52a7":"YS-20260421-b95a30b1022a",z=cp?"YS-20260715-4896dc28ecc5":"YS-20260702-b9b7dbc07ff6",date=cp?"2026-07-15":"2026-07-02";
    const ts=cp?[["offer_price",.0562,a],["accepted_shares",360520,z],["public_float_at_closing",25,z]]:[["control_shares",88723592,a],["control_cash",8872359.2,a],["accepted_shares",303301869,z],["post_pct",50.31,z],["public_float",49.66,z]];
    if(![a,z].every(id=>docs?.[id]?.caseId===c.id)||c.stage?.status!=="closed"||c.stage.date!==date||!c.events?.some(e=>e.date===date&&e.kind==="completion"&&e.state==="actual"&&e.evidence?.documentId===z)||!ts.every(([k,v,id])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===id)))return null;
    const status="closed",left=cp?"因上游要約觸發":"先行股份買賣及要約",right=cp?"下游股份與購股權要約":"北海集團要約結果",badge=cp?"要約截止 · 公眾持股25.00%":"要約截止 · 一致行動集團持50.31%";
    const s=cp?"北海集團（00701）":"Dragon Legacy",b=cp?"中漆集團（01932）":"Prime Surplus";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:cp?"連鎖要約":"現金要約",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,cp?"listed":"seller",s,cp?"上游要約6月17日成為無條件":"先行出售88,723,592股"),
      box("b","left",444,106,161,124,cp?"target":"buyer",b,cp?"原由北海集團間接持股75%":"先行對價8,872,359.20港元"),
      box("a","right",724,72,310,70,"target",cp?"有效接納360,520股":"有效接納303,301,869股",cp?"每股0.0562港元；由SHK取得":"每股0.10港元，合計約3,033萬港元"),
      box("r2","right",724,164,310,75,"creditor",cp?"購股權要約零接納":"6月17日要約已成為無條件",cp?"未行使購股權按計劃條款失效":"7月2日截止；計入全部有效接納"),
      box("r3","right",724,260,310,76,"creditor",cp?"公眾持股維持25.00%":"一致行動集團持股50.31%",cp?"SHK收購的股份依公告仍列公眾持股":"公眾持股49.66%；以轉讓完成為準")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:cp?"既有75%間接持股":"先行股份買賣"}]);
    const nodes=[{id:"s",role:cp?"listed":"seller",name:s},{id:"b",role:cp?"target":"buyer",name:b}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:s,toLabel:b,headline:cp?"既有間接持股":"先行股份買賣"}],annotations:[{tag:"①",title:cp?"收購守則連鎖原則":"聯合要約",body:cp?"北海集團要約成為無條件後，按收購守則規則26.1註釋8觸發中漆的連鎖要約。":"Prime Surplus與SHK Hong Kong Industries提出聯合要約；同時觸發另一宗中漆連鎖要約。"}],evidenceLinks:[{documentId:a,pages:cp?[10]:[2,7],label:cp?"觸發連鎖要約":"先行股份買賣"},{documentId:z,pages:[2,3,4],label:"要約及公眾持股披露"}]});
  }
  function buildGongOrRimbaco(c,docs){
    const g=c.code==="02362",a=g?"YS-20260609-e63a2e2f6463":"YS-20260424-ff9e8448ca20",z=g?"YS-20260707-1a0b84516387":"YS-20260707-99b0d4174b33",n=g?z:"YS-20260723-f05a8e2d049e",date="2026-07-07";
    const ts=g?[["offer_price",.3,a],["offer_cap_shares",130000000,a],["accepted_shares",69803408,z],["actual_cash",20941022.4,z],["post_pct",.608,z]]:[["control_shares",945000000,a],["control_cash",157500000,a],["accepted_shares",200000,z],["actual_offer_cash",33400,z],["float_restored",25,n]];
    if(![a,z,n].every(id=>docs?.[id]?.caseId===c.id)||c.stage?.status!=="closed"||c.stage.date!==date||!c.events?.some(e=>e.date===date&&e.kind==="completion"&&e.state==="actual"&&e.evidence?.documentId===z)||!ts.every(([k,v,id])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===id)))return null;
    const status="closed",left=g?"自願現金部分要約":"控股股份交割",right=g?"部分要約配發結果":"餘股要約及公眾持股",badge=g?"部分要約截止 · 未取得控制":"要約截止 · 公眾持股恢復至25%";
    const s=g?"金川國際合資格股東":"RBC Venture",b=g?"Gong Hailin":"Aureole Halo";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:g?"部分要約":"強制現金要約",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,"seller",s,g?"合計交付有效接納約6,980.3萬股":"出售Rimbaco 9.45億股"),
      box("b","left",444,106,161,124,"buyer",b,g?"每股0.30港元":"控股對價1.575億港元"),
      box("a","right",724,72,310,70,"target",g?"要約最多認購1.30億股":"餘股要約有效接納200,000股",g?"低於上限，全部有效接納獲承購":"每股0.167港元，應付33,400港元"),
      box("r2","right",724,164,310,75,"creditor",g?"接納對價約2,094.1萬港元":"要約截止時公眾持股約24.98%",g?"按實際接納股數及要約價計算":"其後於7月23日向獨立第三方配售20萬股"),
      box("r3","right",724,260,310,76,"creditor",g?"計及接納後，持股約0.608%":"公眾持股恢復至25%",g?"要約人及一致行動人士合計":"公眾持有3.15億股")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:g?"有效接納股份全部獲承購":"4月24日交割75%"}]);
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:b}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:s,toLabel:b,headline:g?"有效接納股份全部獲承購":"交割控股股份"}],annotations:[{tag:"①",title:g?"要約範圍":"配售恢復公眾持股",body:g?"無條件部分要約在7月7日收市，全部69,803,408股有效接納股份獲承購。":"售予獨立第三方的20萬股是要約截止後另行配售。"}],evidenceLinks:[{documentId:a,pages:g?[1,9]:[2,5,6],label:g?"部分要約上限與價格":"控股交易及要約價格"},{documentId:z,pages:[2,3,4],label:"實際接納結果"},...(g?[]:[{documentId:n,pages:[2],label:"恢復公眾持股"}])]});
  }
  function buildMetaOrAsiaGrocery(c,docs){
    const m=c.code==="01796",a=m?"YS-20260427-9b8ef9f279d7":"YS-20251210-11892cde62eb",z=m?"YS-20260703-102d68297a66":"YS-20260611-a9272ebd628d",date=m?"2026-07-03":"2026-06-11";
    const ts=m?[["offer_price",.33,a],["min_accept",15800000,a],["submitted_shares",152000,z]]:[["offer_price",.258,a],["min_shares",590000000,a],["cap_shares",755300000,a]];
    if(![a,z].every(id=>docs?.[id]?.caseId===c.id)||c.stage?.status!=="terminated"||c.stage.date!==date||!c.events?.some(e=>e.date===date&&e.kind==="terminated"&&e.state==="actual"&&e.evidence?.documentId===z)||!ts.every(([k,v,id])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===id)))return null;
    if(Boolean(c.events?.some(e=>e.kind==="dispatch"&&e.state==="actual"))!==m)return null;
    const status="terminated",left=m?"有條件現金部分要約":"擬議有前提部分要約",right=m?"接納結果":"前提條件與失效",badge=m?"已開放接納 · 未達門檻而失效":"前提未達 · 未寄發要約文件";
    const s=m?"Metaspacex合資格股東":"亞洲雜貨分銷合資格股東",b=m?"Chan Yuen Tung":"Lianfeng Property";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:"擬議部分要約",outcomeBadge:badge}),[
      box("s","left",42,106,160,124,"seller",s,m?"擬收購1,580萬股":"擬收購5.9億至7.553億股"),
      box("b","left",444,106,161,124,"buyer",b,m?"擬付每股0.33港元":"擬付每股0.258港元"),
      box("a","right",724,72,310,70,"target",m?"5月18日寄發要約文件":"要約寄發設前提條件",m?"首個截止日有效接納152,000股":"包括湖北省國資委批准"),
      box("r2","right",724,164,310,75,"creditor",m?"最低接納門檻為1,580萬股":"6月11日前提期限屆滿",m?"實際接納少於最低門檻":"公告所列前提(b)及(c)未達成"),
      box("r3","right",724,260,310,76,"creditor",m?"7月3日部分要約失效":"擬議部分要約失效",m?"接納股份未按要約轉讓":"綜合文件未寄發，未開放接納")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[202,169],[444,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:"擬議股份轉讓",proposedOrTerminated:true}]);
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:b}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:s,toLabel:b,headline:"擬議股份轉讓",proposedOrTerminated:true}],annotations:[{tag:"①",title:m?"已寄發後失效":"寄發前失效",body:m?"要約已開放供合資格股東接納；到首個截止日未達接納條件。":"6月11日公告確認前提期限未延長，綜合文件不會寄發。"}],evidenceLinks:[{documentId:a,pages:m?[1,2]:[2,8],label:"要約條款"},{documentId:z,pages:[2,3],label:"失效披露"}]});
  }
  function buildBuybackAndSeparatedOffers(c,docs){
    const configs={
      "00383":{
        a:"YS-20260323-19a51c884d1b",z:"YS-20260610-3f877dde4e3e",p:"YS-20260601-2c2b5294fdc8",date:"2026-06-10",event:"completion",status:"closed",
        ts:[["offer_price",1.1,"a"],["tendered_shares",95451498,"p"],["cancelled_shares",70000000,"z"],["gross_buyback_cash",77000000,"p"]],
        left:"發行人現金回購",right:"回購及註銷結果",badge:"回購完成 · 7,000萬股已註銷",seller:"接納回購的股東",buyer:"天安卓健",sSub:"有效提交95,451,498股",bSub:"每股1.10港元 · 按比例回購",main:"實際回購7,000萬股",
        steps:[["6月1日回購要約截止","提交股份超過上限，按比例分配"],["6月10日回購及註銷","總應付對價7,700萬港元"],["已發行股份降至10.11億股","按上市規則披露公眾持股25.18%"]],
        detail:"註銷後已發行股份由1,080,530,457股降至1,010,530,457股。25.18%為公司按上市規則披露的公眾持股比例。",pagesA:[1,2],pagesZ:[2,3,4],pagesP:[2,3]
      },
      "01940":{
        a:"YS-20260313-f29c62d0409d",z:"YS-20260526-3593bc0c0d2c",p:"YS-20260504-22a8d09641b9",date:"2026-05-26",event:"terminated",status:"terminated",
        ts:[["block_shares",468096000,"a"],["block_cash",30100000,"a"],["offer_price",.626,"a"],["tenders_before_lapse",74000,"z"]],
        left:"先行股份買賣（已交割）",right:"餘股強制現金要約",badge:"餘股要約失效 · 先行39.01%已交割",seller:"China Gas Investors",buyer:"Tangde Gas",sSub:"出售468,096,000股",bSub:"2月10日交割 · 3,010萬美元",main:"已轉讓39.01%股份",
        steps:[["5月4日寄發綜合文件","每股0.626港元 · 門檻逾50%投票權"],["5月26日有效接納74,000股","計入接納僅約39.0142%"],["餘股要約失效","接納股份未轉讓；先行持股39.01%"]],
        detail:"賣方為China Gas Investors Ltd.，買方為Tangde Gas Co., Limited。引發強制要約的是先行股權交割；另有人民幣股息債權收購。",pagesA:[2,3,31],pagesZ:[2,3],pagesP:[1]
      },
      "00784":{
        a:"YS-20260414-c7dde7617765",z:"YS-20260526-af8f7d1b0416",p:"YS-20260505-59ef714194fa",date:"2026-05-26",event:"completion",status:"closed",
        ts:[["block_shares",560140000,"a"],["block_paid",133033250,"a"],["accepted_shares",90000,"z"],["accepted_gross",21375,"z"],["offeror_pct_after_accepted_subject_to_registration",70.03,"z"]],
        left:"先行股份買賣（已交割）",right:"餘股強制現金要約",badge:"要約截止 · 有效接納90,000股",seller:"四名協議賣方",buyer:"Hapbiotech Investment",sSub:"出售560,140,000股",bSub:"4月9日交割 · 1.3億港元",main:"已轉讓70.02%股份",
        steps:[["5月5日寄發綜合文件","無條件強制要約 · 每股0.2375港元"],["5月26日要約截止","5份有效接納；毛額21,375港元"],["計入接納後持股70.03%","以過戶登記為準 · 公眾持股29.97%"]],
        detail:"四名賣方為Reach Goal Development Limited、Simple Joy Investments Limited、Ling Yuk Tong及Keung Yun Yuen。買方為Hapbiotech Investment Holding Limited。",pagesA:[2,6,21,29,32,33],pagesZ:[2,3,4],pagesP:[2]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p].every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    if(c.code!=="00383"&&!c.events.some(e=>e.kind==="control_completion"&&e.state==="actual"&&e.evidence?.documentId===q.a))return null;
    if(c.code!=="00383"&&!c.events.some(e=>e.kind==="dispatch"&&e.state==="actual"&&e.evidence?.documentId===q.p))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},{documentId:q.p,pages:q.pagesP,label:"要約文件及結果"},{documentId:q.z,pages:q.pagesZ,label:"最終披露"}]});
  }
  function buildCoastalGuanzeBright(c,docs){
    const configs={
      "01124":{
        a:"YS-20251017-d53d2c52884f",z:"YS-20260521-7a4dceb9ec2d",date:"2026-05-21",event:"terminated",status:"terminated",
        ts:[["proposed_block_shares",153126197,"a"],["proposed_block_pct",36.93,"a"]],
        left:"2025年股權與股東貸款洽談",right:"洽談終止",badge:"洽談終止 · 未簽正式協議",seller:"Coastal International",buyer:"Tao Qian Limited",sSub:"擬出售股份及股東貸款",bSub:"擬買方 · 曾進行盡職調查",main:"擬轉讓36.93%股份",
        steps:[["2025年10月17日首次披露","擬收購153,126,197股及股東貸款"],["2026年5月21日終止洽談","至公告日未簽具約束力協議"],["同日結束要約期","未進入正式要約程序"]],
        detail:"擬賣方為Coastal International Holdings Limited。此圖僅涵蓋Tao Qian的2025年洽談。",pagesA:[1,3,7,8],pagesZ:[1,2]
      },
      "02427":{
        a:"YS-20260211-9543cf9b22fd",z:"YS-20260508-7f09cfc361b9",p:"YS-20260417-48b47f92f661",o:"YS-20260417-a43331e42e94",date:"2026-05-08",event:"completion",status:"closed",
        ts:[["block_shares",699164575,"a"],["block_paid",174791143.75,"a"],["offer_price",.25,"o"],["accepted_shares",10000,"z"],["accepted_gross",2500,"z"]],
        left:"先行股份買賣（已交割）",right:"餘股強制現金要約",badge:"要約截止 · 有效接納10,000股",seller:"Meng A Capital",buyer:"富德（香港）投資控股",sSub:"出售699,164,575股",bSub:"2月6日交割 · 1.7億港元",main:"已轉讓73.60%股份",
        steps:[["4月17日寄發綜合文件","無條件強制要約 · 每股0.25港元"],["5月8日要約截止","兩份有效接納；毛額2,500港元"],["計入接納後約持有73.60%","699,174,575股 · 以過戶登記為準"]],
        detail:"賣方為Meng A Capital Limited。先行股份買賣對價為174,791,143.75港元；兩筆按金屬大宗對價。",pagesA:[2,7,8,24],pagesZ:[2,3,4],pagesP:[2],pagesO:[1]
      },
      "01428":{
        a:"YS-20260330-49c5a34f52a3",z:"YS-20260429-d542a122705d",p:"YS-20260408-83685e32efcd",o:"YS-20250425-236c8004bebd",date:"2026-04-29",event:"completion",status:"closed",
        ts:[["block_shares",857980000,"a"],["block_paid",2814174400,"a"],["accepted_shares",1310530,"z"],["accepted_gross",4298538.4,"z"],["post_offer_pct_subject_to_registration",50.63,"z"]],
        left:"先行股份買賣（已交割）",right:"餘股強制現金要約",badge:"要約截止 · 有效接納1,310,530股",seller:"New Charming Holdings",buyer:"Wealthiness and Prosperity",sSub:"出售857,980,000股",bSub:"3月30日交割 · 28.1億港元",main:"已轉讓50.55%股份",
        steps:[["4月8日寄發綜合文件","無條件強制要約 · 每股3.28港元"],["4月29日要約截止","有效接納1,310,530股；約429.9萬港元"],["計入接納後持股50.63%","以過戶登記為準 · 公眾持股49.29%"]],
        detail:"賣方為New Charming Holdings Limited；買方為Wealthiness and Prosperity Holding Limited。大宗及餘股均依公告分列。",pagesA:[2,3],pagesZ:[2,3,4,5],pagesP:[2],pagesO:[34]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    if(c.code!=="01124"&&!c.events.some(e=>e.kind==="control_completion"&&e.state==="actual"&&e.evidence?.documentId===q.a))return null;
    if(c.code!=="01124"&&!c.events.some(e=>e.kind==="dispatch"&&e.state==="actual"&&e.evidence?.documentId===q.p))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="terminated"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="terminated"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"綜合文件"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"補充條款與定義"}]:[]),{documentId:q.z,pages:q.pagesZ,label:"最終披露"}]});
  }
  function buildInnovaxFloat(c,docs){
    const a="YS-20251010-42c500338c87",m="YS-20260331-42175e79ac2b",z="YS-20260429-8c36c2d58111",n="YS-20260514-innovax-float",status="closed",date="2026-04-29";
    if(c.stage?.status!==status||c.stage.date!==date||![a,m,z,n].every(k=>docs?.[k]?.caseId===c.id))return null;
    if(![["control_completion","2026-03-31",m],["completion",date,z]].every(([kind,date,doc])=>c.events?.some(x=>x.kind===kind&&x.date===date&&x.state==="actual"&&x.evidence?.documentId===doc)))return null;
    const ts=[["direct_holdco_shares_purchased",110,a],["underlying_block_shares",45000000,a],["block_consideration",270000000,a],["accepted_shares",39825,z],["accepted_gross",238950,z],["offer_close_public_float_pct",24.93,n],["float_restoration_disposed_shares",39825,n],["restored_public_float_pct",25,n]];
    if(!ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===doc))||!c.processEvents?.some(e=>e.date==="2026-05-13"&&e.state==="actual"&&e.evidence?.documentId===n))return null;
    const left="透過百陽收購控制權",right="餘股要約及公眾持股",badge="餘股要約已截止 · 公眾持股已恢復";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:485,status,leftTitle:left,rightTitle:right,transitionLabel:"交易執行結果",outcomeBadge:badge}),[
      box("s","left",42,107,155,115,"seller","鍾志文","出售百陽全部110股"),
      box("b","left",444,107,155,115,"buyer","王庭發","取得百陽100%股權"),
      box("h","left",444,304,155,80,"target","百陽國際投資","持創陞4,500萬股（75%）"),
      box("r1","right",724,72,310,75,"target","4月29日餘股要約截止","有效接納39,825股 · 238,950港元"),
      box("r2","right",724,165,310,75,"creditor","要約後合計75.07%","公眾持股24.93% · 以過戶登記為準"),
      box("r3","right",724,261,310,80,"creditor","5月13日公眾持股恢復至25%","王庭發在公開市場出售39,825股")
    ],[],[
      {id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[197,166],[444,166]],labelCenter:[321,166],labelWidth:205,labelHeight:35,label:"3月31日交割 · 2.7億港元"},
      {id:"hold",panel:"left",kind:"shares",step:"②",pathPoints:[[520,222],[520,304]],labelCenter:[459,263],labelWidth:85,labelHeight:30,label:"100%"}
    ]);
    const nodes=[{id:"s",role:"seller",name:"鍾志文"},{id:"b",role:"buyer",name:"王庭發"},{id:"h",role:"target",name:"百陽國際投資"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:"鍾志文",toLabel:"王庭發",headline:"3月31日百陽控制權交割"}],annotations:[{tag:"①",title:"規則25特別交易",body:"同日另行交割：MSL收購Innovax Credit及Innovax Management全部股權，參考對價5,820萬港元，可按協議調整。"}],evidenceLinks:[{documentId:a,pages:[2,4,15,34],label:"交易條款"},{documentId:m,pages:[2],label:"雙項交割"},{documentId:z,pages:[2,3],label:"要約結果"},{documentId:n,pages:[1,2],label:"公眾持股恢復"}]});
  }
  function buildCloopenClosing(c,docs){
    const a="YS-20260512-4f623dad3846",z="YS-20261029-e6c1e2bcd433",n="YS-20261028-cloopen-merger-6k",p="YS-20260821-cloopen-sec-proxy",date="2026-10-29",status="closed";
    if(c.stage?.status!==status||c.stage.date!==date||![a,z,n,p].every(id=>docs?.[id]?.caseId===c.id))return null;
    if(![["completion","2026-10-28"],["effective",date]].every(([kind,date])=>c.events?.some(e=>e.kind===kind&&e.date===date&&e.state==="actual"&&e.evidence?.documentId===z)))return null;
    if(![["funded_usd",34247196],["stake_parentco",49.78],["parent_co_target_economic_stake",66.36],["stake_target",33.03]].every(([key,value])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===z)))return null;
    const left="實際股權出資",right="私有化後持股",badge="境外合併生效 · 多點穿透權益33.03%";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:510,status,leftTitle:left,rightTitle:right,transitionLabel:"10月28日晚交割 · 29日生效（香港）",outcomeBadge:badge}),[
      box("rta","left",42,101,167,109,"buyer","Retail Technology Asia","多點數智間接全資附屬"),
      box("parent","left",436,101,168,109,"target","SpringX（ParentCo）","RTA持股約49.78%"),
      box("fund","left",99,299,437,80,"creditor","多點實際出資約3,424.7萬美元","出資取得ParentCo股權"),
      box("roll","right",724,67,310,77,"creditor","ParentCo與滾存股東","滾存股東取得HoldCo股權"),
      box("hold","right",724,188,310,77,"target","AutumnX（HoldCo）","合併後直接全資持有Cloopen"),
      box("t","right",724,309,310,77,"target","Cloopen（美國OTC私有化）","ParentCo穿透66.36% · 多點33.03%")
    ],[],[
      {id:"cash",panel:"left",kind:"cash",step:"①",pathPoints:[[209,157],[436,157]],labelCenter:[324,157],labelWidth:199,labelHeight:35,label:"股權出資"},
      {id:"rollcash",panel:"right",kind:"shares",step:"②",pathPoints:[[878,144],[878,188]],labelCenter:[999,166],labelWidth:82,labelHeight:28,label:"持股"},
      {id:"legal",panel:"right",kind:"shares",step:"③",pathPoints:[[878,265],[878,309]],labelCenter:[982,287],labelWidth:82,labelHeight:28,label:"100%"}
    ]);
    const nodes=[{id:"rta",role:"buyer",name:"Retail Technology Asia"},{id:"parent",role:"target",name:"SpringX（ParentCo）"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:"現金股權出資",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"cash",kind:"cash",direction:"ltr",fromLabel:"Retail Technology Asia",toLabel:"SpringX（ParentCo）",headline:"實際出資約3,424.7萬美元"}],annotations:[{tag:"①",title:"多點的入賬口徑",body:"多點按聯營公司入賬。ParentCo約66.36%的Cloopen穿透權益，乘以多點出資子公司的ParentCo持股約49.78%，約為33.03%。"},{tag:"②",title:"合併與滾存",body:"SummerX併入Cloopen。AutumnX直接全資持有存續的Cloopen；滾存股東在AutumnX層面取得股權。"}],evidenceLinks:[{documentId:a,pages:[1,3,28],label:"出資條款"},{documentId:z,pages:[1],label:"港交所交割公告"},{documentId:n,pages:[1],label:"SEC合併生效公告"},{documentId:p,pages:[1],label:"SEC股東通函"}]});
  }
  function buildBinqiaoRestructuring(c,docs){
    const a="YS-20260602-49b40e2921b4",p="YS-20260715-2d77cf1d7385",v="YS-20260729-6fc0d31c0dc2",z="YS-20260813-d89260429f2d",date="2026-08-12",status="closed";
    if(c.stage?.status!==status||c.stage.date!==date||![a,p,v,z].every(id=>docs?.[id]?.caseId===c.id))return null;
    if(![["vote","2026-07-29",v],["completion",date,z]].every(([kind,date,doc])=>c.events?.some(t=>t.kind===kind&&t.date===date&&t.state==="actual"&&t.evidence?.documentId===doc)))return null;
    if(![["exit_value",193460000,p],["received_equity_value",193697000,p],["share_swap_cash",237000,p],["assumed_debt",266592000,a],["debt_offset",266126000,a],["debt_cash_balance",466000,a]].every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===doc)))return null;
    const left="股權置換及選擇性減資",right="債務承接及抵銷",badge="8月12日完成 · 星空水岸成全資附屬";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:510,status,leftTitle:left,rightTitle:right,transitionLabel:"股權及債務分列",outcomeBadge:badge}),[
      box("s","left",42,100,168,122,"seller","上海濱橋","轉出星空水岸100%股權"),
      box("b","left",436,100,168,122,"buyer","夢響強音","星空華文間接全資附屬"),
      box("cap","left",99,280,437,80,"target","夢響強音退出上海濱橋約17.59%","股權估值約1.9億元，差額約23.7萬元"),
      box("r1","right",724,73,310,78,"target","星空水岸承接約26,659.2萬元","原為上海濱橋欠夢響強音的股東貸款"),
      box("r2","right",724,171,310,78,"creditor","抵銷對應貸款約26,612.6萬元","上海濱橋原向星空水岸提供"),
      box("r3","right",724,269,310,78,"creditor","債務差額約46.6萬元","按通函約定以現金結算（人民幣）")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[210,162],[436,162]],labelCenter:[324,162],labelWidth:198,labelHeight:35,label:"受讓星空水岸100%"}]);
    const nodes=[{id:"s",role:"seller",name:"上海濱橋"},{id:"b",role:"buyer",name:"夢響強音"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"mixed",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:"股權置換及現金差額",caseModalityShortLabel:"股權及現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:"上海濱橋",toLabel:"夢響強音",headline:"上海星空水岸全部股權"}],annotations:[{tag:"①",title:"置換範圍",body:"上海濱橋原約17.59%股權價值約人民幣19,346萬元；星空水岸100%估值約19,369.7萬元。8月12日交割後，上海濱橋不再是星空華文聯營公司。"},{tag:"②",title:"債務差額",body:"股東貸款承接約26,659.2萬元，另筆貸款抵銷約26,612.6萬元，差額約46.6萬元。金額均為人民幣。"}],evidenceLinks:[{documentId:a,pages:[1,2],label:"首次公告"},{documentId:p,pages:[8,9,10,24,25],label:"通函：股權與債務"},{documentId:v,pages:[1],label:"股東表決"},{documentId:z,pages:[1],label:"完成公告"}]});
  }
  function buildBraveAndPrintshop(c,docs){
    const configs={
      "01716":{
        a:"YS-20260312-5dc87660122d",z:"YS-20260423-41edf6c62b07",p:"YS-20260402-58ca646b787b",date:"2026-04-23",event:"completion",status:"closed",
        ts:[["control_shares",175500000,"a"],["control_cash",122200000,"a"],["accepted_shares",112005,"z"],["actual_cash",77989.0815,"z"],["public_float",33.05,"z"],["offeror_actual_post_offer",65.04,"z"]],
        left:"先行股份買賣（已交割）",right:"餘股強制現金要約",badge:"要約截止 · 有效接納112,005股",seller:"Blackpaper Limited",buyer:"驍駿傳奇",sSub:"出售175,500,000股",bSub:"3月12日交割 · 1.2億港元",main:"已轉讓65.00%股份",
        steps:[["4月2日寄發綜合文件","無條件強制要約 · 每股0.6963港元"],["4月23日要約截止","5份有效接納 · 毛額約7.8萬港元"],["計入接納後持股65.04%","待過戶口徑 · 公眾持股33.05%"]],
        detail:"買方為驍駿傳奇有限公司。持股及公眾持股比例按公告股數除以2.7億股已發行股份重算；大宗股權對價1.222億港元。",pagesA:[2,4,5],pagesZ:[2,3,4],pagesP:[2]
      },
      "08448":{
        a:"YS-20260209-d5d59e5c0c30",z:"YS-20260422-c85aa4839534",p:"YS-20260320-89c34973b9b9",o:"YS-20260731-e0f06c7e7859",date:"2026-04-22",event:"completion",status:"closed",
        ts:[["control_shares",65410466,"a"],["nominal_control",22893663.1,"a"],["deposit_paid",5000000,"a"],["note_repaid_amount",17893663.1,"o"],["accepted_shares",36000,"z"],["actual_cash",12600,"z"],["post_pct",65.58,"z"]],
        left:"先行股份買賣（已交割）",right:"餘股要約與支付後續",badge:"要約截止 · 有效接納36,000股",seller:"三名協議賣方",buyer:"Digital Intelligence",sSub:"出售65,410,466股",bSub:"500萬港元現金＋延期票據",main:"2月9日轉讓65.54%",
        steps:[["4月22日無條件要約截止","5份有效接納 · 36,000股×0.35港元"],["要約對價12,600港元","計入接納後65.58% · 年報已確認"],["7月延期對價付清","票據清償及股份押記解除"]],
        detail:"賣方為New Metro Inc.、Hsu Ching Loi及Chau Man Keung。買方為Digital Intelligence Holdings Limited。大宗對價總額22,893,663.10港元；延期對價屬大宗買賣。",pagesA:[2,3,7],pagesZ:[2,4,5],pagesP:[1],pagesO:[28]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    if(c.code!=="01124"&&!c.events.some(e=>e.kind==="control_completion"&&e.state==="actual"&&e.evidence?.documentId===q.a))return null;
    if(c.code!=="01124"&&!c.events.some(e=>e.kind==="dispatch"&&e.state==="actual"&&e.evidence?.documentId===q.p))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="terminated"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="terminated"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"綜合文件"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"年報：票據已清償"}]:[]),{documentId:q.z,pages:q.pagesZ,label:"最終披露"}]});
  }
  function buildSinaAndThelloy(c,docs){
    const configs={
      "01980":{
        a:"YS-20260121-1e73f77f5e9c",z:"YS-20260413-201c7eb66b37",p:"YS-20260211-c85cccd1814d",o:"YS-20260330-3de924d7c5cd",date:"2026-04-13",event:"terminated",status:"terminated",
        ts:[["offer_price",.7,"a"],["max_cash",22750000,"a"],["min_shares",32500000,"z"],["first_tendered",10774501,"o"],["extended_tendered",10790502,"z"],["prehold_shares",300000000,"z"]],
        left:"有條件現金部分要約",right:"兩次截止與結果",badge:"延長後接納不足 · 部分要約失效",seller:"天鴿互動合資格股東",buyer:"新浪香港",sSub:"擬出售3,250萬股",bSub:"每股0.70港元 · 原持3億股",main:"擬轉讓3,250萬股",
        steps:[["2月11日寄發要約文件","最低接納門檻：3,250萬股"],["3月30日首個截止","累計有效接納10,774,501股"],["4月13日延長截止 · 要約失效","累計10,790,502股，未達門檻"]],
        detail:"新浪香港原持約27.04%；部分要約失效，提交的股份未按要約轉讓。2,275萬港元為擬議要約對價。",pagesA:[1,2,3],pagesZ:[2,3],pagesP:[1,2],pagesO:[2]
      },
      "01546":{
        a:"YS-20260212-444746321a8a",z:"YS-20260410-23fb9cf05a44",p:"YS-20260320-594fff099382",o:"YS-20260128-2057cb27dbc0",date:"2026-04-10",event:"completion",status:"closed",
        ts:[["block_shares",500800000,"a"],["block_paid",95152000,"a"],["accepted_shares",457000,"z"],["accepted_gross",86830,"z"],["post_offer_pct_subject_to_registration",62.7,"z"]],
        left:"先行股份買賣（已交割）",right:"餘股強制現金要約",badge:"要約截止 · 有效接納457,000股",seller:"Cheers Mate Holding",buyer:"World Nexus Holdings",sSub:"出售500,800,000股",bSub:"2月12日交割 · 約9,515.2萬港元",main:"已轉讓62.6%股份",
        steps:[["3月20日寄發綜合文件","每股0.19港元 · 賣方保留9.9%未提交"],["4月10日要約截止","有效接納457,000股 · 毛額86,830港元"],["計入接納後持股約62.7%","501,257,000股 · 以過戶登記為準"]],
        detail:"World Nexus Holdings Limited向Cheers Mate Holding Limited購股。先行對價9,515.2萬港元，其中5,000萬按賣方指示付予集團並構成賣方股東貸款，其餘4,515.2萬付賣方或指定人士。",pagesA:[2],pagesZ:[2,3,4],pagesP:[1,2],pagesO:[6,7,9,31]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    if(c.code==="01546"&&!c.events.some(e=>e.kind==="control_completion"&&e.state==="actual"&&e.evidence?.documentId===q.a))return null;
    if(!c.events.some(e=>e.kind==="dispatch"&&e.state==="actual"&&e.evidence?.documentId===q.p))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="terminated"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="terminated"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"綜合文件"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"補充條款與定義"}]:[]),{documentId:q.z,pages:q.pagesZ,label:"最終披露"}]});
  }
  function buildBioDlinkTransfer(c,docs){
    const a="YS-20260212-a26f3829b682",u="YS-20260317-0d7ba77de1a0",z="YS-20260331-a0cb9d34d9ba",v="YS-20260824-ecf5c1929eb4",p="YS-20260929-78b32c10b306",date="2026-03-31",status="closed";
    if(c.stage?.status!==status||c.stage.date!==date||![a,u,z,v,p].every(id=>docs?.[id]?.caseId===c.id))return null;
    if(!c.events?.some(e=>e.kind==="completion"&&e.date===date&&e.state==="actual"&&e.evidence?.documentId===z)||!c.processEvents?.some(e=>e.date==="2026-09-29"&&e.state==="actual"&&e.evidence?.documentId===p))return null;
    if(![["share_price",4,a],["accepted_shares",475069724,z],["option_cancellation_gross",13447657.9,z],["total_to_return_under_post_completion_undertakings",11396990,z],["observed_holdings_pct_2026_06_30",60.67,v],["confirmed_post_retransfer_pct",60,p]].every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===doc)))return null;
    const left="股份要約與期權註銷",right="持股變動及回轉",badge="兩項要約已完成 · 回轉後持股60.00%";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:510,status,leftTitle:left,rightTitle:right,transitionLabel:"3月17日達門檻 · 31日截止",outcomeBadge:badge}),[
      box("s","left",42,100,169,122,"seller","東曜藥業接納股東","有效接納475,069,724股"),
      box("b","left",436,100,164,122,"buyer","藥明合聯","每股4.00港元"),
      box("op","left",99,281,437,80,"target","另註銷7,612,600份期權","每份1.7665港元 · 約1,344.8萬港元"),
      box("r1","right",724,72,310,78,"target","3月31日股份要約截止","計入接納後61.47%（待過戶口徑）"),
      box("r2","right",724,173,310,78,"creditor","6月30日持股約60.67%","根據買方中報實際期末持股"),
      box("r3","right",724,274,310,79,"creditor","期後回轉完成 · 持股60.00%","9月29日東曜藥業中報確認")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[211,162],[436,162]],labelCenter:[324,162],labelWidth:200,labelHeight:35,label:"股份要約 · 約19.0億港元"}]);
    const nodes=[{id:"s",role:"seller",name:"東曜藥業接納股東"},{id:"b",role:"buyer",name:"藥明合聯"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:"東曜藥業接納股東",toLabel:"藥明合聯",headline:"有效接納475,069,724股"}],annotations:[{tag:"①",title:"股權回轉",body:"3月31日公告的回售安排：按每股4港元回售共11,396,990股：Center Laboratories及Vivo Suzhou各5,180,450股，Advantech Capital Investment 1,036,090股。"}],evidenceLinks:[{documentId:a,pages:[22],label:"要約條款"},{documentId:u,pages:[2],label:"達接納門檻"},{documentId:z,pages:[2,3,4],label:"要約結果及回轉安排"},{documentId:v,pages:[29],label:"6月底持股"},{documentId:p,pages:[4],label:"回轉完成"}]});
  }
  function buildEtsAndChongqing(c,docs){
    const configs={
      "08031":{
        a:"YS-20260119-e31fa7be495a",z:"YS-20260320-61c616725c0f",p:"YS-20260227-211decaeb9ed",o:"YS-20260409-ed9107498a0d",date:"2026-03-20",event:"completion",status:"closed",
        ts:[["block_shares",210000000,"a"],["block_paid",57960000,"a"],["accepted_shares",15867000,"z"],["accepted_gross",4379292,"z"],["post_offer_float_pct",23.59,"z"],["separate_placing_down_shares",15866000,"o"],["restored_float_pct",28.95,"o"]],
        left:"先行股份買賣（已交割）",right:"餘股要約及公眾持股",badge:"要約截止 · 公眾持股其後恢復",seller:"Million Top Enterprises",buyer:"Jumbo Growth Trading",sSub:"出售2.1億股",bSub:"1月14日交割 · 5,796萬港元",main:"已轉讓約71.04%股份",
        steps:[["3月20日餘股要約截止","6份有效接納 · 15,867,000股"],["按接納計算毛額437.9萬港元","要約後公眾持股23.59%"],["4月9日另行配售舊股","15,866,000股 · 公眾持股恢復至28.95%"]],
        detail:"賣方Million Top Enterprises Limited；買方Jumbo Growth Trading Limited。要約組合計持股還含原有34,000股一致行動方持股。4月配售為要約人向獨立第三方出售現有股份。",pagesA:[2,21],pagesZ:[2,3,4],pagesP:[1,2],pagesO:[1,2],docP:"綜合文件寄發",docO:"公眾持股恢復"
      },
      "01053":{
        a:"YS-20251219-cf0ea8d5dd28",z:"YS-20260623-a84d159c3e51",p:"YS-20260623-47f9e52f6e94",o:"YS-20260313-95d1da4becf3",date:"2026-06-22",event:"completion",status:"closed",
        ts:[["subscription_price",1.32,"a"],["actual_a_shares_issued",757575757,"p"],["actual_subscription_gross",1000000000,"p"],["actual_subscription_net",993722532.86,"p"]],
        left:"定向發行A股",right:"豁免與發行結果",badge:"新A股已登記 · 清洗豁免已獲批",seller:"重慶鋼鐵",buyer:"華寶投資",sSub:"發行757,575,757股A股",bSub:"以每股1.32元人民幣認購",main:"新股佔發行後股本7.88%",
        steps:[["3月13日股東批准","已披露清洗豁免及要約期結束"],["6月22日完成新股登記","募資總額10億元，淨額約9.9億元人民幣"],["中國寶武及一致行動人","合計29.51%增至35.07%"]],
        detail:"本次為A股定向發行；華寶投資直接持股由1.55%升至9.31%。長壽鋼鐵仍為控股股東，中國寶武仍為實際控制人。",pagesA:[1,2],pagesZ:[1],pagesP:[3,4,5,9,10],pagesO:[1,3],docP:"A股發行情況報告",docO:"清洗豁免與表決",modeLabel:"現金認購新A股"
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    if(c.code==="08031"&&!c.events.some(e=>e.kind==="control_completion"&&e.state==="actual"&&e.evidence?.documentId===q.a))return null;
    if(c.code==="08031"&&!c.events.some(e=>e.kind==="dispatch"&&e.state==="actual"&&e.evidence?.documentId===q.p))return null;
    if(c.code==="08031"&&!c.processEvents?.some(e=>e.date==="2026-04-09"&&e.state==="actual"&&e.evidence?.documentId===q.o))return null;
    if(c.code==="01053"&&!c.events?.some(e=>e.kind==="vote"&&e.date==="2026-03-13"&&e.state==="actual"&&e.evidence?.documentId===q.o))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="terminated"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:q.modality||"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:q.modeLabel||"現金",caseModalityShortLabel:q.modeLabel||"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="terminated"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:q.docP}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:q.docO}]:[]),{documentId:q.z,pages:q.pagesZ,label:"最終披露"}]});
  }
  function buildDongfengVoyah(c,docs){
    const a="YS-20250822-c189fd00c0c4",p="YS-20260309-2a5555444286",z="YS-20260318-c5e1b6d8198f",m="YS-20260318-21aa0cf6d7a4",n="YS-20260429-voyah-listing-confirmed",date="2026-03-18",status="closed";
    if(c.stage?.date!==date||c.stage.status!==status||![a,p,z,m,n].every(id=>docs?.[id]?.caseId===c.id))return null;
    if(![["delisting",z],["implementation",m]].every(([kind,doc])=>c.events?.some(x=>x.date===date&&x.kind===kind&&x.state==="actual"&&x.evidence?.documentId===doc)))return null;
    if(!c.processEvents?.some(e=>e.date==="2026-03-19"&&e.state==="actual"&&e.evidence?.documentId===n)||![["cash_cancellation_price",6.68],["voyah_distribution_ratio",.3552608]].every(([k,v])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===a)))return null;
    const left="東風集團股份吸收合併",right="實物分派及介紹上市",badge="東風H股3月18日撤牌 · 嵐圖翌日掛牌";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:515,status,leftTitle:left,rightTitle:right,transitionLabel:"撤牌與掛牌為不同事件",outcomeBadge:badge}),[
      box("s","left",42,107,165,110,"seller","東風集團股份","港股代碼00489"),
      box("b","left",438,107,173,110,"buyer","東風集團（武漢）投資","吸收合併要約方"),
      box("cash","left",99,298,437,82,"target","合資格H股現金註銷價","每股6.68港元；東風母公司直接持有的H股除外"),
      box("r1","right",724,69,310,79,"target","每股東風H股分派","0.3552608股嵐圖H股"),
      box("r2","right",724,170,310,79,"creditor","3月18日分派及合併條件達成","嵐圖H股股票寄出；東風H股撤牌"),
      box("r3","right",724,271,310,80,"creditor","3月19日嵐圖以介紹方式掛牌","香港主板 · 07489")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[207,161],[438,161]],labelCenter:[323,161],labelWidth:200,labelHeight:35,label:"吸收合併"}]);
    const nodes=[{id:"s",role:"seller",name:"東風集團股份"},{id:"b",role:"buyer",name:"東風集團（武漢）投資"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"mixed",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:"現金註銷及股份分派",caseModalityShortLabel:"現金及股份",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:"東風集團股份",toLabel:"東風集團（武漢）投資",headline:"吸收合併與撤牌"}],annotations:[{tag:"①",title:"兩項對價",body:"現金註銷與嵐圖股份分派獨立列示。內資股股東按相同比例獲嵐圖內資股；10.85港元為初期估值口徑下每股H股理論合計。"},{tag:"②",title:"現金結算安排",body:"3月18日公告所列現金匯款或寄發支票期限為3月27日。"}],evidenceLinks:[{documentId:a,pages:[2,3,35],label:"註銷及分派條款"},{documentId:p,pages:[2],label:"股東表決"},{documentId:z,pages:[2],label:"東風H股撤牌"},{documentId:m,pages:[2,3],label:"分派及合併條件"},{documentId:n,pages:[5],label:"嵐圖實際掛牌"}]});
  }
  function buildSkyAndJinchuan(c,docs){
    const configs={
      "01429":{
        a:"YS-20260123-f0612f0a1238",z:"YS-20260306-e6c21b3372aa",o:"YS-20260327-skymission-float",date:"2026-03-06",event:"completion",status:"closed",
        ts:[["block_shares",1200000000,"a"],["block_cash",114000000,"a"],["tendered_shares",804000,"z"],["tendered_cash",76380,"z"],["float_restoration_disposed_shares",808000,"o"]],
        left:"先行股份買賣（已交割）",right:"餘股要約及公眾持股",badge:"餘股要約已截止 · 公眾持股其後恢復",seller:"Sky Mission Group",buyer:"大成國際控股",sSub:"出售12億股",bSub:"1月16日交割 · 約1.1億港元",main:"已轉讓75.00%股份",
        steps:[["3月6日餘股要約截止","6份有效接納 · 804,000股"],["毛額76,380港元","計入接納後公眾持股24.95%"],["3月27日另行在市場售股","808,000股 · 公眾持股恢復至25.00%"]],
        detail:"賣方Sky Mission Group Limited與上市公司名稱不同。先行買賣對價1.14億港元；餘股每股0.095港元。3月27日公告確認售股後公眾持有400,004,000股。",pagesA:[2,5,6],pagesZ:[2,3,4],pagesO:[1]
      },
      "02362":{
        a:"YS-20260305-5d08c87d57fb",z:"YS-20260423-09acf95d951a",p:"YS-20260326-c601fc0c2e6e",date:"2026-04-23",event:"completion",status:"closed",
        ts:[["max_shares",700000000,"a"],["offer_price",.01,"p"],["accepted_shares",21212517,"z"],["actual_cash",212125.17,"z"],["post_pct",.16,"z"]],
        left:"無條件自願現金部分要約",right:"接納及結算",badge:"有效接納21,212,517股 · 全數承接",seller:"金川國際合資格股東",buyer:"Alternative Liquidity Index",sSub:"部分要約上限7億股",bSub:"每股0.01港元",main:"6份有效接納",
        steps:[["3月26日寄發要約文件","無條件部分要約"],["4月23日要約截止","接納21,212,517股，低於上限"],["按條款承接全數有效提交","約21.2萬港元 · 結算後持股約0.16%"]],
        detail:"要約人為Alternative Liquidity Index, LP；本圖為3月5日公布的每股0.01港元一輪。對價按接納股數及要約價計。",pagesA:[1,2],pagesZ:[2,3],pagesP:[1,2]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    if(c.code==="01429"&&!c.events.some(e=>e.kind==="control_completion"&&e.state==="actual"&&e.evidence?.documentId===q.a))return null;
    if(c.code==="02362"&&!c.events.some(e=>e.kind==="dispatch"&&e.state==="actual"&&e.evidence?.documentId===q.p))return null;
    if(c.code==="01429"&&!c.processEvents?.some(e=>e.date==="2026-03-27"&&e.state==="actual"&&e.evidence?.documentId===q.o))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="terminated"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="terminated"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"要約文件"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"公眾持股恢復"}]:[]),{documentId:q.z,pages:q.pagesZ,label:"最終披露"}]});
  }
  function buildQingciGameFramework(c,docs){
    const a="YS-20261020-qingci-gbits-renewal",n="YS-20261126-qingci-gbits-circular",date="2026-11-26",status="active";
    if(c.stage?.date!==date||c.stage.status!==status||![a,n].every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===date&&e.kind==="dispatch"&&e.state==="actual"&&e.evidence?.documentId===n))return null;
    if(![78000000,94000000,113000000].every((v,i)=>c.terms?.some(t=>t.key==="outbound_cap_"+(2027+i)&&t.value===v&&t.evidence?.documentId===n)))return null;
    const left="遊戲授權、運營及推廣",right="2027至2029年付款上限",badge="通函已刊發 · 待獨立股東表決";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:485,status,leftTitle:left,rightTitle:right,transitionLabel:"雙向服務框架",outcomeBadge:badge}),[
      box("l","left",42,106,166,119,"buyer","青瓷遊戲","香港上市 06633"),
      box("r","left",441,106,166,119,"seller","吉比特集團","經HK Kunpan持青瓷18.55%"),
      box("q","left",93,283,455,70,"target","獨立股東大會：12月18日09:30","表決範圍：青瓷向吉比特付款及上限"),
      box("y27","right",724,68,310,75,"target","2027年 · 7,800萬元","授權運營300萬＋推廣7,500萬"),
      box("y28","right",724,165,310,75,"creditor","2028年 · 9,400萬元","授權運營400萬＋推廣9,000萬"),
      box("y29","right",724,262,310,75,"creditor","2029年 · 1.13億元","授權運營500萬＋推廣1.08億")
    ],[],[{id:"main",panel:"left",kind:"cash",step:"①",pathPoints:[[208,169],[441,169]],labelCenter:[324,169],labelWidth:207,labelHeight:35,label:"青瓷向吉比特付款"}]);
    const nodes=[{id:"l",role:"buyer",name:"青瓷遊戲"},{id:"r",role:"seller",name:"吉比特集團"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:"服務費",caseModalityShortLabel:"服務費",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"cash",direction:"ltr",fromLabel:"青瓷遊戲",toLabel:"吉比特集團",headline:"遊戲及推廣年度付款上限"}],annotations:[{tag:"①",title:"獨立股東表決範圍",body:"圖列青瓷付款的年度上限，幣種為人民幣。吉比特付予青瓷的授權及推廣費另列於條款。Altus Capital Limited為獨立財務顧問。"}],evidenceLinks:[{documentId:a,pages:[1,2],label:"原框架公告"},{documentId:n,pages:[10,15,20,45,53],label:"年度上限、獨立意見及會議"}]});
  }
  function buildGraceWineOffers(c,docs){
    const a="YS-20251230-c63378ab4d8d",p="YS-20260203-dfe44fa87884",z="YS-20260224-e240220e16aa",date="2026-02-24",status="closed";
    if(c.stage?.date!==date||c.stage.status!==status||![a,p,z].every(id=>docs?.[id]?.caseId===c.id))return null;
    if(![["control_completion","2025-12-12",a],["completion",date,z]].every(([kind,date,doc])=>c.events?.some(e=>e.date===date&&e.kind===kind&&e.state==="actual"&&e.evidence?.documentId===doc)))return null;
    if(![["block_shares",589480000,a],["block_price",73629777,a],["block_paid_at_closing",22090000,a],["block_deferred",51539777,a],["accepted_shares",1090010,z],["options_exercise",12400000,z],["offeror_actual_post_offer",72.64,z],["concert_post_offer",73.62,z]].every(([k,v,doc])=>c.terms?.some(t=>t.key===k&&t.value===v&&t.evidence?.documentId===doc)))return null;
    const left="先行股份買賣與延期付款",right="股份要約與期權結果",badge="股份要約已截止 · 期權全數行使";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:510,status,leftTitle:left,rightTitle:right,transitionLabel:"2025年12月12日先行交割",outcomeBadge:badge}),[
      box("s","left",42,107,168,109,"seller","三名協議賣方","交割5.8948億股（73.63%）"),
      box("b","left",435,107,172,109,"buyer","Hill Valley Investment","大宗總額約7,363萬港元"),
      box("pay","left",98,288,439,86,"creditor","交割首期付2,209萬港元","另5,154萬港元為延期對價"),
      box("r1","right",724,68,310,80,"target","2月24日要約截止","股份有效接納1,090,010股"),
      box("r2","right",724,169,310,80,"creditor","期權要約沒有有效接納","1,240萬份期權全部行使 · 股本8.13億"),
      box("r3","right",724,270,310,82,"creditor","要約人72.64% · 一致行動合計73.62%","按已發行股份及接納股數計")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[210,161],[435,161]],labelCenter:[323,161],labelWidth:201,labelHeight:35,label:"73.63%股份交割"}]);
    const nodes=[{id:"s",role:"seller",name:"三名協議賣方"},{id:"b",role:"buyer",name:"Hill Valley Investment"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:"現金（含延期價款）",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:"三名協議賣方",toLabel:"Hill Valley Investment",headline:"12月12日完成先行股份買賣"}],annotations:[{tag:"①",title:"買賣雙方及兩期款項",body:"賣方為Macmillan Equity Limited、Palgrave Enterprises Limited及Wong Shu Ying。買方為Hill Valley Investment Co Ltd。首期2,209萬與第二期51,539,777港元按賣方明細合計。"},{tag:"②",title:"要約後持股口徑",body:"要約人計入接納為590,570,010股；再加一致行動方Judy Chan行權所得800萬股，合計598,570,010股，分母為8.13億股。"}],evidenceLinks:[{documentId:a,pages:[2,3,8,9,22,23,27],label:"先行交割及付款"},{documentId:p,pages:[1],label:"綜合要約文件"},{documentId:z,pages:[2,3,4],label:"要約截止及期權行使"}]});
  }
  function buildWestwellDowway(c,docs){
    const configs={
      "01732":{
        a:"YS-20251201-c3932aeb288d",z:"YS-20260220-9f5f383f00fe",p:"YS-20260116-fc3fae62c599",date:"2026-02-20",event:"completion",status:"closed",
        ts:[["offer_price",.21,"a"],["tendered_shares",378280000,"z"],["bought_shares",371200000,"z"],["actual_cash",77952000,"z"],["direct_pct",29,"z"],["public_float",40.7,"z"]],
        left:"自願現金部分要約",right:"超額接納及按比例分配",badge:"部分要約截止 · 按條款承接29%股權",seller:"象興國際合資格股東",buyer:"西井控股（香港）",sSub:"有效接納378,280,000股",bSub:"每股0.21港元 · 原無持股",main:"按比例承接371,200,000股",
        steps:[["1月16日寄發綜合文件","2月6日要約成為無條件"],["2月20日要約截止","每名接納股東約98.13%獲承接"],["部分要約總毛額7,795.2萬港元","結算後直接持股29% · 公眾40.70%"]],
        detail:"買方為西井控股（香港）有限公司。毛額按承接股份乘每股要約價計算。",pagesA:[2,7,8],pagesZ:[2,3,4],pagesP:[1,2]
      },
      "08403":{
        a:"YS-20251126-70ff438fb20e",z:"YS-20260205-4ff82a62cbf6",p:"YS-20260115-3641571ac8f8",date:"2026-02-05",event:"terminated",status:"terminated",
        ts:[["block_shares",54632500,"a"],["block_cash",27316250,"a"],["offer_price",.5,"p"],["tendered_before_lapse",1996000,"z"]],
        left:"三份股份買賣（已交割）",right:"餘股強制現金要約",badge:"餘股要約失效 · 先行合計35.48%保留",seller:"A&B、LHG及WKY",buyer:"Sun Wei及CN BASE",sSub:"先行出售54,632,500股",bSub:"總對價約2,731.6萬港元",main:"先行完成 · 合計35.48%",
        steps:[["1月15日寄發綜合文件","餘股每股0.50港元 · 門檻逾50%"],["2月5日有效接納1,996,000股","計入接納僅36.77%，低於門檻"],["餘股要約失效","先行股權保留；接納股份未轉讓"]],
        detail:"Sun Wei在11月25日自A&B買入28,645,000股；一致行動方CN BASE在11月20日分別自LHG及WKY買入14,000,000及11,987,500股。Sun Wei是餘股要約人。",pagesA:[2,3,4],pagesZ:[2,3,4],pagesP:[1]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    if(c.code==="08403"&&!c.events.some(e=>e.kind==="control_completion"&&e.state==="actual"&&e.evidence?.documentId===q.a))return null;
    if(c.code==="01732"&&!c.events.some(e=>e.kind==="dispatch"&&e.state==="actual"&&e.evidence?.documentId===q.p))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:false}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:false}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"綜合文件"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"補充條款與定義"}]:[]),{documentId:q.z,pages:q.pagesZ,label:"最終披露"}]});
  }
  function buildCentenaryMeilan(c,docs){
    const configs={
      "01959":{
        a:"YS-20251216-44142795f351",p:"YS-20260120-a26cf74b38be",z:"YS-20260210-a61d2e007ceb",date:"2026-02-10",event:"completion",status:"closed",
        ts:[["block_price",.405,"a"],["block_shares",376916000,"a"],["block_cash",152650980,"a"],["offer_price",.94,"a"],["accepted_shares",16000,"z"],["accepted_cash",15040,"z"],["concert_post_offer",71.21,"z"]],
        left:"先行控股交割",right:"餘股強制現金要約",badge:"餘股要約截止 · 計入有效接納後一致行動方71.21%",seller:"Chong Kit及Law Hau Kit",buyer:"MSINT LTD",sSub:"先行出售376,916,000股",bSub:"每股0.405港元",main:"控股交易1.5億港元",
        steps:[["2025年12月11日先行交割","一致行動方原另持502,000股"],["2026年2月10日要約截止","每股0.94港元 · 有效接納16,000股"],["有效接納總額15,040港元","計入有效接納後公眾持股28.22%"]],
        detail:"Chong Kit Limited出售373,916,000股，Law Hau Kit出售3,000,000股並另保留3,000,000股。餘股要約價採前六個月最高已付價。",pagesA:[2,3,8],pagesP:[1],pagesZ:[2,3,4,5]
      },
      "00357":{
        a:"YS-20250430-5429e03df920",p:"YS-20251231-d078ff720f31",z:"YS-20260130-5aba2b85224b",date:"2026-01-30",event:"completion",status:"closed",
        ts:[["block_shares",237500000,"a"],["block_cash",2339375000,"a"],["h_offer_price",10.62,"p"],["domestic_offer_price",9.85,"p"],["accepted_h_shares",54170087,"z"],["accepted_domestic_shares",3512500,"z"],["offeror_concert_total_post_offer",63.5,"z"]],
        left:"內資股控股交易",right:"兩項強制現金要約",badge:"兩項要約截止 · 計入有效接納後一致行動方63.50%",seller:"海口美蘭國際機場",buyer:"海南機場設施",sSub:"協議內資股237,500,000股",bSub:"2025年12月24日已交割",main:"先行對價人民幣23.4億",
        steps:[["內資股要約：海南機場設施","每股人民幣9.85元 · 接納3,512,500股"],["H股要約：海南機場設施（香港）","每股10.62港元 · 接納54,170,087股"],["2026年1月30日要約截止","計入有效接納後公眾持股36.50%"]],
        detail:"內資股的有效接納來自原一致行動方，轉讓不增加一致行動方的內資股合計。兩項要約各以原幣結算。",pagesA:[1,2],pagesP:[16,17,36],pagesZ:[2,3,4,5]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    if(!c.events.some(e=>e.kind==="control_completion"&&e.state==="actual"&&e.date===(c.code==="00357"?"2025-12-24":"2025-12-11")&&e.evidence?.documentId===(c.code==="00357"?q.p:q.a)))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:false}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:false}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"綜合文件"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"補充條款與定義"}]:[]),{documentId:q.z,pages:q.pagesZ,label:"最終披露"}]});
  }
  function buildDigiplusAlpha(c,docs){
    const configs={
      "01009":{
        a:"YS-20251117-160975e2ee5d",p:"YS-20260226-1b927309bbfc",z:"YS-20260602-363271c78145",o:"YS-20260303-6ff0e5de492b",date:"2026-06-02",event:"completion",status:"closed",mode:"convertible",
        ts:[["first_notes",800000000,"o"],["second_notes",800000000,"z"],["funded_principal",1600000000,"z"],["coupon",3,"a"],["conversion_price",1,"a"],["full_conversion_pct",53.89,"z"]],
        left:"分兩期認購可換股票據",right:"發行進度與轉股情景",badge:"兩期均已發行 · 票據本金合計16億港元",seller:"國際娛樂",buyer:"DigiPlus Interactive",sSub:"五年期 · 年息3%",bSub:"初始轉股價每股1港元",main:"可換股票據共16億港元",
        steps:[["2月26日獨立股東批准","證監會執行人員已授予有條件清洗豁免"],["3月3日、6月2日分別發行","每期本金8億港元"],["6月2日認購方持股為零","按初始價全數轉股情景為53.89%"]],
        detail:"第一期票據所得用於償還承兌票據和有抵押銀行借款。53.89%為以6月2日股本計算的全數轉股情景。",pagesA:[1,2,3,4],pagesP:[2,4],pagesO:[1,2],pagesZ:[1,2]
      },
      "00228":{
        a:"YS-20251223-1bbb4747eb69",p:"YS-20260113-b4f4b6d294f9",z:"YS-20260203-a872b1ea587b",date:"2026-02-03",event:"completion",status:"closed",mode:"shares",
        ts:[["offer_price",1.57,"a"],["bond_cash_per_1m_face",233630.95,"a"],["rights_issued_to_offeror",150884939,"p"],["accepted_shares",28226590,"z"]],
        left:"供股完成 · 持股增至52.97%",right:"股份及可換股債券要約",badge:"兩項要約均已截止 · 一致行動方持股59.15%",seller:"中國能源開發",buyer:"佳鷹及一致行動方",sSub:"供股發行152,066,800股",bSub:"原持股29.84%",main:"供股最終獲配150,884,939股",
        steps:[["2025年12月24日發行供股股份","一致行動方增持至52.97%"],["股份要約每股1.57港元","有效接納28,226,590股"],["可換股債券要約零接納","2月3日截止 · 持股59.15%含待登記接納"]],
        detail:"供股最終獲配包括45,375,000股暫定配額和105,509,939股額外申請；債券要約每100萬港元面值支付233,630.95港元。",pagesA:[3,4,9],pagesP:[11,12],pagesZ:[2,3,4]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    if(c.code==="00228"&&!c.events.some(e=>e.kind==="control_completion"&&e.state==="actual"&&e.date==="2025-12-24"&&e.evidence?.documentId===q.p))return null;
    if(c.code==="01009"&&!c.events.some(e=>e.kind==="implementation"&&e.state==="actual"&&e.date==="2026-03-03"&&e.evidence?.documentId===q.o))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"listed",q.seller,q.sSub),
      box("b","left",438,106,178,124,q.mode==="convertible"?"creditor":"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:q.mode==="convertible"?"asset":"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:false}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:q.mode==="convertible"?"convertible_bond":"acquisition",modality:q.mode==="convertible"?"mixed":"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:q.mode==="convertible"?"可換股票據":"供股及現金要約",caseModalityShortLabel:q.mode==="convertible"?"票據":"供股",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:q.mode==="convertible"?"asset":"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:false}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:c.code==="01009"?"股東表決及清洗豁免":"綜合文件"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"第一期發行"}]:[]),{documentId:q.z,pages:q.pagesZ,label:"最終披露"}]});
  }
  function buildQualiAnta(c,docs){
    const configs={
      "01348":{
        a:"YS-20251218-37239f5c89cb",p:"YS-20260107-2139ff7f39d0",z:"YS-20260129-024162f24464",o:"YS-20260330-e70055d3f7ec",date:"2026-01-29",event:"completion",status:"closed",
        ts:[["control_shares",887418000,"a"],["control_cash",95841144,"a"],["control_pct",60.2,"a"],["share_price",.108,"p"],["accepted_shares",220110000,"z"],["option_consideration",2030,"z"],["aggregate_consideration",23773910,"z"],["public_float_restored_pct",25.21,"o"]],
        left:"先行控股交割",right:"餘股要約與公眾持股",badge:"股份及期權要約截止 · 公眾持股其後恢復至25.21%",seller:"Smart Investor等九名賣方",buyer:"Yael Capital Management",sSub:"先行出售887,418,000股",bSub:"曾無持股 · 交割後60.20%",main:"控股交易9,584.1萬港元",
        steps:[["2025年12月12日先行交割","協議股每股0.108港元"],["2026年1月29日兩項要約截止","接納220,110,000股、註銷20,300,000份期權"],["3月26日完成配售500萬股","公眾持股由要約後24.87%恢復至25.21%"]],
        detail:"股份與期權要約合計2,377.4萬港元；按要約公告，計入有效接納後75.13%。可換股票據持有人給予不可撤回承諾，未另發票據要約。",pagesA:[2,8,9,10],pagesP:[1],pagesZ:[2,3,4,5],pagesO:[1,2]
      },
      "02020":{
        a:"YS-20260127-5a3a8ce36e43",p:"YS-20260424-fe3c31bcbfe1",z:"YS-20261007-6a0288fed694",date:"2026-10-07",event:"completion",status:"closed",
        ts:[["cash_eur",1505516600,"p"],["price_per_share",35,"p"],["shares",43014760,"z"],["stake",29.06,"z"]],
        left:"協議收購 PUMA 股份",right:"審批、交割與股份過戶",badge:"股份已過戶 · 收購 PUMA 29.06%少數股權",seller:"Artémis",buyer:"安踏體育",sSub:"出售43,014,760股PUMA普通股",bSub:"每股35歐元 · 現金對價",main:"基礎對價15.1億歐元（未稅）",
        steps:[["2026年1月26日簽協議","2月13日取得股東書面批准"],["4月24日刊發通函","10月5日完成協議交割"],["10月7日股份過戶完成","43,014,760股 · 佔PUMA股本29.06%"]],
        detail:"通函列明過戶後15個月內若發生特定要約、退市要約或擠出，可觸發向賣方支付額外對價。",pagesA:[1,3,4],pagesP:[7,14,15,26,27],pagesZ:[1]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    if(c.code==="01348"&&!c.events.some(e=>e.kind==="control_completion"&&e.state==="actual"&&e.date==="2025-12-12"&&e.evidence?.documentId===q.a))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:false}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:false}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"綜合文件"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"恢復公眾持股公告"}]:[]),{documentId:q.z,pages:q.pagesZ,label:"最終披露"}]});
  }
  function buildVbitCofoe(c,docs){
    const configs={
      "08246":{
        a:"YS-20261007-650333996c8f",p:"YS-20261028-31213ece4e92",z:"YS-20261102-6a5069c64fb9",o:"YS-20261102-e907006f98d1",date:"2026-11-02",event:"completion",status:"closed",
        ts:[["contract_consideration",1180000,"a"],["target_new_shares",17,"a"],["target_post_pct",27.35,"a"],["issued_shares",10459091,"z"],["issue_price",.88,"o"]],
        left:"認購 Vbit 新股",right:"上市公司發股支付對價",badge:"認購已完成 · Toff Global 持有 Vbit 27.35%",seller:"Vbit Limited",buyer:"Toff Global",sSub:"向認購方發行17股",bSub:"持股由15%增至27.35%",main:"認購對價118萬美元",
        steps:[["10月28日簽補充協議","延長期限並細化可分配利潤口徑"],["11月2日完成認購","中華燃氣向Vbit發行10,459,091股"],["代價股發行價每股0.88港元","佔中華燃氣擴大後股本約1.74%"]],
        detail:"Toff Global 為認購方；中華燃氣為代價股發行人；Vbit 為代價股承配方。代價股附分期鎖定及利潤保證安排。",pagesA:[1,2,3,4],pagesP:[1,2],pagesZ:[1,2],pagesO:[1]
      },
      "01187":{
        a:"YS-20261119-b8a90e0b1b0c",z:"YS-20261119-b8a90e0b1b0c",date:"2026-11-19",event:"first_announcement",status:"active",
        ts:[["conditional_equity_price",99480000,"a"],["first_tranche_due",89532000,"a"],["retained_tranche_due",9948000,"a"]],
        left:"收購康居人60%股權",right:"付款條件與交割",badge:"股權轉讓協議已簽 · 待登記、交接及付款",seller:"郭本勝、郭本麗及安徽氧精靈",buyer:"可孚醫療",sSub:"三名股東合計轉讓60%",bSub:"以自有資金支付現金",main:"協議對價人民幣9,948萬",
        steps:[["簽署股權轉讓協議","工商變更及交接完成後支付首款"],["首款：人民幣8,953.2萬","支付首款當日為交割日"],["尾款：人民幣994.8萬","首款支付後3個月內 · 須符合約定"]],
        detail:"交割後可孚有權提名五席董事中的三席並委任董事長；交割後亦有應收款等差額賠償安排。",pagesA:[1,2,3],pagesZ:[1,2,3]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:c.code==="08246"?"shares":"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:c.code==="08246"?"發行代價股":"現金",caseModalityShortLabel:c.code==="08246"?"代價股":"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"補充認購協議"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"股份變動翌日披露"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"完成公告"}])]});
  }
  function buildPraiAble(c,docs){
    const configs={
      "00990":{
        a:"YS-20261120-edd55890578e",p:"YS-20261007-ac4555df7dc3",z:"YS-20261120-edd55890578e",date:"2026-11-20",event:"first_announcement",status:"active",
        ts:[["aggregate_contract_sum_hkd",1729000000,"a"],["construction_contract_myr",592110000,"a"],["usd_supply_price",76682926.83,"a"],["loi_advance_paid",11055000,"p"]],
        left:"檳城 Prai 數據中心合約",right:"兩份合約分列",badge:"已簽施工及設備供應合約 · 待測試和驗收",seller:"Longmotive 兩家子公司",buyer:"Deep Source（PN）",sSub:"在岸施工及離岸設備",bSub:"業主及採購方 · 規劃67MW",main:"披露合計約17.3億港元",
        steps:[["在岸施工：Longmotive（M）","固定價5.9億馬來西亞令吉 · 含稅"],["離岸供應：Longmotive DC Solutions","固定價7,668.3萬美元 · 不含馬來西亞SST"],["兩份合約由 Longmotive（S）擔保","已付1,105.5萬美元抵扣設備價款"]],
        detail:"施工範圍涵蓋整合、測試、調試及移交。離岸供應另按里程碑付款，已付的意向書預付款抵扣供應合約價。",pagesA:[1,2,3,5,6],pagesP:[2],pagesZ:[1,2,3,5,6]
      },
      "01627":{
        a:"YS-20260520-623bc3a6ac91",p:"YS-20260526-eb2cf6ea9f64",z:"YS-20260617-66341c155cd4",o:"YS-20260612-25beb04dc0f1",date:"2026-06-17",event:"completion",status:"closed",
        ts:[["land_premium",1627000000,"p"]],
        left:"東涌住宅用地招標",right:"批准、地價與交付",badge:"地價已付清 · 東涌第54號地段已交付",seller:"香港特區政府",buyer:"Able Best Limited",sSub:"地政總署 · 東涌第54號地段",bSub:"安保工程全資子公司",main:"中標地價16.3億港元",
        steps:[["用地面積約14,152平方米","最高住宅總樓面49,532平方米"],["6月12日股東批准及付清地價","地價全數由集團內部資源支付"],["6月17日土地已交付","建築契約期限：2032年3月31日"]],
        detail:"買方以政府招標取得私人住宅用地。按賣地條款，建築須不遲於2032年3月31日完成並適合佔用。",pagesA:[1,2],pagesP:[1],pagesZ:[1],pagesO:[1,2]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:c.code==="00990"?"前期意向書":"股東通函"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"股東表決結果"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"完成公告"}])]});
  }
  function buildCscRenewals(c,docs){
    const type=c.id.endsWith('-works')?'works':'services', n='YS-20261126-csc-'+type+'-circular', a='YS-20261022-csc-'+type+'-announcement', work=type==='works';
    if(c.stage?.date!=='2026-11-26'||c.stage?.status!=='active'||![n,a].every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.kind==='dispatch'&&e.evidence?.documentId===n&&e.state==='actual'))return null;
    const expect=work?[4200000000,5400000000,2400000000]:[200000000,16000000,26000000,100000000];
    if(c.terms?.length!==expect.length||!expect.every((v,i)=>c.terms[i].value===v&&c.terms[i].evidence.documentId===n))return null;
    const left=work?'分判工程框架':'營運服務框架',right='2027至2029年上限',badge='通函已刊發 · 待獨立股東表決';
    const from=work?'中國建築股份':'中國建築興業',to=work?'中國建築興業':'中國建築國際';
    const rows=work?[['2027年 · 42億港元','年度可批出分判工程上限'],['2028年 · 54億港元','年度可批出分判工程上限'],['2029年 · 24億港元','年度可批出分判工程上限']]:[['工程服務','每年2億港元'],['機械租賃','每年1,600萬港元'],['保險及履約保證','每年2,600萬港元'],['材料供應','每年1億港元']];
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:485,status:'active',leftTitle:left,rightTitle:right,transitionLabel:'合約框架',outcomeBadge:badge}),[
      box('l','left',42,106,166,119,'buyer',from,'付款方'),box('r','left',441,106,166,119,'seller',to,'服務供應方'),
      box('m','left',93,283,455,70,'target','獨立股東表決：12月17日10:00',work?'第一項決議：分判工程框架':'第二項決議：營運服務框架'),
      ...rows.map(([t,s],i)=>box('r'+i,'right',724,64+i*84,310,62,'target',t,s))
    ],[],[{id:'main',panel:'left',kind:'cash',step:'①',pathPoints:[[208,169],[441,169]],labelCenter:[324,169],labelWidth:207,labelHeight:35,label:work?'分判工程款':'營運服務款'}]);
    const nodes=[{id:'l',role:'buyer',name:from},{id:'r',role:'seller',name:to}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:'acquisition',modality:'cash',status:'active',stageDate:'2026-11-26',stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:'服務費',caseModalityShortLabel:'服務費',topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:'main',kind:'cash',direction:'ltr',fromLabel:from,toLabel:to,headline:left+'付款方向'}],annotations:[{tag:'①',title:'獨立股東表決',body:'Add Treasure Holdings Limited須迴避；Altus Capital Limited為獨立財務顧問。'}],evidenceLinks:[{documentId:a,pages:[1,2],label:'協議公告'},{documentId:n,pages:work?[11,28,29,55,61]:[16,19,21,23,28,29,55,61,62],label:'上限、獨立意見及表決'}]});
  }
  function buildMinorConnectedContracts(c,docs){
    const power=c.code==='03989', n=power?'YS-20261126-fangcaohu-operations':'YS-20261126-november-mri-tmsc-copper', date='2026-11-26';
    if(c.stage?.date!==date||c.stage.status!=='active'||docs?.[n]?.caseId!==c.id||!c.events?.some(e=>e.kind==='first_announcement'&&e.evidence?.documentId===n&&e.state==='actual')||!c.terms?.some(t=>t.key==='contract_amount'&&t.value===(power?29900000:682631.68)&&t.evidence.documentId===n))return null;
    const left=power?'芳草湖熱電委託運營':'陰極銅銷售合約',right='履約及結算條款',badge=power?'合約已簽 · 按月考核結算':'合約已簽 · 待交付及最終結算';
    const from=power?'五家渠首熱':'TMSC Trading',to=power?'新疆天富':'MRI Trading';
    const rows=power?[['公開招標中標','芳草湖熱電運營管理'],['服務期六個月','人民幣2,990萬元'],['按月結算及支付','以履約考核結果為準']]:[['陰極銅53公噸','賣方可調整±5% · CIF上海'],['公告列明約68.3萬美元','LME浮動銅價 · 先付105%暫付款'],['預計12月6日運抵上海','最終按貨值及其他費用結算']];
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:485,status:'active',leftTitle:left,rightTitle:right,transitionLabel:'合約條款',outcomeBadge:badge}),[
      box('l','left',42,106,166,119,'buyer',from,power?'委託方':'採購方'),box('r','left',441,106,166,119,'seller',to,power?'運營服務方':'供應方'),
      ...rows.map(([t,s],i)=>box('r'+i,'right',724,64+i*94,310,70,'target',t,s))
    ],[],[{id:'main',panel:'left',kind:'cash',step:'①',pathPoints:[[208,169],[441,169]],labelCenter:[324,169],labelWidth:207,labelHeight:35,label:power?'委託運營費':'暫付及差額結算'}]);
    const nodes=[{id:'l',role:'buyer',name:from},{id:'r',role:'seller',name:to}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:'acquisition',modality:'cash',status:'active',stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:'現金',caseModalityShortLabel:'現金',topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:'main',kind:'cash',direction:'ltr',fromLabel:from,toLabel:to,headline:left+'付款方向'}],annotations:[{tag:'①',title:'關連交易',body:power?'新疆天富為首創環境的間接全資附屬公司。委託方屬北京首創熱力的全資附屬公司。':'本期銅銷售按第14A.81條與公告指明的前兩份合約已交易金額合併計算。'}],evidenceLinks:[{documentId:n,pages:[1,2,3],label:'合約及交易公告'}]});
  }
  function buildYukIndigo(c,docs){
    const configs={
      "01536":{
        a:"YS-20260612-9f2d587f8369",p:"YS-20260714-f38452651b19",z:"YS-20260922-1f3caa72a03e",o:"YS-20260924-793db59df7ad",date:"2026-09-22",event:"completion",status:"closed",
        ts:[["contract_cash_cny",37500000,"p"],["closing_cash_paid_cny",17500000,"o"],["deferred_cash_cny",20000000,"p"],["remaining_option_strike_cny",20100000,"p"],["acquired_stake",65,"z"]],
        left:"收購安徽潤升65%股權",right:"現金對價與其餘35%的期權",badge:"65%已交割 · 其餘35%屬未確認行權的期權",seller:"方海波",buyer:"Top Standard Limited",sSub:"轉讓安徽潤升65%股權",bSub:"煜榮集團間接附屬公司",main:"收購對價人民幣3,750萬",
        steps:[["2026年9月22日完成收購","安徽潤升成為間接非全資附屬公司"],["交割支付人民幣1,750萬","餘款2,000萬於交割後12個月內支付"],["其餘35%另有購買期權","全數行權價人民幣2,010萬"]],
        detail:"65%收購和其餘35%的選擇權是兩個股權步驟；尾款與行權款分列。",pagesA:[1,2,7],pagesP:[6,7,11],pagesZ:[1],pagesO:[32]
      },
      "08373":{
        a:"YS-20260722-5e58ece9df51",p:"YS-20260826-183dd5fb98c5",z:"YS-20261005-74019e09e86d",o:"YS-20260914-760ac7b8a4e9",date:"2026-10-05",event:"completion",status:"closed",
        ts:[["price_sgd",16588000,"p"],["gst_sgd",1492920,"p"]],
        left:"收購新加坡倉儲物業",right:"行權、股東批准及交割",badge:"樟宜南倉儲物業已完成收購",seller:"HSBC Institutional Trust",buyer:"CS Ceramiche Pte. Ltd.",sSub:"Mapletree Logistics Trust受託人",bSub:"靛藍星全資附屬公司",main:"對價1,658.8萬新加坡元",
        steps:[["7月22日簽物業購買期權協議","行權後構成有約束力的買賣"],["9月14日股東批准","另列消費稅149.3萬新加坡元"],["10月5日完成收購","39 Changi South Avenue 2"]],
        detail:"收購對價不含9%消費稅。期權費1%、行權款9%、交割餘款90%均為對價的一部分。",pagesA:[2,3,4,5],pagesP:[7,8,10],pagesZ:[1],pagesO:[1,2]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:c.code==="01536"?"shares":"asset",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:c.code==="01536"?"shares":"asset",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"股東通函"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:c.code==="01536"?"交割款及延期款披露":"股東表決結果"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"完成公告"}])]});
  }
  function buildCarrySem(c,docs){
    const configs={
      "00643":{
        a:"YS-20251024-4668cd67742c",p:"YS-20251224-a7cc04db819a",z:"YS-20260114-a096bcba2522",date:"2026-01-14",event:"terminated",status:"terminated",
        ts:[["indirect_block_shares",411293396,"a"],["block_total",54000000,"a"],["block_immediate_cash",5000000,"a"],["block_promissory_notes_face",49000000,"a"],["offer_price",.1331,"a"],["tenders_before_lapse",590000,"z"]],
        left:"先行收購 Mars Worldwide",right:"強制現金要約失效",badge:"要約失效 · 先行間接持股45.71%保留",seller:"Ma Xiaoqiu",buyer:"Zephyrus Capital",sSub:"曾俊豪執行股份抵押代賣方出售",bSub:"取得Mars Worldwide全部股權",main:"協議對價5,400萬港元",
        steps:[["2025年9月4日先行交易完成","500萬港元現金＋4,900萬港元承兌票據"],["2026年1月14日有效接納59萬股","每股0.1331港元 · 計入後僅45.77%"],["未達超過50%的要約條件","接納股份不轉讓，先行45.71%保留"]],
        detail:"Zephyrus Capital與曾俊豪為聯名要約人；Mars Worldwide持有411,293,396股恒富股份。票據面額並非當日支付的現金。",pagesA:[3,11,12,34],pagesP:[1],pagesZ:[2,3,4]
      },
      "09929":{
        a:"YS-20251203-94d7db42313f",p:"YS-20260120-b15d8aa1cb25",z:"YS-20260119-78598208b329",o:"YS-20260424-26e731f31de7",date:"2026-01-19",event:"completion",status:"closed",
        ts:[["block_shares",1500000000,"a"],["block_cash",165000000,"a"],["offer_price",.11,"a"],["accepted_shares",240000,"z"],["post_close_market_sale_shares",240000,"p"],["restored_float_pct",25,"p"],["bond_subscription_principal",44000000,"o"]],
        left:"澳達控股控股股份交割",right:"餘股要約、減持與另行發債",badge:"要約截止 · 公眾持股其後恢復至25%",seller:"SEM Enterprises",buyer:"Yao Capital",sSub:"出售15億股（75%）",bSub:"每股0.11港元現金",main:"先行對價1.65億港元",
        steps:[["2026年1月19日要約截止","有效接納24萬股 · 其後出售同等股數"],["4月兩批減持合共4.615億股","Yao Capital 持股由75%降至51.93%"],["4月24日另行發行可換股債","本金4,400萬港元 · 發行日尚未轉股"]],
        detail:"1月20日公開市場出售24萬股，公眾持股回到25%。4月10日出售1.8億股；4月14日再出售2.815億股。債券如按初始價全數轉換，按4月24日股本計算為59.94%。",pagesA:[2,8,9],pagesP:[1,2],pagesZ:[2,3,4],pagesO:[1,2]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    if(c.code==="09929"&&!["YS-20260410-sem-yao-disposal","YS-20260415-sem-yao-disposals"].every(id=>docs?.[id]?.caseId===c.id))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:c.code==="00643"?"綜合文件":"公眾持股恢復公告"}]:[]),...(c.code==="09929"?[{documentId:"YS-20260410-sem-yao-disposal",pages:[1],label:"4月10日減持"},{documentId:"YS-20260415-sem-yao-disposals",pages:[1,2],label:"4月14日減持"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"可換股債券發行公告"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"要約結果"}])]});
  }
  function buildEasyProminence(c,docs){
    const configs={
      "02442":{
        a:"YS-20251202-c90c28daf932",p:"YS-20251223-50e9987ee591",z:"YS-20260113-741285e2199d",o:"YS-20260121-35503241cef6",date:"2026-01-13",event:"completion",status:"closed",
        ts:[["block_shares",306000000,"a"],["block_cash",230000000,"a"],["offer_price",.7517,"z"],["accepted_shares",1,"z"],["public_float_after_acceptance",101999999,"z"],["float_restoration_disposed_shares",2000,"o"],["restored_public_shares",102001999,"o"]],
        left:"怡俊集團控股股份交割",right:"一股接納及公眾持股恢復",badge:"要約截止 · 一股接納 · 公眾持股其後恢復",seller:"Lofty Profit Investments",buyer:"天賦國際",sSub:"出售3.06億股（75%）",bSub:"2025年11月21日已交割",main:"現金對價2.3億港元",
        steps:[["2026年1月13日要約截止","一股有效接納 · 每股0.7517港元"],["公眾持股少於門檻一股","101,999,999股 · 25%門檻為1.02億股"],["1月21日出售一手2,000股","公眾持股恢復至102,001,999股"]],
        detail:"聯交所授予1月13日至21日的臨時豁免。控股股份先行交割、餘股接納和其後公開市場出售分列。",pagesA:[2,5,6],pagesP:[1],pagesZ:[2,3],pagesO:[6]
      },
      "02623":{
        a:"YS-20251104-3bac74abb7a3",p:"YS-20251218-d66001e70356",z:"YS-20260108-8cc56af28a3d",date:"2026-01-08",event:"completion",status:"closed",
        ts:[["block_shares",194959831,"a"],["block_cash",80000000,"a"],["offer_price",.4104,"a"],["accepted_shares",237768,"z"],["accepted_gross",97579.9872,"z"]],
        left:"先行收購55.66%股權",right:"強制現金要約結果",badge:"要約截止 · 計入有效接納後持股55.73%",seller:"鴻發控股及李運德",buyer:"Prominence及吳海淦",sSub:"出售194,959,831股",bSub:"2025年10月15日已交割",main:"現金對價8,000萬港元",
        steps:[["要約人Prominence取得50.10%","吳海淦另取得5.56%"],["2026年1月8日要約截止","每股0.4104港元 · 接納237,768股"],["有效接納總對價約9.8萬港元","計入有效接納後公眾持股43.56%"]],
        detail:"初始買賣涉及兩名買方，僅Prominence作出餘股要約。吳海淦以Prominence提供的無抵押免息貸款支付其買入款和印花稅。",pagesA:[2,5,6,19,20],pagesP:[1],pagesZ:[2,3]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"綜合文件"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"公眾持股恢復公告"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"要約結果"}])]});
  }
  function buildHengdeliOffer(c,docs){
    const p="YS-20260102-fcc63045ffc0",z="YS-20260123-aca8e33b7865",r="YS-20260907-1e785c824f1b",date="2026-01-23";
    const values=[["offer_price",.14,null],["accepted_shares",995708828,z],["concert_after_pct_registrations_assumed",80.69,z],["issuer_reported_public_float_pct_post_offer",29.25,z],["offeror_direct_pct_confirmed",53.61,r],["accepted_gross_before_per_holder_rounding",139399235.92,z]];
    if(c.stage?.status!=="closed"||c.stage.date!==date||![p,z,r].every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===date&&e.kind==="completion"&&e.state==="actual"&&e.evidence?.documentId===z)||!values.every(([key,value,id])=>c.terms?.some(t=>t.key===key&&t.value===value&&(!id||t.evidence?.documentId===id))))return null;
    const left="自願無條件現金要約",right="要約結果與持股",badge="要約截止 · 君雅直接持股53.61%";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:"closed",leftTitle:left,rightTitle:right,transitionLabel:"要約截止",outcomeBadge:badge}),[
      box("s","left",42,106,164,124,"seller","有效接納股東","接納995,708,828股（22.61%）"),
      box("b","left",438,106,178,124,"buyer","君雅有限公司","要約前直接持股31.00%"),
      box("out1","right",724,72,310,73,"target","君雅直接持股53.61%","中期報告確認持有2,360,954,705股"),
      box("out2","right",724,168,310,73,"creditor","一致行動方持股80.69%","收購守則口徑 · 按有效接納完成登記計"),
      box("out3","right",724,264,310,73,"creditor","公眾持股29.25%","上市規則口徑 · 按有效接納完成登記計")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:"現金要約每股0.14港元"}]);
    const nodes=[{id:"s",role:"seller",name:"有效接納股東"},{id:"b",role:"buyer",name:"君雅有限公司"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:"closed",stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:"有效接納股東",toLabel:"君雅有限公司",headline:"現金要約每股0.14港元"}],annotations:[{tag:"①",title:"要約對價及持股口徑",body:"有效接納按要約價計約1.394億港元（扣除印花稅前）。兩項披露持股口徑均計入 Swatch Group（香港）持有的4.378億股（9.94%）。"}],evidenceLinks:[{documentId:p,pages:[15,16],label:"綜合文件：要約前持股"},{documentId:z,pages:[2,3],label:"要約結果及公眾持股"},{documentId:r,pages:[26,27,28],label:"中期報告：實際持股"}]});
  }
  function buildIDTReceiver(c,docs){
    const configs={
      "00167":{
        a:"YS-20251117-e07bb9efba0c",p:"YS-20251231-0dde627bcd45",z:"YS-20260121-d37b9f3c8860",date:"2026-01-21",event:"completion",status:"closed",
        ts:[["combined_block_shares",312432503,"a"],["block_consideration",185616150,"p"],["offer_price",.5941,"p"],["accepted_shares",170917,"z"],["joint_offerors_after_pct",72.14,"z"],["public_float_pct",27.86,"z"],["hunglap_accepted_allocated_shares",111438,"z"],["horizon_accepted_allocated_shares",59479,"z"]],
        left:"接管人出售72.10%股份",right:"強制現金要約結果",badge:"要約截止 · 聯合要約人合計72.14%",seller:"股份接管人",buyer:"弘立科技及Horizon Heights",sSub:"Lam Kwun Leung（CCTH CPA）",bSub:"2025年10月30日已交割",main:"現金對價1.856億港元",
        steps:[["控股股份交割","弘立科技47.00% · Horizon Heights 25.10%"],["2026年1月21日要約截止","每股0.5941港元 · 170,917股有效接納"],["有效接納完成過戶後","分別持股47.03%及25.11% · 公眾持股27.86%"]],
        detail:"Tiger Energy 為出質人，Lead Winner 為承押人。股份由接管人行使權力出售。餘股要約有111,438股分配予弘立科技、59,479股予Horizon Heights，合計應付約10.15萬港元（扣印花稅前）。",pagesA:[2,5,6],pagesP:[11,21],pagesZ:[2,3,4]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"綜合文件"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"公眾持股恢復公告"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"要約結果"}])]});
  }
  function buildLingangThermal(c,docs){
    const configs={
      "01671":{
        a:"YS-20260526-4f1bb9bb7f3c",p:"YS-20260608-496213e294a7",z:"YS-20260629-87e303564da3",o:"YS-20260824-2026082400444",r:"YS-20260817-eecda9358423",date:"2026-06-29",event:"vote",status:"approved",
        ts:[["stake_increase",40,"r"],["cash_price",106522000,"r"],["effective_reported_stake",85,"r"],["acquisition_loan",74565000,"r"]],
        left:"收購原有附屬公司40%股權",right:"財務確認與法律過戶",badge:"股東已批准 · 財務按85%確認 · 過戶待核",seller:"天津自貿區新興科技集團",buyer:"天津天保能源",sSub:"出售臨港熱電40%股權",bSub:"原持45%，已納入合併報表",main:"約1.1億人民幣現金對價",
        steps:[["2026年6月29日股東批准","增持40個百分點 · 昆侖燃氣持15%"],["中期財務確認持股85%","附註18列報增持及現金支出"],["中報披露股權轉讓手續待完成","人民幣7,456.5萬元收購借款的股權質押待登記"]],
        detail:"賣方法定名稱為天津自貿試驗區新興科技產業集團有限公司。臨港熱電原已併表；中期財務附註與股權登記進度分列。",pagesA:[3,4,7,16,17],pagesP:[1,169],pagesZ:[1,2,3],pagesO:[15,41]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o,q.r].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="approved"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="approved"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"股東通函"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"中期報告：財務確認與股權登記"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"股東表決結果"}])]});
  }
  function buildPanAsiaWhitewash(c,docs){
    const a="YS-20261005-2026100502235",z="YS-20261126-2026112600329",e="YS-20261012-2026101201033",date="2026-11-26";
    const values=[["subscription_cash",80000000],["subscription_new_shares",212000000],["scheme_allocation",30000000],["post_base_investor_pct",66.55],["post_cb_investor_pct",65.76],["fee_loan_first_paid",4000000]];
    if(c.stage?.status!=="active"||c.stage.date!==date||![a,z,e].every(id=>docs?.[id]?.caseId===c.id)||!c.processEvents?.some(x=>x.date===date&&x.kind==="dispatch_extension"&&x.evidence?.documentId===z)||!values.every(([key,value])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===a)))return null;
    const left="擬議注資與債務重組",right="條款與最新進度",badge="正式協議待簽 · 通函期限延至2027年5月5日";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:"active",leftTitle:left,rightTitle:right,transitionLabel:"擬議安排",outcomeBadge:badge}),[
      box("s","left",42,106,164,124,"buyer","PC Dynamic","擬認購2.12億股合併股份"),
      box("b","left",438,106,178,124,"target","聯洋智能控股","擬十合一後發行認購股份"),
      box("out1","right",724,72,310,73,"target","擬持股66.55%","如可換股債一併轉換，為65.76%"),
      box("out2","right",724,168,310,73,"creditor","擬撥3,000萬港元予債權人計劃","已收首筆費用借款400萬港元"),
      box("out3","right",724,264,310,73,"creditor","2026年12月31日簽約期限","2027年2月1日清盤呈請續審")
    ],[],[{id:"main",panel:"left",kind:"cash",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:"擬現金認購8,000萬港元",proposedOrTerminated:true}]);
    const nodes=[{id:"s",role:"buyer",name:"PC Dynamic Holdings Ltd"},{id:"b",role:"target",name:"聯洋智能控股"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:"active",stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:"現金認購",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"cash",direction:"ltr",fromLabel:"PC Dynamic Holdings Ltd",toLabel:"聯洋智能控股",headline:"擬現金認購8,000萬港元",proposedOrTerminated:true}],annotations:[{tag:"①",title:"認購款及費用借款",body:"認購款擬分配予債權人計劃3,000萬、重組費用1,000萬及營運資金4,000萬港元。費用借款額度800萬港元，完成時納入認購代價，除非雙方另有約定。"}],evidenceLinks:[{documentId:a,pages:[2,4,5,11,12],label:"經修訂重組條款"},{documentId:z,pages:[1,2],label:"11月26日通函期限更新"},{documentId:e,pages:[1],label:"清盤呈請聆訊日期"}]});
  }
  function buildJinkeAuction(c,docs){
    const a="YS-20250919-29c62c36a966",p="YS-20251209-43a3fefd6965",u="YS-20260116-2026011601061",z="YS-20260213-a4703c93d0df",r="YS-20260220-IS20260220E00015",date="2026-02-20";
    const values=[["auction_qty",107797875,a],["auction_original_bid",666835067.6,a],["enhanced_offer_price",8.69,p],["accept_shares",261394453,z],["boyu_submitted",4480200,z],["post_concert_shares",590761099,z],["offeror_direct_shares",512818828,r],["thematic_bridge_direct_shares",77942271,r]];
    if(c.stage?.status!=="closed"||c.stage.date!==date||![a,p,u,z,r].every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date==="2026-02-13"&&e.kind==="completion"&&e.state==="actual"&&e.evidence?.documentId===z)||!values.every(([key,value,id])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===id)))return null;
    const left="司法拍賣股份過戶",right="修訂強制要約與退市",badge="要約截止 · 一致行動方99.49% · 撤銷上市";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:"closed",leftTitle:left,rightTitle:right,transitionLabel:"拍賣觸發強制要約",outcomeBadge:badge}),[
      box("s","left",42,106,164,124,"seller","金科地產","拍賣股份原股東"),
      box("b","left",438,106,178,124,"buyer","Broad Gongga（博裕）","9月18日過戶 · 取得約1.08億股"),
      box("out1","right",724,72,310,73,"target","退市條件於1月16日達成","基礎6.67＋補差2.02＝每股8.69港元"),
      box("out2","right",724,168,310,73,"creditor","2月13日要約截止","2.61億股有效接納 · 含博裕基金原持股份"),
      box("out3","right",724,264,310,73,"creditor","Broad Gongga直接持股86.36%","Thematic Bridge另持13.13% · 合計99.49%")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:"拍賣成交價約6.7億人民幣"}]);
    const nodes=[{id:"s",role:"seller",name:"金科地產"},{id:"b",role:"buyer",name:"Broad Gongga Investment Pte. Ltd."}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:"closed",stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:"司法拍賣／現金要約",caseModalityShortLabel:"現金要約",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:"金科地產",toLabel:"Broad Gongga Investment Pte. Ltd.",headline:"拍賣成交價約6.7億人民幣"}],annotations:[{tag:"①",title:"要約接納的持股歸屬",body:"博裕兩隻基金提交的448.02萬股已計入要約前一致行動持股，按集團口徑屬內部轉移。要約結算條款另設再投資選項；公告所列撤銷上市生效時間為2月20日下午4時。"}],evidenceLinks:[{documentId:a,pages:[2],label:"拍賣過戶及觸發要約"},{documentId:p,pages:[2,56],label:"修訂價及初始持股"},{documentId:u,pages:[2,4],label:"退市條件達成及補差"},{documentId:z,pages:[2,3],label:"要約結果及撤銷上市"},{documentId:r,label:"大股東權益披露 · 第20欄"}]});
  }
  function buildTianGeOffer(c,docs){
    const a="YS-20251119-dbd6c5f157cf",z="YS-20260108-7d3bb0742c2b",b="YS-20260108-97b5de492a0b",r="YS-20260129-bcdacd5f2d58",g="YS-20260625-2865fa2f457c",date="2026-01-08";
    const values=[["initial_trigger_shares",20000000,a],["later_market_purchases_shares",39050000,z],["accepted_offer_shares",121151339,z],["accepted_offer_pct",10.92,r],["core_concert_shares_after_tender_registration_assumed",511096339,z],["public_float_jan29_corrected_pct",20.85,r],["public_reclassified_award_shares",61300000,g],["public_float_restored_pct",26.37,g]];
    if(c.stage?.status!=="closed"||c.stage.date!==date||![a,b,z,r,g].every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===date&&e.kind==="completion"&&e.state==="actual"&&e.evidence?.documentId===z)||!values.every(([key,value,id])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===id)))return null;
    const left="場內增持觸發強制要約",right="要約結果及公眾持股",badge="要約已截止 · 其後公眾持股恢復至26.37%";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:"closed",leftTitle:left,rightTitle:right,transitionLabel:"強制現金要約",outcomeBadge:badge}),[
      box("s","left",42,106,164,124,"seller","場內交易對手","先購2,000萬股，後購3,905萬股"),
      box("b","left",438,106,178,124,"buyer","Truesense Trading","首輪增持後核心集團持31.63%"),
      box("out1","right",724,72,310,73,"target","1月8日要約截止","每股0.68港元 · 有效接納121,151,339股"),
      box("out2","right",724,168,310,73,"creditor","核心集團持股46.07%","計入接納後過戶 · 新浪另持27.04%"),
      box("out3","right",724,264,310,73,"creditor","6月25日公眾持股恢復為26.37%","1月29日修正為20.85% · 其後授予6,130萬股")
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:"首輪場內買入約1,359.8萬港元"}]);
    const nodes=[{id:"s",role:"seller",name:"場內交易對手"},{id:"b",role:"buyer",name:"Truesense Trading Limited"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:"closed",stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:"場內交易對手",toLabel:"Truesense Trading Limited",headline:"首輪場內買入約1,359.8萬港元"}],annotations:[{tag:"①",title:"要約及公眾持股",body:"有效接納佔股本10.92%，現金對價為8,238.3萬港元。6月25日授予9名員工的6,130萬股來自受託人既有股票，授出後按規則計入公眾持股。"}],evidenceLinks:[{documentId:a,pages:[2,3],label:"場內買入及要約觸發"},{documentId:z,pages:[2,3,4,5],label:"要約截止及持股"},{documentId:r,pages:[1,2,3],label:"1月29日公眾持股口徑修正"},{documentId:g,pages:[1,2,3],label:"6月25日公眾持股恢復"}]});
  }
  function buildElifeLapsed(c,docs){
    const configs={
      "00223":{
        a:"YS-20250514-709bd565bc27",p:"YS-20251104-ff9e1247ea21",z:"YS-20260105-d621090f4260",date:"2026-01-05",event:"terminated",status:"terminated",
        ts:[["targeted_and_required_shares",180000000,"z"],["offer_price",.056,"p"],["preheld_shares",226000000,"z"],["first_deadline_tendered_not_closed",5945686,"z"],["final_tendered_not_transferred",7007245,"z"]],
        left:"擬收購1.8億股的部分要約",right:"接納進度與要約失效",badge:"未達1.8億股接納門檻 · 未發生轉讓",seller:"合資格股東",buyer:"中國創新投資",sSub:"擬收購股份佔當時股本13.27%",bSub:"原持2.26億股（16.66%）",main:"每股0.056港元現金",
        steps:[["2025年10月28日先決條件達成","執行人員同意提出要約 · 要約人股東批准"],["12月22日首次截止後延期","5,945,686股有效接納"],["2026年1月5日部分要約失效","7,007,245股接納 · 達門檻的3.89%"]],
        detail:"全數接納對價為1,008萬港元。延長後仍未達門檻，接納股份並未過戶，要約人須退回股份文件。",pagesA:[1,2],pagesP:[9,10,11],pagesZ:[2,3]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o,q.r].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="terminated"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="terminated"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"部分要約文件"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"中期報告：財務確認與股權登記"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"接納結果及失效公告"}])]});
  }
  function buildAffluentChinaVC(c,docs){
    const configs={
      "01757":{
        a:"YS-20251023-d6d49d4eb125",p:"YS-20251210-5d6e927e3d72",z:"YS-20260102-70fe576a015d",o:"YS-20260119-00783d98a397",date:"2026-01-02",event:"completion",status:"closed",
        ts:[["block_shares",900000000,"p"],["block_cash",80000000,"p"],["offer_price",.089,"a"],["public_tender_accepted_shares",4390000,"z"],["public_tender_accepted_gross",390710,"z"],["secondary_placing_shares",4390000,"o"],["public_float_restored_pct",25,"o"]],
        left:"控股股份出售",right:"要約及公眾持股恢復",badge:"要約截止 · 公眾持股其後恢復至25%",seller:"Oriental Castle Group",buyer:"中國創投控股",sSub:"出售9億股（75%）",bSub:"2025年10月15日簽約即交割",main:"現金對價8,000萬港元",
        steps:[["2026年1月2日要約截止","每股0.089港元 · 439萬股有效接納"],["完成接納股份過戶後","一致行動方75.37% · 公眾持股24.63%"],["1月16日向獨立第三方配售","出售439萬股 · 公眾持股恢復至25%"]],
        detail:"兩筆439萬股方向相反：餘股接納對價39.1萬港元，其後由要約人經配售代理出售439萬股。發行人其後更名為環球華商俱樂部，股票代號維持01757。",pagesA:[2,5,7],pagesP:[1],pagesZ:[2,3],pagesO:[1,2]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"綜合文件"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"公眾持股恢復公告"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"要約結果"}])]});
  }
  function buildEuroEyesFYEO(c,docs){
    const configs={
      "01846":{
        a:"YS-20260226-3161352e2d5c",p:"YS-20260630-68857e77c6de",z:"YS-20260723-c98b1d63388e",date:"2026-07-22",event:"completion",status:"closed",
        ts:[["settled_eur",131350266,"z"],["base_eur",131766173,"a"],["buyer_eur",118625267,"z"],["manco_eur",12725000,"z"],["direct_stake",100,"a"],["ownership_acquisition_vehicle",90.31,"z"]],
        left:"荷蘭收購主體取得FYEO全部股權",right:"交割及再投資後股權",badge:"收購及再投資均於2026年7月22日完成",seller:"Committed Capital等五方",buyer:"EuroEyes Netherlands",sSub:"出讓FYEO Europe B.V. 100%股權",bSub:"德視佳為收購方擔保人",main:"交割現金對價約1.3億歐元",
        steps:[["德視佳持收購主體90.31%","出資約1.2億歐元"],["FYEO Manco持收購主體9.69%","四名管理人員與九名醫生透過STAK再投資"],["Manco合計投入1,272.5萬歐元","管理層1,065萬 · 醫生207.5萬歐元"]],
        detail:"交割對價為131,350,266歐元：固定股權價加鎖箱補償，扣除價值流失。德視佳與Manco的持股比例是收購主體的股權，該主體持有全部FYEO股權。",pagesA:[2,3,4],pagesP:[1],pagesZ:[1,2,3,4,5]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"股東通函"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"公眾持股恢復公告"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"交割對價及再投資股權"}])]});
  }
  function buildEBonOffice(c,docs){
    const configs={
      "00599":{
        a:"YS-20261014-f3c8cb20fa41",z:"YS-20261113-27b98732d974",date:"2026-11-10",event:"definitive_agreement",status:"active",
        ts:[["purchase_property",26000000,"a"],["deposit_first_paid",1000000,"a"],["deposit_second_paid",1600000,"z"],["closing_balance_payable",23400000,"z"]],
        left:"收購第一商業大廈兩間辦公室",right:"定金與交割安排",badge:"正式協議已簽 · 已付定金260萬港元",seller:"Zone One (CS) Limited",buyer:"新凌有限公司",sSub:"禮頓道33–35號 · 20樓A及B室",bSub:"怡邦行全資附屬公司",main:"約定現金對價2,600萬港元",
        steps:[["10月14日簽臨時協議","首筆定金100萬港元已付"],["11月10日簽正式協議","再付160萬港元 · 取代臨時協議"],["交割預計最遲2027年1月22日","餘款2,340萬港元於交割時支付"]],
        detail:"物業按現狀連租約購入，交割起按租約每月收取租金6.1萬港元，現有租約至2027年11月30日。公司按上市規則14.44取得合共52.8%的股東書面批准。",pagesA:[1,2,3,7],pagesZ:[1,2]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"綜合文件"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"公眾持股恢復公告"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"正式協議及已付款項"}])]});
  }
  function buildOSLBanxa(c,docs){
    const configs={
      "00863":{
        a:"YS-20250627-3bef4bf091b4",p:"YS-20260429-2026042904748",z:"YS-20260102-0edeae4a32d7",o:"YS-20260924-faac14e33bab",date:"2026-01-02",event:"completion",status:"closed",
        ts:[["contract_cap_cad",85200000,"a"],["per_target_share_cad",1.55,"a"],["cash_paid_hkd",484474000,"o"],["net_banxa_cash_outflow_hkd",447298000,"o"],["cash_paid_in_advance_hkd",484474000,"p"]],
        left:"加拿大法定安排收購Banxa",right:"預付、完成與現金口徑",badge:"2026年1月2日完成 · Banxa成為間接全資附屬公司",seller:"Banxa證券持有人",buyer:"OSL BNXA Acquisition",sSub:"普通股每股1.55加元",bSub:"OSL間接全資收購主體",main:"合約現金對價上限8,520萬加元",
        steps:[["2025年末已預付現金對價","年報列報約4.8億港元"],["2026年1月2日法定安排完成","收購主體取得Banxa全部普通股"],["收購淨現金流出約4.5億港元","扣除交割取得現金3,717.6萬港元"]],
        detail:"合約加元上限包括普通股、相關期權及認股權證。2025年已預付的現金對價與2026年完成時取得的現金分列。",pagesA:[2,3,17],pagesP:[],pagesZ:[1],pagesO:[43]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"2025年報附註23：預付對價"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"中期報告：實際對價及淨流出"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"法定安排完成"}])]});
  }
  function buildGTGoldNingshan(c,docs){
    const configs={
      "08299":{
        a:"YS-20260330-bf4de963728b",p:"YS-20260605-4f704ce3377b",z:"YS-20260629-1d96003045ad",o:"YS-20261112-9c72d1813d26",date:"2026-06-29",event:"completion",status:"closed",
        ts:[["cash_and_shares_hkd",585000000,"o"],["cash_consideration_hkd",247000000,"o"],["consideration_shares",676000000,"z"],["share_issue_hkd",.5,"a"]],
        left:"收購長盛聯合100%股權",right:"底層資產及交割後股權",badge:"2026年6月29日已交割 · 現金加代價股份",seller:"國泰黃金投資控股",buyer:"大唐黃金控股",sSub:"出售長盛聯合全部股權",bSub:"收購對價約5.9億港元",main:"現金約2.5億＋股份約3.4億港元",
        steps:[["步步高礦業 · 間接80%","持有寧陝金礦相關許可"],["金誠礦業 · 間接80%","持有兩座選礦廠"],["向賣方發行6.76億股","每股0.50港元 · 佔大唐黃金擴大股本7.09%"]],
        detail:"長盛聯合持有上善國際80%，上善國際間接持有步步高和金誠各100%。股東於6月25日批准收購及特別授權，6月29日完成交割及發行。",pagesA:[10,12,13,17,20,21],pagesP:[1],pagesZ:[1,2],pagesO:[22,23,28]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"mixed",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金及代價股份",caseModalityShortLabel:"現金及股份",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"股東通函"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"中期報告：對價及間接權益"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"交割及代價股份"}])]});
  }
  function buildFerrettiAzur(c,docs){
    const configs={
      "09638":{
        a:"YS-20260119-2026011900247",p:"YS-20260327-121e958e6d63",z:"YS-20260415-43d2d3de1727",o:"YS-20260424-c754b51f7859",date:"2026-04-13",event:"completion",status:"closed",
        ts:[["original_price_eur",3.5,"a"],["final_price_eur",3.9,"p"],["accepted_shares",29611598,"z"],["actual_cash_eur",115485232.2,"z"],["post_shares",78641625,"o"],["post_pct_confirmation",23.2336,"o"]],
        left:"自願部分現金要約",right:"接納與已確認持股",badge:"部分要約已完成 · Azúr直接持股23.23%",seller:"有效接納股東",buyer:"Azúr（KKCG Maritime）",sSub:"要約最多收購約5,213萬股",bSub:"要約前持有49,030,027股",main:"每股3.50歐元提高至3.90歐元",
        steps:[["4月13日截止 · 要約成為無條件","有效接納29,611,598股 · 全數承接"],["按最終條款約1.2億歐元","接納約為要約股份上限的56.8%"],["4月22日確認直接持有78,641,625股","按338,482,654股已發行股本計為23.23%"]],
        detail:"法拉帝在香港及米蘭上市。結算安排於4月20日，4月22日的披露確認直接持股。持股比例按同一已發行股本由股數計算。",pagesA:[1,2],pagesP:[1,2],pagesZ:[1,2],pagesO:[2,3]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"要約價修訂"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"發行人4月22日確認持股"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"要約結果"}])]});
  }
  function buildSomerleySky(c,docs){
    const configs={
      "08439":{
        a:"YS-20261015-b303ebda8423",p:"YS-20261022-dd795aefed66",z:"YS-20261112-ca2650c02491",date:"2026-11-12",event:"completion",status:"closed",
        ts:[["control_shares",75959948,"a"],["control_block_paid",62132430,"p"],["offer_price",.818,"p"],["option_price",.098,"p"],["accepted_offer_shares",684703,"z"],["accepted_option_count",2497000,"z"],["gross_share_consideration",560087.05,"z"],["gross_option_consideration",244706,"z"],["post_close_public_float",32.65,"z"]],
        left:"新百利控股股份交割",right:"股份及購股權要約",badge:"要約已截止 · 維持上市",seller:"Somerley Group",buyer:"Sky Links Group",sSub:"出售75,959,948股",bSub:"10月15日完成 · 佔當日股本50.1%",main:"控股股份對價約6,213.2萬港元",
        steps:[["股份要約：684,703股有效接納","每股0.818港元 · 對價約56.0萬港元"],["購股權要約：249.7萬份全部接納","每份0.098港元 · 註銷對價約24.5萬港元"],["計入要約接納後過戶","一致行動方約50.5% · 公眾持股32.65%"]],
        detail:"股份接納和購股權註銷分列。購股權註銷不發行股份，股份要約只增加有效接納所涉股份。",pagesA:[1,2],pagesP:[18,19],pagesZ:[2,3,4,5]
      }
    };
    const q=configs[c.code]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"shares",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"shares",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"綜合文件"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"公眾持股恢復公告"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"股份及購股權要約結果"}])]});
  }
  function buildNovemberShipCases(c,docs){
    const configs={
      "HK-02198-20261116-zayton-ethane-h2763-h2765":{
        a:"YS-20261116-ac2152c9d274",z:"YS-20261116-ac2152c9d274",date:"2026-11-16",event:"first_announcement",status:"active",
        ts:[["completion_carriers_contract",320128000,"a"],["per_hull_contract_price",160064000,"a"],["deposit_per_hull_due",24009600,"a"]],
        left:"承接兩份乙烷運輸船造船合同",right:"交付、付款及生效條件",badge:"換約已簽 · 待股東批准及退款保函",seller:"Zayton Shipping",buyer:"三江航運及三江運輸",sSub:"原買方移轉造船合同權利義務",bSub:"兩家附屬公司各承接一艘",main:"合同價合計約3.2億美元",
        steps:[["H2763／H2765各約1.6億美元","預計分別於2030年3月及9月底前交付"],["每艘首期為合同價15%","應付約2,401.0萬美元 · 交付時付60%"],["須股東批准及取得退款保函","上市公司擬另保證第2至第4期付款"]],
        detail:"承造及共同賣方為江南造船及中國船舶工業貿易。首期按原造船價抵扣，換約無另付溢價。每艘最終交付付款約9,603.8萬美元，視合同調整。退款保函條件僅可由相應新買方豁免。",pagesA:[1,2,4,5,6,7,8]
      },
      "HK-03877-20261117-two-80000dwt-grain-newbuilds":{
        a:"YS-20261117-e168af42600e",z:"YS-20261117-e168af42600e",date:"2026-11-17",event:"first_announcement",status:"active",
        ts:[["total_cost",652000000,"a"],["price_per_grain_carrier",326000000,"a"]],
        left:"訂造兩艘8萬載重噸糧船",right:"付款、交付及生效條件",badge:"造船合同已簽 · 待獨立股東批准及相應租約生效",seller:"中船澄西及中船貿易",buyer:"中國船舶租賃或指定方",sSub:"分由中船澄西及中船廣西承造",bSub:"直接訂造 · 每艘約3.3億離岸人民幣",main:"兩艘合計6.5億離岸人民幣",
        steps:[["每艘分五期付款","依生效、切鋼、鋪龍骨、下水、交付進度"],["預計2029年及2030年底前交付","合約允許延期，延誤賠償按約扣減"],["待獨立股東批准","並以相應光船租約生效等為先決條件"]],
        detail:"糧船組金額只計這兩艘。上市規則按交易系列另計同日集裝箱船換約及9月十艘交易。",pagesA:[1,2,3,4,6,15,16]
      },
      "HK-03877-20261117-container-novation-h2782-h2783":{
        a:"YS-20261117-f845eb803994",z:"YS-20261117-f845eb803994",date:"2026-11-17",event:"first_announcement",status:"active",
        ts:[["container_total",122800000,"a"],["container_per_vessel",61400000,"a"]],
        left:"承接兩艘集裝箱船造船合同",right:"換約、付款及交付",badge:"換約已簽 · 待獨立股東批准及相應租約生效",seller:"ASL Shipping",buyer:"CA Shipping",sSub:"原買方轉移造船合同權利義務",bSub:"集團間接非全資附屬公司",main:"兩份合同合計約1.2億美元",
        steps:[["H2782及H2783，各5,300 TEU","每艘合同價6,140萬美元"],["預計2028年9月及11月底前交付","每艘分五期，最大一筆於交付時支付"],["換約最遲生效日為2027年1月31日","若未生效，原造船合同仍由原買方履行"]],
        detail:"廣州文沖及中船貿易為共同賣方。換約待獨立股東批准及相應光船租約生效等條件。金額只計此組兩艘集裝箱船。",pagesA:[1,2,3,6,7,8,9,11,15]
      }
    };
    const q=configs[c.id]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"造船／換約條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"綜合文件"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"公眾持股恢復公告"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"要約結果"}])]});
  }
  function buildNovemberPropertyCases(c,docs){
    const configs={
      "HK-01109-20261030-hubei-lexing-shenzhen-court-auction":{
        a:"YS-20261030-8113ff91c243",z:"YS-20261030-8113ff91c243",date:"2026-10-30",event:"first_announcement",status:"active",
        ts:[["auction_equity_price",1109359048,"a"],["preauction_deposit_paid",221870000,"a"],["auction_balance_due",887489048,"a"]],
        left:"法院拍賣湖貝樂興全部股權",right:"競拍、付款及股權過戶",badge:"司法拍賣已中標 · 餘款及過戶待核",seller:"湖貝順潤投資",buyer:"潤加速創業服務（深圳）",sSub:"被執行人 · 原持標的全部股權",bSub:"華潤置地間接全資附屬公司",main:"中標價約11.1億人民幣",
        steps:[["競拍前已付約2.2億人民幣保證金","計入總對價 · 深圳中院為處置機關"],["餘款約8.9億人民幣","按公告須於11月13日前支付"],["付清後辦理法院裁定及變更登記","預期標的由原間接60%增至間接100%"]],
        detail:"原持有結構為華潤置地60%及華潤信託40%持有湖貝順潤。潤置控股為申請執行人；深圳中院委託估值，起拍價及中標價相同。",pagesA:[1,2,3,6,7,8]
      },
      "HK-00978-20261119-jiajingwan-550-parking":{
        a:"YS-20261119-baf95f08abd2",z:"YS-20261119-baf95f08abd2",date:"2026-11-19",event:"first_announcement",status:"active",
        ts:[["parking_agreed_price",33443000,"a"],["parking_spaces",550,"a"],["vendor_unaudited_book_value",48610100,"a"]],
        left:"嘉景灣地下車位買賣",right:"對價、交割與關連關係",badge:"買賣合同已簽 · 待付款及產權登記",seller:"重慶瀚置招商",buyer:"重慶招商置地開發",sSub:"出售550個未售地下車位",bSub:"招商局置地間接非全資附屬公司",main:"一次付現3,344.3萬人民幣",
        steps:[["對價等於8月31日評估值","車位已有產權證，賣方帳面約人民幣4,861萬"],["付清後辦理網簽及產權變更","全額付款為唯一交割先決條件"],["賣方為香港置地的30%受控公司","按14A.76(2)豁免通函及獨立股東批准"]],
        detail:"香港置地為買方上市集團另一非全資附屬公司的主要股東，屬附屬公司層面關連人士。估值、賣方帳面值及買方待付對價分列。",pagesA:[1,2,3,4,5]
      }
    };
    const q=configs[c.id]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易原件及結算條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"綜合文件"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"公眾持股恢復公告"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"要約結果"}])]});
  }
  function buildNovemberIndustrialCases(c,docs){
    const configs={
      "HK-02883-20261116-59-oilfield-support-vessels":{
        a:"YS-20261116-5ae60ce29d12",z:"YS-20261116-5ae60ce29d12",date:"2026-11-16",event:"first_announcement",status:"active",
        ts:[["vessel_program_price",10928000000,"a"],["vessel_total_count",59,"a"],["lng_supply_ship_count",46,"a"],["ahts_ship_count",13,"a"]],
        left:"59艘油田支持船建造計劃",right:"船隊構成、付款及交付",badge:"建造合同已簽 · 擬分批交付",seller:"福建東南造船牽頭聯合體",buyer:"中海油服旗下五個船東",sSub:"成員包括福建馬尾及福建福寧",bSub:"四家分公司及海南技術服務子公司",main:"合同總價109.3億人民幣（含稅）",
        steps:[["46艘LNG動力平台供應船","另有13艘常規動力AHTS船"],["按各艘付款進度分五期","生效、開工、鋪龍骨、下水、交付各20%"],["預計2028至2030年分批交付","單船合同將列明分工及建造船廠"]],
        detail:"2026年11月14日簽署，11月16日公布。合同須經各船東及建造方完成相應審批及確認程序後生效，交付款依工程變更、違約等條款調整。",pagesA:[1,2,3,4]
      },
      "HK-01606-20261116-henan-kunlun-it-equipment":{
        a:"YS-20261116-10b014e1d637",z:"YS-20261116-10b014e1d637",date:"2026-11-16",event:"first_announcement",status:"active",
        ts:[["henan_current_price",9676000000,"a"],["prior_batch_regulatory_cap",1500000000,"a"]],
        left:"購入資訊科技電腦設備",right:"租賃安排與規模測試",badge:"購入協議已簽 · 付款及交付待核",seller:"河南昆侖技術",buyer:"國銀金融租賃",sSub:"出售11月設備批次",bSub:"擬以自有資金及／或商業銀行貸款支付",main:"本次約96.8億人民幣",
        steps:[["完成購入後擬用於經營租賃","向第三方承租人出租該批設備"],["同賣方7月交易監管合計","7月批次上限15億人民幣獨立列示"],["聯交所核准替代規模測試","合計對價比率逾5%但低於25%"]],
        detail:"原合計對價比率逾25%且低於100%，其他比率均低於5%；按14.20獲准採用替代測試後，屬第14章須予披露交易。",pagesA:[1,2,3,4]
      }
    };
    const q=configs[c.id]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易執行結果",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易原件及結算條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"綜合文件"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"公眾持股恢復公告"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"要約結果"}])]});
  }
  function buildFinalThreeNov(c,docs){
    const configs={
      "HK-00247-20261119-kil11296-sky-regal-ura":{
        a:"YS-20261119-56d34275827b",z:"YS-20261119-56d34275827b",p:"YS-20261119-97c10fceab2c",date:"2026-11-19",event:"first_announcement",status:"active",modality:"合營出資",
        ts:[["ura_upfront_total",2688000000,"a"],["tender_deposit_paid",50000000,"a"],["award_upfront_due",2638000000,"a"],["project_capital_expected",5870000000,"a"],["great_eagle_commitment_expected",1467500000,"p"]],
        left:"市建局土瓜灣發展權",right:"合營持股、地價與出資",badge:"已獲中標通知 · 發展協議及餘款待核",
        seller:"市區重建局",buyer:"天璽有限公司",sSub:"批出土瓜灣道／榮光街發展權",bSub:"Modern Wise全資項目公司",main:"前期付款26.9億港元",
        steps:[["信和置業75% · 鷹君25%","通過Modern Wise間接持有項目公司"],["已付5,000萬港元投標按金","餘款26.4億港元於簽發展協議時支付"],["預計總資本投入58.7億港元","包括前期付款、建造與其他成本"]],
        detail:"餘款最遲於11月19日接納函起21個營業日支付。信和披露預計出資約44.03億港元；鷹君約14.675億港元。除非另有協定，接納起180天內簽正式合營協議。",pagesA:[1,2,3],pagesP:[1,2,3]
      },
      "HK-00521-20261120-tuas-link4-epson-options":{
        a:"YS-20261120-bd84d55f87ee",z:"YS-20261120-bd84d55f87ee",date:"2026-11-20",event:"first_announcement",status:"active",modality:"雙向期權",
        ts:[["option_exercise_price",43080000,"a"],["option_fee_escrow",430800,"a"]],
        left:"新加坡Tuas Link 4物業及動產",right:"期權次序及結算條件",badge:"雙向期權已簽 · 期權費已付託管",
        seller:"Singapore Epson Industrial",buyer:"CWT Project Logistics",sSub:"賣方；持有認沽期權",bSub:"買方；先有認購期權",main:"行使價4,308萬新加坡元",
        steps:[["取得JTC等適用原則性批准","批准日起兩週內買方可行使認購權"],["其後七個營業日賣方可行使認沽權","已付託管43.08萬，行使後轉作訂金"],["交割時支付餘下99%及適用稅項","行使通知後八週或2027年1月15日孰晚"]],
        detail:"標的包括租賃土地、地上樓宇和合約所定動產。截至該公告，期權費已付，交易仍待批准與行使。若2027年3月31日仍未取得批准，各方可商議延期；未延期或延期期限仍未取得批准，可依約撤銷。",pagesA:[1,2,3,4,5]
      },
      "HK-01846-20261116-china-clinics-minority-buyback":{
        a:"YS-20261116-160a8e088cba",z:"YS-20261116-160a8e088cba",date:"2026-11-16",event:"first_announcement",status:"active",modality:"現金收購及減資",
        ts:[["clinics_group_price",33230000,"a"],["shanghai_30_price",19800000,"a"],["guangzhou_30_price",4500000,"a"],["beijing_30_price",8930000,"a"]],
        left:"三家眼科公司收購自身少數股權",right:"三筆現金對價及減資",badge:"三份附條件協議已簽 · 減資及交割待核",
        seller:"上海靈瑞",buyer:"上海、廣州、北京三家標的",sSub:"各持30%註冊股權",bSub:"各自買回並擬註銷相應股權",main:"合計3,323萬人民幣",
        steps:[["上海 · 1,980萬元","分兩期，第二期最遲2027年11月16日"],["廣州 · 450萬元","最遲2028年11月16日支付"],["北京 · 893萬元","分別最遲於2027及2028年11月16日支付"]],
        detail:"三份協議共用交割條件，須完成股權轉讓和法定減資程序；完成後德視佳在三家公司的間接權益由約70%升至100%。上海首期為合同所列付款安排。",pagesA:[1,2,3,4,5,6,7,9,10]
      }
    };
    const q=configs[c.id]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易條件及後續安排",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:q.modality,caseModalityShortLabel:q.modality,topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易原件及結算條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"相關交易方公告"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"公眾持股恢復公告"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"要約結果"}])]});
  }
  function buildLastTwoNov(c,docs){
    const poll=verifiedNov27Vote(c,docs);
    const configs={
      "HK-01835-20260615-ningbo-jiaxing-lp":{
        a:"YS-20261112-d500c68cde83",z:poll?.doc||"YS-20261112-d500c68cde83",date:poll?"2026-11-27":"2026-11-12",event:poll?"vote":"dispatch",status:"active",modality:"現金收購基金份額",
        ts:[["maximum_combined_cash",40000000,"a"],["ningbo_cap",25000000,"a"],["jiaxing_cap",15000000,"a"],["ningbo_pct",16.99,"a"],["jiaxing_pct",44.12,"a"]],
        left:"兩項有限合夥份額收購",right:"份額比例、對價與交割",badge:poll?.label||"已刊發通函 · 待獨立股東表決",
        seller:"劉坤、劉冬梅",buyer:"瑞威資管",sSub:"分別轉讓寧波辰韜、嘉興實諾權益",bSub:"上市公司或其指定全資子公司",main:"合計上限4,000萬人民幣",
        steps:[["劉坤：寧波辰韜約16.99%","上限2,500萬元；初始分三期"],["劉冬梅：嘉興實諾約44.12%","上限1,500萬元；初始分三期"],["各自符合條件並付首期後交割","兩筆對價可按交割估值下調"]],
        detail:poll?"涵蓋兩項基金收購的第1號議案已全票通過；兩項交易仍須各自交割。":"兩個百分比按各基金認繳額計。兩項收購列於第1號議案，股東大會排定於11月27日11:30。",pagesZ:poll?.pages,pagesA:[7,14,15,16,17,18,19,20,21,22,368,369]
      },
      "HK-08245-20260824-multi-link":{
        a:"YS-20260824-13660f0848eb",z:"YS-20261113-08245-2026111301132",date:"2026-11-13",event:"circular_delay",status:"active",modality:"現金收購",
        ts:[["deal_consideration",5070000,"a"],["cash_at_signing_due",507000,"a"],["cash_by_20260915_due",3042000,"a"],["cash_at_completion_due",1521000,"a"],["tradelux_acquired_stake",70,"a"],["asian_link_acquired_stake",100,"a"],["post_close_working_capital",500000,"a"]],
        left:"廣匯通訊相關公司股權",right:"兩個標的與分期付款",badge:"附條件協議已簽 · 通函再延後",
        seller:"Lui Hon Fai",buyer:"Joy Ultima Holdings",sSub:"原持有兩家標的各100%",bSub:"烽翼集團全資子公司",main:"現金總對價507萬港元",
        steps:[["Asian Link 100% · Tradelux 70%","交割後兩家均納入合併報表"],["約定50.7萬＋304.2萬＋152.1萬","簽約、9月15日前及交割分三期"],["交割後向Tradelux提供50萬港元","營運資金單列；交割須股東批准"]],
        detail:"11月13日公告預計通函於11月27日或以前寄發。首公告合同列明分期應付金額；公告所列安排尚待後續披露確認付款與交割。",pagesA:[1,2,3,4,9,10,11],pagesZ:[1,2]
      }
    };
    const q=configs[c.id]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易條件及後續安排",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:q.modality,caseModalityShortLabel:q.modality,topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易原件及結算條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"相關交易方公告"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"公眾持股恢復公告"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:poll?"11月27日股東表決":"通函寄發進度公告"}])]});
  }
  function buildGreenPowerRightsActual(c,docs){
    const configs={
      "HK-01870-20260929-green-power-rights":{
        a:"YS-20261127-01870-2026112700009",z:"YS-20261127-01870-2026112700009",p:"YS-20261103-01870-2026110301014",date:"2026-11-27",event:"allotment",status:"active",modality:"現金供股",
        ts:[["consideration",35092365,"a"],["new_shares",254292500,"a"],["pal_shares",150455345,"a"],["excess_allotted",103837155,"a"],["underwriter_actual_shares",0,"a"]],
        left:"每持四股供一股",right:"有效申請與最終配發",badge:"254,292,500股全數配發 · 預計12月1日買賣",
        seller:"綠色電能集團",buyer:"合資格股東",sSub:"每股認購價0.138港元",bSub:"暫定配額及額外申請",main:"總募資約3,509.2萬港元",
        steps:[["暫定配額獲接納1.505億股","佔全部可供股數59.17%"],["額外獲配1.038億股","申請15.770億股；額外配發比率約6.58%"],["超額認購579.3%","RaffAello Securities包銷承接0股"]],
        detail:"11月19日供股成為無條件，11月27日公布配發；扣除包銷佣金及其他開支後淨募資估計3,140萬港元。",pagesA:[1,2,3,4],pagesP:[1,9,16,30,37]
      }
    };
    const q=configs[c.id]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易條件及後續安排",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:q.modality,caseModalityShortLabel:q.modality,topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易原件及結算條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"供股章程"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"公眾持股恢復公告"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"要約結果"}])]});
  }
  function buildCSFinancialRightsProposal(c,docs){
    const configs={
       "HK-08112-20261126-rights-consolidation":{
         a:"YS-20261126-a8c56560d6f4",z:"YS-20261126-a8c56560d6f4",date:"2026-11-26",event:"first_announcement",status:"active",modality:"先合股、後供股",
         ts:[["gross_cap",46801361.76,"a"],["rights_price",1.02,"a"],["rights_share_cap",45883688,"a"],["consolidated_shares",11470922,"a"],["estimated_net_proceeds",43800000,"a"]],
         left:"合股後每持一股可認購四股",right:"生效條件、股數與募資",badge:"已公告 · 合股及供股待各自批准",
         seller:"基石金融",buyer:"合資格股東",sSub:"合股生效後方進行供股",bSub:"每股供股價1.02港元",main:"總募資上限約4,680.1萬港元",
         steps:[["每20股現有股份合為1股","假設股數不變，合股後約1,147.1萬股"],["最多發行4,588.4萬股供股股份","足額認購估計淨募資4,380萬港元"],["不設包銷 · 剩餘股份盡力配售","結好證券擔任剩餘供股股份配售代理"]],
         detail:"合股須股東批准；供股須獨立股東批准。可認購股數以合股後持股為基準。最高募資額以足額認購為前提。",pagesA:[1,2,3,4,5,11,12,22]
       }
    };
    const q=configs[c.id]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易條件及後續安排",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:q.modality,caseModalityShortLabel:q.modality,topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易原件及結算條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"相關交易方公告"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"公眾持股恢復公告"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"要約結果"}])]});
  }
  function buildChengtongA320Lease(c,docs){
    const doc="YS-20261123-00217-aircraft-circular", orig="YS-20261106-00217-aircraft";
    if(c.stage?.status!=="approved"||c.stage?.date!=="2026-11-23"||docs?.[doc]?.caseId!==c.id||docs?.[orig]?.caseId!==c.id||!c.events?.some(e=>e.kind==="dispatch"&&e.state==="actual"&&e.evidence?.documentId===doc)||!c.events?.some(e=>e.kind==="written_approval_disclosed"&&e.state==="actual"&&e.evidence?.documentId===orig))return null;
    const values={consideration:155000000,estimated_total_lease_rent:177780000,estimated_lease_interest:22780000,lease_deposit:12000000,purchase_option:1,lease_quarterly_instalments:20,lease_term_years:5};
    if(!Object.entries(values).every(([key,value])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===doc)))return null;
    const status="approved",left="一架A320-214購買及租出",right="租金、保證金及期末權利",stageLabel="已獲書面股東批准 · 交付進度待核";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:480,status,leftTitle:left,rightTitle:right,transitionLabel:"五年融資租賃",outcomeBadge:stageLabel}),[
      box("vendor","left",42,84,169,86,"seller","HK Aircraft Sub6","香港航空全資附屬公司；出售飛機"),
      box("lessor","left",438,84,178,245,"buyer","誠通貿易","購機價15,500萬元；租期內保留所有權"),
      box("lessee","left",42,237,169,92,"target","香港航空","交付後承租五年"),
      box("rent","right",724,72,310,73,"target","預計租金合計17,778萬人民幣","含15,500萬元本金及約2,278萬元利息"),
      box("deposit","right",724,168,310,73,"creditor","租賃保證金1,200萬元","購機款付後一個營業日內繳交"),
      box("buy","right",724,264,310,73,"creditor","付清後可按人民幣1元買入","行權前須付清租金及其他應付款")
    ],[],[
      {id:"purchase",panel:"left",kind:"asset",step:"①",pathPoints:[[211,127],[438,127]],labelCenter:[324,127],labelWidth:200,labelHeight:35,label:"A320-214所有權",proposedOrTerminated:true},
      {id:"lease",panel:"left",kind:"asset",step:"②",pathPoints:[[438,283],[211,283]],labelCenter:[324,283],labelWidth:195,labelHeight:35,label:"交付後租予香港航空",proposedOrTerminated:true}
    ]);
    const nodes=[{id:"vendor",role:"seller",name:"HK Aircraft Sub6 Company Limited"},{id:"lessor",role:"buyer",name:"Chengtong Trading (International) Limited"},{id:"lessee",role:"target",name:"Hong Kong Airlines Limited"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:c.stage.date,stageLabel,caseArchetypeLabel:left,caseModalityLabel:"購機及融資租賃",caseModalityShortLabel:"融資租賃",topology,compactSummary:stageLabel,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:stageLabel},flows:[{id:"purchase",kind:"asset",direction:"ltr",fromLabel:"HK Aircraft Sub6",toLabel:"誠通貿易",headline:"移轉飛機所有權；買方付15,500萬元",proposedOrTerminated:true},{id:"lease",kind:"asset",direction:"rtl",fromLabel:"誠通貿易",toLabel:"香港航空",headline:"交付後租予香港航空",proposedOrTerminated:true}],annotations:[{tag:"①",title:"股東批准",body:"持股約53.14%的控股股東已按上市規則14.44書面批准；本案毋須召開股東大會。交付仍按購機及租賃協議的條件核對。 "},{tag:"②",title:"租賃付款",body:"香港航空按季後付本金及利息，共20期；利率於每年1月1日按LPR調整，保證金符合條件可抵末期付款。"}],evidenceLinks:[{documentId:doc,pages:[15,16,17,18,19,21],label:"通函：購機、融資租賃及審批"},{documentId:orig,pages:[1,2,3,4,5],label:"買賣及租賃首公告"}]});
  }
  function buildSecondaryAndGuaranteeNov(c,docs){
    const map={
      "HK-01643-20261126-modern-biotech-secondary-sale":{
        a:"YS-20261126-01643-modern-biotech-secondary-sale",event:"completion",status:"closed",modality:"股東出售舊股",ts:[["seller_gross_cash",31248000],["placed_shares",144000000],["per_share",0.217],["ownership_before",55.8],["ownership_after",35.8]],
        left:"股東向承配人出售已發行股份",right:"出售規模及持股變化",badge:"舊股配售已完成 · 賣方持股約35.8%",seller:"Modern Biotechnology",buyer:"多名承配人",sSub:"賣方；由孫新蕾全資持有",bSub:"由證券經紀安排；名單未披露",main:"轉讓1.44億股舊股",
        steps:[["每股0.217港元","按股數及單價計約3,124.8萬港元"],["賣方持股由55.8%降至35.8%","4.02億股降至2.58億股"],["配售款歸出售股東","交易為既有股份轉讓"]],
        detail:"上市公司公告記錄11月26日完成配售。經手證券經紀及多名承配人未具名。",pages:[1,2]
      },
      "HK-00108-20261126-chunyu-dalian-guarantee":{
        a:"YS-20261126-5d269d244d15",event:"first_announcement",status:"active",modality:"借款擔保及物業抵押",ts:[["principal",130000000],["loan_interest_pct",3.8],["guarantee_fee_pct",1],["guarantee_fee_cap",1300000]],
        left:"大連銀行向關連方提供一年貸款",right:"擔保、抵押及費用",badge:"保證及抵押合同已簽訂",seller:"大連銀行",buyer:"北京中和鴻潤",sSub:"授信銀行及抵押權人",bSub:"關連借款人",main:"貸款本金1.3億人民幣",
        steps:[["北京萬港通提供連帶還款擔保","並將其物業抵押予大連銀行"],["借款人按實提金額付年費1%","擔保費付萬港通；按全提計一年130萬元"],["借款利息3.8%","借款人把利息另付大連銀行"]],
        detail:"本次一年借款自11月26日起算；保證及抵押合同各有單獨到期條款。關連財務資助按第14A章申報及公告，合計適用比率超過0.1%、低於5%。",pages:[1,2,3,4]
      }
    };
    const q=map[c.id],date="2026-11-26";if(!q||c.stage?.status!==q.status||c.stage?.date!==date||docs?.[q.a]?.caseId!==c.id||!c.events?.some(e=>e.date===date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.a)||!q.ts.every(([key,value])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q.a)))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const finished=q.status==="closed",kind=finished?"asset":"cash";
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:finished?"舊股配售":"貸款與擔保",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,finished?"seller":"creditor",q.seller,q.sSub),box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind,step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:!finished}]);
    const nodes=[{id:"s",role:finished?"seller":"creditor",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:q.modality,caseModalityShortLabel:q.modality,topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind,direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:!finished}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pages,label:"聯交所公告"}]});
  }
  function buildSouthChinaVote(c,docs){
    const configs={
      "HK-00413-20260827-wah-shing-sparkling":{
        a:"YS-20260827-78fd9b4a1160",z:"YS-20261126-00413-2026112600685",date:"2026-11-26",event:"vote",status:"approved",modality:"出售股權",
        ts:[["sale_shares",16000000,"a"],["independent_votes_for",969441705,"z"],["independent_votes_against",0,"z"],["shares_required_to_abstain",9097448953,"z"]],
        left:"出售Sparkling Honor及華昇電子",right:"批准、付款與交割",badge:"獨立股東已批准 · 待交割",
        seller:"WTS International (BVI)",buyer:"Best Galaxy Holdings",sSub:"南華集團控股旗下賣方",bSub:"由控股股東吳鴻生全資持有",main:"兩家標的公司全數股權",
        steps:[["獨立股東969,441,705票贊成","零票反對；9,097,448,953股須迴避表決"],["現金對價1,600萬港元","按協議在交割時或書面約定較後日期支付"],["兩家標的交割後退出合併範圍","標的持有的物業估值與股權對價分列"]],
        detail:"11月26日表決通過股權買賣協議。按上市規則第14及14A章披露。最新表決公告確認股東批准，交易仍待交割進度。",pagesA:[1,3,4,5,6],pagesZ:[1,2]
      }
    };
    const q=configs[c.id]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易條件及後續安排",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:q.modality,caseModalityShortLabel:q.modality,topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易原件及結算條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"相關交易方公告"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"公眾持股恢復公告"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"股東大會表決結果"}])]});
  }
  function buildPuruiSeparateBatches(c,docs){
    const a={
      "HK-01606-20261125-purui-equipment-733":{src:"YS-20261125-01606-purui-equipment-733",date:"2026-11-25",purchase:733000000,prior:3727000000,amount:"本批約7.3億人民幣",old:"普睿此前批次約37.3億元",sub:"9至10月批次；與本批採購分列"},
      "HK-01606-20261126-purui-equipment-1178":{src:"YS-20261126-01606-purui-equipment-1178",date:"2026-11-26",purchase:1178000000,prior:4460000000,amount:"本批約11.8億人民幣",old:"普睿此前批次約44.6億元",sub:"9至11月此前的採購含11月25日批次"}
    }[c.id];
    if(!a||c.stage?.status!=="active"||c.stage.date!==a.date||docs?.[a.src]?.caseId!==c.id||!c.events?.some(e=>e.date===a.date&&e.kind==="first_announcement"&&e.state==="actual"&&e.evidence?.documentId===a.src)||!Object.entries({purchase_price:a.purchase,same_vendor_prior_batch:a.prior,prior_related_vendor_limit:4000000000}).every(([key,value])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===a.src)))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const status="active",left="本批電腦設備採購",right="租賃用途及跨批次合計測試",stageLabel="設備採購協議已簽 · 擬作經營租賃";
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:"本批採購及後續用途",outcomeBadge:stageLabel}),[
      box("s","left",42,106,164,124,"seller","廣東普睿雲創","出售本次設備；最終擁有人為華勤技術"),
      box("b","left",438,106,178,124,"buyer","國銀金融租賃","自有資金及／或商業銀行貸款"),
      box("r1","right",724,72,310,73,"target","購買完成後擬用於經營租賃","設備擬出租予第三方承租人"),
      box("r2","right",724,168,310,73,"creditor",a.old,a.sub),
      box("r3","right",724,264,310,73,"creditor","同一最終擁有人旗下上海域允","7月另一交易上限40億元，另列合計測試")
    ],[],[{id:"purchase",panel:"left",kind:"asset",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:a.amount,proposedOrTerminated:true}]);
    const nodes=[{id:"s",role:"seller",name:"廣東普睿雲創科技有限公司"},{id:"b",role:"buyer",name:"國銀金融租賃股份有限公司"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:a.date,stageLabel,caseArchetypeLabel:left,caseModalityLabel:"現金",caseModalityShortLabel:"現金",topology,compactSummary:stageLabel,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:stageLabel},flows:[{id:"purchase",kind:"asset",direction:"ltr",fromLabel:"廣東普睿",toLabel:"國銀金租",headline:a.amount,proposedOrTerminated:true}],annotations:[{tag:"①",title:"規模測試",body:"公告按第14.22條合計本次及先前交易。聯交所按第14.20條同意替代規模測試；合計對價比率高於5%但低於25%。"}],evidenceLinks:[{documentId:a.src,pages:[1,2,3,4],label:"採購公告及上市規則分類"}]});
  }
  function buildChengtongGM2026(c,docs){
    const poll=verifiedNov27Vote(c,docs);
    const q=({"HK-00217-20261020-dunde-mining-leaseback":{"role":"leaseback","title":"敦德礦業設備售後回租","src":"YS-2026102001301-00217","circ":"YS-20261110-00217-dunde-mining-leaseback","pages":[13,14,15,16,19,20,50,51],"amount":250000000,"seller":"敦德礦業","steps":[["27項設備購入後租回六年","敦德原為設備所有人，轉讓後成為承租人"],["估計租金27,685萬元","含25,000萬元本金及估計2,685萬元利息"],["與同集團先前交易合計測試","獨立列本批購入額；等候股東表決"]],"note":"按原件與仍存續的同集團先前交易合計分類；本案資產價及租金各列。","context":"按披露與寶鋼及伊犁相關先前交易合計，最高適用比率超過100%。"},"HK-00217-20261021-xinte-wengniuteqi-leasebacks":{"role":"leaseback","title":"新疆華電新特及翁牛特旗售後回租","src":"YS-2026102101075-00217","circ":"YS-20261110-00217-xinte-wengniuteqi-leasebacks","pages":[11,13,30,39,51,75,76],"amount":43000000,"seller":"華電新特及翁牛特旗","steps":[["新疆華電新特 · 1,300萬元","光伏組件支架及輸電電纜；租回兩年"],["華電翁牛特旗 · 3,000萬元","風機塔筒及風機；租回兩年"],["兩項協議分別提交股東批准","出租人於租期內保留設備所有權"]],"note":"兩筆租賃各有協議和表決議案；本頁按同次公告展示兩筆。","context":"按披露與先前同系華電交易合計，最高適用比率超過100%。"},"HK-00217-20261022-jinmei-lease-assignment":{"role":"assignment","title":"晉煤租賃資產及收款權轉讓","src":"YS-2026102201484-00217","circ":"YS-20261110-00217-jinmei-lease-assignment","pages":[3,7,10,20,21,23,24,51,75],"amount":300000000,"seller":"焦煤融資租賃","steps":[["焦煤融資租賃移轉資產與租賃收款權","實際轉讓日按未還租賃本金定價"],["晉煤太鋼能源繼續承租","轉讓後直接向誠通融資租賃付到期款"],["合同所定轉讓日為12月31日","雙方可另議；通函假設情景與實際交割分列"]],"note":"文件將資產及收款權轉讓與原售後回租分開，付款和債權轉移以實際轉讓日為準。","context":"轉讓屬主要交易；原晉煤回租按同集團先前交易合計屬非常重大收購。公告亦按第13.13條披露。"},"HK-00217-20261022-huadian-five-leasebacks":{"role":"leaseback","title":"華電山西五項設備售後回租","src":"YS-2026102201490-00217","circ":"YS-20261110-00217-huadian-five-leasebacks","pages":[13,44,51,76,77,78],"amount":245000000,"seller":"五家山西華電系企業","steps":[["陽高4,500萬 · 爍晶6,000萬","陽高租回三年，爍晶租回兩年"],["文水5,000萬 · 大同8,000萬","兩項各自租回兩年"],["雲岡1,000萬 · 租回兩年","五筆對價合計2.45億人民幣"]],"note":"五項協議對應五個表決議案，各自設備及金額獨立。","context":"按披露與先前華電同集團交易合計，最高適用比率超過100%。"}})[c.id], circDate="2026-11-10",date=poll?"2026-11-27":circDate,status="active";
    if(!q||c.stage?.date!==date||c.stage?.status!==status||docs?.[q.src]?.caseId!==c.id||docs?.[q.circ]?.caseId!==c.id||!c.events?.some(e=>e.date===circDate&&e.kind==="dispatch"&&e.state==="actual"&&e.evidence?.documentId===q.circ)||!c.terms?.some(t=>t.key==="consideration"&&t.value===q.amount&&t.evidence?.documentId===q.circ))return null;
    const assignment=q.role==="assignment",left=assignment?"承接租賃資產及收款權":"購入設備並租回予原持有人",right=assignment?"承租、定價及轉讓":"分項設備、租期及審批",stageLabel=poll?.label||"通函已刊發 · 待股東表決結果";
    const buyer="誠通融資租賃", headline=(assignment?"上限":"合計")+new Intl.NumberFormat("zh-HK",{maximumFractionDigits:1}).format(q.amount/10000)+"萬人民幣";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:assignment?"出租人變更":"設備售後回租",outcomeBadge:stageLabel}),[
      box("s","left",42,106,164,124,"seller",q.seller,assignment?"原出租人兼轉讓人":"原設備持有人兼承租人"),box("b","left",438,106,178,124,"buyer",buyer,assignment?"擬受讓租賃資產及相關款項權利":"買方兼出租人"),
      ...q.steps.map(([t,s],i)=>box("o"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",poll?t.replace("分別提交股東批准","均已獲股東批准"):t,poll?s.replace("等候股東表決","已獲股東批准"):s))
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:headline,proposedOrTerminated:true}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel,caseArchetypeLabel:left,caseModalityLabel:assignment?"租賃轉讓":"售後回租",caseModalityShortLabel:assignment?"租賃轉讓":"售後回租",topology,compactSummary:stageLabel,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:stageLabel},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:q.seller,toLabel:buyer,headline,proposedOrTerminated:true}],annotations:[{tag:"①",title:"交易與上市規則",body:q.note+" "+q.context}],evidenceLinks:[{documentId:q.src,pages:[1,2,3],label:"原交易公告"},{documentId:q.circ,pages:q.pages,label:"通函及股東大會通知"},...(poll?[{documentId:poll.doc,pages:poll.pages,label:"股東表決第"+poll.res+"號議案"}]:[])]});
  }
  function buildLitaoZteStandalone(c,docs){
    const configs={
      "HK-01606-20261123-zte-equipment":{
        a:"YS-20261123-01606-zte-equipment",z:"YS-20261123-01606-zte-equipment",date:"2026-11-23",event:"first_announcement",status:"active",modality:"現金",
        ts:[["purchase_price",3500000000,"a"]],
        left:"向中興通訊購買電腦設備",right:"資金、用途及監管分類",badge:"設備採購協議已簽 · 擬作經營租賃",
        seller:"中興通訊",buyer:"國銀金融租賃",sSub:"設備賣方",bSub:"設備買方及擬任出租人",main:"本批對價上限35億人民幣",
        steps:[["使用自有資金及／或銀行貸款","35億元是採購上限"],["購買完成後擬用作經營租賃","將與第三方承租人訂立租約"],["適用百分比率高於5%但低於25%","公告分類為第14章須予披露交易"]],
        detail:"本圖以本次設備採購合同列示。公告未列承租人名單或租賃已生效。",pagesA:[1,2,3]
      },
      "HK-01606-20261124-litao-equipment":{
        a:"YS-20261124-01606-litao-equipment",z:"YS-20261124-01606-litao-equipment",date:"2026-11-24",event:"first_announcement",status:"active",modality:"現金",
        ts:[["purchase_price",1090000000,"a"]],
        left:"向立滔精密購買電腦設備",right:"資金、用途及監管分類",badge:"設備採購協議已簽 · 擬作經營租賃",
        seller:"立滔精密智造（昆山）",buyer:"國銀金融租賃",sSub:"賣方；最終擁有人為立訊精密",bSub:"設備買方及擬任出租人",main:"本批約10.9億人民幣",
        steps:[["使用自有資金及／或銀行貸款","10.9億元為披露的約數"],["購買完成後擬用作經營租賃","將與第三方承租人訂立租約"],["適用百分比率高於5%但低於25%","公告分類為第14章須予披露交易"]],
        detail:"本圖以本次設備採購合同列示。公告未列承租人名單或租賃已生效。",pagesA:[1,2,3,4]
      }
    };
    const q=configs[c.id]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易條件及後續安排",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:q.modality,caseModalityShortLabel:q.modality,topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易原件及結算條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"相關交易方公告"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"公眾持股恢復公告"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"要約結果"}])]});
  }
  function buildCIMCGuaranteePay(c,docs){
    const src="YS-20261126-231c0eca30e1", orig="YS-20261103-0341307b4267", date="2026-11-26",status="active";
    if(c.stage?.date!==date||c.stage.status!==status||docs?.[src]?.caseId!==c.id||docs?.[orig]?.caseId!==c.id||!c.events?.some(e=>e.kind==="payment"&&e.date==="2026-11-25"&&e.state==="actual"&&e.evidence?.documentId===src)||!Object.entries({guarantee_cash_paid:222210016.69,guaranteed_principal_paid:220480221.12,guaranteed_interest_paid:1729795.57,underlying_balance_due:435108707.05,guaranteed_pct:51.07}).every(([key,value])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===src)))return null;
    const left="中集集團向銀團履行擔保",right="三筆貸款、代償及追償權",stageLabel="已支付擔保款 · 追償及減值待確認";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:480,status,leftTitle:left,rightTitle:right,transitionLabel:"代償及追償",outcomeBadge:stageLabel}),[
      box("cimc","left",42,96,164,105,"buyer","中集集團","擔保方及實際付款方"),
      box("banks","left",438,96,178,105,"creditor","農業銀行及中國銀行","銀團貸款方；農業銀行牽頭"),
      box("borrower","left",42,240,164,103,"target","中集產城及反擔保方","借款人及提供反擔保的少數股東"),
      box("debt","right",724,72,310,73,"target","銀團三筆貸款到期約4.4億元","按11月25日，含本金、利息及費用"),
      box("guarantee","right",724,168,310,73,"creditor","擔保比例51.07% · 已付約2.2億元","本金22,048.0萬元；利息及費用173.0萬元"),
      box("credit","right",724,264,310,73,"creditor","代償後形成應收追償款","後續收回金額與減值結果待公告")
    ],[],[
      {id:"p",panel:"left",kind:"cash",step:"①",pathPoints:[[206,149],[438,149]],labelCenter:[322,149],labelWidth:205,labelHeight:35,label:"11月25日全額代償",proposedOrTerminated:false},
      {id:"r",panel:"left",kind:"asset",step:"②",pathPoints:[[124,201],[124,240]],labelCenter:[220,220],labelWidth:172,labelHeight:30,label:"形成追償權",proposedOrTerminated:false}
    ]);
    const nodes=[{id:"cimc",role:"buyer",name:"中集集團"},{id:"banks",role:"creditor",name:"農業銀行及中國銀行"},{id:"borrower",role:"target",name:"中集產城及反擔保方"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"debt_restructuring",modality:"cash",status,stageDate:date,stageLabel,caseArchetypeLabel:left,caseModalityLabel:"擔保代償及追償",caseModalityShortLabel:"擔保代償",topology,compactSummary:stageLabel,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:stageLabel},flows:[{id:"p",kind:"cash",direction:"ltr",fromLabel:"中集集團",toLabel:"銀團",headline:"11月25日已付222,210,016.69元人民幣",proposedOrTerminated:false},{id:"r",kind:"asset",direction:"ltr",fromLabel:"中集集團",toLabel:"借款人及反擔保方",headline:"代償後取得追償權",proposedOrTerminated:false}],annotations:[{tag:"①",title:"到期和付款",body:"第三筆貸款本金172,460,112元，從原訂2027年1月7日提前至2026年11月24日到期。11月25日支付全部應付擔保額。"}],evidenceLinks:[{documentId:orig,pages:[1,2],label:"首次擔保披露"},{documentId:src,pages:[1,2,3],label:"代償及後續追償"}]});
  }
  function buildLifeTechInvestmentNov(c,docs){
    const q={a:"YS-20261106-49a6b79957ff",b:"YS-20261124-eede5dfdd7c3",z:"YS-20261126-cd715a184efb"},date="2026-11-26",status="active";
    const required=[["zylox_spv_commitment",889300000,"a"],["spv_lifetech_commitment",1482100000,"a"],["first_tranche_shares",370536992,"a"],["second_tranche_shares",555805488,"a"],["spv_stake",16.7,"a"],["zylox_economic_stake",10,"a"],["zylox_h_net",863600000,"z"],["zylox_spv_pct",60,"a"]];
    if(c.stage?.status!==status||c.stage?.date!==date||!Object.values(q).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===date&&e.kind==="supplement"&&e.state==="actual"&&e.evidence.documentId===q.z)||!c.processEvents?.some(e=>e.date==="2026-12-07"&&e.kind==="completion"&&e.state==="expected"&&e.evidence.documentId===q.b)||!required.every(([key,value,which])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[which])))return null;
    const left="歸創通橋經共同投資載體認購",right="先健科技兩批新股及獨立融資",stageLabel="先健新股獲上市批准 · 首批預計12月7日交割";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:480,status,leftTitle:left,rightTitle:right,transitionLabel:"擬投資與H股發行",outcomeBadge:stageLabel}),[
      box("z","left",42,96,164,110,"buyer","歸創通橋","擬出資約8.9億港元"),
      box("spv","left",438,96,178,245,"target","GL Lighthouse Two","歸創通橋擬持60%；Lighthouse One持餘下40%"),
      box("life","left",42,236,164,105,"seller","先健科技","兩批新股合計約9.3億股，每股1.60港元"),
      box("p1","right",724,72,310,73,"target","首批約3.7億股 · 次批約5.6億股","各批交割條件獨立；首批待交割"),
      box("p2","right",724,168,310,73,"creditor","載體持16.7% · 歸創通橋約10.0%","全部兩批完成後；載體及標的均不併表"),
      box("p3","right",724,264,310,73,"creditor","Lighthouse Three另認購歸創H股","每股22港元；預計淨募資約8.6億港元")
    ],[],[
      {id:"spv",panel:"left",kind:"cash",step:"①",pathPoints:[[206,151],[438,151]],labelCenter:[322,151],labelWidth:205,labelHeight:35,label:"認購載體60%股權",proposedOrTerminated:true},
      {id:"life",panel:"left",kind:"cash",step:"②",pathPoints:[[438,284],[206,284]],labelCenter:[322,284],labelWidth:205,labelHeight:35,label:"擬投入約14.8億港元",proposedOrTerminated:true}
    ]);
    const nodes=[{id:"z",role:"buyer",name:"歸創通橋"},{id:"spv",role:"target",name:"GL Lighthouse Two Investment Limited"},{id:"life",role:"seller",name:"先健科技"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel,caseArchetypeLabel:left,caseModalityLabel:"認購新股及共同投資",caseModalityShortLabel:"新股認購",topology,compactSummary:stageLabel,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:stageLabel},flows:[{id:"spv",kind:"cash",direction:"ltr",fromLabel:"歸創通橋",toLabel:"Lighthouse Two",headline:"歸創通橋擬出資約8.9億港元",proposedOrTerminated:true},{id:"life",kind:"cash",direction:"rtl",fromLabel:"Lighthouse Two",toLabel:"先健科技",headline:"兩批認購總額約14.8億港元",proposedOrTerminated:true}],annotations:[{tag:"①",title:"載體及持股口徑",body:"Lighthouse Two持有先健股權，兩家出資方按各自比例分證券帳戶。歸創通橋實際經濟權益是全部交割後約10.0%。"},{tag:"②",title:"另行發行H股",body:"Lighthouse Three認購的是歸創通橋的H股。補充公告確認擬將淨額用於相關潛在投資，當時未指定項目。"}],evidenceLinks:[{documentId:q.a,pages:[1,2,5,6],label:"兩筆認購公告"},{documentId:q.b,pages:[1],label:"先健新股上市批准及預期交割"},{documentId:q.z,pages:[1,2,3],label:"持股、會計及募資用途補充"}]});
  }
  function buildNotesFundMOU(c,docs){
    const configs={
      "HK-03329-20261126-barclays-notes":{
        a:"YS-20261126-608599f8773f",z:"YS-20261126-608599f8773f",date:"2026-11-24",event:"completion",status:"closed",modality:"場外票據買入",
        ts:[["cash_total",18902605.88,"a"],["principal_total",19200000,"a"],["cash_4",10040522.22,"a"]],left:"取得四筆Barclays PLC票據",right:"成交對價、本金及對手",badge:"11月24日完成最後一筆 · 11月26日披露",
        seller:"三家場外交易對手",buyer:"Preferred Investment",sSub:"Barclays Bank、摩根大通及摩根士丹利",bSub:"交銀國際全資附屬公司",main:"四筆合計1,890.3萬美元",
        steps:[["Barclays Bank：前兩筆本金500萬美元","9月30日及10月14日；對價合計466.5萬"],["摩根大通：第三筆本金420萬美元","10月29日；對價419.7萬"],["摩根士丹利：第四筆本金1,000萬美元","11月24日；對價1,004.1萬"]],
        detail:"四筆本金合計1,920萬美元。公告按第14.22條合計，最高適用比例逾5%且低於25%。票據發行人為Barclays PLC。",pagesA:[1,2,3,5]
      },
      "HK-01635-20261126-zhiqichen-followon":{
        a:"YS-20261126-8c93a47c943c",z:"YS-20261126-8c93a47c943c",date:"2026-11-26",event:"first_announcement",status:"active",modality:"基金追加認繳",
        ts:[["new_lp_commitment",570000000,"a"],["initial_lp_commitment",190000000,"a"],["lp_commitment_total",760000000,"a"],["fund_commitments_total",800000000,"a"]],left:"大眾公用追加認繳基金",right:"兩方認繳及實繳安排",badge:"已簽新合夥協議 · 按投資進度繳款",
        seller:"大眾公用",buyer:"中保投智啟宸基金",sSub:"有限合夥人",bSub:"中保投資任普通合夥人及管理人",main:"本次追加5.7億人民幣",
        steps:[["大眾公用認繳由1.9億增至7.6億元","佔總認繳95%，比例維持"],["中保投資認繳由1,000萬增至4,000萬元","基金總認繳由2億增至8億元"],["現金實繳按管理人繳款通知","金額及時間取決於投資進度及資金需要"]],
        detail:"本次追加和與先前認繳合併計算，最高適用比例均逾5%且低於25%。",pagesA:[1,2,3]
      },
      "HK-09886-20261126-macao-mou":{
        a:"YS-20261126-a35bb6b709ed",z:"YS-20261126-a35bb6b709ed",date:"2026-11-26",event:"first_announcement",status:"active",modality:"擬收購股權及貸款",
        ts:[["proposal_price_floor",91000000,"a"],["earnest_amount",5000000,"a"],["target_equity_pct",100,"a"]],left:"擬購入澳門標的股權及股東貸款",right:"擬對價、意向金與磋商",badge:"已簽意向備忘錄 · 待正式協議",
        seller:"兩名獨立賣方",buyer:"叮噹健康香港附屬公司",sSub:"身份未披露",bSub:"諒解備忘錄簽約方",main:"擬購入全部股權及股東貸款",
        steps:[["總對價下限9,100萬港元","最終對價與支付安排待正式買賣協議"],["約定五個工作日內付500萬意向金","正式簽約後才轉為部分按金"],["標的持有工業地段租賃批給權及廠房","澳門公司權益為擬收購標的"]],
        detail:"符合退款條件並終止時，賣方須在十個工作日內退還已收意向金。收款後有三個月獨家磋商期，受正式協議的擬簽署期限所限。",pagesA:[1,2,3]
      }
    };
    const q=configs[c.id]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易條件及後續安排",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left", kind:c.code==="01635"?"cash":"asset",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:q.modality,caseModalityShortLabel:q.modality,topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main", kind:c.code==="01635"?"cash":"asset",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易原件及結算條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"相關交易方公告"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"公眾持股恢復公告"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"要約結果"}])]});
  }
  function buildFourStructureBatches(c,docs){
    const configs={
      "HK-07688-20261020-cnc-target-loi":{
        a:"YS-20261020-cae45d63b647",z:"YS-20261020-cae45d63b647",date:"2026-10-20",event:"first_announcement",status:"active",modality:"擬收購股權",
        ts:[["stake_min",70,"a"]],left:"擬收購數控機床企業",right:"協議狀態及下一階段",badge:"意向書已簽 · 待盡調及正式協議",
        seller:"潛在賣方及其他股東",buyer:"上海拓璞數控",sSub:"潛在賣方為獨立第三方；未具名",bSub:"擬買方",main:"擬收購不少於70%股權",
        steps:[["標的是五軸及多軸數控機床企業","涉及研發、製造、銷售及服務"],["對價及付款方式待正式協議","後續盡調、估值評估及商議"],["意向書有效期90天","在有效期內可按約書面通知終止"]],
        detail:"10月20日簽署；保密、法律效力及爭議解決條款另有約束。若落實，上市規則第14章類別取決於最終條款。",pagesA:[1,2,3]
      },
      "HK-01956-20260814-guoke-qizhi-fund":{
        a:"YS-20260814-4df2ce58e828",z:"YS-20260814-4df2ce58e828",date:"2026-08-14",event:"first_announcement",status:"active",modality:"三方認繳基金",cash:true,
        ts:[["issuer_commitment",177000000,"a"],["fund_size",300000000,"a"],["issuer_commitment_pct",59,"a"],["other_lp_commitment",120000000,"a"],["gp_commitment",3000000,"a"]],left:"三方擬成立決策智能創投基金",right:"出資比例、管治及劃款",badge:"合夥協議已簽 · 實繳待核",
        seller:"中科聞歌",buyer:"國科啟智創投基金",sSub:"有限合夥人；以內部現金出資",bSub:"基金名稱待工商登記確定",main:"認繳1.77億人民幣（59%）",
        steps:[["柯橋金開40% · 國科西子1%","兩者分別認繳1.2億元及300萬元"],["總認繳3億元 · 兩期各50%","第二期須完成基金備案及達前期投資條件"],["投委會5席 · 需至少4票","管理人委派3席，中科聞歌委派2席"]],
        detail:"基金管理人及普通合夥人為國科西子，中科聞歌預期不把基金併作附屬公司。第二期須前期至少70%已投資，按協議口徑包含已決策待付款。",pagesA:[2,3,4,5]
      },
      "HK-00486-20261126-novokuznetsk-heat":{
        a:"YS-20261126-b9e67df9d813",z:"YS-20261126-b9e67df9d813",date:"2026-11-26",event:"first_announcement",status:"active",modality:"關連供熱服務",
        ts:[["new_contract_estimate",157502,"a"],["annual_combined_cap",11746000,"a"]],left:"機場航站樓購買熱能及熱水",right:"本合同及年度合計上限",badge:"供熱合同已簽 · 12月31日預定到期",
        seller:"Aerokuzbass LLC",buyer:"Terminal Novokuznetsk LLC",sSub:"熱能供應商；En+聯繫人",bSub:"俄鋁旗下航站樓營運方",main:"本合同約15.8萬美元（未稅）",
        steps:[["預計供應約3,938 Gcal","涵蓋航站樓的熱能及熱水"],["11月25日簽署，11月26日公告","按發票及合同條款付款"],["年度上限約1,174.6萬美元","2026年多份En+系供熱合同合計"]],
        detail:"年度上限依上市規則14A.81合計較早供熱合同；合同定價參照庫茲巴斯區域能源委員會費率。",pagesA:[1,2,3]
      },
      "HK-08400-20261126-macau-office-renewal":{
        a:"YS-20261126-3db74bc5ad59",z:"YS-20261126-3db74bc5ad59",date:"2026-11-26",event:"first_announcement",status:"active",modality:"獨立第三方租賃",
        ts:[["rou",3300000,"a"],["rent",100000,"a"],["deposit",200000,"a"]],left:"澳門總部三年續租",right:"租期、月租及使用權資產",badge:"續租已簽 · 2027年1月起租",
        seller:"澳門獨立業主",buyer:"Asia Pioneer Entertainment",sSub:"出租方；獨立第三方個人",bSub:"上市公司旗下澳門承租方",main:"2027年1月起租三年",
        steps:[["月租10萬港元","政府地租、差餉及管理等開支另付"],["租賃按金20萬港元","相當於兩個月租金"],["使用權資產約330萬港元","按IFRS 16以5.25%折現率計算"]],
        detail:"租期至2029年12月31日。公告按GEM第19章分類為須予披露交易；租金及按金由集團內部資金支付。",pagesA:[1,2,3,4]
      }
    };
    const q=configs[c.id]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易條件及後續安排",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:q.cash?"cash":"asset",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:q.modality,caseModalityShortLabel:q.modality,topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:q.cash?"cash":"asset",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易原件及結算條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"相關交易方公告"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"公眾持股恢復公告"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"要約結果"}])]});
  }
  function buildKDZhaoqingColdChain(c,docs){
    const configs={
      "HK-00834-20261013-kd-renewal":{
        a:"YS-20261126-2026112600289",z:"YS-20261126-2026112600289",p:"YS-20261013-2026101301117",date:"2026-11-26",event:"circular",status:"active",modality:"持續關連交易",
        ts:[["sales_2027",107560000,"a"],["sales_2028",110600000,"a"],["sales_2029",112260000,"a"],["purchases_2027",190000000,"a"],["purchases_2028",201000000,"a"],["purchases_2029",212000000,"a"],["lease_2029",8700000,"a"]],
        left:"盛榮與康大控股續簽框架",right:"2027、2028及2029年上限",badge:"通函已刊發 · 待獨立股東批准",
        seller:"盛榮集團",buyer:"康大控股集團",sSub:"出售產品、供應服務及採購",bSub:"買入產品及服務、同時供應原料",main:"雙向供應及另行資產出租",
        steps:[["盛榮售予康大（人民幣萬元）","10,756／11,060／11,226"],["盛榮從康大採購（人民幣萬元）","19,000／20,100／21,200"],["出租廠房和設備 · 每年上限870萬元","康大食品收取；康大昌榮、康大寵物支付"]],
        detail:"兩份資產租賃與產品／服務框架分列。華安證券（香港）企業融資出具獨立財務顧問函；股東會定於12月16日10:00。",pagesA:[1,9,12,19,40,64,69],pagesP:[1,2]
      },
      "HK-02199-20261126-zhaoqing-four-leases":{
        a:"YS-20261126-0c4912eebfe0",z:"YS-20261126-0c4912eebfe0",date:"2026-11-26",event:"first_announcement",status:"active",modality:"關連物業租賃",
        ts:[["new_monthly_run_rate",4954483.8,"a"],["rm_factory",1299219.6,"a"],["rm_dormitory",1263502.6,"a"],["lj_factory",2090009.6,"a"],["lj_living",301752,"a"]],
        left:"維珍妮肇慶四項廠房及住宿租賃",right:"四約月租及起租日",badge:"四約已簽 · 分兩日約定起租",
        seller:"RM Technology及RM Investment",buyer:"RM Inno-profit及Lijing RM",sSub:"關連出租方",bSub:"上市公司旗下兩家承租方",main:"全數生效後月租約495.4萬元",
        steps:[["2026年12月1日：首兩約起租","廠房129.9萬；廠房及宿舍126.4萬元／月"],["2027年1月1日：另兩約起租","廠房209.0萬；住宿30.2萬元／月"],["四約均至2027年12月31日","住宿一約出租方為RM Investment"]],
        detail:"其餘三約由RM Technology出租，月租按各合同分列。公告按第14A章對同一出租方相關約項合計；按公告類別毋須獨立股東批准。",pagesA:[1,2,3,7,8,10]
      },
      "HK-02517-20261126-cold-chain-renewal":{
        a:"YS-20261126-23ab53dc8364",z:"YS-20261126-23ab53dc8364",date:"2026-11-26",event:"first_announcement",status:"active",modality:"冷鏈服務採購",
        ts:[["2027_cap",247500000,"a"],["2028_cap",272300000,"a"],["2029_cap",300000000,"a"]],
        left:"鍋圈向華鼎冷鏈採購倉配服務",right:"三年上限及審批",badge:"已簽續約 · 待獨立股東批准",
        seller:"華鼎冷鏈及其聯繫人",buyer:"鍋圈食品",sSub:"冷鏈倉儲及物流供應方",bSub:"按訂單或另行服務協議支付",main:"2027至2029年冷鏈服務",
        steps:[["2027年上限24,750萬人民幣","2028年上限27,230萬人民幣"],["2029年上限3億人民幣","各年為服務採購上限"],["待獨立股東批准","Lego Corporate Finance任獨立財務顧問"]],
        detail:"上市規則第14A章持續關連交易。個別服務及付款安排由訂單或具體協議確定。",pagesA:[1,2,3,4,7,10]
      }
    };
    const q=configs[c.id]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易條件及後續安排",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:q.modality,caseModalityShortLabel:q.modality,topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易原件及結算條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"首份公告"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"公眾持股恢復公告"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"要約結果"}])]});
  }
  function buildFinalThreeFrameworks(c,docs){
    const configs={
      "HK-01258-20261126-treasury-finance-frameworks":{
        a:"YS-20261126-e494102a5fb5",z:"YS-20261126-e494102a5fb5",date:"2026-11-26",event:"first_announcement",status:"active",modality:"關連金融服務",
        ts:[["pool_2027",500000000,"a"],["pool_2028",500000000,"a"],["pool_2029",500000000,"a"],["deposit_2027",700000000,"a"],["deposit_2028",700000000,"a"],["deposit_2029",700000000,"a"]],
        left:"中國有色礦業兩份金融框架",right:"2027至2029年每日餘額上限",badge:"框架已簽 · 非豁免交易待獨立股東批准",
        seller:"財資公司及財務公司",buyer:"中國有色礦業",sSub:"分別提供資金集中及存款服務",bSub:"上市公司及所屬集團",main:"兩類服務、各有餘額上限",
        steps:[["資金集中 · 每日最高5億美元","中國有色集團財資管理（香港）"],["存款服務 · 每日最高7億美元","有色礦業集團財務有限公司"],["兩項均待獨立股東批准","兩個上限均含應計利息"]],
        detail:"同一公告另含銅供應及其他關連協議，各按公告所列分類。兩項金融框架的其他服務有各自豁免門檻。南華融資獲委任為非豁免交易的獨立財務顧問。",pagesA:[1,6,7,39,42,45,49,55]
      },
      "HK-00455-20261126-sph-framework-renewal":{
        a:"YS-20261126-ed9a0e589fe8",z:"YS-20261126-ed9a0e589fe8",p:"YS-20261126-ef6f93e3909a",date:"2026-11-26",event:"first_announcement",status:"active",modality:"關連銷售續約",
        ts:[["sales_2027",27000000,"a"],["sales_2028",29000000,"a"],["sales_2029",31000000,"a"]],
        left:"天大藥業與上海醫藥續簽銷售框架",right:"三年建議上限與審批",badge:"框架已簽 · 待獨立股東批准",
        seller:"天大藥業集團",buyer:"上海醫藥集團",sSub:"供應產品；按框架定價",bSub:"分銷渠道；間接持股約13.05%",main:"產品供應及配套物流",
        steps:[["2027年上限2,700萬港元","2028年上限2,900萬港元"],["2029年上限3,100萬港元","為銷售合併上限，含定義內產品物流"],["獨立股東批准後生效","浤博資本獲委任為獨立財務顧問"]],
        detail:"框架擬自2027年1月1日至2029年12月31日生效。銷售條款就天大而言不得遜於給獨立第三方的條款。",pagesA:[1,4,5,8,9],pagesP:[2,8]
      },
      "HK-02880-20261126-connected-frameworks":{
        a:"YS-20261126-75fb68681149",z:"YS-20261126-75fb68681149",date:"2026-11-26",event:"first_announcement",status:"active",modality:"關連服務續期",
        ts:[["deposit_2027",5500000000,"a"],["deposit_2028",5500000000,"a"],["deposit_2029",5500000000,"a"],["credit_2027",4000000000,"a"],["credit_2028",4000000000,"a"],["credit_2029",4000000000,"a"],["sales_2027",1960000000,"a"],["sales_2028",1990000000,"a"],["sales_2029",2060000000,"a"],["procurement_2027",1060000000,"a"],["procurement_2028",1100000000,"a"],["procurement_2029",1110000000,"a"]],
        left:"遼寧港口續簽六項關連服務框架",right:"每日餘額與年度流量分列",badge:"框架已簽 · 待獨立股東批准",
        seller:"遼寧港口集團／招商局財務",buyer:"遼寧港口股份",sSub:"分別為港口、租賃及金融協議對手方",bSub:"上市公司；貨物服務有雙向交易",main:"2027至2029年框架",
        steps:[["存款55億 · 信貸40億人民幣","分別為日終存款、每日信貸餘額上限"],["按香港第14A章口徑的銷售上限","三年為19.6／19.9／20.6億人民幣"],["按香港第14A章口徑的採購上限","三年為10.6／11.0／11.1億人民幣"]],
        detail:"香港規則下，銷售、採購及存款待獨立股東批准；信貸及指定其他金融服務另按上海上市規則審議。天財資本國際為上述三類非豁免交易的獨立財務顧問。",pagesA:[1,2,3,4,6,20,22,25,28]
      }
    };
    const q=configs[c.id]; if(!q||c.stage?.status!==q.status||c.stage.date!==q.date||![q.a,q.z,q.p,q.o].filter(Boolean).every(id=>docs?.[id]?.caseId===c.id)||!c.events?.some(e=>e.date===q.date&&e.kind===q.event&&e.state==="actual"&&e.evidence?.documentId===q.z)||!q.ts.every(([key,value,doc])=>c.terms?.some(t=>t.key===key&&t.value===value&&t.evidence?.documentId===q[doc])))return null;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status:q.status,leftTitle:q.left,rightTitle:q.right,transitionLabel:"交易條件及後續安排",outcomeBadge:q.badge}),[
      box("s","left",42,106,164,124,"seller",q.seller,q.sSub),
      box("b","left",438,106,178,124,"buyer",q.buyer,q.bSub),
      ...q.steps.map(([t,s],i)=>box("out"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,s))
    ],[],[{id:"main",panel:"left",kind:"asset",step:"①",pathPoints:[[206,169],[438,169]],labelCenter:[322,169],labelWidth:205,labelHeight:35,label:q.main,proposedOrTerminated:q.status==="active"}]);
    const nodes=[{id:"s",role:"seller",name:q.seller},{id:"b",role:"buyer",name:q.buyer}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status:q.status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:q.modality,caseModalityShortLabel:q.modality,topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows:[{id:"main",kind:"asset",direction:"ltr",fromLabel:q.seller,toLabel:q.buyer,headline:q.main,proposedOrTerminated:q.status==="active"}],annotations:[{tag:"①",title:q.left,body:q.detail}],evidenceLinks:[{documentId:q.a,pages:q.pagesA,label:"交易原件及結算條款"},...(q.p?[{documentId:q.p,pages:q.pagesP,label:"英文公告"}]:[]),...(q.o?[{documentId:q.o,pages:q.pagesO,label:"公眾持股恢復公告"}]:[]),...(q.z===q.a?[]:[{documentId:q.z,pages:q.pagesZ,label:"要約結果"}])]});
  }
  function buildCogoConstructionTender(c,docs) {
    const a="YS-20261022-2026102201291",b="YS-20261022-2026102201075",q="YS-20261111-2026111100478";
    const date="2026-11-11",status="active",badge="宏洋已發通函 · 雙方待獨立股東批准";
    if (![a,b,q].every(id=>docs?.[id]?.caseId===c.id)||c.stage?.date!==date||c.stage?.status!==status||c.stage?.eventKind!=="circular"||
        !c.events?.some(x=>x.kind==="circular"&&x.date===date&&x.state==="actual"&&x.evidence?.documentId===q)||
        ![2027,2028,2029].every(y=>c.terms?.some(t=>t.key==="cap_"+y&&t.value===1500000000&&t.currency==="CNY"&&t.evidence?.documentId===a))) return null;
    const left="同一份內地工程招標框架",right="一組年度上限 · 兩家上市公司審批";
    const s="中國建築國際",buyer="中國海外宏洋",service="中標後承建內地工程",cash="按各工程合約付款";
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:buyer}];
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:"年度上限與審批",outcomeBadge:badge}),[
      box("s","left",42,102,164,144,"seller",s,"03311 · 參與競爭性投標"),
      box("b","left",438,102,178,144,"buyer",buyer,"00081 · 按招標程序發包"),
      box("r1","right",724,72,310,73,"target","2027、2028、2029年","每年最高人民幣15億元"),
      box("r2","right",724,168,310,73,"creditor","00081 · 12月4日股東大會","Maxa Capital 獨立財務顧問"),
      box("r3","right",724,264,310,73,"creditor","03311 · 合併計算超過5%","Red Sun Capital 獨立財務顧問")
    ],[],[
      {id:"service",panel:"left",kind:"asset",step:"①",pathPoints:[[206,142],[438,142]],labelCenter:[322,142],labelWidth:194,labelHeight:34,label:service,proposedOrTerminated:true},
      {id:"cash",panel:"left",kind:"cash",step:"②",pathPoints:[[438,204],[206,204]],labelCenter:[322,204],labelWidth:194,labelHeight:34,label:cash,proposedOrTerminated:true}
    ]);
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:"關連工程框架",caseModalityShortLabel:"關連工程框架",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[
      {id:"service",kind:"asset",direction:"ltr",fromLabel:s,toLabel:buyer,headline:service,proposedOrTerminated:true},
      {id:"cash",kind:"cash",direction:"rtl",fromLabel:buyer,toLabel:s,headline:cash,proposedOrTerminated:true}
    ],annotations:[{tag:"①",title:"工程投標與結算",body:"框架為期三年，實際工程須成功投標後另行授出，付款按各工程合約。宏洋側比率逾5%；中國建築國際側單項比率逾0.1%但低於5%，按第14A.81條合併計算後逾5%。"}],
    evidenceLinks:[{documentId:a,pages:[1,2,3],label:"中國海外宏洋首份公告"},{documentId:b,pages:[1,2,3,8],label:"中國建築國際首份公告"},{documentId:q,pages:[9,16,17,37,42],label:"中國海外宏洋通函"}]});
  }

  function buildCogoLease2026(c,docs) {
    const a="YS-20261029-2026102901072",date="2026-10-29",status="active",badge="框架已簽 · 豁免通函及表決";
    if(docs?.[a]?.caseId!==c.id||c.stage?.date!==date||c.stage?.status!==status||
       !c.events?.some(x=>x.kind==="first_announcement"&&x.date===date&&x.state==="actual"&&x.evidence?.documentId===a)||
       ![3000000,13000000,13000000,11000000].every((v,i)=>c.terms?.some(t=>t.key==="cap_"+(2026+i)&&t.currency==="CNY"&&t.value===v&&t.evidence?.documentId===a))) return null;
    const left="宏洋物業租賃框架續期",right="各期租賃年度上限";
    const s="中國海外宏洋",b="中國海外發展",prop="內地物業使用權",cash="按個別租約支付租金";
    const nodes=[{id:"s",role:"seller",name:s},{id:"b",role:"buyer",name:b}];
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const steps=[["2026年11至12月 · 300萬","人民幣 · 兩個月"],["2027年 · 1,300萬","人民幣 · 完整年度"],["2028年 · 1,300萬","人民幣 · 完整年度"],["2029年1至10月 · 1,100萬","人民幣 · 十個月"]];
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:"租賃期間及上限",outcomeBadge:badge}),[
      box("s","left",42,102,164,144,"seller",s,"00081 集團成員 · 出租方"),
      box("b","left",438,102,178,144,"buyer",b,"00688 集團成員 · 承租方"),
      ...steps.map(([t,u],i)=>box("z"+i,"right",724,66+i*86,310,65,"target",t,u))
    ],[],[
      {id:"asset",panel:"left",kind:"asset",step:"①",pathPoints:[[206,142],[438,142]],labelCenter:[322,142],labelWidth:194,labelHeight:34,label:prop,proposedOrTerminated:true},
      {id:"cash",panel:"left",kind:"cash",step:"②",pathPoints:[[438,204],[206,204]],labelCenter:[322,204],labelWidth:194,labelHeight:34,label:cash,proposedOrTerminated:true}
    ]);
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:"關連租賃框架",caseModalityShortLabel:"關連租賃",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows:[
      {id:"asset",kind:"asset",direction:"ltr",fromLabel:s,toLabel:b,headline:prop,proposedOrTerminated:true},
      {id:"cash",kind:"cash",direction:"rtl",fromLabel:b,toLabel:s,headline:cash,proposedOrTerminated:true}
    ],annotations:[{tag:"①",title:"框架與個別租約",body:"框架自2026年11月1日至2029年10月31日。租約及付款條款逐項訂立，租金參照周邊同類物業。中國海外發展持宏洋約39.63%；香港第14A章下須申報、公告及年度審閱。"}],evidenceLinks:[{documentId:a,pages:[1,2,3,4,7],label:"租賃框架公告"}]});
  }

  function buildCsciRelatedConstruction(c,docs) {
    const cfg={"HK-03311-20261022-cscecl-mutual-tender":{"slug":"cscecl-mutual-tender","primary":"03311","name":"中國建築國際／中國建築股份：雙向工程委聘","short":"雙向關連工程委聘","aliases":["03311","601668","中国建筑国际","中国建筑股份","CSCI","CSCECL"],"a":"YS-20261022-2026102201039","evidencePages":[1,2,4,7],"sign":[1,2],"rulePage":2,"parties":{"合約一方（03311）":"中國建築國際集團有限公司","合約另一方（601668）":"中國建築股份有限公司"},"mechanism":"中國建築國際與其中間控股公司按各自招標程序雙向承接工程。2027至2029年各年由中國建築國際發包的上限人民幣100億元，反向由中國建築股份發包的上限30億元。","caps":[["parent_work","中國建築國際發包予中國建築股份","CNY",[10000000000,10000000000,10000000000],4],["issuer_work","中國建築股份發包予中國建築國際","CNY",[3000000000,3000000000,3000000000],7]],"scope":"兩個方向單獨計算各自比率均逾5%，均須獨立股東批准；同類框架另按第14A.81條合併計算。","s":"中國建築國際","b":"中國建築股份","sSub":"03311 · 按方向分列工程上限","bSub":"601668 · 中間控股公司","steps":[["每年人民幣100億元","03311 發包予中國建築股份"],["每年人民幣30億元","中國建築股份發包予 03311"],["2027至2029年","待 03311 獨立股東批准"]],"flows":[["asset","ltr","中國建築國際承建"],["asset","rtl","中國建築股份承建"]],"detail":"工程承接以中標為條件；由發包方按個別合約結算。兩個方向分別設上限，並非同一款項的兩種計量。"},"HK-03311-20261022-cscecl-contractual-joint-tender":{"slug":"cscecl-contractual-joint-tender","primary":"03311","name":"中國建築國際／中國建築股份：聯合投標總承包","short":"合約聯營總承包框架","aliases":["03311","601668","中国建筑国际","中国建筑股份","CSCI","CSCECL","合约联营"],"a":"YS-20261022-2026102201064","evidencePages":[1,2,3,5],"sign":[1,2],"rulePage":2,"ifaPage":3,"parties":{"合作方（03311）":"中國建築國際集團有限公司","合作方（601668）":"中國建築股份有限公司","發包方":"第三方開發商或業主"},"mechanism":"雙方可作為合約聯營總承包商共同競投第三方工程；2027至2029年各年聯合獲授合約總額最高人民幣150億元。新協議生效後，會取代舊協議的2027年適用安排。","caps":[["joint_cap","第三方授予聯營總承包合約總額","CNY",[15000000000,15000000000,15000000000],5]],"scope":"此協議單獨計算的適用比率已逾5%，須獨立股東批准；同類框架另按第14A.81條合併計算。","s":"兩方合約聯營","b":"第三方業主","sSub":"03311＋601668 · 聯合總承包","bSub":"招標或其他規定程序發包","steps":[["2027、2028、2029年","每年聯合獲授合約最高人民幣150億元"],["合約聯營","各項目按中標條款執行"],["03311 獨立股東批准","新框架生效後取代舊框架"]],"flows":[["asset","ltr","聯合承接總承包"],["asset","rtl","中標後聯合獲授合約"]],"detail":"採合約聯營安排，個別工程可由兩個集團成員共同承接；框架上限指共同取得的第三方總承包合約額，不表述為任一方收入。"},"HK-00830-20261022-cscecl-facade-subcontract":{"slug":"cscecl-facade-subcontract","primary":"00830","name":"中國建築興業／中國建築股份：外牆分包框架","short":"外牆工程分包框架","aliases":["00830","03311","601668","中国建筑兴业","中国建筑国际","中国建筑股份","CSCD","CSCECL"],"a":"YS-20261022-2026102200793","counter":"YS-20261022-2026102201095","evidencePages":[1,2,4,7,9],"otherPages":[1,2,3,6],"sign":[1,2,4],"rulePage":1,"parties":{"分包服務方（00830）":"中國建築興業集團有限公司","發包方（601668）":"中國建築股份有限公司","另須審批的上市母公司（03311）":"中國建築國際集團有限公司"},"mechanism":"中國建築興業競投中國建築股份集團的外牆工程等分包；2027至2029年上限為42億、54億及24億港元。00830與03311分別履行獨立股東審批。","caps":[["facade","外牆分包及相關服務","HKD",[4200000000,5400000000,2400000000],4]],"scope":"00830最高上限的各適用比率皆逾5%，須獨立股東批准；03311披露單項比率逾5%，同類框架另按第14A.81條合併計算。","s":"中國建築興業","b":"中國建築股份","sSub":"00830 · 分包及服務提供方","bSub":"601668 · 發包方","steps":[["2027／2028／2029年","分別最高42／54／24億港元"],["00830 獨立股東批准","Altus Capital 獲委任"],["03311 獨立股東批准","Red Sun Capital 獲委任"]],"flows":[["asset","ltr","中標後提供外牆分包"],["cash","rtl","按個別工程合約付款"]],"detail":"兩個上市公司須各自批准；招標以個別合約落實。00830原定11月30日或之前寄發通函，03311原定11月27日或之前寄發。"}},q=cfg[c.id],date="2026-10-22",status="active",badge=q?.primary==="00830"?"框架已簽 · 兩家待獨立股東批准":"框架已簽 · 待獨立股東批准";
    if(!q||c.stage?.date!==date||c.stage.status!==status||![q.a,q.counter].filter(Boolean).every(v=>docs?.[v]?.caseId===c.id)||
      !c.events.some(e=>e.kind==="first_announcement"&&e.state==="actual"&&e.date===date&&e.evidence?.documentId===q.a)||
      !q.caps.every(([key,_,cur,values])=>values.every((v,i)=>c.terms.some(t=>t.key===key+"_"+(2027+i)&&t.value===v&&t.currency===cur&&t.evidence?.documentId===q.a))))return null;
    const left=q.short,right="2027至2029年上限及審批";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const flows=q.flows.map(([kind,direction,headline],i)=>({id:"leg"+i,kind,direction,fromLabel:direction==="ltr"?q.s:q.b,toLabel:direction==="ltr"?q.b:q.s,headline,proposedOrTerminated:true}));
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:470,status,leftTitle:left,rightTitle:right,transitionLabel:"框架與年度上限",outcomeBadge:badge}),[
      box("s","left",42,102,164,144,"seller",q.s,q.sSub),
      box("b","left",438,102,178,144,"buyer",q.b,q.bSub),
      ...q.steps.map(([t,u],i)=>box("p"+i,"right",724,72+i*96,310,73,i===0?"target":"creditor",t,u))
    ],[],flows.map((f,i)=>{const y=142+62*i;return {id:f.id,panel:"left",kind:f.kind,step:i===0?"①":"②",pathPoints:f.direction==="ltr"?[[206,y],[438,y]]:[[438,y],[206,y]],labelCenter:[322,y],labelWidth:194,labelHeight:34,label:f.headline,proposedOrTerminated:true};}));
    const nodes=[{id:"s",role:"seller",name:q.s},{id:"b",role:"buyer",name:q.b}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"cash",status,stageDate:date,stageLabel:badge,caseArchetypeLabel:left,caseModalityLabel:q.short,caseModalityShortLabel:"工程框架",topology,compactSummary:badge,before:{title:left,nodes,equityLinks:[]},after:{title:right,nodes,equityLinks:[],outcomeBadge:badge},flows,annotations:[{tag:"①",title:q.short,body:q.detail}],
      evidenceLinks:[{documentId:q.a,pages:q.evidencePages,label:q.primary+" 首份公告"},...(q.counter?[{documentId:q.counter,pages:q.otherPages,label:"03311 首份公告"}]:[])]});
  }

  function buildPAorGlobalRefi(c,docs){
    const q=({"HK-01833-20260928-ping-an-framework-renewals":{"evidence":["YS-20260928-2026092801739","YS-20261109-2026110901269","YS-20261109-2026110901271"],"left":"四項關連交易框架","right":"年度上限及審批","labels":["平安好醫生","平安集團成員"],"leg1":"服務採購付款","leg2":"產品服務收入","cards":[["一般產品與服務","2027年收入上限19.7億／採購上限9.3億 RMB"],["平安人壽產品服務","2027年上限 RMB 13.1億"],["金融服務合作","存款 80億 · 理財 95億 · 衍生品 70億 RMB 項目各自計量"],["獨立股東表決","2026-12-03 14:00 · Gram Capital 建議贊成"]],"badge":"通函已刊發 · 12月3日待股東表決","status":"active","date":"2026-11-09","terms":[["wealth_2027",9500000000,"CNY"],["deposit_2027",8000000000,"CNY"],["derivative_2027",7000000000,"CNY"]],"pages":[[1],[24,55,62,75,78],[1]]},"HK-06616-20260917-hkd-settled-cb":{"evidence":["YS-20260917-2026091701667","YS-20260918-2026091800027","YS-20260924-2026092402099"],"left":"新債發行與舊債回購","right":"完成日及換股條款","labels":["環球新材國際","新舊債持有人"],"leg1":"回購舊債本金 · HKD 9.9億","leg2":"認購新債本金 · RMB 13億","cards":[["新債發行已完成","年息 3.25% · 2027年到期 · 港元結算"],["舊債回購已完成","原本金的99% · 完成日所列餘額 HKD 1,000萬"],["全數轉換情景","HKD 10.93／股 · 139,093,323股 · 擴大股本10.02%"]],"badge":"新債發行及舊債回購已完成","status":"closed","date":"2026-09-24","terms":[["consideration",1300000000,"CNY"],["old_bond_principal_bought_back",990000000,"HKD"],["conversion_shares",139093323,null]],"pages":[[1],[2,3],[2,3,4]]}})[c.id];
    if(!q||c.stage?.status!==q.status||c.stage?.date!==q.date||!q.evidence.every(x=>docs?.[x]?.caseId===c.id)||!q.terms.every(([key,v,cur])=>c.terms.some(t=>t.key===key&&t.value===v&&t.currency===cur)))return null;
    const proposed=q.status==='active', [l,r]=q.labels, flows=[
      {id:'f1',kind:'cash',direction:'ltr',fromLabel:l,toLabel:r,headline:q.leg1,proposedOrTerminated:proposed},
      {id:'f2',kind:'cash',direction:'rtl',fromLabel:r,toLabel:l,headline:q.leg2,proposedOrTerminated:proposed}
    ], status=q.status;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:500,status,leftTitle:q.left,rightTitle:q.right,transitionLabel:'交易條款',outcomeBadge:q.badge}),[
      box('s','left',42,102,155,152,'seller',l,''),box('b','left',445,102,173,152,'buyer',r,''),
      ...q.cards.map(([title,subtitle],i)=>box('r'+i,'right',715,65+i*98,328,76,i===0?'target':'creditor',title,subtitle))
    ],[],flows.map((f,i)=>{const y=145+64*i;return {id:f.id,panel:'left',kind:f.kind,step:i?'②':'①',pathPoints:i?[[445,y],[197,y]]:[[197,y],[445,y]],labelCenter:[321,y],labelWidth:230,labelHeight:36,label:f.headline,proposedOrTerminated:proposed};}));
    const nodes=[{id:'s',role:'seller',name:l},{id:'b',role:'buyer',name:r}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:'acquisition',modality:'cash',status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:q.right,caseModalityShortLabel:proposed?'關連交易':'可轉債再融資',topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows,annotations:[{tag:'①',title:q.left,body:q.cards[0][1]}],evidenceLinks:q.evidence.map((documentId,i)=>({documentId,pages:q.pages[i],label:docs[documentId].title}))});
  }

  function buildWrittenApprovedLeases(c,docs){
    const q=({"HK-00217-20261026-yangquan-lng-leaseback":{"evidence":["YS-2026102600975-00217-yangquan-lng","YS-2026112300718-00217-yangquan-lng"],"left":"陽泉華鑫設備售後回租","right":"租約與書面批准","labels":["誠通融資租賃","陽泉華鑫"],"leg1":"設備購買價 · RMB 2億","leg2":"租金 · 約 RMB 2.10億","cards":[["售後回租標的","兩組 LNG 加注、淨化、壓縮和儲存等設備"],["租金與付款期數","3年 · 12期 · 每季付款"],["擔保及期末回購","山西壓縮天然氣集團擔保 · 名義回購 RMB 2"],["書面股東批准","CCHK 持股 53.14% · 待確認付款及起租"]],"badge":"已取得書面股東批准 · 待確認付款及起租","status":"approved","date":"2026-11-23","terms":[["consideration",200000000,"CNY"],["total_rent",209970000,"CNY"],["repurchase",2,"CNY"]],"pages":[[1,5],[14,15,21]]},"HK-00217-20261113-jinta-photovoltaic-leaseback":{"evidence":["YS-2026111300681-00217-jinta-photovoltaic","YS-2026112300718-00217-jinta-photovoltaic"],"left":"金塔中光設備售後回租","right":"租約與書面批准","labels":["誠通融資租賃","金塔中光"],"leg1":"設備購買價 · RMB 4億","leg2":"租金 · 約 RMB 4.44億","cards":[["售後回租標的","三組光伏發電設備"],["租金與付款期數","5年 · 10期 · 每半年付款"],["擔保及期末回購","天津綠發電力集團擔保 · 名義回購 RMB 3"],["書面股東批准","CCHK 持股 53.14% · 待確認付款及起租"]],"badge":"已取得書面股東批准 · 待確認付款及起租","status":"approved","date":"2026-11-23","terms":[["consideration",400000000,"CNY"],["total_rent",444190000,"CNY"],["repurchase",3,"CNY"]],"pages":[[2,6],[14,15,21]]}})[c.id];
    if(!q||c.stage?.status!==q.status||c.stage?.date!==q.date||!q.evidence.every(x=>docs?.[x]?.caseId===c.id)||!q.terms.every(([key,v,cur])=>c.terms.some(t=>t.key===key&&t.value===v&&t.currency===cur)))return null;
    const proposed=q.status==='approved', [l,r]=q.labels, flows=[
      {id:'f1',kind:'cash',direction:'ltr',fromLabel:l,toLabel:r,headline:q.leg1,proposedOrTerminated:proposed},
      {id:'f2',kind:'cash',direction:'rtl',fromLabel:r,toLabel:l,headline:q.leg2,proposedOrTerminated:proposed}
    ], status=q.status;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:500,status,leftTitle:q.left,rightTitle:q.right,transitionLabel:'交易條款',outcomeBadge:q.badge}),[
      box('s','left',42,102,155,152,'seller',l,''),box('b','left',445,102,173,152,'buyer',r,''),
      ...q.cards.map(([title,subtitle],i)=>box('r'+i,'right',715,65+i*98,328,76,i===0?'target':'creditor',title,subtitle))
    ],[],flows.map((f,i)=>{const y=145+64*i;return {id:f.id,panel:'left',kind:f.kind,step:i?'②':'①',pathPoints:i?[[445,y],[197,y]]:[[197,y],[445,y]],labelCenter:[321,y],labelWidth:230,labelHeight:36,label:f.headline,proposedOrTerminated:proposed};}));
    const nodes=[{id:'s',role:'seller',name:l},{id:'b',role:'buyer',name:r}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:'acquisition',modality:'cash',status,stageDate:q.date,stageLabel:q.badge,caseArchetypeLabel:q.left,caseModalityLabel:q.right,caseModalityShortLabel:'售後回租',topology,compactSummary:q.badge,before:{title:q.left,nodes,equityLinks:[]},after:{title:q.right,nodes,equityLinks:[],outcomeBadge:q.badge},flows,annotations:[{tag:'①',title:q.left,body:q.cards[0][1]}],evidenceLinks:q.evidence.map((documentId,i)=>({documentId,pages:q.pages[i],label:docs[documentId].title}))});
  }

  function buildOceankingMerger(c,d){
    const j={"id":"HK-00576-20250819-oceanking-absorption","put":"YS-20261127-00576-put","csrc":"YS-20260701-00576-csrc","china":"YS-20260701-00576-updated","orig":"YS-20250819-00576-first","badge":"已公布異議股東安排 · 待實施換股"};
    if(c.id!==j.id || ![j.put,j.csrc,j.china,j.orig].every(id=>d?.[id]?.caseId===c.id) || !c.terms?.some(x=>x.key==="swap_ratio"&&x.value===1.0931) || !c.terms?.some(x=>x.key==="dissent_h_put"&&x.value===6.14) || c.stage?.eventKind!=="put_terms_announced" || c.stage.date!=="2026-11-27")return null;
    const mk=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topo=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"active",leftTitle:"A 股換股吸收合併",rightTitle:"異議股東安排",transitionLabel:"現金選擇權獨立列示",outcomeBadge:j.badge}),[
     mk("L_t","left",43,100,149,146,"target","鎮洋發展","被吸收方 · 603213.SH"),mk("L_a","left",448,100,157,146,"listed","浙江滬杭甬","存續方 · 00576.HK"),
     mk("R_h","right",728,84,295,75,"public","浙江滬杭甬異議 H 股","每股 HKD 6.14 · 香港浙經提供"),
     mk("R_a","right",728,210,295,75,"public","鎮洋發展異議 A 股","每股 CNY 12.96 · 浙江交通集團提供")
    ],[],[{id:"swap",panel:"left",kind:"shares",step:"①",pathPoints:[[448,172],[192,172]],labelCenter:[320,172],labelWidth:200,labelHeight:34,label:"每股換 1.0931 股新 A 股",dashed:true}]);
    const nodes=[{id:"b",role:"target",name:"鎮洋發展"},{id:"s",role:"listed",name:"浙江滬杭甬"}];
    return validateDiagramSpec({id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,archetype:"acquisition",modality:"shares",status:"active",stageDate:c.stage.date,stageLabel:j.badge,caseArchetypeLabel:"換股吸收合併",caseModalityLabel:"發行 A 股作換股對價",caseModalityShortLabel:"股份",before:{title:"吸收合併雙方",nodes,equityLinks:[]},after:{title:"方案待實施",nodes,equityLinks:[],outcomeBadge:j.badge},topology:topo,compactSummary:j.badge,flows:[{id:"swap",kind:"shares",direction:"rtl",fromLabel:"浙江滬杭甬",toLabel:"鎮洋發展換股股東",headline:"每 1 股鎮洋發展可換取 1.0931 股浙江滬杭甬 A 股",proposedOrTerminated:true}],annotations:[{tag:"①",title:"換股與行權時間",body:"異議 H 股擬於 12 月 4–10 日申報，預定 12 月 21 日行權。換股及 A 股掛牌尚待實施。"}],evidenceLinks:[{documentId:j.orig,pages:[1],label:"首次交易公告"},{documentId:j.csrc,pages:[1],label:"註冊及同意發行股數"},{documentId:j.put,pages:[1,2,6],label:"異議 H 股股東安排"}]});
  }
  function buildVerifiedSwireSale(c,docs) {
    const x={"id":"HK-00019-20261123-swire-cathay-secondary","day":"2026-11-26","ann":"YS-20261123-00019-cathay-placing","di":"YS-20261126-00293-swire-form2","diUrl":"https://di.hkex.com.hk/di/NSForm2.aspx?ed=26%2F11%2F2026&fn=CS20261126E00233&lang=EN&sa1=cl&sa2=ns&sc=00293&sced=26%2F11%2F2026&scsd=26%2F11%2F2025&sd=26%2F11%2F2025&sid=501&src=Main&tk=ds"}, t=(key,value)=>c.terms?.some(v=>v.key===key&&v.value===value&&v.evidence?.documentId===x.di);
    if(c.id!==x.id||c.stage?.date!==x.day||c.stage?.status!=="closed"||c.category!=="major_disposal"
      || !c.events?.some(e=>e.kind==="completion"&&e.state==="actual"&&e.date===x.day&&e.evidence?.documentId===x.di)
      ||docs?.[x.di]?.caseId!==c.id||docs[x.di].url!==x.diUrl||!docs?.[x.ann]?.url?.endsWith('/2026112301557.pdf')) return null;
    if(!t("placed_existing_shares",252655000)||!t("placing_price",14.23)||!t("seller_gross_cash",3595280650)||!t("seller_after",35))return null;
    const l="太古股份",r="獨立承配人",badge="11 月 26 日 · 舊股出售完成";
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const arrow=(id,kind,step,x,y,end,label)=>({id,panel:"left",kind,step,pathPoints:[[x,y],[end,y]],labelCenter:[320,y],labelWidth:204,labelHeight:34,label});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"closed",leftTitle:"太古配售已持有國泰舊股",rightTitle:"國泰直接持股變動",transitionLabel:"現金出售舊股",outcomeBadge:badge}),[
     box("L_sell","left",43,100,149,146,"seller",l,"出售方 · 00019 / 00087"),
     box("L_buy","left",448,100,157,146,"buyer",r,"公開文件未列名"),
     box("R_before","right",728,84,295,75,"seller","39.15% → 35.00%","太古股份直接持有國泰普通股"),
     box("R_em","right",728,210,295,75,"public","國泰普通股數不變","出售所得歸太古股份")
    ],[],[arrow("shares","shares","①",192,138,448,"2.53 億股國泰舊股"),arrow("cash","cash","②",448,209,192,"總額約 36.0 億港元")]);
    const nodes=[{id:"seller",role:"seller",name:l},{id:"placees",role:"buyer",name:r}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:x.day,archetype:"disposal",modality:"cash",status:"closed",
     caseArchetypeLabel:"主要交易 · 舊股配售",caseModalityShortLabel:"出售國泰已發行股份",
     before:{title:"太古直接持有約 39.15%",nodes,equityLinks:[]},after:{title:"太古直接持有約 35.00%",nodes,equityLinks:[],outcomeBadge:badge},
     flows:[{id:"shares",kind:"shares",direction:"ltr",fromLabel:l,toLabel:r,headline:"252,655,000 股國泰普通股舊股（4.15%）"},{id:"cash",kind:"cash",direction:"rtl",fromLabel:r,toLabel:l,headline:"每股 14.23 港元，總額 3,595,280,650 港元（扣費前）"}],
     annotations:[{tag:"①",title:"直接持有與申報權益",body:"太古直接持有 35.00%；權益申報好倉 64.97%，另包括依《證券及期貨條例》第 317 條歸屬的國航持股。"},
      {tag:"②",title:"股東批准",body:"太古集團持有上市公司約 69.20% 表決權，於 11 月 23 日書面批准。台賬所列淨額為公告估計。"}],
     evidenceLinks:[{documentId:x.ann,pages:[2,3,5,7,8],label:"配售協議、淨額估計及書面批准"},{documentId:x.di,pages:[],label:"完成出售與權益申報：表格 2 欄 17–20"}],
     compactSummary:"出售國泰 4.15% 舊股 · 完成後直接持股約 35.00%",topology};
  }

  function buildWillasSupply(c,docs){
    const x={"id":"HK-00854-20260623-willas-yct-supply-caps","day":"2026-11-27","circ":"YS-20261110-00854-supply-circular","vote":"YS-20261127-00854-supply-vote","circUrl":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1110/2026111000752.pdf","voteUrl":"https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1127/2026112700848.pdf","label":"獨立股東通過修訂供貨上限"};
    if(c.stage?.status!=="active"||c.stage?.date!==x.day||c.stage?.eventKind!=="vote"||
      docs?.[x.circ]?.caseId!==x.id||docs[x.circ].url!==x.circUrl||docs?.[x.vote]?.caseId!==x.id||docs[x.vote].url!==x.voteUrl||
      !c.events?.some(e=>e.date===x.day&&e.kind==="vote"&&e.state==="actual"&&e.evidence?.documentId===x.vote)||
      ![2026,2027,2028].every(y=>c.terms?.some(t=>t.key==="annual_supply_cap_"+y&&t.value===70000000&&t.currency==="HKD"&&t.evidence?.documentId===x.circ)))return null;
    const l="威雅利電子",r="上海雅創集團",badge=x.label;
    const box=(id,panel,x,y,w,h,role,title,subtitle)=>({id,panel,x,y,w,h,role,title,subtitle});
    const topology=finalizeLayout(createDiagramCanvas({width:MASTER_W,height:374,status:"active",leftTitle:"半導體電子元件供貨",rightTitle:"修訂後年度上限及期限",transitionLabel:"持續關連交易",outcomeBadge:badge}),[
     box("L_supply","left",43,100,149,146,"listed",l,"上市公司 · 00854"),
     box("L_buyer","left",448,100,157,146,"buyer",r,"控股股東集團"),
     box("R_caps","right",728,84,295,75,"target","每年上限 7,000 萬港元","2026、2027、2028 年各自適用"),
     box("R_approval","right",728,210,295,75,"public","11 月 27 日獨立股東批准","新加坡總授權另案通過")
    ],[],[{id:"supply",panel:"left",kind:"asset",step:"①",pathPoints:[[192,160],[448,160]],labelCenter:[320,160],labelWidth:204,labelHeight:34,label:"半導體電子元件"}]);
    const nodes=[{id:"supplier",role:"listed",name:l},{id:"buyer",role:"buyer",name:r}];
    return {id:c.id,caseId:c.id,name:c.name,code:c.code,mechanism:c.mechanism,stageLabel:badge,stageDate:x.day,archetype:"disclosable_major",modality:"cash",status:"active",caseArchetypeLabel:"持續關連供貨",caseModalityShortLabel:"年度供貨上限",
     before:{title:"原 2026 年上限 299.9 萬港元",nodes,equityLinks:[]},after:{title:"2026–2028 年每年上限 7,000 萬港元",nodes,equityLinks:[],outcomeBadge:badge},
     flows:[{id:"supply",kind:"asset",direction:"ltr",fromLabel:l,toLabel:r,headline:"按個別訂單供應半導體電子元件"}],
     annotations:[{tag:"①",title:"香港：修訂供貨條款",body:"補充契據把每年供貨上限調至 7,000 萬港元，期限至 2028 年末。富比資本就供貨及上限出具獨立意見。"},{tag:"②",title:"新加坡：利益人士交易總授權",body:"總授權按年續期，由 Stirling Coleman 就利益人士交易審查程序出具獨立意見。"}],
     evidenceLinks:[{documentId:x.circ,pages:[13,14,16,20,40,61],label:"年度上限、監管規則及獨立意見"},{documentId:x.vote,pages:[1,2],label:"獨立股東表決結果"}],compactSummary:"2026–2028 年各年上限 7,000 萬港元 · 供貨議案獲批",topology};
  }

  function getSpecForCase(txCase, documents) {
    if (txCase?.id==="HK-00854-20260623-willas-yct-supply-caps") {const x=buildWillasSupply(txCase,documents); return x&&validateDiagramSpec(x);}
    if (txCase?.id==="HK-00019-20261123-swire-cathay-secondary") { const x=buildVerifiedSwireSale(txCase,documents); return x&&validateDiagramSpec(x); }
    if(txCase?.id==="HK-00576-20250819-oceanking-absorption")return buildOceankingMerger(txCase,documents);
    if(["HK-00217-20261026-yangquan-lng-leaseback","HK-00217-20261113-jinta-photovoltaic-leaseback"].includes(txCase?.id))return buildWrittenApprovedLeases(txCase,documents);
    if(["HK-01833-20260928-ping-an-framework-renewals","HK-06616-20260917-hkd-settled-cb"].includes(txCase?.id))return buildPAorGlobalRefi(txCase,documents);
    if(["HK-03311-20261022-cscecl-mutual-tender","HK-03311-20261022-cscecl-contractual-joint-tender","HK-00830-20261022-cscecl-facade-subcontract"].includes(txCase?.id))return buildCsciRelatedConstruction(txCase,documents);
    if(txCase?.id==="HK-00081-20261029-coli-lease-renewal")return buildCogoLease2026(txCase,documents);
    if(txCase?.id==="HK-00081-20261022-csci-construction-tender")return buildCogoConstructionTender(txCase,documents);
    if(["HK-01258-20261126-treasury-finance-frameworks","HK-00455-20261126-sph-framework-renewal","HK-02880-20261126-connected-frameworks"].includes(txCase?.id))return buildFinalThreeFrameworks(txCase,documents);
    if(["HK-00834-20261013-kd-renewal","HK-02199-20261126-zhaoqing-four-leases","HK-02517-20261126-cold-chain-renewal"].includes(txCase?.id))return buildKDZhaoqingColdChain(txCase,documents);
    if(["HK-07688-20261020-cnc-target-loi","HK-01956-20260814-guoke-qizhi-fund","HK-00486-20261126-novokuznetsk-heat","HK-08400-20261126-macau-office-renewal"].includes(txCase?.id))return buildFourStructureBatches(txCase,documents);
    if(["HK-03329-20261126-barclays-notes","HK-01635-20261126-zhiqichen-followon","HK-09886-20261126-macao-mou"].includes(txCase?.id))return buildNotesFundMOU(txCase,documents);
    if(["HK-02190-20261106-lifetech-lighthouse"].includes(txCase?.id))return buildLifeTechInvestmentNov(txCase,documents);
    if(["HK-02039-20261103-industry-city-guarantee"].includes(txCase?.id))return buildCIMCGuaranteePay(txCase,documents);
    if(["HK-01606-20261123-zte-equipment","HK-01606-20261124-litao-equipment"].includes(txCase?.id))return buildLitaoZteStandalone(txCase,documents);
    if(["HK-00217-20261020-dunde-mining-leaseback","HK-00217-20261021-xinte-wengniuteqi-leasebacks","HK-00217-20261022-jinmei-lease-assignment","HK-00217-20261022-huadian-five-leasebacks"].includes(txCase?.id))return buildChengtongGM2026(txCase,documents);
    if(["HK-01606-20261125-purui-equipment-733","HK-01606-20261126-purui-equipment-1178"].includes(txCase?.id))return buildPuruiSeparateBatches(txCase,documents);
    if(["HK-00413-20260827-wah-shing-sparkling"].includes(txCase?.id))return buildSouthChinaVote(txCase,documents);
    if(["HK-01643-20261126-modern-biotech-secondary-sale","HK-00108-20261126-chunyu-dalian-guarantee"].includes(txCase?.id))return buildSecondaryAndGuaranteeNov(txCase,documents);
    if(["HK-00217-20261106-hka-aircraft-finance-lease"].includes(txCase?.id))return buildChengtongA320Lease(txCase,documents);
    if(["HK-08112-20261126-rights-consolidation"].includes(txCase?.id))return buildCSFinancialRightsProposal(txCase,documents);
    if(["HK-01870-20260929-green-power-rights"].includes(txCase?.id))return buildGreenPowerRightsActual(txCase,documents);
    if(["HK-01835-20260615-ningbo-jiaxing-lp","HK-08245-20260824-multi-link"].includes(txCase?.id))return buildLastTwoNov(txCase,documents);
    if(["HK-00247-20261119-kil11296-sky-regal-ura","HK-00521-20261120-tuas-link4-epson-options","HK-01846-20261116-china-clinics-minority-buyback"].includes(txCase?.id))return buildFinalThreeNov(txCase,documents);
    if(["HK-02883-20261116-59-oilfield-support-vessels","HK-01606-20261116-henan-kunlun-it-equipment"].includes(txCase?.id))return buildNovemberIndustrialCases(txCase,documents);
    if(["HK-01109-20261030-hubei-lexing-shenzhen-court-auction","HK-00978-20261119-jiajingwan-550-parking"].includes(txCase?.id))return buildNovemberPropertyCases(txCase,documents);
    if(["HK-02198-20261116-zayton-ethane-h2763-h2765","HK-03877-20261117-two-80000dwt-grain-newbuilds","HK-03877-20261117-container-novation-h2782-h2783"].includes(txCase?.id))return buildNovemberShipCases(txCase,documents);
    if(txCase?.id==="HK-08439-20260413-sky-links")return buildSomerleySky(txCase,documents);
    if(txCase?.id==="HK-09638-20260119-azur-ferretti-eur")return buildFerrettiAzur(txCase,documents);
    if(txCase?.id==="HK-08299-20260330-ningshan-mines")return buildGTGoldNingshan(txCase,documents);
    if(txCase?.id==="HK-00863-20250627-banxa")return buildOSLBanxa(txCase,documents);
    if(txCase?.id==="HK-00599-20261014-leighton-first-commercial-offices-ab")return buildEBonOffice(txCase,documents);
    if(txCase?.id==="HK-01846-20260220-fyeo")return buildEuroEyesFYEO(txCase,documents);
    if(txCase?.id==="HK-01757-20251023-china-vc-control-mgo")return buildAffluentChinaVC(txCase,documents);
    if(txCase?.id==="HK-00223-20250514-china-innovation-partial-lapsed")return buildElifeLapsed(txCase,documents);
    if(txCase?.id==="HK-01980-20251119-truesense-on-market-mgo")return buildTianGeOffer(txCase,documents);
    if(txCase?.id==="HK-09666-20250428-broad-gongga-auction-and-cash-offer")return buildJinkeAuction(txCase,documents);
    if(txCase?.id==="HK-01561-20261005-panasia-pcdynamic-whitewash")return buildPanAsiaWhitewash(txCase,documents);
    if(["HK-01671-20260526-lingang-thermal"].includes(txCase?.id))return buildLingangThermal(txCase,documents);
    if(["HK-00167-20251117-hunglap-horizon-receiver-mgo"].includes(txCase?.id))return buildIDTReceiver(txCase,documents);
    if(txCase?.id==="HK-03389-20251128-empire-charm-voluntary-go")return buildHengdeliOffer(txCase,documents);
    if(["HK-02442-20251202-ever-genius-75-cash","HK-02623-20251104-prominence-mandatory-cash"].includes(txCase?.id))return buildEasyProminence(txCase,documents);
    if(["HK-00643-20251024-zephyrus-tsang-conditional-lapsed","HK-09929-20251203-yao-control-mgo-cb"].includes(txCase?.id))return buildCarrySem(txCase,documents);
    if(["HK-01536-20260612-anhui-runsheng","HK-08373-20260722-changi-south"].includes(txCase?.id))return buildYukIndigo(txCase,documents);
    if(["HK-03989-20261126-fangcaohu-operations","HK-00521-20261126-november-mri-tmsc-copper"].includes(txCase?.id))return buildMinorConnectedContracts(txCase,documents);
    if(["HK-00830-20261022-csc-services","HK-00830-20261022-csc-works"].includes(txCase?.id))return buildCscRenewals(txCase,documents);
    if(["HK-00990-20261120-penang-prai-offshore-equipment","HK-01627-20260520-able-best-tung-chung-lot54"].includes(txCase?.id))return buildPraiAble(txCase,documents);
    if(["HK-08246-20261007-vbit-subscription","HK-01187-20261119-kangjuren-60-percent"].includes(txCase?.id))return buildVbitCofoe(txCase,documents);
    if(["HK-01348-20251204-yael-share-and-option-mgo","HK-02020-20260126-puma"].includes(txCase?.id))return buildQualiAnta(txCase,documents);
    if(["HK-01009-20251117-digiplus-notes-whitewash","HK-00228-20251223-alpha-eagle-rights-two-offers"].includes(txCase?.id))return buildDigiplusAlpha(txCase,documents);
    if(["HK-01959-20251216-msint-cash-follow-on","HK-00357-20250430-hainan-two-share-class-cash"].includes(txCase?.id))return buildCentenaryMeilan(txCase,documents);
    if(["HK-01732-20251201-westwell-partial","HK-08403-20251126-sunwei-conditional-lapsed"].includes(txCase?.id))return buildWestwellDowway(txCase,documents);
    if(txCase?.id==="HK-08146-20251230-hill-valley-control")return buildGraceWineOffers(txCase,documents);
    if(txCase?.id==="HK-06633-20261020-qingci-gbits-game-renewal")return buildQingciGameFramework(txCase,documents);
    if(["HK-01429-20260123-dacheng-mandatory-cash","HK-02362-20260305-alternative-liquidity-partial"].includes(txCase?.id))return buildSkyAndJinchuan(txCase,documents);
    if(txCase?.id==="HK-00489-20250822-dongfeng-absorption-voyah")return buildDongfengVoyah(txCase,documents);
    if(["HK-08031-20260119-jumbo-growth-control-mgo","HK-01053-20251219-hwabao-a-share-whitewash"].includes(txCase?.id))return buildEtsAndChongqing(txCase,documents);
    if(["HK-01875-20260114-wuxi-xdc-voluntary-share-and-option"].includes(txCase?.id))return buildBioDlinkTransfer(txCase,documents);
    if(["HK-01980-20260121-sina-partial-lapsed","HK-01546-20260116-world-nexus-control-mgo"].includes(txCase?.id))return buildSinaAndThelloy(txCase,documents);
    if(["HK-01716-20260312-brave-steed-control","HK-08448-20260209-digital-intelligence-control"].includes(txCase?.id))return buildBraveAndPrintshop(txCase,documents);
    if(["HK-06698-20260602-binqiao-restructuring"].includes(txCase?.id))return buildBinqiaoRestructuring(txCase,documents);
    if(txCase?.id==="HK-02586-20260512-cloopen")return buildCloopenClosing(txCase,documents);
    if(txCase?.id==="HK-02680-20251010-wang-tingfa-control-special-deal")return buildInnovaxFloat(txCase,documents);
    if(["HK-01124-20251017-tao-qian-no-deal","HK-02427-20260127-funde-control-mgo","HK-01428-20250425-wealthiness-control-mgo"].includes(txCase?.id))return buildCoastalGuanzeBright(txCase,documents);
    if(["HK-00383-20260323-issuer-buyback-cancelled","HK-01940-20260313-tangde-lapsed-cash","HK-00784-20260414-hapbiotech-control-mgo"].includes(txCase?.id))return buildBuybackAndSeparatedOffers(txCase,documents);
    if(["HK-01796-20260427-chan-partial","HK-08413-20251210-lianfeng-partial-preconditions-lapsed"].includes(txCase?.id))return buildMetaOrAsiaGrocery(txCase,documents);
    if(["HK-02362-20260521-gong-partial","HK-01953-20260424-aureole-halo-control"].includes(txCase?.id))return buildGongOrRimbaco(txCase,documents);
    if(["HK-01932-20260421-prime-shk-cnt-chain","HK-00701-20260421-prime-shk-cnt-control"].includes(txCase?.id))return buildCntOrCpm(txCase,documents);
    if(["HK-01780-20260507-yang-conditional-lapsed","HK-01969-20260805-dublin-business-school"].includes(txCase?.id))return buildRongzunOrDublin(txCase,documents);
    if(["HK-01432-20251030-modern-dairy-conditional-cash","HK-08220-20260212-chiau-conversion-cash"].includes(txCase?.id))return buildShengmuOrBingo(txCase,documents);
    if(["HK-08137-20260629-bona-global","HK-08181-20261120-kam-fai-services"].includes(txCase?.id))return buildBonaOrKamfai(txCase,documents);
    if(["HK-06083-20260717-consortium-control-mgo","HK-01417-20260518-yomisun-luckyyang-control"].includes(txCase?.id))return buildWorldlinkOrRiverine(txCase,documents);
    if(["HK-08123-20260610-debt-cap-mgo","HK-01633-20260724-control-mgo"].includes(txCase?.id))return buildSinofortuneOrSheung(txCase,documents);
    if(["HK-00389-20260813-voluntary-partial","HK-08483-20260727-control-mgo"].includes(txCase?.id))return buildTontineOrMaxsight(txCase,documents);
    if(["HK-00989-20260715-restructuring-mgo","HK-02381-20260731-control-mgo"].includes(txCase?.id))return buildChangbaishanOrSmc(txCase,documents);
    if(["HK-02295-20260702-greenair-control-cash","HK-06939-20260123-geehy-control-subscription-cash"].includes(txCase?.id))return buildMaxicityAndMegain(txCase,documents);
    if(["HK-00167-20260629-horizon-heights-standalone","HK-01657-20260604-weiye-control-cash"].includes(txCase?.id))return buildIdtAndSg(txCase,documents);
    if(["HK-01912-20260608-zhuangyan-control","HK-02559-20260629-elong-voluntary-cash"].includes(txCase?.id))return buildContelOrDida(txCase,documents);
    if(txCase?.id==="HK-01726-20260929-true-victor-wonder-time")return buildHkeTwoDisposals(txCase,documents);
    if(["HK-00368-20260804-control-mgo","HK-01451-20260505-lvep-cash-offer"].includes(txCase?.id))return buildSuperlandOrMs(txCase,documents);
    if(["HK-09978-20260728-control-mgo","HK-01448-20260901-voluntary-partial"].includes(txCase?.id))return buildFinelandOrFuShou(txCase,documents);
    if(["HK-00852-20260225-speed-success-liquidator","HK-03938-20260109-fortune-origin-control"].includes(txCase?.id))return buildStrongOrLfg(txCase,documents);
    if(["HK-01037-20260727-foxconn-control","HK-03336-20260518-lens-voluntary"].includes(txCase?.id))return buildFoxconnOrLens(txCase,documents);
    if(["HK-01835-20260630-3g-h-share-control","HK-00456-20260715-receivers-charged-shares"].includes(txCase?.id))return buildRealwayOrReceivers(txCase,documents);
    if(["HK-01905-20261023-sig-partial","HK-01124-20260923-deep-water-receiver"].includes(txCase?.id))return buildSigOrCoastal(txCase,documents);
    if(txCase?.id==="HK-01632-20250617-minshang-consolidation")return buildMinshangResumption(txCase,documents);
    if(["HK-08285-20261022-ome","HK-08093-20261026-invengo"].includes(txCase?.id))return buildOmeInvengoStage(txCase,documents);
    if(txCase?.id==="HK-09988-20261110-t-head-spin")return buildTHeadPending(txCase,documents);
    if(txCase?.id==="HK-01894-20260923-ngai-partial")return buildHangYickPartial(txCase,documents);
    if(["HK-01793-20260820-talent-pool-mou","HK-01746-20260710-wanlexin-loi"].includes(txCase?.id))return buildNamedLoiPair(txCase,documents);
    if(["HK-01402-20260910-control-mou","HK-00465-20260506-chen-control-mou"].includes(txCase?.id))return buildPossibleOfferPair(txCase,documents);
    if(["HK-08137-20260821-geely-51pct"].includes(txCase?.id))return buildHonbridgeComplete(txCase,documents);
    if(["HK-08370-20260327-replacement-call","HK-00076-20261015-cityhill"].includes(txCase?.id))return buildZsCityhill(txCase,documents);
    if(["HK-01070-20260715-tcl-aircon","HK-01765-20261119-dingli-solar"].includes(txCase?.id))return buildTclDingli(txCase,documents);
    if(["HK-01122-20260922-xinxiang-anda-repurchase","HK-01122-20261016-qingling-moulds"].includes(txCase?.id))return buildQinglingPair(txCase,documents);
    if(["HK-02473-20260804-pagac-nts","HK-00137-20260921-two-nanyang-newbuilds"].includes(txCase?.id))return buildNtsNanyang(txCase,documents);
    if(["HK-03877-20261118-hilli-sale-leaseback","HK-03877-20260901-ten-grain-carriers"].includes(txCase?.id))return buildCsscPair(txCase,documents);
    if(["HK-00147-20261030-quantumcompute","HK-09982-20261116-distressed-lp-frameworks"].includes(txCase?.id))return buildQuantumOrLP(txCase,documents);
    if(["HK-01201-20260927-tesson-huazhi","HK-09982-20260923-link-win"].includes(txCase?.id))return buildTessonLink(txCase,documents);
    if(txCase?.id==="HK-00472-20261008-i-aurora-soul")return buildSilkKpop(txCase,documents);
    if(["HK-00132-20261026-fangyuan-leaseback","HK-00132-20261109-fangyuan-leaseback"].includes(txCase?.id))return buildFangyuanPair(txCase,documents);
    if(["HK-08481-20260506-linan-land-use","HK-01416-20260819-kaki-bukit-jtc"].includes(txCase?.id))return buildLinanJtc(txCase,documents);
    if(["HK-08365-20260717-eversharp","HK-08365-20260925-noah-ark"].includes(txCase?.id))return buildHatcherClosures(txCase,documents);
    if(["HK-08412-20261116-168-catering","HK-08412-20261116-kau-lau-restaurant"].includes(txCase?.id))return buildQiRestaurants(txCase,documents);
    if(["HK-01643-20260119-ai-health-stake"].includes(txCase?.id))return buildModernAI(txCase,documents);
    if(["HK-01354-20251205-kingfar-building","HK-01300-20260913-qinghai-zhongli"].includes(txCase?.id))return buildKingfarTrigiant(txCase,documents);
    if(["HK-03366-20260326-hefei-land-resumption","HK-03366-20260326-chaohu-land-resumption"].includes(txCase?.id))return buildOCTLand(txCase,documents);
    if(txCase?.id==="HK-02533-20251231-eeasy-control")return buildEeasyControl(txCase,documents);
    if(["HK-01682-20251111-shun-tak-offices","HK-01952-20260408-hasten-singapore"].includes(txCase?.id))return buildReviewedAssetPair(txCase,documents);
    if(txCase?.id==="HK-00126-20260929-facility-financial-assistance")return buildReviewedCarriannaFacilities(txCase,documents);
    if(["HK-08232-20261113-mandarin-plaza-lease","HK-08232-20261020-hoi-lai-lease","HK-08232-20261020-cheung-tung-lease","HK-00374-20261122-tko-innopark-lease"].includes(txCase?.id))return buildReviewedLeaseQuartet(txCase,documents);
    if(["HK-03330-20251210-simberi-subscription","HK-09668-20251010-debt-asset-portfolio-transfer","HK-00381-20251107-jiuai-food"].includes(txCase?.id))return buildReviewedClosedTrio(txCase,documents);
    if(txCase?.id==="HK-03330-20260910-simberi-buyout")return buildReviewedSimberi(txCase,documents);
    if(txCase?.id==="HK-02013-20261126-ingram-gpu-purchase")return buildReviewedWeimobGpu(txCase,documents);
    if(txCase?.id==="HK-03382-20260827-tianjin-port-framework-renewal")return buildReviewedTianjinPortFramework(txCase,documents);
    if(txCase?.id==="HK-00817-20260616-tianjin-timao-transfer")return buildReviewedJinmaoTimao(txCase,documents);
    if(txCase?.id==="HK-00195-20260529-geo-environ-partial")return buildReviewedGeo(txCase,documents);
    if(txCase?.id==="HK-00195-20260615-yellowstone-partial")return buildReviewedYellowstone(txCase,documents);
    if(txCase?.id==="HK-01783-20260806-intelligent-compute-servers")return buildReviewedEnvisionServers(txCase,documents);
    if(txCase?.id==="HK-01783-20260629-yovole-cloud")return buildReviewedYovole(txCase,documents);
    if(txCase?.id==="HK-00817-20261102-sinochem-finance-factoring")return buildReviewedJinmaoFinance(txCase,documents);
    if(txCase?.id==="HK-00195-20260907-berk-kivanc-partial")return buildReviewedGreentechBerk(txCase,documents);
    if(["HK-09860-20251113-crown-bioscience","HK-01340-20261123-shanghai-jingguan"].includes(txCase?.id))return buildReviewedAcquisition26(txCase,documents);
    if(txCase?.id==="HK-01196-20261111-realord-loan-capitalisation")return buildReviewedRealord(txCase,documents);
    if(["HK-01710-20261002-luxshare-mou","HK-01389-20261012-max-premier","HK-00348-20261118-hwa-sheng","HK-03774-20261030-sheng-zhan"].includes(txCase?.id)){const d=buildReviewedOffer26(txCase,documents);return d&&validateDiagramSpec(d);}
    if(txCase?.id==="HK-00866-20261103-zhuhai-termination"){const d=buildVerifiedQinfaUnwind26(txCase,documents);return d&&validateDiagramSpec(d);}
    if(txCase?.id==="HK-00604-20261126-zhi-di-property"){const d=buildVerifiedZhiDi26(txCase,documents);return d&&validateDiagramSpec(d);}
    if(txCase?.id==="HK-01548-20261124-probio-capital-reorganisation"){const d=buildVerifiedProbio26(txCase,documents);return d&&validateDiagramSpec(d);}
    if(txCase?.id==="HK-01995-20261126-shenyang-cifi-setoff"){const d=buildVerifiedCifiSetoff26(txCase,documents);return d&&validateDiagramSpec(d);}
    if(txCase?.id==="HK-00076-20261126-convertible-debenture"){const d=buildVerifiedElate26(txCase,documents);return d&&validateDiagramSpec(d);}
    if(txCase?.category==="secondary_placing"){const d=buildVerifiedWalnutExit(txCase,documents);return d&&validateDiagramSpec(d);}
    if(txCase?.id==="HK-01705-20261029-time-innovation"){const d=buildVerifiedBs26(txCase,documents);return d&&validateDiagramSpec(d);}

    if (txCase?.id === "HK-08455-20261007-reorganisation-partial-rights") {
      const t=txCase.terms?.find(v=>v.key==="rights_shares_base_max"&&v.value===96000000);
      const p=txCase.terms?.find(v=>v.key==="subscription_price"&&v.value===0.34&&v.currency==="HKD");
      const f=documents?.[t?.evidence?.documentId];
      if(!p||f?.caseId!==txCase.id||!f?.url?.endsWith("/2026112000282.pdf")||
         txCase.stage?.status!=="active"||txCase.stage?.date!=="2026-11-20"||txCase.stage?.eventKind!=="dispatch"||!txCase.diagramSpec?.topology)return null;
      return validateDiagramSpec({id:txCase.id,caseId:txCase.id,code:txCase.code,name:txCase.name,mechanism:txCase.mechanism,...cloneDeep(txCase.diagramSpec)});
    }

    if (txCase?.id === "HK-00017-20261115-recapitalisation-rights-whitewash") {
      const t=txCase.terms?.find(v=>v.key==="rights_shares_base_max"&&v.value===27682964881);
      const p=txCase.terms?.find(v=>v.key==="subscription_price"&&v.value===0.9&&v.currency==="HKD");
      const f=documents?.[t?.evidence?.documentId], i=documents?.[txCase.stage?.status==="active"&&txCase.events?.find(e=>e.kind==="ifa_appointment")?.evidence?.documentId];
      if(!p||f?.caseId!==txCase.id||i?.caseId!==txCase.id||
         !f?.url?.endsWith("/2026111500051.pdf")||!i?.url?.endsWith("/2026112301390.pdf")||
         txCase.stage.date!=="2026-11-23"||txCase.stage.eventKind!=="ifa_appointment"||!txCase.diagramSpec?.topology)return null;
      return validateDiagramSpec({id:txCase.id,caseId:txCase.id,code:txCase.code,name:txCase.name,mechanism:txCase.mechanism,...cloneDeep(txCase.diagramSpec)});
    }
    if(txCase?.id==="HK-03380-20261030-logan-restructuring-implementation"){const x=buildVerifiedLoganALC(txCase,documents);return x&&validateDiagramSpec(x);}
    if(txCase?.id==="HK-01936-20260925-innovation-forge"){const x=buildVerifiedRitamixOffer(txCase,documents);return x&&validateDiagramSpec(x);}
    if(txCase?.id==="HK-01085-20260924-shandong-zibo-epc"){const x=buildVerifiedHengxinEpc(txCase,documents);return x&&validateDiagramSpec(x);}
    if(txCase?.id==="HK-06666-20250911-everest-control-go"){const x=buildVerifiedEverestOffer(txCase,documents);return x&&validateDiagramSpec(x);}
    if(txCase?.id==="HK-03680-20260914-ligent-international-allocation"){const x=buildVerifiedRuiheAllocation(txCase,documents);return x&&validateDiagramSpec(x);}
    if (["HK-01088-20261127-shenhua-h-share-placing","HK-01156-20261109-cne-placing","HK-09988-20260823-alibaba-new-share-placing","HK-06082-20260705-biren-h-share-placing","HK-06082-20261008-hshare-placing","HK-01196-20261101-realord-top-up","HK-01156-20260625-cne-june-placement"].includes(txCase?.id)) { const x=txCase?.placementProof&&buildProvenCashPlacement(txCase,documents);return x&&validateDiagramSpec(x)||null; }
    if(txCase?.id==="HK-00980-20261120-lianhua-asset-management-renewal"){const x=buildVerifiedLianhuaRenewal(txCase,documents);return x&&validateDiagramSpec(x);}
    if(["HK-02650-20260623-zhida-h-placement","HK-02650-20260923-zhida-h-placement"].includes(txCase?.id)){const s=buildVerifiedZhidaHPlacement(txCase,documents);return s&&validateDiagramSpec(s);}
    if(txCase?.id==="HK-01748-20261008-ocean-vivo"){const x=buildVerifiedOceanVivo(txCase,documents);return x&&validateDiagramSpec(x);}
    if(txCase?.id==="HK-03816-20260904-luxshare-control"){const x=buildVerifiedKfmBlock(txCase,documents);return x&&validateDiagramSpec(x);}
    if(txCase?.id==="HK-01848-20261022-ari-eb-extension"){const x=buildVerifiedCalcExtension(txCase,documents);return x&&validateDiagramSpec(x);}
    if(txCase?.id==="HK-00442-20251112-vax-acquisition"){const x=buildVerifiedVax(txCase,documents);return x&&validateDiagramSpec(x);}
    if(txCase?.id==="HK-02239-20261013-s2c-yake-share-swap"){const x=buildVerifiedSmitSwap(txCase,documents);return x&&validateDiagramSpec(x);}
    if (["HK-00195-20261124-zhang-yunhe-partial","HK-01098-20261120-rke-stake-creditor-spv"].includes(txCase?.id)) {const x=buildVerifiedGreentechOrRke(txCase,documents);return x&&validateDiagramSpec(x);}
    if (["HK-02179-20261118-huyou-h-share-whitewash","HK-08535-20261102-zeng-kai"].includes(txCase?.id)) {const x=buildVerifiedHuyouOrVistar(txCase,documents);return x&&validateDiagramSpec(x);}
    if (["HK-08526-20261103-lumina","HK-06063-20260908-control-mgo"].includes(txCase?.id)) {const x=buildVerifiedWingFungOrLotus(txCase,documents);return x&&validateDiagramSpec(x);}
    if(txCase?.id==="HK-02663-20261020-dax"){const x=buildVerifiedDaxOffer(txCase,documents);return x&&validateDiagramSpec(x);}
    if (["HK-01958-20261125-anpeng-capital-injection","HK-03382-20260608-tianjin-port-two-terminals"].includes(txCase?.id)) {const x=buildVerifiedAnpengOrTianjin(txCase,documents);return x&&validateDiagramSpec(x);}
    if(txCase?.id==="HK-01440-20261023-circle-time-disposal")return buildStarShineCircleTime(txCase,documents);
    if(txCase?.id==="HK-06655-20260802-holcim-philippines")return buildHuaxinHolcim(txCase,documents);
    if(["HK-06623-20261106-pingan-purchasing","HK-06623-20261106-pingan-financial","HK-06623-20261106-pingan-consumer-finance","HK-06623-20261106-pingan-account"].includes(txCase?.id))return buildLufaxCCT(txCase,documents);
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

  // These are case timeline sources, not chart-specific evidence. Keep them
  // separate so existing chart legends and accessibility text stay unchanged.
  function getCaseTimelineSourceLinks(txCase, documents) {
    if (!txCase?.id || !documents) return [];
    const events = [...(txCase.events || []), ...(txCase.processEvents || [])];
    const first = events.find(e => e.state === "actual" && e.kind === "first_announcement");
    const stage = events.find(e => e.state === "actual" && e.kind === txCase.stage?.eventKind && e.date === txCase.stage?.date);
    const links = new Map();
    for (const [e, label] of [[first, "首份公告"], [stage, "阶段原件"]]) {
      const doc = documents[e?.evidence?.documentId];
      if (!doc || doc.caseId !== txCase.id || !/^https:\/\/(?:www[1-9]?\.hkexnews\.hk|www\.hsbc\.com|static\.midlandici\.com\.hk)\//i.test(doc.url)) continue;
      const pages = (e.evidence.pages || []).filter(p => Number.isSafeInteger(p) && p > 0);
      const entry = links.get(doc.id);
      if (entry) entry.pages = [...new Set([...entry.pages, ...pages])].sort((a, b) => a - b);
      else links.set(doc.id, {documentId: doc.id, pages: [...new Set(pages)], label});
    }
    return [...links.values()];
  }

  function renderDealDiagram(txCaseOrSpec, opts) {
    const options = opts && typeof opts === "object" ? opts : {};
    const spec = resolveSpec(txCaseOrSpec, options.documents);
    if (!spec) return "";
    const timelineSourceLinks = !spec.evidenceLinks?.length && typeof options.sourceLink === "function"
      ? getCaseTimelineSourceLinks(txCaseOrSpec, options.documents) : [];
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
      <div class="ddk-legend-bar" aria-label="交易结构披露原件">${spec.evidenceLinks.map(e => options.sourceLink(e, e.label)).join("")}</div>` : ""}${timelineSourceLinks.length ? `<div class="ddk-legend-bar" aria-label="交易公告原件">${timelineSourceLinks.map(e => options.sourceLink(e, e.label)).join("")}</div>` : ""}
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
