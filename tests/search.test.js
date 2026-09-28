import { describe, it, expect } from "vitest";
import {
  foldTraditional,
  normalizeSearchText,
  sponsorShortName,
  sponsorSearchAliases,
  sponsorDisplayEntries,
  sponsorLabels,
  dayUnitLabel,
  dayBasisNote,
  dayMetricEntry,
  fieldForDayMode,
  dayMetricField,
  dayMetricForField,
} from "../app.core.js";

describe("foldTraditional", () => {
  it("converts traditional Chinese to simplified", () => {
    expect(foldTraditional("國")).toBe("国");
    expect(foldTraditional("華")).toBe("华");
    expect(foldTraditional("東")).toBe("东");
  });

  it("leaves simplified Chinese unchanged", () => {
    expect(foldTraditional("国")).toBe("国");
    expect(foldTraditional("华")).toBe("华");
  });

  it("leaves ASCII unchanged", () => {
    expect(foldTraditional("abc")).toBe("abc");
  });

  it("handles null/undefined", () => {
    expect(foldTraditional(null)).toBe("");
    expect(foldTraditional(undefined)).toBe("");
  });

  it("handles mixed text", () => {
    const result = foldTraditional("國際Capital");
    expect(result).toContain("国");
    expect(result).toContain("Capital");
  });

  it("passes through unmapped CJK characters unchanged", () => {
    expect(foldTraditional("的")).toBe("的");
  });
});

describe("normalizeSearchText", () => {
  it("lowercases text", () => {
    expect(normalizeSearchText("ABC")).toBe("abc");
  });

  it("folds traditional Chinese", () => {
    expect(normalizeSearchText("國際")).toContain("国");
  });

  it("strips diacritics", () => {
    expect(normalizeSearchText("café")).toBe("cafe");
  });

  it("normalizes punctuation to spaces", () => {
    expect(normalizeSearchText("a(b)c")).toBe("a b c");
    expect(normalizeSearchText("a,b,c")).toBe("a b c");
  });

  it("collapses whitespace", () => {
    expect(normalizeSearchText("a   b   c")).toBe("a b c");
  });

  it("trims leading/trailing whitespace", () => {
    expect(normalizeSearchText("  hello  ")).toBe("hello");
  });

  it("handles empty input", () => {
    expect(normalizeSearchText("")).toBe("");
    expect(normalizeSearchText(null)).toBe("");
  });

  it("normalizes Chinese brackets", () => {
    expect(normalizeSearchText("（中国）")).toContain("中国");
    expect(normalizeSearchText("【测试】")).toContain("测试");
  });
});

describe("sponsorShortName", () => {
  it("returns short name for known sponsors", () => {
    expect(sponsorShortName("CICC")).toBe("中金");
    expect(sponsorShortName("China International Capital Corporation")).toBe("中金");
  });

  it("returns short name for Goldman Sachs", () => {
    expect(sponsorShortName("Goldman Sachs (Asia) L.L.C.")).toBe("高盛");
  });

  it("returns short name for Morgan Stanley", () => {
    expect(sponsorShortName("Morgan Stanley Asia Limited")).toBe("摩根士丹利");
  });

  it("returns short name for UBS", () => {
    expect(sponsorShortName("UBS AG")).toBe("瑞银");
  });

  it("returns short name for HSBC", () => {
    expect(sponsorShortName("HSBC")).toBe("汇丰");
  });

  it("truncates unknown sponsors to first two words", () => {
    expect(sponsorShortName("Some Random Sponsor Name")).toBe("Some Random");
  });

  it("strips common corporate suffixes for unknown sponsors", () => {
    const result = sponsorShortName("Example Securities Limited");
    expect(result).not.toContain("Securities");
    expect(result).not.toContain("Limited");
  });

  it("returns 待抽取 as-is", () => {
    expect(sponsorShortName("待抽取")).toBe("待抽取");
  });

  it("returns empty string for null", () => {
    expect(sponsorShortName(null)).toBe("");
  });

  it("returns empty string for empty string", () => {
    expect(sponsorShortName("")).toBe("");
  });
});

describe("sponsorSearchAliases", () => {
  it("returns aliases for known sponsors", () => {
    const aliases = sponsorSearchAliases("CICC");
    expect(aliases).toContain("中金");
    expect(aliases).toContain("CICC");
    expect(aliases.length).toBeGreaterThan(0);
  });

  it("returns aliases by short name", () => {
    const aliases = sponsorSearchAliases("中金");
    expect(aliases).toContain("中金");
    expect(aliases).toContain("CICC");
  });

  it("returns empty array for unknown sponsors", () => {
    expect(sponsorSearchAliases("Unknown Sponsor")).toEqual([]);
  });

  it("returns empty array for null", () => {
    expect(sponsorSearchAliases(null)).toEqual([]);
  });
});

