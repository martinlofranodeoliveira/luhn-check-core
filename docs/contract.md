# Contract — luhn-check-core

Pure ESM in `src/luhn.mjs`, zero runtime dependencies, Node >= 22.
2–32 ASCII digits; spaces/hyphens tolerated, never echoed in errors.

| Export | Result |
| --- | --- |
| `MAX_LENGTH` (32) | Hard bound. |
| `normalize(input)` | Stripped digits. Throws `NOT_STRING`/`EMPTY`/`BAD_CHARS`/`TOO_SHORT`/`TOO_LONG`. |
| `luhnSum(digits)` | Checksum with doubling from the right. |
| `validate(input)` | Normalized digits or throws `BAD_CHECK` (+ normalize codes). |
| `check(input)` | `{ ok:true, digits }` or `{ ok:false, code }`. |
| `computeCheckDigit(partial)` | The digit that makes the full number valid. |
