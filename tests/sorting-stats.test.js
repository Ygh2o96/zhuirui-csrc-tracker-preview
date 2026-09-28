import { describe, it, expect } from "vitest";
import {
  sortKey,
  isMissingSortKey,
  compareSortKeys,
  defaultSortDir,
  firstTextValue,
  durationValueForDisplay,
  median,
  durationValueForStats,
  statsFor,
  emptyPayload,
  debounce,
  isStatsOutlier,
  visibleStatusTags,
} from "../app.core.js";

describe("sortKey", () => {
  it('returns status sort rank for "status" field', () => {
    const key = sortKey({ status: "notice_issued" }, "status");
    expect(key).toEqual({ value: 10, type: "number" });
  });

  it("returns 999 for unknown status", () => {
    const key = sortKey({ status: "unknown" }, "status");
    expect(key).toEqual({ value: 999, type: "number" });
  });

  it("returns first industry tag for industryTags field", () => {
    const key = sortKey(
      { industryTags: ["制造业", "科技"] },
      "industryTags"
    );
    expect(key.type).toBe("text");
    expect(key.value).toBeTruthy();
  });

  it("returns empty for missing industry tags", () => {
    const key = sortKey({}, "industryTags");
    expect(key.value).toBe("");
  });

  it("returns issuer type rank for structureType field", () => {
    const key = sortKey({ isAH: true }, "structureType");
    expect(key.value).toBe(1);
    expect(key.type).toBe("number");
  });

  it("returns combined name for issuerName field", () => {
    const key = sortKey(
      { issuerName: "Test Corp", csrcName: "测试公司" },
      "issuerName"
    );
    expect(key.type).toBe("text");
    expect(key.value).toContain("测试公司");
    expect(key.value).toContain("Test Corp");
  });

  it("returns date value for date fields", () => {
    const key = sortKey({ a1Date: "2024-01-15" }, "a1Date");
    expect(key.type).toBe("number");
    expect(key.value).toBeTypeOf("number");
  });

  it("returns null date value for missing date fields", () => {
    const key = sortKey({}, "a1Date");
    expect(key.value).toBeNull();
  });

  it("returns market cap for AH candidates", () => {
    const key = sortKey(
      { isAH: true, aShareMarketCapAtA1RmbBn: 50.5 },
      "aShareMarketCapAtA1RmbBn"
    );
    expect(key.value).toBe(50.5);
  });

  it("returns null market cap for non-AH", () => {
    const key = sortKey(
      { aShareMarketCapAtA1RmbBn: 50.5 },
      "aShareMarketCapAtA1RmbBn"
    );
    expect(key.value).toBeNull();
  });

  it("returns listing market cap as number", () => {
    const key = sortKey(
      { listingMarketCapHkdBn: 30 },
      "listingMarketCapHkdBn"
    );
    expect(key.value).toBe(30);
  });

  it("returns null for non-numeric listing market cap", () => {
    const key = sortKey({}, "listingMarketCapHkdBn");
    expect(key.value).toBeNull();
  });

  it("handles csrcReceivedDate with fallback", () => {
    const key = sortKey(
      { csrcFirstReceivedDate: "2024-01-01" },
      "csrcReceivedDate"
    );
    expect(key.type).toBe("number");
    expect(key.value).toBeTypeOf("number");
  });

  it("handles duration fields", () => {
    const key = sortKey(
      { calendarDaysA1ToReceived: 45 },
      "calendarDaysA1ToReceived"
    );
    expect(key.type).toBe("number");
    expect(key.value).toBe(45);
  });

  it("returns null duration for ineligible records", () => {
    const key = sortKey(
      {
        calendarDaysA1ToNotice: 100,
        durationSampleEligible: false,
      },
      "calendarDaysA1ToNotice"
    );
    expect(key.value).toBeNull();
  });

  it("falls back to raw field value for unknown fields", () => {
    const key = sortKey({ customField: "test" }, "customField");
    expect(key.value).toBe("test");
    expect(key.type).toBe("text");
  });

  it("detects numeric type for raw number fields", () => {
    const key = sortKey({ someNumber: 42 }, "someNumber");
    expect(key.type).toBe("number");
    expect(key.value).toBe(42);
  });
});

