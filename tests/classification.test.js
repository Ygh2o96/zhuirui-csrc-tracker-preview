import { describe, it, expect } from "vitest";
import {
  isAhCandidate,
  isHkexListed,
  isPostRegimeListed,
  hasNoticeGapAfterListing,
  hkexListingStage,
  hkexStageLabel,
  hkexListingStageCounts,
  issuerTypeKey,
  issuerTypeInfo,
  hasCjk,
  nameParts,
  statusLabel,
} from "../app.core.js";

describe("isAhCandidate", () => {
  it("returns true when isAH flag is set", () => {
    expect(isAhCandidate({ isAH: true })).toBe(true);
  });

  it("returns true when aShareCode exists", () => {
    expect(isAhCandidate({ aShareCode: "600000" })).toBe(true);
  });

  it('returns true when aShareStatus includes "A-share listed"', () => {
    expect(
      isAhCandidate({ aShareStatus: "A-share listed on SSE" })
    ).toBe(true);
  });

  it("returns false for non-AH records", () => {
    expect(isAhCandidate({})).toBe(false);
    expect(isAhCandidate({ aShareStatus: "Not applicable" })).toBe(false);
  });

  it("returns false when isAH is false and no other indicators", () => {
    expect(isAhCandidate({ isAH: false })).toBe(false);
  });
});

describe("isHkexListed", () => {
  it('returns true for hkexPublicStatus "Listed"', () => {
    expect(isHkexListed({ hkexPublicStatus: "Listed" })).toBe(true);
  });

  it('returns true for hkexPublicStatus "listed" (case insensitive)', () => {
    expect(isHkexListed({ hkexPublicStatus: "listed" })).toBe(true);
  });

  it("returns true for Chinese status 已上市", () => {
    expect(isHkexListed({ hkexPublicStatus: "已上市" })).toBe(true);
  });

  it("returns true when statusTags includes 已上市", () => {
    expect(isHkexListed({ statusTags: ["已上市"] })).toBe(true);
  });

  it("returns false for active status", () => {
    expect(isHkexListed({ hkexPublicStatus: "Active" })).toBe(false);
  });

  it("returns false for empty record", () => {
    expect(isHkexListed({})).toBe(false);
  });

  it("returns false for null status", () => {
    expect(isHkexListed({ hkexPublicStatus: null })).toBe(false);
  });
});

describe("isPostRegimeListed", () => {
  const listedRecord = {
    hkexPublicStatus: "Listed",
    hkexListingDate: "2024-01-15",
  };

  it("returns true for record listed after regime start", () => {
    expect(isPostRegimeListed(listedRecord)).toBe(true);
  });

  it("returns false for record listed before regime start", () => {
    expect(
      isPostRegimeListed({
        hkexPublicStatus: "Listed",
        hkexListingDate: "2022-01-01",
      })
    ).toBe(false);
  });

  it("returns false for non-listed record", () => {
    expect(
      isPostRegimeListed({
        hkexPublicStatus: "Active",
        hkexListingDate: "2024-01-15",
      })
    ).toBe(false);
  });

  it("returns false when listing date is missing", () => {
    expect(
      isPostRegimeListed({ hkexPublicStatus: "Listed" })
    ).toBe(false);
  });

  it("respects custom regime start date", () => {
    expect(
      isPostRegimeListed(
        { hkexPublicStatus: "Listed", hkexListingDate: "2024-01-01" },
        "2025-01-01"
      )
    ).toBe(false);
  });
});

describe("hasNoticeGapAfterListing", () => {
  it("returns true for post-regime listed without notice", () => {
    expect(
      hasNoticeGapAfterListing({
        hkexPublicStatus: "Listed",
        hkexListingDate: "2024-01-15",
      })
    ).toBe(true);
  });

  it("returns false when noticeDate exists", () => {
    expect(
      hasNoticeGapAfterListing({
        hkexPublicStatus: "Listed",
        hkexListingDate: "2024-01-15",
        noticeDate: "2024-02-01",
      })
    ).toBe(false);
  });

  it("returns false when csrcFilingRequired is false", () => {
    expect(
      hasNoticeGapAfterListing({
        hkexPublicStatus: "Listed",
        hkexListingDate: "2024-01-15",
        csrcFilingRequired: false,
      })
    ).toBe(false);
  });

  it("returns false for non-listed record", () => {
    expect(hasNoticeGapAfterListing({ hkexPublicStatus: "Active" })).toBe(
      false
    );
  });
});

