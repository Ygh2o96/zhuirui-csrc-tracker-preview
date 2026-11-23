/*!
 * YingSight Deal Structure Kit (YingSightDealDiagramKit v2.0)
 * True 2D Spatial Investment-Banking Pitchbook Vector Topology SVG Engine
 * + Declarative Spec Validator + Mathematical Geometry Linter (lintDiagramGeometry)
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
    if (ch === " " || ch === "." || ch === ":" || ch === "·") return 0.34;
    if (ch >= "A" && ch <= "Z") return 0.66;
    return 0.56;
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
    for (const tok of tokens) {
      const tw = measureTextUnits(tok);
      if (units + tw <= maxUnits || !current) {
        current += tok;
        units += tw;
      } else {
        lines.push(current.trim());
        current = tok.trimStart();
        units = measureTextUnits(current);
        if (lines.length === maxLines - 1) break;
      }
    }
    if (current.trim()) {
      const restIndex = clean.indexOf(current.trim());
      const remainder =
        lines.length === maxLines - 1 && restIndex >= 0
          ? clean.slice(clean.length - current.trim().length)
          : current.trim();
      lines.push(truncateVisual(remainder, maxUnits));
    }
    return lines.slice(0, maxLines);
  }

  function formatChineseMoney(value, currency, approximate) {
    const num = Number(value);
    if (!Number.isFinite(num)) return "";
    const abs = Math.abs(num);
    const prefix = `${approximate ? "约 " : ""}${currency ? currency + " " : ""}`;
    if (abs >= 1e8) {
      const yi = abs / 1e8;
      const decimals = yi >= 100 ? 1 : yi >= 10 ? 2 : 3;
      const formatted = Number(yi.toFixed(decimals)).toLocaleString("en-US", {
        minimumFractionDigits: yi >= 100 ? 1 : yi >= 10 ? 1 : 2,
        maximumFractionDigits: decimals,
      });
      return `${prefix}${formatted}亿`;
    }
    if (abs >= 1e4) {
      const wan = abs / 1e4;
      const exactWan = Math.abs(wan - Math.round(wan)) < 0.05;
      return `${prefix}${wan.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: exactWan ? 0 : 1,
      })}万`;
    }
    return `${prefix}${abs.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  }

  function formatChineseShares(value) {
    const num = Number(value);
    if (!Number.isFinite(num)) return "";
    if (num >= 1e8) {
      const yi = num / 1e8;
      const decimals = yi >= 100 ? 1 : 2;
      return `${yi.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}亿股`;
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
      const decimals = Number.isInteger(term.precision) ? term.precision : 2;
      return `${term.currency ? term.currency + " " : ""}${Number(term.value).toFixed(decimals)}/股`;
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

    const maxTitleUnits = Math.max(8, (w - 22) / 12.2);
    const titleLines = wrapSvgText(title, maxTitleUnits, 2);
    const maxSubUnits = Math.max(10, (w - 22) / 10.2);
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
      const stepOffset = step ? 22 : 0;
      const autoW = Math.max(
        measureTextUnits(label) * 11.4 + 24 + stepOffset,
        sublabel ? measureTextUnits(sublabel) * 9.8 + 22 : 0
      );
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
        const line1Max = Math.max(8, (pillW - 16 - stepOffset) / 11.2);
        const line2Max = Math.max(10, (pillW - 16) / 9.8);
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
        const line1Max = Math.max(4, (pillW - 10 - stepOffset) / 10.6);
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
          terminated: p.status === "terminated",
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
          terminated: p.status === "terminated",
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
          labelWidth: 368,
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
          labelWidth: 204,
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
        { id: "L_listed", panel: "left", x: 34, y: 244, w: 220, h: 90, role: "listed", title: p.listedName, code: p.code, subtitle: "可转债发行人 / 担保主体" },
        { id: "L_inv", panel: "left", x: 404, y: 204, w: 210, h: 88, role: "creditor", title: p.invName || "境外机构债券认购人", subtitle: "Reg S 专业投资者簿记" },
        { id: "R_sh", panel: "right", x: 700, y: 112, w: 162, h: 84, role: "public", title: "既有股东", subtitle: "未转股前零即时摊薄" },
        { id: "R_cb", panel: "right", x: 886, y: 112, w: 162, h: 84, role: "creditor", title: "可转债持有人", subtitle: "票息保底 + 溢价转股权" },
        { id: "R_listed", panel: "right", x: 734, y: 292, w: 280, h: 84, role: "listed", title: p.listedName, code: p.code, subtitle: "境外债券挂牌 · 潜在转股扩股" },
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
  const CURATED_BUILDERS = {
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

  function detectModality(txCase, archetype) {
    const terms = Array.isArray(txCase.terms) ? txCase.terms : [];
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
          { id: "buyer_entity", role: "listed", name: buyerParty, code, sublabel: "采购买方主体", tier: 0 },
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
          proposedOrTerminated: isTerminated,
        },
        {
          id: "proc_deliver",
          kind: "asset",
          direction: "rtl",
          step: "02",
          fromLabel: vendorName,
          toLabel: buyerParty,
          headline: `交付 ${assetName}`,
          subline: `纯商业资产采购 · 适用 ${ruleSummary}`,
          proposedOrTerminated: isTerminated,
        },
      ],
      after: {
        title: "合同履约与资产入账状态",
        nodes: [
          { id: "buyer_after", role: "listed", name: buyerParty, code, sublabel: isTerminated ? "采购合同已终止" : "结算合同款项 · 维持原有架构", tier: 0 },
          { id: "equip_after", role: "target", name: assetName, sublabel: isTerminated ? "未交付" : "固定资产交付验收（非附属公司）", badge: isTerminated ? "已终止" : "商业资产", tier: 1 },
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
          title: "合同价款与预付款抵扣",
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
          body: `${stageLabel}${stageDate ? `（${stageDate}）` : ""} · 属商业设备及固定资产采购合同，仅作资产购置入账。`,
          ruleCode: null,
        },
      ],
    };

    spec.topology = buildCommercialProcurementTopology({
      status,
      buyerName: buyerParty,
      code,
      vendorName,
      assetName,
      payLabel: primaryExact,
      paySub: secondaryExact || "按采购协议结算价款",
      deliveryLabel: `交付 ${assetName}`,
      deliverySub: `商业资产入账 · 适用 ${ruleSummary}`,
      outcomeBadge: spec.after.outcomeBadge,
    });

    return validateDiagramSpec(spec);
  }

  function deriveDiagramFromCase(txCase) {
    if (!txCase || typeof txCase !== "object") {
      throw new Error("deriveDiagramFromCase requires a transaction case object");
    }
    if (isCommercialProcurementCase(txCase)) {
      return deriveCommercialProcurementCase(txCase);
    }
    const archetype = detectArchetype(txCase);
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

    const amountHeadlineParts = [];
    if (perShareTerm) amountHeadlineParts.push(formatTermBrief(perShareTerm));
    if (moneyTerm) amountHeadlineParts.push(formatTermBrief(moneyTerm));
    if (ratioTerm) amountHeadlineParts.push(`换股 ${formatTermBrief(ratioTerm)}`);
    if (sharesTerm) amountHeadlineParts.push(`发行 ${formatTermBrief(sharesTerm)}`);
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
    spec.flows[0].proposedOrTerminated = isTerminated;
    if (spec.flows[1]) {
      spec.flows[1].subline = `适用规则：${ruleSummary}`;
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

    spec.compactSummary = `${name} · ${primaryAmountText} → ${spec.after.outcomeBadge}`;
    spec.topology = synthesizeTopologyFromSpec(spec);

    return validateDiagramSpec(spec);
  }

  function getSpecForCase(txCase) {
    if (!txCase || typeof txCase !== "object") {
      throw new Error("getSpecForCase requires a transaction case object");
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
      if (!merged.topology) merged.topology = synthesizeTopologyFromSpec(merged);
      return validateDiagramSpec(merged);
    }
    const builder = txCase.id ? CURATED_BUILDERS[txCase.id] : null;
    if (builder) {
      return validateDiagramSpec(builder(txCase));
    }
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

    return `<svg class="ddk-svg-desktop" viewBox="0 0 ${layout.width} ${layout.height}" role="img" aria-label="${escapeHtml((spec.name || "") + " " + layout.leftTitle + " 与 " + layout.rightTitle)}">
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
      <svg class="ddk-svg-panel" viewBox="0 0 ${lp.w} ${lp.h}" role="img" aria-label="${escapeHtml(layout.leftTitle)}">
        <g transform="translate(${-lp.x}, ${-lp.y})">
          ${leftFrame}
          ${leftBody}
        </g>
      </svg>
      <div class="ddk-mobile-gate is-status-${escapeHtml(layout.status)}" aria-hidden="true">
        <span>▼ ${escapeHtml(layout.transitionLabel || "交割后")}</span>
      </div>
      <svg class="ddk-svg-panel is-right" viewBox="0 0 ${rp.w} ${rp.h}" role="img" aria-label="${escapeHtml(layout.rightTitle)}">
        <g transform="translate(${-rp.x}, ${-rp.y})">
          ${rightFrame}
          ${rightBody}
          ${outcome}
        </g>
      </svg>
    </div>`;
  }

  function resolveSpec(txCaseOrSpec) {
    if (!txCaseOrSpec || typeof txCaseOrSpec !== "object") {
      throw new Error("renderDealDiagram requires a transaction case or DiagramSpec object");
    }
    if (txCaseOrSpec.before && txCaseOrSpec.after && txCaseOrSpec.flows) {
      const spec = txCaseOrSpec.topology
        ? txCaseOrSpec
        : { ...txCaseOrSpec, topology: synthesizeTopologyFromSpec(txCaseOrSpec) };
      return validateDiagramSpec(spec);
    }
    return getSpecForCase(txCaseOrSpec);
  }

  function renderDealDiagram(txCaseOrSpec, opts) {
    const spec = resolveSpec(txCaseOrSpec);
    const options = opts && typeof opts === "object" ? opts : {};
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

    const annotationsHtml = showAnnotations
      ? `<aside class="ddk-annotations" aria-label="交易架构要点批注">${spec.annotations
          .map(
            (a) => `<div class="ddk-callout">
              <div class="ddk-callout-head">
                <span class="ddk-callout-tag">${escapeHtml(a.tag)}</span>
                <strong class="ddk-callout-title">${escapeHtml(a.title)}</strong>
                ${a.ruleCode ? `<span class="ddk-rule-pill">${escapeHtml(a.ruleCode)}</span>` : ""}
              </div>
              <p class="ddk-callout-body">${escapeHtml(a.body)}</p>
            </div>`
          )
          .join("")}</aside>`
      : "";

    const headerPillTitle = isPureAssetContract && spec.mechanism ? spec.mechanism : archInfo.labelZh;
    const legendHtml = isPureAssetContract
      ? `<span class="ddk-legend-item"><i class="is-cash"></i>合同价款结算</span>
        <span class="ddk-legend-item"><i class="is-asset"></i>设备 / 商业资产交付</span>
        <span class="ddk-legend-item">纯商业采购合同（非公司收购）</span>`
      : `<span class="ddk-legend-item"><i class="is-cash"></i>现金对价</span>
        <span class="ddk-legend-item"><i class="is-shares"></i>股权 / 换股</span>
        <span class="ddk-legend-item"><i class="is-asset"></i>资产交付 / 注销退市</span>
        <span class="ddk-legend-item"><i class="is-edge-solid"></i>实线控股 · 虚线公众/少数</span>`;

    return `<section class="ddk-board is-status-${escapeHtml(spec.status)}${isTerminated ? " is-terminated" : ""}${options.compact ? " is-compact" : ""}" data-ddk-case="${escapeHtml(caseAttr)}" data-ddk-archetype="${escapeHtml(spec.archetype)}" data-ddk-filter="${escapeHtml(initialFilter)}" aria-label="交易架构与对价流向图">
      <header class="ddk-header">
        <div class="ddk-header-meta">
          <span class="ddk-archetype-pill">${escapeHtml(headerPillTitle)}<small>${escapeHtml(archInfo.id.toUpperCase())}</small></span>
          <span class="ddk-modality-pill is-modality-${escapeHtml(spec.modality)}">${escapeHtml(modalityInfo.labelZh)}</span>
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
      ${annotationsHtml}
    </section>`;
  }

  function renderCompactFlowBadge(txCase) {
    const spec = resolveSpec(txCase);
    const archInfo = ARCHETYPES[spec.archetype];
    const modalityInfo = MODALITY_BADGES[spec.modality];
    const caseAttr = spec.caseId || spec.id || spec.archetype;
    const summary =
      spec.compactSummary ||
      `${spec.flows[0].headline} → ${spec.after.outcomeBadge}`;

    return `<div class="ddk-compact-flow is-status-${escapeHtml(spec.status)} is-modality-${escapeHtml(spec.modality)}" data-ddk-case="${escapeHtml(caseAttr)}" data-ddk-archetype="${escapeHtml(spec.archetype)}">
      <span class="ddk-cf-archetype">${escapeHtml(archInfo.shortZh)}</span>
      <span class="ddk-cf-modality is-modality-${escapeHtml(spec.modality)}">${escapeHtml(modalityInfo.shortZh)}</span>
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
