import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { fetchPost } from "./post";

afterEach(() => { jest.restoreAllMocks(); });

describe("fetchPost", () => {
  it("requests and returns the selected post", async () => {
    const post = { id: 7, userId: 1, title: "Title", body: "Full body" };
    const request = jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true, status: 200, json: async () => post,
    } as Response);
    const signal = new AbortController().signal;

    expect(await fetchPost("7", signal)).toEqual(post);
    expect(request).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts/7", { signal },
    );
  });

  it.each([404, 204])("returns no post for HTTP %s", async (status) => {
    jest.spyOn(global, "fetch").mockResolvedValue({ status } as Response);
    expect(await fetchPost("7")).toBeNull();
  });

  it.each([null, {}])("returns no post for an empty payload: %s", async (payload) => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true, status: 200, json: async () => payload,
    } as Response);
    expect(await fetchPost("7")).toBeNull();
  });

  it("throws when the server fails", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({ ok: false, status: 500 } as Response);
    await expect(fetchPost("7")).rejects.toThrow("Failed to load post");
  });
});