describe("hkexListingStage", () => {
  it("returns practicalStage when set", () => {
    expect(hkexListingStage({ practicalStage: "applying" })).toBe("applying");
    expect(hkexListingStage({ practicalStage: "other" })).toBe("other");
  });

  it("returns listed for post-regime listed records", () => {
    expect(
      hkexListingStage({
        hkexPublicStatus: "Listed",
        hkexListingDate: "2024-01-15",
      })
    ).toBe("listed");
  });

  it('returns applying for "Active" status', () => {
    expect(hkexListingStage({ hkexPublicStatus: "Active" })).toBe("applying");
  });

  it('returns applying for "Processing" status', () => {
    expect(hkexListingStage({ hkexPublicStatus: "Processing" })).toBe(
      "applying"
    );
  });

  it("returns applying for Chinese processing status", () => {
    expect(hkexListingStage({ hkexPublicStatus: "處理中" })).toBe("applying");
    expect(hkexListingStage({ hkexPublicStatus: "处理中" })).toBe("applying");
  });

  it("returns other for lapsed status", () => {
    expect(hkexListingStage({ hkexPublicStatus: "Lapsed" })).toBe("other");
  });

  it("returns other for withdrawn status", () => {
    expect(hkexListingStage({ hkexPublicStatus: "Withdrawn" })).toBe("other");
  });

  it("returns other for rejected status", () => {
    expect(hkexListingStage({ hkexPublicStatus: "Rejected" })).toBe("other");
  });

  it("returns other for Chinese lapsed/withdrawn statuses", () => {
    expect(hkexListingStage({ hkexPublicStatus: "失效" })).toBe("other");
    expect(hkexListingStage({ hkexPublicStatus: "撤回" })).toBe("other");
    expect(hkexListingStage({ hkexPublicStatus: "拒绝" })).toBe("other");
    expect(hkexListingStage({ hkexPublicStatus: "拒絕" })).toBe("other");
  });

  it("defaults to applying for unknown status", () => {
    expect(hkexListingStage({ hkexPublicStatus: "Unknown" })).toBe("applying");
    expect(hkexListingStage({})).toBe("applying");
  });
});

describe("hkexStageLabel", () => {
  it("returns correct labels for known stages", () => {
    expect(hkexStageLabel("all")).toBe("全部 All");
    expect(hkexStageLabel("applying")).toBe("上市申请中 In application");
    expect(hkexStageLabel("listed")).toBe("已上市 Listed");
    expect(hkexStageLabel("other")).toBe("搁置/撤回 Stalled / withdrawn");
  });

  it("returns raw stage for unknown stages", () => {
    expect(hkexStageLabel("custom")).toBe("custom");
  });
});

describe("hkexListingStageCounts", () => {
  it("counts records by stage", () => {
    const records = [
      { hkexPublicStatus: "Active" },
      { hkexPublicStatus: "Active" },
      { hkexPublicStatus: "Listed", hkexListingDate: "2024-01-01" },
      { hkexPublicStatus: "Lapsed" },
    ];
    const counts = hkexListingStageCounts(records);
    expect(counts.all).toBe(4);
    expect(counts.applying).toBe(2);
    expect(counts.listed).toBe(1);
    expect(counts.other).toBe(1);
  });

  it("handles empty array", () => {
    const counts = hkexListingStageCounts([]);
    expect(counts.all).toBe(0);
    expect(counts.applying).toBe(0);
    expect(counts.listed).toBe(0);
    expect(counts.other).toBe(0);
  });
});