describe("sponsorDisplayEntries", () => {
  it("returns entries for record with sponsors", () => {
    const record = { sponsors: ["Goldman Sachs (Asia) L.L.C."] };
    const entries = sponsorDisplayEntries(record);
    expect(entries).toHaveLength(1);
    expect(entries[0].shortName).toBe("高盛");
    expect(entries[0].fullName).toBe("Goldman Sachs (Asia) L.L.C.");
  });

  it("deduplicates sponsors with same short name", () => {
    const record = {
      sponsors: [
        "Goldman Sachs (Asia) L.L.C.",
        "Goldman Sachs International",
      ],
    };
    const entries = sponsorDisplayEntries(record);
    expect(entries).toHaveLength(1);
  });

  it("handles records with no sponsors", () => {
    expect(sponsorDisplayEntries({})).toEqual([]);
    expect(sponsorDisplayEntries({ sponsors: [] })).toEqual([]);
  });

  it("handles multiple different sponsors", () => {
    const record = {
      sponsors: ["Goldman Sachs (Asia)", "Morgan Stanley Asia Limited"],
    };
    const entries = sponsorDisplayEntries(record);
    expect(entries).toHaveLength(2);
  });
});

describe("sponsorLabels", () => {
  it("returns short names only", () => {
    const record = { sponsors: ["Goldman Sachs (Asia) L.L.C."] };
    expect(sponsorLabels(record)).toEqual(["高盛"]);
  });

  it("returns empty array for no sponsors", () => {
    expect(sponsorLabels({})).toEqual([]);
  });
});

describe("dayUnitLabel", () => {
  it("returns 自然日 for calendar mode", () => {
    expect(dayUnitLabel("calendar")).toBe("自然日");
  });

  it("returns 工作日 for business mode", () => {
    expect(dayUnitLabel("business")).toBe("工作日");
  });

  it("defaults to calendar", () => {
    expect(dayUnitLabel()).toBe("自然日");
  });
});

describe("dayBasisNote", () => {
  it("returns correct note for calendar mode", () => {
    expect(dayBasisNote("calendar")).toBe("按自然日差值");
  });

  it("returns correct note for business mode", () => {
    expect(dayBasisNote("business")).toBe("按中国节假日调休口径");
  });
});

describe("dayMetricEntry", () => {
  it("finds entry for calendar field", () => {
    const entry = dayMetricEntry("calendarDaysA1ToReceived");
    expect(entry).not.toBeNull();
    expect(entry.label).toBe("A1至接收");
  });

  it("finds entry for business field", () => {
    const entry = dayMetricEntry("businessDaysA1ToReceived");
    expect(entry).not.toBeNull();
    expect(entry.label).toBe("A1至接收");
  });

  it("returns null for unknown fields", () => {
    expect(dayMetricEntry("unknownField")).toBeNull();
  });
});

describe("fieldForDayMode", () => {
  it("converts calendar field to business", () => {
    expect(
      fieldForDayMode("calendarDaysA1ToReceived", "business")
    ).toBe("businessDaysA1ToReceived");
  });

  it("converts business field to calendar", () => {
    expect(
      fieldForDayMode("businessDaysA1ToReceived", "calendar")
    ).toBe("calendarDaysA1ToReceived");
  });

  it("returns field unchanged for non-day fields", () => {
    expect(fieldForDayMode("a1Date", "calendar")).toBe("a1Date");
    expect(fieldForDayMode("a1Date", "business")).toBe("a1Date");
  });
});

describe("dayMetricField", () => {
  it("returns calendar field for calendar mode", () => {
    expect(dayMetricField("a1ToReceived", "calendar")).toBe(
      "calendarDaysA1ToReceived"
    );
  });

  it("returns business field for business mode", () => {
    expect(dayMetricField("a1ToReceived", "business")).toBe(
      "businessDaysA1ToReceived"
    );
  });

  it("returns metric as-is for unknown metrics", () => {
    expect(dayMetricField("unknown", "calendar")).toBe("unknown");
  });
});

describe("dayMetricForField", () => {
  it("returns metric name for calendar field", () => {
    expect(dayMetricForField("calendarDaysA1ToReceived")).toBe("a1ToReceived");
  });

  it("returns metric name for business field", () => {
    expect(dayMetricForField("businessDaysReceivedToNotice")).toBe(
      "receivedToNotice"
    );
  });

  it("returns null for unknown fields", () => {
    expect(dayMetricForField("unknownField")).toBeNull();
  });

  it("maps all listing fields correctly", () => {
    expect(dayMetricForField("calendarDaysA1ToListing")).toBe("a1ToListing");
    expect(dayMetricForField("businessDaysA1ToListing")).toBe("a1ToListing");
  });
});