describe("isMissingSortKey", () => {
  it("returns true for null value", () => {
    expect(isMissingSortKey({ value: null, type: "text" })).toBe(true);
  });

  it("returns true for undefined value", () => {
    expect(isMissingSortKey({ value: undefined, type: "text" })).toBe(true);
  });

  it("returns true for empty string", () => {
    expect(isMissingSortKey({ value: "", type: "text" })).toBe(true);
  });

  it("returns true for NaN number", () => {
    expect(isMissingSortKey({ value: NaN, type: "number" })).toBe(true);
  });

  it("returns true for known pending strings", () => {
    expect(isMissingSortKey({ value: "待披露", type: "text" })).toBe(true);
    expect(isMissingSortKey({ value: "Pending", type: "text" })).toBe(true);
    expect(isMissingSortKey({ value: "N/A", type: "text" })).toBe(true);
    expect(isMissingSortKey({ value: "待补", type: "text" })).toBe(true);
    expect(isMissingSortKey({ value: "待补充", type: "text" })).toBe(true);
    expect(isMissingSortKey({ value: "not applicable", type: "text" })).toBe(
      true
    );
    expect(isMissingSortKey({ value: "不适用", type: "text" })).toBe(true);
  });

  it("returns false for valid values", () => {
    expect(isMissingSortKey({ value: "abc", type: "text" })).toBe(false);
    expect(isMissingSortKey({ value: 42, type: "number" })).toBe(false);
    expect(isMissingSortKey({ value: 0, type: "number" })).toBe(false);
  });
});

describe("compareSortKeys", () => {
  it("compares two numbers", () => {
    const a = { value: 10, type: "number" };
    const b = { value: 20, type: "number" };
    expect(compareSortKeys(a, b)).toBeLessThan(0);
    expect(compareSortKeys(b, a)).toBeGreaterThan(0);
  });

  it("returns 0 for equal numbers", () => {
    const a = { value: 10, type: "number" };
    const b = { value: 10, type: "number" };
    expect(compareSortKeys(a, b)).toBe(0);
  });

  it("compares text values", () => {
    const a = { value: "abc", type: "text" };
    const b = { value: "xyz", type: "text" };
    expect(compareSortKeys(a, b)).toBeLessThan(0);
  });

  it("uses locale-aware comparison for text", () => {
    const a = { value: "10", type: "text" };
    const b = { value: "2", type: "text" };
    expect(compareSortKeys(a, b)).toBeGreaterThan(0);
  });
});

describe("defaultSortDir", () => {
  it("returns desc for date fields", () => {
    expect(defaultSortDir("a1Date")).toBe("desc");
    expect(defaultSortDir("currentA1Date")).toBe("desc");
    expect(defaultSortDir("noticeDate")).toBe("desc");
    expect(defaultSortDir("hkexListingDate")).toBe("desc");
  });

  it("returns desc for duration fields", () => {
    expect(defaultSortDir("calendarDaysA1ToReceived")).toBe("desc");
    expect(defaultSortDir("businessDaysA1ToReceived")).toBe("desc");
  });

  it("returns desc for market cap fields", () => {
    expect(defaultSortDir("aShareMarketCapAtA1RmbBn")).toBe("desc");
    expect(defaultSortDir("listingMarketCapHkdBn")).toBe("desc");
  });

  it("returns asc for non-descending fields", () => {
    expect(defaultSortDir("issuerName")).toBe("asc");
    expect(defaultSortDir("status")).toBe("asc");
    expect(defaultSortDir("unknownField")).toBe("asc");
  });
});

describe("firstTextValue", () => {
  it("returns first sorted value from array", () => {
    const result = firstTextValue(["制造业", "科技"]);
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
  });

  it("filters out 待抽取", () => {
    expect(firstTextValue(["待抽取", "科技"])).toBe("科技");
  });

  it("filters out Pending extraction", () => {
    expect(firstTextValue(["Pending extraction", "Tech"])).toBe("Tech");
  });

  it("returns empty string for empty array", () => {
    expect(firstTextValue([])).toBe("");
  });

  it("returns empty string for all-pending array", () => {
    expect(firstTextValue(["待抽取"])).toBe("");
  });

  it("handles single value (non-array)", () => {
    expect(firstTextValue("hello")).toBe("hello");
  });

  it("handles null values in array", () => {
    expect(firstTextValue([null, "test"])).toBe("test");
  });
});

describe("durationValueForDisplay", () => {
  it("returns value for eligible records", () => {
    const record = { calendarDaysA1ToReceived: 45 };
    expect(durationValueForDisplay(record, "a1ToReceived", "calendar")).toBe(
      45
    );
  });

  it("returns null for a1ToListing when listing not eligible", () => {
    const record = {
      calendarDaysA1ToListing: 200,
      listingDurationSampleEligible: false,
    };
    expect(durationValueForDisplay(record, "a1ToListing", "calendar")).toBeNull();
  });

  it("returns null for a1ToNotice when duration not eligible", () => {
    const record = {
      calendarDaysA1ToNotice: 100,
      durationSampleEligible: false,
    };
    expect(durationValueForDisplay(record, "a1ToNotice", "calendar")).toBeNull();
  });

  it("returns null when field is missing", () => {
    expect(durationValueForDisplay({}, "a1ToReceived", "calendar")).toBeNull();
  });

  it("returns business days in business mode", () => {
    const record = { businessDaysA1ToReceived: 30 };
    expect(durationValueForDisplay(record, "a1ToReceived", "business")).toBe(
      30
    );
  });
});

