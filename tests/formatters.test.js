import { describe, it, expect } from "vitest";
import {
  escapeHtml,
  asDateValue,
  formatDate,
  formatDatePlain,
  formatNumber,
  formatDayValue,
  formatDayNumber,
  formatPending,
} from "../app.core.js";

describe("escapeHtml", () => {
  it("escapes ampersands", () => {
    expect(escapeHtml("a&b")).toBe("a&amp;b");
  });

  it("escapes angle brackets", () => {
    expect(escapeHtml("<script>")).toBe("&lt;script&gt;");
  });

  it("escapes double quotes", () => {
    expect(escapeHtml('"hello"')).toBe("&quot;hello&quot;");
  });

  it("escapes single quotes", () => {
    expect(escapeHtml("it's")).toBe("it&#039;s");
  });

  it("handles null and undefined", () => {
    expect(escapeHtml(null)).toBe("");
    expect(escapeHtml(undefined)).toBe("");
  });

  it("converts numbers to strings", () => {
    expect(escapeHtml(42)).toBe("42");
  });

  it("returns empty string for empty input", () => {
    expect(escapeHtml("")).toBe("");
  });

  it("handles mixed special characters", () => {
    expect(escapeHtml('<a href="x">&')).toBe(
      "&lt;a href=&quot;x&quot;&gt;&amp;"
    );
  });
});

describe("asDateValue", () => {
  it("returns null for falsy values", () => {
    expect(asDateValue(null)).toBeNull();
    expect(asDateValue(undefined)).toBeNull();
    expect(asDateValue("")).toBeNull();
  });

  it("parses valid ISO date strings", () => {
    const result = asDateValue("2024-01-15");
    expect(result).toBeTypeOf("number");
    expect(result).toBeGreaterThan(0);
  });

  it("returns null for invalid date strings", () => {
    expect(asDateValue("not-a-date")).toBeNull();
  });

  it("returns consistent values for same date", () => {
    const a = asDateValue("2024-06-01");
    const b = asDateValue("2024-06-01");
    expect(a).toBe(b);
  });

  it("orders dates correctly", () => {
    const earlier = asDateValue("2023-01-01");
    const later = asDateValue("2024-01-01");
    expect(earlier).toBeLessThan(later);
  });
});

describe("formatDate", () => {
  it("returns date string for valid ISO date", () => {
    expect(formatDate("2024-03-15")).toBe("2024-03-15");
  });

  it("returns pending HTML for null", () => {
    const result = formatDate(null);
    expect(result).toContain("待披露");
    expect(result).toContain("Pending");
  });

  it("returns pending HTML for undefined", () => {
    expect(formatDate(undefined)).toContain("待披露");
  });

  it("returns pending for empty string", () => {
    expect(formatDate("")).toContain("待披露");
  });

  it("returns pending for non-date strings", () => {
    expect(formatDate("not-a-date")).toContain("待披露");
  });

  it("returns pending for partial dates", () => {
    expect(formatDate("2024-01")).toContain("待披露");
  });
});

describe("formatDatePlain", () => {
  it("returns date string for valid date", () => {
    expect(formatDatePlain("2024-03-15")).toBe("2024-03-15");
  });

  it("returns 待披露 for null", () => {
    expect(formatDatePlain(null)).toBe("待披露");
  });

  it("returns 待披露 for invalid date", () => {
    expect(formatDatePlain("not-a-date")).toBe("待披露");
  });
});

describe("formatNumber", () => {
  it("formats decimal numbers", () => {
    expect(formatNumber(1234.56)).toBe("1,234.6");
  });

  it("formats integer mode", () => {
    expect(formatNumber(1234.56, "integer")).toBe("1,235");
  });

  it("returns 待披露 for null", () => {
    expect(formatNumber(null)).toBe("待披露");
  });

  it("returns 待披露 for undefined", () => {
    expect(formatNumber(undefined)).toBe("待披露");
  });

  it("returns 待披露 for empty string", () => {
    expect(formatNumber("")).toBe("待披露");
  });

  it("returns 待披露 for NaN", () => {
    expect(formatNumber(NaN)).toBe("待披露");
  });

  it("formats zero", () => {
    expect(formatNumber(0)).toBe("0");
  });

  it("formats zero in integer mode", () => {
    expect(formatNumber(0, "integer")).toBe("0");
  });
});

describe("formatDayValue", () => {
  it("formats integer day values", () => {
    expect(formatDayValue(45)).toBe("45");
  });

  it("ceils fractional day values", () => {
    expect(formatDayValue(44.3)).toBe("45");
  });

  it("returns 待披露 for null", () => {
    expect(formatDayValue(null)).toBe("待披露");
  });

  it("returns 待披露 for undefined", () => {
    expect(formatDayValue(undefined)).toBe("待披露");
  });

  it("returns 待披露 for empty string", () => {
    expect(formatDayValue("")).toBe("待披露");
  });

  it("returns 待披露 for NaN", () => {
    expect(formatDayValue(NaN)).toBe("待披露");
  });

  it("formats large numbers with comma separator", () => {
    expect(formatDayValue(1234)).toBe("1,234");
  });
});

describe("formatDayNumber", () => {
  it("returns formatted value with unit", () => {
    expect(formatDayNumber(45, "自然日")).toBe("45 自然日");
  });

  it("returns pending for non-number", () => {
    const result = formatDayNumber(null, "自然日");
    expect(result).toContain("待披露");
  });

  it("returns pending for undefined", () => {
    const result = formatDayNumber(undefined, "工作日");
    expect(result).toContain("待披露");
  });

  it("uses default unit when not specified", () => {
    expect(formatDayNumber(10)).toBe("10 自然日");
  });
});

describe("formatPending", () => {
  it("returns HTML with Chinese and English labels", () => {
    const result = formatPending();
    expect(result).toContain("待披露");
    expect(result).toContain("Pending");
    expect(result).toContain("pending-zh");
    expect(result).toContain("pending-en");
  });
});
