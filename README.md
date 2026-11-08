# luhn-check-core

Luhn (ISO/IEC 7812) check-digit validation and generation for digit
strings. Zero runtime dependencies, Node >= 22.

Part of the LOFRANO TECNOLOGIA open-source lab. MIT.

```js
import { validate, computeCheckDigit } from './src/luhn.mjs';
validate('79927398713');            // '79927398713'
computeCheckDigit('7992739871');    // '3'
```

```sh
npm test          # 6 tests, node:test, no dependencies
npm run demo
```

Digit strings only (2–32 chars) — no card semantics. MIT — see `LICENSE`.
Full contract in `docs/contract.md`. [Versão em português](README.pt-BR.md).