describe("median", () => {
  it("returns null for empty array", () => {
    expect(median([])).toBeNull();
  });

  it("returns single value for one-element array", () => {
    expect(median([5])).toBe(5);
  });

  it("returns middle value for odd-length array", () => {
    expect(median([1, 3, 5])).toBe(3);
  });

  it("returns average of two middle values for even-length array", () => {
    expect(median([1, 2, 3, 4])).toBe(2.5);
  });

  it("handles unsorted input", () => {
    expect(median([5, 1, 3])).toBe(3);
  });

  it("does not mutate input array", () => {
    const input = [3, 1, 2];
    median(input);
    expect(input).toEqual([3, 1, 2]);
  });

  it("handles duplicate values", () => {
    expect(median([5, 5, 5])).toBe(5);
  });

  it("handles two elements", () => {
    expect(median([10, 20])).toBe(15);
  });
});

describe("durationValueForStats", () => {
  const metricA1ToReceived = { metric: "a1ToReceived" };
  const metricA1ToListing = { metric: "a1ToListing" };
  const metricA1ToNotice = { metric: "a1ToNotice" };

  it("returns value for eligible a1ToReceived", () => {
    const record = { calendarDaysA1ToReceived: 45 };
    expect(durationValueForStats(record, metricA1ToReceived)).toBe(45);
  });

  it("returns null when csrcFilingRequired is false", () => {
    const record = {
      calendarDaysA1ToReceived: 45,
      csrcFilingRequired: false,
    };
    expect(durationValueForStats(record, metricA1ToReceived)).toBeNull();
  });

  it("returns null when durationSampleEligible is false", () => {
    const record = {
      calendarDaysA1ToReceived: 45,
      durationSampleEligible: false,
    };
    expect(durationValueForStats(record, metricA1ToReceived)).toBeNull();
  });

  it("uses currentA1ToReceived when a1ToReceived exceeds cap", () => {
    const record = {
      calendarDaysA1ToReceived: 200,
      calendarDaysCurrentA1ToReceived: 30,
    };
    expect(
      durationValueForStats(record, metricA1ToReceived, "calendar", "applying")
    ).toBe(30);
  });

  it("does not apply cap when hkexStage is listed", () => {
    const record = {
      calendarDaysA1ToReceived: 200,
      calendarDaysCurrentA1ToReceived: 30,
    };
    expect(
      durationValueForStats(record, metricA1ToReceived, "calendar", "listed")
    ).toBe(200);
  });

  it("returns null for a1ToListing when listing not eligible", () => {
    const record = {
      calendarDaysA1ToListing: 250,
      listingDurationSampleEligible: false,
    };
    expect(durationValueForStats(record, metricA1ToListing)).toBeNull();
  });

  it("returns value for eligible a1ToListing", () => {
    const record = { calendarDaysA1ToListing: 250 };
    expect(durationValueForStats(record, metricA1ToListing)).toBe(250);
  });

  it("returns null when hasNoticeGapAfterListing", () => {
    const record = {
      hkexPublicStatus: "Listed",
      hkexListingDate: "2024-01-15",
      calendarDaysA1ToNotice: 50,
    };
    expect(durationValueForStats(record, metricA1ToNotice)).toBeNull();
  });
});

describe("statsFor", () => {
  const metric = { metric: "a1ToReceived" };

  it("returns zeros for empty records", () => {
    const result = statsFor([], metric);
    expect(result).toEqual({
      count: 0,
      average: null,
      median: null,
      min: null,
      max: null,
    });
  });

  it("calculates stats for valid records", () => {
    const records = [
      { calendarDaysA1ToReceived: 10 },
      { calendarDaysA1ToReceived: 20 },
      { calendarDaysA1ToReceived: 30 },
    ];
    const result = statsFor(records, metric);
    expect(result.count).toBe(3);
    expect(result.average).toBe(20);
    expect(result.median).toBe(20);
    expect(result.min).toBe(10);
    expect(result.max).toBe(30);
  });

  it("excludes ineligible records from stats", () => {
    const records = [
      { calendarDaysA1ToReceived: 10 },
      { calendarDaysA1ToReceived: 20, csrcFilingRequired: false },
      { calendarDaysA1ToReceived: 30 },
    ];
    const result = statsFor(records, metric);
    expect(result.count).toBe(2);
    expect(result.average).toBe(20);
  });

  it("handles single record", () => {
    const records = [{ calendarDaysA1ToReceived: 50 }];
    const result = statsFor(records, metric);
    expect(result.count).toBe(1);
    expect(result.average).toBe(50);
    expect(result.median).toBe(50);
    expect(result.min).toBe(50);
    expect(result.max).toBe(50);
  });

  it("handles even number of records for median", () => {
    const records = [
      { calendarDaysA1ToReceived: 10 },
      { calendarDaysA1ToReceived: 20 },
      { calendarDaysA1ToReceived: 30 },
      { calendarDaysA1ToReceived: 40 },
    ];
    const result = statsFor(records, metric);
    expect(result.median).toBe(25);
  });
});

