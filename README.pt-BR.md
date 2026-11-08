# luhn-check-core

Validação e geração de dígito verificador Luhn (ISO/IEC 7812) para
sequências de dígitos. Zero dependências, Node >= 22.

Parte do laboratório open source da LOFRANO TECNOLOGIA. MIT.

```js
import { validate, computeCheckDigit } from './src/luhn.mjs';
validate('79927398713');            // '79927398713'
computeCheckDigit('7992739871');    // '3'
```

```sh
npm test          # 6 testes, node:test, sem dependências
npm run demo
```

Somente dígitos (2–32 caracteres) — sem semântica de cartão. MIT — veja `LICENSE`.