describe("issuerTypeKey", () => {
  it("returns a_h for AH candidates", () => {
    expect(issuerTypeKey({ isAH: true })).toBe("a_h");
    expect(issuerTypeKey({ aShareCode: "600000" })).toBe("a_h");
  });

  it("returns red_chip for red-chip structure", () => {
    expect(issuerTypeKey({ structureType: "Red-chip" })).toBe("red_chip");
  });

  it("returns red_chip for offshore jurisdiction", () => {
    expect(issuerTypeKey({ issuerJurisdiction: "Offshore" })).toBe("red_chip");
  });

  it("returns h_share for H-share structure", () => {
    expect(issuerTypeKey({ structureType: "H-share" })).toBe("h_share");
  });

  it("returns h_share for PRC-incorporated", () => {
    expect(issuerTypeKey({ issuerJurisdiction: "PRC-incorporated" })).toBe(
      "h_share"
    );
  });

  it("returns other for unknown structures", () => {
    expect(issuerTypeKey({})).toBe("other");
    expect(issuerTypeKey({ structureType: "Unknown" })).toBe("other");
  });

  it("prioritizes AH over structure type", () => {
    expect(
      issuerTypeKey({ isAH: true, structureType: "Red-chip" })
    ).toBe("a_h");
  });
});

describe("issuerTypeInfo", () => {
  it("returns correct info for a_h", () => {
    const info = issuerTypeInfo("a_h");
    expect(info.primary).toBe("A+H");
    expect(info.secondary).toBe("A-share + H-share");
    expect(info.rank).toBe(1);
  });

  it("returns correct info for h_share", () => {
    const info = issuerTypeInfo("h_share");
    expect(info.primary).toBe("H股");
    expect(info.rank).toBe(2);
  });

  it("returns correct info for red_chip", () => {
    const info = issuerTypeInfo("red_chip");
    expect(info.primary).toBe("红筹");
    expect(info.rank).toBe(3);
  });

  it("returns other for unknown keys", () => {
    const info = issuerTypeInfo("unknown");
    expect(info.primary).toBe("其他");
    expect(info.rank).toBe(9);
  });

  it("accepts record objects", () => {
    const info = issuerTypeInfo({ isAH: true });
    expect(info.primary).toBe("A+H");
  });
});

describe("hasCjk", () => {
  it("returns true for Chinese characters", () => {
    expect(hasCjk("中国公司")).toBe(true);
  });

  it("returns false for pure ASCII", () => {
    expect(hasCjk("ABC Corp")).toBe(false);
  });

  it("returns true for mixed text", () => {
    expect(hasCjk("Test 中文")).toBe(true);
  });

  it("returns false for null/empty", () => {
    expect(hasCjk(null)).toBe(false);
    expect(hasCjk("")).toBe(false);
  });
});

describe("nameParts", () => {
  it("uses csrcName as primary when it contains CJK", () => {
    const result = nameParts({
      csrcName: "中国公司",
      issuerName: "China Corp",
    });
    expect(result.primary).toBe("中国公司");
    expect(result.secondary).toBe("China Corp");
  });

  it("uses issuerName as primary when csrcName is ASCII", () => {
    const result = nameParts({
      csrcName: "ACME Inc",
      issuerName: "ACME Corporation",
    });
    expect(result.primary).toBe("ACME Corporation");
    expect(result.secondary).toBe("ACME Inc");
  });

  it("handles null csrcName", () => {
    const result = nameParts({
      csrcName: null,
      issuerName: "Test Corp",
    });
    expect(result.primary).toBe("Test Corp");
  });
});

describe("statusLabel", () => {
  it("returns Chinese label by default (index 0)", () => {
    expect(statusLabel("notice_issued")).toBe("已发通知书");
    expect(statusLabel("csrc_received")).toBe("已接收");
  });

  it("returns English label for index 1", () => {
    expect(statusLabel("notice_issued", 1)).toBe("Notice issued");
    expect(statusLabel("csrc_received", 1)).toBe("CSRC received");
  });

  it("returns raw status for unknown statuses", () => {
    expect(statusLabel("unknown_status")).toBe("unknown_status");
    expect(statusLabel("unknown_status", 1)).toBe("unknown_status");
  });
});
