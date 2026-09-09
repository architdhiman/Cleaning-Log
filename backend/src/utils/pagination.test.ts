import { describe, expect, it } from "vitest";
import { getPagination } from "./pagination.js";

describe("getPagination", () => {
  it("calculates total pages correctly", () => {
    expect(getPagination(1, 5, 12)).toEqual({
      page: 1,
      limit: 5,
      total: 12,
      totalPages: 3,
    });
  });

  it("handles an exact number of pages", () => {
    expect(getPagination(2, 5, 10)).toEqual({
      page: 2,
      limit: 5,
      total: 10,
      totalPages: 2,
    });
  });
});