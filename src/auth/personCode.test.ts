import { describe, expect, it } from "@jest/globals";
import { VALID_PERSON_CODE, validatePersonCode } from "./personCode";

describe("validatePersonCode", () => {
  it("accepts the configured person code", () => {
    expect(validatePersonCode(VALID_PERSON_CODE)).toBeNull();
  });

  it.each([
    ["empty input", ""],
    ["too few characters", "120392-1381"],
    ["too many characters", "120392-138111"],
    ["missing hyphen", "12039213811"],
    ["leading whitespace", " 120392-13811"],
    ["trailing whitespace", "120392-13811 "],
    ["trailing newline", "120392-13811\n"],
  ])("rejects %s with a length error", (_description, input) => {
    expect(validatePersonCode(input)).toBe(
      "Personas kodam jābūt 12 simbolu garam, iekļaujot domuzīmi",
    );
  });

  it.each([
    ["letters before the hyphen", "abcdef-13811"],
    ["letters after the hyphen", "120392-abcde"],
    ["wrong separator", "120392/13811"],
    ["misplaced hyphen", "12039-213811"],
    ["only digits", "120392013811"],
    ["embedded whitespace", "120392-1381 "],
  ])("rejects %s with a format error", (_description, input) => {
    expect(validatePersonCode(input)).toBe("Izmantojiet formātu 123456-12345");
  });

  it.each(["120392-13812", "220392-13811", "000000-00000"])(
    "rejects a well-formed but unrecognized code: %s",
    (input) => {
      expect(validatePersonCode(input)).toBe(
        "Personas kods nav atpazīts. Lūdzu mēģiniet vēlreiz",
      );
    },
  );
});
