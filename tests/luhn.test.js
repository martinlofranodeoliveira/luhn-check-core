import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validate, check, computeCheckDigit, LuhnError } from '../src/luhn.mjs';

describe('known numbers', () => {
  it('accepts Wikipedia example and card/IMEI numbers', () => {
    assert.equal(validate('79927398713'), '79927398713');
    assert.equal(validate('378282246310005'), '378282246310005');
    assert.equal(validate('371449635398431'), '371449635398431');
    assert.equal(validate('4111111111111111'), '4111111111111111');
    assert.equal(validate('490154203237518'), '490154203237518');
  });
  it('tolerates spaces and hyphens', () => {
    assert.equal(check('7992 7398-713').ok, true);
  });
  it('rejects bad check digits', () => {
    assert.equal(check('79927398710').code, 'BAD_CHECK');
    assert.equal(check('4111111111111112').code, 'BAD_CHECK');
  });
});

describe('bounds', () => {
  it('rejects non-strings, empties, bad chars, lengths', () => {
    assert.throws(() => validate(42), (e) => e.code === 'NOT_STRING');
    assert.throws(() => validate('  '), (e) => e.code === 'EMPTY');
    assert.throws(() => validate('7992X7398713'), (e) => e.code === 'BAD_CHARS');
    assert.throws(() => validate('5'), (e) => e.code === 'TOO_SHORT');
    assert.throws(() => validate('1'.repeat(33)), (e) => e.code === 'TOO_LONG');
    assert.ok(new LuhnError('X') instanceof Error);
  });
});

describe('check digit', () => {
  it('recomputes Wikipedia digit', () => {
    assert.equal(computeCheckDigit('7992739871'), '3');
  });
  it('round-trips on every valid example', () => {
    for (const full of ['79927398713', '378282246310005', '4111111111111111', '490154203237518']) {
      assert.equal(computeCheckDigit(full.slice(0, -1)), full.slice(-1));
      assert.equal(validate(full), full);
    }
  });
});
