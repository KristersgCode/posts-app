import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { fetchPosts } from "./posts";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("fetchPosts", () => {
  it("requests the correct page", async () => {
    const request = jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => [],
      headers: new Headers({ "x-total-count": "100" }),
    } as unknown as Response);
    const signal = new AbortController().signal;

    await fetchPosts(2, signal);
    expect(request).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts?_page=2&_limit=10",
      { signal },
    );
  });

  it("throws when the response is not ok", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({ ok: false } as Response);
    await expect(fetchPosts(1)).rejects.toThrow("Failed to load posts");
  });

  it.each([
    { page: 9, hasNextPage: true },
    { page: 10, hasNextPage: false },
  ])(
    "calculates hasNextPage correctly for page $page",
    async ({ page, hasNextPage }) => {
      jest.spyOn(global, "fetch").mockResolvedValue({
        ok: true,
        json: async () => [],
        headers: new Headers({ "x-total-count": "100" }),
      } as unknown as Response);

      expect((await fetchPosts(page)).hasNextPage).toBe(hasNextPage);
    },
  );

  it.each([
    { count: 10, hasNextPage: true },
    { count: 9, hasNextPage: false },
    { count: 0, hasNextPage: false },
  ])(
    "uses batch size when x-total-count is missing ($count posts)",
    async ({ count, hasNextPage }) => {
      const posts = Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        userId: 1,
        title: "Post title",
        body: "Post body",
      }));
      jest.spyOn(global, "fetch").mockResolvedValue({
        ok: true,
        json: async () => posts,
        headers: new Headers(),
      } as Response);

      expect((await fetchPosts(1)).hasNextPage).toBe(hasNextPage);
    },
  );
});
