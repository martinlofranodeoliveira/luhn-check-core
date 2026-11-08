#!/usr/bin/env node
// Demo: fixed numbers, asserts expectations. --assert exits non-zero on mismatch.
import { check } from '../src/luhn.mjs';

const CASES = [
  ['79927398713', true],
  ['378282246310005', true],
  ['4111 1111 1111 1111', true],
  ['79927398710', false],
  ['4111111111111112', false],
];

let failed = 0;
for (const [input, expected] of CASES) {
  const r = check(input);
  const pass = r.ok === expected;
  if (!pass) failed++;
  console.log(`${pass ? 'PASS' : 'FAIL'} ${input} -> ${r.ok ? 'ok' : r.code}`);
}
if (process.argv.includes('--assert') && failed > 0) process.exit(1);
if (failed > 0) process.exitCode = 1;
console.log(failed === 0 ? 'demo: all cases as expected' : `demo: ${failed} mismatch(es)`);
