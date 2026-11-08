// SPDX-License-Identifier: MIT
// Luhn (ISO/IEC 7812) check-digit validation and generation for digit
// strings. Spaces/hyphens tolerated, digits only. No network, no I/O.

export const MAX_LENGTH = 32;

export class LuhnError extends Error {
  constructor(code, detail = '') {
    super(detail ? `${code}: ${detail}` : code);
    this.name = 'LuhnError';
    this.code = code;
  }
}

/** Strip spaces/hyphens; require 2..32 ASCII digits. */
export function normalize(input) {
  if (typeof input !== 'string') throw new LuhnError('NOT_STRING');
  const out = input.replace(/[\s-]+/g, '');
  if (out.length === 0) throw new LuhnError('EMPTY');
  if (!/^[0-9]+$/.test(out)) throw new LuhnError('BAD_CHARS');
  if (out.length < 2) throw new LuhnError('TOO_SHORT');
  if (out.length > MAX_LENGTH) throw new LuhnError('TOO_LONG');
  return out;
}

/** Luhn sum: double every second digit from the right, subtract 9 over 9. */
export function luhnSum(digits) {
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = digits.charCodeAt(i) - 48;
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum;
}

/** Validate full number (check digit included). Returns normalized digits. */
export function validate(input) {
  const digits = normalize(input);
  if (luhnSum(digits) % 10 !== 0) throw new LuhnError('BAD_CHECK');
  return digits;
}

/** Non-throwing: { ok:true, digits } or { ok:false, code }. */
export function check(input) {
  try {
    return { ok: true, digits: validate(input) };
  } catch (err) {
    if (err instanceof LuhnError) return { ok: false, code: err.code };
    throw err;
  }
}

/** Compute the check digit for a partial number (without it). */
export function computeCheckDigit(partial) {
  if (typeof partial !== 'string') throw new LuhnError('NOT_STRING');
  const out = partial.replace(/[\s-]+/g, '');
  if (!/^[0-9]+$/.test(out) || out.length === 0) throw new LuhnError('BAD_CHARS');
  if (out.length + 1 > MAX_LENGTH) throw new LuhnError('TOO_LONG');
  const sum = luhnSum(out + '0');
  return String((10 - (sum % 10)) % 10);
}
