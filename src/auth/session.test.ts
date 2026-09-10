import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { restoreSession, saveSession } from "./session";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const getItem = jest.mocked(AsyncStorage.getItem);
const setItem = jest.mocked(AsyncStorage.setItem);

beforeEach(() => {
  jest.resetAllMocks();
});

describe("session", () => {
  it("saves an authenticated session", async () => {
    await saveSession();

    expect(setItem).toHaveBeenCalledWith("posts-app:session", "authenticated");
  });

  it("returns true for an authenticated session", async () => {
    getItem.mockResolvedValue("authenticated");

    expect(await restoreSession()).toBe(true);
  });

  it("returns false when no session exists", async () => {
    getItem.mockResolvedValue(null);

    expect(await restoreSession()).toBe(false);
  });

  it("returns false for an invalid session", async () => {
    getItem.mockResolvedValue("something-else");

    expect(await restoreSession()).toBe(false);
  });
});
