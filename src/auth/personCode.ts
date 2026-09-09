export const VALID_PERSON_CODE = "120392-13811";

export function validatePersonCode(personCode: string): string | null {
  if (personCode.length !== 12) {
    return "Personas kodam jābūt 12 simbolu garam, iekļaujot domuzīmi";
  }

  if (!/^\d{6}-\d{5}$/.test(personCode)) {
    return "Izmantojiet formātu 123456-12345";
  }

  if (personCode !== VALID_PERSON_CODE) {
    return "Personas kods nav atpazīts. Lūdzu mēģiniet vēlreiz";
  }

  return null;
}