describe("isStatsOutlier", () => {
  it("returns false when csrcFilingRequired is false", () => {
    expect(isStatsOutlier({ csrcFilingRequired: false })).toBe(false);
  });

  it("returns false when record has 密交 tag", () => {
    expect(isStatsOutlier({ statusTags: ["密交"] })).toBe(false);
  });

  it("returns false when record has 过渡期A1锚点 tag", () => {
    expect(isStatsOutlier({ statusTags: ["过渡期A1锚点"] })).toBe(false);
  });

  it("returns true when ineligible with a1Date and noticeDate", () => {
    expect(
      isStatsOutlier({
        durationSampleEligible: false,
        a1Date: "2024-01-01",
        noticeDate: "2024-03-01",
      })
    ).toBe(true);
  });

  it("returns true when ineligible with a1Date and csrcReceivedDate", () => {
    expect(
      isStatsOutlier({
        durationSampleEligible: false,
        a1Date: "2024-01-01",
        csrcReceivedDate: "2024-02-01",
      })
    ).toBe(true);
  });

  it("returns true for chronology conflict timeline flag", () => {
    expect(
      isStatsOutlier({
        timelineFlags: [
          "csrc_notice_before_received_chronology_conflict",
        ],
      })
    ).toBe(true);
  });

  it("returns false for normal records", () => {
    expect(isStatsOutlier({})).toBe(false);
    expect(
      isStatsOutlier({ durationSampleEligible: true, a1Date: "2024-01-01" })
    ).toBe(false);
  });
});

describe("visibleStatusTags", () => {
  it("filters out hidden internal tags", () => {
    const record = { statusTags: ["已上市", "密交"] };
    const tags = visibleStatusTags(record);
    expect(tags).not.toContain("已上市");
    expect(tags).toContain("密交");
  });

  it("filters out HKEX全量上市样本", () => {
    const record = { statusTags: ["HKEX全量上市样本", "some-tag"] };
    const tags = visibleStatusTags(record);
    expect(tags).not.toContain("HKEX全量上市样本");
    expect(tags).toContain("some-tag");
  });

  it("prepends 已上市 when hkexStage is all and practicalStage is listed", () => {
    const record = { statusTags: ["密交"], practicalStage: "listed" };
    const tags = visibleStatusTags(record, "all");
    expect(tags[0]).toBe("已上市");
    expect(tags).toContain("密交");
  });

  it("does not prepend 已上市 when hkexStage is not all", () => {
    const record = { statusTags: [], practicalStage: "listed" };
    const tags = visibleStatusTags(record, "listed");
    expect(tags).not.toContain("已上市");
  });

  it("appends outlier tag for outlier records", () => {
    const record = {
      durationSampleEligible: false,
      a1Date: "2024-01-01",
      noticeDate: "2024-03-01",
      statusTags: [],
    };
    const tags = visibleStatusTags(record);
    expect(tags).toContain("outlier剔除统计");
  });

  it("returns empty array for record with no tags and not outlier", () => {
    expect(visibleStatusTags({ statusTags: [] })).toEqual([]);
  });

  it("handles missing statusTags", () => {
    expect(visibleStatusTags({})).toEqual([]);
  });
});

describe("emptyPayload", () => {
  it("returns payload with error message", () => {
    const result = emptyPayload("test error");
    expect(result.meta.labelZh).toBe("加载失败");
    expect(result.meta.marketCapNoteZh).toBe("test error");
    expect(result.summary).toEqual({});
    expect(result.records).toEqual([]);
  });
});

describe("debounce", () => {
  it("delays function execution", async () => {
    let called = 0;
    const fn = debounce(() => { called++; }, 50);
    fn();
    fn();
    fn();
    expect(called).toBe(0);
    await new Promise((r) => setTimeout(r, 100));
    expect(called).toBe(1);
  });

  it("passes arguments to debounced function", async () => {
    let result = null;
    const fn = debounce((a, b) => { result = a + b; }, 50);
    fn(1, 2);
    await new Promise((r) => setTimeout(r, 100));
    expect(result).toBe(3);
  });

  it("resets timer on subsequent calls", async () => {
    let called = 0;
    const fn = debounce(() => { called++; }, 100);
    fn();
    await new Promise((r) => setTimeout(r, 50));
    fn();
    await new Promise((r) => setTimeout(r, 50));
    expect(called).toBe(0);
    await new Promise((r) => setTimeout(r, 100));
    expect(called).toBe(1);
  });
});
